import type { ValidCity } from '@/aqi/aqi.type';

export interface CityStationIdDto {
	/** ID of the CityStationId */
	id: number;
	/** Name of the City */
	cityName: string;
	/** PurpleAirApi Station Id */
	stationId: number;
}

export interface CityStationIdResponse {
	/** Indicates if the request was successful */
	success: boolean;
	/** Error message if the request was not successful */
	message?: string;
	/** CityStationId data */
	result?: CityStationIdDto | CityStationIdDto[];
}

export interface FetchCityStationIdResponse {
	/** Indicates if the request was successful */
	success: boolean;
	/** Error message if the request was not successful */
	message?: string;
	/** CityStationId data */
	result?: CityStationIdDto | CityStationIdDto[];
}

export interface AQIParams {
	// CITY is the name of the CITY for which the AQI is being requested. It defaults to 'burlington'.
	CITY: ValidCity;
}

export interface AqiFromPM {
	success: boolean;
	aqi: number | '-' | undefined;
	outlook:
		| 'Good'
		| 'Moderate'
		| 'Unhealthy for Sensitive Groups'
		| 'Unhealthy'
		| 'Very Unhealthy'
		| 'Hazardous'
		| undefined;
}

export interface AQIOutlook {
	// AQI represents Air Quality Index reported by estimated mass concentration PM2.5 (µg/m³). PM2.5 are fine particulates with a diameter of fewer than 2.5 microns.
	AQI: AqiFromPM['aqi'];
	// OUTLOOK represents the air quality in terms of its capacity to impact human health.
	OUTLOOK: AqiFromPM['outlook'];
}

export interface FetchAirQualityOutlookResponse {
	/** Indicates if the request was successful */
	success: boolean;
	/** Error message if the request was not successful */
	message?: string;
	/** CityStationId data */
	result?: AQIOutlook;
}

export interface PurpleAirApiPMResponseData {
	api_version: string;
	data: (number | string)[][];
}
