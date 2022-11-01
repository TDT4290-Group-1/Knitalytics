# Endpoints

## GET /api/v1/trends/
Returns a list of all trending words related to the word "Knitting" or the given search term from Google Trends 
### Argument:
  - **"search_term(optional)":** The word to get related trending word for.
  
### Response

```json
[
    {
        "word": "amanda genser",
        "frequency_growth": 23050.0,
        "search_count": null
    },
    {
        "word": "baby strikk",
        "frequency_growth": null,
        "search_count": 7.0
    },
    {
        "word": "knit sweater",
        "frequency_growth": null,
        "search_count": 7.0
    },
    {
        "word": "strikke hals",
        "frequency_growth": 160.0,
        "search_count": 4.0
    }
]
```
#TODO
## GET /api/v1/interest_over_time/
Returns a list of relative seach interest for the work "Knitting" ot the given seach term from Google Trends for the past year
### Argument:
  - **"search_term(optional)":** The word to get trending data for.

## GET /api/v1/related_hashtags/
Return a list with related hastags for the given query hashtag
### Arguments:
  - **"query(required)":** the word we want to get related hashtags for.
  - **"filtererdOutWords(optional)":** the hastags we want to filter out, if the contains these words.
  
 ### Response
 
 ```json
 [
    "strickenmachtglücklich",
    "stricken",
    "strickenistmeinyoga",
    "islantilaisneule",
    "islantilainenvillapaita",
    "lettlopi",
    "socktober2022",
    "neuloosi",
    "lopapeysa",
    "slowfashion"
  ]
  ```


## GET /api/v1/related_post_URLS/
Return a list of related Instrgram post URLs for the given query
### Arguments:
  - **"query(required)":** the word we want to get related post urls for.
  - **"amount(optional":** the amount of related post urls we want
  
### Response:
```json
[
    "https://www.instagram.com/p/CkY36xPPVQH/",
    "https://www.instagram.com/p/CjdGVmoKc58/",
    "https://www.instagram.com/p/CkNHplUpK4o/",
    "https://www.instagram.com/p/CjgiogBPJ2R/",
    "https://www.instagram.com/p/CkOMcB2sc9I/",
    "https://www.instagram.com/p/CkQllmUsBoz/",
    "https://www.instagram.com/p/CjR4vcsMr1C/",
    "https://www.instagram.com/p/CjsVFOJDVDX/",
    "https://www.instagram.com/p/CkBYVIHqGC5/",
    "https://www.instagram.com/p/CkU04TKor1w/"
]
```

## GET /api/v1/business_hashtags/
### TODO:


## GET /api/v1/business_posts_urls/
Return a list of Instagram post URLs from the given followed users list.
### Arguments:
  - **"followedUsers(required)":** a list Instagram users we want to get posts for
  - **"sort(optional)":** whether we want to sort the post based on the number of ´likes´or ´comments´
  - **"postAmount(required)":** the amount of posrt we want to view
  
  
 ### Response:
 ```json
 [
    "https://www.instagram.com/reel/Cj5kgOPs0lf/",
    "https://www.instagram.com/reel/CjqEStMO1f5/",
    "https://www.instagram.com/p/CkIzKagLyj3/",
    "https://www.instagram.com/p/Cjv5NFML99y/",
    "https://www.instagram.com/p/Cj0Tyr6Lh1u/",
    "https://www.instagram.com/p/CkS6lrzoIpf/",
    "https://www.instagram.com/p/CkRGShQIzA3/",
    "https://www.instagram.com/p/CkWesS_IwB2/",
    "https://www.instagram.com/p/CkY88X8o00s/",
    "https://www.instagram.com/p/CkQ1-8yoE4o/"
]
```

## GET /api/v1/business_user/
Returns the user id for the given username input if it exists

### Arguments:
  - **username(required):** the username of the user we want user id for
### Response:
**If user exists:**
```json
{
    "business_discovery": {
        "id": "17841401746480004"
    },
    "id": "17841430076357420"
}
```
**If user does not exist:**
```json
{
    "error": {
        "code": 110,
        "error_subcode": 2207013,
        "error_user_msg": "Finner ikke brukeren med brukernavnet zuck2.",
        "error_user_title": "Finner ikke brukeren",
        "fbtrace_id": "ANBNR3TGl3LX21R8bjSzjYE",
        "is_transient": false,
        "message": "Invalid user id",
        "type": "OAuthException"
    }
}
```

## GET /api/v1/hashtag_id/
Returns the hastag id for the given hastag input if it exists

### Arguments:
  - **hashtag(required):** the hashtag we want hashtag id for
### Response:
**If hashtag exists:**
```json
17841539938112178
```
**If hashtag does not exist:**
```json
{
    "error": {
        "code": 24,
        "error_subcode": 2207024,
        "error_user_msg": "Emneknaggen \"strikke1\" som brukeren forespurte, kan ikke vises pga. manglende tillatelser, eller så er den ugyldig eller eksisterer ikke.",
        "error_user_title": "Fant ingen samsvarende emneknagg",
        "fbtrace_id": "AwKpPqgf3rrpSHqI1SnU4kV",
        "is_transient": false,
        "message": "The requested resource does not exist",
        "type": "OAuthException"
    }
}
```


