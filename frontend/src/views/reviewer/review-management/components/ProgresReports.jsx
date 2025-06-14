import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    MdSearch, MdFilterList, MdSort, MdCheckCircle,
    MdPending, MdWarning, MdArrowBack, MdOutlineEdit,
    MdOutlineAdd, MdOutlineRemove, MdStar, MdStarBorder,
    MdCalendarToday, MdPerson, MdAttachFile
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProgresReports = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    // States
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedReport, setSelectedReport] = useState(null);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const [expandedSection, setExpandedSection] = useState(null);

    // Dummy data
    useEffect(() => {
        const dummyReports = [
            {
                id: 1,
                title: "Implementation of AI-Based Document Classification System",
                researcher: "Dr. Anita Wijaya",
                submissionDate: "2025-07-10",
                dueReviewDate: "2025-07-20",
                status: "pending",
                completionPercentage: 45,
                attachments: 3,
                summary: "This progress report details the implementation of the document classification system using Random Forest algorithm. We have completed data collection and preprocessing, and are now in the model training phase.",
                milestones: [
                    { name: "Data Collection", status: "completed", date: "2025-06-01" },
                    { name: "Data Preprocessing", status: "completed", date: "2025-06-15" },
                    { name: "Feature Extraction", status: "in-progress", date: "2025-07-05" },
                    { name: "Model Training", status: "planned", date: "2025-07-25" },
                    { name: "Testing & Validation", status: "planned", date: "2025-08-10" }
                ],
                challenges: "Initial data collection resulted in imbalanced classes. We're applying oversampling techniques to address this issue."
            },
            {
                id: 2,
                title: "Enhanced Method for Network Traffic Pattern Analysis",
                researcher: "Prof. Budi Santoso",
                submissionDate: "2025-07-08",
                dueReviewDate: "2025-07-18",
                status: "reviewed",
                completionPercentage: 60,
                attachments: 2,
                summary: "This report covers our progress on network traffic pattern analysis. We've completed the data collection phase and initial pattern recognition algorithms implementation.",
                milestones: [
                    { name: "Requirements Analysis", status: "completed", date: "2025-05-20" },
                    { name: "Data Collection", status: "completed", date: "2025-06-10" },
                    { name: "Algorithm Development", status: "completed", date: "2025-06-25" },
                    { name: "Implementation", status: "in-progress", date: "2025-07-05" },
                    { name: "Testing", status: "planned", date: "2025-07-30" }
                ],
                challenges: "Processing large volumes of network data requires optimization of our algorithms for better performance."
            },
            {
                id: 3,
                title: "Development of Smart Campus Navigation System",
                researcher: "Dr. Caroline Dewi",
                submissionDate: "2025-07-12",
                dueReviewDate: "2025-07-22",
                status: "pending",
                completionPercentage: 30,
                attachments: 4,
                summary: "This progress report outlines the development of our campus navigation system. We have completed the initial mapping and are now developing the mobile application interface.",
                milestones: [
                    { name: "Campus Mapping", status: "completed", date: "2025-06-05" },
                    { name: "Database Design", status: "completed", date: "2025-06-20" },
                    { name: "Backend Development", status: "in-progress", date: "2025-07-10" },
                    { name: "Frontend Development", status: "in-progress", date: "2025-07-15" },
                    { name: "Testing & Deployment", status: "planned", date: "2025-08-01" }
                ],
                challenges: "Ensuring accurate indoor positioning remains challenging. We're exploring the use of Bluetooth beacons for better accuracy."
            },
            {
                id: 4,
                title: "Renewable Energy Integration in Smart Grid Systems",
                researcher: "Prof. Denny Wijaya",
                submissionDate: "2025-07-05",
                dueReviewDate: "2025-07-15",
                status: "needs-revision",
                completionPercentage: 40,
                attachments: 5,
                summary: "This report details our progress on integrating renewable energy sources into smart grid systems. We have completed the theoretical modeling and initial simulations.",
                milestones: [
                    { name: "Literature Review", status: "completed", date: "2025-05-15" },
                    { name: "System Modeling", status: "completed", date: "2025-06-10" },
                    { name: "Simulation Development", status: "completed", date: "2025-06-30" },
                    { name: "Prototype Development", status: "in-progress", date: "2025-07-20" },
                    { name: "Field Testing", status: "planned", date: "2025-08-15" }
                ],
                challenges: "Balancing load with intermittent renewable sources requires complex algorithms. We're developing adaptive control systems to address this."
            },
            {
                id: 5,
                title: "IoT-Based Environmental Monitoring System",
                researcher: "Dr. Eko Prasetyo",
                submissionDate: "2025-07-09",
                dueReviewDate: "2025-07-19",
                status: "reviewed",
                completionPercentage: 75,
                attachments: 3,
                summary: "This progress report covers our development of an IoT-based environmental monitoring system. We have completed sensor deployment and data collection, and are now finalizing the analytics dashboard.",
                milestones: [
                    { name: "Sensor Selection", status: "completed", date: "2025-05-10" },
                    { name: "Sensor Network Design", status: "completed", date: "2025-05-25" },
                    { name: "Deployment", status: "completed", date: "2025-06-15" },
                    { name: "Data Collection System", status: "completed", date: "2025-06-30" },
                    { name: "Analytics Dashboard", status: "in-progress", date: "2025-07-15" }
                ],
                challenges: "Power management for remote sensors is challenging. We're implementing solar charging to extend battery life."
            }
        ];

        setReports(dummyReports);
        setFilteredReports(dummyReports);
    }, []);

    // Filtering and sorting
    useEffect(() => {
        let result = [...reports];

        // Apply filters
        if (filterStatus !== 'all') {
            result = result.filter(report => report.status === filterStatus);
        }

        // Apply search
        if (searchTerm) {
            result = result.filter(
                report =>
                    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    report.researcher.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply sorting
        result.sort((a, b) => {
            let comparison = 0;

            if (sortBy === 'date') {
                comparison = new Date(a.submissionDate) - new Date(b.submissionDate);
            } else if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title);
            } else if (sortBy === 'researcher') {
                comparison = a.researcher.localeCompare(b.researcher);
            } else if (sortBy === 'status') {
                comparison = a.status.localeCompare(b.status);
            } else if (sortBy === 'progress') {
                comparison = a.completionPercentage - b.completionPercentage;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        setFilteredReports(result);
    }, [reports, searchTerm, filterStatus, sortBy, sortOrder]);

    // Handle review submission
    const handleSubmitReview = () => {
        if (!selectedReport) return;

        // In a real app, this would send data to the server
        const updatedReports = reports.map(report =>
            report.id === selectedReport.id
                ? { ...report, status: 'reviewed' }
                : report
        );

        setReports(updatedReports);
        setSelectedReport(null);
        setReviewComment('');
        setReviewRating(0);

        // Show success notification (would use a proper notification system in production)
        alert('Review submitted successfully');
    };

    // Handle request for revision
    const handleRequestRevision = () => {
        if (!selectedReport) return;

        // In a real app, this would send data to the server
        const updatedReports = reports.map(report =>
            report.id === selectedReport.id
                ? { ...report, status: 'needs-revision' }
                : report
        );

        setReports(updatedReports);
        setSelectedReport(null);
        setReviewComment('');
        setReviewRating(0);

        // Show success notification
        alert('Revision requested successfully');
    };

    // Status badge component
    const StatusBadge = ({ status }) => {
        let bgColor, textColor, icon, text;

        switch (status) {
            case 'pending':
                bgColor = 'bg-yellow-100';
                textColor = 'text-yellow-800';
                icon = <MdPending className="mr-1" />;
                text = 'Pending Review';
                break;
            case 'reviewed':
                bgColor = 'bg-green-100';
                textColor = 'text-green-800';
                icon = <MdCheckCircle className="mr-1" />;
                text = 'Reviewed';
                break;
            case 'needs-revision':
                bgColor = 'bg-red-100';
                textColor = 'text-red-800';
                icon = <MdWarning className="mr-1" />;
                text = 'Needs Revision';
                break;
            default:
                bgColor = 'bg-gray-100';
                textColor = 'text-gray-800';
                icon = null;
                text = status;
        }

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
                {icon}
                {text}
            </span>
        );
    };

    // Progress bar component
    const ProgressBar = ({ percentage }) => {
        let bgColor;

        if (percentage < 30) bgColor = 'bg-red-500';
        else if (percentage < 70) bgColor = 'bg-yellow-500';
        else bgColor = 'bg-green-500';

        return (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className={`h-2.5 rounded-full ${bgColor}`}
                    style={{ width: `${percentage}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-1">{percentage}% complete</span>
            </div>
        );
    };

    // Star rating component
    const StarRating = ({ rating, setRating, readOnly = false }) => {
        return (
            <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => !readOnly && setRating(star)}
                        className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} text-xl focus:outline-none`}
                    >
                        {star <= rating ?
                            <MdStar className="text-yellow-400" /> :
                            <MdStarBorder className="text-gray-400" />
                        }
                    </button>
                ))}
            </div>
        );
    };

    // Main component render
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            {!selectedReport ? (
                <div data-aos="fade-up">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Progress Reports</h2>

                        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                            {/* Search bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search reports..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
                                />
                                <MdSearch className="absolute left-3 top-3 text-gray-400 text-lg" />
                            </div>

                            {/* Filter dropdown */}
                            <div className="relative inline-block text-left">
                                <div className="flex">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        id="filter-menu"
                                        onClick={() => document.getElementById('filter-dropdown').classList.toggle('hidden')}
                                    >
                                        <MdFilterList className="mr-2 h-5 w-5" />
                                        Filter
                                    </button>

                                    {/* Sort dropdown */}
                                    <button
                                        type="button"
                                        className="ml-2 inline-flex justify-center w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        id="sort-menu"
                                        onClick={() => document.getElementById('sort-dropdown').classList.toggle('hidden')}
                                    >
                                        <MdSort className="mr-2 h-5 w-5" />
                                        Sort
                                    </button>
                                </div>

                                {/* Filter dropdown menu */}
                                <div
                                    id="filter-dropdown"
                                    className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="filter-menu"
                                >
                                    <div className="py-1" role="none">
                                        <button
                                            className={`${filterStatus === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left hover:bg-gray-100`}
                                            onClick={() => setFilterStatus('all')}
                                        >
                                            All Reports
                                        </button>
                                        <button
                                            className={`${filterStatus === 'pending' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left hover:bg-gray-100`}
                                            onClick={() => setFilterStatus('pending')}
                                        >
                                            Pending Review
                                        </button>
                                        <button
                                            className={`${filterStatus === 'reviewed' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left hover:bg-gray-100`}
                                            onClick={() => setFilterStatus('reviewed')}
                                        >
                                            Reviewed
                                        </button>
                                        <button
                                            className={`${filterStatus === 'needs-revision' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left hover:bg-gray-100`}
                                            onClick={() => setFilterStatus('needs-revision')}
                                        >
                                            Needs Revision
                                        </button>
                                    </div>
                                </div>

                                {/* Sort dropdown menu */}
                                <div
                                    id="sort-dropdown"
                                    className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="sort-menu"
                                >
                                    <div className="py-1" role="none">
                                        <button
                                            className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                                            onClick={() => {
                                                setSortBy('date');
                                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                            }}
                                        >
                                            Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </button>
                                        <button
                                            className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                                            onClick={() => {
                                                setSortBy('title');
                                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                            }}
                                        >
                                            Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </button>
                                        <button
                                            className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                                            onClick={() => {
                                                setSortBy('researcher');
                                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                            }}
                                        >
                                            Researcher {sortBy === 'researcher' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </button>
                                        <button
                                            className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                                            onClick={() => {
                                                setSortBy('status');
                                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                            }}
                                        >
                                            Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </button>
                                        <button
                                            className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                                            onClick={() => {
                                                setSortBy('progress');
                                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                            }}
                                        >
                                            Progress {sortBy === 'progress' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reports count and stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
                            <h3 className="text-lg font-semibold text-blue-700 mb-2">Total Reports</h3>
                            <p className="text-3xl font-bold text-blue-800">{reports.length}</p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-4 shadow-sm">
                            <h3 className="text-lg font-semibold text-yellow-700 mb-2">Pending Review</h3>
                            <p className="text-3xl font-bold text-yellow-800">
                                {reports.filter(r => r.status === 'pending').length}
                            </p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-4 shadow-sm">
                            <h3 className="text-lg font-semibold text-red-700 mb-2">Needs Revision</h3>
                            <p className="text-3xl font-bold text-red-800">
                                {reports.filter(r => r.status === 'needs-revision').length}
                            </p>
                        </div>
                    </div>

                    {/* Reports list */}
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Report
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Progress
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Due Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredReports.length > 0 ? (
                                    filteredReports.map((report) => (
                                        <tr
                                            key={report.id}
                                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                                            data-aos="fade-up"
                                            data-aos-delay={(report.id % 5) * 100}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                                                    <div className="text-sm text-gray-500 flex items-center mt-1">
                                                        <MdPerson className="mr-1" />
                                                        {report.researcher}
                                                    </div>
                                                    <div className="text-xs text-gray-400 flex items-center mt-1">
                                                        <MdCalendarToday className="mr-1" />
                                                        Submitted: {new Date(report.submissionDate).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-xs text-gray-400 flex items-center mt-1">
                                                        <MdAttachFile className="mr-1" />
                                                        {report.attachments} attachment{report.attachments !== 1 ? 's' : ''}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={report.status} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <ProgressBar percentage={report.completionPercentage} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(report.dueReviewDate).toLocaleDateString()}
                                                {new Date(report.dueReviewDate) < new Date() && (
                                                    <span className="text-red-500 ml-2 font-medium">Overdue</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => setSelectedReport(report)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-blue-700 text-sm leading-5 font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                                                >
                                                    {report.status === 'pending' ? 'Review' : 'View Details'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                            No progress reports found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div data-aos="fade-up">
                    {/* Report detail view */}
                    <div className="mb-6 flex justify-between items-center">
                        <button
                            onClick={() => setSelectedReport(null)}
                            className="inline-flex items-center text-gray-700 hover:text-gray-900"
                        >
                            <MdArrowBack className="mr-1" /> Back to Reports
                        </button>
                        <StatusBadge status={selectedReport.status} />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedReport.title}</h2>
                        <div className="flex flex-col md:flex-row md:items-center mb-4 text-gray-600">
                            <div className="flex items-center mr-6 mb-2 md:mb-0">
                                <MdPerson className="mr-1" />
                                <span>{selectedReport.researcher}</span>
                            </div>
                            <div className="flex items-center mr-6 mb-2 md:mb-0">
                                <MdCalendarToday className="mr-1" />
                                <span>Submitted: {new Date(selectedReport.submissionDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                                <MdCalendarToday className="mr-1" />
                                <span>Due: {new Date(selectedReport.dueReviewDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <ProgressBar percentage={selectedReport.completionPercentage} />
                        </div>
                    </div>

                    {/* Report content sections */}
                    <div className="space-y-6">
                        {/* Summary section */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <button
                                className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 focus:outline-none"
                                onClick={() => setExpandedSection(expandedSection === 'summary' ? null : 'summary')}
                            >
                                <h3 className="text-lg font-medium text-gray-900">Summary</h3>
                                {expandedSection === 'summary' ? <MdOutlineRemove /> : <MdOutlineAdd />}
                            </button>
                            {expandedSection === 'summary' && (
                                <div className="p-4 bg-white border-t border-gray-200">
                                    <p className="text-gray-700">{selectedReport.summary}</p>
                                </div>
                            )}
                        </div>

                        {/* Milestones section */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <button
                                className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 focus:outline-none"
                                onClick={() => setExpandedSection(expandedSection === 'milestones' ? null : 'milestones')}
                            >
                                <h3 className="text-lg font-medium text-gray-900">Milestones</h3>
                                {expandedSection === 'milestones' ? <MdOutlineRemove /> : <MdOutlineAdd />}
                            </button>
                            {expandedSection === 'milestones' && (
                                <div className="p-4 bg-white border-t border-gray-200">
                                    <div className="space-y-4">
                                        {selectedReport.milestones.map((milestone, index) => (
                                            <div key={index} className="flex items-start">
                                                <div className="relative flex items-center justify-center">
                                                    <div className={`h-5 w-5 rounded-full flex items-center justify-center ${milestone.status === 'completed'
                                                        ? 'bg-green-500'
                                                        : milestone.status === 'in-progress'
                                                            ? 'bg-yellow-500'
                                                            : 'bg-gray-300'
                                                        }`}>
                                                        {milestone.status === 'completed' && (
                                                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    {index < selectedReport.milestones.length - 1 && (
                                                        <div className="absolute top-5 left-2.5 w-0.5 h-full bg-gray-300"></div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{milestone.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(milestone.date).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-xs text-gray-500 capitalize">{milestone.status.replace('-', ' ')}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Challenges section */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <button
                                className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 focus:outline-none"
                                onClick={() => setExpandedSection(expandedSection === 'challenges' ? null : 'challenges')}
                            >
                                <h3 className="text-lg font-medium text-gray-900">Challenges & Issues</h3>
                                {expandedSection === 'challenges' ? <MdOutlineRemove /> : <MdOutlineAdd />}
                            </button>
                            {expandedSection === 'challenges' && (
                                <div className="p-4 bg-white border-t border-gray-200">
                                    <p className="text-gray-700">{selectedReport.challenges}</p>
                                </div>
                            )}
                        </div>

                        {/* Attachments section */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <button
                                className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 focus:outline-none"
                                onClick={() => setExpandedSection(expandedSection === 'attachments' ? null : 'attachments')}
                            >
                                <h3 className="text-lg font-medium text-gray-900">Attachments ({selectedReport.attachments})</h3>
                                {expandedSection === 'attachments' ? <MdOutlineRemove /> : <MdOutlineAdd />}
                            </button>
                            {expandedSection === 'attachments' && (
                                <div className="p-4 bg-white border-t border-gray-200">
                                    <ul className="space-y-2">
                                        {/* Dummy attachments */}
                                        <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                            <div className="flex items-center">
                                                <MdAttachFile className="text-gray-500 mr-2" />
                                                <span className="text-blue-600 hover:underline">research_progress_data.pdf</span>
                                            </div>
                                            <span className="text-xs text-gray-500">2.4 MB</span>
                                        </li>
                                        <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                            <div className="flex items-center">
                                                <MdAttachFile className="text-gray-500 mr-2" />
                                                <span className="text-blue-600 hover:underline">experiment_results.xlsx</span>
                                            </div>
                                            <span className="text-xs text-gray-500">1.8 MB</span>
                                        </li>
                                        {selectedReport.attachments > 2 && (
                                            <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                                <div className="flex items-center">
                                                    <MdAttachFile className="text-gray-500 mr-2" />
                                                    <span className="text-blue-600 hover:underline">methodology_updates.docx</span>
                                                </div>
                                                <span className="text-xs text-gray-500">1.2 MB</span>
                                            </li>
                                        )}
                                        {selectedReport.attachments > 3 && (
                                            <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                                <div className="flex items-center">
                                                    <MdAttachFile className="text-gray-500 mr-2" />
                                                    <span className="text-blue-600 hover:underline">preliminary_findings.pptx</span>
                                                </div>
                                                <span className="text-xs text-gray-500">3.5 MB</span>
                                            </li>
                                        )}
                                        {selectedReport.attachments > 4 && (
                                            <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                                <div className="flex items-center">
                                                    <MdAttachFile className="text-gray-500 mr-2" />
                                                    <span className="text-blue-600 hover:underline">literature_review_update.pdf</span>
                                                </div>
                                                <span className="text-xs text-gray-500">1.9 MB</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Review form */}
                    {selectedReport.status === 'pending' && (
                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Review This Report</h3>

                            <div className="mb-4">
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                                    Rating
                                </label>
                                <StarRating rating={reviewRating} setRating={setReviewRating} />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                                    Comments & Feedback
                                </label>
                                <textarea
                                    id="comment"
                                    rows="4"
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                    placeholder="Provide your feedback on this progress report..."
                                    value={reviewComment}
                                    onChange={(e) => setReviewComment(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                <button
                                    type="button"
                                    onClick={handleSubmitReview}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    disabled={!reviewComment || reviewRating === 0}
                                >
                                    <MdCheckCircle className="mr-2 h-5 w-5" />
                                    Approve Report
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRequestRevision}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    disabled={!reviewComment}
                                >
                                    <MdWarning className="mr-2 h-5 w-5" />
                                    Request Revision
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Previous review (if already reviewed) */}
                    {(selectedReport.status === 'reviewed' || selectedReport.status === 'needs-revision') && (
                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Review Details</h3>

                            <div className="mb-4">
                                <span className="block text-sm font-medium text-gray-700 mb-1">Rating</span>
                                <StarRating rating={selectedReport.status === 'reviewed' ? 4 : 2} readOnly={true} />
                            </div>

                            <div className="mb-4">
                                <span className="block text-sm font-medium text-gray-700 mb-1">Reviewer Comments</span>
                                <div className="mt-1 p-3 bg-gray-50 rounded-md text-gray-700">
                                    {selectedReport.status === 'reviewed' ? (
                                        "The progress report shows good advancement in the research objectives. The methodology is sound and the preliminary results are promising. Keep up the good work and continue to document any challenges faced during implementation."
                                    ) : (
                                        "This progress report requires additional information and clarification. Please provide more details about the experimental design and preliminary results. The current milestones seem behind schedule, please address how you plan to catch up in the revised report."
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setSelectedReport(null)}
                                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProgresReports;
