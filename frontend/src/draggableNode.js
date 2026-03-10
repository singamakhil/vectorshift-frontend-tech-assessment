// draggableNode.js

import { useState } from 'react';

export const DraggableNode = ({ type, label, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const chipStyles = {
    cursor: 'grab',
    minWidth: '100px',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    backgroundColor: 'var(--bg-node)',
    border: `1px solid ${isHovered ? 'var(--accent)' : 'var(--border)'}`,
    borderLeft: `4px solid ${color || 'var(--accent)'}`,
    color: 'var(--text-primary)',
    justifyContent: 'center',
    flexDirection: 'column',
    transition: 'all 0.2s ease',
    boxShadow: isHovered ? `0 0 15px ${color || 'var(--accent)'}44` : 'none',
    fontSize: '13px',
    fontWeight: '500',
    userSelect: 'none',
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={chipStyles}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
