import { createNode } from './BaseNode';

export const NoteNode = createNode({
    title: 'Note',
    color: '#64748B',
    inputs: [],
    outputs: [],
    fields: [
        { name: 'content', type: 'textarea', label: 'Content', defaultValue: 'Enter your note here...' },
    ],
});
