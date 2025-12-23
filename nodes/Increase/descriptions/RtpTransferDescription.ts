/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const rtpTransferOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['rtpTransfer'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new Real-Time Payments transfer',
				action: 'Create an RTP transfer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an RTP transfer by ID',
				action: 'Get an RTP transfer',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many RTP transfers',
				action: 'Get many RTP transfers',
			},
		],
		default: 'getAll',
	},
];

export const rtpTransferFields: INodeProperties[] = [
	// ----------------------------------
	//         rtpTransfer: create
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['rtpTransfer'],
				operation: ['create'],
			},
		},
		description: 'The Increase account to send the transfer from',
	},
	{
		displayName: 'Amount (Cents)',
		name: 'amount',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['rtpTransfer'],
				operation: ['create'],
			},
		},
		description: 'The transfer amount in cents',
	},
	{
		displayName: 'Creditor Name',
		name: 'creditorName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['rtpTransfer'],
				operation: ['create'],
			},
		},
		description: 'The name of the party receiving the transfer',
	},
	{
		displayName: 'Remittance Information',
		name: 'remittanceInformation',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['rtpTransfer'],
				operation: ['create'],
			},
		},
		description: 'Information about the purpose of the transfer',
	},
	{
		displayName: 'Destination Type',
		name: 'destinationType',
		type: 'options',
		required: true,
		options: [
			{
				name: 'External Account ID',
				value: 'externalAccount',
				description: 'Use an existing external account',
			},
			{
				name: 'Manual Entry',
				value: 'manual',
				description: 'Enter routing and account numbers manually',
			},
		],
		default: 'manual',
		displayOptions: {
			show: {
				resource: ['rtpTransfer'],
				operation: ['create'],
			},
		},
		description: 'How to specify the destination account',
	},
	{
		displayName: 'External Account ID',
		name: 'externalAccountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['rtpTransfer'],
				operation: ['create'],
				destinationType: ['externalAccount'],
			},
		},
		description: 'The ID of the external account to transfer to',
	},
	{
		displayName: 'Destination Routing Number',
		name: 'destinationRoutingNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['rtpTransfer'],
				operation: ['create'],
				destinationType: ['manual'],
			},
		},
		description: 'The routing number of the destination bank',
	},
	{
		displayName: 'Destination Account Number',
		name: 'destinationAccountNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['rtpTransfer'],
				operation: ['create'],
				destinationType: ['manual'],
			},
		},
		description: 'The account number of the destination',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['rtpTransfer'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Debtor Name',
				name: 'debtor_name',
				type: 'string',
				default: '',
				description: 'The name of the party sending the transfer (defaults to your company name)',
			},
			{
				displayName: 'Require Approval',
				name: 'require_approval',
				type: 'boolean',
				default: false,
				description: 'Whether the transfer requires approval before processing',
			},
			{
				displayName: 'Ultimate Creditor Name',
				name: 'ultimate_creditor_name',
				type: 'string',
				default: '',
				description: 'The ultimate party receiving the transfer (if different from creditor)',
			},
			{
				displayName: 'Ultimate Debtor Name',
				name: 'ultimate_debtor_name',
				type: 'string',
				default: '',
				description: 'The ultimate party sending the transfer (if different from debtor)',
			},
		],
	},

	// ----------------------------------
	//         rtpTransfer: get
	// ----------------------------------
	{
		displayName: 'RTP Transfer ID',
		name: 'rtpTransferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['rtpTransfer'],
				operation: ['get'],
			},
		},
		description: 'The identifier of the Real-Time Payments transfer',
	},

	// ----------------------------------
	//         rtpTransfer: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['rtpTransfer'],
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
				resource: ['rtpTransfer'],
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
				resource: ['rtpTransfer'],
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
				displayName: 'External Account ID',
				name: 'external_account_id',
				type: 'string',
				default: '',
				description: 'Filter by external account ID',
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
