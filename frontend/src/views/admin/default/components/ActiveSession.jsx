import React, { useState, useEffect, useRef } from "react";
import {
    MdOutlineTimer, MdDateRange, MdAssignment, MdCheck, MdWarning,
    MdCalendarToday, MdFlag, MdInfo, MdKeyboardArrowDown,
    MdSettings, MdDescription, MdAccessTime, MdNotifications,
    MdOutlinePublishedWithChanges, MdOutlineRateReview, MdAssignmentTurnedIn,
    MdOutlineTaskAlt, MdOutlineAssignment, MdTrendingUp, MdAnalytics,
    MdPeople, MdAssessment, MdSchedule, MdBarChart, MdTimeline,
    MdDashboard, MdInsights, MdTrendingDown, MdAutoGraph,
    MdPlayArrow, MdPause, MdChevronRight, MdExpandMore
} from "react-icons/md";
import { HiSparkles, HiClock, HiLightningBolt, HiFire, HiTrendingUp } from "react-icons/hi";
import { FiActivity, FiTarget, FiClock, FiUsers, FiFileText, FiCheckCircle } from "react-icons/fi";
import { BiTrendingUp, BiCalendarEvent, BiStats } from "react-icons/bi";
import { AiOutlineRocket, AiOutlineFire, AiOutlineThunderbolt } from "react-icons/ai";
import Card from "components/card";
import { formatDistance, format, isAfter, isBefore, differenceInDays } from "date-fns";
import { Link } from "react-router-dom";
import { TbFileCheck, TbUsers, TbCalendarStats, TbChartBar, TbTargetArrow } from "react-icons/tb";
import { useSelector } from "react-redux";
import { dashboardService, getAuthToken, isAuthenticated } from "services/dashboardService";

