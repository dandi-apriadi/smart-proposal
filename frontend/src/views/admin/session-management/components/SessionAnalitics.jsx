import React, { useState, useEffect } from "react";
import Card from "components/card";
import {
    MdOutlineCalendarToday,
    MdOutlineAssignment,
    MdOutlinePeopleOutline,
    MdOutlineCheck,
    MdOutlineTimeline,
    MdOutlineBarChart,
    MdOutlineShowChart,
    MdOutlinePieChart,
    MdOutlineFilterList,
    MdOutlineFileDownload,
    MdOutlineInfo,
    MdOutlineSchedule,
    MdOutlineAccessTime,
    MdOutlineCheckCircleOutline,
    MdOutlineGroupWork,
    MdOutlineSpeed,
    MdChevronLeft,
    MdChevronRight,
    MdOutlineInsights,
    MdExpandMore,
    MdExpandLess,
    MdOutlineMoreVert,
    MdOutlineSearch,
    MdOutlineRefresh,
    MdFilterAlt,
    MdOutlineCategory,
    MdOutlineAttachMoney,
    MdOutlineLocationOn,
    MdOutlineTimer,
} from "react-icons/md";
import {
    LineChart,
    Line,
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
    Cell,
    AreaChart,
    Area,
    ReferenceLine,
} from "recharts";
import AOS from "aos";
import "aos/dist/aos.css";

