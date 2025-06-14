import React from "react";
import {
    Card,
    CardBody,
    Typography,
    CardHeader,
    Chip,
    Progress,
    Avatar,
} from "@material-tailwind/react";
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
import 'aos/dist/aos.css';

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = React.useState("all");

    // Dummy data for analytics
    const proposalStats = {
        total: 124,
        approved: 86,
        pending: 32,
        rejected: 6,
        increase: 12.4
    };

    const sessionStats = {
        active: 1,
        completed: 8,
        upcoming: 0,
        avgDuration: "4.5 months"
    };

    const userStats = {
        total: 248,
        active: 178,
        newToday: 5,
        increase: 8.2
    };

    const systemHealthStats = {
        uptime: "99.98%",
        responseTime: "42ms",
        pendingTasks: 7,
        cpuUsage: 32,
        memoryUsage: 58
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

    const userActivityData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'User Activity',
                data: [450, 380, 520, 490, 600, 570],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const proposalTrendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Submissions',
                data: [32, 28, 42, 38, 47, 50],
                backgroundColor: '#8B5CF6',
            },
        ],
    };

    // Dummy recent activities
    const recentActivities = [
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

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full px-2 sm:px-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 p-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Overview of the proposal validation system
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center space-x-3">
                        <div className="rounded-full bg-blue-100 p-2">
                            <MdNotifications className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex items-center">
                            <Avatar
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="Admin"
                                size="sm"
                                className="border border-blue-500 p-0.5"
                            />
                            <div className="ml-2">
                                <Typography variant="small" color="blue-gray" className="font-semibold">
                                    Admin User
                                </Typography>
                                <Typography variant="small" color="gray" className="text-xs">
                                    System Administrator
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3 px-2">
                    {/* Proposal Stats */}
                    <Card>
                        <CardBody className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography variant="small" color="blue-gray" className="font-semibold mb-2">
                                        Proposals
                                    </Typography>
                                    <Typography variant="h3" color="blue-gray" className="font-bold">
                                        {proposalStats.total}
                                    </Typography>
                                    <div className="flex items-center mt-1">
                                        <MdArrowUpward className="h-4 w-4 text-green-500 mr-1" />
                                        <Typography variant="small" color="green" className="font-medium">
                                            +{proposalStats.increase}%
                                        </Typography>
                                        <Typography variant="small" color="gray" className="ml-1">
                                            from last month
                                        </Typography>
                                    </div>
                                </div>
                                <div className="p-2 rounded-lg bg-blue-50">
                                    <MdDescription className="h-10 w-10 text-blue-500" />
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* User Stats */}
                    <Card>
                        <CardBody className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography variant="small" color="blue-gray" className="font-semibold mb-2">
                                        Users
                                    </Typography>
                                    <Typography variant="h3" color="blue-gray" className="font-bold">
                                        {userStats.total}
                                    </Typography>
                                    <div className="flex items-center mt-1">
                                        <MdArrowUpward className="h-4 w-4 text-green-500 mr-1" />
                                        <Typography variant="small" color="green" className="font-medium">
                                            +{userStats.increase}%
                                        </Typography>
                                        <Typography variant="small" color="gray" className="ml-1">
                                            growth rate
                                        </Typography>
                                    </div>
                                </div>
                                <div className="p-2 rounded-lg bg-purple-50">
                                    <MdPeople className="h-10 w-10 text-purple-500" />
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Session Stats */}
                    <Card>
                        <CardBody className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography variant="small" color="blue-gray" className="font-semibold mb-2">
                                        Sessions
                                    </Typography>
                                    <Typography variant="h3" color="blue-gray" className="font-bold">
                                        {sessionStats.active}/{sessionStats.completed + sessionStats.active}
                                    </Typography>
                                    <div className="flex items-center mt-1">
                                        <MdAccessTime className="h-4 w-4 text-blue-500 mr-1" />
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Avg. {sessionStats.avgDuration}
                                        </Typography>
                                        <Typography variant="small" color="gray" className="ml-1">
                                            duration
                                        </Typography>
                                    </div>
                                </div>
                                <div className="p-2 rounded-lg bg-amber-50">
                                    <MdDateRange className="h-10 w-10 text-amber-500" />
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* System Health */}
                    <Card>
                        <CardBody className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography variant="small" color="blue-gray" className="font-semibold mb-2">
                                        System Health
                                    </Typography>
                                    <Typography variant="h3" color="blue-gray" className="font-bold">
                                        {systemHealthStats.uptime}
                                    </Typography>
                                    <div className="flex items-center mt-1">
                                        <MdStorage className="h-4 w-4 text-green-500 mr-1" />
                                        <Typography variant="small" color="green" className="font-medium">
                                            {systemHealthStats.responseTime}
                                        </Typography>
                                        <Typography variant="small" color="gray" className="ml-1">
                                            avg. response
                                        </Typography>
                                    </div>
                                </div>
                                <div className="p-2 rounded-lg bg-green-50">
                                    <MdStorage className="h-10 w-10 text-green-500" />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Main content area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 px-2">
                    {/* Left column - Charts */}
                    <div className="lg:col-span-2 space-y-3">
                        {/* Active Session Status */}
                        <Card>
                            <CardHeader floated={false} shadow={false} className="pt-4 pb-2 px-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Typography variant="h5" color="blue-gray">
                                            Active Session Status
                                        </Typography>
                                        <Typography color="gray" variant="small">
                                            Current research proposal session overview
                                        </Typography>
                                    </div>
                                    <div className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                        {activeSession.status}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-4 pb-4">
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Overall Progress
                                        </Typography>
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            {activeSession.progress}%
                                        </Typography>
                                    </div>
                                    <Progress value={activeSession.progress} color="blue" className="h-1" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Session Name
                                        </Typography>
                                        <Typography variant="small" color="gray">
                                            {activeSession.name}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Time Remaining
                                        </Typography>
                                        <Typography variant="small" color="gray">
                                            {activeSession.daysRemaining} days
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            Start Date
                                        </Typography>
                                        <Typography variant="small" color="gray">
                                            {activeSession.startDate}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                            End Date
                                        </Typography>
                                        <Typography variant="small" color="gray">
                                            {activeSession.endDate}
                                        </Typography>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                                        <Typography variant="h4" color="blue" className="font-bold">
                                            {activeSession.proposalCount}
                                        </Typography>
                                        <Typography variant="small" color="blue-gray" className="text-center">
                                            Total Proposals
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
                                        <Typography variant="h4" color="green" className="font-bold">
                                            {activeSession.approvedCount}
                                        </Typography>
                                        <Typography variant="small" color="blue-gray" className="text-center">
                                            Approved
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg">
                                        <Typography variant="h4" color="purple" className="font-bold">
                                            {activeSession.participantCount}
                                        </Typography>
                                        <Typography variant="small" color="blue-gray" className="text-center">
                                            Participants
                                        </Typography>
                                    </div>
                                </div>

                                <Typography variant="small" color="blue-gray" className="font-medium mt-4">
                                    Key Deadlines
                                </Typography>
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                                        <Typography variant="small" color="blue-gray" className="w-48">
                                            Proposal Submission
                                        </Typography>
                                        <Typography variant="small" color="gray">
                                            {activeSession.proposalDeadline}
                                        </Typography>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                                        <Typography variant="small" color="blue-gray" className="w-48">
                                            Review Completion
                                        </Typography>
                                        <Typography variant="small" color="gray">
                                            {activeSession.reviewDeadline}
                                        </Typography>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                                        <Typography variant="small" color="blue-gray" className="w-48">
                                            Progress Reports
                                        </Typography>
                                        <Typography variant="small" color="gray">
                                            {activeSession.progressReportDeadline}
                                        </Typography>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                        <Typography variant="small" color="blue-gray" className="w-48">
                                            Final Reports
                                        </Typography>
                                        <Typography variant="small" color="gray">
                                            {activeSession.finalReportDeadline}
                                        </Typography>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Analytics Charts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader floated={false} shadow={false} className="pt-4 pb-0 px-4">
                                    <Typography variant="h6" color="blue-gray">
                                        Proposal Distribution
                                    </Typography>
                                </CardHeader>
                                <CardBody className="px-4 pb-4">
                                    <div className="h-[240px] flex items-center justify-center">
                                        <Doughnut
                                            data={proposalChartData}
                                            options={{
                                                maintainAspectRatio: false,
                                                cutout: '70%',
                                                plugins: {
                                                    legend: {
                                                        position: 'bottom',
                                                        labels: {
                                                            usePointStyle: true,
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardHeader floated={false} shadow={false} className="pt-4 pb-0 px-4">
                                    <Typography variant="h6" color="blue-gray">
                                        Proposal Trend
                                    </Typography>
                                </CardHeader>
                                <CardBody className="px-4 pb-4">
                                    <div className="h-[240px]">
                                        <Bar
                                            data={proposalTrendData}
                                            options={{
                                                maintainAspectRatio: false,
                                                plugins: {
                                                    legend: {
                                                        display: false,
                                                    },
                                                },
                                                scales: {
                                                    y: {
                                                        beginAtZero: true,
                                                        grid: {
                                                            display: true,
                                                            drawBorder: false,
                                                        },
                                                    },
                                                    x: {
                                                        grid: {
                                                            display: false,
                                                            drawBorder: false,
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                        {/* User Activity Chart */}
                        <Card>
                            <CardHeader floated={false} shadow={false} className="pt-4 pb-0 px-4">
                                <Typography variant="h6" color="blue-gray">
                                    User Activity
                                </Typography>
                            </CardHeader>
                            <CardBody className="px-4 pb-4">
                                <div className="h-[240px]">
                                    <Line
                                        data={userActivityData}
                                        options={{
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                    grid: {
                                                        display: true,
                                                        drawBorder: false,
                                                    },
                                                },
                                                x: {
                                                    grid: {
                                                        display: false,
                                                        drawBorder: false,
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Right column - Activity and Notifications */}
                    <div className="space-y-3">
                        {/* System Health */}
                        <Card>
                            <CardHeader floated={false} shadow={false} className="pt-4 pb-2 px-4">
                                <Typography variant="h6" color="blue-gray">
                                    System Health
                                </Typography>
                            </CardHeader>
                            <CardBody className="px-4 pb-4">
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                CPU Usage
                                            </Typography>
                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                {systemHealthStats.cpuUsage}%
                                            </Typography>
                                        </div>
                                        <Progress value={systemHealthStats.cpuUsage} color="blue" className="h-1" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                Memory Usage
                                            </Typography>
                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                {systemHealthStats.memoryUsage}%
                                            </Typography>
                                        </div>
                                        <Progress value={systemHealthStats.memoryUsage} color="amber" className="h-1" />
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <div className="flex justify-between">
                                            <div className="flex items-center">
                                                <MdAccessTime className="h-4 w-4 text-blue-500 mr-2" />
                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                    Response Time
                                                </Typography>
                                            </div>
                                            <Typography variant="small" color="gray">
                                                {systemHealthStats.responseTime}
                                            </Typography>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <div className="flex justify-between">
                                            <div className="flex items-center">
                                                <MdStorage className="h-4 w-4 text-green-500 mr-2" />
                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                    Server Uptime
                                                </Typography>
                                            </div>
                                            <Typography variant="small" color="gray">
                                                {systemHealthStats.uptime}
                                            </Typography>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <div className="flex justify-between">
                                            <div className="flex items-center">
                                                <MdDescription className="h-4 w-4 text-amber-500 mr-2" />
                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                    Pending Tasks
                                                </Typography>
                                            </div>
                                            <Typography variant="small" color="gray">
                                                {systemHealthStats.pendingTasks}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Urgent Notifications */}
                        <Card className="w-full">
                            <CardHeader floated={false} shadow={false} className="pt-4 pb-2 px-4">
                                <Typography variant="h6" color="blue-gray">
                                    Urgent Notifications
                                </Typography>
                            </CardHeader>
                            <CardBody className="px-4 pb-4">
                                <div className="space-y-3">
                                    {urgentNotifications.map((notification, index) => (
                                        <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                                            <div className={`p-1 rounded-full bg-${getSeverityColor(notification.severity)}-100 mr-3 mt-0.5`}>
                                                <MdWarning className={`h-4 w-4 text-${getSeverityColor(notification.severity)}-500`} />
                                            </div>
                                            <div className="flex-1">
                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                    {notification.message}
                                                </Typography>
                                                <Typography variant="small" color="gray">
                                                    {notification.time}
                                                </Typography>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Recent Activities - Simplified to avoid complex components */}
                        <Card className="w-full">
                            <CardHeader floated={false} shadow={false} className="pt-4 pb-2 px-4">
                                <div className="flex items-center justify-between">
                                    <Typography variant="h6" color="blue-gray">
                                        Recent Activities
                                    </Typography>
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
                            </CardHeader>
                            <CardBody className="px-4 pb-4">
                                <div className="space-y-3">
                                    {recentActivities.map((activity, index) => (
                                        <div key={index} className="flex items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                            {activity.avatar === "SY" ? (
                                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 mr-3">
                                                    {activity.avatar}
                                                </div>
                                            ) : (
                                                <Avatar
                                                    size="sm"
                                                    variant="circular"
                                                    className="border border-gray-300 p-0.5 mr-3"
                                                    alt={activity.user}
                                                    src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${(index + 20) % 99}.jpg`}
                                                />
                                            )}
                                            <div>
                                                <div className="flex flex-wrap">
                                                    <Typography variant="small" color="blue-gray" className="font-medium mr-1">
                                                        {activity.user}
                                                    </Typography>
                                                    <Typography variant="small" color="gray">
                                                        {activity.action}
                                                    </Typography>
                                                </div>
                                                <Typography variant="small" color="gray">
                                                    {activity.time}
                                                </Typography>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
