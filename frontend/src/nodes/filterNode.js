import { createNode } from './BaseNode';

export const FilterNode = createNode({
    title: 'Filter',
    color: '#F59E0B',
    inputs: [{ id: 'data', label: 'Data' }],
    outputs: [
        { id: 'pass', label: 'Pass' },
        { id: 'fail', label: 'Fail' },
    ],
    fields: [
        { name: 'condition', type: 'text', label: 'Condition', defaultValue: 'data.value > 0' },
    ],
});
