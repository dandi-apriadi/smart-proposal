import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    MdWarning, MdCheckCircle, MdArrowUpward, MdHistory,
    MdSearch, MdFilterList, MdSort, MdRefresh, MdOutlineInfo,
    MdNotificationsActive, MdAssignmentTurnedIn, MdPriorityHigh,
    MdTimeline, MdSupervisorAccount, MdArticle, MdAddAlert,
    MdDelete, MdArchive, MdCalendarToday, MdAccessTime
} from 'react-icons/md';
import { motion } from 'framer-motion';

const IssueManagement = () => {
    const dispatch = useDispatch();
    const { baseURL } = useSelector((state) => state.auth);

    // States for the different sections
    const [activeTab, setActiveTab] = useState('warnings');
    const [issues, setIssues] = useState([]);
    const [filteredIssues, setFilteredIssues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [resolutionNote, setResolutionNote] = useState('');
    const [escalationReason, setEscalationReason] = useState('');
    const [showHistoryDetails, setShowHistoryDetails] = useState(null);

    // Dummy data for demonstration
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const dummyIssues = [
                {
                    id: 1,
                    title: 'Missing Required Documentation',
                    description: 'Your proposal is missing the required budget breakdown section.',
                    severity: 'high',
                    status: 'open',
                    createdAt: '2025-04-15T10:30:00Z',
                    proposalId: 'PROP-2025-042',
                    possibleSolutions: [
                        'Upload a complete budget breakdown document',
                        'Update your proposal with the missing section'
                    ]
                },
                {
                    id: 2,
                    title: 'Format Inconsistency',
                    description: 'The citation format in your proposal does not follow the required style guide.',
                    severity: 'medium',
                    status: 'in-progress',
                    createdAt: '2025-04-14T08:15:00Z',
                    proposalId: 'PROP-2025-042',
                    possibleSolutions: [
                        'Review the citation style guide',
                        'Update all citations to match the required format'
                    ]
                },
                {
                    id: 3,
                    title: 'Deadline Warning',
                    description: 'Your progress report submission deadline is approaching in 3 days.',
                    severity: 'medium',
                    status: 'open',
                    createdAt: '2025-04-13T14:45:00Z',
                    proposalId: 'PROP-2025-039',
                    possibleSolutions: [
                        'Complete and submit your progress report',
                        'Request a deadline extension if needed'
                    ]
                },
                {
                    id: 4,
                    title: 'Content Similarity Alert',
                    description: 'Parts of your proposal show high similarity with existing published work.',
                    severity: 'high',
                    status: 'open',
                    createdAt: '2025-04-12T11:20:00Z',
                    proposalId: 'PROP-2025-042',
                    possibleSolutions: [
                        'Revise the flagged sections to ensure originality',
                        'Properly cite any referenced work'
                    ]
                },
                {
                    id: 5,
                    title: 'Budget Discrepancy',
                    description: 'The total budget calculation in your proposal contains errors.',
                    severity: 'low',
                    status: 'resolved',
                    createdAt: '2025-04-10T09:30:00Z',
                    resolvedAt: '2025-04-11T14:20:00Z',
                    proposalId: 'PROP-2025-038',
                    resolution: 'Budget calculations corrected and updated'
                }
            ];

            setIssues(dummyIssues);
            setFilteredIssues(dummyIssues);
            setIsLoading(false);
        }, 1000);
    }, []);

    // Filter issues based on search term and filter status
    useEffect(() => {
        let result = issues;

        if (searchTerm) {
            result = result.filter(issue =>
                issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                issue.proposalId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterStatus !== 'all') {
            result = result.filter(issue => issue.status === filterStatus);
        }

        setFilteredIssues(result);
    }, [searchTerm, filterStatus, issues]);

    // Handle resolving an issue
    const handleResolveIssue = (id) => {
        setIssues(prevIssues =>
            prevIssues.map(issue =>
                issue.id === id
                    ? { ...issue, status: 'resolved', resolvedAt: new Date().toISOString() }
                    : issue
            )
        );

        // In a real app, you would call an API here
        // Example: dispatch(resolveIssue(id))
    };

    // Handle escalating an issue
    const handleEscalateIssue = (id) => {
        setIssues(prevIssues =>
            prevIssues.map(issue =>
                issue.id === id
                    ? { ...issue, status: 'escalated', escalatedAt: new Date().toISOString() }
                    : issue
            )
        );

        // In a real app, you would call an API here
        // Example: dispatch(escalateIssue(id))
    };

    // Handle selecting an issue for detailed view
    const handleSelectIssue = (issue) => {
        setSelectedIssue(issue);
    };

    // Handle going back to list view
    const handleBackToList = () => {
        setSelectedIssue(null);
        setResolutionNote('');
        setEscalationReason('');
    };

    // Resolve with comment
    const handleResolveWithComment = (id) => {
        if (!resolutionNote.trim()) {
            alert('Please add a resolution note before proceeding');
            return;
        }

        setIssues(prevIssues =>
            prevIssues.map(issue =>
                issue.id === id
                    ? {
                        ...issue,
                        status: 'resolved',
                        resolvedAt: new Date().toISOString(),
                        resolution: resolutionNote
                    }
                    : issue
            )
        );

        setSelectedIssue(null);
        setResolutionNote('');
        // In a real app, you would call an API here
    };

    // Escalate with reason
    const handleEscalateWithReason = (id) => {
        if (!escalationReason.trim()) {
            alert('Please add an escalation reason before proceeding');
            return;
        }

        setIssues(prevIssues =>
            prevIssues.map(issue =>
                issue.id === id
                    ? {
                        ...issue,
                        status: 'escalated',
                        escalatedAt: new Date().toISOString(),
                        escalationReason: escalationReason
                    }
                    : issue
            )
        );

        setSelectedIssue(null);
        setEscalationReason('');
        // In a real app, you would call an API here
    };

    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Get timeline events for an issue
    const getIssueTimeline = (issue) => {
        const timeline = [
            {
                date: issue.createdAt,
                event: 'Issue Created',
                description: `Issue "${issue.title}" was created for proposal ${issue.proposalId}`
            }
        ];

        if (issue.status === 'in-progress') {
            timeline.push({
                date: new Date(new Date(issue.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString(), // add a day for demo
                event: 'Processing Started',
                description: 'Issue is being processed by the system'
            });
        }

        if (issue.status === 'escalated' || issue.escalatedAt) {
            timeline.push({
                date: issue.escalatedAt || new Date().toISOString(),
                event: 'Issue Escalated',
                description: issue.escalationReason || 'Escalated to higher authority'
            });
        }

        if (issue.status === 'resolved' || issue.resolvedAt) {
            timeline.push({
                date: issue.resolvedAt || new Date().toISOString(),
                event: 'Issue Resolved',
                description: issue.resolution || 'Issue was resolved'
            });
        }

        // Sort by date, newest first
        return timeline.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    // Determine the status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'open':
                return 'bg-red-100 text-red-800';
            case 'in-progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'resolved':
                return 'bg-green-100 text-green-800';
            case 'escalated':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Determine the severity badge color
    const getSeverityBadgeColor = (severity) => {
        switch (severity) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Render appropriate content based on active tab
    const renderTabContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            );
        }

        if (filteredIssues.length === 0) {
            return (
                <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <MdCheckCircle className="text-green-500 text-3xl" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        {searchTerm || filterStatus !== 'all'
                            ? "Try adjusting your search or filter criteria"
                            : "You don't have any issues that require attention at this time"}
                    </p>
                </div>
            );
        }

        // WARNING NOTIFICATIONS TAB
        if (activeTab === 'warnings') {
            return (
                <div className="space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <MdNotificationsActive className="h-5 w-5 text-blue-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    This tab shows all notifications and warnings that require your attention.
                                </p>
                            </div>
                        </div>
                    </div>

                    {filteredIssues.map((issue) => (
                        <motion.div
                            key={issue.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                                <div className="flex-grow">
                                    <div className="flex items-start">
                                        <div className={`p-2 rounded-full mr-3 ${issue.severity === 'high' ? 'bg-red-100' : issue.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                                            <MdWarning className={`text-xl ${issue.severity === 'high' ? 'text-red-500' : issue.severity === 'medium' ? 'text-yellow-600' : 'text-blue-500'}`} />
                                        </div>
                                        <div>
                                            <div className="flex items-center flex-wrap gap-2 mb-1">
                                                <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeColor(issue.status)}`}>
                                                    {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                                                </span>
                                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getSeverityBadgeColor(issue.severity)}`}>
                                                    {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)} Priority
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-2">{issue.description}</p>
                                            <div className="flex items-center text-sm text-gray-500 mb-3">
                                                <span>Proposal: {issue.proposalId}</span>
                                                <span className="mx-2">•</span>
                                                <span>Created: {new Date(issue.createdAt).toLocaleDateString()}</span>
                                                {issue.resolvedAt && (
                                                    <>
                                                        <span className="mx-2">•</span>
                                                        <span>Resolved: {new Date(issue.resolvedAt).toLocaleDateString()}</span>
                                                    </>
                                                )}
                                            </div>
                                            {issue.possibleSolutions && (
                                                <div className="mt-3">
                                                    <h4 className="text-sm font-medium text-gray-700 mb-1">Suggested Solutions:</h4>
                                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 pl-1">
                                                        {issue.possibleSolutions.map((solution, idx) => (
                                                            <li key={idx}>{solution}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {issue.resolution && (
                                                <div className="mt-3 bg-green-50 p-3 rounded-md">
                                                    <h4 className="text-sm font-medium text-green-800 mb-1">Resolution:</h4>
                                                    <p className="text-sm text-green-700">{issue.resolution}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {issue.status !== 'resolved' && (
                                    <div className="flex space-x-2 mt-4 md:mt-0 md:ml-4">
                                        <button
                                            onClick={() => handleResolveIssue(issue.id)}
                                            className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
                                        >
                                            Mark Resolved
                                        </button>
                                        {issue.status !== 'escalated' && (
                                            <button
                                                onClick={() => handleEscalateIssue(issue.id)}
                                                className="px-3 py-1.5 bg-purple-100 text-purple-700 text-sm font-medium rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors"
                                            >
                                                Escalate
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            );
        }

        // RESOLUTION CENTER TAB
        if (activeTab === 'resolution') {
            if (selectedIssue) {
                return (
                    <div className="space-y-6">
                        <div className="flex items-center mb-4">
                            <button
                                onClick={handleBackToList}
                                className="flex items-center text-blue-600 hover:text-blue-800"
                            >
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to list
                            </button>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start mb-4">
                                <div className={`p-3 rounded-full mr-4 ${selectedIssue.severity === 'high' ? 'bg-red-100' : selectedIssue.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                                    <MdWarning className={`text-2xl ${selectedIssue.severity === 'high' ? 'text-red-500' : selectedIssue.severity === 'medium' ? 'text-yellow-600' : 'text-blue-500'}`} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedIssue.title}</h2>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeColor(selectedIssue.status)}`}>
                                            {selectedIssue.status.charAt(0).toUpperCase() + selectedIssue.status.slice(1)}
                                        </span>
                                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getSeverityBadgeColor(selectedIssue.severity)}`}>
                                            {selectedIssue.severity.charAt(0).toUpperCase() + selectedIssue.severity.slice(1)} Priority
                                        </span>
                                    </div>
                                    <p className="text-gray-600">{selectedIssue.description}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <h3 className="text-lg font-semibold mb-3">Resolution Details</h3>

                                <div className="bg-gray-50 p-4 rounded-md mb-4">
                                    <h4 className="font-medium text-gray-700 mb-2">Proposal Information</h4>
                                    <p className="text-sm text-gray-600 mb-1">Proposal ID: {selectedIssue.proposalId}</p>
                                    <p className="text-sm text-gray-600">Created: {formatDate(selectedIssue.createdAt)}</p>
                                </div>

                                {selectedIssue.possibleSolutions && (
                                    <div className="mb-6">
                                        <h4 className="font-medium text-gray-700 mb-2">Recommended Solutions</h4>
                                        <ul className="bg-blue-50 rounded-md p-4 space-y-2">
                                            {selectedIssue.possibleSolutions.map((solution, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <MdAssignmentTurnedIn className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                                                    <span className="text-blue-800">{solution}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Resolution Note
                                    </label>
                                    <textarea
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Describe how you resolved this issue..."
                                        value={resolutionNote}
                                        onChange={(e) => setResolutionNote(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={handleBackToList}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleResolveWithComment(selectedIssue.id)}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Mark as Resolved
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div className="space-y-6">
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <MdAssignmentTurnedIn className="h-5 w-5 text-green-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">
                                    Select an issue from the list below to start the resolution process.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredIssues
                            .filter(issue => issue.status !== 'resolved')
                            .map((issue) => (
                                <motion.div
                                    key={issue.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => handleSelectIssue(issue)}
                                >
                                    <div className="flex items-start">
                                        <div className={`p-2 rounded-full mr-3 ${issue.severity === 'high' ? 'bg-red-100' : issue.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                                            <MdWarning className={`text-xl ${issue.severity === 'high' ? 'text-red-500' : issue.severity === 'medium' ? 'text-yellow-600' : 'text-blue-500'}`} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{issue.title}</h3>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeColor(issue.status)}`}>
                                                    {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                                                </span>
                                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getSeverityBadgeColor(issue.severity)}`}>
                                                    {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{issue.description}</p>
                                            <p className="text-xs text-gray-500">Proposal: {issue.proposalId}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </div>

                    {filteredIssues.filter(issue => issue.status !== 'resolved').length === 0 && (
                        <div className="text-center py-8">
                            <MdCheckCircle className="mx-auto text-green-500 text-4xl mb-3" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No issues to resolve</h3>
                            <p className="text-sm text-gray-500">All issues have been resolved.</p>
                        </div>
                    )}
                </div>
            );
        }

        // ESCALATION OPTIONS TAB
        if (activeTab === 'escalation') {
            if (selectedIssue) {
                return (
                    <div className="space-y-6">
                        <div className="flex items-center mb-4">
                            <button
                                onClick={handleBackToList}
                                className="flex items-center text-blue-600 hover:text-blue-800"
                            >
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to list
                            </button>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start mb-4">
                                <div className={`p-3 rounded-full mr-4 ${selectedIssue.severity === 'high' ? 'bg-red-100' : selectedIssue.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                                    <MdWarning className={`text-2xl ${selectedIssue.severity === 'high' ? 'text-red-500' : selectedIssue.severity === 'medium' ? 'text-yellow-600' : 'text-blue-500'}`} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedIssue.title}</h2>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeColor(selectedIssue.status)}`}>
                                            {selectedIssue.status.charAt(0).toUpperCase() + selectedIssue.status.slice(1)}
                                        </span>
                                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getSeverityBadgeColor(selectedIssue.severity)}`}>
                                            {selectedIssue.severity.charAt(0).toUpperCase() + selectedIssue.severity.slice(1)} Priority
                                        </span>
                                    </div>
                                    <p className="text-gray-600">{selectedIssue.description}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <h3 className="text-lg font-semibold mb-3">Escalation Details</h3>

                                <div className="bg-gray-50 p-4 rounded-md mb-4">
                                    <h4 className="font-medium text-gray-700 mb-2">Proposal Information</h4>
                                    <p className="text-sm text-gray-600 mb-1">Proposal ID: {selectedIssue.proposalId}</p>
                                    <p className="text-sm text-gray-600">Created: {formatDate(selectedIssue.createdAt)}</p>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-md mb-6">
                                    <div className="flex items-start">
                                        <MdPriorityHigh className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-medium text-yellow-800 mb-1">Important Note</h4>
                                            <p className="text-sm text-yellow-700">
                                                Escalating this issue will notify administrators and reviewers.
                                                Please provide a clear reason why this issue needs attention from higher authorities.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Reason for Escalation
                                    </label>
                                    <textarea
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Explain why this issue needs to be escalated..."
                                        value={escalationReason}
                                        onChange={(e) => setEscalationReason(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-medium text-gray-700 mb-3">Select Recipients</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <input
                                                id="admin"
                                                name="admin"
                                                type="checkbox"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                defaultChecked
                                            />
                                            <label htmlFor="admin" className="ml-2 block text-sm text-gray-700">
                                                Administrator
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="reviewer"
                                                name="reviewer"
                                                type="checkbox"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                defaultChecked
                                            />
                                            <label htmlFor="reviewer" className="ml-2 block text-sm text-gray-700">
                                                Proposal Reviewers
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="supervisor"
                                                name="supervisor"
                                                type="checkbox"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="supervisor" className="ml-2 block text-sm text-gray-700">
                                                Department Supervisor
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={handleBackToList}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleEscalateWithReason(selectedIssue.id)}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    >
                                        Escalate Issue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div className="space-y-6">
                    <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <MdArrowUpward className="h-5 w-5 text-purple-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-purple-700">
                                    Select an issue from the list below to escalate it to appropriate authorities.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredIssues
                            .filter(issue => issue.status !== 'resolved' && issue.status !== 'escalated')
                            .map((issue) => (
                                <motion.div
                                    key={issue.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => handleSelectIssue(issue)}
                                >
                                    <div className="flex items-start">
                                        <div className={`p-2 rounded-full mr-3 ${issue.severity === 'high' ? 'bg-red-100' : issue.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                                            <MdWarning className={`text-xl ${issue.severity === 'high' ? 'text-red-500' : issue.severity === 'medium' ? 'text-yellow-600' : 'text-blue-500'}`} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{issue.title}</h3>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeColor(issue.status)}`}>
                                                    {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                                                </span>
                                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getSeverityBadgeColor(issue.severity)}`}>
                                                    {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{issue.description}</p>
                                            <p className="text-xs text-gray-500">Proposal: {issue.proposalId}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </div>

                    {filteredIssues.filter(issue => issue.status !== 'resolved' && issue.status !== 'escalated').length === 0 && (
                        <div className="text-center py-8">
                            <MdCheckCircle className="mx-auto text-green-500 text-4xl mb-3" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No issues to escalate</h3>
                            <p className="text-sm text-gray-500">There are no issues that need escalation at this time.</p>
                        </div>
                    )}
                </div>
            );
        }

        // HISTORY & TRACKING TAB
        if (activeTab === 'history') {
            return (
                <div className="space-y-6">
                    <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <MdHistory className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-700">
                                    View the history and timeline of all your issues. Click on an issue to see its detailed timeline.
                                </p>
                            </div>
                        </div>
                    </div>

                    {showHistoryDetails ? (
                        <div>
                            <div className="flex items-center mb-4">
                                <button
                                    onClick={() => setShowHistoryDetails(null)}
                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                >
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to history
                                </button>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="flex items-start mb-6">
                                    <div className={`p-3 rounded-full mr-4 ${showHistoryDetails.severity === 'high' ? 'bg-red-100' : showHistoryDetails.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                                        <MdWarning className={`text-2xl ${showHistoryDetails.severity === 'high' ? 'text-red-500' : showHistoryDetails.severity === 'medium' ? 'text-yellow-600' : 'text-blue-500'}`} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-1">{showHistoryDetails.title}</h2>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeColor(showHistoryDetails.status)}`}>
                                                {showHistoryDetails.status.charAt(0).toUpperCase() + showHistoryDetails.status.slice(1)}
                                            </span>
                                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getSeverityBadgeColor(showHistoryDetails.severity)}`}>
                                                {showHistoryDetails.severity.charAt(0).toUpperCase() + showHistoryDetails.severity.slice(1)} Priority
                                            </span>
                                        </div>
                                        <p className="text-gray-600">{showHistoryDetails.description}</p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                                        <MdTimeline className="mr-2 text-gray-500" />
                                        Issue Timeline
                                    </h3>

                                    <div className="flow-root">
                                        <ul className="-mb-8">
                                            {getIssueTimeline(showHistoryDetails).map((timelineItem, idx) => (
                                                <li key={idx}>
                                                    <div className="relative pb-8">
                                                        {idx !== getIssueTimeline(showHistoryDetails).length - 1 ? (
                                                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                                        ) : null}
                                                        <div className="relative flex space-x-3">
                                                            <div>
                                                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${timelineItem.event.includes('Created') ? 'bg-blue-500' :
                                                                    timelineItem.event.includes('Escalated') ? 'bg-purple-500' :
                                                                        timelineItem.event.includes('Resolved') ? 'bg-green-500' : 'bg-yellow-500'
                                                                    }`}>
                                                                    {timelineItem.event.includes('Created') ? (
                                                                        <MdAddAlert className="h-5 w-5 text-white" />
                                                                    ) : timelineItem.event.includes('Escalated') ? (
                                                                        <MdSupervisorAccount className="h-5 w-5 text-white" />
                                                                    ) : timelineItem.event.includes('Resolved') ? (
                                                                        <MdCheckCircle className="h-5 w-5 text-white" />
                                                                    ) : (
                                                                        <MdArticle className="h-5 w-5 text-white" />
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                                <div>
                                                                    <p className="text-sm text-gray-500">{timelineItem.description}</p>
                                                                </div>
                                                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                                    <time dateTime={timelineItem.date}>{formatDate(timelineItem.date)}</time>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-hidden bg-white shadow sm:rounded-md">
                            <ul className="divide-y divide-gray-200">
                                {filteredIssues.map((issue) => (
                                    <motion.li
                                        key={issue.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div
                                            className="block hover:bg-gray-50 cursor-pointer"
                                            onClick={() => setShowHistoryDetails(issue)}
                                        >
                                            <div className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className={`p-2 rounded-full mr-3 ${issue.severity === 'high' ? 'bg-red-100' : issue.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                                                            <MdWarning className={`text-xl ${issue.severity === 'high' ? 'text-red-500' : issue.severity === 'medium' ? 'text-yellow-600' : 'text-blue-500'}`} />
                                                        </div>
                                                        <p className="truncate font-medium text-gray-800">{issue.title}</p>
                                                    </div>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(issue.status)}`}>
                                                            {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:flex sm:justify-between">
                                                    <div className="sm:flex">
                                                        <p className="flex items-center text-sm text-gray-500">
                                                            <MdArticle className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                            {issue.proposalId}
                                                        </p>
                                                    </div>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                        <MdCalendarToday className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                        <p>
                                                            Created on <time dateTime={issue.createdAt}>{new Date(issue.createdAt).toLocaleDateString()}</time>
                                                        </p>
                                                    </div>
                                                </div>
                                                {issue.resolvedAt && (
                                                    <div className="mt-2 flex items-center text-sm text-green-500 justify-end">
                                                        <MdCheckCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-500" />
                                                        <p>
                                                            Resolved on <time dateTime={issue.resolvedAt}>{new Date(issue.resolvedAt).toLocaleDateString()}</time>
                                                        </p>
                                                    </div>
                                                )}
                                                {issue.escalatedAt && !issue.resolvedAt && (
                                                    <div className="mt-2 flex items-center text-sm text-purple-500 justify-end">
                                                        <MdArrowUpward className="flex-shrink-0 mr-1.5 h-5 w-5 text-purple-500" />
                                                        <p>
                                                            Escalated on <time dateTime={issue.escalatedAt}>{new Date(issue.escalatedAt).toLocaleDateString()}</time>
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>

                            {filteredIssues.length === 0 && (
                                <div className="text-center py-8">
                                    <MdHistory className="mx-auto text-gray-400 text-4xl mb-3" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">No issue history found</h3>
                                    <p className="text-sm text-gray-500">There are no issues in your history matching your filters.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-md p-6 mb-6"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Issue Management</h1>
                            <p className="text-gray-600 mt-1">
                                Track and resolve issues related to your proposals and reports
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <div className="flex items-center bg-blue-50 text-blue-700 py-2 px-4 rounded-lg">
                                <MdOutlineInfo className="text-xl mr-2" />
                                <span className="text-sm font-medium">
                                    You have {issues.filter(i => i.status === 'open').length} open issues
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs Navigation */}
                <div className="bg-white rounded-lg shadow-md mb-6">
                    <div className="flex overflow-x-auto">
                        <button
                            className={`px-4 py-3 font-medium text-sm flex items-center whitespace-nowrap ${activeTab === 'warnings' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('warnings')}
                        >
                            <MdWarning className={`mr-2 ${activeTab === 'warnings' ? 'text-blue-500' : 'text-gray-500'}`} />
                            Warning Notifications
                        </button>
                        <button
                            className={`px-4 py-3 font-medium text-sm flex items-center whitespace-nowrap ${activeTab === 'resolution' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('resolution')}
                        >
                            <MdCheckCircle className={`mr-2 ${activeTab === 'resolution' ? 'text-blue-500' : 'text-gray-500'}`} />
                            Resolution Center
                        </button>
                        <button
                            className={`px-4 py-3 font-medium text-sm flex items-center whitespace-nowrap ${activeTab === 'escalation' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('escalation')}
                        >
                            <MdArrowUpward className={`mr-2 ${activeTab === 'escalation' ? 'text-blue-500' : 'text-gray-500'}`} />
                            Escalation Options
                        </button>
                        <button
                            className={`px-4 py-3 font-medium text-sm flex items-center whitespace-nowrap ${activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('history')}
                        >
                            <MdHistory className={`mr-2 ${activeTab === 'history' ? 'text-blue-500' : 'text-gray-500'}`} />
                            History & Tracking
                        </button>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search issues..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MdSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
                        </div>
                        <div className="flex space-x-2">
                            <select
                                className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Statuses</option>
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="escalated">Escalated</option>
                            </select>
                            <button className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                <MdFilterList className="text-xl" />
                            </button>
                            <button className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                <MdSort className="text-xl" />
                            </button>
                            <button
                                className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                onClick={() => {
                                    setIsLoading(true);
                                    setTimeout(() => setIsLoading(false), 500);
                                }}
                            >
                                <MdRefresh className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area - Render based on active tab */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default IssueManagement;
