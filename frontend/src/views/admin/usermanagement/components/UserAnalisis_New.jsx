import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import AOS from "aos";
import "aos/dist/aos.css";
import { analyticsService } from "../../../../services/analyticsService.js";

// SVG Icons to replace FontIcon
const Icons = {
    keyboardArrowDown: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-6-6a.75.75 0 011.06-1.06L12 14.69l5.47-5.47a.75.75 0 111.06 1.06l-6 6z" clipRule="evenodd" />
        </svg>
    ),
    tune: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
        </svg>
    ),
    personAdd: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.766.766 0 01-.752.743H3.752a.766.766 0 01-.752-.743L3 19.125z" />
            <path d="M19 8.75a.75.75 0 000 1.5h4.25a.75.75 0 000-1.5H19zM19 11.75a.75.75 0 000 1.5h4.25a.75.75 0 000-1.5H19z" />
        </svg>
    ),
    trendingUp: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 01.44-.44l5.25-1.5a.75.75 0 01.935.935l-1.5 5.25a.75.75 0 01-1.375-.39l-.362-1.269-9.44 9.44a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 011.06-1.06l3.22 3.22L15.44 7.5l-1.269-.362a.75.75 0 01-.39-1.375z" clipRule="evenodd" />
        </svg>
    ),
    people: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
        </svg>
    ),
    barChart: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
        </svg>
    ),
};

// Custom dropdown component
const CustomDropdown = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="flex items-center gap-2 px-4 py-2 text-blue-gray-800 bg-white border border-blue-gray-200 rounded-lg hover:bg-blue-gray-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {value}
                {Icons.keyboardArrowDown}
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
                    <ul className="py-1">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

// Custom progress bar
const CustomProgress = ({ value, color, className }) => {
    const getColorClass = () => {
        switch (color) {
            case 'green': return 'bg-blue-500';
            case 'amber': return 'bg-blue-400';
            case 'red': return 'bg-blue-300';
            case 'indigo': return 'bg-blue-600';
            case 'cyan': return 'bg-blue-500';
            case 'teal': return 'bg-blue-400';
            case 'purple': return 'bg-blue-700';
            default: return 'bg-blue-500';
        }
    };

    return (
        <div className={`w-full bg-blue-100 rounded-full ${className}`}>
            <div
                className={`${getColorClass()} rounded-full h-full`}
                style={{ width: `${value}%` }}
            ></div>
        </div>
    );
};

