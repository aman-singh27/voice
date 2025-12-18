import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';

export default function Result() {
    const navigate = useNavigate();
    const location = useLocation();
    const result = location.state;

    // Redirect to upload if no result data
    useEffect(() => {
        if (!result) {
            navigate('/upload');
        }
    }, [result, navigate]);

    // Don't render if no result
    if (!result) {
        return null;
    }

    const isFake = result.label === "Fake";
    const confidencePercent = Math.round(result.confidence * 100);

    const handleAnalyzeAnother = () => {
        navigate('/upload');
    };

    const handleGoToDashboard = () => {
        navigate('/history');
    };

    return (
        <PageWrapper>
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Analysis Result
                    </h1>
                    <p className="text-sm text-gray-500">
                        Here is the outcome of your media analysis.
                    </p>
                </div>

                {/* Result Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm space-y-8">

                    {/* Status Badge */}
                    <div className="text-center">
                        <span
                            className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium border ${isFake
                                ? 'bg-red-100 text-red-700 border-red-200'
                                : 'bg-green-100 text-green-700 border-green-200'
                                }`}
                        >
                            {result.label}
                        </span>
                    </div>

                    {/* Confidence Meter */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                                Confidence Score
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                                {confidencePercent}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${isFake ? 'bg-red-600' : 'bg-green-600'
                                    }`}
                                style={{ width: `${confidencePercent}%` }}
                            />
                        </div>
                    </div>

                    {/* File Information */}
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">
                            File Details
                        </h3>
                        <dl className="grid grid-cols-1 gap-y-3">
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">File Name</dt>
                                <dd className="text-sm text-gray-800 font-medium truncate ml-4 max-w-xs">
                                    {result.fileName}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Media Type</dt>
                                <dd className="text-sm text-gray-800 font-medium capitalize">
                                    {result.mediaType}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Processing Time</dt>
                                <dd className="text-sm text-gray-800 font-medium">
                                    {result.processingTime}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                            onClick={handleAnalyzeAnother}
                            className="flex-1 w-full sm:w-auto"
                        >
                            Analyze Another File
                        </Button>
                        <Button
                            onClick={handleGoToDashboard}
                            variant="secondary"
                            className="flex-1 w-full sm:w-auto"
                        >
                            Go to Dashboard
                        </Button>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        This analysis was performed using advanced machine learning models trained on deepfake detection.
                    </p>
                </div>
            </div>
        </PageWrapper>
    );
}
