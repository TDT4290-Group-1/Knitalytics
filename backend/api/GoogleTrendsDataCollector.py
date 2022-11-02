import pandas as pd
import werkzeug.exceptions
from api.DataCollectorInterface import DataCollector, COLUMN_NAMES

from pytrends.request import TrendReq
import pytrends.exceptions

KNITTING_TOPIC = "/m/047fr"  # google specific encoding of "Knitting" topic
COLUMN_MAPPER = {
    "query": COLUMN_NAMES["word"],
    "value": None,
}  # mapper used to rename columns to standard values

VALID_TIMEFRAMES = {
    "last_day": "now 1-d",
    "last_week": "now 7-d",
    "last_month": "today 1-m",
    "last_three_months": "today 3-m",
    "last_twelve_months": "today 12-m",
}


class GoogleTrendsDataCollector(DataCollector):
    def __init__(self, host_language="en-US", tz=120) -> None:
        self.pytrends_client = TrendReq(host_language, tz)

    def _set_parameters(self, search_term, timeframe, geo):

        if search_term == "":
            self.search_term = KNITTING_TOPIC
        else:
            self.search_term = search_term

        if timeframe == "":
            self.timeframe = VALID_TIMEFRAMES["last_three_months"]
        else:
            self.timeframe = VALID_TIMEFRAMES[timeframe]

        self.geo = geo

    def __collect_trending_word_data__(
        self,
        search_term,
        timeframe,
        geo="NO",
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
        self._set_parameters(search_term=search_term, timeframe=timeframe, geo=geo)
        kw_list = [self.search_term]
        self.pytrends_client.build_payload(
            kw_list, geo=self.geo, timeframe=self.timeframe
        )

        try:
            response = self.pytrends_client.related_queries()
        except pytrends.exceptions.ResponseError:
            raise  # raise the error to be handled by caller

        # we have to account for no related queries in either category
        # we create a default empty DataFrame and only set its value of the metric actually has values

        # retrieve frequency growth values
        COLUMN_MAPPER["value"] = COLUMN_NAMES["frequency_growth"]
        frequency_growth_df = pd.DataFrame(
            {"query": [], "value": []}  # default response is empty dataframe
        )
        if response[self.search_term]["rising"] is not None:
            frequency_growth_df = response[self.search_term][
                "rising"  # the search term have "rising" related queries
            ]
        frequency_growth_df = frequency_growth_df.rename(
            columns=COLUMN_MAPPER
        )  # rename columns appropriately

        # retrive search count values
        COLUMN_MAPPER["value"] = COLUMN_NAMES["search_count"]
        search_count_df = pd.DataFrame({"query": [], "value": []})
        if response[self.search_term]["top"] is not None:
            search_count_df = response[self.search_term][
                "top"
            ]  # the search term have "top" related queries
        search_count_df = search_count_df.rename(columns=COLUMN_MAPPER)

        # We perform outer join on the frequency growth and search count DFs
        # This matches values that exist in both and adds null values where there was no match in the other
        response = frequency_growth_df.set_index(COLUMN_NAMES["word"]).join(
            search_count_df.set_index(COLUMN_NAMES["word"]), how="outer"
        )

        return response.reset_index(
            drop=False
        )  # reset the index to get the "word" column again

    # Method used to process the raw data of trending words. Returns a list of TrendingWord objects from the given data frames.
    def __process_trending_word_data__(
        self, data_frame: pd.DataFrame, filter: bool = False
    ) -> pd.DataFrame:
        processed_data = data_frame.copy()

        if filter:
            before_filter = processed_data.shape[0]

            last_12 = self.__collect_trending_word_data__(
                search_term="", timeframe="last_twelve_months"
            )

            processed_data = processed_data.loc[
                ~processed_data[COLUMN_NAMES["word"]].isin(
                    last_12[COLUMN_NAMES["word"]]
                ),
                :,
            ]

            print(
                f"Deleted {before_filter - processed_data.shape[0]} rows after filtering queries that are also in last 12 months"
            )

        return processed_data

    # Method used by the endpoint to get the trending words. Returns a list of TrendingWord objects.
    def get_trending_words(
        self, search_term: str, timeframe: str, filter: bool
    ) -> pd.DataFrame:
        try:
            word_data = self.__collect_trending_word_data__(
                search_term=search_term, timeframe=timeframe
            )
            return self.__process_trending_word_data__(word_data, filter)
        except pytrends.exceptions.ResponseError as error:
            if (
                error.response.status_code == 429
            ):  # if the response code is 429, we raise a Werkzeug HTTPError
                raise werkzeug.exceptions.TooManyRequests from error
            else:
                raise error

    # Method used to get the interest over time for a given keyword. Returns a dataframe of the interest over time in relative numbers.
    def get_interest_over_time(
        self, search_term, timeframe="last_twelve_months", geo="NO"
    ) -> pd.DataFrame:
        self._set_parameters(search_term, timeframe, geo)
        kw_list = [self.search_term]
        self.pytrends_client.build_payload(
            kw_list, geo=self.geo, timeframe=self.timeframe
        )
        response_dateframe = self.pytrends_client.interest_over_time()
        date_frame = response_dateframe
        date_frame["date"] = response_dateframe.index
        date_frame = response_dateframe.reset_index(drop=True)
        date_frame = date_frame[["date", self.search_term]]
        date_frame = date_frame.rename(
            columns={self.search_term: "relative_search_value"}
        )

        return date_frame
