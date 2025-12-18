import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <PageWrapper>
            <div className="min-h-[60vh] flex items-center justify-center px-4">
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
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Page not found
                    </h1>

                    {/* Message */}
                    <p className="text-sm text-gray-500 mb-8">
                        The page you're looking for doesn't exist.
                    </p>

                    {/* Action Button */}
                    <Button onClick={() => navigate('/')}>
                        Go Home
                    </Button>
                </div>
            </div>
        </PageWrapper>
    );
}
