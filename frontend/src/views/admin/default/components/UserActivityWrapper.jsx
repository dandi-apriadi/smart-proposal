import React, { useState, useEffect } from 'react';
import UserActivity from './UserActivity';
import { dashboardService } from 'services/dashboardService';
import { Typography } from "@material-tailwind/react";
import { MdWarning } from "react-icons/md";

const UserActivityWrapper = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    // Fetch dashboard data on component mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // Try to get specific user activity metrics first
                const activityResult = await dashboardService.getUserActivityMetrics('monthly');

                if (activityResult.success) {
                    setDashboardData(activityResult.data);
                    setError(null);
                    console.log('✅ User activity metrics from analytics API');
                } else {
                    // Fallback to general admin dashboard
                    console.log('⚠️ User activity API failed, trying admin dashboard...');
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
                        Loading User Activity...
                    </Typography>
                    <Typography variant="small" color="gray" className="mt-2">
                        Please wait while we fetch activity data
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
                        Failed to Load User Activity
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

    // Render UserActivity with API data
    return (
        <div className="p-4">
            <UserActivity apiData={dashboardData} />
        </div>
    );
};

export default UserActivityWrapper;
