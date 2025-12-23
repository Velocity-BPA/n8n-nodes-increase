/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	getBaseUrl,
	centsToDollars,
	dollarsToCents,
	validateAmountInCents,
	formatAmountWithSign,
	cleanObject,
	parseIncreaseError,
} from '../nodes/Increase/GenericFunctions';

describe('GenericFunctions', () => {
	describe('getBaseUrl', () => {
		it('should return production URL for production environment', () => {
			expect(getBaseUrl('production')).toBe('https://api.increase.com');
		});

		it('should return sandbox URL for sandbox environment', () => {
			expect(getBaseUrl('sandbox')).toBe('https://sandbox.increase.com');
		});

		it('should return sandbox URL for any other environment', () => {
			expect(getBaseUrl('development')).toBe('https://sandbox.increase.com');
			expect(getBaseUrl('')).toBe('https://sandbox.increase.com');
		});
	});

	describe('centsToDollars', () => {
		it('should convert cents to dollars with two decimal places', () => {
			expect(centsToDollars(100)).toBe('1.00');
			expect(centsToDollars(1000)).toBe('10.00');
			expect(centsToDollars(150)).toBe('1.50');
			expect(centsToDollars(99)).toBe('0.99');
			expect(centsToDollars(1)).toBe('0.01');
		});

		it('should handle zero', () => {
			expect(centsToDollars(0)).toBe('0.00');
		});

		it('should handle negative values', () => {
			expect(centsToDollars(-500)).toBe('-5.00');
		});
	});

	describe('dollarsToCents', () => {
		it('should convert dollars to cents', () => {
			expect(dollarsToCents(1)).toBe(100);
			expect(dollarsToCents(10)).toBe(1000);
			expect(dollarsToCents(1.5)).toBe(150);
			expect(dollarsToCents(0.99)).toBe(99);
			expect(dollarsToCents(0.01)).toBe(1);
		});

		it('should handle zero', () => {
			expect(dollarsToCents(0)).toBe(0);
		});

		it('should round to nearest cent', () => {
			expect(dollarsToCents(1.999)).toBe(200);
			expect(dollarsToCents(1.001)).toBe(100);
		});
	});

	describe('validateAmountInCents', () => {
		it('should return true for valid integers', () => {
			expect(validateAmountInCents(100)).toBe(true);
			expect(validateAmountInCents(0)).toBe(true);
			expect(validateAmountInCents(-500)).toBe(true);
		});

		it('should return false for non-integers', () => {
			expect(validateAmountInCents(100.5)).toBe(false);
			expect(validateAmountInCents(0.01)).toBe(false);
		});
	});

	describe('formatAmountWithSign', () => {
		it('should format positive amounts as credits', () => {
			expect(formatAmountWithSign(1000)).toBe('+$10.00');
			expect(formatAmountWithSign(100)).toBe('+$1.00');
		});

		it('should format negative amounts as debits', () => {
			expect(formatAmountWithSign(-1000)).toBe('-$10.00');
			expect(formatAmountWithSign(-100)).toBe('-$1.00');
		});

		it('should handle zero as positive', () => {
			expect(formatAmountWithSign(0)).toBe('+$0.00');
		});
	});

	describe('cleanObject', () => {
		it('should remove undefined values', () => {
			const input = { a: 'value', b: undefined, c: 'other' };
			const result = cleanObject(input);
			expect(result).toEqual({ a: 'value', c: 'other' });
		});

		it('should remove null values', () => {
			const input = { a: 'value', b: null, c: 'other' };
			const result = cleanObject(input);
			expect(result).toEqual({ a: 'value', c: 'other' });
		});

		it('should remove empty string values', () => {
			const input = { a: 'value', b: '', c: 'other' };
			const result = cleanObject(input);
			expect(result).toEqual({ a: 'value', c: 'other' });
		});

		it('should keep valid values including zero and false', () => {
			const input = { a: 0, b: false, c: 'value' };
			const result = cleanObject(input);
			expect(result).toEqual({ a: 0, b: false, c: 'value' });
		});

		it('should return empty object for all invalid values', () => {
			const input = { a: undefined, b: null, c: '' };
			const result = cleanObject(input);
			expect(result).toEqual({});
		});
	});

	describe('parseIncreaseError', () => {
		it('should parse error with detail', () => {
			const error = {
				error: {
					title: 'Invalid Request',
					detail: 'The account_id field is required',
				},
			};
			expect(parseIncreaseError(error)).toBe('Invalid Request: The account_id field is required');
		});

		it('should parse error with only title', () => {
			const error = {
				error: {
					title: 'Unauthorized',
				},
			};
			expect(parseIncreaseError(error)).toBe('Unauthorized');
		});

		it('should parse error with message', () => {
			const error = {
				message: 'Connection failed',
			};
			expect(parseIncreaseError(error)).toBe('Connection failed');
		});

		it('should return default message for unknown error structure', () => {
			const error = {};
			expect(parseIncreaseError(error)).toBe('An unknown error occurred');
		});
	});
});
