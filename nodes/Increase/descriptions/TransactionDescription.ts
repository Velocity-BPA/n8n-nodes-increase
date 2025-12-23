/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transactionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transaction'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a transaction by ID',
				action: 'Get a transaction',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many transactions',
				action: 'Get many transactions',
			},
		],
		default: 'getAll',
	},
];

export const transactionFields: INodeProperties[] = [
	// ----------------------------------
	//         transaction: get
	// ----------------------------------
	{
		displayName: 'Transaction ID',
		name: 'transactionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['get'],
			},
		},
		description: 'The identifier of the transaction',
	},

	// ----------------------------------
	//         transaction: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['transaction'],
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
				resource: ['transaction'],
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
				resource: ['transaction'],
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
				displayName: 'Route ID',
				name: 'route_id',
				type: 'string',
				default: '',
				description: 'Filter by route ID',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'multiOptions',
				options: [
					{ name: 'Account Transfer Intention', value: 'account_transfer_intention' },
					{ name: 'ACH Transfer Intention', value: 'ach_transfer_intention' },
					{ name: 'ACH Transfer Rejection', value: 'ach_transfer_rejection' },
					{ name: 'ACH Transfer Return', value: 'ach_transfer_return' },
					{ name: 'Card Dispute Acceptance', value: 'card_dispute_acceptance' },
					{ name: 'Card Refund', value: 'card_refund' },
					{ name: 'Card Revenue Payment', value: 'card_revenue_payment' },
					{ name: 'Card Settlement', value: 'card_settlement' },
					{ name: 'Check Deposit Acceptance', value: 'check_deposit_acceptance' },
					{ name: 'Check Deposit Return', value: 'check_deposit_return' },
					{ name: 'Check Transfer Deposit', value: 'check_transfer_deposit' },
					{ name: 'Check Transfer Stop Payment Request', value: 'check_transfer_stop_payment_request' },
					{ name: 'Fee Payment', value: 'fee_payment' },
					{ name: 'Inbound ACH Transfer', value: 'inbound_ach_transfer' },
					{ name: 'Inbound Check', value: 'inbound_check' },
					{ name: 'Inbound Real-Time Payments Transfer', value: 'inbound_real_time_payments_transfer_confirmation' },
					{ name: 'Inbound Wire Reversal', value: 'inbound_wire_reversal' },
					{ name: 'Inbound Wire Transfer', value: 'inbound_wire_transfer' },
					{ name: 'Interest Payment', value: 'interest_payment' },
					{ name: 'Internal Source', value: 'internal_source' },
					{ name: 'Real-Time Payments Transfer', value: 'real_time_payments_transfer_acknowledgement' },
					{ name: 'Sample Funds', value: 'sample_funds' },
					{ name: 'Wire Transfer Intention', value: 'wire_transfer_intention' },
					{ name: 'Wire Transfer Rejection', value: 'wire_transfer_rejection' },
					{ name: 'Other', value: 'other' },
				],
				default: [],
				description: 'Filter by transaction category',
			},
			{
				displayName: 'Created After',
				name: 'created_at.after',
				type: 'dateTime',
				default: '',
				description: 'Filter transactions created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'created_at.before',
				type: 'dateTime',
				default: '',
				description: 'Filter transactions created before this date',
			},
		],
	},
];

export const pendingTransactionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['pendingTransaction'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a pending transaction by ID',
				action: 'Get a pending transaction',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many pending transactions',
				action: 'Get many pending transactions',
			},
		],
		default: 'getAll',
	},
];

export const pendingTransactionFields: INodeProperties[] = [
	// ----------------------------------
	//         pendingTransaction: get
	// ----------------------------------
	{
		displayName: 'Pending Transaction ID',
		name: 'pendingTransactionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['pendingTransaction'],
				operation: ['get'],
			},
		},
		description: 'The identifier of the pending transaction',
	},

	// ----------------------------------
	//         pendingTransaction: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['pendingTransaction'],
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
				resource: ['pendingTransaction'],
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
				resource: ['pendingTransaction'],
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
				displayName: 'Route ID',
				name: 'route_id',
				type: 'string',
				default: '',
				description: 'Filter by route ID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Pending', value: 'pending' },
					{ name: 'Complete', value: 'complete' },
				],
				default: 'pending',
				description: 'Filter by status',
			},
			{
				displayName: 'Created After',
				name: 'created_at.after',
				type: 'dateTime',
				default: '',
				description: 'Filter pending transactions created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'created_at.before',
				type: 'dateTime',
				default: '',
				description: 'Filter pending transactions created before this date',
			},
		],
	},
];
