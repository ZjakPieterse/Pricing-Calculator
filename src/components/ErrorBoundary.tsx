import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application render failure:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
          <section className="max-w-lg rounded-xl border border-red-900 bg-slate-900 p-6 text-left text-slate-100 shadow-lg">
            <h1 className="text-xl font-semibold text-red-300">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-300">
              We hit an unexpected error while rendering this page. Please refresh the browser or try again in a
              moment.
            </p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
