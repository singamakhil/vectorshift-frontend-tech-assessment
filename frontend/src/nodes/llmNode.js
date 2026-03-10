import { createNode } from './BaseNode';

export const LLMNode = createNode({
  title: 'LLM',
  color: '#6366f1',
  inputs: [
    { id: 'system', label: 'System' },
    { id: 'prompt', label: 'Prompt' },
  ],
  outputs: [{ id: 'response', label: 'Response' }],
});
