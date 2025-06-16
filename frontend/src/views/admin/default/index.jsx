import React, { useState, useEffect } from "react";
import {
    MdPieChart,
    MdPeople,
    MdDescription,
    MdDateRange,
    MdNotifications,
    MdStorage,
    MdCheckCircle,
    MdWarning,
    MdAccessTime,
    MdArrowUpward,
    MdArrowDownward,
    MdFilterList
} from "react-icons/md";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { dashboardService } from 'services/dashboardService';
import FallbackLineChart from "components/charts/FallbackLineChart"; // Added import

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDemo, setIsDemo] = useState(false);
    const { user } = useSelector((state) => state.auth);

    // Fetch dashboard data on component mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const result = await dashboardService.getAdminDashboard();

                if (result.success) {
                    setDashboardData(result.data);
                    setIsDemo(result.isDemo || false);
                    setError(null);

                    if (result.isDemo) {
                        console.info('Using demo data:', result.message);
                    }
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

    // Fallback data in case API fails
    const getFallbackData = () => ({
        overview: {
            total_users: 248,
            active_users: 178,
            total_proposals: 124,
            total_departments: 12
        },
        proposal_stats: [
            { status: 'approved', count: 86 },
            { status: 'pending', count: 32 },
            { status: 'rejected', count: 6 }
        ],
        user_stats: [
            { role: 'dosen', count: 120 },
            { role: 'reviewer', count: 45 },
            { role: 'admin', count: 8 }
        ],
        recent_activities: [],
        monthly_trends: []
    });

    // Use real data if available, otherwise use fallback
    const data = dashboardData || getFallbackData();

    // Process data for components
    const proposalStats = {
        total: data.overview?.total_proposals || 0,
        approved: data.proposal_stats?.find(p => p.status === 'approved')?.count || 0,
        pending: data.proposal_stats?.find(p => p.status === 'pending')?.count || 0,
        rejected: data.proposal_stats?.find(p => p.status === 'rejected')?.count || 0,
        increase: 12.4 // This could be calculated from monthly_trends
    };

    const userStats = {
        total: data.overview?.total_users || 0,
        active: data.overview?.active_users || 0,
        newToday: 5, // This could come from recent activities
        increase: 8.2 // This could be calculated from trends
    };

    const systemHealthStats = {
        uptime: "99.98%",
        responseTime: "42ms",
        pendingTasks: proposalStats.pending,
        cpuUsage: 32,
        memoryUsage: 58
    };

    const sessionStats = {
        active: 1,
        completed: 8,
        upcoming: 0,
        avgDuration: "4.5 months"
    };

    // Chart data
    const proposalChartData = {
        labels: ['Approved', 'Pending', 'Rejected'],
        datasets: [
            {
                data: [proposalStats.approved, proposalStats.pending, proposalStats.rejected],
                backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
                borderWidth: 0,
            },
        ],
    };

    // Prepare dynamic chart data from data.monthly_trends with fallbacks
    const monthly_trends_from_data = Array.isArray(data.monthly_trends) ? data.monthly_trends : [];

    const monthly_labels = monthly_trends_from_data.length > 0
        ? monthly_trends_from_data.map(trend => trend.month_name || trend.month || 'N/A')
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    const monthly_activity_counts = monthly_trends_from_data.length > 0
        ? monthly_trends_from_data.map(trend => trend.user_activity_count || 0)
        : [450, 380, 520, 490, 600, 570];

    const monthly_proposal_counts = monthly_trends_from_data.length > 0
        ? monthly_trends_from_data.map(trend => trend.proposal_submission_count || 0)
        : [32, 28, 42, 38, 47, 50];

    const userActivityData = {
        labels: monthly_labels,
        datasets: [
            {
                label: 'User Activity',
                data: monthly_activity_counts.length > 0 ? monthly_activity_counts : [0, 0, 0, 0, 0, 0], // Ensure data is an array, fallback to array of zeros
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const proposalTrendData = {
        labels: monthly_labels,
        datasets: [
            {
                label: 'Submissions',
                data: monthly_proposal_counts.length > 0 ? monthly_proposal_counts : [0, 0, 0, 0, 0, 0], // Ensure data is an array, fallback to array of zeros
                backgroundColor: '#8B5CF6',
            },
        ],
    };

    // Process activity data from API
    const recentActivities = data.recent_activities?.slice(0, 6).map(activity => ({
        user: activity.user_name || "Unknown User",
        action: activity.action || "performed an action",
        time: activity.created_at ? new Date(activity.created_at).toLocaleString() : "Unknown time",
        avatar: activity.user_name ? activity.user_name.split(' ').map(n => n[0]).join('').toUpperCase() : "UK"
    })) || [
            { user: "Dr. Budi Santoso", action: "submitted a new proposal", time: "5 minutes ago", avatar: "BS" },
            { user: "Admin Dewi", action: "activated new session: 2025-Q2", time: "1 hour ago", avatar: "AD" },
            { user: "Prof. Joko Widodo", action: "reviewed proposal #PR-2025-042", time: "3 hours ago", avatar: "JW" },
            { user: "Dr. Rina Marlina", action: "uploaded final report", time: "5 hours ago", avatar: "RM" },
            { user: "System", action: "performed daily backup", time: "6 hours ago", avatar: "SY" },
            { user: "Dr. Ahmad Fauzi", action: "commented on proposal #PR-2025-038", time: "12 hours ago", avatar: "AF" },
        ];

    // Urgent notifications
    const urgentNotifications = [
        { message: "15 proposals pending review - deadline in 2 days", severity: "high", time: "1 hour ago" },
        { message: "System update scheduled for tomorrow at 02:00", severity: "medium", time: "3 hours ago" },
        { message: "Memory usage exceeded 85% threshold at 08:42", severity: "low", time: "5 hours ago" },
    ];

    // Active session info
    const activeSession = {
        name: "2025-Q2 Research Proposals",
        status: "Active",
        startDate: "Apr 1, 2025",
        endDate: "Jun 30, 2025",
        proposalDeadline: "Apr 20, 2025",
        reviewDeadline: "May 15, 2025",
        progressReportDeadline: "Jun 1, 2025",
        finalReportDeadline: "Jun 25, 2025",
        proposalCount: 48,
        approvedCount: 35,
        participantCount: 62,
        daysRemaining: 74,
        progress: 22
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case "high": return "red";
            case "medium": return "amber";
            case "low": return "blue";
            default: return "gray";
        }
    };

    const handleTabChange = (value) => {
        setActiveTab(value);
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Loading Dashboard...
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                        Please wait while we fetch your data
                    </p>
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
                    <h2 className="text-xl font-semibold text-red-600">
                        Failed to Load Dashboard
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 mb-4">
                        {error}
                    </p>
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

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full px-2 sm:px-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 p-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Overview of the proposal validation system
                        </p>
                        {/* Data Source Indicator */}
                        <div className="mt-2 flex items-center">
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDemo
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-green-100 text-green-800'
                                    }`}
                            >
                                {isDemo ? "Demo Data" : "Live Data"}
                            </span>
                            {error && (
                                <span className="ml-2 text-xs text-red-600">
                                    API Error: Using fallback data
                                </span>
                            )}
                            {isDemo && (
                                <span className="ml-2 text-xs text-amber-600">
                                    Please login for live data
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center space-x-3">
                        <div className="rounded-full bg-blue-100 p-2">
                            <MdNotifications className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex items-center">
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="Admin"
                                className="w-8 h-8 rounded-full border-2 border-blue-500 p-0.5"
                            />
                            <div className="ml-2">
                                <p className="text-sm font-semibold text-gray-700">
                                    Admin User
                                </p>
                                <p className="text-xs text-gray-500">
                                    System Administrator
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3 px-2">
                    {/* Proposal Stats */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-2">
                                        Proposals
                                    </p>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {proposalStats.total}
                                    </h3>
                                    <div className="flex items-center mt-1">
                                        <MdArrowUpward className="h-4 w-4 text-green-500 mr-1" />
                                        <span className="text-sm font-medium text-green-600">
                                            +{proposalStats.increase}%
                                        </span>
                                        <span className="text-sm text-gray-500 ml-1">
                                            from last month
                                        </span>
                                    </div>
                                </div>
                                <div className="p-2 rounded-lg bg-blue-50">
                                    <MdDescription className="h-10 w-10 text-blue-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* User Stats */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-2">
                                        Users
                                    </p>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {userStats.total}
                                    </h3>
                                    <div className="flex items-center mt-1">
                                        <MdArrowUpward className="h-4 w-4 text-green-500 mr-1" />
                                        <span className="text-sm font-medium text-green-600">
                                            +{userStats.increase}%
                                        </span>
                                        <span className="text-sm text-gray-500 ml-1">
                                            growth rate
                                        </span>
                                    </div>
                                </div>
                                <div className="p-2 rounded-lg bg-purple-50">
                                    <MdPeople className="h-10 w-10 text-purple-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Session Stats */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-2">
                                        Sessions
                                    </p>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {sessionStats.active}/{sessionStats.completed + sessionStats.active}
                                    </h3>
                                    <div className="flex items-center mt-1">
                                        <MdAccessTime className="h-4 w-4 text-blue-500 mr-1" />
                                        <span className="text-sm font-medium text-gray-700">
                                            Avg. {sessionStats.avgDuration}
                                        </span>
                                        <span className="text-sm text-gray-500 ml-1">
                                            duration
                                        </span>
                                    </div>
                                </div>
                                <div className="p-2 rounded-lg bg-amber-50">
                                    <MdDateRange className="h-10 w-10 text-amber-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Health */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-2">
                                        System Health
                                    </p>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {systemHealthStats.uptime}
                                    </h3>
                                    <div className="flex items-center mt-1">
                                        <MdStorage className="h-4 w-4 text-green-500 mr-1" />
                                        <span className="text-sm font-medium text-green-600">
                                            {systemHealthStats.responseTime}
                                        </span>
                                        <span className="text-sm text-gray-500 ml-1">
                                            avg. response
                                        </span>
                                    </div>
                                </div>
                                <div className="p-2 rounded-lg bg-green-50">
                                    <MdStorage className="h-10 w-10 text-green-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 px-2">
                    {/* Left column - Charts */}
                    <div className="lg:col-span-2 space-y-3">
                        {/* Active Session Status */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="pt-4 pb-2 px-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h5 className="text-lg font-semibold text-gray-900">
                                            Active Session Status
                                        </h5>
                                        <p className="text-sm text-gray-600">
                                            Current research proposal session overview
                                        </p>
                                    </div>
                                    <div className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                        Active
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 pb-4">
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-700">
                                            Overall Progress
                                        </span>
                                        <span className="text-sm font-medium text-gray-700">
                                            {activeSession.progress}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1">
                                        <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${activeSession.progress}%` }}></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            Session Name
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {activeSession.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            Time Remaining
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {activeSession.daysRemaining} days
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            Start Date
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {activeSession.startDate}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            End Date
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {activeSession.endDate}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                                        <h4 className="text-2xl font-bold text-blue-600">
                                            {activeSession.proposalCount}
                                        </h4>
                                        <p className="text-sm text-gray-700 text-center">
                                            Total Proposals
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
                                        <h4 className="text-2xl font-bold text-green-600">
                                            {activeSession.approvedCount}
                                        </h4>
                                        <p className="text-sm text-gray-700 text-center">
                                            Approved
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg">
                                        <h4 className="text-2xl font-bold text-purple-600">
                                            {activeSession.participantCount}
                                        </h4>
                                        <p className="text-sm text-gray-700 text-center">
                                            Participants
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm font-medium text-gray-700 mt-4">
                                    Key Deadlines
                                </p>
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                                        <span className="text-sm text-gray-900 w-48">
                                            Proposal Submission
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            {activeSession.proposalDeadline}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                                        <span className="text-sm text-gray-900 w-48">
                                            Review Completion
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            {activeSession.reviewDeadline}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                                        <span className="text-sm text-gray-900 w-48">
                                            Progress Reports
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            {activeSession.progressReportDeadline}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                        <span className="text-sm text-gray-900 w-48">
                                            Final Reports
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            {activeSession.finalReportDeadline}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Analytics Charts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Proposal Distribution
                                    </h3>
                                </div>
                                <div className="p-4">
                                    <div className="relative h-60 w-full sm:h-72 md:h-80">
                                        <Doughnut data={proposalChartData} options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: { display: true, position: 'bottom' }
                                            }
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User Activity Chart */}
                        <FallbackLineChart
                            data={userActivityData}
                            title="User Activity Over Time"
                        />

                        {/* Proposal Submission Trends */}
                        <FallbackLineChart
                            data={proposalTrendData}
                            title="Proposal Submission Trends"
                        />
                    </div>

                    {/* Right column - Recent Activities & Notifications */}
                    <div className="lg:col-span-1 space-y-3">
                        {/* Recent Activities */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Recent Activities
                                    </h3>
                                    <div className="flex bg-gray-100 rounded-md">
                                        <button
                                            onClick={() => handleTabChange("all")}
                                            className={`px-3 py-1 text-xs rounded-md ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                            All
                                        </button>
                                        <button
                                            onClick={() => handleTabChange("users")}
                                            className={`px-3 py-1 text-xs rounded-md ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                            Users
                                        </button>
                                        <button
                                            onClick={() => handleTabChange("system")}
                                            className={`px-3 py-1 text-xs rounded-md ${activeTab === 'system' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                                            System
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="space-y-3">
                                    {recentActivities.map((activity, index) => (
                                        <div key={index} className="flex items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                            {activity.avatar === "SY" ? (
                                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 mr-3">
                                                    {activity.avatar}
                                                </div>
                                            ) : (
                                                <img
                                                    className="w-8 h-8 rounded-full border border-gray-300 p-0.5 mr-3"
                                                    alt={activity.user}
                                                    src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${(index + 20) % 99}.jpg`}
                                                />
                                            )}
                                            <div>
                                                <div className="flex flex-wrap">
                                                    <span className="text-sm font-medium text-gray-900 mr-1">
                                                        {activity.user}
                                                    </span>
                                                    <span className="text-sm text-gray-600">
                                                        {activity.action}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    {activity.time}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* System Health & Monitoring - Simplified */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="pt-4 pb-2 px-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    System Health
                                </h3>
                            </div>
                            <div className="px-4 pb-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">CPU Usage</span>
                                    <div className="w-2/3 bg-gray-200 rounded-full h-1.5">
                                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${systemHealthStats.cpuUsage}%` }}></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-800">{systemHealthStats.cpuUsage}%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Memory Usage</span>
                                    <div className="w-2/3 bg-gray-200 rounded-full h-1.5">
                                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${systemHealthStats.memoryUsage}%` }}></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-800">{systemHealthStats.memoryUsage}%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Pending Tasks</span>
                                    <span className="text-sm font-medium text-gray-800">{systemHealthStats.pendingTasks}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Response Time</span>
                                    <span className="text-sm font-medium text-gray-800">{systemHealthStats.responseTime}</span>
                                </div>
                            </div>
                        </div>

                        {/* Urgent Notifications */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="pt-4 pb-2 px-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Urgent Notifications
                                </h3>
                            </div>
                            <div className="px-4 pb-4">
                                <ul className="space-y-3">
                                    {urgentNotifications.map((notification, index) => (
                                        <li key={index} className={`p-3 rounded-lg bg-${getSeverityColor(notification.severity)}-50 border-l-4 border-${getSeverityColor(notification.severity)}-500`}>
                                            <div className="flex items-start">
                                                <div className={`p-1.5 rounded-full bg-${getSeverityColor(notification.severity)}-100 mr-2.5 mt-0.5`}>
                                                    {notification.severity === 'high' && <MdWarning className={`h-4 w-4 text-${getSeverityColor(notification.severity)}-600`} />}
                                                    {notification.severity === 'medium' && <MdAccessTime className={`h-4 w-4 text-${getSeverityColor(notification.severity)}-600`} />}
                                                    {notification.severity === 'low' && <MdCheckCircle className={`h-4 w-4 text-${getSeverityColor(notification.severity)}-600`} />}
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-medium text-${getSeverityColor(notification.severity)}-700`}>
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {notification.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
