def test_request_trends(client):
    response = client.get("/api/v1/trends")
    assert (
        b'[{"word":"American dreams","frequency_growth":5.4,"search_count":1100},{"word":"New knit sweater","frequency_growth":3.4,"search_count":90},{"word":"Blabla","frequency_growth":6.4,"search_count":19},{"word":"Australian dreams","frequency_growth":1.4,"search_count":1000},{"word":"Old knit sweater","frequency_growth":3.4,"search_count":100},{"word":"asdsad","frequency_growth":9.4,"search_count":10}]'
        in response.data
    )
