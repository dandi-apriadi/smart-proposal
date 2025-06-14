import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
    MdOutlineNotifications,
    MdNotificationsActive,
    MdOutlineCheck,
    MdDelete,
    MdFilterList,
    MdInfo,
    MdWarning,
    MdOutlineCheckCircle,
    MdAccessTime,
    MdSearch
} from 'react-icons/md';

const FeedbackNotification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Dummy data for notifications
    const dummyNotifications = [
        {
            id: 1,
            type: 'feedback',
            title: 'Proposal Evaluation Feedback',
            content: 'Your proposal "Pengembangan Sistem Validasi Proposal" has received feedback from the reviewer.',
            timestamp: '2025-04-15T09:30:00',
            isRead: false,
            priority: 'high',
            actionLink: '/dosen/proposal/123'
        },
        {
            id: 2,
            type: 'deadline',
            title: 'Approaching Deadline',
            content: 'Reminder: Progress report submission deadline is in 3 days.',
            timestamp: '2025-04-14T14:20:00',
            isRead: true,
            priority: 'medium',
            actionLink: '/dosen/progress-report'
        },
        {
            id: 3,
            type: 'system',
            title: 'System Update',
            content: 'The system will undergo maintenance tonight from 22:00 to 23:00.',
            timestamp: '2025-04-13T10:15:00',
            isRead: false,
            priority: 'low',
            actionLink: null
        },
        {
            id: 4,
            type: 'feedback',
            title: 'Final Report Feedback',
            content: 'Your final report has been reviewed. Please check the comments.',
            timestamp: '2025-04-12T16:45:00',
            isRead: true,
            priority: 'high',
            actionLink: '/dosen/final-report/456'
        },
        {
            id: 5,
            type: 'approval',
            title: 'Proposal Approved',
            content: 'Congratulations! Your proposal "Machine Learning Implementation" has been approved.',
            timestamp: '2025-04-11T11:20:00',
            isRead: false,
            priority: 'high',
            actionLink: '/dosen/proposal/789'
        }
    ];

    useEffect(() => {
        // Simulating API call
        setTimeout(() => {
            setNotifications(dummyNotifications);
            setLoading(false);
        }, 1000);
    }, []);

    const handleMarkAsRead = (id) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, isRead: true } : notification
        ));
    };

    const handleDelete = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    const handleFilter = (filter) => {
        setActiveFilter(filter);
    };

    const getFilteredNotifications = () => {
        let filtered = [...notifications];

        if (activeFilter !== 'all') {
            filtered = filtered.filter(notification => notification.type === activeFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(notification =>
                notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notification.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };

    const getNotificationIcon = (type, priority) => {
        switch (type) {
            case 'feedback':
                return <MdInfo className={`text-blue-500 text-xl`} />;
            case 'deadline':
                return <MdAccessTime className={`text-orange-500 text-xl`} />;
            case 'system':
                return <MdOutlineNotifications className={`text-gray-500 text-xl`} />;
            case 'approval':
                return <MdOutlineCheckCircle className={`text-green-500 text-xl`} />;
            default:
                return priority === 'high' ?
                    <MdWarning className="text-red-500 text-xl" /> :
                    <MdOutlineNotifications className="text-gray-500 text-xl" />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <MdNotificationsActive className="mr-2 text-blue-600" />
                    Feedback Notifications
                </h2>
                <div className="text-sm text-gray-500">
                    {notifications.filter(n => !n.isRead).length} unread
                </div>
            </div>

            {/* Search and filter section */}
            <div className="mb-6 space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search notifications..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <MdSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => handleFilter('all')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => handleFilter('feedback')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'feedback'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Feedback
                    </button>
                    <button
                        onClick={() => handleFilter('deadline')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'deadline'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Deadlines
                    </button>
                    <button
                        onClick={() => handleFilter('system')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'system'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        System
                    </button>
                    <button
                        onClick={() => handleFilter('approval')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'approval'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Approvals
                    </button>
                </div>
            </div>

            {/* Notifications list */}
            {getFilteredNotifications().length === 0 ? (
                <div className="text-center py-8">
                    <MdOutlineNotifications className="mx-auto text-5xl text-gray-300 mb-3" />
                    <p className="text-gray-500">No notifications found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {getFilteredNotifications().map(notification => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`relative border rounded-lg p-4 transition-all ${notification.isRead
                                    ? 'border-gray-200 bg-white'
                                    : 'border-blue-200 bg-blue-50'
                                }`}
                        >
                            <div className="absolute top-0 right-0 h-3 w-3">
                                {!notification.isRead && (
                                    <span className="absolute top-3 right-3 h-3 w-3 rounded-full bg-blue-500"></span>
                                )}
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-full bg-gray-100 flex-shrink-0">
                                    {getNotificationIcon(notification.type, notification.priority)}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-medium text-gray-900">{notification.title}</h3>
                                        <span className="text-xs text-gray-500">{formatDate(notification.timestamp)}</span>
                                    </div>

                                    <p className="text-gray-600 mt-1">{notification.content}</p>

                                    <div className="flex justify-between items-center mt-3">
                                        {notification.actionLink && (
                                            <a
                                                href={notification.actionLink}
                                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                View Details
                                            </a>
                                        )}

                                        <div className="flex space-x-2">
                                            {!notification.isRead && (
                                                <button
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    className="p-1.5 rounded-full hover:bg-gray-200 text-gray-600"
                                                    title="Mark as read"
                                                >
                                                    <MdOutlineCheck />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(notification.id)}
                                                className="p-1.5 rounded-full hover:bg-gray-200 text-gray-600"
                                                title="Delete"
                                            >
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Load more button - for pagination */}
            {getFilteredNotifications().length > 0 && (
                <div className="text-center mt-6">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default FeedbackNotification;
