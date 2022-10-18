from array import array
from typing import List
from flask import Flask, request
from api.GoogleTrendsDataCollector import GoogleTrendsDataCollector
from api.InstagramCollector import InstagramCollector
from flask_cors import CORS
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
        search_term = request.args.get(
            "search_term", ""
        )  # search term to search for. If empty, the default search term is used.
        trending_words_dataframes: List[DataFrame] = []
        googleCollector = GoogleTrendsDataCollector()
        add_dataframe_from_collector(
            trending_words_dataframes,
            googleCollector.get_trending_words(search_term),
        )

        main_data_frame = pd.concat(trending_words_dataframes).reset_index(drop=True)

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
        query = args.get("query", default="", type=str)
        filteredOutWords = args.get("filteredOutWords", default="", type=str)
        return metaCollector.get_related_hashtags(query, filteredOutWords)

    @app.route("/api/v1/related_post_URLS")
    def getRelatedPostURLS():
        metaCollector = InstagramCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        query = args.get("query", default="", type=str)
        return metaCollector.get_related_posts(query)

    @app.route("/api/v1/business_hashtags")
    def getBusinessHashtags():
        try:
            metaCollector = InstagramCollector(
                os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
            )
            args = request.args
            followedUsers = args.get("followedUsers", default="[]", type=str)
            filteredOutWords = args.get("filteredOutWords", default="", type=str)
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
            followedUsers = args.get("followedUsers", default="[]", type=str)
            users = json.loads(followedUsers)
            return metaCollector.get_business_post_urls(users)
        except ValueError as e:
            return str(e)

    return app


app = create_app()
