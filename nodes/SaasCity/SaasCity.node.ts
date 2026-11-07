import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { accountDescription } from './resources/account';
import { directoryDescription } from './resources/directory';
import { draftDescription } from './resources/draft';
import { listingDescription } from './resources/listing';
import { upvoteDescription } from './resources/upvote';
import { BASE_URL } from './shared';

export class SaasCity implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SaaSCity',
		name: 'saasCity',
		icon: { light: 'file:saascity.svg', dark: 'file:saascity.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Manage your SaaSCity listings, read upvotes and search the directory',
		defaults: { name: 'SaaSCity' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'saasCityApi', required: true }],
		requestDefaults: {
			baseURL: BASE_URL,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Directory', value: 'directory' },
					{ name: 'Draft', value: 'draft' },
					{ name: 'Listing', value: 'listing' },
					{ name: 'Upvote', value: 'upvote' },
				],
				default: 'listing',
			},
			...accountDescription,
			...directoryDescription,
			...draftDescription,
			...listingDescription,
			...upvoteDescription,
		],
	};
}
