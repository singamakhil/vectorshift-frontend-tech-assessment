import { createNode } from './BaseNode';

export const InputNode = createNode({
  title: 'Input',
  color: '#4338ca',
  outputs: [{ id: 'value', label: 'Value' }],
  fields: [
    { name: 'inputName', label: 'Name', type: 'text', defaultValue: 'input_1' },
    {
      name: 'inputType',
      label: 'Type',
      type: 'select',
      options: [
        { label: 'Text', value: 'Text' },
        { label: 'File', value: 'File' }
      ],
      defaultValue: 'Text'
    },
  ],
});
