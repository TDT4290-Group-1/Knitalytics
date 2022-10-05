import pandas as pd
import io
from typing import List
from models.trending_word import TrendingWord
from api.DataCollectorInterface import DataCollector

from pytrends.request import TrendReq

raw_data = """word;frequency_growth;search_count
American dreams;5.4;1100
New knit sweater;3.4;90
Blabla;6.4;19"""

KNITTING_TOPIC = "/m/047fr" # google specific encoding of "Knitting" topic

class GoogleTrendsDataCollector(DataCollector):

    def __init__(self, host_language="en-US", tz=120) -> None:
        self.pytrends_client = TrendReq(host_language, tz)


    #Method use to collect raw data of trending words. Returns a pandas DataFrame of the raw data.
    def __collect_trending_word_data__(self, geo="NO", timeframe="now 1-d") -> pd.DataFrame:
        kw_list = [KNITTING_TOPIC]
        self.pytrends_client.build_payload(kw_list, geo=geo, timeframe=timeframe)
        response = self.pytrends_client.related_queries()

        rising = response[KNITTING_TOPIC]["rising"]
        top = response[KNITTING_TOPIC]["top"]
        return pd.concat((rising, top))

    #Method used to process the raw data of trending words. Returns a list of TrendingWord objects from the given data frames.
    def __process_trending_word_data__(self, data_frame: pd.DataFrame) -> pd.DataFrame:
        trending_words = ["word1", "word2"]
        return trending_words

    # Method used by the endpoint to get the trending words. Returns a list of TrendingWord objects.
    def get_trending_words(self) -> pd.DataFrame:

        return self.__process_trending_word_data__(
            self.__collect_trending_word_data__()
        )

