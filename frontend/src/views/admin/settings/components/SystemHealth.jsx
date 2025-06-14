import React, { useState, useEffect } from "react";
import {
    MdRefresh,
    MdOutlineSpeed,
    MdMemory,
    MdStorage,
    MdNetworkCheck,
    MdDns,
    MdSecurity,
    MdBackup,
    MdErrorOutline,
    MdNotifications,
    MdWarning,
    MdCheckCircle,
    MdTimeline,
    MdDownload,
    MdRestartAlt,
    MdCached,
    MdDeleteSweep,
    MdBuildCircle,
    MdPeople,
    MdDatasetLinked
} from "react-icons/md";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Tooltip,
    Progress,
    Button,
    Switch,
} from "@material-tailwind/react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    ArcElement,
    BarElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ChartTooltip,
    Legend,
    ArcElement,
    BarElement
);

const SystemHealth = () => {
    // System status states
    const [systemStatus, setSystemStatus] = useState({
        overall: "healthy", // healthy, warning, critical
        cpu: 28,
        memory: 42,
        disk: 65,
        network: 15,
        database: "connected",
        api: "operational",
        jobs: "running",
        lastRefresh: new Date().toLocaleTimeString(),
    });

    // Alert states
    const [alerts, setAlerts] = useState([
        {
            id: 1,
            type: "warning",
            message: "High memory usage detected",
            timestamp: "10:23 AM",
            component: "Web Server",
        },
        {
            id: 2,
            type: "error",
            message: "Database connection timeout",
            timestamp: "09:45 AM",
            component: "Database",
        },
        {
            id: 3,
            type: "info",
            message: "System backup completed successfully",
            timestamp: "08:30 AM",
            component: "Backup Service",
        },
    ]);

    // Service status states
    const [services, setServices] = useState([
        { name: "Web Server", status: "operational", uptime: "25d 14h 23m" },
        { name: "Database", status: "operational", uptime: "25d 14h 23m" },
        { name: "API Services", status: "operational", uptime: "25d 14h 23m" },
        { name: "Background Jobs", status: "operational", uptime: "25d 14h 23m" },
        { name: "ML Service", status: "warning", uptime: "12h 45m" },
        { name: "Storage Service", status: "operational", uptime: "25d 14h 23m" },
    ]);

    // Security status
    const [securityStatus, setSecurityStatus] = useState({
        lastScan: "2025-04-22 13:45",
        vulnerabilities: 3,
        criticalIssues: 0,
        recommendations: 5,
    });

    // Backup status
    const [backupStatus, setBackupStatus] = useState({
        lastBackup: "2025-04-23 02:30",
        nextScheduled: "2025-04-24 02:30",
        backupSize: "4.2 GB",
        totalBackups: 30,
    });

    // Performance history for chart
    const [performanceHistory, setPerformanceHistory] = useState({
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
            {
                label: 'CPU Usage',
                data: [25, 30, 22, 28, 32, 24, 28],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Memory Usage',
                data: [40, 45, 38, 42, 48, 44, 42],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Disk I/O',
                data: [10, 15, 12, 14, 16, 13, 15],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    });

    // Error distribution for chart
    const [errorDistribution, setErrorDistribution] = useState({
        labels: ['API Errors', 'Database Errors', 'Authentication Errors', 'Processing Errors'],
        datasets: [
            {
                label: 'Error Count',
                data: [12, 19, 8, 5],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    });

    // User activity for chart
    const [userActivity, setUserActivity] = useState({
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'User Sessions',
                data: [120, 190, 210, 180, 200, 90, 75],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    });

    // Log statistics
    const [logStats, setLogStats] = useState({
        totalLogs: 12548,
        errorLogs: 248,
        warningLogs: 645,
        infoLogs: 11655,
    });

    // Automated maintenance
    const [autoMaintenance, setAutoMaintenance] = useState({
        cacheClearing: true,
        logRotation: true,
        indexRebuild: false,
        errorReporting: true,
    });

    // Refresh data function
    const refreshData = () => {
        // Here you would fetch fresh data from the server
        // For now, we'll just update the last refresh time
        setSystemStatus({
            ...systemStatus,
            lastRefresh: new Date().toLocaleTimeString()
        });
    };

    // Chart options
    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'System Performance History',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            }
        }
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Error Distribution',
            },
        },
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'User Activity (Last 7 Days)',
            },
        },
    };

    // Toggle automated maintenance
    const toggleMaintenance = (key) => {
        setAutoMaintenance({
            ...autoMaintenance,
            [key]: !autoMaintenance[key]
        });
    };

    // Status Badge component
    const StatusBadge = ({ status }) => {
        let color, text, icon;

        switch (status) {
            case "critical":
            case "error":
                color = "bg-red-100 text-red-800";
                text = "Critical";
                icon = <MdErrorOutline className="mr-1" />;
                break;
            case "warning":
                color = "bg-yellow-100 text-yellow-800";
                text = "Warning";
                icon = <MdWarning className="mr-1" />;
                break;
            case "healthy":
            case "operational":
                color = "bg-green-100 text-green-800";
                text = "Healthy";
                icon = <MdCheckCircle className="mr-1" />;
                break;
            default:
                color = "bg-gray-100 text-gray-800";
                text = "Unknown";
                icon = <MdErrorOutline className="mr-1" />;
        }

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
                {icon}{text}
            </span>
        );
    };

    // Metric Card component
    const MetricCard = ({ title, value, icon, color, description, footer }) => (
        <Card className="shadow-md h-full">
            <CardHeader color={color} className="relative h-16 flex items-center">
                <div className="absolute -bottom-6 left-4 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                    {icon}
                </div>
            </CardHeader>
            <CardBody className="pt-8 pb-4">
                <h5 className="text-gray-700 text-lg font-medium">{title}</h5>
                <div className="mt-2 mb-1">
                    <span className="text-3xl font-bold text-gray-900">{value}</span>
                </div>
                <p className="text-sm text-gray-600">{description}</p>
            </CardBody>
            {footer && (
                <CardFooter divider className="py-2 px-4">
                    {footer}
                </CardFooter>
            )}
        </Card>
    );

    return (
        <div className="system-health" data-aos="fade-up">
            {/* Header Section */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        System Health
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Monitor and maintain system performance and stability
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                    <span className="text-sm text-gray-500 mr-3">
                        Last updated: {systemStatus.lastRefresh}
                    </span>
                    <Button
                        onClick={refreshData}
                        className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-lg text-white"
                    >
                        <MdRefresh className="text-lg" /> Refresh
                    </Button>
                </div>
            </div>

            {/* Status Overview Section */}
            <div className="mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="mr-4">
                                {systemStatus.overall === "healthy" ? (
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                        <MdCheckCircle className="text-green-500 text-2xl" />
                                    </div>
                                ) : systemStatus.overall === "warning" ? (
                                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                        <MdWarning className="text-yellow-500 text-2xl" />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                        <MdErrorOutline className="text-red-500 text-2xl" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    System Health Status
                                </h3>
                                <div className="mt-1">
                                    <StatusBadge status={systemStatus.overall} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                            <Button
                                className="flex items-center gap-2 bg-indigo-500 px-3 py-2 rounded-lg text-white"
                            >
                                <MdDownload className="text-lg" /> Export Report
                            </Button>
                            <Button
                                className="flex items-center gap-2 bg-amber-500 px-3 py-2 rounded-lg text-white"
                            >
                                <MdRestartAlt className="text-lg" /> Restart Services
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* CPU Usage */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <MdOutlineSpeed className="text-blue-500 text-xl mr-2" />
                                <h4 className="text-gray-700 dark:text-gray-200 font-medium">CPU Usage</h4>
                            </div>
                            <div className="mb-2">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Current</span>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{systemStatus.cpu}%</span>
                                </div>
                                <Progress value={systemStatus.cpu} color={systemStatus.cpu > 80 ? "red" : systemStatus.cpu > 60 ? "amber" : "blue"} />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">4 Core / 8 Threads - 3.6GHz</p>
                        </div>

                        {/* Memory Usage */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <MdMemory className="text-purple-500 text-xl mr-2" />
                                <h4 className="text-gray-700 dark:text-gray-200 font-medium">Memory Usage</h4>
                            </div>
                            <div className="mb-2">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Current</span>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{systemStatus.memory}%</span>
                                </div>
                                <Progress value={systemStatus.memory} color={systemStatus.memory > 80 ? "red" : systemStatus.memory > 60 ? "amber" : "blue"} />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">6.8 GB / 16 GB Used</p>
                        </div>

                        {/* Disk Usage */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <MdStorage className="text-green-500 text-xl mr-2" />
                                <h4 className="text-gray-700 dark:text-gray-200 font-medium">Disk Usage</h4>
                            </div>
                            <div className="mb-2">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Current</span>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{systemStatus.disk}%</span>
                                </div>
                                <Progress value={systemStatus.disk} color={systemStatus.disk > 80 ? "red" : systemStatus.disk > 60 ? "amber" : "blue"} />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">325 GB / 500 GB Used</p>
                        </div>

                        {/* Network Usage */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <MdNetworkCheck className="text-cyan-500 text-xl mr-2" />
                                <h4 className="text-gray-700 dark:text-gray-200 font-medium">Network</h4>
                            </div>
                            <div className="mb-2">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Current</span>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{systemStatus.network}%</span>
                                </div>
                                <Progress value={systemStatus.network} color="blue" />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">2.5 MB/s Download • 1.2 MB/s Upload</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Performance History Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <Line data={performanceHistory} options={lineChartOptions} />
                </div>

                {/* Error Distribution Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <Doughnut data={errorDistribution} options={doughnutOptions} />
                </div>
            </div>

            {/* Service Status Section */}
            <div className="mb-8">
                <div className="flex items-center mb-4">
                    <MdDns className="text-lg mr-2 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Service Status</h3>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Service
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Uptime
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {services.map((service, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : ''}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {service.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        <StatusBadge status={service.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {service.uptime}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                                            onClick={() => console.log(`Restart ${service.name}`)}
                                        >
                                            Restart
                                        </button>
                                        <button
                                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                            onClick={() => console.log(`View logs for ${service.name}`)}
                                        >
                                            View Logs
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Alerts Section */}
            <div className="mb-8">
                <div className="flex items-center mb-4">
                    <MdNotifications className="text-lg mr-2 text-amber-500" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Alerts</h3>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    {alerts.length > 0 ? (
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {alerts.map((alert) => (
                                <div key={alert.id} className="py-4 first:pt-0 last:pb-0">
                                    <div className="flex items-start">
                                        <div className="mr-3 mt-0.5">
                                            {alert.type === "error" ? (
                                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                                    <MdErrorOutline className="text-red-500 text-lg" />
                                                </div>
                                            ) : alert.type === "warning" ? (
                                                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                                    <MdWarning className="text-yellow-500 text-lg" />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <MdCheckCircle className="text-blue-500 text-lg" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`text-sm font-medium ${alert.type === "error"
                                                ? "text-red-800 dark:text-red-400"
                                                : alert.type === "warning"
                                                    ? "text-yellow-800 dark:text-yellow-400"
                                                    : "text-blue-800 dark:text-blue-400"
                                                }`}>
                                                {alert.component}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                {alert.message}
                                            </p>
                                            <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                <span>{alert.timestamp}</span>
                                                <span className="mx-1">•</span>
                                                <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <MdCheckCircle className="mx-auto text-green-500 text-4xl mb-3" />
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">All Systems Operational</h4>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">No active alerts at this time.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Additional System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {/* User Activity Card */}
                <MetricCard
                    title="Active Users"
                    value="128"
                    icon={<MdPeople className="text-blue-500 text-2xl" />}
                    color="blue"
                    description="Current active users in the system"
                    footer={<p className="text-xs text-green-600">↑ 12% from yesterday</p>}
                />

                {/* Average Response Time */}
                <MetricCard
                    title="Response Time"
                    value="238ms"
                    icon={<MdTimeline className="text-purple-500 text-2xl" />}
                    color="purple"
                    description="Average API response time"
                    footer={<p className="text-xs text-red-600">↑ 15ms from average</p>}
                />

                {/* DB Connections */}
                <MetricCard
                    title="DB Connections"
                    value="42"
                    icon={<MdDatasetLinked className="text-green-500 text-2xl" />}
                    color="green"
                    description="Active database connections"
                    footer={<p className="text-xs text-gray-600">Max pool: 100</p>}
                />

                {/* Error Rate */}
                <MetricCard
                    title="Error Rate"
                    value="0.8%"
                    icon={<MdErrorOutline className="text-red-500 text-2xl" />}
                    color="red"
                    description="System-wide error percentage"
                    footer={<p className="text-xs text-green-600">↓ 0.3% from yesterday</p>}
                />
            </div>

            {/* User Activity Chart */}
            <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <Bar data={userActivity} options={barChartOptions} />
            </div>

            {/* Maintenance and Security */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Automated Maintenance */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                        <MdBuildCircle className="text-lg mr-2 text-blue-600" />
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Automated Maintenance</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <MdCached className="text-gray-500 mr-2" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Cache Clearing</span>
                            </div>
                            <Switch
                                color="blue"
                                checked={autoMaintenance.cacheClearing}
                                onChange={() => toggleMaintenance('cacheClearing')}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <MdDeleteSweep className="text-gray-500 mr-2" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Log Rotation</span>
                            </div>
                            <Switch
                                color="blue"
                                checked={autoMaintenance.logRotation}
                                onChange={() => toggleMaintenance('logRotation')}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <MdStorage className="text-gray-500 mr-2" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Index Rebuild</span>
                            </div>
                            <Switch
                                color="blue"
                                checked={autoMaintenance.indexRebuild}
                                onChange={() => toggleMaintenance('indexRebuild')}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <MdErrorOutline className="text-gray-500 mr-2" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Error Reporting</span>
                            </div>
                            <Switch
                                color="blue"
                                checked={autoMaintenance.errorReporting}
                                onChange={() => toggleMaintenance('errorReporting')}
                            />
                        </div>
                    </div>
                </div>

                {/* Security Status */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                        <MdSecurity className="text-lg mr-2 text-green-600" />
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Security Status</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Last Security Scan</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{securityStatus.lastScan}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Vulnerabilities Detected</span>
                            <span className={`text-sm font-medium ${securityStatus.vulnerabilities > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                                {securityStatus.vulnerabilities}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Critical Issues</span>
                            <span className={`text-sm font-medium ${securityStatus.criticalIssues > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {securityStatus.criticalIssues}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Security Recommendations</span>
                            <span className="text-sm font-medium text-blue-600">
                                {securityStatus.recommendations}
                            </span>
                        </div>
                        <div className="pt-4">
                            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                                Run Security Scan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backup Status */}
            <div className="mb-8">
                <div className="flex items-center mb-4">
                    <MdBackup className="text-lg mr-2 text-purple-600" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Backup Status</h3>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Last Successful Backup</h4>
                            <p className="text-gray-900 dark:text-white font-medium">{backupStatus.lastBackup}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Next Scheduled Backup</h4>
                            <p className="text-gray-900 dark:text-white font-medium">{backupStatus.nextScheduled}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Backup Size</h4>
                            <p className="text-gray-900 dark:text-white font-medium">{backupStatus.backupSize}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Backups</h4>
                            <p className="text-gray-900 dark:text-white font-medium">{backupStatus.totalBackups}</p>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                        <button className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center">
                            <MdBackup className="mr-2" /> Manual Backup
                        </button>
                        <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center">
                            <MdTimeline className="mr-2" /> Backup History
                        </button>
                    </div>
                </div>
            </div>

            {/* Log Statistics */}
            <div className="mb-8">
                <div className="flex items-center mb-4">
                    <MdTimeline className="text-lg mr-2 text-indigo-600" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Log Statistics</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Logs</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{logStats.totalLogs.toLocaleString()}</h3>
                            </div>
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-full">
                                <MdTimeline className="text-indigo-500 text-xl" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Error Logs</p>
                                <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">{logStats.errorLogs.toLocaleString()}</h3>
                            </div>
                            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                                <MdErrorOutline className="text-red-500 text-xl" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Warning Logs</p>
                                <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{logStats.warningLogs.toLocaleString()}</h3>
                            </div>
                            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                                <MdWarning className="text-yellow-500 text-xl" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Info Logs</p>
                                <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{logStats.infoLogs.toLocaleString()}</h3>
                            </div>
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                                <MdCheckCircle className="text-blue-500 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg flex items-center justify-center">
                    <MdRestartAlt className="mr-2" /> Restart System
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center">
                    <MdCached className="mr-2" /> Clear Cache
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center">
                    <MdDownload className="mr-2" /> Download System Report
                </button>
            </div>
        </div>
    );
};

export default SystemHealth;
