import json


def test_request_trends(client):
    response_promise = client.get("/api/v1/trends")
    response = json.loads(response_promise.text)
    assert "error" not in response
    assert type(response) == list
    assert len(response) > 0
