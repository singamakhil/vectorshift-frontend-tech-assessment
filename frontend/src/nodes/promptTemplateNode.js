import { createNode } from './BaseNode';

export const PromptTemplateNode = createNode({
    title: 'Prompt Template',
    color: '#EC4899',
    inputs: [{ id: 'variables', label: 'Variables' }],
    outputs: [{ id: 'prompt', label: 'Prompt' }],
    fields: [
        { name: 'template', type: 'textarea', label: 'Template', defaultValue: 'Hello {{name}}!' },
    ],
});
