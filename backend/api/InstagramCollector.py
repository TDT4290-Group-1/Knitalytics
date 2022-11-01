from helpers.FilterInstagramPosts import FilterInstagramPosts
from helpers.APIAgent import APIAgent
from api.DataCollectorInterface import DataCollector

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
        id = self.APIAgent.get_hashtag_id(query)
        if type(id) is str:
            posts = self.APIAgent.get_posts_from_hashtag(id, "like_count, caption")
            if type(posts) is not str:
                return self.hlp.parse_hashtag_from_posts(posts, filteredOutWords)[
                    :amount
                ]
            # this will be an error message
            return posts
        # this will be an error message
        return id

    def get_hashtags_business_users(self, ig_users, filteredOutWords) -> List:
        captions: List[str] = []
        for ig_user in ig_users:
            posts = self.APIAgent.get_posts_from_ig_user(ig_user)
            if type(posts) is not str:
                captions += self.hlp.get_captions(posts)
                return self.hlp.parse_hashtag_from_captions(captions, filteredOutWords)
        # returns links to popular posts related to 'query

    def get_related_post_urls(self, query: str, amount: int = 10) -> List:
        query = query.replace(" ", "")
        self.query = query
        id = self.APIAgent.get_hashtag_id(query)
        if type(id) is str:
            posts = self.APIAgent.get_posts_from_hashtag(id, "like_count, permalink")
            if type(posts) is not str:
                post_url = self.hlp.get_post_url(posts)
                return post_url[:amount]
            # this will be an error message
            return posts
        # this will be an error message
        return id

    def get_business_post_urls(self, ig_users, sort="user", post_amount=10) -> List:
        posts = []
        for ig_user in ig_users:
            posts += self.APIAgent.get_posts_from_ig_user(ig_user)[: int(post_amount)]
            if type(posts) is str:
                # this is an error message
                return posts
        posts = self.hlp.sort_posts(posts, sort)
        post_urls = self.hlp.get_post_url(posts)
        return post_urls

    def get_business_user(self, bus_user) -> str:
        return self.APIAgent.get_business_user(bus_user)

    def get_hashtag_id(self, hashtag) -> str:
        return self.APIAgent.get_hashtag_id(hashtag)
