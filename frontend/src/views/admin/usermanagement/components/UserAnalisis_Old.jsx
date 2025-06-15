import React, { useState, useEffect, useRef } from "react";
// Remove Material Tailwind imports which cause context errors
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

// Custom dropdown component that doesn't rely on React context
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

// Custom tab component that doesn't rely on React context
const CustomTabs = ({ tabs, defaultTab }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <div>
            <div className="flex border-b border-blue-gray-100">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        className={`px-4 py-2 text-sm font-medium ${activeTab === tab.value
                            ? "text-blue-500 border-b-2 border-blue-500"
                            : "text-blue-gray-500 hover:text-blue-gray-800"
                            }`}
                        onClick={() => setActiveTab(tab.value)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="p-4">
                {tabs.find(tab => tab.value === activeTab)?.content}
            </div>
        </div>
    );
};

// Custom progress bar that doesn't rely on React context
const CustomProgress = ({ value, color, className }) => {
    const getColorClass = () => {
        // Make blue the default color for all progress bars
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
};    const timeRangeOptions = [
        { value: "monthly", label: "Last 30 Days" },
        { value: "quarterly", label: "Last 3 Months" },
        { value: "yearly", label: "Last 12 Months" }
    ];

    // Helper functions
    const getProgressColor = (progress) => {
        if (progress > 0) return "text-blue-600 bg-blue-50";
        if (progress < 0) return "text-blue-600 bg-blue-50";
        return "text-blue-600 bg-blue-50";
    };

    const getBadgeColor = (progress) => {
        if (progress > 0) return "bg-blue-100 text-blue-800";
        if (progress < 0) return "bg-blue-100 text-blue-800";
        return "bg-blue-100 text-blue-800";
    };

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

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
            },            tooltip: {
                y: {
                    formatter: (val) => `${val} Users`
                }
            }
        }
    };

    return (
        <div className="mx-auto p-4">
            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600">Loading analytics...</span>
                </div>
            )}

            {/* Error State */}
            {error && (
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
            )}

            {/* Main Content - Only show when not loading and no error */}
            {!loading && !error && (
                <>
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

            {/* Filter Section - Conditionally rendered */}
            {filterOpen && (
                <div
                    className="mb-6 p-4 bg-white rounded-xl shadow-md"
                    data-aos="fade-down"
                >
                    <h6 className="mb-3 text-lg font-medium text-blue-gray-800">
                        Advanced Filters
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-blue-gray-800">
                                User Role
                            </label>
                            <select className="w-full rounded-lg border-gray-300 p-2 border">
                                <option value="">All Roles</option>
                                {userData.userRoles.map((role, index) => (
                                    <option key={index} value={role.role}>{role.role}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-blue-gray-800">
                                Department
                            </label>
                            <select className="w-full rounded-lg border-gray-300 p-2 border">
                                <option value="">All Departments</option>
                                {userData.departmentDistribution.map((dept, index) => (
                                    <option key={index} value={dept.department}>{dept.department}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-blue-gray-800">
                                Status
                            </label>
                            <select className="w-full rounded-lg border-gray-300 p-2 border">
                                <option value="">All Status</option>
                                {userData.userStatus.map((status, index) => (
                                    <option key={index} value={status.status}>{status.status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="mr-2 px-4 py-2 text-blue-gray-800 hover:bg-blue-gray-50 rounded-lg">
                            Clear Filters
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow" data-aos="zoom-in" data-aos-delay="100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h6 className="mb-1 text-sm font-medium text-blue-gray-800">
                                Total Users
                            </h6>
                            <h3 className="text-2xl font-bold text-blue-gray-800">
                                {userData.totalUsers}
                            </h3>
                            <p className="flex items-center gap-1 text-sm font-medium text-green-500">
                                {Icons.trendingUp}
                                +{userData.userGrowth}%
                            </p>
                        </div>
                        <div className="rounded-full bg-blue-50 p-3">
                            <span className="text-blue-500">{Icons.people}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow" data-aos="zoom-in" data-aos-delay="200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h6 className="mb-1 text-sm font-medium text-blue-gray-800">
                                Active Users
                            </h6>
                            <h3 className="text-2xl font-bold text-blue-gray-800">
                                {userData.activeUsers}
                            </h3>
                            <p className="text-sm font-medium text-blue-gray-600">
                                {Math.round((userData.activeUsers / userData.totalUsers) * 100)}% of total
                            </p>
                        </div>
                        <div className="rounded-full bg-green-50 p-3">
                            <span className="text-green-500">{Icons.barChart}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow" data-aos="zoom-in" data-aos-delay="300">
                    <div className="flex items-center justify-between">
                        <div>
                            <h6 className="mb-1 text-sm font-medium text-blue-gray-800">
                                New Users
                            </h6>
                            <h3 className="text-2xl font-bold text-blue-gray-800">
                                {userData.newUsers}
                            </h3>
                            <p className="text-sm font-medium text-blue-gray-600">
                                Last 30 days
                            </p>
                        </div>
                        <div className="rounded-full bg-purple-50 p-3">
                            <span className="text-purple-500">{Icons.personAdd}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow" data-aos="zoom-in" data-aos-delay="400">
                    <div className="flex items-center justify-between">
                        <div>
                            <h6 className="mb-1 text-sm font-medium text-blue-gray-800">
                                User Status
                            </h6>
                            <div className="flex gap-2 items-center mt-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <p className="text-sm font-medium text-blue-gray-600">
                                    {userData.userStatus[0].count} Online
                                </p>
                            </div>
                            <div className="flex gap-2 items-center mt-1">
                                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                <p className="text-sm font-medium text-blue-gray-600">
                                    {userData.userStatus[1].count} Away
                                </p>
                            </div>
                        </div>
                        <div className="rounded-full bg-blue-gray-50 p-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="100">
                    <div className="p-4">
                        <h6 className="mb-4 text-lg font-medium text-blue-gray-800">
                            User Activity Trends
                        </h6>
                        <Chart
                            options={userActivityChartConfig.options}
                            series={userActivityChartConfig.series}
                            type="area"
                            height={350}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="200">
                    <div className="p-4">
                        <h6 className="mb-4 text-lg font-medium text-blue-gray-800">
                            Role Distribution
                        </h6>
                        <Chart
                            options={userRoleChartConfig.options}
                            series={userRoleChartConfig.series}
                            type="donut"
                            height={350}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="300">
                    <div className="p-4">
                        <h6 className="mb-4 text-lg font-medium text-blue-gray-800">
                            New User Registrations
                        </h6>
                        <Chart
                            options={userRegistrationChartConfig.options}
                            series={userRegistrationChartConfig.series}
                            type="bar"
                            height={350}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="400">
                    <div className="p-4">
                        <h6 className="mb-4 text-lg font-medium text-blue-gray-800">
                            Department Distribution
                        </h6>
                        <Chart
                            options={departmentChartConfig.options}
                            series={departmentChartConfig.series}
                            type="bar"
                            height={350}
                        />
                    </div>
                </div>
            </div>

            {/* User Activity Section */}
            <div className="bg-white rounded-xl shadow-md mb-6 hover:shadow-lg transition-shadow" data-aos="fade-up">
                <div className="p-4">
                    <h6 className="mb-4 text-lg font-medium text-blue-gray-800">
                        User Status Overview
                    </h6>
                    <div className="space-y-6">
                        {userData.userStatus.map((status, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between mb-2">
                                    <p className="text-sm font-medium text-blue-gray-800">
                                        {status.status} Users
                                    </p>
                                    <p className="text-sm font-medium text-blue-gray-800">
                                        {status.count} ({Math.round((status.count / userData.totalUsers) * 100)}%)
                                    </p>
                                </div>
                                <CustomProgress
                                    value={Math.round((status.count / userData.totalUsers) * 100)}
                                    color="blue"
                                    className="h-2"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs for Additional Information */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow" data-aos="fade-up">
                <div className="p-4">
                    <h6 className="mb-4 text-lg font-medium text-blue-gray-800">
                        User Insights
                    </h6>

                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                className={`px-4 py-2 ${activeInsightTab === "overview"
                                    ? "border-b-2 border-blue-500 text-blue-600"
                                    : "text-gray-500 hover:text-gray-700"}`}
                                onClick={() => setActiveInsightTab("overview")}
                            >
                                Overview
                            </button>
                            <button
                                className={`px-4 py-2 ${activeInsightTab === "activity"
                                    ? "border-b-2 border-blue-500 text-blue-600"
                                    : "text-gray-500 hover:text-gray-700"}`}
                                onClick={() => setActiveInsightTab("activity")}
                            >
                                Activity
                            </button>
                            <button
                                className={`px-4 py-2 ${activeInsightTab === "engagement"
                                    ? "border-b-2 border-blue-500 text-blue-600"
                                    : "text-gray-500 hover:text-gray-700"}`}
                                onClick={() => setActiveInsightTab("engagement")}
                            >
                                Engagement
                            </button>
                            <button
                                className={`px-4 py-2 ${activeInsightTab === "retention"
                                    ? "border-b-2 border-blue-500 text-blue-600"
                                    : "text-gray-500 hover:text-gray-700"}`}
                                onClick={() => setActiveInsightTab("retention")}
                            >
                                Retention
                            </button>
                        </nav>
                    </div>

                    <div className="mt-4">
                        {/* Overview Tab */}
                        {activeInsightTab === "overview" && (
                            <div className="p-2">
                                <p className="mb-4 text-blue-gray-700">
                                    {userInsightsData.overview.summary}
                                    {timeRange === "yearly" ? " (12 months period)" :
                                        timeRange === "quarterly" ? " (3 months period)" : " (30 days period)"}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {userInsightsData.overview.metrics.map((metric, idx) => (
                                        <div key={idx} className="border rounded-lg p-4">
                                            <p className="text-sm font-medium text-blue-gray-700">
                                                {metric.title}
                                            </p>
                                            <h5 className="text-xl font-bold text-blue-gray-800">
                                                {metric.value}
                                            </h5>
                                            <p className={`flex items-center text-sm ${metric.trendColor}`}>
                                                {metric.icon}
                                                {metric.trend}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Activity Tab */}
                        {activeInsightTab === "activity" && (
                            <div className="p-2">
                                <p className="mb-4 text-blue-gray-700">
                                    {userInsightsData.activity.summary}
                                </p>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="border rounded-lg p-4">
                                        <h6 className="text-sm font-medium text-blue-gray-800 mb-3">
                                            Most Active Times
                                        </h6>
                                        <div className="space-y-2">
                                            {userInsightsData.activity.activeTimes.map((time, idx) => (
                                                <div key={idx} className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`h-3 w-3 rounded-full ${time.activity === "High" ? "bg-blue-500" :
                                                            time.activity === "Medium" ? "bg-blue-300" : "bg-blue-200"
                                                            }`}></div>
                                                        <span className="text-sm">{time.day}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm font-medium mr-2">{time.timeRange}</span>
                                                        <span className={`text-xs px-1.5 py-0.5 rounded ${getBadgeColor(time.progress)}`}>
                                                            {time.progress > 0 ? `+${time.progress}%` :
                                                                time.progress < 0 ? `${time.progress}%` : "0%"}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <h6 className="text-sm font-medium text-blue-gray-800 mb-3">
                                            Most Used Features
                                        </h6>
                                        <div className="space-y-3">
                                            {userInsightsData.activity.mostUsedFeatures.map((feature, idx) => (
                                                <div key={idx} className="space-y-1">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm">{feature.feature}</span>
                                                        <div className="flex items-center">
                                                            <span className="text-sm font-medium">{feature.usage}%</span>
                                                            <span className={`text-xs ml-2 ${getProgressColor(feature.progress)}`}>
                                                                {feature.progress > 0 ? `+${feature.progress}%` :
                                                                    feature.progress < 0 ? `${feature.progress}%` : "0%"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="relative">
                                                        <CustomProgress
                                                            value={feature.usage}
                                                            color="blue"
                                                            className="h-1.5"
                                                        />
                                                        {feature.previousUsage && (
                                                            <div
                                                                className="absolute top-0 h-1.5 w-0.5 bg-blue-900 opacity-50"
                                                                style={{ left: `${feature.previousUsage}%` }}
                                                            ></div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Update the activity by department section */}
                                    <div className="border rounded-lg p-4 lg:col-span-2">
                                        <h6 className="text-sm font-medium text-blue-gray-800 mb-3">
                                            Activity By Department
                                        </h6>
                                        <div className="space-y-3">
                                            {userInsightsData.activity.activityByDepartment.map((dept, idx) => (
                                                <div key={idx} className="space-y-1">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm">{dept.department}</span>
                                                        <div className="flex items-center">
                                                            <span className="text-sm font-medium">{dept.score}/100</span>
                                                            <span className={`text-xs ml-2 ${getProgressColor(dept.progress)}`}>
                                                                {dept.progress > 0 ? `+${dept.progress}%` :
                                                                    dept.progress < 0 ? `${dept.progress}%` : "0%"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="relative">
                                                        <CustomProgress
                                                            value={dept.score}
                                                            color="blue"
                                                            className="h-1.5"
                                                        />
                                                        {dept.previousScore && (
                                                            <div
                                                                className="absolute top-0 h-1.5 w-0.5 bg-blue-900 opacity-50"
                                                                style={{ left: `${dept.previousScore}%` }}
                                                            ></div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Engagement Tab */}
                        {activeInsightTab === "engagement" && (
                            <div className="p-2">
                                <p className="mb-4 text-blue-gray-700">
                                    {userInsightsData.engagement.summary}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    {userInsightsData.engagement.metrics.map((metric, idx) => (
                                        <div key={idx} className="border rounded-lg p-4">
                                            <p className="text-sm font-medium text-blue-gray-700">
                                                {metric.title}
                                            </p>
                                            <h5 className="text-xl font-bold text-blue-gray-800">
                                                {metric.value}
                                            </h5>
                                            <p className={`flex items-center text-sm ${metric.trendColor}`}>
                                                {metric.icon}
                                                {metric.trend}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="border rounded-lg p-4">
                                        <h6 className="text-sm font-medium text-blue-gray-800 mb-3">
                                            Engagement By Role
                                        </h6>
                                        <div className="space-y-3">
                                            {userInsightsData.engagement.engagementByRole.map((role, idx) => (
                                                <div key={idx} className="space-y-1">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm">{role.role}</span>
                                                        <div className="flex items-center">
                                                            <span className="text-sm font-medium">{role.score}/100</span>
                                                            <span className={`text-xs ml-2 ${getProgressColor(role.progress)}`}>
                                                                {role.progress > 0 ? `+${role.progress}%` :
                                                                    role.progress < 0 ? `${role.progress}%` : "0%"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="relative">
                                                        <CustomProgress
                                                            value={role.score}
                                                            color="indigo"
                                                            className="h-1.5"
                                                        />
                                                        {role.previousScore && (
                                                            <div
                                                                className="absolute top-0 h-1.5 w-0.5 bg-gray-500 opacity-50"
                                                                style={{ left: `${role.previousScore}%` }}
                                                            ></div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <h6 className="text-sm font-medium text-blue-gray-800 mb-3">
                                            Engagement Trend (2025)
                                        </h6>
                                        <div className="h-48">
                                            <Chart
                                                options={{
                                                    chart: {
                                                        type: 'line',
                                                        toolbar: { show: false },
                                                        sparkline: {
                                                            enabled: true
                                                        }
                                                    },
                                                    stroke: {
                                                        curve: 'smooth',
                                                        width: 3
                                                    },
                                                    colors: ['#6366f1'],
                                                    xaxis: {
                                                        categories: userInsightsData.engagement.engagementTrends.map(t => t.month)
                                                    },
                                                    tooltip: {
                                                        y: {
                                                            formatter: (val) => `${val}/100`
                                                        }
                                                    }
                                                }}
                                                series={[{
                                                    name: 'Engagement',
                                                    data: userInsightsData.engagement.engagementTrends.map(t => t.score)
                                                }]}
                                                type="line"
                                                height="100%"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Retention Tab */}
                        {activeInsightTab === "retention" && (
                            <div className="p-2">
                                <p className="mb-4 text-blue-gray-700">
                                    {userInsightsData.retention.summary}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    {userInsightsData.retention.metrics.map((metric, idx) => (
                                        <div key={idx} className="border rounded-lg p-4">
                                            <p className="text-sm font-medium text-blue-gray-700">
                                                {metric.title}
                                            </p>
                                            <h5 className="text-xl font-bold text-blue-gray-800">
                                                {metric.value}
                                            </h5>
                                            <p className={`flex items-center text-sm ${metric.trendColor}`}>
                                                {metric.icon}
                                                {metric.trend}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="border rounded-lg p-4">
                                        <h6 className="text-sm font-medium text-blue-gray-800 mb-3">
                                            Retention By Role
                                        </h6>
                                        <div className="space-y-3">
                                            {userInsightsData.retention.retentionByRole.map((role, idx) => (
                                                <div key={idx} className="space-y-1">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm">{role.role}</span>
                                                        <div className="flex items-center">
                                                            <span className="text-sm font-medium">{role.rate}%</span>
                                                            <span className={`text-xs ml-2 ${getProgressColor(role.progress)}`}>
                                                                {role.progress > 0 ? `+${role.progress}%` :
                                                                    role.progress < 0 ? `${role.progress}%` : "0%"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="relative">
                                                        <CustomProgress
                                                            value={role.rate}
                                                            color="cyan"
                                                            className="h-1.5"
                                                        />
                                                        {role.previousRate && (
                                                            <div
                                                                className="absolute top-0 h-1.5 w-0.5 bg-gray-500 opacity-50"
                                                                style={{ left: `${role.previousRate}%` }}
                                                            ></div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <h6 className="text-sm font-medium text-blue-gray-800 mb-3">
                                            Retention By Department
                                        </h6>
                                        <div className="space-y-3">
                                            {userInsightsData.retention.retentionByDepartment.map((dept, idx) => (
                                                <div key={idx} className="space-y-1">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm">{dept.department}</span>
                                                        <div className="flex items-center">
                                                            <span className="text-sm font-medium">{dept.rate}%</span>
                                                            <span className={`text-xs ml-2 ${getProgressColor(dept.progress)}`}>
                                                                {dept.progress > 0 ? `+${dept.progress}%` :
                                                                    dept.progress < 0 ? `${dept.progress}%` : "0%"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="relative">
                                                        <CustomProgress
                                                            value={dept.rate}
                                                            color="teal"
                                                            className="h-1.5"
                                                        />
                                                        {dept.previousRate && (
                                                            <div
                                                                className="absolute top-0 h-1.5 w-0.5 bg-gray-500 opacity-50"
                                                                style={{ left: `${dept.previousRate}%` }}
                                                            ></div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border rounded-lg p-4 lg:col-span-2">
                                        <h6 className="text-sm font-medium text-blue-gray-800 mb-3">
                                            Retention Trend
                                        </h6>

                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm text-blue-gray-600 mb-2">
                                                <span>Quarter-by-Quarter Retention</span>
                                                <span>Trend Analysis</span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Bar Chart Visualization */}
                                                <div className="h-64">
                                                    <div className="flex items-end justify-between h-48 space-x-1">
                                                        {userInsightsData.retention.retentionTrends.map((quarter, idx) => (
                                                            <div key={idx} className="flex-1 flex flex-col items-center">
                                                                <div className="relative w-full text-center">
                                                                    <div className="h-full flex flex-col items-center">
                                                                        <div
                                                                            className="w-4/5 bg-blue-500 rounded-t transition-all duration-500"
                                                                            style={{ height: `${quarter.rate}%` }}
                                                                        ></div>
                                                                        <div
                                                                            className="w-4/5 bg-red-300 rounded-b transition-all duration-500"
                                                                            style={{ height: `${100 - quarter.rate}%` }}
                                                                        ></div>
                                                                    </div>
                                                                    <div className="absolute bottom-0 w-full h-8 flex justify-center items-end">
                                                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-600">
                                                                            {quarter.rate}%
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p className="text-xs mt-10 font-medium">{quarter.quarter}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Retention Metrics */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center">
                                                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                                        <span className="text-sm font-medium text-blue-gray-800">Retained Users</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="w-3 h-3 rounded-full bg-red-300 mr-2"></div>
                                                        <span className="text-sm font-medium text-blue-gray-800">Churned Users</span>
                                                    </div>

                                                    <div className="border-t pt-3 mt-3">
                                                        <h6 className="text-sm font-medium text-blue-gray-800 mb-2">Latest Quarter Details</h6>
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between">
                                                                <span className="text-xs text-blue-gray-600">New Users:</span>
                                                                <span className="text-xs font-medium">{userInsightsData.retention.retentionTrends[4].newUsers}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-xs text-blue-gray-600">Retained:</span>
                                                                <span className="text-xs font-medium text-blue-600">{userInsightsData.retention.retentionTrends[4].retained}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-xs text-blue-gray-600">Churned:</span>
                                                                <span className="text-xs font-medium text-red-500">{userInsightsData.retention.retentionTrends[4].churn}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="border rounded p-2 bg-blue-50">
                                                        <p className="text-xs text-blue-700">
                                                            User retention has improved steadily across all quarters, with a
                                                            <span className="font-medium"> 3% </span>
                                                            increase year-over-year. Churn rate has stabilized below
                                                            <span className="font-medium"> 8% </span>
                                                            in the latest quarter.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quarterly Comparison */}
                                        <div className="mt-6">
                                            <h6 className="text-sm font-medium text-blue-gray-800 mb-3">
                                                Quarterly Retention by User Type
                                            </h6>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Type</th>
                                                            {userInsightsData.retention.retentionTrends.map((quarter, idx) => (
                                                                <th key={idx} scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    {quarter.quarter}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        <tr>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">Dosen</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">91%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">92%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">93%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">94%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">94%</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">Reviewer</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">95%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">95%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">96%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">96%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">96%</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">Admin</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">98%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">98%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">98%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">98%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">98%</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">All Users</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-blue-600">89%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-blue-600">90%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-blue-600">91%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-blue-600">92%</td>
                                                            <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-blue-600">92%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}                    </div>
                </div>
            </div>
                </>
            )}
        </div>
    );
};

export default UserAnalisis;
