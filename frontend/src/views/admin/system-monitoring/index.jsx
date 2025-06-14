import React, { useState, useEffect } from "react";
import {
    MdOutlineMonitorHeart,
    MdHistory,
    MdPeople,
    MdAssessment,
    MdSecurity,
    MdFileDownload,
    MdRefresh,
    MdSearch,
    MdFilterList,
    MdDateRange,
    MdInfo,
    MdWarning,
    MdError,
} from "react-icons/md";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { useSelector } from "react-redux";

const SystemMonitoring = () => {
    const [activeTab, setActiveTab] = useState("activity");
    const [timeRange, setTimeRange] = useState("24h");
    const [isLoading, setIsLoading] = useState(false);
    const { baseURL } = useSelector((state) => state.auth);

    // Dummy data for system metrics
    const systemMetricsData = [
        { name: "00:00", cpu: 45, memory: 62, server: 75 },
        { name: "03:00", cpu: 55, memory: 65, server: 70 },
        { name: "06:00", cpu: 75, memory: 78, server: 85 },
        { name: "09:00", cpu: 85, memory: 82, server: 78 },
        { name: "12:00", cpu: 70, memory: 75, server: 80 },
        { name: "15:00", cpu: 80, memory: 80, server: 82 },
        { name: "18:00", cpu: 65, memory: 70, server: 76 },
        { name: "21:00", cpu: 50, memory: 65, server: 72 },
    ];

    // Dummy data for user reports
    const userReportsData = [
        { name: "Proposals", value: 540 },
        { name: "Sessions", value: 24 },
        { name: "Reviews", value: 870 },
        { name: "Reports", value: 320 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    // Dummy data for activity logs
    const activityLogsData = [
        {
            id: 1,
            user: "admin@polimdo.ac.id",
            action: "Created new session",
            timestamp: "2025-04-15T09:23:45",
            status: "success",
        },
        {
            id: 2,
            user: "dosen1@polimdo.ac.id",
            action: "Submitted proposal",
            timestamp: "2025-04-15T10:12:30",
            status: "success",
        },
        {
            id: 3,
            user: "reviewer2@polimdo.ac.id",
            action: "Completed review",
            timestamp: "2025-04-15T11:05:18",
            status: "success",
        },
        {
            id: 4,
            user: "system",
            action: "Backup completed",
            timestamp: "2025-04-15T12:00:00",
            status: "success",
        },
        {
            id: 5,
            user: "wadir@polimdo.ac.id",
            action: "Approved proposal",
            timestamp: "2025-04-15T13:45:22",
            status: "success",
        },
        {
            id: 6,
            user: "unknown",
            action: "Failed login attempt",
            timestamp: "2025-04-15T14:22:10",
            status: "error",
        },
        {
            id: 7,
            user: "system",
            action: "Session state changed",
            timestamp: "2025-04-15T15:30:00",
            status: "warning",
        },
    ];

    // Dummy data for audit trail
    const auditTrailData = [
        {
            id: 1,
            event: "User login",
            user: "admin@polimdo.ac.id",
            ip: "192.168.1.105",
            timestamp: "2025-04-15T08:30:45",
            details: "Successful login from Chrome/Windows",
        },
        {
            id: 2,
            event: "Permission change",
            user: "admin@polimdo.ac.id",
            ip: "192.168.1.105",
            timestamp: "2025-04-15T09:15:22",
            details: "Modified user role for dosen3@polimdo.ac.id",
        },
        {
            id: 3,
            event: "Failed login attempt",
            user: "unknown",
            ip: "45.123.45.67",
            timestamp: "2025-04-15T10:22:18",
            details: "3 consecutive failed attempts",
        },
        {
            id: 4,
            event: "System configuration",
            user: "admin@polimdo.ac.id",
            ip: "192.168.1.105",
            timestamp: "2025-04-15T11:05:30",
            details: "Changed session parameters",
        },
        {
            id: 5,
            event: "Data export",
            user: "wadir@polimdo.ac.id",
            ip: "192.168.1.120",
            timestamp: "2025-04-15T13:45:12",
            details: "Exported proposal reports as PDF",
        },
    ];

    // Simulate loading data
    useEffect(() => {
        // This would be replaced with actual API calls using the baseURL
        const loadData = async () => {
            setIsLoading(true);
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsLoading(false);
        };

        loadData();
    }, [timeRange, baseURL]);

    // Function to refresh data
    const refreshData = () => {
        setIsLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    // Function to handle export
    const handleExport = (format) => {
        alert(`Exporting data in ${format} format...`);
        // Implementation would connect to backend API for actual export
    };

    // Function to format timestamp
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    // Function to get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case "success":
                return <MdInfo className="text-green-500" />;
            case "warning":
                return <MdWarning className="text-yellow-500" />;
            case "error":
                return <MdError className="text-red-500" />;
            default:
                return <MdInfo className="text-blue-500" />;
        }
    };

    return (
        <div className="p-4 lg:p-6 min-h-screen bg-gray-50" data-aos="fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center">
                        <MdOutlineMonitorHeart className="mr-2 text-blue-600" size={32} />
                        System Monitoring
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Monitor system activity, performance, and security
                    </p>
                </div>

                <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                    <div className="relative">
                        <select
                            className="bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <option value="24h">Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="custom">Custom Range</option>
                        </select>
                        <MdDateRange className="absolute right-2 top-2.5 text-gray-500 pointer-events-none" />
                    </div>

                    <button
                        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm transition-colors duration-200"
                        onClick={refreshData}
                    >
                        <MdRefresh
                            className={`mr-1 ${isLoading ? "animate-spin" : ""}`}
                        />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div
                    className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Logs</p>
                            <h3 className="text-2xl font-bold text-gray-800">8,652</h3>
                        </div>
                        <div className="bg-blue-100 rounded-full p-2 h-fit">
                            <MdHistory className="text-blue-600 text-2xl" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        <span className="text-green-500">+12%</span> from last period
                    </p>
                </div>

                <div
                    className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Active Users</p>
                            <h3 className="text-2xl font-bold text-gray-800">152</h3>
                        </div>
                        <div className="bg-green-100 rounded-full p-2 h-fit">
                            <MdPeople className="text-green-600 text-2xl" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        <span className="text-green-500">+8%</span> from last period
                    </p>
                </div>

                <div
                    className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">System Health</p>
                            <h3 className="text-2xl font-bold text-gray-800">98.7%</h3>
                        </div>
                        <div className="bg-purple-100 rounded-full p-2 h-fit">
                            <MdAssessment className="text-purple-600 text-2xl" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        <span className="text-green-500">+1.2%</span> from last period
                    </p>
                </div>

                <div
                    className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Security Events</p>
                            <h3 className="text-2xl font-bold text-gray-800">24</h3>
                        </div>
                        <div className="bg-yellow-100 rounded-full p-2 h-fit">
                            <MdSecurity className="text-yellow-600 text-2xl" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        <span className="text-red-500">+5%</span> from last period
                    </p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <nav className="flex flex-wrap -mb-px">
                    <button
                        className={`mr-4 py-2 px-1 font-medium text-sm inline-flex items-center ${activeTab === "activity"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
                            }`}
                        onClick={() => setActiveTab("activity")}
                    >
                        <MdHistory className="mr-1" /> Activity Logs
                    </button>
                    <button
                        className={`mr-4 py-2 px-1 font-medium text-sm inline-flex items-center ${activeTab === "metrics"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
                            }`}
                        onClick={() => setActiveTab("metrics")}
                    >
                        <MdAssessment className="mr-1" /> System Metrics
                    </button>
                    <button
                        className={`mr-4 py-2 px-1 font-medium text-sm inline-flex items-center ${activeTab === "reports"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
                            }`}
                        onClick={() => setActiveTab("reports")}
                    >
                        <MdPeople className="mr-1" /> User Reports
                    </button>
                    <button
                        className={`mr-4 py-2 px-1 font-medium text-sm inline-flex items-center ${activeTab === "audit"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
                            }`}
                        onClick={() => setActiveTab("audit")}
                    >
                        <MdSecurity className="mr-1" /> Audit Trail
                    </button>
                    <button
                        className={`py-2 px-1 font-medium text-sm inline-flex items-center ${activeTab === "export"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
                            }`}
                        onClick={() => setActiveTab("export")}
                    >
                        <MdFileDownload className="mr-1" /> Export Tools
                    </button>
                </nav>
            </div>

            {/* Loading Indicator */}
            {isLoading && (
                <div className="flex justify-center my-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            {/* Content Sections */}
            {!isLoading && (
                <>
                    {/* Activity Logs */}
                    {activeTab === "activity" && (
                        <div className="bg-white rounded-lg shadow-md" data-aos="fade-up">
                            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <h2 className="text-lg font-semibold text-gray-800">Activity Logs</h2>
                                <div className="mt-2 sm:mt-0 flex items-center">
                                    <div className="relative mr-2">
                                        <input
                                            type="text"
                                            placeholder="Search logs..."
                                            className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <MdSearch className="absolute left-2.5 top-2.5 text-gray-400" />
                                    </div>
                                    <button className="inline-flex items-center text-gray-500 hover:text-gray-700">
                                        <MdFilterList className="mr-1" /> Filter
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                User
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Action
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Timestamp
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {activityLogsData.map((log) => (
                                            <tr key={log.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center">
                                                        {getStatusIcon(log.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {log.user}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {log.action}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatTimestamp(log.timestamp)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    Showing <span className="font-medium">7</span> of{" "}
                                    <span className="font-medium">8,652</span> logs
                                </div>
                                <div className="flex space-x-1">
                                    <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 rounded-md hover:bg-gray-50">
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                        1
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 rounded-md hover:bg-gray-50">
                                        2
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 rounded-md hover:bg-gray-50">
                                        3
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 rounded-md hover:bg-gray-50">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* System Metrics */}
                    {activeTab === "metrics" && (
                        <div className="bg-white rounded-lg shadow-md p-4" data-aos="fade-up">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">System Metrics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h3 className="text-md font-medium text-gray-700 mb-2">CPU & Memory Usage</h3>
                                    <div className="h-72">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={systemMetricsData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="cpu"
                                                    stroke="#8884d8"
                                                    activeDot={{ r: 8 }}
                                                    name="CPU (%)"
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="memory"
                                                    stroke="#82ca9d"
                                                    name="Memory (%)"
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h3 className="text-md font-medium text-gray-700 mb-2">Server Responsiveness</h3>
                                    <div className="h-72">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={systemMetricsData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Area
                                                    type="monotone"
                                                    dataKey="server"
                                                    stroke="#ff7300"
                                                    fill="#ffa07a"
                                                    name="Response Time (ms)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4 md:col-span-2">
                                    <h3 className="text-md font-medium text-gray-700 mb-2">System Health Over Time</h3>
                                    <div className="h-72">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={systemMetricsData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="cpu" fill="#8884d8" name="CPU Load" />
                                                <Bar dataKey="memory" fill="#82ca9d" name="Memory Usage" />
                                                <Bar dataKey="server" fill="#ffc658" name="Server Performance" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* User Reports */}
                    {activeTab === "reports" && (
                        <div className="bg-white rounded-lg shadow-md p-4" data-aos="fade-up">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">User Reports</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="border border-gray-200 rounded-lg p-4 col-span-1 md:col-span-2 lg:col-span-1">
                                    <h3 className="text-md font-medium text-gray-700 mb-2">User Activity Distribution</h3>
                                    <div className="h-72 flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={userReportsData}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {userReportsData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4 lg:col-span-2">
                                    <h3 className="text-md font-medium text-gray-700 mb-2">User Activity by Department</h3>
                                    <div className="h-72">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={[
                                                    { department: "IT", logins: 125, actions: 420 },
                                                    { department: "HR", logins: 85, actions: 290 },
                                                    { department: "Finance", logins: 70, actions: 210 },
                                                    { department: "Academic", logins: 110, actions: 380 },
                                                    { department: "Admin", logins: 60, actions: 310 },
                                                ]}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="department" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="logins" fill="#8884d8" name="Login Count" />
                                                <Bar dataKey="actions" fill="#82ca9d" name="Action Count" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4 md:col-span-2 lg:col-span-3">
                                    <h3 className="text-md font-medium text-gray-700 mb-2">User Sessions Over Time</h3>
                                    <div className="h-72">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                data={[
                                                    { date: "04/10", active: 32, new: 12 },
                                                    { date: "04/11", active: 40, new: 18 },
                                                    { date: "04/12", active: 45, new: 15 },
                                                    { date: "04/13", active: 55, new: 21 },
                                                    { date: "04/14", active: 62, new: 19 },
                                                    { date: "04/15", active: 68, new: 23 },
                                                    { date: "04/16", active: 72, new: 18 },
                                                ]}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dataKey="active" stroke="#8884d8" name="Active Sessions" />
                                                <Line type="monotone" dataKey="new" stroke="#82ca9d" name="New Users" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Audit Trail */}
                    {activeTab === "audit" && (
                        <div className="bg-white rounded-lg shadow-md" data-aos="fade-up">
                            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <h2 className="text-lg font-semibold text-gray-800">Audit Trail</h2>
                                <div className="mt-2 sm:mt-0 flex items-center">
                                    <div className="relative mr-2">
                                        <input
                                            type="text"
                                            placeholder="Search events..."
                                            className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <MdSearch className="absolute left-2.5 top-2.5 text-gray-400" />
                                    </div>
                                    <button className="inline-flex items-center text-gray-500 hover:text-gray-700">
                                        <MdFilterList className="mr-1" /> Filter
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Event
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                User
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                IP Address
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Timestamp
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {auditTrailData.map((event) => (
                                            <tr key={event.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {event.event}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {event.user}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {event.ip}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatTimestamp(event.timestamp)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {event.details}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    Showing <span className="font-medium">5</span> of{" "}
                                    <span className="font-medium">1,245</span> events
                                </div>
                                <div className="flex space-x-1">
                                    <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 rounded-md hover:bg-gray-50">
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                        1
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 rounded-md hover:bg-gray-50">
                                        2
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 rounded-md hover:bg-gray-50">
                                        3
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 rounded-md hover:bg-gray-50">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Export Tools */}
                    {activeTab === "export" && (
                        <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Export Tools</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h3 className="text-md font-medium text-gray-700 mb-4">Export System Data</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Select Data Type
                                            </label>
                                            <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                <option value="activity">Activity Logs</option>
                                                <option value="metrics">System Metrics</option>
                                                <option value="users">User Reports</option>
                                                <option value="audit">Audit Trail</option>
                                                <option value="all">All Data</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Date Range
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    type="date"
                                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <input
                                                    type="date"
                                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Export Format
                                            </label>
                                            <div className="flex space-x-4">
                                                <button
                                                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm flex items-center"
                                                    onClick={() => handleExport("csv")}
                                                >
                                                    <MdFileDownload className="mr-1" /> CSV
                                                </button>
                                                <button
                                                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md shadow-sm flex items-center"
                                                    onClick={() => handleExport("excel")}
                                                >
                                                    <MdFileDownload className="mr-1" /> Excel
                                                </button>
                                                <button
                                                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md shadow-sm flex items-center"
                                                    onClick={() => handleExport("pdf")}
                                                >
                                                    <MdFileDownload className="mr-1" /> PDF
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h3 className="text-md font-medium text-gray-700 mb-4">Schedule Reports</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Report Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter report name"
                                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Frequency
                                            </label>
                                            <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                <option value="daily">Daily</option>
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="quarterly">Quarterly</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Recipients
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter email addresses"
                                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm flex items-center justify-center">
                                                Schedule Report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 border border-gray-200 rounded-lg p-4">
                                <h3 className="text-md font-medium text-gray-700 mb-4">Scheduled Reports</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Report Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Frequency
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Recipients
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Last Generated
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    System Weekly Summary
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Weekly
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    admin@polimdo.ac.id
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    2025-04-14
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    Monthly User Activity
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Monthly
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    wadir@polimdo.ac.id
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    2025-04-01
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SystemMonitoring;
