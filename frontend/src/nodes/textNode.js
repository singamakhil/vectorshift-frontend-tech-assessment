import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const lines = currText.split('\n');
  const longestLine = Math.max(...lines.map(l => l.length), 10);

  const MIN_WIDTH = 200;
  const MAX_WIDTH = 500;
  const MIN_HEIGHT = 80;

  const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, longestLine * 8));
  const height = Math.max(MIN_HEIGHT, lines.length * 24 + 80);

  const onFieldChange = (name, value) => {
    if (name === 'text') {
      setCurrText(value);
    }
  };

  return (
    <BaseNode
      id={id}
      data={data}
      onFieldChange={onFieldChange}
      style={{ width, height }}
      config={{
        title: 'Text',
        color: '#a855f7',
        outputs: [{ id: 'output', label: 'Output' }],
        fields: [
          {
            name: 'text',
            label: 'Text',
            type: 'textarea',
            defaultValue: '{{input}}',
            rows: lines.length
          },
        ],
      }}
    />
  );
};
