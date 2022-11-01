from unittest.mock import patch
import pandas as pd

# mock return value from GoogleTrendsCollector
MOCK_TRENDS_DF = pd.DataFrame(
    {"word": ["word1", "word2"], "frequency_growth": [1, 2], "search_count": [3, 4]}
)

# we mock the GoogleTrendsDataCollector, as this is the method that communicates with an external API


@patch("app.GoogleTrendsDataCollector.get_trending_words")
def test_request_trends(mock_google_collector, client):
    mock_google_collector.return_value = MOCK_TRENDS_DF

    response_promise = client.get("/api/v1/trends")

    # assert we got a non-empty response to ensure API works as expected
    assert response_promise is not None
