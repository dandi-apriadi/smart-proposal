import React, { useState, useEffect } from 'react';
import { format, parseISO, isSameDay } from 'date-fns';
import {
    MdOutlineCheck,
    MdOutlineAccessTime,
    MdOutlineHourglassEmpty,
    MdFilterList,
    MdSearch,
    MdKeyboardArrowDown,
    MdOutlineCalendarToday,
    MdPerson,
    MdOutlineDescription,
    MdOutlineClose,
    MdRefresh,
    MdOutlineSort,
    MdOutlineFilterAlt,
    MdArrowUpward,
    MdArrowDownward,
    MdOutlineInfo
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TimelineView = ({ activities = [] }) => {
    const [expandedId, setExpandedId] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [groupByDate, setGroupByDate] = useState(true);
    const [sortDirection, setSortDirection] = useState('desc');
    const [filterCategory, setFilterCategory] = useState('all');
    const [view, setView] = useState('timeline'); // 'timeline' or 'compact'

    // Initialize animations
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    // Example activities if none provided - expanded with more detailed activities
    const demoActivities = activities.length ? activities : [
        { id: 1, title: 'Proposal Submitted', description: 'Initial proposal "AI-Based Learning System" submitted for review', status: 'completed', timestamp: new Date('2025-04-10T09:30:00'), user: 'Dr. John Doe', category: 'submission', icon: '📄', details: 'Proposal ID: PRO-2025-042, Department: Computer Science, Budget: $75,000' },
        { id: 2, title: 'Initial Review Started', description: 'Technical review team assigned to evaluate methodology and technical feasibility', status: 'completed', timestamp: new Date('2025-04-10T14:15:00'), user: 'Dr. Sarah Smith', category: 'review', icon: '👁️', details: 'Review criteria: Innovation, Methodology, Budget allocation, Timeline feasibility' },
        { id: 3, title: 'Documentation Verified', description: 'All supporting documents have been checked and validated', status: 'completed', timestamp: new Date('2025-04-11T11:20:00'), user: 'Robert Johnson', category: 'verification', icon: '✓', details: 'Documents verified: Research background, Budget breakdown, Timeline, Team qualifications' },
        { id: 4, title: 'Revision Requested', description: 'Changes requested for methodology section and budget details', status: 'completed', timestamp: new Date('2025-04-14T11:00:00'), user: 'Dr. Mike Johnson', category: 'feedback', icon: '✏️', details: 'Sections requiring revision: 3.2 Methodology, 4.1 Budget Allocation, 5.3 Expected Outcomes' },
        { id: 5, title: 'Revision Submitted', description: 'Updated proposal with requested changes to methodology and budget', status: 'completed', timestamp: new Date('2025-04-17T16:45:00'), user: 'Dr. John Doe', category: 'submission', icon: '🔄', details: 'Changes made: Refined methodology approach, Detailed budget breakdown, Expanded expected outcomes' },
        { id: 6, title: 'Technical Assessment', description: 'Specialized technical review of AI algorithms proposed', status: 'completed', timestamp: new Date('2025-04-18T13:30:00'), user: 'Dr. Alan Turing', category: 'review', icon: '💻', details: 'Focus areas: Algorithm efficiency, Data processing methods, Technical feasibility, Infrastructure requirements' },
        { id: 7, title: 'Budget Evaluation', description: 'Detailed assessment of budget allocation and resource requirements', status: 'completed', timestamp: new Date('2025-04-19T10:15:00'), user: 'Emma Rodriguez', category: 'review', icon: '💰', details: 'Areas reviewed: Equipment costs, Personnel allocations, Software licenses, Operational expenses' },
        { id: 8, title: 'Final Review', description: 'Comprehensive final assessment of the revised proposal', status: 'in-progress', timestamp: new Date('2025-04-20T10:30:00'), user: 'Dr. Linda Chen', category: 'review', icon: '🔍', details: 'Final assessment includes: Technical feasibility, Budget appropriateness, Timeline realism, Potential impact' },
        { id: 9, title: 'Ethics Compliance Check', description: 'Evaluation of research ethics and compliance with institutional guidelines', status: 'in-progress', timestamp: new Date('2025-04-21T14:45:00'), user: 'Ethics Committee', category: 'compliance', icon: '⚖️', details: 'Areas of focus: Data privacy, Subject consent, Ethical AI development, Potential societal impacts' },
        { id: 10, title: 'Approval Pending', description: 'Waiting for executive committee final approval', status: 'pending', timestamp: new Date('2025-04-22T09:00:00'), user: 'Dr. David Wilson', category: 'approval', icon: '⏳', details: 'Final approval requires sign-off from: Department Chair, Research Director, Financial Officer, Ethics Committee Representative' },
    ];

    // Get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <MdOutlineCheck className="text-white" size={20} />;
            case 'in-progress': return <MdOutlineAccessTime className="text-white" size={20} />;
            case 'pending': return <MdOutlineHourglassEmpty className="text-white" size={20} />;
            default: return null;
        }
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-emerald-500';
            case 'in-progress': return 'bg-blue-500';
            case 'pending': return 'bg-amber-500';
            default: return 'bg-gray-500';
        }
    };

    // Get status text color
    const getStatusTextColor = (status) => {
        switch (status) {
            case 'completed': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
            case 'in-progress': return 'text-blue-700 bg-blue-50 border-blue-200';
            case 'pending': return 'text-amber-700 bg-amber-50 border-amber-200';
            default: return 'text-gray-700 bg-gray-50 border-gray-200';
        }
    };

    // Get category badge color
    const getCategoryColor = (category) => {
        switch (category) {
            case 'submission': return 'bg-indigo-100 text-indigo-800';
            case 'review': return 'bg-purple-100 text-purple-800';
            case 'feedback': return 'bg-pink-100 text-pink-800';
            case 'verification': return 'bg-teal-100 text-teal-800';
            case 'compliance': return 'bg-orange-100 text-orange-800';
            case 'approval': return 'bg-sky-100 text-sky-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Filter and search activities
    const filteredActivities = demoActivities
        .filter(activity =>
            (filterStatus === 'all' || activity.status === filterStatus) &&
            (filterCategory === 'all' || activity.category === filterCategory) &&
            (activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                activity.user.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
        });

    // Group activities by date if groupByDate is true
    const groupedActivities = () => {
        if (!groupByDate) return { activities: filteredActivities };

        const groups = {};
        filteredActivities.forEach(activity => {
            const dateKey = format(new Date(activity.timestamp), 'yyyy-MM-dd');
            if (!groups[dateKey]) {
                groups[dateKey] = {
                    date: new Date(activity.timestamp),
                    activities: []
                };
            }
            groups[dateKey].activities.push(activity);
        });

        return Object.values(groups).sort((a, b) => {
            return sortDirection === 'desc' ? b.date - a.date : a.date - b.date;
        });
    };

    // Reset all filters
    const resetFilters = () => {
        setFilterStatus('all');
        setFilterCategory('all');
        setSearchTerm('');
    };

    // Get unique categories from activities
    const categories = ['all', ...new Set(demoActivities.map(activity => activity.category))];

    // Toggle sort direction
    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    };

    return (
        <div className="bg-white shadow-lg rounded-lg w-full" data-aos="fade-up">
            {/* Header with tabs and quick filters */}
            <div className="border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8 py-4 bg-gray-50 rounded-t-lg">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            <span className="bg-blue-100 text-blue-700 p-2 rounded-full mr-3">
                                <MdOutlineCalendarToday size={24} />
                            </span>
                            Activity Timeline
                        </h2>

                        <div className="flex items-center space-x-2 w-full md:w-auto">
                            <div className="relative flex-grow max-w-md">
                                <input
                                    type="text"
                                    placeholder="Search activities..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <MdSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                                {searchTerm && (
                                    <button
                                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                        onClick={() => setSearchTerm('')}
                                    >
                                        <MdOutlineClose size={20} />
                                    </button>
                                )}
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={toggleSortDirection}
                                    className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                                    title={sortDirection === 'desc' ? 'Newest first' : 'Oldest first'}
                                >
                                    {sortDirection === 'desc' ? <MdArrowDownward size={20} /> : <MdArrowUpward size={20} />}
                                </button>

                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className={`p-2 border rounded-lg transition-colors flex items-center justify-center ${isFilterOpen ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                                    title="Filters"
                                >
                                    <MdOutlineFilterAlt size={20} />
                                </button>

                                <button
                                    onClick={() => setView(view === 'timeline' ? 'compact' : 'timeline')}
                                    className={`p-2 border rounded-lg transition-colors ${view === 'compact' ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                                    title={view === 'timeline' ? 'Switch to compact view' : 'Switch to timeline view'}
                                >
                                    <MdOutlineSort size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters panel */}
                {isFilterOpen && (
                    <div className="px-4 sm:px-6 lg:px-8 py-4 bg-gray-50 border-t border-gray-200 animate-fadeIn" data-aos="fade-down">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <h3 className="font-medium text-gray-700 text-sm">Status</h3>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filterStatus === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-600 border border-gray-300'}`}
                                        onClick={() => setFilterStatus('all')}
                                    >
                                        All
                                    </button>
                                    <button
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filterStatus === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-gray-600 border border-gray-300'}`}
                                        onClick={() => setFilterStatus('completed')}
                                    >
                                        Completed
                                    </button>
                                    <button
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filterStatus === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-600 border border-gray-300'}`}
                                        onClick={() => setFilterStatus('in-progress')}
                                    >
                                        In Progress
                                    </button>
                                    <button
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filterStatus === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-white text-gray-600 border border-gray-300'}`}
                                        onClick={() => setFilterStatus('pending')}
                                    >
                                        Pending
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-medium text-gray-700 text-sm">Category</h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors 
                                            ${filterCategory === category
                                                    ? (category === 'all' ? 'bg-blue-100 text-blue-700' : `${getCategoryColor(category)}`)
                                                    : 'bg-white text-gray-600 border border-gray-300'}`}
                                            onClick={() => setFilterCategory(category)}
                                        >
                                            {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 flex flex-col md:items-end justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="groupByDate"
                                        checked={groupByDate}
                                        onChange={() => setGroupByDate(!groupByDate)}
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <label htmlFor="groupByDate" className="ml-2 text-sm text-gray-700">
                                        Group by date
                                    </label>
                                </div>
                                <button
                                    onClick={resetFilters}
                                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    <MdRefresh className="mr-1" size={16} />
                                    Reset filters
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Results count and info bar */}
            <div className="px-4 sm:px-6 lg:px-8 py-3 bg-white border-b border-gray-200 flex flex-wrap justify-between items-center text-sm text-gray-600">
                <div className="flex items-center">
                    <MdOutlineInfo className="mr-1 text-gray-500" size={16} />
                    Showing {filteredActivities.length} of {demoActivities.length} activities
                </div>
                <div className="flex items-center">
                    {view === 'timeline' ? 'Timeline view' : 'Compact view'} &middot; {sortDirection === 'desc' ? 'Newest first' : 'Oldest first'}
                </div>
            </div>

            {/* Main content area */}
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                {filteredActivities.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <div className="text-gray-400 mb-3">
                            <MdSearch size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No activities found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                ) : view === 'compact' ? (
                    // Compact view - more efficient for full width
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredActivities.map((activity) => (
                                    <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusTextColor(activity.status)}`}>
                                                {getStatusIcon(activity.status)}
                                                <span className="ml-1">{activity.status}</span>
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                                                {activity.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-md">{activity.description}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <MdPerson className="mr-1 text-gray-400" size={16} />
                                                {activity.user}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {format(new Date(activity.timestamp), 'MMM dd, yyyy')}
                                            <div className="text-xs opacity-75">
                                                {format(new Date(activity.timestamp), 'h:mm a')}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                className="text-blue-600 hover:text-blue-900"
                                                onClick={() => toggleExpand(activity.id)}
                                            >
                                                View Details
                                            </button>
                                            {expandedId === activity.id && (
                                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setExpandedId(null)}>
                                                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4" onClick={e => e.stopPropagation()}>
                                                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                                            <h3 className="text-lg font-medium text-gray-900">Activity Details</h3>
                                                            <button className="text-gray-400 hover:text-gray-500" onClick={() => setExpandedId(null)}>
                                                                <MdOutlineClose size={20} />
                                                            </button>
                                                        </div>
                                                        <div className="px-6 py-4">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div>
                                                                    <h4 className="text-xl font-bold text-gray-800">{activity.title}</h4>
                                                                    <p className="text-gray-600 mt-1">{activity.description}</p>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                                                                        {activity.category}
                                                                    </span>
                                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusTextColor(activity.status)}`}>
                                                                        {getStatusIcon(activity.status)}
                                                                        <span className="ml-1">{activity.status}</span>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-500">Date & Time</p>
                                                                    <p className="mt-1 text-sm text-gray-900">
                                                                        {format(new Date(activity.timestamp), 'MMMM dd, yyyy')} at {format(new Date(activity.timestamp), 'h:mm a')}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-500">User</p>
                                                                    <p className="mt-1 text-sm text-gray-900">{activity.user}</p>
                                                                </div>
                                                            </div>

                                                            <div className="mb-4">
                                                                <p className="text-sm font-medium text-gray-500">Details</p>
                                                                <p className="mt-1 text-sm text-gray-900">{activity.details}</p>
                                                            </div>

                                                            <div className="flex justify-end space-x-3 mt-6">
                                                                <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                                    Download
                                                                </button>
                                                                {activity.status === 'in-progress' && (
                                                                    <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">
                                                                        Track Progress
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : groupByDate ? (
                    // Grouped timeline view - optimized for full width
                    <div className="space-y-8 max-w-full">
                        {groupedActivities().map((group, groupIndex) => (
                            <div key={format(group.date, 'yyyy-MM-dd')} data-aos="fade-up" data-aos-delay={groupIndex * 50}>
                                <div className="sticky top-0 z-20 bg-white py-2 mb-4 flex items-center">
                                    <div className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-medium">
                                        {format(group.date, 'EEEE, MMMM d, yyyy')}
                                    </div>
                                    <div className="h-px bg-gray-200 flex-grow ml-4"></div>
                                </div>

                                <div className="relative">
                                    {/* Timeline line */}
                                    <div className="absolute left-7 md:left-24 lg:left-32 h-full w-1 bg-gray-200 z-0"></div>

                                    {/* Timeline items - optimized for full width */}
                                    <div className="space-y-6">
                                        {group.activities.map((activity, index) => (
                                            <div
                                                key={activity.id}
                                                className="relative flex items-start pl-14 md:pl-32 lg:pl-40"
                                                data-aos="fade-up"
                                                data-aos-delay={index * 50}
                                            >
                                                {/* Time indicator */}
                                                <div className="absolute left-0 top-0 md:left-16 lg:left-24 text-sm text-gray-600 font-medium whitespace-nowrap pt-3">
                                                    {format(new Date(activity.timestamp), 'h:mm a')}
                                                </div>

                                                {/* Icon/Status indicator */}
                                                <div className="absolute left-0 md:left-16 lg:left-24 ml-14 md:ml-0 transform -translate-x-1/2 flex items-center justify-center mt-3">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10 ${getStatusColor(activity.status)} transition-all duration-300 hover:scale-110`}>
                                                        <span className="text-xl text-white">{activity.icon}</span>
                                                    </div>
                                                </div>

                                                {/* Content card - using more screen real estate */}
                                                <div className="flex-grow max-w-full lg:max-w-5xl">
                                                    <div
                                                        className={`bg-white hover:bg-gray-50 rounded-xl p-5 shadow-md border border-gray-100 transition-all duration-300 ${expandedId === activity.id ? 'ring-2 ring-blue-400' : ''
                                                            }`}
                                                        onClick={() => toggleExpand(activity.id)}
                                                    >
                                                        <div className="flex flex-wrap items-start gap-2 mb-3">
                                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                                                                {activity.category}
                                                            </span>
                                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusTextColor(activity.status)} flex items-center`}>
                                                                {getStatusIcon(activity.status)}
                                                                <span className="ml-1">{activity.status}</span>
                                                            </span>
                                                        </div>

                                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                                            <div className="lg:col-span-3">
                                                                <h3 className="font-bold text-gray-800 text-lg mb-2">{activity.title}</h3>
                                                                <p className="text-gray-600">{activity.description}</p>

                                                                {/* User info */}
                                                                <div className="flex items-center mt-3 text-sm text-gray-500">
                                                                    <MdPerson className="mr-1" size={16} />
                                                                    {activity.user}
                                                                </div>
                                                            </div>

                                                            {/* Action buttons */}
                                                            <div className="flex lg:flex-col lg:items-end justify-end gap-2 mt-4 lg:mt-0">
                                                                <button
                                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        toggleExpand(activity.id);
                                                                    }}
                                                                >
                                                                    {expandedId === activity.id ? 'Hide Details' : 'View Details'}
                                                                    <MdKeyboardArrowDown className={`ml-1 transition-transform ${expandedId === activity.id ? 'rotate-180' : ''}`} size={16} />
                                                                </button>

                                                                {activity.status === 'in-progress' && (
                                                                    <button
                                                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        Track Progress
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Expanded content */}
                                                        <div className={`mt-4 overflow-hidden transition-all duration-300 ${expandedId === activity.id ? 'max-h-80' : 'max-h-0'
                                                            }`}>
                                                            <div className="pt-3 border-t border-gray-200">
                                                                <div className="flex items-start gap-2 text-sm text-gray-600">
                                                                    <MdOutlineDescription className="text-gray-400 mt-1 flex-shrink-0" size={18} />
                                                                    <p>{activity.details}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Regular timeline view - optimized for full width
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-7 md:left-24 lg:left-32 h-full w-1 bg-gray-200 z-0"></div>

                        {/* Timeline items - optimized for full width */}
                        <div className="space-y-6">
                            {filteredActivities.map((activity, index) => (
                                <div
                                    key={activity.id}
                                    className="relative flex items-start pl-14 md:pl-32 lg:pl-40"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 50}
                                >
                                    {/* Date & time indicator */}
                                    <div className="absolute left-0 top-0 md:left-16 lg:left-24 text-sm text-gray-600 font-medium whitespace-nowrap pt-3">
                                        <div>{format(new Date(activity.timestamp), 'MMM dd')}</div>
                                        <div className="text-xs opacity-75">{format(new Date(activity.timestamp), 'h:mm a')}</div>
                                    </div>

                                    {/* Icon/Status indicator */}
                                    <div className="absolute left-0 md:left-16 lg:left-24 ml-14 md:ml-0 transform -translate-x-1/2 flex items-center justify-center mt-3">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10 ${getStatusColor(activity.status)} transition-all duration-300 hover:scale-110`}>
                                            <span className="text-xl text-white">{activity.icon}</span>
                                        </div>
                                    </div>

                                    {/* Content card - using more screen real estate */}
                                    <div className="flex-grow max-w-full lg:max-w-5xl">
                                        <div
                                            className={`bg-white hover:bg-gray-50 rounded-xl p-5 shadow-md border border-gray-100 transition-all duration-300 ${expandedId === activity.id ? 'ring-2 ring-blue-400' : ''
                                                }`}
                                            onClick={() => toggleExpand(activity.id)}
                                        >
                                            <div className="flex flex-wrap items-start gap-2 mb-3">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                                                    {activity.category}
                                                </span>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusTextColor(activity.status)} flex items-center`}>
                                                    {getStatusIcon(activity.status)}
                                                    <span className="ml-1">{activity.status}</span>
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                                <div className="lg:col-span-3">
                                                    <h3 className="font-bold text-gray-800 text-lg mb-2">{activity.title}</h3>
                                                    <p className="text-gray-600">{activity.description}</p>

                                                    {/* User info */}
                                                    <div className="flex items-center mt-3 text-sm text-gray-500">
                                                        <MdPerson className="mr-1" size={16} />
                                                        {activity.user}
                                                    </div>
                                                </div>

                                                {/* Action buttons */}
                                                <div className="flex lg:flex-col lg:items-end justify-end gap-2 mt-4 lg:mt-0">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleExpand(activity.id);
                                                        }}
                                                    >
                                                        {expandedId === activity.id ? 'Hide Details' : 'View Details'}
                                                        <MdKeyboardArrowDown className={`ml-1 transition-transform ${expandedId === activity.id ? 'rotate-180' : ''}`} size={16} />
                                                    </button>

                                                    {activity.status === 'in-progress' && (
                                                        <button
                                                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            Track Progress
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Expanded content */}
                                            <div className={`mt-4 overflow-hidden transition-all duration-300 ${expandedId === activity.id ? 'max-h-80' : 'max-h-0'
                                                }`}>
                                                <div className="pt-3 border-t border-gray-200">
                                                    <div className="flex items-start gap-2 text-sm text-gray-600">
                                                        <MdOutlineDescription className="text-gray-400 mt-1 flex-shrink-0" size={18} />
                                                        <p>{activity.details}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer with pagination/load more */}
            {filteredActivities.length > 10 && (
                <div className="px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-200 flex justify-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg flex items-center">
                        <MdRefresh className="mr-2" size={20} />
                        Load More Activities
                    </button>
                </div>
            )}
        </div>
    );
};

export default TimelineView;
