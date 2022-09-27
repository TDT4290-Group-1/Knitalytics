import json
from typing import List
from models.trending_word import TrendingWord
from flask import Flask, jsonify, render_template
from api.DataCollectorInterface import DataCollector
from api.GoogleTrendsDataCollector import GoogleTrendsDataCollector
import html
import os
from flask_cors import CORS
import pandas as pd
from pandas import DataFrame


def create_app():

    # bør definere api linker slikt
    # @app.route("/api/v1/trends/<string:keyword>")
    # def get_trends(keyword: str):
    #     data_collector: DataCollector = GoogleTrendsDataCollector()
    #     data: List = data_collector.get_data(keyword)
    #     return json.dumps(data)

    app = Flask(__name__)
    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    trending_words_dataframes: List[DataFrame] = []

    def add_dataframe_from_collector(data_collector: DataCollector):
        trending_words_dataframes.append(data_collector.get_trending_words())

    @app.route("/")
    def hello_world():
        return "Hello, World!"

    @app.route("/api/v1/trends")
    def getTrendingWords():
        googleCollector = GoogleTrendsDataCollector()
        print("jhk")
        add_dataframe_from_collector(googleCollector)

        main_data_frame = pd.concat(trending_words_dataframes)

        return main_data_frame.to_json(orient='records')

    if __name__ == "__app__":
        googleCollector = GoogleTrendsDataCollector()
        print("jhk")
        # add_data_collector(googleCollector)

    return app


app = create_app()
