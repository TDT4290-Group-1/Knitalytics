from typing import List
import requests
import json


class InstagramAPIAgent:
    """Helper class which handles all requests to the Instagram Graph API."""

    def __init__(self, access_token, user_id) -> None:
        self.base_url = "https://graph.facebook.com/v15.0"
        self.access_token = access_token
        self.user_id = user_id

    def get_posts_from_hashtag(self, id: str, fields: str) -> List:
        """
        id: the id of the hashtag to get posts from
        fields: which fields each media object should return. Examples: permalink, like_count, comments_count
        returns: a list of Instagram post objects
        """
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "limit": 50,
            "fields": fields,
        }
        endpoint = "/" + id + "/top_media"
        response = requests.get(url=self.base_url + endpoint, params=PARAMS)
        try:
            posts: List[str] = json.loads(response.text)["data"]
            return posts
        except:
            return json.loads(response.text)

    def get_posts_from_ig_user(self, ig_user: str) -> str:
        """
        ig_user: a string with the username of an Instagram user
        returns: all posts from the given Instagram user
        """
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "fields": "business_discovery.username("
            + ig_user
            + "){media{like_count, comments_count, permalink}}",
        }
        endpoint = "/" + self.user_id
        response = requests.get(url=self.base_url + endpoint, params=PARAMS)
        try:
            return json.loads(response.text)["business_discovery"]["media"]["data"]
        except:
            return json.loads(response.text)

    def get_business_user(self, business_user: str) -> str:
        """
        business_user: the username of an Instagram user
        returns: the id of the given Instagram user
        """
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "fields": "business_discovery.username(" + business_user + "){id}",
        }
        endpoint = "/" + self.user_id
        try:
            response = requests.get(
                url=self.base_url + endpoint, params=PARAMS)
            return json.loads(response.text)
        except KeyError:
            return json.loads(response.text)

    def get_hashtag_id(self, query: str) -> str or dict:
        """
        query: a hashtag
        returns: the id of the hashtag. If it does not exist, it will return an error object
        """
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "q": query,
        }
        endpoint = "/ig_hashtag_search"
        try:
            response = requests.get(
                url=self.base_url + endpoint, params=PARAMS)
            return json.loads(response.text)["data"][0]["id"]
        except KeyError:
            return json.loads(response.text)
