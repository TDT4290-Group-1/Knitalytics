from os import link
from typing import List
from models.trending_post import TrendingPost
from models.trending_word import TrendingWord
from api.DataCollectorInterface import DataCollector
import requests
import json
from typing import List
import re
import unicodedata as ud

raw_data = """word;frequency_growth;search_count
Australian dreams;1.4;1000
Old knit sweater;3.4;100
asdsad;9.4;10"""

# code snippet to find if hashtag is western
latin_letters = {}


def is_latin(uchr):
    try:
        return latin_letters[uchr]
    except KeyError:
        return latin_letters.setdefault(uchr, "LATIN" in ud.name(uchr))


def only_roman_chars(unistr):
    return all(is_latin(uchr) for uchr in unistr if uchr.isalpha())


class InstagramCollector(DataCollector):
    def __init__(self, access_token, user_id) -> None:
        self.base_url = "https://graph.facebook.com/v15.0"
        self.access_token = access_token
        self.user_id = user_id

    def get_related_hashtags(self, query: str) -> List[str]:
        query = query.replace(" ", "")
        posts = self.__get_posts__(query, "like_count, caption")
        posts = self.__remove_unpopular_posts__(posts)
        captions = self.__get_captions__(posts)
        hashtags = self.__parse_hashtags_from_captions__(captions)
        hashtags = self.__remove_irrelevant_hashtags__(hashtags)
        hashtags = self.__remove_foreign_languages__(hashtags)
        return hashtags

    def get_related_posts(self, query: str) -> List[str]:
        posts = self.__get_posts__(query, "like_count, caption, permalink")
        posts = self.__remove_unpopular_posts__(posts)
        post_url = self.__get_post_url__(posts)
        return post_url

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

    # get all posts
    def __get_posts__(self, query: str, fields: str) -> str:
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
            return posts
        except requests.exceptions.RequestException as e:  # This is the correct syntax
            raise SystemExit(e)

    # remove posts that has less than 200 likes
    def __remove_unpopular_posts__(
        self, posts: List[TrendingPost]
    ) -> List[TrendingPost]:
        popular_posts: List[TrendingPost] = []
        for post in posts:
            # try to pass all posts that does not contain a like_count
            try:
                if post["like_count"] > 200:
                    popular_posts.append(post)
            except Exception:
                pass
        return popular_posts

    # Parse all captions from posts
    def __get_captions__(self, posts: List[TrendingPost]) -> List[str]:
        captions: List[str] = []
        for post in posts:
            captions.append(post["caption"])
        return captions

    def __get_post_url__(self, posts: List[TrendingPost]) -> List[str]:
        post_url = []
        for post in posts:
            post_url.append(post["permalink"])
        return post_url

    def __parse_hashtags_from_captions__(self, captions: List[str]) -> List[str]:
        hashtags = []
        for caption in captions:
            hashtag_list = re.findall(r"#(\w+)", caption)
            hashtags += hashtag_list
        return hashtags

    def __remove_irrelevant_hashtags__(self, hashtags: List[str]) -> List[str]:
        relevant_hashtags = []
        for hashtag in hashtags:
            match = re.search(
                "knit|strik|love|insp|addict|insta|Knit|Insta|Strick|strick|gram|desig|fash",
                hashtag,
            )
            if match == None:
                relevant_hashtags.append(hashtag)
        return relevant_hashtags

    def __remove_foreign_languages__(self, hashtags: List[str]) -> List[str]:
        roman_hashtags = []
        for hashtag in hashtags:
            if only_roman_chars(hashtag):
                roman_hashtags.append(hashtag)
        return roman_hashtags

    # TODO
    def __sort_popular_hashtags(self, hashtags: List[str]) -> List[str]:
        print()
