# Air Quality Index API

This is a RESTful API created with [Encore](https://encore.dev/) and [Prisma](https://prisma.io) to allow users to query Air Quality Index and Outlook for a list of predefined cities.

## Requirements

- [Encore CLI](https://encore.dev/docs/ts/install#install-the-encore-cli)
- [Node.js](https://nodejs.org/en/download/) is required to run Encore.ts apps.
- [Docker](https://www.docker.com/) is required for Encore to set up local databases.

## Running locally

```bash
encore run
```

While `encore run` is running, open <http://localhost:9400/> to view Encore's [local developer dashboard](https://encore.dev/docs/ts/observability/dev-dash).

## Using the API

Get city names for querying Air Quality Index and Outlook

```bash
curl 'http://localhost:4000/cityNames'
```

Get Air Quality Index and Outlook by city

```bash
curl 'http://localhost:4000/aqi?CITY={cityName}'
```