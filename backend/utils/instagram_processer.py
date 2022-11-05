from typing import List
import unicodedata as ud
from operator import itemgetter
import re


class InstagramProcesser:
    """Helper class with methods used by InstagramDataCollector to parse, filter and sort Instagram posts."""

    def parse_hashtag_from_posts(self, posts: List, filteredOutWords: str) -> List[str]:
        """
        posts: list of Instagram posts
        filteredOutWords: string in format "word1, word2, word3"
        returns: a list of hashtags from the posts the method received
        """
        captions = self._get_captions(posts)
        hashtags = self._parse_filter_captions(captions, filteredOutWords)
        return hashtags

    def get_post_urls(self, posts: List) -> List[str]:
        """
        posts: a list of Instagram posts
        returns: a list of all the urls in 'posts'
        """
        post_urls = []
        for post in posts:
            post_urls.append(post["permalink"])
        return post_urls

    def sort_posts(self, posts: List, sort: str) -> List:
        """
        posts: a list of Instagram posts
        sort: a string which indicates the type of sorting to be done
        returns: a list of sorted posts
        """
        if sort == "likes":
            # in case some of the posts do not have a like count
            try:
                return sorted(posts, key=itemgetter("like_count"), reverse=True)
            except:
                return posts
        elif sort == "comments":
            return sorted(posts, key=itemgetter("comments_count"), reverse=True)
        return posts

    def _parse_filter_captions(
        self, captions: List[str], filteredOutWords: str
    ) -> List[str]:
        """
        captions: a list of captions from multiple posts
        filteredOutWords: string in format "xx, yy, zz"
        returns: a list of filtered and sorted hashtags
        """
        hashtags = self._parse_hashtags_from_captions(captions)
        hashtags = self._remove_spamhashtags(hashtags, filteredOutWords)
        hashtags = self._remove_foreign_languages(hashtags)
        hashtags = self._sort_popular_hashtags(hashtags)

        return hashtags

    def _parse_hashtags_from_captions(self, captions: List[str]) -> List[str]:
        """
        captions: a list of captions from multiple posts
        returns: a list of hashtags
        """
        hashtags = []
        for caption in captions:
            hashtag_list = re.findall(r"#(\w+)", caption)
            hashtags += hashtag_list
        return hashtags

    def _remove_spamhashtags(
        self, hashtags: List[str], filteredOutWords: str
    ) -> List[str]:
        """
        hashtags: a list of hashtags
        filteredOutWords: string in format "xx, yy, zz"
        returns: a list of hashtags with no spam hashtags
        """
        filteredOutWords = filteredOutWords.replace(",", "|")
        filteredOutWords = filteredOutWords.replace(" ", "")
        relevant_hashtags = []
        for hashtag in hashtags:
            match = re.search(filteredOutWords, hashtag, re.IGNORECASE)
            if match is None:
                relevant_hashtags.append(hashtag)
        return relevant_hashtags

    def _remove_foreign_languages(self, hashtags: List[str]) -> List[str]:
        """
        hashtags: a list of hashtags
        returns: a list of hashtags with only roman languages
        """
        roman_hashtags = []
        for hashtag in hashtags:
            if only_roman_chars(hashtag):
                roman_hashtags.append(hashtag)
        return roman_hashtags

    def _sort_popular_hashtags(self, hashtags: List[str]) -> List[str]:
        """
        hashtags: a list of hashtags
        returns: a list of hashtags sorted after frequency of usage
        """
        popular_hashtags_count = {}
        popular_hashtags = []
        for hashtag in hashtags:
            if hashtag not in popular_hashtags:
                popular_hashtags.append(hashtag)
                popular_hashtags_count[hashtag] = 1
            else:
                popular_hashtags_count[hashtag] += 1
        sorted_hashtags = sorted(
            popular_hashtags_count, key=popular_hashtags_count.get, reverse=True
        )
        return sorted_hashtags

    def _get_captions(self, posts: List) -> List[str]:
        """
        posts: a list of Instagram posts
        retunrs: a list of all captions in 'posts'
        """
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
