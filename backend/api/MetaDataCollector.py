from typing import List
from models.trending_word import TrendingWord
from api.DataCollectorInterface import DataCollector
import requests
import json

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
        return self.__get_hashtag_id__("knitting")

    def __get_hashtag_id__(self, query: str) -> str:
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "q": query,
        }
        endpoint = "/ig_hashtag_search"
        response = requests.get(url=self.base_url + endpoint, params=PARAMS)
        if response.status_code == 200:
            response_text = response.text
            return json.loads(response_text)["data"][0]["id"]
        else:
            
