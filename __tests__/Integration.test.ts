/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Integration Tests for n8n-nodes-increase
 * 
 * These tests verify the node's functionality against the Increase Sandbox API.
 * 
 * Prerequisites:
 * 1. Set the INCREASE_API_KEY environment variable with your Sandbox API key
 * 2. Ensure you have a valid Increase Sandbox account
 * 
 * Run with: INCREASE_API_KEY=your_key npm test
 */

import { getBaseUrl } from '../nodes/Increase/GenericFunctions';

// Type for API response
interface ApiResponse {
	data?: unknown[];
	[key: string]: unknown;
}

// Skip integration tests if no API key is provided
const API_KEY = process.env.INCREASE_API_KEY;
const SKIP_INTEGRATION = !API_KEY;

describe('Increase API Integration Tests', () => {
	const baseUrl = getBaseUrl('sandbox');

	// Helper function to make API requests
	async function makeRequest(
		method: string,
		endpoint: string,
		body?: Record<string, unknown>,
	): Promise<Response> {
		const options: RequestInit = {
			method,
			headers: {
				'Authorization': `Bearer ${API_KEY}`,
				'Content-Type': 'application/json',
			},
		};

		if (body && Object.keys(body).length > 0) {
			options.body = JSON.stringify(body);
		}

		return fetch(`${baseUrl}${endpoint}`, options);
	}

	describe('Account Operations', () => {
		(SKIP_INTEGRATION ? it.skip : it)('should list accounts', async () => {
			const response = await makeRequest('GET', '/accounts?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});

		(SKIP_INTEGRATION ? it.skip : it)('should handle invalid account ID', async () => {
			const response = await makeRequest('GET', '/accounts/invalid_id');
			expect(response.ok).toBe(false);
			expect(response.status).toBe(404);
		});
	});

	describe('Transfer Operations', () => {
		(SKIP_INTEGRATION ? it.skip : it)('should list ACH transfers', async () => {
			const response = await makeRequest('GET', '/ach_transfers?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});

		(SKIP_INTEGRATION ? it.skip : it)('should list wire transfers', async () => {
			const response = await makeRequest('GET', '/wire_transfers?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});

		(SKIP_INTEGRATION ? it.skip : it)('should list RTP transfers', async () => {
			const response = await makeRequest('GET', '/real_time_payments_transfers?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});
	});

	describe('Transaction Operations', () => {
		(SKIP_INTEGRATION ? it.skip : it)('should list transactions', async () => {
			const response = await makeRequest('GET', '/transactions?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});

		(SKIP_INTEGRATION ? it.skip : it)('should list pending transactions', async () => {
			const response = await makeRequest('GET', '/pending_transactions?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});
	});

	describe('External Account Operations', () => {
		(SKIP_INTEGRATION ? it.skip : it)('should list external accounts', async () => {
			const response = await makeRequest('GET', '/external_accounts?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});
	});

	describe('Entity Operations', () => {
		(SKIP_INTEGRATION ? it.skip : it)('should list entities', async () => {
			const response = await makeRequest('GET', '/entities?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});
	});

	describe('Event Operations', () => {
		(SKIP_INTEGRATION ? it.skip : it)('should list events', async () => {
			const response = await makeRequest('GET', '/events?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});

		(SKIP_INTEGRATION ? it.skip : it)('should list event subscriptions', async () => {
			const response = await makeRequest('GET', '/event_subscriptions?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});
	});

	describe('Check Operations', () => {
		(SKIP_INTEGRATION ? it.skip : it)('should list check transfers', async () => {
			const response = await makeRequest('GET', '/check_transfers?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});

		(SKIP_INTEGRATION ? it.skip : it)('should list check deposits', async () => {
			const response = await makeRequest('GET', '/check_deposits?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});
	});

	describe('Inbound Transfer Operations', () => {
		(SKIP_INTEGRATION ? it.skip : it)('should list inbound ACH transfers', async () => {
			const response = await makeRequest('GET', '/inbound_ach_transfers?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});
	});

	describe('Account Statement Operations', () => {
		(SKIP_INTEGRATION ? it.skip : it)('should list account statements', async () => {
			const response = await makeRequest('GET', '/account_statements?limit=1');
			expect(response.ok).toBe(true);

			const data = await response.json() as ApiResponse;
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});
	});
});
