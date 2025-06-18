import React, { useState, useEffect } from 'react';
import ActiveSession from './ActiveSession';
import { dashboardService } from 'services/dashboardService';
import { Typography } from "@material-tailwind/react";
import { MdWarning } from "react-icons/md";

const ActiveSessionWrapper = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    // Fetch dashboard data on component mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // Try to get specific active session status first
                const sessionResult = await dashboardService.getActiveSessionStatus();

                if (sessionResult.success) {
                    setDashboardData(sessionResult.data);
                    setError(null);
                    console.log('✅ Active session status from analytics API');
                } else {
                    // Fallback to general admin dashboard
                    console.log('⚠️ Active session API failed, trying admin dashboard...');
                    const fallbackResult = await dashboardService.getAdminDashboard();

                    if (fallbackResult.success) {
                        setDashboardData(fallbackResult.data);
                        setError(null);
                        console.log('✅ Using admin dashboard data as fallback');
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
                        Loading Active Session...
                    </Typography>
                    <Typography variant="small" color="gray" className="mt-2">
                        Please wait while we fetch session data
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
                        Failed to Load Active Session
                    </Typography>
                    <Typography variant="small" color="gray" className="mt-2 mb-4">
                        {error}
                    </Typography>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Render ActiveSession with API data
    return (
        <div className="p-4">
            <ActiveSession apiData={dashboardData} />
        </div>
    );
};

export default ActiveSessionWrapper;
