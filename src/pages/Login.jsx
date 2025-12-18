import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // 1. Perform Login
            const user = await login(formData.email, formData.password);

            // 2. Check Role directly from Firestore to decide where to go
            // We do this here to avoid waiting for AuthContext to update and causing a redirect flicker
            // Dynamic import to avoid circular dependencies or heavy load if not needed elsewhere? 
            // Better to just import at top, checking imports below... we need to add imports.

            // Assuming we will add imports at the top, here is the logic:
            const { doc, getDoc } = await import('firebase/firestore');
            const { db } = await import('../lib/firebase');

            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const role = userDoc.exists() ? userDoc.data().role : 'user';

            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/upload');
            }

        } catch (error) {
            console.error(error);
            let errorMessage = 'Failed to sign in';

            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address';
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative">
            <Link to="/" className="absolute top-8 left-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
            </Link>
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Sign in to your account
                    </h1>
                    <p className="text-sm text-gray-600">
                        Access your dashboard and upload media for analysis.
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg px-6 py-8">
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <Button type="submit" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Demo Login Section */}
                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <p className="text-xs text-center text-gray-500 mb-4 font-medium uppercase tracking-wider">
                            Demo Accounts (For Testing)
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => {
                                    setFormData({
                                        email: 'test@voice.com',
                                        password: 'test@voice'
                                    });
                                }}
                            >
                                Demo User
                            </Button>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => {
                                    setFormData({
                                        email: 'admin@voice.com',
                                        password: 'admin@voice'
                                    });
                                }}
                            >
                                Demo Admin
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-gray-900 hover:text-gray-700">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

