import React, { useState, useEffect } from 'react'; // Import useEffect
import { Fragment } from 'react'
import {
    MdAdd,
    MdCalendarToday,
    MdAnalytics,
    MdSettings,
    MdList,
    MdWarning,
    MdDescription,
    MdPeople,
    MdCheckCircle,
    MdTimeline,
    MdAssignment,
    MdTrendingUp,
    MdSearch,
    MdFilterList,
    MdEdit,
    MdDelete,
    MdInfo,
    MdPerson,
    MdGroup,
    MdAssignmentTurnedIn,
    MdAccessTime,
    MdCancel,
    MdArchive,
    MdRefresh,
    MdOutlineSchedule,
    MdChevronLeft,  // Added missing icon
    MdChevronRight  // Added missing icon
} from "react-icons/md";
import Chart from "react-apexcharts"; // Re-add the Chart import

// Add more session data for better demonstration
const sessionData = [
    {
        _id: "sess123456",
        name: "Session 2025-1",
        description: "First research proposal session of 2025",
        status: "active",
        startDate: new Date("2025-04-01"),
        endDate: new Date("2025-10-31"),
        proposalDeadline: new Date("2025-05-15"),
        reviewDeadline: new Date("2025-06-15"),
        progressReportDeadline: new Date("2025-08-15"),
        finalReportDeadline: new Date("2025-10-15"),
        proposalCount: 48,
        approvedCount: 35,
        participantCount: 62,
        reviewers: [
            { userId: "user001", userName: "Dr. Ahmad Fauzi", role: "lead", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
            { userId: "user002", userName: "Dr. Siti Nurhayati", role: "member", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
            { userId: "user003", userName: "Dr. Budi Santoso", role: "member", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
        ],
        createdBy: "admin001",
        createdAt: new Date("2025-03-15"),
        updatedAt: new Date("2025-04-01")
    },
    {
        _id: "sess123457",
        name: "Session 2024-2",
        description: "Second research proposal session of 2024",
        status: "completed",
        startDate: new Date("2024-09-01"),
        endDate: new Date("2025-03-31"),
        proposalDeadline: new Date("2024-10-15"),
        reviewDeadline: new Date("2024-11-15"),
        progressReportDeadline: new Date("2024-12-15"),
        finalReportDeadline: new Date("2025-02-15"),
        proposalCount: 52,
        approvedCount: 42,
        participantCount: 68,
        reviewers: [
            { userId: "user001", userName: "Dr. Ahmad Fauzi", role: "lead", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
            { userId: "user004", userName: "Dr. Dewi Kartika", role: "member", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
        ],
        createdBy: "admin001",
        createdAt: new Date("2024-08-15"),
        updatedAt: new Date("2025-03-31")
    },
    {
        _id: "sess123458",
        name: "Session 2026-1",
        description: "First research proposal session of 2026",
        status: "draft",
        startDate: new Date("2026-04-01"),
        endDate: new Date("2026-10-31"),
        proposalDeadline: new Date("2026-05-15"),
        reviewDeadline: new Date("2026-06-15"),
        progressReportDeadline: new Date("2026-08-15"),
        finalReportDeadline: new Date("2026-10-15"),
        proposalCount: 0,
        approvedCount: 0,
        participantCount: 0,
        reviewers: [],
        createdBy: "admin001",
        createdAt: new Date("2026-01-15"),
        updatedAt: new Date("2026-01-15")
    }
];

// Add static data for metrics visualization
const sessionMetrics = {
    monthlyProposals: [35, 42, 38, 48, 52, 38, 42, 45, 40, 52, 56, 58],
    approvalRates: [75, 72, 78, 82, 85, 76, 80, 82, 85, 87, 88, 90],
    reviewTimes: [8, 7.5, 7, 6.5, 6.8, 6.2, 6, 5.8, 6.1, 5.5, 5.2, 5],
    participantGrowth: [42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78],
    departmentBreakdown: {
        "Computer Science": 35,
        "Electrical Engineering": 28,
        "Mechanical Engineering": 18,
        "Civil Engineering": 12,
        "Architecture": 7
    },
    statusBreakdown: {
        "Approved": 68,
        "Under Review": 18,
        "Revisions Needed": 9,
        "Rejected": 5
    }
};

// Static data for timeline milestones
const timelineMilestones = [
    {
        id: 1,
        title: "Call for Proposals",
        description: "Opening of proposal submission system",
        date: "2025-04-01",
        completionPercentage: 100,
        status: "completed"
    },
    {
        id: 2,
        title: "Proposal Submission Deadline",
        description: "Final deadline for research proposal submissions",
        date: "2025-05-15",
        completionPercentage: 85,
        status: "active"
    },
    {
        id: 3,
        title: "Review Period",
        description: "Evaluation of all submitted proposals",
        date: "2025-05-16",
        endDate: "2025-06-15",
        completionPercentage: 40,
        status: "active"
    },
    {
        id: 4,
        title: "Announcement of Results",
        description: "Publication of approved research proposals",
        date: "2025-06-20",
        completionPercentage: 0,
        status: "upcoming"
    },
    {
        id: 5,
        title: "Progress Report Deadline",
        description: "Submission of interim research progress reports",
        date: "2025-08-15",
        completionPercentage: 0,
        status: "upcoming"
    }
];

const SessionManagement = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [currentSession, setCurrentSession] = useState(sessionData[0]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Keep for Create New Session modal
    const [editingSessionData, setEditingSessionData] = useState(null); // State for the session data being edited
    const [configView, setConfigView] = useState("timeline");
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSession, setSelectedSession] = useState(null); // Keep for Session Details modal

    // Effect to update currentSession when sessionData changes (e.g., after edit)
    useEffect(() => {
        const active = sessionData.find(s => s.status === 'active');
        setCurrentSession(active || sessionData[0]); // Fallback to first if no active
    }, [sessionData]); // Re-run when sessionData potentially changes

    const handleCreateSession = () => {
        const hasActiveSession = sessionData.some(s => s.status === "active");
        if (hasActiveSession) {
            alert("Only one active session allowed at a time.");
            return;
        }
        setIsModalOpen(true);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Add this function
    const calculateProgress = (session) => {
        if (!session) return 0;
        if (session.status === "draft") return 0;
        if (session.status === "completed") return 100;

        const now = new Date();
        const start = new Date(session.startDate);
        const end = new Date(session.endDate);

        // Validate dates
        if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
            return 0;
        }

        const totalDuration = end - start;
        const elapsedDuration = now - start;

        return Math.min(Math.max(Math.round((elapsedDuration / totalDuration) * 100), 0), 100);
    };

    // Add chart configuration for session analytics
    const getAnalyticsChartOptions = () => {
        return {
            chart: {
                id: "session-analytics",
                toolbar: {
                    show: false
                },
                stacked: false,
                zoom: {
                    enabled: false
                },
                fontFamily: 'inherit'
            },
            colors: ['#3b82f6', '#22c55e', '#8b5cf6'],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 4,
                    dataLabels: {
                        position: 'top'
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2,
                curve: 'smooth',
                colors: ['transparent']
            },
            grid: {
                borderColor: '#f1f5f9',
                row: {
                    colors: ['#f8fafc', 'transparent'],
                    opacity: 0.5
                }
            },
            xaxis: {
                categories: sessionData.map(s => s.name),
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                title: {
                    text: 'Count'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                },
                theme: 'light'
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetY: -20,
                fontSize: '12px'
            }
        };
    };

    const getAnalyticsChartSeries = () => {
        return [
            {
                name: 'Total Proposals',
                data: sessionData.map(s => s.proposalCount)
            },
            {
                name: 'Approved Proposals',
                data: sessionData.map(s => s.approvedCount)
            },
            {
                name: 'Participants',
                data: sessionData.map(s => s.participantCount)
            }
        ];
    };

    // Donut chart for approval ratio
    const getApprovalRatioOptions = () => {
        return {
            chart: {
                type: 'donut',
                fontFamily: 'inherit'
            },
            colors: ['#22c55e', '#94a3b8'],
            labels: ['Approved', 'Pending/Rejected'],
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        labels: {
                            show: true,
                            name: {
                                show: true
                            },
                            value: {
                                show: true,
                                formatter: function (val) {
                                    return val
                                }
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                                }
                            }
                        }
                    }
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        height: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };
    };

    const getApprovalRatioSeries = () => {
        // For current session
        const approvedCount = currentSession?.approvedCount || 0;
        const pendingCount = (currentSession?.proposalCount || 0) - approvedCount;
        return [approvedCount, pendingCount];
    };

    const TabButton = ({ value, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors
                ${activeTab === value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
        >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
        </button>
    );

    const renderStatusBadge = (status) => {
        const styles = {
            active: "bg-green-100 text-green-800 border-green-200",
            completed: "bg-blue-100 text-blue-800 border-blue-200",
            draft: "bg-amber-100 text-amber-800 border-amber-200",
            cancelled: "bg-red-100 text-red-800 border-red-200"
        };
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const renderMetricCard = (icon, title, value, trend) => (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-blue-50">
                    {icon}
                </div>
                {trend && (
                    <span className="text-green-500 flex items-center text-sm">
                        <MdTrendingUp className="mr-1" />
                        {trend}
                    </span>
                )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
    );

    // Filter sessions based on search and status
    const filteredSessions = sessionData.filter(session => {
        const matchesSearch = session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            session.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Calendar related functions
    const getSessionsForDate = (date) => {
        return sessionData.filter(session => {
            const sessionStart = new Date(session.startDate);
            const sessionEnd = new Date(session.endDate);
            return date >= sessionStart && date <= sessionEnd;
        });
    };

    const getDayClass = (date) => {
        const sessionsOnDate = getSessionsForDate(date);
        if (sessionsOnDate.some(s => s.status === 'active')) return 'bg-green-100 text-green-800';
        if (sessionsOnDate.length > 0) return 'bg-blue-100 text-blue-800';
        return '';
    };

    // New Components for ConfigView
    const ConfigMenu = () => (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuration Options</h3>
            <div className="flex flex-wrap gap-2">
                {[
                    { id: "timeline", icon: MdOutlineSchedule, label: "Timeline Setup" },
                    { id: "reviewers", icon: MdGroup, label: "Reviewer Assignments" },
                    { id: "submissions", icon: MdDescription, label: "Submission Windows" },
                    { id: "reviews", icon: MdAssignmentTurnedIn, label: "Review Period" },
                    { id: "eligibility", icon: MdCheckCircle, label: "Eligibility Review" },
                    { id: "progress", icon: MdTimeline, label: "Progress Tracking" },
                    { id: "reports", icon: MdAssignment, label: "Final Reports" },
                    { id: "closure", icon: MdArchive, label: "Session Closure" }
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => setConfigView(item.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                            ${configView === item.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    // Sessions list components
    const SessionsTable = () => (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">All Sessions</h3>
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search sessions..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md bg-white"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="draft">Draft</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposals</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSessions.length > 0 ? (
                            filteredSessions.map((session) => (
                                <tr key={session._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{session.name}</div>
                                        <div className="text-sm text-gray-500">{session.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {renderStatusBadge(session.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{formatDate(session.startDate)}</div>
                                        <div className="text-sm text-gray-500">to {formatDate(session.endDate)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {session.proposalCount} ({session.approvedCount} approved)
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{ width: `${calculateProgress(session)}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">{calculateProgress(session)}% complete</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                className="text-blue-600 hover:text-blue-900"
                                                onClick={() => setSelectedSession(session)}
                                            >
                                                <MdInfo className="h-5 w-5" />
                                            </button>
                                            <button
                                                className="text-green-600 hover:text-green-900"
                                                onClick={() => handleEditSession(session)}
                                                disabled={session.status === "completed"}
                                            >
                                                <MdEdit className="h-5 w-5" />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                disabled={session.status === "active"}
                                            >
                                                <MdDelete className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    No sessions found matching your search criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Calendar View
    const CalendarView = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Calendar</h3>

                {/* Simple calendar UI */}
                <div className="calendar-container">
                    <div className="calendar-header flex justify-between mb-4">
                        <button className="text-blue-500 hover:text-blue-700">
                            <MdChevronLeft className="h-6 w-6" />
                        </button>
                        <h4 className="text-lg font-medium">
                            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h4>
                        <button className="text-blue-500 hover:text-blue-700">
                            <MdChevronRight className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                            <div key={day} className="text-center text-sm font-medium text-gray-400">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 42 }, (_, i) => i).map(day => {
                            const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day - 15);
                            const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                            const isToday = date.toDateString() === new Date().toDateString();

                            return (
                                <button
                                    key={day}
                                    className={`h-10 w-full rounded-full flex items-center justify-center text-sm
                                        ${isCurrentMonth ? 'text-gray-700' : 'text-gray-300'} 
                                        ${isToday ? 'border border-blue-500' : ''}
                                        ${isCurrentMonth ? getDayClass(date) : ''}`}
                                    onClick={() => setSelectedDate(date)}
                                >
                                    {date.getDate()}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Legend</h4>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-100 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-600">Active Session</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-blue-100 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-600">Other Session</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Sessions for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </h3>

                {getSessionsForDate(selectedDate).length > 0 ? (
                    <div className="space-y-4">
                        {getSessionsForDate(selectedDate).map(session => (
                            <div key={session._id} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-lg font-medium text-gray-800">{session.name}</h4>
                                            {renderStatusBadge(session.status)}
                                        </div>
                                        <p className="text-gray-600 mt-1">{session.description}</p>
                                    </div>
                                    <button
                                        className="text-blue-600 hover:text-blue-900"
                                        onClick={() => setSelectedSession(session)}
                                    >
                                        <MdInfo className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="mt-4">
                                    <div className="text-sm text-gray-500 grid grid-cols-2 gap-2">
                                        <div>Proposals: <span className="font-medium text-gray-700">{session.proposalCount}</span></div>
                                        <div>Participants: <span className="font-medium text-gray-700">{session.participantCount}</span></div>
                                        <div>Start Date: <span className="font-medium text-gray-700">{formatDate(session.startDate)}</span></div>
                                        <div>End Date: <span className="font-medium text-gray-700">{formatDate(session.endDate)}</span></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <MdInfo className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">No sessions scheduled for this date</p>
                    </div>
                )}
            </div>
        </div>
    );

    // Configuration content based on selected view
    const renderConfigContent = () => {
        switch (configView) {
            case 'timeline':
                return (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Timeline Setup</h3>
                        <p className="text-gray-600 mb-6">Configure important dates and milestones for the current session.</p>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        value={currentSession?.startDate.toISOString().split('T')[0]}
                                        disabled
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Start date cannot be changed once set</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        value={currentSession?.endDate.toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Proposal Submission Deadline
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        value={currentSession?.proposalDeadline.toISOString().split('T')[0]}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Review Deadline
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        value={currentSession?.reviewDeadline.toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Progress Report Deadline
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        value={currentSession?.progressReportDeadline.toISOString().split('T')[0]}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Final Report Deadline
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        value={currentSession?.finalReportDeadline.toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                                    Cancel
                                </button>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'reviewers':
                return (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reviewer Assignments</h3>
                        <p className="text-gray-600 mb-6">Manage reviewers for this session and assign roles.</p>

                        <div className="flex justify-between items-center mb-4">
                            <div className="relative w-64">
                                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search reviewers..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <button className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                <MdAdd className="h-5 w-5 mr-2" />
                                Add Reviewer
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Proposals</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentSession?.reviewers.map(reviewer => (
                                        <tr key={reviewer.userId} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={reviewer.avatar} alt={reviewer.userName} />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{reviewer.userName}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${reviewer.role === 'lead' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                    {reviewer.role === 'lead' ? 'Lead Reviewer' : 'Member'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {Math.floor(Math.random() * 15) + 1} proposals
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-900">
                                                        <MdEdit className="h-5 w-5" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <MdDelete className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center">
                        <MdSettings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {configView.charAt(0).toUpperCase() + configView.slice(1)} Configuration
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            This section is under development. It will allow you to configure {configView} settings for the active session.
                        </p>
                    </div>
                );
        }
    };

    // Update handler for edit button click - sets the data for the edit view
    const handleEditSession = (session) => {
        const formattedSession = {
            ...session,
            startDate: session.startDate.toISOString().split('T')[0],
            endDate: session.endDate.toISOString().split('T')[0],
            proposalDeadline: session.proposalDeadline.toISOString().split('T')[0],
            reviewDeadline: session.reviewDeadline.toISOString().split('T')[0],
            progressReportDeadline: session.progressReportDeadline.toISOString().split('T')[0],
            finalReportDeadline: session.finalReportDeadline.toISOString().split('T')[0],
        };
        setEditingSessionData(formattedSession);
        setActiveTab("edit"); // Switch to a dedicated edit tab/view state
    };

    // Update handler for save edited session
    const handleSaveEditedSession = () => {
        // In a real app, you would make an API call here to update the session
        // For now, update the dummy data (find and replace)
        const index = sessionData.findIndex(s => s._id === editingSessionData._id);
        if (index !== -1) {
            // Convert date strings back to Date objects before saving if needed
            const updatedSession = {
                ...editingSessionData,
                startDate: new Date(editingSessionData.startDate),
                endDate: new Date(editingSessionData.endDate),
                proposalDeadline: new Date(editingSessionData.proposalDeadline),
                reviewDeadline: new Date(editingSessionData.reviewDeadline),
                progressReportDeadline: new Date(editingSessionData.progressReportDeadline),
                finalReportDeadline: new Date(editingSessionData.finalReportDeadline),
                // Ensure counts are numbers
                proposalCount: Number(editingSessionData.proposalCount) || 0,
                approvedCount: Number(editingSessionData.approvedCount) || 0,
                participantCount: Number(editingSessionData.participantCount) || 0,
            };
            sessionData[index] = updatedSession; // NOTE: This mutates the original array, better state management needed in real app
            alert(`Session ${editingSessionData.name} updated successfully!`);
        } else {
            alert(`Error: Session not found!`);
        }
        setEditingSessionData(null); // Clear editing state
        setActiveTab("sessions"); // Go back to the session list
    };

    // Handler to cancel editing
    const handleCancelEdit = () => {
        setEditingSessionData(null);
        setActiveTab("sessions"); // Or whichever tab you want to return to
    };

    // Component for the Edit Session View with improved modern design
    const EditSessionView = () => {
        // Move useState to top level (before any conditional returns)
        const [editTab, setEditTab] = useState("general");
        const [saving, setSaving] = useState(false);
        const [showSavedFeedback, setShowSavedFeedback] = useState(false);
        const [isConfirmVisible, setIsConfirmVisible] = useState(false);

        if (!editingSessionData) return null;

        const handleSave = () => {
            setSaving(true);
            // Simulate API call
            setTimeout(() => {
                handleSaveEditedSession();
                setSaving(false);
                setShowSavedFeedback(true);
                setTimeout(() => setShowSavedFeedback(false), 2000);
            }, 800);
        };

        // Add a new function to handle discarding changes
        const handleDiscardChanges = () => {
            setIsConfirmVisible(false); // First close the confirmation dialog
            handleCancelEdit(); // Then call the parent cancel handler
        };

        return (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden transition-all duration-300 relative max-w-6xl mx-auto">
                {/* Decorative background elements */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>

                {/* Header with glassmorphism */}
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-700/80 backdrop-blur-sm"></div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 opacity-20">
                        <svg width="250" height="250" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="white" d="M42.7,-68.1C53.5,-59.6,59.5,-43.8,68.2,-27.5C76.9,-11.1,88.5,5.7,88,22.1C87.6,38.5,75.3,54.5,59.8,63.7C44.3,72.9,25.7,75.3,6.6,77.1C-12.4,78.9,-31.8,80.1,-44.9,71.1C-58,62.1,-64.7,42.9,-71.4,23.8C-78.1,4.7,-84.8,-14.2,-79.7,-28.8C-74.7,-43.4,-57.8,-53.6,-41.8,-60.4C-25.8,-67.2,-10.7,-70.7,3.9,-71.5C18.4,-72.3,31.9,-76.5,42.7,-68.1Z" transform="translate(100 100)" />
                        </svg>
                    </div>

                    {/* Small decorative dots */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-12 left-16 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-20 left-32 w-1 h-1 bg-white rounded-full"></div>
                        <div className="absolute top-24 left-8 w-1.5 h-1.5 bg-white rounded-full"></div>
                        <div className="absolute bottom-12 right-16 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute bottom-20 right-32 w-1 h-1 bg-white rounded-full"></div>
                        <div className="absolute bottom-24 right-8 w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>

                    <div className="flex justify-between items-center relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                            <h2 className="text-3xl font-bold tracking-tight">{editingSessionData.name}</h2>
                            <div className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm border border-white/30">
                                {editingSessionData.status.charAt(0).toUpperCase() + editingSessionData.status.slice(1)}
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            {showSavedFeedback && (
                                <span className="animate-fade-in text-sm bg-green-500/90 py-1.5 px-4 rounded-full flex items-center shadow-lg backdrop-blur-sm">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Changes saved!
                                </span>
                            )}
                            <button
                                onClick={() => setIsConfirmVisible(true)}
                                className="px-4 py-2 border border-white/30 rounded-lg text-sm font-medium text-white hover:bg-white/10 active:bg-white/20 transition duration-150 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className={`px-5 py-2 bg-white text-indigo-700 rounded-lg text-sm font-medium flex items-center transition duration-150 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-600
                                    ${saving ? 'opacity-75 cursor-not-allowed' : 'hover:bg-opacity-90 active:bg-opacity-100'}`}
                            >
                                {saving ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <MdCheckCircle className="mr-1.5 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    <p className="mt-3 text-blue-50 text-sm max-w-2xl relative z-10">{editingSessionData.description}</p>

                    {/* Session info pills */}
                    <div className="mt-4 flex flex-wrap gap-3 relative z-10">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20">
                            <MdCalendarToday className="mr-1.5 h-3 w-3" />
                            {formatDate(new Date(editingSessionData.startDate))} to {formatDate(new Date(editingSessionData.endDate))}
                        </div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20">
                            <MdDescription className="mr-1.5 h-3 w-3" />
                            {editingSessionData.proposalCount} proposals
                        </div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20">
                            <MdPeople className="mr-1.5 h-3 w-3" />
                            {editingSessionData.participantCount} participants
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs with pill design */}
                <div className="border-b border-gray-200 bg-gray-50/50 backdrop-blur-sm px-8 pt-4 flex overflow-x-auto hide-scrollbar">
                    {[
                        { id: "general", label: "General Info", icon: MdInfo },
                        { id: "timeline", label: "Timeline", icon: MdOutlineSchedule },
                        { id: "metrics", label: "Metrics", icon: MdAnalytics },
                        { id: "reviewers", label: "Reviewers", icon: MdGroup }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setEditTab(tab.id)}
                            className={`py-3 px-5 font-medium text-sm transition-colors whitespace-nowrap flex items-center rounded-t-lg mr-2
                                ${editTab === tab.id
                                    ? 'bg-white text-indigo-600 shadow-sm border-t border-l border-r border-gray-200'
                                    : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'}`}
                        >
                            <tab.icon className={`h-4 w-4 mr-2 ${editTab === tab.id ? 'text-indigo-500' : 'text-gray-400'}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content based on selected tab */}
                <div className="p-8 overflow-auto bg-white">
                    <div className="max-w-5xl mx-auto">
                        {editTab === "general" && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Session Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
                                            value={editingSessionData.name}
                                            onChange={(e) => setEditingSessionData({ ...editingSessionData, name: e.target.value })}
                                            placeholder="Enter session name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Status</label>
                                        <div className="relative">
                                            <select
                                                className={`w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm
                                                    ${editingSessionData.status === 'active' ? 'text-green-600' :
                                                        editingSessionData.status === 'draft' ? 'text-amber-600' :
                                                            editingSessionData.status === 'completed' ? 'text-blue-600' : 'text-gray-600'}`}
                                                value={editingSessionData.status}
                                                onChange={(e) => setEditingSessionData({ ...editingSessionData, status: e.target.value })}
                                                disabled={editingSessionData.status === "completed"}
                                            >
                                                <option value="draft" className="text-amber-600">Draft</option>
                                                <option value="active" className="text-green-600">Active</option>
                                                <option value="completed" className="text-blue-600">Completed</option>
                                                <option value="cancelled" className="text-red-600">Cancelled</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        {editingSessionData.status === "completed" && (
                                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                <MdInfo className="h-3 w-3 mr-1 text-blue-500" />
                                                Completed sessions cannot be modified
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
                                        rows="4"
                                        value={editingSessionData.description}
                                        onChange={(e) => setEditingSessionData({ ...editingSessionData, description: e.target.value })}
                                        placeholder="Provide a detailed description of this session..."
                                    ></textarea>
                                </div>

                                {/* Timeline options */}
                                <div className="space-y-6">
                                    <h3 className="text-base font-medium text-gray-800 pb-2 border-b border-gray-200">Key Dates</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
                                                value={editingSessionData.startDate}
                                                onChange={(e) => setEditingSessionData({
                                                    ...editingSessionData,
                                                    startDate: e.target.value
                                                })}
                                                disabled={editingSessionData.status === "completed"}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
                                                value={editingSessionData.endDate}
                                                onChange={(e) => setEditingSessionData({
                                                    ...editingSessionData,
                                                    endDate: e.target.value
                                                })}
                                                disabled={editingSessionData.status === "completed"}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Proposal Deadline</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
                                                value={editingSessionData.proposalDeadline}
                                                onChange={(e) => setEditingSessionData({
                                                    ...editingSessionData,
                                                    proposalDeadline: e.target.value
                                                })}
                                                disabled={editingSessionData.status === "completed"}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Review Deadline</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
                                                value={editingSessionData.reviewDeadline}
                                                onChange={(e) => setEditingSessionData({
                                                    ...editingSessionData,
                                                    reviewDeadline: e.target.value
                                                })}
                                                disabled={editingSessionData.status === "completed"}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Create date info with modern card design */}
                                <div className="mt-8 bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 relative overflow-hidden shadow-sm">
                                    <div className="absolute top-0 right-0 opacity-5">
                                        <svg width="160" height="160" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="currentColor" d="M34.5,-58.2C45.7,-50.3,56.5,-42.6,63.2,-31.5C69.9,-20.5,72.5,-6.1,70.4,7.7C68.4,21.4,61.7,34.6,52.6,44.7C43.6,54.8,32.2,61.8,19.4,68.5C6.7,75.1,-7.4,81.3,-19.9,78.9C-32.4,76.4,-43.2,65.3,-49.7,52.8C-56.2,40.3,-58.4,26.4,-63.1,11.6C-67.7,-3.2,-74.9,-18.9,-71.2,-31C-67.4,-43.1,-52.9,-51.5,-39.1,-58.7C-25.3,-65.9,-12.6,-71.8,-0.1,-71.6C12.4,-71.5,24.9,-65.4,34.5,-58.2Z" transform="translate(100 100)" />
                                        </svg>
                                    </div>

                                    <h3 className="text-sm font-medium text-gray-500 mb-4 relative z-10 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Session Information
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm relative z-10">
                                        <div className="flex items-center p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                                <MdPerson className="h-5 w-5 text-indigo-600" />
                                            </div>
                                            <div>
                                                <span className="text-gray-500 text-xs">Created by</span>
                                                <p className="text-gray-900 font-medium">Admin</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                                <MdCalendarToday className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <span className="text-gray-500 text-xs">Created on</span>
                                                <p className="text-gray-900 font-medium">{formatDate(new Date(editingSessionData.createdAt))}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                                <MdRefresh className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <span className="text-gray-500 text-xs">Last updated</span>
                                                <p className="text-gray-900 font-medium">{formatDate(new Date(editingSessionData.updatedAt))}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                                <MdInfo className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <span className="text-gray-500 text-xs">Session ID</span>
                                                <p className="text-gray-900 font-mono text-xs select-all">{editingSessionData._id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {editTab === "timeline" && (
                            <div className="space-y-8">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
                                        <h3 className="text-lg font-medium text-indigo-800">Session Timeline</h3>
                                    </div>
                                    <div className="p-6">
                                        <div className="relative pl-8 space-y-8">
                                            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-100"></div>

                                            {timelineMilestones.map((milestone, index) => {
                                                const statusColors = {
                                                    completed: "bg-green-500 text-white",
                                                    active: "bg-blue-500 text-white",
                                                    upcoming: "bg-gray-200 text-gray-700"
                                                };

                                                return (
                                                    <div key={milestone.id} className="relative">
                                                        <div className={`absolute left-0 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center ${statusColors[milestone.status]}`}>
                                                            {milestone.status === 'completed' ? (
                                                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            ) : milestone.status === 'active' ? (
                                                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            ) : (
                                                                <span className="h-1.5 w-1.5 bg-current rounded-full"></span>
                                                            )}
                                                        </div>

                                                        <div className="ml-6">
                                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                                <h4 className="text-md font-medium text-gray-800">{milestone.title}</h4>
                                                                <span className={`text-xs px-2 py-0.5 rounded-full 
                                                                    ${milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                        milestone.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                                                            'bg-gray-100 text-gray-800'}`}>
                                                                    {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                                                                </span>
                                                            </div>

                                                            <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>

                                                            <div className="flex items-center text-xs text-gray-500 mb-2">
                                                                <MdCalendarToday className="mr-1 h-3 w-3" />
                                                                {milestone.endDate ?
                                                                    `${formatDate(new Date(milestone.date))} - ${formatDate(new Date(milestone.endDate))}` :
                                                                    formatDate(new Date(milestone.date))}
                                                            </div>

                                                            {milestone.completionPercentage > 0 && (
                                                                <div className="mt-2">
                                                                    <div className="flex justify-between text-xs mb-1">
                                                                        <span>Progress</span>
                                                                        <span>{milestone.completionPercentage}%</span>
                                                                    </div>
                                                                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                                        <div
                                                                            className={`h-1.5 rounded-full ${milestone.status === 'completed' ? 'bg-green-500' :
                                                                                milestone.status === 'active' ? 'bg-blue-500' :
                                                                                    'bg-gray-400'}`}
                                                                            style={{ width: `${milestone.completionPercentage}%` }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <div className="px-6 py-4 bg-purple-50 border-b border-purple-100">
                                            <h3 className="text-md font-medium text-purple-800">Milestone Settings</h3>
                                        </div>
                                        <div className="p-6 space-y-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Progress Report Deadline</label>
                                                <input
                                                    type="date"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                    value={editingSessionData.progressReportDeadline}
                                                    onChange={(e) => setEditingSessionData({
                                                        ...editingSessionData,
                                                        progressReportDeadline: e.target.value
                                                    })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Final Report Deadline</label>
                                                <input
                                                    type="date"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                    value={editingSessionData.finalReportDeadline}
                                                    onChange={(e) => setEditingSessionData({
                                                        ...editingSessionData,
                                                        finalReportDeadline: e.target.value
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <div className="px-6 py-4 bg-green-50 border-b border-green-100">
                                            <h3 className="text-md font-medium text-green-800">Timeline Controls</h3>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Send Reminders</p>
                                                        <p className="text-xs text-gray-500">Notify participants of upcoming deadlines</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Auto-close Submissions</p>
                                                        <p className="text-xs text-gray-500">Automatically close at deadline</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Grace Period</p>
                                                        <p className="text-xs text-gray-500">Allow late submissions (24h)</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {editTab === "metrics" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-xs font-medium text-blue-500 uppercase tracking-wide">Proposals</p>
                                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{editingSessionData.proposalCount}</h3>
                                            </div>
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <MdDescription className="h-5 w-5 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                value={editingSessionData.proposalCount}
                                                onChange={(e) => setEditingSessionData({
                                                    ...editingSessionData,
                                                    proposalCount: e.target.value
                                                })}
                                                placeholder="Number of proposals"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 shadow-sm">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-xs font-medium text-green-500 uppercase tracking-wide">Approved</p>
                                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{editingSessionData.approvedCount}</h3>
                                            </div>
                                            <div className="p-2 bg-green-100 rounded-lg">
                                                <MdCheckCircle className="h-5 w-5 text-green-600" />
                                            </div>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                                                value={editingSessionData.approvedCount}
                                                onChange={(e) => setEditingSessionData({
                                                    ...editingSessionData,
                                                    approvedCount: e.target.value
                                                })}
                                                placeholder="Number approved"
                                                max={editingSessionData.proposalCount}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-6 border border-purple-100 shadow-sm">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-xs font-medium text-purple-500 uppercase tracking-wide">Participants</p>
                                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{editingSessionData.participantCount}</h3>
                                            </div>
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                <MdPeople className="h-5 w-5 text-purple-600" />
                                            </div>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                                                value={editingSessionData.participantCount}
                                                onChange={(e) => setEditingSessionData({
                                                    ...editingSessionData,
                                                    participantCount: e.target.value
                                                })}
                                                placeholder="Number of participants"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                        <h3 className="text-md font-medium text-gray-800">Analytics Preview</h3>
                                    </div>
                                    <div className="p-6">
                                        <div className="h-64">
                                            <Chart
                                                options={getAnalyticsChartOptions()}
                                                series={getAnalyticsChartSeries()}
                                                type="bar"
                                                height="100%"
                                            />
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="text-xs text-gray-500">
                                                This chart shows data comparison across different sessions. Changes to current session metrics will be reflected when saved.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                            <h3 className="text-md font-medium text-gray-800">Department Breakdown</h3>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                {Object.entries(sessionMetrics.departmentBreakdown).map(([dept, count], index) => (
                                                    <div key={index}>
                                                        <div className="flex justify-between text-sm mb-1">
                                                            <span className="font-medium text-gray-700">{dept}</span>
                                                            <span className="text-gray-600">{count}</span>
                                                        </div>
                                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                                                                style={{ width: `${(count / Object.values(sessionMetrics.departmentBreakdown).reduce((a, b) => a + b, 0)) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                            <h3 className="text-md font-medium text-gray-800">Proposal Status</h3>
                                        </div>
                                        <div className="p-6">
                                            <div className="h-48">
                                                <Chart
                                                    options={{
                                                        chart: {
                                                            type: 'donut',
                                                            fontFamily: 'inherit'
                                                        },
                                                        labels: Object.keys(sessionMetrics.statusBreakdown),
                                                        colors: ['#22c55e', '#3b82f6', '#f97316', '#ef4444'],
                                                        legend: {
                                                            position: 'bottom'
                                                        },
                                                        plotOptions: {
                                                            pie: {
                                                                donut: {
                                                                    size: '55%'
                                                                }
                                                            }
                                                        }
                                                    }}
                                                    series={Object.values(sessionMetrics.statusBreakdown)}
                                                    type="donut"
                                                    height="100%"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {editTab === "reviewers" && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                                        <h3 className="text-md font-medium text-gray-800">Assigned Reviewers</h3>
                                        <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg flex items-center">
                                            <MdAdd className="mr-1 h-4 w-4" />
                                            Add Reviewer
                                        </button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewer</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {editingSessionData.reviewers.map((reviewer, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-8 w-8">
                                                                    <img
                                                                        className="h-8 w-8 rounded-full"
                                                                        src={reviewer.avatar}
                                                                        alt={reviewer.userName}
                                                                    />
                                                                </div>
                                                                <div className="ml-3">
                                                                    <div className="text-sm font-medium text-gray-900">{reviewer.userName}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                                ${reviewer.role === 'lead' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                                {reviewer.role === 'lead' ? 'Lead Reviewer' : 'Member'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {Math.floor(Math.random() * 15) + 1} proposals
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                            <button className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-1 rounded">
                                                                <MdEdit className="h-4 w-4" />
                                                            </button>
                                                            <button className="text-red-600 hover:text-red-900 bg-red-50 p-1 rounded">
                                                                <MdDelete className="h-4 w-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                        <h3 className="text-md font-medium text-gray-800">Reviewer Assignments</h3>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <h4 className="text-sm font-medium text-gray-700 mb-2">Assignment Strategy</h4>
                                                <div className="space-y-2">
                                                    <label className="flex items-center">
                                                        <input type="radio" name="strategy" className="h-4 w-4 text-indigo-600" defaultChecked />
                                                        <span className="ml-2 text-sm text-gray-700">Auto-assign (balanced)</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="radio" name="strategy" className="h-4 w-4 text-indigo-600" />
                                                        <span className="ml-2 text-sm text-gray-700">Manual assignment</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="radio" name="strategy" className="h-4 w-4 text-indigo-600" />
                                                        <span className="ml-2 text-sm text-gray-700">By expertise match</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <h4 className="text-sm font-medium text-gray-700 mb-2">Assignment Rules</h4>
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-600">Reviewers per proposal</span>
                                                        <select className="h-8 px-2 py-0 border border-gray-300 rounded text-sm">
                                                            <option>2</option>
                                                            <option selected>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-600">Max assignments per reviewer</span>
                                                        <select className="h-8 px-2 py-0 border border-gray-300 rounded text-sm">
                                                            <option>5</option>
                                                            <option>10</option>
                                                            <option selected>15</option>
                                                            <option>20</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Confirmation dialog for cancel */}
                {isConfirmVisible && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                            <div className="text-center mb-5">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                                    <MdWarning className="h-8 w-8 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Discard changes?</h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    Any unsaved changes will be lost. This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsConfirmVisible(false)}
                                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                                >
                                    Keep Editing
                                </button>
                                <button
                                    onClick={handleDiscardChanges} // Use the new handler
                                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                                >
                                    Discard
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Floating Action Buttons for mobile with modern design */}
                <div className="md:hidden fixed bottom-6 inset-x-6 z-50">
                    <div className="flex justify-between items-center gap-4 p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100">
                        <button
                            onClick={() => setIsConfirmVisible(true)}
                            className="w-1/2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl active:bg-gray-200 transition-colors flex justify-center items-center font-medium"
                        >
                            <MdCancel className="mr-2 h-5 w-5" />
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`w-1/2 px-4 py-3 bg-indigo-600 text-white rounded-xl transition-colors flex justify-center items-center font-medium
                                ${saving ? 'opacity-75 cursor-not-allowed' : 'active:bg-indigo-700'}`}
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <MdCheckCircle className="mr-2 h-5 w-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Enhanced Session Details Modal
    const SessionDetailsModal = () => {
        // Move useState to top level (before any conditional returns)
        const [detailTab, setDetailTab] = useState("overview");

        if (!selectedSession) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                    {/* Header with gradient background */}
                    <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-semibold">{selectedSession.name}</h3>
                                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                                    {selectedSession.status.charAt(0).toUpperCase() + selectedSession.status.slice(1)}
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedSession(null)}
                                className="text-white hover:text-blue-100 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="mt-2 text-blue-100 text-sm">{selectedSession.description}</p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 px-6 flex overflow-x-auto">
                        {[
                            { id: "overview", label: "Overview" },
                            { id: "timeline", label: "Timeline" },
                            { id: "reviewers", label: "Reviewers" },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setDetailTab(tab.id)}
                                className={`py-4 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap
                                    ${detailTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content based on selected tab */}
                    <div className="p-6 overflow-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
                        {detailTab === "overview" && (
                            <div className="space-y-6">
                                {/* Progress and metrics cards in a grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                        <h4 className="text-sm font-medium text-gray-500 mb-3">Session Progress</h4>
                                        <div className="flex items-center">
                                            <div className="flex-1">
                                                <div className="h-2 bg-gray-200 rounded-full">
                                                    <div
                                                        className="h-2 bg-blue-500 rounded-full"
                                                        style={{ width: `${calculateProgress(selectedSession)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className="ml-4 text-sm font-medium text-gray-700">
                                                {calculateProgress(selectedSession)}%
                                            </span>
                                        </div>

                                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <span className="text-gray-500">Start:</span>
                                                <span className="font-medium text-gray-700 ml-1">{formatDate(selectedSession.startDate)}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">End:</span>
                                                <span className="font-medium text-gray-700 ml-1">{formatDate(selectedSession.endDate)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                        <h4 className="text-sm font-medium text-gray-500 mb-3">Key Metrics</h4>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                                                <p className="text-xl font-bold text-blue-600">{selectedSession.proposalCount}</p>
                                                <p className="text-xs text-gray-500 mt-1">Proposals</p>
                                            </div>
                                            <div className="text-center p-3 bg-green-50 rounded-lg">
                                                <p className="text-xl font-bold text-green-600">{selectedSession.approvedCount}</p>
                                                <p className="text-xs text-gray-500 mt-1">Approved</p>
                                            </div>
                                            <div className="text-center p-3 bg-purple-50 rounded-lg">
                                                <p className="text-xl font-bold text-purple-600">{selectedSession.participantCount}</p>
                                                <p className="text-xs text-gray-500 mt-1">Participants</p>
                                            </div>
                                        </div>

                                        {/* Approval ratio */}
                                        <div className="mt-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-gray-500">Approval Ratio</span>
                                                <span className="text-xs font-medium text-gray-700">
                                                    {selectedSession.proposalCount > 0
                                                        ? Math.round((selectedSession.approvedCount / selectedSession.proposalCount) * 100)
                                                        : 0}%
                                                </span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-2 bg-green-500 rounded-full"
                                                    style={{
                                                        width: `${selectedSession.proposalCount > 0
                                                            ? ((selectedSession.approvedCount / selectedSession.proposalCount) * 100)
                                                            : 0}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Session Details Card */}
                                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="text-sm font-medium text-gray-500 mb-3">Session Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500">Start Date</p>
                                            <p className="font-medium">{formatDate(selectedSession.startDate)}</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500">End Date</p>
                                            <p className="font-medium">{formatDate(selectedSession.endDate)}</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500">Duration</p>
                                            <p className="font-medium">
                                                {Math.ceil((new Date(selectedSession.endDate) - new Date(selectedSession.startDate)) / (1000 * 60 * 60 * 24))} days
                                            </p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500">Created By</p>
                                            <p className="font-medium">{selectedSession.createdBy}</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500">Created On</p>
                                            <p className="font-medium">{formatDate(selectedSession.createdAt)}</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500">Last Updated</p>
                                            <p className="font-medium">{formatDate(selectedSession.updatedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {detailTab === "timeline" && (
                            <div className="space-y-6">
                                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="text-sm font-medium text-gray-500 mb-4">Timeline Milestones</h4>

                                    <div className="relative pl-8">
                                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-100"></div>

                                        {[
                                            { date: selectedSession.startDate, label: "Session Start", icon: MdOutlineSchedule, status: 'completed' },
                                            { date: selectedSession.proposalDeadline, label: "Proposal Submission Deadline", icon: MdDescription, status: 'active' },
                                            { date: selectedSession.reviewDeadline, label: "Review Period End", icon: MdCheckCircle, status: 'upcoming' },
                                            { date: selectedSession.progressReportDeadline, label: "Progress Report Deadline", icon: MdAssignment, status: 'upcoming' },
                                            { date: selectedSession.finalReportDeadline, label: "Final Report Deadline", icon: MdAssignmentTurnedIn, status: 'upcoming' },
                                            { date: selectedSession.endDate, label: "Session End", icon: MdOutlineSchedule, status: 'upcoming' },
                                        ].map((item, idx) => {
                                            const now = new Date();
                                            const itemDate = new Date(item.date);

                                            // Determine status based on current date
                                            let status = 'upcoming';
                                            if (now > itemDate) status = 'completed';
                                            else if (idx > 0 && now > new Date(selectedSession.startDate) && now < itemDate) status = 'active';

                                            const statusColors = {
                                                completed: "bg-green-500 text-white",
                                                active: "bg-blue-500 text-white",
                                                upcoming: "bg-gray-200 text-gray-700"
                                            };

                                            const statusBadgeColors = {
                                                completed: "bg-green-100 text-green-800",
                                                active: "bg-blue-100 text-blue-800",
                                                upcoming: "bg-gray-100 text-gray-800"
                                            };

                                            return (
                                                <div key={idx} className="mb-8 relative">
                                                    <div className={`absolute left-0 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center ${statusColors[status]}`}>
                                                        <item.icon className="h-3 w-3" />
                                                    </div>
                                                    <div className="ml-6">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="text-md font-medium text-gray-800">{item.label}</h4>
                                                            <div className={`text-xs font-medium px-2 py-0.5 rounded ${statusBadgeColors[status]}`}>
                                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {status === 'completed' ? 'Completed on time' :
                                                                status === 'active' ? 'In progress' :
                                                                    `Coming up in ${Math.ceil((itemDate - now) / (1000 * 60 * 60 * 24))} days`}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {detailTab === "reviewers" && (
                            <div className="space-y-6">
                                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="text-sm font-medium text-gray-500 mb-4">Assigned Reviewers</h4>

                                    {selectedSession.reviewers.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {selectedSession.reviewers.map(reviewer => (
                                                <div key={reviewer.userId} className="flex p-3 bg-gray-50 rounded-lg items-center">
                                                    <img
                                                        src={reviewer.avatar}
                                                        alt={reviewer.userName}
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                                                    />
                                                    <div className="ml-3">
                                                        <p className="font-medium text-gray-900">{reviewer.userName}</p>
                                                        <div className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1
                                                            ${reviewer.role === 'lead' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                            {reviewer.role === 'lead' ? 'Lead Reviewer' : 'Member'}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                                            <MdPeople className="mx-auto h-12 w-12 text-gray-400" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No reviewers assigned</h3>
                                            <p className="mt-1 text-sm text-gray-500">This session doesn't have any reviewers yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions Footer */}
                    <div className="border-t border-gray-200 p-6 flex justify-end gap-3 bg-white">
                        <button
                            onClick={() => setSelectedSession(null)}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Close
                        </button>

                        {selectedSession.status === "draft" && (
                            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center">
                                <MdCheckCircle className="mr-2 h-5 w-5" />
                                Activate Session
                            </button>
                        )}

                        {selectedSession.status === "active" && (
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
                                onClick={() => {
                                    setSelectedSession(null);
                                    handleEditSession(selectedSession);
                                }}
                            >
                                <MdEdit className="mr-2 h-5 w-5" />
                                Edit Session
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full px-4 pb-8">
            {/* Header */}
            <div className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center">
                <div>
                    {/* Conditionally render title based on whether editing */}
                    <h1 className="text-2xl font-bold text-gray-800">
                        {editingSessionData ? `Edit Session: ${editingSessionData.name}` : "Session Management"}
                    </h1>
                    <p className="text-gray-600">
                        {editingSessionData ? "Modify session details and configuration" : "Manage research proposal sessions and timelines"}
                    </p>
                </div>
                {/* Hide Create button when editing */}
                {!editingSessionData && (
                    <button
                        onClick={handleCreateSession}
                        className="mt-4 lg:mt-0 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <MdAdd className="h-5 w-5 mr-2" />
                        Create New Session
                    </button>
                )}
            </div>

            {/* Tabs - Hide when editing */}
            {!editingSessionData && (
                <div className="mb-6">
                    <div className="flex gap-2 border-b border-gray-200">
                        <TabButton value="overview" icon={MdAnalytics} label="Overview" />
                        <TabButton value="calendar" icon={MdCalendarToday} label="Calendar" />
                        <TabButton value="sessions" icon={MdList} label="Session List" />
                        <TabButton
                            value="configuration"
                            icon={MdSettings}
                            label="Configuration"
                            disabled={!currentSession || currentSession.status !== "active"} // Updated disabled logic
                        />
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className="mt-6">
                {/* Render Edit View if editingSessionData exists */}
                {editingSessionData ? (
                    <EditSessionView />
                ) : (
                    <>
                        {/* Original Tab Content */}
                        {activeTab === "overview" && (
                            <div className="space-y-6">
                                {/* Session Status Card */}
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">Current Session</h2>
                                            <p className="text-gray-500 mt-1">{currentSession?.description}</p>
                                        </div>
                                        {currentSession && renderStatusBadge(currentSession.status)}
                                    </div>

                                    {/* Timeline Progress */}
                                    <div className="relative pt-4">
                                        <div className="flex items-center mb-2">
                                            <div className="flex-1">
                                                <div className="h-2 bg-gray-200 rounded-full">
                                                    <div
                                                        className="h-2 bg-blue-500 rounded-full"
                                                        style={{ width: `${calculateProgress(currentSession)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className="ml-4 text-sm text-gray-600">
                                                {calculateProgress(currentSession)}%
                                            </span>
                                        </div>

                                        {/* Timeline Markers */}
                                        <div className="grid grid-cols-4 gap-4 mt-6">
                                            {[
                                                { date: currentSession?.startDate, label: "Start" },
                                                { date: currentSession?.proposalDeadline, label: "Proposals" },
                                                { date: currentSession?.progressReportDeadline, label: "Progress" },
                                                { date: currentSession?.endDate, label: "End" },
                                            ].map((milestone, idx) => (
                                                <div key={idx} className="text-center">
                                                    <div className="text-sm font-medium text-gray-800">{milestone.label}</div>
                                                    <div className="text-xs text-gray-500">{formatDate(milestone.date)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {renderMetricCard(
                                        <MdDescription className="h-6 w-6 text-blue-500" />,
                                        "Total Proposals",
                                        currentSession?.proposalCount || 0,
                                        "+12% this session"
                                    )}
                                    {renderMetricCard(
                                        <MdCheckCircle className="h-6 w-6 text-green-500" />,
                                        "Approved Proposals",
                                        currentSession?.approvedCount || 0,
                                        "+5% this session"
                                    )}
                                    {renderMetricCard(
                                        <MdPeople className="h-6 w-6 text-purple-500" />,
                                        "Total Participants",
                                        currentSession?.participantCount || 0
                                    )}
                                    {renderMetricCard(
                                        <MdTimeline className="h-6 w-6 text-amber-500" />,
                                        "Days Remaining",
                                        currentSession ? Math.max(0, Math.ceil((new Date(currentSession.endDate) - new Date()) / (1000 * 60 * 60 * 24))) : 0
                                    )}
                                </div>

                                {/* Reviewers Section */}
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Assigned Reviewers</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {currentSession?.reviewers.map((reviewer) => (
                                            <div key={reviewer.userId} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
                                                <img
                                                    src={reviewer.avatar}
                                                    alt={reviewer.userName}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <div className="font-medium text-gray-800">{reviewer.userName}</div>
                                                    <div className="text-sm text-gray-500 capitalize">{reviewer.role}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Add Analytics Graph */}
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Analytics</h3>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        {/* Main bar chart */}
                                        <div className="lg:col-span-2">
                                            <div className="h-80">
                                                <Chart
                                                    options={getAnalyticsChartOptions()}
                                                    series={getAnalyticsChartSeries()}
                                                    type="bar"
                                                    height="100%"
                                                />
                                            </div>
                                        </div>

                                        {/* Approval ratio donut chart */}
                                        <div className="lg:col-span-1">
                                            <div className="h-80">
                                                <h4 className="text-sm font-medium text-gray-700 mb-2 text-center">Current Session Approval Ratio</h4>
                                                <Chart
                                                    options={getApprovalRatioOptions()}
                                                    series={getApprovalRatioSeries()}
                                                    type="donut"
                                                    height="90%"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                            <li>Total proposals increased by 12% compared to last session</li>
                                            <li>Approval rate is currently at {Math.round((currentSession?.approvedCount / currentSession?.proposalCount) * 100) || 0}%</li>
                                            <li>Average review time: 6 days</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Session Timeline */}
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Timeline</h3>
                                    <div className="relative pl-8">
                                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-100"></div>

                                        {[
                                            { date: currentSession?.startDate, label: "Session Start", icon: MdOutlineSchedule, status: 'completed' },
                                            { date: currentSession?.proposalDeadline, label: "Proposal Submission Deadline", icon: MdDescription, status: 'active' },
                                            { date: currentSession?.reviewDeadline, label: "Review Period End", icon: MdCheckCircle, status: 'upcoming' },
                                            { date: currentSession?.progressReportDeadline, label: "Progress Report Deadline", icon: MdAssignment, status: 'upcoming' },
                                            { date: currentSession?.finalReportDeadline, label: "Final Report Deadline", icon: MdAssignmentTurnedIn, status: 'upcoming' },
                                            { date: currentSession?.endDate, label: "Session End", icon: MdOutlineSchedule, status: 'upcoming' },
                                        ].map((item, idx) => {
                                            const statusColors = {
                                                completed: "bg-green-500 text-white",
                                                active: "bg-blue-500 text-white",
                                                upcoming: "bg-gray-200 text-gray-700"
                                            };

                                            return (
                                                <div key={idx} className="mb-8 relative">
                                                    <div className={`absolute left-0 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center ${statusColors[item.status]}`}>
                                                        <item.icon className="h-3 w-3" />
                                                    </div>
                                                    <div className="ml-6">
                                                        <h4 className="text-md font-medium text-gray-800">{item.label}</h4>
                                                        <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                                                        <div className={`mt-1 text-xs font-medium inline-block px-2 py-0.5 rounded ${item.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                            item.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "calendar" && (
                            <CalendarView />
                        )}

                        {activeTab === "sessions" && (
                            <SessionsTable />
                        )}

                        {activeTab === "configuration" && (
                            <div className="space-y-6">
                                <ConfigMenu />
                                {renderConfigContent()}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Create New Session Modal (kept as modal) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"> {/* Ensure high z-index */}
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Create New Session</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Session Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., Session 2025-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows="3"
                                    placeholder="Brief description of this session"
                                ></textarea>
                            </div>

                            <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                                <p className="text-amber-800 text-sm">
                                    Note: Only one active session allowed at a time.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Handle create logic
                                    setIsModalOpen(false);
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Create Session
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Replace the Session Details Modal with enhanced version */}
            {selectedSession && <SessionDetailsModal />}
        </div>
    );
};

export default SessionManagement;
