import json
from typing import List
from models.trending_word import TrendingWord
from api.DataCollectorInterface import DataCollector
from pandas import DataFrame
import pandas as pd
import io;

raw_data = """word;frequency_growth;search_count
America dreams;5.4;1000
New knit sweater;3.4;100
Blabla;6.4;10"""

class GoogleTrendsDataCollector(DataCollector):

    def collect_trending_word_data(self, data: str) -> DataFrame:
        dataframe = pd.read_csv(io.StringIO(data), sep=";")

        return dataframe

    def process_trending_word_data(self, data_frame: DataFrame) -> str:
        trending_words = []

        for row in data_frame.itertuples():
                trending_words.append(TrendingWord(row.word, row.frequency_growth, row.search_count))

        return trending_words

    def get_trending_words(self) -> List[TrendingWord]:

        return self.process_trending_word_data(self.collect_trending_word_data(raw_data))

        #     trendingWords = [
        #             TrendingWord("America dreams", 5.4, 1000),
        #             TrendingWord("New knit sweater", 3.4, 100),
        #             TrendingWord("Blabla", 6.4, 10),
        #         #     TrendingWord("Blabla", 6.4, 10).toJSON(),
        #     ]