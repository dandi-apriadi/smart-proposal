import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdSearch, MdFilterList, MdHistory, MdVisibility, MdDownload, MdSort, MdCalendarToday, MdAssignment } from 'react-icons/md';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const HistoricalReview = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('dateDesc');
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Sample data for demonstration
    const sampleReviews = [
        {
            id: '1',
            proposalTitle: 'Development of Smart Irrigation System',
            proposalId: 'PRO2025001',
            submittedBy: 'Dr. Anita Wijaya',
            reviewDate: '2025-03-15',
            decision: 'Approved',
            score: 85,
            comments: 'Well-structured proposal with clear objectives and methodology.',
            category: 'Technology',
            sessionName: 'Session 2025-1'
        },
        {
            id: '2',
            proposalTitle: 'Impact of Climate Change on Local Agriculture',
            proposalId: 'PRO2025012',
            submittedBy: 'Prof. Budi Santoso',
            reviewDate: '2025-03-10',
            decision: 'Rejected',
            score: 62,
            comments: 'Methodology lacks clarity and budget is not properly justified.',
            category: 'Environmental Science',
            sessionName: 'Session 2025-1'
        },
        {
            id: '3',
            proposalTitle: 'Blockchain for Secure Academic Records',
            proposalId: 'PRO2025023',
            submittedBy: 'Dr. Chandra Kumar',
            reviewDate: '2025-02-28',
            decision: 'Revision Required',
            score: 75,
            comments: 'Good concept but technical details need further elaboration.',
            category: 'Technology',
            sessionName: 'Session 2025-1'
        },
        {
            id: '4',
            proposalTitle: 'Machine Learning in Early Disease Detection',
            proposalId: 'PRO2024089',
            submittedBy: 'Dr. Diana Putri',
            reviewDate: '2024-11-15',
            decision: 'Approved',
            score: 92,
            comments: 'Excellent proposal with strong methodology and clear impact.',
            category: 'Healthcare',
            sessionName: 'Session 2024-2'
        },
        {
            id: '5',
            proposalTitle: 'Urban Planning Strategies for Sustainable Cities',
            proposalId: 'PRO2024076',
            submittedBy: 'Prof. Eko Prasetyo',
            reviewDate: '2024-10-20',
            decision: 'Approved',
            score: 88,
            comments: 'Comprehensive analysis with practical implementation plan.',
            category: 'Urban Development',
            sessionName: 'Session 2024-2'
        },
    ];

    useEffect(() => {
        // Simulate API call to get historical reviews
        setTimeout(() => {
            setReviews(sampleReviews);
            setIsLoading(false);
        }, 1000);
    }, []);

    const getStatusColor = (decision) => {
        switch (decision) {
            case 'Approved':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            case 'Revision Required':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredReviews = reviews
        .filter(review => {
            const matchesSearch = review.proposalTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.proposalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilter = filterStatus === 'all' || review.decision === filterStatus;

            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            if (sortBy === 'dateDesc') {
                return new Date(b.reviewDate) - new Date(a.reviewDate);
            } else if (sortBy === 'dateAsc') {
                return new Date(a.reviewDate) - new Date(b.reviewDate);
            } else if (sortBy === 'scoreDesc') {
                return b.score - a.score;
            } else if (sortBy === 'scoreAsc') {
                return a.score - b.score;
            }
            return 0;
        });

    const handleViewDetails = (review) => {
        setSelectedReview(review);
        setShowDetailsModal(true);
    };

    const handleDownloadReport = (reviewId) => {
        console.log(`Downloading report for review ${reviewId}`);
        // Logic to download the review report
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <MdHistory className="mr-2 text-blue-600" /> Historical Reviews Archive
                    </h2>
                    <p className="text-gray-600">Browse and access your past proposal reviews</p>
                </div>

                <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col md:flex-row gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search proposals..."
                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <MdSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
                    </div>

                    <div className="flex gap-3">
                        <select
                            className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Statuses</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Revision Required">Revision Required</option>
                        </select>

                        <select
                            className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="dateDesc">Newest First</option>
                            <option value="dateAsc">Oldest First</option>
                            <option value="scoreDesc">Highest Score</option>
                            <option value="scoreAsc">Lowest Score</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-blue-600 text-sm font-medium">Total Reviews</p>
                            <h3 className="text-2xl font-bold text-blue-800">{reviews.length}</h3>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                            <MdAssignment className="text-blue-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 shadow-sm border border-green-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-green-600 text-sm font-medium">Approved Proposals</p>
                            <h3 className="text-2xl font-bold text-green-800">
                                {reviews.filter(r => r.decision === 'Approved').length}
                            </h3>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <MdFilterList className="text-green-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 shadow-sm border border-purple-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-purple-600 text-sm font-medium">Latest Review</p>
                            <h3 className="text-xl font-bold text-purple-800">
                                {reviews.length > 0 ? format(new Date(reviews.sort((a, b) =>
                                    new Date(b.reviewDate) - new Date(a.reviewDate))[0].reviewDate), 'MMM d, yyyy') : 'N/A'}
                            </h3>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-full">
                            <MdCalendarToday className="text-purple-600 text-xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : filteredReviews.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Proposal</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Session</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Review Date</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Score</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredReviews.map((review) => (
                                <motion.tr
                                    key={review.id}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    onClick={() => handleViewDetails(review)}
                                >
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{review.proposalTitle}</p>
                                            <p className="text-sm text-gray-500">ID: {review.proposalId}</p>
                                            <p className="text-sm text-gray-500">By: {review.submittedBy}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-500">{review.sessionName}</td>
                                    <td className="py-4 px-4 text-sm text-gray-500">{format(new Date(review.reviewDate), 'MMM d, yyyy')}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(review.decision)}`}>
                                            {review.decision}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm font-medium">
                                        <div className="flex items-center">
                                            <div className="w-16 bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className={`h-2.5 rounded-full ${review.score >= 80 ? 'bg-green-500' :
                                                        review.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${review.score}%` }}
                                                ></div>
                                            </div>
                                            <span className="ml-2">{review.score}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewDetails(review);
                                                }}
                                                className="text-blue-600 hover:text-blue-900 flex items-center"
                                            >
                                                <MdVisibility className="mr-1" /> View
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDownloadReport(review.id);
                                                }}
                                                className="text-green-600 hover:text-green-900 flex items-center"
                                            >
                                                <MdDownload className="mr-1" /> Report
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <MdFilterList className="mx-auto text-4xl text-gray-400" />
                    <h3 className="mt-2 text-xl font-medium text-gray-600">No reviews found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            )}

            {/* Pagination and Summary */}
            <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
                <p>Showing {filteredReviews.length} of {reviews.length} reviews</p>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-50" disabled>Previous</button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">1</button>
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-50">2</button>
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Next</button>
                </div>
            </div>

            {/* Details Modal - Still using framer-motion animations as they're separate from AOS */}
            {showDetailsModal && selectedReview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">{selectedReview.proposalTitle}</h2>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <div className="flex flex-wrap mb-6">
                                <div className="mr-4 mb-2">
                                    <span className="text-sm text-gray-500">Proposal ID:</span>
                                    <p className="font-medium">{selectedReview.proposalId}</p>
                                </div>
                                <div className="mr-4 mb-2">
                                    <span className="text-sm text-gray-500">Submitted By:</span>
                                    <p className="font-medium">{selectedReview.submittedBy}</p>
                                </div>
                                <div className="mr-4 mb-2">
                                    <span className="text-sm text-gray-500">Review Date:</span>
                                    <p className="font-medium">{format(new Date(selectedReview.reviewDate), 'MMMM d, yyyy')}</p>
                                </div>
                                <div className="mr-4 mb-2">
                                    <span className="text-sm text-gray-500">Session:</span>
                                    <p className="font-medium">{selectedReview.sessionName}</p>
                                </div>
                                <div className="mr-4 mb-2">
                                    <span className="text-sm text-gray-500">Category:</span>
                                    <p className="font-medium">{selectedReview.category}</p>
                                </div>
                                <div className="mb-2">
                                    <span className="text-sm text-gray-500">Decision:</span>
                                    <p>
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedReview.decision)}`}>
                                            {selectedReview.decision}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Review Score</h3>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className={`h-4 rounded-full ${selectedReview.score >= 80 ? 'bg-green-500' :
                                            selectedReview.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                        style={{ width: `${selectedReview.score}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="text-sm text-gray-500">0</span>
                                    <span className="text-sm font-medium">{selectedReview.score}/100</span>
                                    <span className="text-sm text-gray-500">100</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Review Comments</h3>
                                <div className="bg-gray-50 p-4 rounded-lg border">
                                    <p className="text-gray-700">{selectedReview.comments}</p>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => handleDownloadReport(selectedReview.id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                >
                                    <MdDownload className="inline mr-1" /> Download Report
                                </button>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default HistoricalReview;
