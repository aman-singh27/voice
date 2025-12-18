import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/ui/LoadingScreen';
import AccessDenied from '../components/ui/AccessDenied';

export default function ProtectedRoute({ children }) {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <LoadingScreen fullScreen message="Authenticating..." />;
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

    return children;
}
