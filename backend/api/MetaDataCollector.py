from typing import List
from models.trending_post import TrendingPost
from models.trending_word import TrendingWord
from api.DataCollectorInterface import DataCollector
import requests
import json
from typing import List

raw_data = """word;frequency_growth;search_count
Australian dreams;1.4;1000
Old knit sweater;3.4;100
asdsad;9.4;10"""


class MetaDataCollector(DataCollector):
    def __init__(self, access_token, user_id) -> None:
        self.base_url = "https://graph.facebook.com/v15.0"
        self.access_token = access_token
        self.user_id = user_id

    # Method used by the endpoint to get the trending words. Returns a list of TrendingWord objects.
    def get_trending_words(self) -> List[TrendingWord]:
        return self.__get_trending_posts__("knitting", "like_count, caption")

    # Method to get id of the hashtag specified in query. Returns the id as a string.
    def __get_hashtag_id__(self, query: str) -> str:
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "q": query,
        }
        endpoint = "/ig_hashtag_search"
        try:
            response = requests.get(url=self.base_url + endpoint, params=PARAMS)
            return json.loads(response.text)["data"][0]["id"]
        except requests.exceptions.RequestException as e:  # This is the correct syntax
            raise SystemExit(e)

    # Method to find trending posts of a certain hashtag. Returns as.
    def __get_trending_posts__(self, query: str, fields: str) -> str:
        id = self.__get_hashtag_id__(query)
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "fields": fields,
        }
        endpoint = "/" + id + "/top_media"
        try:
            response = requests.get(url=self.base_url + endpoint, params=PARAMS)
            return self.__parse_hashtags_from_posts__(json.loads(response.text)["data"])
        except requests.exceptions.RequestException as e:  # This is the correct syntax
            raise SystemExit(e)

    def __parse_hashtags_from_posts__(self, posts: List[TrendingPost]):
        hashtags = []
        for post in posts:
            strings = post["caption"].strip().split("#")[1:]
            hashtags += strings

        print(hashtags)
        return hashtags
