import json
from typing import List
from flask import Flask
from api.DataCollectorInterface import DataCollector
from api.GoogleTrendsDataCollector import GoogleTrendsDataCollector

def create_app():
    app = Flask(__name__)

    #bør definere api linker slikt
    # @app.route("/api/v1/trends/<string:keyword>")
    # def get_trends(keyword: str):
    #     data_collector: DataCollector = GoogleTrendsDataCollector()
    #     data: List = data_collector.get_data(keyword)
    #     return json.dumps(data)


    app = Flask(__name__)

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
        all_trending_words_as_JSON: List[str] = []

        for data_collector in data_collectors:
            for trending_word in data_collector.get_trending_words():
                all_trending_words_as_JSON.append(trending_word.toJSON())
        return json.dumps(all_trending_words_as_JSON)


    if __name__ == "__app__":
        googleCollector = GoogleTrendsDataCollector()
        print("jhk")
        add_data_collector(googleCollector)


    return app

app=create_app()