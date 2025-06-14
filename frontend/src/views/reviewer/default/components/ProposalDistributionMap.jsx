import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Chart from 'chart.js/auto';
import {
    MdRefresh,
    MdOutlineCheckCircle,
    MdOutlineCancel,
    MdOutlineHourglassEmpty,
    MdOutlineAllInclusive,
    MdOutlineLocationOn
} from "react-icons/md";

const ProposalDistributionMap = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const { baseURL } = useSelector((state) => state.auth);

    // References for the charts
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const barChartInstance = useRef(null);
    const pieChartInstance = useRef(null);

    // Dummy data for proposals distribution
    const proposalData = [
        { id: 1, location: "Manado", count: 12, status: "pending" },
        { id: 2, location: "Ternate", count: 8, status: "approved" },
        { id: 3, location: "Makassar", count: 15, status: "pending" },
        { id: 4, location: "Yogyakarta", count: 20, status: "approved" },
        { id: 5, location: "Jakarta", count: 25, status: "rejected" },
        { id: 6, location: "Surabaya", count: 18, status: "approved" },
        { id: 7, location: "Denpasar", count: 10, status: "pending" }
    ];

    // Filter proposals by status
    const filteredProposals = selectedFilter === "all"
        ? proposalData
        : proposalData.filter(proposal => proposal.status === selectedFilter);

    // Calculate total proposals
    const totalProposals = proposalData.reduce((acc, curr) => acc + curr.count, 0);
    const pendingProposals = proposalData.filter(p => p.status === "pending").reduce((acc, curr) => acc + curr.count, 0);
    const approvedProposals = proposalData.filter(p => p.status === "approved").reduce((acc, curr) => acc + curr.count, 0);
    const rejectedProposals = proposalData.filter(p => p.status === "rejected").reduce((acc, curr) => acc + curr.count, 0);

    // Status colors
    const getStatusColor = (status) => {
        switch (status) {
            case "approved": return "#10B981"; // green
            case "rejected": return "#EF4444"; // red
            case "pending": return "#F59E0B"; // amber
            default: return "#6366F1"; // indigo
        }
    };

    // Create and update bar chart
    useEffect(() => {
        if (barChartInstance.current) {
            barChartInstance.current.destroy();
        }

        if (!barChartRef.current) return;

        // Prepare data for bar chart (by location)
        const locationData = filteredProposals.map(item => ({
            location: item.location,
            count: item.count,
            status: item.status
        }));

        // Sort locations by count (descending)
        locationData.sort((a, b) => b.count - a.count);

        const ctx = barChartRef.current.getContext('2d');
        barChartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: locationData.map(item => item.location),
                datasets: [{
                    label: 'Number of Proposals',
                    data: locationData.map(item => item.count),
                    backgroundColor: locationData.map(item => getStatusColor(item.status)),
                    borderColor: locationData.map(item => getStatusColor(item.status)),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const item = locationData[context.dataIndex];
                                return [
                                    `Count: ${item.count} proposals`,
                                    `Status: ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Proposals'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Location'
                        }
                    }
                }
            }
        });

        return () => {
            if (barChartInstance.current) {
                barChartInstance.current.destroy();
            }
        };
    }, [filteredProposals]);

    // Create and update pie chart
    useEffect(() => {
        if (pieChartInstance.current) {
            pieChartInstance.current.destroy();
        }

        if (!pieChartRef.current) return;

        // Prepare data for status distribution pie chart
        let statusData;

        if (selectedFilter === "all") {
            statusData = [
                { status: "pending", count: pendingProposals },
                { status: "approved", count: approvedProposals },
                { status: "rejected", count: rejectedProposals }
            ];
        } else {
            // If filtering by status, show distribution by location
            const locationCounts = {};
            filteredProposals.forEach(item => {
                locationCounts[item.location] = item.count;
            });

            statusData = Object.keys(locationCounts).map(location => ({
                status: location,
                count: locationCounts[location]
            }));
        }

        const ctx = pieChartRef.current.getContext('2d');
        pieChartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: statusData.map(item =>
                    item.status.charAt(0).toUpperCase() + item.status.slice(1)),
                datasets: [{
                    data: statusData.map(item => item.count),
                    backgroundColor: selectedFilter === "all"
                        ? statusData.map(item => getStatusColor(item.status))
                        : [
                            '#4F46E5', '#8B5CF6', '#EC4899', '#F59E0B',
                            '#10B981', '#3B82F6', '#EF4444'
                        ].slice(0, statusData.length),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 15,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${value} proposals (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });

        return () => {
            if (pieChartInstance.current) {
                pieChartInstance.current.destroy();
            }
        };
    }, [filteredProposals, selectedFilter, pendingProposals, approvedProposals, rejectedProposals]);

    return (
        <div className="w-full bg-white rounded-xl shadow-md p-6 overflow-hidden" data-aos="fade-up">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-gray-800">Proposal Distribution</h2>
                <button
                    onClick={() => window.location.reload()}
                    className="flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                    <MdRefresh className="mr-1" /> Refresh Data
                </button>
            </div>

            {/* Status Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    onClick={() => setSelectedFilter("all")}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === "all"
                        ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    <MdOutlineAllInclusive className="mr-1.5" size={18} />
                    All
                </button>
                <button
                    onClick={() => setSelectedFilter("pending")}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === "pending"
                        ? "bg-amber-100 text-amber-700 border-2 border-amber-300"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    <MdOutlineHourglassEmpty className="mr-1.5" size={18} />
                    Pending
                </button>
                <button
                    onClick={() => setSelectedFilter("approved")}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === "approved"
                        ? "bg-green-100 text-green-700 border-2 border-green-300"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    <MdOutlineCheckCircle className="mr-1.5" size={18} />
                    Approved
                </button>
                <button
                    onClick={() => setSelectedFilter("rejected")}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedFilter === "rejected"
                        ? "bg-red-100 text-red-700 border-2 border-red-300"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    <MdOutlineCancel className="mr-1.5" size={18} />
                    Rejected
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm font-medium text-gray-500">Total Proposals</div>
                            <div className="text-2xl font-bold text-gray-800 mt-1">{totalProposals}</div>
                        </div>
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <MdOutlineAllInclusive className="text-indigo-600" size={24} />
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">From all regions</div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-amber-500 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm font-medium text-amber-600">Pending</div>
                            <div className="text-2xl font-bold text-gray-800 mt-1">{pendingProposals}</div>
                        </div>
                        <div className="bg-amber-100 p-2 rounded-lg">
                            <MdOutlineHourglassEmpty className="text-amber-600" size={24} />
                        </div>
                    </div>
                    <div className="text-xs text-amber-600 mt-2">{((pendingProposals / totalProposals) * 100).toFixed(1)}% of total</div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm font-medium text-green-600">Approved</div>
                            <div className="text-2xl font-bold text-gray-800 mt-1">{approvedProposals}</div>
                        </div>
                        <div className="bg-green-100 p-2 rounded-lg">
                            <MdOutlineCheckCircle className="text-green-600" size={24} />
                        </div>
                    </div>
                    <div className="text-xs text-green-600 mt-2">{((approvedProposals / totalProposals) * 100).toFixed(1)}% of total</div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm font-medium text-red-600">Rejected</div>
                            <div className="text-2xl font-bold text-gray-800 mt-1">{rejectedProposals}</div>
                        </div>
                        <div className="bg-red-100 p-2 rounded-lg">
                            <MdOutlineCancel className="text-red-600" size={24} />
                        </div>
                    </div>
                    <div className="text-xs text-red-600 mt-2">{((rejectedProposals / totalProposals) * 100).toFixed(1)}% of total</div>
                </div>
            </div>

            {/* Charts Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                {/* Bar Chart - Proposals by Location */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-md font-medium text-gray-700 flex items-center">
                            <MdOutlineLocationOn className="mr-1.5 text-indigo-500" size={20} />
                            Proposals by Location
                        </h3>
                        <div className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded-full">
                            {selectedFilter === "all" ? "All Statuses" : selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
                        </div>
                    </div>
                    <div className="h-[300px] relative">
                        <canvas ref={barChartRef}></canvas>
                    </div>
                </div>

                {/* Pie/Doughnut Chart - Status or Location Distribution */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-md font-medium text-gray-700">
                            {selectedFilter === "all"
                                ? "Distribution by Status"
                                : `${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Proposals by Location`}
                        </h3>
                    </div>
                    <div className="h-[300px] relative">
                        <canvas ref={pieChartRef}></canvas>
                    </div>
                </div>
            </div>

            {/* Visualization Context */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-blue-700">About this visualization</div>
                        <div className="text-sm text-blue-600 mt-1">
                            {selectedFilter === "all"
                                ? "The bar chart shows proposal counts by location, while the doughnut chart shows distribution by status (pending, approved, rejected)."
                                : `The bar chart shows ${selectedFilter} proposal counts by location, while the doughnut chart shows the distribution of ${selectedFilter} proposals across different locations.`
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalDistributionMap;
