import React, { useState, useEffect } from 'react';
import {
    MdAccessTime,
    MdAssignment,
    MdEventNote,
    MdDescription,
    MdSort,
    MdFilterList
} from 'react-icons/md';

const UpcomingDeadline = () => {
    // Dummy data for deadlines based on database structure
    const [deadlines, setDeadlines] = useState([
        {
            id: 1,
            type: 'Proposal Review',
            sessionName: 'Session 2025-1',
            deadline: new Date('2025-06-15T23:59:59Z'),
            icon: <MdAssignment className="text-blue-500" />,
            count: 12
        },
        {
            id: 2,
            type: 'Progress Report',
            sessionName: 'Session 2025-1',
            deadline: new Date('2025-08-15T23:59:59Z'),
            icon: <MdEventNote className="text-green-500" />,
            count: 8
        },
        {
            id: 3,
            type: 'Final Report',
            sessionName: 'Session 2025-1',
            deadline: new Date('2025-10-15T23:59:59Z'),
            icon: <MdDescription className="text-purple-500" />,
            count: 15
        },
        {
            id: 4,
            type: 'Eligibility Review',
            sessionName: 'Session 2025-1',
            deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
            icon: <MdAssignment className="text-orange-500" />,
            count: 5
        }
    ]);

    const [sortOption, setSortOption] = useState('closest');
    const [filteredDeadlines, setFilteredDeadlines] = useState([]);

    useEffect(() => {
        // Sort deadlines based on selected option
        let sortedDeadlines = [...deadlines];

        if (sortOption === 'closest') {
            sortedDeadlines.sort((a, b) => a.deadline - b.deadline);
        } else if (sortOption === 'count') {
            sortedDeadlines.sort((a, b) => b.count - a.count);
        }

        setFilteredDeadlines(sortedDeadlines);
    }, [deadlines, sortOption]);

    // Function to calculate days remaining
    const getDaysRemaining = (deadline) => {
        const timeRemaining = deadline - new Date();
        const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        return daysRemaining;
    };

    // Function to determine urgency class
    const getUrgencyClass = (daysRemaining) => {
        if (daysRemaining < 0) {
            return 'bg-gray-200 text-gray-700'; // Past deadline
        } else if (daysRemaining < 3) {
            return 'bg-red-100 border-l-4 border-red-500'; // Critical
        } else if (daysRemaining < 7) {
            return 'bg-orange-100 border-l-4 border-orange-500'; // Warning
        } else if (daysRemaining < 14) {
            return 'bg-yellow-100 border-l-4 border-yellow-500'; // Attention
        } else {
            return 'bg-green-100 border-l-4 border-green-500'; // Plenty of time
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 h-full" data-aos="fade-up">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Upcoming Deadlines</h2>
                <div className="flex items-center space-x-2">
                    <div className="relative inline-block">
                        <select
                            className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-1 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-sm"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="closest">Closest First</option>
                            <option value="count">Item Count</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <MdSort />
                        </div>
                    </div>
                    <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                        <MdFilterList className="text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="space-y-3 overflow-auto max-h-[calc(100%-3rem)] pr-1">
                {filteredDeadlines.length > 0 ? (
                    filteredDeadlines.map((deadline) => {
                        const daysRemaining = getDaysRemaining(deadline.deadline);
                        const urgencyClass = getUrgencyClass(daysRemaining);

                        return (
                            <div
                                key={deadline.id}
                                className={`p-3 rounded-lg transition-all duration-300 hover:shadow-md ${urgencyClass}`}
                                data-aos="fade-right"
                                data-aos-delay={deadline.id * 100}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="p-2 rounded-full bg-white shadow-sm">
                                        {deadline.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium text-gray-800">{deadline.type}</h3>
                                            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-white shadow-sm">
                                                {deadline.count} items
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">{deadline.sessionName}</p>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-xs text-gray-500">
                                                {deadline.deadline.toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                            <div className="flex items-center">
                                                <MdAccessTime className="text-gray-500 mr-1 text-xs" />
                                                <span className={`text-xs font-medium ${daysRemaining < 0
                                                    ? 'text-gray-500'
                                                    : daysRemaining < 3
                                                        ? 'text-red-600'
                                                        : daysRemaining < 7
                                                            ? 'text-orange-600'
                                                            : 'text-green-600'
                                                    }`}>
                                                    {daysRemaining < 0
                                                        ? 'Past due'
                                                        : daysRemaining === 0
                                                            ? 'Today'
                                                            : daysRemaining === 1
                                                                ? 'Tomorrow'
                                                                : `${daysRemaining} days left`
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        {/* Progress bar for visual indication of time remaining */}
                                        {daysRemaining >= 0 && daysRemaining <= 30 && (
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                                <div
                                                    className={`h-1.5 rounded-full ${daysRemaining < 3
                                                        ? 'bg-red-500'
                                                        : daysRemaining < 7
                                                            ? 'bg-orange-500'
                                                            : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${Math.max(100 - (daysRemaining / 30) * 100, 10)}%` }}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No upcoming deadlines found
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpcomingDeadline;
