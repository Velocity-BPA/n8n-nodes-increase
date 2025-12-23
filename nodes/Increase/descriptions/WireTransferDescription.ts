/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const wireTransferOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['wireTransfer'],
			},
		},
		options: [
			{
				name: 'Approve',
				value: 'approve',
				description: 'Approve a pending wire transfer',
				action: 'Approve a wire transfer',
			},
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel a pending wire transfer',
				action: 'Cancel a wire transfer',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new wire transfer',
				action: 'Create a wire transfer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a wire transfer by ID',
				action: 'Get a wire transfer',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many wire transfers',
				action: 'Get many wire transfers',
			},
		],
		default: 'getAll',
	},
];

export const wireTransferFields: INodeProperties[] = [
	// ----------------------------------
	//         wireTransfer: create
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['wireTransfer'],
				operation: ['create'],
			},
		},
		description: 'The Increase account to send the wire from',
	},
	{
		displayName: 'Amount (Cents)',
		name: 'amount',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['wireTransfer'],
				operation: ['create'],
			},
		},
		description: 'The transfer amount in cents',
	},
	{
		displayName: 'Beneficiary Name',
		name: 'beneficiaryName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['wireTransfer'],
				operation: ['create'],
			},
		},
		description: 'The name of the wire recipient',
	},
	{
		displayName: 'Message to Recipient',
		name: 'messageToRecipient',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['wireTransfer'],
				operation: ['create'],
			},
		},
		description: 'A message to include with the wire transfer',
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
				resource: ['wireTransfer'],
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
				resource: ['wireTransfer'],
				operation: ['create'],
				destinationType: ['externalAccount'],
			},
		},
		description: 'The ID of the external account to transfer to',
	},
	{
		displayName: 'Routing Number',
		name: 'routingNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['wireTransfer'],
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
				resource: ['wireTransfer'],
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
				resource: ['wireTransfer'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Beneficiary Address Line 1',
				name: 'beneficiary_address_line1',
				type: 'string',
				default: '',
				description: 'First line of the beneficiary address',
			},
			{
				displayName: 'Beneficiary Address Line 2',
				name: 'beneficiary_address_line2',
				type: 'string',
				default: '',
				description: 'Second line of the beneficiary address',
			},
			{
				displayName: 'Beneficiary Address Line 3',
				name: 'beneficiary_address_line3',
				type: 'string',
				default: '',
				description: 'Third line of the beneficiary address',
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
	//         wireTransfer: get, approve, cancel
	// ----------------------------------
	{
		displayName: 'Wire Transfer ID',
		name: 'wireTransferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['wireTransfer'],
				operation: ['get', 'approve', 'cancel'],
			},
		},
		description: 'The identifier of the wire transfer',
	},

	// ----------------------------------
	//         wireTransfer: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['wireTransfer'],
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
				resource: ['wireTransfer'],
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
				resource: ['wireTransfer'],
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
