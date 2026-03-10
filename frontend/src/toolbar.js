// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    const toolbarWrapperStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg-toolbar)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        height: '70px',
    };

    const logoStyles = {
        color: '#fff',
        fontSize: '20px',
        fontWeight: 'bold',
        marginRight: '40px',
        letterSpacing: '-0.5px',
    };

    const nodesRowStyles = {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexWrap: 'wrap',
    };

    return (
        <div style={toolbarWrapperStyles}>
            <div style={logoStyles}>VectorShift</div>
            <div style={nodesRowStyles}>
                <DraggableNode type='customInput' label='Input' color="#4338ca" />
                <DraggableNode type='llm' label='LLM' color="#6366f1" />
                <DraggableNode type='customOutput' label='Output' color="#b91c1c" />
                <DraggableNode type='text' label='Text' color="#a855f7" />
                <DraggableNode type='api' label='API Call' color="#10B981" />
                <DraggableNode type='filter' label='Filter' color="#F59E0B" />
                <DraggableNode type='transform' label='Transform' color="#8B5CF6" />
                <DraggableNode type='promptTemplate' label='Prompt Template' color="#EC4899" />
                <DraggableNode type='note' label='Note' color="#64748B" />
            </div>
        </div>
    );
};
