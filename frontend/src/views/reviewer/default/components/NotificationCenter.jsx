import React, { useState, useEffect } from "react";
import {
    MdNotifications,
    MdAccessTime,
    MdFeedback,
    MdSettings,
    MdWarning,
    MdDelete,
    MdRefresh,
    MdMarkAsUnread,
    MdMarkEmailRead,
    MdFilterList,
    MdOutlineNotificationsActive,
    MdLightbulbOutline,
    MdNotificationsNone,
    MdCategory
} from "react-icons/md";
import { useSelector } from "react-redux";

const NotificationCenter = () => {
    // States
    const [activeTab, setActiveTab] = useState("important");
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [notificationSettings, setNotificationSettings] = useState({
        importantAlerts: true,
        deadlineReminders: true,
        feedbackNotifications: true,
        emailNotifications: true,
        smsNotifications: false,
        desktopNotifications: true,
    });

    // Use baseURL from authSlice (as per rules)
    const { baseURL } = useSelector((state) => state.auth);

    // Mock data for notifications with expanded dummy data
    const mockNotifications = {
        important: [
            {
                id: 1,
                title: "Urgent Review Required",
                message: "Proposal #P-2025-042 requires immediate attention",
                timestamp: "2025-04-15T10:30:00",
                read: false,
                priority: "high"
            },
            {
                id: 2,
                title: "Session Timeline Updated",
                message: "The current review session timeline has been modified",
                timestamp: "2025-04-14T15:45:00",
                read: true,
                priority: "medium"
            },
            {
                id: 7,
                title: "Critical System Update",
                message: "The proposal validation system has been updated with new ML model performance improvements",
                timestamp: "2025-04-15T08:15:00",
                read: false,
                priority: "high"
            },
            {
                id: 8,
                title: "Review Process Changed",
                message: "The committee has updated the review criteria for technical proposals",
                timestamp: "2025-04-13T16:20:00",
                read: false,
                priority: "high"
            },
            {
                id: 9,
                title: "Administrative Alert",
                message: "Your reviewer access level has been increased by the administrator",
                timestamp: "2025-04-12T11:05:00",
                read: true,
                priority: "medium"
            },
            {
                id: 10,
                title: "Proposal Classification Alert",
                message: "Several proposals have been reclassified and require your expertise",
                timestamp: "2025-04-11T09:30:00",
                read: true,
                priority: "medium"
            },
            {
                id: 26,
                title: "Conflict of Interest Alert",
                message: "A potential conflict of interest has been detected with Proposal #P-2025-051",
                timestamp: "2025-04-14T13:25:00",
                read: false,
                priority: "high"
            },
            {
                id: 27,
                title: "Proposal Flagged for Expert Review",
                message: "Based on ML analysis, Proposal #P-2025-063 requires specialized technical review",
                timestamp: "2025-04-13T09:50:00",
                read: false,
                priority: "high"
            },
            {
                id: 28,
                title: "Committee Meeting Rescheduled",
                message: "The proposal review committee meeting has been moved to Thursday at 2:00 PM",
                timestamp: "2025-04-12T16:10:00",
                read: true,
                priority: "medium"
            },
            {
                id: 29,
                title: "New Review Guidelines Published",
                message: "Updated standards for technical proposal evaluation are now available",
                timestamp: "2025-04-11T14:20:00",
                read: true,
                priority: "medium"
            },
            {
                id: 30,
                title: "Annual Review Training Required",
                message: "Complete your annual reviewer training by April 30th to maintain your status",
                timestamp: "2025-04-10T11:35:00",
                read: true,
                priority: "low"
            }
        ],
        deadlines: [
            {
                id: 3,
                title: "Review Deadline Approaching",
                message: "You have 3 proposals due for review in 48 hours",
                timestamp: "2025-04-13T09:15:00",
                read: false,
                priority: "high"
            },
            {
                id: 4,
                title: "Session Closing Soon",
                message: "Current review session will close in 5 days",
                timestamp: "2025-04-12T13:20:00",
                read: true,
                priority: "medium"
            },
            {
                id: 11,
                title: "End of Month Reviews Due",
                message: "All assigned proposals must be reviewed by the end of the month",
                timestamp: "2025-04-14T10:45:00",
                read: false,
                priority: "high"
            },
            {
                id: 12,
                title: "Technical Assessment Deadline",
                message: "Technical assessments for Batch #2025-B are due in 3 days",
                timestamp: "2025-04-13T14:30:00",
                read: false,
                priority: "high"
            },
            {
                id: 13,
                title: "Budget Review Meeting",
                message: "Reviewer meeting for budget proposals scheduled for April 20th",
                timestamp: "2025-04-12T08:20:00",
                read: true,
                priority: "medium"
            },
            {
                id: 14,
                title: "Documentation Deadline",
                message: "All review documentation must be completed by Friday",
                timestamp: "2025-04-11T11:15:00",
                read: true,
                priority: "medium"
            },
            {
                id: 15,
                title: "Quarterly Review Summary",
                message: "Prepare your quarterly review summary report by next Monday",
                timestamp: "2025-04-10T16:40:00",
                read: true,
                priority: "low"
            },
            {
                id: 31,
                title: "Final Evaluation Deadline",
                message: "Submit final evaluations for Session #2025-S2 proposals by April 25th",
                timestamp: "2025-04-15T08:30:00",
                read: false,
                priority: "high"
            },
            {
                id: 32,
                title: "Technical Score Due Tomorrow",
                message: "Complete technical scoring for the AI/ML category proposals by tomorrow EOD",
                timestamp: "2025-04-14T16:45:00",
                read: false,
                priority: "high"
            },
            {
                id: 33,
                title: "Budget Review Deadline Extended",
                message: "The deadline for budget reviews has been extended to April 22nd",
                timestamp: "2025-04-13T11:20:00",
                read: true,
                priority: "medium"
            },
            {
                id: 34,
                title: "Review Summary Report Due",
                message: "Complete your review summary reports for this quarter by April 28th",
                timestamp: "2025-04-12T09:40:00",
                read: true,
                priority: "medium"
            },
            {
                id: 35,
                title: "Peer Review Exchange Deadline",
                message: "Complete peer review exchanges for quality control by April 26th",
                timestamp: "2025-04-11T15:10:00",
                read: true,
                priority: "low"
            }
        ],
        feedback: [
            {
                id: 5,
                title: "New Comment on Review",
                message: "Admin commented on your review for Proposal #P-2025-037",
                timestamp: "2025-04-11T11:10:00",
                read: false,
                priority: "medium"
            },
            {
                id: 6,
                title: "Review Approved",
                message: "Your assessment for Proposal #P-2025-031 has been approved",
                timestamp: "2025-04-10T16:30:00",
                read: true,
                priority: "low"
            },
            {
                id: 16,
                title: "Feedback Request from Committee",
                message: "The review committee is requesting additional feedback on your assessment of Proposal #P-2025-045",
                timestamp: "2025-04-14T14:25:00",
                read: false,
                priority: "high"
            },
            {
                id: 17,
                title: "Assessment Questioned",
                message: "Your rating criteria for Proposal #P-2025-039 requires clarification",
                timestamp: "2025-04-13T10:50:00",
                read: false,
                priority: "medium"
            },
            {
                id: 18,
                title: "Positive Feedback Received",
                message: "The committee has commended your thorough review of technical proposals",
                timestamp: "2025-04-12T15:35:00",
                read: true,
                priority: "low"
            },
            {
                id: 19,
                title: "Review Format Suggestion",
                message: "Admin suggests using the new review template for improved consistency",
                timestamp: "2025-04-11T09:20:00",
                read: true,
                priority: "low"
            },
            {
                id: 20,
                title: "Collaboration Request",
                message: "Reviewer Team B would like your input on methodology assessment criteria",
                timestamp: "2025-04-10T13:40:00",
                read: true,
                priority: "medium"
            },
            {
                id: 21,
                title: "ML Model Feedback",
                message: "Your input is requested on the accuracy of ML-generated proposal evaluations",
                timestamp: "2025-04-09T11:15:00",
                read: true,
                priority: "medium"
            },
            {
                id: 36,
                title: "Improvement Suggestions from Admin",
                message: "Admin has provided suggestions to improve your review thoroughness",
                timestamp: "2025-04-15T10:15:00",
                read: false,
                priority: "medium"
            },
            {
                id: 37,
                title: "Score Calibration Required",
                message: "Your scoring pattern shows deviation from committee standards. Training recommended.",
                timestamp: "2025-04-14T13:05:00",
                read: false,
                priority: "high"
            },
            {
                id: 38,
                title: "Positive Recognition from Director",
                message: "The research director has recognized your detailed technical assessments",
                timestamp: "2025-04-13T15:30:00",
                read: false,
                priority: "low"
            },
            {
                id: 39,
                title: "ML Model Performance Feedback",
                message: "Your reviews closely match ML predictions - high consistency rating achieved",
                timestamp: "2025-04-12T11:50:00",
                read: true,
                priority: "low"
            },
            {
                id: 40,
                title: "Documentation Clarity Feedback",
                message: "Please provide more detailed explanations in rejection recommendations",
                timestamp: "2025-04-11T09:25:00",
                read: true,
                priority: "medium"
            }
        ],
        system: [
            {
                id: 22,
                title: "System Maintenance Scheduled",
                message: "The proposal review system will be down for maintenance on Saturday, April 18 from 02:00-04:00",
                timestamp: "2025-04-15T09:00:00",
                read: false,
                priority: "medium"
            },
            {
                id: 23,
                title: "New Feature Available",
                message: "Batch review functionality has been added to your reviewer toolkit",
                timestamp: "2025-04-14T11:30:00",
                read: false,
                priority: "low"
            },
            {
                id: 24,
                title: "Security Update Required",
                message: "Please update your password and enable two-factor authentication",
                timestamp: "2025-04-13T08:45:00",
                read: true,
                priority: "high"
            },
            {
                id: 25,
                title: "Email Verification Needed",
                message: "Please verify your secondary email address for notification delivery",
                timestamp: "2025-04-12T10:20:00",
                read: true,
                priority: "medium"
            },
            {
                id: 41,
                title: "AI Assistant Now Available",
                message: "The new AI-powered review assistant feature is now available to all reviewers",
                timestamp: "2025-04-15T11:10:00",
                read: false,
                priority: "low"
            },
            {
                id: 42,
                title: "Data Migration Scheduled",
                message: "System will be in read-only mode on April 20th for database migration",
                timestamp: "2025-04-14T14:25:00",
                read: false,
                priority: "medium"
            },
            {
                id: 43,
                title: "Mobile App Update Required",
                message: "Please update your reviewer mobile app to version 3.2.1 for security patches",
                timestamp: "2025-04-13T16:40:00",
                read: true,
                priority: "high"
            },
            {
                id: 44,
                title: "New Analytics Dashboard",
                message: "A new personal analytics dashboard has been added to your reviewer account",
                timestamp: "2025-04-12T10:05:00",
                read: true,
                priority: "low"
            },
            {
                id: 45,
                title: "Browser Compatibility Notice",
                message: "For optimal experience, please use Chrome or Firefox with the review system",
                timestamp: "2025-04-11T08:50:00",
                read: true,
                priority: "low"
            }
        ],
        ml_alerts: [
            {
                id: 46,
                title: "Anomaly Detection Alert",
                message: "ML algorithm detected unusual pattern in Proposal #P-2025-071 budget section",
                timestamp: "2025-04-15T09:40:00",
                read: false,
                priority: "high"
            },
            {
                id: 47,
                title: "Similarity Match Detected",
                message: "Proposal #P-2025-058 shows 76% content similarity with previous submissions",
                timestamp: "2025-04-14T11:15:00",
                read: false,
                priority: "high"
            },
            {
                id: 48,
                title: "Format Compliance Issue",
                message: "ML scan detected potential formatting issues in 3 recent submissions",
                timestamp: "2025-04-13T14:30:00",
                read: false,
                priority: "medium"
            },
            {
                id: 49,
                title: "Suggestion: Criteria Mismatch",
                message: "AI suggests reassessment of technical criteria for Biotech proposals",
                timestamp: "2025-04-12T10:25:00",
                read: true,
                priority: "medium"
            },
            {
                id: 50,
                title: "ML Model Training Complete",
                message: "The proposal validation model has been retrained with recent data",
                timestamp: "2025-04-11T15:40:00",
                read: true,
                priority: "low"
            }
        ]
    };

    // Fetch notifications (simulated)
    useEffect(() => {
        // Simulating API call
        setTimeout(() => {
            setNotifications(mockNotifications);
            setIsLoading(false);
        }, 800);

        // In a real application, you would use the baseURL here
        // Example: fetch(`${baseURL}/api/notifications`)
    }, [baseURL]);

    // Handle marking a notification as read
    const handleMarkAsRead = (id) => {
        setNotifications(prev => {
            const newNotifications = { ...prev };
            Object.keys(newNotifications).forEach(key => {
                newNotifications[key] = newNotifications[key].map(notification =>
                    notification.id === id ? { ...notification, read: true } : notification
                );
            });
            return newNotifications;
        });
    };

    // Handle deleting a notification
    const handleDelete = (id) => {
        setNotifications(prev => {
            const newNotifications = { ...prev };
            Object.keys(newNotifications).forEach(key => {
                newNotifications[key] = newNotifications[key].filter(notification => notification.id !== id);
            });
            return newNotifications;
        });
    };

    // Handle marking all as read
    const handleMarkAllAsRead = () => {
        setNotifications(prev => {
            const newNotifications = { ...prev };
            Object.keys(newNotifications).forEach(key => {
                newNotifications[key] = newNotifications[key].map(notification => ({ ...notification, read: true }));
            });
            return newNotifications;
        });
    };

    // Format timestamp to relative time
    const formatRelativeTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return 'just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    };

    // Toggle notification settings
    const toggleSetting = (setting) => {
        setNotificationSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    // Get active notifications
    const activeNotifications = notifications[activeTab] || [];

    // Count unread notifications
    const unreadCount = Object.values(notifications).flat().filter(n => !n.read).length;

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border border-gray-100" data-aos="fade-up">
            {/* Modern gradient header */}
            <div className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white p-5">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-lg mr-3">
                            <MdOutlineNotificationsActive className="text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Notifications</h2>
                            <p className="text-xs text-indigo-100 mt-0.5">Stay updated with the latest information</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleMarkAllAsRead}
                            className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-200"
                            title="Mark all as read"
                        >
                            <MdMarkEmailRead className="text-xl" />
                        </button>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-200"
                            title="Notification settings"
                        >
                            <MdSettings className="text-xl" />
                        </button>
                    </div>
                </div>

                {unreadCount > 0 && (
                    <div className="mt-4 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg inline-flex items-center">
                        <span className="bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full mr-2">
                            {unreadCount}
                        </span>
                        <span className="text-sm">Unread notifications</span>
                    </div>
                )}
            </div>

            {/* Modern Tab Navigation */}
            <div className="flex p-1 bg-gray-50 border-b">
                <button
                    className={`flex items-center px-4 py-3 text-sm font-medium flex-1 rounded-lg transition-all duration-200 ${activeTab === "important"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-gray-600 hover:bg-white/50"
                        }`}
                    onClick={() => setActiveTab("important")}
                >
                    <MdWarning className={`mr-2 ${activeTab === "important" ? "text-amber-500" : ""}`} />
                    Important
                    {notifications.important?.filter(n => !n.read).length > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                            {notifications.important?.filter(n => !n.read).length}
                        </span>
                    )}
                </button>
                <button
                    className={`flex items-center px-4 py-3 text-sm font-medium flex-1 rounded-lg transition-all duration-200 ${activeTab === "deadlines"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-gray-600 hover:bg-white/50"
                        }`}
                    onClick={() => setActiveTab("deadlines")}
                >
                    <MdAccessTime className={`mr-2 ${activeTab === "deadlines" ? "text-blue-500" : ""}`} />
                    Deadlines
                    {notifications.deadlines?.filter(n => !n.read).length > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                            {notifications.deadlines?.filter(n => !n.read).length}
                        </span>
                    )}
                </button>
                <button
                    className={`flex items-center px-4 py-3 text-sm font-medium flex-1 rounded-lg transition-all duration-200 ${activeTab === "feedback"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-gray-600 hover:bg-white/50"
                        }`}
                    onClick={() => setActiveTab("feedback")}
                >
                    <MdFeedback className={`mr-2 ${activeTab === "feedback" ? "text-green-500" : ""}`} />
                    Feedback
                    {notifications.feedback?.filter(n => !n.read).length > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                            {notifications.feedback?.filter(n => !n.read).length}
                        </span>
                    )}
                </button>
            </div>

            {/* Enhanced Settings Panel */}
            {showSettings && (
                <div className="p-5 bg-gray-50 border-b" data-aos="fade-down">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                            <MdCategory className="text-indigo-500 mr-2" />
                            Notification Settings
                        </h3>
                        <div className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                            Personalize your alerts
                        </div>
                    </div>

                    <div className="space-y-4 bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center">
                                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg mr-3">
                                    <MdWarning />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-800">Important Alerts</span>
                                    <p className="text-xs text-gray-500 mt-0.5">Critical system notifications</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={notificationSettings.importantAlerts}
                                    onChange={() => toggleSetting('importantAlerts')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-3">
                                    <MdAccessTime />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-800">Deadline Reminders</span>
                                    <p className="text-xs text-gray-500 mt-0.5">Stay on track with timelines</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={notificationSettings.deadlineReminders}
                                    onChange={() => toggleSetting('deadlineReminders')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg mr-3">
                                    <MdFeedback />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-800">Feedback Notifications</span>
                                    <p className="text-xs text-gray-500 mt-0.5">Comments and responses</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={notificationSettings.feedbackNotifications}
                                    onChange={() => toggleSetting('feedbackNotifications')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div className="pt-3">
                            <h4 className="flex items-center text-xs font-medium text-gray-500 uppercase mb-3">
                                <MdLightbulbOutline className="mr-1" /> Delivery Methods
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                                    <span className="text-sm text-gray-700">Email</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={notificationSettings.emailNotifications}
                                            onChange={() => toggleSetting('emailNotifications')}
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                                    <span className="text-sm text-gray-700">SMS</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={notificationSettings.smsNotifications}
                                            onChange={() => toggleSetting('smsNotifications')}
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                                    <span className="text-sm text-gray-700">Desktop</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={notificationSettings.desktopNotifications}
                                            onChange={() => toggleSetting('desktopNotifications')}
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-3">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-500 text-white text-sm rounded-lg hover:from-indigo-700 hover:to-violet-600 transition-all duration-200 font-medium"
                            >
                                Save Preferences
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Enhanced Notification List */}
            <div className="overflow-y-auto max-h-[400px]">
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-indigo-500 animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MdNotifications className="text-indigo-500 text-lg" />
                            </div>
                        </div>
                    </div>
                ) : activeNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                        <div className="bg-gray-100 p-5 rounded-full mb-4">
                            <MdNotificationsNone className="text-4xl text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-1">No notifications</h3>
                        <p className="text-gray-500 max-w-xs">You're all caught up! There are no notifications in this category right now.</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {activeNotifications.map((notification) => (
                            <li
                                key={notification.id}
                                className={`relative transition-all hover:bg-gray-50 ${!notification.read ? 'bg-indigo-50/70' : ''
                                    }`}
                                data-aos="fade-up"
                                data-aos-delay={notification.id * 50}
                            >
                                <div className="p-5">
                                    {/* Priority badge */}
                                    <div className="flex items-center mb-2">
                                        <div
                                            className={`text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center ${notification.priority === 'high'
                                                ? 'bg-red-100 text-red-700'
                                                : notification.priority === 'medium'
                                                    ? 'bg-amber-100 text-amber-700'
                                                    : 'bg-green-100 text-green-700'
                                                }`}
                                        >
                                            <span className={`h-1.5 w-1.5 rounded-full mr-1 ${notification.priority === 'high'
                                                ? 'bg-red-500'
                                                : notification.priority === 'medium'
                                                    ? 'bg-amber-500'
                                                    : 'bg-green-500'
                                                }`}></span>
                                            {notification.priority === 'high'
                                                ? 'High Priority'
                                                : notification.priority === 'medium'
                                                    ? 'Medium Priority'
                                                    : 'Low Priority'
                                            }
                                        </div>

                                        {!notification.read && (
                                            <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                                                New
                                            </span>
                                        )}

                                        <span className="ml-auto text-xs text-gray-500 flex items-center">
                                            <MdAccessTime className="mr-1" />
                                            {formatRelativeTime(notification.timestamp)}
                                        </span>
                                    </div>

                                    <div className="flex">
                                        {/* Content area */}
                                        <div className="flex-1 pr-10">
                                            <h3 className={`text-base font-semibold ${!notification.read ? 'text-indigo-800' : 'text-gray-800'}`}>
                                                {notification.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600 leading-relaxed">{notification.message}</p>

                                            {/* Action buttons with better styling */}
                                            <div className="mt-3 flex space-x-2">
                                                {!notification.read ? (
                                                    <button
                                                        onClick={() => handleMarkAsRead(notification.id)}
                                                        className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                                                    >
                                                        <MdMarkAsUnread className="mr-1" /> Mark as read
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                                                        disabled
                                                    >
                                                        <MdMarkEmailRead className="mr-1" /> Read
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Delete button */}
                                        <div>
                                            <button
                                                onClick={() => handleDelete(notification.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                title="Delete"
                                            >
                                                <MdDelete className="text-lg" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Enhanced Footer */}
            <div className="border-t py-3 px-5 bg-gray-50 flex justify-between items-center">
                <button
                    onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => setIsLoading(false), 500);
                    }}
                    className="flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:border-indigo-200 hover:shadow-sm"
                >
                    <MdRefresh className="mr-1.5" /> Refresh
                </button>

                <div className="flex items-center">
                    <button className="mr-2 p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <MdFilterList />
                    </button>
                    <span className="text-xs bg-white px-2 py-1 rounded-md border border-gray-200 text-gray-600">
                        Last updated: just now
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NotificationCenter;
