import React, { useState, useEffect } from 'react';
import SystemOverview from './SystemOverview';
import { dashboardService } from 'services/dashboardService';
import { Typography } from "@material-tailwind/react";
import { MdWarning } from "react-icons/md";

const SystemOverviewWrapper = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDemo, setIsDemo] = useState(false);    // Fetch dashboard data on component mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // Try to get specific system overview data first
                const systemResult = await dashboardService.getSystemOverview(); if (systemResult.success) {
                    setDashboardData(systemResult.data);
                    setIsDemo(false);
                    setError(null);
                    console.log('✅ System overview data from analytics API:', systemResult.data);
                } else {
                    // Fallback to general admin dashboard
                    console.log('⚠️ System overview API failed, trying admin dashboard...');
                    const fallbackResult = await dashboardService.getAdminDashboard(); if (fallbackResult.success) {
                        setDashboardData(fallbackResult.data);
                        setIsDemo(fallbackResult.isDemo || false);
                        setError(null);
                        console.log('✅ Using admin dashboard data as fallback:', fallbackResult.data);
                    } else {
                        setError(fallbackResult.error);
                        console.error('❌ Both APIs failed:', fallbackResult.error);
                    }
                }
            } catch (err) {
                setError('Failed to fetch dashboard data');
                console.error('Dashboard fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <Typography variant="h5" color="blue-gray" className="font-semibold">
                        Loading System Overview...
                    </Typography>
                    <Typography variant="small" color="gray" className="mt-2">
                        Please wait while we fetch system data
                    </Typography>
                </div>
            </div>
        );
    }

    // Error state
    if (error && !dashboardData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <MdWarning className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <Typography variant="h5" color="red" className="font-semibold">
                        Failed to Load System Overview
                    </Typography>
                    <Typography variant="small" color="gray" className="mt-2 mb-4">
                        {error}
                    </Typography>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Retry
                    </button>                </div>
            </div>
        );
    }

    // Render SystemOverview with API data
    return (
        <div className="p-4">
            <SystemOverview apiData={dashboardData} isDemo={isDemo} />
        </div>
    );
};

export default SystemOverviewWrapper;
