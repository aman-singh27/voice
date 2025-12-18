import { memo } from 'react';

const Container = memo(function Container({ children, className = '' }) {
    return (
        <div className={`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
});

export default Container;
