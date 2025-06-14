import React, { useState, useEffect, useRef } from "react";
import {
    MdOutlineTimer, MdDateRange, MdPeople, MdAssignment, MdCheck, MdWarning,
    MdChevronRight, MdCalendarToday, MdFlag, MdInfo, MdKeyboardArrowDown,
    MdSettings, MdDescription, MdAccessTime, MdNotifications,
    MdOutlinePublishedWithChanges, MdOutlineRateReview, MdAssignmentTurnedIn, MdTimer,
    MdOutlineAssignmentLate, MdOutlineTaskAlt, MdOutlineAssignment
} from "react-icons/md";
import Card from "components/card";
import { formatDistance, format, isAfter, isBefore, differenceInDays } from "date-fns";
import { Link } from "react-router-dom";
import { TbFileCheck, TbUsers, TbCalendarStats } from "react-icons/tb";

// Dummy session data
const dummySession = {
    _id: "s2025001",
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
    participantCount: 62
};

const ActiveSession = () => {
    const [currentSession, setCurrentSession] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState("");
    const [loading, setLoading] = useState(true);
    const [nextDeadline, setNextDeadline] = useState(null);
    const [expandedSection, setExpandedSection] = useState("timeline");
    const [animationTriggered, setAnimationTriggered] = useState(false);
    const timelineRef = useRef(null);

    useEffect(() => {
        // Simulate API loading
        const timer = setTimeout(() => {
            setCurrentSession(dummySession);
            setLoading(false);

            // Update time remaining display
            if (dummySession) {
                const end = new Date(dummySession.endDate);
                const now = new Date();
                setTimeRemaining(formatDistance(end, now, { addSuffix: true }));

                // Set next deadline
                findNextDeadline(dummySession);
            }

            // Trigger animations after loading
            setTimeout(() => setAnimationTriggered(true), 300);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Intersection Observer for timeline animations
    useEffect(() => {
        if (!loading && timelineRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('timeline-visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.2 }
            );

            const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => observer.observe(item));

            return () => {
                timelineItems.forEach(item => observer.unobserve(item));
            };
        }
    }, [loading, timelineRef.current]);

    // Update time remaining every minute
    useEffect(() => {
        if (!currentSession) return;

        const interval = setInterval(() => {
            const end = new Date(currentSession.endDate);
            const now = new Date();
            setTimeRemaining(formatDistance(end, now, { addSuffix: true }));

            // Update next deadline regularly
            findNextDeadline(currentSession);
        }, 60000);

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

        // Find the next deadline that hasn't passed
        const upcoming = deadlines.find(deadline => isAfter(deadline.date, now));
        setNextDeadline(upcoming || deadlines[deadlines.length - 1]);
    };

    // Calculate progress percentage
    const getProgress = () => {
        if (!currentSession) return 0;

        const start = new Date(currentSession.startDate).getTime();
        const end = new Date(currentSession.endDate).getTime();
        const now = new Date().getTime();

        const totalDuration = end - start;
        const elapsed = now - start;

        return Math.min(Math.round((elapsed / totalDuration) * 100), 100);
    };

    // Determine session phase based on dates and phase configuration
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
                return phase.name;
            }
        }

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

        // Find current phase
        let currentPhase = phases[phases.length - 1];
        for (const phase of phases) {
            if (now < phase.end) {
                currentPhase = phase;
                break;
            }
        }

        // Calculate progress within the phase
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

    // Toggle expanded section
    const toggleSection = (section) => {
        if (expandedSection === section) {
            setExpandedSection(null);
        } else {
            setExpandedSection(section);
        }
    };

    // Calculate percentage of time remaining in a phase
    const getPhaseRemainingPercentage = (startDateStr, endDateStr) => {
        const start = new Date(startDateStr).getTime();
        const end = new Date(endDateStr).getTime();
        const now = new Date().getTime();

        const totalDuration = end - start;
        const elapsed = now - start;

        // Calculate how much of the phase duration has elapsed (as a percentage)
        const percentElapsed = Math.min(Math.round((elapsed / totalDuration) * 100), 100);

        // Return the percentage of time remaining
        return percentElapsed;
    };

    if (loading) {
        return (
            <Card extra="!p-5 h-full backdrop-blur-sm bg-white/80 dark:bg-navy-800/80 shadow-lg border border-gray-100 dark:border-navy-700">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-navy-700 rounded-full w-48 mb-4"></div>
                    <div className="flex justify-between mb-4">
                        <div className="h-6 bg-gray-200 dark:bg-navy-700 rounded-full w-36"></div>
                        <div className="h-6 bg-gray-200 dark:bg-navy-700 rounded-full w-24"></div>
                    </div>
                    <div className="h-4 bg-gray-200 dark:bg-navy-700 rounded-full mb-6"></div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="h-16 bg-gray-200 dark:bg-navy-700 rounded-xl"></div>
                        <div className="h-16 bg-gray-200 dark:bg-navy-700 rounded-xl"></div>
                    </div>
                    <div className="h-32 bg-gray-200 dark:bg-navy-700 rounded-xl mb-6"></div>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="h-24 bg-gray-200 dark:bg-navy-700 rounded-xl"></div>
                        <div className="h-24 bg-gray-200 dark:bg-navy-700 rounded-xl"></div>
                        <div className="h-24 bg-gray-200 dark:bg-navy-700 rounded-xl"></div>
                    </div>
                    <div className="h-10 bg-gray-200 dark:bg-navy-700 rounded-xl"></div>
                </div>
            </Card>
        );
    }

    if (!currentSession) {
        return (
            <Card extra="!p-5 h-full backdrop-blur-sm bg-white/90 dark:bg-navy-800/90 shadow-lg border border-gray-100 dark:border-navy-700">
                <div className="flex flex-col h-full justify-center items-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-yellow-100 dark:bg-yellow-900/30 rounded-full blur-xl opacity-70"></div>
                        <MdWarning className="text-yellow-500 text-6xl mb-3 relative z-10" />
                    </div>
                    <h4 className="text-xl font-bold text-navy-700 dark:text-white mb-1">No Active Session</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
                        Create a new session from the Session Management page
                    </p>
                    <Link to="/admin/session-management">
                        <button className="py-2 px-6 bg-brand-500 text-white rounded-full hover:bg-brand-600 transition-all duration-200 flex items-center shadow-md hover:shadow-lg">
                            <MdSettings className="mr-2" /> Create Session
                        </button>
                    </Link>
                </div>
            </Card>
        );
    }

    const { phase, progress: phaseProgress } = getPhaseProgress();

    return (
        <Card extra="!p-6 h-full backdrop-blur-sm bg-white/90 dark:bg-navy-800/90 shadow-lg border border-gray-100 dark:border-navy-700 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-brand-500 rounded-full filter blur-3xl opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-5 translate-x-1/2 translate-y-1/2"></div>

            {/* Session Header with Status Badge */}
            <div className={`flex items-center justify-between mb-5 ${animationTriggered ? 'animate-fade-in-down' : 'opacity-0'}`}
                style={{ animationDelay: '0.1s' }}>
                <div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 flex items-center justify-center mr-3 shadow-md">
                            <TbCalendarStats className="text-white text-xl" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">ACTIVE SESSION</p>
                            <h4 className="text-xl font-bold text-navy-700 dark:text-white">{currentSession.name}</h4>
                        </div>
                    </div>
                </div>
                <div className={`flex items-center px-4 py-1.5 rounded-full 
          ${getStatusColor().replace('text', 'bg').replace('500', '100')} 
          ${getStatusColor()} border border-current shadow-sm`}>
                    <span className="h-2.5 w-2.5 rounded-full bg-current mr-2 animate-pulse"></span>
                    <span className="font-medium">{getSessionPhase()}</span>
                </div>
            </div>

            {/* Session Description with Next Deadline Alert */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Description Card */}
                <div className={`col-span-1 lg:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-navy-900 dark:to-navy-800 
          p-4 rounded-2xl border border-gray-200 dark:border-navy-700 shadow-sm
          ${animationTriggered ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-start mb-2">
                        <MdDescription className="text-brand-500 text-xl mt-0.5 mr-2" />
                        <h5 className="text-sm font-semibold text-navy-700 dark:text-white">Session Overview</h5>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{currentSession.description}</p>

                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center py-1 px-3 bg-white dark:bg-navy-700 rounded-full text-xs shadow-sm">
                            <MdDateRange className="text-brand-500 mr-1.5" />
                            <span>{formatDate(currentSession.startDate)}</span>
                            <span className="mx-1.5 text-gray-400">→</span>
                            <span>{formatDate(currentSession.endDate)}</span>
                        </div>
                        <div className="flex items-center py-1 px-3 bg-white dark:bg-navy-700 rounded-full text-xs shadow-sm">
                            <MdOutlineTimer className="text-orange-500 mr-1.5" />
                            <span>{timeRemaining}</span>
                        </div>
                    </div>
                </div>

                {/* Next Deadline Card */}
                {nextDeadline && (
                    <div className={`bg-gradient-to-br from-blue-50 to-blue-100 dark:from-navy-800 dark:to-navy-700 
            p-4 rounded-2xl border border-blue-200 dark:border-blue-900/30 shadow-sm
            ${animationTriggered ? 'animate-fade-in-up' : 'opacity-0'}`}
                        style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                                <MdNotifications className="text-blue-500 mr-2" />
                                <h5 className="text-sm font-semibold text-gray-800 dark:text-white">Next Deadline</h5>
                            </div>
                            <div className={`text-xs font-medium py-1 px-2 rounded-full 
                ${getDaysRemaining(nextDeadline.date) < 7 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                {getDaysRemaining(nextDeadline.date)} days left
                            </div>
                        </div>

                        <div className="bg-white/80 dark:bg-navy-800/80 rounded-xl p-3 backdrop-blur-sm">
                            <h6 className="font-semibold text-navy-700 dark:text-white mb-1">{nextDeadline.name}</h6>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Due on {formatDate(nextDeadline.date)}
                            </p>
                            <Link to="/admin/session-management">
                                <button className="w-full py-1.5 px-3 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-all duration-200 flex items-center justify-center shadow-sm">
                                    <MdSettings className="mr-1.5" /> Manage Deadline
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Enhanced Progress Visualization */}
            <div className={`mb-6 ${animationTriggered ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-navy-900 dark:to-navy-800 
                    rounded-2xl p-4 border border-gray-200 dark:border-navy-700 shadow-sm">
                    {/* Overall Progress Header with Percentage Display */}
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mr-2 shadow-sm">
                                <MdAccessTime className="text-brand-500 text-lg" />
                            </div>
                            <h5 className="text-sm font-semibold text-navy-700 dark:text-white">Session Progress</h5>
                        </div>

                        {/* Enhanced Progress Percentage Display */}
                        <div className="flex items-center">
                            <div className={`text-sm font-bold px-3 py-1 rounded-lg ${getProgress() > 80 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                                getProgress() > 50 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                    'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                }`}>
                                <span className="mr-1">{getProgress()}%</span>
                                <span className="text-xs font-normal">Complete</span>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Progress Bar with Phase Markers */}
                    <div className="mb-5 relative"></div>
                    <div className="h-3 w-full bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${getProgress() > 80 ? 'bg-gradient-to-r from-red-400 to-red-600' :
                                getProgress() > 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                    'bg-gradient-to-r from-green-400 to-green-600'
                                } relative`}
                            style={{ width: `${getProgress()}%` }}
                        >
                            <div className="absolute inset-0 bg-white/30 overflow-hidden rounded-full shimmer-effect"></div>
                        </div>

                        {/* Phase Marker Points */}
                        <div className="w-full h-full absolute top-0 left-0 flex justify-between px-1">
                            {[20, 40, 60, 80].map((point, i) => (
                                <div key={i} className="relative" style={{ left: `${point}%` }}>
                                    <div className={`absolute -top-1 -ml-1 w-2 h-5 ${getProgress() >= point ? 'bg-white/70' : 'bg-gray-400/40'} rounded-sm`}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Phase Labels */}
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400 px-1">
                        <div className="text-center">
                            <div className={`font-medium mb-1 ${getProgress() >= 0 && getProgress() < 20 ? 'text-brand-500 dark:text-brand-400' : ''}`}>Proposal</div>
                            <div className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center ${getProgress() >= 20 ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                                getProgress() >= 0 && getProgress() < 20 ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 pulse-soft' :
                                    'bg-gray-200 text-gray-500 dark:bg-gray-700/50'
                                }`}>
                                {getProgress() >= 20 ? <MdCheck size={14} /> : '1'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`font-medium mb-1 ${getProgress() >= 20 && getProgress() < 40 ? 'text-brand-500 dark:text-brand-400' : ''}`}>Review</div>
                            <div className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center ${getProgress() >= 40 ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                                getProgress() >= 20 && getProgress() < 40 ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 pulse-soft' :
                                    'bg-gray-200 text-gray-500 dark:bg-gray-700/50'
                                }`}>
                                {getProgress() >= 40 ? <MdCheck size={14} /> : '2'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`font-medium mb-1 ${getProgress() >= 40 && getProgress() < 60 ? 'text-brand-500 dark:text-brand-400' : ''}`}>Progress</div>
                            <div className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center ${getProgress() >= 60 ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                                getProgress() >= 40 && getProgress() < 60 ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 pulse-soft' :
                                    'bg-gray-200 text-gray-500 dark:bg-gray-700/50'
                                }`}>
                                {getProgress() >= 60 ? <MdCheck size={14} /> : '3'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`font-medium mb-1 ${getProgress() >= 60 && getProgress() < 80 ? 'text-brand-500 dark:text-brand-400' : ''}`}>Final</div>
                            <div className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center ${getProgress() >= 80 ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                                getProgress() >= 60 && getProgress() < 80 ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 pulse-soft' :
                                    'bg-gray-200 text-gray-500 dark:bg-gray-700/50'
                                }`}>
                                {getProgress() >= 80 ? <MdCheck size={14} /> : '4'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`font-medium mb-1 ${getProgress() >= 80 && getProgress() < 100 ? 'text-brand-500 dark:text-brand-400' : ''}`}>Closure</div>
                            <div className={`w-5 h-5 mx-auto rounded-full flex items-center justify-center ${getProgress() >= 100 ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                                getProgress() >= 80 && getProgress() < 100 ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 pulse-soft' :
                                    'bg-gray-200 text-gray-500 dark:bg-gray-700/50'
                                }`}>
                                {getProgress() >= 100 ? <MdCheck size={14} /> : '5'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Phase Card */}
                {phase && (
                    <div className={`p-3 rounded-xl bg-white/80 dark:bg-navy-700/80 backdrop-blur-sm border border-gray-100 dark:border-navy-600 shadow-sm 
                            ${phase.color.replace('bg', 'border').replace('500', '200')} dark:${phase.color.replace('bg', 'border').replace('500', '900')}/30`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className={`w-10 h-10 rounded-lg ${phase.color.replace('500', '100')} dark:${phase.color.replace('bg-', 'bg-')}/20 
                                        flex items-center justify-center mr-3`}>
                                    {phase.name.includes("Proposal") && <MdOutlineAssignment className={`text-xl ${phase.color.replace('bg', 'text')}`} />}
                                    {phase.name.includes("Review") && <MdOutlineRateReview className={`text-xl ${phase.color.replace('bg', 'text')}`} />}
                                    {phase.name.includes("Progress") && <MdOutlinePublishedWithChanges className={`text-xl ${phase.color.replace('bg', 'text')}`} />}
                                    {phase.name.includes("Final") && <MdAssignmentTurnedIn className={`text-xl ${phase.color.replace('bg', 'text')}`} />}
                                    {phase.name.includes("Closure") && <MdFlag className={`text-xl ${phase.color.replace('bg', 'text')}`} />}
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">CURRENT PHASE</div>
                                    <h5 className={`text-base font-semibold ${phase.color.replace('bg', 'text')}`}>{phase.name}</h5>
                                </div>
                            </div>

                            {/* Circular Progress Indicator */}
                            <div className="relative h-14 w-14">
                                <svg className="h-14 w-14 transform -rotate-90" viewBox="0 0 100 100">
                                    <circle
                                        cx="50" cy="50" r="40"
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="8"
                                        className="dark:stroke-gray-700"
                                    />
                                    <circle
                                        cx="50" cy="50" r="40"
                                        fill="none"
                                        stroke={`url(#gradient-${phase.color.replace('bg-', '')})`}
                                        strokeWidth="8"
                                        strokeDasharray="251.2"
                                        strokeDashoffset={251.2 - (251.2 * phaseProgress / 100)}
                                        strokeLinecap="round"
                                        className="phase-progress-circle"
                                    />
                                    <defs>
                                        <linearGradient id={`gradient-${phase.color.replace('bg-', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor={phase.color.replace('bg-', '').includes('blue') ? '#3B82F6' :
                                                phase.color.replace('bg-', '').includes('purple') ? '#8B5CF6' :
                                                    phase.color.replace('bg-', '').includes('orange') ? '#F59E0B' :
                                                        phase.color.replace('bg-', '').includes('red') ? '#EF4444' : '#6B7280'} />
                                            <stop offset="100%" stopColor={phase.color.replace('bg-', '').includes('blue') ? '#2563EB' :
                                                phase.color.replace('bg-', '').includes('purple') ? '#7C3AED' :
                                                    phase.color.replace('bg-', '').includes('orange') ? '#D97706' :
                                                        phase.color.replace('bg-', '').includes('red') ? '#DC2626' : '#4B5563'} />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-sm font-bold">{phaseProgress}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Phase Details */}
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <div className="bg-gray-50 dark:bg-navy-800 p-2 rounded-lg">
                                <div className="text-xs text-gray-500 dark:text-gray-400">Start Date</div>
                                <div className="text-sm font-medium">{formatDate(phase.start)}</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-navy-800 p-2 rounded-lg">
                                <div className="text-xs text-gray-500 dark:text-gray-400">End Date</div>
                                <div className="text-sm font-medium">{formatDate(phase.end)}</div>
                            </div>
                        </div>

                        {/* Days Remaining */}
                        {getDaysRemaining(phase.end) > 0 && (
                            <div className={`mt-3 py-2 px-3 rounded-lg text-center ${phase.color.replace('bg', 'bg').replace('500', '50')} 
                                    dark:bg-gray-800 border ${phase.color.replace('bg', 'border').replace('500', '200')} dark:border-gray-700`}>
                                <span className={`text-sm font-medium ${phase.color.replace('bg', 'text')}`}>
                                    {getDaysRemaining(phase.end)} days remaining in this phase
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Timeline Visualization - Enhanced Version */}
            <div
                className={`mb-6 ${animationTriggered ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: '0.5s' }}
                ref={timelineRef}
            >
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-navy-900 dark:to-navy-800 
                    rounded-2xl p-4 border border-gray-200 dark:border-navy-700 shadow-sm">
                    <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleSection('timeline')}>
                        <div className="flex items-center">
                            <MdCalendarToday className="text-brand-500 mr-2" />
                            <h5 className="text-sm font-semibold text-navy-700 dark:text-white">Session Timeline</h5>
                        </div>
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-navy-700 transition-transform duration-300 ${expandedSection === 'timeline' ? 'rotate-180' : ''}`}>
                            <MdKeyboardArrowDown className="text-gray-600 dark:text-gray-400" />
                        </div>
                    </div>

                    <div className={`transition-all duration-500 overflow-hidden ${expandedSection === 'timeline' ? 'max-h-[450px]' : 'max-h-0'}`}>
                        {/* SVG Timeline Path */}
                        <div className="relative pl-12 mt-2">
                            {/* Curved SVG Path - Modernized */}
                            <div className="absolute left-2 top-0 bottom-0 z-0">
                                <svg className="h-full" width="40" style={{ minHeight: '400px' }}>
                                    <path
                                        d="M20,0 v400"
                                        stroke="url(#timeline-gradient)"
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                        fill="none"
                                        className="timeline-path"
                                        filter="url(#glow)"
                                    />
                                    <circle cx="20" cy="20%" r="1.5" fill="#fff" className="timeline-dot" />
                                    <circle cx="20" cy="40%" r="1.5" fill="#fff" className="timeline-dot" />
                                    <circle cx="20" cy="60%" r="1.5" fill="#fff" className="timeline-dot" />
                                    <circle cx="20" cy="80%" r="1.5" fill="#fff" className="timeline-dot" />
                                    <defs>
                                        <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#3B82F6" />
                                            <stop offset="25%" stopColor="#8B5CF6" />
                                            <stop offset="50%" stopColor="#F59E0B" />
                                            <stop offset="75%" stopColor="#EF4444" />
                                            <stop offset="100%" stopColor="#6B7280" />
                                        </linearGradient>
                                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>

                            {/* Time Tracker Ball - Modernized */}
                            <div
                                className="absolute left-2 z-20 timeline-tracker"
                                style={{
                                    top: `${Math.min(getProgress(), 100)}%`,
                                    transform: 'translateX(-50%) translateY(-50%)'
                                }}
                            >
                            </div>

                            {/* Timeline Items */}
                            {/* Proposal Submission Phase */}
                            <div className="mb-6 timeline-item opacity-0 transition-all duration-500 delay-100">
                                <div className="flex items-start relative">
                                    {/* Timeline Connector - Modernized */}
                                    <div className="absolute -left-10 top-3 flex flex-col items-center justify-center z-10">
                                        <div className={`h-9 w-9 rounded-full shadow-xl flex items-center justify-center 
                    ${isAfter(new Date(), new Date(currentSession.proposalDeadline))
                                                ? 'bg-gradient-to-br from-green-400 to-green-600 text-white'
                                                : isBefore(new Date(), new Date(currentSession.proposalDeadline))
                                                    ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white timeline-active-node'
                                                    : 'bg-gradient-to-br from-gray-300 to-gray-500 text-white/90'
                                            }`}>
                                            {isAfter(new Date(), new Date(currentSession.proposalDeadline))
                                                ? <MdOutlineTaskAlt className="text-lg" />
                                                : <MdOutlineAssignment className="text-lg" />
                                            }
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className={`w-full p-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md
                                        ${isBefore(new Date(), new Date(currentSession.proposalDeadline))
                                            ? 'bg-gradient-to-br from-blue-50/90 to-blue-100/90 dark:from-blue-900/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-900/30 shadow-sm'
                                            : isAfter(new Date(), new Date(currentSession.proposalDeadline))
                                                ? 'bg-gradient-to-br from-green-50/90 to-green-100/90 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-900/30'
                                                : 'bg-white/80 dark:bg-navy-700/80 backdrop-blur-sm border border-gray-200 dark:border-navy-600'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`min-w-[40px] h-10 w-10 rounded-full flex items-center justify-center
                                                ${isBefore(new Date(), new Date(currentSession.proposalDeadline))
                                                    ? 'bg-blue-200 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                    : isAfter(new Date(), new Date(currentSession.proposalDeadline))
                                                        ? 'bg-green-200 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                                }`}
                                            >
                                                <MdAssignment className="text-xl" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                                                    <h6 className="font-semibold text-navy-700 dark:text-white text-base">Proposal Submission</h6>
                                                    {isBefore(new Date(), new Date(currentSession.proposalDeadline)) && (
                                                        <span className="text-xs py-1 px-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center">
                                                            <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-1 animate-pulse"></span>
                                                            Active Phase
                                                        </span>
                                                    )}
                                                    {isAfter(new Date(), new Date(currentSession.proposalDeadline)) && (
                                                        <span className="text-xs py-1 px-2.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center">
                                                            <MdCheck className="mr-1" />
                                                            Completed
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                                    Faculty members submit research proposals for review and funding consideration.
                                                </p>

                                                <div className="flex flex-wrap items-center gap-3 mt-1">
                                                    <div className="flex items-center text-xs bg-white/80 dark:bg-navy-700/80 py-1 px-2 rounded-lg shadow-sm">
                                                        <MdDateRange className="text-gray-500 mr-1" />
                                                        <span>{formatDate(currentSession.proposalDeadline)}</span>
                                                    </div>

                                                    {isBefore(new Date(), new Date(currentSession.proposalDeadline)) && (
                                                        <div className="relative w-28 h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                                                            <div className="absolute top-0 left-0 h-full bg-blue-400 rounded-full"
                                                                style={{
                                                                    width: `${getPhaseRemainingPercentage(currentSession.startDate, currentSession.proposalDeadline)}%`
                                                                }}>
                                                            </div>
                                                            <div className="absolute top-0 left-0 h-full w-full opacity-30 shimmer-effect"></div>
                                                        </div>
                                                    )}

                                                    {isBefore(new Date(), new Date(currentSession.proposalDeadline)) && (
                                                        <div className="text-xs font-medium text-blue-500 dark:text-blue-400">
                                                            {getDaysRemaining(currentSession.proposalDeadline)} days left
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Eligibility Review Phase */}
                            <div className="mb-6 timeline-item opacity-0 transition-all duration-500 delay-200">
                                <div className="flex items-start relative">
                                    {/* Timeline Connector - Modernized */}
                                    <div className="absolute -left-10 top-3 flex flex-col items-center justify-center z-10">
                                        <div className={`h-9 w-9 rounded-full shadow-xl flex items-center justify-center 
                    ${isAfter(new Date(), new Date(currentSession.reviewDeadline))
                                                ? 'bg-gradient-to-br from-green-400 to-green-600 text-white'
                                                : isBefore(new Date(), new Date(currentSession.reviewDeadline)) &&
                                                    isAfter(new Date(), new Date(currentSession.proposalDeadline))
                                                    ? 'bg-gradient-to-br from-purple-400 to-purple-600 text-white timeline-active-node'
                                                    : 'bg-gradient-to-br from-gray-300 to-gray-500 text-white/90'
                                            }`}>
                                            {isAfter(new Date(), new Date(currentSession.reviewDeadline))
                                                ? <MdOutlineTaskAlt className="text-lg" />
                                                : <MdOutlineRateReview className="text-lg" />
                                            }
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className={`w-full p-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md
                                        ${isBefore(new Date(), new Date(currentSession.reviewDeadline)) &&
                                            isAfter(new Date(), new Date(currentSession.proposalDeadline))
                                            ? 'bg-gradient-to-br from-purple-50/90 to-purple-100/90 dark:from-purple-900/20 dark:to-purple-900/10 border border-purple-200 dark:border-purple-900/30 shadow-sm'
                                            : isAfter(new Date(), new Date(currentSession.reviewDeadline))
                                                ? 'bg-gradient-to-br from-green-50/90 to-green-100/90 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-900/30'
                                                : 'bg-white/80 dark:bg-navy-700/80 backdrop-blur-sm border border-gray-200 dark:border-navy-600'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`min-w-[40px] h-10 w-10 rounded-full flex items-center justify-center
                                                ${isBefore(new Date(), new Date(currentSession.reviewDeadline)) &&
                                                    isAfter(new Date(), new Date(currentSession.proposalDeadline))
                                                    ? 'bg-purple-200 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                                    : isAfter(new Date(), new Date(currentSession.reviewDeadline))
                                                        ? 'bg-green-200 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                                }`}
                                            >
                                                <MdCheck className="text-xl" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                                                    <h6 className="font-semibold text-navy-700 dark:text-white text-base">Eligibility Review</h6>
                                                    {isBefore(new Date(), new Date(currentSession.reviewDeadline)) &&
                                                        isAfter(new Date(), new Date(currentSession.proposalDeadline)) && (
                                                            <span className="text-xs py-1 px-2.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center">
                                                                <span className="h-1.5 w-1.5 bg-purple-500 rounded-full mr-1 animate-pulse"></span>
                                                                Active Phase
                                                            </span>
                                                        )}
                                                    {isAfter(new Date(), new Date(currentSession.reviewDeadline)) && (
                                                        <span className="text-xs py-1 px-2.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center">
                                                            <MdCheck className="mr-1" />
                                                            Completed
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                                    Proposals are reviewed by committee members for eligibility and merit assessment.
                                                </p>

                                                <div className="flex flex-wrap items-center gap-3 mt-1">
                                                    <div className="flex items-center text-xs bg-white/80 dark:bg-navy-700/80 py-1 px-2 rounded-lg shadow-sm">
                                                        <MdDateRange className="text-gray-500 mr-1" />
                                                        <span>{formatDate(currentSession.reviewDeadline)}</span>
                                                    </div>

                                                    {isBefore(new Date(), new Date(currentSession.reviewDeadline)) &&
                                                        isAfter(new Date(), new Date(currentSession.proposalDeadline)) && (
                                                            <div className="relative w-28 h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                                                                <div className="absolute top-0 left-0 h-full bg-purple-400 rounded-full"
                                                                    style={{
                                                                        width: `${getPhaseRemainingPercentage(currentSession.proposalDeadline, currentSession.reviewDeadline)}%`
                                                                    }}>
                                                                </div>
                                                                <div className="absolute top-0 left-0 h-full w-full opacity-30 shimmer-effect"></div>
                                                            </div>
                                                        )}

                                                    {isBefore(new Date(), new Date(currentSession.reviewDeadline)) &&
                                                        isAfter(new Date(), new Date(currentSession.proposalDeadline)) && (
                                                            <div className="text-xs font-medium text-purple-500 dark:text-purple-400">
                                                                {getDaysRemaining(currentSession.reviewDeadline)} days left
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Report Phase */}
                            <div className="mb-6 timeline-item opacity-0 transition-all duration-500 delay-300">
                                <div className="flex items-start relative">
                                    {/* Timeline Connector - Modernized */}
                                    <div className="absolute -left-10 top-3 flex flex-col items-center justify-center z-10">
                                        <div className={`h-9 w-9 rounded-full shadow-xl flex items-center justify-center 
                    ${isAfter(new Date(), new Date(currentSession.progressReportDeadline))
                                                ? 'bg-gradient-to-br from-green-400 to-green-600 text-white'
                                                : isBefore(new Date(), new Date(currentSession.progressReportDeadline)) &&
                                                    isAfter(new Date(), new Date(currentSession.reviewDeadline))
                                                    ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white timeline-active-node'
                                                    : 'bg-gradient-to-br from-gray-300 to-gray-500 text-white/90'
                                            }`}>
                                            {isAfter(new Date(), new Date(currentSession.progressReportDeadline))
                                                ? <MdOutlineTaskAlt className="text-lg" />
                                                : <MdOutlinePublishedWithChanges className="text-lg" />
                                            }
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className={`w-full p-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md
                                        ${isBefore(new Date(), new Date(currentSession.progressReportDeadline)) &&
                                            isAfter(new Date(), new Date(currentSession.reviewDeadline))
                                            ? 'bg-gradient-to-br from-orange-50/90 to-orange-100/90 dark:from-orange-900/20 dark:to-orange-900/10 border border-orange-200 dark:border-orange-900/30 shadow-sm'
                                            : isAfter(new Date(), new Date(currentSession.progressReportDeadline))
                                                ? 'bg-gradient-to-br from-green-50/90 to-green-100/90 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-900/30'
                                                : 'bg-white/80 dark:bg-navy-700/80 backdrop-blur-sm border border-gray-200 dark:border-navy-600'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`min-w-[40px] h-10 w-10 rounded-full flex items-center justify-center
                                                ${isBefore(new Date(), new Date(currentSession.progressReportDeadline)) &&
                                                    isAfter(new Date(), new Date(currentSession.reviewDeadline))
                                                    ? 'bg-orange-200 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                                                    : isAfter(new Date(), new Date(currentSession.progressReportDeadline))
                                                        ? 'bg-green-200 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                                }`}
                                            >
                                                <MdInfo className="text-xl" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                                                    <h6 className="font-semibold text-navy-700 dark:text-white text-base">Progress Report</h6>
                                                    {isBefore(new Date(), new Date(currentSession.progressReportDeadline)) &&
                                                        isAfter(new Date(), new Date(currentSession.reviewDeadline)) && (
                                                            <span className="text-xs py-1 px-2.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center">
                                                                <span className="h-1.5 w-1.5 bg-orange-500 rounded-full mr-1 animate-pulse"></span>
                                                                Active Phase
                                                            </span>
                                                        )}
                                                    {isAfter(new Date(), new Date(currentSession.progressReportDeadline)) && (
                                                        <span className="text-xs py-1 px-2.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center">
                                                            <MdCheck className="mr-1" />
                                                            Completed
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                                    Approved projects submit mid-term progress reports documenting current status.
                                                </p>

                                                <div className="flex flex-wrap items-center gap-3 mt-1">
                                                    <div className="flex items-center text-xs bg-white/80 dark:bg-navy-700/80 py-1 px-2 rounded-lg shadow-sm">
                                                        <MdDateRange className="text-gray-500 mr-1" />
                                                        <span>{formatDate(currentSession.progressReportDeadline)}</span>
                                                    </div>

                                                    {isBefore(new Date(), new Date(currentSession.progressReportDeadline)) &&
                                                        isAfter(new Date(), new Date(currentSession.reviewDeadline)) && (
                                                            <div className="relative w-28 h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                                                                <div className="absolute top-0 left-0 h-full bg-orange-400 rounded-full"
                                                                    style={{
                                                                        width: `${getPhaseRemainingPercentage(currentSession.reviewDeadline, currentSession.progressReportDeadline)}%`
                                                                    }}>
                                                                </div>
                                                                <div className="absolute top-0 left-0 h-full w-full opacity-30 shimmer-effect"></div>
                                                            </div>
                                                        )}

                                                    {isBefore(new Date(), new Date(currentSession.progressReportDeadline)) &&
                                                        isAfter(new Date(), new Date(currentSession.reviewDeadline)) && (
                                                            <div className="text-xs font-medium text-orange-500 dark:text-orange-400">
                                                                {getDaysRemaining(currentSession.progressReportDeadline)} days left
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Final Report Phase */}
                            <div className="timeline-item opacity-0 transition-all duration-500 delay-400">
                                <div className="flex items-start relative">
                                    {/* Timeline Connector - Modernized */}
                                    <div className="absolute -left-10 top-3 flex flex-col items-center justify-center z-10">
                                        <div className={`h-9 w-9 rounded-full shadow-xl flex items-center justify-center 
                    ${isAfter(new Date(), new Date(currentSession.finalReportDeadline))
                                                ? 'bg-gradient-to-br from-green-400 to-green-600 text-white'
                                                : isBefore(new Date(), new Date(currentSession.finalReportDeadline)) &&
                                                    isAfter(new Date(), new Date(currentSession.progressReportDeadline))
                                                    ? 'bg-gradient-to-br from-red-400 to-red-600 text-white timeline-active-node'
                                                    : 'bg-gradient-to-br from-gray-300 to-gray-500 text-white/90'
                                            }`}>
                                            {isAfter(new Date(), new Date(currentSession.finalReportDeadline))
                                                ? <MdOutlineTaskAlt className="text-lg" />
                                                : <MdAssignmentTurnedIn className="text-lg" />
                                            }
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className={`w-full p-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md
                                        ${isBefore(new Date(), new Date(currentSession.finalReportDeadline)) &&
                                            isAfter(new Date(), new Date(currentSession.progressReportDeadline))
                                            ? 'bg-gradient-to-br from-red-50/90 to-red-100/90 dark:from-red-900/20 dark:to-red-900/10 border border-red-200 dark:border-red-900/30 shadow-sm'
                                            : isAfter(new Date(), new Date(currentSession.finalReportDeadline))
                                                ? 'bg-gradient-to-br from-green-50/90 to-green-100/90 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-900/30'
                                                : 'bg-white/80 dark:bg-navy-700/80 backdrop-blur-sm border border-gray-200 dark:border-navy-600'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`min-w-[40px] h-10 w-10 rounded-full flex items-center justify-center
                                                ${isBefore(new Date(), new Date(currentSession.finalReportDeadline)) &&
                                                    isAfter(new Date(), new Date(currentSession.progressReportDeadline))
                                                    ? 'bg-red-200 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                                    : isAfter(new Date(), new Date(currentSession.finalReportDeadline))
                                                        ? 'bg-green-200 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                                }`}
                                            >
                                                <MdFlag className="text-xl" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                                                    <h6 className="font-semibold text-navy-700 dark:text-white text-base">Final Report</h6>
                                                    {isBefore(new Date(), new Date(currentSession.finalReportDeadline)) &&
                                                        isAfter(new Date(), new Date(currentSession.progressReportDeadline)) && (
                                                            <span className="text-xs py-1 px-2.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center">
                                                                <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                                                                Active Phase
                                                            </span>
                                                        )}
                                                    {isAfter(new Date(), new Date(currentSession.finalReportDeadline)) && (
                                                        <span className="text-xs py-1 px-2.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center">
                                                            <MdCheck className="mr-1" />
                                                            Completed
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                                    Projects submit comprehensive final reports with outcomes and financial documentation.
                                                </p>

                                                <div className="flex flex-wrap items-center gap-3 mt-1">
                                                    <div className="flex items-center text-xs bg-white/80 dark:bg-navy-700/80 py-1 px-2 rounded-lg shadow-sm">
                                                        <MdDateRange className="text-gray-500 mr-1" />
                                                        <span>{formatDate(currentSession.finalReportDeadline)}</span>
                                                    </div>

                                                    {isBefore(new Date(), new Date(currentSession.finalReportDeadline)) &&
                                                        isAfter(new Date(), new Date(currentSession.progressReportDeadline)) && (
                                                            <div className="relative w-28 h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                                                                <div className="absolute top-0 left-0 h-full bg-red-400 rounded-full"
                                                                    style={{
                                                                        width: `${getPhaseRemainingPercentage(currentSession.progressReportDeadline, currentSession.finalReportDeadline)}%`
                                                                    }}>
                                                                </div>
                                                                <div className="absolute top-0 left-0 h-full w-full opacity-30 shimmer-effect"></div>
                                                            </div>
                                                        )}

                                                    {isBefore(new Date(), new Date(currentSession.finalReportDeadline)) &&
                                                        isAfter(new Date(), new Date(currentSession.progressReportDeadline)) && (
                                                            <div className="text-xs font-medium text-red-500 dark:text-red-400">
                                                                {getDaysRemaining(currentSession.finalReportDeadline)} days left
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Session Metrics Cards */}
            <div className={`grid grid-cols-3 gap-3 mb-6 ${animationTriggered ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <div className="p-4 bg-gradient-to-br from-white to-blue-50 dark:from-navy-800 dark:to-navy-900 rounded-2xl shadow-sm border border-blue-100 dark:border-blue-900/20 group hover:shadow-md transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 mb-3 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <TbFileCheck className="text-blue-500 text-xl" />
                        </div>
                        <h5 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{currentSession.proposalCount}</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Total Proposals</p>
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-white to-green-50 dark:from-navy-800 dark:to-navy-900 rounded-2xl shadow-sm border border-green-100 dark:border-green-900/20 group hover:shadow-md transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 mb-3 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <MdCheck className="text-green-500 text-xl" />
                        </div>
                        <h5 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{currentSession.approvedCount}</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Approved</p>
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-white to-purple-50 dark:from-navy-800 dark:to-navy-900 rounded-2xl shadow-sm border border-purple-100 dark:border-purple-900/20 group hover:shadow-md transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 mb-3 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <TbUsers className="text-purple-500 text-xl" />
                        </div>
                        <h5 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{currentSession.participantCount}</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Participants</p>
                    </div>
                </div>
            </div>

            {/* Session Actions */}
            <div className={`mt-auto grid grid-cols-2 gap-3 ${animationTriggered ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
                <Link to="/admin/session-management">
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-brand-400 to-brand-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center group">
                        <MdSettings className="mr-2" />
                        <span>Manage Session</span>
                    </button>
                </Link>
                <Link to="/admin/proposal-management">
                    <button className="w-full py-3 px-4 bg-white dark:bg-navy-700 text-gray-700 dark:text-white border border-gray-200 dark:border-navy-600 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-600 hover:shadow-md transition-all duration-200 flex items-center justify-center group">
                        <MdAssignment className="mr-2" />
                        <span>View Proposals</span>
                    </button>
                </Link>
            </div>

            {/* CSS for animations */}
            <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease forwards;
        }
        
        .timeline-visible {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        
        .timeline-item {
          transform: translateX(-20px);
        }
        
        .shimmer-effect {
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes drawPath {
            from {
                stroke-dashoffset: 500;
            }
            to {
                stroke-dashoffset: 0;
            }
        }
        
        .timeline-path {
            animation: drawPath 1.5s ease-in-out forwards;
        }
        
        .pulse-blue {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
            animation: pulse-blue 2s infinite;
        }
        
        .pulse-purple {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
            animation: pulse-purple 2s infinite;
        }
        
        .pulse-orange {
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7);
            animation: pulse-orange 2s infinite;
        }
        
        .pulse-red {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
            animation: pulse-red 2s infinite;
        }
        
        @keyframes pulse-blue {
            0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        @keyframes pulse-purple {
            0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(139, 92, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
        }
        
        @keyframes pulse-orange {
            0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
            100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
        }
        
        @keyframes pulse-red {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        
        .timeline-tracker {
            transition: top 1s cubic-bezier(0.65, 0, 0.35, 1);
        }

        @keyframes drawPath {
            from {
                stroke-dashoffset: 400;
            }
            to {
                stroke-dashoffset: 0;
            }
        }
        
        .timeline-path {
            animation: drawPath 1.8s ease-out forwards;
            filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.5));
        }
        
        @keyframes tracker-pulse {
            0% { 
                opacity: 0.7;
                transform: scale(0.8);
            }
            50% { 
                opacity: 0.3;
                transform: scale(1.2);
            }
            100% { 
                opacity: 0.7;
                transform: scale(0.8);
            }
        }
        
        .tracker-pulse {
            animation: tracker-pulse 2s ease-in-out infinite;
        }
        
        .timeline-active-node {
            position: relative;
        }
        
        .timeline-active-node::after {
            content: '';
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            border-radius: 50%;
            background: inherit;
            opacity: 0.5;
            z-index: -1;
            animation: node-pulse 2s infinite;
        }
        
        @keyframes node-pulse {
            0% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.1; }
            100% { transform: scale(1); opacity: 0.3; }
        }

        .phase-progress-circle {
            transition: stroke-dashoffset 1s ease;
        }
        
        @keyframes pulse-soft {
            0% { transform: scale(1); }
            50% { transform: scale(1.08); }
            100% { transform: scale(1); }
        }
        
        .pulse-soft {
            animation: pulse-soft 2s infinite;
        }
      `}</style>
        </Card >
    );
};

export default ActiveSession;
