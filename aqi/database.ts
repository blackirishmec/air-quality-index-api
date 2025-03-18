import { SQLDatabase } from 'encore.dev/storage/sqldb';

import { PrismaClient } from '@prisma/client';

const DB = new SQLDatabase('aqi', {
	migrations: {
		path: './prisma/migrations',
		source: 'prisma',
	},
});

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: DB.connectionString,
		},
	},
});

// ! I fought with setting up Prisma seeding for multiple days, and based on this GitHub issue on the package - believe that it is currently bugged for Prisma + Encore. Dropping the seeder logic here in the mean time.
async function seed() {
	await prisma.cityStationId.upsert({
		where: {
			cityName: 'burlington',
		},
		update: {},
		create: {
			cityName: 'burlington',
			stationId: 188467,
		},
	});

	await prisma.cityStationId.upsert({
		where: {
			cityName: 'williston',
		},
		update: {},
		create: {
			cityName: 'williston',
			stationId: 10250,
		},
	});

	await prisma.cityStationId.upsert({
		where: {
			cityName: 'encino',
		},
		update: {},
		create: {
			cityName: 'encino',
			stationId: 258263,
		},
	});

	await prisma.cityStationId.upsert({
		where: {
			cityName: 'boston',
		},
		update: {},
		create: {
			cityName: 'boston',
			stationId: 108496,
		},
	});

	await prisma.cityStationId.upsert({
		where: {
			cityName: 'revelstoke',
		},
		update: {},
		create: {
			cityName: 'revelstoke',
			stationId: 179509,
		},
	});
}
seed()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		// eslint-disable-next-line no-console
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

export { prisma };
