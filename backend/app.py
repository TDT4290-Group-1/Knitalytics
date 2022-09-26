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
    app = Flask(__name__)

    #bør definere api linker slikt
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

        for data_collector in data_collectors:
            for trending_word in data_collector.get_trending_words():
                # print(trending_word.strip())
                # print("KKKK", trending_word)
                # print("KKKK", trending_word.frequency_growth)
                # print("KKKK", trending_word.search_count)
                all_trending_words.append(trending_word)
                # print(all_trending_words_as_JSON)
        print(all_trending_words[0])
        # return render_template('index.html', title="page", jsonfile=json.dumps(all_trending_words[0].toJSON()))
        # return render_template('/index.html', all_trending_words=all_trending_words)
        return jsonify(word = all_trending_words[0].word, frequency_growth = all_trending_words[0].frequency_growth, search_count = all_trending_words[0].search_count)


    if __name__ == "__app__":
        googleCollector = GoogleTrendsDataCollector()
        print("jhk")
        add_data_collector(googleCollector)


    return app

app=create_app()