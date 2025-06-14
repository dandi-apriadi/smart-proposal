import React, { useState, useEffect } from "react";
import {
    MdFilterList,
    MdSearch,
    MdDownload,
    MdError,
    MdInfo,
    MdWarning,
    MdCheckCircle,
    MdVisibility,
    MdDelete,
    MdDateRange,
    MdRefresh,
    MdPerson,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight
} from "react-icons/md";
import Card from "components/card";
import AOS from "aos";
import "aos/dist/aos.css";

// Sample data for demonstration
const dummyReports = [
    {
        id: 1,
        userId: "USR001",
        username: "dr_ahmad",
        reportType: "Error",
        title: "Proposal Upload Failed",
        description: "I encountered an error when trying to upload my proposal file",
        status: "Open",
        priority: "High",
        date: "2025-04-15",
        department: "Engineering",
        browser: "Chrome 112.0",
        os: "Windows 11",
        responseTime: null,
    },
    {
        id: 2,
        userId: "USR023",
        username: "linda_reviewer",
        reportType: "Bug",
        title: "Review Form Not Saving",
        description: "The review form doesn't save my comments when I submit it",
        status: "In Progress",
        priority: "Medium",
        date: "2025-04-14",
        department: "Review Committee",
        browser: "Firefox 98.0",
        os: "macOS 14.1",
        responseTime: "4h 23m",
    },
    {
        id: 3,
        userId: "USR045",
        username: "prof_susan",
        reportType: "Feature Request",
        title: "Need Export to PDF Option",
        description: "Would like to have an option to export my proposals as PDF",
        status: "Closed",
        priority: "Low",
        date: "2025-04-10",
        department: "Science",
        browser: "Edge 110.0",
        os: "Windows 10",
        responseTime: "1d 2h 15m",
    },
    {
        id: 4,
        userId: "USR078",
        username: "dr_carlos",
        reportType: "Performance",
        title: "Slow Loading Dashboard",
        description: "Dashboard takes over 10 seconds to load on my device",
        status: "Open",
        priority: "Medium",
        date: "2025-04-15",
        department: "Business",
        browser: "Safari 16.3",
        os: "macOS 14.2",
        responseTime: null,
    },
    {
        id: 5,
        userId: "USR112",
        username: "reviewer_kim",
        reportType: "UI/UX",
        title: "Confusing Navigation",
        description: "The proposal navigation structure is confusing for reviewers",
        status: "In Progress",
        priority: "Medium",
        date: "2025-04-13",
        department: "Arts",
        browser: "Chrome 112.0",
        os: "Linux Ubuntu 22.04",
        responseTime: "2h 45m",
    },
    {
        id: 6,
        userId: "USR054",
        username: "dean_johnson",
        reportType: "Error",
        title: "Session Creation Error",
        description: "Unable to create a new session due to validation errors",
        status: "Closed",
        priority: "High",
        date: "2025-04-08",
        department: "Administration",
        browser: "Chrome 112.0",
        os: "Windows 11",
        responseTime: "5h 12m",
    },
    {
        id: 7,
        userId: "USR098",
        username: "prof_michaels",
        reportType: "Feature Request",
        title: "Collaborative Editing Tool",
        description: "Would be helpful to have multiple reviewers edit a document simultaneously",
        status: "Open",
        priority: "Medium",
        date: "2025-04-15",
        department: "Mathematics",
        browser: "Chrome 112.0",
        os: "Windows 11",
        responseTime: null,
    },
    {
        id: 8,
        userId: "USR132",
        username: "dean_roberts",
        reportType: "Performance",
        title: "Report Generation Delay",
        description: "Generating final reports takes over 2 minutes to complete",
        status: "In Progress",
        priority: "High",
        date: "2025-04-12",
        department: "Administration",
        browser: "Edge 110.0",
        os: "Windows 10",
        responseTime: "6h 15m",
    },
    {
        id: 9,
        userId: "USR045",
        username: "prof_susan",
        reportType: "Bug",
        title: "Comments Not Displaying",
        description: "Review comments aren't displaying properly in the proposal view",
        status: "Closed",
        priority: "Medium",
        date: "2025-04-09",
        department: "Science",
        browser: "Firefox 98.0",
        os: "macOS 14.1",
        responseTime: "1d 5h 45m",
    },
    {
        id: 10,
        userId: "USR201",
        username: "dr_patel",
        reportType: "UI/UX",
        title: "Dashboard Accessibility Issues",
        description: "Dashboard elements aren't properly accessible with screen readers",
        status: "Open",
        priority: "High",
        date: "2025-04-15",
        department: "Health Sciences",
        browser: "Chrome 112.0",
        os: "Windows 11",
        responseTime: null,
    },
    {
        id: 11,
        userId: "USR067",
        username: "reviewer_johnson",
        reportType: "Error",
        title: "Document Preview Error",
        description: "Getting an error when trying to preview PDF documents in the review panel",
        status: "In Progress",
        priority: "Medium",
        date: "2025-04-13",
        department: "Literature",
        browser: "Chrome 112.0",
        os: "Windows 10",
        responseTime: "1h 30m",
    },
    {
        id: 12,
        userId: "USR089",
        username: "dr_zhang",
        reportType: "Feature Request",
        title: "Customizable Dashboard Widgets",
        description: "Would like to be able to customize which widgets appear on my dashboard",
        status: "Closed",
        priority: "Low",
        date: "2025-04-07",
        department: "Computer Science",
        browser: "Chrome 112.0",
        os: "Linux Ubuntu 22.04",
        responseTime: "3d 2h 15m",
    },
    {
        id: 13,
        userId: "USR156",
        username: "chair_williams",
        reportType: "Performance",
        title: "Batch Export Performance",
        description: "Exporting multiple proposals at once is extremely slow",
        status: "Open",
        priority: "High",
        date: "2025-04-14",
        department: "Business",
        browser: "Safari 16.3",
        os: "macOS 14.2",
        responseTime: null,
    },
    {
        id: 14,
        userId: "USR078",
        username: "dr_carlos",
        reportType: "Bug",
        title: "Session Date Calculation Error",
        description: "The system is calculating session end dates incorrectly",
        status: "In Progress",
        priority: "High",
        date: "2025-04-14",
        department: "Business",
        browser: "Chrome 112.0",
        os: "Windows 11",
        responseTime: "5h 10m",
    },
    {
        id: 15,
        userId: "USR211",
        username: "dean_thompson",
        reportType: "UI/UX",
        title: "Mobile Responsiveness Issues",
        description: "The review interface is not properly responsive on mobile devices",
        status: "Closed",
        priority: "Medium",
        date: "2025-04-08",
        department: "Administration",
        browser: "Safari Mobile 16.3",
        os: "iOS 18.2",
        responseTime: "2d 3h 40m",
    },
    {
        id: 16,
        userId: "USR099",
        username: "professor_lee",
        reportType: "Error",
        title: "Permission Access Denied",
        description: "Getting access denied messages when trying to access my own proposals",
        status: "Open",
        priority: "High",
        date: "2025-04-15",
        department: "Physics",
        browser: "Firefox 98.0",
        os: "Windows 11",
        responseTime: null,
    },
    {
        id: 17,
        userId: "USR143",
        username: "dr_morgan",
        reportType: "Feature Request",
        title: "Bulk Status Update",
        description: "Need ability to update status of multiple proposals at once",
        status: "In Progress",
        priority: "Low",
        date: "2025-04-11",
        department: "Mathematics",
        browser: "Chrome 112.0",
        os: "Windows 10",
        responseTime: "2d 1h 15m",
    },
    {
        id: 18,
        userId: "USR165",
        username: "reviewer_chen",
        reportType: "Bug",
        title: "Sorting Functionality Broken",
        description: "Table sorting doesn't work properly in the review dashboard",
        status: "Closed",
        priority: "Medium",
        date: "2025-04-06",
        department: "Economics",
        browser: "Edge 110.0",
        os: "Windows 11",
        responseTime: "8h 20m",
    },
    {
        id: 19,
        userId: "USR112",
        username: "reviewer_kim",
        reportType: "Performance",
        title: "Search Results Delay",
        description: "Search functionality is very slow when looking through large proposals",
        status: "Open",
        priority: "Medium",
        date: "2025-04-15",
        department: "Arts",
        browser: "Chrome 112.0",
        os: "macOS 14.1",
        responseTime: null,
    },
    {
        id: 20,
        userId: "USR187",
        username: "prof_wilson",
        reportType: "UI/UX",
        title: "Color Contrast Issues",
        description: "Some text is difficult to read due to poor contrast ratios",
        status: "In Progress",
        priority: "Low",
        date: "2025-04-10",
        department: "Design",
        browser: "Chrome 112.0",
        os: "Windows 10",
        responseTime: "3h 45m",
    },
];