const ActiveSession = ({ apiData }) => {
    const [currentSession, setCurrentSession] = useState(null);
    const [sessionStats, setSessionStats] = useState(null);
    const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextDeadline, setNextDeadline] = useState(null);
    const [expandedSection, setExpandedSection] = useState("timeline");
    const [isVisible, setIsVisible] = useState(false);
    const componentRef = useRef(null);

    // Get auth token from Redux store
    const { token } = useSelector(state => state.auth);

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => observer.disconnect();
    }, []); useEffect(() => {
        const fetchActiveSessionData = async () => {
            try {
                setLoading(true);
                setError(null); if (apiData?.current_session) {
                    console.log('📥 API Data received from props:', apiData);
                    console.log('📊 Current session data:', apiData.current_session);
                    console.log('📈 Session statistics:', apiData.session_statistics);
                    console.log('⏰ Upcoming deadlines:', apiData.upcoming_deadlines);
                    processSessionData(apiData);
                    return;
                }                // Try to use dashboardService first for better authentication handling
                console.log('🔄 Fetching data from dashboard service...');
                const dashboardResult = await dashboardService.getAdminDashboard(token);

                console.log('📡 Dashboard service result:', dashboardResult);
                console.log('✅ Success:', dashboardResult.success);
                console.log('📊 Data available:', !!dashboardResult.data);
                console.log('🎭 Is demo mode:', dashboardResult.isDemo);
                console.log('🔄 Is fallback:', dashboardResult.isFallback);

                if (dashboardResult.success && dashboardResult.data) {
                    console.log('✅ Dashboard data received:', dashboardResult.data);
                    console.log('📊 Current session:', dashboardResult.data.current_session);
                    console.log('📈 Session statistics:', dashboardResult.data.session_statistics);
                    console.log('📅 Overview data:', dashboardResult.data.overview);
                    console.log('⏰ Upcoming deadlines:', dashboardResult.data.upcoming_deadlines);
                    console.log('🔄 Recent activities:', dashboardResult.data.recent_activities);

                    processSessionData(dashboardResult.data);

                    // Set error message if using demo/fallback data but still show the data
                    if (dashboardResult.isDemo || dashboardResult.isFallback) {
                        console.log('⚠️ Using demo/fallback data:', dashboardResult.message);
                        setError(dashboardResult.message || 'Using demo data');
                    }
                    return;
                }

                // Even if dashboard service fails, ensure we have session data
                if (dashboardResult.data) {
                    console.log('📊 Using fallback dashboard data:', dashboardResult.data);
                    processSessionData(dashboardResult.data);
                    setError(dashboardResult.error || 'API connection failed - using fallback data');
                    return;
                }                // Fallback to direct API call if dashboard service fails
                console.log('🔄 Falling back to direct API call...');
                const response = await fetch('/api/analytics/active-session-status', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include'
                });

                console.log('📡 Direct API response status:', response.status);
                console.log('📡 Direct API response ok:', response.ok);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('📥 Direct API result:', result);
                console.log('✅ Direct API success:', result.success);
                console.log('📊 Direct API data:', result.data);

                if (result.success && result.data) {
                    console.log('📊 Processing direct API data...');
                    processSessionData(result.data);
                } else {
                    throw new Error(result.message || 'Failed to fetch session data');
                }
            } catch (error) {
                console.error('❌ Error fetching session data:', error);
                console.error('❌ Error name:', error.name);
                console.error('❌ Error message:', error.message);
                console.error('❌ Error stack:', error.stack);
                setError(error.message);
                // Always ensure we have session data to display, even with errors
                console.log('📊 Loading fallback data due to error...');
                const fallbackData = getFallbackData();
                console.log('📊 Fallback data:', fallbackData);
                processSessionData(fallbackData);
            } finally {
                setLoading(false);
            }
        }; const processSessionData = (data) => {
            console.log('🔄 Processing session data:', data);
            console.log('📊 Data keys:', Object.keys(data));

            if (data.current_session) {
                console.log('✅ Current session found:', data.current_session);
                console.log('📋 Session details:');
                console.log('  - ID:', data.current_session.id);
                console.log('  - Name:', data.current_session.name);
                console.log('  - Status:', data.current_session.status);
                console.log('  - Start Date:', data.current_session.start_date);
                console.log('  - End Date:', data.current_session.end_date);
                console.log('  - Deadlines:', {
                    proposal: data.current_session.proposal_deadline,
                    review: data.current_session.review_deadline,
                    progress: data.current_session.progress_report_deadline,
                    final: data.current_session.final_report_deadline
                });

                const session = {
                    _id: data.current_session.id || "s2025001",
                    name: data.current_session.name || "Research Proposal Session 2025-1",
                    description: data.current_session.description || "Active research proposal session",
                    status: data.current_session.status || "active",
                    startDate: data.current_session.start_date,
                    endDate: data.current_session.end_date,
                    proposalDeadline: data.current_session.proposal_deadline,
                    reviewDeadline: data.current_session.review_deadline,
                    progressReportDeadline: data.current_session.progress_report_deadline,
                    finalReportDeadline: data.current_session.final_report_deadline,
                    proposalCount: data.session_statistics?.submitted_proposals || 0,
                    approvedCount: data.session_statistics?.approved_proposals || 0,
                    participantCount: data.session_statistics?.total_participants || 0,
                    pendingReviews: data.session_statistics?.pending_reviews || 0,
                    completedReviews: data.session_statistics?.completed_reviews || 0
                }; console.log('📊 Processed session object:', session);
                console.log('📈 Session statistics:', data.session_statistics);
                console.log('⏰ Upcoming deadlines:', data.upcoming_deadlines);

                setCurrentSession(session);
                setSessionStats(data.session_statistics || {});
                setUpcomingDeadlines(data.upcoming_deadlines || []);
                findNextDeadline(session);

                console.log('✅ Session data processing completed');
                console.log('📊 Final state will be:', {
                    hasCurrentSession: !!session,
                    sessionName: session.name,
                    sessionStatus: session.status,
                    proposalCount: session.proposalCount,
                    participantCount: session.participantCount
                });
            } else {
                console.warn('⚠️ No current_session found in data');
                console.log('📋 Available data keys:', Object.keys(data));
            }
        };

        const getFallbackData = () => ({
            current_session: {
                id: 1,
                name: "Research Proposal Session 2025-1",
                description: "First research proposal session of 2025",
                status: "active",
                start_date: "2025-04-01T00:00:00Z",
                end_date: "2025-10-31T23:59:59Z",
                proposal_deadline: "2025-05-15T23:59:59Z",
                review_deadline: "2025-06-15T23:59:59Z",
                progress_report_deadline: "2025-08-15T23:59:59Z",
                final_report_deadline: "2025-10-15T23:59:59Z"
            },
            session_statistics: {
                total_participants: 62,
                submitted_proposals: 48,
                approved_proposals: 35,
                pending_reviews: 8,
                completed_reviews: 35
            },
            upcoming_deadlines: []
        }); fetchActiveSessionData();
    }, [apiData, token]);

    // Add logging when token changes
    useEffect(() => {
        console.log('🔄 ActiveSession: Token changed:', {
            hasToken: !!token,
            tokenPreview: token ? `${token.substring(0, 10)}...` : 'null',
            authState: isAuthenticated()
        });
    }, [token]);

    // Update time remaining every minute
    useEffect(() => {
        if (!currentSession) return;

        const updateTimeRemaining = () => {
            const end = new Date(currentSession.endDate);
            const now = new Date();
            setTimeRemaining(formatDistance(end, now, { addSuffix: true }));
            findNextDeadline(currentSession);
        };

        updateTimeRemaining();
        const interval = setInterval(updateTimeRemaining, 60000);
        return () => clearInterval(interval);
    }, [currentSession]);

    // Find the next upcoming deadline
    const findNextDeadline = (session) => {
        const now = new Date();
        const deadlines = [
            { name: "Proposal Submission", date: new Date(session.proposalDeadline), color: "blue" },
            { name: "Eligibility Review", date: new Date(session.reviewDeadline), color: "purple" },
            { name: "Progress Reporting", date: new Date(session.progressReportDeadline), color: "orange" },
            { name: "Final Reporting", date: new Date(session.finalReportDeadline), color: "red" },
            { name: "Session End", date: new Date(session.endDate), color: "gray" }
        ];

        const upcoming = deadlines.find(deadline => isAfter(deadline.date, now));
        setNextDeadline(upcoming || deadlines[deadlines.length - 1]);
    };    // Calculate progress percentage
    const getProgress = () => {
        if (!currentSession) return 0;

        const start = new Date(currentSession.startDate).getTime();
        const end = new Date(currentSession.endDate).getTime();
        const now = new Date().getTime();

        const totalDuration = end - start;
        const elapsed = now - start;

        const progress = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
        console.log(`📊 Session progress calculated: ${progress}%`, {
            startDate: currentSession.startDate,
            endDate: currentSession.endDate,
            now: new Date().toISOString(),
            totalDuration,
            elapsed
        });

        return progress;
    };// Determine session phase based on dates
    const getSessionPhase = () => {
        if (!currentSession) return "No Active Session";

        const now = new Date().getTime();
        const phases = [
            { name: "Proposal Submission", end: new Date(currentSession.proposalDeadline).getTime() },
            { name: "Eligibility Review", end: new Date(currentSession.reviewDeadline).getTime() },
            { name: "Progress Reporting", end: new Date(currentSession.progressReportDeadline).getTime() },
            { name: "Final Reporting", end: new Date(currentSession.finalReportDeadline).getTime() },
            { name: "Session Closure", end: new Date(currentSession.endDate).getTime() }
        ];

        for (const phase of phases) {
            if (now < phase.end) {
                console.log(`📅 Current session phase: ${phase.name}`);
                return phase.name;
            }
        }

        console.log('📅 Session phase: Complete');
        return "Session Complete";
    };

    // Calculate phase progress
    const getPhaseProgress = () => {
        if (!currentSession) return { phase: null, progress: 0 };

        const now = new Date();
        const phases = [
            {
                name: "Proposal Submission",
                start: new Date(currentSession.startDate),
                end: new Date(currentSession.proposalDeadline),
                color: "bg-blue-500"
            },
            {
                name: "Eligibility Review",
                start: new Date(currentSession.proposalDeadline),
                end: new Date(currentSession.reviewDeadline),
                color: "bg-purple-500"
            },
            {
                name: "Progress Reporting",
                start: new Date(currentSession.reviewDeadline),
                end: new Date(currentSession.progressReportDeadline),
                color: "bg-orange-500"
            },
            {
                name: "Final Reporting",
                start: new Date(currentSession.progressReportDeadline),
                end: new Date(currentSession.finalReportDeadline),
                color: "bg-red-500"
            },
            {
                name: "Session Closure",
                start: new Date(currentSession.finalReportDeadline),
                end: new Date(currentSession.endDate),
                color: "bg-gray-500"
            }
        ];

        let currentPhase = phases[phases.length - 1];
        for (const phase of phases) {
            if (now < phase.end) {
                currentPhase = phase;
                break;
            }
        }

        const phaseStart = currentPhase.start.getTime();
        const phaseEnd = currentPhase.end.getTime();
        const elapsed = now.getTime() - phaseStart;
        const phaseDuration = phaseEnd - phaseStart;
        const phaseProgress = Math.min(Math.round((elapsed / phaseDuration) * 100), 100);

        return { phase: currentPhase, progress: phaseProgress };
    };

    // Get status color based on progress
    const getStatusColor = () => {
        const progress = getProgress();
        if (progress > 80) return "text-red-500";
        if (progress > 50) return "text-yellow-500";
        return "text-green-500";
    };

    // Format date to readable format
    const formatDate = (dateString) => {
        return format(new Date(dateString), "MMM d, yyyy");
    };

    // Get days remaining until a date
    const getDaysRemaining = (dateString) => {
        const targetDate = new Date(dateString);
        const now = new Date();
        return Math.max(0, differenceInDays(targetDate, now));
    };

    // Error Banner Component (for when we have data but with errors)
    const ErrorBanner = ({ error }) => (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <div className="flex items-center space-x-2">
                <MdWarning className="text-amber-500 text-lg flex-shrink-0" />
                <div className="flex-1">
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                        {error.includes('401') || error.includes('Unauthorized')
                            ? '⚡ Demo Mode: Authentication required for live data'
                            : '⚡ Demo Mode: Using fallback data'}
                    </p>
                    {/* Debug info for development */}
                    {process.env.NODE_ENV === 'development' && (
                        <details className="mt-1">
                            <summary className="text-xs text-amber-600 dark:text-amber-400 cursor-pointer">Debug Info</summary>
                            <div className="mt-1 text-xs bg-amber-100 dark:bg-amber-900/50 rounded p-2">
                                <p>Session Auth: {isAuthenticated() ? '✅ Yes' : '❌ No'}</p>
                                <p>Token: {getAuthToken() ? '✅ Available' : '❌ Missing'}</p>
                                <p>Error: {error}</p>
                            </div>
                        </details>
                    )}
                </div>
                {error.includes('401') || error.includes('Unauthorized') ? (
                    <Link
                        to="/auth/sign-in"
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs rounded-lg transition-colors"
                    >
                        Login
                    </Link>
                ) : (
                    <button
                        onClick={() => window.location.reload()}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs rounded-lg transition-colors"
                    >
                        Retry
                    </button>
                )}
            </div>
        </div>
    );

    // Toggle expanded section
    const toggleSection = (section) => {
        if (expandedSection === section) {
            setExpandedSection(null);
        } else {
            setExpandedSection(section);
        }
    };    // Component Sections
    const SessionHeader = ({ currentSession, sessionPhase, statusColor }) => {
        console.log('📋 SessionHeader rendering with:', {
            sessionName: currentSession.name,
            sessionPhase,
            statusColor
        });

        return (
            <div className="relative">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>

                <div className="relative bg-white/80 dark:bg-navy-800/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-navy-700/50 shadow-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            {/* Enhanced Icon with Animation */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-purple-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-purple-600 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300">
                                    <TbCalendarStats className="text-white text-2xl" />
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-navy-800 animate-pulse"></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                        🔥 ACTIVE SESSION
                                    </p>
                                    <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                                        LIVE
                                    </div>
                                </div>
                                <h4 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-navy-700 via-brand-600 to-purple-600 dark:from-white dark:via-brand-400 dark:to-purple-400">
                                    {currentSession.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                                    {currentSession.description}
                                </p>
                            </div>
                        </div>

                        {/* Enhanced Status Badge */}
                        <div className="flex flex-col items-end space-y-3">
                            <div className={`inline-flex items-center px-6 py-3 rounded-2xl text-sm font-bold ${statusColor.replace('text', 'bg').replace('500', '100')} ${statusColor} border-2 border-current/20 shadow-lg backdrop-blur-sm`}>
                                <div className="w-3 h-3 rounded-full bg-current mr-3 animate-pulse shadow-lg"></div>
                                <span className="uppercase tracking-wider">{sessionPhase}</span>
                                <MdTrendingUp className="ml-2 text-lg" />
                            </div>

                            {/* Quick Stats Preview */}
                            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center space-x-1">
                                    <FiUsers className="text-blue-500" />
                                    <span>{currentSession.participantCount} participants</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <FiFileText className="text-green-500" />
                                    <span>{currentSession.proposalCount} proposals</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const SessionOverview = ({ currentSession, timeRemaining, nextDeadline, formatDate, getDaysRemaining }) => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-gray-50/50 dark:bg-navy-900/30 rounded-2xl p-4 border border-gray-100 dark:border-navy-700">
                <div className="flex items-start space-x-3">
                    <MdDescription className="text-brand-500 text-xl mt-0.5" />
                    <div className="flex-1">
                        <h5 className="font-semibold text-navy-700 dark:text-white mb-2">Session Overview</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{currentSession.description}</p>
                        <div className="flex flex-wrap gap-3">
                            <div className="inline-flex items-center px-3 py-1 bg-white dark:bg-navy-700 rounded-full text-xs shadow-sm">
                                <MdDateRange className="text-brand-500 mr-1.5" />
                                {formatDate(currentSession.startDate)} - {formatDate(currentSession.endDate)}
                            </div>
                            <div className="inline-flex items-center px-3 py-1 bg-white dark:bg-navy-700 rounded-full text-xs shadow-sm">
                                <HiClock className="text-orange-500 mr-1.5" />
                                {timeRemaining}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {nextDeadline && (
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-navy-800 dark:to-navy-700 rounded-2xl p-4 border border-blue-200/50 dark:border-blue-900/30">
                    <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-800 dark:text-white flex items-center">
                            <MdNotifications className="text-blue-500 mr-2" />
                            Next Deadline
                        </h5>
                        <div className={`text-xs font-medium px-2 py-1 rounded-full ${getDaysRemaining(nextDeadline.date) < 7 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                            {getDaysRemaining(nextDeadline.date)} days
                        </div>
                    </div>
                    <div className="bg-white/70 dark:bg-navy-800/70 rounded-xl p-3">
                        <h6 className="font-semibold text-navy-700 dark:text-white">{nextDeadline.name}</h6>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Due {formatDate(nextDeadline.date)}</p>
                        <Link to="/admin/session-management" className="inline-flex items-center w-full justify-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors">
                            <MdSettings className="mr-1.5" />
                            Manage
                        </Link>
                    </div>
                </div>
            )}
        </div>
    ); const ProgressSection = ({ progress, phase, phaseProgress }) => (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                        <MdTimeline className="text-white text-xl" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-navy-700 dark:text-white">Session Progress</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Timeline and milestones</p>
                    </div>
                </div>
                <div className={`px-4 py-2 rounded-xl text-sm font-bold ${progress > 80 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                        progress > 50 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                    {progress}% Complete
                </div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="relative">
                <div className="h-4 w-full bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden shadow-inner">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 relative ${progress > 80 ? 'bg-gradient-to-r from-red-400 via-red-500 to-red-600' :
                                progress > 50 ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600' :
                                    'bg-gradient-to-r from-green-400 via-green-500 to-green-600'
                            }`}
                        style={{ width: `${progress}%` }}
                    >
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                </div>

                {/* Progress indicator */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-4 border-current transition-all duration-1000"
                    style={{ left: `${Math.min(progress, 95)}%`, color: progress > 80 ? '#ef4444' : progress > 50 ? '#eab308' : '#22c55e' }}
                >
                    <div className="absolute inset-1 rounded-full bg-current animate-pulse"></div>
                </div>
            </div>

            {/* Phase Milestones */}
            <div className="grid grid-cols-5 gap-4">
                {[
                    { label: 'Proposal', phase: 'Submission', icon: MdAssignment, color: 'blue' },
                    { label: 'Review', phase: 'Evaluation', icon: MdOutlineRateReview, color: 'purple' },
                    { label: 'Progress', phase: 'Reporting', icon: MdBarChart, color: 'orange' },
                    { label: 'Final', phase: 'Submission', icon: MdAssignmentTurnedIn, color: 'red' },
                    { label: 'Closure', phase: 'Complete', icon: MdCheck, color: 'green' }
                ].map((milestone, i) => {
                    const isCompleted = progress >= (i + 1) * 20;
                    const isCurrent = progress < (i + 1) * 20 && progress >= i * 20;

                    return (
                        <div key={milestone.label} className="text-center">
                            <div className="relative mb-3">
                                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-lg transition-all duration-300 ${isCompleted
                                        ? `bg-gradient-to-br from-${milestone.color}-500 to-${milestone.color}-600 text-white shadow-xl scale-110`
                                        : isCurrent
                                            ? `bg-gradient-to-br from-${milestone.color}-100 to-${milestone.color}-200 text-${milestone.color}-600 border-2 border-${milestone.color}-400 animate-pulse shadow-lg`
                                            : 'bg-gray-200 text-gray-500 dark:bg-gray-700/50 dark:text-gray-400'
                                    }`}>
                                    {isCompleted ? <MdCheck className="text-2xl" /> : <milestone.icon className="text-xl" />}
                                </div>

                                {/* Connection line */}
                                {i < 4 && (
                                    <div className={`absolute top-8 left-full w-full h-0.5 -translate-x-1/2 ${progress >= (i + 1.5) * 20 ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
                                        }`}></div>
                                )}
                            </div>

                            <div className="space-y-1">
                                <div className={`font-bold text-sm ${isCompleted ? 'text-green-600 dark:text-green-400' :
                                        isCurrent ? `text-${milestone.color}-600 dark:text-${milestone.color}-400` :
                                            'text-gray-500 dark:text-gray-400'
                                    }`}>
                                    {milestone.label}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {milestone.phase}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Current Phase Details */}
            {phase && (
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-2xl"></div>
                    <div className="relative p-6 bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-navy-700/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={`w-16 h-16 rounded-2xl ${phase.color.replace('500', '100')} dark:${phase.color.replace('bg-', 'bg-')}/20 flex items-center justify-center`}>
                                    <MdTrendingUp className={`text-2xl ${phase.color.replace('bg', 'text')}`} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">
                                        🔥 Current Phase
                                    </div>
                                    <h6 className={`text-xl font-black ${phase.color.replace('bg', 'text')}`}>
                                        {phase.name}
                                    </h6>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Active milestone in progress
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-4xl font-black text-navy-700 dark:text-white">
                                    {phaseProgress}%
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    Phase Complete
                                </div>
                                <div className="mt-2 w-24 h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${phase.color} transition-all duration-1000 rounded-full`}
                                        style={{ width: `${phaseProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ); const TimelineSection = ({ currentSession, expandedSection, toggleSection }) => {
        const timelineEvents = [
            {
                title: "Session Launch",
                date: currentSession.startDate,
                description: "Research proposal session officially begins",
                icon: AiOutlineRocket,
                color: "green",
                status: "completed"
            },
            {
                title: "Proposal Submission Period",
                date: currentSession.proposalDeadline,
                description: "Deadline for researchers to submit proposals",
                icon: FiFileText,
                color: "blue",
                status: new Date() > new Date(currentSession.proposalDeadline) ? "completed" : "active"
            },
            {
                title: "Eligibility Review",
                date: currentSession.reviewDeadline,
                description: "Expert panel reviews and evaluates proposals",
                icon: MdOutlineRateReview,
                color: "purple",
                status: new Date() > new Date(currentSession.reviewDeadline) ? "completed" : new Date() > new Date(currentSession.proposalDeadline) ? "active" : "upcoming"
            },
            {
                title: "Progress Reporting",
                date: currentSession.progressReportDeadline,
                description: "Approved researchers submit progress reports",
                icon: MdBarChart,
                color: "orange",
                status: new Date() > new Date(currentSession.progressReportDeadline) ? "completed" : new Date() > new Date(currentSession.reviewDeadline) ? "active" : "upcoming"
            },
            {
                title: "Final Report Submission",
                date: currentSession.finalReportDeadline,
                description: "Final deliverables and research outcomes",
                icon: MdAssignmentTurnedIn,
                color: "red",
                status: new Date() > new Date(currentSession.finalReportDeadline) ? "completed" : new Date() > new Date(currentSession.progressReportDeadline) ? "active" : "upcoming"
            },
            {
                title: "Session Closure",
                date: currentSession.endDate,
                description: "Session ends and final evaluations complete",
                icon: MdFlag,
                color: "gray",
                status: new Date() > new Date(currentSession.endDate) ? "completed" : "upcoming"
            }
        ];

        return (
            <div className="space-y-4">
                {/* Section Header */}
                <div
                    className="flex justify-between items-center cursor-pointer p-4 bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-navy-700/50 hover:shadow-lg transition-all duration-300"
                    onClick={() => toggleSection('timeline')}
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                            <MdTimeline className="text-white text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-navy-700 dark:text-white">Session Timeline</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Key milestones and deadlines</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full">
                            {timelineEvents.filter(e => e.status === 'completed').length}/{timelineEvents.length} Complete
                        </div>
                        <MdExpandMore className={`text-gray-400 transition-transform duration-300 text-2xl ${expandedSection === 'timeline' ? 'rotate-180' : ''}`} />
                    </div>
                </div>

                {/* Timeline Content */}
                {expandedSection === 'timeline' && (
                    <div className="bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-navy-700/50 overflow-hidden">
                        <div className="p-6">
                            <div className="relative">
                                {/* Timeline Line */}
                                <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-gray-300 dark:to-gray-600"></div>

                                <div className="space-y-8">
                                    {timelineEvents.map((event, index) => {
                                        const IconComponent = event.icon;
                                        const daysFromNow = differenceInDays(new Date(event.date), new Date());

                                        return (
                                            <div key={index} className="relative flex items-start space-x-6">
                                                {/* Timeline Node */}
                                                <div className="relative z-10">
                                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${event.status === 'completed'
                                                            ? `bg-gradient-to-br from-${event.color}-500 to-${event.color}-600 text-white`
                                                            : event.status === 'active'
                                                                ? `bg-gradient-to-br from-${event.color}-100 to-${event.color}-200 text-${event.color}-600 border-4 border-${event.color}-400 animate-pulse`
                                                                : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                                        }`}>
                                                        {event.status === 'completed' ? (
                                                            <MdCheck className="text-2xl" />
                                                        ) : (
                                                            <IconComponent className="text-xl" />
                                                        )}
                                                    </div>

                                                    {/* Status Badge */}
                                                    <div className={`absolute -top-2 -right-2 px-2 py-1 text-xs font-bold rounded-full ${event.status === 'completed' ? 'bg-green-500 text-white' :
                                                            event.status === 'active' ? 'bg-orange-500 text-white animate-pulse' :
                                                                'bg-gray-400 text-white'
                                                        }`}>
                                                        {event.status === 'completed' ? '✓' :
                                                            event.status === 'active' ? '●' : '○'}
                                                    </div>
                                                </div>

                                                {/* Event Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className={`text-lg font-bold ${event.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                                                                event.status === 'active' ? `text-${event.color}-600 dark:text-${event.color}-400` :
                                                                    'text-gray-500 dark:text-gray-400'
                                                            }`}>
                                                            {event.title}
                                                        </h4>

                                                        <div className="flex items-center space-x-2">
                                                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${daysFromNow < 0 ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' :
                                                                    daysFromNow < 7 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                                                                        'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                                                }`}>
                                                                {daysFromNow < 0
                                                                    ? `${Math.abs(daysFromNow)} days ago`
                                                                    : daysFromNow === 0
                                                                        ? 'Today'
                                                                        : `${daysFromNow} days left`
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                                                        {event.description}
                                                    </p>

                                                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center space-x-1">
                                                            <MdCalendarToday className="w-4 h-4" />
                                                            <span>{format(new Date(event.date), "MMM d, yyyy")}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <FiClock className="w-4 h-4" />
                                                            <span>{format(new Date(event.date), "h:mm a")}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }; const SessionMetrics = ({ currentSession }) => {
        console.log('📊 SessionMetrics rendering with:', {
            proposalCount: currentSession.proposalCount,
            approvedCount: currentSession.approvedCount,
            participantCount: currentSession.participantCount
        });

        const metrics = [
            {
                label: 'Total Proposals',
                value: currentSession.proposalCount,
                icon: FiFileText,
                color: 'blue',
                trend: '+12%',
                trendUp: true,
                description: 'Submitted this month'
            },
            {
                label: 'Approved',
                value: currentSession.approvedCount,
                icon: FiCheckCircle,
                color: 'green',
                trend: '+8%',
                trendUp: true,
                description: 'Success rate: 85%'
            },
            {
                label: 'Participants',
                value: currentSession.participantCount,
                icon: FiUsers,
                color: 'purple',
                trend: '+5%',
                trendUp: true,
                description: 'Active researchers'
            },
            {
                label: 'Pending Reviews',
                value: currentSession.pendingReviews || 0,
                icon: FiClock,
                color: 'orange',
                trend: '-3%',
                trendUp: false,
                description: 'Awaiting review'
            },
            {
                label: 'Completed Reviews',
                value: currentSession.completedReviews || 0,
                icon: MdAssessment,
                color: 'indigo',
                trend: '+15%',
                trendUp: true,
                description: 'Finished reviews'
            },
            {
                label: 'Success Rate',
                value: currentSession.approvedCount > 0 ? `${Math.round((currentSession.approvedCount / currentSession.proposalCount) * 100)}%` : '0%',
                icon: TbTargetArrow,
                color: 'teal',
                trend: '+2%',
                trendUp: true,
                description: 'Approval percentage'
            }
        ];

        return (
            <div className="space-y-6">
                {/* Section Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <MdAnalytics className="text-white text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-navy-700 dark:text-white">Session Analytics</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Real-time performance metrics</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 rounded-xl text-sm font-medium transition-colors">
                        View Details
                    </button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {metrics.map((metric, index) => {
                        console.log(`📊 Rendering metric: ${metric.label} = ${metric.value}`);
                        return (
                            <div key={metric.label} className="group relative overflow-hidden">
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-${metric.color}-500/10 to-${metric.color}-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                <div className="relative p-6 bg-white/90 dark:bg-navy-800/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-navy-700/50 hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-current/30">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${metric.color}-100 to-${metric.color}-200 dark:from-${metric.color}-900/30 dark:to-${metric.color}-800/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                            <metric.icon className={`text-${metric.color}-600 dark:text-${metric.color}-400 text-xl`} />
                                        </div>

                                        {/* Trend Indicator */}
                                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${metric.trendUp
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                            {metric.trendUp ? <HiTrendingUp /> : <MdTrendingDown />}
                                            <span>{metric.trend}</span>
                                        </div>
                                    </div>

                                    {/* Value */}
                                    <div className="mb-3">
                                        <div className="text-3xl font-black text-gray-800 dark:text-white mb-1">
                                            {metric.value}
                                        </div>
                                        <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                            {metric.label}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                                        <FiActivity className="w-3 h-3" />
                                        <span>{metric.description}</span>
                                    </div>

                                    {/* Hover Effect */}
                                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }; const ActionButtons = () => (
        <div className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                        <AiOutlineThunderbolt className="text-white text-xl" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-navy-700 dark:text-white">Quick Actions</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage and monitor session</p>
                    </div>
                </div>
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Primary Actions */}
                <Link to="/admin/session-management" className="group block">
                    <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <button className="relative w-full p-6 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                    <MdSettings className="text-2xl" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Manage Session</h4>
                                    <p className="text-sm text-white/80">Configure settings</p>
                                </div>
                                <MdChevronRight className="text-xl opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                        </button>
                    </div>
                </Link>

                <Link to="/admin/proposal-management" className="group block">
                    <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                        <button className="relative w-full p-6 bg-white dark:bg-navy-800 border-2 border-gray-200 dark:border-navy-700 hover:border-purple-300 dark:hover:border-purple-600 rounded-2xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                                    <MdAssignment className="text-2xl text-purple-600 dark:text-purple-400 group-hover:text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800 dark:text-white">View Proposals</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Review submissions</p>
                                </div>
                                <MdChevronRight className="text-xl opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-gray-600 dark:text-gray-400" />
                            </div>
                        </button>
                    </div>
                </Link>

                {/* Secondary Actions */}
                <Link to="/admin/analytics" className="group block">
                    <button className="w-full p-6 bg-white dark:bg-navy-800 border-2 border-gray-200 dark:border-navy-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                <MdAnalytics className="text-2xl text-blue-600 dark:text-blue-400 group-hover:text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-800 dark:text-white">Analytics</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">View insights</p>
                            </div>
                            <MdChevronRight className="text-xl opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-gray-600 dark:text-gray-400" />
                        </div>
                    </button>
                </Link>

                <Link to="/admin/reports" className="group block">
                    <button className="w-full p-6 bg-white dark:bg-navy-800 border-2 border-gray-200 dark:border-navy-700 hover:border-green-300 dark:hover:border-green-600 rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                                <MdBarChart className="text-2xl text-green-600 dark:text-green-400 group-hover:text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-800 dark:text-white">Reports</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Generate reports</p>
                            </div>
                            <MdChevronRight className="text-xl opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-gray-600 dark:text-gray-400" />
                        </div>
                    </button>
                </Link>
            </div>

            {/* Quick Stats Bar */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-navy-900/50 dark:to-blue-900/20 rounded-2xl border border-gray-200/50 dark:border-navy-700/50">
                <div className="flex items-center justify-between text-center">
                    <div className="flex-1">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {currentSession?.participantCount || 0}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            Active Users
                        </div>
                    </div>
                    <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="flex-1">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {currentSession?.approvedCount || 0}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            Approved
                        </div>
                    </div>
                    <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="flex-1">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {currentSession?.pendingReviews || 0}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            Pending
                        </div>
                    </div>
                    <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="flex-1">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {getProgress()}%
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            Progress
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <Card extra="!p-6 h-full bg-white/90 dark:bg-navy-800/90 backdrop-blur-md border border-gray-100 dark:border-navy-700">
                <div className="animate-pulse space-y-6">
                    {/* Header skeleton */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-navy-700 rounded-full"></div>
                            <div className="space-y-2">
                                <div className="h-3 bg-gray-200 dark:bg-navy-700 rounded w-32"></div>
                                <div className="h-5 bg-gray-200 dark:bg-navy-700 rounded w-48"></div>
                            </div>
                        </div>
                        <div className="h-8 bg-gray-200 dark:bg-navy-700 rounded-full w-24"></div>
                    </div>

                    {/* Progress bar skeleton */}
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-navy-700 rounded-full w-full"></div>
                        <div className="flex justify-between">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-12 text-center space-y-2">
                                    <div className="h-3 bg-gray-200 dark:bg-navy-700 rounded w-full"></div>
                                    <div className="w-6 h-6 bg-gray-200 dark:bg-navy-700 rounded-full mx-auto"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats skeleton */}
                    <div className="grid grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="p-4 bg-gray-100 dark:bg-navy-700 rounded-xl space-y-3">
                                <div className="w-8 h-8 bg-gray-200 dark:bg-navy-600 rounded-lg mx-auto"></div>
                                <div className="h-6 bg-gray-200 dark:bg-navy-600 rounded w-8 mx-auto"></div>
                                <div className="h-3 bg-gray-200 dark:bg-navy-600 rounded w-16 mx-auto"></div>
                            </div>
                        ))}
                    </div>

                    {/* Action buttons skeleton */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="h-12 bg-gray-200 dark:bg-navy-700 rounded-xl"></div>
                        <div className="h-12 bg-gray-200 dark:bg-navy-700 rounded-xl"></div>
                    </div>
                </div>
            </Card>
        );
    }    // Only show major error state if we have NO session data at all
    if (error && !currentSession) {
        return (
            <Card extra="!p-6 h-full bg-white/90 dark:bg-navy-800/90 backdrop-blur-md border border-red-200/50 dark:border-red-700/50">
                <div className="flex flex-col h-full justify-center items-center text-center space-y-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-100 dark:bg-red-900/20 rounded-full blur-xl"></div>
                        <div className="relative bg-red-50 dark:bg-red-900/30 p-4 rounded-full">
                            <MdWarning className="text-red-500 text-3xl" />
                        </div>
                    </div>                    <div className="space-y-2">
                        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                            Service Unavailable
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                            Unable to load session data. Please check your connection or try again later.
                        </p>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                            <MdWarning className="w-4 h-4 mr-1" />
                            Connection Failed
                        </div>
                    </div>                    <div className="flex flex-col space-y-2">
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                        >
                            <MdNotifications className="mr-2" />
                            Retry Connection
                        </button>
                        <Link
                            to="/admin/sessions"
                            className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                        >
                            <MdSettings className="mr-2" />
                            Manage Sessions
                        </Link>
                    </div>
                </div>
            </Card>
        );
    }

    if (!currentSession) {
        return (
            <Card extra="!p-6 h-full bg-white/90 dark:bg-navy-800/90 backdrop-blur-md border border-gray-100 dark:border-navy-700">
                <div className="flex flex-col h-full justify-center items-center text-center space-y-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-xl"></div>
                        <div className="relative bg-blue-50 dark:bg-blue-900/30 p-4 rounded-full">
                            <TbCalendarStats className="text-blue-500 text-3xl" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                            No Active Session
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                            Create a new research proposal session to get started
                        </p>
                    </div>

                    <Link to="/admin/session-management">
                        <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl hover:shadow-lg transition-all duration-200">
                            <MdSettings className="mr-2" />
                            Create Session
                        </button>
                    </Link>
                </div>
            </Card>
        );
    } const { phase, progress: phaseProgress } = getPhaseProgress();

    console.log('🎨 ActiveSession rendering with final state:', {
        loading,
        error,
        hasCurrentSession: !!currentSession,
        sessionName: currentSession?.name,
        sessionStatus: currentSession?.status,
        proposalCount: currentSession?.proposalCount,
        approvedCount: currentSession?.approvedCount,
        participantCount: currentSession?.participantCount,
        isVisible
    }); return (
        <div ref={componentRef} className="relative">
            {/* Enhanced Background with animated gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/5 dark:to-pink-900/10 rounded-3xl blur-3xl"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-purple-100/20 dark:from-blue-800/10 dark:to-purple-800/10 rounded-3xl"></div>

            <Card extra="!p-8 relative bg-white/95 dark:bg-navy-800/95 backdrop-blur-xl border-2 border-gray-200/50 dark:border-navy-700/50 shadow-2xl overflow-hidden rounded-3xl">
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

                {/* Header Section with enhanced spacing */}
                <div className={`relative z-10 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {/* Show error banner if there are errors but we still have data */}
                    {error && currentSession && <ErrorBanner error={error} />}

                    <SessionHeader
                        currentSession={currentSession}
                        sessionPhase={getSessionPhase()}
                        statusColor={getStatusColor()}
                    />
                </div>

                {/* Main Content Grid */}
                <div className={`relative z-10 space-y-8 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {/* Metrics Section */}
                    <SessionMetrics currentSession={currentSession} />

                    {/* Progress and Overview Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-2">
                            <ProgressSection
                                progress={getProgress()}
                                phase={phase}
                                phaseProgress={phaseProgress}
                            />
                        </div>
                        <div>
                            <SessionOverview
                                currentSession={currentSession}
                                timeRemaining={timeRemaining}
                                nextDeadline={nextDeadline}
                                formatDate={formatDate}
                                getDaysRemaining={getDaysRemaining}
                            />
                        </div>
                    </div>

                    {/* Timeline Section */}
                    <TimelineSection
                        currentSession={currentSession}
                        expandedSection={expandedSection}
                        toggleSection={toggleSection}
                    />

                    {/* Actions Section */}
                    <ActionButtons />
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-navy-800/80 px-2 py-1 rounded-full backdrop-blur-sm">
                            Live Data
                        </span>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ActiveSession;
