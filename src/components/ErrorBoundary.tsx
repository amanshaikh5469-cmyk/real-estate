import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public handleReset = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center p-6 text-[#1a1c20]">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#ebe3d5] shadow-xl text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-5">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold font-display text-[#1a1c20] mb-2">
              Rafique Estates
            </h1>
            <p className="text-xs text-[#717680] leading-relaxed mb-6">
              An unexpected display issue occurred. Clearing local browser cache and refreshing will restore the verified portfolio state.
            </p>
            {this.state.error && (
              <pre className="text-[10px] text-left p-3 rounded-xl bg-[#faf9f5] border border-[#ebe3d5] overflow-auto text-red-600 mb-6 max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-[#1a1c20] hover:bg-[#2c3038] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset & Reload App</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
