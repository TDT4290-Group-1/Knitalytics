import json
from models.trending_word import TrendingWord

def trendingApi():
    trendingWords = [
            TrendingWord("America dreams", 5.4, 1000).toJSON(),
            TrendingWord("New knit sweater", 3.4, 100).toJSON(),
            TrendingWord("Blabla", 6.4, 10).toJSON(),
    ]
    return json.dumps(trendingWords)
