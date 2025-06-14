import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    MdOutlineNotifications,
    MdOutlineDelete,
    MdCheck,
    MdSearch,
    MdFilterList,
    MdNotificationsOff,
    MdCircle,
    MdInfoOutline,
    MdWarning,
    MdErrorOutline,
    MdLoop,
    MdRefresh
} from 'react-icons/md';

const FeedbackNotifications = () => {
    // States
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    // Fetch notifications - would normally use API call
    useEffect(() => {
        // Simulate API call with dummy data
        setTimeout(() => {
            const dummyNotifications = [
                {
                    id: 1,
                    type: 'info',
                    message: 'New proposal assigned for review: "AI-Based Proposal Validation System"',
                    sender: 'System',
                    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
                    read: false,
                    proposalId: 'PRO-2025-042',
                    sessionId: 'SESSION-2025-1'
                },
                {
                    id: 2,
                    type: 'success',
                    message: 'Your feedback for "Machine Learning Implementation" has been submitted successfully',
                    sender: 'System',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
                    read: true,
                    proposalId: 'PRO-2025-036'
                },
                {
                    id: 3,
                    type: 'warning',
                    message: 'Review deadline approaching in 2 days for 3 proposals in your queue',
                    sender: 'System',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
                    read: false
                },
                {
                    id: 4,
                    type: 'error',
                    message: 'Failed to submit feedback for "Data Analytics Framework" - please retry',
                    sender: 'System',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
                    read: false,
                    proposalId: 'PRO-2025-029'
                },
                {
                    id: 5,
                    type: 'info',
                    message: 'Dr. Sanjaya has added a comment to your review on "IoT Implementation Proposal"',
                    sender: 'Dr. Sanjaya',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
                    read: true,
                    proposalId: 'PRO-2025-018'
                },
                {
                    id: 6,
                    type: 'success',
                    message: 'Session review phase for "Session 2025-1" has been extended by 5 days',
                    sender: 'Admin',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(), // 30 hours ago
                    read: true,
                    sessionId: 'SESSION-2025-1'
                },
                {
                    id: 7,
                    type: 'warning',
                    message: 'Please complete your profile to ensure proper notification delivery',
                    sender: 'System',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
                    read: false
                }
            ];

            setNotifications(dummyNotifications);
            setFilteredNotifications(dummyNotifications);
            setLoading(false);
        }, 1000);
    }, []);

    // Handle search and filter
    useEffect(() => {
        let result = notifications;

        // Apply type filter
        if (filterType !== 'all') {
            result = result.filter(notification => notification.type === filterType);
        }

        // Apply search term
        if (searchTerm) {
            result = result.filter(notification =>
                notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notification.sender.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredNotifications(result);
    }, [notifications, searchTerm, filterType]);

    // Mark notification as read
    const markAsRead = (id) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    // Delete notification
    const deleteNotification = (id) => {
        setNotifications(prevNotifications =>
            prevNotifications.filter(notification => notification.id !== id)
        );
    };

    // Mark all as read
    const markAllAsRead = () => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification => ({ ...notification, read: true }))
        );
    };

    // Format timestamp to relative time
    const formatRelativeTime = (timestamp) => {
        const now = new Date();
        const date = new Date(timestamp);
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    };

    // Get icon based on notification type
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'info': return <MdInfoOutline className="text-blue-500" size={24} />;
            case 'success': return <MdCheck className="text-green-500" size={24} />;
            case 'warning': return <MdWarning className="text-amber-500" size={24} />;
            case 'error': return <MdErrorOutline className="text-red-500" size={24} />;
            default: return <MdInfoOutline className="text-gray-500" size={24} />;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 w-full transition-all">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                    <MdOutlineNotifications className="text-indigo-600 dark:text-indigo-400 mr-2" size={28} />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Feedback Notifications</h2>
                    <span className="ml-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {notifications.filter(n => !n.read).length}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <button
                        onClick={markAllAsRead}
                        className="bg-indigo-50 dark:bg-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-800 text-indigo-600 dark:text-indigo-300 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
                    >
                        <MdCheck className="mr-1" size={18} />
                        Mark all read
                    </button>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="bg-indigo-50 dark:bg-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-800 text-indigo-600 dark:text-indigo-300 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
                    >
                        <MdFilterList className="mr-1" size={18} />
                        Filter
                    </button>
                    <button
                        onClick={() => {
                            setLoading(true);
                            setTimeout(() => setLoading(false), 500);
                        }}
                        className="bg-indigo-50 dark:bg-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-800 text-indigo-600 dark:text-indigo-300 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
                    >
                        <MdRefresh className="mr-1" size={18} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Search and Filter section */}
            <div className="mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MdSearch className="text-gray-500 dark:text-gray-400" size={20} />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Search notifications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-2"
                    >
                        <button
                            onClick={() => setFilterType('all')}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${filterType === 'all'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterType('info')}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${filterType === 'info'
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/30'
                                }`}
                        >
                            <MdInfoOutline className="mr-1" />
                            Info
                        </button>
                        <button
                            onClick={() => setFilterType('success')}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${filterType === 'success'
                                ? 'bg-green-600 text-white'
                                : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800/30'
                                }`}
                        >
                            <MdCheck className="mr-1" />
                            Success
                        </button>
                        <button
                            onClick={() => setFilterType('warning')}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${filterType === 'warning'
                                ? 'bg-amber-600 text-white'
                                : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/30'
                                }`}
                        >
                            <MdWarning className="mr-1" />
                            Warnings
                        </button>
                        <button
                            onClick={() => setFilterType('error')}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center ${filterType === 'error'
                                ? 'bg-red-600 text-white'
                                : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800/30'
                                }`}
                        >
                            <MdErrorOutline className="mr-1" />
                            Errors
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Notifications List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <MdLoop className="text-indigo-500 animate-spin mb-4" size={48} />
                    <p className="text-gray-500 dark:text-gray-400">Loading notifications...</p>
                </div>
            ) : filteredNotifications.length > 0 ? (
                <div className="space-y-3">
                    {filteredNotifications.map(notification => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`p-4 border rounded-lg flex items-start gap-3 transition-all ${notification.read
                                ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                                : 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30'
                                }`}
                        >
                            <div className="flex-shrink-0">
                                {getNotificationIcon(notification.type)}
                            </div>

                            <div className="flex-grow">
                                <div className="flex items-start justify-between">
                                    <h3 className={`font-medium ${notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                                        {notification.sender}
                                        {!notification.read && (
                                            <MdCircle className="inline-block ml-2 text-indigo-600" size={8} />
                                        )}
                                    </h3>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatRelativeTime(notification.timestamp)}
                                    </span>
                                </div>

                                <p className={`mt-1 text-sm ${notification.read ? 'text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                                    {notification.message}
                                </p>

                                {(notification.proposalId || notification.sessionId) && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {notification.proposalId && (
                                            <span className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-1 rounded">
                                                {notification.proposalId}
                                            </span>
                                        )}
                                        {notification.sessionId && (
                                            <span className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-1 rounded">
                                                {notification.sessionId}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="mt-3 flex gap-2">
                                    {!notification.read && (
                                        <button
                                            onClick={() => markAsRead(notification.id)}
                                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
                                        >
                                            <MdCheck className="mr-1" size={14} />
                                            Mark as read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteNotification(notification.id)}
                                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 flex items-center"
                                    >
                                        <MdOutlineDelete className="mr-1" size={14} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <MdNotificationsOff className="text-gray-400 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No notifications found</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                        {searchTerm || filterType !== 'all'
                            ? "No notifications match your current filters. Try adjusting your search or filters."
                            : "You're all caught up! No new feedback notifications at this time."}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FeedbackNotifications;
