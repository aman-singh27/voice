import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Container from './Container';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const { currentUser, userRole, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            setMobileMenuOpen(false);
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <Container>
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                            onClick={closeMobileMenu}
                        >
                            VoiceGuard
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2">
                        {currentUser ? (
                            <>
                                <Link
                                    to="/upload"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-50"
                                >
                                    Upload
                                </Link>
                                <Link
                                    to="/history"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-50"
                                >
                                    History
                                </Link>

                                {/* Admin Dashboard Link */}
                                {(userRole === 'admin' || (userRole && userRole.trim() === 'admin')) && (
                                    <Link
                                        to="/admin"
                                        className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors rounded-md hover:bg-indigo-50"
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-50"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-50"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col space-y-2">
                            {currentUser ? (
                                <>
                                    <Link
                                        to="/upload"
                                        onClick={closeMobileMenu}
                                        className="px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        Upload
                                    </Link>
                                    <Link
                                        to="/history"
                                        onClick={closeMobileMenu}
                                        className="px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        History
                                    </Link>

                                    {/* Admin Dashboard Link */}
                                    {(userRole === 'admin' || (userRole && userRole.trim() === 'admin')) && (
                                        <Link
                                            to="/admin"
                                            onClick={closeMobileMenu}
                                            className="px-4 py-3 text-base font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition-colors"
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-3 text-left text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={closeMobileMenu}
                                    className="px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </Container>
        </nav>
    );
}
