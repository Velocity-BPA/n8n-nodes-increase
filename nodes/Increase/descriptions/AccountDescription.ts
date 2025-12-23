/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				name: 'Close',
				value: 'close',
				description: 'Close an account',
				action: 'Close an account',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new account',
				action: 'Create an account',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an account by ID',
				action: 'Get an account',
			},
			{
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Get account balance',
				action: 'Get account balance',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many accounts',
				action: 'Get many accounts',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an account',
				action: 'Update an account',
			},
		],
		default: 'getAll',
	},
];

export const accountFields: INodeProperties[] = [
	// ----------------------------------
	//         account: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['create'],
			},
		},
		description: 'The name you choose for the account',
	},
	{
		displayName: 'Program ID',
		name: 'programId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['create'],
			},
		},
		description: 'The identifier of the Program determining the compliance and commercial terms of the account',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Entity ID',
				name: 'entity_id',
				type: 'string',
				default: '',
				description: 'The identifier for the Entity that will own the account',
			},
			{
				displayName: 'Informational Entity ID',
				name: 'informational_entity_id',
				type: 'string',
				default: '',
				description: 'The identifier of an Entity that is associated with the account but not the legal owner',
			},
		],
	},

	// ----------------------------------
	//         account: get
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['get', 'getBalance', 'update', 'close'],
			},
		},
		description: 'The identifier of the account',
	},

	// ----------------------------------
	//         account: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['account'],
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
				resource: ['account'],
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
				resource: ['account'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Entity ID',
				name: 'entity_id',
				type: 'string',
				default: '',
				description: 'Filter by Entity ID',
			},
			{
				displayName: 'Informational Entity ID',
				name: 'informational_entity_id',
				type: 'string',
				default: '',
				description: 'Filter by informational Entity ID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				options: [
					{ name: 'Closed', value: 'closed' },
					{ name: 'Open', value: 'open' },
				],
				default: [],
				description: 'Filter by account status',
			},
			{
				displayName: 'Created After',
				name: 'created_at.after',
				type: 'dateTime',
				default: '',
				description: 'Filter accounts created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'created_at.before',
				type: 'dateTime',
				default: '',
				description: 'Filter accounts created before this date',
			},
		],
	},

	// ----------------------------------
	//         account: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The new name for the account',
			},
		],
	},

	// ----------------------------------
	//         account: getBalance
	// ----------------------------------
	{
		displayName: 'At Time',
		name: 'atTime',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getBalance'],
			},
		},
		default: '',
		description: 'The moment in time to query the balance for (optional, defaults to current time)',
	},
];
