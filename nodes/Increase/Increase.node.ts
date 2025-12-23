/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	increaseApiRequest,
	increaseApiRequestAllItems,
	cleanObject,
} from './GenericFunctions';

import {
	accountOperations,
	accountFields,
	achTransferOperations,
	achTransferFields,
	wireTransferOperations,
	wireTransferFields,
	rtpTransferOperations,
	rtpTransferFields,
	externalAccountOperations,
	externalAccountFields,
	transactionOperations,
	transactionFields,
	pendingTransactionOperations,
	pendingTransactionFields,
	checkTransferOperations,
	checkTransferFields,
	checkDepositOperations,
	checkDepositFields,
	inboundAchTransferOperations,
	inboundAchTransferFields,
	entityOperations,
	entityFields,
	eventOperations,
	eventFields,
	eventSubscriptionOperations,
	eventSubscriptionFields,
	accountStatementOperations,
	accountStatementFields,
	simulationOperations,
	simulationFields,
} from './descriptions';

export class Increase implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Increase',
		name: 'increase',
		icon: 'file:increase.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Banking-as-a-Service platform for ACH, Wire, RTP, and Check payment rails',
		defaults: {
			name: 'Increase',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'increaseApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Account Statement', value: 'accountStatement' },
					{ name: 'ACH Transfer', value: 'achTransfer' },
					{ name: 'Check Deposit', value: 'checkDeposit' },
					{ name: 'Check Transfer', value: 'checkTransfer' },
					{ name: 'Entity', value: 'entity' },
					{ name: 'Event', value: 'event' },
					{ name: 'Event Subscription', value: 'eventSubscription' },
					{ name: 'External Account', value: 'externalAccount' },
					{ name: 'Inbound ACH Transfer', value: 'inboundAchTransfer' },
					{ name: 'Pending Transaction', value: 'pendingTransaction' },
					{ name: 'Real-Time Payments Transfer', value: 'rtpTransfer' },
					{ name: 'Simulation', value: 'simulation' },
					{ name: 'Transaction', value: 'transaction' },
					{ name: 'Wire Transfer', value: 'wireTransfer' },
				],
				default: 'account',
			},
			...accountOperations, ...accountFields,
			...achTransferOperations, ...achTransferFields,
			...wireTransferOperations, ...wireTransferFields,
			...rtpTransferOperations, ...rtpTransferFields,
			...externalAccountOperations, ...externalAccountFields,
			...transactionOperations, ...transactionFields,
			...pendingTransactionOperations, ...pendingTransactionFields,
			...checkTransferOperations, ...checkTransferFields,
			...checkDepositOperations, ...checkDepositFields,
			...inboundAchTransferOperations, ...inboundAchTransferFields,
			...entityOperations, ...entityFields,
			...eventOperations, ...eventFields,
			...eventSubscriptionOperations, ...eventSubscriptionFields,
			...accountStatementOperations, ...accountStatementFields,
			...simulationOperations, ...simulationFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				if (resource === 'account') {
					if (operation === 'create') {
						const body: IDataObject = {
							name: this.getNodeParameter('name', i) as string,
							program_id: this.getNodeParameter('programId', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await increaseApiRequest.call(this, 'POST', '/accounts', cleanObject(body));
					}
					if (operation === 'get') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/accounts/${accountId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = cleanObject(filters);
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/accounts', {}, query);
						} else {
							query.limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/accounts', {}, query);
							responseData = response.data as IDataObject[];
						}
					}
					if (operation === 'update') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await increaseApiRequest.call(this, 'PATCH', `/accounts/${accountId}`, cleanObject(updateFields));
					}
					if (operation === 'close') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/accounts/${accountId}/close`);
					}
					if (operation === 'getBalance') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						const atTime = this.getNodeParameter('atTime', i) as string;
						const query: IDataObject = {};
						if (atTime) query.at_time = atTime;
						responseData = await increaseApiRequest.call(this, 'GET', `/accounts/${accountId}/balance`, {}, query);
					}
				}

				if (resource === 'achTransfer') {
					if (operation === 'create') {
						const body: IDataObject = {
							account_id: this.getNodeParameter('accountId', i) as string,
							amount: this.getNodeParameter('amount', i) as number,
							statement_descriptor: this.getNodeParameter('statementDescriptor', i) as string,
						};
						const destinationType = this.getNodeParameter('destinationType', i) as string;
						if (destinationType === 'externalAccount') {
							body.external_account_id = this.getNodeParameter('externalAccountId', i) as string;
						} else {
							body.routing_number = this.getNodeParameter('routingNumber', i) as string;
							body.account_number = this.getNodeParameter('accountNumber', i) as string;
						}
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await increaseApiRequest.call(this, 'POST', '/ach_transfers', cleanObject(body));
					}
					if (operation === 'get') {
						const achTransferId = this.getNodeParameter('achTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/ach_transfers/${achTransferId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = cleanObject(filters);
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/ach_transfers', {}, query);
						} else {
							query.limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/ach_transfers', {}, query);
							responseData = response.data as IDataObject[];
						}
					}
					if (operation === 'approve') {
						const achTransferId = this.getNodeParameter('achTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/ach_transfers/${achTransferId}/approve`);
					}
					if (operation === 'cancel') {
						const achTransferId = this.getNodeParameter('achTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/ach_transfers/${achTransferId}/cancel`);
					}
				}

				if (resource === 'wireTransfer') {
					if (operation === 'create') {
						const body: IDataObject = {
							account_id: this.getNodeParameter('accountId', i) as string,
							amount: this.getNodeParameter('amount', i) as number,
							beneficiary_name: this.getNodeParameter('beneficiaryName', i) as string,
							message_to_recipient: this.getNodeParameter('messageToRecipient', i) as string,
						};
						const destinationType = this.getNodeParameter('destinationType', i) as string;
						if (destinationType === 'externalAccount') {
							body.external_account_id = this.getNodeParameter('externalAccountId', i) as string;
						} else {
							body.routing_number = this.getNodeParameter('routingNumber', i) as string;
							body.account_number = this.getNodeParameter('accountNumber', i) as string;
						}
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await increaseApiRequest.call(this, 'POST', '/wire_transfers', cleanObject(body));
					}
					if (operation === 'get') {
						const wireTransferId = this.getNodeParameter('wireTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/wire_transfers/${wireTransferId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = cleanObject(filters);
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/wire_transfers', {}, query);
						} else {
							query.limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/wire_transfers', {}, query);
							responseData = response.data as IDataObject[];
						}
					}
					if (operation === 'approve') {
						const wireTransferId = this.getNodeParameter('wireTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/wire_transfers/${wireTransferId}/approve`);
					}
					if (operation === 'cancel') {
						const wireTransferId = this.getNodeParameter('wireTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/wire_transfers/${wireTransferId}/cancel`);
					}
				}

				if (resource === 'rtpTransfer') {
					if (operation === 'create') {
						const body: IDataObject = {
							account_id: this.getNodeParameter('accountId', i) as string,
							amount: this.getNodeParameter('amount', i) as number,
							creditor_name: this.getNodeParameter('creditorName', i) as string,
							remittance_information: this.getNodeParameter('remittanceInformation', i) as string,
						};
						const destinationType = this.getNodeParameter('destinationType', i) as string;
						if (destinationType === 'externalAccount') {
							body.external_account_id = this.getNodeParameter('externalAccountId', i) as string;
						} else {
							body.destination_account_number = this.getNodeParameter('destinationAccountNumber', i) as string;
							body.destination_routing_number = this.getNodeParameter('destinationRoutingNumber', i) as string;
						}
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await increaseApiRequest.call(this, 'POST', '/real_time_payments_transfers', cleanObject(body));
					}
					if (operation === 'get') {
						const rtpTransferId = this.getNodeParameter('rtpTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/real_time_payments_transfers/${rtpTransferId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = cleanObject(filters);
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/real_time_payments_transfers', {}, query);
						} else {
							query.limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/real_time_payments_transfers', {}, query);
							responseData = response.data as IDataObject[];
						}
					}
				}

				if (resource === 'externalAccount') {
					if (operation === 'create') {
						const body: IDataObject = {
							account_number: this.getNodeParameter('accountNumber', i) as string,
							routing_number: this.getNodeParameter('routingNumber', i) as string,
							description: this.getNodeParameter('description', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await increaseApiRequest.call(this, 'POST', '/external_accounts', cleanObject(body));
					}
					if (operation === 'get') {
						const externalAccountId = this.getNodeParameter('externalAccountId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/external_accounts/${externalAccountId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = cleanObject(filters);
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/external_accounts', {}, query);
						} else {
							query.limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/external_accounts', {}, query);
							responseData = response.data as IDataObject[];
						}
					}
					if (operation === 'update') {
						const externalAccountId = this.getNodeParameter('externalAccountId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await increaseApiRequest.call(this, 'PATCH', `/external_accounts/${externalAccountId}`, cleanObject(updateFields));
					}
				}

				if (resource === 'transaction') {
					if (operation === 'get') {
						const transactionId = this.getNodeParameter('transactionId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/transactions/${transactionId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = cleanObject(filters);
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/transactions', {}, query);
						} else {
							query.limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/transactions', {}, query);
							responseData = response.data as IDataObject[];
						}
					}
				}

				if (resource === 'pendingTransaction') {
					if (operation === 'get') {
						const pendingTransactionId = this.getNodeParameter('pendingTransactionId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/pending_transactions/${pendingTransactionId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = cleanObject(filters);
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/pending_transactions', {}, query);
						} else {
							query.limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/pending_transactions', {}, query);
							responseData = response.data as IDataObject[];
						}
					}
				}

				if (resource === 'checkTransfer') {
					if (operation === 'create') {
						const fulfillmentMethod = this.getNodeParameter('fulfillmentMethod', i) as string;
						const body: IDataObject = {
							account_id: this.getNodeParameter('accountId', i) as string,
							amount: this.getNodeParameter('amount', i) as number,
							source_account_number_id: this.getNodeParameter('sourceAccountNumberId', i) as string,
							fulfillment_method: fulfillmentMethod,
						};
						if (fulfillmentMethod === 'physical_check') {
							body.physical_check = {
								recipient_name: this.getNodeParameter('recipientName', i) as string,
								mailing_address: {
									name: this.getNodeParameter('recipientName', i) as string,
									line1: this.getNodeParameter('recipientAddressLine1', i) as string,
									city: this.getNodeParameter('recipientCity', i) as string,
									state: this.getNodeParameter('recipientState', i) as string,
									postal_code: this.getNodeParameter('recipientPostalCode', i) as string,
								},
							};
						}
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await increaseApiRequest.call(this, 'POST', '/check_transfers', cleanObject(body));
					}
					if (operation === 'get') {
						const checkTransferId = this.getNodeParameter('checkTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/check_transfers/${checkTransferId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = cleanObject(filters);
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/check_transfers', {}, query);
						} else {
							query.limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/check_transfers', {}, query);
							responseData = response.data as IDataObject[];
						}
					}
					if (operation === 'approve') {
						const checkTransferId = this.getNodeParameter('checkTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/check_transfers/${checkTransferId}/approve`);
					}
					if (operation === 'cancel') {
						const checkTransferId = this.getNodeParameter('checkTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/check_transfers/${checkTransferId}/cancel`);
					}
					if (operation === 'stopPayment') {
						const checkTransferId = this.getNodeParameter('checkTransferId', i) as string;
						const reason = this.getNodeParameter('reason', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/check_transfers/${checkTransferId}/stop_payment`, { reason });
					}
				}

				if (resource === 'checkDeposit') {
					if (operation === 'create') {
						const body: IDataObject = {
							account_id: this.getNodeParameter('accountId', i) as string,
							amount: this.getNodeParameter('amount', i) as number,
							back_image_file_id: this.getNodeParameter('backImageFileId', i) as string,
							front_image_file_id: this.getNodeParameter('frontImageFileId', i) as string,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await increaseApiRequest.call(this, 'POST', '/check_deposits', cleanObject(body));
					}
					if (operation === 'get') {
						const checkDepositId = this.getNodeParameter('checkDepositId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/check_deposits/${checkDepositId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = cleanObject(filters);
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/check_deposits', {}, query);
						} else {
							query.limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/check_deposits', {}, query);
							responseData = response.data as IDataObject[];
						}
					}
				}

				if (resource === 'inboundAchTransfer') {
					if (operation === 'get') {
						const inboundAchTransferId = this.getNodeParameter('inboundAchTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/inbound_ach_transfers/${inboundAchTransferId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = cleanObject(filters);
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/inbound_ach_transfers', {}, query);
						} else {
							query.limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/inbound_ach_transfers', {}, query);
							responseData = response.data as IDataObject[];
						}
					}
					if (operation === 'decline') {
						const inboundAchTransferId = this.getNodeParameter('inboundAchTransferId', i) as string;
						const reason = this.getNodeParameter('reason', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/inbound_ach_transfers/${inboundAchTransferId}/decline`, { reason });
					}
					if (operation === 'transferReturn') {
						const inboundAchTransferId = this.getNodeParameter('inboundAchTransferId', i) as string;
						const reason = this.getNodeParameter('reason', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/inbound_ach_transfers/${inboundAchTransferId}/transfer_return`, { reason });
					}
					if (operation === 'createNotificationOfChange') {
						const inboundAchTransferId = this.getNodeParameter('inboundAchTransferId', i) as string;
						const body: IDataObject = {};
						const updatedAccountNumber = this.getNodeParameter('updatedAccountNumber', i) as string;
						const updatedRoutingNumber = this.getNodeParameter('updatedRoutingNumber', i) as string;
						if (updatedAccountNumber) body.updated_account_number = updatedAccountNumber;
						if (updatedRoutingNumber) body.updated_routing_number = updatedRoutingNumber;
						responseData = await increaseApiRequest.call(this, 'POST', `/inbound_ach_transfers/${inboundAchTransferId}/notification_of_change`, cleanObject(body));
					}
				}

				if (resource === 'entity') {
					if (operation === 'create') {
						const structure = this.getNodeParameter('structure', i) as string;
						const body: IDataObject = { structure };
						if (structure === 'corporation') {
							body.corporation = {
								name: this.getNodeParameter('corporationName', i) as string,
								tax_identifier: this.getNodeParameter('taxIdentifier', i) as string,
								incorporation_state: this.getNodeParameter('incorporationState', i) as string,
								address: {
									line1: this.getNodeParameter('addressLine1', i) as string,
									city: this.getNodeParameter('city', i) as string,
									state: this.getNodeParameter('state', i) as string,
									zip: this.getNodeParameter('zip', i) as string,
								},
								beneficial_owners: [],
							};
						}
						if (structure === 'natural_person') {
							body.natural_person = {
								name: {
									first: this.getNodeParameter('firstName', i) as string,
									last: this.getNodeParameter('lastName', i) as string,
								},
								date_of_birth: this.getNodeParameter('dateOfBirth', i) as string,
							};
						}
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await increaseApiRequest.call(this, 'POST', '/entities', cleanObject(body));
					}
					if (operation === 'get') {
						const entityId = this.getNodeParameter('entityId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/entities/${entityId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = cleanObject(filters);
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/entities', {}, query);
						} else {
							query.limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/entities', {}, query);
							responseData = response.data as IDataObject[];
						}
					}
					if (operation === 'archive') {
						const entityId = this.getNodeParameter('entityId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/entities/${entityId}/archive`);
					}
					if (operation === 'confirm') {
						const entityId = this.getNodeParameter('entityId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/entities/${entityId}/confirm`);
					}
				}

				if (resource === 'event') {
					if (operation === 'get') {
						const eventId = this.getNodeParameter('eventId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/events/${eventId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = cleanObject(filters);
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/events', {}, query);
						} else {
							query.limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/events', {}, query);
							responseData = response.data as IDataObject[];
						}
					}
				}

				if (resource === 'eventSubscription') {
					if (operation === 'create') {
						const body: IDataObject = { url: this.getNodeParameter('url', i) as string };
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await increaseApiRequest.call(this, 'POST', '/event_subscriptions', cleanObject(body));
					}
					if (operation === 'get') {
						const eventSubscriptionId = this.getNodeParameter('eventSubscriptionId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/event_subscriptions/${eventSubscriptionId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/event_subscriptions');
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/event_subscriptions', {}, { limit });
							responseData = response.data as IDataObject[];
						}
					}
					if (operation === 'update') {
						const eventSubscriptionId = this.getNodeParameter('eventSubscriptionId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await increaseApiRequest.call(this, 'PATCH', `/event_subscriptions/${eventSubscriptionId}`, cleanObject(updateFields));
					}
				}

				if (resource === 'accountStatement') {
					if (operation === 'get') {
						const accountStatementId = this.getNodeParameter('accountStatementId', i) as string;
						responseData = await increaseApiRequest.call(this, 'GET', `/account_statements/${accountStatementId}`);
					}
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const query = cleanObject(filters);
						if (returnAll) {
							responseData = await increaseApiRequestAllItems.call(this, 'GET', '/account_statements', {}, query);
						} else {
							query.limit = this.getNodeParameter('limit', i) as number;
							const response = await increaseApiRequest.call(this, 'GET', '/account_statements', {}, query);
							responseData = response.data as IDataObject[];
						}
					}
				}

				if (resource === 'simulation') {
					if (operation === 'achTransferSubmit') {
						const achTransferId = this.getNodeParameter('achTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/simulations/ach_transfers/${achTransferId}/submit`);
					}
					if (operation === 'achTransferSettle') {
						const achTransferId = this.getNodeParameter('achTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/simulations/ach_transfers/${achTransferId}/settle`);
					}
					if (operation === 'achTransferReturn') {
						const achTransferId = this.getNodeParameter('achTransferId', i) as string;
						const reasonCode = this.getNodeParameter('reasonCode', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/simulations/ach_transfers/${achTransferId}/return`, { reason: reasonCode });
					}
					if (operation === 'achTransferAcknowledge') {
						const achTransferId = this.getNodeParameter('achTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/simulations/ach_transfers/${achTransferId}/acknowledge`);
					}
					if (operation === 'inboundAchTransfer') {
						const body: IDataObject = {
							account_number_id: this.getNodeParameter('accountNumberId', i) as string,
							amount: this.getNodeParameter('amount', i) as number,
						};
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);
						responseData = await increaseApiRequest.call(this, 'POST', '/simulations/inbound_ach_transfers', cleanObject(body));
					}
					if (operation === 'wireTransferSubmit') {
						const wireTransferId = this.getNodeParameter('wireTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/simulations/wire_transfers/${wireTransferId}/submit`);
					}
					if (operation === 'inboundWireTransfer') {
						const body: IDataObject = {
							account_number_id: this.getNodeParameter('accountNumberId', i) as string,
							amount: this.getNodeParameter('amount', i) as number,
						};
						const beneficiaryAddressLine1 = this.getNodeParameter('beneficiaryAddressLine1', i) as string;
						const beneficiaryName = this.getNodeParameter('beneficiaryName', i) as string;
						const originatorName = this.getNodeParameter('originatorName', i) as string;
						if (beneficiaryAddressLine1) body.beneficiary_address_line1 = beneficiaryAddressLine1;
						if (beneficiaryName) body.beneficiary_name = beneficiaryName;
						if (originatorName) body.originator_name = originatorName;
						responseData = await increaseApiRequest.call(this, 'POST', '/simulations/inbound_wire_transfers', cleanObject(body));
					}
					if (operation === 'checkTransferMail') {
						const checkTransferId = this.getNodeParameter('checkTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/simulations/check_transfers/${checkTransferId}/mail`);
					}
					if (operation === 'checkDepositReject') {
						const checkDepositId = this.getNodeParameter('checkDepositId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/simulations/check_deposits/${checkDepositId}/reject`);
					}
					if (operation === 'rtpTransferSubmit') {
						const rtpTransferId = this.getNodeParameter('rtpTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/simulations/real_time_payments_transfers/${rtpTransferId}/submit`);
					}
					if (operation === 'rtpTransferComplete') {
						const rtpTransferId = this.getNodeParameter('rtpTransferId', i) as string;
						responseData = await increaseApiRequest.call(this, 'POST', `/simulations/real_time_payments_transfers/${rtpTransferId}/complete`);
					}
					if (operation === 'inboundRtpTransfer') {
						const body: IDataObject = {
							account_number_id: this.getNodeParameter('accountNumberId', i) as string,
							amount: this.getNodeParameter('amount', i) as number,
						};
						const debtorName = this.getNodeParameter('debtorName', i) as string;
						const debtorAccountNumber = this.getNodeParameter('debtorAccountNumber', i) as string;
						const debtorRoutingNumber = this.getNodeParameter('debtorRoutingNumber', i) as string;
						const remittanceInformation = this.getNodeParameter('remittanceInformation', i) as string;
						if (debtorName) body.debtor_name = debtorName;
						if (debtorAccountNumber) body.debtor_account_number = debtorAccountNumber;
						if (debtorRoutingNumber) body.debtor_routing_number = debtorRoutingNumber;
						if (remittanceInformation) body.remittance_information = remittanceInformation;
						responseData = await increaseApiRequest.call(this, 'POST', '/simulations/inbound_real_time_payments_transfers', cleanObject(body));
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject[]),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
