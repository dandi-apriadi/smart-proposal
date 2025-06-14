import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    MdAccessTime,
    MdWarning,
    MdNotifications,
    MdCalendarToday,
    MdAssignment,
    MdChevronRight,
    MdFilterList,
    MdSearch
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DeadlineReminder = () => {
    const [reminders, setReminders] = useState([]);
    const [filter, setFilter] = useState('all'); // all, urgent, upcoming, past
    const [searchTerm, setSearchTerm] = useState('');
    const baseURL = useSelector((state) => state.auth.baseURL);

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    // Fetch reminders (mock data for now)
    useEffect(() => {
        // In a real implementation, you would fetch from API
        // Example: fetch(`${baseURL}/api/reviewer/deadlines`)

        // Mock data
        const mockReminders = [
            {
                id: 1,
                title: "Review Proposal: AI Implementation in Education",
                proposalId: "PROP-2025-001",
                deadline: "2025-04-25T23:59:59",
                author: "Dr. Sarah Johnson",
                department: "Computer Science",
                status: "pending",
                type: "proposal_review"
            },
            {
                id: 2,
                title: "Progress Report Evaluation",
                proposalId: "PROP-2025-012",
                deadline: "2025-04-18T23:59:59",
                author: "Prof. Michael Chen",
                department: "Engineering",
                status: "pending",
                type: "progress_review"
            },
            {
                id: 3,
                title: "Final Report Assessment",
                proposalId: "PROP-2024-089",
                deadline: "2025-05-05T23:59:59",
                author: "Dr. Emily Rodriguez",
                department: "Data Science",
                status: "pending",
                type: "final_review"
            },
            {
                id: 4,
                title: "Proposal Feedback Required",
                proposalId: "PROP-2025-042",
                deadline: "2025-04-15T23:59:59",
                author: "Dr. James Wilson",
                department: "Information Systems",
                status: "pending",
                type: "proposal_review"
            }
        ];

        setReminders(mockReminders);
    }, [baseURL]);

    // Filter reminders
    const filteredReminders = reminders.filter(reminder => {
        // Apply search filter
        if (searchTerm && !reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !reminder.proposalId.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }

        const deadlineDate = new Date(reminder.deadline);
        const today = new Date();
        const daysDifference = Math.floor((deadlineDate - today) / (1000 * 60 * 60 * 24));

        switch (filter) {
            case 'urgent':
                return daysDifference <= 3 && deadlineDate >= today;
            case 'upcoming':
                return daysDifference > 3 && daysDifference <= 14;
            case 'past':
                return deadlineDate < today;
            default:
                return true;
        }
    });

    // Calculate urgency levels
    const getUrgencyClass = (deadline) => {
        const deadlineDate = new Date(deadline);
        const today = new Date();
        const daysDifference = Math.floor((deadlineDate - today) / (1000 * 60 * 60 * 24));

        if (daysDifference < 0) return "bg-gray-600"; // past deadline
        if (daysDifference < 2) return "bg-red-600"; // very urgent
        if (daysDifference < 5) return "bg-orange-500"; // urgent
        if (daysDifference < 10) return "bg-yellow-500"; // approaching
        return "bg-green-500"; // plenty of time
    };

    // Format date
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden" data-aos="fade-up">
            <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <MdCalendarToday className="text-2xl" />
                        <h2 className="text-xl font-bold">Deadline Reminders</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                            <input
                                type="text"
                                placeholder="Search reminders..."
                                className="pl-10 pr-4 py-2 rounded-full bg-blue-700 text-white placeholder-blue-200 outline-none focus:ring-2 focus:ring-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <select
                                className="appearance-none bg-blue-700 text-white px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-white pr-10"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">All Deadlines</option>
                                <option value="urgent">Urgent (≤ 3 days)</option>
                                <option value="upcoming">Upcoming (≤ 14 days)</option>
                                <option value="past">Past Deadlines</option>
                            </select>
                            <MdFilterList className="absolute right-3 top-1/2 -translate-y-1/2 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5">
                {filteredReminders.length === 0 ? (
                    <div className="text-center p-8 text-gray-500">
                        <MdNotifications className="mx-auto text-5xl mb-2" />
                        <p>No deadline reminders match your criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredReminders.map((reminder) => {
                            const urgencyClass = getUrgencyClass(reminder.deadline);
                            const deadlineDate = new Date(reminder.deadline);
                            const isPastDue = deadlineDate < new Date();

                            return (
                                <div
                                    key={reminder.id}
                                    className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                                    data-aos="fade-up"
                                >
                                    <div className={`h-2 ${urgencyClass}`}></div>
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">{reminder.title}</h3>
                                            <div className={`flex items-center text-xs font-bold ${urgencyClass} text-white px-2 py-1 rounded-full`}>
                                                {isPastDue ? (
                                                    <span className="flex items-center"><MdWarning className="mr-1" /> OVERDUE</span>
                                                ) : (
                                                    <span className="flex items-center"><MdAccessTime className="mr-1" /> {new Date(reminder.deadline).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <MdAssignment className="mr-2" />
                                                <span className="font-medium mr-1">ID:</span> {reminder.proposalId}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <MdCalendarToday className="mr-2" />
                                                <span className="font-medium mr-1">Due:</span> {formatDate(reminder.deadline)}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium mr-1">Author:</span> {reminder.author}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium mr-1">Department:</span> {reminder.department}
                                            </div>
                                        </div>

                                        <div className="flex space-x-2">
                                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
                                                Start Review
                                            </button>
                                            <button className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-3 rounded-lg transition-colors duration-200">
                                                <MdChevronRight size={24} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="p-5 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex space-x-6">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                            <span>Urgent (≤2 days)</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                            <span>Soon (≤5 days)</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                            <span>Approaching (≤10 days)</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span>Plenty of time</span>
                        </div>
                    </div>
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">View All Deadlines</a>
                </div>
            </div>
        </div>
    );
};

export default DeadlineReminder;
