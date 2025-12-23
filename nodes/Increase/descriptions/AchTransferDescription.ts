/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const achTransferOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['achTransfer'],
			},
		},
		options: [
			{
				name: 'Approve',
				value: 'approve',
				description: 'Approve a pending ACH transfer',
				action: 'Approve an ACH transfer',
			},
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel a pending or submitted ACH transfer',
				action: 'Cancel an ACH transfer',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new ACH transfer',
				action: 'Create an ACH transfer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an ACH transfer by ID',
				action: 'Get an ACH transfer',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many ACH transfers',
				action: 'Get many ACH transfers',
			},
		],
		default: 'getAll',
	},
];

export const achTransferFields: INodeProperties[] = [
	// ----------------------------------
	//         achTransfer: create
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['achTransfer'],
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
				resource: ['achTransfer'],
				operation: ['create'],
			},
		},
		description: 'The transfer amount in cents. Positive for credit (sending money), negative for debit (receiving money).',
	},
	{
		displayName: 'Statement Descriptor',
		name: 'statementDescriptor',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['achTransfer'],
				operation: ['create'],
			},
		},
		description: 'A description that will appear on the recipients bank statement (max 10 characters)',
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
				resource: ['achTransfer'],
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
				resource: ['achTransfer'],
				operation: ['create'],
				destinationType: ['externalAccount'],
			},
		},
		description: 'The ID of the external account to transfer to/from',
	},
	{
		displayName: 'Routing Number',
		name: 'routingNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['achTransfer'],
				operation: ['create'],
				destinationType: ['manual'],
			},
		},
		description: 'The routing number of the destination bank',
	},
	{
		displayName: 'Account Number',
		name: 'accountNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['achTransfer'],
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
				resource: ['achTransfer'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Company Descriptive Date',
				name: 'company_descriptive_date',
				type: 'string',
				default: '',
				description: 'The description of the date of the transfer (max 6 characters)',
			},
			{
				displayName: 'Company Discretionary Data',
				name: 'company_discretionary_data',
				type: 'string',
				default: '',
				description: 'Optional data associated with the transfer (max 20 characters)',
			},
			{
				displayName: 'Company Entry Description',
				name: 'company_entry_description',
				type: 'string',
				default: '',
				description: 'The description of the transfer (max 10 characters)',
			},
			{
				displayName: 'Company Name',
				name: 'company_name',
				type: 'string',
				default: '',
				description: 'The name by which the recipient knows you (max 16 characters)',
			},
			{
				displayName: 'Effective Date',
				name: 'effective_date',
				type: 'dateTime',
				default: '',
				description: 'The date the transfer should be processed',
			},
			{
				displayName: 'Individual ID',
				name: 'individual_id',
				type: 'string',
				default: '',
				description: 'An identifier for the recipient (max 15 characters)',
			},
			{
				displayName: 'Individual Name',
				name: 'individual_name',
				type: 'string',
				default: '',
				description: 'The name of the recipient (max 22 characters)',
			},
			{
				displayName: 'Require Approval',
				name: 'require_approval',
				type: 'boolean',
				default: false,
				description: 'Whether the transfer requires approval before processing',
			},
			{
				displayName: 'Standard Entry Class Code',
				name: 'standard_entry_class_code',
				type: 'options',
				options: [
					{ name: 'CCD - Corporate Credit or Debit', value: 'corporate_credit_or_debit' },
					{ name: 'CTX - Corporate Trade Exchange', value: 'corporate_trade_exchange' },
					{ name: 'PPD - Prearranged Payment and Deposit', value: 'prearranged_payments_and_deposit' },
					{ name: 'WEB - Internet-Initiated Entry', value: 'internet_initiated' },
				],
				default: 'corporate_credit_or_debit',
				description: 'The SEC code for the transfer',
			},
		],
	},

	// ----------------------------------
	//         achTransfer: get, approve, cancel
	// ----------------------------------
	{
		displayName: 'ACH Transfer ID',
		name: 'achTransferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['achTransfer'],
				operation: ['get', 'approve', 'cancel'],
			},
		},
		description: 'The identifier of the ACH transfer',
	},

	// ----------------------------------
	//         achTransfer: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['achTransfer'],
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
				resource: ['achTransfer'],
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
				resource: ['achTransfer'],
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
