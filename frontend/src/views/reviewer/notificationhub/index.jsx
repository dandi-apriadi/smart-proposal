import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    MdNotifications,
    MdSettings,
    MdAccessTime,
    MdWarning,
    MdFeedback,
    MdFilterList,
    MdSearch,
    MdCheck,
    MdDelete,
    MdMoreVert,
    MdNotificationsActive,
    MdNotificationsOff,
    MdRefresh
} from 'react-icons/md';

// Dummy data for notifications
const dummyNotifications = [
    {
        id: 1,
        type: 'important',
        title: 'Urgent: Review Deadline Approaching',
        message: 'You have 3 proposals awaiting review that are due in 48 hours',
        timestamp: '2025-04-15T08:30:00',
        read: false,
    },
    {
        id: 2,
        type: 'deadline',
        title: 'Session Evaluation Phase Begins',
        message: 'The evaluation phase for Session #2025-Q2 starts tomorrow',
        timestamp: '2025-04-14T14:45:00',
        read: true,
    },
    {
        id: 3,
        type: 'feedback',
        title: 'Feedback Required: Proposal #PRO-2025-042',
        message: 'Author has submitted revisions based on your previous review',
        timestamp: '2025-04-13T11:20:00',
        read: false,
    },
    {
        id: 4,
        type: 'important',
        title: 'New Proposals Assigned',
        message: 'You have been assigned 5 new proposals for review',
        timestamp: '2025-04-12T09:15:00',
        read: true,
    },
    {
        id: 5,
        type: 'deadline',
        title: 'Reminder: Progress Report Reviews',
        message: 'Progress reports for ongoing projects are due for review this Friday',
        timestamp: '2025-04-11T16:30:00',
        read: false,
    },
    {
        id: 6,
        type: 'feedback',
        title: 'Committee Discussion: Project #PRJ-2025-018',
        message: 'You have been mentioned in a discussion thread regarding this project',
        timestamp: '2025-04-10T13:45:00',
        read: true,
    }
];

