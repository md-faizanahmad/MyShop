import { Component, type ErrorInfo, type JSX, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({
      hasError: false,
    });
  };

  render(): JSX.Element | ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    return (
      <div className="flex min-h-[60vh] items-center justify-center px-5">
        <div className="w-full max-w-sm text-center">
          <h2 className="text-base font-semibold text-slate-900">
            Something went wrong
          </h2>

          <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm">
            We couldn&apos;t load this part of the page. Please try again.
          </p>

          <button
            type="button"
            onClick={this.handleRetry}
            className="
              mt-5
              inline-flex
              h-10
              items-center
              justify-center
              bg-sky-600
              px-5
              text-xs
              font-semibold
              text-white
              transition-colors
              hover:bg-sky-700
              active:scale-[0.98]
              sm:text-sm
            "
          >
            Try again
          </button>
        </div>
      </div>
    );
  }
}
