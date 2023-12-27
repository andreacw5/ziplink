# Short URL Generator

## Description
This application empowers users to generate short, personalized URLs using Nest.js.

## Getting Started
Follow these instructions to set up the project on your local machine for development and testing purposes.
 - Clone the repository to your local machine: `git clone https://github.com/andreacw5/short-url-generator.git`
 - Install dependencies: `yarn install`
 - Start the application: `yarn start:dev`
 - Visit `http://localhost:3000` in your browser to use the application.

## Features
 - Create short URLs
 - Edit short URLs
 - Delete short URLs
 - Redirect to the default URL if the code is not found
 - Click recording for short URLs
 - Dockerized application
 - GitHub actions for build
 - API Auth token for create, update, and delete endpoints
 - Swagger documentation

## Next planned functionality
 - More detailed statistics for short urls
 - Testing with Jest
 - Deployment with frontend management page

## Built With
- [Nest.js](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [TypeORM](https://typeorm.io/#/) - ORM for TypeScript and JavaScript (ES7, ES6, ES5).

## Requirements
- [Node.js](https://nodejs.org/en/download/) 18.10.0 or higher
- [Yarn](https://yarnpkg.com/en/) 1.10.1 or higher
- [PostgreSQL](https://www.postgresql.org/download/) 12.0 or higher

## Authentication for management
Authentication is based on a single static token stored in the `API_KEY` environment variable. Requests for create/edit/delete URLs require the `X-API-KEY` header with the value of `API_KEY`.

## Environment Variables
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

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/andreacw5/url-manager-app/releases).

## Author
- [Andrea Tombolato](https://andreatombolato.dev)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
