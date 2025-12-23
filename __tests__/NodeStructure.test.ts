/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { Increase } from '../nodes/Increase/Increase.node';
import { IncreaseTrigger } from '../nodes/Increase/IncreaseTrigger.node';
import { IncreaseApi } from '../credentials/IncreaseApi.credentials';

describe('Node Structure Tests', () => {
	describe('Increase Node', () => {
		let node: Increase;

		beforeEach(() => {
			node = new Increase();
		});

		it('should have correct metadata', () => {
			expect(node.description.displayName).toBe('Increase');
			expect(node.description.name).toBe('increase');
			expect(node.description.group).toContain('transform');
			expect(node.description.version).toBe(1);
		});

		it('should have required credentials', () => {
			expect(node.description.credentials).toBeDefined();
			expect(node.description.credentials).toHaveLength(1);
			expect(node.description.credentials![0].name).toBe('increaseApi');
			expect(node.description.credentials![0].required).toBe(true);
		});

		it('should have correct inputs and outputs', () => {
			expect(node.description.inputs).toContain('main');
			expect(node.description.outputs).toContain('main');
		});

		it('should have all required resources', () => {
			const resourceProperty = node.description.properties.find(
				(p) => p.name === 'resource'
			);
			expect(resourceProperty).toBeDefined();
			expect(resourceProperty!.type).toBe('options');

			const resourceOptions = (resourceProperty as any).options.map(
				(o: { value: string }) => o.value
			);
			expect(resourceOptions).toContain('account');
			expect(resourceOptions).toContain('achTransfer');
			expect(resourceOptions).toContain('wireTransfer');
			expect(resourceOptions).toContain('rtpTransfer');
			expect(resourceOptions).toContain('externalAccount');
			expect(resourceOptions).toContain('transaction');
			expect(resourceOptions).toContain('pendingTransaction');
			expect(resourceOptions).toContain('checkTransfer');
			expect(resourceOptions).toContain('checkDeposit');
			expect(resourceOptions).toContain('inboundAchTransfer');
			expect(resourceOptions).toContain('entity');
			expect(resourceOptions).toContain('event');
			expect(resourceOptions).toContain('eventSubscription');
			expect(resourceOptions).toContain('accountStatement');
			expect(resourceOptions).toContain('simulation');
		});

		it('should have icon file reference', () => {
			expect(node.description.icon).toBe('file:increase.svg');
		});
	});

	describe('IncreaseTrigger Node', () => {
		let node: IncreaseTrigger;

		beforeEach(() => {
			node = new IncreaseTrigger();
		});

		it('should have correct metadata', () => {
			expect(node.description.displayName).toBe('Increase Trigger');
			expect(node.description.name).toBe('increaseTrigger');
			expect(node.description.group).toContain('trigger');
			expect(node.description.version).toBe(1);
		});

		it('should have webhook configuration', () => {
			expect(node.description.webhooks).toBeDefined();
			expect(node.description.webhooks).toHaveLength(1);
			expect(node.description.webhooks![0].httpMethod).toBe('POST');
		});

		it('should have events property', () => {
			const eventsProperty = node.description.properties.find(
				(p) => p.name === 'events'
			);
			expect(eventsProperty).toBeDefined();
			expect(eventsProperty!.type).toBe('multiOptions');
			expect(eventsProperty!.required).toBe(true);
		});

		it('should have webhook methods', () => {
			expect(node.webhookMethods).toBeDefined();
			expect(node.webhookMethods.default).toBeDefined();
			expect(node.webhookMethods.default.checkExists).toBeDefined();
			expect(node.webhookMethods.default.create).toBeDefined();
			expect(node.webhookMethods.default.delete).toBeDefined();
		});
	});

	describe('IncreaseApi Credentials', () => {
		let credentials: IncreaseApi;

		beforeEach(() => {
			credentials = new IncreaseApi();
		});

		it('should have correct name and display name', () => {
			expect(credentials.name).toBe('increaseApi');
			expect(credentials.displayName).toBe('Increase API');
		});

		it('should have API key property', () => {
			const apiKeyProperty = credentials.properties.find(
				(p) => p.name === 'apiKey'
			);
			expect(apiKeyProperty).toBeDefined();
			expect(apiKeyProperty!.type).toBe('string');
			expect(apiKeyProperty!.required).toBe(true);
			expect((apiKeyProperty!.typeOptions as any)?.password).toBe(true);
		});

		it('should have environment property', () => {
			const envProperty = credentials.properties.find(
				(p) => p.name === 'environment'
			);
			expect(envProperty).toBeDefined();
			expect(envProperty!.type).toBe('options');

			const options = (envProperty as any).options.map(
				(o: { value: string }) => o.value
			);
			expect(options).toContain('production');
			expect(options).toContain('sandbox');
		});

		it('should have authentication configuration', () => {
			expect(credentials.authenticate).toBeDefined();
			expect(credentials.authenticate.type).toBe('generic');
		});

		it('should have test request configuration', () => {
			expect(credentials.test).toBeDefined();
			expect(credentials.test.request).toBeDefined();
		});
	});
});
