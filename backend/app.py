from flask import abort
from typing import List
from flask import Flask, request
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

    app = Flask(__name__)
    CORS(app)
    app.config["CORS_HEADERS"] = "Content-Type"

    @app.route("/api/v1/trends", methods=["GET"])
    def getTrendingWords():
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
        """Returns the interest values and corresponding dates of 'search_term"""
        search_term = request.args.get(
            "search_term", ""
        )  # search term to search for. If empty, the default search term is used.

        googleCollector = GoogleTrendsDataCollector()
        df = googleCollector.get_interest_over_time(search_term)

        return df.to_json(orient="records")

    @app.route("/api/v1/related_hashtags")
    def getRelatedHashtags():
        """Returns a list of most popular hashtags co-appearing with the query"""
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

    @app.route("/api/v1/related_post_URLS")
    def getRelatedPostURLS():
        """Returns a list of URLS (string) to posts with the hashtag: 'query'"""
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

    @app.route("/api/v1/users_post_urls")
    def getUsersPostURLS():
        """Returns a list of URLS (string) to posts from 'followedUsers'"""
        try:
            instaCollector = InstagramDataCollector(
                os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
            )
            args = request.args
            # Arg validation
            if "followedUsers" not in args:
                abort(422, "Missing query parameter followedUsers")
            sort = args.get("sort", default="user", type=str)
            postAmount = args.get("postAmount", default=7, type=str)
            followedUsers = args.get("followedUsers", type=str)
            users = json.loads(followedUsers)
            return instaCollector.get_users_post_urls(users, sort, postAmount)
        except ValueError as e:
            return str(e)

    @app.route("/api/v1/business_user")
    def getBusinessUser():
        """Method is used to check if 'ig_user' exists. Returns an error object if it does not"""
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
        """Returns the id of the 'hashtag', if hashtag does not exist it returns an error object"""
        instaCollector = InstagramDataCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        # Arg validation
        if "hashtag" not in args:
            abort(422, "Missing query parameter hashtag")
        hashtag = json.loads(args.get("hashtag", type=str))
        return instaCollector.get_hashtag_id(hashtag)

    def add_dataframe_from_collector(
        trending_words_dataframes: List[DataFrame],
        dataframe_to_add: pd.DataFrame,
    ):
        trending_words_dataframes.append(dataframe_to_add)

    return app


app = create_app()
