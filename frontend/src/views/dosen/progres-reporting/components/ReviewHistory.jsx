import React, { useState, useEffect } from 'react';
import {
    MdHistory,
    MdSearch,
    MdFilterList,
    MdSort,
    MdCheckCircle,
    MdError,
    MdWarning,
    MdInfo,
    MdAccessTime,
    MdComment,
    MdPerson,
    MdCalendarToday,
    MdAttachFile,
    MdExpandMore,
    MdExpandLess,
    MdRefresh,
    MdDownload,
    MdMoreVert,
    MdClose
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ReviewHistory = ({ proposalId }) => {
    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // State management
    const [reviewHistory, setReviewHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedReviewId, setExpandedReviewId] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [activeDetailTab, setActiveDetailTab] = useState('comments');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    // Fetch review history data
    useEffect(() => {
        // Simulate API call with timeout
        setTimeout(() => {
            // This would be replaced with an actual API call
            const dummyReviewHistory = [
                {
                    id: '1',
                    reportType: 'Progress Report',
                    title: 'First Quarter Implementation Progress',
                    reviewDate: '2025-06-18T14:30:00Z',
                    reviewer: {
                        id: '101',
                        name: 'Dr. Ahmad Sudrajat',
                        position: 'Lead Reviewer',
                        department: 'Computer Science',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    },
                    status: 'approved',
                    score: 92,
                    comments: [
                        {
                            id: 'c1',
                            text: 'Excellent progress on the implementation phase. The timeline adherence is commendable.',
                            type: 'general',
                            timestamp: '2025-06-18T14:35:00Z'
                        },
                        {
                            id: 'c2',
                            text: 'The documentation of challenges faced is thorough and the mitigation strategies are well thought out.',
                            type: 'positive',
                            timestamp: '2025-06-18T14:38:00Z'
                        }
                    ],
                    recommendations: 'Continue with the implementation as planned. Consider documenting the machine learning model training process in more detail for the next progress report.',
                    attachments: [
                        {
                            id: 'a1',
                            name: 'Review_Form_PR1.pdf',
                            size: 1240000,
                            type: 'application/pdf',
                            uploadDate: '2025-06-18T14:40:00Z'
                        }
                    ]
                },
                {
                    id: '2',
                    reportType: 'Progress Report',
                    title: 'Dataset Collection and Preparation',
                    reviewDate: '2025-05-25T10:15:00Z',
                    reviewer: {
                        id: '102',
                        name: 'Prof. Lina Wati',
                        position: 'Senior Reviewer',
                        department: 'Data Science',
                        avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
                    },
                    status: 'revision',
                    score: 78,
                    comments: [
                        {
                            id: 'c3',
                            text: 'The dataset collection methodology is sound, but the preprocessing steps need more explanation.',
                            type: 'general',
                            timestamp: '2025-05-25T10:20:00Z'
                        },
                        {
                            id: 'c4',
                            text: 'The target variable distribution in your dataset appears imbalanced, which might affect model performance.',
                            type: 'concern',
                            timestamp: '2025-05-25T10:25:00Z'
                        },
                        {
                            id: 'c5',
                            text: 'The data augmentation techniques applied are innovative and appropriate for the problem domain.',
                            type: 'positive',
                            timestamp: '2025-05-25T10:28:00Z'
                        }
                    ],
                    recommendations: 'Please provide more details on how you plan to address the class imbalance issue. Consider applying SMOTE or other balancing techniques before training your model.',
                    attachments: [
                        {
                            id: 'a2',
                            name: 'Review_Comments_Dataset.pdf',
                            size: 950000,
                            type: 'application/pdf',
                            uploadDate: '2025-05-25T10:35:00Z'
                        },
                        {
                            id: 'a3',
                            name: 'Suggested_Resources.docx',
                            size: 550000,
                            type: 'application/docx',
                            uploadDate: '2025-05-25T10:38:00Z'
                        }
                    ]
                },
                {
                    id: '3',
                    reportType: 'Preliminary Report',
                    title: 'Research Proposal Validation',
                    reviewDate: '2025-05-05T09:00:00Z',
                    reviewer: {
                        id: '103',
                        name: 'Dr. Budi Pratama',
                        position: 'Committee Member',
                        department: 'Software Engineering',
                        avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
                    },
                    status: 'approved',
                    score: 88,
                    comments: [
                        {
                            id: 'c6',
                            text: 'The research proposal is well-structured and clearly articulates the problem statement.',
                            type: 'positive',
                            timestamp: '2025-05-05T09:10:00Z'
                        },
                        {
                            id: 'c7',
                            text: 'The literature review is comprehensive and provides a solid foundation for your research.',
                            type: 'positive',
                            timestamp: '2025-05-05T09:15:00Z'
                        }
                    ],
                    recommendations: 'Proceed with the research as planned. Be sure to document the baseline model performance for comparison with your proposed Random Forest approach.',
                    attachments: [
                        {
                            id: 'a4',
                            name: 'Initial_Approval.pdf',
                            size: 820000,
                            type: 'application/pdf',
                            uploadDate: '2025-05-05T09:25:00Z'
                        }
                    ]
                },
                {
                    id: '4',
                    reportType: 'Progress Report',
                    title: 'Algorithm Implementation and Preliminary Results',
                    reviewDate: '2025-07-10T13:45:00Z',
                    reviewer: {
                        id: '101',
                        name: 'Dr. Ahmad Sudrajat',
                        position: 'Lead Reviewer',
                        department: 'Computer Science',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    },
                    status: 'rejected',
                    score: 65,
                    comments: [
                        {
                            id: 'c8',
                            text: 'The implementation of the Random Forest algorithm lacks sufficient detail on hyperparameter tuning.',
                            type: 'concern',
                            timestamp: '2025-07-10T13:50:00Z'
                        },
                        {
                            id: 'c9',
                            text: 'The evaluation metrics chosen dont adequately reflect the requirements for a document validation system.',
                            type: 'concern',
                            timestamp: '2025-07-10T13:55:00Z'
                        },
                        {
                            id: 'c10',
                            text: 'The preliminary results show promise, but need more rigorous validation.',
                            type: 'general',
                            timestamp: '2025-07-10T14:00:00Z'
                        }
                    ],
                    recommendations: 'This report requires significant revision. Please review the comments and address each concern. Consider consulting with a domain expert on appropriate evaluation metrics for document validation systems.',
                    attachments: [
                        {
                            id: 'a5',
                            name: 'Detailed_Review.pdf',
                            size: 1560000,
                            type: 'application/pdf',
                            uploadDate: '2025-07-10T14:10:00Z'
                        },
                        {
                            id: 'a6',
                            name: 'Suggested_Improvements.docx',
                            size: 720000,
                            type: 'application/docx',
                            uploadDate: '2025-07-10T14:15:00Z'
                        }
                    ]
                },
                {
                    id: '5',
                    reportType: 'Progress Report',
                    title: 'Revised Algorithm Implementation',
                    reviewDate: '2025-07-25T11:30:00Z',
                    reviewer: {
                        id: '102',
                        name: 'Prof. Lina Wati',
                        position: 'Senior Reviewer',
                        department: 'Data Science',
                        avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
                    },
                    status: 'pending',
                    score: null,
                    comments: [],
                    recommendations: '',
                    attachments: []
                }
            ];

            setReviewHistory(dummyReviewHistory);
            setLoading(false);
        }, 1000);
    }, [proposalId]);

    // Toggle review details expansion
    const toggleReviewExpansion = (reviewId) => {
        setExpandedReviewId(expandedReviewId === reviewId ? null : reviewId);
    };

    // Handle filter change
    const handleFilterChange = (status) => {
        setFilterStatus(status);
        setShowFilterMenu(false);
    };

    // Handle sort change
    const handleSortChange = (option) => {
        setSortOption(option);
    };

    // Handle search change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // View review details
    const viewReviewDetails = (review) => {
        setSelectedReview(review);
    };

    // Close review details modal
    const closeReviewDetails = () => {
        setSelectedReview(null);
    };

    // Filter and sort reviews
    const getFilteredAndSortedReviews = () => {
        // Filter reviews
        let filtered = reviewHistory;
        if (filterStatus !== 'all') {
            filtered = reviewHistory.filter(review => review.status === filterStatus);
        }

        // Apply search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(review =>
                review.title.toLowerCase().includes(query) ||
                review.reviewer.name.toLowerCase().includes(query) ||
                review.reportType.toLowerCase().includes(query) ||
                (review.recommendations && review.recommendations.toLowerCase().includes(query))
            );
        }

        // Sort reviews
        return filtered.sort((a, b) => {
            const dateA = new Date(a.reviewDate);
            const dateB = new Date(b.reviewDate);

            if (sortOption === 'newest') {
                return dateB - dateA;
            } else if (sortOption === 'oldest') {
                return dateA - dateB;
            } else if (sortOption === 'score') {
                return (b.score || 0) - (a.score || 0);
            }

            return 0;
        });
    };

    const filteredAndSortedReviews = getFilteredAndSortedReviews();

    // Get status color and icon
    const getStatusInfo = (status) => {
        switch (status) {
            case 'approved':
                return {
                    color: 'text-green-600',
                    bgColor: 'bg-green-100',
                    icon: <MdCheckCircle className="mr-1" />,
                    label: 'Approved'
                };
            case 'rejected':
                return {
                    color: 'text-red-600',
                    bgColor: 'bg-red-100',
                    icon: <MdError className="mr-1" />,
                    label: 'Rejected'
                };
            case 'revision':
                return {
                    color: 'text-amber-600',
                    bgColor: 'bg-amber-100',
                    icon: <MdWarning className="mr-1" />,
                    label: 'Needs Revision'
                };
            case 'pending':
                return {
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-100',
                    icon: <MdAccessTime className="mr-1" />,
                    label: 'Pending Review'
                };
            default:
                return {
                    color: 'text-gray-600',
                    bgColor: 'bg-gray-100',
                    icon: <MdInfo className="mr-1" />,
                    label: 'Unknown'
                };
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Get comment type style
    const getCommentTypeStyle = (type) => {
        switch (type) {
            case 'positive':
                return 'border-l-4 border-green-500 bg-green-50';
            case 'concern':
                return 'border-l-4 border-amber-500 bg-amber-50';
            case 'general':
            default:
                return 'border-l-4 border-blue-500 bg-blue-50';
        }
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4 md:mb-0" data-aos="fade-right">
                    <MdHistory className="mr-2 text-blue-600" /> Review History
                </h2>

                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto" data-aos="fade-left">
                    {/* Search box */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MdSearch className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                            type="search"
                            placeholder="Search reviews..."
                            className="pl-10 pr-4 py-2 w-full md:w-64 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Filter dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                        >
                            <MdFilterList className="mr-2" />
                            {filterStatus === 'all' ? 'All Statuses' : getStatusInfo(filterStatus).label}
                        </button>

                        {showFilterMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                <ul className="py-1">
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                        onClick={() => handleFilterChange('all')}
                                    >
                                        <MdFilterList className="mr-2" /> All Statuses
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-green-600"
                                        onClick={() => handleFilterChange('approved')}
                                    >
                                        <MdCheckCircle className="mr-2" /> Approved
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-amber-600"
                                        onClick={() => handleFilterChange('revision')}
                                    >
                                        <MdWarning className="mr-2" /> Needs Revision
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-red-600"
                                        onClick={() => handleFilterChange('rejected')}
                                    >
                                        <MdError className="mr-2" /> Rejected
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-blue-600"
                                        onClick={() => handleFilterChange('pending')}
                                    >
                                        <MdAccessTime className="mr-2" /> Pending
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sort dropdown */}
                    <select
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700"
                        value={sortOption}
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="score">Highest Score</option>
                    </select>
                </div>
            </div>

            {/* Statistics summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" data-aos="fade-up">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-full">
                            <MdCheckCircle className="text-green-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {reviewHistory.filter(r => r.status === 'approved').length}
                            </h3>
                            <p className="text-sm text-gray-600">Approved</p>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <div className="flex items-center">
                        <div className="p-2 bg-amber-100 rounded-full">
                            <MdWarning className="text-amber-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {reviewHistory.filter(r => r.status === 'revision').length}
                            </h3>
                            <p className="text-sm text-gray-600">Needs Revision</p>
                        </div>
                    </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="flex items-center">
                        <div className="p-2 bg-red-100 rounded-full">
                            <MdError className="text-red-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {reviewHistory.filter(r => r.status === 'rejected').length}
                            </h3>
                            <p className="text-sm text-gray-600">Rejected</p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full">
                            <MdAccessTime className="text-blue-600 text-xl" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {reviewHistory.filter(r => r.status === 'pending').length}
                            </h3>
                            <p className="text-sm text-gray-600">Pending</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading state */}
            {loading ? (
                <div className="text-center py-12" data-aos="fade-up">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-2"></div>
                    <p className="text-gray-600">Loading review history...</p>
                </div>
            ) : filteredAndSortedReviews.length === 0 ? (
                // Empty state
                <div className="text-center py-12 bg-gray-50 rounded-lg" data-aos="fade-up">
                    <MdInfo className="mx-auto text-4xl text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No reviews found</h3>
                    <p className="text-gray-600">
                        {searchQuery || filterStatus !== 'all'
                            ? 'Try adjusting your search or filter criteria'
                            : 'Your progress reports have not been reviewed yet'}
                    </p>
                    {(searchQuery || filterStatus !== 'all') && (
                        <button
                            className="mt-4 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center mx-auto"
                            onClick={() => {
                                setSearchQuery('');
                                setFilterStatus('all');
                            }}
                        >
                            <MdRefresh className="mr-1" /> Reset Filters
                        </button>
                    )}
                </div>
            ) : (
                // Review list
                <div className="space-y-4" data-aos="fade-up">
                    {filteredAndSortedReviews.map((review, index) => {
                        const statusInfo = getStatusInfo(review.status);
                        const isExpanded = expandedReviewId === review.id;

                        return (
                            <div
                                key={review.id}
                                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
                                data-aos="fade-up"
                                data-aos-delay={index * 50}
                            >
                                {/* Review header - always visible */}
                                <div
                                    className={`p-4 ${isExpanded ? 'bg-gray-50' : 'bg-white'} cursor-pointer flex flex-col md:flex-row md:justify-between md:items-center`}
                                    onClick={() => toggleReviewExpansion(review.id)}
                                >
                                    <div className="flex items-start mb-3 md:mb-0">
                                        <img
                                            src={review.reviewer.avatar}
                                            alt={review.reviewer.name}
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-800">{review.title}</h3>
                                            <div className="text-sm text-gray-500 flex flex-wrap items-center gap-x-4 mt-1">
                                                <span className="flex items-center">
                                                    <MdPerson className="mr-1" /> {review.reviewer.name}
                                                </span>
                                                <span className="flex items-center">
                                                    <MdCalendarToday className="mr-1" /> {formatDate(review.reviewDate)}
                                                </span>
                                                <span className="flex items-center">
                                                    <MdInfo className="mr-1" /> {review.reportType}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                                            {statusInfo.icon} {statusInfo.label}
                                        </span>

                                        {review.score !== null && (
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
                        ${review.score >= 90 ? 'bg-green-100 text-green-800' :
                                                    review.score >= 80 ? 'bg-blue-100 text-blue-800' :
                                                        review.score >= 70 ? 'bg-amber-100 text-amber-800' :
                                                            'bg-red-100 text-red-800'}`}
                                            >
                                                Score: {review.score}/100
                                            </span>
                                        )}

                                        <button
                                            className="text-gray-500 hover:text-gray-700 transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                viewReviewDetails(review);
                                            }}
                                        >
                                            <MdMoreVert />
                                        </button>

                                        {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                                    </div>
                                </div>

                                {/* Expandable content */}
                                {isExpanded && (
                                    <div className="p-4 border-t border-gray-200 bg-white">
                                        {/* Recommendations */}
                                        {review.recommendations && (
                                            <div className="mb-4">
                                                <h4 className="font-medium text-gray-700 mb-2">Recommendations</h4>
                                                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                                    {review.recommendations}
                                                </p>
                                            </div>
                                        )}

                                        {/* Comments */}
                                        {review.comments && review.comments.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="font-medium text-gray-700 mb-2">Comments ({review.comments.length})</h4>
                                                <div className="space-y-3">
                                                    {review.comments.map(comment => (
                                                        <div
                                                            key={comment.id}
                                                            className={`p-3 rounded-lg ${getCommentTypeStyle(comment.type)}`}
                                                        >
                                                            <p className="text-gray-700">{comment.text}</p>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {new Date(comment.timestamp).toLocaleTimeString()}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Attachments */}
                                        {review.attachments && review.attachments.length > 0 && (
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-2">Attachments</h4>
                                                <div className="space-y-2">
                                                    {review.attachments.map(attachment => (
                                                        <div
                                                            key={attachment.id}
                                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                                        >
                                                            <div className="flex items-center">
                                                                <div className="p-2 bg-blue-100 rounded-md mr-3">
                                                                    {attachment.type.includes('pdf') ? (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                                        </svg>
                                                                    ) : attachment.type.includes('doc') ? (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm-1 8a1 1 0 100-2H5a1 1 0 100 2h1zm0 3a1 1 0 100-2H5a1 1 0 100 2h1z" clipRule="evenodd" />
                                                                        </svg>
                                                                    ) : (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a3 3 0 006 0V7a1 1 0 112 0v4a5 5 0 01-10 0V7a5 5 0 0110 0v1.586a1 1 0 01-.293.707l-1.414 1.414a1 1 0 01-1.414-1.414l.707-.707V7a3 3 0 00-6 0v4a1 1 0 002 0V7a1 1 0 012 0v4a3 3 0 01-6 0V7a5 5 0 0110 0v1.586l.293-.293a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414l.293.293V7a1 1 0 012 0v4a5 5 0 01-10 0V7a3 3 0 016 0v1.586a1 1 0 01-.293.707l-1.414 1.414a1 1 0 01-1.414-1.414l.707-.707V7a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-gray-700">{attachment.name}</p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {formatFileSize(attachment.size)} • Added {new Date(attachment.uploadDate).toLocaleDateString()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <button className="text-blue-600 hover:text-blue-800">
                                                                <MdDownload size={20} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Timeline visualization */}
            <div className="mt-8" data-aos="fade-up">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Review Timeline</h3>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute h-full w-0.5 bg-gray-200 left-6 top-0 bottom-0 ml-0.5"></div>

                    {/* Timeline events */}
                    <div className="space-y-6 ml-14">
                        {filteredAndSortedReviews.map((review, index) => {
                            const statusInfo = getStatusInfo(review.status);
                            return (
                                <div key={`timeline-${review.id}`} className="relative" data-aos="fade-left" data-aos-delay={index * 50}>
                                    {/* Timeline dot */}
                                    <div className={`absolute -left-14 mt-1.5 w-6 h-6 rounded-full flex items-center justify-center ${statusInfo.bgColor}`}>
                                        {statusInfo.icon}
                                    </div>

                                    {/* Timeline content */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-medium text-gray-800">{review.title}</h4>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                                                {statusInfo.label}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {formatDate(review.reviewDate)} by {review.reviewer.name}
                                        </div>
                                        {review.recommendations && (
                                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                                {review.recommendations}
                                            </p>
                                        )}
                                        <button
                                            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                                            onClick={() => viewReviewDetails(review)}
                                        >
                                            View details
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Review Details Modal */}
            {selectedReview && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-xl font-medium text-gray-800">{selectedReview.title}</h3>
                            <button
                                onClick={closeReviewDetails}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <MdClose size={24} />
                            </button>
                        </div>

                        <div className="flex-grow overflow-auto p-6">
                            {/* Review info header */}
                            <div className="flex flex-col md:flex-row justify-between mb-6">
                                <div className="flex items-start mb-4 md:mb-0">
                                    <img
                                        src={selectedReview.reviewer.avatar}
                                        alt={selectedReview.reviewer.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-medium text-gray-800">{selectedReview.reviewer.name}</h4>
                                        <p className="text-gray-600">{selectedReview.reviewer.position}, {selectedReview.reviewer.department}</p>
                                        <p className="text-sm text-gray-500 mt-1">{formatDate(selectedReview.reviewDate)}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start md:items-end">
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(selectedReview.status).bgColor} ${getStatusInfo(selectedReview.status).color}`}>
                                        {getStatusInfo(selectedReview.status).icon} {getStatusInfo(selectedReview.status).label}
                                    </div>

                                    {selectedReview.score !== null && (
                                        <div className="mt-2 text-gray-700">
                                            <span className="font-medium">Score:</span> {selectedReview.score}/100
                                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1 max-w-[150px]">
                                                <div
                                                    className={`h-2 rounded-full ${selectedReview.score >= 90 ? 'bg-green-600' :
                                                        selectedReview.score >= 80 ? 'bg-blue-600' :
                                                            selectedReview.score >= 70 ? 'bg-amber-600' :
                                                                'bg-red-600'
                                                        }`}
                                                    style={{ width: `${selectedReview.score}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="border-b border-gray-200 mb-6">
                                <div className="flex -mb-px">
                                    <button
                                        className={`mr-4 py-2 px-1 ${activeDetailTab === 'comments'
                                            ? 'border-b-2 border-blue-600 text-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        onClick={() => setActiveDetailTab('comments')}
                                    >
                                        <MdComment className="inline mr-1" /> Comments ({selectedReview.comments.length})
                                    </button>
                                    <button
                                        className={`mr-4 py-2 px-1 ${activeDetailTab === 'recommendations'
                                            ? 'border-b-2 border-blue-600 text-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        onClick={() => setActiveDetailTab('recommendations')}
                                    >
                                        <MdInfo className="inline mr-1" /> Recommendations
                                    </button>
                                    <button
                                        className={`py-2 px-1 ${activeDetailTab === 'attachments'
                                            ? 'border-b-2 border-blue-600 text-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        onClick={() => setActiveDetailTab('attachments')}
                                    >
                                        <MdAttachFile className="inline mr-1" /> Attachments ({selectedReview.attachments.length})
                                    </button>
                                </div>
                            </div>

                            {/* Tab content */}
                            {activeDetailTab === 'comments' && (
                                <div className="space-y-4">
                                    {selectedReview.comments.length === 0 ? (
                                        <p className="text-gray-500 italic text-center py-8">No comments provided for this review.</p>
                                    ) : (
                                        selectedReview.comments.map(comment => (
                                            <div
                                                key={comment.id}
                                                className={`p-4 rounded-lg ${getCommentTypeStyle(comment.type)}`}
                                            >
                                                <p className="text-gray-700">{comment.text}</p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(comment.timestamp).toLocaleString()}
                                                    </span>
                                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white bg-opacity-50">
                                                        {comment.type.charAt(0).toUpperCase() + comment.type.slice(1)} Comment
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {activeDetailTab === 'recommendations' && (
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                    {selectedReview.recommendations ? (
                                        <>
                                            <h4 className="font-medium text-blue-800 mb-3">Reviewer Recommendations</h4>
                                            <p className="text-gray-700 whitespace-pre-line">{selectedReview.recommendations}</p>
                                        </>
                                    ) : (
                                        <p className="text-gray-500 italic text-center py-4">No recommendations provided for this review.</p>
                                    )}
                                </div>
                            )}

                            {activeDetailTab === 'attachments' && (
                                <div>
                                    {selectedReview.attachments.length === 0 ? (
                                        <p className="text-gray-500 italic text-center py-8">No attachments provided for this review.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {selectedReview.attachments.map(attachment => (
                                                <div
                                                    key={attachment.id}
                                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="p-3 bg-blue-100 rounded-md mr-4">
                                                            {attachment.type.includes('pdf') ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                                </svg>
                                                            ) : attachment.type.includes('doc') ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm-1 8a1 1 0 100-2H5a1 1 0 100 2h1zm0 3a1 1 0 100-2H5a1 1 0 100 2h1z" clipRule="evenodd" />
                                                                </svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a3 3 0 006 0V7a1 1 0 112 0v4a5 5 0 01-10 0V7a5 5 0 0110 0v1.586a1 1 0 01-.293.707l-1.414 1.414a1 1 0 01-1.414-1.414l.707-.707V7a3 3 0 00-6 0v4a1 1 0 002 0V7a1 1 0 012 0v4a3 3 0 01-6 0V7a5 5 0 0110 0v1.586l.293-.293a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414l.293.293V7a1 1 0 012 0v4a5 5 0 01-10 0V7a3 3 0 016 0v1.586a1 1 0 01-.293.707l-1.414 1.414a1 1 0 01-1.414-1.414l.707-.707V7a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-800">{attachment.name}</p>
                                                            <p className="text-sm text-gray-500">
                                                                {formatFileSize(attachment.size)} • Uploaded {new Date(attachment.uploadDate).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button className="px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 flex items-center">
                                                        <MdDownload className="mr-1" /> Download
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t bg-gray-50 flex justify-end">
                            <button
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                onClick={closeReviewDetails}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewHistory;
