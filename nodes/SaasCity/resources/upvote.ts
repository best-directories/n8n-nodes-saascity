import type { INodeProperties } from 'n8n-workflow';

export const upvoteDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['upvote'] } },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many upvotes',
				description:
					'Get upvotes on your listings, newest first. Votes are anonymous: you get when and on which listing, never who.',
				routing: {
					request: { method: 'GET', url: '/upvotes' },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'upvotes' } }],
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 100 },
		default: 50,
		description: 'Max number of results to return',
		displayOptions: { show: { resource: ['upvote'], operation: ['getAll'] } },
		routing: { send: { type: 'query', property: 'limit' } },
	},
];
