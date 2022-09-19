import json


def trendingApi():
    trending = {
        "sweaters": ["America dreams", "New knit sweater", "Blabla"] 
    }
    return json.dumps(trending)
