import React, { useState, useEffect } from "react";
import {
    MdOutlineInsertChart,
    MdOutlineDescription,
    MdOutlineCheck,
    MdOutlineClose,
    MdOutlineWarning,
    MdOutlinePending,
    MdOutlineCategory,
    MdOutlineTimer,
    MdOutlineSchool,
    MdOutlineGroupWork,
    MdOutlineCalendarToday,
    MdOutlineArrowUpward,
    MdOutlineArrowDownward,
    MdRefresh,
    MdOutlineFilterList
} from "react-icons/md";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale,
    Filler
} from 'chart.js';
import { Bar, Pie, Line, Radar } from 'react-chartjs-2';
import Card from "components/card";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale,
    Filler,
    Title,
    Tooltip,
    Legend
);

const ProposalAnalytics = () => {
    const [timeFilter, setTimeFilter] = useState("month");
    const [isLoading, setIsLoading] = useState(true);
    const [analyticsData, setAnalyticsData] = useState(null);
    const [departmentFilter, setDepartmentFilter] = useState("all");

    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });

        // Simulate data loading
        setTimeout(() => {
            setAnalyticsData(generateDummyData());
            setIsLoading(false);
        }, 1000);
    }, []);

    // Generate dummy data for the dashboard
    const generateDummyData = () => {
        return {
            totalProposals: 70,
            approvedProposals: 35,
            pendingProposals: 12,
            rejectedProposals: 8,
            revisionsRequested: 15,
            growthRate: 12,
            averageScore: 76,
            averageReviewTime: 3.5,
            completionRate: 83,

            // Department breakdown
            departments: [
                { name: "Computer Science", count: 25, approvalRate: 68 },
                { name: "Electrical Engineering", count: 18, approvalRate: 72 },
                { name: "Civil Engineering", count: 15, approvalRate: 60 },
                { name: "Accounting", count: 12, approvalRate: 75 },
                { name: "Tourism", count: 10, approvalRate: 50 }
            ],

            // Monthly submission trends
            monthlySubmissions: [12, 19, 15, 8, 22, 14, 16, 9, 28, 16, 24, 18],

            // Review outcomes
            reviewOutcomes: {
                approved: 35,
                pending: 12,
                rejected: 8,
                revision: 15
            },

            // Quality metrics
            qualityMetrics: {
                methodology: 4.2,
                relevance: 3.8,
                feasibility: 3.5,
                innovation: 4.0,
                impact: 3.7,
                budget: 3.2
            }
        };
    };

    // Monthly trends chart data
    const getTrendsChartData = () => ({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Submissions',
                data: analyticsData?.monthlySubmissions || [],
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    });

    // Status distribution chart data
    const getStatusChartData = () => ({
        labels: ['Approved', 'Pending', 'Rejected', 'Revisions'],
        datasets: [
            {
                label: 'Proposals by Status',
                data: [
                    analyticsData?.reviewOutcomes.approved || 0,
                    analyticsData?.reviewOutcomes.pending || 0,
                    analyticsData?.reviewOutcomes.rejected || 0,
                    analyticsData?.reviewOutcomes.revision || 0
                ],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(234, 179, 8, 0.7)',
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(234, 179, 8, 1)',
                ],
                borderWidth: 1,
            },
        ],
    });

    // Department breakdown chart data
    const getDepartmentChartData = () => ({
        labels: analyticsData?.departments.map(dept => dept.name) || [],
        datasets: [
            {
                label: 'Proposal Count',
                data: analyticsData?.departments.map(dept => dept.count) || [],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(234, 179, 8, 0.7)',
                    'rgba(168, 85, 247, 0.7)',
                ],
                borderWidth: 1,
            },
        ],
    });

    // Quality metrics radar chart data
    const getQualityChartData = () => ({
        labels: ['Methodology', 'Relevance', 'Feasibility', 'Innovation', 'Impact', 'Budget'],
        datasets: [
            {
                label: 'Average Scores',
                data: Object.values(analyticsData?.qualityMetrics || {}),
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                pointRadius: 4,
            },
        ],
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-lg font-medium text-gray-700">Loading analytics...</span>
            </div>
        );
    }

    return (
        <div className="proposal-analytics w-full">
            {/* Header with filters */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6" data-aos="fade-down">
                <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-3 lg:mb-0">
                    <MdOutlineInsertChart className="inline-block mr-2 h-5 w-5" />
                    Proposal Analytics Dashboard
                </h3>
                <div className="flex flex-wrap gap-3">
                    <select
                        className="px-3 py-2 bg-white dark:bg-navy-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                    >
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="quarter">Last Quarter</option>
                        <option value="year">Last Year</option>
                        <option value="all">All Time</option>
                    </select>
                    <select
                        className="px-3 py-2 bg-white dark:bg-navy-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                    >
                        <option value="all">All Departments</option>
                        {analyticsData?.departments.map((dept, index) => (
                            <option key={index} value={dept.name}>{dept.name}</option>
                        ))}
                    </select>
                    <button
                        className="px-3 py-2 bg-white dark:bg-navy-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-navy-700 flex items-center"
                        onClick={() => {
                            setIsLoading(true);
                            setTimeout(() => {
                                setAnalyticsData(generateDummyData());
                                setIsLoading(false);
                            }, 800);
                        }}
                    >
                        <MdRefresh className="mr-1" /> Refresh
                    </button>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" data-aos="fade-up" data-aos-delay="100">
                {/* Total Proposals */}
                <Card extra="!flex flex-col items-start justify-between p-5 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                    <div className="flex items-center justify-between w-full mb-2">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Proposals</h4>
                        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            <MdOutlineDescription className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <div className="flex items-end mt-2">
                        <h2 className="text-3xl font-bold text-navy-700 dark:text-white">
                            {analyticsData?.totalProposals}
                        </h2>
                        <div className="flex items-center ml-3 mb-1">
                            <span className={`text-xs font-medium ${analyticsData?.growthRate >= 0 ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'} px-2 py-0.5 rounded-full`}>
                                {analyticsData?.growthRate >= 0 ? <MdOutlineArrowUpward className="inline mr-0.5" /> : <MdOutlineArrowDownward className="inline mr-0.5" />}
                                {Math.abs(analyticsData?.growthRate)}%
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
                        </div>
                    </div>
                </Card>

                {/* Approved */}
                <Card extra="!flex flex-col items-start justify-between p-5 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                    <div className="flex items-center justify-between w-full mb-2">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</h4>
                        <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <MdOutlineCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                    <div className="flex items-end mt-2">
                        <h2 className="text-3xl font-bold text-navy-700 dark:text-white">
                            {analyticsData?.approvedProposals}
                        </h2>
                        <div className="flex items-center ml-3 mb-1">
                            <span className="text-xs font-medium bg-gray-100 dark:bg-navy-800 px-2 py-0.5 rounded-full text-gray-700 dark:text-gray-300">
                                {Math.round((analyticsData?.approvedProposals / analyticsData?.totalProposals) * 100)}% approval
                            </span>
                        </div>
                    </div>
                </Card>

                {/* Pending Review */}
                <Card extra="!flex flex-col items-start justify-between p-5 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                    <div className="flex items-center justify-between w-full mb-2">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Review</h4>
                        <div className="p-2.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                            <MdOutlinePending className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                    <div className="flex items-end mt-2">
                        <h2 className="text-3xl font-bold text-navy-700 dark:text-white">
                            {analyticsData?.pendingProposals}
                        </h2>
                        <div className="flex items-center ml-3 mb-1">
                            <span className="text-xs font-medium bg-gray-100 dark:bg-navy-800 px-2 py-0.5 rounded-full text-gray-700 dark:text-gray-300">
                                Avg. {analyticsData?.averageReviewTime} days in queue
                            </span>
                        </div>
                    </div>
                </Card>

                {/* Needs Revision */}
                <Card extra="!flex flex-col items-start justify-between p-5 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                    <div className="flex items-center justify-between w-full mb-2">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Needs Revision</h4>
                        <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                            <MdOutlineWarning className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                    </div>
                    <div className="flex items-end mt-2">
                        <h2 className="text-3xl font-bold text-navy-700 dark:text-white">
                            {analyticsData?.revisionsRequested}
                        </h2>
                        <div className="flex items-center ml-3 mb-1">
                            <span className="text-xs font-medium bg-gray-100 dark:bg-navy-800 px-2 py-0.5 rounded-full text-gray-700 dark:text-gray-300">
                                {Math.round((analyticsData?.revisionsRequested / analyticsData?.totalProposals) * 100)}% revision rate
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Proposal Status Distribution */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700" data-aos="fade-right" data-aos-delay="200">
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                                <span className="inline-flex items-center justify-center p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md mr-2">
                                    <MdOutlineFilterList className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </span>
                                Proposal Status Distribution
                            </h5>
                        </div>
                        <div className="h-64">
                            <Pie data={getStatusChartData()} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            boxWidth: 15,
                                            padding: 15,
                                            font: {
                                                size: 11
                                            }
                                        }
                                    }
                                }
                            }} />
                        </div>
                    </div>
                </Card>

                {/* Monthly Submission Trends */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700" data-aos="fade-left" data-aos-delay="200">
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                                <span className="inline-flex items-center justify-center p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md mr-2">
                                    <MdOutlineCalendarToday className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </span>
                                Monthly Submission Trends
                            </h5>
                        </div>
                        <div className="h-64">
                            <Line data={getTrendsChartData()} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Department Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Department Breakdown */}
                <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="300">
                    <Card extra="!p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                                    <span className="inline-flex items-center justify-center p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-md mr-2">
                                        <MdOutlineSchool className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </span>
                                    Proposal by Department
                                </h5>
                                <select
                                    className="px-2 py-1 bg-white dark:bg-navy-800 border border-gray-300 dark:border-gray-700 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="count">Proposal Count</option>
                                    <option value="rate">Approval Rate</option>
                                </select>
                            </div>
                            <div className="h-72">
                                <Bar data={getDepartmentChartData()} options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    },
                                    indexAxis: 'y',
                                    plugins: {
                                        legend: {
                                            display: false
                                        }
                                    }
                                }} />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Quality Metrics */}
                <div data-aos="fade-up" data-aos-delay="400">
                    <Card extra="!p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                                    <span className="inline-flex items-center justify-center p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md mr-2">
                                        <MdOutlineCategory className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </span>
                                    Quality Metrics
                                </h5>
                            </div>
                            <div className="h-72">
                                <Radar data={getQualityChartData()} options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        r: {
                                            beginAtZero: true,
                                            max: 5,
                                            ticks: {
                                                stepSize: 1,
                                                font: {
                                                    size: 10
                                                }
                                            },
                                            pointLabels: {
                                                font: {
                                                    size: 11
                                                }
                                            }
                                        }
                                    }
                                }} />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Detailed Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" data-aos="fade-up" data-aos-delay="500">
                {/* Recent Performance Metrics */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                    <h5 className="text-base font-semibold text-navy-700 dark:text-white mb-5 flex items-center">
                        <span className="inline-flex items-center justify-center p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-md mr-2">
                            <MdOutlineTimer className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </span>
                        Review Performance
                    </h5>
                    <div className="space-y-5">
                        {/* Average Score */}
                        <div className="flex items-center justify-between bg-gray-50 dark:bg-navy-900 p-3 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
                                <p className="text-lg font-bold text-navy-700 dark:text-white">{analyticsData?.averageScore}/100</p>
                            </div>
                            <div className="w-1/2">
                                <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${analyticsData?.averageScore}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Average Review Time */}
                        <div className="flex items-center justify-between bg-gray-50 dark:bg-navy-900 p-3 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Review Time</p>
                                <p className="text-lg font-bold text-navy-700 dark:text-white">{analyticsData?.averageReviewTime} days</p>
                            </div>
                            <div className="w-1/2">
                                <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2.5">
                                    <div
                                        className="bg-green-600 h-2.5 rounded-full"
                                        style={{ width: `${(analyticsData?.averageReviewTime / 7) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Completion Rate */}
                        <div className="flex items-center justify-between bg-gray-50 dark:bg-navy-900 p-3 rounded-lg">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</p>
                                <p className="text-lg font-bold text-navy-700 dark:text-white">{analyticsData?.completionRate}%</p>
                            </div>
                            <div className="w-1/2">
                                <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2.5">
                                    <div
                                        className="bg-purple-600 h-2.5 rounded-full"
                                        style={{ width: `${analyticsData?.completionRate}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Department Approval Rates */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                    <h5 className="text-base font-semibold text-navy-700 dark:text-white mb-5 flex items-center">
                        <span className="inline-flex items-center justify-center p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md mr-2">
                            <MdOutlineGroupWork className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </span>
                        Department Approval Rates
                    </h5>
                    <div className="space-y-4">
                        {analyticsData?.departments.map((dept, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-navy-900 p-3 rounded-lg">
                                <div className="w-1/3">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{dept.name}</p>
                                </div>
                                <div className="w-1/4 text-center">
                                    <p className="text-sm font-medium text-navy-700 dark:text-white">{dept.count} proposals</p>
                                </div>
                                <div className="w-1/3">
                                    <div className="flex items-center">
                                        <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2.5 mr-2">
                                            <div
                                                className={`h-2.5 rounded-full ${dept.approvalRate >= 70 ? 'bg-green-600' :
                                                    dept.approvalRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${dept.approvalRate}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-medium">{dept.approvalRate}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProposalAnalytics;
