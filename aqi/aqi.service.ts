import dotenv from 'dotenv';

import type {
	FetchAirQualityOutlookResponse,
	PurpleAirApiPMResponseData,
	ReadCityNamesResponse,
} from '@/aqi/aqi.interface';
import type { CityStationId } from '@prisma/client';

import { axiosInstance } from '@/aqi/axiosInstance';
import { prisma } from '@/aqi/database';
import { transformPurpleAirApiPMResponse } from '@/aqi/transformers/purpleAirTransformers';
import { aqiFromPM } from '@/aqi/utilities/aqiFromPM';

const env = dotenv.config();
if (env.error) {
	throw env.error;
}

const AQIService = {
	readCityNames: async (): Promise<ReadCityNamesResponse> => {
		const cityNameRecords = await prisma.cityStationId.findMany({
			select: {
				cityName: true,
			},
		});
		if (cityNameRecords.length === 0) {
			return {
				success: false,
				message: 'cityNames not found',
			};
		}
		return {
			success: true,
			result: cityNameRecords.map(
				cityNameRecord => cityNameRecord.cityName,
			),
		};
	},

	fetchAirQualityOutlook: async (
		cityName: CityStationId['cityName'],
	): Promise<FetchAirQualityOutlookResponse> => {
		const cityStationIdRecord = await prisma.cityStationId.findFirst({
			where: { cityName },
		});
		if (!cityStationIdRecord) {
			return {
				success: false,
				message: 'cityStationIdRecord not found',
			};
		}

		const purpleAirApiPMResponse =
			await axiosInstance.get<PurpleAirApiPMResponseData>(
				`/sensors?fields=pm2.5_10minute&location_type=0&show_only=${cityStationIdRecord.stationId}`,
				{
					headers: { 'X-API-Key': process.env.PURPLE_AIR_API_KEY },
				},
			);

		const pm = transformPurpleAirApiPMResponse(purpleAirApiPMResponse);

		const { success, aqi, outlook } = aqiFromPM({ pm });

		if (!success) {
			return {
				success: false,
				message: 'aqiFromPM failed',
			};
		}

		return {
			success: true,
			result: {
				AQI: aqi,
				OUTLOOK: outlook,
			},
		};
	},
};

export default AQIService;
