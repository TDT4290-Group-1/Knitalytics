import pandas as pd
import io
from typing import List
from models.trending_word import TrendingWord
from api.DataCollectorInterface import DataCollector
from pandas import DataFrame

raw_data = """word;frequency_growth;search_count
America dreams;5.4;1000
New knit sweater;3.4;100
Blabla;6.4;10"""


class GoogleTrendsDataCollector(DataCollector):
    #Method use to collect raw data of trending words. Returns a pandas DataFrame of the raw data.
    def __collect_trending_word_data__(self, data: str) -> DataFrame:
        dataframe = pd.read_csv(io.StringIO(data.strip('\n')), sep=";", skipinitialspace = True)
        print(dataframe)

        return dataframe

    #Method used to process the raw data of trending words. Returns a list of TrendingWord objects from the given data frames.
    def __process_trending_word_data__(self, data_frame: DataFrame) -> List[TrendingWord]:
        trending_words: List[TrendingWord] = []

        for row in data_frame.itertuples():
            print("JJ", row.word, float(row.frequency_growth), int(row.search_count))
            ol = TrendingWord(row.word, float(row.frequency_growth), int(row.search_count))
            print("JKHBK", ol.word, ol.frequency_growth, ol.search_count)
            trending_words.append(
                TrendingWord(row.word, float(row.frequency_growth), int(row.search_count))
            )

        return trending_words

    #Method used by the endpoint to get the trending words. Returns a list of TrendingWord objects.
    def get_trending_words(self) -> List[TrendingWord]:

        return self.__process_trending_word_data__(
            self.__collect_trending_word_data__(raw_data)
        )

