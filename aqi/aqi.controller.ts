import { api, APIError } from 'encore.dev/api';
import { secret } from 'encore.dev/config';

import type {
	AQIParams,
	FetchAirQualityOutlookResponse,
} from '@/aqi/aqi.interface';

import AQIService from '@/aqi/aqi.service';
import { sanitizeAQIErrorString } from '@/aqi/utilities/sanitizeErrorString';

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
			const errorString = sanitizeAQIErrorString(error);
			throw APIError.aborted(errorString);
		}
	},
);
