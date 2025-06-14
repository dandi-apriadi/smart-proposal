import React, { useState, useEffect } from "react";
import {
    MdSearch,
    MdFilterList,
    MdDownload,
    MdDelete,
    MdEdit,
    MdCheckCircle,
    MdCancel,
    MdInsertChart,
    MdFileUpload,
    MdSort,
    MdOutlineDescription,
    MdRefresh,
    MdOutlineFilterAlt,
    MdOutlineAnalytics,
    MdNotificationsActive
} from "react-icons/md";
import { FiActivity, FiArrowUp, FiArrowDown } from "react-icons/fi";
import Card from "components/card";
import AOS from "aos";
import "aos/dist/aos.css";

const ProposalManagement = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
        });
    }, []);

    // States
    const [proposals, setProposals] = useState([]);
    const [filteredProposals, setFilteredProposals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

    // Stats
    const [stats, setStats] = useState({
        total: 0,
        approved: 0,
        rejected: 0,
        pending: 0,
        mlAccuracy: 0
    });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Fetch data
    useEffect(() => {
        const fetchProposals = async () => {
            try {
                // Mock data - replace with actual API call
                const mockData = [
                    {
                        id: "PRO-2025-001",
                        title: "Pengadaan Peralatan Laboratorium Komputer",
                        department: "Teknik Informatika",
                        submitter: "Dr. Ahmad Sudirman",
                        date: "2025-04-15",
                        status: "pending",
                        mlScore: 87.5,
                        budget: 250000000,
                        type: "Pengadaan",
                        priority: "high"
                    },
                    {
                        id: "PRO-2025-002",
                        title: "Seminar Teknologi AI untuk Mahasiswa",
                        department: "P3M",
                        submitter: "Dr. Nina Puspitasari",
                        date: "2025-04-13",
                        status: "approved",
                        mlScore: 92.3,
                        budget: 75000000,
                        type: "Kegiatan",
                        priority: "medium"
                    },
                    {
                        id: "PRO-2025-003",
                        title: "Workshop Data Science & Machine Learning",
                        department: "P3M",
                        submitter: "Dr. Budi Santoso",
                        date: "2025-04-10",
                        status: "rejected",
                        mlScore: 65.8,
                        budget: 120000000,
                        type: "Kegiatan",
                        priority: "medium"
                    },
                    {
                        id: "PRO-2025-004",
                        title: "Pengadaan Software Lisensi untuk Fakultas",
                        department: "BAUK",
                        submitter: "Ir. Rahman Hakim",
                        date: "2025-04-08",
                        status: "approved",
                        mlScore: 89.1,
                        budget: 350000000,
                        type: "Pengadaan",
                        priority: "high"
                    },
                    {
                        id: "PRO-2025-005",
                        title: "Pelatihan Dosen dalam Pengembangan Kurikulum",
                        department: "P3M",
                        submitter: "Dr. Laila Fitria",
                        date: "2025-04-05",
                        status: "pending",
                        mlScore: 83.7,
                        budget: 95000000,
                        type: "Kegiatan",
                        priority: "low"
                    },
                    {
                        id: "PRO-2025-006",
                        title: "Pembangunan Ruang Server Baru",
                        department: "BAUK",
                        submitter: "Ir. Darmawan Putra",
                        date: "2025-04-03",
                        status: "approved",
                        mlScore: 91.2,
                        budget: 500000000,
                        type: "Infrastruktur",
                        priority: "high"
                    },
                    {
                        id: "PRO-2025-007",
                        title: "Kunjungan Industri Mahasiswa Teknik",
                        department: "Teknik Elektro",
                        submitter: "Dr. Hendra Wijaya",
                        date: "2025-04-01",
                        status: "rejected",
                        mlScore: 71.4,
                        budget: 180000000,
                        type: "Kegiatan",
                        priority: "medium"
                    },
                    {
                        id: "PRO-2025-008",
                        title: "Pembaruan Sistem Penilaian Digital",
                        department: "BAAK",
                        submitter: "Dr. Siti Rahmawati",
                        date: "2025-04-02",
                        status: "pending",
                        mlScore: 88.2,
                        budget: 220000000,
                        type: "Infrastruktur",
                        priority: "high"
                    },
                    {
                        id: "PRO-2025-009",
                        title: "International Conference on Technology",
                        department: "Teknik Informatika",
                        submitter: "Prof. Dr. Joko Waluyo",
                        date: "2025-03-28",
                        status: "approved",
                        mlScore: 94.5,
                        budget: 450000000,
                        type: "Kegiatan",
                        priority: "high"
                    },
                    {
                        id: "PRO-2025-010",
                        title: "Modernisasi Laboratorium Fisika",
                        department: "Teknik Fisika",
                        submitter: "Dr. Yanto Kuswanto",
                        date: "2025-03-25",
                        status: "pending",
                        mlScore: 81.3,
                        budget: 375000000,
                        type: "Pengadaan",
                        priority: "medium"
                    }
                ];

                setProposals(mockData);
                setFilteredProposals(mockData);

                // Calculate stats
                const total = mockData.length;
                const approved = mockData.filter(p => p.status === "approved").length;
                const rejected = mockData.filter(p => p.status === "rejected").length;
                const pending = mockData.filter(p => p.status === "pending").length;

                // Average ML score for approved proposals
                const avgMlScore = mockData.filter(p => p.status === "approved")
                    .reduce((acc, curr) => acc + curr.mlScore, 0) / (approved || 1);

                setStats({
                    total,
                    approved,
                    rejected,
                    pending,
                    mlAccuracy: avgMlScore.toFixed(1)
                });

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching proposals:", error);
                setIsLoading(false);
            }
        };

        fetchProposals();
    }, []);

    // Apply filters
    useEffect(() => {
        let result = [...proposals];

        // Search filter
        if (searchTerm) {
            result = result.filter(
                item =>
                    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.submitter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.department.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== "all") {
            result = result.filter(item => item.status === statusFilter);
        }

        // Date range filter
        if (dateRange.start && dateRange.end) {
            result = result.filter(item => {
                const itemDate = new Date(item.date);
                const startDate = new Date(dateRange.start);
                const endDate = new Date(dateRange.end);
                return itemDate >= startDate && itemDate <= endDate;
            });
        }

        // Sorting
        result.sort((a, b) => {
            if (sortConfig.key === "date") {
                return sortConfig.direction === "asc"
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            }

            if (sortConfig.key === "mlScore") {
                return sortConfig.direction === "asc"
                    ? a.mlScore - b.mlScore
                    : b.mlScore - a.mlScore;
            }

            if (sortConfig.key === "budget") {
                return sortConfig.direction === "asc"
                    ? a.budget - b.budget
                    : b.budget - a.budget;
            }

            // Default sort by title
            return sortConfig.direction === "asc"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title);
        });

        setFilteredProposals(result);
    }, [proposals, searchTerm, statusFilter, dateRange, sortConfig]);

    // Get paginated data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProposals.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle sort
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Status styling
    const getStatusStyle = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // ML Score styling
    const getMlScoreStyle = (score) => {
        if (score >= 85) return 'text-green-500';
        if (score >= 75) return 'text-blue-500';
        if (score >= 65) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="min-h-screen pt-4 pb-8 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-navy-900 dark:to-navy-800">
            {/* Modern Header with Visual Elements */}
            <div className="relative mb-8 overflow-hidden" data-aos="fade-down">
                {/* Abstract background elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute top-10 right-20 w-20 h-20 bg-purple-500/10 rounded-full blur-lg"></div>
                <div className="absolute -bottom-8 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>

                <div className="relative z-10">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 inline-block mb-3">
                        Proposal Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                        Kelola seluruh proposal pengadaan dan kegiatan di Politeknik Negeri Manado dengan validasi Machine Learning untuk meningkatkan efisiensi dan akurasi pengambilan keputusan.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex space-x-2">
                            <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>
                                Last update: Today, 08:45
                            </span>
                            <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300">
                                <MdNotificationsActive className="mr-1" />
                                3 new proposals today
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-all" title="Refresh data">
                                <MdRefresh className="w-5 h-5" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-all" title="View Analytics">
                                <MdOutlineAnalytics className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6" data-aos="fade-up">
                {[
                    {
                        title: "Total Proposals",
                        value: stats.total,
                        icon: <MdOutlineDescription className="h-6 w-6" />,
                        color: "indigo",
                        trend: "+5% from last month"
                    },
                    {
                        title: "Approved",
                        value: stats.approved,
                        icon: <MdCheckCircle className="h-6 w-6" />,
                        color: "green",
                        trend: "+12% from last month"
                    },
                    {
                        title: "Rejected",
                        value: stats.rejected,
                        icon: <MdCancel className="h-6 w-6" />,
                        color: "red",
                        trend: "-3% from last month"
                    },
                    {
                        title: "Pending",
                        value: stats.pending,
                        icon: <MdFilterList className="h-6 w-6" />,
                        color: "amber",
                        trend: "+2 new today"
                    },
                    {
                        title: "ML Accuracy",
                        value: `${stats.mlAccuracy}%`,
                        icon: <MdInsertChart className="h-6 w-6" />,
                        color: "blue",
                        trend: "+1.5% improvement"
                    }
                ].map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-navy-800 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 overflow-hidden group"
                    >
                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">{stat.trend}</p>
                                </div>
                                <div
                                    className={`bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400 rounded-xl p-3 group-hover:scale-110 transition-transform`}
                                >
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="w-full h-1 bg-gray-100 dark:bg-navy-700 rounded-full mt-4 overflow-hidden">
                                <div className={`h-full bg-${stat.color}-500 rounded-full`} style={{ width: `${(index + 1) * 20}%` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* Search and Filter Controls - Glassmorphic design */}
            <div
                className="backdrop-blur-md bg-white/70 dark:bg-navy-800/70 rounded-2xl shadow-lg mb-6 border border-gray-100 dark:border-navy-700"
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-5 mb-5">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search proposals by title, ID, submitter..."
                                className="pl-12 pr-4 py-3.5 w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white/50 dark:bg-navy-700/50 dark:border-navy-600"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute left-4 top-3.5">
                                <MdSearch className="h-6 w-6 text-gray-400" />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 lg:w-auto">
                            <select
                                className="rounded-lg border border-gray-200 py-3 pl-4 pr-10 bg-white/50 dark:bg-navy-700/50 dark:border-navy-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-300"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>

                            <div className="relative">
                                <input
                                    type="date"
                                    placeholder="From"
                                    className="rounded-lg border border-gray-200 py-3 px-4 bg-white/50 dark:bg-navy-700/50 dark:border-navy-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={dateRange.start}
                                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                />
                            </div>

                            <div className="relative">
                                <input
                                    type="date"
                                    placeholder="To"
                                    className="rounded-lg border border-gray-200 py-3 px-4 bg-white/50 dark:bg-navy-700/50 dark:border-navy-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={dateRange.end}
                                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <button
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 px-4 rounded-xl flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow font-medium"
                        >
                            <MdOutlineFilterAlt className="h-5 w-5" />
                            <span>Advanced Filter</span>
                        </button>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center bg-white dark:bg-navy-800 rounded-lg border border-gray-200 dark:border-navy-700 px-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400 px-2">Show</p>
                                <select
                                    className="py-2 px-2 bg-transparent focus:outline-none text-sm focus:ring-0 border-none dark:text-white"
                                    value={itemsPerPage}
                                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                </select>
                                <p className="text-sm text-gray-600 dark:text-gray-400 px-2">entries</p>
                            </div>

                            <button
                                className="bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all shadow-sm hover:shadow font-medium"
                            >
                                <MdDownload className="h-5 w-5" />
                                <span>Export Data</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Proposals Table - Modern design */}
            <div
                className="bg-white dark:bg-navy-800 rounded-2xl shadow-lg border border-gray-100 dark:border-navy-700 overflow-hidden"
                data-aos="fade-up"
                data-aos-delay="200"
            >
                {isLoading ? (
                    <div className="flex flex-col justify-center items-center py-16">
                        <div className="relative w-20 h-20">
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-100 dark:border-blue-900/30 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading proposals...</p>
                    </div>
                ) : filteredProposals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-navy-700 rounded-full flex items-center justify-center mb-4">
                            <MdOutlineDescription className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No proposals found</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                            We couldn't find any proposals matching your criteria. Try adjusting your filters or create a new proposal.
                        </p>
                        <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-6 rounded-xl transition-colors shadow-sm">
                            Create New Proposal
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-navy-500 dark:scrollbar-track-navy-700">
                        <table className="w-full min-w-[1000px]">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-navy-700">
                                    <th
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                        onClick={() => requestSort('id')}
                                    >
                                        <div className="flex items-center">
                                            ID
                                            {sortConfig.key === 'id' ? (
                                                sortConfig.direction === 'asc' ?
                                                    <FiArrowUp className="ml-1 text-blue-500" /> :
                                                    <FiArrowDown className="ml-1 text-blue-500" />
                                            ) : <MdSort className="ml-1" />}
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                        onClick={() => requestSort('title')}
                                    >
                                        <div className="flex items-center">
                                            Title
                                            {sortConfig.key === 'title' ? (
                                                sortConfig.direction === 'asc' ?
                                                    <FiArrowUp className="ml-1 text-blue-500" /> :
                                                    <FiArrowDown className="ml-1 text-blue-500" />
                                            ) : <MdSort className="ml-1" />}
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                        onClick={() => requestSort('department')}
                                    >
                                        <div className="flex items-center">
                                            Department
                                            {sortConfig.key === 'department' ? (
                                                sortConfig.direction === 'asc' ?
                                                    <FiArrowUp className="ml-1 text-blue-500" /> :
                                                    <FiArrowDown className="ml-1 text-blue-500" />
                                            ) : <MdSort className="ml-1" />}
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                        onClick={() => requestSort('date')}
                                    >
                                        <div className="flex items-center">
                                            Date
                                            {sortConfig.key === 'date' ? (
                                                sortConfig.direction === 'asc' ?
                                                    <FiArrowUp className="ml-1 text-blue-500" /> :
                                                    <FiArrowDown className="ml-1 text-blue-500" />
                                            ) : <MdSort className="ml-1" />}
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                        onClick={() => requestSort('status')}
                                    >
                                        <div className="flex items-center">
                                            Status
                                            {sortConfig.key === 'status' ? (
                                                sortConfig.direction === 'asc' ?
                                                    <FiArrowUp className="ml-1 text-blue-500" /> :
                                                    <FiArrowDown className="ml-1 text-blue-500" />
                                            ) : <MdSort className="ml-1" />}
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                        onClick={() => requestSort('mlScore')}
                                    >
                                        <div className="flex items-center">
                                            ML Score
                                            {sortConfig.key === 'mlScore' ? (
                                                sortConfig.direction === 'asc' ?
                                                    <FiArrowUp className="ml-1 text-blue-500" /> :
                                                    <FiArrowDown className="ml-1 text-blue-500" />
                                            ) : <MdSort className="ml-1" />}
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-navy-700">
                                {currentItems.map((proposal, index) => (
                                    <tr
                                        key={proposal.id}
                                        className={`hover:bg-blue-50/50 dark:hover:bg-navy-700/50 group transition-colors ${index % 2 === 0 ? 'bg-gray-50/50 dark:bg-navy-800/50' : ''}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
                                            <span className="font-mono">{proposal.id}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-white max-w-[300px]">
                                            <div className="flex items-center">
                                                <div className={`w-1.5 h-8 rounded-l-full mr-3 ${proposal.priority === 'high'
                                                    ? 'bg-red-400'
                                                    : proposal.priority === 'medium'
                                                        ? 'bg-yellow-400'
                                                        : 'bg-blue-400'
                                                    }`}></div>
                                                <div>
                                                    <div className="font-medium truncate max-w-[250px] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {proposal.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                        By {proposal.submitter}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            <span className="bg-gray-100 dark:bg-navy-700 px-2.5 py-1 rounded-full">
                                                {proposal.department}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex items-center">
                                                <FiActivity className="mr-1.5 text-gray-400" />
                                                {new Date(proposal.date).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 
                                                ${proposal.status === 'approved'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 border border-green-200 dark:border-green-900/70'
                                                    : proposal.status === 'rejected'
                                                        ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400 border border-red-200 dark:border-red-900/70'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/70'
                                                }`}
                                            >
                                                {proposal.status === 'approved' ? <MdCheckCircle /> :
                                                    proposal.status === 'rejected' ? <MdCancel /> :
                                                        <MdFilterList />}
                                                {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className={`text-sm font-bold ${getMlScoreStyle(proposal.mlScore)}`}>
                                                    {proposal.mlScore}%
                                                </span>
                                                <div className="ml-2 w-20 bg-gray-200 rounded-full h-1.5 dark:bg-navy-700">
                                                    <div
                                                        className={`h-1.5 rounded-full ${proposal.mlScore >= 85 ? 'bg-green-500' :
                                                            proposal.mlScore >= 75 ? 'bg-blue-500' :
                                                                proposal.mlScore >= 65 ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}
                                                        style={{ width: `${proposal.mlScore}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <div className="flex justify-end gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="p-1.5 rounded-lg text-gray-600 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                                                    title="View Details"
                                                >
                                                    <MdSearch className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="p-1.5 rounded-lg text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30 transition-colors"
                                                    title="Edit Proposal"
                                                >
                                                    <MdEdit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className={`p-1.5 rounded-lg transition-colors ${proposal.status === 'pending'
                                                        ? 'text-gray-600 hover:text-green-700 hover:bg-green-100 dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-green-900/30'
                                                        : 'text-gray-400 dark:text-gray-600'
                                                        }`}
                                                    disabled={proposal.status !== 'pending'}
                                                    title={proposal.status === 'pending' ? "Approve Proposal" : "Already Processed"}
                                                >
                                                    <MdCheckCircle className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="p-1.5 rounded-lg text-gray-600 hover:text-red-700 hover:bg-red-100 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                                                    title="Delete Proposal"
                                                >
                                                    <MdDelete className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Modern Pagination */}
                {filteredProposals.length > 0 && (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-5 border-t border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800">
                        <div className="md:mb-0 mb-4 text-sm text-gray-700 dark:text-gray-300">
                            Showing <span className="font-medium text-blue-600 dark:text-blue-400">{indexOfFirstItem + 1}</span> to{" "}
                            <span className="font-medium text-blue-600 dark:text-blue-400">
                                {indexOfLastItem > filteredProposals.length
                                    ? filteredProposals.length
                                    : indexOfLastItem}
                            </span>{" "}
                            of <span className="font-medium text-blue-600 dark:text-blue-400">{filteredProposals.length}</span> proposals
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                                disabled={currentPage === 1}
                                className={`rounded-lg flex items-center px-3 py-2 text-sm font-medium transition-colors border ${currentPage === 1
                                    ? "bg-gray-100 text-gray-400 border-gray-200 dark:bg-navy-700 dark:text-gray-600 dark:border-navy-600"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700 dark:border-navy-600"
                                    }`}
                            >
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </button>

                            <div className="hidden sm:flex rounded-lg shadow-sm">
                                {Array.from({ length: Math.min(5, Math.ceil(filteredProposals.length / itemsPerPage)) }).map((_, index) => {
                                    // Show first 5 pages or adjust based on current page
                                    let pageNumber = index + 1;
                                    if (currentPage > 3 && Math.ceil(filteredProposals.length / itemsPerPage) > 5) {
                                        pageNumber = currentPage - 2 + index;
                                        if (pageNumber > Math.ceil(filteredProposals.length / itemsPerPage)) {
                                            return null;
                                        }
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => paginate(pageNumber)}
                                            className={`min-w-[40px] px-3 py-2 text-sm font-medium transition-colors border-y border-r first:border-l first:rounded-l-lg last:rounded-r-lg ${currentPage === pageNumber
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700 dark:border-navy-600"
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() =>
                                    paginate(
                                        currentPage < Math.ceil(filteredProposals.length / itemsPerPage)
                                            ? currentPage + 1
                                            : Math.ceil(filteredProposals.length / itemsPerPage)
                                    )
                                }
                                disabled={currentPage === Math.ceil(filteredProposals.length / itemsPerPage)}
                                className={`rounded-lg flex items-center px-3 py-2 text-sm font-medium transition-colors border ${currentPage === Math.ceil(filteredProposals.length / itemsPerPage)
                                    ? "bg-gray-100 text-gray-400 border-gray-200 dark:bg-navy-700 dark:text-gray-600 dark:border-navy-600"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700 dark:border-navy-600"
                                    }`}
                            >
                                Next
                                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProposalManagement;
