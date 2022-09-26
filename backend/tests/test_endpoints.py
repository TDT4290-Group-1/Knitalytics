def test_request_trends(client):
    response = client.get("/api/v1/trends")
    assert b'["{\\n    \\"word\\": \\"America dreams\\"\\n}", "{\\n    \\"word\\": \\"New knit sweater\\"\\n}", "{\\n    \\"word\\": \\"Blabla\\"\\n}"]' in response.data