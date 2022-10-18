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
        self,
        geo="NO",
        timeframe="today 3-m",
        search_term=KNITTING_TOPIC,
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
        kw_list = [search_term] 
        self.pytrends_client.build_payload(kw_list, geo=geo, timeframe=timeframe)
        response = self.pytrends_client.related_queries()


        # we have to account for no related queries in either category
        # we create a default empty DataFrame and only set its value of the metric actually has values
        
        # retrieve frequency growth values
        COLUMN_MAPPER["value"] = COLUMN_NAMES["frequency_growth"]
        frequency_growth_df = pd.DataFrame({"query": [], "value": []}) # default response is empty dataframe
        if response[search_term]["rising"] is not None: 
            frequency_growth_df = response[search_term]["rising"] # the search term have "rising" related queries 
        frequency_growth_df = frequency_growth_df.rename(columns=COLUMN_MAPPER) # rename columns appropriately
        
        # retrive search count values
        COLUMN_MAPPER["value"] = COLUMN_NAMES["search_count"]
        search_count_df = pd.DataFrame({"query": [], "value": []})
        if response[search_term]["top"] is not None:   
            search_count_df = response[search_term]["top"] # the search term have "top" related queries
        search_count_df = search_count_df.rename(columns=COLUMN_MAPPER)

        # We perform outer join on the frequency growth and search count DFs
        # This matches values that exist in both and adds null values where there was no match in the other
        response = frequency_growth_df.set_index(COLUMN_NAMES["word"]).join(search_count_df.set_index(COLUMN_NAMES["word"]), how="outer")

        return response.reset_index(drop=False) # reset the index to get the "word" column again

    # Method used to process the raw data of trending words. Returns a list of TrendingWord objects from the given data frames.
    def __process_trending_word_data__(self, data_frame: pd.DataFrame) -> pd.DataFrame:
        processed_data = data_frame.copy()
        return processed_data

    # Method used by the endpoint to get the trending words. Returns a list of TrendingWord objects.
    def get_trending_words(self, search_term: str) -> pd.DataFrame:
        if search_term == "":
            return self.__process_trending_word_data__(
                self.__collect_trending_word_data__()
            )
        else:
            return self.__process_trending_word_data__(
                self.__collect_trending_word_data__(
                    search_term=search_term
                )
            )

    # Method used to get the interest over time for a given keyword. Returns a dataframe of the interest over time in relative numbers.
    def get_interest_over_time(
        self,
        search_term=KNITTING_TOPIC,
        geo="NO",
        timeframe="today 12-m",
    ) -> pd.DataFrame:
        kw_list = [search_term]
        self.pytrends_client.build_payload(kw_list, geo=geo, timeframe=timeframe)
        response_dateframe = self.pytrends_client.interest_over_time()
        date_frame = response_dateframe
        date_frame["date"] = response_dateframe.index
        date_frame = response_dateframe.reset_index(drop=True)
        date_frame = date_frame[["date", search_term]]
        date_frame = date_frame.rename(columns={search_term: "relative_search_value"})

        return date_frame
