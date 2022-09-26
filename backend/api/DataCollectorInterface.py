from typing import List
from pandas import DataFrame

from models.trending_word import TrendingWord


class DataCollector:
# Interface fors data collectors. All data collectors must implement this interface.

    #Method use to collect raw data of trending words. Returns a pandas DataFrame of the raw data.
    def __collect_trending_word_data__(self, data: str) -> DataFrame:

        pass

    #Method used to process the raw data of trending words. Returns a list of TrendingWord objects from the given data frames.
    def __process_trending_word_data__(self, data: DataFrame) -> List[TrendingWord]:

        pass

    
    #Method used by the endpoint to get the trending words. Returns a list of TrendingWord objects.
    def get_trending_words(self) -> List[TrendingWord]:

        pass
