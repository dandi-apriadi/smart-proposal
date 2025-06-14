import React, { useState, useEffect } from "react";
import Card from "components/card";
import {
    MdPeople,
    MdAccessTime,
    MdFilterList,
    MdOutlineLogin,
    MdEdit,
    MdDelete,
    MdCloudUpload,
    MdVisibility,
    MdSearch,
    MdDownload,
    MdDone,
    MdRefresh
} from "react-icons/md";
import { Avatar, Chip, Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import { format, formatDistance } from "date-fns";
import { Line } from "react-chartjs-2"; // Changed from Area to Line
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip as ChartTooltip,
    Filler,
    Legend
} from "chart.js";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ChartTooltip,
    Filler,
    Legend
);

// Dummy data for the component
const dummyActivities = [
    {
        id: 1,
        user: {
            name: "Dr. Agus Sutanto",
            email: "agus.sutanto@polimdo.ac.id",
            role: "dosen",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        type: "upload",
        action: "Uploaded a new proposal",
        details: "Pengembangan Sistem Keamanan IoT Berbasis Blockchain",
        timestamp: new Date(2025, 3, 15, 10, 30).toISOString()
    },
    {
        id: 2,
        user: {
            name: "Dra. Maria Tanumihardja",
            email: "maria.t@polimdo.ac.id",
            role: "reviewer",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg"
        },
        type: "review",
        action: "Reviewed a proposal",
        details: "Provided feedback on 'Pengembangan Aplikasi Mobile untuk Monitoring Kualitas Air'",
        timestamp: new Date(2025, 3, 15, 9, 45).toISOString()
    },
    {
        id: 3,
        user: {
            name: "Prof. Bambang Wijaya",
            email: "bambang.wijaya@polimdo.ac.id",
            role: "wadir",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg"
        },
        type: "approve",
        action: "Approved a proposal",
        details: "Approved 'Sistem Pendukung Keputusan untuk Optimalisasi Energi di Kampus'",
        timestamp: new Date(2025, 3, 15, 8, 20).toISOString()
    },
    {
        id: 4,
        user: {
            name: "Siti Rahayu, M.Kom",
            email: "siti.rahayu@polimdo.ac.id",
            role: "dosen",
            avatar: "https://randomuser.me/api/portraits/women/4.jpg"
        },
        type: "edit",
        action: "Updated a proposal",
        details: "Made revisions to 'Implementasi Augmented Reality untuk Pembelajaran Anatomi'",
        timestamp: new Date(2025, 3, 14, 16, 15).toISOString()
    },
    {
        id: 5,
        user: {
            name: "Dr. Anton Nugroho",
            email: "anton.n@polimdo.ac.id",
            role: "admin",
            avatar: "https://randomuser.me/api/portraits/men/5.jpg"
        },
        type: "login",
        action: "System login",
        details: "Admin login from IP 10.25.63.41",
        timestamp: new Date(2025, 3, 14, 15, 0).toISOString()
    },
    {
        id: 6,
        user: {
            name: "Rini Handayani, S.T.",
            email: "rini.h@polimdo.ac.id",
            role: "dosen",
            avatar: "https://randomuser.me/api/portraits/women/6.jpg"
        },
        type: "view",
        action: "Viewed proposal guidelines",
        details: "Accessed 'Format Standar Proposal Pengadaan 2025' document",
        timestamp: new Date(2025, 3, 14, 14, 30).toISOString()
    },
    {
        id: 7,
        user: {
            name: "Dr. Hendro Wicaksono",
            email: "hendro.w@polimdo.ac.id",
            role: "dosen",
            avatar: "https://randomuser.me/api/portraits/men/7.jpg"
        },
        type: "delete",
        action: "Deleted draft proposal",
        details: "Removed draft 'Analisis Performa Jaringan dengan Machine Learning'",
        timestamp: new Date(2025, 3, 14, 13, 15).toISOString()
    }
];

const dummyMetrics = {
    activeUsers: 42,
    totalUsers: 78,
    loginCount: 35,
    totalActions: 145,
    hourlyActivity: [
        { hour: "08:00", count: 5 },
        { hour: "09:00", count: 12 },
        { hour: "10:00", count: 18 },
        { hour: "11:00", count: 15 },
        { hour: "12:00", count: 8 },
        { hour: "13:00", count: 10 },
        { hour: "14:00", count: 22 },
        { hour: "15:00", count: 28 },
        { hour: "16:00", count: 16 },
        { hour: "17:00", count: 11 }
    ]
};

const UserActivity = () => {
    const [activities, setActivities] = useState(dummyActivities);
    const [metrics, setMetrics] = useState(dummyMetrics);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [timeRange, setTimeRange] = useState("today");
    const [anchorEl, setAnchorEl] = useState(null);
    const [timeAnchorEl, setTimeAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Filter activities based on type and search query
    const filteredActivities = activities.filter(activity => {
        // Filter by type
        if (filter !== "all" && activity.type.toLowerCase() !== filter.toLowerCase()) {
            return false;
        }

        // Filter by search query
        if (searchQuery === "") return true;

        const searchLower = searchQuery.toLowerCase();
        return (
            activity.user.name.toLowerCase().includes(searchLower) ||
            activity.user.email.toLowerCase().includes(searchLower) ||
            activity.action.toLowerCase().includes(searchLower) ||
            activity.details.toLowerCase().includes(searchLower)
        );
    });

    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        handleFilterClose();
    };

    const handleTimeClick = (event) => {
        setTimeAnchorEl(event.currentTarget);
    };

    const handleTimeClose = () => {
        setTimeAnchorEl(null);
    };

    const handleTimeChange = (newTime) => {
        setTimeRange(newTime);
        handleTimeClose();

        // Simulate different data for different time ranges
        if (newTime === "week") {
            setMetrics({
                ...metrics,
                activeUsers: 65,
                totalUsers: 78,
                loginCount: 189,
                totalActions: 547
            });
        } else if (newTime === "month") {
            setMetrics({
                ...metrics,
                activeUsers: 72,
                totalUsers: 78,
                loginCount: 680,
                totalActions: 1893
            });
        } else {
            setMetrics(dummyMetrics);
        }
    };

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 800);
    };

    const getActivityIcon = (type) => {
        switch (type.toLowerCase()) {
            case "login":
                return <MdOutlineLogin className="text-blue-500" />;
            case "edit":
                return <MdEdit className="text-yellow-500" />;
            case "upload":
                return <MdCloudUpload className="text-purple-500" />;
            case "view":
                return <MdVisibility className="text-green-500" />;
            case "delete":
                return <MdDelete className="text-red-500" />;
            case "approve":
                return <MdDone className="text-green-600" />;
            default:
                return <MdAccessTime className="text-gray-500" />;
        }
    };

    const getRoleColor = (role) => {
        switch (role.toLowerCase()) {
            case "admin":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            case "reviewer":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
            case "dosen":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
            case "wadir":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
        }
    };

    // Chart data
    const activityChartData = {
        labels: metrics.hourlyActivity.map(item => item.hour),
        datasets: [
            {
                fill: true,
                label: 'User Activities',
                data: metrics.hourlyActivity.map(item => item.count),
                borderColor: 'rgba(56, 178, 172, 1)',
                backgroundColor: 'rgba(56, 178, 172, 0.3)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(17, 24, 39, 0.9)",
                titleFont: {
                    family: "'DM Sans', sans-serif",
                    size: 13,
                },
                bodyFont: {
                    family: "'DM Sans', sans-serif",
                    size: 12,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(156, 163, 175, 0.2)",
                },
                ticks: {
                    font: {
                        family: "'DM Sans', sans-serif",
                        size: 11,
                    },
                    color: "#64748b",
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        family: "'DM Sans', sans-serif",
                        size: 11,
                    },
                    color: "#64748b",
                    maxRotation: 45,
                    minRotation: 45,
                },
            },
        },
    };

    if (loading) {
        return (
            <Card extra={"w-full p-4 border-none shadow-md transition-all duration-200"}>
                <div className="animate-pulse">
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-8 bg-gray-200 dark:bg-navy-700 rounded-lg w-48"></div>
                        <div className="h-8 bg-gray-200 dark:bg-navy-700 rounded-lg w-32"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-200 dark:bg-navy-700 rounded-xl"></div>
                        ))}
                    </div>
                    <div className="h-56 bg-gray-200 dark:bg-navy-700 rounded-xl mb-6"></div>
                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-start space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-navy-600"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 dark:bg-navy-700 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-200 dark:bg-navy-700 rounded w-1/2 mb-2"></div>
                                    <div className="h-3 bg-gray-200 dark:bg-navy-700 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card extra={"w-full p-4 lg:p-5 border-none shadow-lg hover:shadow-xl transition-all duration-300"}>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between mb-8">
                <div className="flex items-center">
                    <div className="p-2 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg shadow-md mr-3">
                        <MdPeople className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                        User Activity
                    </h4>
                </div>
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    {/* Search input and action buttons */}
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search activities..."
                            className="pl-9 pr-4 py-2 rounded-xl border border-gray-300 dark:border-navy-600 
                            dark:bg-navy-800 text-sm transition-all duration-200 
                            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                            dark:text-white w-full sm:w-auto min-w-[200px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <MdSearch className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400 group-focus-within:text-brand-500 transition-colors duration-200" />
                    </div>
                    {/* Rest of the header buttons */}
                    <Tooltip title="Filter by activity type">
                        <IconButton
                            size="small"
                            onClick={handleFilterClick}
                            className="p-1.5 bg-white dark:bg-navy-700 border border-gray-300 dark:border-navy-600 rounded-lg shadow-sm"
                        >
                            <MdFilterList className="text-gray-600 dark:text-gray-300" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleFilterClose}
                    >
                        <MenuItem onClick={() => handleFilterChange("all")}>All Activities</MenuItem>
                        <MenuItem onClick={() => handleFilterChange("login")}>Logins</MenuItem>
                        <MenuItem onClick={() => handleFilterChange("edit")}>Edits</MenuItem>
                        <MenuItem onClick={() => handleFilterChange("upload")}>Uploads</MenuItem>
                        <MenuItem onClick={() => handleFilterChange("view")}>Views</MenuItem>
                        <MenuItem onClick={() => handleFilterChange("delete")}>Deletions</MenuItem>
                        <MenuItem onClick={() => handleFilterChange("approve")}>Approvals</MenuItem>
                    </Menu>
                    <Tooltip title="Time range">
                        <IconButton
                            size="small"
                            onClick={handleTimeClick}
                            className="p-1.5 bg-white dark:bg-navy-700 border border-gray-300 dark:border-navy-600 rounded-lg shadow-sm"
                        >
                            <MdAccessTime className="text-gray-600 dark:text-gray-300" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={timeAnchorEl}
                        open={Boolean(timeAnchorEl)}
                        onClose={handleTimeClose}
                    >
                        <MenuItem onClick={() => handleTimeChange("today")}>Today</MenuItem>
                        <MenuItem onClick={() => handleTimeChange("week")}>This Week</MenuItem>
                        <MenuItem onClick={() => handleTimeChange("month")}>This Month</MenuItem>
                    </Menu>
                    <Tooltip title="Refresh data">
                        <IconButton
                            size="small"
                            onClick={handleRefresh}
                            className="p-1.5 bg-white dark:bg-navy-700 border border-gray-300 dark:border-navy-600 rounded-lg shadow-sm"
                        >
                            <MdRefresh className="text-gray-600 dark:text-gray-300" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Export data">
                        <IconButton
                            size="small"
                            className="p-1.5 bg-white dark:bg-navy-700 border border-gray-300 dark:border-navy-600 rounded-lg shadow-sm"
                        >
                            <MdDownload className="text-gray-600 dark:text-gray-300" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>

            {/* Activity Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card extra={"!p-4 flex items-center"}>
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
                        <MdPeople className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                        <div className="flex items-baseline">
                            <h4 className="text-xl font-bold text-navy-700 dark:text-white mr-2">{metrics.activeUsers}</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                of {metrics.totalUsers} total
                            </span>
                        </div>
                    </div>
                </Card>
                <Card extra={"!p-4 flex items-center"}>
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full mr-4">
                        <MdOutlineLogin className="h-6 w-6 text-green-500 dark:text-green-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Login Count</p>
                        <div className="flex items-baseline">
                            <h4 className="text-xl font-bold text-navy-700 dark:text-white mr-2">{metrics.loginCount}</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                in {timeRange === "today" ? "24h" : timeRange === "week" ? "7d" : "30d"}
                            </span>
                        </div>
                    </div>
                </Card>
                <Card extra={"!p-4 flex items-center"}>
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full mr-4">
                        <MdEdit className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Actions</p>
                        <div className="flex items-baseline">
                            <h4 className="text-xl font-bold text-navy-700 dark:text-white mr-2">{metrics.totalActions}</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                in {timeRange === "today" ? "24h" : timeRange === "week" ? "7d" : "30d"}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Activity Chart */}
            <Card extra={"!p-4 lg:p-5 mb-8 hover:shadow-lg dark:hover:shadow-navy-500/20 transition-all duration-300"}>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center">
                        <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-lg mr-3">
                            <MdAccessTime className="h-5 w-5 text-brand-500 dark:text-brand-400" />
                        </div>
                        <h5 className="text-base font-bold text-navy-700 dark:text-white">
                            Activity Timeline
                        </h5>
                    </div>
                    <Chip
                        label={timeRange === "today" ? "Today" : timeRange === "week" ? "This Week" : "This Month"}
                        size="small"
                        color="primary"
                        variant="outlined"
                        className="text-xs bg-brand-50 dark:bg-navy-800 border-brand-200 dark:border-brand-700"
                    />
                </div>
                <div className="h-56 lg:h-64">
                    <Line
                        data={activityChartData}
                        options={chartOptions}
                    />
                </div>
            </Card>

            {/* Activity Feed */}
            <div className="space-y-4">
                {filteredActivities.map(activity => (
                    <div key={activity.id} className="flex items-start space-x-3 p-4 bg-white dark:bg-navy-700 rounded-lg shadow-md">
                        <Avatar src={activity.user.avatar} alt={activity.user.name} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center space-x-2">
                                    <h5 className="text-sm font-semibold text-navy-700 dark:text-white">{activity.user.name}</h5>
                                    <Chip
                                        label={activity.user.role}
                                        size="small"
                                        className={`text-xs ${getRoleColor(activity.user.role)}`}
                                    />
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatDistance(new Date(activity.timestamp), new Date(), { addSuffix: true })}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{activity.action}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{activity.details}</p>
                        </div>
                        <div className="flex-shrink-0">
                            {getActivityIcon(activity.type)}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default UserActivity;