import React, { useState, useEffect } from "react";
import Card from "components/card";
import { MdBarChart, MdArrowUpward, MdArrowDownward, MdFileCopy, MdCheckCircle, MdCancel, MdHourglassEmpty } from "react-icons/md";
import {
    PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Dummy statistics data
const dummyStatistics = {
    totalProposals: 148,
    previousTotalProposals: 132,
    approvalRate: 72.5,
    previousApprovalRate: 68.3,
    avgReviewTime: 3.2,
    previousAvgReviewTime: 4.1,
    mlAccuracy: 89.6,
    previousMlAccuracy: 85.2,
    statusDistribution: [
        { status: "Approved", count: 92 },
        { status: "Rejected", count: 35 },
        { status: "Under Review", count: 15 },
        { status: "Pending", count: 6 }
    ],
    monthlyTrend: [
        { month: "Jan", submissions: 15, approvals: 11 },
        { month: "Feb", submissions: 18, approvals: 14 },
        { month: "Mar", submissions: 22, approvals: 16 },
        { month: "Apr", submissions: 28, approvals: 19 },
        { month: "May", submissions: 25, approvals: 18 },
        { month: "Jun", submissions: 30, approvals: 22 }
    ],
    recentProposals: [
        {
            title: "Pengembangan Aplikasi Monitoring Kualitas Air Berbasis IoT dan Machine Learning",
            submittedBy: "Dr. Agus Sutanto",
            date: "2025-04-15T10:30:00Z",
            status: "Approved",
            mlScore: 92
        },
        {
            title: "Implementasi Augmented Reality untuk Pembelajaran Anatomi Manusia",
            submittedBy: "Siti Rahayu, M.Kom",
            date: "2025-04-14T15:45:00Z",
            status: "Under Review",
            mlScore: 78
        },
        {
            title: "Analisis Performa Jaringan dengan Machine Learning dan Deep Learning",
            submittedBy: "Dr. Hendro Wicaksono",
            date: "2025-04-13T09:15:00Z",
            status: "Rejected",
            mlScore: 45
        },
        {
            title: "Sistem Pendukung Keputusan untuk Optimalisasi Energi di Kampus",
            submittedBy: "Prof. Bambang Wijaya",
            date: "2025-04-12T14:20:00Z",
            status: "Approved",
            mlScore: 88
        },
        {
            title: "Pengembangan Sistem Keamanan IoT Berbasis Blockchain",
            submittedBy: "Dr. Anton Nugroho",
            date: "2025-04-11T11:10:00Z",
            status: "Pending",
            mlScore: 65
        }
    ]
};

// Yearly statistics for different timeframes
const yearlyStatistics = {
    ...dummyStatistics,
    totalProposals: 465,
    previousTotalProposals: 402,
    approvalRate: 70.1,
    previousApprovalRate: 65.8,
    avgReviewTime: 3.8,
    previousAvgReviewTime: 4.5,
    mlAccuracy: 87.3,
    previousMlAccuracy: 82.1
};

// All-time statistics
const allTimeStatistics = {
    ...dummyStatistics,
    totalProposals: 1247,
    previousTotalProposals: 897,
    approvalRate: 68.9,
    previousApprovalRate: 62.4,
    avgReviewTime: 4.3,
    previousAvgReviewTime: 5.2,
    mlAccuracy: 85.8,
    previousMlAccuracy: 79.5
};

const ProposalStatistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeframe, setTimeframe] = useState("thisSession"); // thisSession, thisYear, allTime

    useEffect(() => {
        // Simulate loading delay
        setLoading(true);

        const timer = setTimeout(() => {
            switch (timeframe) {
                case "thisYear":
                    setStatistics(yearlyStatistics);
                    break;
                case "allTime":
                    setStatistics(allTimeStatistics);
                    break;
                default:
                    setStatistics(dummyStatistics);
            }
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [timeframe]);

    const getPercentageChange = (current, previous) => {
        if (!previous) return 100;
        return ((current - previous) / previous) * 100;
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "text-green-500";
            case "rejected":
                return "text-red-500";
            case "under review":
                return "text-yellow-500";
            case "pending":
                return "text-blue-500";
            default:
                return "text-gray-500";
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return <MdCheckCircle className="text-green-500" />;
            case "rejected":
                return <MdCancel className="text-red-500" />;
            case "under review":
                return <MdHourglassEmpty className="text-yellow-500" />;
            case "pending":
                return <MdFileCopy className="text-blue-500" />;
            default:
                return null;
        }
    };

    // Updated chart data for Recharts
    const pieChartData = statistics ?
        statistics.statusDistribution.map(item => ({
            name: item.status,
            value: item.count
        })) : [];

    const barChartData = statistics ?
        statistics.monthlyTrend.map(item => ({
            month: item.month,
            Submissions: item.submissions,
            Approvals: item.approvals
        })) : [];

    // Colors for pie chart
    const COLORS = [
        "#22c55e", // green for approved
        "#ef4444", // red for rejected
        "#eab308", // yellow for under review
        "#3b82f6", // blue for pending
    ];

    if (loading) {
        return (
            <Card extra={"w-full p-4"}>
                <div className="animate-pulse">
                    <div className="flex justify-between mb-6">
                        <div className="h-8 bg-gray-200 dark:bg-navy-700 rounded w-48"></div>
                        <div className="h-8 bg-gray-200 dark:bg-navy-700 rounded w-32"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-200 dark:bg-navy-700 rounded"></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="h-64 bg-gray-200 dark:bg-navy-700 rounded"></div>
                        <div className="h-64 bg-gray-200 dark:bg-navy-700 rounded"></div>
                    </div>
                    <div className="h-8 bg-gray-200 dark:bg-navy-700 rounded mb-3"></div>
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-16 bg-gray-200 dark:bg-navy-700 rounded"></div>
                        ))}
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card extra={"w-full p-4"}>
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div className="flex items-center">
                    <MdBarChart className="h-7 w-7 text-brand-500 mr-2" />
                    <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                        Proposal Statistics
                    </h4>
                </div>
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium ${timeframe === "thisSession"
                            ? "bg-brand-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-800"
                            } border border-gray-200 rounded-l-lg`}
                        onClick={() => setTimeframe("thisSession")}
                    >
                        Current Session
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium ${timeframe === "thisYear"
                            ? "bg-brand-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-800"
                            } border-t border-b border-gray-200`}
                        onClick={() => setTimeframe("thisYear")}
                    >
                        This Year
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium ${timeframe === "allTime"
                            ? "bg-brand-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-800"
                            } border border-gray-200 rounded-r-lg`}
                        onClick={() => setTimeframe("allTime")}
                    >
                        All Time
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center justify-between bg-white dark:bg-navy-700 p-4 rounded-xl shadow-md">
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-white">Total Proposals</p>
                        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{statistics.totalProposals}</h4>
                        <div className="flex items-center mt-1">
                            <span className={`text-xs font-medium ${getPercentageChange(statistics.totalProposals, statistics.previousTotalProposals) >= 0
                                ? "text-green-500"
                                : "text-red-500"
                                }`}>
                                {getPercentageChange(
                                    statistics.totalProposals,
                                    statistics.previousTotalProposals
                                ).toFixed(1)}%
                            </span>
                            {getPercentageChange(statistics.totalProposals, statistics.previousTotalProposals) >= 0 ?
                                <MdArrowUpward className="h-3 w-3 text-green-500" /> :
                                <MdArrowDownward className="h-3 w-3 text-red-500" />
                            }
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs previous period</span>
                        </div>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-navy-600 rounded-full">
                        <MdFileCopy className="h-6 w-6 text-brand-500" />
                    </div>
                </div>

                <div className="flex items-center justify-between bg-white dark:bg-navy-700 p-4 rounded-xl shadow-md">
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-white">Approval Rate</p>
                        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{statistics.approvalRate.toFixed(1)}%</h4>
                        <div className="flex items-center mt-1">
                            <span className={`text-xs font-medium ${getPercentageChange(statistics.approvalRate, statistics.previousApprovalRate) >= 0
                                ? "text-green-500"
                                : "text-red-500"
                                }`}>
                                {getPercentageChange(
                                    statistics.approvalRate,
                                    statistics.previousApprovalRate
                                ).toFixed(1)}%
                            </span>
                            {getPercentageChange(statistics.approvalRate, statistics.previousApprovalRate) >= 0 ?
                                <MdArrowUpward className="h-3 w-3 text-green-500" /> :
                                <MdArrowDownward className="h-3 w-3 text-red-500" />
                            }
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs previous period</span>
                        </div>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-navy-600 rounded-full">
                        <MdCheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                </div>

                <div className="flex items-center justify-between bg-white dark:bg-navy-700 p-4 rounded-xl shadow-md">
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-white">Avg. Review Time</p>
                        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{statistics.avgReviewTime} days</h4>
                        <div className="flex items-center mt-1">
                            <span className={`text-xs font-medium ${getPercentageChange(statistics.previousAvgReviewTime, statistics.avgReviewTime) >= 0
                                ? "text-green-500"
                                : "text-red-500"
                                }`}>
                                {getPercentageChange(
                                    statistics.previousAvgReviewTime,
                                    statistics.avgReviewTime
                                ).toFixed(1)}%
                            </span>
                            {getPercentageChange(statistics.previousAvgReviewTime, statistics.avgReviewTime) >= 0 ?
                                <MdArrowUpward className="h-3 w-3 text-green-500" /> :
                                <MdArrowDownward className="h-3 w-3 text-red-500" />
                            }
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">faster than before</span>
                        </div>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-navy-600 rounded-full">
                        <MdHourglassEmpty className="h-6 w-6 text-yellow-500" />
                    </div>
                </div>

                <div className="flex items-center justify-between bg-white dark:bg-navy-700 p-4 rounded-xl shadow-md">
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-white">ML Accuracy</p>
                        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{statistics.mlAccuracy.toFixed(1)}%</h4>
                        <div className="flex items-center mt-1">
                            <span className={`text-xs font-medium ${getPercentageChange(statistics.mlAccuracy, statistics.previousMlAccuracy) >= 0
                                ? "text-green-500"
                                : "text-red-500"
                                }`}>
                                {getPercentageChange(
                                    statistics.mlAccuracy,
                                    statistics.previousMlAccuracy
                                ).toFixed(1)}%
                            </span>
                            {getPercentageChange(statistics.mlAccuracy, statistics.previousMlAccuracy) >= 0 ?
                                <MdArrowUpward className="h-3 w-3 text-green-500" /> :
                                <MdArrowDownward className="h-3 w-3 text-red-500" />
                            }
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs previous period</span>
                        </div>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-navy-600 rounded-full">
                        <MdBarChart className="h-6 w-6 text-blue-500" />
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card extra={"w-full p-4"}>
                    <div className="flex justify-between items-center mb-3">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">Status Distribution</h5>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [`${value} proposals`, name]}
                                    contentStyle={{
                                        backgroundColor: "rgba(17, 24, 39, 0.9)",
                                        border: 'none',
                                        borderRadius: '4px',
                                        color: '#fff',
                                        fontSize: '12px',
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                />
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    wrapperStyle={{
                                        paddingLeft: "15px",
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "12px",
                                        color: "#64748b"
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card extra={"w-full p-4"}>
                    <div className="flex justify-between items-center mb-3">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">Monthly Trends</h5>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={barChartData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.2)" />
                                <XAxis
                                    dataKey="month"
                                    tick={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: 11,
                                        color: "#64748b"
                                    }}
                                />
                                <YAxis
                                    tick={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: 11,
                                        color: "#64748b"
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "rgba(17, 24, 39, 0.9)",
                                        border: 'none',
                                        borderRadius: '4px',
                                        color: '#fff',
                                        fontSize: '12px',
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                />
                                <Legend
                                    wrapperStyle={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "12px",
                                        color: "#64748b"
                                    }}
                                />
                                <Bar
                                    dataKey="Submissions"
                                    fill="rgba(59, 130, 246, 0.7)"
                                    stroke="rgba(59, 130, 246, 1)"
                                    strokeWidth={1}
                                />
                                <Bar
                                    dataKey="Approvals"
                                    fill="rgba(34, 197, 94, 0.7)"
                                    stroke="rgba(34, 197, 94, 1)"
                                    strokeWidth={1}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Status Table */}
            <Card extra={"w-full p-4"}>
                <div className="flex justify-between items-center mb-3">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white">Recent Proposals</h5>
                    <button className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:hover:text-brand-400">
                        View All
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Title
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Submitted By
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Date
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Status
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    ML Score
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {statistics.recentProposals.map((proposal, index) => (
                                <tr key={index}>
                                    <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                        <p className="truncate max-w-[240px]">{proposal.title}</p>
                                    </td>
                                    <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                        {proposal.submittedBy}
                                    </td>
                                    <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                        {new Date(proposal.date).toLocaleDateString()}
                                    </td>
                                    <td className="py-[14px] text-sm font-medium">
                                        <div className="flex items-center">
                                            {getStatusIcon(proposal.status)}
                                            <span className={`ml-2 ${getStatusColor(proposal.status)}`}>
                                                {proposal.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                        <div className="flex items-center">
                                            <div className="h-2 w-12 rounded-full bg-gray-200 dark:bg-navy-700">
                                                <div
                                                    className={`h-full rounded-full ${proposal.mlScore >= 80
                                                        ? "bg-green-500"
                                                        : proposal.mlScore >= 60
                                                            ? "bg-yellow-500"
                                                            : "bg-red-500"
                                                        }`}
                                                    style={{ width: `${proposal.mlScore}%` }}
                                                ></div>
                                            </div>
                                            <span className="ml-2">{proposal.mlScore}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </Card>
    );
};

export default ProposalStatistics;
