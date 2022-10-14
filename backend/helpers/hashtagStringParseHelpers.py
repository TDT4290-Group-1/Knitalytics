from models.trending_post import TrendingPost
from models.trending_word import TrendingWord

from typing import List
import unicodedata as ud
import re


def parse_and_filter_hashtag_from_posts(
    posts: List[TrendingPost], filteredOutWords: str
) -> List[str]:
    captions = get_captions(posts)

    return parse_and_filter_hashtag_from_captions(captions, filteredOutWords)


def parse_and_filter_hashtag_from_captions(
    captions, filteredOutWords: str
) -> List[str]:
    hashtags = parse_hashtags_from_captions(captions)
    hashtags = remove_hashtags(hashtags, filteredOutWords)
    hashtags = remove_foreign_languages(hashtags)
    hashtags = sort_popular_hashtags(hashtags)

    return hashtags


# remove posts that has less than threshold amount of likes, default 200


def remove_unpopular_posts(
    posts: List[TrendingPost], threshold=200
) -> List[TrendingPost]:
    popular_posts: List[TrendingPost] = []
    for post in posts:
        # try to pass all posts that does not contain a like_count
        try:
            if post["like_count"] > threshold:
                popular_posts.append(post)
        except Exception:
            pass
    return popular_posts


# returns all captions from 'posts'


def get_captions(posts: List[TrendingPost]) -> List[str]:
    captions: List[str] = []
    for post in posts:
        captions.append(post["caption"])
    return captions


# returns permalink to all 'posts'


def get_post_permalink(posts: List[TrendingPost]) -> List[str]:
    post_permalink = []
    for post in posts:
        post_permalink.append(post["permalink"])
    return post_permalink


# parse all captions from 'posts'


def parse_hashtags_from_captions(captions: List[str]) -> List[str]:
    hashtags = []
    for caption in captions:
        hashtag_list = re.findall(r"#(\w+)", caption)
        hashtags += hashtag_list
    return hashtags


# removes hashtags that contains certain words


def remove_hashtags(hashtags: List[str], filteredOutWords: str) -> List[str]:
    filteredOutWords = filteredOutWords.replace(",", "|")
    filteredOutWords = filteredOutWords.replace(" ", "")
    relevant_hashtags = []
    for hashtag in hashtags:
        match = re.search(filteredOutWords, hashtag, re.IGNORECASE)
        if match == None:
            relevant_hashtags.append(hashtag)
    return relevant_hashtags


# removes all hashtags with non-latin/germanic letters


def remove_foreign_languages(hashtags: List[str]) -> List[str]:
    roman_hashtags = []
    for hashtag in hashtags:
        if only_roman_chars(hashtag):
            roman_hashtags.append(hashtag)
    return roman_hashtags


# sorts the hashtags after popularity, most popular first


def sort_popular_hashtags(hashtags: List[str]) -> List[str]:
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


# code snippet to find if hashtag is western
latin_letters = {}


def is_latin(uchr):
    try:
        return latin_letters[uchr]
    except KeyError:
        return latin_letters.setdefault(uchr, "LATIN" in ud.name(uchr))


def only_roman_chars(unistr):
    return all(is_latin(uchr) for uchr in unistr if uchr.isalpha())
