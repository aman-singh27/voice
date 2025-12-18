import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import {
    Database,
    Server,
    Layout,
    Shield,
    Code,
    GitBranch,
    Terminal,
    Cpu,
    CheckCircle2,
    ArrowRight,
    Play,
    BarChart3
} from 'lucide-react';

export default function Home() {
    return (
        <PageWrapper>
            {/* Project Header / Hero */}
            <section className="pt-24 pb-20 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-medium mb-6 border border-blue-100">
                        <Code className="w-3 h-3 mr-2" />
                        VOICE GUARDPROJECT SUBMISSION 2025
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        VoiceGuard: End-to-End <br className="hidden sm:inline" />Deepfake Detection System
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        A full-stack application demonstrating secure file handling, real-time AI inference integration, and role-based access control.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-gray-600">
                        <span className="flex items-center px-4 py-2 bg-gray-50 rounded border border-gray-200">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            React (Vite)
                        </span>
                        <span className="flex items-center px-4 py-2 bg-gray-50 rounded border border-gray-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Node.js / Express
                        </span>
                        <span className="flex items-center px-4 py-2 bg-gray-50 rounded border border-gray-200">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            Firebase Auth & Firestore
                        </span>
                        <span className="flex items-center px-4 py-2 bg-gray-50 rounded border border-gray-200">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                            Python (ML Integration)
                        </span>
                    </div>

                    <div className="mt-12">
                        <Link
                            to="/product"
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            View Product Landing Page
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Evaluator Guide - "How to Test" */}
            <section className="py-20 bg-blue-50/30">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white p-8 rounded-xl border border-blue-100 shadow-sm">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <Terminal className="w-6 h-6 mr-3 text-blue-600" />
                                Evaluation & Testing Guide
                            </h2>
                            <p className="text-gray-600 mb-6">
                                To verify the system's functionality (Authentication, Upload Pipeline, and Result Generation), please follow this flow:
                            </p>
                            <ol className="list-decimal list-inside space-y-3 text-gray-700 font-medium">
                                <li className="pl-2">Create a new account or log in as a demo user.</li>
                                <li className="pl-2">Navigate to the <strong>Upload</strong> dashboard.</li>
                                <li className="pl-2">Upload a sample <strong>.mp3</strong> or <strong>.wav</strong> file.</li>
                                <li className="pl-2">View the generated analysis report.</li>
                            </ol>
                        </div>
                        <div className="flex-shrink-0">
                            <Link
                                to="/login"
                                className="flex items-center justify-center w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md"
                            >
                                <Play className="w-5 h-5 mr-2 fill-current" />
                                Launch Demo
                            </Link>
                            <p className="mt-3 text-xs text-center text-gray-500">
                                No personal email required.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architecture / Technical Implementation */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">System Architecture</h2>
                        <p className="text-gray-600 max-w-2xl">
                            The application follows a decoupled client-server architecture to ensure scalability and security.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Frontend */}
                        <div className="relative p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                            <div className="absolute top-0 left-6 -translate-y-1/2 bg-white px-2">
                                <Layout className="w-8 h-8 text-blue-600 p-1" />
                            </div>
                            <h3 className="mt-4 font-bold text-gray-900 mb-2">Frontend Client</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                React + Vite SPA. Handles UI state, client-side validation, and Firebase Auth tokens.
                            </p>
                            <ul className="text-xs space-y-2 text-gray-500 font-mono">
                                <li>• React Router v6</li>
                                <li>• Tailwind CSS</li>
                                <li>• Lucide Icons</li>
                            </ul>
                        </div>

                        {/* API Layer */}
                        <div className="relative p-6 bg-white rounded-xl border border-gray-200 hover:border-green-300 transition-colors">
                            <div className="absolute top-0 left-6 -translate-y-1/2 bg-white px-2">
                                <Server className="w-8 h-8 text-green-600 p-1" />
                            </div>
                            <h3 className="mt-4 font-bold text-gray-900 mb-2">REST API</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Node.js/Express server. Validates requests and orchestrates file processing.
                            </p>
                            <ul className="text-xs space-y-2 text-gray-500 font-mono">
                                <li>• Express.js</li>
                                <li>• Multer Middleware</li>
                                <li>• Cors / Helmet</li>
                            </ul>
                        </div>

                        {/* AI Engine */}
                        <div className="relative p-6 bg-white rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
                            <div className="absolute top-0 left-6 -translate-y-1/2 bg-white px-2">
                                <Cpu className="w-8 h-8 text-purple-600 p-1" />
                            </div>
                            <h3 className="mt-4 font-bold text-gray-900 mb-2">Inference Engine</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Python services running PyTorch models for deepfake classification (Mocked for demo).
                            </p>
                            <ul className="text-xs space-y-2 text-gray-500 font-mono">
                                <li>• PyTorch / TensorFlow</li>
                                <li>• Librosa (Audio)</li>
                                <li>• OpenCV (Video)</li>
                            </ul>
                        </div>

                        {/* Database */}
                        <div className="relative p-6 bg-white rounded-xl border border-gray-200 hover:border-yellow-300 transition-colors">
                            <div className="absolute top-0 left-6 -translate-y-1/2 bg-white px-2">
                                <Database className="w-8 h-8 text-yellow-600 p-1" />
                            </div>
                            <h3 className="mt-4 font-bold text-gray-900 mb-2">Data Persistence</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Cloud-native NoSQL database for flexible user profiles and history logs.
                            </p>
                            <ul className="text-xs space-y-2 text-gray-500 font-mono">
                                <li>• Cloud Firestore</li>
                                <li>• Security Rules</li>
                                <li>• Real-time listeners</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Task + Extra Features Showcase */}
            <section className="py-24 bg-gray-50/80 border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Project Implementation</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Core deliverable plus production-grade enhancements for security, scalability, and user experience.
                        </p>
                    </div>

                    {/* Main Task - Task 6 */}
                    <div className="mb-12">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border-2 border-blue-200 shadow-md">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                                    ✓
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        TASK 6: End-to-End Mini Detection System
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        <strong>Main Deliverable:</strong> Upload media → API processes → results shown on UI
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <div className="flex items-start text-sm text-gray-700">
                                            <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Frontend upload interface with drag-and-drop</span>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-700">
                                            <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Express API with Multer file handling</span>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-700">
                                            <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Mock ML model integration (simulated inference)</span>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-700">
                                            <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Result visualization with confidence scores</span>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-700">
                                            <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Firestore integration for upload history</span>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-700">
                                            <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>Firebase Auth with protected routes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Extra Tasks Completed */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mr-3">Bonus</span>
                            Additional Production Features
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Security Hardening */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center mb-3">
                                <Shield className="w-5 h-5 mr-2 text-red-500" />
                                <h4 className="font-bold text-gray-900">Security Hardening</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Rate limiting (20 req/15min per IP)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Helmet security headers (XSS, clickjacking protection)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>File type & size validation</span>
                                </li>
                            </ul>
                        </div>

                        {/* Responsive Design */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center mb-3">
                                <Layout className="w-5 h-5 mr-2 text-purple-500" />
                                <h4 className="font-bold text-gray-900">Responsive Design</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Mobile-first layout (320px → 1440px+)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Hamburger menu for mobile navigation</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Touch-friendly UI (44px+ targets)</span>
                                </li>
                            </ul>
                        </div>

                        {/* Dashboard & Analytics */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center mb-3">
                                <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
                                <h4 className="font-bold text-gray-900">Admin Dashboard</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Real-time analytics & trends</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Role-based access control (RBAC)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Upload history with filtering</span>
                                </li>
                            </ul>
                        </div>

                        {/* Premium Landing Page */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center mb-3">
                                <Code className="w-5 h-5 mr-2 text-indigo-500" />
                                <h4 className="font-bold text-gray-900">Product Landing</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Professional marketing page</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Feature showcase & use cases</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Clean, modern design aesthetic</span>
                                </li>
                            </ul>
                        </div>

                        {/* Authentication System */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center mb-3">
                                <Shield className="w-5 h-5 mr-2 text-green-500" />
                                <h4 className="font-bold text-gray-900">Auth System</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Firebase Authentication integration</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Protected routes & HOC guards</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Demo accounts for testing</span>
                                </li>
                            </ul>
                        </div>

                        {/* Code Quality */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center mb-3">
                                <GitBranch className="w-5 h-5 mr-2 text-orange-500" />
                                <h4 className="font-bold text-gray-900">Code Quality</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Clean component architecture</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Error handling & validation</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Production-ready middleware</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer - Academic/Project Focus */}
            <footer className="py-12 border-t border-gray-200 bg-white text-center">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-gray-500 text-sm mb-2">Project Submission for VoiceGuard</p>
                    <p className="text-gray-400 text-xs">Developed by Aman Singh • 2025</p>
                </div>
            </footer>
        </PageWrapper>
    );
}
