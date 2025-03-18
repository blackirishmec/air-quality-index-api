import { api, APIError } from 'encore.dev/api';
import { secret } from 'encore.dev/config';

import type {
	AQIParams,
	FetchAirQualityOutlookResponse,
} from '@/aqi/aqi.interface';

import AQIService from '@/aqi/aqi.service';

export const purpleAirApiKey = secret('PurpleAirApiKey');

/**
 * Get Air Quality Index and Outlook by city.
 */
export const aqi = api(
	{ expose: true, method: 'GET', path: '/aqi' },
	async ({ CITY }: AQIParams): Promise<FetchAirQualityOutlookResponse> => {
		try {
			return await AQIService.fetchAirQualityOutlook(CITY);
		} catch (error) {
			const errorString =
				error !== undefined && error !== null
					? (error as string)
					: ('Error fetching AQI' as string);
			throw APIError.aborted(errorString);
		}
	},
);
