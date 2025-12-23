/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const checkTransferOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
			},
		},
		options: [
			{
				name: 'Approve',
				value: 'approve',
				description: 'Approve a pending check transfer',
				action: 'Approve a check transfer',
			},
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel a pending check transfer',
				action: 'Cancel a check transfer',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new check transfer',
				action: 'Create a check transfer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a check transfer by ID',
				action: 'Get a check transfer',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many check transfers',
				action: 'Get many check transfers',
			},
			{
				name: 'Stop Payment',
				value: 'stopPayment',
				description: 'Stop payment on a check transfer',
				action: 'Stop payment on a check transfer',
			},
		],
		default: 'getAll',
	},
];

export const checkTransferFields: INodeProperties[] = [
	// ----------------------------------
	//         checkTransfer: create
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
				operation: ['create'],
			},
		},
		description: 'The Increase account to send the check from',
	},
	{
		displayName: 'Amount (Cents)',
		name: 'amount',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
				operation: ['create'],
			},
		},
		description: 'The amount in cents',
	},
	{
		displayName: 'Source Account Number ID',
		name: 'sourceAccountNumberId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
				operation: ['create'],
			},
		},
		description: 'The identifier of the Account Number from which to send the check',
	},
	{
		displayName: 'Fulfillment Method',
		name: 'fulfillmentMethod',
		type: 'options',
		required: true,
		options: [
			{
				name: 'Physical Check',
				value: 'physical_check',
				description: 'Mail a physical check',
			},
			{
				name: 'Third Party',
				value: 'third_party',
				description: 'Use a third-party check printing service',
			},
		],
		default: 'physical_check',
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
				operation: ['create'],
			},
		},
		description: 'How to fulfill the check transfer',
	},
	{
		displayName: 'Recipient Name',
		name: 'recipientName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
				operation: ['create'],
				fulfillmentMethod: ['physical_check'],
			},
		},
		description: 'The name of the person receiving the check',
	},
	{
		displayName: 'Recipient Address Line 1',
		name: 'recipientAddressLine1',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
				operation: ['create'],
				fulfillmentMethod: ['physical_check'],
			},
		},
		description: 'First line of the recipient address',
	},
	{
		displayName: 'Recipient City',
		name: 'recipientCity',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
				operation: ['create'],
				fulfillmentMethod: ['physical_check'],
			},
		},
		description: 'City of the recipient address',
	},
	{
		displayName: 'Recipient State',
		name: 'recipientState',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
				operation: ['create'],
				fulfillmentMethod: ['physical_check'],
			},
		},
		description: 'State of the recipient address (two-letter code)',
	},
	{
		displayName: 'Recipient Postal Code',
		name: 'recipientPostalCode',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
				operation: ['create'],
				fulfillmentMethod: ['physical_check'],
			},
		},
		description: 'ZIP code of the recipient',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				default: '',
				description: 'The memo field on the check',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				description: 'A message to include with the check',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
				description: 'A note to include with the check',
			},
			{
				displayName: 'Recipient Address Line 2',
				name: 'physical_check.recipient_address.line2',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						'/fulfillmentMethod': ['physical_check'],
					},
				},
				description: 'Second line of the recipient address',
			},
			{
				displayName: 'Return Address Name',
				name: 'physical_check.return_address.name',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						'/fulfillmentMethod': ['physical_check'],
					},
				},
				description: 'Name for the return address',
			},
			{
				displayName: 'Return Address Line 1',
				name: 'physical_check.return_address.line1',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						'/fulfillmentMethod': ['physical_check'],
					},
				},
				description: 'First line of the return address',
			},
			{
				displayName: 'Return Address City',
				name: 'physical_check.return_address.city',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						'/fulfillmentMethod': ['physical_check'],
					},
				},
				description: 'City of the return address',
			},
			{
				displayName: 'Return Address State',
				name: 'physical_check.return_address.state',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						'/fulfillmentMethod': ['physical_check'],
					},
				},
				description: 'State of the return address',
			},
			{
				displayName: 'Return Address Postal Code',
				name: 'physical_check.return_address.postal_code',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						'/fulfillmentMethod': ['physical_check'],
					},
				},
				description: 'ZIP code of the return address',
			},
			{
				displayName: 'Require Approval',
				name: 'require_approval',
				type: 'boolean',
				default: false,
				description: 'Whether the transfer requires approval before processing',
			},
		],
	},

	// ----------------------------------
	//         checkTransfer: get, approve, cancel, stopPayment
	// ----------------------------------
	{
		displayName: 'Check Transfer ID',
		name: 'checkTransferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
				operation: ['get', 'approve', 'cancel', 'stopPayment'],
			},
		},
		description: 'The identifier of the check transfer',
	},

	// ----------------------------------
	//         checkTransfer: stopPayment
	// ----------------------------------
	{
		displayName: 'Reason',
		name: 'reason',
		type: 'options',
		required: true,
		options: [
			{ name: 'Mail Delivery Failed', value: 'mail_delivery_failed' },
			{ name: 'Not Authorized', value: 'not_authorized' },
			{ name: 'Unknown', value: 'unknown' },
		],
		default: 'unknown',
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
				operation: ['stopPayment'],
			},
		},
		description: 'The reason for stopping payment',
	},

	// ----------------------------------
	//         checkTransfer: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['checkTransfer'],
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
				resource: ['checkTransfer'],
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
				resource: ['checkTransfer'],
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
				displayName: 'Created After',
				name: 'created_at.after',
				type: 'dateTime',
				default: '',
				description: 'Filter transfers created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'created_at.before',
				type: 'dateTime',
				default: '',
				description: 'Filter transfers created before this date',
			},
		],
	},
];

export const checkDepositOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['checkDeposit'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new check deposit',
				action: 'Create a check deposit',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a check deposit by ID',
				action: 'Get a check deposit',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many check deposits',
				action: 'Get many check deposits',
			},
		],
		default: 'getAll',
	},
];

export const checkDepositFields: INodeProperties[] = [
	// ----------------------------------
	//         checkDeposit: create
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkDeposit'],
				operation: ['create'],
			},
		},
		description: 'The Increase account to deposit the check into',
	},
	{
		displayName: 'Amount (Cents)',
		name: 'amount',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['checkDeposit'],
				operation: ['create'],
			},
		},
		description: 'The amount in cents',
	},
	{
		displayName: 'Back Image File ID',
		name: 'backImageFileId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkDeposit'],
				operation: ['create'],
			},
		},
		description: 'The File ID of the back image of the check',
	},
	{
		displayName: 'Front Image File ID',
		name: 'frontImageFileId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkDeposit'],
				operation: ['create'],
			},
		},
		description: 'The File ID of the front image of the check',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['checkDeposit'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description for the check deposit',
			},
		],
	},

	// ----------------------------------
	//         checkDeposit: get
	// ----------------------------------
	{
		displayName: 'Check Deposit ID',
		name: 'checkDepositId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkDeposit'],
				operation: ['get'],
			},
		},
		description: 'The identifier of the check deposit',
	},

	// ----------------------------------
	//         checkDeposit: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['checkDeposit'],
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
				resource: ['checkDeposit'],
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
				resource: ['checkDeposit'],
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
				displayName: 'Created After',
				name: 'created_at.after',
				type: 'dateTime',
				default: '',
				description: 'Filter deposits created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'created_at.before',
				type: 'dateTime',
				default: '',
				description: 'Filter deposits created before this date',
			},
		],
	},
];
