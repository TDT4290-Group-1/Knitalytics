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
        id = self.APIAgent.get_hashtag_id("knitting")
        posts = self.APIAgent.get_posts_from_hashtag(id, "like_count, caption")
        return self.hlp.parse_hashtag_from_posts(posts, filteredOutWords)[:amount]

    def get_hashtags_business_users(self, ig_users=["knittingforolive"]) -> List[str]:
        captions: List[str] = []
        for ig_user in ig_users:
            posts = self.APIAgent.get_posts_from_ig_user(ig_user)
            captions.append(self.hlp.get_captions)
        return self.hlp.parse_hashtag_from_captions(captions)

        # returns links to popular posts related to 'query

    def get_related_posts(self, query: str, amount: int = 9) -> List[str]:
        id = self.APIAgent.get_hashtag_id(query)
        posts = self.APIAgent.get_posts_from_hashtag(id, "like_count, permalink")
        posts = self.hlp.remove_unpopular_posts(posts)
        post_url = self.hlp.get_post_url(posts)
        return post_url[:amount]

    def get_business_post_urls(self, ig_users) -> List[str]:
        post_urls: List[str] = []
        for ig_user in ig_users:
            posts = self.APIAgent.get_posts_from_ig_user(ig_user)
            post_urls += self.hlp.get_post_url(posts[:5])
        return post_urls
