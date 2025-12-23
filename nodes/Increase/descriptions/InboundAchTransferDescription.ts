/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const inboundAchTransferOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['inboundAchTransfer'],
			},
		},
		options: [
			{
				name: 'Create Notification of Change',
				value: 'createNotificationOfChange',
				description: 'Create a notification of change for an inbound ACH transfer',
				action: 'Create notification of change',
			},
			{
				name: 'Decline',
				value: 'decline',
				description: 'Decline an inbound ACH transfer',
				action: 'Decline an inbound ACH transfer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an inbound ACH transfer by ID',
				action: 'Get an inbound ACH transfer',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many inbound ACH transfers',
				action: 'Get many inbound ACH transfers',
			},
			{
				name: 'Transfer Return',
				value: 'transferReturn',
				description: 'Return an inbound ACH transfer',
				action: 'Return an inbound ACH transfer',
			},
		],
		default: 'getAll',
	},
];

export const inboundAchTransferFields: INodeProperties[] = [
	// ----------------------------------
	//         inboundAchTransfer: get, decline, transferReturn, createNotificationOfChange
	// ----------------------------------
	{
		displayName: 'Inbound ACH Transfer ID',
		name: 'inboundAchTransferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['inboundAchTransfer'],
				operation: ['get', 'decline', 'transferReturn', 'createNotificationOfChange'],
			},
		},
		description: 'The identifier of the inbound ACH transfer',
	},

	// ----------------------------------
	//         inboundAchTransfer: decline
	// ----------------------------------
	{
		displayName: 'Decline Reason',
		name: 'reason',
		type: 'options',
		required: true,
		options: [
			{ name: 'Insufficient Funds', value: 'insufficient_funds' },
			{ name: 'Returned Per ODFI Request', value: 'returned_per_odfi_request' },
			{ name: 'Authorization Revoked by Customer', value: 'authorization_revoked_by_customer' },
			{ name: 'Payment Stopped', value: 'payment_stopped' },
			{ name: 'Customer Advised Unauthorized Improper', value: 'customer_advised_unauthorized_improper_ineligible_or_incomplete' },
			{ name: 'Representative Payee Deceased', value: 'representative_payee_deceased_or_unable_to_continue_in_that_capacity' },
			{ name: 'Beneficiary Deceased', value: 'beneficiary_or_account_holder_deceased' },
			{ name: 'Account Frozen', value: 'credit_entry_refused_by_receiver' },
			{ name: 'End Customer Advice', value: 'duplicate_entry' },
			{ name: 'Corporate Customer Advice', value: 'corporate_customer_advised_not_authorized' },
		],
		default: 'insufficient_funds',
		displayOptions: {
			show: {
				resource: ['inboundAchTransfer'],
				operation: ['decline'],
			},
		},
		description: 'The reason for declining the transfer',
	},

	// ----------------------------------
	//         inboundAchTransfer: transferReturn
	// ----------------------------------
	{
		displayName: 'Return Reason',
		name: 'reason',
		type: 'options',
		required: true,
		options: [
			{ name: 'Insufficient Funds', value: 'insufficient_funds' },
			{ name: 'Returned Per ODFI Request', value: 'returned_per_odfi_request' },
			{ name: 'Authorization Revoked by Customer', value: 'authorization_revoked_by_customer' },
			{ name: 'Payment Stopped', value: 'payment_stopped' },
			{ name: 'Customer Advised Unauthorized', value: 'customer_advised_unauthorized_improper_ineligible_or_incomplete' },
			{ name: 'Representative Payee Deceased', value: 'representative_payee_deceased_or_unable_to_continue_in_that_capacity' },
			{ name: 'Beneficiary Deceased', value: 'beneficiary_or_account_holder_deceased' },
			{ name: 'Account Frozen', value: 'credit_entry_refused_by_receiver' },
			{ name: 'Duplicate Entry', value: 'duplicate_entry' },
			{ name: 'Corporate Not Authorized', value: 'corporate_customer_advised_not_authorized' },
		],
		default: 'insufficient_funds',
		displayOptions: {
			show: {
				resource: ['inboundAchTransfer'],
				operation: ['transferReturn'],
			},
		},
		description: 'The reason for returning the transfer',
	},

	// ----------------------------------
	//         inboundAchTransfer: createNotificationOfChange
	// ----------------------------------
	{
		displayName: 'Updated Account Number',
		name: 'updatedAccountNumber',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['inboundAchTransfer'],
				operation: ['createNotificationOfChange'],
			},
		},
		description: 'The updated account number (if correcting account info)',
	},
	{
		displayName: 'Updated Routing Number',
		name: 'updatedRoutingNumber',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['inboundAchTransfer'],
				operation: ['createNotificationOfChange'],
			},
		},
		description: 'The updated routing number (if correcting routing info)',
	},

	// ----------------------------------
	//         inboundAchTransfer: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['inboundAchTransfer'],
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
				resource: ['inboundAchTransfer'],
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
				resource: ['inboundAchTransfer'],
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
				displayName: 'Account Number ID',
				name: 'account_number_id',
				type: 'string',
				default: '',
				description: 'Filter by account number ID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Pending', value: 'pending' },
					{ name: 'Declined', value: 'declined' },
					{ name: 'Accepted', value: 'accepted' },
					{ name: 'Returned', value: 'returned' },
				],
				default: 'pending',
				description: 'Filter by status',
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
