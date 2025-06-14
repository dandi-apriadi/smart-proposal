import React, { useState, useEffect } from 'react';
import {
    MdTimeline,
    MdHistory,
    MdDownload,
    MdFilterList,
    MdSearch,
    MdDateRange,
    MdAssignment,
    MdNoteAdd,
    MdComment,
    MdCheck,
    MdWarning,
    MdChevronRight,
    MdSort
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import 'aos/dist/aos.css';
import AOS from 'aos';

const ActivityTracker = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [timeframe, setTimeframe] = useState('week');
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useSelector(state => state.auth);

    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({ duration: 800 });

        // Simulate API call with dummy data
        setTimeout(() => {
            setActivities(dummyActivities);
            setLoading(false);
        }, 800);
    }, []);

    // Filter activities based on selected filter and search term
    const filteredActivities = activities.filter(activity => {
        const matchesFilter = selectedFilter === 'all' || activity.type === selectedFilter;
        const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.proposalTitle.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Get activity counts for summary cards
    const getTodayCount = () => activities.filter(a => new Date(a.timestamp).toDateString() === new Date().toDateString()).length;
    const getReviewCount = () => activities.filter(a => a.type === 'review').length;
    const getCommentCount = () => activities.filter(a => a.type === 'comment').length;

    // Handle export functionality
    const handleExport = (format) => {
        console.log(`Exporting activities in ${format} format`);
        // Actual export logic would go here
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            {/* Header Section */}
            <div className="mb-6" data-aos="fade-down">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Activity Tracker</h1>
                <p className="text-gray-600">Monitor and track your recent actions and activities</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <SummaryCard
                    title="Today's Activities"
                    count={getTodayCount()}
                    icon={<MdHistory className="text-blue-500" />}
                    color="blue"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                />
                <SummaryCard
                    title="Reviews Completed"
                    count={getReviewCount()}
                    icon={<MdAssignment className="text-green-500" />}
                    color="green"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                />
                <SummaryCard
                    title="Comments Made"
                    count={getCommentCount()}
                    icon={<MdComment className="text-purple-500" />}
                    color="purple"
                    data-aos="zoom-in"
                    data-aos-delay="300"
                />
                <SummaryCard
                    title="Pending Tasks"
                    count={3}
                    icon={<MdWarning className="text-amber-500" />}
                    color="amber"
                    data-aos="zoom-in"
                    data-aos-delay="400"
                />
            </div>

            {/* Filter and Search Section */}
            <div className="bg-white rounded-lg shadow p-4 mb-6" data-aos="fade-up">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedFilter('all')}
                            className={`px-4 py-2 rounded-full text-sm ${selectedFilter === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            All Activities
                        </button>
                        <button
                            onClick={() => setSelectedFilter('review')}
                            className={`px-4 py-2 rounded-full text-sm ${selectedFilter === 'review'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Reviews
                        </button>
                        <button
                            onClick={() => setSelectedFilter('comment')}
                            className={`px-4 py-2 rounded-full text-sm ${selectedFilter === 'comment'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Comments
                        </button>
                        <button
                            onClick={() => setSelectedFilter('submission')}
                            className={`px-4 py-2 rounded-full text-sm ${selectedFilter === 'submission'
                                ? 'bg-amber-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Submissions
                        </button>
                    </div>

                    <div className="flex md:w-64 relative">
                        <input
                            type="text"
                            placeholder="Search activities..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <MdSearch className="absolute right-3 top-2.5 text-gray-500 text-xl" />
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <MdDateRange className="text-gray-600" />
                        <select
                            className="bg-gray-100 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                        >
                            <option value="day">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="all">All Time</option>
                        </select>
                    </div>

                    <div className="dropdown relative">
                        <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm flex items-center">
                            <MdDownload className="mr-1" /> Export
                            <MdChevronRight className="ml-1 transform rotate-90" />
                        </button>
                        <div className="dropdown-menu absolute right-0 mt-2 hidden bg-white shadow-lg rounded-lg py-2 w-40 z-10">
                            <button
                                onClick={() => handleExport('csv')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                Export as CSV
                            </button>
                            <button
                                onClick={() => handleExport('pdf')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                Export as PDF
                            </button>
                            <button
                                onClick={() => handleExport('excel')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                Export as Excel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Actions Section */}
            <div className="bg-white rounded-lg shadow mb-6" data-aos="fade-up">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                        <MdHistory className="mr-2 text-blue-500" /> Recent Actions
                    </h2>
                    <button className="text-sm text-gray-500 flex items-center">
                        <MdSort className="mr-1" /> Sort by
                    </button>
                </div>

                {loading ? (
                    <div className="p-8 flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredActivities.map((activity, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-${activity.iconColor}-100`}>
                                                    {activity.icon}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{activity.description}</div>
                                                    <div className="text-sm text-gray-500">{activity.type}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{activity.proposalTitle}</div>
                                            <div className="text-sm text-gray-500">ID: {activity.proposalId}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${activity.statusColor}-100 text-${activity.statusColor}-800`}>
                                                {activity.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {filteredActivities.length === 0 && !loading && (
                    <div className="p-8 text-center text-gray-500">
                        No activities found matching your criteria.
                    </div>
                )}
            </div>

            {/* Timeline View */}
            <div className="bg-white rounded-lg shadow mb-6" data-aos="fade-up">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                        <MdTimeline className="mr-2 text-blue-500" /> Timeline View
                    </h2>
                </div>
                <div className="p-4">
                    <div className="relative">
                        {filteredActivities.slice(0, 5).map((activity, index) => (
                            <div key={index} className="mb-6 flex" data-aos="fade-right" data-aos-delay={index * 100}>
                                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-${activity.iconColor}-100 z-10`}>
                                    {activity.icon}
                                </div>
                                <div className="ml-6">
                                    <div className="text-sm font-medium text-gray-900">{activity.description}</div>
                                    <div className="mt-1 text-sm text-gray-500">
                                        {activity.proposalTitle} • {new Date(activity.timestamp).toLocaleString()}
                                    </div>
                                </div>
                                {index !== filteredActivities.slice(0, 5).length - 1 && (
                                    <div className="absolute h-full w-0.5 bg-gray-200 left-5 -z-10 transform -translate-x-1/2"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Summary Card Component
const SummaryCard = ({ title, count, icon, color, ...props }) => {
    return (
        <div
            className={`bg-white rounded-lg shadow p-4 border-l-4 border-${color}-500`}
            {...props}
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-2xl font-bold">{count}</p>
                </div>
                <div className={`h-12 w-12 rounded-full bg-${color}-100 flex items-center justify-center`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

// Dummy data for activities
const dummyActivities = [
    {
        description: "Reviewed proposal draft",
        type: "review",
        proposalTitle: "AI-Based Proposal Format Validation",
        proposalId: "PROP-2025-042",
        timestamp: "2025-05-10T14:30:00Z",
        status: "Completed",
        statusColor: "green",
        icon: <MdAssignment className="text-green-500" />,
        iconColor: "green"
    },
    {
        description: "Added comment on methodology section",
        type: "comment",
        proposalTitle: "Machine Learning Implementation for Document Processing",
        proposalId: "PROP-2025-038",
        timestamp: "2025-05-09T11:15:00Z",
        status: "Pending Response",
        statusColor: "amber",
        icon: <MdComment className="text-purple-500" />,
        iconColor: "purple"
    },
    {
        description: "Approved final report",
        type: "review",
        proposalTitle: "Random Forest Algorithm for Document Classification",
        proposalId: "PROP-2025-027",
        timestamp: "2025-05-08T16:45:00Z",
        status: "Completed",
        statusColor: "green",
        icon: <MdCheck className="text-green-500" />,
        iconColor: "green"
    },
    {
        description: "Submitted reviewer feedback",
        type: "submission",
        proposalTitle: "Automated Format Validation System",
        proposalId: "PROP-2025-031",
        timestamp: "2025-05-07T10:20:00Z",
        status: "Processing",
        statusColor: "blue",
        icon: <MdNoteAdd className="text-blue-500" />,
        iconColor: "blue"
    },
    {
        description: "Requested revisions on budget section",
        type: "comment",
        proposalTitle: "Natural Language Processing for Document Analysis",
        proposalId: "PROP-2025-045",
        timestamp: "2025-05-06T13:50:00Z",
        status: "Awaiting Changes",
        statusColor: "red",
        icon: <MdWarning className="text-red-500" />,
        iconColor: "red"
    },
    {
        description: "Started progress report review",
        type: "review",
        proposalTitle: "Implementation of Document Similarity Algorithms",
        proposalId: "PROP-2025-036",
        timestamp: "2025-05-05T09:00:00Z",
        status: "In Progress",
        statusColor: "blue",
        icon: <MdAssignment className="text-blue-500" />,
        iconColor: "blue"
    },
    {
        description: "Exported review history",
        type: "submission",
        proposalTitle: "Multiple Proposals Report",
        proposalId: "SYSTEM-LOG",
        timestamp: "2025-05-04T15:30:00Z",
        status: "Completed",
        statusColor: "green",
        icon: <MdDownload className="text-green-500" />,
        iconColor: "green"
    }
];

export default ActivityTracker;
