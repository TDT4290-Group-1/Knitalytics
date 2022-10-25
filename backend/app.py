from array import array
from flask import abort
from typing import List
from flask import Flask, request
from api.GoogleTrendsDataCollector import GoogleTrendsDataCollector
from api.InstagramCollector import InstagramCollector
from flask_cors import CORS
import json
import pandas as pd
from pandas import DataFrame
import os
from dotenv import load_dotenv
import json

load_dotenv()


def create_app():

    # bør definere api linker slikt
    # @app.route("/api/v1/trends/<string:keyword>")
    # def get_trends(keyword: str):
    #     data_collector: DataCollector = GoogleTrendsDataCollector()
    #     data: List = data_collector.get_data(keyword)
    #     return json.dumps(data)

    app = Flask(__name__)
    CORS(app)
    app.config["CORS_HEADERS"] = "Content-Type"

    def add_dataframe_from_collector(
        trending_words_dataframes: List[DataFrame],
        dataframe_to_add: pd.DataFrame,
    ):
        trending_words_dataframes.append(dataframe_to_add)

    @app.route("/")
    def hello_world():
        return "Hello, World!"

    @app.route("/api/v1/trends", methods=["GET"])
    def getTrendingWords():
        # 'frequency_growth' or 'search_count'. Used to show the most searched words or the fastest growing words.
        search_term = request.args.get(
            "search_term", ""
        )  # search term to search for. If empty, the default search term is used.

        # the 'type' argument is a function that compares the GET argument value with the literal string "true"
        # and sets the value of 'filter' variable correspondingly.
        # This allows all specifications of "true" and "false" to be evaluated correctly, e.g. "TRUE" is also accepted as a value
        filter = request.args.get(
            "filter", False, type=lambda a: a.lower() == "true")
        print(type(filter))
        trending_words_dataframes: List[DataFrame] = []
        googleCollector = GoogleTrendsDataCollector()
        add_dataframe_from_collector(
            trending_words_dataframes,
            googleCollector.get_trending_words(search_term, filter),
        )

        main_data_frame = pd.concat(
            trending_words_dataframes).reset_index(drop=True)

        return main_data_frame.to_json(orient="records", force_ascii=False)

    @app.route("/api/v1/interest_over_time/", methods=["GET"])
    def getInterestOverTime():
        search_term = request.args.get(
            "search_term", ""
        )  # search term to search for. If empty, the default search term is used.

        googleCollector = GoogleTrendsDataCollector()
        df = googleCollector.get_interest_over_time(search_term)

        return df.to_json(orient="records")

    @app.route("/api/v1/related_hashtags")
    def getRelatedHashtags():
        metaCollector = InstagramCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        # Arg validation
        if "query" not in args:
            # Returns http error to frontend
            abort(422, "Missing query parameter query")
        query = args.get("query", default="", type=str)
        filteredOutWords = args.get("filteredOutWords", default="", type=str)
        return metaCollector.get_related_hashtags(query, filteredOutWords)

    # Takes a hashtags and an amount: {query: str, amount: int}
    @app.route("/api/v1/related_post_URLS")
    def getRelatedPostURLS():
        metaCollector = InstagramCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        # Arg validation
        if "query" not in args:
            abort(422, "Missing query parameter query")
        query = args.get("query", default="", type=str)
        amount = args.get("amount", default=10, type=int)

        return metaCollector.get_related_posts(query, amount)

    @app.route("/api/v1/business_hashtags")
    def getBusinessHashtags():
        try:
            metaCollector = InstagramCollector(
                os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
            )
            args = request.args
            followedUsers = args.get("followedUsers", default="[]", type=str)
            filteredOutWords = args.get(
                "filteredOutWords", default="", type=str)
            users = json.loads(followedUsers)
            return metaCollector.get_hashtags_business_users(users, filteredOutWords)
        except ValueError as e:
            return str(e)

    @app.route("/api/v1/business_posts_urls")
    def getBusinessPostURLS():
        try:
            metaCollector = InstagramCollector(
                os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
            )
            args = request.args
            # Arg validation
            if "followedUsers" not in args:
                abort(422, "Missing query parameter followedUsers")
            sort = args.get("sort", default="", type=str)
            followedUsers = args.get("followedUsers", default="[]", type=str)
            users = json.loads(followedUsers)
            return metaCollector.get_business_post_urls(users, sort)
        except ValueError as e:
            return str(e)

    @app.route("/api/v1/business_user")
    def getBusinessUser():
        metaCollector = InstagramCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        # Arg validation
        if "username" not in args:
            abort(422, "Missing query parameter followedUsers")

        ig_user = json.loads(args.get("username", default="", type=str))
        return metaCollector.get_business_user(ig_user)

    @app.route("/api/v1/hashtag_id")
    def getHashtagId():
        metaCollector = InstagramCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        # Arg validation
        if "hashtag" not in args:
            abort(422, "Missing query parameter hashtag")

        hashtag = json.loads(args.get("hashtag", default="", type=str))
        return metaCollector.get_hashtag_id(hashtag)
    return app


app = create_app()
