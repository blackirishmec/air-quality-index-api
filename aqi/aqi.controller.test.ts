import { describe, expect, test } from 'vitest';

import { cityNames } from '@/aqi/aqi.controller';

describe('cityNames', () => {
	test('should be successful', async () => {
		const resp = await cityNames();
		expect(resp.success).toBe(true);
		expect(resp.success).toBe(true);
		expect(resp.success).toBe(true);
	});

	test('should not return an error message', async () => {
		const resp = await cityNames();
		expect(resp.success).toBe(true);
		expect(resp.success).toBe(true);
		expect(resp.success).toBe(true);
	});

	test('should return array of all valid city names', async () => {
		const resp = await cityNames();
		expect(resp.result).toBe([
			'burlington',
			'williston',
			'encino',
			'boston',
			'revelstoke',
		]);
	});
});
