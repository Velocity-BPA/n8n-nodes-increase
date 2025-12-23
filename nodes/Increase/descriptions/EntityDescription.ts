/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const entityOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['entity'],
			},
		},
		options: [
			{
				name: 'Archive',
				value: 'archive',
				description: 'Archive an entity',
				action: 'Archive an entity',
			},
			{
				name: 'Confirm',
				value: 'confirm',
				description: 'Confirm an entity',
				action: 'Confirm an entity',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new entity',
				action: 'Create an entity',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an entity by ID',
				action: 'Get an entity',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many entities',
				action: 'Get many entities',
			},
		],
		default: 'getAll',
	},
];

export const entityFields: INodeProperties[] = [
	// ----------------------------------
	//         entity: create
	// ----------------------------------
	{
		displayName: 'Structure',
		name: 'structure',
		type: 'options',
		required: true,
		options: [
			{ name: 'Corporation', value: 'corporation' },
			{ name: 'Natural Person', value: 'natural_person' },
			{ name: 'Joint', value: 'joint' },
			{ name: 'Trust', value: 'trust' },
			{ name: 'Government Authority', value: 'government_authority' },
		],
		default: 'corporation',
		displayOptions: {
			show: {
				resource: ['entity'],
				operation: ['create'],
			},
		},
		description: 'The type of entity to create',
	},
	{
		displayName: 'Corporation Name',
		name: 'corporationName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['entity'],
				operation: ['create'],
				structure: ['corporation'],
			},
		},
		description: 'The legal name of the corporation',
	},
	{
		displayName: 'Tax Identifier',
		name: 'taxIdentifier',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['entity'],
				operation: ['create'],
				structure: ['corporation'],
			},
		},
		description: 'The EIN (Employer Identification Number) of the corporation',
	},
	{
		displayName: 'Incorporation State',
		name: 'incorporationState',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['entity'],
				operation: ['create'],
				structure: ['corporation'],
			},
		},
		description: 'The two-letter state code where the corporation is incorporated',
	},
	{
		displayName: 'Address Line 1',
		name: 'addressLine1',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['entity'],
				operation: ['create'],
				structure: ['corporation'],
			},
		},
		description: 'The first line of the corporation address',
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['entity'],
				operation: ['create'],
				structure: ['corporation'],
			},
		},
		description: 'The city of the corporation address',
	},
	{
		displayName: 'State',
		name: 'state',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['entity'],
				operation: ['create'],
				structure: ['corporation'],
			},
		},
		description: 'The two-letter state code of the corporation address',
	},
	{
		displayName: 'ZIP',
		name: 'zip',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['entity'],
				operation: ['create'],
				structure: ['corporation'],
			},
		},
		description: 'The ZIP code of the corporation address',
	},
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['entity'],
				operation: ['create'],
				structure: ['natural_person'],
			},
		},
		description: 'The first name of the natural person',
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['entity'],
				operation: ['create'],
				structure: ['natural_person'],
			},
		},
		description: 'The last name of the natural person',
	},
	{
		displayName: 'Date of Birth',
		name: 'dateOfBirth',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['entity'],
				operation: ['create'],
				structure: ['natural_person'],
			},
		},
		description: 'The date of birth of the natural person',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['entity'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A description for the entity',
			},
			{
				displayName: 'Relationship',
				name: 'relationship',
				type: 'options',
				options: [
					{ name: 'Affiliated', value: 'affiliated' },
					{ name: 'Informational', value: 'informational' },
					{ name: 'Unaffiliated', value: 'unaffiliated' },
				],
				default: 'affiliated',
				description: 'Your relationship to the entity',
			},
		],
	},

	// ----------------------------------
	//         entity: get, archive, confirm
	// ----------------------------------
	{
		displayName: 'Entity ID',
		name: 'entityId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['entity'],
				operation: ['get', 'archive', 'confirm'],
			},
		},
		description: 'The identifier of the entity',
	},

	// ----------------------------------
	//         entity: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['entity'],
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
				resource: ['entity'],
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
				resource: ['entity'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Archived', value: 'archived' },
					{ name: 'Disabled', value: 'disabled' },
				],
				default: [],
				description: 'Filter by entity status',
			},
			{
				displayName: 'Created After',
				name: 'created_at.after',
				type: 'dateTime',
				default: '',
				description: 'Filter entities created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'created_at.before',
				type: 'dateTime',
				default: '',
				description: 'Filter entities created before this date',
			},
		],
	},
];
