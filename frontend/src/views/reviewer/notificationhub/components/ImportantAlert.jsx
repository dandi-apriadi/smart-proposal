import React, { useState, useEffect } from "react";
import { MdNotificationsActive, MdWarning, MdCheck, MdDelete, MdFilterList, MdRefresh, MdCheckCircle } from "react-icons/md";

const ImportantAlert = () => {
    const [alerts, setAlerts] = useState([]);
    const [filteredAlerts, setFilteredAlerts] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [isLoading, setIsLoading] = useState(true);

    // Mock data for alerts
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const mockAlerts = [
                {
                    id: 1,
                    title: "Urgent: Review Deadline Approaching",
                    message: "You have 3 proposals waiting for review that are due within 48 hours.",
                    type: "urgent",
                    timestamp: "2025-04-22T10:30:00",
                    isRead: false,
                },
                {
                    id: 2,
                    title: "Session Timeline Updated",
                    message: "The current session timeline has been modified. Final review deadline extended by 5 days.",
                    type: "important",
                    timestamp: "2025-04-21T14:20:00",
                    isRead: false,
                },
                {
                    id: 3,
                    title: "New Proposal Assigned",
                    message: "You have been assigned to review proposal ID: PRO-2025-042 by Admin.",
                    type: "assignment",
                    timestamp: "2025-04-20T09:15:00",
                    isRead: true,
                },
                {
                    id: 4,
                    title: "Review Template Updated",
                    message: "The review rubric template has been updated with new assessment criteria.",
                    type: "important",
                    timestamp: "2025-04-19T16:45:00",
                    isRead: true,
                },
                {
                    id: 5,
                    title: "System Maintenance Notice",
                    message: "The system will undergo maintenance on April 25th, 2025 from 22:00 to 23:00 GMT+7.",
                    type: "system",
                    timestamp: "2025-04-18T11:30:00",
                    isRead: true,
                },
            ];
            setAlerts(mockAlerts);
            setFilteredAlerts(mockAlerts);
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (filterType === "all") {
            setFilteredAlerts(alerts);
        } else if (filterType === "unread") {
            setFilteredAlerts(alerts.filter(alert => !alert.isRead));
        } else {
            setFilteredAlerts(alerts.filter(alert => alert.type === filterType));
        }
    }, [filterType, alerts]);

    const markAsRead = (id) => {
        setAlerts(prevAlerts =>
            prevAlerts.map(alert =>
                alert.id === id ? { ...alert, isRead: true } : alert
            )
        );
    };

    const deleteAlert = (id) => {
        setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
    };

    const markAllAsRead = () => {
        setAlerts(prevAlerts =>
            prevAlerts.map(alert => ({ ...alert, isRead: true }))
        );
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case "urgent":
                return <MdWarning className="text-red-500" />;
            case "important":
                return <MdNotificationsActive className="text-amber-500" />;
            case "assignment":
                return <MdCheck className="text-green-500" />;
            case "system":
                return <MdRefresh className="text-blue-500" />;
            default:
                return <MdNotificationsActive className="text-gray-500" />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="p-6 bg-white rounded-lg shadow-md animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <MdNotificationsActive className="mr-2 text-blue-600" size={24} />
                    Important Alerts
                </h2>
                <div className="flex space-x-2">
                    <button
                        onClick={markAllAsRead}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm"
                    >
                        <MdCheckCircle className="mr-1" /> Mark All Read
                    </button>
                    <div className="relative inline-block">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="bg-gray-100 border border-gray-300 text-gray-700 py-1.5 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
                        >
                            <option value="all">All Alerts</option>
                            <option value="unread">Unread</option>
                            <option value="urgent">Urgent</option>
                            <option value="important">Important</option>
                            <option value="assignment">Assignments</option>
                            <option value="system">System</option>
                        </select>
                        <MdFilterList className="absolute right-2 top-2 text-gray-500 pointer-events-none" />
                    </div>
                </div>
            </div>

            {filteredAlerts.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <MdNotificationsActive className="mx-auto text-gray-400" size={48} />
                    <p className="mt-2 text-gray-600">No alerts to display</p>
                </div>
            ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {filteredAlerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`border rounded-lg p-4 transition-all duration-300 relative ${alert.isRead ? "bg-white border-gray-200" : "bg-blue-50 border-blue-200"
                                } hover:shadow-md`}
                            data-aos="fade-right"
                        >
                            <div className="flex items-start">
                                <div className={`p-2 rounded-full ${!alert.isRead ? "bg-blue-100" : "bg-gray-100"
                                    } mr-4`}>
                                    {getTypeIcon(alert.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className={`text-lg ${!alert.isRead ? "font-semibold" : "font-medium"} text-gray-800`}>
                                            {alert.title}
                                        </h3>
                                        <span className="text-xs text-gray-500">{formatDate(alert.timestamp)}</span>
                                    </div>
                                    <p className="text-gray-600 mt-1">{alert.message}</p>

                                    <div className="flex justify-end mt-2 space-x-2">
                                        {!alert.isRead && (
                                            <button
                                                onClick={() => markAsRead(alert.id)}
                                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                                            >
                                                <MdCheck className="mr-1" /> Mark as read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteAlert(alert.id)}
                                            className="text-xs text-red-600 hover:text-red-800 flex items-center"
                                        >
                                            <MdDelete className="mr-1" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {!alert.isRead && (
                                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
                <span>Showing {filteredAlerts.length} of {alerts.length} alerts</span>
                <button className="text-blue-600 hover:underline flex items-center">
                    <MdRefresh className="mr-1" /> Refresh
                </button>
            </div>
        </div>
    );
};

export default ImportantAlert;
