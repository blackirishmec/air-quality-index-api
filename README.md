# Air Quality Index API

This is a RESTful API created with [Encore](https://encore.dev/), [Prisma](https://prisma.io), and the [PurpleAirApi](https://api.purpleair.com/) to allow users to query Air Quality Index and Outlook for a list of predefined cities.

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

## Project Takeaways:

- Coming from a pure PHP-as-a-backend career path, I was excited to learn how to setup a modern-best-practice-adherent API using Node.js in the form of [Encore.ts](https://encore.dev/).
	- Roses:
		- The [local developer dashboard](https://encore.dev/docs/ts/observability/dev-dash)
			- The observability provided is excellent. It mirrors tools and functionality I'm used to in modern PHP frameworks.
			- The API explorer is very useful, and replaces the need for a dedicated 3rd party REST client (ala [insomnia](https://insomnia.rest/)).
		- TypeScript! I *love* opinionated languages and being able to use TS on the backend was awesome. I think it's particularly clever how Encore leverages typing to auto-populate the service catalogue.
		- The ecosystem of examples provided by the Encore team is very comprehensive and a helpful accompaniment to the docs.
		- I am coming from an extensive [MySQL](https://www.mysql.com/) background, and it was awesome learning to migrate to [PostgreSQL](https://www.postgresql.org/). Encore allows for MySQL db's - but I took the time to try PostgreSQL and enjoy it so far.
		- I read extensively on Encore and why it was built the way that it was. It was fascinating to learn about the efficiencies of using RUST to free up the event loop and validate using the API schema.
	- Thorns:
		- I am used to the scope and scale of the PHP framework [Laravel](https://laravel.com/), so wrapping my head around the flatter project tree of the example apps took some time. 
		- While integrating Prisma as an ORM was easy, figuring out seeding took me nearly three full days and resulted in engaging with an Encore repo [issue #1611](https://github.com/encoredev/encore/issues/1611) via this [comment](https://github.com/encoredev/encore/issues/1611#issuecomment-2733750899). 
			- IMO, seeding is expected and desired functionality for a modern backend framework. Granted Encore is independent of Prisma, this hiccup raised a pink flag for Encore in terms of it's ability to go more than a layer deep (past the docs and examples). That being said this was the only pink-flag of the project.