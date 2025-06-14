import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Card from "components/card";
import "./style.css";
import { format, isWithinInterval, parseISO, addDays, isSameDay, differenceInDays } from 'date-fns';
import {
    MdOutlineCalendarToday,
    MdOutlineEvent,
    MdOutlineEventAvailable,
    MdOutlineEventBusy,
    MdOutlineArrowDropDown,
    MdOutlineFilterList,
    MdOutlineAdd,
    MdOutlineSearch,
    MdOutlineVisibility,
    MdOutlineEdit,
    MdOutlineDeleteOutline,
    MdPlayArrow,
    MdOutlineClose,
    MdChevronLeft,
    MdChevronRight,
    MdOutlineTimer,
    MdOutlineInsertChart,
    MdOutlinePeople,
    MdOutlineSettings,
    MdOutlineInfo,
    MdOutlineWatchLater,
    MdOutlineAssignment,
    MdOutlineAssignmentTurnedIn,
    MdOutlineMoreTime,
    MdOutlineTrendingUp
} from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';

const SessionCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState('month');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [sessionsData, setSessionsData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });

        // Fetch dummy data for sessions
        const fetchSessions = () => {
            // This would be replaced with actual API calls
            setSessionsData(generateDummySessions());
            // Calculate upcoming events from the sessions
            calculateUpcomingEvents(generateDummySessions());
        };

        fetchSessions();
    }, []);

    const calculateUpcomingEvents = (sessions) => {
        const now = new Date();
        const upcoming = [];

        sessions.forEach(session => {
            // Add session start if it's in the future
            if (new Date(session.startDate) > now) {
                upcoming.push({
                    name: `${session.name} Starts`,
                    date: new Date(session.startDate),
                    type: 'session-start',
                    sessionId: session._id
                });
            }

            // Add proposal deadline if it's in the future
            if (new Date(session.proposalDeadline) > now) {
                upcoming.push({
                    name: `${session.name} - Proposal Deadline`,
                    date: new Date(session.proposalDeadline),
                    type: 'proposal-deadline',
                    sessionId: session._id
                });
            }

            // Add other deadlines similarly
            if (new Date(session.reviewDeadline) > now) {
                upcoming.push({
                    name: `${session.name} - Review Deadline`,
                    date: new Date(session.reviewDeadline),
                    type: 'review-deadline',
                    sessionId: session._id
                });
            }

            if (new Date(session.progressReportDeadline) > now) {
                upcoming.push({
                    name: `${session.name} - Progress Report Deadline`,
                    date: new Date(session.progressReportDeadline),
                    type: 'progress-report-deadline',
                    sessionId: session._id
                });
            }

            if (new Date(session.finalReportDeadline) > now) {
                upcoming.push({
                    name: `${session.name} - Final Report Deadline`,
                    date: new Date(session.finalReportDeadline),
                    type: 'final-report-deadline',
                    sessionId: session._id
                });
            }

            if (new Date(session.endDate) > now) {
                upcoming.push({
                    name: `${session.name} Ends`,
                    date: new Date(session.endDate),
                    type: 'session-end',
                    sessionId: session._id
                });
            }
        });

        // Sort by date
        upcoming.sort((a, b) => a.date - b.date);

        // Take only the next 5 events
        setUpcomingEvents(upcoming.slice(0, 5));
    };

    const generateDummySessions = () => {
        return [
            {
                _id: "s1",
                name: "Session 2025-1",
                description: "First research proposal session of 2025",
                status: "active",
                startDate: "2025-04-01T00:00:00Z",
                endDate: "2025-10-31T23:59:59Z",
                proposalDeadline: "2025-05-15T23:59:59Z",
                reviewDeadline: "2025-06-15T23:59:59Z",
                progressReportDeadline: "2025-08-15T23:59:59Z",
                finalReportDeadline: "2025-10-15T23:59:59Z",
                proposalCount: 48,
                approvedCount: 35,
                participantCount: 62,
                reviewers: [
                    { userId: "u1", role: "lead", name: "Dr. John Smith" },
                    { userId: "u2", role: "member", name: "Dr. Jane Doe" }
                ],
                createdBy: "u3",
                createdAt: "2025-03-15T10:30:00Z",
                updatedAt: "2025-04-01T09:00:00Z"
            },
            {
                _id: "s2",
                name: "Special Summer Session 2025",
                description: "Summer research grants for innovative projects",
                status: "draft",
                startDate: "2025-06-01T00:00:00Z",
                endDate: "2025-09-30T23:59:59Z",
                proposalDeadline: "2025-06-15T23:59:59Z",
                reviewDeadline: "2025-06-30T23:59:59Z",
                progressReportDeadline: "2025-08-15T23:59:59Z",
                finalReportDeadline: "2025-09-15T23:59:59Z",
                proposalCount: 0,
                approvedCount: 0,
                participantCount: 0,
                reviewers: [
                    { userId: "u2", role: "lead", name: "Dr. Jane Doe" },
                    { userId: "u4", role: "member", name: "Prof. Michael Brown" }
                ],
                createdBy: "u3",
                createdAt: "2025-05-01T14:20:00Z",
                updatedAt: "2025-05-01T14:20:00Z"
            },
            {
                _id: "s3",
                name: "Session 2024-2",
                description: "Second research proposal session of 2024",
                status: "completed",
                startDate: "2024-10-01T00:00:00Z",
                endDate: "2025-03-31T23:59:59Z",
                proposalDeadline: "2024-11-15T23:59:59Z",
                reviewDeadline: "2024-12-15T23:59:59Z",
                progressReportDeadline: "2025-02-15T23:59:59Z",
                finalReportDeadline: "2025-03-15T23:59:59Z",
                proposalCount: 52,
                approvedCount: 38,
                participantCount: 64,
                reviewers: [
                    { userId: "u1", role: "lead", name: "Dr. John Smith" },
                    { userId: "u4", role: "member", name: "Prof. Michael Brown" }
                ],
                createdBy: "u3",
                createdAt: "2024-09-15T11:30:00Z",
                updatedAt: "2025-04-05T10:00:00Z"
            }
        ];
    };

    const filterSessions = () => {
        let filtered = sessionsData;

        // Filter by status if not 'all'
        if (filterStatus !== 'all') {
            filtered = filtered.filter(session => session.status === filterStatus);
        }

        // Filter by search query if not empty
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(session =>
                session.name.toLowerCase().includes(query) ||
                session.description.toLowerCase().includes(query)
            );
        }

        return filtered;
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return <MdOutlineEventAvailable className="text-green-500" />;
            case 'completed':
                return <MdOutlineEventBusy className="text-blue-500" />;
            case 'cancelled':
                return <MdOutlineClose className="text-red-500" />;
            case 'draft':
                return <MdOutlineEvent className="text-amber-500" />;
            default:
                return <MdOutlineEvent className="text-gray-500" />;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'completed':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            case 'draft':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const handleDateClick = (value) => {
        setDate(value);

        // Check if there are any sessions starting on this date
        const sessionsOnDate = sessionsData.filter(session =>
            isSameDay(new Date(session.startDate), value) ||
            isSameDay(new Date(session.endDate), value) ||
            isSameDay(new Date(session.proposalDeadline), value) ||
            isSameDay(new Date(session.reviewDeadline), value) ||
            isSameDay(new Date(session.progressReportDeadline), value) ||
            isSameDay(new Date(session.finalReportDeadline), value)
        );

        if (sessionsOnDate.length > 0) {
            setSelectedSession(sessionsOnDate[0]);
            setShowDetailsModal(true);
        }
    };

    // Session metrics for the overview section
    const getSessionMetrics = () => {
        const now = new Date();
        const active = sessionsData.filter(s => s.status === 'active').length;
        const draft = sessionsData.filter(s => s.status === 'draft').length;
        const completed = sessionsData.filter(s => s.status === 'completed').length;
        const total = sessionsData.length;

        // Find closest deadline
        let closestDeadline = null;
        let closestDeadlineDate = null;
        let daysRemaining = Infinity;

        sessionsData.forEach(session => {
            if (session.status === 'active') {
                const deadlines = [
                    { name: "Proposal Submission", date: new Date(session.proposalDeadline) },
                    { name: "Review Completion", date: new Date(session.reviewDeadline) },
                    { name: "Progress Report", date: new Date(session.progressReportDeadline) },
                    { name: "Final Report", date: new Date(session.finalReportDeadline) }
                ];

                deadlines.forEach(deadline => {
                    if (deadline.date > now) {
                        const days = differenceInDays(deadline.date, now);
                        if (days < daysRemaining) {
                            daysRemaining = days;
                            closestDeadline = deadline.name;
                            closestDeadlineDate = deadline.date;
                        }
                    }
                });
            }
        });

        return {
            active,
            draft,
            completed,
            total,
            closestDeadline,
            closestDeadlineDate,
            daysRemaining
        };
    };

    // Enhanced tile content with better event indicators
    const tileContent = ({ date, view }) => {
        if (view !== 'month') return null;

        const events = getEventsForDate(date);
        if (events.length === 0) return null;

        return (
            <div className="event-indicators">
                {events.slice(0, 4).map((event, index) => ( // Limit to 4 events per day for clean UI
                    <div
                        key={index}
                        className="event-indicator"
                        style={{
                            backgroundColor: event.color,
                        }}
                        title={event.title}
                    />
                ))}
                {events.length > 4 && (
                    <div
                        className="text-xs text-gray-500 dark:text-gray-400 ml-1"
                        title="More events"
                        style={{ fontSize: '8px' }}
                    >
                        +{events.length - 4}
                    </div>
                )}
            </div>
        );
    };

    // Helper to get events for a specific date
    const getEventsForDate = (date) => {
        const events = [];

        sessionsData.forEach(session => {
            // Session active period
            if (isWithinInterval(date, {
                start: new Date(session.startDate),
                end: new Date(session.endDate)
            })) {
                events.push({
                    color: '#22c55e', // green
                    title: `${session.name} Active`
                });
            }

            // Check specific deadlines
            if (isSameDay(date, new Date(session.proposalDeadline))) {
                events.push({
                    color: '#3b82f6', // blue
                    title: 'Proposal Deadline'
                });
            }

            if (isSameDay(date, new Date(session.reviewDeadline))) {
                events.push({
                    color: '#a855f7', // purple
                    title: 'Review Deadline'
                });
            }

            if (isSameDay(date, new Date(session.progressReportDeadline))) {
                events.push({
                    color: '#f59e0b', // amber
                    title: 'Progress Report'
                });
            }

            if (isSameDay(date, new Date(session.finalReportDeadline))) {
                events.push({
                    color: '#ef4444', // red
                    title: 'Final Report'
                });
            }
        });

        return events;
    };

    // Custom navigation for the calendar
    const calendarNavigation = ({ date, view, label, locale, onChange }) => {
        const handlePrev = () => {
            const newDate = new Date(date);
            if (view === 'month') {
                newDate.setMonth(date.getMonth() - 1);
            } else if (view === 'year') {
                newDate.setFullYear(date.getFullYear() - 1);
            }
            onChange(newDate);
        };

        const handleNext = () => {
            const newDate = new Date(date);
            if (view === 'month') {
                newDate.setMonth(date.getMonth() + 1);
            } else if (view === 'year') {
                newDate.setFullYear(date.getFullYear() + 1);
            }
            onChange(newDate);
        };

        return (
            <div className="flex items-center justify-between w-full px-2">
                <button
                    onClick={handlePrev}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-navy-700 text-gray-600 dark:text-gray-400 transition-colors"
                >
                    <MdChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-base font-semibold text-navy-700 dark:text-white">
                    {label}
                </span>
                <button
                    onClick={handleNext}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-navy-700 text-gray-600 dark:text-gray-400 transition-colors"
                >
                    <MdChevronRight className="h-5 w-5" />
                </button>
            </div>
        );
    };

    // CSS variables for theme colors - allows light/dark mode support
    const cssVariables = {
        '--color-gray-100': '#f3f4f6',
        '--color-gray-200': '#e5e7eb',
        '--color-gray-300': '#d1d5db',
        '--color-gray-400': '#9ca3af',
        '--color-gray-500': '#6b7280',
        '--color-gray-600': '#4b5563',
        '--color-gray-700': '#374151',
        '--color-navy-700': '#1e3a8a',
        '--color-navy-800': '#172554',
        '--color-navy-900': '#0f172a',
        '--color-blue-50': '#eff6ff',
        '--color-blue-300': '#93c5fd',
        '--color-blue-500': '#3b82f6',
        '--color-blue-700': '#1d4ed8',
        '--color-blue-900': '#1e3a8a',
        '--color-white': '#ffffff',
    };

    const renderDetailsModal = () => {
        if (!selectedSession) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailsModal(false)}>
                <div className="bg-white dark:bg-navy-800 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden" onClick={e => e.stopPropagation()} data-aos="zoom-in">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-navy-700 dark:text-white flex items-center">
                                {getStatusIcon(selectedSession.status)}
                                <span className="ml-2">{selectedSession.name}</span>
                            </h3>
                            <button
                                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700"
                                onClick={() => setShowDetailsModal(false)}
                            >
                                <MdOutlineClose className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <span className={`text-xs font-semibold inline-block py-1 px-2 rounded-full ${getStatusClass(selectedSession.status)}`}>
                                {selectedSession.status.charAt(0).toUpperCase() + selectedSession.status.slice(1)}
                            </span>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">{selectedSession.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 dark:bg-navy-900 p-3 rounded-lg">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</p>
                                <p className="text-base font-semibold text-navy-700 dark:text-white">
                                    {format(new Date(selectedSession.startDate), 'PP')}
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-navy-900 p-3 rounded-lg">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</p>
                                <p className="text-base font-semibold text-navy-700 dark:text-white">
                                    {format(new Date(selectedSession.endDate), 'PP')}
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Important Deadlines</h4>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500 mr-2"></div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mr-2">Proposal Deadline:</p>
                                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                                        {format(new Date(selectedSession.proposalDeadline), 'PP')}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-purple-500 mr-2"></div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mr-2">Review Deadline:</p>
                                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                                        {format(new Date(selectedSession.reviewDeadline), 'PP')}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mr-2">Progress Report Deadline:</p>
                                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                                        {format(new Date(selectedSession.progressReportDeadline), 'PP')}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mr-2">Final Report Deadline:</p>
                                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                                        {format(new Date(selectedSession.finalReportDeadline), 'PP')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg text-center">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Proposals</p>
                                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{selectedSession.proposalCount}</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg text-center">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
                                <p className="text-xl font-bold text-green-600 dark:text-green-400">{selectedSession.approvedCount}</p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-lg text-center">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Participants</p>
                                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{selectedSession.participantCount}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Reviewers</h4>
                            <div className="space-y-2">
                                {selectedSession.reviewers.map((reviewer, index) => (
                                    <div key={index} className="flex items-center bg-gray-50 dark:bg-navy-900 p-2 rounded-lg">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                                            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">{reviewer.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-navy-700 dark:text-white">{reviewer.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{reviewer.role} Reviewer</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200 dark:border-navy-700">
                            {selectedSession.status === 'draft' && (
                                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center">
                                    <MdPlayArrow className="mr-1" />
                                    Start Session
                                </button>
                            )}
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center">
                                <MdOutlineEdit className="mr-1" />
                                Edit
                            </button>
                            {selectedSession.status !== 'active' && (
                                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center">
                                    <MdOutlineDeleteOutline className="mr-1" />
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderCreateSessionModal = () => {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowCreateModal(false)}>
                <div className="bg-white dark:bg-navy-800 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden" onClick={e => e.stopPropagation()} data-aos="zoom-in">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-navy-700 dark:text-white flex items-center">
                                <MdOutlineAdd className="mr-2 text-blue-500" />
                                Create New Session
                            </h3>
                            <button
                                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700"
                                onClick={() => setShowCreateModal(false)}
                            >
                                <MdOutlineClose className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-sm text-gray-600 dark:text-gray-300 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg border-l-4 border-amber-500 mb-4">
                                <strong>Note:</strong> Only one active session is allowed at a time. New sessions will be created in draft status.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Session Name*
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., Session 2025-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Brief description of this session"
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Start Date*
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            End Date*
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Proposal Deadline*
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Review Deadline*
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Progress Report Deadline*
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Final Report Deadline*
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200 dark:border-navy-700">
                            <button
                                className="px-4 py-2 bg-gray-200 dark:bg-navy-700 hover:bg-gray-300 dark:hover:bg-navy-600 text-gray-800 dark:text-white rounded-lg font-medium"
                                onClick={() => setShowCreateModal(false)}
                            >
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                                Create Session
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Add new timeline styles
    const timelineStyles = `
      .timeline-container {
        position: relative;
        padding-left: 2.5rem;
      }
    
      .timeline-line {
        position: absolute;
        left: 1.25rem;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(180deg, 
          #22c55e 0%,
          #3b82f6 25%,  
          #a855f7 50%,
          #f59e0b 75%,
          #ef4444 90%,
          #6b7280 100%
        );
        opacity: 0.3;
      }
    
      .timeline-item {
        position: relative;
        padding-bottom: 1.5rem;
      }
    
      .timeline-dot {
        position: absolute;
        left: -2.5rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 0 2px currentColor;
      }
    
      .timeline-content {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        padding: 1rem;
        transition: all 0.2s;
      }
    
      .timeline-content:hover {
        transform: translateX(4px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
    
      .dark .timeline-content {
        background: rgba(15, 23, 42, 0.3);
        border-color: rgba(51, 65, 85, 0.5);
      }
    
      .dark .timeline-dot {
        border-color: #0f172a;
      }
    `;

    // Define calendar styles
    const calendarStyles = `
      .custom-calendar {
        width: 100%;
        border: none;
        background-color: transparent;
      }
      
      .react-calendar__tile {
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 8px;
        position: relative;
      }
      
      .react-calendar__tile--now {
        background-color: rgba(59, 130, 246, 0.1);
      }
      
      .react-calendar__tile--active {
        background-color: rgba(59, 130, 246, 0.2);
        color: var(--color-navy-700);
      }
      
      .react-calendar__month-view__days__day--weekend {
        color: #ef4444;
      }
      
      .dark .react-calendar__month-view__days__day--weekend {
        color: #f87171;
      }
      
      .react-calendar__tile--active:enabled:hover,
      .react-calendar__tile--active:enabled:focus {
        background-color: rgba(59, 130, 246, 0.3);
      }
      
      .react-calendar__navigation {
        margin-bottom: 0;
      }
      
      .event-indicators {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 4px;
      }
      
      .event-indicator {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin: 0 1px;
      }
      
      .dark .react-calendar {
        background-color: transparent;
        color: #e5e7eb;
      }
      
      .dark .react-calendar__tile--now {
        background-color: rgba(59, 130, 246, 0.2);
      }
      
      .dark .react-calendar__tile--active {
        background-color: rgba(59, 130, 246, 0.3);
        color: #ffffff;
      }
      
      .dark .react-calendar__navigation button:disabled {
        background-color: transparent;
      }
      
      .dark .react-calendar__tile:disabled {
        background-color: transparent;
        color: #6b7280;
      }
    `;

    // Replace the timeline section in the render method
    const renderTimeline = (sessions) => {
        return sessions.map((session, index) => (
            <div key={index} className="timeline-container" data-aos="fade-left" data-aos-delay={100 * index}>
                <div className="timeline-line"></div>

                {/* Session Start */}
                <div className="timeline-item">
                    <div className="timeline-dot text-green-500"></div>
                    <div className="timeline-content group">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-sm font-medium text-navy-700 dark:text-white flex items-center">
                                    Session Start
                                    <span className="ml-2 text-xs text-gray-500">
                                        {format(new Date(session.startDate), 'MMM d, yyyy')}
                                    </span>
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {session.name}
                                </p>
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                Active
                            </span>
                        </div>
                    </div>
                </div>

                {/* Proposal Deadline */}
                <div className="timeline-item">
                    <div className="timeline-dot text-blue-500"></div>
                    <div className="timeline-content">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-sm font-medium text-navy-700 dark:text-white flex items-center">
                                    Proposal Deadline
                                    <span className="ml-2 text-xs text-gray-500">
                                        {format(new Date(session.proposalDeadline), 'MMM d, yyyy')}
                                    </span>
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Final date for proposal submissions
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                    {session.proposalCount} Proposals
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review Deadline */}
                <div className="timeline-item">
                    <div className="timeline-dot text-purple-500"></div>
                    <div className="timeline-content">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-sm font-medium text-navy-700 dark:text-white flex items-center">
                                    Review Deadline
                                    <span className="ml-2 text-xs text-gray-500">
                                        {format(new Date(session.reviewDeadline), 'MMM d, yyyy')}
                                    </span>
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Review completion target date
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                                    {session.approvedCount} Approved
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Report */}
                <div className="timeline-item">
                    <div className="timeline-dot text-amber-500"></div>
                    <div className="timeline-content">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-sm font-medium text-navy-700 dark:text-white flex items-center">
                                    Progress Report
                                    <span className="ml-2 text-xs text-gray-500">
                                        {format(new Date(session.progressReportDeadline), 'MMM d, yyyy')}
                                    </span>
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Mid-term progress evaluation
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Report */}
                <div className="timeline-item">
                    <div className="timeline-dot text-red-500"></div>
                    <div className="timeline-content">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-sm font-medium text-navy-700 dark:text-white flex items-center">
                                    Final Report
                                    <span className="ml-2 text-xs text-gray-500">
                                        {format(new Date(session.finalReportDeadline), 'MMM d, yyyy')}
                                    </span>
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Final submission deadline
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Session End */}
                <div className="timeline-item">
                    <div className="timeline-dot text-gray-500"></div>
                    <div className="timeline-content">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-sm font-medium text-navy-700 dark:text-white flex items-center">
                                    Session End
                                    <span className="ml-2 text-xs text-gray-500">
                                        {format(new Date(session.endDate), 'MMM d, yyyy')}
                                    </span>
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Session completion and closure
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="session-calendar w-full">
            {/* Page Header with title */}
            <div className="flex flex-col items-start mb-8" data-aos="fade-down">
                <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-2">
                    <MdOutlineCalendarToday className="inline-block mr-2 h-6 w-6" />
                    Session Management
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage research proposal sessions, deadlines, and reviewers in one place.
                </p>
            </div>

            {/* Session Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" data-aos="fade-up" data-aos-delay="100">
                <Card extra="!p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mr-4">
                            <MdOutlineEventAvailable className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Sessions</p>
                            <h3 className="text-xl font-bold text-navy-700 dark:text-white">{getSessionMetrics().active}</h3>
                        </div>
                    </div>
                </Card>

                <Card extra="!p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                    <div className="flex items-center">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-4">
                            <MdOutlineEvent className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Draft Sessions</p>
                            <h3 className="text-xl font-bold text-navy-700 dark:text-white">{getSessionMetrics().draft}</h3>
                        </div>
                    </div>
                </Card>

                <Card extra="!p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                            <MdOutlineEventBusy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Sessions</p>
                            <h3 className="text-xl font-bold text-navy-700 dark:text-white">{getSessionMetrics().completed}</h3>
                        </div>
                    </div>
                </Card>

                <Card extra="!p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4">
                            <MdOutlineTimer className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Next Deadline</p>
                            {getSessionMetrics().closestDeadline ? (
                                <>
                                    <h3 className="text-lg font-bold text-navy-700 dark:text-white truncate">
                                        {getSessionMetrics().closestDeadline}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {getSessionMetrics().daysRemaining} days remaining
                                    </p>
                                </>
                            ) : (
                                <h3 className="text-lg font-bold text-navy-700 dark:text-white">None</h3>
                            )}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Control Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 bg-white dark:bg-navy-800 p-4 rounded-xl shadow-sm" data-aos="fade-down">
                <div className="flex flex-wrap gap-3 mb-3 lg:mb-0">
                    <div className="relative">
                        <input
                            type="text"
                            className="px-3 py-2 pl-10 bg-gray-50 dark:bg-navy-900 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search sessions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <MdOutlineSearch className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400 h-5 w-5" />
                    </div>
                    <select
                        className="px-3 py-2 bg-gray-50 dark:bg-navy-900 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Sessions</option>
                        <option value="active">Active Sessions</option>
                        <option value="draft">Draft Sessions</option>
                        <option value="completed">Completed Sessions</option>
                        <option value="cancelled">Cancelled Sessions</option>
                    </select>
                </div>
                <div className="flex flex-wrap gap-3">
                    <select
                        className="px-3 py-2 bg-gray-50 dark:bg-navy-900 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={view}
                        onChange={(e) => setView(e.target.value)}
                    >
                        <option value="month">Month View</option>
                        <option value="year">Year View</option>
                    </select>
                    <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm flex items-center shadow-sm"
                        onClick={() => setShowCreateModal(true)}
                    >
                        <MdOutlineAdd className="mr-1 h-5 w-5" /> New Session
                    </button>
                </div>
            </div>

            {/* Session Timeline */}
            <div className="mb-6" data-aos="fade-up" data-aos-delay="150">
                <Card extra="!p-5 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                    <style>{timelineStyles}</style>
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineTrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                            Active Session Timeline
                        </h4>
                        {sessionsData.filter(s => s.status === 'active').length > 0 && (
                            <div className="text-xs text-gray-500">
                                Showing active session milestones
                            </div>
                        )}
                    </div>

                    {sessionsData.filter(s => s.status === 'active').length > 0 ? (
                        renderTimeline(sessionsData.filter(s => s.status === 'active'))
                    ) : (
                        <div className="text-center py-8 bg-gray-50 dark:bg-navy-900 rounded-lg">
                            <MdOutlineEvent className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No active sessions at the moment</p>
                            <button
                                className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm inline-flex items-center"
                                onClick={() => setShowCreateModal(true)}
                            >
                                <MdOutlineAdd className="mr-1 h-4 w-4" /> Create Session
                            </button>
                        </div>
                    )}
                </Card>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2" data-aos="fade-up">
                    <Card extra="!p-0 hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
                        <style>{calendarStyles}</style>
                        <div className="calendar-container" style={cssVariables}>
                            <div className="p-4 bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-base font-semibold text-navy-700 dark:text-white">Session Calendar</h4>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setView('month')}
                                            className={`px-3 py-1 text-xs rounded-md transition-colors ${view === 'month'
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-navy-700 dark:text-gray-400'
                                                }`}
                                        >
                                            Month
                                        </button>
                                        <button
                                            onClick={() => setView('year')}
                                            className={`px-3 py-1 text-xs rounded-md transition-colors ${view === 'year'
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-navy-700 dark:text-gray-400'
                                                }`}
                                        >
                                            Year
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Calendar
                                onChange={handleDateClick}
                                value={date}
                                view={view}
                                tileContent={tileContent}
                                prevLabel={<MdChevronLeft className="h-5 w-5" />}
                                nextLabel={<MdChevronRight className="h-5 w-5" />}
                                className="custom-calendar"
                            />

                            <div className="p-4 bg-white dark:bg-navy-800 border-t border-gray-200 dark:border-navy-700">
                                <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Legend</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                                    {[
                                        { color: '#22c55e', label: 'Active Session' },
                                        { color: '#3b82f6', label: 'Proposal Due' },
                                        { color: '#a855f7', label: 'Review Due' },
                                        { color: '#f59e0b', label: 'Progress Report' },
                                        { color: '#ef4444', label: 'Final Report' }
                                    ].map((item, index) => (
                                        <div key={index}
                                            className="flex items-center p-2 rounded-md text-gray-700 dark:text-gray-300 text-xs"
                                        >
                                            <div
                                                className="h-2 w-2 rounded-sm mr-2"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar - now only contains Upcoming Events */}
                <div data-aos="fade-left">
                    <Card extra="!p-[20px] hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                        <h4 className="text-base font-medium text-navy-700 dark:text-white mb-4 flex items-center">
                            <MdOutlineTimer className="h-5 w-5 mr-2 text-blue-500" />
                            Upcoming Deadlines
                        </h4>
                        <div className="space-y-3">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event, index) => (
                                    <div key={index} className="bg-gray-50 dark:bg-navy-900 p-3 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                                        <p className="text-sm font-medium text-navy-700 dark:text-white">{event.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                                            <MdOutlineCalendarToday className="h-3.5 w-3.5 mr-1.5" />
                                            {format(new Date(event.date), 'PPP')}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">No upcoming events</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Session Reviewers Overview */}
            <div className="mt-6" data-aos="fade-up" data-aos-delay="200">
                <Card extra="!p-[20px] hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-navy-700">
                    <h4 className="text-base font-medium text-navy-700 dark:text-white mb-4 flex items-center">
                        <MdOutlinePeople className="h-5 w-5 mr-2 text-blue-500" />
                        Active Reviewers
                    </h4>

                    {sessionsData.filter(s => s.status === 'active').length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-navy-900">
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Reviewer</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Role</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Session</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {sessionsData.filter(s => s.status === 'active').flatMap(session =>
                                        session.reviewers.map((reviewer, idx) => (
                                            <tr key={`${session._id}-${idx}`} className="hover:bg-gray-50 dark:hover:bg-navy-900">
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                                                            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">{reviewer.name.charAt(0)}</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-navy-700 dark:text-white">{reviewer.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${reviewer.role === 'lead'
                                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                                                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                                        }`}>
                                                        {reviewer.role.charAt(0).toUpperCase() + reviewer.role.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                    {session.name}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3">
                                                        <MdOutlineEdit className="h-5 w-5" />
                                                    </button>
                                                    <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                                                        <MdOutlineClose className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center py-4">No active reviewers at the moment</p>
                    )}
                </Card>
            </div>

            {/* Details Modal */}
            {showDetailsModal && renderDetailsModal()}

            {/* Create Session Modal */}
            {showCreateModal && renderCreateSessionModal()}
        </div>
    );
};

export default SessionCalendar;
