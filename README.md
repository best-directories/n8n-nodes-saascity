# n8n-nodes-saascity

This is an n8n community node. It lets you use [SaaSCity](https://saascity.io), a launch directory for SaaS, startups and AI tools, in your n8n workflows.

With it you can read and edit your own SaaSCity listings, react to new upvotes, watch for listings going live, search the directory and start listing drafts. Both nodes work as tools for an n8n AI Agent.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)

## Installation

In n8n, open **Settings > Community Nodes**, select **Install**, and enter `n8n-nodes-saascity`. See the [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) for details.

## Operations

### SaaSCity node

| Resource | Operation | What it does |
|---|---|---|
| Account | Get | The account the API key belongs to |
| Listing | Get | One of your listings, by ID or slug |
| Listing | Get Many | Your listings, newest first, optionally filtered by state |
| Listing | Update | Edit title, tagline, description, category, links, tags or pricing model. The edit goes back to review until a person approves it |
| Upvote | Get Many | Upvotes on your listings, newest first. Votes are anonymous: you see when and on which listing, never who |
| Directory | Search | Search live listings in the directory by text, category and sort |
| Draft | Create | Start a listing draft and get its claim URL |

A draft is not a listing. Nothing is listed or charged until a person opens the claim URL, signs in, picks a plan, pays and submits the form. Every listing is reviewed by a person.

### SaaSCity Trigger node

Polls SaaSCity and starts the workflow when:

- **New Upvote on My Listing**: someone upvoted one of your listings.
- **Listing Went Live**: one of your listings is now live.
- **New Product in Directory**: any new product went live in the directory.

On activation the trigger remembers what already exists and only fires for new items after that. A manual test run returns the newest item so you can map its fields.

## Credentials

1. Sign in at [saascity.io](https://saascity.io).
2. Open [Dashboard > Settings > API](https://saascity.io/dashboard/settings/api) and create a key. It starts with `scm_live_`.
3. In n8n, create a **SaaSCity API** credential and paste the key.

n8n tests the key against `GET /me` when you save it. The key is sent in the `X-Api-Key` header.

Limits: 60 requests a minute per key and 10 drafts a day per account. Lists return at most 100 items.

## Compatibility

Built with `@n8n/node-cli` and `n8nNodesApiVersion` 1. Requires n8n 1.0 or later.

## Usage

**Post new upvotes to Slack.** SaaSCity Trigger (New Upvote on My Listing) → Slack (Send Message) with `{{$json.listing_title}}` and `{{$json.listing_url}}`.

**Let an AI Agent manage your listing.** Add the SaaSCity node as a tool on an AI Agent node. The agent can look up your listings, fix a tagline with Update, or search the directory for similar products.

**Announce launch day.** SaaSCity Trigger (Listing Went Live) → X or LinkedIn post with the listing URL.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [SaaSCity Maker API reference (OpenAPI)](https://saascity.io/api/maker/v1/openapi.json)
- [SaaSCity](https://saascity.io)

## Version history

### 0.1.0

First release: SaaSCity node (account, listings, upvotes, directory search, drafts) and SaaSCity Trigger node (new upvote, listing went live, new product).
