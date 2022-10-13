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

# code snippet to find if hashtag is western
latin_letters = {}


def is_latin(uchr):
    try:
        return latin_letters[uchr]
    except KeyError:
        return latin_letters.setdefault(uchr, "LATIN" in ud.name(uchr))


def only_roman_chars(unistr):
    return all(is_latin(uchr) for uchr in unistr if uchr.isalpha())


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
        self.query = ""

    # returns a list of 20 most popular hashtags co-appearing with 'query'
    def get_related_hashtags(self, query: str, filteredOutWords: str) -> List[str]:
        query = query.replace(" ", "")
        self.query = query
        posts = self.__get_posts__(query, "like_count, caption")
        captions = self.__get_captions__(posts)
        hashtags = self.__parse_hashtags_from_captions__(captions)
        hashtags = self.__remove_irrelevant_hashtags__(
            hashtags, filteredOutWords)
        hashtags = self.__remove_foreign_languages__(hashtags)
        hashtags = self.__sort_popular_hashtags(hashtags)
        # return 20 most popular hashtags
        return hashtags[0:20]

    def get_hashtags_business_users(self, business_users=None) -> List[TrendingWord]:
        captions = self.__get_captions_from_ig_users__()
        hashtags = self.__parse_hashtags_from_captions__(captions)
        hashtags = self.__remove_irrelevant_hashtags__(hashtags)
        hashtags = self.__remove_foreign_languages__(hashtags)
        return hashtags

    # Business discovery of ig_users, returns captions of recent media from ig_users, ig_users must be instagram professionals, or else id error
    def __get_captions_from_ig_users__(
        self, ig_users=["knittingforolive"]
    ) -> List[str]:
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
        }
        endpoint = "/" + self.user_id

        captions: List[str] = []
        for ig_user in ig_users:
            PARAMS["fields"] = (
                "business_discovery.username(" + ig_user + "){media{caption}}"
            )
            try:
                response_promise = requests.get(
                    url=self.base_url + endpoint, params=PARAMS
                )
                response = json.loads(response_promise.text)
                if "error" in response:
                    raise ValueError(response["error"]["message"])
                posts: List[TrendingPost] = response["business_discovery"]["media"][
                    "data"
                ]
                for post in posts:
                    captions.append(post["caption"])

            except requests.exceptions.RequestException as e:  # This is the correct syntax
                raise SystemExit(e)

        return captions

    # Method to get id of the hashtag specified in query. Returns the id as a string.
    # returns link to popular posts related to 'query
    def get_related_posts(self, query: str) -> List[str]:
        self.query = query
        posts = self.__get_posts__(query, "like_count, permalink")
        posts = self.__remove_unpopular_posts__(posts)
        post_url = self.__get_post_url__(posts)
        return post_url[0:9]

    # returns id of the hashtag specified in query.
    def __get_hashtag_id__(self, query: str) -> str:
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
        except requests.exceptions.RequestException as e:  # This is the correct syntax
            raise SystemExit(e)

    # get popular posts from 'query'
    def __get_posts__(self, query: str, fields: str) -> str:
        id = self.__get_hashtag_id__(query)
        PARAMS = {
            "access_token": self.access_token,
            "user_id": self.user_id,
            "limit": 50,
            "fields": fields,
        }
        endpoint = "/" + id + "/top_media"
        try:
            response = requests.get(
                url=self.base_url + endpoint, params=PARAMS)

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

    # returns all captions from 'posts'
    def __get_captions__(self, posts: List[TrendingPost]) -> List[str]:
        captions: List[str] = []
        for post in posts:
            captions.append(post["caption"])
        return captions

    # returns url to all 'posts'
    def __get_post_url__(self, posts: List[TrendingPost]) -> List[str]:
        post_url = []
        for post in posts:
            post_url.append(post["permalink"])
        return post_url

    # parse all captions from 'posts'
    def __parse_hashtags_from_captions__(self, captions: List[str]) -> List[str]:
        hashtags = []
        for caption in captions:
            hashtag_list = re.findall(r"#(\w+)", caption)
            hashtags += hashtag_list
        return hashtags

    # removes hashtags that contains certain words
    def __remove_irrelevant_hashtags__(self, hashtags: List[str], filteredOutWords: str) -> List[str]:
        relevant_hashtags = []
        filteredOutWords = filteredOutWords.replace(",", "|")
        filteredOutWords = filteredOutWords.replace(" ", "")
        for hashtag in hashtags:
            match = re.search(
                filteredOutWords
                + self.query,
                hashtag,
            )
            if match == None:
                relevant_hashtags.append(hashtag)
        return relevant_hashtags

    # removes all hashtags with non-latin/germanic letters
    def __remove_foreign_languages__(self, hashtags: List[str]) -> List[str]:
        roman_hashtags = []
        for hashtag in hashtags:
            if only_roman_chars(hashtag):
                roman_hashtags.append(hashtag)
        return roman_hashtags

    # sorts the hashtags after popularity, most popular first
    def __sort_popular_hashtags(self, hashtags: List[str]) -> List[str]:
        popular_hashtags_count = {}
        popular_hashtags = []
        for hashtag in hashtags:
            if hashtag not in popular_hashtags:
                popular_hashtags.append(hashtag)
                popular_hashtags_count[hashtag] = 1
            else:
                popular_hashtags_count[hashtag] += 1
        popular_hashtags_count = sorted(
            popular_hashtags_count, key=popular_hashtags_count.get, reverse=True
        )
        return popular_hashtags_count
