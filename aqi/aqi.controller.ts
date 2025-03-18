import { api, APIError } from 'encore.dev/api';
import { secret } from 'encore.dev/config';

import type {
	AQIParams,
	FetchAirQualityOutlookResponse,
	ReadCityNamesResponse,
} from '@/aqi/aqi.interface';

import AQIService from '@/aqi/aqi.service';
import { sanitizeAQIErrorString } from '@/aqi/utilities/sanitizeErrorString';

export const purpleAirApiKey = secret('PurpleAirApiKey');

/**
 * Get city names for querying Air Quality Index and Outlook.
 */
export const cityNames = api(
	{ expose: true, method: 'GET', path: '/cityNames' },
	async (): Promise<ReadCityNamesResponse> => {
		try {
			return await AQIService.readCityNames();
		} catch (error) {
			const errorString = sanitizeAQIErrorString(error);
			throw APIError.aborted(errorString);
		}
	},
);

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
