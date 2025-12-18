import { memo } from 'react';

const Toast = memo(function Toast({ message, type = 'success', onClose }) {
    return (
        <div
            className={`
                min-w-[320px] max-w-md rounded-md shadow-lg pointer-events-auto
                animate-toast-in
                ${type === 'success' ? 'bg-gray-900 text-white' : 'bg-red-600 text-white'}
            `}
        >
            <div className="p-4 flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0">
                    {type === 'success' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </div>

                {/* Message */}
                <div className="flex-1 pt-0.5">
                    <p className="text-sm font-medium">{message}</p>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Close notification"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
});

export default Toast;
