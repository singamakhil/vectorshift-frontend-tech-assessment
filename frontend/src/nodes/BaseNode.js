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
        backgroundColor: '#fff',
        border: `1px solid ${color || '#ccc'}`,
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        fontSize: '12px',
        overflow: 'hidden',
    };

    const headerStyles = {
        backgroundColor: color || '#f3f4f6',
        padding: '8px',
        color: '#fff',
        fontWeight: 'bold',
        borderBottom: `1px solid ${color || '#ccc'}`,
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
        gap: '2px',
    };

    const inputStyles = {
        padding: '4px',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        fontSize: '11px',
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
                    style={{ top: `${((index + 1) * 100) / (inputs.length + 1)}%` }}
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
                        <label style={{ fontWeight: '500' }}>{field.label || field.name}</label>
                        {field.type === 'select' ? (
                            <select
                                style={inputStyles}
                                value={formData[field.name]}
                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            >
                                {field.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
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
                    style={{ top: `${((index + 1) * 100) / (outputs.length + 1)}%` }}
                />
            ))}
        </div>
    );
};

export const createNode = (config) => {
    return (props) => <BaseNode {...props} config={config} />;
};
