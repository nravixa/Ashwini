import React, { Component, ErrorInfo, ReactNode } from "react";

export const RootErrorFallback = ({ error }: { error?: Error | null }) => (
  <div className="min-h-screen bg-[#1D1A31] flex items-center justify-center p-6 text-center">
    <div className="max-w-2xl w-full glass-card p-10 border border-white/20 rounded-[32px] shadow-2xl flex flex-col items-center gap-6">
      <div className="w-12 h-12 rounded-full bg-[#F08CAE]/10 border border-[#F08CAE]/20 flex items-center justify-center text-[#F08CAE] text-lg font-bold">
        ✦
      </div>
      <h2 className="font-display text-2xl text-white font-medium uppercase tracking-wider">
        Artistry Interrupted
      </h2>
      <p className="font-sans text-sm text-white/60 leading-relaxed">
        We encountered a performance interruption while displaying this page. Please refresh to restore the luxury experience.
      </p>

      {error && (
        <div className="w-full text-left bg-black/40 border border-white/10 rounded-2xl p-5 overflow-auto max-h-60 font-mono text-[10px] text-red-300 whitespace-pre-wrap select-all">
          <p className="font-bold text-xs text-white mb-2">{error.toString()}</p>
          <p className="opacity-80 leading-normal">{error.stack}</p>
        </div>
      )}

      <button
        onClick={() => window.location.reload()}
        className="w-full py-4 bg-[#F08CAE] text-white rounded-full font-sans text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg hover:bg-[#e07b9d] transition-all duration-300 cursor-pointer active:scale-95"
      >
        Reload Page
      </button>
    </div>
  </div>
);

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) {
        if (React.isValidElement(this.props.fallback)) {
          return React.cloneElement(this.props.fallback as React.ReactElement<any>, { error: this.state.error });
        }
        return this.props.fallback;
      }
      return null;
    }

    return this.props.children;
  }
}
