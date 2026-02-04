import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="flex flex-col items-center justify-center min-h-[400px] p-8 rounded-lg"
          style={{ backgroundColor: 'var(--color-surface0)' }}
        >
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ color: 'var(--color-red)' }}
          >
            Oops, quelque chose s&apos;est mal passé
          </h2>
          <p 
            className="text-center mb-6"
            style={{ color: 'var(--color-subtext0)' }}
          >
            Une erreur inattendue s&apos;est produite. Veuillez rafraîchir la page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg font-medium transition-all"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-base)'
            }}
          >
            Rafraîchir la page
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-6 max-w-2xl">
              <summary 
                className="cursor-pointer font-mono text-sm"
                style={{ color: 'var(--color-subtext1)' }}
              >
                Détails de l&apos;erreur
              </summary>
              <pre 
                className="mt-2 p-4 rounded overflow-auto text-xs"
                style={{ 
                  backgroundColor: 'var(--color-mantle)',
                  color: 'var(--color-text)'
                }}
              >
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
