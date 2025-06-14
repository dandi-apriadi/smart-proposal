import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    MdDescription,
    MdEdit,
    MdDelete,
    MdUpload,
    MdDownload,
    MdHistory,
    MdFilterList,
    MdAccessTime,
    MdSearch,
    MdInfo,
    MdCheckCircle,
    MdWarning,
    MdError
} from 'react-icons/md';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const TimelineView = () => {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        type: 'all',
        search: '',
        dateRange: { start: null, end: null }
    });

    const { user } = useSelector((state) => state.auth);

    // Dummy data for activities
    const dummyActivities = [
        {
            id: 1,
            type: 'proposal_created',
            title: 'Proposal Created',
            description: 'Created a new proposal "Sistem Validasi Format Proposal"',
            timestamp: new Date('2025-04-15T09:30:00'),
            status: 'success',
            icon: <MdDescription className="text-blue-500" />,
        },
        {
            id: 2,
            type: 'proposal_edited',
            title: 'Proposal Edited',
            description: 'Updated proposal content and methodology section',
            timestamp: new Date('2025-04-16T14:20:00'),
            status: 'success',
            icon: <MdEdit className="text-green-500" />,
        },
        {
            id: 3,
            type: 'document_uploaded',
            title: 'Document Uploaded',
            description: 'Uploaded supporting documents for proposal review',
            timestamp: new Date('2025-04-18T11:15:00'),
            status: 'success',
            icon: <MdUpload className="text-purple-500" />,
        },
        {
            id: 4,
            type: 'proposal_submitted',
            title: 'Proposal Submitted',
            description: 'Submitted proposal for review',
            timestamp: new Date('2025-04-20T16:45:00'),
            status: 'success',
            icon: <MdCheckCircle className="text-green-600" />,
        },
        {
            id: 5,
            type: 'progress_report',
            title: 'Progress Report Due',
            description: 'Reminder: Progress report submission deadline in 3 days',
            timestamp: new Date('2025-05-10T08:00:00'),
            status: 'warning',
            icon: <MdWarning className="text-yellow-500" />,
        },
        {
            id: 6,
            type: 'review_received',
            title: 'Review Feedback Received',
            description: 'Received feedback on proposal from Reviewer Panel',
            timestamp: new Date('2025-05-12T13:25:00'),
            status: 'info',
            icon: <MdInfo className="text-blue-600" />,
        },
        {
            id: 7,
            type: 'proposal_rejected',
            title: 'Revision Required',
            description: 'Proposal requires revisions before approval',
            timestamp: new Date('2025-05-15T10:30:00'),
            status: 'error',
            icon: <MdError className="text-red-500" />,
        },
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setActivities(dummyActivities);
            setFilteredActivities(dummyActivities);
            setLoading(false);
        }, 800);
    }, []);

    useEffect(() => {
        filterActivities();
    }, [filters, activities]);

    const filterActivities = () => {
        let filtered = [...activities];

        // Filter by type
        if (filters.type !== 'all') {
            filtered = filtered.filter(activity => activity.type === filters.type);
        }

        // Filter by search term
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(activity =>
                activity.title.toLowerCase().includes(searchTerm) ||
                activity.description.toLowerCase().includes(searchTerm)
            );
        }

        // Filter by date range
        if (filters.dateRange.start && filters.dateRange.end) {
            filtered = filtered.filter(activity =>
                activity.timestamp >= filters.dateRange.start &&
                activity.timestamp <= filters.dateRange.end
            );
        }

        setFilteredActivities(filtered);
    };

    const handleTypeFilterChange = (type) => {
        setFilters({ ...filters, type });
    };

    const handleSearchChange = (e) => {
        setFilters({ ...filters, search: e.target.value });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'success': return 'bg-green-100 border-green-500';
            case 'warning': return 'bg-yellow-100 border-yellow-500';
            case 'error': return 'bg-red-100 border-red-500';
            case 'info': return 'bg-blue-100 border-blue-500';
            default: return 'bg-gray-100 border-gray-500';
        }
    };

    const getActivityTypeOptions = () => {
        const types = [
            { value: 'all', label: 'All Activities' },
            { value: 'proposal_created', label: 'Proposal Created' },
            { value: 'proposal_edited', label: 'Proposal Edited' },
            { value: 'document_uploaded', label: 'Document Uploaded' },
            { value: 'proposal_submitted', label: 'Proposal Submitted' },
            { value: 'progress_report', label: 'Progress Report' },
            { value: 'review_received', label: 'Review Received' },
            { value: 'proposal_rejected', label: 'Revision Required' },
        ];

        return types.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
        ));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Activity Timeline</h2>

            {/* Filter Section */}
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex items-center w-full md:w-auto">
                        <MdFilterList className="text-gray-500 mr-2" />
                        <select
                            className="form-select rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                            value={filters.type}
                            onChange={(e) => handleTypeFilterChange(e.target.value)}
                        >
                            {getActivityTypeOptions()}
                        </select>
                    </div>

                    <div className="relative flex items-center w-full md:w-auto">
                        <MdSearch className="absolute left-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search activities..."
                            className="pl-10 form-input w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                            value={filters.search}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>

                {filteredActivities.length > 0 ? (
                    <div className="space-y-6">
                        {filteredActivities.map((activity, index) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="relative z-10"
                            >
                                <div className="flex items-start space-x-4">
                                    {/* Timeline Icon */}
                                    <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center bg-white rounded-full border-4 border-gray-200 z-10">
                                        {activity.icon}
                                    </div>

                                    {/* Content */}
                                    <div className={`flex-grow p-4 rounded-lg border-l-4 shadow-sm ${getStatusClass(activity.status)}`}>
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                                            <h3 className="text-lg font-medium text-gray-800">{activity.title}</h3>
                                            <div className="flex items-center text-sm text-gray-500 mt-1 md:mt-0">
                                                <MdAccessTime className="mr-1" />
                                                {format(activity.timestamp, 'MMM d, yyyy h:mm a')}
                                            </div>
                                        </div>
                                        <p className="text-gray-600">{activity.description}</p>

                                        {/* Additional details button */}
                                        <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center">
                                            View details
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-10 text-center">
                        <MdHistory className="mx-auto text-4xl text-gray-400" />
                        <p className="mt-2 text-gray-500">No activities found matching your filters</p>
                    </div>
                )}
            </div>

            {/* Load More Button */}
            {filteredActivities.length > 0 && (
                <div className="mt-8 text-center">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition">
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default TimelineView;