const NotificationHub = () => {
    const [notifications, setNotifications] = useState(dummyNotifications);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [notificationSettings, setNotificationSettings] = useState({
        important: true,
        deadline: true,
        feedback: true,
        email: true,
        browser: true,
        sound: false,
    });

    // Filter notifications based on active filter and search term
    const filteredNotifications = notifications.filter(notification => {
        const matchesFilter =
            activeFilter === 'all' ||
            activeFilter === notification.type ||
            (activeFilter === 'unread' && !notification.read);

        const matchesSearch =
            notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    // Handle marking notification as read
    const markAsRead = (id) => {
        setNotifications(
            notifications.map(notification =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    // Handle dismissing a notification
    const dismissNotification = (id) => {
        setNotifications(
            notifications.filter(notification => notification.id !== id)
        );
    };

    // Handle mark all as read
    const markAllAsRead = () => {
        setNotifications(
            notifications.map(notification => ({ ...notification, read: true }))
        );
    };

    // Format timestamp to relative time
    const formatRelativeTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minutes ago`;
        } else if (diffInMinutes < 1440) {
            return `${Math.floor(diffInMinutes / 60)} hours ago`;
        } else {
            return `${Math.floor(diffInMinutes / 1440)} days ago`;
        }
    };

    // Get notification type icon
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'important':
                return <MdWarning className="text-red-500" />;
            case 'deadline':
                return <MdAccessTime className="text-amber-500" />;
            case 'feedback':
                return <MdFeedback className="text-blue-500" />;
            default:
                return <MdNotifications className="text-gray-500" />;
        }
    };

    // Get notification count by type
    const getNotificationCount = (type) => {
        if (type === 'all') return notifications.length;
        if (type === 'unread') return notifications.filter(n => !n.read).length;
        return notifications.filter(n => n.type === type).length;
    };

    // Toggle notification settings
    const toggleNotificationSetting = (setting) => {
        setNotificationSettings({
            ...notificationSettings,
            [setting]: !notificationSettings[setting]
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-6" data-aos="fade-in">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                        <MdNotificationsActive className="text-3xl text-indigo-600 mr-3" />
                        <h1 className="text-2xl font-bold text-gray-800">Notification Hub</h1>
                    </div>

                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <div className="relative">
                            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search notifications..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
                            />
                        </div>

                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                        >
                            <MdSettings className="mr-1" />
                            <span>Settings</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-fit" data-aos="fade-right">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>

                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => setActiveFilter('all')}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeFilter === 'all'
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <MdNotifications className="mr-3" />
                                        <span>All Notifications</span>
                                    </div>
                                    <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full text-xs">
                                        {getNotificationCount('all')}
                                    </span>
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => setActiveFilter('unread')}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeFilter === 'unread'
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <MdNotificationsActive className="mr-3" />
                                        <span>Unread</span>
                                    </div>
                                    <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full text-xs">
                                        {getNotificationCount('unread')}
                                    </span>
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => setActiveFilter('important')}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeFilter === 'important'
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <MdWarning className="mr-3 text-red-500" />
                                        <span>Important Alerts</span>
                                    </div>
                                    <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full text-xs">
                                        {getNotificationCount('important')}
                                    </span>
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => setActiveFilter('deadline')}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeFilter === 'deadline'
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <MdAccessTime className="mr-3 text-amber-500" />
                                        <span>Deadline Reminders</span>
                                    </div>
                                    <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full text-xs">
                                        {getNotificationCount('deadline')}
                                    </span>
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => setActiveFilter('feedback')}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeFilter === 'feedback'
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <MdFeedback className="mr-3 text-blue-500" />
                                        <span>Feedback Notifications</span>
                                    </div>
                                    <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full text-xs">
                                        {getNotificationCount('feedback')}
                                    </span>
                                </button>
                            </li>
                        </ul>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <button
                                onClick={markAllAsRead}
                                className="w-full flex items-center justify-center p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors"
                            >
                                <MdCheck className="mr-2" />
                                Mark all as read
                            </button>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="md:col-span-3">
                        {/* Notification list */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden" data-aos="fade-up">
                            <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {activeFilter === 'all' ? 'All Notifications' :
                                        activeFilter === 'unread' ? 'Unread Notifications' :
                                            activeFilter === 'important' ? 'Important Alerts' :
                                                activeFilter === 'deadline' ? 'Deadline Reminders' :
                                                    'Feedback Notifications'}
                                </h2>

                                <div className="flex items-center">
                                    <button className="p-2 text-gray-500 hover:text-indigo-700 hover:bg-gray-100 rounded-full">
                                        <MdRefresh />
                                    </button>
                                    <button className="p-2 text-gray-500 hover:text-indigo-700 hover:bg-gray-100 rounded-full ml-1">
                                        <MdFilterList />
                                    </button>
                                </div>
                            </div>

                            {filteredNotifications.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {filteredNotifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 md:p-6 transition-colors ${notification.read ? 'bg-white' : 'bg-indigo-50'}`}
                                            data-aos="fade-up"
                                            data-aos-delay={notification.id * 50}
                                        >
                                            <div className="flex items-start">
                                                <div className="mr-4 mt-1">
                                                    {getNotificationIcon(notification.type)}
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center">
                                                        <h3 className={`font-medium ${notification.read ? 'text-gray-800' : 'text-black'}`}>
                                                            {notification.title}
                                                        </h3>
                                                        {!notification.read && (
                                                            <span className="ml-2 h-2 w-2 rounded-full bg-indigo-600"></span>
                                                        )}
                                                    </div>

                                                    <p className="mt-1 text-sm text-gray-600">
                                                        {notification.message}
                                                    </p>

                                                    <div className="mt-2 flex items-center justify-between">
                                                        <span className="text-xs text-gray-500">
                                                            {formatRelativeTime(notification.timestamp)}
                                                        </span>

                                                        <div className="flex">
                                                            {!notification.read && (
                                                                <button
                                                                    onClick={() => markAsRead(notification.id)}
                                                                    className="p-1 text-xs text-indigo-600 hover:text-indigo-800"
                                                                >
                                                                    Mark as read
                                                                </button>
                                                            )}

                                                            <button
                                                                onClick={() => dismissNotification(notification.id)}
                                                                className="p-1 ml-2 text-xs text-gray-500 hover:text-red-600"
                                                            >
                                                                Dismiss
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center" data-aos="fade-in">
                                    <MdNotificationsOff className="mx-auto text-4xl text-gray-400 mb-2" />
                                    <p className="text-gray-500">No notifications found</p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {searchTerm ? 'Try a different search term' : 'All caught up!'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Settings Modal */}
                {showSettings && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" data-aos="fade">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden" data-aos="zoom-in">
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-800">Notification Settings</h2>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-6">
                                <h3 className="font-medium text-gray-800 mb-3">Notification Types</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <MdWarning className="text-red-500 mr-3" />
                                            <span>Important Alerts</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.important}
                                                onChange={() => toggleNotificationSetting('important')}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <MdAccessTime className="text-amber-500 mr-3" />
                                            <span>Deadline Reminders</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.deadline}
                                                onChange={() => toggleNotificationSetting('deadline')}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <MdFeedback className="text-blue-500 mr-3" />
                                            <span>Feedback Notifications</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.feedback}
                                                onChange={() => toggleNotificationSetting('feedback')}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                </div>

                                <h3 className="font-medium text-gray-800 mt-6 mb-3">Delivery Methods</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span>Email Notifications</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.email}
                                                onChange={() => toggleNotificationSetting('email')}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span>Browser Notifications</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.browser}
                                                onChange={() => toggleNotificationSetting('browser')}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span>Sound Alerts</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.sound}
                                                onChange={() => toggleNotificationSetting('sound')}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end">
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 mr-3 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationHub;
