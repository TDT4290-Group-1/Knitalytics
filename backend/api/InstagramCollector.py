from models.trending_post import TrendingPost
from models.trending_word import TrendingWord
from api.DataCollectorInterface import DataCollector
import helpers.hashtagStringParseHelpers as hlp

from os import link
from typing import List
import requests
import json


class InstagramCollector(DataCollector):
    def __init__(self, access_token, user_id) -> None:
        self.base_url = "https://graph.facebook.com/v15.0"
        self.access_token = access_token
        self.user_id = user_id
        self.query = ""

    # returns a list of 20 most popular hashtags co-appearing with 'query'
    def get_related_hashtags(
        self, query: str, filteredOutWords, amount: int = 20
    ) -> List[str]:
        query = query.replace(" ", "")
        self.query = query
        posts = self.__get_posts_from_hashtag__(query, "like_count, caption")
        return hlp.parse_and_filter_hashtag_from_posts(posts, filteredOutWords)[:amount]

    def get_hashtags_business_users(self) -> List[TrendingWord]:
        captions = self.__get_captions_from_ig_users__()
        return hlp.parse_and_filter_hashtag_from_captions(captions)

    def __get_caption_from_ig_user(self, ig_user) -> TrendingPost:
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "fields": "business_discovery.username(" + ig_user + "){media{caption}}",
        }
        endpoint = "/" + self.user_id

        try:
            response_promise = requests.get(url=self.base_url + endpoint, params=PARAMS)
            response = json.loads(response_promise.text)
            if "error" in response:
                raise ValueError(response["error"]["message"])
            return response["business_discovery"]["media"]["data"]["caption"]

        except requests.exceptions.RequestException as e:  # This is the correct syntax
            raise SystemExit(e)

    # Business discovery of ig_users, returns captions of recent media from ig_users, ig_users must be instagram professionals, or else id error
    def __get_captions_from_ig_users__(
        self, ig_users=["knittingforolive"]
    ) -> List[str]:
        captions: List[str] = []
        for ig_user in ig_users:
            captions.append(self.__get_caption_from_ig_user(ig_user))
        return captions

    # Method to get id of the hashtag specified in query. Returns the id as a string.
    # returns links to popular posts related to 'query
    def get_related_posts(self, query: str, amount: int = 9) -> List[str]:
        self.query = query
        posts = self.__get_posts_from_hashtag__(query, "like_count, permalink")
        posts = hlp.remove_unpopular_posts(posts)
        post_url = hlp.get_post_permalink(posts)
        return post_url[amount]

    # get popular posts from 'query' which must be a hashtag
    def __get_posts_from_hashtag__(self, query: str, fields: str) -> str:
        id = self.__get_hashtag_id__(query)
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "limit": 50,
            "fields": fields,
        }
        endpoint = "/" + id + "/top_media"
        try:
            response = requests.get(url=self.base_url + endpoint, params=PARAMS)

            posts: List[TrendingPost] = json.loads(response.text)["data"]
            return posts
        except requests.exceptions.RequestException as e:  # This is the correct syntax
            raise SystemExit(e)

    # returns id of the hashtag specified in query.
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
