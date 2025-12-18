import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import {
    Shield,
    Check,
    ArrowRight,
    BarChart3,
    Lock
} from 'lucide-react';

export default function ProductLanding() {
    return (
        <PageWrapper>
            {/* Hero Section - Asymmetrical & Restrained */}
            <section className="relative pt-32 pb-40 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 -z-10" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-7 text-left">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-mono font-medium mb-6">
                                v2.0 Now Available
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight leading-[1.1] mb-8">
                                Verify media <br />
                                authenticity.
                            </h1>
                            <p className="text-xl text-gray-600 max-w-lg leading-relaxed mb-10 font-light">
                                Upload audio or video. Get a deterministic confidence score.
                                Decide with clarity.
                            </p>

                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                <Link
                                    to="/signup"
                                    className="px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center group"
                                >
                                    Start Analysis
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <div className="flex items-center gap-4 text-sm text-gray-500 py-4">
                                    <span className="flex items-center"><Check className="w-4 h-4 mr-2" /> MP4, MOV, MP3, WAV</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Abstract */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                                    <div className="text-sm font-medium text-gray-500">Analysis Result</div>
                                    <div className="text-xs font-mono text-gray-400">ID: 8F3-22A</div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-900 font-medium">Authenticity Score</span>
                                            <span className="text-red-600 font-mono">1.2% Real</span>
                                        </div>
                                        <div className="h-1 bg-gray-100 w-full rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 w-[98%]"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="p-4 bg-gray-50 rounded border border-gray-100">
                                            <div className="text-xs text-gray-500 mb-1">Artifacts</div>
                                            <div className="font-medium text-gray-900">Detected</div>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded border border-gray-100">
                                            <div className="text-xs text-gray-500 mb-1">Source</div>
                                            <div className="font-medium text-gray-900">Unknown</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Subtle Deco */}
                            <div className="absolute -z-10 top-4 -right-4 w-full h-full border border-gray-100 rounded-lg bg-gray-50"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rhythm Break - Minimal Trust */}
            <section className="border-y border-gray-100 py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <p className="max-w-md text-lg text-gray-500 font-light leading-relaxed">
                            Deepfakes compromise trust. VoiceGuard restores it with rigorous, frame-by-frame analysis.
                        </p>
                        <div className="flex gap-12 text-gray-400 grayscale opacity-60">
                            {/* Tech labels instead of logos for cleaner look */}
                            <span className="font-mono text-xs uppercase tracking-widest">TensorFlow</span>
                            <span className="font-mono text-xs uppercase tracking-widest">PyTorch</span>
                            <span className="font-mono text-xs uppercase tracking-widest">React</span>
                            <span className="font-mono text-xs uppercase tracking-widest">Firebase</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Editorial Feature List (De-AI-ified) */}
            <section className="py-32 bg-gray-50/50">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-16">System Capabilities</h2>

                    <div className="space-y-16">
                        <div className="group">
                            <div className="flex items-baseline gap-4 mb-4">
                                <span className="text-xs font-mono text-gray-400">01</span>
                                <h3 className="text-xl font-medium text-gray-900">Audio Spectrum Analysis</h3>
                            </div>
                            <p className="text-gray-600 pl-8 leading-relaxed max-w-lg">
                                Detects micro-tremors and frequency inconsistencies often introduced by synthesis engines.
                                Supports MP3, WAV, and AAC formats.
                            </p>
                            <div className="pl-8 mt-6">
                                <div className="h-px w-16 bg-gray-300 group-hover:w-32 transition-all duration-500"></div>
                            </div>
                        </div>

                        <div className="group">
                            <div className="flex items-baseline gap-4 mb-4">
                                <span className="text-xs font-mono text-gray-400">02</span>
                                <h3 className="text-xl font-medium text-gray-900">Frame-Level Video Inspection</h3>
                            </div>
                            <p className="text-gray-600 pl-8 leading-relaxed max-w-lg">
                                Analyzes lighting coherence, facial landmarks, and compression artifacts across individual video frames.
                                Works with MP4, MOV, and AVI containers.
                            </p>
                            <div className="pl-8 mt-6">
                                <div className="h-px w-16 bg-gray-300 group-hover:w-32 transition-all duration-500"></div>
                            </div>
                        </div>

                        <div className="group">
                            <div className="flex items-baseline gap-4 mb-4">
                                <span className="text-xs font-mono text-gray-400">03</span>
                                <h3 className="text-xl font-medium text-gray-900">Secure Processing Pipeline</h3>
                            </div>
                            <p className="text-gray-600 pl-8 leading-relaxed max-w-lg">
                                Files are processed in isolation. Data persists only as long as needed for analysis.
                                Your uploads are never used to train our models.
                            </p>
                            <div className="pl-8 mt-6">
                                <div className="h-px w-16 bg-gray-300 group-hover:w-32 transition-all duration-500"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Admin / Technical Insight */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-24">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Designed for Oversight</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                For organizations requiring audit trails, VoiceGuard provides a comprehensive dashboard.
                                Monitor upload volume, detection rates, and user activity in real-time.
                            </p>
                            <ul className="space-y-4 text-sm text-gray-600">
                                <li className="flex items-center">
                                    <BarChart3 className="w-4 h-4 mr-3 text-gray-400" />
                                    Global usage analytics
                                </li>
                                <li className="flex items-center">
                                    <Shield className="w-4 h-4 mr-3 text-gray-400" />
                                    Role-based access control
                                </li>
                                <li className="flex items-center">
                                    <Lock className="w-4 h-4 mr-3 text-gray-400" />
                                    Immutable audit logs
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 border border-gray-100 rounded-lg p-8">
                            <div className="font-mono text-xs text-gray-500 mb-6">/api/v1/detect</div>
                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex text-green-600">
                                    <span className="w-24 opacity-50">status</span>
                                    <span>200 OK</span>
                                </div>
                                <div className="flex text-gray-900">
                                    <span className="w-24 text-gray-500">confidence</span>
                                    <span>0.98</span>
                                </div>
                                <div className="flex text-gray-900">
                                    <span className="w-24 text-gray-500">label</span>
                                    <span>"fake"</span>
                                </div>
                                <div className="flex text-gray-900">
                                    <span className="w-24 text-gray-500">latency</span>
                                    <span>840ms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Production Ready Footer */}
            <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-1 md:col-span-1">
                            <Link to="/" className="flex items-center gap-2 mb-4">
                                <Shield className="w-6 h-6 text-gray-900" />
                                <span className="font-bold text-gray-900">VoiceGuard</span>
                            </Link>
                            <p className="text-sm text-gray-500 mb-4">
                                Deterministic deepfake detection for the digital age.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Product</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">API</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Docs</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Company</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Legal</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Security</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                        <div>
                            © 2025 VoiceGuard Inc. All rights reserved.
                        </div>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-gray-900">Twitter</a>
                            <a href="#" className="hover:text-gray-900">GitHub</a>
                            <a href="#" className="hover:text-gray-900">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </footer>
        </PageWrapper>
    );
}
