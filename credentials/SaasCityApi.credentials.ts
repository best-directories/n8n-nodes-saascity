import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SaasCityApi implements ICredentialType {
	name = 'saasCityApi';

	displayName = 'SaaSCity API';

	icon = 'file:../nodes/SaasCity/saascity.svg' as const;

	documentationUrl = 'https://github.com/best-directories/n8n-nodes-saascity?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			placeholder: 'scm_live_...',
			description:
				'Create a key at https://saascity.io/dashboard/settings/api. It starts with scm_live_.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Api-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://saascity.io/api/maker/v1',
			url: '/me',
		},
	};
}
