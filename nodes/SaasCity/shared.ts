import type { INodePropertyOptions } from 'n8n-workflow';

export const BASE_URL = 'https://saascity.io/api/maker/v1';

// Mirrors CATEGORY_OPTIONS in the SaaSCity app (src/lib/categories.ts).
export const CATEGORY_OPTIONS: INodePropertyOptions[] = [
	{ name: 'AI & Machine Learning', value: 'ai' },
	{ name: 'Design Tools', value: 'design' },
	{ name: 'Developer Tools', value: 'devtools' },
	{ name: 'Directories / Launchpads', value: 'directories' },
	{ name: 'Fintech', value: 'fintech' },
	{ name: 'Games', value: 'games' },
	{ name: 'Health & Wellness', value: 'health' },
	{ name: 'Marketing', value: 'marketing' },
	{ name: 'Mobile Apps', value: 'mobile' },
	{ name: 'Molt / Clawbots', value: 'molt' },
	{ name: 'Other', value: 'other' },
	{ name: 'Productivity', value: 'productivity' },
	{ name: 'SaaS & B2B', value: 'saas' },
	{ name: 'Web3 & Crypto', value: 'web3' },
];

export const MOLT_SUBCATEGORY_OPTIONS: INodePropertyOptions[] = [
	{ name: 'Aggregator / Reader', value: 'aggregator_reader' },
	{ name: 'Developer Tools / Integration', value: 'developer_tools_integration' },
	{ name: 'Gaming / Competition', value: 'gaming_competition' },
	{ name: 'Marketplace / Economy', value: 'marketplace_economy' },
	{ name: 'Messaging / Private Comm', value: 'messaging_private_comm' },
	{ name: 'Social / Forum', value: 'social_forum' },
	{ name: 'Token Launchpad / Crypto', value: 'token_launchpad_crypto' },
	{ name: 'Visualization / World', value: 'visualization_world' },
];

export const PRICING_MODEL_OPTIONS: INodePropertyOptions[] = [
	{ name: 'Free', value: 'free' },
	{ name: 'Free Trial', value: 'free_trial' },
	{ name: 'Freemium', value: 'freemium' },
	{ name: 'Paid', value: 'paid' },
];

export const LISTING_STATE_OPTIONS: INodePropertyOptions[] = [
	{ name: 'Archived', value: 'archived' },
	{ name: 'Awaiting Payment', value: 'awaiting_payment', description: 'Claimed, plan not paid yet' },
	{ name: 'In Review', value: 'in_review', description: 'Queued for a person to review' },
	{ name: 'Live', value: 'live', description: 'On the site' },
	{ name: 'Rejected', value: 'rejected' },
	{ name: 'Scheduled', value: 'scheduled', description: 'Approved, launch week not started' },
];

/** Comma-separated tags to the array the API takes. */
export const TAGS_EXPRESSION =
	'={{ $value.split(",").map((t) => t.trim()).filter((t) => t.length > 0) }}';
