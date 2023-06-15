import React from 'react';
import DefaultFallbackError from './DefaultFallbackError.component';

export interface FallbackComponentProps {
  error?: Error;
  onResetErrorBoundary?(): void;
}

interface Props {
  children?: React.ReactNode;
  FallbackComponent?: React.FC<FallbackComponentProps>;
  onReset?(): void;
  onError?(error: Error, info: {componentStack: string}): void;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: null,
    };

    this.handleResetErrorBoundary = this.handleResetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return {
      error,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
  }

  handleResetErrorBoundary() {
    this.props.onReset?.();
    this.setState({error: null});
  }

  render() {
    const {FallbackComponent, children} = this.props;
    const {error} = this.state;

    if (error === null) {
      return children;
    }

    if (FallbackComponent) {
      return (
        <FallbackComponent
          error={error}
          onResetErrorBoundary={this.handleResetErrorBoundary}
        />
      );
    }

    return (
      <DefaultFallbackError
        error={error}
        onResetErrorBoundary={this.handleResetErrorBoundary}
      />
    );
  }
}

export default ErrorBoundary;
