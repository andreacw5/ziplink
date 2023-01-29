# Url Manager App
Url manager system with Rest API for management of short urls, click statistics and redirects by personalized codes

## Next planned functionality
 - More detailed statistics for short urls
 - Metrics for short urls
 - Github actions for build
 - Deployment with frontend management page

## Requirements
*  [Node.js](https://nodejs.org/en/download/) 12.14.0 or higher
* [Yarn](https://yarnpkg.com/en/) 1.10.1 or higher
* [PostgreSQL](https://www.postgresql.org/download/)  14.x or higher
* Configuration file `.env` (see `.env.sample`)

## Running environment
| code                 | description                                   | default value      |
|----------------------|-----------------------------------------------|--------------------|
| DATABASE_HOST        | database url                                  | localhost          |
| DATABASE_PORT        | database port number                          | 5432               |
| DATABASE_NAME        | database name                                 | url-manager        |
| DATABASE_USERNAME    | database username                             | postgres           |
| DATABASE_PASSWORD    | database password                             |                    |
| DEFAULT_REDIRECT_URL | default redirect if code is not found         | https://google.com |
| DEFAULT_URL_CODE     | default code for redirect for click recording | code               |
| API_KEY              | auth token for CUD Endpoints                  | 2342358            |


## Installation
```bash
$ npm install
```

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Authentication for management
The authentication is based on single static token, stored on env `API_KEY` variable.
Request for create/edit/delete urls need `X-API-KEY` header with the value of `API_KEY`.

## Stay in touch
- Author - [Andrea Tombolato](https://andreacw.dev)
