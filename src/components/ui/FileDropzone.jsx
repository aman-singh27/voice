import { useState } from 'react';

export default function FileDropzone({ onFileSelect, error }) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            onFileSelect(files[0]);
        }
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onFileSelect(files[0]);
        }
    };

    return (
        <div>
            <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-6 sm:p-8 md:p-12 text-center transition-colors ${isDragging
                    ? 'border-gray-400 bg-gray-50'
                    : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                    }`}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileInput}
                    accept="video/mp4,video/quicktime,video/x-msvideo,audio/mpeg,audio/wav,audio/aac"
                />

                <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                        <svg
                            className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-3 sm:mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>

                        <p className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                            Drag & drop your file here
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">or click to browse</p>

                        <div className="mt-3 sm:mt-4 text-xs text-gray-500">
                            Supported: MP4, MOV, AVI, MP3, WAV, AAC (max 100MB)
                        </div>
                    </div>
                </label>
            </div>

            {error && (
                <p className="mt-3 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
