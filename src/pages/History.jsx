import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { subscribeToUserUploads } from '../utils/firestore';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';

export default function History() {
    const [uploads, setUploads] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const unsubscribe = subscribeToUserUploads(currentUser.uid, (data) => {
            setUploads(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser, navigate]);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatConfidence = (confidence) => {
        return `${Math.round(confidence * 100)}%`;
    };

    if (loading) {
        return (
            <PageWrapper>
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                            Your Upload History
                        </h1>
                        <p className="text-sm text-gray-500">
                            View your previously analyzed files and results.
                        </p>
                    </div>

                    {/* Loading Skeleton */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="divide-y divide-gray-200">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="p-4 animate-pulse">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                                        </div>
                                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </PageWrapper>
        );
    }

    if (uploads.length === 0) {
        return (
            <PageWrapper>
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                            Your Upload History
                        </h1>
                        <p className="text-sm text-gray-500">
                            View your previously analyzed files and results.
                        </p>
                    </div>

                    {/* Empty State */}
                    <div className="bg-white border border-gray-200 rounded-lg p-16 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400 mb-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No uploads yet
                        </h3>
                        <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
                            Upload media to view detection history.
                        </p>
                        <Button onClick={() => navigate('/upload')}>
                            Upload Media
                        </Button>
                    </div>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Your Upload History
                    </h1>
                    <p className="text-sm text-gray-500">
                        View your previously analyzed files and results.
                    </p>
                </div>

                {/* History Table */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        File Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Result
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Confidence
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Processing
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {uploads.map((upload, index) => (
                                    <tr
                                        key={upload.id}
                                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                                {upload.fileName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${upload.label === 'Fake'
                                                    ? 'bg-red-100 text-red-700 border-red-200'
                                                    : 'bg-green-100 text-green-700 border-green-200'
                                                    }`}
                                            >
                                                {upload.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatConfidence(upload.confidence)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                                            {upload.mediaType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {formatDate(upload.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {upload.processingTime}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Showing {uploads.length} {uploads.length === 1 ? 'upload' : 'uploads'}
                    </p>
                </div>
            </div>
        </PageWrapper>
    );
}
