import { createNode } from './BaseNode';

export const APINode = createNode({
    title: 'API Call',
    color: '#10B981',
    inputs: [{ id: 'trigger', label: 'Trigger' }],
    outputs: [
        { id: 'response', label: 'Response' },
        { id: 'error', label: 'Error' },
    ],
    fields: [
        { name: 'url', type: 'text', label: 'URL', defaultValue: 'https://api.example.com' },
        {
            name: 'method',
            type: 'select',
            label: 'Method',
            options: [
                { label: 'GET', value: 'GET' },
                { label: 'POST', value: 'POST' },
                { label: 'PUT', value: 'PUT' },
                { label: 'DELETE', value: 'DELETE' },
            ],
            defaultValue: 'GET',
        },
    ],
});
