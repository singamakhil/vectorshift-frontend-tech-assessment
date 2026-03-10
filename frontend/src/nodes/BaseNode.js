import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, config }) => {
    const { title, color, inputs, outputs, fields } = config;

    // Initialize state for dynamic fields
    const initialState = {};
    fields?.forEach((field) => {
        initialState[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    const [formData, setFormData] = useState(initialState);

    const handleFieldChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const nodeStyles = {
        width: 200,
        backgroundColor: 'var(--bg-node)',
        border: `1px solid ${color || 'var(--border)'}`,
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        fontSize: '12px',
        overflow: 'hidden',
        color: 'var(--text-primary)',
    };

    const headerStyles = {
        backgroundColor: color || 'var(--bg-toolbar)',
        padding: '8px',
        color: '#fff',
        fontWeight: 'bold',
        borderBottom: `1px solid ${color || 'var(--border)'}`,
        opacity: 0.9,
    };

    const contentStyles = {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    };

    const fieldStyles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    };

    const inputStyles = {
        padding: '6px',
        backgroundColor: 'var(--bg-canvas)',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        fontSize: '11px',
        color: 'var(--text-primary)',
        outline: 'none',
    };

    return (
        <div style={nodeStyles}>
            {/* Dynamic Input Handles */}
            {inputs?.map((input, index) => (
                <Handle
                    key={input.id}
                    type="target"
                    position={Position.Left}
                    id={`${id}-${input.id}`}
                    style={{
                        top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
                        background: 'var(--accent)'
                    }}
                />
            ))}

            {/* Header */}
            <div style={headerStyles}>
                <span>{title}</span>
            </div>

            {/* Body / Fields */}
            <div style={contentStyles}>
                {fields?.map((field) => (
                    <div key={field.name} style={fieldStyles}>
                        <label style={{ fontWeight: '500', color: 'var(--text-muted)' }}>{field.label || field.name}</label>
                        {field.type === 'select' ? (
                            <select
                                style={inputStyles}
                                value={formData[field.name]}
                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            >
                                {field.options?.map((opt) => (
                                    <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
                                        {typeof opt === 'string' ? opt : opt.label}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === 'textarea' ? (
                            <textarea
                                style={{ ...inputStyles, resize: 'none' }}
                                rows={3}
                                value={formData[field.name]}
                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            />
                        ) : (
                            <input
                                type="text"
                                style={inputStyles}
                                value={formData[field.name]}
                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Dynamic Output Handles */}
            {outputs?.map((output, index) => (
                <Handle
                    key={output.id}
                    type="source"
                    position={Position.Right}
                    id={`${id}-${output.id}`}
                    style={{
                        top: `${((index + 1) * 100) / (outputs.length + 1)}%`,
                        background: 'var(--accent)'
                    }}
                />
            ))}
        </div>
    );
};

export const createNode = (config) => {
    return (props) => <BaseNode {...props} config={config} />;
};
