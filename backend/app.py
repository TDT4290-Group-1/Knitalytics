from typing import List
from flask import Flask, request
from api.DataCollectorInterface import DataCollector
from api.GoogleTrendsDataCollector import GoogleTrendsDataCollector
from api.InstagramCollector import InstagramCollector
from flask_cors import CORS
import json
import pandas as pd
from pandas import DataFrame
import os
from dotenv import load_dotenv

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

    @app.route("/api/v1/trends/", methods=["GET"])
    def getTrendingWords():
        # Arg validation
        if "metric" not in request.args or "search_term" not in request.args:
            return "Missing query parameter metric or search_term"
        metric = request.args.get(
            "metric"
        )  # 'frequency_growth' or 'search_count'. Used to show the most searched words or the fastest growing words.
        search_term = request.args.get(
            "search_term", ""
        )  # search term to search for. If empty, the default search term is used.
        trending_words_dataframes: List[DataFrame] = []
        googleCollector = GoogleTrendsDataCollector()
        add_dataframe_from_collector(
            trending_words_dataframes,
            googleCollector.get_trending_words(metric, search_term),
        )

        main_data_frame = pd.concat(trending_words_dataframes).reset_index(drop=True)
        print(main_data_frame)

        return main_data_frame.to_json(orient="records")

    @app.route("/api/v1/relatedHashtags")
    def getRelatedHashtags():
        metaCollector = InstagramCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        # Arg validation
        if "query" not in args:
            return "Missing query parameter query"
        query = args.get("query", default="", type=str)
        filteredOutWords = args.get("filteredOutWords", default="", type=str)
        # to test backend you can change 'query' to hardcoded keyword
        return metaCollector.get_related_hashtags(query, filteredOutWords)

    @app.route("/api/v1/relatedPostURLS")
    def getRelatedPostURLS():
        metaCollector = InstagramCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        # Arg validation
        if "query" not in args:
            return "Missing query parameter query"
        query = args.get("query", default="", type=str)
        return metaCollector.get_related_posts(query)

    @app.route("/api/v1/business_hashtags")
    def getBusinessHashtags():
        try:
            metaCollector = InstagramCollector(
                os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
            )

            return metaCollector.get_hashtags_business_users()
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
            if "username" not in args or "followedUsers" not in args:
                return "Missing query parameter username or followedUsers"
            followedUsers = args.get("followedUsers", default="[]", type=str)
            users = json.loads(followedUsers)
            return metaCollector.get_business_post_urls(users)
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
            return "Missing query parameter username"

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
            return "Missing query parameter 'hashtag'"

        hashtag = json.loads(args.get("hashtag", default="", type=str))
        return metaCollector.get_hashtag_id(hashtag)

    return app


app = create_app()
