import React, { useState, useEffect } from "react";
import {
    MdNotifications,
    MdAccessTime,
    MdDoneAll,
    MdDelete,
    MdWarning,
    MdCalendarToday,
    MdFeedback,
    MdSettings,
    MdFilterList,
    MdRefresh,
    MdCheck,
    MdClose,
    MdInfo,
    MdErrorOutline,
    MdClear,
    MdKeyboardArrowDown,
    MdOutlineNotificationsActive,
    MdHourglassEmpty,
} from "react-icons/md";
import Card from "components/card";
import Switch from "components/switch";

const NotificationCenter = () => {
    // Notification Categories
    const categories = [
        { id: "all", name: "All Notifications" },
        { id: "important", name: "Important Alerts", icon: <MdWarning /> },
        { id: "deadline", name: "Deadline Reminders", icon: <MdAccessTime /> },
        { id: "feedback", name: "Feedback", icon: <MdFeedback /> },
        { id: "system", name: "System Updates", icon: <MdInfo /> },
    ];

    // Filter States
    const [activeCategory, setActiveCategory] = useState("all");
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Dummy Notification Data
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "important",
            title: "Proposal Format Warning",
            message: "Your proposal 'AI-Based Learning Model' has formatting issues that need to be addressed.",
            timestamp: "2 hours ago",
            isRead: false,
            actionRequired: true,
            actionType: "review",
            actionUrl: "/dosen/proposals/edit/123",
        },
        {
            id: 2,
            type: "deadline",
            title: "Submission Deadline Approaching",
            message: "The deadline for your progress report is in 3 days. Please complete your submission.",
            timestamp: "5 hours ago",
            isRead: false,
            actionRequired: true,
            actionType: "submit",
            actionUrl: "/dosen/progress-reporting",
            dueDate: "May 28, 2025",
        },
        {
            id: 3,
            type: "feedback",
            title: "Feedback Received",
            message: "Your proposal 'Machine Learning for Healthcare' has received feedback from the reviewer.",
            timestamp: "Yesterday",
            isRead: true,
            actionRequired: false,
            actionUrl: "/dosen/proposals/feedback/456",
        },
        {
            id: 4,
            type: "system",
            title: "System Maintenance",
            message: "The system will be down for maintenance on May 30, 2025 from 2:00 AM to 4:00 AM.",
            timestamp: "2 days ago",
            isRead: true,
            actionRequired: false,
        },
        {
            id: 5,
            type: "deadline",
            title: "Session Closing Soon",
            message: "The current proposal submission session will close in 7 days. Ensure all your documents are submitted.",
            timestamp: "3 days ago",
            isRead: false,
            actionRequired: true,
            actionType: "review",
            actionUrl: "/dosen/proposals",
            dueDate: "June 1, 2025",
        },
        {
            id: 6,
            type: "feedback",
            title: "Review Completed",
            message: "The eligibility review for your proposal 'Data Mining Techniques' has been completed.",
            timestamp: "4 days ago",
            isRead: true,
            actionRequired: false,
            actionUrl: "/dosen/proposals/view/789",
        },
        {
            id: 7,
            type: "important",
            title: "Action Required: Document Missing",
            message: "Your proposal is missing the required budget attachment. Please upload it as soon as possible.",
            timestamp: "5 days ago",
            isRead: false,
            actionRequired: true,
            actionType: "upload",
            actionUrl: "/dosen/proposals/edit/321",
        },
    ]);

    // Notification Settings
    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        importantAlerts: true,
        deadlineReminders: true,
        feedbackNotifications: true,
        systemUpdates: false,
        reminderFrequency: "daily", // daily, weekly, asNeeded
        advanceDeadlineReminder: 3, // days
    });

    // Handle mark as read
    const handleMarkAsRead = (id) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === id
                    ? { ...notification, isRead: true }
                    : notification
            )
        );
    };

    // Handle delete notification
    const handleDeleteNotification = (id) => {
        setNotifications(
            notifications.filter((notification) => notification.id !== id)
        );
    };

    // Handle mark all as read
    const handleMarkAllAsRead = () => {
        setNotifications(
            notifications.map((notification) => ({ ...notification, isRead: true }))
        );
    };

    // Handle Settings Change
    const handleSettingChange = (setting, value) => {
        setNotificationSettings({
            ...notificationSettings,
            [setting]: value,
        });
    };

    // Filter notifications based on active category and read status
    const filteredNotifications = notifications.filter((notification) => {
        if (showUnreadOnly && notification.isRead) {
            return false;
        }

        if (activeCategory === "all") {
            return true;
        }

        return notification.type === activeCategory;
    });

    // Count unread notifications
    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    // Get Icon by notification type
    const getNotificationIcon = (type) => {
        switch (type) {
            case "important":
                return <MdWarning className="text-red-500" />;
            case "deadline":
                return <MdAccessTime className="text-orange-500" />;
            case "feedback":
                return <MdFeedback className="text-blue-500" />;
            case "system":
                return <MdInfo className="text-purple-500" />;
            default:
                return <MdNotifications className="text-gray-500" />;
        }
    };

    return (
        <Card extra="w-full h-full p-4" data-aos="fade-up">
            <div className="mb-4 flex flex-wrap items-center justify-between">
                <div className="flex items-center">
                    <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                        Notification Center
                    </h4>
                    {unreadCount > 0 && (
                        <div className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                            {unreadCount}
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                        className={`flex items-center rounded-md px-2 py-1 text-xs ${showUnreadOnly
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-700 dark:bg-navy-700 dark:text-gray-300"
                            }`}
                    >
                        <MdDoneAll className="mr-1" />
                        {showUnreadOnly ? "Unread Only" : "Show All"}
                    </button>
                    <button
                        onClick={handleMarkAllAsRead}
                        className="flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-navy-700 dark:text-gray-300"
                    >
                        <MdCheck className="mr-1" />
                        Mark All Read
                    </button>
                    <button
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className="flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-navy-700 dark:text-gray-300"
                    >
                        <MdSettings className="mr-1" />
                        Settings
                    </button>
                </div>
            </div>

            {/* Filter Categories */}
            <div className="mb-4 flex flex-wrap gap-2" data-aos="fade-up" data-aos-delay="100">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${activeCategory === category.id
                                ? "bg-blue-500 text-white shadow-sm"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-navy-700 dark:text-gray-300 dark:hover:bg-navy-600"
                            }`}
                    >
                        {category.icon && <span className="mr-1">{category.icon}</span>}
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Settings Panel */}
            {isSettingsOpen && (
                <div
                    className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-navy-600 dark:bg-navy-800"
                    data-aos="fade-down"
                >
                    <div className="mb-3 flex items-center justify-between">
                        <h5 className="font-medium text-navy-700 dark:text-white">
                            Notification Settings
                        </h5>
                        <button onClick={() => setIsSettingsOpen(false)}>
                            <MdClose className="text-gray-500" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-navy-700">
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white">
                                    Email Notifications
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Receive notifications via email
                                </p>
                            </div>
                            <Switch
                                checked={notificationSettings.emailNotifications}
                                onChange={(e) =>
                                    handleSettingChange("emailNotifications", e.target.checked)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-navy-700">
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white">
                                    Push Notifications
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Receive notifications in browser
                                </p>
                            </div>
                            <Switch
                                checked={notificationSettings.pushNotifications}
                                onChange={(e) =>
                                    handleSettingChange("pushNotifications", e.target.checked)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-navy-700">
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white">
                                    Important Alerts
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Critical updates requiring attention
                                </p>
                            </div>
                            <Switch
                                checked={notificationSettings.importantAlerts}
                                onChange={(e) =>
                                    handleSettingChange("importantAlerts", e.target.checked)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-navy-700">
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white">
                                    Deadline Reminders
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Notifications for approaching deadlines
                                </p>
                            </div>
                            <Switch
                                checked={notificationSettings.deadlineReminders}
                                onChange={(e) =>
                                    handleSettingChange("deadlineReminders", e.target.checked)
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-navy-700">
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white">
                                    Reminder Frequency
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    How often to send reminders
                                </p>
                            </div>
                            <select
                                className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm dark:border-navy-700 dark:bg-navy-900"
                                value={notificationSettings.reminderFrequency}
                                onChange={(e) =>
                                    handleSettingChange("reminderFrequency", e.target.value)
                                }
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="asNeeded">As Needed</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-navy-700">
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white">
                                    Advance Reminder
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Days before deadline to remind
                                </p>
                            </div>
                            <select
                                className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm dark:border-navy-700 dark:bg-navy-900"
                                value={notificationSettings.advanceDeadlineReminder}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "advanceDeadlineReminder",
                                        parseInt(e.target.value)
                                    )
                                }
                            >
                                <option value="1">1 Day</option>
                                <option value="3">3 Days</option>
                                <option value="7">1 Week</option>
                                <option value="14">2 Weeks</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {filteredNotifications.length === 0 && (
                <div
                    className="flex flex-col items-center justify-center rounded-lg bg-gray-50 py-10 dark:bg-navy-900"
                    data-aos="fade-up"
                    data-aos-delay="150"
                >
                    <MdHourglassEmpty className="mb-3 text-5xl text-gray-400" />
                    <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        No notifications found
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {showUnreadOnly
                            ? "You've read all notifications in this category."
                            : "There are no notifications in this category."}
                    </p>
                    {showUnreadOnly && (
                        <button
                            onClick={() => setShowUnreadOnly(false)}
                            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                        >
                            Show All Notifications
                        </button>
                    )}
                </div>
            )}

            {/* Notification List */}
            <div className="space-y-3" data-aos="fade-up" data-aos-delay="150">
                {filteredNotifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`relative rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-navy-700 dark:bg-navy-800 ${!notification.isRead
                                ? "border-l-4 border-l-blue-500"
                                : ""
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                                <div className="mt-0.5 rounded-full bg-gray-100 p-2 dark:bg-navy-700">
                                    {getNotificationIcon(notification.type)}
                                </div>
                                <div>
                                    <h6 className="font-medium text-navy-700 dark:text-white">
                                        {notification.title}
                                    </h6>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        {notification.message}
                                    </p>
                                    <div className="mt-2 flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400">
                                        <span className="mr-3 flex items-center">
                                            <MdAccessTime className="mr-1" />
                                            {notification.timestamp}
                                        </span>
                                        {notification.dueDate && (
                                            <span className="mr-3 flex items-center">
                                                <MdCalendarToday className="mr-1" />
                                                Due: {notification.dueDate}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start space-x-1">
                                {!notification.isRead && (
                                    <button
                                        onClick={() => handleMarkAsRead(notification.id)}
                                        className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-navy-700"
                                        title="Mark as read"
                                    >
                                        <MdDoneAll />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteNotification(notification.id)}
                                    className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-navy-700"
                                    title="Delete notification"
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>

                        {notification.actionRequired && (
                            <div className="mt-3 flex">
                                <a
                                    href={notification.actionUrl}
                                    className="rounded-md bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-600"
                                >
                                    {notification.actionType === "review"
                                        ? "Review Now"
                                        : notification.actionType === "submit"
                                            ? "Submit Now"
                                            : notification.actionType === "upload"
                                                ? "Upload Document"
                                                : "View Details"}
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Load More / Pagination */}
            {filteredNotifications.length > 0 && (
                <div className="mt-4 flex justify-center">
                    <button className="flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-navy-700 dark:text-gray-300 dark:hover:bg-navy-600">
                        <MdRefresh className="mr-2" />
                        Load More
                    </button>
                </div>
            )}
        </Card>
    );
};

export default NotificationCenter;
