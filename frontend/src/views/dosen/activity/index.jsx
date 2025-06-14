import React, { useState, useEffect } from 'react';
import { MdCalendarToday, MdFileDownload, MdSearch, MdFilterList, MdTimeline, MdHistory, MdArrowUpward } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Helper function to format dates
const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Format date as "DD MMM YYYY"
    const dateFormatter = new Intl.DateTimeFormat('en', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    // Format time as "HH:mm"
    const timeFormatter = new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return `${dateFormatter.format(date)}, ${timeFormatter.format(date)}`;
};

// Mock data for demonstration
const ACTIVITY_DATA = [
    { id: 1, action: "Proposal Submitted", description: "Submitted proposal for Research Grant 2025", date: "2025-04-10T09:30:00", status: "completed", category: "proposal" },
    { id: 2, action: "Profile Updated", description: "Updated academic credentials", date: "2025-04-08T14:45:00", status: "completed", category: "profile" },
    { id: 3, action: "Document Uploaded", description: "Uploaded supporting document for proposal #PRO-2025-0023", date: "2025-04-05T11:20:00", status: "completed", category: "document" },
    { id: 4, action: "Feedback Received", description: "Received feedback on Research Proposal draft", date: "2025-04-03T16:15:00", status: "completed", category: "feedback" },
    { id: 5, action: "Meeting Scheduled", description: "Scheduled review meeting with department head", date: "2025-04-01T10:00:00", status: "upcoming", category: "meeting" },
    { id: 6, action: "Proposal Draft Saved", description: "Saved draft of community service proposal", date: "2025-03-28T15:30:00", status: "completed", category: "proposal" },
    { id: 7, action: "Progress Report Submitted", description: "Submitted monthly progress report", date: "2025-03-25T09:45:00", status: "completed", category: "report" },
    { id: 8, action: "Template Downloaded", description: "Downloaded proposal template for innovation grant", date: "2025-03-22T14:10:00", status: "completed", category: "document" },
    { id: 9, action: "Notification Settings Updated", description: "Updated email notification preferences", date: "2025-03-20T11:50:00", status: "completed", category: "profile" },
    { id: 10, action: "Comment Added", description: "Added comment on collaborative proposal section", date: "2025-03-15T16:40:00", status: "completed", category: "communication" }
];

const ActivityTracker = () => {
    const [activities, setActivities] = useState(ACTIVITY_DATA);
    const [filterCategory, setFilterCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("recent"); // "recent" or "timeline"
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    // Detect scroll for "back to top" button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.pageYOffset > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Filter activities based on category and search term
    const filteredActivities = activities.filter(activity => {
        const matchesCategory = filterCategory === "all" || activity.category === filterCategory;
        const matchesSearch = activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Function to handle export activity history
    const handleExport = (format) => {
        // In a real implementation, this would generate and download a file
        console.log(`Exporting activity history as ${format}`);
        alert(`Activity history exported as ${format}`);
    };

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm" data-aos="fade-down">
                <div className=" mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Activity Tracker</h1>
                            <p className="text-gray-500 mt-1">Monitor and review your recent activities</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                            <button
                                onClick={() => handleExport('pdf')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
                            >
                                <MdFileDownload className="mr-2" /> Export PDF
                            </button>
                            <button
                                onClick={() => handleExport('excel')}
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-150"
                            >
                                <MdFileDownload className="mr-2" /> Export Excel
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Filter and Search */}
            <div className=" mx-auto px-4 py-6" data-aos="fade-up">
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <MdSearch className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search activities..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <MdFilterList className="text-gray-500" />
                            <select
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                <option value="proposal">Proposals</option>
                                <option value="document">Documents</option>
                                <option value="profile">Profile</option>
                                <option value="report">Reports</option>
                                <option value="feedback">Feedback</option>
                                <option value="meeting">Meetings</option>
                                <option value="communication">Communication</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className=" mx-auto px-4 mb-6" data-aos="fade-up">
                <div className="flex border-b border-gray-200">
                    <button
                        className={`px-6 py-3 text-sm font-medium ${activeTab === 'recent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('recent')}
                    >
                        <div className="flex items-center">
                            <MdHistory className="mr-2" /> Recent Actions
                        </div>
                    </button>
                    <button
                        className={`px-6 py-3 text-sm font-medium ${activeTab === 'timeline' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('timeline')}
                    >
                        <div className="flex items-center">
                            <MdTimeline className="mr-2" /> Timeline View
                        </div>
                    </button>
                </div>
            </div>

            {/* Activity Content */}
            <div className=" mx-auto px-4 pb-12">
                {activeTab === 'recent' ? (
                    /* Recent Actions List */
                    <div className="grid grid-cols-1 gap-4" data-aos="fade-up">
                        {filteredActivities.length > 0 ? (
                            filteredActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
                                    data-aos="fade-up"
                                    data-aos-delay={`${(activity.id % 10) * 50}`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div>
                                            <div className="flex items-center">
                                                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                                    }`}></span>
                                                <h3 className="font-medium text-gray-800">{activity.action}</h3>
                                            </div>
                                            <p className="text-gray-600 mt-1">{activity.description}</p>
                                        </div>
                                        <div className="mt-2 md:mt-0 flex items-center space-x-2 text-sm text-gray-500">
                                            <MdCalendarToday />
                                            <span>{formatDate(activity.date)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                                            {activity.category}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500">No activities found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Timeline View */
                    <div className="bg-white rounded-lg shadow-sm p-6" data-aos="fade-up">
                        <div className="relative">
                            {filteredActivities.length > 0 ? (
                                filteredActivities.map((activity, index) => (
                                    <div
                                        key={activity.id}
                                        className={`ml-6 mb-8 relative ${index !== filteredActivities.length - 1 ? 'pb-8' : ''}`}
                                        data-aos="fade-up"
                                        data-aos-delay={`${index * 100}`}
                                    >
                                        {/* Timeline connector */}
                                        {index !== filteredActivities.length - 1 && (
                                            <div className="absolute left-0 top-6 -ml-6 h-full w-0.5 bg-gray-200"></div>
                                        )}

                                        {/* Activity dot */}
                                        <div className={`absolute left-0 top-1.5 -ml-8 h-4 w-4 rounded-full border-2 border-white ${activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                            }`}></div>

                                        {/* Activity content */}
                                        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                                <h3 className="font-medium text-gray-800">{activity.action}</h3>
                                                <div className="text-sm text-gray-500 flex items-center mt-2 md:mt-0">
                                                    <MdCalendarToday className="mr-1" />
                                                    <span>{formatDate(activity.date)}</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-600">{activity.description}</p>
                                            <div className="mt-2">
                                                <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                                                    {activity.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No activities found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Back to top button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
                    data-aos="fade-up"
                >
                    <MdArrowUpward />
                </button>
            )}
        </div>
    );
};

export default ActivityTracker;
