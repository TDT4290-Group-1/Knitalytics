from flask import abort
from typing import List
from flask import Flask, request
import werkzeug.exceptions
from datacollectors.google_trends_data_collector import GoogleTrendsDataCollector
from datacollectors.instagram_data_collector import InstagramDataCollector
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

    @app.errorhandler(werkzeug.exceptions.TooManyRequests)
    def handle_too_many_requests(error):
        description = """
            Could not fetch Trends data due to too many requests to Google.
            Wait some time, then try refreshing the page.
        """
        return description, 429

    def authenticate_request(request):
        print(os.getenv("USER_AUTH"))
        print(request.args.get("user_auth"))
        if os.getenv("USER_AUTH") != request.args.get("user_auth"):
            abort(401, "User not logged in")

    @app.route("/api/v1/trends", methods=["GET"])
    def getTrendingWords():
        authenticate_request(request)

        # 'frequency_growth' or 'search_count'. Used to show the most searched words or the fastest growing words.
        search_term = request.args.get(
            "search_term", ""
        )  # search term to search for. If empty, the default search term is used.

        # the 'type' argument is a function that compares the GET argument value with the literal string "true"
        # and sets the value of 'filter' variable correspondingly.
        # This allows all specifications of "true" and "false" to be evaluated correctly, e.g. "TRUE" is also accepted as a value
        filter = request.args.get("filter", False, type=lambda a: a.lower() == "true")

        # retrive timeframe arg
        timeframe = request.args.get("timeframe", "")

        trending_words_dataframes: List[DataFrame] = []
        googleCollector = GoogleTrendsDataCollector()

        google_response = googleCollector.get_trending_words(
            search_term, timeframe, filter
        )

        add_dataframe_from_collector(
            trending_words_dataframes,
            google_response,
        )

        main_data_frame = pd.concat(trending_words_dataframes).reset_index(drop=True)

        return main_data_frame.to_json(orient="records", force_ascii=False)

    @app.route("/api/v1/interest_over_time/", methods=["GET"])
    def getInterestOverTime():
        authenticate_request(request)

        search_term = request.args.get(
            "search_term", ""
        )  # search term to search for. If empty, the default search term is used.

        googleCollector = GoogleTrendsDataCollector()
        df = googleCollector.get_interest_over_time(search_term)

        return df.to_json(orient="records")

    @app.route("/api/v1/related_hashtags")
    def getRelatedHashtags():
        authenticate_request(request)

        instaCollector = InstagramDataCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        # Arg validation
        if "query" not in args:
            # Returns http error to frontend
            abort(422, "Missing query parameter query")
        query = args.get("query", default="", type=str)
        filteredOutWords = args.get("filteredOutWords", default="[+]", type=str)
        return instaCollector.get_related_hashtags(query, filteredOutWords)

    # Takes a hashtags and an amount: {query: str, amount: int}
    @app.route("/api/v1/related_post_URLS")
    def getRelatedPostURLS():
        authenticate_request(request)

        instaCollector = InstagramDataCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        # Arg validation
        if "query" not in args:
            # Returns http error to frontend
            abort(422, "Missing query parameter query")
        query = args.get("query", type=str)
        amount = args.get("amount", default=10, type=int)

        return instaCollector.get_related_post_urls(query, amount)

    @app.route("/api/v1/business_posts_urls")
    def getBusinessPostURLS():
        authenticate_request(request)

        try:
            instaCollector = InstagramDataCollector(
                os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
            )
            args = request.args
            # Arg validation
            if "followedUsers" not in args:
                abort(422, "Missing query parameter followedUsers")
            sort = args.get("sort", default="user", type=str)
            postAmount = args.get("postAmount", default=10, type=str)
            followedUsers = args.get("followedUsers", type=str)
            users = json.loads(followedUsers)
            return instaCollector.get_business_post_urls(users, sort, postAmount)
        except ValueError as e:
            return str(e)

    @app.route("/api/v1/business_user")
    def getBusinessUser():
        authenticate_request(request)

        instaCollector = InstagramDataCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        # Arg validation
        if "username" not in args:
            abort(422, "Missing query parameter followedUsers")
        ig_user = json.loads(args.get("username", type=str))
        return instaCollector.get_business_user(ig_user)

    @app.route("/api/v1/hashtag_id")
    def getHashtagId():
        authenticate_request(request)

        instaCollector = InstagramDataCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        # Arg validation
        if "hashtag" not in args:
            abort(422, "Missing query parameter hashtag")
        hashtag = json.loads(args.get("hashtag", type=str))
        return instaCollector.get_hashtag_id(hashtag)

    return app


app = create_app()
