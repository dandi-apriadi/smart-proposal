import React, { useState, useEffect } from "react";
import {
    MdOutlineNotifications,
    MdSettings,
    MdHistory,
    MdEmail,
    MdPhoneAndroid,
    MdCheck,
    MdDelete,
    MdFilterList,
    MdMoreVert,
    MdInfo,
    MdWarning,
    MdCheckCircle,
    MdError,
    MdSearch,
    MdRefresh,
    MdArchive,
    MdMarkEmailRead,
} from "react-icons/md";
import Card from "components/card";
import Checkbox from "components/checkbox";
import Switch from "components/switch";
import { format } from "date-fns";

// Create simple Tab component to avoid Material Tailwind dependencies
const SimpleTab = ({ active, onClick, icon, children }) => (
    <button
        onClick={onClick}
        className={`py-2 px-4 text-sm font-medium flex items-center gap-2 ${active
            ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
    >
        {icon}
        {children}
    </button>
);

const NotificationCenter = () => {
    // State management
    const [activeTab, setActiveTab] = useState("message-center");
    const [notifications, setNotifications] = useState([]);
    const [selectedNotifications, setSelectedNotifications] = useState([]);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // Mock data for notifications
    useEffect(() => {
        // This would normally be an API call
        setIsLoading(true);
        setTimeout(() => {
            const mockNotifications = [
                {
                    id: 1,
                    title: "New proposal submitted",
                    message: "Dr. Ahmad has submitted a new proposal for review",
                    type: "info",
                    isRead: false,
                    date: new Date(2025, 3, 15, 9, 30),
                    sender: "system",
                },
                {
                    id: 2,
                    title: "Session deadline approaching",
                    message: "The current session will close in 3 days",
                    type: "warning",
                    isRead: true,
                    date: new Date(2025, 3, 14, 15, 45),
                    sender: "system",
                },
                {
                    id: 3,
                    title: "System update completed",
                    message: "The system has been updated to version 2.5.0",
                    type: "success",
                    isRead: false,
                    date: new Date(2025, 3, 14, 10, 0),
                    sender: "admin",
                },
                {
                    id: 4,
                    title: "Error in proposal validation",
                    message: "The ML model failed to validate proposal #2345",
                    type: "error",
                    isRead: false,
                    date: new Date(2025, 3, 13, 14, 20),
                    sender: "system",
                },
                {
                    id: 5,
                    title: "New user registered",
                    message: "Dr. Sarah Johnson has registered as a reviewer",
                    type: "info",
                    isRead: true,
                    date: new Date(2025, 3, 13, 9, 15),
                    sender: "system",
                },
                {
                    id: 6,
                    title: "Training model completed",
                    message: "The Random Forest model has completed training with 95% accuracy",
                    type: "success",
                    isRead: true,
                    date: new Date(2025, 3, 12, 16, 45),
                    sender: "system",
                },
                {
                    id: 7,
                    title: "Session review started",
                    message: "The review phase for Session 2025-1 has officially started",
                    type: "info",
                    isRead: false,
                    date: new Date(2025, 3, 12, 8, 0),
                    sender: "admin",
                },
            ];
            setNotifications(mockNotifications);
            setIsLoading(false);
        }, 800);
    }, []);

    // Filter notifications based on current filter and search
    const filteredNotifications = notifications.filter((notification) => {
        const matchesFilter = filter === "all" ||
            (filter === "unread" && !notification.isRead) ||
            (filter === notification.type);

        const matchesSearch = notification.title.toLowerCase().includes(search.toLowerCase()) ||
            notification.message.toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    // Toggle notification selection
    const toggleNotificationSelection = (id) => {
        if (selectedNotifications.includes(id)) {
            setSelectedNotifications(selectedNotifications.filter((notifId) => notifId !== id));
        } else {
            setSelectedNotifications([...selectedNotifications, id]);
        }
    };

    // Select all displayed notifications
    const selectAllNotifications = () => {
        if (selectedNotifications.length === filteredNotifications.length) {
            setSelectedNotifications([]);
        } else {
            setSelectedNotifications(filteredNotifications.map((notif) => notif.id));
        }
    };

    // Mark notifications as read
    const markAsRead = (ids) => {
        setNotifications(
            notifications.map((notif) => {
                if (ids.includes(notif.id)) {
                    return { ...notif, isRead: true };
                }
                return notif;
            })
        );
        setSelectedNotifications([]);
    };

    // Delete notifications
    const deleteNotifications = (ids) => {
        setNotifications(
            notifications.filter((notif) => !ids.includes(notif.id))
        );
        setSelectedNotifications([]);
    };

    // Stats for the dashboard
    const stats = {
        total: notifications.length,
        unread: notifications.filter(n => !n.isRead).length,
        info: notifications.filter(n => n.type === "info").length,
        warning: notifications.filter(n => n.type === "warning").length,
        error: notifications.filter(n => n.type === "error").length,
        success: notifications.filter(n => n.type === "success").length,
    };

    // Notification type icon mapping
    const getTypeIcon = (type) => {
        switch (type) {
            case "info":
                return <MdInfo className="text-blue-500" />;
            case "warning":
                return <MdWarning className="text-yellow-500" />;
            case "error":
                return <MdError className="text-red-500" />;
            case "success":
                return <MdCheckCircle className="text-green-500" />;
            default:
                return <MdOutlineNotifications className="text-gray-500" />;
        }
    };

    // Mock notification settings
    const notificationSettings = [
        { id: 1, name: "Email Notifications", enabled: true, description: "Receive notifications via email" },
        { id: 2, name: "SMS Notifications", enabled: false, description: "Receive notifications via SMS" },
        { id: 3, name: "Browser Notifications", enabled: true, description: "Receive notifications in your browser" },
        { id: 4, name: "Proposal Submissions", enabled: true, description: "Get notified when new proposals are submitted" },
        { id: 5, name: "Review Deadlines", enabled: true, description: "Get reminders about review deadlines" },
        { id: 6, name: "System Updates", enabled: false, description: "Get notified about system updates and maintenance" },
        { id: 7, name: "User Registrations", enabled: true, description: "Get notified when new users register" },
        { id: 8, name: "Daily Digest", enabled: false, description: "Receive a daily summary of all notifications" },
    ];

    // Render different content based on active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case "message-center":
                return (
                    <div className="flex flex-col">
                        {/* Search and filters */}
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={selectAllNotifications}
                                    className={`rounded-md p-2 ${selectedNotifications.length > 0 ? "bg-gray-200 dark:bg-navy-800" : "bg-gray-100 dark:bg-navy-900"
                                        }`}
                                    title="Select/Deselect All"
                                >
                                    <Checkbox
                                        checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                                        indeterminate={selectedNotifications.length > 0 && selectedNotifications.length < filteredNotifications.length}
                                        onChange={selectAllNotifications}
                                    />
                                </button>

                                {selectedNotifications.length > 0 && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => markAsRead(selectedNotifications)}
                                            className="flex items-center gap-1 rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
                                        >
                                            <MdMarkEmailRead className="h-4 w-4" />
                                            Mark as Read
                                        </button>
                                        <button
                                            onClick={() => deleteNotifications(selectedNotifications)}
                                            className="flex items-center gap-1 rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                                        >
                                            <MdDelete className="h-4 w-4" />
                                            Delete
                                        </button>
                                    </div>
                                )}

                                <div className="relative">
                                    <button
                                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                                        className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700"
                                    >
                                        <MdFilterList className="h-4 w-4" />
                                        Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </button>

                                    {showFilterMenu && (
                                        <div className="absolute left-0 top-full z-10 mt-1 rounded-md bg-white shadow-lg dark:bg-navy-800">
                                            <div className="py-1">
                                                <button
                                                    onClick={() => {
                                                        setFilter("all");
                                                        setShowFilterMenu(false);
                                                    }}
                                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-navy-700"
                                                >
                                                    All
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setFilter("unread");
                                                        setShowFilterMenu(false);
                                                    }}
                                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-navy-700"
                                                >
                                                    Unread
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setFilter("info");
                                                        setShowFilterMenu(false);
                                                    }}
                                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-navy-700"
                                                >
                                                    Info
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setFilter("warning");
                                                        setShowFilterMenu(false);
                                                    }}
                                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-navy-700"
                                                >
                                                    Warning
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setFilter("error");
                                                        setShowFilterMenu(false);
                                                    }}
                                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-navy-700"
                                                >
                                                    Error
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setFilter("success");
                                                        setShowFilterMenu(false);
                                                    }}
                                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-navy-700"
                                                >
                                                    Success
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => {
                                        setIsLoading(true);
                                        setTimeout(() => setIsLoading(false), 800);
                                    }}
                                    className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700"
                                >
                                    <MdRefresh className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                                    Refresh
                                </button>
                            </div>

                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MdSearch className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    placeholder="Search notifications..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Notifications list */}
                        <div className="space-y-3">
                            {isLoading ? (
                                <div className="flex h-64 items-center justify-center">
                                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
                                    <span className="ml-2 text-gray-500 dark:text-gray-400">Loading notifications...</span>
                                </div>
                            ) : filteredNotifications.length === 0 ? (
                                <div className="flex h-64 flex-col items-center justify-center">
                                    <MdOutlineNotifications className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                                    <p className="mt-4 text-gray-500 dark:text-gray-400">No notifications found</p>
                                </div>
                            ) : (
                                filteredNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`flex items-start rounded-lg border p-4 transition duration-300 hover:bg-gray-50 dark:border-navy-700 dark:hover:bg-navy-800 ${!notification.isRead ? "border-l-4 border-l-blue-500 bg-blue-50 dark:bg-navy-900" : ""
                                            } ${selectedNotifications.includes(notification.id) ? "bg-blue-50 dark:bg-navy-900" : ""}`}
                                    >
                                        <div className="mr-4 flex-shrink-0">
                                            <Checkbox
                                                checked={selectedNotifications.includes(notification.id)}
                                                onChange={() => toggleNotificationSelection(notification.id)}
                                            />
                                        </div>
                                        <div className="mr-3 flex flex-shrink-0 items-center justify-center">
                                            {getTypeIcon(notification.type)}
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-start justify-between">
                                                <h3 className={`text-sm font-medium ${!notification.isRead ? "font-bold" : ""}`}>
                                                    {notification.title}
                                                </h3>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {format(notification.date, "MMM d, yyyy 'at' h:mm a")}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-navy-700 dark:text-gray-300">
                                                    {notification.sender}
                                                </span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => markAsRead([notification.id])}
                                                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                    >
                                                        {notification.isRead ? "Mark as unread" : "Mark as read"}
                                                    </button>
                                                    <button
                                                        onClick={() => deleteNotifications([notification.id])}
                                                        className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );
            case "notification-settings":
                return (
                    <div>
                        <div className="mb-6">
                            <h2 className="mb-2 text-xl font-bold text-navy-700 dark:text-white">Notification Preferences</h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Configure how and when you receive notifications
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-lg border dark:border-navy-700">
                                <div className="border-b bg-gray-50 px-4 py-3 dark:border-navy-700 dark:bg-navy-800">
                                    <h3 className="text-lg font-medium text-navy-700 dark:text-white">Notification Channels</h3>
                                </div>
                                <div className="divide-y dark:divide-navy-700">
                                    {notificationSettings.slice(0, 3).map((setting) => (
                                        <div key={setting.id} className="flex items-center justify-between px-4 py-3">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{setting.name}</h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
                                            </div>
                                            <Switch checked={setting.enabled} onChange={() => { }} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-lg border dark:border-navy-700">
                                <div className="border-b bg-gray-50 px-4 py-3 dark:border-navy-700 dark:bg-navy-800">
                                    <h3 className="text-lg font-medium text-navy-700 dark:text-white">Notification Types</h3>
                                </div>
                                <div className="divide-y dark:divide-navy-700">
                                    {notificationSettings.slice(3).map((setting) => (
                                        <div key={setting.id} className="flex items-center justify-between px-4 py-3">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{setting.name}</h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
                                            </div>
                                            <Switch checked={setting.enabled} onChange={() => { }} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                                    Save Preferences
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case "notification-history":
                return (
                    <div>
                        <div className="mb-6">
                            <h2 className="mb-2 text-xl font-bold text-navy-700 dark:text-white">Notification History</h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                View a complete history of all notifications sent through the system
                            </p>
                        </div>

                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MdSearch className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                        placeholder="Search history..."
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range:</label>
                                    <select className="rounded-md border border-gray-300 bg-white py-1 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white">
                                        <option>Today</option>
                                        <option>Last 7 days</option>
                                        <option>Last 30 days</option>
                                        <option>This year</option>
                                        <option>Custom range</option>
                                    </select>
                                </div>
                            </div>

                            <button className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700">
                                <MdArchive className="h-4 w-4" />
                                Archive All
                            </button>
                        </div>

                        <div className="overflow-hidden rounded-lg border dark:border-navy-700">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
                                <thead className="bg-gray-50 dark:bg-navy-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Recipients</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-navy-700 dark:bg-navy-900">
                                    {notifications.map((notification) => (
                                        <tr key={notification.id} className="hover:bg-gray-50 dark:hover:bg-navy-800">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {format(notification.date, "MMM d, yyyy 'at' h:mm a")}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className="flex items-center">
                                                    {getTypeIcon(notification.type)}
                                                    <span className="ml-1 text-sm capitalize text-gray-900 dark:text-white">{notification.type}</span>
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                {notification.title}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${notification.isRead
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                                        }`}
                                                >
                                                    {notification.isRead ? "Read" : "Unread"}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                All Admins
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <button className="mr-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                                    View
                                                </button>
                                                <button className="mr-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">{notifications.length}</span> of{" "}
                                <span className="font-medium">{notifications.length}</span> results
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700">
                                    Previous
                                </button>
                                <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case "email-sms":
                return (
                    <div>
                        <div className="mb-6">
                            <h2 className="mb-2 text-xl font-bold text-navy-700 dark:text-white">Email/SMS Integration</h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Configure external notification delivery settings
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Email Configuration */}
                            <div className="rounded-lg border dark:border-navy-700">
                                <div className="border-b bg-gray-50 px-4 py-3 dark:border-navy-700 dark:bg-navy-800">
                                    <h3 className="text-lg font-medium text-navy-700 dark:text-white">Email Configuration</h3>
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMTP Server</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white"
                                                placeholder="smtp.example.com"
                                                value="smtp.gmail.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMTP Port</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white"
                                                placeholder="587"
                                                value="587"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Username</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white"
                                                placeholder="username@example.com"
                                                value="notifications@polimdo.ac.id"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Password</label>
                                            <input
                                                type="password"
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white"
                                                placeholder="********"
                                                value="********"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Default Sender Name
                                            </label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white"
                                                placeholder="System Notifications"
                                                value="Politeknik Negeri Manado"
                                            />
                                        </div>
                                        <div className="flex items-center md:col-span-2">
                                            <Switch checked={true} onChange={() => { }} />
                                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Enable Email Notifications</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                                            Save Email Settings
                                        </button>
                                        <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-navy-700 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700">
                                            Test Connection
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* SMS Configuration */}
                            <div className="rounded-lg border dark:border-navy-700">
                                <div className="border-b bg-gray-50 px-4 py-3 dark:border-navy-700 dark:bg-navy-800">
                                    <h3 className="text-lg font-medium text-navy-700 dark:text-white">SMS Configuration</h3>
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMS Provider</label>
                                            <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white">
                                                <option>Twilio</option>
                                                <option>Nexmo</option>
                                                <option>AWS SNS</option>
                                                <option>Custom API</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">API Key</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white"
                                                placeholder="Enter API key"
                                                value="sk_*************"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">API Secret</label>
                                            <input
                                                type="password"
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white"
                                                placeholder="Enter API secret"
                                                value="********"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sender ID/Phone</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white"
                                                placeholder="+1234567890"
                                                value="+628123456789"
                                            />
                                        </div>
                                        <div className="flex items-center md:col-span-2">
                                            <Switch checked={false} onChange={() => { }} />
                                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Enable SMS Notifications</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                                            Save SMS Settings
                                        </button>
                                        <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-navy-700 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700">
                                            Test SMS
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Notification Templates */}
                            <div className="rounded-lg border dark:border-navy-700">
                                <div className="border-b bg-gray-50 px-4 py-3 dark:border-navy-700 dark:bg-navy-800">
                                    <h3 className="text-lg font-medium text-navy-700 dark:text-white">Notification Templates</h3>
                                </div>
                                <div className="p-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Template Type</label>
                                        <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white">
                                            <option>New Proposal Submission</option>
                                            <option>Review Reminder</option>
                                            <option>Deadline Approaching</option>
                                            <option>Proposal Approved</option>
                                            <option>Proposal Rejected</option>
                                            <option>Progress Report Due</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Subject</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white"
                                            placeholder="Enter email subject"
                                            value="New Proposal Submission Notification"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Template</label>
                                        <textarea
                                            rows={6}
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white"
                                            placeholder="Enter email template content"
                                            value={`Dear {{recipientName}},

A new proposal titled "{{proposalTitle}}" has been submitted by {{submitterName}} on {{submissionDate}}.

You can review the proposal by clicking the link below:
{{proposalLink}}

Best regards,
Politeknik Negeri Manado Research Team`}
                                        ></textarea>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMS Template</label>
                                        <textarea
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white"
                                            placeholder="Enter SMS template content"
                                            value={`New proposal "{{proposalTitle}}" submitted by {{submitterName}}. Review at: {{shortLink}}`}
                                        ></textarea>
                                    </div>

                                    <div>
                                        <button className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                                            Save Template
                                        </button>
                                        <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-navy-700 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700">
                                            Preview
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="mt-3 grid grid-cols-1 gap-5">
            {/* Header with stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="flex items-center p-5 bg-white dark:bg-navy-700">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center justify-center rounded-full bg-brand-500 text-white dark:bg-white dark:text-navy-700">
                            <MdOutlineNotifications className="h-6 w-6" />
                        </span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600 dark:text-white">Total</p>
                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">{stats.total}</h3>
                    </div>
                </Card>

                <Card className="flex items-center p-5 bg-white dark:bg-navy-700">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center justify-center rounded-full bg-red-500 text-white">
                            <MdEmail className="h-6 w-6" />
                        </span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600 dark:text-white">Unread</p>
                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">{stats.unread}</h3>
                    </div>
                </Card>

                <Card className="flex items-center p-5 bg-white dark:bg-navy-700">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center justify-center rounded-full bg-blue-500 text-white">
                            <MdInfo className="h-6 w-6" />
                        </span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600 dark:text-white">Info</p>
                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">{stats.info}</h3>
                    </div>
                </Card>

                <Card className="flex items-center p-5 bg-white dark:bg-navy-700">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center justify-center rounded-full bg-yellow-500 text-white">
                            <MdWarning className="h-6 w-6" />
                        </span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600 dark:text-white">Warnings</p>
                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">{stats.warning}</h3>
                    </div>
                </Card>

                <Card className="flex items-center p-5 bg-white dark:bg-navy-700">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center justify-center rounded-full bg-green-500 text-white">
                            <MdCheckCircle className="h-6 w-6" />
                        </span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600 dark:text-white">Success</p>
                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">{stats.success}</h3>
                    </div>
                </Card>
            </div>

            {/* Custom Tabs Component */}
            <Card extra={"w-full h-full p-4"}>
                {/* Tab Navigation */}
                <div className="flex flex-wrap border-b border-gray-200 dark:border-navy-700">
                    <SimpleTab
                        active={activeTab === "message-center"}
                        onClick={() => setActiveTab("message-center")}
                        icon={<MdOutlineNotifications className="h-5 w-5" />}
                    >
                        Message Center
                    </SimpleTab>
                    <SimpleTab
                        active={activeTab === "notification-settings"}
                        onClick={() => setActiveTab("notification-settings")}
                        icon={<MdSettings className="h-5 w-5" />}
                    >
                        Notification Settings
                    </SimpleTab>
                    <SimpleTab
                        active={activeTab === "notification-history"}
                        onClick={() => setActiveTab("notification-history")}
                        icon={<MdHistory className="h-5 w-5" />}
                    >
                        Notification History
                    </SimpleTab>
                    <SimpleTab
                        active={activeTab === "email-sms"}
                        onClick={() => setActiveTab("email-sms")}
                        icon={<MdEmail className="h-5 w-5" />}
                    >
                        Email/SMS Integration
                    </SimpleTab>
                </div>

                {/* Tab Content */}
                <div className="mt-4">
                    {renderTabContent()}
                </div>
            </Card>
        </div>
    );
};

export default NotificationCenter;
