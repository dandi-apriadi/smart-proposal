import React, { useState, useEffect } from 'react';
import ProposalStatistics from './ProposalStatistics';
import { dashboardService } from 'services/dashboardService';
import { Typography } from "@material-tailwind/react";
import { MdWarning } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProposalStatisticsWrapper = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize AOS on component mount
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }, []);    // Fetch dashboard data on component mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // Try to get specific proposal statistics first
                const statsResult = await dashboardService.getProposalStatistics();

                if (statsResult.success) {
                    setDashboardData(statsResult.data);
                    setError(null);
                    console.log('✅ Proposal statistics from analytics API');
                } else {
                    // Fallback to general admin dashboard
                    console.log('⚠️ Proposal statistics API failed, trying admin dashboard...');
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
    }, []);// Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md w-full" data-aos="fade-up">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-blue-500 mx-auto mb-6"></div>
                    <Typography variant="h5" className="font-bold text-gray-800 mb-3">
                        Loading Proposal Statistics...
                    </Typography>
                    <Typography variant="small" className="text-gray-600 leading-relaxed">
                        Please wait while we fetch the latest statistics data
                    </Typography>
                </div>
            </div>
        );
    }    // Error state
    if (error && !dashboardData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-6">
                <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md w-full" data-aos="fade-up" data-aos-delay="200">
                    <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                        <MdWarning className="h-12 w-12 text-red-500" />
                    </div>
                    <Typography variant="h5" className="font-bold text-red-600 mb-3">
                        Failed to Load Statistics
                    </Typography>
                    <Typography variant="small" className="text-gray-600 mb-6 leading-relaxed">
                        {error}
                    </Typography>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                        data-aos="zoom-in"
                        data-aos-delay="400"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }    // Render ProposalStatistics with API data
    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
            <div data-aos="fade-up" data-aos-duration="1000">
                <ProposalStatistics apiData={dashboardData} />
            </div>
        </div>
    );
};

export default ProposalStatisticsWrapper;
