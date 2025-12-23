# n8n-nodes-increase

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

[![License: BUSL-1.1](https://img.shields.io/badge/License-BUSL%201.1-blue.svg)](LICENSE)
[![n8n Community Node](https://img.shields.io/badge/n8n-community%20node-orange)](https://n8n.io)

n8n community node for **Increase Banking-as-a-Service platform** - enabling programmatic access to ACH, Wire, Real-Time Payments (RTP), and Check payment rails with direct Federal Reserve connection.

## Overview

This node provides comprehensive integration with the [Increase](https://increase.com) banking platform, allowing you to automate banking operations directly within your n8n workflows.

## Features

### Payment Rails
- **ACH Transfers** - Create, approve, cancel, and track Automated Clearing House transfers
- **Wire Transfers** - Domestic wire transfer management with approval workflows
- **Real-Time Payments (RTP)** - Instant payment processing via The Clearing House network
- **Check Transfers** - Physical check mailing and tracking
- **Check Deposits** - Mobile check deposit processing

### Banking Operations
- **Account Management** - Create, update, close accounts; query balances
- **External Accounts** - Manage counterparty bank accounts for transfers
- **Entities** - KYC/KYB entity management for corporations and individuals
- **Transactions** - Query completed and pending transactions
- **Account Statements** - Retrieve periodic account statements

### Event Management
- **Events** - Query system events
- **Event Subscriptions** - Webhook subscription management
- **Trigger Node** - Real-time webhook notifications for account and transfer events

### Sandbox Simulation
- Simulate ACH submission, settlement, and returns
- Simulate wire transfer submission
- Simulate inbound transfers (ACH, Wire, RTP)
- Test check mailing and deposit rejection

## Installation

### Via n8n Community Nodes UI

1. Go to **Settings** > **Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-increase`
4. Click **Install**

### Via npm (Manual Installation)

```bash
# Navigate to your n8n custom nodes directory
cd ~/.n8n/custom

# Install the package
npm install n8n-nodes-increase

# Restart n8n
```

### Via Docker

Add to your n8n Docker container:

```dockerfile
# Install the community node
RUN cd /home/node/.n8n && npm install n8n-nodes-increase
```

Or use environment variable:

```yaml
environment:
  - N8N_COMMUNITY_PACKAGES=n8n-nodes-increase
```

## Configuration

### Credentials Setup

1. In n8n, go to **Credentials** > **New**
2. Search for **Increase API**
3. Enter your credentials:
   - **API Key**: Your Increase API key (Bearer token)
   - **Environment**: `sandbox` or `production`

### Getting API Keys

1. Sign up at [Increase](https://increase.com)
2. Navigate to **API Keys** in your dashboard
3. Create a new API key for your environment
4. Copy the key and store it securely

## Usage Examples

### Create an ACH Transfer

```json
{
  "resource": "achTransfer",
  "operation": "create",
  "accountId": "account_xxx",
  "amount": 10000,
  "statementDescriptor": "PAYMENT",
  "routingNumber": "121000358",
  "accountNumber": "987654321"
}
```

### List Transactions with Filters

```json
{
  "resource": "transaction",
  "operation": "getAll",
  "returnAll": false,
  "limit": 50,
  "filters": {
    "account_id": "account_xxx",
    "created_at.after": "2024-01-01T00:00:00Z"
  }
}
```

### Create a Wire Transfer with Approval

```json
{
  "resource": "wireTransfer",
  "operation": "create",
  "accountId": "account_xxx",
  "amount": 100000,
  "beneficiaryName": "Acme Corp",
  "messageToRecipient": "Invoice #12345",
  "routingNumber": "021000021",
  "accountNumber": "123456789",
  "additionalFields": {
    "require_approval": true
  }
}
```

### Webhook Trigger Configuration

The **Increase Trigger** node allows you to receive real-time notifications:

1. Add the **Increase Trigger** node to your workflow
2. Select the events you want to monitor
3. Optionally configure a shared secret for signature verification
4. Activate the workflow

Supported events include account changes, transfer status updates, and transaction notifications.

## Amount Handling

All monetary amounts in Increase are expressed in **cents** (integers):

| Dollars | Cents (API Value) |
|---------|-------------------|
| $1.00   | 100               |
| $10.50  | 1050              |
| $100.00 | 10000             |

- **Positive amounts** = Credit (sending money to external account)
- **Negative amounts** = Debit (receiving money from external account)

## Resources Reference

| Resource | Operations |
|----------|------------|
| Account | Create, Get, List, Update, Close, Get Balance |
| ACH Transfer | Create, Get, List, Approve, Cancel |
| Wire Transfer | Create, Get, List, Approve, Cancel |
| RTP Transfer | Create, Get, List |
| Check Transfer | Create, Get, List, Approve, Cancel, Stop Payment |
| Check Deposit | Create, Get, List |
| External Account | Create, Get, List, Update |
| Transaction | Get, List |
| Pending Transaction | Get, List |
| Inbound ACH Transfer | Get, List, Decline, Return, Notification of Change |
| Entity | Create, Get, List, Archive, Confirm |
| Event | Get, List |
| Event Subscription | Create, Get, List, Update |
| Account Statement | Get, List |
| Simulation | Various sandbox simulation operations |

## Error Handling

The node provides detailed error messages from the Increase API:

```json
{
  "type": "invalid_request_error",
  "title": "Invalid Request",
  "detail": "The account_id field is required",
  "status": 400
}
```

Enable **Continue on Fail** in your workflow to handle errors gracefully.

## Testing

### Run Unit Tests

```bash
npm test
```

### Run Integration Tests

```bash
# Set your Sandbox API key
export INCREASE_API_KEY=your_sandbox_key

# Run tests
npm test
```

### Test Coverage

```bash
npm run test:coverage
```

## Development

### Build from Source

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-increase.git
cd n8n-nodes-increase

# Install dependencies
npm install

# Build the project
npm run build

# Link for local development
npm link
```

### Project Structure

```
n8n-nodes-increase/
├── credentials/
│   └── IncreaseApi.credentials.ts
├── nodes/Increase/
│   ├── Increase.node.ts
│   ├── IncreaseTrigger.node.ts
│   ├── GenericFunctions.ts
│   ├── increase.svg
│   └── descriptions/
│       ├── AccountDescription.ts
│       ├── AchTransferDescription.ts
│       ├── WireTransferDescription.ts
│       └── ... (other resources)
├── __tests__/
│   ├── GenericFunctions.test.ts
│   ├── Integration.test.ts
│   └── NodeStructure.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

## API Documentation

For detailed API documentation, visit:
- [Increase API Documentation](https://increase.com/documentation)
- [Increase API Reference](https://increase.com/documentation/api)

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-increase/issues)
- **Documentation**: [Increase Docs](https://increase.com/documentation)

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)
- Email: licensing@velobpa.com

## Changelog

### v1.0.0
- Initial release
- Full Increase API coverage for ACH, Wire, RTP, and Check operations
- Webhook trigger support with HMAC-SHA256 signature verification
- Sandbox simulation endpoints
- Comprehensive account and entity management
