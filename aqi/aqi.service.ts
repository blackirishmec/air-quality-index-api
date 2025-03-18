import { secret } from 'encore.dev/config';

import type {
	CityStationIdResponse,
	FetchAirQualityOutlookResponse,
	PurpleAirApiPMResponseData,
} from '@/aqi/aqi.interface';
import type { CityStationId } from '@prisma/client';

import { axiosInstance } from '@/aqi/axiosInstance';
import { prisma } from '@/aqi/database';
import { transformPurpleAirApiPMResponse } from '@/aqi/transformers/purpleAirTransformers';
import { aqiFromPM } from '@/aqi/utilities/aqiFromPM';

const AQIService = {
	findOneCityStationIdByCityName: async (
		cityName: CityStationId['cityName'],
	): Promise<CityStationIdResponse> => {
		const cityStationId = await prisma.cityStationId.findFirst({
			where: { cityName },
		});
		if (!cityStationId) {
			return {
				success: false,
				message: 'cityStationId not found',
			};
		}
		return {
			success: true,
			result: cityStationId,
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

		const purpleAirApiKey = secret('PurpleAirApiKey');

		const purpleAirApiPMResponse =
			await axiosInstance.get<PurpleAirApiPMResponseData>(
				`https://api.purpleair.com/v1/sensors?fields=pm2.5_10minute&location_type=0&show_only=${cityStationIdRecord.stationId}`,
				{
					headers: { 'X-API-Key': purpleAirApiKey() },
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
