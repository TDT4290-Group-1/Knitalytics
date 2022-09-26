import json
from typing import List
from models.trending_word import TrendingWord
from flask import Flask, jsonify, render_template
from api.DataCollectorInterface import DataCollector
from api.GoogleTrendsDataCollector import GoogleTrendsDataCollector
import html
import os
from flask_cors import CORS


def create_app():

    # bør definere api linker slikt
    # @app.route("/api/v1/trends/<string:keyword>")
    # def get_trends(keyword: str):
    #     data_collector: DataCollector = GoogleTrendsDataCollector()
    #     data: List = data_collector.get_data(keyword)
    #     return json.dumps(data)

    app = Flask(__name__)
    CORS(app)

    data_collectors: List[DataCollector] = []

    def add_data_collector(data_collector: DataCollector):
        data_collectors.append(data_collector)

    @app.route("/")
    def hello_world():
        return "Hello, World!"

    @app.route("/api/v1/trends")
    def getTrendingWords():
        googleCollector = GoogleTrendsDataCollector()
        print("jhk")
        add_data_collector(googleCollector)
        all_trending_words: List[TrendingWord] = []

# TODO: FIX THIS
        for data_collector in data_collectors:
            for trending_word in data_collector.get_trending_words():
                # print(trending_word.to_json())
                print(trending_word.to_)
                all_trending_words.append(trending_word)
                # print(all_trending_words_as_JSON)
        print("HEER")
        print(all_trending_words)
        return data_collectors[0].get_trending_words()

    if __name__ == "__app__":
        googleCollector = GoogleTrendsDataCollector()
        print("jhk")
        add_data_collector(googleCollector)

    return app


app = create_app()
