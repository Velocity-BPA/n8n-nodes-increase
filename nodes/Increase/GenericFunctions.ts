/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

/**
 * Get the base URL for the Increase API based on environment
 */
export function getBaseUrl(environment: string): string {
	return environment === 'production'
		? 'https://api.increase.com'
		: 'https://sandbox.increase.com';
}

/**
 * Make an authenticated request to the Increase API
 */
export async function increaseApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('increaseApi');
	const baseUrl = getBaseUrl(credentials.environment as string);

	const options: IRequestOptions = {
		method,
		uri: `${baseUrl}${endpoint}`,
		headers: {
			'Content-Type': 'application/json',
		},
		qs: query,
		json: true,
	};

	if (Object.keys(body).length > 0) {
		options.body = body;
	}

	// Remove empty query parameters
	if (Object.keys(query).length === 0) {
		delete options.qs;
	}

	try {
		return await this.helpers.requestWithAuthentication.call(this, 'increaseApi', options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: parseIncreaseError(error),
		});
	}
}

/**
 * Make an authenticated request with pagination support
 */
export async function increaseApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	propertyName: string = 'data',
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let responseData: IDataObject;
	let nextCursor: string | undefined;

	query.limit = query.limit || 100;

	do {
		if (nextCursor) {
			query.cursor = nextCursor;
		}

		responseData = await increaseApiRequest.call(this, method, endpoint, body, query);

		const items = responseData[propertyName] as IDataObject[];
		if (items && Array.isArray(items)) {
			returnData.push(...items);
		}

		nextCursor = responseData.next_cursor as string | undefined;
	} while (nextCursor);

	return returnData;
}

/**
 * Parse Increase API error response
 */
export function parseIncreaseError(error: unknown): string {
	const err = error as IDataObject;
	if (err.error) {
		const errorObj = err.error as IDataObject;
		if (errorObj.detail) {
			return `${errorObj.title || 'Error'}: ${errorObj.detail}`;
		}
		if (errorObj.title) {
			return errorObj.title as string;
		}
	}
	if (err.message) {
		return err.message as string;
	}
	return 'An unknown error occurred';
}

/**
 * Convert cents to dollars for display
 */
export function centsToDollars(cents: number): string {
	return (cents / 100).toFixed(2);
}

/**
 * Convert dollars to cents
 */
export function dollarsToCents(dollars: number): number {
	return Math.round(dollars * 100);
}

/**
 * Validate that an amount is in cents (integer)
 */
export function validateAmountInCents(amount: number): boolean {
	return Number.isInteger(amount);
}

/**
 * Format amount with sign indicator
 * Positive = credit, Negative = debit
 */
export function formatAmountWithSign(cents: number): string {
	const dollars = centsToDollars(Math.abs(cents));
	const sign = cents >= 0 ? '+' : '-';
	return `${sign}$${dollars}`;
}

/**
 * HMAC-SHA256 signature verification for webhooks
 */
export async function verifyWebhookSignature(
	this: IWebhookFunctions,
	signature: string,
	body: string,
	secret: string,
): Promise<boolean> {
	const crypto = await import('crypto');
	const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');
	return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

/**
 * Simple object filter - removes undefined/null values
 */
export function cleanObject(obj: IDataObject): IDataObject {
	const cleaned: IDataObject = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value !== undefined && value !== null && value !== '') {
			cleaned[key] = value;
		}
	}
	return cleaned;
}
