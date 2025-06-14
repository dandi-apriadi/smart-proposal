import React, { useState, useEffect } from "react";
import {
    MdOutlineAnalytics,
    MdOutlineLibraryBooks,
    MdOutlineDescription,
    MdOutlineQueue,
    MdOutlineArchive,
    MdAdd,
    MdOutlineSearch,
    MdOutlineFilterList,
    MdOutlineMoreVert,
    MdOutlineDownload,
    MdOutlineSort,
    MdOutlineCheck,
    MdOutlineClose,
    MdOutlinePending,
    MdOutlineWarning
} from "react-icons/md";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ProposalManagement = () => {
    const [activeTab, setActiveTab] = useState("analytics");
    const [proposals, setProposals] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(true);

    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });

        // Simulate data loading
        setTimeout(() => {
            setProposals(dummyProposals);
            setTemplates(dummyTemplates);
            setIsLoading(false);
        }, 1000);
    }, []);

    // Analytics data
    const proposalStatusData = {
        labels: ['Approved', 'Pending', 'Rejected', 'Revisions'],
        datasets: [
            {
                label: 'Proposals by Status',
                data: [35, 12, 8, 15],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.6)',
                    'rgba(59, 130, 246, 0.6)',
                    'rgba(239, 68, 68, 0.6)',
                    'rgba(234, 179, 8, 0.6)',
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(234, 179, 8, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const monthlySubmissionData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Submissions',
                data: [12, 19, 15, 8, 22, 14, 16, 9, 28, 16, 24, 18],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    const departmentData = {
        labels: ['Computer Science', 'Electrical Eng.', 'Civil Eng.', 'Accounting', 'Tourism'],
        datasets: [
            {
                label: 'Proposals by Department',
                data: [25, 18, 15, 12, 10],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.6)',
                    'rgba(59, 130, 246, 0.6)',
                    'rgba(239, 68, 68, 0.6)',
                    'rgba(234, 179, 8, 0.6)',
                    'rgba(168, 85, 247, 0.6)',
                ],
            },
        ],
    };

    // Dummy data
    const dummyProposals = [
        {
            id: 1,
            title: "AI Implementation in Campus Services",
            author: "Dr. John Smith",
            department: "Computer Science",
            submissionDate: "2025-04-05",
            status: "approved",
            score: 92,
        },
        {
            id: 2,
            title: "Renewable Energy Solutions for Campus",
            author: "Dr. Emily Johnson",
            department: "Electrical Engineering",
            submissionDate: "2025-04-08",
            status: "pending",
            score: null,
        },
        {
            id: 3,
            title: "Campus Infrastructure Improvement",
            author: "Prof. Michael Brown",
            department: "Civil Engineering",
            submissionDate: "2025-04-10",
            status: "rejected",
            score: 45,
        },
        {
            id: 4,
            title: "Student Financial Management System",
            author: "Dr. Sarah Williams",
            department: "Accounting",
            submissionDate: "2025-04-12",
            status: "revision",
            score: 68,
        },
        {
            id: 5,
            title: "Advanced Database Management Techniques",
            author: "Dr. Robert Chen",
            department: "Computer Science",
            submissionDate: "2025-04-15",
            status: "approved",
            score: 88,
        },
        {
            id: 6,
            title: "IoT Integration for Smart Classrooms",
            author: "Prof. Lisa Martinez",
            department: "Electrical Engineering",
            submissionDate: "2025-04-18",
            status: "pending",
            score: null,
        },
    ];

    const dummyTemplates = [
        {
            id: 1,
            name: "Research Project Proposal",
            description: "Standard template for research-based projects",
            lastUpdated: "2025-03-15",
            usageCount: 48,
        },
        {
            id: 2,
            name: "Equipment Acquisition Proposal",
            description: "For purchasing new laboratory equipment",
            lastUpdated: "2025-03-20",
            usageCount: 32,
        },
        {
            id: 3,
            name: "Workshop/Event Proposal",
            description: "Template for planning campus events or workshops",
            lastUpdated: "2025-03-22",
            usageCount: 27,
        },
        {
            id: 4,
            name: "Community Outreach Proposal",
            description: "For projects engaging with local communities",
            lastUpdated: "2025-03-25",
            usageCount: 19,
        },
    ];

    // Filtered proposals based on search and filter
    const filteredProposals = proposals.filter(proposal => {
        const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            proposal.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            proposal.department.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filterStatus === "all" || proposal.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    // Status badge component
    const StatusBadge = ({ status }) => {
        const statusStyles = {
            approved: "bg-green-100 text-green-800 border-green-200",
            pending: "bg-blue-100 text-blue-800 border-blue-200",
            rejected: "bg-red-100 text-red-800 border-red-200",
            revision: "bg-yellow-100 text-yellow-800 border-yellow-200",
        };

        const statusIcons = {
            approved: <MdOutlineCheck className="h-4 w-4" />,
            pending: <MdOutlinePending className="h-4 w-4" />,
            rejected: <MdOutlineClose className="h-4 w-4" />,
            revision: <MdOutlineWarning className="h-4 w-4" />,
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
                <span className="mr-1">{statusIcons[status]}</span>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    // Render loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-lg font-medium text-gray-700">Loading dashboard...</span>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6" data-aos="fade-down">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Proposal Management</h1>
                    <p className="text-gray-600 mt-1">Manage and track all proposal submissions across the system</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                        <MdOutlineDownload className="mr-2" />
                        Export
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                        <MdAdd className="mr-2" />
                        New Template
                    </button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6 border-b border-gray-200" data-aos="fade-right">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab("analytics")}
                        className={`py-4 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === "analytics"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        <MdOutlineAnalytics className="mr-2 h-5 w-5" />
                        Analytics
                    </button>

                    <button
                        onClick={() => setActiveTab("submissions")}
                        className={`py-4 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === "submissions"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        <MdOutlineDescription className="mr-2 h-5 w-5" />
                        Submission Overview
                    </button>

                    <button
                        onClick={() => setActiveTab("templates")}
                        className={`py-4 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === "templates"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        <MdOutlineLibraryBooks className="mr-2 h-5 w-5" />
                        Template Library
                    </button>

                    <button
                        onClick={() => setActiveTab("queue")}
                        className={`py-4 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === "queue"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        <MdOutlineQueue className="mr-2 h-5 w-5" />
                        Review Queue
                    </button>

                    <button
                        onClick={() => setActiveTab("archived")}
                        className={`py-4 px-1 flex items-center text-sm font-medium border-b-2 ${activeTab === "archived"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        <MdOutlineArchive className="mr-2 h-5 w-5" />
                        Archived
                    </button>
                </nav>
            </div>

            {/* Analytics Tab Content */}
            {activeTab === "analytics" && (
                <div className="space-y-6" data-aos="fade-up">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                    <MdOutlineDescription className="h-6 w-6" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-gray-500">Total Proposals</h3>
                                    <p className="text-2xl font-bold text-gray-800">70</p>
                                    <p className="text-sm text-green-600 mt-1">+12% from last session</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-green-100 text-green-600">
                                    <MdOutlineCheck className="h-6 w-6" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-gray-500">Approved</h3>
                                    <p className="text-2xl font-bold text-gray-800">35</p>
                                    <p className="text-sm text-green-600 mt-1">50% approval rate</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                                    <MdOutlinePending className="h-6 w-6" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
                                    <p className="text-2xl font-bold text-gray-800">12</p>
                                    <p className="text-sm text-yellow-600 mt-1">Avg. 3 days in queue</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-red-100 text-red-600">
                                    <MdOutlineClose className="h-6 w-6" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
                                    <p className="text-2xl font-bold text-gray-800">23</p>
                                    <p className="text-sm text-gray-600 mt-1">Most due to formatting</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Proposal Status Distribution</h3>
                            <div className="h-64">
                                <Pie data={proposalStatusData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Submission Trends</h3>
                            <div className="h-64">
                                <Line data={monthlySubmissionData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Submissions by Department</h3>
                            <div className="h-64">
                                <Bar data={departmentData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Stats</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Average Review Time</h4>
                                    <p className="text-xl font-bold text-gray-800">3.5 days</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Average Proposal Score</h4>
                                    <p className="text-xl font-bold text-gray-800">76/100</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Most Common Rejection Reason</h4>
                                    <p className="text-lg font-medium text-gray-800">Formatting Issues</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Most Active Department</h4>
                                    <p className="text-lg font-medium text-gray-800">Computer Science</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Submission Overview Tab Content */}
            {activeTab === "submissions" && (
                <div className="space-y-6" data-aos="fade-up">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                        <div className="p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-800">Recent Submissions</h3>
                                <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search proposals..."
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <MdOutlineSearch className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                                    </div>
                                    <select
                                        className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="approved">Approved</option>
                                        <option value="pending">Pending</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="revision">Needs Revision</option>
                                    </select>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Author
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Department
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Submission Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Score
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredProposals.map((proposal) => (
                                            <tr key={proposal.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{proposal.title}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{proposal.author}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{proposal.department}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{proposal.submissionDate}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge status={proposal.status} />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {proposal.score !== null ? `${proposal.score}/100` : "-"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                                    <button className="text-gray-600 hover:text-gray-900">
                                                        <MdOutlineMoreVert />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {filteredProposals.length === 0 && (
                                <div className="py-8 text-center">
                                    <p className="text-gray-500">No proposals match your search criteria.</p>
                                </div>
                            )}

                            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Previous</button>
                                    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Next</button>
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProposals.length}</span> of <span className="font-medium">{filteredProposals.length}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">Previous</span>
                                                &lsaquo;
                                            </button>
                                            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">1</button>
                                            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">Next</span>
                                                &rsaquo;
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Template Library Tab Content */}
            {activeTab === "templates" && (
                <div className="space-y-6" data-aos="fade-up">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-800 mb-3 md:mb-0">Available Templates</h3>
                        <div className="flex space-x-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search templates..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                                />
                                <MdOutlineSearch className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                                <MdAdd className="mr-2" />
                                Add New
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {templates.map((template) => (
                            <div key={template.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-5">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-lg font-medium text-gray-800">{template.name}</h4>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MdOutlineMoreVert />
                                        </button>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600">{template.description}</p>
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                        <div className="text-xs text-gray-500">
                                            Last updated: {template.lastUpdated}
                                        </div>
                                        <div className="text-xs font-medium text-blue-600">
                                            {template.usageCount} uses
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-2">
                                    <button className="text-xs text-gray-700 hover:text-gray-900">Preview</button>
                                    <button className="text-xs text-blue-600 hover:text-blue-800">Edit</button>
                                    <button className="text-xs text-blue-600 hover:text-blue-800">Use</button>
                                </div>
                            </div>
                        ))}

                        {/* Add New Template Card */}
                        <div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center h-60 hover:bg-gray-100 transition-colors cursor-pointer">
                            <div className="text-center p-5">
                                <div className="rounded-full bg-gray-200 h-12 w-12 flex items-center justify-center mx-auto mb-3">
                                    <MdAdd className="h-6 w-6 text-gray-500" />
                                </div>
                                <p className="text-gray-600 font-medium">Create New Template</p>
                                <p className="text-xs text-gray-500 mt-1">Upload or build from scratch</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Review Queue Tab Content */}
            {activeTab === "queue" && (
                <div className="space-y-6" data-aos="fade-up">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                        <div className="p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-800">Proposal Review Queue</h3>
                                <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search queue..."
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                                        />
                                        <MdOutlineSearch className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                                    </div>
                                    <select
                                        className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option>Priority: All</option>
                                        <option>Priority: High</option>
                                        <option>Priority: Medium</option>
                                        <option>Priority: Low</option>
                                    </select>
                                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                        <MdOutlineFilterList className="h-5 w-5 text-gray-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Review Tasks */}
                            <div className="space-y-4">
                                {proposals.filter(p => p.status === "pending").map((proposal) => (
                                    <div key={proposal.id} className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                                        <div className="flex-1">
                                            <h4 className="text-md font-medium text-gray-800">{proposal.title}</h4>
                                            <div className="mt-1 flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm">
                                                <span className="text-gray-600">{proposal.author}</span>
                                                <span className="text-gray-600">{proposal.department}</span>
                                                <span className="text-gray-500">Submitted: {proposal.submissionDate}</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                                            <div className="flex items-center text-yellow-600 bg-yellow-100 px-2 py-1 rounded text-xs">
                                                <MdOutlinePending className="h-4 w-4 mr-1" />
                                                Awaiting Review
                                            </div>
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                                                Review Now
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {proposals.filter(p => p.status === "pending").length === 0 && (
                                    <div className="bg-green-50 rounded-lg p-6 text-center">
                                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                            <MdOutlineCheck className="h-6 w-6 text-green-600" />
                                        </div>
                                        <h3 className="mt-3 text-lg font-medium text-green-800">All caught up!</h3>
                                        <p className="mt-2 text-sm text-green-700">There are no pending proposals in the review queue.</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 border-t border-gray-200 pt-4 flex justify-between items-center">
                                <p className="text-sm text-gray-600">Showing {proposals.filter(p => p.status === "pending").length} pending items</p>
                                <div className="text-sm font-medium text-blue-600">
                                    View all assigned proposals
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Reviewer Workload</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="text-sm font-medium text-gray-800">Dr. Robert Chen</div>
                                        <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Light</div>
                                    </div>
                                    <div className="mt-2 flex justify-between items-center">
                                        <div className="text-2xl font-bold text-gray-900">2</div>
                                        <div className="text-xs text-gray-500">pending reviews</div>
                                    </div>
                                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="text-sm font-medium text-gray-800">Prof. Lisa Martinez</div>
                                        <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Medium</div>
                                    </div>
                                    <div className="mt-2 flex justify-between items-center">
                                        <div className="text-2xl font-bold text-gray-900">5</div>
                                        <div className="text-xs text-gray-500">pending reviews</div>
                                    </div>
                                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="text-sm font-medium text-gray-800">Dr. Emily Johnson</div>
                                        <div className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Heavy</div>
                                    </div>
                                    <div className="mt-2 flex justify-between items-center">
                                        <div className="text-2xl font-bold text-gray-900">8</div>
                                        <div className="text-xs text-gray-500">pending reviews</div>
                                    </div>
                                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Archived Proposals Tab Content */}
            {activeTab === "archived" && (
                <div className="space-y-6" data-aos="fade-up">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                        <div className="p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-800">Archived Proposals</h3>
                                <div className="mt-3 sm:mt-0 flex flex-wrap items-center gap-3">
                                    <div className="relative flex-grow max-w-xs">
                                        <input
                                            type="text"
                                            placeholder="Search archives..."
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                                        />
                                        <MdOutlineSearch className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                                    </div>
                                    <select className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option>All Sessions</option>
                                        <option>Session 2025-1</option>
                                        <option>Session 2024-2</option>
                                        <option>Session 2024-1</option>
                                    </select>
                                    <select className="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option>All Statuses</option>
                                        <option>Approved</option>
                                        <option>Rejected</option>
                                    </select>
                                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                        <MdOutlineFilterList className="h-5 w-5 text-gray-500" />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Author
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Department
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Session
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Score
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {proposals.filter(p => p.status === "approved" || p.status === "rejected").map((proposal) => (
                                            <tr key={proposal.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{proposal.title}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{proposal.author}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{proposal.department}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">Session 2025-1</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge status={proposal.status} />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {proposal.score !== null ? `${proposal.score}/100` : "-"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                                    <button className="text-gray-600 hover:text-gray-900">
                                                        <MdOutlineMoreVert />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Previous</button>
                                    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Next</button>
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">1</span> to <span className="font-medium">{proposals.filter(p => p.status === "approved" || p.status === "rejected").length}</span> of <span className="font-medium">{proposals.filter(p => p.status === "approved" || p.status === "rejected").length}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">Previous</span>
                                                &lsaquo;
                                            </button>
                                            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">1</button>
                                            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">Next</span>
                                                &rsaquo;
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProposalManagement;
