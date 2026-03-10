import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    // Regex to extract valid JS variable names within {{ }}
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = Array.from(currText.matchAll(regex));
    const extractedVars = [...new Set(matches.map(match => match[1]))];
    setVariables(extractedVars);
  }, [currText]);

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

  const handleBaseStyle = {
    width: '12px',
    height: '12px',
    backgroundColor: 'var(--accent)',
    border: '2px solid #0F1117',
    borderRadius: '50%',
    transition: 'transform 0.2s ease',
  };

  const labelStyle = {
    position: 'absolute',
    fontSize: '10px',
    color: '#94A3B8',
    whiteSpace: 'nowrap',
    left: '16px',
    transform: 'translateY(-50%)'
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
    >
      {/* Dynamic Target Handles */}
      {variables.map((varName, index) => {
        const top = `${(index + 1) * (100 / (variables.length + 1))}%`;
        return (
          <div key={`${id}-${varName}`}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${varName}`}
              style={{ ...handleBaseStyle, top }}
            />
            <span style={{ ...labelStyle, top }}>
              {varName}
            </span>
          </div>
        );
      })}
    </BaseNode>
  );
};
