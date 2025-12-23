/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const simulationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['simulation'],
			},
		},
		options: [
			{
				name: 'ACH Transfer Acknowledge',
				value: 'achTransferAcknowledge',
				description: 'Simulate acknowledging an ACH transfer',
				action: 'Acknowledge ACH transfer',
			},
			{
				name: 'ACH Transfer Return',
				value: 'achTransferReturn',
				description: 'Simulate returning an ACH transfer',
				action: 'Return ACH transfer',
			},
			{
				name: 'ACH Transfer Settle',
				value: 'achTransferSettle',
				description: 'Simulate settling an ACH transfer',
				action: 'Settle ACH transfer',
			},
			{
				name: 'ACH Transfer Submit',
				value: 'achTransferSubmit',
				description: 'Simulate submitting an ACH transfer',
				action: 'Submit ACH transfer',
			},
			{
				name: 'Check Deposit Reject',
				value: 'checkDepositReject',
				description: 'Simulate rejecting a check deposit',
				action: 'Reject check deposit',
			},
			{
				name: 'Check Transfer Mail',
				value: 'checkTransferMail',
				description: 'Simulate mailing a check transfer',
				action: 'Mail check transfer',
			},
			{
				name: 'Inbound ACH Transfer',
				value: 'inboundAchTransfer',
				description: 'Simulate an inbound ACH transfer',
				action: 'Create inbound ACH transfer',
			},
			{
				name: 'Inbound RTP Transfer',
				value: 'inboundRtpTransfer',
				description: 'Simulate an inbound Real-Time Payments transfer',
				action: 'Create inbound RTP transfer',
			},
			{
				name: 'Inbound Wire Transfer',
				value: 'inboundWireTransfer',
				description: 'Simulate an inbound wire transfer',
				action: 'Create inbound wire transfer',
			},
			{
				name: 'RTP Transfer Complete',
				value: 'rtpTransferComplete',
				description: 'Simulate completing an RTP transfer',
				action: 'Complete RTP transfer',
			},
			{
				name: 'RTP Transfer Submit',
				value: 'rtpTransferSubmit',
				description: 'Simulate submitting an RTP transfer',
				action: 'Submit RTP transfer',
			},
			{
				name: 'Wire Transfer Submit',
				value: 'wireTransferSubmit',
				description: 'Simulate submitting a wire transfer',
				action: 'Submit wire transfer',
			},
		],
		default: 'achTransferSubmit',
	},
];

