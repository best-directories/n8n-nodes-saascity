import {
	NodeApiError,
	NodeConnectionTypes,
	type IDataObject,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
	type IPollFunctions,
	type JsonObject,
} from 'n8n-workflow';
import { BASE_URL } from '../SaasCity/shared';

type Event = 'newUpvote' | 'listingLive' | 'newDirectoryListing';

const REQUESTS: Record<Event, { url: string; qs: IDataObject; key: string }> = {
	newUpvote: { url: '/upvotes', qs: { limit: 50 }, key: 'upvotes' },
	listingLive: { url: '/listings', qs: { state: 'live', limit: 50 }, key: 'listings' },
	newDirectoryListing: { url: '/search', qs: { sort: 'newest', limit: 50 }, key: 'listings' },
};

/** IDs remembered per trigger, enough to cover several full pages. */
const SEEN_MAX = 500;

export class SaasCityTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SaaSCity Trigger',
		name: 'saasCityTrigger',
		icon: { light: 'file:saascity.svg', dark: 'file:saascity.dark.svg' },
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts the workflow on new SaaSCity upvotes, listings going live or new products',
		defaults: { name: 'SaaSCity Trigger' },
		polling: true,
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'saasCityApi', required: true }],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				noDataExpression: true,
				required: true,
				default: 'newUpvote',
				options: [
					{
						name: 'Listing Went Live',
						value: 'listingLive',
						description: 'One of your listings is now live on SaaSCity',
					},
					{
						name: 'New Product in Directory',
						value: 'newDirectoryListing',
						description: 'Any new product went live in the SaaSCity directory',
					},
					{
						name: 'New Upvote on My Listing',
						value: 'newUpvote',
						description: 'Someone upvoted one of your listings (votes are anonymous)',
					},
				],
			},
		],
	};

	async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
		const event = this.getNodeParameter('event') as Event;
		const { url, qs, key } = REQUESTS[event];

		let response: IDataObject;
		try {
			response = (await this.helpers.httpRequestWithAuthentication.call(this, 'saasCityApi', {
				method: 'GET',
				baseURL: BASE_URL,
				url,
				qs,
				json: true,
			})) as IDataObject;
		} catch (error) {
			throw new NodeApiError(this.getNode(), error as JsonObject);
		}

		const items = ((response[key] as IDataObject[] | undefined) ?? []).filter(
			(item) => typeof item.id === 'string',
		);

		// A manual test run shows the newest item so the user can map fields.
		if (this.getMode() === 'manual') {
			return items.length ? [this.helpers.returnJsonArray(items.slice(0, 1))] : null;
		}

		const staticData = this.getWorkflowStaticData('node');
		const seenKey = `seen_${event}`;
		const seen = staticData[seenKey] as string[] | undefined;
		const ids = items.map((item) => item.id as string);

		// First activation: remember what exists, emit nothing.
		if (!seen) {
			staticData[seenKey] = ids.slice(0, SEEN_MAX);
			return null;
		}

		const seenSet = new Set(seen);
		const fresh = items.filter((item) => !seenSet.has(item.id as string));
		if (!fresh.length) return null;

		staticData[seenKey] = [...fresh.map((item) => item.id as string), ...seen].slice(0, SEEN_MAX);

		// Oldest first, so downstream steps run in the order things happened.
		return [this.helpers.returnJsonArray(fresh.reverse())];
	}
}
