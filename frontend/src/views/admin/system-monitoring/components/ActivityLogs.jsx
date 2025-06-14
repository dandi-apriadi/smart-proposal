import React, { useState, useEffect } from "react";
import {
    MdSearch,
    MdFilterList,
    MdDownload,
    MdRefresh,
    MdInfo,
    MdWarning,
    MdError,
    MdCheckCircle,
    MdArrowDropDown,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdFirstPage,
    MdLastPage,
    MdClear
} from "react-icons/md";
import Card from "components/card";

const ActivityLogs = () => {
    // States for filtering and pagination
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        severity: "all",
        date: "all",
        user: "all",
        module: "all",
    });

    // Dummy data for activity logs
    const dummyLogs = [
        {
            id: 1,
            timestamp: "2025-04-01T09:32:45Z",
            user: "admin@polimdo.ac.id",
            userName: "Admin System",
            action: "User Login",
            details: "Successfully logged in from 192.168.1.105",
            severity: "info",
            module: "Authentication",
        },
        {
            id: 2,
            timestamp: "2025-04-01T10:15:22Z",
            user: "john.doe@polimdo.ac.id",
            userName: "John Doe",
            action: "Proposal Submission",
            details: "Submitted proposal 'Implementation of IoT in Campus Security'",
            severity: "success",
            module: "Proposal Management",
        },
        {
            id: 3,
            timestamp: "2025-04-01T11:03:17Z",
            user: "reviewer1@polimdo.ac.id",
            userName: "Dr. Sarah Johnson",
            action: "Proposal Review",
            details: "Completed initial review for proposal ID #1042",
            severity: "info",
            module: "Review Process",
        },
        {
            id: 4,
            timestamp: "2025-04-01T12:45:30Z",
            user: "wadir@polimdo.ac.id",
            userName: "Dr. Robert Chen",
            action: "Session Approval",
            details: "Approved Session 2025-1 to begin",
            severity: "success",
            module: "Session Management",
        },
        {
            id: 5,
            timestamp: "2025-04-01T13:12:09Z",
            user: "system@polimdo.ac.id",
            userName: "System",
            action: "Backup",
            details: "Automated system backup completed successfully",
            severity: "info",
            module: "System",
        },
        {
            id: 6,
            timestamp: "2025-04-01T14:38:51Z",
            user: "maria.silva@polimdo.ac.id",
            userName: "Maria Silva",
            action: "Failed Login Attempt",
            details: "Multiple failed login attempts detected from IP 203.45.78.92",
            severity: "warning",
            module: "Authentication",
        },
        {
            id: 7,
            timestamp: "2025-04-01T15:20:33Z",
            user: "admin@polimdo.ac.id",
            userName: "Admin System",
            action: "User Role Update",
            details: "Updated role for user james.wilson@polimdo.ac.id to Reviewer",
            severity: "info",
            module: "User Management",
        },
        {
            id: 8,
            timestamp: "2025-04-01T16:05:27Z",
            user: "system@polimdo.ac.id",
            userName: "System",
            action: "Server Error",
            details: "Database connection error occurred. Automatic recovery initiated.",
            severity: "error",
            module: "System",
        },
        {
            id: 9,
            timestamp: "2025-04-01T17:42:19Z",
            user: "james.wilson@polimdo.ac.id",
            userName: "James Wilson",
            action: "Password Reset",
            details: "Requested password reset link",
            severity: "info",
            module: "Authentication",
        },
        {
            id: 10,
            timestamp: "2025-04-01T18:10:05Z",
            user: "emily.zhang@polimdo.ac.id",
            userName: "Emily Zhang",
            action: "Document Upload",
            details: "Uploaded progress report for proposal ID #1024",
            severity: "success",
            module: "Proposal Management",
        },
        {
            id: 11,
            timestamp: "2025-04-02T08:32:15Z",
            user: "system@polimdo.ac.id",
            userName: "System",
            action: "Session Notification",
            details: "Sent deadline reminder to 28 users for proposal submission",
            severity: "info",
            module: "Notification",
        },
        {
            id: 12,
            timestamp: "2025-04-02T09:47:33Z",
            user: "admin@polimdo.ac.id",
            userName: "Admin System",
            action: "Configuration Change",
            details: "Updated system email templates",
            severity: "info",
            module: "System Settings",
        },
    ];

    // Filter and search logs
    const filteredLogs = dummyLogs.filter((log) => {
        const matchesSearch =
            searchQuery === "" ||
            log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.module.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSeverity =
            filters.severity === "all" || log.severity === filters.severity;

        const matchesModule =
            filters.module === "all" || log.module === filters.module;

        // Simplified date filter for demo purposes
        const matchesDate = filters.date === "all"; // In real app would compare actual dates

        const matchesUser = filters.user === "all"; // In real app would filter by user

        return matchesSearch && matchesSeverity && matchesModule && matchesDate && matchesUser;
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(date);
    };

    // Severity badge styles
    const getSeverityBadge = (severity) => {
        switch (severity) {
            case "info":
                return (
                    <span className="flex items-center text-blue-500 bg-blue-100 px-2 py-1 rounded-full text-xs">
                        <MdInfo className="mr-1" /> Info
                    </span>
                );
            case "warning":
                return (
                    <span className="flex items-center text-amber-500 bg-amber-100 px-2 py-1 rounded-full text-xs">
                        <MdWarning className="mr-1" /> Warning
                    </span>
                );
            case "error":
                return (
                    <span className="flex items-center text-red-500 bg-red-100 px-2 py-1 rounded-full text-xs">
                        <MdError className="mr-1" /> Error
                    </span>
                );
            case "success":
                return (
                    <span className="flex items-center text-green-500 bg-green-100 px-2 py-1 rounded-full text-xs">
                        <MdCheckCircle className="mr-1" /> Success
                    </span>
                );
            default:
                return (
                    <span className="flex items-center text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs">
                        <MdInfo className="mr-1" /> Unknown
                    </span>
                );
        }
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Export logs as CSV (simplified)
    const exportLogs = () => {
        alert("Logs would be exported as CSV in a real implementation");
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({
            severity: "all",
            date: "all",
            user: "all",
            module: "all",
        });
        setSearchQuery("");
    };

    // Unique modules for filter dropdown
    const modules = ["Authentication", "Proposal Management", "Review Process", "Session Management", "System", "User Management", "Notification", "System Settings"];

    return (
        <Card extra={"w-full p-4"}>
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                    Activity Logs
                </h4>
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search logs..."
                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <MdSearch className="absolute left-3 top-3 text-gray-400 text-lg" />
                        {searchQuery && (
                            <MdClear
                                className="absolute right-3 top-3 text-gray-400 text-lg cursor-pointer hover:text-gray-600"
                                onClick={() => setSearchQuery("")}
                            />
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="flex items-center justify-center px-4 py-2 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        >
                            <MdFilterList className="mr-2" /> Filter
                        </button>
                        <button
                            onClick={exportLogs}
                            className="flex items-center justify-center px-4 py-2 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        >
                            <MdDownload className="mr-2" /> Export
                        </button>
                        <button
                            onClick={resetFilters}
                            className="flex items-center justify-center px-4 py-2 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        >
                            <MdRefresh className="mr-2" /> Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Panel */}
            {filterOpen && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
                                Severity
                            </label>
                            <select
                                className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                value={filters.severity}
                                onChange={(e) =>
                                    setFilters({ ...filters, severity: e.target.value })
                                }
                            >
                                <option value="all">All Severities</option>
                                <option value="info">Info</option>
                                <option value="success">Success</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
                                Date Range
                            </label>
                            <select
                                className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                value={filters.date}
                                onChange={(e) =>
                                    setFilters({ ...filters, date: e.target.value })
                                }
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="yesterday">Yesterday</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
                                Module
                            </label>
                            <select
                                className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                value={filters.module}
                                onChange={(e) =>
                                    setFilters({ ...filters, module: e.target.value })
                                }
                            >
                                <option value="all">All Modules</option>
                                {modules.map((module) => (
                                    <option key={module} value={module}>
                                        {module}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
                                User Type
                            </label>
                            <select
                                className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                value={filters.user}
                                onChange={(e) =>
                                    setFilters({ ...filters, user: e.target.value })
                                }
                            >
                                <option value="all">All Users</option>
                                <option value="admin">Admins</option>
                                <option value="dosen">Lecturers</option>
                                <option value="reviewer">Reviewers</option>
                                <option value="wadir">Vice Director</option>
                                <option value="system">System</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Activity Logs Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] mb-6">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-white">
                                <div className="flex items-center">
                                    Timestamp <MdArrowDropDown className="ml-1" />
                                </div>
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-white">
                                <div className="flex items-center">
                                    User <MdArrowDropDown className="ml-1" />
                                </div>
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-white">
                                <div className="flex items-center">
                                    Action <MdArrowDropDown className="ml-1" />
                                </div>
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-white">
                                <div className="flex items-center">
                                    Details
                                </div>
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-white">
                                <div className="flex items-center">
                                    Severity
                                </div>
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-white">
                                <div className="flex items-center">
                                    Module
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((log) => (
                                <tr
                                    key={log.id}
                                    className="border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-navy-700"
                                >
                                    <td className="py-3 px-4 text-sm text-gray-700 dark:text-white">
                                        {formatDate(log.timestamp)}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-700 dark:text-white">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{log.userName}</span>
                                            <span className="text-xs text-gray-500">{log.user}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                                        {log.action}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs truncate">
                                        {log.details}
                                    </td>
                                    <td className="py-3 px-4 text-sm">
                                        {getSeverityBadge(log.severity)}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-300">
                                        {log.module}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="py-6 px-4 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No activity logs found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {filteredLogs.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {indexOfFirstItem + 1} to{" "}
                        {Math.min(indexOfLastItem, filteredLogs.length)} of{" "}
                        {filteredLogs.length} entries
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            className="px-2 py-1 rounded-md border border-gray-300 text-sm"
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <div className="flex items-center">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                className={`p-1 rounded ${currentPage === 1
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <MdFirstPage size={20} />
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`p-1 rounded ${currentPage === 1
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <MdKeyboardArrowLeft size={20} />
                            </button>
                            {[...Array(totalPages)].map((_, index) => {
                                // Show limited page numbers with ellipsis
                                if (
                                    totalPages <= 7 ||
                                    index + 1 === 1 ||
                                    index + 1 === totalPages ||
                                    (index + 1 >= currentPage - 1 && index + 1 <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === index + 1
                                                ? "bg-brand-500 text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                } else if (
                                    index + 1 === currentPage - 2 ||
                                    index + 1 === currentPage + 2
                                ) {
                                    return (
                                        <span
                                            key={index}
                                            className="w-8 h-8 flex items-center justify-center"
                                        >
                                            ...
                                        </span>
                                    );
                                }
                                return null;
                            })}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`p-1 rounded ${currentPage === totalPages
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <MdKeyboardArrowRight size={20} />
                            </button>
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                className={`p-1 rounded ${currentPage === totalPages
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <MdLastPage size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default ActivityLogs;
