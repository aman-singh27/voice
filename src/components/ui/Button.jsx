import { memo, useMemo } from 'react';

const Button = memo(function Button({
    children,
    type = 'button',
    onClick,
    disabled = false,
    variant = 'primary',
    className = ''
}) {
    const baseStyles = 'w-full px-4 py-2.5 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed',
        secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed'
    };

    const buttonClassName = useMemo(
        () => `${baseStyles} ${variants[variant]} ${className}`,
        [variant, className]
    );

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClassName}
        >
            {children}
        </button>
    );
});

export default Button;
