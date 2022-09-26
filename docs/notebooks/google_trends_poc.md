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


PyTrends usage is documented on [GitHub](https://github.com/GeneralMills/pytrends). 


### Communicating with Google
We create a client using the `TrendReq`-class that communicates with Google. There are two parameters:

* `hl`: query language. Typically "en-US"
* `tz`: UTC timezone difference. Oslo is +2, i.e. 120 minutes

```python
pytrends_client = request.TrendReq(hl="en-US", tz=120)
```

All remaining method calls are made using our `pytrends_client`.


### Get Trends data
We can specify keywords to get trends data for. The keywords can either be raw search terms, or specific topics. 


#### Topic encoding
The topics are encoded by Google. We can use PyTrends to get a likely encoding for the topic we're looking for.

```python
# get suggested encodings
pytrends_client.suggestions(keyword="Knitting")
```

We see that `"Knitting"` corresponds to encoding `"/m/047fr"`.

```python
# create list of keywords to get data for
kw_list = ["/m/047fr"]
```

#### Build the payload
The payload must be correctly formatted to be accepted by the API. Important parameters include:

* `geo`: location to get search data for, e.g. `"NO"` for Norway
* `timeframe`: the timeframe of the data. Valid values are explained in the [documentation](https://github.com/GeneralMills/pytrends#common-api-parameters).

```python
# We get the search data for topic "Knittin" in Norway for the last day
pytrends_client.build_payload(kw_list, geo="NO", timeframe="now 1-d")
```

<!-- #region -->
#### Get data
The two most relevant API-methods are

* `related_topics()`: get related topics information
* `related_queries()`: get related queries information

Both methods return a dictionary on the format

```python
{"keyword": {"rising": DataFrame, "top":, DataFrame}}
```

* `"rising"`: change in search popularity in timeframe 
* `"top"`: absolute search popularity in timeframe

Both categories rank the terms according to the metric.
<!-- #endregion -->

```python
related_topics = pytrends_client.related_topics()["/m/047fr"]
related_queries = pytrends_client.related_queries()["/m/047fr"]
```

```python
related_topics["top"].head()
```

```python
related_queries["top"].head()
```

## Appendix

<!-- #region -->
### `req` object
This object places restrictions on the search, and is the most complicated to fit the valid format of Trends URIs.

The object is generated automatically by `PyTrends`, but an example is provided here for reference.

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
