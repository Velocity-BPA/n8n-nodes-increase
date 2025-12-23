/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const externalAccountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['externalAccount'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new external account',
				action: 'Create an external account',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an external account by ID',
				action: 'Get an external account',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many external accounts',
				action: 'Get many external accounts',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an external account',
				action: 'Update an external account',
			},
		],
		default: 'getAll',
	},
];

export const externalAccountFields: INodeProperties[] = [
	// ----------------------------------
	//         externalAccount: create
	// ----------------------------------
	{
		displayName: 'Account Number',
		name: 'accountNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['create'],
			},
		},
		description: 'The account number of the external account',
	},
	{
		displayName: 'Routing Number',
		name: 'routingNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['create'],
			},
		},
		description: 'The routing number of the external bank',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['create'],
			},
		},
		description: 'A description for this external account',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Account Holder',
				name: 'account_holder',
				type: 'options',
				options: [
					{ name: 'Business', value: 'business' },
					{ name: 'Individual', value: 'individual' },
					{ name: 'Unknown', value: 'unknown' },
				],
				default: 'unknown',
				description: 'The type of entity that owns the external account',
			},
			{
				displayName: 'Funding',
				name: 'funding',
				type: 'options',
				options: [
					{ name: 'Checking', value: 'checking' },
					{ name: 'Savings', value: 'savings' },
					{ name: 'Other', value: 'other' },
				],
				default: 'checking',
				description: 'The type of account (checking, savings, or other)',
			},
		],
	},

	// ----------------------------------
	//         externalAccount: get, update
	// ----------------------------------
	{
		displayName: 'External Account ID',
		name: 'externalAccountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['get', 'update'],
			},
		},
		description: 'The identifier of the external account',
	},

	// ----------------------------------
	//         externalAccount: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Account Holder',
				name: 'account_holder',
				type: 'options',
				options: [
					{ name: 'Business', value: 'business' },
					{ name: 'Individual', value: 'individual' },
					{ name: 'Unknown', value: 'unknown' },
				],
				default: 'unknown',
				description: 'The type of entity that owns the external account',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description for this external account',
			},
			{
				displayName: 'Funding',
				name: 'funding',
				type: 'options',
				options: [
					{ name: 'Checking', value: 'checking' },
					{ name: 'Savings', value: 'savings' },
					{ name: 'Other', value: 'other' },
				],
				default: 'checking',
				description: 'The type of account (checking, savings, or other)',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Archived', value: 'archived' },
				],
				default: 'active',
				description: 'The status of the external account',
			},
		],
	},

	// ----------------------------------
	//         externalAccount: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['externalAccount'],
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
				resource: ['externalAccount'],
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
				resource: ['externalAccount'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Routing Number',
				name: 'routing_number',
				type: 'string',
				default: '',
				description: 'Filter by routing number',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Archived', value: 'archived' },
				],
				default: 'active',
				description: 'Filter by status',
			},
		],
	},
];
