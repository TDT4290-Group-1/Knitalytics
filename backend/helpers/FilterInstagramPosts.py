from typing import List
import unicodedata as ud
from operator import itemgetter
import re


class FilterInstagramPosts:
    def parse_hashtag_from_posts(
        self, posts: List[str], filteredOutWords: str
    ) -> List[str]:
        captions = self.get_captions(posts)
        return self.parse_hashtag_from_captions(captions, filteredOutWords)

    def parse_hashtag_from_captions(self, captions, filteredOutWords: str) -> List[str]:
        hashtags = self.parse_hashtags_from_captions(captions)
        hashtags = self.__remove_spamhashtags__(hashtags, filteredOutWords)
        hashtags = self.__remove_foreign_languages__(hashtags)
        hashtags = self.__sort_popular_hashtags__(hashtags)

        return hashtags

    # parse all captions from 'posts'

    def parse_hashtags_from_captions(self, captions: List[str]) -> List[str]:
        hashtags = []
        for caption in captions:
            hashtag_list = re.findall(r"#(\w+)", caption)
            hashtags += hashtag_list
        return hashtags

    # remove posts that has less than threshold amount of likes, default 200

    def remove_unpopular_posts(self, posts: List[str], threshold=200) -> List[str]:
        popular_posts: List[str] = []
        for post in posts:
            # try to pass all posts that does not contain a like_count
            try:
                if post["like_count"] > threshold:
                    popular_posts.append(post)
            except Exception:
                pass
        return popular_posts

    # returns url to all 'posts'

    def get_post_url(self, posts: List[str]) -> List[str]:
        post_url = []
        for post in posts:
            post_url.append(post["permalink"])
        return post_url

    # sort the list "posts" after the amount of likes, in descending order

    def sort_posts(self, posts: List[str], sort: str) -> List[str]:
        if sort == "likes":
            # in case some of the posts do not have a like count
            try:
                return sorted(
                    posts, key=itemgetter("like_count"), reverse=True)
            except:
                return posts
        elif sort == "comments":
            return sorted(
                posts, key=itemgetter("comments_count"), reverse=True
            )
        return posts

    # removes hashtags that contains certain words

    def __remove_spamhashtags__(
        self, hashtags: List[str], filteredOutWords: str
    ) -> List[str]:
        filteredOutWords = filteredOutWords.replace(",", "|")
        filteredOutWords = filteredOutWords.replace(" ", "")
        relevant_hashtags = []
        for hashtag in hashtags:
            match = re.search(filteredOutWords, hashtag, re.IGNORECASE)
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

    def __sort_popular_hashtags__(self, hashtags: List[str]) -> List[str]:
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

    # returns all captions from 'posts'

    def get_captions(self, posts: List[str]) -> List[str]:
        captions: List[str] = []
        for post in posts:
            captions.append(post["caption"])
        return captions


# code snippet to find if hashtag is western
latin_letters = {}


def is_latin(uchr):
    try:
        return latin_letters[uchr]
    except KeyError:
        return latin_letters.setdefault(uchr, "LATIN" in ud.name(uchr))


def only_roman_chars(unistr):
    return all(is_latin(uchr) for uchr in unistr if uchr.isalpha())
