import pandas as pd
import io
from typing import List
from models.trending_word import TrendingWord
from api.DataCollectorInterface import DataCollector
from pandas import DataFrame

raw_data = """word;frequency_growth;search_count
Australian dreams;1.4;1000
Old knit sweater;3.4;100
asdsad;9.4;10"""


class MetaDataCollector(DataCollector):
    # Method use to collect raw data of trending words. Returns a pandas DataFrame of the raw data.
    def __collect_trending_word_data__(self, data: str) -> DataFrame:
        dataframe = pd.read_csv(
            io.StringIO(data.strip("\n")), sep=";", skipinitialspace=True
        )

        return dataframe

    # Method used to process the raw data of trending words. Returns a list of TrendingWord objects from the given data frames.
    def __process_trending_word_data__(
        self, data_frame: DataFrame
    ) -> List[TrendingWord]:
        return data_frame.to_json(orient="records")

    # Method used by the endpoint to get the trending words. Returns a list of TrendingWord objects.
    def get_trending_words(self) -> List[TrendingWord]:

        # return self.__process_trending_word_data__(
        # self.__collect_trending_word_data__(raw_data))
        # )
        return self.__collect_trending_word_data__(raw_data)
