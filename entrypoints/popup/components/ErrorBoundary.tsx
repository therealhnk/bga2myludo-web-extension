import React from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log the error for debugging
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div style={{ 
                    padding: '20px', 
                    textAlign: 'center',
                    color: '#d32f2f',
                    backgroundColor: '#ffeaea',
                    border: '1px solid #d32f2f',
                    borderRadius: '4px',
                    margin: '10px'
                }}>
                    <h2>⚠️ Une erreur s'est produite</h2>
                    <p>L'extension a rencontré un problème inattendu.</p>
                    <details style={{ marginTop: '10px', textAlign: 'left' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                            Détails de l'erreur
                        </summary>
                        <pre style={{ 
                            backgroundColor: '#f5f5f5', 
                            padding: '10px', 
                            borderRadius: '4px',
                            fontSize: '12px',
                            overflow: 'auto',
                            marginTop: '5px'
                        }}>
                            {this.state.error?.message}
                            {'\n\n'}
                            {this.state.error?.stack}
                        </pre>
                    </details>
                    <button 
                        onClick={() => this.setState({ hasError: false, error: undefined })}
                        style={{
                            marginTop: '15px',
                            padding: '8px 16px',
                            backgroundColor: '#d32f2f',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Réessayer
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}