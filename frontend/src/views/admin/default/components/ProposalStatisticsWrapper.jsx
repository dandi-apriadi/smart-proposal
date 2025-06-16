import React, { useState, useEffect } from 'react';
import ProposalStatistics from './ProposalStatistics';
import { dashboardService } from 'services/dashboardService';
import { Typography } from "@material-tailwind/react";
import { MdWarning } from "react-icons/md";

const ProposalStatisticsWrapper = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch dashboard data on component mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const result = await dashboardService.getAdminDashboard();

                if (result.success) {
                    setDashboardData(result.data);
                    setError(null);
                } else {
                    setError(result.error);
                    console.error('Dashboard API Error:', result.error);
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
                        Loading Proposal Statistics...
                    </Typography>
                    <Typography variant="small" color="gray" className="mt-2">
                        Please wait while we fetch statistics data
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
                        Failed to Load Proposal Statistics
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

    // Render ProposalStatistics with API data
    return (
        <div className="p-4">
            <ProposalStatistics apiData={dashboardData} />
        </div>
    );
};

export default ProposalStatisticsWrapper;
