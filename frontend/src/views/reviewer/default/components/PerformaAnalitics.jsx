import React, { useState, useEffect } from 'react';
import {
    MdAssessment,
    MdAccessTime,
    MdTrendingUp,
    MdCompare,
    MdCalendarToday,
    MdFilterList,
    MdRefresh
} from 'react-icons/md';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const PerformaAnalitics = () => {
    // States for date range and filters
    const [dateRange, setDateRange] = useState('month');
    const [filterType, setFilterType] = useState('all');
    const [selectedBarIndex, setSelectedBarIndex] = useState(null);

    // Dummy data for charts
    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Your Reviews',
                data: [12, 19, 8, 15, 22, 17],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.4,
            },
            {
                label: 'Average Reviews',
                data: [10, 15, 10, 12, 18, 14],
                borderColor: '#9CA3AF',
                backgroundColor: 'rgba(156, 163, 175, 0.5)',
                tension: 0.4,
                borderDash: [5, 5],
            },
        ],
    };

    // Enhanced barChartData with more review types and improved styling
    const barChartData = {
        labels: ['Initial Review', 'Progress Report', 'Interim Review', 'Final Report', 'Follow-up'],
        datasets: [
            {
                label: 'Average Time (days)',
                data: [2.5, 3.1, 3.8, 4.2, 1.9],
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.9)');
                    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.4)');
                    return gradient;
                },
                borderRadius: 6,
                borderWidth: 1,
                borderColor: 'rgba(59, 130, 246, 1)',
            },
            {
                label: 'Your Time (days)',
                data: [2.1, 2.8, 3.3, 3.5, 1.5],
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.9)');
                    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.4)');
                    return gradient;
                },
                borderRadius: 6,
                borderWidth: 1,
                borderColor: 'rgba(16, 185, 129, 1)',
            },
            {
                label: 'Target Time (days)',
                data: [2.0, 3.0, 3.5, 4.0, 1.5],
                type: 'line',
                borderColor: 'rgba(239, 68, 68, 0.8)',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(239, 68, 68, 1)',
            }
        ],
    };

    const doughnutData = {
        labels: ['Approved', 'Revisions Needed', 'Rejected'],
        datasets: [
            {
                data: [65, 25, 10],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Stats data
    const statsData = [
        { label: 'Total Reviews', value: 47, change: '+12%', positive: true },
        { label: 'Avg. Time Per Review', value: '2.8 days', change: '-8%', positive: true },
        { label: 'Pending Reviews', value: 5, change: '+2', positive: false },
        { label: 'Review Completion Rate', value: '94%', change: '+3%', positive: true },
    ];

    // Time efficiency detail data
    const timeEfficiencyDetails = [
        { type: 'Initial Review', yours: 2.1, avg: 2.5, improvement: '16%', suggestions: 'Currently performing well. Continue to maintain this efficiency.' },
        { type: 'Progress Report', yours: 2.8, avg: 3.1, improvement: '10%', suggestions: 'Good performance. Consider using the review template for faster assessments.' },
        { type: 'Interim Review', yours: 3.3, avg: 3.8, improvement: '13%', suggestions: 'Above average speed. The checklist approach seems to be working well.' },
        { type: 'Final Report', yours: 3.5, avg: 4.2, improvement: '17%', suggestions: 'Excellent time savings. Your thorough initial reviews likely help speed up finals.' },
        { type: 'Follow-up', yours: 1.5, avg: 1.9, improvement: '21%', suggestions: 'Very efficient follow-up reviews. Keep using the quick-check method.' },
    ];

    // Handle date range change
    const handleDateRangeChange = (range) => {
        setDateRange(range);
        // In a real app, you would fetch new data based on range
    };

    // Handle filter type change
    const handleFilterChange = (filter) => {
        setFilterType(filter);
        // In a real app, you would apply the filter to the data
    };

    // Function to handle bar click
    const handleBarClick = (index) => {
        setSelectedBarIndex(index === selectedBarIndex ? null : index);
    };

    return (
        <div className="w-full" data-aos="fade-up" data-aos-duration="800">
            {/* Header with filters */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Performance Analytics</h2>
                    <p className="text-gray-600">Track your review performance and efficiency</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
                        <MdCalendarToday className="mr-2 text-gray-500" />
                        <select
                            className="bg-transparent text-gray-700 focus:outline-none"
                            value={dateRange}
                            onChange={(e) => handleDateRangeChange(e.target.value)}
                        >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>

                    <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
                        <MdFilterList className="mr-2 text-gray-500" />
                        <select
                            className="bg-transparent text-gray-700 focus:outline-none"
                            value={filterType}
                            onChange={(e) => handleFilterChange(e.target.value)}
                        >
                            <option value="all">All Proposals</option>
                            <option value="initial">Initial Reviews</option>
                            <option value="progress">Progress Reports</option>
                            <option value="final">Final Reports</option>
                        </select>
                    </div>

                    <button className="flex items-center bg-white rounded-lg shadow-sm p-2 hover:bg-gray-50 transition">
                        <MdRefresh className="mr-2 text-gray-500" />
                        <span className="text-gray-700">Refresh</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {statsData.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition" data-aos="fade-up" data-aos-delay={index * 100}>
                        <p className="text-gray-500 mb-1">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                            <span className={`flex items-center text-sm ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.change}
                                <MdTrendingUp className={`ml-1 ${!stat.positive && 'transform rotate-180'}`} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Reviews Over Time Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5" data-aos="fade-up">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                            <MdAssessment className="mr-2 text-blue-500" />
                            Reviews Completed Over Time
                        </h3>
                    </div>
                    <div className="h-80">
                        <Line
                            data={lineChartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        grid: {
                                            display: true,
                                            color: 'rgba(0, 0, 0, 0.05)',
                                        },
                                    },
                                    x: {
                                        grid: {
                                            display: false,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Decision Distribution */}
                <div className="bg-white rounded-xl shadow-sm p-5" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                            <MdCompare className="mr-2 text-green-500" />
                            Review Decisions
                        </h3>
                    </div>
                    <div className="h-80 flex items-center justify-center">
                        <Doughnut
                            data={doughnutData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Time Efficiency Chart */}
            <div className="bg-white rounded-xl shadow-sm p-5 mb-6" data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                        <MdAccessTime className="mr-2 text-yellow-500" />
                        Time Efficiency Analysis
                    </h3>
                    <div className="text-sm text-gray-500">
                        Click on bars for detailed insights
                    </div>
                </div>
                <div className="h-80">
                    <Bar
                        data={barChartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top',
                                    labels: {
                                        usePointStyle: true,
                                        padding: 20,
                                        font: {
                                            size: 12
                                        }
                                    }
                                },
                                tooltip: {
                                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                                    padding: 12,
                                    bodyFont: {
                                        size: 13
                                    },
                                    titleFont: {
                                        size: 14,
                                        weight: 'bold'
                                    },
                                    callbacks: {
                                        label: function (context) {
                                            const label = context.dataset.label || '';
                                            const value = context.parsed.y || 0;
                                            return `${label}: ${value} days`;
                                        },
                                        afterLabel: function (context) {
                                            if (context.datasetIndex === 1) { // "Your Time" dataset
                                                const avgTime = barChartData.datasets[0].data[context.dataIndex];
                                                const yourTime = context.parsed.y;
                                                const diff = avgTime - yourTime;
                                                const percentage = ((diff / avgTime) * 100).toFixed(1);
                                                return `${diff > 0 ? 'Faster by' : 'Slower by'} ${Math.abs(diff).toFixed(1)} days (${percentage}%)`;
                                            }
                                            return null;
                                        }
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Days',
                                        font: {
                                            weight: 'bold'
                                        }
                                    },
                                    grid: {
                                        display: true,
                                        color: 'rgba(0, 0, 0, 0.05)',
                                    },
                                    ticks: {
                                        stepSize: 1,
                                        callback: function (value) {
                                            return value + ' d';
                                        }
                                    }
                                },
                                x: {
                                    grid: {
                                        display: false,
                                    },
                                }
                            },
                            onClick: (event, elements) => {
                                if (elements.length > 0) {
                                    handleBarClick(elements[0].index);
                                }
                            },
                            animation: {
                                duration: 1000,
                                easing: 'easeOutQuart'
                            }
                        }}
                    />
                </div>

                {selectedBarIndex !== null && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-fadeIn">
                        <h4 className="font-medium text-blue-800 mb-2">
                            {timeEfficiencyDetails[selectedBarIndex].type} - Detailed Analysis
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <div className="bg-white p-3 rounded-md shadow-sm">
                                <p className="text-sm text-gray-500">Your Average Time</p>
                                <p className="text-xl font-bold text-blue-600">{timeEfficiencyDetails[selectedBarIndex].yours} days</p>
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm">
                                <p className="text-sm text-gray-500">Overall Average</p>
                                <p className="text-xl font-bold text-gray-600">{timeEfficiencyDetails[selectedBarIndex].avg} days</p>
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm">
                                <p className="text-sm text-gray-500">Improvement</p>
                                <p className="text-xl font-bold text-green-600">{timeEfficiencyDetails[selectedBarIndex].improvement}</p>
                            </div>
                        </div>
                        <div className="text-sm text-blue-700 bg-white p-3 rounded-md shadow-sm">
                            <p className="font-medium mb-1">Optimization Suggestions:</p>
                            <p>{timeEfficiencyDetails[selectedBarIndex].suggestions}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Performance Insights */}
            <div className="bg-white rounded-xl shadow-sm p-5" data-aos="fade-up" data-aos-delay="300">
                <h3 className="font-semibold text-gray-800 mb-4">Performance Insights</h3>
                <div className="space-y-3">
                    <div className="flex items-start p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                        <MdTrendingUp className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                            <p className="text-blue-800 font-medium">Your review completion rate is above average</p>
                            <p className="text-blue-600 text-sm">You complete reviews 18% faster than other reviewers.</p>
                        </div>
                    </div>

                    <div className="flex items-start p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                        <MdTrendingUp className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                            <p className="text-green-800 font-medium">High quality review feedback</p>
                            <p className="text-green-600 text-sm">Your detailed comments have been rated highly by proposal authors.</p>
                        </div>
                    </div>

                    <div className="flex items-start p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
                        <MdTrendingUp className="text-yellow-500 transform rotate-180 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                            <p className="text-yellow-800 font-medium">Consider improving final report review time</p>
                            <p className="text-yellow-600 text-sm">Your final report reviews take 2.1 days longer than your initial reviews.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformaAnalitics;
