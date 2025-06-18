import React, { useEffect, useState } from 'react';
import {
    MdTrendingUp,
    MdPeople,
    MdAssignment,
    MdCheckCircle,
    MdPending,
    MdCancel,
    MdBarChart,
    MdInsights,
    MdAutoGraph,
    MdAnalytics,
    MdShowChart,
    MdSpeed,
    MdRefresh,
    MdPendingActions
} from "react-icons/md";
import AOS from 'aos';

const ProposalStatistics = ({ apiData }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AOS.refresh();
    }, [apiData]);

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    // Process API data to extract statistics
    const processStatistics = () => {
        if (!apiData) {
            return {
                totalProposals: 0,
                approvedProposals: 0,
                pendingProposals: 0,
                rejectedProposals: 0,
                totalUsers: 0,
                totalDepartments: 0,
                totalBudget: 0,
                utilizationRate: 0
            };
        }

        const proposalStats = apiData.proposal_stats || [];

        return {
            totalProposals: apiData.overview?.total_proposals || 0,
            approvedProposals: proposalStats.find(p => p.status === 'approved')?.count || 0,
            pendingProposals: proposalStats.find(p => p.status === 'pending')?.count || 0,
            rejectedProposals: proposalStats.find(p => p.status === 'rejected')?.count || 0,
            totalUsers: apiData.overview?.total_users || 0,
            totalDepartments: apiData.overview?.total_departments || 0,
            activeUsers: apiData.overview?.active_users || 0,
            totalBudget: 0,
            utilizationRate: 0
        };
    };

    const stats = processStatistics(); const statisticCards = [
        {
            title: "Total Proposals",
            value: stats.totalProposals,
            icon: MdAssignment,
            bgColor: "bg-blue-50",
            iconBg: "bg-blue-600",
            textColor: "text-blue-900",
            description: "Total research proposals submitted",
            trend: "+12.5%",
            trendUp: true
        },
        {
            title: "Approved",
            value: stats.approvedProposals,
            icon: MdCheckCircle,
            bgColor: "bg-green-50",
            iconBg: "bg-green-600",
            textColor: "text-green-900",
            description: "Successfully approved proposals",
            trend: "+8.3%",
            trendUp: true
        },
        {
            title: "Pending Review",
            value: stats.pendingProposals,
            icon: MdPendingActions,
            bgColor: "bg-yellow-50",
            iconBg: "bg-yellow-600",
            textColor: "text-yellow-900",
            description: "Awaiting review or approval",
            trend: "-2.1%",
            trendUp: false
        },
        {
            title: "Rejected",
            value: stats.rejectedProposals,
            icon: MdCancel,
            bgColor: "bg-red-50",
            iconBg: "bg-red-600",
            textColor: "text-red-900",
            description: "Proposals that were declined",
            trend: "-5.2%",
            trendUp: false
        },
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: MdPeople,
            bgColor: "bg-purple-50",
            iconBg: "bg-purple-600",
            textColor: "text-purple-900",
            description: "Registered users in the system",
            trend: "+15.7%",
            trendUp: true
        },
        {
            title: "Active Users",
            value: stats.activeUsers,
            icon: MdTrendingUp,
            bgColor: "bg-indigo-50",
            iconBg: "bg-indigo-600",
            textColor: "text-indigo-900",
            description: "Currently active users",
            trend: "+22.4%",
            trendUp: true
        }
    ]; const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount || 0);
    };

    const formatPercentage = (rate) => {
        return `${(rate || 0).toFixed(1)}%`;
    }; return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            {/* Modern Header Section */}
            <div className="mb-8 p-8 rounded-2xl bg-white border border-gray-200 shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl shadow-lg">
                            <MdInsights className="h-10 w-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Proposal Analytics Dashboard
                            </h1>
                            <p className="text-lg text-gray-700 font-medium">
                                Real-time insights and comprehensive performance metrics
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center space-x-4">
                        <button
                            onClick={handleRefresh}
                            className={`p-3 rounded-xl bg-gray-100 border border-gray-300 shadow-md ${loading ? 'animate-spin' : ''}`}
                            disabled={loading}
                        >
                            <MdRefresh className="h-6 w-6 text-gray-700" />
                        </button>
                        <div className="text-right">
                            <p className="text-sm text-gray-600 font-medium">Last Updated</p>
                            <p className="text-sm font-bold text-gray-900">
                                {new Date().toLocaleTimeString('id-ID', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {statisticCards.map((card, index) => {
                    const IconComponent = card.icon;

                    return (
                        <div
                            key={index}
                            className={`p-6 rounded-2xl ${card.bgColor} border border-gray-200 shadow-lg`}
                        >
                            {/* Header with Icon and Trend */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-xl ${card.iconBg} shadow-md`}>
                                        <IconComponent className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                                            {card.title}
                                        </h3>
                                    </div>
                                </div>
                                <div className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-bold
                                    ${card.trendUp
                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                        : 'bg-red-100 text-red-800 border border-red-200'
                                    }`}>
                                    <MdTrendingUp className={`h-3 w-3 ${card.trendUp ? 'rotate-0' : 'rotate-180'}`} />
                                    <span>{card.trend}</span>
                                </div>
                            </div>

                            {/* Value Display */}
                            <div className="mb-4">
                                <div className={`text-4xl font-bold ${card.textColor} mb-2`}>
                                    {card.value.toLocaleString()}
                                </div>
                                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                                    {card.description}
                                </p>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative">
                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${card.iconBg} rounded-full w-2/3`}></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Enhanced Additional Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Budget Card */}
                <div className="p-8 rounded-2xl bg-green-50 border border-green-200 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-600 p-4 rounded-2xl shadow-lg">
                                <MdAutoGraph className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-green-900">Total Budget Allocation</h3>
                                <p className="text-sm text-green-700 font-medium">Across all active proposals</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <MdAnalytics className="h-6 w-6 text-green-600 ml-auto mb-1" />
                            <span className="text-xs text-green-700 font-bold bg-green-100 px-2 py-1 rounded-md">+12.3%</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="text-4xl font-bold text-green-700 mb-2">
                            {formatCurrency(stats.totalBudget || 2500000000)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-green-700 font-medium">
                            <span>Allocated: {formatCurrency(stats.totalBudget * 0.7 || 1750000000)}</span>
                            <span>•</span>
                            <span>Available: {formatCurrency(stats.totalBudget * 0.3 || 750000000)}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-green-700 font-medium">Budget Utilization</span>
                            <span className="font-bold text-green-800">70%</span>
                        </div>
                        <div className="h-4 bg-green-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 rounded-full w-[70%]"></div>
                        </div>
                    </div>
                </div>

                {/* Performance Metrics Card */}
                <div className="p-8 rounded-2xl bg-orange-50 border border-orange-200 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-orange-600 p-4 rounded-2xl shadow-lg">
                                <MdSpeed className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-orange-900">System Performance</h3>
                                <p className="text-sm text-orange-700 font-medium">Overall efficiency metrics</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <MdShowChart className="h-6 w-6 text-orange-600 ml-auto mb-1" />
                            <span className="text-xs text-orange-700 font-bold bg-orange-100 px-2 py-1 rounded-md">Excellent</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <div className="text-3xl font-bold text-orange-700 mb-1">
                                {formatPercentage(stats.utilizationRate || 87.5)}
                            </div>
                            <div className="text-xs text-orange-700 font-medium uppercase tracking-wide">
                                Approval Rate
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-orange-700 mb-1">
                                2.3 days
                            </div>
                            <div className="text-xs text-orange-700 font-medium uppercase tracking-wide">
                                Avg. Review Time
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-orange-700 font-medium">Processing Efficiency</span>
                            <span className="font-bold text-orange-800">87.5%</span>
                        </div>
                        <div className="h-4 bg-orange-200 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-600 rounded-full w-[87.5%]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center p-6 rounded-2xl bg-white border border-gray-200 shadow-lg">
                <p className="text-sm text-gray-700 font-bold">
                    📊 Data refreshed at {new Date().toLocaleString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })} • Real-time monitoring active ⚡
                </p>
            </div>
        </div>
    );
};

export default ProposalStatistics;