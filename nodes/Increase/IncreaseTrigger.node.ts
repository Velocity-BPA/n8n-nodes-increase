/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

import { increaseApiRequest } from './GenericFunctions';

export class IncreaseTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Increase Trigger',
		name: 'increaseTrigger',
		icon: 'file:increase.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Receive webhooks from Increase Banking-as-a-Service platform',
		defaults: {
			name: 'Increase Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'increaseApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				options: [
					{
						name: 'Account - Created',
						value: 'account.created',
					},
					{
						name: 'Account - Updated',
						value: 'account.updated',
					},
					{
						name: 'ACH Transfer - Created',
						value: 'ach_transfer.created',
					},
					{
						name: 'ACH Transfer - Updated',
						value: 'ach_transfer.updated',
					},
					{
						name: 'Check Deposit - Created',
						value: 'check_deposit.created',
					},
					{
						name: 'Check Deposit - Updated',
						value: 'check_deposit.updated',
					},
					{
						name: 'Check Transfer - Created',
						value: 'check_transfer.created',
					},
					{
						name: 'Check Transfer - Updated',
						value: 'check_transfer.updated',
					},
					{
						name: 'Inbound ACH Transfer - Created',
						value: 'inbound_ach_transfer.created',
					},
					{
						name: 'Inbound ACH Transfer - Updated',
						value: 'inbound_ach_transfer.updated',
					},
					{
						name: 'Real-Time Payments Transfer - Created',
						value: 'real_time_payments_transfer.created',
					},
					{
						name: 'Real-Time Payments Transfer - Updated',
						value: 'real_time_payments_transfer.updated',
					},
					{
						name: 'Transaction - Created',
						value: 'transaction.created',
					},
					{
						name: 'Wire Transfer - Created',
						value: 'wire_transfer.created',
					},
					{
						name: 'Wire Transfer - Updated',
						value: 'wire_transfer.updated',
					},
				],
				description: 'The events to listen to',
			},
			{
				displayName: 'Shared Secret',
				name: 'sharedSecret',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Optional shared secret for webhook signature verification (HMAC-SHA256)',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				
				if (webhookData.webhookId === undefined) {
					return false;
				}

				try {
					await increaseApiRequest.call(
						this,
						'GET',
						`/event_subscriptions/${webhookData.webhookId}`,
					);
					return true;
				} catch (error) {
					return false;
				}
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				const events = this.getNodeParameter('events') as string[];
				const sharedSecret = this.getNodeParameter('sharedSecret') as string;

				const body: IDataObject = {
					url: webhookUrl,
				};

				// If specific events selected, use wildcard for the category
				// Increase uses category-based filtering
				if (events.length > 0) {
					// Get unique categories from events (e.g., 'account', 'ach_transfer')
					const categories = [...new Set(events.map(e => e.split('.')[0]))];
					if (categories.length === 1) {
						body.selected_event_category = `${categories[0]}.*`;
					}
					// If multiple categories, we'll use '*' (all events) and filter in the webhook
				}

				if (sharedSecret) {
					body.shared_secret = sharedSecret;
				}

				const responseData = await increaseApiRequest.call(
					this,
					'POST',
					'/event_subscriptions',
					body,
				);

				if (responseData.id === undefined) {
					return false;
				}

				webhookData.webhookId = responseData.id as string;
				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId === undefined) {
					return true;
				}

				try {
					await increaseApiRequest.call(
						this,
						'PATCH',
						`/event_subscriptions/${webhookData.webhookId}`,
						{ status: 'deleted' },
					);
				} catch (error) {
					return false;
				}

				delete webhookData.webhookId;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const headerData = this.getHeaderData() as IDataObject;
		const events = this.getNodeParameter('events') as string[];
		const sharedSecret = this.getNodeParameter('sharedSecret') as string;

		// Verify webhook signature if shared secret is configured
		if (sharedSecret) {
			const signature = headerData['increase-webhook-signature'] as string;
			if (signature) {
				const crypto = await import('crypto');
				const rawBody = this.getBodyData();
				const bodyString = JSON.stringify(rawBody);
				const expectedSignature = crypto
					.createHmac('sha256', sharedSecret)
					.update(bodyString)
					.digest('hex');

				if (signature !== expectedSignature) {
					return {
						webhookResponse: 'Signature mismatch',
					};
				}
			}
		}

		// Check if the event type matches the configured events
		const eventCategory = bodyData.category as string;
		if (events.length > 0 && !events.includes(eventCategory)) {
			return {
				webhookResponse: 'Event not subscribed',
			};
		}

		return {
			workflowData: [
				this.helpers.returnJsonArray(bodyData),
			],
		};
	}
}