// Chart data for visualization
const reportTypeData = [
    { type: "Error", count: 25, color: "#FF5B5B" },
    { type: "Bug", count: 18, color: "#FFBB5B" },
    { type: "Feature", count: 12, color: "#5B8CFF" },
    { type: "Performance", count: 8, color: "#5BFFB1" },
    { type: "UI/UX", count: 15, color: "#C15BFF" },
];

const reportStatusData = [
    { status: "Open", count: 28, color: "#FF5B5B" },
    { status: "In Progress", count: 15, color: "#FFBB5B" },
    { status: "Closed", count: 35, color: "#5BFFB1" },
];

const UserReports = () => {
    const [reports, setReports] = useState(dummyReports);
    const [filteredReports, setFilteredReports] = useState(dummyReports);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedPriority, setSelectedPriority] = useState("All");
    const [selectedReportType, setSelectedReportType] = useState("All");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [selectedReport, setSelectedReport] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [paginatedReports, setPaginatedReports] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    useEffect(() => {
        // Filter reports based on selected filters and search term
        let result = [...reports];

        if (searchTerm) {
            result = result.filter(
                (report) =>
                    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    report.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    report.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedStatus !== "All") {
            result = result.filter((report) => report.status === selectedStatus);
        }

        if (selectedPriority !== "All") {
            result = result.filter((report) => report.priority === selectedPriority);
        }

        if (selectedReportType !== "All") {
            result = result.filter((report) => report.reportType === selectedReportType);
        }

        if (dateRange.start && dateRange.end) {
            result = result.filter(
                (report) =>
                    report.date >= dateRange.start && report.date <= dateRange.end
            );
        }

        setFilteredReports(result);

        // Reset to first page when filters change
        setCurrentPage(1);

        // Calculate total pages
        const pages = Math.ceil(result.length / itemsPerPage);
        setTotalPages(pages > 0 ? pages : 1);
    }, [searchTerm, selectedStatus, selectedPriority, selectedReportType, dateRange, reports, itemsPerPage]);

    // Apply pagination to filtered reports
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedReports(filteredReports.slice(startIndex, endIndex));
    }, [filteredReports, currentPage, itemsPerPage]);

    const handleReportClick = (report) => {
        setSelectedReport(report);
        setShowDetailModal(true);
    };

    // Pagination handlers
    const goToPage = (pageNumber) => {
        const page = Math.max(1, Math.min(pageNumber, totalPages));
        setCurrentPage(page);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium ${i === currentPage
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                        }`}
                    onClick={() => goToPage(i)}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Open":
                return "text-red-500 bg-red-100";
            case "In Progress":
                return "text-yellow-500 bg-yellow-100";
            case "Closed":
                return "text-green-500 bg-green-100";
            default:
                return "text-gray-500 bg-gray-100";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High":
                return "text-red-500";
            case "Medium":
                return "text-yellow-500";
            case "Low":
                return "text-blue-500";
            default:
                return "text-gray-500";
        }
    };

    const getReportTypeIcon = (type) => {
        switch (type) {
            case "Error":
                return <MdError className="text-red-500" />;
            case "Bug":
                return <MdWarning className="text-yellow-500" />;
            case "Feature Request":
                return <MdInfo className="text-blue-500" />;
            case "Performance":
                return <MdRefresh className="text-purple-500" />;
            case "UI/UX":
                return <MdPerson className="text-green-500" />;
            default:
                return <MdInfo className="text-gray-500" />;
        }
    };

    // Calculate summary statistics
    const totalReports = reports.length;
    const openReports = reports.filter(r => r.status === "Open").length;
    const inProgressReports = reports.filter(r => r.status === "In Progress").length;
    const closedReports = reports.filter(r => r.status === "Closed").length;
    const highPriorityReports = reports.filter(r => r.priority === "High").length;

    return (
        <div className="mt-3" data-aos="fade-up">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <Card extra="!p-4 flex flex-col items-center">
                    <p className="text-sm font-medium text-gray-600">Total Reports</p>
                    <p className="text-3xl font-bold text-navy-700 mt-2">{totalReports}</p>
                </Card>

                <Card extra="!p-4 flex flex-col items-center">
                    <p className="text-sm font-medium text-gray-600">Open</p>
                    <p className="text-3xl font-bold text-red-500 mt-2">{openReports}</p>
                </Card>

                <Card extra="!p-4 flex flex-col items-center">
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-3xl font-bold text-yellow-500 mt-2">{inProgressReports}</p>
                </Card>

                <Card extra="!p-4 flex flex-col items-center">
                    <p className="text-sm font-medium text-gray-600">Closed</p>
                    <p className="text-3xl font-bold text-green-500 mt-2">{closedReports}</p>
                </Card>

                <Card extra="!p-4 flex flex-col items-center">
                    <p className="text-sm font-medium text-gray-600">High Priority</p>
                    <p className="text-3xl font-bold text-orange-500 mt-2">{highPriorityReports}</p>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <Card extra="!p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-lg font-bold text-navy-700">Report Types</h4>
                    </div>
                    <div className="h-64 flex items-end justify-between space-x-2 px-8">
                        {reportTypeData.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <div
                                    className="w-12 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                                    style={{
                                        height: `${(item.count / Math.max(...reportTypeData.map(d => d.count))) * 180}px`,
                                        backgroundColor: item.color
                                    }}
                                ></div>
                                <span className="mt-2 text-xs font-medium text-gray-600">{item.type}</span>
                                <span className="text-sm font-bold text-navy-700">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card extra="!p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-lg font-bold text-navy-700">Report Status</h4>
                    </div>
                    <div className="flex h-64 items-center justify-center">
                        <div className="relative h-44 w-44">
                            {reportStatusData.map((item, idx) => {
                                const total = reportStatusData.reduce((acc, curr) => acc + curr.count, 0);
                                const percentage = (item.count / total) * 100;

                                // Calculate the rotation and size for each segment
                                const rotation = reportStatusData
                                    .slice(0, idx)
                                    .reduce((acc, curr) => acc + (curr.count / total) * 360, 0);

                                return (
                                    <div
                                        key={idx}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: `conic-gradient(${item.color} 0deg, ${item.color} ${percentage * 3.6}deg, transparent ${percentage * 3.6}deg, transparent 360deg)`,
                                                transform: `rotate(${rotation}deg)`,
                                            }}
                                        ></div>
                                        <div className="absolute inset-3 bg-white rounded-full"></div>
                                    </div>
                                );
                            })}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-bold text-navy-700">{totalReports}</span>
                            </div>
                        </div>
                        <div className="ml-8 space-y-2">
                            {reportStatusData.map((item, idx) => (
                                <div key={idx} className="flex items-center">
                                    <div className="h-3 w-3 mr-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {item.status} ({item.count})
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card extra="!p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search reports..."
                                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MdSearch className="absolute left-3 top-2.5 text-lg text-gray-500" />
                        </div>
                    </div>

                    <div>
                        <select
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    <div>
                        <select
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                        >
                            <option value="All">All Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div>
                        <select
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedReportType}
                            onChange={(e) => setSelectedReportType(e.target.value)}
                        >
                            <option value="All">All Types</option>
                            <option value="Error">Error</option>
                            <option value="Bug">Bug</option>
                            <option value="Feature Request">Feature</option>
                            <option value="Performance">Performance</option>
                            <option value="UI/UX">UI/UX</option>
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button className="mr-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition duration-200 flex items-center">
                            <MdFilterList className="mr-1" /> Filter
                        </button>
                        <button className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 transition duration-200 flex items-center">
                            <MdDownload className="mr-1" /> Export
                        </button>
                    </div>
                </div>
            </Card>

            {/* Table of Reports */}
            <Card extra="!p-4">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] table-auto">
                        <thead>
                            <tr>
                                <th className="border-b border-gray-200 pb-3 text-start text-sm font-medium text-gray-600">Report ID</th>
                                <th className="border-b border-gray-200 pb-3 text-start text-sm font-medium text-gray-600">User</th>
                                <th className="border-b border-gray-200 pb-3 text-start text-sm font-medium text-gray-600">Type</th>
                                <th className="border-b border-gray-200 pb-3 text-start text-sm font-medium text-gray-600">Title</th>
                                <th className="border-b border-gray-200 pb-3 text-start text-sm font-medium text-gray-600">Status</th>
                                <th className="border-b border-gray-200 pb-3 text-start text-sm font-medium text-gray-600">Priority</th>
                                <th className="border-b border-gray-200 pb-3 text-start text-sm font-medium text-gray-600">Date</th>
                                <th className="border-b border-gray-200 pb-3 text-start text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedReports.length > 0 ? (
                                paginatedReports.map((report, index) => (
                                    <tr
                                        key={report.id}
                                        className={`cursor-pointer hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50/50' : ''}`}
                                        onClick={() => handleReportClick(report)}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 50}
                                    >
                                        <td className="py-3 text-sm font-medium text-navy-700">#{report.id}</td>
                                        <td className="py-3 text-sm font-medium text-navy-700">{report.username}</td>
                                        <td className="py-3">
                                            <div className="flex items-center">
                                                {getReportTypeIcon(report.reportType)}
                                                <span className="ml-2 text-sm font-medium">{report.reportType}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-sm">{report.title}</td>
                                        <td className="py-3">
                                            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(report.status)}`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="py-3">
                                            <span className={`text-sm font-medium ${getPriorityColor(report.priority)}`}>
                                                {report.priority}
                                            </span>
                                        </td>
                                        <td className="py-3 text-sm text-gray-600">{report.date}</td>
                                        <td className="py-3">
                                            <div className="flex space-x-2">
                                                <button
                                                    className="rounded-full p-1.5 text-gray-600 hover:bg-gray-100"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleReportClick(report);
                                                    }}
                                                >
                                                    <MdVisibility className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="rounded-full p-1.5 text-red-500 hover:bg-red-50"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Handle delete action
                                                    }}
                                                >
                                                    <MdDelete className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="py-6 text-center text-gray-500">
                                        No reports found matching your filters
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Showing {paginatedReports.length > 0 ?
                        `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredReports.length)}` :
                        '0'} of {filteredReports.length} reports
                </div>
                <div className="flex space-x-1">
                    <button
                        className={`rounded-md px-3 py-1.5 text-sm font-medium flex items-center ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                    >
                        <MdKeyboardArrowLeft className="mr-1" /> Previous
                    </button>

                    {renderPageNumbers()}

                    <button
                        className={`rounded-md px-3 py-1.5 text-sm font-medium flex items-center ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next <MdKeyboardArrowRight className="ml-1" />
                    </button>
                </div>
            </div>

            {/* Items per page selector */}
            <div className="mt-3 flex justify-end">
                <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">Items per page:</span>
                    <select
                        className="rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                        <option value={5}>5</option>
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowDetailModal(false)}>
                    <div
                        className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6"
                        onClick={(e) => e.stopPropagation()}
                        data-aos="zoom-in"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-navy-700">Report Details #{selectedReport.id}</h3>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowDetailModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-gray-500">User</p>
                                <p className="font-medium">{selectedReport.username} ({selectedReport.userId})</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Department</p>
                                <p className="font-medium">{selectedReport.department}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                                    {selectedReport.status}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Priority</p>
                                <span className={`text-sm font-medium ${getPriorityColor(selectedReport.priority)}`}>
                                    {selectedReport.priority}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Date Submitted</p>
                                <p className="font-medium">{selectedReport.date}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Response Time</p>
                                <p className="font-medium">{selectedReport.responseTime || "Not responded yet"}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-1">Report Type</p>
                            <div className="flex items-center">
                                {getReportTypeIcon(selectedReport.reportType)}
                                <span className="ml-2 font-medium">{selectedReport.reportType}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-1">Title</p>
                            <p className="text-lg font-medium">{selectedReport.title}</p>
                        </div>

                        <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-1">Description</p>
                            <p className="p-3 bg-gray-50 rounded-lg">{selectedReport.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-gray-500">Browser</p>
                                <p className="font-medium">{selectedReport.browser}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Operating System</p>
                                <p className="font-medium">{selectedReport.os}</p>
                            </div>
                        </div>

                        <div className="mt-6 border-t pt-6">
                            <h4 className="text-md font-bold mb-3">Admin Response</h4>

                            {selectedReport.status === "Closed" ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="font-medium text-green-800">This report has been resolved and closed.</p>
                                    <p className="text-sm text-green-700 mt-1">Closed on: 2025-04-16</p>
                                </div>
                            ) : (
                                <textarea
                                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your response to this report..."
                                    rows={4}
                                ></textarea>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                onClick={() => setShowDetailModal(false)}
                            >
                                Cancel
                            </button>

                            {selectedReport.status !== "Closed" && (
                                <>
                                    <button className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600">
                                        {selectedReport.status === "Open" ? "Mark as In Progress" : "Mark as Open"}
                                    </button>
                                    <button className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600">
                                        Mark as Resolved
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserReports;
