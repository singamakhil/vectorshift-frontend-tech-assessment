import { createNode } from './BaseNode';

export const TransformNode = createNode({
    title: 'Transform',
    color: '#8B5CF6',
    inputs: [{ id: 'input', label: 'Input' }],
    outputs: [{ id: 'output', label: 'Output' }],
    fields: [
        {
            name: 'type',
            type: 'select',
            label: 'Type',
            options: [
                { label: 'JSON Parse', value: 'JSON Parse' },
                { label: 'JSON Stringify', value: 'JSON Stringify' },
                { label: 'To Uppercase', value: 'To Uppercase' },
                { label: 'To Lowercase', value: 'To Lowercase' },
                { label: 'Trim', value: 'Trim' },
            ],
            defaultValue: 'Trim',
        },
    ],
});