const UserAnalisis = () => {
    const [timeRange, setTimeRange] = useState("yearly");
    const [filterOpen, setFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for analytics data
    const [userData, setUserData] = useState({
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        newUsers: 0,
        userGrowth: 0,
        userRoles: [],
        userActivity: [],
        registrationTrends: [],
        departmentDistribution: [],
        userStatus: []
    });

    const [userInsightsData, setUserInsightsData] = useState({
        overview: {
            metrics: [],
            summary: ""
        },
        engagement: {
            metrics: [],
            engagementByRole: [],
            summary: ""
        },
        retention: {
            metrics: [],
            retentionByRole: [],
            summary: ""
        }
    });

    // Fetch analytics data
    const fetchAnalyticsData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch all analytics data
            const [
                overviewData,
                rolesData,
                activityData,
                trendsData,
                departmentData,
                statusData,
                insightsOverview,
                engagementData,
                retentionData
            ] = await Promise.all([
                analyticsService.getUserOverview(timeRange),
                analyticsService.getUserRoles(),
                analyticsService.getUserActivity(timeRange),
                analyticsService.getRegistrationTrends(timeRange),
                analyticsService.getDepartmentDistribution(),
                analyticsService.getUserStatus(),
                analyticsService.getUserInsightsOverview(),
                analyticsService.getEngagementMetrics(),
                analyticsService.getRetentionMetrics()
            ]);

            // Update user data state
            setUserData({
                ...overviewData.data,
                userRoles: rolesData.data || [],
                userActivity: activityData.data || [],
                registrationTrends: trendsData.data || [],
                departmentDistribution: departmentData.data || [],
                userStatus: statusData.data || []
            });

            // Update insights data state
            setUserInsightsData({
                overview: insightsOverview.data || { metrics: [], summary: "" },
                engagement: engagementData.data || { metrics: [], engagementByRole: [], summary: "" },
                retention: retentionData.data || { metrics: [], retentionByRole: [], summary: "" }
            });

        } catch (error) {
            console.error('Error fetching analytics data:', error);
            setError('Failed to load analytics data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Refetch data when time range changes
    useEffect(() => {
        fetchAnalyticsData();
    }, [timeRange]);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // Format time range for display
    const formatTimeRange = () => {
        if (timeRange === "yearly") return "Last 12 Months";
        if (timeRange === "quarterly") return "Last 3 Months";
        return "Last 30 Days";
    };

    const timeRangeOptions = [
        { value: "monthly", label: "Last 30 Days" },
        { value: "quarterly", label: "Last 3 Months" },
        { value: "yearly", label: "Last 12 Months" }
    ];

    // Chart configurations
    const userRoleChartConfig = {
        series: userData.userRoles.map(item => item.count),
        options: {
            chart: {
                type: 'donut',
                foreColor: '#697a8d',
            },
            labels: userData.userRoles.map(item => item.role),
            colors: ['#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#ef4444'],
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%'
                    }
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 280
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    };

    const userActivityChartConfig = {
        series: [{
            name: 'Active Users',
            data: userData.userActivity.map(item => item.users)
        }],
        options: {
            chart: {
                type: 'area',
                height: 350,
                toolbar: {
                    show: false
                },
                foreColor: '#697a8d',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            xaxis: {
                categories: userData.userActivity.map(item => item.month)
            },
            colors: ['#3b82f6'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.2,
                    stops: [0, 90, 100]
                }
            },
            tooltip: {
                y: {
                    formatter: (val) => `${val} Users`
                }
            }
        }
    };

    const userRegistrationChartConfig = {
        series: [{
            name: 'New Registrations',
            data: userData.registrationTrends.map(item => item.count)
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false
                },
                foreColor: '#697a8d',
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    columnWidth: '60%',
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ['#10b981'],
            xaxis: {
                categories: userData.registrationTrends.map(item => item.month)
            },
            tooltip: {
                y: {
                    formatter: (val) => `${val} New Users`
                }
            }
        }
    };

    const departmentChartConfig = {
        series: [{
            name: 'Users',
            data: userData.departmentDistribution.map(item => item.users)
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false
                },
                foreColor: '#697a8d',
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 4,
                    barHeight: '70%',
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ['#6366f1'],
            xaxis: {
                categories: userData.departmentDistribution.map(item => item.department)
            },
            tooltip: {
                y: {
                    formatter: (val) => `${val} Users`
                }
            }
        }
    };

    if (loading) {
        return (
            <div className="mx-auto p-4">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600">Loading analytics...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto p-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error Loading Analytics</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{error}</p>
                            </div>
                            <div className="mt-3">
                                <button
                                    onClick={fetchAnalyticsData}
                                    className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto p-4">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6" data-aos="fade-down">
                <div>
                    <h3 className="text-2xl font-bold text-blue-gray-800">
                        User Analytics
                    </h3>
                    <p className="mt-1 text-gray-600">
                        Comprehensive overview of user statistics and activities
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                    <CustomDropdown
                        options={timeRangeOptions}
                        value={formatTimeRange()}
                        onChange={setTimeRange}
                    />

                    <button
                        className="flex items-center gap-2 px-4 py-2 text-blue-gray-800 bg-white border border-blue-gray-200 rounded-lg hover:bg-blue-gray-50"
                        onClick={() => setFilterOpen(!filterOpen)}
                    >
                        {Icons.tune}
                        Filters
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                        {Icons.personAdd}
                        Add User
                    </button>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-aos="fade-up">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-gray-600">Total Users</p>
                            <p className="text-2xl font-bold text-blue-gray-900">{userData.totalUsers.toLocaleString()}</p>
                            <p className="text-xs text-green-600 font-medium">
                                +{userData.userGrowth}% from last period
                            </p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            {Icons.people}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-gray-600">Active Users</p>
                            <p className="text-2xl font-bold text-blue-gray-900">{userData.activeUsers.toLocaleString()}</p>
                            <p className="text-xs text-blue-gray-500">
                                {((userData.activeUsers / userData.totalUsers) * 100).toFixed(1)}% of total
                            </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            {Icons.trendingUp}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-gray-600">New Users</p>
                            <p className="text-2xl font-bold text-blue-gray-900">{userData.newUsers.toLocaleString()}</p>
                            <p className="text-xs text-blue-gray-500">
                                In {formatTimeRange().toLowerCase()}
                            </p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            {Icons.personAdd}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-gray-600">Inactive Users</p>
                            <p className="text-2xl font-bold text-blue-gray-900">{userData.inactiveUsers.toLocaleString()}</p>
                            <p className="text-xs text-blue-gray-500">
                                {((userData.inactiveUsers / userData.totalUsers) * 100).toFixed(1)}% of total
                            </p>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-lg">
                            {Icons.barChart}
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* User Roles Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-gray-100" data-aos="fade-up">
                    <h4 className="text-lg font-semibold text-blue-gray-800 mb-4">User Distribution by Role</h4>
                    {userData.userRoles.length > 0 ? (
                        <Chart
                            options={userRoleChartConfig.options}
                            series={userRoleChartConfig.series}
                            type="donut"
                            height={320}
                        />
                    ) : (
                        <div className="h-320 flex items-center justify-center text-gray-500">
                            No role data available
                        </div>
                    )}
                </div>

                {/* User Activity Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-gray-100" data-aos="fade-up">
                    <h4 className="text-lg font-semibold text-blue-gray-800 mb-4">User Activity Trends</h4>
                    {userData.userActivity.length > 0 ? (
                        <Chart
                            options={userActivityChartConfig.options}
                            series={userActivityChartConfig.series}
                            type="area"
                            height={320}
                        />
                    ) : (
                        <div className="h-320 flex items-center justify-center text-gray-500">
                            No activity data available
                        </div>
                    )}
                </div>

                {/* Registration Trends Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-gray-100" data-aos="fade-up">
                    <h4 className="text-lg font-semibold text-blue-gray-800 mb-4">Registration Trends</h4>
                    {userData.registrationTrends.length > 0 ? (
                        <Chart
                            options={userRegistrationChartConfig.options}
                            series={userRegistrationChartConfig.series}
                            type="bar"
                            height={320}
                        />
                    ) : (
                        <div className="h-320 flex items-center justify-center text-gray-500">
                            No registration data available
                        </div>
                    )}
                </div>

                {/* Department Distribution Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-gray-100" data-aos="fade-up">
                    <h4 className="text-lg font-semibold text-blue-gray-800 mb-4">Users by Department</h4>
                    {userData.departmentDistribution.length > 0 ? (
                        <Chart
                            options={departmentChartConfig.options}
                            series={departmentChartConfig.series}
                            type="bar"
                            height={320}
                        />
                    ) : (
                        <div className="h-320 flex items-center justify-center text-gray-500">
                            No department data available
                        </div>
                    )}
                </div>
            </div>

            {/* Status Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-gray-100 mb-8" data-aos="fade-up">
                <h4 className="text-lg font-semibold text-blue-gray-800 mb-6">User Status Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {userData.userStatus.map((status, index) => (
                        <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{status.count}</p>
                            <p className="text-sm text-blue-gray-600">{status.status}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Insights Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-gray-100" data-aos="fade-up">
                <h4 className="text-lg font-semibold text-blue-gray-800 mb-6">User Insights</h4>

                {/* Overview Metrics */}
                <div className="mb-8">
                    <h5 className="text-md font-medium text-blue-gray-700 mb-4">Overview Metrics</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {userInsightsData.overview.metrics.map((metric, index) => (
                            <div key={index} className="p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-gray-600">{metric.title}</p>
                                <p className="text-xl font-bold text-blue-gray-900">{metric.value}</p>
                                <p className={`text-sm ${metric.trendColor}`}>{metric.trend}</p>
                            </div>
                        ))}
                    </div>
                    {userInsightsData.overview.summary && (
                        <p className="mt-4 text-sm text-blue-gray-600">{userInsightsData.overview.summary}</p>
                    )}
                </div>

                {/* Engagement Metrics */}
                <div className="mb-8">
                    <h5 className="text-md font-medium text-blue-gray-700 mb-4">Engagement Metrics</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {userInsightsData.engagement.metrics.map((metric, index) => (
                            <div key={index} className="p-4 bg-green-50 rounded-lg">
                                <p className="text-sm text-blue-gray-600">{metric.title}</p>
                                <p className="text-xl font-bold text-blue-gray-900">{metric.value}</p>
                                <p className={`text-sm ${metric.trendColor}`}>{metric.trend}</p>
                            </div>
                        ))}
                    </div>
                    {userInsightsData.engagement.engagementByRole.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            {userInsightsData.engagement.engagementByRole.map((role, index) => (
                                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-blue-gray-600">{role.role}</p>
                                    <p className="text-lg font-bold text-blue-gray-900">{role.score}%</p>
                                    <p className="text-xs text-green-600">+{role.progress}%</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {userInsightsData.engagement.summary && (
                        <p className="text-sm text-blue-gray-600">{userInsightsData.engagement.summary}</p>
                    )}
                </div>

                {/* Retention Metrics */}
                <div>
                    <h5 className="text-md font-medium text-blue-gray-700 mb-4">Retention Metrics</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {userInsightsData.retention.metrics.map((metric, index) => (
                            <div key={index} className="p-4 bg-purple-50 rounded-lg">
                                <p className="text-sm text-blue-gray-600">{metric.title}</p>
                                <p className="text-xl font-bold text-blue-gray-900">{metric.value}</p>
                                <p className={`text-sm ${metric.trendColor}`}>{metric.trend}</p>
                            </div>
                        ))}
                    </div>
                    {userInsightsData.retention.retentionByRole.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            {userInsightsData.retention.retentionByRole.map((role, index) => (
                                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-blue-gray-600">{role.role}</p>
                                    <p className="text-lg font-bold text-blue-gray-900">{role.rate}%</p>
                                    <p className="text-xs text-green-600">+{role.progress}%</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {userInsightsData.retention.summary && (
                        <p className="text-sm text-blue-gray-600">{userInsightsData.retention.summary}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserAnalisis;
