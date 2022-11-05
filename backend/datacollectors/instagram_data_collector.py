from utils.instagram_processer import InstagramProcesser
from utils.instagram_api_agent import InstagramAPIAgent
from typing import List


class InstagramDataCollector:
    """Handles the connection between the api endpoint (app.py), the fetching of data from the Instagram Graph API (instagram_api_agent.py) and processing of the data (instagram_processer.py)"""

    def __init__(self, access_token: str, user_id: str) -> None:
        self.access_token = access_token
        self.APIAgent = InstagramAPIAgent(access_token, user_id)
        self.hlp = InstagramProcesser()
        self.user_id = user_id

    def get_related_hashtags(
        self, query: str, filteredOutWords: str, amount: int = 20
    ) -> List[str] or dict:
        """
        query: an Instagram hashtag
        filteredOutWords: a string of words to be filtered out of the result. Format: "word1, word2, word3"
        amount: amount of hashtags to be returned
        returns: a list of most popular hashtags co-appearing with 'query'. An error object if something goes wrong
        """
        query = query.replace(" ", "")
        self.query = query
        id = self.APIAgent.get_hashtag_id(query)
        # check if the id was succesfully retrieved
        if type(id) is str:
            posts = self.APIAgent.get_posts_from_hashtag(id, "like_count, caption")
            # check if the posts were succesfully retrieved
            if type(posts) is not str:
                return self.hlp.parse_hashtag_from_posts(posts, filteredOutWords)[
                    :amount
                ]
            # this will be an error message
            return posts
        # this will be an error message
        return id

    def get_related_post_urls(self, query: str, amount: int = 10) -> List[str] or dict:
        """
        query: an Instagram hashtag
        amount: amount of post urls to be returned
        returns: a list of post urls. An error object if something goes wrong
        """
        query = query.replace(" ", "")
        self.query = query
        id = self.APIAgent.get_hashtag_id(query)
        # check if the id was succesfully retrieved
        if type(id) is str:
            posts = self.APIAgent.get_posts_from_hashtag(id, "like_count, permalink")
            # check if the posts were succesfully retrieved
            if type(posts) is not str:
                post_urls = self.hlp.get_post_urls(posts)
                return post_urls[:amount]
            # this will be an error message
            return posts
        # this will be an error message
        return id

    def get_users_post_urls(
        self, ig_users: List[str], sort: str = "user", post_amount: int = 10
    ) -> List[str]:
        """
        ig_users: a list of Instagram usernames
        sort: a string which indicates the type of sorting to be done
        post_amount: the amount of posts to be returned by each Instagram user
        returns: a list of posts urls
        """
        all_posts = []
        post_urls = []
        for ig_user in ig_users:
            posts = self.APIAgent.get_posts_from_ig_user(ig_user)[: int(post_amount)]
            # if posts is str means it's an error message
            if type(posts) is not str:
                all_posts += posts
        all_posts = self.hlp.sort_posts(all_posts, sort)
        post_urls = self.hlp.get_post_urls(all_posts)
        return post_urls

    def get_business_user(self, business_user: str):
        """
        business_user: the username of an Instagram user
        returns: An object with the business users id or an error object
        """
        return self.APIAgent.get_business_user(business_user)

    def get_hashtag_id(self, hashtag: str) -> str or dict:
        """
        hashtag: an Instagram hashtag
        returns: the id of the hashtag. An error object if the hashtag does not exist
        """
        return self.APIAgent.get_hashtag_id(hashtag)
