import type { INodeProperties } from 'n8n-workflow';
import { CATEGORY_OPTIONS } from '../shared';

const show = { show: { resource: ['directory'], operation: ['search'] } };

export const directoryDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['directory'] } },
		options: [
			{
				name: 'Search',
				value: 'search',
				action: 'Search the directory',
				description: 'Search live listings in the SaaSCity directory',
				routing: {
					request: { method: 'GET', url: '/search' },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'listings' } }],
					},
				},
			},
		],
		default: 'search',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		placeholder: 'email marketing',
		description: 'Matched against title and tagline. Leave empty to browse.',
		displayOptions: show,
		routing: {
			send: { type: 'query', property: 'query', value: '={{ $value || undefined }}' },
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 100 },
		default: 50,
		description: 'Max number of results to return',
		displayOptions: show,
		routing: { send: { type: 'query', property: 'limit' } },
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: show,
		options: [
			{
				displayName: 'Category',
				name: 'category',
				type: 'options',
				options: CATEGORY_OPTIONS,
				default: 'saas',
				routing: { send: { type: 'query', property: 'category' } },
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Newest', value: 'newest' },
					{ name: 'Most Points', value: 'points' },
				],
				default: 'newest',
				routing: { send: { type: 'query', property: 'sort' } },
			},
		],
	},
];
