import { Component, ErrorInfo, ReactNode } from "react";

export const RootErrorFallback = () => (
  <div className="min-h-screen bg-[#1D1A31] flex items-center justify-center p-6 text-center">
    <div className="max-w-md w-full glass-card p-10 border border-white/20 rounded-[32px] shadow-2xl flex flex-col items-center gap-6">
      <div className="w-12 h-12 rounded-full bg-[#F08CAE]/10 border border-[#F08CAE]/20 flex items-center justify-center text-[#F08CAE] text-lg font-bold">
        ✦
      </div>
      <h2 className="font-display text-2xl text-white font-medium uppercase tracking-wider">
        Artistry Interrupted
      </h2>
      <p className="font-sans text-sm text-white/60 leading-relaxed">
        We encountered a performance interruption while displaying this page. Please refresh to restore the luxury experience.
      </p>
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
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback !== undefined ? this.props.fallback : null;
    }

    return this.props.children;
  }
}
