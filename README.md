![workflow](https://github.com/dream-knit/knitalytics/actions/workflows/node.js.yml/badge.svg)
![workflow](https://github.com/dream-knit/knitalytics/actions/workflows/python-app.yml/badge.svg)
# Knitalytics

_What is happening in the world of knitting and fashion that DreamKnit should know about?_

This project aims to analyse data related to knitting from various sources in order to identify domain trends early and present related statistics in a clean and intuitive dashboard.

## Product description
This product will give a dashboard platform were Dreamknit will get an overview of the incoming fashion trends related to knitting and view the latest posts from interesting influencers, fashion brands etc.

The dashboard can be found here: [Knitalytics](https://knitalytics.web.app/). A password is required to use the app.

## Installation
Needs to start a frontend- and a backend-server. The following readMe-files have a guide for that:
- [Frontend](https://github.com/dream-knit/knitalytics/tree/main/frontend)
- [Backend](https://github.com/dream-knit/knitalytics/tree/main/backend)

## Project structure
### Frontend
```
.
├── public                    <- Static files that do not needs to be processed by webpack
│   └── style
└── src                       <- Source code
    ├── __tests__             <- Tests
    │   ├── component
    │   └── snapshot
    │       └── __snapshots__
    ├── assets                <- For files that the app needs at runtime
    ├── components
    │   ├── links
    │   ├── settings
    │   └── sidebar
    ├── config
    │   ├── PackagesProviders
    │   └── ReactConstants
    ├── context               <- Context API
    ├── models                <- Models for custom types
    ├── pages                 <- The differant app pages
    │   ├── error
    │   │   └── style
    │   ├── fashionBrands
    │   ├── googleDetails
    │   ├── hashtags
    │   ├── home
    │   ├── instagramUsers
    │   └── settings
    ├── router                <- For routing
    └── services              <- FOr external services
```
### Backend

```
.
├── datacollectors            <- For the different external data collectors
├── tests                     <- Tests
└── utils                     <- For utilities used in the project
```


