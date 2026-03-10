import { createNode } from './BaseNode';

export const OutputNode = createNode({
  title: 'Output',
  color: '#b91c1c',
  inputs: [{ id: 'value', label: 'Value' }],
  fields: [
    { name: 'outputName', label: 'Name', type: 'text', defaultValue: 'output_1' },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      options: [
        { label: 'Text', value: 'Text' },
        { label: 'Image', value: 'Image' }
      ],
      defaultValue: 'Text'
    },
  ],
});
