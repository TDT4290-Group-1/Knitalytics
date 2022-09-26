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
import datetime
import json
from urllib import parse
from pytrends import request
```

## PyTrends

```python
pytrends_client = request.TrendReq(hl="en-US", tz=120)
```

```python
kw_list = ["/m/047fr"] #keywords to get data for
```

```python
pytrends_client.suggestions(keyword="Knitting")
```

```python
pytrends_client.build_payload(kw_list, geo="NO", timeframe="now 1-d")
```

```python
pytrends_client.related_topics()
```

```python
pytrends_client.related_queries()
```

## URL string converter

```python
parsed_url = parse.urlparse(valid_string)
```

```python
query_params = {}
for query_param in parsed_url.query.split('&'):
    query_param_lst = query_param.split('=')
    query_params[query_param_lst[0]] = query_param_lst[1]
```

```python
query_params['req'] = json.loads(parse.unquote(query_params['req']))
```

```python
query_params
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


## Build request

```python
request_string = ""
```

### URI

```python
uri = f"{parsed_url.scheme}://{parsed_url.netloc}{parsed_url.path}"
print(uri)
```

```python
request_string += uri
print(request_string)
```

## Query

```python
safe_quote = "/:,+-"
```

```python
query = "?"
for param,val in query_params.items():
    query += f"{param}={json.dumps(val)}&"
query = query[:-1] # drop final &
```

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
r = requests.get(quoted_request_string)
```


