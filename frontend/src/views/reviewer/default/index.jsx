import React, { useState, useEffect } from "react";
import {
    MdAssignment,
    MdPendingActions,
    MdOutlineCalendarToday,
    MdNotifications,
    MdInsights,
    MdLocationOn,
    MdCheckCircle,
    MdPeople,
    MdTimer,
    MdWarning,
    MdFilterAlt,
    MdRefresh
} from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const ReviewerDashboard = () => {
    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
        });
    }, []);

    // Dummy data for active sessions
    const [activeSession, setActiveSession] = useState({
        _id: "s123456789",
        name: "Session 2025-1",
        description: "First research proposal session of 2025",
        status: "active",
        startDate: new Date("2025-04-01").toLocaleDateString(),
        endDate: new Date("2025-10-31").toLocaleDateString(),
        proposalDeadline: new Date("2025-05-15").toLocaleDateString(),
        reviewDeadline: new Date("2025-06-15").toLocaleDateString(),
        progressReportDeadline: new Date("2025-08-15").toLocaleDateString(),
        finalReportDeadline: new Date("2025-10-15").toLocaleDateString(),
        proposalCount: 48,
        approvedCount: 35,
        participantCount: 62
    });

    // Dummy data for queue status
    const [queueStatus, setQueueStatus] = useState({
        pending: 12,
        inProgress: 8,
        completed: 28,
        total: 48
    });

    // Dummy data for upcoming deadlines
    const [deadlines, setDeadlines] = useState([
        { id: 1, title: "Review Deadline", date: "June 15, 2025", daysLeft: 25, type: "review" },
        { id: 2, title: "Progress Report Evaluation", date: "August 15, 2025", daysLeft: 86, type: "progress" },
        { id: 3, title: "Final Report Deadline", date: "October 15, 2025", daysLeft: 147, type: "final" }
    ]);

    // Dummy notifications
    const [notifications, setNotifications] = useState([
        { id: 1, title: "New proposal assigned", time: "2 hours ago", read: false },
        { id: 2, title: "Review deadline approaching", time: "Yesterday", read: false },
        { id: 3, title: "Session update from admin", time: "2 days ago", read: true },
        { id: 4, title: "Progress report submitted", time: "3 days ago", read: true },
        { id: 5, title: "System maintenance scheduled", time: "1 week ago", read: true }
    ]);

    // Performance analytics data
    const performanceData = [
        { name: 'Jan', proposals: 4 },
        { name: 'Feb', proposals: 6 },
        { name: 'Mar', proposals: 8 },
        { name: 'Apr', proposals: 10 },
        { name: 'May', proposals: 7 },
        { name: 'Jun', proposals: 9 }
    ];

    // Department distribution data
    const departmentData = [
        { name: 'Computer Science', value: 20 },
        { name: 'Electrical Engineering', value: 15 },
        { name: 'Mechanical Engineering', value: 10 },
        { name: 'Civil Engineering', value: 8 },
        { name: 'Business Management', value: 5 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    // Handle notification click
    const handleNotificationClick = (id) => {
        setNotifications(
            notifications.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    const getQueuePercentage = (value) => {
        return Math.round((value / queueStatus.total) * 100);
    };

    // Countdown handler
    const getDeadlineColor = (daysLeft) => {
        if (daysLeft <= 7) return "text-red-500";
        if (daysLeft <= 30) return "text-yellow-500";
        return "text-green-500";
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-8">
            {/* Dashboard Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-800">Reviewer Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <button className="bg-blue-50 p-2 rounded-full text-blue-600 hover:bg-blue-100">
                                <MdRefresh className="text-xl" />
                            </button>
                            <div className="relative">
                                <MdNotifications className="text-2xl text-gray-600 cursor-pointer" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notifications.filter(n => !n.read).length}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                                    RP
                                </div>
                                <span className="hidden md:inline-block text-gray-700 font-medium">Reviewer Panel</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Active Session Overview */}
                    <div
                        className="bg-white rounded-lg shadow-md p-6 col-span-full"
                        data-aos="fade-up"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <MdOutlineCalendarToday className="mr-2 text-indigo-600" />
                                Active Session Overview
                            </h2>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                Active
                            </span>
                        </div>

                        <div className="border-t pt-4 pb-2">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium">{activeSession.name}</h3>
                                    <p className="text-gray-600 mt-1">{activeSession.description}</p>

                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Start Date</h4>
                                            <p className="text-gray-800">{activeSession.startDate}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">End Date</h4>
                                            <p className="text-gray-800">{activeSession.endDate}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Review Deadline</h4>
                                            <p className="text-gray-800">{activeSession.reviewDeadline}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Final Report Deadline</h4>
                                            <p className="text-gray-800">{activeSession.finalReportDeadline}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col justify-around">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="bg-blue-50 p-3 rounded-lg">
                                            <h3 className="text-2xl font-bold text-blue-600">{activeSession.proposalCount}</h3>
                                            <p className="text-sm text-gray-600">Total Proposals</p>
                                        </div>
                                        <div className="bg-green-50 p-3 rounded-lg">
                                            <h3 className="text-2xl font-bold text-green-600">{activeSession.approvedCount}</h3>
                                            <p className="text-sm text-gray-600">Approved</p>
                                        </div>
                                        <div className="bg-purple-50 p-3 rounded-lg">
                                            <h3 className="text-2xl font-bold text-purple-600">{activeSession.participantCount}</h3>
                                            <p className="text-sm text-gray-600">Participants</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="bg-blue-600 h-full" style={{ width: `${(new Date() - new Date(activeSession.startDate)) / (new Date(activeSession.endDate) - new Date(activeSession.startDate)) * 100}%` }}></div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1 text-center">Session Progress</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Review Queue Status */}
                    <div
                        className="bg-white rounded-lg shadow-md p-6"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <MdPendingActions className="mr-2 text-indigo-600" />
                                Review Queue Status
                            </h2>
                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                View All
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-yellow-50 p-4 rounded-lg flex items-center">
                                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                                    <MdPendingActions className="text-yellow-600 text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-600">Pending Review</h3>
                                    <div className="flex items-center mt-1">
                                        <span className="text-2xl font-bold text-gray-800 mr-2">{queueStatus.pending}</span>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="bg-yellow-500 h-full" style={{ width: `${getQueuePercentage(queueStatus.pending)}%` }}></div>
                                        </div>
                                        <span className="ml-2 text-sm text-gray-500">{getQueuePercentage(queueStatus.pending)}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                    <MdTimer className="text-blue-600 text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-600">In Progress</h3>
                                    <div className="flex items-center mt-1">
                                        <span className="text-2xl font-bold text-gray-800 mr-2">{queueStatus.inProgress}</span>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="bg-blue-500 h-full" style={{ width: `${getQueuePercentage(queueStatus.inProgress)}%` }}></div>
                                        </div>
                                        <span className="ml-2 text-sm text-gray-500">{getQueuePercentage(queueStatus.inProgress)}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg flex items-center">
                                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                    <MdCheckCircle className="text-green-600 text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-600">Completed</h3>
                                    <div className="flex items-center mt-1">
                                        <span className="text-2xl font-bold text-gray-800 mr-2">{queueStatus.completed}</span>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="bg-green-500 h-full" style={{ width: `${getQueuePercentage(queueStatus.completed)}%` }}></div>
                                        </div>
                                        <span className="ml-2 text-sm text-gray-500">{getQueuePercentage(queueStatus.completed)}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Proposal Distribution Map */}
                    <div
                        className="bg-white rounded-lg shadow-md p-6"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <MdLocationOn className="mr-2 text-indigo-600" />
                                Proposal Distribution
                            </h2>
                            <div className="flex items-center">
                                <MdFilterAlt className="text-gray-400 mr-1" />
                                <select className="text-sm text-gray-600 bg-transparent border-none focus:ring-0">
                                    <option>By Department</option>
                                    <option>By Category</option>
                                    <option>By Status</option>
                                </select>
                            </div>
                        </div>

                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={departmentData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {departmentData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Upcoming Deadlines */}
                    <div
                        className="bg-white rounded-lg shadow-md p-6"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <MdOutlineCalendarToday className="mr-2 text-indigo-600" />
                                Upcoming Deadlines
                            </h2>
                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                Calendar View
                            </button>
                        </div>

                        <div className="space-y-4">
                            {deadlines.map(deadline => (
                                <div key={deadline.id} className="border-l-4 border-indigo-500 pl-4 py-2">
                                    <h3 className="font-medium text-gray-800">{deadline.title}</h3>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-sm text-gray-600">{deadline.date}</p>
                                        <span className={`text-sm font-medium ${getDeadlineColor(deadline.daysLeft)}`}>
                                            {deadline.daysLeft} days left
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notification Center */}
                    <div
                        className="bg-white rounded-lg shadow-md p-6"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <MdNotifications className="mr-2 text-indigo-600" />
                                Notification Center
                            </h2>
                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                Mark All Read
                            </button>
                        </div>

                        <div className="space-y-3">
                            {notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors ${notification.read ? 'bg-white hover:bg-gray-50' : 'bg-blue-50 hover:bg-blue-100'}`}
                                    onClick={() => handleNotificationClick(notification.id)}
                                >
                                    <div className="flex justify-between">
                                        <h3 className={`font-medium ${notification.read ? 'text-gray-800' : 'text-blue-700'}`}>
                                            {notification.title}
                                        </h3>
                                        {!notification.read && (
                                            <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Performance Analytics */}
                    <div
                        className="bg-white rounded-lg shadow-md p-6"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <MdInsights className="mr-2 text-indigo-600" />
                                Performance Analytics
                            </h2>
                            <select className="text-sm text-gray-600 bg-transparent border-none focus:ring-0">
                                <option>Last 6 Months</option>
                                <option>Last Year</option>
                                <option>All Time</option>
                            </select>
                        </div>

                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={performanceData}
                                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="proposals" fill="#8884d8" name="Reviewed Proposals" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewerDashboard;
