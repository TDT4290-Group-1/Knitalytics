from typing import List
from flask import Flask, request
from api.DataCollectorInterface import DataCollector
from api.GoogleTrendsDataCollector import GoogleTrendsDataCollector
from api.InstagramCollector import InstagramCollector
from flask_cors import CORS
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

    @app.route("/api/v1/trends/", methods = ["GET"])
    def getTrendingWords():
        metric = request.args.get('metric')
        search_term = request.args.get('search_term', '')
        trending_words_dataframes: List[DataFrame] = []
        googleCollector = GoogleTrendsDataCollector()
        add_dataframe_from_collector(trending_words_dataframes, googleCollector.get_trending_words( metric, search_term))

        main_data_frame = pd.concat(trending_words_dataframes).reset_index(drop=True)
        print(main_data_frame)

        return main_data_frame.to_json(orient="records")

    @app.route("/api/v1/relatedHashtags")
    def getRelatedHashtags():
        metaCollector = InstagramCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        query = args.get("query", default="", type=str)
        # to test backend you can change 'query' to hardcoded keyword
        return metaCollector.get_related_hashtags(query)

    @app.route("/api/v1/relatedPostURLS")
    def getRelatedPostURLS():
        metaCollector = InstagramCollector(
            os.getenv("ACCESS_TOKEN"), os.getenv("USER_ID")
        )
        args = request.args
        query = args.get("query", default="", type=str)
        return metaCollector.get_related_posts(query)

    return app


app = create_app()
