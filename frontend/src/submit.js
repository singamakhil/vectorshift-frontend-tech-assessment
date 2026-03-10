// submit.js
import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        // Access store state directly
        const { nodes, edges } = useStore.getState();

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Styled alert (modal implementation would be better but window.alert is requested/simpler here)
            window.alert(
                `Pipeline Analysis:\n` +
                `• Nodes: ${data.num_nodes}\n` +
                `• Edges: ${data.num_edges}\n` +
                `• Valid DAG: ${data.is_dag ? 'Yes ✅' : 'No ❌'}`
            );

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            window.alert('Error connecting to backend');
        } finally {
            setIsLoading(false);
        }
    };

    const buttonStyles = {
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 40px',
        fontSize: '15px',
        fontWeight: '600',
        color: '#fff',
        background: isLoading
            ? 'var(--bg-node)'
            : 'linear-gradient(135deg, #6366F1, #8B5CF6)',
        border: 'none',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        letterSpacing: '0.5px',
        transition: 'all 0.2s ease',
        zIndex: 1000,
        opacity: isLoading ? 0.7 : 1,
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                style={buttonStyles}
                onMouseEnter={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.filter = 'brightness(1.1)';
                        e.currentTarget.style.boxShadow = '0 6px 25px rgba(99,102,241,0.6)';
                        e.currentTarget.style.transform = 'translateX(-50%) translateY(-1px)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.filter = 'none';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.4)';
                        e.currentTarget.style.transform = 'translateX(-50%) translateY(0)';
                    }
                }}
                onMouseDown={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.transform = 'translateX(-50%) translateY(0)';
                    }
                }}
            >
                {isLoading ? 'Analyzing...' : 'Submit Pipeline'}
            </button>
        </div>
    );
}