const SessionAnalytics = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [timeRange, setTimeRange] = useState("all");
    const [expandedSections, setExpandedSections] = useState({
        submissions: true,
        completion: true,
        reviewers: true,
        timeline: true,
    });
    const [sessionsData, setSessionsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [comparePeriod, setComparePeriod] = useState("previous");
    const [selectedSession, setSelectedSession] = useState("all");

    // Initialize AOS animation
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });

        // Fetch dummy data
        fetchDummyData();
    }, []);

    const fetchDummyData = () => {
        // This would be replaced with actual API calls
        setTimeout(() => {
            setSessionsData(generateDummySessions());
            setIsLoading(false);
        }, 800);
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
                completionRate: 72.9,
                avgReviewTime: 3.2, // days
                reviewProgress: 85, // percentage
                reviewers: [
                    { userId: "u1", role: "lead", name: "Dr. John Smith", assignedProposals: 15, completedReviews: 12 },
                    { userId: "u2", role: "member", name: "Dr. Jane Doe", assignedProposals: 18, completedReviews: 16 },
                    { userId: "u3", role: "member", name: "Prof. Michael Brown", assignedProposals: 15, completedReviews: 12 },
                ],
                submissionTrend: [
                    { day: "2025-04-01", count: 2 },
                    { day: "2025-04-02", count: 5 },
                    { day: "2025-04-03", count: 3 },
                    { day: "2025-04-04", count: 4 },
                    { day: "2025-04-05", count: 2 },
                    { day: "2025-04-10", count: 8 },
                    { day: "2025-04-15", count: 6 },
                    { day: "2025-04-20", count: 3 },
                    { day: "2025-04-25", count: 2 },
                    { day: "2025-05-01", count: 4 },
                    { day: "2025-05-05", count: 3 },
                    { day: "2025-05-10", count: 6 },
                    { day: "2025-05-14", count: 12 },
                    { day: "2025-05-15", count: 18 },
                ],
                approvalRate: [
                    { name: "Approved", value: 35 },
                    { name: "Rejected", value: 8 },
                    { name: "Pending", value: 5 },
                ],
                reviewersPerformance: [
                    { name: "Dr. John Smith", assigned: 15, completed: 12, avgTime: 2.8 },
                    { name: "Dr. Jane Doe", assigned: 18, completed: 16, avgTime: 2.3 },
                    { name: "Prof. Michael Brown", assigned: 15, completed: 12, avgTime: 3.1 },
                ],
                departmentDistribution: [
                    { name: "Engineering", value: 15 },
                    { name: "Computer Science", value: 12 },
                    { name: "Business", value: 8 },
                    { name: "Health Sciences", value: 6 },
                    { name: "Arts & Humanities", value: 4 },
                    { name: "Other", value: 3 },
                ],
                researchCategories: [
                    { name: "Applied Research", value: 18, approved: 14, budget: 320000 },
                    { name: "Basic Research", value: 12, approved: 9, budget: 180000 },
                    { name: "Experimental Development", value: 8, approved: 6, budget: 150000 },
                    { name: "Clinical Trials", value: 5, approved: 3, budget: 120000 },
                    { name: "Policy Research", value: 3, approved: 2, budget: 60000 },
                    { name: "Other", value: 2, approved: 1, budget: 40000 },
                ],
                fundingAllocation: {
                    total: 870000,
                    allocated: 760000,
                    remaining: 110000,
                    averagePerProject: 21714,
                    distribution: [
                        { name: "Equipment", value: 310000 },
                        { name: "Personnel", value: 280000 },
                        { name: "Materials", value: 100000 },
                        { name: "Travel", value: 70000 },
                    ]
                },
                geographicDistribution: [
                    { name: "North Region", value: 20 },
                    { name: "South Region", value: 12 },
                    { name: "East Region", value: 8 },
                    { name: "West Region", value: 7 },
                    { name: "International", value: 1 },
                ],
                projectDurations: [
                    { name: "< 6 months", value: 5 },
                    { name: "6-12 months", value: 18 },
                    { name: "1-2 years", value: 20 },
                    { name: "2-3 years", value: 4 },
                    { name: "3+ years", value: 1 },
                ],
                progressReports: {
                    submitted: 28,
                    pending: 7,
                    late: 0,
                    approved: 25,
                    revisionRequired: 3,
                },
                finalReports: {
                    submitted: 0,
                    pending: 35,
                    late: 0,
                    approved: 0,
                    revisionRequired: 0,
                },
                createdBy: "u3",
                createdAt: "2025-03-15T10:30:00Z",
                updatedAt: "2025-04-01T09:00:00Z",
            },
            {
                _id: "s2",
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
                completionRate: 97.4,
                avgReviewTime: 2.8, // days
                reviewProgress: 100, // percentage
                reviewers: [
                    { userId: "u1", role: "lead", name: "Dr. John Smith", assignedProposals: 17, completedReviews: 17 },
                    { userId: "u4", role: "member", name: "Prof. Michael Brown", assignedProposals: 18, completedReviews: 18 },
                    { userId: "u5", role: "member", name: "Dr. Sarah Johnson", assignedProposals: 17, completedReviews: 17 },
                ],
                submissionTrend: [
                    { day: "2024-10-01", count: 3 },
                    { day: "2024-10-10", count: 6 },
                    { day: "2024-10-20", count: 5 },
                    { day: "2024-10-30", count: 8 },
                    { day: "2024-11-05", count: 10 },
                    { day: "2024-11-10", count: 7 },
                    { day: "2024-11-14", count: 14 },
                    { day: "2024-11-15", count: 22 },
                ],
                approvalRate: [
                    { name: "Approved", value: 38 },
                    { name: "Rejected", value: 14 },
                    { name: "Pending", value: 0 },
                ],
                reviewersPerformance: [
                    { name: "Dr. John Smith", assigned: 17, completed: 17, avgTime: 2.4 },
                    { name: "Prof. Michael Brown", assigned: 18, completed: 18, avgTime: 3.0 },
                    { name: "Dr. Sarah Johnson", assigned: 17, completed: 17, avgTime: 2.9 },
                ],
                departmentDistribution: [
                    { name: "Engineering", value: 18 },
                    { name: "Computer Science", value: 15 },
                    { name: "Business", value: 7 },
                    { name: "Health Sciences", value: 8 },
                    { name: "Arts & Humanities", value: 2 },
                    { name: "Other", value: 2 },
                ],
                researchCategories: [
                    { name: "Applied Research", value: 22, approved: 16, budget: 350000 },
                    { name: "Basic Research", value: 10, approved: 8, budget: 160000 },
                    { name: "Experimental Development", value: 12, approved: 9, budget: 190000 },
                    { name: "Clinical Trials", value: 4, approved: 3, budget: 110000 },
                    { name: "Policy Research", value: 3, approved: 2, budget: 55000 },
                    { name: "Other", value: 1, approved: 0, budget: 0 },
                ],
                fundingAllocation: {
                    total: 865000,
                    allocated: 805000,
                    remaining: 60000,
                    averagePerProject: 21184,
                    distribution: [
                        { name: "Equipment", value: 320000 },
                        { name: "Personnel", value: 295000 },
                        { name: "Materials", value: 110000 },
                        { name: "Travel", value: 80000 },
                    ]
                },
                geographicDistribution: [
                    { name: "North Region", value: 22 },
                    { name: "South Region", value: 15 },
                    { name: "East Region", value: 7 },
                    { name: "West Region", value: 8 },
                    { name: "International", value: 0 },
                ],
                projectDurations: [
                    { name: "< 6 months", value: 6 },
                    { name: "6-12 months", value: 20 },
                    { name: "1-2 years", value: 18 },
                    { name: "2-3 years", value: 8 },
                    { name: "3+ years", value: 0 },
                ],
                progressReports: {
                    submitted: 36,
                    pending: 2,
                    late: 0,
                    approved: 35,
                    revisionRequired: 1,
                },
                finalReports: {
                    submitted: 37,
                    pending: 1,
                    late: 0,
                    approved: 36,
                    revisionRequired: 1,
                },
                createdBy: "u3",
                createdAt: "2024-09-15T11:30:00Z",
                updatedAt: "2025-04-05T10:00:00Z",
            },
            {
                _id: "s3",
                name: "Session 2024-1",
                description: "First research proposal session of 2024",
                status: "completed",
                startDate: "2024-04-01T00:00:00Z",
                endDate: "2024-09-30T23:59:59Z",
                proposalDeadline: "2024-05-15T23:59:59Z",
                reviewDeadline: "2024-06-15T23:59:59Z",
                progressReportDeadline: "2024-08-15T23:59:59Z",
                finalReportDeadline: "2024-09-15T23:59:59Z",
                proposalCount: 45,
                approvedCount: 32,
                participantCount: 58,
                completionRate: 93.8,
                avgReviewTime: 3.5, // days
                reviewProgress: 100, // percentage
                reviewers: [
                    { userId: "u2", role: "lead", name: "Dr. Jane Doe", assignedProposals: 15, completedReviews: 15 },
                    { userId: "u5", role: "member", name: "Dr. Sarah Johnson", assignedProposals: 15, completedReviews: 15 },
                    { userId: "u6", role: "member", name: "Prof. David Wilson", assignedProposals: 15, completedReviews: 15 },
                ],
                submissionTrend: [
                    { day: "2024-04-05", count: 4 },
                    { day: "2024-04-15", count: 7 },
                    { day: "2024-04-25", count: 6 },
                    { day: "2024-05-05", count: 9 },
                    { day: "2024-05-10", count: 8 },
                    { day: "2024-05-14", count: 11 },
                    { day: "2024-05-15", count: 16 },
                ],
                approvalRate: [
                    { name: "Approved", value: 32 },
                    { name: "Rejected", value: 13 },
                    { name: "Pending", value: 0 },
                ],
                reviewersPerformance: [
                    { name: "Dr. Jane Doe", assigned: 15, completed: 15, avgTime: 3.2 },
                    { name: "Dr. Sarah Johnson", assigned: 15, completed: 15, avgTime: 3.8 },
                    { name: "Prof. David Wilson", assigned: 15, completed: 15, avgTime: 3.6 },
                ],
                departmentDistribution: [
                    { name: "Engineering", value: 14 },
                    { name: "Computer Science", value: 13 },
                    { name: "Business", value: 6 },
                    { name: "Health Sciences", value: 7 },
                    { name: "Arts & Humanities", value: 3 },
                    { name: "Other", value: 2 },
                ],
                researchCategories: [
                    { name: "Applied Research", value: 16, approved: 12, budget: 280000 },
                    { name: "Basic Research", value: 14, approved: 10, budget: 200000 },
                    { name: "Experimental Development", value: 7, approved: 5, budget: 120000 },
                    { name: "Clinical Trials", value: 5, approved: 3, budget: 100000 },
                    { name: "Policy Research", value: 2, approved: 1, budget: 40000 },
                    { name: "Other", value: 1, approved: 1, budget: 35000 },
                ],
                fundingAllocation: {
                    total: 775000,
                    allocated: 730000,
                    remaining: 45000,
                    averagePerProject: 22812,
                    distribution: [
                        { name: "Equipment", value: 290000 },
                        { name: "Personnel", value: 260000 },
                        { name: "Materials", value: 105000 },
                        { name: "Travel", value: 75000 },
                    ]
                },
                geographicDistribution: [
                    { name: "North Region", value: 18 },
                    { name: "South Region", value: 14 },
                    { name: "East Region", value: 6 },
                    { name: "West Region", value: 6 },
                    { name: "International", value: 1 },
                ],
                projectDurations: [
                    { name: "< 6 months", value: 4 },
                    { name: "6-12 months", value: 16 },
                    { name: "1-2 years", value: 19 },
                    { name: "2-3 years", value: 6 },
                    { name: "3+ years", value: 0 },
                ],
                progressReports: {
                    submitted: 30,
                    pending: 2,
                    late: 0,
                    approved: 28,
                    revisionRequired: 2,
                },
                finalReports: {
                    submitted: 30,
                    pending: 2,
                    late: 0,
                    approved: 29,
                    revisionRequired: 1,
                },
                createdBy: "u3",
                createdAt: "2024-03-15T09:30:00Z",
                updatedAt: "2024-10-05T14:00:00Z",
            },
        ];
    };

    // Get current active session or most recent completed
    const getActiveSession = () => {
        const activeSession = sessionsData.find((session) => session.status === "active");
        if (activeSession) return activeSession;

        // If no active session, get the most recently completed
        const completedSessions = sessionsData.filter((session) => session.status === "completed");
        if (completedSessions.length) {
            return completedSessions.sort((a, b) => new Date(b.endDate) - new Date(a.endDate))[0];
        }

        return null;
    };

    // Calculate KPI metrics
    const calculateKPIs = () => {
        const session = getActiveSession();
        if (!session) return {};

        // Find previous session data for comparison
        const prevSession = sessionsData
            .filter((s) => s.status === "completed")
            .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))[0];

        // Calculate changes compared to previous session
        const proposalChange = prevSession ? ((session.proposalCount - prevSession.proposalCount) / prevSession.proposalCount) * 100 : 0;
        const approvalChange = prevSession ? ((session.approvedCount / session.proposalCount) - (prevSession.approvedCount / prevSession.proposalCount)) * 100 : 0;
        const participantChange = prevSession ? ((session.participantCount - prevSession.participantCount) / prevSession.participantCount) * 100 : 0;
        const completionChange = prevSession ? (session.completionRate - prevSession.completionRate) : 0;

        return {
            proposalCount: session.proposalCount,
            proposalChange,
            approvedCount: session.approvedCount,
            approvalRate: (session.approvedCount / session.proposalCount) * 100,
            approvalChange,
            participantCount: session.participantCount,
            participantChange,
            completionRate: session.completionRate,
            completionChange,
            avgReviewTime: session.avgReviewTime,
            prevSessionName: prevSession ? prevSession.name : null,
        };
    };

    const toggleSection = (section) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section],
        });
    };

    // Custom colors for charts
    const COLORS = ["#4318FF", "#6AD2FF", "#EFF4FB", "#34B53A", "#FF5252", "#FFB547"];
    const APPROVAL_COLORS = ["#34B53A", "#FF5252", "#FFB547"];

    // Render different tab contents
    const renderTabContent = () => {
        switch (activeTab) {
            case "overview":
                return renderOverviewTab();
            case "submissions":
                return renderSubmissionsTab();
            case "reviewers":
                return renderReviewersTab();
            case "timeline":
                return renderTimelineTab();
            case "comparison":
                return renderComparisonTab();
            default:
                return renderOverviewTab();
        }
    };

    // Session selection dropdown
    const renderSessionSelector = () => {
        return (
            <div className="mb-8 flex flex-wrap items-center gap-4">
                <div className="flex-grow">
                    <select
                        className="w-full px-4 py-3 bg-white dark:bg-navy-900 border border-gray-300 dark:border-navy-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={selectedSession}
                        onChange={(e) => setSelectedSession(e.target.value)}
                    >
                        <option value="all">All Sessions</option>
                        {sessionsData.map((session) => (
                            <option key={session._id} value={session._id}>
                                {session.name} ({session.status})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        className="px-4 py-2.5 bg-white dark:bg-navy-800 border border-gray-300 dark:border-navy-600 rounded-xl text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-navy-700 flex items-center"
                        onClick={() => fetchDummyData()}
                    >
                        <MdOutlineRefresh className="mr-2" /> Refresh
                    </button>
                    <button
                        className="px-4 py-2.5 bg-white dark:bg-navy-800 border border-gray-300 dark:border-navy-600 rounded-xl text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-navy-700 flex items-center"
                    >
                        <MdOutlineFileDownload className="mr-2" /> Export
                    </button>
                    <button
                        className="p-2.5 bg-white dark:bg-navy-800 border border-gray-300 dark:border-navy-600 rounded-xl text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-navy-700 flex items-center"
                    >
                        <MdFilterAlt />
                    </button>
                </div>
            </div>
        );
    };

    // Overview Tab
    const renderOverviewTab = () => {
        const kpis = calculateKPIs();
        const session = getActiveSession();

        if (!session) return <div className="text-center py-8">No session data available</div>;

        return (
            <>
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-aos="fade-up">
                    {/* Proposals Card */}
                    <Card extra="!p-5 flex flex-col hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Proposals</p>
                                <div className="flex items-baseline mt-2">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{kpis.proposalCount}</h4>
                                    {kpis.proposalChange !== 0 && (
                                        <span className={`ml-3 text-xs font-medium ${kpis.proposalChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {kpis.proposalChange > 0 ? '↑' : '↓'} {Math.abs(kpis.proposalChange).toFixed(1)}%
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-3.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                                <MdOutlineAssignment className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            {kpis.prevSessionName && `Compared to ${kpis.prevSessionName}`}
                        </div>
                    </Card>

                    {/* Approval Rate Card */}
                    <Card extra="!p-5 flex flex-col hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approval Rate</p>
                                <div className="flex items-baseline mt-2">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{kpis.approvalRate.toFixed(1)}%</h4>
                                    {kpis.approvalChange !== 0 && (
                                        <span className={`ml-3 text-xs font-medium ${kpis.approvalChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {kpis.approvalChange > 0 ? '↑' : '↓'} {Math.abs(kpis.approvalChange).toFixed(1)}%
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-3.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <MdOutlineCheck className="h-7 w-7 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            {kpis.approvedCount} of {kpis.proposalCount} proposals approved
                        </div>
                    </Card>

                    {/* Participants Card */}
                    <Card extra="!p-5 flex flex-col hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Participants</p>
                                <div className="flex items-baseline mt-2">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{kpis.participantCount}</h4>
                                    {kpis.participantChange !== 0 && (
                                        <span className={`ml-3 text-xs font-medium ${kpis.participantChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {kpis.participantChange > 0 ? '↑' : '↓'} {Math.abs(kpis.participantChange).toFixed(1)}%
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-3.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                <MdOutlinePeopleOutline className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            {kpis.prevSessionName && `Compared to ${kpis.prevSessionName}`}
                        </div>
                    </Card>

                    {/* Average Review Time Card */}
                    <Card extra="!p-5 flex flex-col hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Review Time</p>
                                <div className="flex items-baseline mt-2">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{kpis.avgReviewTime} days</h4>
                                </div>
                            </div>
                            <div className="p-3.5 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                                <MdOutlineAccessTime className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            From submission to final decision
                        </div>
                    </Card>
                </div>

                {/* Main Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Submission Trend */}
                    <Card extra="!p-6 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="100">
                        <div className="flex justify-between items-center mb-5">
                            <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                                <MdOutlineShowChart className="mr-2.5 text-indigo-500" /> Proposal Submission Trend
                            </h4>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={session.submissionTrend}
                                    margin={{ top: 10, right: 30, left: 5, bottom: 15 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                    <XAxis dataKey="day" tickFormatter={(value) => value.split('-')[2]} />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value) => [`${value} proposals`, 'Submissions']}
                                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                    />
                                    <Area type="monotone" dataKey="count" stroke="#4318FF" fill="#4318FF" fillOpacity={0.2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                            Daily proposal submissions for {session.name}
                        </div>
                    </Card>

                    {/* Approval Rate Pie Chart */}
                    <Card extra="!p-6 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="200">
                        <div className="flex justify-between items-center mb-5">
                            <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                                <MdOutlinePieChart className="mr-2.5 text-indigo-500" /> Approval Distribution
                            </h4>
                        </div>
                        <div className="h-80 flex justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={session.approvalRate}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={110}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {session.approvalRate.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={APPROVAL_COLORS[index % APPROVAL_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value} proposals`, '']} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                            Distribution of proposal decisions
                        </div>
                    </Card>
                </div>

                {/* Department Distribution */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow mb-8" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineBarChart className="mr-2.5 text-indigo-500" /> Submissions by Department
                        </h4>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={session.departmentDistribution}
                                margin={{ top: 10, right: 30, left: 25, bottom: 10 }}
                                layout="vertical"
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={150} />
                                <Tooltip formatter={(value) => [`${value} proposals`, 'Submissions']} />
                                <Bar dataKey="value" fill="#4318FF" radius={[0, 4, 4, 0]}>
                                    {session.departmentDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Research Categories Section */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow mb-8" data-aos="fade-up" data-aos-delay="350">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineCategory className="mr-2.5 text-indigo-500" /> Research Categories Analysis
                        </h4>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={session.researchCategories}
                                    margin={{ top: 10, right: 30, left: 25, bottom: 10 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value, name) => [
                                            `${value} ${name === 'budget' ? 'USD' : 'proposals'}`,
                                            name === 'budget' ? 'Budget Allocation' : name === 'approved' ? 'Approved' : 'Total Submitted'
                                        ]}
                                    />
                                    <Legend />
                                    <Bar dataKey="value" name="Total Submitted" fill="#4318FF" />
                                    <Bar dataKey="approved" name="Approved" fill="#34B53A" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={session.researchCategories}
                                    margin={{ top: 10, right: 30, left: 25, bottom: 10 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value) => [`$${(value).toLocaleString()}`, 'Budget Allocation']}
                                    />
                                    <Bar dataKey="budget" name="Budget Allocation" fill="#6AD2FF" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex justify-between items-center border-t pt-4 mt-4 border-gray-200 dark:border-gray-700">
                            <div>
                                <span className="font-medium">Total Budget:</span> ${session.fundingAllocation.total.toLocaleString()}
                            </div>
                            <div>
                                <span className="font-medium">Avg. per Project:</span> ${session.fundingAllocation.averagePerProject.toLocaleString()}
                            </div>
                            <div>
                                <span className="font-medium">Remaining:</span> ${session.fundingAllocation.remaining.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Geographic Distribution */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow mb-8" data-aos="fade-up" data-aos-delay="400">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineLocationOn className="mr-2.5 text-indigo-500" /> Geographic Distribution
                        </h4>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={session.geographicDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {session.geographicDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value} proposals`, 'Submissions']} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Project Duration Distribution */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow mb-8" data-aos="fade-up" data-aos-delay="450">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineTimer className="mr-2.5 text-indigo-500" /> Project Duration Distribution
                        </h4>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={session.projectDurations}
                                margin={{ top: 10, right: 30, left: 25, bottom: 10 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip formatter={(value) => [`${value} projects`, 'Count']} />
                                <Bar dataKey="value" fill="#4318FF" radius={[4, 4, 0, 0]}>
                                    {session.projectDurations.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                        Distribution of projects by proposed duration
                    </div>
                </Card>

                {/* Funding Allocation Details */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="500">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineAttachMoney className="mr-2.5 text-indigo-500" /> Funding Allocation
                        </h4>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={session.fundingAllocation.distribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, value, percent }) => `${name}: $${value.toLocaleString()} (${(percent * 100).toFixed(0)}%)`}
                                    >
                                        {session.fundingAllocation.distribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="bg-gray-50 dark:bg-navy-800 rounded-xl p-5">
                                <h5 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">Budget Summary</h5>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Allocated</span>
                                            <span className="text-sm font-semibold text-navy-700 dark:text-white">${session.fundingAllocation.allocated.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div
                                                className="bg-indigo-600 dark:bg-indigo-400 h-2.5 rounded-full"
                                                style={{ width: `${(session.fundingAllocation.allocated / session.fundingAllocation.total) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {((session.fundingAllocation.allocated / session.fundingAllocation.total) * 100).toFixed(1)}% of total budget
                                        </span>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Remaining Budget</span>
                                            <span className="text-sm font-semibold text-navy-700 dark:text-white">${session.fundingAllocation.remaining.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div
                                                className="bg-green-500 h-2.5 rounded-full"
                                                style={{ width: `${(session.fundingAllocation.remaining / session.fundingAllocation.total) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {((session.fundingAllocation.remaining / session.fundingAllocation.total) * 100).toFixed(1)}% available
                                        </span>
                                    </div>
                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Average per project</span>
                                            <span className="text-sm font-semibold text-navy-700 dark:text-white">${session.fundingAllocation.averagePerProject.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total approved projects</span>
                                            <span className="text-sm font-semibold text-navy-700 dark:text-white">{session.approvedCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Reviewers Performance */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="400">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineGroupWork className="mr-2.5 text-indigo-500" /> Reviewer Performance
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Reviewer
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Assigned
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Completed
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Avg. Time (days)
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Completion Rate
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {session.reviewersPerformance.map((reviewer, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-navy-700">
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3.5">
                                                    <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                                                        {reviewer.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{reviewer.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            {reviewer.assigned}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            {reviewer.completed}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            {reviewer.avgTime}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                                <div
                                                    className="bg-indigo-600 dark:bg-indigo-400 h-2.5 rounded-full"
                                                    style={{ width: `${(reviewer.completed / reviewer.assigned) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 inline-block">
                                                {((reviewer.completed / reviewer.assigned) * 100).toFixed(0)}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </>
        );
    };

    // Render loading skeleton
    const renderSkeleton = () => {
        return (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} extra="!p-5 animate-pulse">
                            <div className="h-4 bg-gray-200 dark:bg-navy-700 rounded w-2/3 mb-5"></div>
                            <div className="h-8 bg-gray-200 dark:bg-navy-700 rounded w-1/3 mb-3"></div>
                            <div className="h-3 bg-gray-200 dark:bg-navy-700 rounded w-full"></div>
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                        <Card key={i} extra="!p-6 animate-pulse">
                            <div className="h-5 bg-gray-200 dark:bg-navy-700 rounded w-2/3 mb-5"></div>
                            <div className="h-64 bg-gray-200 dark:bg-navy-700 rounded mb-3"></div>
                            <div className="h-3 bg-gray-200 dark:bg-navy-700 rounded w-full"></div>
                        </Card>
                    ))}
                </div>
                <Card extra="!p-6 animate-pulse">
                    <div className="h-5 bg-gray-200 dark:bg-navy-700 rounded w-2/3 mb-5"></div>
                    <div className="h-64 bg-gray-200 dark:bg-navy-700 rounded mb-3"></div>
                </Card>
            </div>
        );
    };

    // Additional tabs would be implemented similarly
    const renderSubmissionsTab = () => {
        const session = getActiveSession();
        if (!session) return <div className="text-center py-8">No session data available</div>;

        return (
            <>
                {/* Submission Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-aos="fade-up">
                    <Card extra="!p-5 flex flex-col hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Submissions</p>
                                <div className="flex items-baseline mt-2">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{session.proposalCount}</h4>
                                </div>
                            </div>
                            <div className="p-3.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                                <MdOutlineAssignment className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            Submission deadline: {new Date(session.proposalDeadline).toLocaleDateString()}
                        </div>
                    </Card>

                    <Card extra="!p-5 flex flex-col hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Submission Rate</p>
                                <div className="flex items-baseline mt-2">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                        {session.status === "active" ?
                                            `${((session.submissionTrend.reduce((acc, curr) => acc + curr.count, 0) / session.proposalCount) * 100).toFixed(1)}%` :
                                            "100%"}
                                    </h4>
                                </div>
                            </div>
                            <div className="p-3.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <MdOutlineSpeed className="h-7 w-7 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            {session.status === "active" ? "Progress to target" : "Session completed"}
                        </div>
                    </Card>

                    <Card extra="!p-5 flex flex-col hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Quality Score</p>
                                <div className="flex items-baseline mt-2">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                        {(Math.random() * 2 + 3).toFixed(1)}/5.0
                                    </h4>
                                </div>
                            </div>
                            <div className="p-3.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                <MdOutlineCheckCircleOutline className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            Based on reviewer evaluations
                        </div>
                    </Card>
                </div>

                {/* Submission Trend Chart */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow mb-8" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineShowChart className="mr-2.5 text-indigo-500" /> Submission Timeline
                        </h4>
                        <div className="flex items-center gap-2">
                            <select className="px-3 py-2 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg text-sm">
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                    </div>
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={session.submissionTrend}
                                margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                <XAxis
                                    dataKey="day"
                                    tickFormatter={(value) => {
                                        const date = new Date(value);
                                        return `${date.getDate()}/${date.getMonth() + 1}`;
                                    }}
                                />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => [`${value} proposals`, 'Submissions']}
                                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    name="Submissions"
                                    stroke="#4318FF"
                                    strokeWidth={2}
                                    dot={{ r: 5 }}
                                    activeDot={{ r: 7 }}
                                />
                                {/* Add deadline marker */}
                                <ReferenceLine
                                    x={session.proposalDeadline.split('T')[0]}
                                    stroke="#FF5252"
                                    strokeDasharray="3 3"
                                    label={{ value: 'Deadline', position: 'top', fill: '#FF5252' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                        Daily submission counts leading up to the deadline
                    </div>
                </Card>

                {/* Submission Quality Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <Card extra="!p-6 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="200">
                        <div className="flex justify-between items-center mb-5">
                            <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                                <MdOutlineBarChart className="mr-2.5 text-indigo-500" /> Submission Quality Distribution
                            </h4>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[
                                        { score: "5 (Excellent)", count: Math.floor(Math.random() * 10 + 5) },
                                        { score: "4 (Good)", count: Math.floor(Math.random() * 15 + 10) },
                                        { score: "3 (Average)", count: Math.floor(Math.random() * 12 + 8) },
                                        { score: "2 (Poor)", count: Math.floor(Math.random() * 7 + 3) },
                                        { score: "1 (Very Poor)", count: Math.floor(Math.random() * 3 + 1) },
                                    ]}
                                    margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                    <XAxis dataKey="score" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value) => [`${value} proposals`, 'Count']}
                                    />
                                    <Bar dataKey="count" name="Proposals" fill="#4318FF">
                                        {
                                            [0, 1, 2, 3, 4].map((index) => (
                                                <Cell key={`cell-${index}`} fill={['#FF5252', '#FFB547', '#FFD166', '#6AD2FF', '#34B53A'][index]} />
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                            Distribution of proposals by reviewer quality assessment
                        </div>
                    </Card>

                    <Card extra="!p-6 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="300">
                        <div className="flex justify-between items-center mb-5">
                            <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                                <MdOutlinePieChart className="mr-2.5 text-indigo-500" /> Submission Status
                            </h4>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: "Approved", value: session.approvedCount },
                                            { name: "Rejected", value: session.approvalRate.find(item => item.name === "Rejected")?.value || 0 },
                                            { name: "Pending Review", value: session.approvalRate.find(item => item.name === "Pending")?.value || 0 },
                                            { name: "Incomplete", value: Math.max(0, session.proposalCount - session.submissionTrend.reduce((sum, item) => sum + item.count, 0)) },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        <Cell fill="#34B53A" />
                                        <Cell fill="#FF5252" />
                                        <Cell fill="#FFB547" />
                                        <Cell fill="#6AD2FF" />
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value} proposals`, '']} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                            Current status of all expected submissions
                        </div>
                    </Card>
                </div>

                {/* Submission Details Table */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="400">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineFilterList className="mr-2.5 text-indigo-500" /> Recent Submissions
                        </h4>
                        <div className="flex items-center">
                            <div className="relative mr-3">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-9 pr-3 py-2 w-40 bg-white dark:bg-navy-800 border border-gray-300 dark:border-navy-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <MdOutlineSearch className="absolute left-3 top-2.5 text-gray-500" />
                            </div>
                            <button className="p-2 bg-white dark:bg-navy-800 border border-gray-300 dark:border-navy-600 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-700">
                                <MdFilterAlt className="text-gray-500" />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Principal Investigator
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Department
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Submission Date
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {[...Array(7)].map((_, index) => {
                                    const status = ["Approved", "Pending", "Rejected"][Math.floor(Math.random() * 3)];
                                    const statusColor = {
                                        "Approved": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                                        "Pending": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                                        "Rejected": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                    };
                                    const departments = ["Engineering", "Computer Science", "Business", "Health Sciences", "Arts & Humanities"];
                                    return (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-navy-700">
                                            <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                                {`Research Proposal ${index + 1}`}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                {["Dr. John Smith", "Dr. Jane Doe", "Prof. Michael Brown", "Dr. Sarah Johnson", "Prof. David Wilson"][index % 5]}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                {departments[index % departments.length]}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                {new Date(new Date().setDate(new Date().getDate() - index * 2)).toLocaleDateString()}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[status]}`}>
                                                    {status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Showing 7 of {session.proposalCount} proposals
                        </span>
                        <div className="flex items-center gap-2">
                            <button className="p-2 bg-white dark:bg-navy-800 border border-gray-300 dark:border-navy-600 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-700 disabled:opacity-50">
                                <MdChevronLeft />
                            </button>
                            <span className="text-sm font-medium">1</span>
                            <span className="text-sm text-gray-500">of 3</span>
                            <button className="p-2 bg-white dark:bg-navy-800 border border-gray-300 dark:border-navy-600 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-700">
                                <MdChevronRight />
                            </button>
                        </div>
                    </div>
                </Card>
            </>
        );
    };

    // Reviewers Tab
    const renderReviewersTab = () => {
        const session = getActiveSession();
        if (!session) return <div className="text-center py-8">No session data available</div>;

        return (
            <>
                {/* Reviewer Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-aos="fade-up">
                    <Card extra="!p-5 flex flex-col hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reviewers</p>
                                <div className="flex items-baseline mt-2">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{session.reviewers.length}</h4>
                                </div>
                            </div>
                            <div className="p-3.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                                <MdOutlinePeopleOutline className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            Active reviewers for this session
                        </div>
                    </Card>

                    <Card extra="!p-5 flex flex-col hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Review Progress</p>
                                <div className="flex items-baseline mt-2">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{session.reviewProgress}%</h4>
                                </div>
                            </div>
                            <div className="p-3.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <MdOutlineCheckCircleOutline className="h-7 w-7 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            Overall review completion rate
                        </div>
                    </Card>

                    <Card extra="!p-5 flex flex-col hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Review Time</p>
                                <div className="flex items-baseline mt-2">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{session.avgReviewTime} days</h4>
                                </div>
                            </div>
                            <div className="p-3.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                <MdOutlineAccessTime className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            Average time to complete reviews
                        </div>
                    </Card>
                </div>

                {/* Reviewers Performance Chart */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow mb-8" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineGroupWork className="mr-2.5 text-indigo-500" /> Reviewer Performance
                        </h4>
                    </div>
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={session.reviewersPerformance}
                                margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                                layout="vertical"
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={150} />
                                <Tooltip
                                    formatter={(value, name) => [
                                        name === 'avgTime' ? `${value} days` : value,
                                        name === 'assigned' ? 'Assigned' : name === 'completed' ? 'Completed' : 'Avg. Time'
                                    ]}
                                />
                                <Legend />
                                <Bar dataKey="assigned" name="Assigned" fill="#4318FF" />
                                <Bar dataKey="completed" name="Completed" fill="#34B53A" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Response Time Analysis */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow mb-8" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineAccessTime className="mr-2.5 text-indigo-500" /> Review Response Time
                        </h4>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={session.reviewersPerformance.map(reviewer => ({
                                    name: reviewer.name,
                                    avgTime: reviewer.avgTime,
                                    efficiency: ((session.avgReviewTime / reviewer.avgTime) * 100).toFixed(1)
                                }))}
                                margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" orientation="left" label={{ value: 'Avg. Days', angle: -90, position: 'insideLeft' }} />
                                <YAxis yAxisId="right" orientation="right" label={{ value: 'Efficiency %', angle: 90, position: 'insideRight' }} />
                                <Tooltip />
                                <Legend />
                                <Bar yAxisId="left" dataKey="avgTime" name="Avg. Review Time (days)" fill="#4318FF" />
                                <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Efficiency %" stroke="#34B53A" strokeWidth={2} />
                                <ReferenceLine yAxisId="left" y={session.avgReviewTime} stroke="#FF5252" strokeDasharray="3 3" label={{ value: 'Session Avg', position: 'top', fill: '#FF5252' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Reviewers Detailed Table */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlinePeopleOutline className="mr-2.5 text-indigo-500" /> Reviewer Details
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Reviewer
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Assigned
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Completed
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Progress
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Avg Time
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {session.reviewers.map((reviewer, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-navy-700">
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3.5">
                                                    <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                                                        {reviewer.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{reviewer.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${reviewer.role === 'lead'
                                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                }`}>
                                                {reviewer.role === 'lead' ? 'Lead Reviewer' : 'Member'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            {reviewer.assignedProposals}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            {reviewer.completedReviews}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                                <div
                                                    className="bg-indigo-600 dark:bg-indigo-400 h-2.5 rounded-full"
                                                    style={{ width: `${(reviewer.completedReviews / reviewer.assignedProposals) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 inline-block">
                                                {((reviewer.completedReviews / reviewer.assignedProposals) * 100).toFixed(0)}%
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            {session.reviewersPerformance.find(r => r.name === reviewer.name)?.avgTime || "-"} days
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </>
        );
    };

    // Timeline Tab
    const renderTimelineTab = () => {
        const session = getActiveSession();
        if (!session) return <div className="text-center py-8">No session data available</div>;

        const timelineData = [
            {
                date: new Date(session.startDate),
                event: "Session Start",
                description: "Research proposal session begins",
                status: "completed"
            },
            {
                date: new Date(session.proposalDeadline),
                event: "Proposal Deadline",
                description: "Last day for proposal submissions",
                status: new Date() > new Date(session.proposalDeadline) ? "completed" : "upcoming"
            },
            {
                date: new Date(session.reviewDeadline),
                event: "Review Deadline",
                description: "Reviewers finalize evaluation",
                status: new Date() > new Date(session.reviewDeadline) ? "completed" : "upcoming"
            },
            {
                date: new Date(session.progressReportDeadline),
                event: "Progress Report",
                description: "Submit progress reports",
                status: new Date() > new Date(session.progressReportDeadline) ? "completed" : "upcoming"
            },
            {
                date: new Date(session.finalReportDeadline),
                event: "Final Report",
                description: "Submit final research reports",
                status: new Date() > new Date(session.finalReportDeadline) ? "completed" : "upcoming"
            },
            {
                date: new Date(session.endDate),
                event: "Session End",
                description: "Research proposal session concludes",
                status: new Date() > new Date(session.endDate) ? "completed" : "upcoming"
            }
        ];

        const calculateTimelineProgress = () => {
            const start = new Date(session.startDate).getTime();
            const end = new Date(session.endDate).getTime();
            const current = new Date().getTime();

            if (current <= start) return 0;
            if (current >= end) return 100;

            return ((current - start) / (end - start) * 100).toFixed(1);
        };

        return (
            <>
                {/* Timeline Status Card */}
                <Card extra="!p-5 hover:shadow-lg transition-shadow mb-8" data-aos="fade-up">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h4 className="text-lg font-semibold text-navy-700 dark:text-white flex items-center">
                                <MdOutlineTimeline className="mr-2.5 text-indigo-500" /> Session Timeline
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {session.name} ({session.status === "active" ? "In Progress" : "Completed"})
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {new Date(session.startDate).toLocaleDateString()} - {new Date(session.endDate).toLocaleDateString()}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {session.status === "active" ? `${calculateTimelineProgress()}% Complete` : "100% Complete"}
                                </div>
                            </div>
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                                <MdOutlineCalendarToday className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-indigo-600 dark:bg-indigo-400 h-2.5 rounded-full"
                                style={{ width: `${session.status === "active" ? calculateTimelineProgress() : 100}%` }}
                            ></div>
                        </div>
                    </div>
                </Card>

                {/* Timeline Visualization */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow mb-8" data-aos="fade-up" data-aos-delay="100">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                        {/* Timeline events */}
                        <div className="space-y-8">
                            {timelineData.map((item, index) => (
                                <div key={index} className="relative flex gap-4">
                                    <div className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${item.status === "completed"
                                        ? "bg-green-500 dark:bg-green-400"
                                        : "bg-gray-300 dark:bg-gray-600"
                                        } mt-1`}>
                                        {item.status === "completed" && <MdOutlineCheck className="h-4 w-4 text-white" />}
                                    </div>
                                    <div className="flex flex-col pb-8">
                                        <div className="flex flex-wrap items-baseline gap-2">
                                            <h3 className="text-base font-semibold text-navy-700 dark:text-white">
                                                {item.event}
                                            </h3>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.status === "completed"
                                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                                }`}>
                                                {item.status === "completed" ? "Completed" : "Upcoming"}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {item.date.toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            {item.description}
                                        </p>

                                        {/* Add conditional progress reporting based on timeline event */}
                                        {item.event === "Progress Report" && (
                                            <div className="mt-3 p-3 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Progress Report Status</div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                    <div className="bg-white dark:bg-navy-700 p-2 rounded-md text-center">
                                                        <div className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">{session.progressReports.submitted}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">Submitted</div>
                                                    </div>
                                                    <div className="bg-white dark:bg-navy-700 p-2 rounded-md text-center">
                                                        <div className="text-lg font-semibold text-amber-600 dark:text-amber-400">{session.progressReports.pending}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">Pending</div>
                                                    </div>
                                                    <div className="bg-white dark:bg-navy-700 p-2 rounded-md text-center">
                                                        <div className="text-lg font-semibold text-green-600 dark:text-green-400">{session.progressReports.approved}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">Approved</div>
                                                    </div>
                                                    <div className="bg-white dark:bg-navy-700 p-2 rounded-md text-center">
                                                        <div className="text-lg font-semibold text-red-600 dark:text-red-400">{session.progressReports.revisionRequired}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">Needs Revision</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {item.event === "Final Report" && (
                                            <div className="mt-3 p-3 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Final Report Status</div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                    <div className="bg-white dark:bg-navy-700 p-2 rounded-md text-center">
                                                        <div className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">{session.finalReports.submitted}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">Submitted</div>
                                                    </div>
                                                    <div className="bg-white dark:bg-navy-700 p-2 rounded-md text-center">
                                                        <div className="text-lg font-semibold text-amber-600 dark:text-amber-400">{session.finalReports.pending}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">Pending</div>
                                                    </div>
                                                    <div className="bg-white dark:bg-navy-700 p-2 rounded-md text-center">
                                                        <div className="text-lg font-semibold text-green-600 dark:text-green-400">{session.finalReports.approved}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">Approved</div>
                                                    </div>
                                                    <div className="bg-white dark:bg-navy-700 p-2 rounded-md text-center">
                                                        <div className="text-lg font-semibold text-red-600 dark:text-red-400">{session.finalReports.revisionRequired}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">Needs Revision</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Time Allocation Chart */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineSchedule className="mr-2.5 text-indigo-500" /> Phase Duration Analysis
                        </h4>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[
                                    {
                                        name: "Submission Phase",
                                        days: Math.round((new Date(session.proposalDeadline) - new Date(session.startDate)) / (1000 * 60 * 60 * 24))
                                    },
                                    {
                                        name: "Review Phase",
                                        days: Math.round((new Date(session.reviewDeadline) - new Date(session.proposalDeadline)) / (1000 * 60 * 60 * 24))
                                    },
                                    {
                                        name: "Progress Report Phase",
                                        days: Math.round((new Date(session.progressReportDeadline) - new Date(session.reviewDeadline)) / (1000 * 60 * 60 * 24))
                                    },
                                    {
                                        name: "Final Report Phase",
                                        days: Math.round((new Date(session.finalReportDeadline) - new Date(session.progressReportDeadline)) / (1000 * 60 * 60 * 24))
                                    },
                                    {
                                        name: "Closing Phase",
                                        days: Math.round((new Date(session.endDate) - new Date(session.finalReportDeadline)) / (1000 * 60 * 60 * 24))
                                    }
                                ]}
                                margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                                layout="vertical"
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={150} />
                                <Tooltip formatter={(value) => [`${value} days`, 'Duration']} />
                                <Bar dataKey="days" fill="#4318FF">
                                    {
                                        [0, 1, 2, 3, 4].map((index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                        Duration of each phase in the research proposal session
                    </div>
                </Card>
            </>
        );
    };

    // Comparison Tab
    const renderComparisonTab = () => {
        if (sessionsData.length < 2) return <div className="text-center py-8">Need at least 2 sessions for comparison</div>;

        // Sort sessions by date for coherent comparison
        const sortedSessions = [...sessionsData].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        // Create comparison datasets
        const proposalComparisonData = sortedSessions.map(session => ({
            name: session.name,
            proposals: session.proposalCount,
            approved: session.approvedCount,
            participants: session.participantCount,
            approvalRate: (session.approvedCount / session.proposalCount) * 100,
        }));

        const departmentComparisonData = [];
        const allDepartments = new Set();

        // Get all unique departments
        sortedSessions.forEach(session => {
            session.departmentDistribution.forEach(dept => {
                allDepartments.add(dept.name);
            });
        });

        // Create data for each department across sessions
        allDepartments.forEach(dept => {
            const deptData = { department: dept };
            sortedSessions.forEach(session => {
                const deptEntry = session.departmentDistribution.find(d => d.name === dept);
                deptData[session.name] = deptEntry ? deptEntry.value : 0;
            });
            departmentComparisonData.push(deptData);
        });

        return (
            <>
                {/* Session Selection for Comparison */}
                <Card extra="!p-5 hover:shadow-lg transition-shadow mb-8" data-aos="fade-up">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h4 className="text-lg font-semibold text-navy-700 dark:text-white flex items-center">
                                <MdOutlineInsights className="mr-2.5 text-indigo-500" /> Session Comparison
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Compare metrics across different research sessions
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <select
                                className="px-4 py-2.5 bg-white dark:bg-navy-800 border border-gray-300 dark:border-navy-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={comparePeriod}
                                onChange={(e) => setComparePeriod(e.target.value)}
                            >
                                <option value="previous">vs Previous Session</option>
                                <option value="all">All Sessions</option>
                                <option value="year">Same Period Last Year</option>
                            </select>
                        </div>
                    </div>
                </Card>

                {/* Key Metrics Comparison */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow mb-8" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineBarChart className="mr-2.5 text-indigo-500" /> Key Metrics Comparison
                        </h4>
                    </div>
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={proposalComparisonData}
                                margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" orientation="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar yAxisId="left" dataKey="proposals" name="Total Proposals" fill="#4318FF" />
                                <Bar yAxisId="left" dataKey="approved" name="Approved Proposals" fill="#34B53A" />
                                <Bar yAxisId="left" dataKey="participants" name="Total Participants" fill="#6AD2FF" />
                                <Line yAxisId="right" type="monotone" dataKey="approvalRate" name="Approval Rate (%)" stroke="#FF5252" strokeWidth={2} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Department Distribution Comparison */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow mb-8" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineBarChart className="mr-2.5 text-indigo-500" /> Department Distribution Comparison
                        </h4>
                    </div>
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={departmentComparisonData}
                                margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                                layout="vertical"
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="department" width={150} />
                                <Tooltip />
                                <Legend />
                                {sortedSessions.map((session, index) => (
                                    <Bar
                                        key={session._id}
                                        dataKey={session.name}
                                        name={session.name}
                                        fill={COLORS[index % COLORS.length]}
                                        stackId="a"
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Approval Rate & Time Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <Card extra="!p-6 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="300">
                        <div className="flex justify-between items-center mb-5">
                            <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                                <MdOutlinePieChart className="mr-2.5 text-indigo-500" /> Approval Rate Comparison
                            </h4>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sortedSessions.map(session => ({
                                            name: session.name,
                                            value: (session.approvedCount / session.proposalCount) * 100
                                        }))}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                                    >
                                        {sortedSessions.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Approval Rate']} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card extra="!p-6 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="400">
                        <div className="flex justify-between items-center mb-5">
                            <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                                <MdOutlineAccessTime className="mr-2.5 text-indigo-500" /> Review Time Comparison
                            </h4>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={sortedSessions.map(session => ({
                                        name: session.name,
                                        avgTime: session.avgReviewTime,
                                        completionRate: session.completionRate
                                    }))}
                                    margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                    <XAxis dataKey="name" />
                                    <YAxis yAxisId="left" orientation="left" label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Completion %', angle: 90, position: 'insideRight' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="avgTime" name="Avg. Review Time (days)" fill="#4318FF" />
                                    <Line yAxisId="right" type="monotone" dataKey="completionRate" name="Completion Rate (%)" stroke="#34B53A" strokeWidth={2} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Funding Allocation Comparison */}
                <Card extra="!p-6 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="500">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-base font-semibold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineAttachMoney className="mr-2.5 text-indigo-500" /> Budget Allocation Comparison
                        </h4>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={sortedSessions.map(session => ({
                                        name: session.name,
                                        total: session.fundingAllocation.total,
                                        allocated: session.fundingAllocation.allocated,
                                        remaining: session.fundingAllocation.remaining,
                                        averagePerProject: session.fundingAllocation.averagePerProject
                                    }))}
                                    margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                                    <Legend />
                                    <Bar dataKey="total" name="Total Budget" fill="#4318FF" />
                                    <Bar dataKey="allocated" name="Allocated" fill="#34B53A" />
                                    <Bar dataKey="remaining" name="Remaining" fill="#6AD2FF" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={sortedSessions.map(session => ({
                                        name: session.name,
                                        avgPerProject: session.fundingAllocation.averagePerProject,
                                        approvedCount: session.approvedCount
                                    }))}
                                    margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                    <XAxis dataKey="name" />
                                    <YAxis yAxisId="left" orientation="left" label={{ value: 'Avg. $ Per Project', angle: -90, position: 'insideLeft' }} />
                                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Approved Projects', angle: 90, position: 'insideRight' }} />
                                    <Tooltip formatter={(value, name) => [
                                        name === 'avgPerProject' ? `$${value.toLocaleString()}` : value,
                                        name === 'avgPerProject' ? 'Avg. Per Project' : 'Approved Projects'
                                    ]} />
                                    <Legend />
                                    <Line yAxisId="left" type="monotone" dataKey="avgPerProject" name="Avg. Per Project" stroke="#4318FF" strokeWidth={2} />
                                    <Bar yAxisId="right" dataKey="approvedCount" name="Approved Projects" fill="#34B53A" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Card>
            </>
        );
    };

    return (
        <div className="session-analytics w-full">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8" data-aos="fade-down">
                <div>
                    <h2 className="text-2xl font-bold text-navy-700 dark:text-white flex items-center">
                        <MdOutlineInsights className="mr-3 h-7 w-7" />
                        Session Analytics
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Track and analyze research proposal sessions performance
                    </p>
                </div>

                <div className="mt-5 md:mt-0 flex items-center gap-3">
                    <div className="relative">
                        <select
                            className="appearance-none px-4 py-2.5 pr-10 bg-white dark:bg-navy-800 border border-gray-300 dark:border-navy-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <option value="all">All Time</option>
                            <option value="year">Last Year</option>
                            <option value="6months">Last 6 Months</option>
                            <option value="3months">Last 3 Months</option>
                        </select>
                        <MdExpandMore className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center mb-8 border-b border-gray-200 dark:border-navy-700 gap-2" data-aos="fade-up">
                <button
                    className={`px-5 py-3 text-sm font-medium border-b-2 ${activeTab === "overview"
                        ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                        : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                        }`}
                    onClick={() => setActiveTab("overview")}
                >
                    Overview
                </button>
                <button
                    className={`px-5 py-3 text-sm font-medium border-b-2 ${activeTab === "submissions"
                        ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                        : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                        }`}
                    onClick={() => setActiveTab("submissions")}
                >
                    Submissions
                </button>
                <button
                    className={`px-5 py-3 text-sm font-medium border-b-2 ${activeTab === "reviewers"
                        ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                        : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                        }`}
                    onClick={() => setActiveTab("reviewers")}
                >
                    Reviewers
                </button>
                <button
                    className={`px-5 py-3 text-sm font-medium border-b-2 ${activeTab === "timeline"
                        ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                        : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                        }`}
                    onClick={() => setActiveTab("timeline")}
                >
                    Timeline
                </button>
                <button
                    className={`px-5 py-3 text-sm font-medium border-b-2 ${activeTab === "comparison"
                        ? "text-indigo-600 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                        : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                        }`}
                    onClick={() => setActiveTab("comparison")}
                >
                    Comparison
                </button>
            </div>

            {/* Session Selector */}
            {renderSessionSelector()}

            {/* Main Content Area */}
            <div className="space-y-8">
                {isLoading ? renderSkeleton() : renderTabContent()}
            </div>
        </div>
    );
};

export default SessionAnalytics;
