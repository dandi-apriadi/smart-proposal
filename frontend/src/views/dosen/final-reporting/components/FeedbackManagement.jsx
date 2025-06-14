import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    MdFilterList,
    MdSearch,
    MdRefresh,
    MdCheckCircle,
    MdCancel,
    MdWarning,
    MdComment,
    MdSend,
    MdExpandMore,
    MdExpandLess,
    MdPerson,
    MdAccessTime,
    MdFlag
} from 'react-icons/md';

const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFeedback, setExpandedFeedback] = useState(null);
    const [loading, setLoading] = useState(true);
    const [responseText, setResponseText] = useState('');

    // Dummy data for demonstration
    const dummyFeedbacks = [
        {
            id: 1,
            title: 'Budget Section Needs Revision',
            message: 'The budget section in your final report needs more detailed breakdown of expenses. Please update with itemized costs.',
            sender: 'Dr. Ahmad Reviewer',
            senderRole: 'Lead Reviewer',
            date: '2025-09-15T14:30:00Z',
            status: 'pending',
            priority: 'high',
            responses: [],
            proposalTitle: 'Implementation of IoT in Campus Security',
            sessionName: 'Session 2025-1'
        },
        {
            id: 2,
            title: 'Literature Review Feedback',
            message: 'Your literature review is comprehensive, but please add more recent publications (2024-2025) to strengthen your theoretical foundation.',
            sender: 'Prof. Budi Evaluator',
            senderRole: 'Committee Member',
            date: '2025-09-12T09:45:00Z',
            status: 'resolved',
            priority: 'medium',
            responses: [
                {
                    id: 1,
                    message: 'Thank you for the feedback. I have added 5 recent publications to the literature review section.',
                    sender: 'You',
                    date: '2025-09-13T10:20:00Z'
                },
                {
                    id: 2,
                    message: 'The additions look good. This issue is now resolved.',
                    sender: 'Prof. Budi Evaluator',
                    date: '2025-09-14T11:30:00Z'
                }
            ],
            proposalTitle: 'Implementation of IoT in Campus Security',
            sessionName: 'Session 2025-1'
        },
        {
            id: 3,
            title: 'Results Documentation',
            message: 'Please provide more visual representation of your results. Consider adding graphs and charts to better illustrate your findings.',
            sender: 'Dr. Citra Analyst',
            senderRole: 'Technical Reviewer',
            date: '2025-09-10T16:15:00Z',
            status: 'in-progress',
            priority: 'medium',
            responses: [
                {
                    id: 1,
                    message: 'I am currently working on creating the requested visualizations. Will update soon.',
                    sender: 'You',
                    date: '2025-09-11T08:45:00Z'
                }
            ],
            proposalTitle: 'Implementation of IoT in Campus Security',
            sessionName: 'Session 2025-1'
        },
        {
            id: 4,
            title: 'Methodology Clarification',
            message: 'Your methodology section needs clarification regarding participant selection criteria. Please specify how participants were recruited and selected.',
            sender: 'Dr. Dewi Methodologist',
            senderRole: 'Research Committee',
            date: '2025-09-08T11:20:00Z',
            status: 'pending',
            priority: 'low',
            responses: [],
            proposalTitle: 'Implementation of IoT in Campus Security',
            sessionName: 'Session 2025-1'
        },
        {
            id: 5,
            title: 'Formatting Issues',
            message: 'Please fix formatting issues in your bibliography section. Follow APA 7th edition strictly for all citations and references.',
            sender: 'Admin Support',
            senderRole: 'Editorial Assistant',
            date: '2025-09-05T13:10:00Z',
            status: 'resolved',
            priority: 'low',
            responses: [
                {
                    id: 1,
                    message: 'I have updated all references to follow APA 7th edition guidelines.',
                    sender: 'You',
                    date: '2025-09-06T10:30:00Z'
                },
                {
                    id: 2,
                    message: 'Verified. The bibliography section now follows the correct format.',
                    sender: 'Admin Support',
                    date: '2025-09-07T09:15:00Z'
                }
            ],
            proposalTitle: 'Implementation of IoT in Campus Security',
            sessionName: 'Session 2025-1'
        }
    ];

    useEffect(() => {
        // Simulate API fetch with dummy data
        setTimeout(() => {
            setFeedbacks(dummyFeedbacks);
            setFilteredFeedbacks(dummyFeedbacks);
            setLoading(false);
        }, 800);
    }, []);

    const handleFilter = (filter) => {
        setActiveFilter(filter);

        if (filter === 'all') {
            setFilteredFeedbacks(feedbacks);
        } else {
            setFilteredFeedbacks(feedbacks.filter(feedback => feedback.status === filter));
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            handleFilter(activeFilter);
        } else {
            const results = feedbacks.filter(feedback =>
                (activeFilter === 'all' || feedback.status === activeFilter) &&
                (feedback.title.toLowerCase().includes(query.toLowerCase()) ||
                    feedback.message.toLowerCase().includes(query.toLowerCase()) ||
                    feedback.sender.toLowerCase().includes(query.toLowerCase()))
            );
            setFilteredFeedbacks(results);
        }
    };

    const toggleExpand = (id) => {
        setExpandedFeedback(expandedFeedback === id ? null : id);
        // Reset response text when closing or changing feedback
        if (expandedFeedback !== id) {
            setResponseText('');
        }
    };

    const handleResponseSubmit = (feedbackId) => {
        if (!responseText.trim()) return;

        // In a real app, this would be an API call
        const updatedFeedbacks = feedbacks.map(feedback => {
            if (feedback.id === feedbackId) {
                const newResponse = {
                    id: feedback.responses.length + 1,
                    message: responseText,
                    sender: 'You',
                    date: new Date().toISOString()
                };

                // Update status to in-progress if it was pending
                const newStatus = feedback.status === 'pending' ? 'in-progress' : feedback.status;

                return {
                    ...feedback,
                    responses: [...feedback.responses, newResponse],
                    status: newStatus
                };
            }
            return feedback;
        });

        setFeedbacks(updatedFeedbacks);
        handleFilter(activeFilter); // Reapply filters
        setResponseText('');
    };

    const markAsResolved = (feedbackId) => {
        const updatedFeedbacks = feedbacks.map(feedback => {
            if (feedback.id === feedbackId) {
                return {
                    ...feedback,
                    status: 'resolved'
                };
            }
            return feedback;
        });

        setFeedbacks(updatedFeedbacks);
        handleFilter(activeFilter); // Reapply filters
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'resolved':
                return <MdCheckCircle className="text-green-500" />;
            case 'in-progress':
                return <MdComment className="text-blue-500" />;
            case 'pending':
                return <MdWarning className="text-amber-500" />;
            default:
                return <MdFlag className="text-gray-500" />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-amber-100 text-amber-800';
            case 'low':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-7xl mx-auto" data-aos="fade-up">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Feedback Management</h2>
                <p className="text-gray-600 mt-1">Review and respond to feedback on your final report submissions</p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => handleFilter('all')}
                        className={`px-4 py-2 rounded-md transition-colors ${activeFilter === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => handleFilter('pending')}
                        className={`px-4 py-2 rounded-md flex items-center transition-colors ${activeFilter === 'pending'
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        <MdWarning className="mr-1" />
                        Pending
                    </button>
                    <button
                        onClick={() => handleFilter('in-progress')}
                        className={`px-4 py-2 rounded-md flex items-center transition-colors ${activeFilter === 'in-progress'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        <MdComment className="mr-1" />
                        In Progress
                    </button>
                    <button
                        onClick={() => handleFilter('resolved')}
                        className={`px-4 py-2 rounded-md flex items-center transition-colors ${activeFilter === 'resolved'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        <MdCheckCircle className="mr-1" />
                        Resolved
                    </button>
                </div>

                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search feedback..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <MdSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
                </div>
            </div>

            {/* Feedback List */}
            {filteredFeedbacks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                    <MdFilterList className="text-5xl text-gray-400 mb-3" />
                    <p className="text-gray-600 text-lg mb-1">No feedbacks found</p>
                    <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or search terms</p>
                    <button
                        onClick={() => {
                            setActiveFilter('all');
                            setSearchQuery('');
                            setFilteredFeedbacks(feedbacks);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
                    >
                        <MdRefresh className="mr-2" /> Reset Filters
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredFeedbacks.map(feedback => (
                        <div
                            key={feedback.id}
                            className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                            data-aos="fade-up" data-aos-delay={100 * (feedback.id % 5)}
                        >
                            {/* Feedback Header */}
                            <div
                                className="px-6 py-4 cursor-pointer flex justify-between items-center"
                                onClick={() => toggleExpand(feedback.id)}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="mt-1">
                                        {getStatusIcon(feedback.status)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800">{feedback.title}</h3>
                                        <div className="flex flex-wrap gap-2 mt-1 items-center">
                                            <span className="text-sm text-gray-600 flex items-center">
                                                <MdPerson className="mr-1" /> {feedback.sender}
                                            </span>
                                            <span className="text-sm text-gray-500 flex items-center">
                                                <MdAccessTime className="mr-1" /> {formatDate(feedback.date)}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(feedback.priority)}`}>
                                                {feedback.priority.charAt(0).toUpperCase() + feedback.priority.slice(1)} Priority
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-gray-400">
                                    {expandedFeedback === feedback.id ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {expandedFeedback === feedback.id && (
                                <div className="px-6 py-4 bg-gray-50 border-t">
                                    <div className="mb-4">
                                        <p className="text-gray-700 whitespace-pre-line">{feedback.message}</p>
                                        <div className="mt-2 text-sm text-gray-500">
                                            From feedback on: <span className="font-medium">{feedback.proposalTitle}</span> • {feedback.sessionName}
                                        </div>
                                    </div>

                                    {/* Responses Section */}
                                    {feedback.responses.length > 0 && (
                                        <div className="mt-4 mb-6">
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Conversation History</h4>
                                            <div className="space-y-3">
                                                {feedback.responses.map(response => (
                                                    <div key={response.id} className={`p-3 rounded-lg ${response.sender === 'You' ? 'bg-blue-50 ml-4' : 'bg-white mr-4 border'}`}>
                                                        <div className="flex justify-between mb-1">
                                                            <span className="font-medium text-sm">{response.sender}</span>
                                                            <span className="text-xs text-gray-500">{formatDate(response.date)}</span>
                                                        </div>
                                                        <p className="text-gray-700 text-sm">{response.message}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Response Form */}
                                    {feedback.status !== 'resolved' && (
                                        <div className="mt-4">
                                            <textarea
                                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                rows="3"
                                                placeholder="Type your response here..."
                                                value={responseText}
                                                onChange={(e) => setResponseText(e.target.value)}
                                            ></textarea>
                                            <div className="flex justify-between mt-2">
                                                <button
                                                    className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center hover:bg-green-700 transition-colors"
                                                    onClick={() => markAsResolved(feedback.id)}
                                                >
                                                    <MdCheckCircle className="mr-2" /> Mark as Resolved
                                                </button>
                                                <button
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                                                    onClick={() => handleResponseSubmit(feedback.id)}
                                                    disabled={!responseText.trim()}
                                                >
                                                    <MdSend className="mr-2" /> Send Response
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Summary Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-medium text-blue-700 mb-1">Total Feedback</h3>
                    <p className="text-2xl font-bold text-blue-800">{feedbacks.length}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <h3 className="font-medium text-amber-700 mb-1">Pending Action</h3>
                    <p className="text-2xl font-bold text-amber-800">
                        {feedbacks.filter(f => f.status === 'pending').length}
                    </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="font-medium text-green-700 mb-1">Resolved</h3>
                    <p className="text-2xl font-bold text-green-800">
                        {feedbacks.filter(f => f.status === 'resolved').length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeedbackManagement;
