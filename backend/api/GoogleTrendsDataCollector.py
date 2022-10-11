import pandas as pd
from api.DataCollectorInterface import DataCollector, COLUMN_NAMES

from pytrends.request import TrendReq

KNITTING_TOPIC = "/m/047fr"  # google specific encoding of "Knitting" topic
COLUMN_MAPPER = {
    "query": COLUMN_NAMES["word"],
    "value": None,
}  # mapper used to rename columns to standard values


class GoogleTrendsDataCollector(DataCollector):
    def __init__(self, host_language="en-US", tz=120) -> None:
        self.pytrends_client = TrendReq(host_language, tz)

    def __collect_trending_word_data__(
        self, metric="frequency_growth", geo="NO", timeframe="now 1-d"
    ) -> pd.DataFrame:
        """
        Collect top words on Google Trends according to a metric.
        Args:
            metric : str, default 'frequency_growth'
                Ranking metric of words. One of 'frequency_growth' or 'search_count'.
            geo : str, default 'NO'
                Geographical region to return searches for.
            timeframe: str, default 'now 1-d'
                Timeframe to return searches for. 'now #-d' represents last # days. Only supports 1 or 7 days.
        Returns:
            pandas.DataFrame
        """
        kw_list = [KNITTING_TOPIC]
        self.pytrends_client.build_payload(
            kw_list, geo=geo, timeframe=timeframe)
        response = self.pytrends_client.related_queries()

        if metric == "frequency_growth":
            response = response[KNITTING_TOPIC]["rising"]
        elif metric == "search_count":
            response = response[KNITTING_TOPIC]["top"]

        COLUMN_MAPPER["value"] = COLUMN_NAMES[metric]

        return response.rename(COLUMN_MAPPER, axis=1)

    # Method used to process the raw data of trending words. Returns a list of TrendingWord objects from the given data frames.
    def __process_trending_word_data__(self, data_frame: pd.DataFrame) -> pd.DataFrame:
        processed_data = data_frame.copy()
        return processed_data

    # Method used by the endpoint to get the trending words. Returns a list of TrendingWord objects.
    def get_trending_words(self, filter: str) -> pd.DataFrame:

        return self.__process_trending_word_data__(
            self.__collect_trending_word_data__(metric=filter)
        )
