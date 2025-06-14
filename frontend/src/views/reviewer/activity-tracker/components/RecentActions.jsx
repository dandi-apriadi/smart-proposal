import React, { useState } from 'react';
import { FiClock, FiFilter, FiCheckCircle, FiXCircle, FiAlertCircle, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

// Sample data - replace with actual data from your API
const sampleActions = [
    { id: 1, type: 'review', user: 'John Doe', action: 'Reviewed proposal #1234', timestamp: '2 hours ago', status: 'completed' },
    { id: 2, type: 'comment', user: 'Jane Smith', action: 'Added comment to proposal #5678', timestamp: '4 hours ago', status: 'completed' },
    { id: 3, type: 'edit', user: 'Alex Johnson', action: 'Modified proposal #9012', timestamp: '1 day ago', status: 'pending' },
    { id: 4, type: 'reject', user: 'Sarah Williams', action: 'Rejected proposal #3456', timestamp: '2 days ago', status: 'rejected' },
    { id: 5, type: 'approve', user: 'Mike Brown', action: 'Approved proposal #7890', timestamp: '3 days ago', status: 'completed' },
    { id: 6, type: 'review', user: 'Emily Davis', action: 'Reviewed proposal #2468', timestamp: '3 days ago', status: 'completed' },
    { id: 7, type: 'comment', user: 'Robert Wilson', action: 'Added comment to proposal #1357', timestamp: '4 days ago', status: 'completed' },
    { id: 8, type: 'edit', user: 'Lisa Anderson', action: 'Modified proposal #9876', timestamp: '4 days ago', status: 'pending' },
    { id: 9, type: 'reject', user: 'David Martinez', action: 'Rejected proposal #5432', timestamp: '5 days ago', status: 'rejected' },
    { id: 10, type: 'approve', user: 'Michelle Lee', action: 'Approved proposal #8765', timestamp: '5 days ago', status: 'completed' },
    { id: 11, type: 'review', user: 'Kevin Harris', action: 'Reviewed proposal #4321', timestamp: '6 days ago', status: 'completed' },
    { id: 12, type: 'comment', user: 'Patricia Clark', action: 'Added comment to proposal #7654', timestamp: '1 week ago', status: 'completed' },
    { id: 13, type: 'edit', user: 'Thomas Moore', action: 'Modified proposal #2345', timestamp: '1 week ago', status: 'pending' },
    { id: 14, type: 'reject', user: 'Jennifer Taylor', action: 'Rejected proposal #6789', timestamp: '1 week ago', status: 'rejected' },
    { id: 15, type: 'approve', user: 'Daniel White', action: 'Approved proposal #9876', timestamp: '1 week ago', status: 'completed' },
    { id: 16, type: 'review', user: 'Jessica Brown', action: 'Reviewed proposal #5432', timestamp: '2 weeks ago', status: 'completed' },
    { id: 17, type: 'comment', user: 'Charles Miller', action: 'Added comment to proposal #8765', timestamp: '2 weeks ago', status: 'completed' },
    { id: 18, type: 'edit', user: 'Elizabeth Wilson', action: 'Modified proposal #1234', timestamp: '2 weeks ago', status: 'pending' },
    { id: 19, type: 'reject', user: 'Joseph Davis', action: 'Rejected proposal #5678', timestamp: '3 weeks ago', status: 'rejected' },
    { id: 20, type: 'approve', user: 'Margaret Johnson', action: 'Approved proposal #9012', timestamp: '3 weeks ago', status: 'completed' },
];

const RecentActions = () => {
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page

    // Filter actions based on status and search term
    const filteredActions = sampleActions.filter(action => {
        return (filterStatus === 'all' || action.status === filterStatus) &&
            (action.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                action.user.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    // Calculate total pages
    const totalPages = Math.ceil(filteredActions.length / itemsPerPage);

    // Get current page items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredActions.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [filterStatus, searchTerm]);

    // Function to get icon based on action type
    const getActionIcon = (type) => {
        switch (type) {
            case 'review': return <FiEye className="text-blue-500" />;
            case 'comment': return <FiEdit className="text-purple-500" />;
            case 'edit': return <FiEdit className="text-yellow-500" />;
            case 'reject': return <FiXCircle className="text-red-500" />;
            case 'approve': return <FiCheckCircle className="text-green-500" />;
            default: return <FiAlertCircle className="text-gray-500" />;
        }
    };

    // Function to get status badge
    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Completed</span>;
            case 'pending':
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
            case 'rejected':
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Rejected</span>;
            default:
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Unknown</span>;
        }
    };

    // Generate page numbers for pagination display
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 3; // Max number of page buttons to show

        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        // Adjust start page if end page is maxed out
        if (endPage === totalPages) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`px-3 py-1 rounded text-sm ${currentPage === i ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-100 text-gray-600'
                        }`}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg p-6 w-full">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center mb-4 md:mb-0">
                    <FiClock className="text-blue-600 mr-2 text-xl" />
                    <h2 className="text-xl font-semibold text-gray-800">Recent Actions</h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search actions..."
                            className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative">
                        <select
                            className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <FiFilter className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions List */}
            <div className="space-y-3">
                {currentItems.length > 0 ? (
                    currentItems.map((action) => (
                        <div
                            key={action.id}
                            className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                        >
                            <div className="flex items-start space-x-3">
                                <div className="p-2 rounded-full bg-gray-100 flex-shrink-0">
                                    {getActionIcon(action.type)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{action.action}</p>
                                    <p className="text-sm text-gray-500">By {action.user}</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 ml-11 sm:ml-0">
                                {getStatusBadge(action.status)}
                                <span className="text-xs text-gray-500 whitespace-nowrap">{action.timestamp}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No actions found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {filteredActions.length > 0 && (
                <div className="mt-6 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredActions.length)} of {filteredActions.length} items
                    </div>
                    <nav className="flex items-center space-x-1">
                        <button
                            className="px-3 py-1 rounded hover:bg-gray-100 text-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {renderPageNumbers()}
                        <button
                            className="px-3 py-1 rounded hover:bg-gray-100 text-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default RecentActions;
