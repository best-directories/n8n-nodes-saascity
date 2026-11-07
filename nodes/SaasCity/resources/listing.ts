import type { INodeProperties } from 'n8n-workflow';
import {
	CATEGORY_OPTIONS,
	LISTING_STATE_OPTIONS,
	MOLT_SUBCATEGORY_OPTIONS,
	PRICING_MODEL_OPTIONS,
	TAGS_EXPRESSION,
} from '../shared';

const show = (operation: string[]) => ({ show: { resource: ['listing'], operation } });

export const listingDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['listing'] } },
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a listing',
				description: 'Get one of your listings by ID or slug',
				routing: {
					request: {
						method: 'GET',
						url: '=/listings/{{encodeURIComponent($parameter.listingId)}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many listings',
				description: 'Get your listings, newest first',
				routing: {
					request: { method: 'GET', url: '/listings' },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'listings' } }],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a listing',
				description:
					'Edit one of your listings. The edit goes back to review until a person approves it.',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/listings/{{encodeURIComponent($parameter.listingId)}}',
					},
				},
			},
		],
		default: 'getAll',
	},

	{
		displayName: 'Listing ID or Slug',
		name: 'listingId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'my-product',
		description: 'The ID or slug of one of your listings',
		displayOptions: show(['get', 'update']),
	},

	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 100 },
		default: 50,
		description: 'Max number of results to return',
		displayOptions: show(['getAll']),
		routing: { send: { type: 'query', property: 'limit' } },
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: show(['getAll']),
		options: [
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				options: LISTING_STATE_OPTIONS,
				default: 'live',
				routing: { send: { type: 'query', property: 'state' } },
			},
		],
	},

	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: show(['update']),
		options: [
			{
				displayName: 'Category',
				name: 'category',
				type: 'options',
				options: CATEGORY_OPTIONS,
				default: 'saas',
				routing: { send: { type: 'body', property: 'category' } },
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: { rows: 5 },
				default: '',
				routing: { send: { type: 'body', property: 'description' } },
			},
			{
				displayName: 'GitHub URL',
				name: 'github_url',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'github_url' } },
			},
			{
				displayName: 'Molt Subcategory',
				name: 'molt_subcategory',
				type: 'options',
				options: MOLT_SUBCATEGORY_OPTIONS,
				default: 'social_forum',
				description: 'Required when the category is Molt / Clawbots, refused otherwise',
				routing: { send: { type: 'body', property: 'molt_subcategory' } },
			},
			{
				displayName: 'Pricing Model',
				name: 'pricing_model',
				type: 'options',
				options: PRICING_MODEL_OPTIONS,
				default: 'freemium',
				routing: { send: { type: 'body', property: 'pricing_model' } },
			},
			{
				displayName: 'Tagline',
				name: 'tagline',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'tagline' } },
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				placeholder: 'analytics, seo',
				description: 'Comma-separated, up to 10. Replaces the current tags.',
				routing: { send: { type: 'body', property: 'tags', value: TAGS_EXPRESSION } },
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'title' } },
			},
			{
				displayName: 'Website URL',
				name: 'website_url',
				type: 'string',
				default: '',
				description: 'Https, on its own domain. Free subdomain hosts are refused.',
				routing: { send: { type: 'body', property: 'website_url' } },
			},
			{
				displayName: 'X (Twitter) URL',
				name: 'twitter_url',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'twitter_url' } },
			},
		],
	},
];
