from typing import List
from models.trending_post import TrendingPost
from models.trending_word import TrendingWord
from api.DataCollectorInterface import DataCollector
import requests
import json
from typing import List
import re
import unicodedata

raw_data = """word;frequency_growth;search_count
Australian dreams;1.4;1000
Old knit sweater;3.4;100
asdsad;9.4;10"""


class InstagramCollector(DataCollector):
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
            
            posts: List[TrendingPost] = json.loads(response.text)["data"]
            captions: List[str] = []
            for post in posts:
                captions.append(post["caption"])

            return self.__parse_hashtags_from_captions__(captions)
        except requests.exceptions.RequestException as e:  # This is the correct syntax
            raise SystemExit(e)

    def __parse_hashtags_from_captions__(self, captions: List[str]) -> List[str]:
        hashtags = []
        for caption in captions:
            hashtag_list = re.findall("#(\w+)", caption)
            hashtags += hashtag_list
        return self.__remove_irrelevant_hashtags__(hashtags)

    def __remove_irrelevant_hashtags__(self, hashtags: List[str]) -> List[str]:
        relevant_hashtags = []
        for hashtag in hashtags:
            # "tilfeldig" valgte ord for åprøve
            match = re.search("(knit)", hashtag)
            match_2 = re.search("(strik)", hashtag)
            match_3 = re.search("(love)", hashtag)
            match_4 = re.search("(insp)", hashtag)
            match_5 = re.search("(addict)", hashtag)
            match_6 = re.search("(insta)", hashtag)
            if (
                match == None
                and match_2 == None
                and match_3 == None
                and match_4 == None
                and match_5 == None
                and match_6 == None
            ):
                relevant_hashtags.append(hashtag)
        return relevant_hashtags

    def __unicode_to_ascii__(self, hashtags: List[str]) -> List[str]:
        print()
        # æ, ø og å feks blir dekodet til unicode (\u005 = å). Må dekodet dette tilbake til ascii bokstaver

    def __remove_foreign_languages__(self, hashtags: List[str]) -> List[str]:
        print()
        # noen hashtags er på kinesisk, russisk etc. Fjern alle s hashtags om har ikke-latinske bokstaver i seg.
