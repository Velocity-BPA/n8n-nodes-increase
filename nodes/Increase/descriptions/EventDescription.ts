/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const eventOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['event'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get an event by ID',
				action: 'Get an event',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many events',
				action: 'Get many events',
			},
		],
		default: 'getAll',
	},
];

export const eventFields: INodeProperties[] = [
	// ----------------------------------
	//         event: get
	// ----------------------------------
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['get'],
			},
		},
		description: 'The identifier of the event',
	},

	// ----------------------------------
	//         event: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Associated Object ID',
				name: 'associated_object_id',
				type: 'string',
				default: '',
				description: 'Filter by associated object ID',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'multiOptions',
				options: [
					{ name: 'Account Created', value: 'account.created' },
					{ name: 'Account Updated', value: 'account.updated' },
					{ name: 'ACH Transfer Created', value: 'ach_transfer.created' },
					{ name: 'ACH Transfer Updated', value: 'ach_transfer.updated' },
					{ name: 'Check Deposit Created', value: 'check_deposit.created' },
					{ name: 'Check Deposit Updated', value: 'check_deposit.updated' },
					{ name: 'Check Transfer Created', value: 'check_transfer.created' },
					{ name: 'Check Transfer Updated', value: 'check_transfer.updated' },
					{ name: 'Inbound ACH Transfer Created', value: 'inbound_ach_transfer.created' },
					{ name: 'Inbound ACH Transfer Updated', value: 'inbound_ach_transfer.updated' },
					{ name: 'Real-Time Payments Transfer Created', value: 'real_time_payments_transfer.created' },
					{ name: 'Real-Time Payments Transfer Updated', value: 'real_time_payments_transfer.updated' },
					{ name: 'Transaction Created', value: 'transaction.created' },
					{ name: 'Wire Transfer Created', value: 'wire_transfer.created' },
					{ name: 'Wire Transfer Updated', value: 'wire_transfer.updated' },
				],
				default: [],
				description: 'Filter by event category',
			},
			{
				displayName: 'Created After',
				name: 'created_at.after',
				type: 'dateTime',
				default: '',
				description: 'Filter events created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'created_at.before',
				type: 'dateTime',
				default: '',
				description: 'Filter events created before this date',
			},
		],
	},
];

export const eventSubscriptionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['eventSubscription'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new event subscription',
				action: 'Create an event subscription',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an event subscription by ID',
				action: 'Get an event subscription',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many event subscriptions',
				action: 'Get many event subscriptions',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an event subscription',
				action: 'Update an event subscription',
			},
		],
		default: 'getAll',
	},
];

export const eventSubscriptionFields: INodeProperties[] = [
	// ----------------------------------
	//         eventSubscription: create
	// ----------------------------------
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['eventSubscription'],
				operation: ['create'],
			},
		},
		description: 'The URL to send webhook events to',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['eventSubscription'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Selected Event Category',
				name: 'selected_event_category',
				type: 'options',
				options: [
					{ name: 'All Events', value: '*' },
					{ name: 'Account Events', value: 'account.*' },
					{ name: 'ACH Transfer Events', value: 'ach_transfer.*' },
					{ name: 'Check Events', value: 'check_transfer.*' },
					{ name: 'Inbound ACH Events', value: 'inbound_ach_transfer.*' },
					{ name: 'RTP Events', value: 'real_time_payments_transfer.*' },
					{ name: 'Transaction Events', value: 'transaction.*' },
					{ name: 'Wire Transfer Events', value: 'wire_transfer.*' },
				],
				default: '*',
				description: 'Filter which events to subscribe to',
			},
			{
				displayName: 'Shared Secret',
				name: 'shared_secret',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'A shared secret used for webhook signature verification',
			},
		],
	},

	// ----------------------------------
	//         eventSubscription: get, update
	// ----------------------------------
	{
		displayName: 'Event Subscription ID',
		name: 'eventSubscriptionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['eventSubscription'],
				operation: ['get', 'update'],
			},
		},
		description: 'The identifier of the event subscription',
	},

	// ----------------------------------
	//         eventSubscription: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['eventSubscription'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Disabled', value: 'disabled' },
					{ name: 'Deleted', value: 'deleted' },
				],
				default: 'active',
				description: 'The status of the subscription',
			},
		],
	},

	// ----------------------------------
	//         eventSubscription: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['eventSubscription'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['eventSubscription'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
];

export const accountStatementOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['accountStatement'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get an account statement by ID',
				action: 'Get an account statement',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many account statements',
				action: 'Get many account statements',
			},
		],
		default: 'getAll',
	},
];

export const accountStatementFields: INodeProperties[] = [
	// ----------------------------------
	//         accountStatement: get
	// ----------------------------------
	{
		displayName: 'Account Statement ID',
		name: 'accountStatementId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['accountStatement'],
				operation: ['get'],
			},
		},
		description: 'The identifier of the account statement',
	},

	// ----------------------------------
	//         accountStatement: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['accountStatement'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['accountStatement'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['accountStatement'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Account ID',
				name: 'account_id',
				type: 'string',
				default: '',
				description: 'Filter by account ID',
			},
			{
				displayName: 'Statement Period Start After',
				name: 'statement_period_start.after',
				type: 'dateTime',
				default: '',
				description: 'Filter statements with period start after this date',
			},
			{
				displayName: 'Statement Period Start Before',
				name: 'statement_period_start.before',
				type: 'dateTime',
				default: '',
				description: 'Filter statements with period start before this date',
			},
		],
	},
];
