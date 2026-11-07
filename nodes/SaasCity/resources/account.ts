import type { INodeProperties } from 'n8n-workflow';

export const accountDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['account'] } },
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get my account',
				description: 'Get the account the API key belongs to',
				routing: { request: { method: 'GET', url: '/me' } },
			},
		],
		default: 'get',
	},
];
