from ast import Str
from os import link
from typing import List
import requests
import json


class APIAgent:
    def __init__(self, access_token, user_id) -> None:
        self.base_url = "https://graph.facebook.com/v15.0"
        self.access_token = access_token
        self.user_id = user_id

    # get popular posts from 'query' which must be a hashtag
    def get_posts_from_hashtag(self, id: str, fields: str) -> str:
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "limit": 50,
            "fields": fields,
        }
        endpoint = "/" + id + "/top_media"
        response = requests.get(url=self.base_url + endpoint, params=PARAMS)
        posts: List[str] = json.loads(response.text)["data"]
        return posts

    def get_posts_from_ig_user(self, ig_user) -> str:
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "fields": "business_discovery.username("
            + ig_user
            + "){media{caption, permalink}}",
        }
        endpoint = "/" + self.user_id
        response = requests.get(url=self.base_url + endpoint, params=PARAMS)
        return json.loads(response.text)["business_discovery"]["media"]["data"]

    def get_business_user(self, bus_user) -> str:
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "fields": "business_discovery.username(" + bus_user + "){id}",
        }
        endpoint = "/" + self.user_id
        try:
            response = requests.get(url=self.base_url + endpoint, params=PARAMS)
            return json.loads(response.text)
        except KeyError:
            return json.loads(response.text)

    # returns id of the hashtag specified in query.
    def get_hashtag_id(self, query: str) -> str or dict:
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "q": query,
        }
        endpoint = "/ig_hashtag_search"
        response = requests.get(url=self.base_url + endpoint, params=PARAMS)
        return json.loads(response.text)["data"][0]["id"]
