import { memo } from 'react';
import Container from './Container';

const PageWrapper = memo(function PageWrapper({ children, className = '' }) {
    return (
        <div className={`py-4 sm:py-6 md:py-12 ${className}`}>
            <Container>
                {children}
            </Container>
        </div>
    );
});

export default PageWrapper;
