import React, { useState, useEffect } from "react";
import { MdOutlineBarChart, MdOutlineCheckCircle, MdOutlineCloud, MdPeopleOutline, MdOutlineDescription, MdOutlineNotificationsActive, MdOutlineHealthAndSafety, MdOutlineSettings, MdTrendingUp, MdTrendingDown, MdOutlineWarning, MdOutlineSchedule, MdOutlineMemory, MdOutlineSecurity, MdOutlineAttachMoney, MdOutlineSpeed, MdOutlineRefresh, MdOutlineAdd, MdOutlineSearch, MdOutlineAnalytics } from "react-icons/md";
import Card from "components/card";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Create fallback chart components that don't depend on Chart.js
const FallbackLineChart = ({ chartData }) => {
    const [hoveredBar, setHoveredBar] = useState(null);
    const [isAnimated, setIsAnimated] = useState(false);
    const maxValue = Math.max(...chartData.datasets[0].data);
    const avgValue = Math.round(chartData.datasets[0].data.reduce((a, b) => a + b, 0) / chartData.datasets[0].data.length);

    // Animate bars on initial render
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimated(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // Calculate min and max for highlights
    const maxIndex = chartData.datasets[0].data.indexOf(maxValue);
    const minValue = Math.min(...chartData.datasets[0].data);
    const minIndex = chartData.datasets[0].data.indexOf(minValue);

    // Format value with commas for better readability
    const formatValue = (val) => {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Improved y-axis with more readable labels
    const yAxisLabels = [
        0,
        Math.round(maxValue / 4),
        Math.round(maxValue / 2),
        Math.round(maxValue * 3 / 4),
        maxValue
    ];

    return (
        <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl p-5 dark:bg-navy-800 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between w-full mb-3">
                <div className="flex items-center">
                    <div className="p-1.5 rounded-full bg-brand-50 text-brand-500 mr-2">
                        <MdOutlineBarChart size={20} />
                    </div>
                    <p className="text-gray-800 font-medium dark:text-white text-base">User Activity</p>
                </div>

                {/* Enhanced average metric display */}
                <div className="flex items-center text-xs font-medium px-2.5 py-1.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <span>Average: {formatValue(avgValue)}</span>
                </div>
            </div>

            {/* Chart container with improved y-axis */}
            <div className="relative w-full h-44 mt-1 flex">
                {/* Better spaced Y-axis labels */}
                <div className="flex flex-col justify-between h-full pr-3 text-xs font-medium text-gray-500 dark:text-gray-400 min-w-[30px]">
                    {yAxisLabels.reverse().map((label, idx) => (
                        <span key={idx} className="text-right">{formatValue(label)}</span>
                    ))}
                </div>

                {/* Chart area with more readable grid */}
                <div className="relative flex-1 h-full">
                    {/* Enhanced grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        {yAxisLabels.map((_, i) => (
                            <div key={i} className="w-full h-px bg-gray-100 dark:bg-navy-600" />
                        ))}
                    </div>

                    {/* More visible average line */}
                    <div className="absolute w-full h-[2px] bg-blue-400 dark:bg-blue-500 z-10 border-t border-b border-blue-300 dark:border-blue-600"
                        style={{ top: `${100 - (avgValue / maxValue * 100)}%` }}>
                        <div className="absolute right-0 -top-4 text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full dark:bg-blue-900/50 dark:text-blue-400">
                            Avg: {formatValue(avgValue)}
                        </div>
                    </div>

                    {/* Bars with enhanced spacing and readability */}
                    <div className="absolute inset-0 flex items-end justify-between px-1">
                        {chartData.datasets[0].data.map((value, index) => {
                            const height = (value / maxValue) * 100;
                            const isActive = hoveredBar === index;
                            const isMax = index === maxIndex;
                            const isMin = index === minIndex;

                            // More accessible color scheme
                            let barColor = 'bg-gradient-to-t from-indigo-400 to-indigo-500';
                            if (isActive) barColor = 'bg-gradient-to-t from-blue-500 to-blue-400';
                            if (isMax) barColor = 'bg-gradient-to-t from-green-500 to-green-400';
                            if (isMin) barColor = 'bg-gradient-to-t from-amber-500 to-amber-400';

                            return (
                                <div
                                    key={index}
                                    className="group relative flex-1 flex items-end justify-center mx-1"
                                    onMouseEnter={() => setHoveredBar(index)}
                                    onMouseLeave={() => setHoveredBar(null)}
                                >
                                    {/* More visible bar with clearer rounding */}
                                    <div
                                        className={`w-full transition-all duration-500 ease-out rounded-t-md ${barColor} border-t border-l border-r ${isActive ? 'border-blue-300' :
                                            isMax ? 'border-green-300' :
                                                isMin ? 'border-amber-300' : 'border-indigo-300'
                                            }`}
                                        style={{
                                            height: isAnimated ? `${height}%` : '0%',
                                            transform: isActive ? 'scaleY(1.05)' : 'scaleY(1)',
                                            transformOrigin: 'bottom',
                                            boxShadow: isActive ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
                                        }}
                                    >
                                        {/* Improved bar labels for max/min */}
                                        {(isMax || isMin) && !isActive && (
                                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-white shadow-sm">
                                                <span className={`${isMax ? 'text-green-600' : 'text-amber-600'}`}>
                                                    {isMax ? 'Highest' : 'Lowest'}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* More readable tooltip */}
                                    {isActive && (
                                        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-navy-900 text-xs rounded-lg shadow-lg z-10 p-3 min-w-[100px] border border-gray-100 dark:border-navy-700">
                                            <div className="font-semibold text-center text-gray-800 dark:text-white text-sm">{formatValue(value)}</div>
                                            <div className="text-xs text-center text-gray-500 font-medium mt-0.5">{chartData.labels[index]}</div>
                                            <div className="text-xs text-center mt-2 font-medium">
                                                {value > avgValue ? (
                                                    <span className="text-green-600 px-1.5 py-0.5 bg-green-50 rounded-full dark:bg-green-900/30 dark:text-green-400">
                                                        {Math.round((value - avgValue) / avgValue * 100)}% above avg
                                                    </span>
                                                ) : (
                                                    <span className="text-amber-600 px-1.5 py-0.5 bg-amber-50 rounded-full dark:bg-amber-900/30 dark:text-amber-400">
                                                        {Math.round((avgValue - value) / avgValue * 100)}% below avg
                                                    </span>
                                                )}
                                            </div>
                                            <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white dark:bg-navy-900 rotate-45 border-r border-b border-gray-100 dark:border-navy-700"></div>
                                        </div>
                                    )}

                                    {/* Month label under each bar */}
                                    <div className={`absolute -bottom-5 text-[9px] font-medium transform -translate-x-1/2 left-1/2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                        {chartData.labels[index].substring(0, 3)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Enhanced X-axis with better readability */}
            <div className="flex justify-between w-full mt-6 px-1 pt-1 border-t border-gray-100 dark:border-navy-700 text-xs text-gray-400">
                <span>Jan</span>
                <span className="text-gray-500 font-medium">2025</span>
                <span>Dec</span>
            </div>
        </div>
    );
};

// Replace the FallbackPieChart with FallbackRadialChart
const FallbackRadialChart = ({ chartData }) => {
    const [activeSegment, setActiveSegment] = useState(null);
    const [isAnimated, setIsAnimated] = useState(false);

    // Calculate total for percentages
    const total = chartData.datasets[0].data.reduce((sum, value) => sum + value, 0);

    // Animation effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimated(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // Color mappings
    const colors = [
        { main: "#10B981", light: "#D1FAE5", accent: "#34D399", label: "Approved" },
        { main: "#EF4444", light: "#FEE2E2", accent: "#F87171", label: "Rejected" },
        { main: "#F59E0B", light: "#FEF3C7", accent: "#FBBF24", label: "Pending" },
        { main: "#4318FF", light: "#E0E7FF", accent: "#6366F1", label: "Under Review" },
        { main: "#01B574", light: "#D1FAE5", accent: "#10B981", label: "Submitted" },
        { main: "#868CFF", light: "#E0E7FF", accent: "#8B5CF6", label: "Draft" }
    ];

    return (
        <div className="h-72 flex flex-col items-center justify-center bg-white rounded-xl p-3 dark:bg-navy-800 shadow-sm">
            <div className="flex flex-col items-center w-full">
                {/* Radial bars chart with clean modern design */}
                <div className="relative w-64 h-64">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Proposals</p>
                            <p className="text-3xl font-bold text-navy-700 dark:text-white">{total}</p>
                        </div>
                    </div>

                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Circles for each category */}
                        {chartData.datasets[0].data.map((value, index) => {
                            if (value === 0) return null;

                            const percentage = Math.round((value / total) * 100);
                            const isActive = activeSegment === index;

                            // Calculate dimensions for concentric circles
                            const radius = 38 - (index * 6);
                            const circumference = 2 * Math.PI * radius;
                            const strokeDashoffset = circumference * (1 - (isAnimated ? percentage / 100 : 0));
                            const strokeWidth = 5;

                            return (
                                <g key={index}
                                    onMouseEnter={() => setActiveSegment(index)}
                                    onMouseLeave={() => setActiveSegment(null)}
                                    className="cursor-pointer">
                                    {/* Enhanced background with subtle gradient */}
                                    <defs>
                                        <linearGradient id={`bg-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor={colors[index]?.light || "#E5E7EB"} stopOpacity="0.6" />
                                            <stop offset="100%" stopColor={colors[index]?.light || "#E5E7EB"} stopOpacity="0.3" />
                                        </linearGradient>
                                        <linearGradient id={`fg-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor={colors[index]?.main || "#6B7280"} />
                                            <stop offset="100%" stopColor={colors[index]?.accent || colors[index]?.main || "#6B7280"} />
                                        </linearGradient>
                                    </defs>

                                    {/* Pulsing background effect for active segment */}
                                    {isActive && (
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r={radius}
                                            fill="none"
                                            stroke={colors[index]?.main || "#6B7280"}
                                            strokeWidth={strokeWidth + 2}
                                            strokeOpacity="0.3"
                                            className="animate-pulse"
                                        />
                                    )}

                                    {/* Modern background circle with gradient */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r={radius}
                                        fill="none"
                                        stroke={`url(#bg-gradient-${index})`}
                                        strokeWidth={strokeWidth}
                                        className="transition-all duration-300 dark:opacity-40"
                                    />

                                    {/* Enhanced foreground progress circle with gradient and animations */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r={radius}
                                        fill="none"
                                        stroke={`url(#fg-gradient-${index})`}
                                        strokeWidth={isActive ? strokeWidth + 1 : strokeWidth}
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        transform="rotate(-90 50 50)"
                                        className="transition-all duration-1000 ease-out"
                                    />

                                    {/* Dynamic segment label with better positioning and styling */}
                                    <text
                                        x={50 + (radius * Math.cos(Math.PI * 0.75))}
                                        y={50 + (radius * Math.sin(Math.PI * 0.75))}
                                        fill={colors[index]?.main || "#6B7280"}
                                        fontSize={isActive ? "8" : "6"}
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className="pointer-events-none select-none transition-all duration-300"
                                    >
                                        {chartData.labels[index]}
                                    </text>

                                    {/* Enhanced percentage badge with animation for active segment */}
                                    {isActive && (
                                        <g className="animate-fadeIn">
                                            <circle
                                                cx={50 + (radius * Math.cos(-0.5 * Math.PI))}
                                                cy={50 + (radius * Math.sin(-0.5 * Math.PI))}
                                                r="12"
                                                fill="white"
                                                stroke={colors[index]?.main || "#6B7280"}
                                                strokeWidth="1.5"
                                                className="drop-shadow-md"
                                            />
                                            <text
                                                x={50 + (radius * Math.cos(-0.5 * Math.PI))}
                                                y={50 + (radius * Math.sin(-0.5 * Math.PI))}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                className="text-xs font-bold"
                                                fill={colors[index]?.main || "#6B7280"}
                                            >
                                                {percentage}%
                                            </text>
                                        </g>
                                    )}
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>
        </div>
    );
};

const SystemOverview = ({ apiData, isDemo }) => {
    const navigate = useNavigate();

    // Debug logging
    console.log('🔍 SystemOverview received apiData:', apiData);
    console.log('🔍 SystemOverview isDemo:', isDemo);    // Process API data with fallback values - Updated to match actual backend structure
    const processedData = {
        // Basic overview data from backend
        systemHealth: 98, // Mock data - backend doesn't provide system health yet
        activeUsers: apiData?.overview?.active_users || 0,
        activeSessions: 1, // This would come from session management
        totalProposals: apiData?.overview?.total_proposals || 0,
        totalUsers: apiData?.overview?.total_users || 0,
        totalDepartments: apiData?.overview?.total_departments || 0,

        // Proposal statistics from backend (proposal_stats array)
        pendingReviews: apiData?.proposal_stats?.find(p => p.status === 'pending')?.count ||
            apiData?.proposal_stats?.find(p => p.status === 'submitted')?.count || 0,
        approvedProposals: apiData?.proposal_stats?.find(p => p.status === 'approved')?.count || 0,
        rejectedProposals: apiData?.proposal_stats?.find(p => p.status === 'rejected')?.count || 0,
        underReviewProposals: apiData?.proposal_stats?.find(p => p.status === 'under_review')?.count || 0,

        // Recent activities from backend (already properly structured)
        recentActivities: apiData?.recent_activities || [],

        // Monthly trends from backend
        monthlyTrends: apiData?.monthly_trends || [],

        // Mock data for features not yet implemented in backend
        memoryUsage: Math.floor(Math.random() * 30) + 45, // 45-75%
        cpuUsage: Math.floor(Math.random() * 25) + 25, // 25-50%
        diskUsage: Math.floor(Math.random() * 40) + 30, // 30-70%
        databaseStatus: 'healthy', // Mock - should come from backend health check

        // Financial overview data (mock - not implemented in backend yet)
        totalBudget: 1500000, // Mock budget data
        usedBudget: 850000,
        pendingBudget: 320000,

        // Performance metrics (mock - not implemented in backend yet)
        avgResponseTime: Math.floor(Math.random() * 100) + 180, // 180-280ms
        successRate: 99.2,
        errorRate: 0.8,
        securityIncidents: 0,
        lastBackup: new Date().toISOString()
    };

    console.log('🔍 SystemOverview processedData:', processedData);

    // Calculate trends (simplified - in real app, this would compare with previous period)
    const calculateTrend = (current, category) => {
        // Mock trend calculation based on current values - in real app, this would use historical data
        const trends = {
            activeUsers: current > 10 ? "+12.5%" : "+5.2%",
            totalProposals: current > 15 ? "+5.8%" : "+2.1%",
            pendingReviews: current > 5 ? "-3.2%" : "+1.5%",
            approvedProposals: current > 8 ? "+7.2%" : "+4.8%"
        };
        return trends[category] || "+0%";
    };

    // Array of metric cards to display in the system overview
    const metricCards = [{
        title: "System Health",
        value: processedData.systemHealth + "%",
        icon: <MdOutlineHealthAndSafety className="h-7 w-7" />,
        iconBg: processedData.systemHealth > 95 ? "bg-green-100" : processedData.systemHealth > 85 ? "bg-yellow-100" : "bg-red-100",
        iconColor: processedData.systemHealth > 95 ? "text-green-700" : processedData.systemHealth > 85 ? "text-yellow-700" : "text-red-700",
        trend: processedData.databaseStatus === 'healthy' ? "Healthy" : "Check needed",
        trendColor: processedData.databaseStatus === 'healthy' ? "text-green-500" : "text-red-500",
        trendIcon: processedData.databaseStatus === 'healthy' ? <MdTrendingUp className="h-4 w-4" /> : <MdTrendingDown className="h-4 w-4" />,
    },
    {
        title: "Active Users",
        value: processedData.activeUsers.toLocaleString(),
        icon: <MdPeopleOutline className="h-7 w-7" />,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-700",
        trend: calculateTrend(processedData.activeUsers, 'activeUsers'),
        trendColor: "text-green-500",
        trendIcon: <MdTrendingUp className="h-4 w-4" />,
    },
    {
        title: "Total Users",
        value: processedData.totalUsers.toLocaleString(),
        icon: <MdPeopleOutline className="h-7 w-7" />,
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-700",
        trend: `${processedData.totalDepartments} Depts`,
        trendColor: "text-gray-500",
        trendIcon: <MdOutlineSettings className="h-4 w-4" />,
    },
    {
        title: "Total Proposals",
        value: processedData.totalProposals.toLocaleString(),
        icon: <MdOutlineDescription className="h-7 w-7" />,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-700",
        trend: calculateTrend(processedData.totalProposals, 'totalProposals'),
        trendColor: "text-green-500",
        trendIcon: <MdTrendingUp className="h-4 w-4" />,
    },
    {
        title: "Approved",
        value: processedData.approvedProposals.toLocaleString(),
        icon: <MdOutlineCheckCircle className="h-7 w-7" />,
        iconBg: "bg-green-100",
        iconColor: "text-green-700",
        trend: `${Math.round((processedData.approvedProposals / Math.max(processedData.totalProposals, 1)) * 100)}%`,
        trendColor: "text-green-500",
        trendIcon: <MdTrendingUp className="h-4 w-4" />,
    },
    {
        title: "Pending Reviews",
        value: processedData.pendingReviews.toLocaleString(),
        icon: <MdOutlineWarning className="h-7 w-7" />,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-700",
        trend: processedData.underReviewProposals > 0 ? `+${processedData.underReviewProposals} reviewing` : "No backlog",
        trendColor: processedData.pendingReviews > 10 ? "text-red-500" : "text-green-500",
        trendIcon: processedData.pendingReviews > 10 ? <MdTrendingDown className="h-4 w-4" /> : <MdTrendingUp className="h-4 w-4" />,
    },
    ];

    // Resource utilization data for progress bars
    const resourceMetrics = [
        { name: "Memory", value: processedData.memoryUsage, max: 100, color: "bg-blue-500", bgColor: "bg-blue-100" },
        { name: "CPU", value: processedData.cpuUsage, max: 100, color: "bg-green-500", bgColor: "bg-green-100" },
        { name: "Disk", value: processedData.diskUsage, max: 100, color: "bg-yellow-500", bgColor: "bg-yellow-100" },
        { name: "Response Time", value: Math.min(processedData.avgResponseTime / 10, 100), max: 100, color: "bg-purple-500", bgColor: "bg-purple-100" }
    ];    // Recent activities with proper backend data structure and fallback
    const recentActivities = processedData.recentActivities.length > 0 ?
        processedData.recentActivities.map((activity, index) => ({
            id: activity.id || index + 1,
            user: activity.user_name || activity.user || "System",
            action: activity.action || "System activity",
            time: activity.created_at ?
                new Date(activity.created_at).toLocaleString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }) : "Unknown time",
            type: activity.type || (
                activity.action?.includes('proposal') ? 'proposal' :
                    activity.action?.includes('user') || activity.action?.includes('login') ? 'user' :
                        activity.action?.includes('system') || activity.action?.includes('backup') ? 'system' :
                            'other'
            )
        })) : [
            { id: 1, user: "System", action: "Database backup completed", time: "2 jam lalu", type: "system" },
            { id: 2, user: "Admin", action: "New user registered", time: "3 jam lalu", type: "user" },
            { id: 3, user: "Dr. Ahmad", action: "Proposal submitted", time: "5 jam lalu", type: "proposal" },
            { id: 4, user: "System", action: "Security scan completed", time: "1 hari lalu", type: "security" }
        ];

    // Budget calculation
    const budgetUtilization = processedData.totalBudget > 0 ?
        Math.round((processedData.usedBudget / processedData.totalBudget) * 100) : 0;    // Quick actions data
    const quickActions = [
        { label: "Tambah User", icon: <MdOutlineAdd />, action: () => navigate('/admin/users/add'), color: "bg-blue-500" },
        { label: "Proposal Baru", icon: <MdOutlineDescription />, action: () => navigate('/admin/proposals/new'), color: "bg-green-500" },
        { label: "Lihat Analytics", icon: <MdOutlineAnalytics />, action: () => navigate('/admin/analytics'), color: "bg-purple-500" },
        { label: "Pengaturan Sistem", icon: <MdOutlineSettings />, action: () => navigate('/admin/settings'), color: "bg-gray-500" }
    ];

    return (
        <Card extra={"p-5"}>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                        System Overview
                    </h4>                    {isDemo && (
                        <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                Data Demo - Silakan login untuk data real-time
                            </span>
                        </div>
                    )}
                </div>
                <button
                    onClick={() => navigate('/admin/dashboard/details')}
                    className="linear rounded-lg bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:bg-white/20 dark:active:bg-white/10"
                >
                    View Details
                </button>
            </div>

            {/* Main Metrics Grid */}
            <div className="grid grid-cols-6 gap-4 md:grid-cols-6 lg:grid-cols-12 xl:grid-cols-12 mb-6">
                {metricCards.map((card, index) => (
                    <div key={index} className="col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-2">
                        <div className="relative rounded-lg bg-white p-4 shadow-sm dark:bg-navy-800 border border-gray-100 dark:border-navy-700 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className={`rounded-full p-2 ${card.iconBg} ${card.iconColor}`}>
                                        {card.icon}
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {card.title}
                                        </p>
                                        <p className="text-2xl font-bold text-navy-700 dark:text-white">
                                            {card.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <div className={`flex items-center text-sm font-medium ${card.trendColor}`}>
                                    {card.trendIcon}
                                    <span className="ml-1">{card.trend}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">                {/* Resource Utilization */}
                <Card extra={"p-4"}>
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineMemory className="mr-2 text-blue-500" />
                            Penggunaan Resource
                        </h5>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <MdOutlineRefresh className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {resourceMetrics.map((metric, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {metric.name}
                                    </span>
                                    <span className="text-sm font-bold text-navy-700 dark:text-white">
                                        {metric.value}%
                                    </span>
                                </div>
                                <div className={`w-full ${metric.bgColor} rounded-full h-2 dark:bg-navy-700`}>
                                    <div
                                        className={`${metric.color} h-2 rounded-full transition-all duration-500`}
                                        style={{ width: `${Math.min(metric.value, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>{/* Budget Overview */}
                <Card extra={"p-4"}>
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineAttachMoney className="mr-2 text-green-500" />
                            Ringkasan Budget
                        </h5>
                    </div>
                    <div className="space-y-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-navy-700 dark:text-white">
                                Rp {processedData.totalBudget.toLocaleString('id-ID')}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Total Alokasi Budget</div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Terpakai</span>
                                <span className="text-sm font-medium text-green-600">Rp {processedData.usedBudget.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
                                <span className="text-sm font-medium text-orange-600">Rp {processedData.pendingBudget.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Tersedia</span>
                                <span className="text-sm font-medium text-blue-600">
                                    Rp {(processedData.totalBudget - processedData.usedBudget - processedData.pendingBudget).toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-navy-700">
                            <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${budgetUtilization}%` }}
                            ></div>
                        </div>
                        <div className="text-center text-xs text-gray-500">
                            {budgetUtilization}% terealisasi
                        </div>
                    </div>
                </Card>                {/* Security & Performance */}
                <Card extra={"p-4"}>
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineSecurity className="mr-2 text-red-500" />
                            Keamanan & Performa
                        </h5>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="flex items-center">
                                <MdOutlineSecurity className="text-green-500 mr-2" />
                                <span className="text-sm font-medium">Status Keamanan</span>
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                {processedData.securityIncidents === 0 ? 'Aman' : `${processedData.securityIncidents} Masalah`}
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center">
                                <MdOutlineSpeed className="text-blue-500 mr-2" />
                                <span className="text-sm font-medium">Rata-rata Response</span>
                            </div>
                            <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                {processedData.avgResponseTime || 250}ms
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <div className="flex items-center">
                                <MdOutlineAnalytics className="text-purple-500 mr-2" />
                                <span className="text-sm font-medium">Tingkat Keberhasilan</span>
                            </div>
                            <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                {processedData.successRate || 99.2}%
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Bottom Row: Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">                {/* Recent Activity */}
                <Card extra={"p-4"}>
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineSchedule className="mr-2 text-orange-500" />
                            Aktivitas Terbaru
                        </h5>
                        <button
                            onClick={() => navigate('/admin/activity-log')}
                            className="text-sm text-brand-500 hover:text-brand-600 font-medium"
                        >
                            Lihat Semua
                        </button>
                    </div>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                        {recentActivities.slice(0, 6).map((activity, index) => (
                            <div key={activity.id || index} className="flex items-start space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-navy-700 rounded-lg">
                                <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'system' ? 'bg-blue-500' :
                                    activity.type === 'user' ? 'bg-green-500' :
                                        activity.type === 'proposal' ? 'bg-purple-500' :
                                            'bg-orange-500'
                                    }`}></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-navy-700 dark:text-white truncate">
                                        {activity.user}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                        {activity.action}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>                {/* Quick Actions */}
                <Card extra={"p-4"}>
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                            Aksi Cepat
                        </h5>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.action}
                                className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-navy-600 hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors duration-200"
                            >
                                <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center text-white mb-2`}>
                                    {action.icon}
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {action.label}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-navy-600">
                        <button
                            onClick={() => navigate('/admin/search')}
                            className="w-full flex items-center justify-center px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors duration-200"
                        >
                            <MdOutlineSearch className="mr-2" />
                            Pencarian Lanjutan
                        </button>
                    </div>
                </Card>
            </div>
        </Card>
    );
};

export default SystemOverview;
