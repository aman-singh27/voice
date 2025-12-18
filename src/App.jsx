import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/system/ErrorBoundary';
import LoadingScreen from './components/ui/LoadingScreen';
import Navbar from './components/layout/Navbar';

// Lazy load routes
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Upload = lazy(() => import('./pages/Upload'));
const Result = lazy(() => import('./pages/Result'));
const History = lazy(() => import('./pages/History'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProductLanding = lazy(() => import('./pages/ProductLanding'));

export default function App() {
    return (
        <ErrorBoundary>
            <Router>
                <AuthProvider>
                    <ToastProvider>
                        <div className="min-h-screen bg-white">
                            <Suspense fallback={<LoadingScreen fullScreen />}>
                                <Routes>
                                    {/* Public routes */}
                                    <Route path="/" element={
                                        <>
                                            <Navbar />
                                            <Home />
                                        </>
                                    } />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signup" element={<Signup />} />
                                    <Route path="/product" element={
                                        <>
                                            <Navbar />
                                            <ProductLanding />
                                        </>
                                    } />

                                    {/* Protected routes */}
                                    <Route path="/upload" element={
                                        <ProtectedRoute>
                                            <Navbar />
                                            <Upload />
                                        </ProtectedRoute>
                                    } />

                                    <Route path="/result" element={
                                        <ProtectedRoute>
                                            <Navbar />
                                            <Result />
                                        </ProtectedRoute>
                                    } />

                                    <Route path="/history" element={
                                        <ProtectedRoute>
                                            <Navbar />
                                            <History />
                                        </ProtectedRoute>
                                    } />

                                    {/* Admin routes */}
                                    <Route path="/admin" element={
                                        <AdminRoute>
                                            <Navbar />
                                            <AdminDashboard />
                                        </AdminRoute>
                                    } />

                                    {/* 404 Not Found */}
                                    <Route path="/404" element={
                                        <>
                                            <Navbar />
                                            <NotFound />
                                        </>
                                    } />

                                    {/* Catch all - redirect to 404 */}
                                    <Route path="*" element={<Navigate to="/404" replace />} />
                                </Routes>
                            </Suspense>
                        </div>
                    </ToastProvider>
                </AuthProvider>
            </Router>
        </ErrorBoundary>
    );
}
