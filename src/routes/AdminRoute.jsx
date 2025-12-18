import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/ui/LoadingScreen';
import AccessDenied from '../components/ui/AccessDenied';

export default function AdminRoute({ children }) {
    const { currentUser, userRole, loading } = useAuth();

    if (loading) {
        return <LoadingScreen fullScreen message="Verifying access..." />;
    }

    if (!currentUser) {
        return (
            <AccessDenied
                title="Authentication Required"
                message="Please log in to access this page."
                actionText="Go to Login"
                actionPath="/login"
            />
        );
    }

    // Check role safely (handle potential whitespace or casing)
    const normalizedRole = userRole ? userRole.trim().toLowerCase() : '';

    if (normalizedRole !== 'admin') {
        return (
            <AccessDenied
                title="Admin Access Required"
                message={`You do not have permission to access this section. (Role: ${userRole})`}
                actionText="Go to Upload"
                actionPath="/upload"
            />
        );
    }

    return children;
}
