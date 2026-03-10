import { createNode } from './BaseNode';

export const TextNode = createNode({
  title: 'Text',
  color: '#a855f7',
  outputs: [{ id: 'output', label: 'Output' }],
  fields: [
    { name: 'text', label: 'Text', type: 'text', defaultValue: '{{input}}' },
  ],
});
