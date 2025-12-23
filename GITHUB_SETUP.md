# GitHub Repository Setup

## Initial Repository Push

```bash
# Extract and navigate
unzip n8n-nodes-increase.zip
cd n8n-nodes-increase

# Initialize and push
git init
git add .
git commit -m "Initial commit: n8n Increase Banking-as-a-Service community node

Features:
- Account: Create, get, list, update, close, get balance
- ACH Transfer: Create, get, list, approve, cancel
- Wire Transfer: Create, get, list, approve, cancel
- RTP Transfer: Create, get, list (Real-Time Payments)
- Check Transfer: Create, get, list, approve, cancel, stop payment
- Check Deposit: Create, get, list
- External Account: Create, get, list, update
- Transaction: Get, list (completed and pending)
- Inbound ACH Transfer: Get, list, decline, return, notification of change
- Entity: Create, get, list, archive, confirm
- Event: Get, list events and subscriptions
- Simulation: Sandbox testing for all payment rails
- Trigger: Webhook support with HMAC-SHA256 verification"

git remote add origin https://github.com/Velocity-BPA/n8n-nodes-increase.git
git branch -M main
git push -u origin main
```

## Subsequent Updates

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Description of changes"

# Push to remote
git push
```

## Version Tagging

```bash
# Create version tag
git tag -a v1.0.0 -m "Initial release"

# Push tags
git push origin --tags
```