export const simulationFields: INodeProperties[] = [
	// ----------------------------------
	//         simulation: ACH Transfer operations
	// ----------------------------------
	{
		displayName: 'ACH Transfer ID',
		name: 'achTransferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['achTransferSubmit', 'achTransferSettle', 'achTransferReturn', 'achTransferAcknowledge'],
			},
		},
		description: 'The identifier of the ACH transfer',
	},

	// ----------------------------------
	//         simulation: achTransferReturn
	// ----------------------------------
	{
		displayName: 'Return Reason Code',
		name: 'reasonCode',
		type: 'options',
		options: [
			{ name: 'R01 - Insufficient Funds', value: 'R01' },
			{ name: 'R02 - Account Closed', value: 'R02' },
			{ name: 'R03 - No Account', value: 'R03' },
			{ name: 'R04 - Invalid Account Number', value: 'R04' },
			{ name: 'R05 - Unauthorized Debit', value: 'R05' },
			{ name: 'R06 - Returned Per ODFI Request', value: 'R06' },
			{ name: 'R07 - Authorization Revoked', value: 'R07' },
			{ name: 'R08 - Payment Stopped', value: 'R08' },
			{ name: 'R09 - Uncollected Funds', value: 'R09' },
			{ name: 'R10 - Customer Advises Unauthorized', value: 'R10' },
		],
		default: 'R01',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['achTransferReturn'],
			},
		},
		description: 'The ACH return reason code',
	},

	// ----------------------------------
	//         simulation: Wire Transfer operations
	// ----------------------------------
	{
		displayName: 'Wire Transfer ID',
		name: 'wireTransferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['wireTransferSubmit'],
			},
		},
		description: 'The identifier of the wire transfer',
	},

	// ----------------------------------
	//         simulation: Check operations
	// ----------------------------------
	{
		displayName: 'Check Transfer ID',
		name: 'checkTransferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['checkTransferMail'],
			},
		},
		description: 'The identifier of the check transfer',
	},
	{
		displayName: 'Check Deposit ID',
		name: 'checkDepositId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['checkDepositReject'],
			},
		},
		description: 'The identifier of the check deposit',
	},

	// ----------------------------------
	//         simulation: RTP operations
	// ----------------------------------
	{
		displayName: 'RTP Transfer ID',
		name: 'rtpTransferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['rtpTransferSubmit', 'rtpTransferComplete'],
			},
		},
		description: 'The identifier of the Real-Time Payments transfer',
	},

	// ----------------------------------
	//         simulation: Inbound ACH Transfer
	// ----------------------------------
	{
		displayName: 'Account Number ID',
		name: 'accountNumberId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['inboundAchTransfer'],
			},
		},
		description: 'The Account Number ID to receive the inbound ACH',
	},
	{
		displayName: 'Amount (Cents)',
		name: 'amount',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['inboundAchTransfer', 'inboundWireTransfer', 'inboundRtpTransfer'],
			},
		},
		description: 'The amount in cents',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['inboundAchTransfer'],
			},
		},
		options: [
			{
				displayName: 'Company Descriptive Date',
				name: 'company_descriptive_date',
				type: 'string',
				default: '',
				description: 'Company descriptive date',
			},
			{
				displayName: 'Company Discretionary Data',
				name: 'company_discretionary_data',
				type: 'string',
				default: '',
				description: 'Company discretionary data',
			},
			{
				displayName: 'Company Entry Description',
				name: 'company_entry_description',
				type: 'string',
				default: '',
				description: 'Company entry description',
			},
			{
				displayName: 'Company ID',
				name: 'company_id',
				type: 'string',
				default: '',
				description: 'Company ID',
			},
			{
				displayName: 'Company Name',
				name: 'company_name',
				type: 'string',
				default: '',
				description: 'Company name',
			},
		],
	},

	// ----------------------------------
	//         simulation: Inbound Wire Transfer
	// ----------------------------------
	{
		displayName: 'Account Number ID',
		name: 'accountNumberId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['inboundWireTransfer'],
			},
		},
		description: 'The Account Number ID to receive the inbound wire',
	},
	{
		displayName: 'Beneficiary Address Line 1',
		name: 'beneficiaryAddressLine1',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['inboundWireTransfer'],
			},
		},
		description: 'Beneficiary address line 1',
	},
	{
		displayName: 'Beneficiary Name',
		name: 'beneficiaryName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['inboundWireTransfer'],
			},
		},
		description: 'Beneficiary name',
	},
	{
		displayName: 'Originator Name',
		name: 'originatorName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['inboundWireTransfer'],
			},
		},
		description: 'Originator name',
	},

	// ----------------------------------
	//         simulation: Inbound RTP Transfer
	// ----------------------------------
	{
		displayName: 'Account Number ID',
		name: 'accountNumberId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['inboundRtpTransfer'],
			},
		},
		description: 'The Account Number ID to receive the inbound RTP',
	},
	{
		displayName: 'Debtor Name',
		name: 'debtorName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['inboundRtpTransfer'],
			},
		},
		description: 'The name of the party sending the transfer',
	},
	{
		displayName: 'Debtor Account Number',
		name: 'debtorAccountNumber',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['inboundRtpTransfer'],
			},
		},
		description: 'The account number of the party sending the transfer',
	},
	{
		displayName: 'Debtor Routing Number',
		name: 'debtorRoutingNumber',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['inboundRtpTransfer'],
			},
		},
		description: 'The routing number of the party sending the transfer',
	},
	{
		displayName: 'Remittance Information',
		name: 'remittanceInformation',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['simulation'],
				operation: ['inboundRtpTransfer'],
			},
		},
		description: 'Additional information about the transfer',
	},
];
