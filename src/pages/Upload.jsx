import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { detectMedia } from '../utils/api';
import { saveDetectionResult } from '../utils/firestore';
import PageWrapper from '../components/layout/PageWrapper';
import FileDropzone from '../components/ui/FileDropzone';
import Button from '../components/ui/Button';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const ACCEPTED_TYPES = {
    'video/mp4': 'Video',
    'video/quicktime': 'Video',
    'video/x-msvideo': 'Video',
    'audio/mpeg': 'Audio',
    'audio/wav': 'Audio',
    'audio/aac': 'Audio'
};

export default function Upload() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const validateFile = (selectedFile) => {
        // Check filename length (prevent extremely long filenames)
        if (selectedFile.name.length > 255) {
            setError('Filename is too long. Please rename the file.');
            return false;
        }

        // Check file type
        if (!ACCEPTED_TYPES[selectedFile.type]) {
            setError('Unsupported file type. Please upload a video or audio file.');
            return false;
        }

        // Check file size
        if (selectedFile.size > MAX_FILE_SIZE) {
            setError('File size exceeds limit (100MB).');
            return false;
        }

        // Check minimum file size (prevent empty files)
        if (selectedFile.size === 0) {
            setError('File is empty. Please select a valid file.');
            return false;
        }

        return true;
    };

    const handleFileSelect = (selectedFile) => {
        setError('');

        if (validateFile(selectedFile)) {
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !currentUser) return;

        // Validate again before submission
        if (!validateFile(file)) {
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            const response = await detectMedia(file, currentUser.uid);

            const resultData = {
                label: response.label,
                confidence: response.confidence,
                mediaType: ACCEPTED_TYPES[file.type],
                processingTime: response.processingTime,
                fileName: file.name
            };

            // Save to Firestore (don't block navigation on failure)
            await saveDetectionResult(currentUser.uid, resultData);

            // Navigate to result page with response data
            navigate('/result', { state: resultData });
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const getMediaType = (fileType) => {
        return ACCEPTED_TYPES[fileType] || 'Unknown';
    };

    return (
        <PageWrapper>
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Upload Media for Analysis
                    </h1>
                    <p className="text-sm text-gray-500">
                        Upload a video or audio file to detect potential deepfakes.
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-8">
                    <form onSubmit={handleSubmit}>
                        {!file ? (
                            <FileDropzone onFileSelect={handleFileSelect} error={error} />
                        ) : (
                            <div className="space-y-6">
                                {/* Error Message */}
                                {error && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-sm text-red-600">{error}</p>
                                    </div>
                                )}

                                {/* File Preview Card */}
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    {getMediaType(file.type)}
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleRemoveFile}
                                            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                                            aria-label="Remove file"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={!file || isLoading}
                                    className="w-full"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg
                                                className="animate-spin h-4 w-4 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Analyzing...
                                        </span>
                                    ) : (
                                        'Analyze Media'
                                    )}
                                </Button>
                            </div>
                        )}
                    </form>
                </div>

                {/* Info Section */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Your file will be analyzed using advanced machine learning models to detect potential deepfake manipulation.
                    </p>
                </div>
            </div>
        </PageWrapper>
    );
}
