from urllib import response
from helpers.FilterInstagramPosts import FilterInstagramPosts
from helpers.APIAgent import APIAgent
from api.DataCollectorInterface import DataCollector
import helpers.FilterInstagramPosts as hlp

from os import link
from typing import List


class InstagramCollector(DataCollector):
    def __init__(self, access_token, user_id) -> None:
        self.access_token = access_token
        self.APIAgent = APIAgent(access_token, user_id)
        self.hlp = FilterInstagramPosts()
        self.user_id = user_id

    # returns a list of 'amount' most popular hashtags co-appearing with 'query'
    def get_related_hashtags(
        self, query: str, filteredOutWords, amount: int = 20
    ) -> List[str]:
        query = query.replace(" ", "")
        self.query = query
        response_text = self.APIAgent.get_hashtag_id("hellooooo")
        if next(iter(response_text)) == "error":
            # returns a string
            return response_text["error"]["error_user_title"]
        # do a check here
        id = response_text["data"][0]["id"]
        response_text = self.APIAgent.get_posts_from_hashtag(
            id, "like_count, caption")
        # do a check here
        hashtags = self.hlp.parse_hashtag_from_posts(
            response_text["data"], "knit, strik")[:amount]
        return hashtags  # returns a list

    def get_hashtags_business_users(self, ig_users=["knittingforolive"]) -> List[str]:
        captions: List[str] = []
        for ig_user in ig_users:
            caption = self.APIAgent.get_caption_from_ig_user(
                ig_user)["business_discovery"]["media"]["data"]["caption"]
            captions.append(caption)
        hashtags = self.hlp.parse_hashtag_from_captions(captions)
        return hashtags

        # returns links to popular posts related to 'query
    def get_related_posts(self, query: str, amount: int = 9) -> List[str]:
        response_text = self.APIAgent.get_hashtag_id(query)
        if next(iter(response_text)) == "error":
            return response_text  # returns a dict
        id = response_text["data"][0]["id"]
        response_text2 = self.APIAgent.get_posts_from_hashtag(
            id, "like_count, permalink")
        if next(iter(response_text2)) == "error":
            return response_text["error"]["error_user_title"]  # returns a dict
        posts = posts["data"]
        posts = self.hlp.remove_unpopular_posts(posts)
        post_url = self.hlp.get_post_url(posts)
        return post_url[amount]  # returns a list
