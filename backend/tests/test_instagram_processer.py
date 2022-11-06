from utils.instagram_processer import InstagramProcesser


insta_post1 = {
    "caption": "jeg liker å strikke #hei #likethis #knitting #instalove",
    "permalink": "https://www.instagram.com/p/Ckd7AkAMjUH/",
    "like_count": 1600,
    "comments_count": 1400,
}

insta_post2 = {
    "caption": "here is my knitting #instalove #hei #strikkedilla",
    "permalink": "https://www.instagram.com/p/Ckd7AkAMjUH/",
    "like_count": 800,
    "comments_count": 1500,
}

insta_post3 = {
    "caption": "#相信我",
    "permalink": "https://www.instagram.com/p/Ckd7AkAMjUH/",
    "like_count": 100,
    "comments_count": 300,
}

insta_post4 = {
    "caption": "look at my new sweater! #newsweater #holzweiler #hei #likethis",
    "permalink": "https://www.instagram.com/p/Ckd7AkAMjUH/",
    "like_count": 200,
    "comments_count": 5,
}


class TestInstagramProcesser:
    insta_pro = InstagramProcesser()
    insta_posts = []
    captions = [
        "jeg liker å strikke #hei #likethis #knitting #instalove",
        "here is my knitting #instalove #hei #strikkedilla",
        "#相信我",
        "look at my new sweater! #newsweater #holzweiler #hei #likethis",
    ]
    insta_posts.append(insta_post1)
    insta_posts.append(insta_post2)
    insta_posts.append(insta_post3)
    insta_posts.append(insta_post4)
    print(insta_posts)
    filteredOutWords = "knit, strik, insta"
    all_hashtags = [
        "hei",
        "likethis",
        "knitting",
        "instalove",
        "instalove",
        "hei",
        "strikkedilla",
        "相信我",
        "newsweater",
        "holzweiler",
        "hei",
        "likethis",
    ]

    def test_parse_hashtag_from_posts(self):
        parse_hashtag = self.insta_pro.parse_hashtag_from_posts(
            self.insta_posts, self.filteredOutWords
        )
        assert parse_hashtag == ["hei", "likethis", "newsweater", "holzweiler"]

    def test_parse_filter_captions(self):
        hashtags = self.insta_pro._parse_filter_captions(
            self.captions, self.filteredOutWords
        )
        assert hashtags == ["hei", "likethis", "newsweater", "holzweiler"]

    def test_get_post_url(self):
        urls = self.insta_pro.get_post_urls(self.insta_posts)
        assert urls == [
            "https://www.instagram.com/p/Ckd7AkAMjUH/",
            "https://www.instagram.com/p/Ckd7AkAMjUH/",
            "https://www.instagram.com/p/Ckd7AkAMjUH/",
            "https://www.instagram.com/p/Ckd7AkAMjUH/",
        ]

    def test_sort_posts_likes(self):
        sorted_posts = self.insta_pro.sort_posts(self.insta_posts, "likes")
        manual_sorted_posts = []
        manual_sorted_posts.append(insta_post1)
        manual_sorted_posts.append(insta_post2)
        manual_sorted_posts.append(insta_post4)
        manual_sorted_posts.append(insta_post3)
        assert sorted_posts == manual_sorted_posts

    def test_sort_posts_comments(self):
        sorted_posts = self.insta_pro.sort_posts(self.insta_posts, "comments")
        manual_sorted_posts = []
        manual_sorted_posts.append(insta_post2)
        manual_sorted_posts.append(insta_post1)
        manual_sorted_posts.append(insta_post3)
        manual_sorted_posts.append(insta_post4)
        assert sorted_posts == manual_sorted_posts

    def test_parse_hashtags_Fron_captions(self):
        hashtags = self.insta_pro._parse_hashtags_from_captions(self.captions)
        assert hashtags == self.all_hashtags

    def test_remove_spamhashtags(self):
        hashtags = self.insta_pro._remove_spamhashtags(
            self.all_hashtags, self.filteredOutWords
        )
        assert hashtags == [
            "hei",
            "likethis",
            "hei",
            "相信我",
            "newsweater",
            "holzweiler",
            "hei",
            "likethis",
        ]

    def test_remove_foreign_languages(self):
        roman_hashtags = self.insta_pro._remove_foreign_languages(self.all_hashtags)
        manual_roman_hashtags = [
            "hei",
            "likethis",
            "knitting",
            "instalove",
            "instalove",
            "hei",
            "strikkedilla",
            "newsweater",
            "holzweiler",
            "hei",
            "likethis",
        ]
        assert roman_hashtags == manual_roman_hashtags

    def test_sort_popular_hashtags(self):
        popular_hashtags = self.insta_pro._sort_popular_hashtags(self.all_hashtags)
        print(popular_hashtags)
        manual_popular_hashtags = [
            "hei",
            "likethis",
            "instalove",
            "knitting",
            "strikkedilla",
            "相信我",
            "newsweater",
            "holzweiler",
        ]
        assert popular_hashtags == manual_popular_hashtags

    def test_get_captions(self):
        captions = self.insta_pro._get_captions(self.insta_posts)
        assert captions == self.captions
