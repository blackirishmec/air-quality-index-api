import type { PurpleAirApiPMResponseData } from '@/aqi/aqi.interface';
import type { AxiosResponse } from 'axios';

export function transformPurpleAirApiPMResponse(
	purpleAirApiPMResponse: AxiosResponse<PurpleAirApiPMResponseData, unknown>,
) {
	return purpleAirApiPMResponse.data.data[0][1] as number;
}
