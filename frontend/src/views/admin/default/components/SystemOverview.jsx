import React, { useState, useEffect } from "react";
import { MdOutlineBarChart, MdOutlineCheckCircle, MdOutlineCloud, MdPeopleOutline, MdOutlineDescription, MdOutlineNotificationsActive, MdOutlineHealthAndSafety, MdOutlineSettings, MdTrendingUp, MdTrendingDown, MdOutlineWarning } from "react-icons/md";
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
        { main: "#F59E0B", light: "#FEF3C7", accent: "#FBBF24", label: "Pending" }
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
                            const radius = 38 - (index * 8);
                            const circumference = 2 * Math.PI * radius;
                            const strokeDashoffset = circumference * (1 - (isAnimated ? percentage / 100 : 0));
                            const strokeWidth = 6;

                            return (
                                <g key={index}
                                    onMouseEnter={() => setActiveSegment(index)}
                                    onMouseLeave={() => setActiveSegment(null)}
                                    className="cursor-pointer">
                                    {/* Enhanced background with subtle gradient */}
                                    <defs>
                                        <linearGradient id={`bg-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor={colors[index].light} stopOpacity="0.6" />
                                            <stop offset="100%" stopColor={colors[index].light} stopOpacity="0.3" />
                                        </linearGradient>
                                        <linearGradient id={`fg-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor={colors[index].main} />
                                            <stop offset="100%" stopColor={colors[index].accent || colors[index].main} />
                                        </linearGradient>
                                        <filter id={`glow-${index}`} x="-20%" y="-20%" width="140%" height="140%">
                                            <feGaussianBlur stdDeviation="2" result="blur" />
                                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                        </filter>
                                    </defs>

                                    {/* Pulsing background effect for active segment */}
                                    {isActive && (
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r={radius}
                                            fill="none"
                                            stroke={colors[index].main}
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
                                        className={`transition-all duration-1000 ease-out ${isActive ? 'filter' : ''}`}
                                        style={{
                                            filter: isActive ? `url(#glow-${index})` : 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                    />

                                    {/* Dynamic segment label with better positioning and styling */}
                                    <text
                                        x={50 + (radius * Math.cos(Math.PI * 0.75))}
                                        y={50 + (radius * Math.sin(Math.PI * 0.75))}
                                        fill={colors[index].main}
                                        fontSize={isActive ? "9" : "7"}
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className={`pointer-events-none select-none transition-all duration-300 ${isActive ? 'drop-shadow-md' : ''}`}
                                        style={{
                                            transition: 'all 0.3s ease',
                                            opacity: isActive ? 1 : 0.9
                                        }}
                                    >
                                        {chartData.labels[index]}
                                    </text>

                                    {/* Interactive mini icon */}
                                    <g
                                        className={`transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
                                        style={{ transformOrigin: 'center', transition: 'all 0.3s ease' }}
                                    >
                                        <circle
                                            cx={50 + (radius * Math.cos(Math.PI * 0.25))}
                                            cy={50 + (radius * Math.sin(Math.PI * 0.25))}
                                            r="3.5"
                                            fill="#fff"
                                            stroke={colors[index].main}
                                            strokeWidth="1"
                                            className={`${isActive ? 'drop-shadow-lg' : 'drop-shadow-sm'}`}
                                        />
                                        <text
                                            x={50 + (radius * Math.cos(Math.PI * 0.25))}
                                            y={50 + (radius * Math.sin(Math.PI * 0.25))}
                                            fill={colors[index].main}
                                            fontSize="5"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            {index + 1}
                                        </text>
                                    </g>

                                    {/* Enhanced percentage badge with animation for active segment */}
                                    {isActive && (
                                        <g className="animate-fadeIn">
                                            <circle
                                                cx={50 + (radius * Math.cos(-0.5 * Math.PI))}
                                                cy={50 + (radius * Math.sin(-0.5 * Math.PI))}
                                                r="13"
                                                fill="white"
                                                stroke={colors[index].main}
                                                strokeWidth="1.5"
                                                className="drop-shadow-md"
                                            />
                                            <circle
                                                cx={50 + (radius * Math.cos(-0.5 * Math.PI))}
                                                cy={50 + (radius * Math.sin(-0.5 * Math.PI))}
                                                r="10"
                                                fill="white"
                                                strokeWidth="0"
                                                strokeDasharray="1,1"
                                                className="animate-ping absolute opacity-30"
                                                style={{ stroke: colors[index].main }}
                                            />
                                            <text
                                                x={50 + (radius * Math.cos(-0.5 * Math.PI))}
                                                y={50 + (radius * Math.sin(-0.5 * Math.PI))}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                className="text-xs font-bold"
                                                fill={colors[index].main}
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

                {/* Removed legend buttons section completely */}
            </div>
        </div>
    );
};

const SystemOverview = ({ data }) => {
    const navigate = useNavigate();

    // Array of metric cards to display in the system overview
    const metricCards = [
        {
            title: "System Health",
            value: data.systemHealth + "%",
            icon: <MdOutlineHealthAndSafety className="h-7 w-7" />,
            iconBg: "bg-green-100",
            iconColor: "text-green-700",
            trend: "+2.5%",
            trendColor: "text-green-500",
            trendIcon: <MdTrendingUp className="h-4 w-4" />,
        },
        {
            title: "Active Users",
            value: data.activeUsers,
            icon: <MdPeopleOutline className="h-7 w-7" />,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-700",
            trend: "+12.5%",
            trendColor: "text-green-500",
            trendIcon: <MdTrendingUp className="h-4 w-4" />,
        },
        {
            title: "Active Sessions",
            value: data.activeSessions,
            icon: <MdOutlineCloud className="h-7 w-7" />,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-700",
            trend: "0%",
            trendColor: "text-gray-500",
            trendIcon: null,
        },
        {
            title: "Total Proposals",
            value: data.totalProposals,
            icon: <MdOutlineDescription className="h-7 w-7" />,
            iconBg: "bg-amber-100",
            iconColor: "text-amber-700",
            trend: "+5.8%",
            trendColor: "text-green-500",
            trendIcon: <MdTrendingUp className="h-4 w-4" />,
        },
        {
            title: "Pending Reviews",
            value: data.pendingReviews,
            icon: <MdOutlineWarning className="h-7 w-7" />,
            iconBg: "bg-orange-100",
            iconColor: "text-orange-700",
            trend: "-3.2%",
            trendColor: "text-red-500",
            trendIcon: <MdTrendingDown className="h-4 w-4" />,
        },
        {
            title: "Approved Proposals",
            value: data.approvedProposals,
            icon: <MdOutlineCheckCircle className="h-7 w-7" />,
            iconBg: "bg-green-100",
            iconColor: "text-green-700",
            trend: "+7.2%",
            trendColor: "text-green-500",
            trendIcon: <MdTrendingUp className="h-4 w-4" />,
        },
    ];

    return (
        <Card extra={"p-5"}>
            <div className="mb-6 flex items-center justify-between">
                <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                    System Overview
                </h4>
                <button
                    onClick={() => navigate('/admin/dashboard/details')}
                    className="linear rounded-lg bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:bg-white/20 dark:active:bg-white/10"
                >
                    View Details
                </button>
            </div>

            <div className="grid grid-cols-6 gap-4 md:grid-cols-6 lg:grid-cols-12 xl:grid-cols-12">
                {metricCards.map((card, index) => (
                    <div key={index} className="rounded-xl bg-white p-4 shadow-sm dark:bg-navy-800 col-span-1 md:col-span-2 lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <div className={`rounded-full ${card.iconBg} p-3 ${card.iconColor}`}>
                                {card.icon}
                            </div>
                            <div className="flex items-center">
                                <span className={`mr-1 text-sm font-medium ${card.trendColor}`}>
                                    {card.trend}
                                </span>
                                {card.trendIcon}
                            </div>
                        </div>
                        <div className="mt-3">
                            <h5 className="text-sm font-medium text-gray-600 dark:text-white">
                                {card.title}
                            </h5>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {card.value}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { baseURL } = useSelector((state) => state.auth);
    const [dashboardData, setDashboardData] = useState({
        systemHealth: 98,
        activeUsers: 245,
        activeSessions: 1,
        totalProposals: 156,
        pendingReviews: 23,
        approvedProposals: 89,
        rejectedProposals: 44,
        userActivity: [65, 78, 80, 82, 75, 67, 73, 85, 92, 89, 85, 93]
    });

    // Add state to track if charts are ready to render
    const [chartsReady, setChartsReady] = useState(false);
    const [timeFilter, setTimeFilter] = useState("monthly");

    // Safely initialize chart components with useEffect
    useEffect(() => {
        // Using a timeout to ensure DOM is fully loaded
        const timer = setTimeout(() => {
            if (typeof LineChart === 'function' && typeof PieChart === 'function') {
                setChartsReady(true);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    // Sample chart data with proper structure
    const lineChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "User Activity",
                data: dashboardData.userActivity,
                borderColor: "#4318FF",
                tension: 0.4,
                fill: false, // Add this to ensure proper line rendering
                backgroundColor: 'rgba(67, 24, 255, 0.2)' // Add background color
            },
        ],
    };

    const pieChartData = {
        labels: ["Approved", "Rejected", "Pending"],
        datasets: [
            {
                data: [dashboardData.approvedProposals, dashboardData.rejectedProposals, dashboardData.pendingReviews],
                backgroundColor: ["#05CD99", "#EE5D50", "#FFB547"],
                borderWidth: 0, // Add this to remove borders
            },
        ],
    };

    // Sample urgent notifications
    const urgentNotifications = [
        {
            id: 1,
            message: "Session #451 is closing in 2 days",
            time: "2 hours ago",
            priority: "high",
        },
        {
            id: 2,
            message: "23 proposals awaiting review",
            time: "5 hours ago",
            priority: "medium",
        },
        {
            id: 3,
            message: "ML Model accuracy dropped below 95%",
            time: "1 day ago",
            priority: "medium",
        },
        {
            id: 4,
            message: "System backup scheduled tonight",
            time: "2 days ago",
            priority: "low",
        },
    ];

    // Sample system health indicators
    const systemHealthIndicators = [
        {
            name: "Server Uptime",
            value: "99.9%",
            status: "optimal",
        },
        {
            name: "Database Load",
            value: "42%",
            status: "normal",
        },
        {
            name: "API Response",
            value: "230ms",
            status: "normal",
        },
        {
            name: "ML Accuracy",
            value: "96.8%",
            status: "good",
        },
    ];

    // Improved safe rendering function for charts
    const renderLineChart = () => {
        return <FallbackLineChart chartData={lineChartData} />;
    };

    const renderPieChart = () => {
        return <FallbackRadialChart chartData={pieChartData} />;
    };

    return (
        <>
            {/* System Overview Card - Full width across top */}
            <div className="mb-5 w-full">
                <SystemOverview data={dashboardData} />
            </div>

            {/* Enhanced modern layout with better space utilization */}
            <div className="grid grid-cols-12 gap-5">
                {/* Main content area - 8 columns */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Active Session - Spans 2 columns on medium+ screens */}
                    <div className="col-span-1 md:col-span-2">
                        <Card extra={"p-0 overflow-hidden"}>
                            <div className="relative">
                                {/* Modern gradient header with pattern overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-90 z-0"></div>
                                <div className="absolute inset-0 bg-pattern-grid opacity-10 z-0"></div>

                                {/* Session header content */}
                                <div className="relative p-5 z-10">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className="flex h-2.5 w-2.5 rounded-full bg-green-400 shadow-glow-green"></span>
                                                <h4 className="text-xl font-bold text-white">Active Session</h4>
                                            </div>
                                            <p className="text-blue-100 text-sm mt-1 font-medium">Session #451 • Proposal Collection Phase</p>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white border border-white/30">
                                            In Progress
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Session details with modern card design */}
                            <div className="px-5 py-4">
                                <h5 className="font-bold text-navy-700 dark:text-white text-lg mb-3">Pengadaan Kegiatan Semester Genap 2025</h5>

                                {/* Date timeline component */}
                                <div className="flex items-center mb-4">
                                    <div className="flex-1 flex flex-col items-center">
                                        <span className="text-xs text-gray-500 mb-1">Started</span>
                                        <span className="text-sm font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full">Apr 15</span>
                                        <div className="mt-2 h-1 w-full bg-blue-100 dark:bg-blue-900/20"></div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center">
                                        <span className="text-xs text-gray-500 mb-1">Current</span>
                                        <span className="text-sm font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full">May 23</span>
                                        <div className="mt-2 h-1 w-full bg-gradient-to-r from-blue-100 via-green-100 to-gray-100 dark:from-blue-900/20 dark:via-green-900/20 dark:to-gray-900/20"></div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center">
                                        <span className="text-xs text-gray-500 mb-1">Ends</span>
                                        <span className="text-sm font-medium bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400 px-3 py-1 rounded-full">Jun 30</span>
                                        <div className="mt-2 h-1 w-full bg-gray-100 dark:bg-gray-800"></div>
                                    </div>
                                </div>

                                {/* Status indicators */}
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="flex flex-col items-center justify-center py-3 px-2 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
                                        <p className="text-amber-700 dark:text-amber-400 font-bold text-xl">23</p>
                                        <p className="text-xs text-amber-600 dark:text-amber-500">Days Left</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center py-3 px-2 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                                        <p className="text-blue-700 dark:text-blue-400 font-bold text-xl">45%</p>
                                        <p className="text-xs text-blue-600 dark:text-blue-500">Complete</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center py-3 px-2 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20">
                                        <p className="text-green-700 dark:text-green-400 font-bold text-xl">156</p>
                                        <p className="text-xs text-green-600 dark:text-green-500">Proposals</p>
                                    </div>
                                </div>

                                {/* Progress bar with enhanced design */}
                                <div className="mb-4">
                                    <div className="flex justify-between mb-1.5">
                                        <h6 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Timeline Progress</h6>
                                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">45% Complete</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-glow-blue" style={{ width: '45%' }}></div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/admin/session-management')}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 py-2.5 text-base font-medium text-white transition duration-200 hover:shadow-lg active:opacity-90">
                                    <span>Manage Session</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </div>
                        </Card>
                    </div>

                    {/* Urgent Notifications - Improved modern design */}
                    <div className="col-span-1">
                        <Card extra={"p-4 flex flex-col h-full overflow-hidden"}>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-red-400 blur-sm opacity-50"></div>
                                        <div className="relative bg-gradient-to-r from-red-500 to-pink-500 text-white p-2 rounded-full">
                                            <MdOutlineNotificationsActive size={18} />
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-navy-700 dark:text-white">Urgent Notifications</h4>
                                </div>
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold shadow-glow-red">
                                    {urgentNotifications.length}
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto no-scrollbar">
                                <div className="space-y-3">
                                    {urgentNotifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start rounded-xl p-3 border ${notification.priority === "high" ? "bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900/20" :
                                                notification.priority === "medium" ? "bg-amber-50 border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/20" :
                                                    "bg-blue-50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/20"
                                                } hover:shadow-md transition-all duration-200 cursor-pointer`}
                                        >
                                            <div className={`mr-3 rounded-full p-2 ${notification.priority === "high" ? "bg-red-100 text-red-700 dark:bg-red-900/30" :
                                                notification.priority === "medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30" :
                                                    "bg-blue-100 text-blue-700 dark:bg-blue-900/30"
                                                }`}>
                                                <MdOutlineNotificationsActive size={18} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{notification.message}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${notification.priority === "high" ? "bg-red-100 text-red-700 dark:bg-red-900/30" :
                                                        notification.priority === "medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30" :
                                                            "bg-blue-100 text-blue-700 dark:bg-blue-900/30"
                                                        }`}>
                                                        {notification.priority}
                                                    </span>
                                                    <span className="text-xs text-gray-500">{notification.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/admin/notification-center')}
                                className="mt-4 w-full rounded-xl bg-gray-900 dark:bg-white/10 py-2 text-base font-medium text-white dark:text-white transition duration-200 hover:bg-gray-800 dark:hover:bg-white/20 active:bg-gray-700">
                                View All Notifications
                            </button>
                        </Card>
                    </div>

                    {/* Proposal Statistics with Line Chart */}
                    <div className="col-span-1">
                        <Card extra={"p-4 flex flex-col h-full"}>
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-lg font-bold text-navy-700 dark:text-white">User Activity</h4>
                                <select
                                    className="rounded-lg border border-gray-200 bg-white/90 dark:bg-navy-800 dark:border-navy-600 px-2.5 py-1 text-sm font-medium"
                                    value={timeFilter}
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <div className="h-48">
                                    {renderLineChart()}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-3">
                                <div className="flex items-center p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20">
                                    <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mr-3">
                                        <MdPeopleOutline size={20} className="text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-navy-700 dark:text-white">{dashboardData.activeUsers}</p>
                                        <p className="text-xs text-indigo-600 dark:text-indigo-400">Active Users</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20">
                                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-3">
                                        <MdTrendingUp size={20} className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-navy-700 dark:text-white">+12.5%</p>
                                        <p className="text-xs text-green-600 dark:text-green-400">Growth Rate</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Side panel - 4 columns */}
                <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-5">
                    {/* Proposal Statistics - Modern pie chart with enhanced design */}
                    <div>
                        <Card extra={"p-4 flex flex-col"}>
                            {/* Enhanced header with better visual hierarchy */}
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-indigo-400 blur-sm opacity-50"></div>
                                        <div className="relative bg-gradient-to-r from-indigo-500 to-violet-500 text-white p-1.5 rounded-full">
                                            <MdOutlineDescription size={16} />
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                                        Proposal Statistics
                                    </h4>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                        Total: {dashboardData.totalProposals}
                                    </div>
                                    <button className="p-1 rounded-full bg-gray-100 dark:bg-navy-700 text-gray-600 hover:bg-gray-200 transition-colors">
                                        <MdOutlineBarChart size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Pie chart container with subtle shadow */}
                            <div className="flex-1 flex items-center justify-center py-2 relative">
                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                    <div className="w-32 h-32 rounded-full bg-indigo-500 blur-xl"></div>
                                </div>
                                {renderPieChart()}
                            </div>

                            {/* Enhanced statistics cards with improved visual design */}
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {/* Approved Card */}
                                <div className="rounded-xl bg-white dark:bg-navy-800 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 dark:border-navy-700">
                                    {/* Status indicator bar */}
                                    <div className="h-1 w-full bg-green-500"></div>
                                    <div className="p-2.5">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">Approved</p>
                                        </div>
                                        <div className="flex items-baseline gap-1.5">
                                            <p className="text-lg font-bold text-green-700 dark:text-green-400">{dashboardData.approvedProposals}</p>
                                            <span className="text-xs text-green-600 dark:text-green-500 font-medium">
                                                {Math.round((dashboardData.approvedProposals / dashboardData.totalProposals) * 100)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Rejected Card */}
                                <div className="rounded-xl bg-white dark:bg-navy-800 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 dark:border-navy-700">
                                    {/* Status indicator bar */}
                                    <div className="h-1 w-full bg-red-500"></div>
                                    <div className="p-2.5">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">Rejected</p>
                                        </div>
                                        <div className="flex items-baseline gap-1.5">
                                            <p className="text-lg font-bold text-red-700 dark:text-red-400">{dashboardData.rejectedProposals}</p>
                                            <span className="text-xs text-red-600 dark:text-red-500 font-medium">
                                                {Math.round((dashboardData.rejectedProposals / dashboardData.totalProposals) * 100)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Pending Card */}
                                <div className="rounded-xl bg-white dark:bg-navy-800 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 dark:border-navy-700">
                                    {/* Status indicator bar */}
                                    <div className="h-1 w-full bg-amber-500"></div>
                                    <div className="p-2.5">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                            <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">Pending</p>
                                        </div>
                                        <div className="flex items-baseline gap-1.5">
                                            <p className="text-lg font-bold text-amber-700 dark:text-amber-400">{dashboardData.pendingReviews}</p>
                                            <span className="text-xs text-amber-600 dark:text-amber-500 font-medium">
                                                {Math.round((dashboardData.pendingReviews / dashboardData.totalProposals) * 100)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action button */}
                            <button
                                onClick={() => navigate('/admin/proposals')}
                                className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-navy-700 py-2 text-base font-medium text-gray-700 dark:text-white transition duration-200 hover:bg-gray-200 dark:hover:bg-navy-600 active:bg-gray-300">
                                <span>View All Proposals</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </Card>
                    </div>

                    {/* System Health - Enhanced modern design */}
                    <div>
                        <Card extra={"p-4 flex flex-col"}>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-green-400 blur-sm opacity-50"></div>
                                        <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white p-1.5 rounded-full">
                                            <MdOutlineHealthAndSafety size={16} />
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-navy-700 dark:text-white">System Health</h4>
                                </div>
                                <div className="flex items-center">
                                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2 shadow-glow-green"></span>
                                    <span className="text-sm font-medium text-green-600 dark:text-green-400">All Systems Normal</span>
                                </div>
                            </div>

                            <div className="space-y-3.5">
                                {systemHealthIndicators.map((indicator, index) => (
                                    <div key={index} className={`p-3 rounded-xl border ${indicator.status === "optimal" ? "bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-900/20" :
                                        indicator.status === "good" ? "bg-blue-50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/20" :
                                            indicator.status === "normal" ? "bg-gray-50 border-gray-100 dark:bg-gray-900/10 dark:border-gray-900/20" :
                                                "bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900/20"
                                        }`}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className={`h-9 w-9 rounded-full flex items-center justify-center mr-3 ${indicator.status === "optimal" ? "bg-green-100 text-green-700 dark:bg-green-900/30" :
                                                    indicator.status === "good" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30" :
                                                        indicator.status === "normal" ? "bg-gray-100 text-gray-700 dark:bg-gray-900/30" :
                                                            "bg-red-100 text-red-700 dark:bg-red-900/30"
                                                    }`}>
                                                    <MdOutlineCloud size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{indicator.name}</p>
                                                    <div className="flex items-center mt-0.5">
                                                        <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${indicator.status === "optimal" ? "bg-green-100 text-green-700 dark:bg-green-900/30" :
                                                            indicator.status === "good" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30" :
                                                                indicator.status === "normal" ? "bg-gray-100 text-gray-700 dark:bg-gray-900/30" :
                                                                    "bg-red-100 text-red-700 dark:bg-red-900/30"
                                                            }`}>
                                                            {indicator.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`text-lg font-bold ${indicator.status === "optimal" ? "text-green-600 dark:text-green-400" :
                                                    indicator.status === "good" ? "text-blue-600 dark:text-blue-400" :
                                                        indicator.status === "normal" ? "text-gray-700 dark:text-gray-300" :
                                                            "text-red-600 dark:text-red-400"
                                                    }`}>
                                                    {indicator.value}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => navigate('/admin/system-monitoring')}
                                className="mt-4 w-full rounded-xl bg-gray-100 dark:bg-navy-700 py-2.5 text-base font-medium text-gray-700 dark:text-white transition duration-200 hover:bg-gray-200 dark:hover:bg-navy-600 active:bg-gray-300 flex items-center justify-center gap-2">
                                <span>View Detailed Metrics</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
