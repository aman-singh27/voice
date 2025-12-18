import { Component } from 'react';
import Button from '../ui/Button';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-white flex items-center justify-center px-4">
                    <div className="max-w-md w-full text-center">
                        {/* Icon */}
                        <div className="mb-6">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                            Something went wrong
                        </h1>

                        {/* Message */}
                        <p className="text-sm text-gray-500 mb-8">
                            An unexpected error occurred. Please try refreshing the page.
                        </p>

                        {/* Action Button */}
                        <Button onClick={this.handleRetry}>
                            Retry
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
