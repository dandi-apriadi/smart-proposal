import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    MdSearch,
    MdFilterList,
    MdOutlineSort,
    MdCheckCircle,
    MdPending,
    MdWarning,
    MdCalendarToday,
    MdAccessTime,
    MdPerson,
    MdCategory,
    MdMoreVert,
    MdArrowForward
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AssignedProposal = () => {
    const dispatch = useDispatch();
    // Sample dummy data for assigned proposals
    const [proposals, setProposals] = useState([
        {
            id: 1,
            title: "Pengembangan Aplikasi Mobile untuk Manajemen Perpustakaan",
            author: "Dr. Budi Santoso",
            department: "Teknik Informatika",
            category: "Penelitian Terapan",
            submissionDate: "2025-03-15",
            deadline: "2025-04-10",
            status: "pending",
            priority: "high",
            progress: 0
        },
        {
            id: 2,
            title: "Analisis Dampak Pembelajaran Daring Terhadap Kualitas Pendidikan",
            author: "Prof. Siti Aminah",
            department: "Pendidikan",
            category: "Penelitian Dasar",
            submissionDate: "2025-03-10",
            deadline: "2025-04-05",
            status: "in_progress",
            priority: "medium",
            progress: 40
        },
        {
            id: 3,
            title: "Implementasi IoT untuk Smart Campus di Politeknik Negeri Manado",
            author: "Dr. Joko Widodo",
            department: "Teknik Elektro",
            category: "Pengabdian Masyarakat",
            submissionDate: "2025-03-05",
            deadline: "2025-04-01",
            status: "completed",
            priority: "low",
            progress: 100
        },
        {
            id: 4,
            title: "Studi Komparatif Metode Pembelajaran Problem-Based Learning",
            author: "Dr. Maya Putri",
            department: "Pendidikan",
            category: "Penelitian Dasar",
            submissionDate: "2025-03-12",
            deadline: "2025-04-07",
            status: "pending",
            priority: "medium",
            progress: 0
        },
        {
            id: 5,
            title: "Pengembangan Sistem Energi Terbarukan untuk Laboratorium",
            author: "Prof. Hadi Sulistyo",
            department: "Teknik Mesin",
            category: "Penelitian Terapan",
            submissionDate: "2025-03-18",
            deadline: "2025-04-12",
            status: "in_progress",
            priority: "high",
            progress: 65
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [sortBy, setSortBy] = useState('deadline');
    const [sortOrder, setSortOrder] = useState('asc');
    const [stats, setStats] = useState({
        total: 5,
        pending: 2,
        inProgress: 2,
        completed: 1
    });

    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

    useEffect(() => {
        // Initialize AOS animation library
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }, []);

    // Function to handle filtering and sorting
    const getFilteredAndSortedProposals = () => {
        let result = [...proposals];

        // Apply search filter
        if (searchTerm) {
            result = result.filter(
                prop => prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    prop.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    prop.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply status filter
        if (filterStatus !== 'all') {
            result = result.filter(prop => prop.status === filterStatus);
        }

        // Apply priority filter
        if (filterPriority !== 'all') {
            result = result.filter(prop => prop.priority === filterPriority);
        }

        // Apply sorting
        result.sort((a, b) => {
            if (sortBy === 'deadline') {
                return sortOrder === 'asc'
                    ? new Date(a.deadline) - new Date(b.deadline)
                    : new Date(b.deadline) - new Date(a.deadline);
            } else if (sortBy === 'priority') {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return sortOrder === 'asc'
                    ? priorityOrder[a.priority] - priorityOrder[b.priority]
                    : priorityOrder[b.priority] - priorityOrder[a.priority];
            } else if (sortBy === 'title') {
                return sortOrder === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
            return 0;
        });

        return result;
    };

    const handleReviewProposal = (id) => {
        // Handle navigation to review page
        console.log(`Navigating to review proposal ${id}`);
        // In a real app, you would use router to navigate
        // history.push(`/reviewer/review/${id}`);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <MdPending className="text-yellow-500" size={20} />;
            case 'in_progress':
                return <MdWarning className="text-blue-500" size={20} />;
            case 'completed':
                return <MdCheckCircle className="text-green-500" size={20} />;
            default:
                return null;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return "Pending Review";
            case 'in_progress':
                return "In Progress";
            case 'completed':
                return "Completed";
            default:
                return "Unknown";
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high':
                return "bg-red-100 text-red-800";
            case 'medium':
                return "bg-orange-100 text-orange-800";
            case 'low':
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const calculateDaysLeft = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredProposals = getFilteredAndSortedProposals();

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div data-aos="fade-right">
                    <h1 className="text-2xl font-bold text-gray-800">Assigned Proposals</h1>
                    <p className="text-gray-600 mt-1">Review and manage your assigned proposals</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 md:mt-0" data-aos="fade-left">
                    <div className="bg-blue-50 text-blue-700 rounded-lg px-4 py-2 flex items-center">
                        <span className="font-semibold">{stats.total}</span>
                        <span className="ml-1">Total</span>
                    </div>
                    <div className="bg-yellow-50 text-yellow-700 rounded-lg px-4 py-2 flex items-center">
                        <span className="font-semibold">{stats.pending}</span>
                        <span className="ml-1">Pending</span>
                    </div>
                    <div className="bg-indigo-50 text-indigo-700 rounded-lg px-4 py-2 flex items-center">
                        <span className="font-semibold">{stats.inProgress}</span>
                        <span className="ml-1">In Progress</span>
                    </div>
                    <div className="bg-green-50 text-green-700 rounded-lg px-4 py-2 flex items-center">
                        <span className="font-semibold">{stats.completed}</span>
                        <span className="ml-1">Completed</span>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4" data-aos="fade-up">
                <div className="md:col-span-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search proposals by title, author, or category..."
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <MdSearch className="absolute left-3 top-3 text-gray-400" size={20} />
                    </div>
                </div>

                <div className="relative">
                    <button
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 flex items-center justify-between"
                        onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                    >
                        <span>Filter</span>
                        <MdFilterList size={20} />
                    </button>

                    {isFilterMenuOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                            <div className="p-3">
                                <p className="font-medium text-gray-700 mb-2">Status</p>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>

                                <p className="font-medium text-gray-700 mb-2 mt-3">Priority</p>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={filterPriority}
                                    onChange={(e) => setFilterPriority(e.target.value)}
                                >
                                    <option value="all">All Priorities</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 flex items-center justify-between"
                        onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                    >
                        <span>Sort</span>
                        <MdOutlineSort size={20} />
                    </button>

                    {isSortMenuOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                            <div className="p-3">
                                <p className="font-medium text-gray-700 mb-2">Sort By</p>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="deadline">Deadline</option>
                                    <option value="priority">Priority</option>
                                    <option value="title">Title</option>
                                </select>

                                <p className="font-medium text-gray-700 mb-2 mt-3">Order</p>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Proposals List Section */}
            <div className="grid grid-cols-1 gap-6">
                {filteredProposals.length > 0 ? (
                    filteredProposals.map((proposal, index) => (
                        <div
                            key={proposal.id}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="p-5">
                                <div className="flex flex-col md:flex-row justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            {getStatusIcon(proposal.status)}
                                            <span className="ml-2 text-sm font-medium text-gray-600">
                                                {getStatusText(proposal.status)}
                                            </span>
                                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(proposal.priority)}`}>
                                                {proposal.priority.charAt(0).toUpperCase() + proposal.priority.slice(1)} Priority
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{proposal.title}</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-3">
                                            <div className="flex items-center text-gray-600">
                                                <MdPerson className="text-gray-500 mr-2" />
                                                <span className="text-sm">{proposal.author}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <MdCategory className="text-gray-500 mr-2" />
                                                <span className="text-sm">{proposal.category}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <MdCalendarToday className="text-gray-500 mr-2" />
                                                <span className="text-sm">Submitted: {proposal.submissionDate}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <MdAccessTime className="text-gray-500 mr-2" />
                                                <span className={`text-sm ${calculateDaysLeft(proposal.deadline) < 3 ? 'text-red-600 font-medium' : ''}`}>
                                                    Deadline: {proposal.deadline} ({calculateDaysLeft(proposal.deadline)} days left)
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 md:mt-0 flex md:flex-col items-center justify-end gap-2">
                                        <button
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center"
                                            onClick={() => handleReviewProposal(proposal.id)}
                                        >
                                            Review <MdArrowForward className="ml-1" />
                                        </button>

                                        <div className="relative">
                                            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                                                <MdMoreVert size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                {proposal.status !== 'pending' && (
                                    <div className="mt-4">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs text-gray-600">Review Progress</span>
                                            <span className="text-xs font-medium text-gray-600">{proposal.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${proposal.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                                                style={{ width: `${proposal.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg" data-aos="fade-up">
                        <p className="text-gray-500">No proposals match your filters. Try adjusting your search criteria.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {filteredProposals.length > 0 && (
                <div className="mt-6 flex justify-center" data-aos="fade-up">
                    <nav className="flex items-center space-x-2">
                        <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="px-3 py-1 rounded bg-blue-600 text-white">1</button>
                        <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">2</button>
                        <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">3</button>
                        <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">
                            Next
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default AssignedProposal;
