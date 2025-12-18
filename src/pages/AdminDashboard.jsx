import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import PageWrapper from '../components/layout/PageWrapper';
import StatsChart from '../components/ui/StatsChart';

export default function AdminDashboard() {
    const [uploads, setUploads] = useState([]);
    const [filteredUploads, setFilteredUploads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterLabel, setFilterLabel] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { currentUser, userRole } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Normalize role check for consistency
        const normalizedRole = userRole ? userRole.trim().toLowerCase() : '';

        if (!currentUser || normalizedRole !== 'admin') {
            navigate('/upload');
            return;
        }

        const q = query(
            collection(db, 'uploads'),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allUploads = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUploads(allUploads);
            setLoading(false);
        }, (error) => {
            console.error('Error fetching uploads:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser, userRole, navigate]);

    useEffect(() => {
        let filtered = uploads;

        // Filter by label
        if (filterLabel !== 'All') {
            filtered = filtered.filter(upload => upload.label === filterLabel);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(upload =>
                upload.fileName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredUploads(filtered);
    }, [uploads, filterLabel, searchQuery]);

    // Analytics calculations
    const analytics = useMemo(() => {
        if (uploads.length === 0) {
            return {
                dailyActivity: [],
                fakePercentage: 0,
                trend: 0
            };
        }

        // Group uploads by date (last 7 days)
        const now = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(now);
            date.setDate(date.getDate() - (6 - i));
            date.setHours(0, 0, 0, 0);
            return date;
        });

        const dailyActivity = last7Days.map(date => {
            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);

            const count = uploads.filter(upload => {
                if (!upload.createdAt) return false;
                const uploadDate = upload.createdAt.toDate();
                return uploadDate >= date && uploadDate < nextDate;
            }).length;

            return {
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                value: count
            };
        });

        // Calculate fake percentage
        const fakeCount = uploads.filter(u => u.label === 'Fake').length;
        const fakePercentage = ((fakeCount / uploads.length) * 100).toFixed(1);

        // Calculate 7-day trend
        const last7DaysCount = uploads.filter(upload => {
            if (!upload.createdAt) return false;
            const uploadDate = upload.createdAt.toDate();
            const sevenDaysAgo = new Date(now);
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return uploadDate >= sevenDaysAgo;
        }).length;

        const previous7DaysCount = uploads.filter(upload => {
            if (!upload.createdAt) return false;
            const uploadDate = upload.createdAt.toDate();
            const fourteenDaysAgo = new Date(now);
            fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
            const sevenDaysAgo = new Date(now);
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return uploadDate >= fourteenDaysAgo && uploadDate < sevenDaysAgo;
        }).length;

        const trend = previous7DaysCount > 0
            ? (((last7DaysCount - previous7DaysCount) / previous7DaysCount) * 100).toFixed(1)
            : 0;

        return {
            dailyActivity,
            fakePercentage,
            trend: Number(trend)
        };
    }, [uploads]);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatConfidence = (confidence) => {
        return `${Math.round(confidence * 100)}%`;
    };

    const totalUploads = uploads.length;
    const fakeCount = uploads.filter(u => u.label === 'Fake').length;
    const realCount = uploads.filter(u => u.label === 'Real').length;

    // Trend indicator component
    const TrendIndicator = ({ value }) => {
        if (value > 0) {
            return (
                <div className="flex items-center gap-1 text-green-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span className="text-sm font-medium">+{value}%</span>
                </div>
            );
        } else if (value < 0) {
            return (
                <div className="flex items-center gap-1 text-red-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <span className="text-sm font-medium">{value}%</span>
                </div>
            );
        } else {
            return (
                <div className="flex items-center gap-1 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                    <span className="text-sm font-medium">0%</span>
                </div>
            );
        }
    };

    if (loading) {
        return (
            <PageWrapper>
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-sm text-gray-500">
                            Monitor all uploads and detection results across the platform.
                        </p>
                    </div>

                    {/* Loading Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </PageWrapper>
        );
    }

    // Empty state when no uploads exist
    if (uploads.length === 0) {
        return (
            <PageWrapper>
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-sm text-gray-500">
                            Monitor all uploads and detection results across the platform.
                        </p>
                    </div>

                    {/* Empty State */}
                    <div className="bg-white border border-gray-200 rounded-lg p-16 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400 mb-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No system activity yet
                        </h3>
                        <p className="text-sm text-gray-500 max-w-sm mx-auto">
                            Uploads will appear here as users analyze media.
                        </p>
                    </div>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-sm text-gray-500">
                        Monitor all uploads and detection results across the platform.
                    </p>
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Uploads */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <p className="text-sm font-medium text-gray-500 mb-2">
                            Total Uploads
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                            {totalUploads}
                        </p>
                    </div>

                    {/* Fake Media Detected */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <p className="text-sm font-medium text-gray-500 mb-2">
                            Fake Media Detected
                        </p>
                        <p className="text-3xl font-bold text-red-600">
                            {fakeCount}
                        </p>
                    </div>

                    {/* Real Media Detected */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <p className="text-sm font-medium text-gray-500 mb-2">
                            Real Media Detected
                        </p>
                        <p className="text-3xl font-bold text-green-600">
                            {realCount}
                        </p>
                    </div>
                </div>

                {/* Analytics Overview */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                        Analytics Overview
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Key insights from recent activity
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Daily Upload Activity */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">
                                        Daily Upload Activity
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {analytics.dailyActivity.reduce((sum, d) => sum + d.value, 0)} uploads
                                    </p>
                                </div>
                                <TrendIndicator value={analytics.trend} />
                            </div>
                            <p className="text-xs text-gray-500 mb-2">Last 7 days</p>
                            <StatsChart data={analytics.dailyActivity} color="#374151" />
                        </div>

                        {/* Fake Media Frequency */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">
                                        Fake Media Frequency
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {analytics.fakePercentage}%
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                    <span className="text-sm font-medium">{fakeCount} of {totalUploads}</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">Percentage marked as fake</p>
                            <StatsChart
                                data={analytics.dailyActivity.map(d => ({
                                    ...d,
                                    value: uploads.filter(u => {
                                        if (!u.createdAt) return false;
                                        const uploadDate = u.createdAt.toDate();
                                        const dateStr = uploadDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                        return dateStr === d.date && u.label === 'Fake';
                                    }).length
                                }))}
                                color="#dc2626"
                            />
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Label Filter */}
                        <div className="flex-1">
                            <label htmlFor="filter-label" className="block text-sm font-medium text-gray-700 mb-1">
                                Filter by Result
                            </label>
                            <select
                                id="filter-label"
                                value={filterLabel}
                                onChange={(e) => setFilterLabel(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400"
                            >
                                <option value="All">All</option>
                                <option value="Real">Real</option>
                                <option value="Fake">Fake</option>
                            </select>
                        </div>

                        {/* Search */}
                        <div className="flex-1">
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                                Search by File Name
                            </label>
                            <input
                                type="text"
                                id="search"
                                placeholder="Search files..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Upload Table */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {filteredUploads.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-gray-500">No uploads found matching your filters.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            File Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Result
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Confidence
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Processing
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredUploads.map((upload, index) => (
                                        <tr
                                            key={upload.id}
                                            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600 font-mono truncate max-w-xs">
                                                    {upload.userId.substring(0, 8)}...
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                                    {upload.fileName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${upload.label === 'Fake'
                                                        ? 'bg-red-100 text-red-700 border-red-200'
                                                        : 'bg-green-100 text-green-700 border-green-200'
                                                        }`}
                                                >
                                                    {upload.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {formatConfidence(upload.confidence)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                                                {upload.mediaType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {formatDate(upload.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {upload.processingTime}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Showing {filteredUploads.length} of {totalUploads} {totalUploads === 1 ? 'upload' : 'uploads'}
                    </p>
                </div>
            </div>
        </PageWrapper>
    );
}
