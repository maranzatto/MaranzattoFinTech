import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-danger">
            Erro: {this.state.error?.message || 'Algo deu errado'}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 