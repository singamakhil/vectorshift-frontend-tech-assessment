import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, config, style, onFieldChange }) => {
    const { title, color, inputs, outputs, fields } = config;
    const [isHovered, setIsHovered] = useState(false);

    // Initialize state for dynamic fields
    const initialState = {};
    fields?.forEach((field) => {
        initialState[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    const [formData, setFormData] = useState(initialState);

    const handleFieldChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (onFieldChange) onFieldChange(name, value);
    };

    const nodeStyles = {
        minWidth: 220,
        backgroundColor: 'var(--bg-node)',
        border: `1px solid ${isHovered ? (color || 'var(--accent)') : '#2D3748'}`,
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        fontSize: '12px',
        overflow: 'hidden',
        color: 'var(--text-primary)',
        transition: 'border-color 0.2s ease',
        ...style, // Allow style overrides (e.g., dynamic width/height)
    };

    const headerStyles = {
        backgroundColor: color || 'var(--accent)',
        padding: '8px 14px',
        color: '#fff',
        fontWeight: '600',
        fontSize: '11px',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
    };

    const contentStyles = {
        padding: '12px 14px',
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
        width: '100%',
        boxSizing: 'border-box',
        padding: '6px 10px',
        backgroundColor: '#0F1117',
        border: '1px solid #2D3748',
        borderRadius: '6px',
        fontSize: '12px',
        color: '#F1F5F9',
        outline: 'none',
        transition: 'border-color 0.2s ease',
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
        color: 'var(--text-muted)',
        whiteSpace: 'nowrap',
    };

    return (
        <div
            style={nodeStyles}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Dynamic Input Handles */}
            {inputs?.map((input, index) => {
                const top = `${((index + 1) * 100) / (inputs.length + 1)}%`;
                return (
                    <div key={input.id}>
                        <Handle
                            type="target"
                            position={Position.Left}
                            id={`${id}-${input.id}`}
                            style={{ ...handleBaseStyle, top }}
                        />
                        <span style={{ ...labelStyle, left: '16px', top, transform: 'translateY(-50%)' }}>
                            {input.label}
                        </span>
                    </div>
                );
            })}

            {/* Header */}
            <div style={headerStyles}>
                <span>{title}</span>
            </div>

            {/* Body / Fields */}
            <div style={contentStyles}>
                {fields?.map((field) => (
                    <div key={field.name} style={fieldStyles}>
                        <label style={{ fontWeight: '500', color: 'var(--text-muted)', fontSize: '10px' }}>
                            {field.label || field.name}
                        </label>
                        {field.type === 'select' ? (
                            <select
                                style={inputStyles}
                                value={formData[field.name]}
                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                                onBlur={(e) => (e.target.style.borderColor = '#2D3748')}
                            >
                                {field.options?.map((opt) => (
                                    <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
                                        {typeof opt === 'string' ? opt : opt.label}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === 'textarea' ? (
                            <textarea
                                style={{ ...inputStyles, resize: 'none', flexGrow: 1 }}
                                rows={field.rows || 1}
                                value={formData[field.name]}
                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                                onBlur={(e) => (e.target.style.borderColor = '#2D3748')}
                            />
                        ) : (
                            <input
                                type="text"
                                style={inputStyles}
                                value={formData[field.name]}
                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                                onBlur={(e) => (e.target.style.borderColor = '#2D3748')}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Dynamic Output Handles */}
            {outputs?.map((output, index) => {
                const top = `${((index + 1) * 100) / (outputs.length + 1)}%`;
                return (
                    <div key={output.id}>
                        <Handle
                            type="source"
                            position={Position.Right}
                            id={`${id}-${output.id}`}
                            style={{ ...handleBaseStyle, top }}
                        />
                        <span style={{ ...labelStyle, right: '16px', top, transform: 'translateY(-50%)' }}>
                            {output.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export const createNode = (config) => {
    return (props) => <BaseNode {...props} config={config} />;
};
