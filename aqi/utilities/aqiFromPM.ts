import type { AqiFromPM } from '@/aqi/aqi.interface';

interface CalcAqiParams {
	/**
	 * Input concentration for a given pollutant
	 */
	Conc_i: number;
	/**
	 * Concentration breakpoint that is less than or equal to Conc_i
	 */
	Conc_Lo: number;
	/**
	 * Concentration breakpoint that is greater than or equal to Conc_i
	 */
	Conc_Hi: number;
	/**
	 * AQI value/breakpoint corresponding to Conc_Lo
	 */
	AQI_Lo: number;
	/**
	 * AQI value/breakpoint corresponding to AQI_Hi
	 */
	AQI_Hi: number;
}
function calcAQI({
	Conc_i,
	AQI_Hi,
	AQI_Lo,
	Conc_Hi,
	Conc_Lo,
}: CalcAqiParams): number {
	const a = AQI_Hi - AQI_Lo;
	const b = Conc_Hi - Conc_Lo;
	const c = Conc_i - Conc_Lo;
	return Math.round((a / b) * c + AQI_Lo);
}

interface AqiFromPMParams {
	/**
	 * Estimated mass concentration derived from particle counts of a given pollutant
	 */
	pm: number;
}

export function aqiFromPM({ pm }: AqiFromPMParams): AqiFromPM {
	const _aqiFromPM: AqiFromPM = {
		aqi: '-',
		outlook: undefined,
		success: false,
	};

	if (isNaN(pm)) return _aqiFromPM;
	if (pm == undefined) return _aqiFromPM;
	if (pm < 0) return { ..._aqiFromPM, aqi: pm };
	if (pm > 1000) return _aqiFromPM;
	/*                                 		AQI         RAW PM2.5
    	Good                               0 - 50   |   0.0 – 12.0
    	Moderate                          51 - 100  |  12.1 – 35.4
    	Unhealthy for Sensitive Groups   101 – 150  |  35.5 – 55.4
    	Unhealthy                        151 – 200  |  55.5 – 150.4
    	Very Unhealthy                   201 – 300  |  150.5 – 250.4
    	Hazardous                        301 – 400  |  250.5 – 350.4
   		Hazardous                        401 – 500  |  350.5 – 500.4
    */
	if (pm > 250.5) {
		if (pm > 350.5) {
			_aqiFromPM.aqi = calcAQI({
				Conc_i: pm,
				AQI_Hi: 500,
				AQI_Lo: 401,
				Conc_Hi: 500.4,
				Conc_Lo: 350.5,
			});
		} else {
			_aqiFromPM.aqi = calcAQI({
				Conc_i: pm,
				AQI_Hi: 400,
				AQI_Lo: 301,
				Conc_Hi: 350.4,
				Conc_Lo: 250.5,
			});
		}
		_aqiFromPM.outlook = 'Hazardous';
	} else if (pm > 150.5) {
		_aqiFromPM.aqi = calcAQI({
			Conc_i: pm,
			AQI_Hi: 300,
			AQI_Lo: 201,
			Conc_Hi: 250.4,
			Conc_Lo: 150.5,
		});
		_aqiFromPM.outlook = 'Very Unhealthy';
	} else if (pm > 55.5) {
		_aqiFromPM.aqi = calcAQI({
			Conc_i: pm,
			AQI_Hi: 200,
			AQI_Lo: 151,
			Conc_Hi: 150.4,
			Conc_Lo: 55.5,
		});
		_aqiFromPM.outlook = 'Unhealthy';
	} else if (pm > 35.5) {
		_aqiFromPM.aqi = calcAQI({
			Conc_i: pm,
			AQI_Hi: 150,
			AQI_Lo: 101,
			Conc_Hi: 55.4,
			Conc_Lo: 35.5,
		});
		_aqiFromPM.outlook = 'Unhealthy for Sensitive Groups';
	} else if (pm > 12.1) {
		_aqiFromPM.aqi = calcAQI({
			Conc_i: pm,
			AQI_Hi: 100,
			AQI_Lo: 51,
			Conc_Hi: 35.4,
			Conc_Lo: 12.1,
		});
		_aqiFromPM.outlook = 'Moderate';
	} else if (pm >= 0) {
		_aqiFromPM.aqi = calcAQI({
			Conc_i: pm,
			AQI_Hi: 50,
			AQI_Lo: 0,
			Conc_Hi: 12,
			Conc_Lo: 0,
		});
		_aqiFromPM.outlook = 'Good';
	} else {
		_aqiFromPM.aqi = undefined;
	}

	_aqiFromPM.success = true;

	return _aqiFromPM;
}
