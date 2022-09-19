---
jupyter:
  jupytext:
    formats: ipynb,md
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.3'
      jupytext_version: 1.14.1
  kernelspec:
    display_name: Python 3 (ipykernel)
    language: python
    name: python3
---

```python
import requests
import datetime
```

## URL string converter

```python
from urllib import parse
url_string = r"https://trends.google.com/trends/api/widgetdata/relatedsearches?hl=en-US&tz=-120&req=%7B%22restriction%22:%7B%22geo%22:%7B%22country%22:%22NO%22%7D,%22time%22:%222022-09-18T14%5C%5C:04%5C%5C:07+2022-09-19T14%5C%5C:04%5C%5C:07%22,%22originalTimeRangeForExploreUrl%22:%22now+1-d%22,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22ENTITY%22,%22value%22:%22%2Fm%2F047fr%22%7D%5D%7D%7D,%22keywordType%22:%22QUERY%22,%22metric%22:%5B%22TOP%22,%22RISING%22%5D,%22trendinessSettings%22:%7B%22compareTime%22:%222022-09-17T14%5C%5C:04%5C%5C:07+2022-09-18T14%5C%5C:04%5C%5C:07%22%7D,%22requestOptions%22:%7B%22property%22:%22%22,%22backend%22:%22CM%22,%22category%22:0%7D,%22language%22:%22en%22,%22userCountryCode%22:%22NO%22,%22userConfig%22:%7B%22userType%22:%22USER_TYPE_LEGIT_USER%22%7D%7D&token=APP6_UEAAAAAYynIV_6-GJTN0UKwv1ZMEcST6T_8TdQe"
parse.unquote(url_string)
```

### `req` object
This object places restrictions on the search. An example is outlined below.

<!-- #region -->
```python
{
    "restriction":
    {
        "geo":
            {
                "country":"NO"
            },
        "time":"2022-09-12T12\\:48\\:06+2022-09-19T12\\:48\\:06",
        "originalTimeRangeForExploreUrl":"now+7-d",
        "complexKeywordsRestriction":
            {
                "keyword":
                    [
                        {
                            "type":"ENTITY","value":"/m/047fr"
                        }
                    ]
            }
    },
    "keywordType":"ENTITY",
    "metric":["TOP","RISING"],
    "trendinessSettings":
        {
            "compareTime":"2022-09-05T12\\:48\\:06+2022-09-12T12\\:48\\:06"
        },
        "requestOptions:
            {
                "property":"",
                "backend":"CM",
                "category":0
            },
        "language":"en",
        "userCountryCode":"NO",
        "userConfig":
            {
                "userType":"USER_TYPE_LEGIT_USER"
            }
}
```
<!-- #endregion -->

The parameters are the following:

* geo: region to search
* time: time-based search range for query


## Parameter constants

```python
# google trends URI
uri = "https://trends.google.com/trends/api/widgetdata/relatedsearches"

# response language
hl="en-US"

#timezone
tz="-120"

#request object
req = {
    "restriction":
    {
        "geo":
            {
                "country":"NO"
            },
        "time": "2022-09-12T12\\:55\\:00+2022-09-19T12\\:55\\:00",
        "originalTimeRangeForExploreUrl":"now+7-d",
        "complexKeywordsRestriction":
            {
                "keyword":
                    [
                        {
                            "type":"ENTITY","value":"/m/047fr"
                        }
                    ]
            }
    },
    "keywordType":"ENTITY",
    "metric":["TOP","RISING"],
    "trendinessSettings":
        {
            "compareTime":"2022-09-05T12\\:55\\:00+2022-09-12T12\\:55\\:00"
        },
        "requestOptions":
            {
                "property":"",
                "backend":"CM",
                "category":0
            },
        "language":"en",
        "userCountryCode":"NO",
        "userConfig":
            {
                "userType":"USER_TYPE_LEGIT_USER"
            }
}

# access token - must be generated dynamically
token="APP6_UEAAAAAYynNey5HsVuctrivgn1drvgILR-zWCVX"
```

## Build request


### `req` object


#### `time`:  timerange to retrieve

```python
time_fmt = "%Y-%m-%dT%H\\:%M\\:%S"
end_time = datetime.datetime.now() - datetime.timedelta(minutes=-int(tz))
start_time = end_time - datetime.timedelta(days=7)

compare_end_time = start_time
compare_start_time = start_time - datetime.timedelta(days=7)

# place in request
req["restriction"]["time"] = f"{start_time.strftime(time_fmt)}+{end_time.strftime(time_fmt)}"
req["trendinessSettings"]["compareTime"] = f"{compare_start_time.strftime(time_fmt)}+{compare_end_time.strftime(time_fmt)}"
```

## Retrieve data

```python
import json

```

```python
url_string
```

```python
f"{uri}?hl={hl}&tz={tz}&req={parse.quote(json.dumps(req).replace(' ', ''), safe=':,+', encoding='utf-8')}&token={token}"
```

```python
r = requests.get(f"{uri}?hl={hl}&tz={tz}&req={parse.quote(json.dumps(req).replace(' ', ''), safe=':,+', encoding='utf-8')}&token={token}")
```

```python
r.text
```

```python

```
