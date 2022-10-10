from typing import List

from models.trending_word import TrendingWord

COLUMN_NAMES = {
    "word": "word",
    "frequency_growth": "frequency_growth",
    "search_count": "search_count",
}


class DataCollector:
    # Interface fors data collectors. All data collectors must implement this interface.

    # Method used by the endpoint to get the trending words. Returns a list of TrendingWord objects.
    def get_trending_words(self) -> List[TrendingWord]:

        pass
