export function sanitizeAQIErrorString(error: unknown) {
	return error !== undefined && error !== null
		? (error as string)
		: ('Error fetching AQI' as string);
}
