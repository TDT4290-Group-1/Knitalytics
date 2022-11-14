from unittest.mock import patch
import pandas as pd

# mock return value from GoogleTrendsCollector
MOCK_TRENDS_DF = pd.DataFrame(
    {"word": ["word1", "word2"], "frequency_growth": [1, 2], "search_count": [3, 4]}
)


MOCK_INTEREST_OVER_TIME_DF = pd.DataFrame(
    {"date": ["1663459200000", "1663459200000"], "relative_search_value": [89, 100]}
)

# MOCK_RELATED_HASHTAGS_DF = pd.DataFrame(
# we mock the GoogleTrendsDataCollector, as this is the method that communicates with an external API


@patch("app.GoogleTrendsDataCollector.get_trending_words")
def test_request_trends(mock_google_collector, client):
    mock_google_collector.return_value = MOCK_TRENDS_DF
    # assert mock_google_collector.return_value is None

    response_promise = client.get("/api/v1/trends")

    # assert we got a non-empty response to ensure API works as expected
    assert response_promise is not None
    # assert we got a 200 response code
    assert response_promise.status_code == 200


@patch("app.GoogleTrendsDataCollector.get_interest_over_time")
def test_interest_over_time(mock_google_collector, client):
    mock_google_collector.return_value = MOCK_INTEREST_OVER_TIME_DF

    response_promise = client.get("/api/v1/interest_over_time?search_term=word1")


    # assert we got a non-empty response to ensure API works as expected
    assert response_promise is not None



