import React, { useState, useEffect } from "react";
import {
    MdAssignment,
    MdCheckCircle,
    MdPending,
    MdWarning,
    MdSchedule,
    MdMoreVert,
    MdFilterList,
    MdSearch,
    MdRefresh
} from "react-icons/md";
import { useDispatch } from "react-redux";

const ReviewQueueStatus = () => {
    const dispatch = useDispatch();
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data for initial design
    const [reviewQueue, setReviewQueue] = useState([
        {
            id: "PR001",
            title: "Pengembangan Sistem IoT untuk Monitoring Kualitas Air",
            author: "Dr. Ahmad Fauzi",
            department: "Teknik Elektro",
            submittedDate: "2025-04-05T08:30:00Z",
            deadline: "2025-04-20T23:59:59Z",
            status: "pending",
            priority: "high",
            progress: 0
        },
        {
            id: "PR002",
            title: "Analisis Dampak Kecerdasan Buatan pada Sektor Pendidikan",
            author: "Prof. Dina Wijaya",
            department: "Ilmu Komputer",
            submittedDate: "2025-04-03T14:20:00Z",
            deadline: "2025-04-18T23:59:59Z",
            status: "in_progress",
            priority: "medium",
            progress: 45
        },
        {
            id: "PR003",
            title: "Implementasi Blockchain untuk Keamanan Data Akademik",
            author: "Dr. Budi Santoso",
            department: "Sistem Informasi",
            submittedDate: "2025-04-01T09:15:00Z",
            deadline: "2025-04-16T23:59:59Z",
            status: "completed",
            priority: "low",
            progress: 100
        },
        {
            id: "PR004",
            title: "Penggunaan Machine Learning dalam Prediksi Kelulusan Mahasiswa",
            author: "Dr. Citra Dewi",
            department: "Ilmu Komputer",
            submittedDate: "2025-04-02T11:45:00Z",
            deadline: "2025-04-17T23:59:59Z",
            status: "pending",
            priority: "high",
            progress: 0
        },
        {
            id: "PR005",
            title: "Studi Efektivitas Pembelajaran Daring di Era Post-Pandemi",
            author: "Prof. Eko Prasetyo",
            department: "Pendidikan",
            submittedDate: "2025-04-04T13:10:00Z",
            deadline: "2025-04-19T23:59:59Z",
            status: "in_progress",
            priority: "medium",
            progress: 65
        }
    ]);

    const handleFilterChange = (filter) => {
        setIsLoading(true);
        setActiveFilter(filter);
        // Simulate API call delay
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const getFilteredQueue = () => {
        let filtered = [...reviewQueue];

        // Apply status filter
        if (activeFilter !== "all") {
            filtered = filtered.filter(item => item.status === activeFilter);
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(
                item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <MdPending className="text-yellow-500" size={24} />;
            case "in_progress":
                return <MdSchedule className="text-blue-500" size={24} />;
            case "completed":
                return <MdCheckCircle className="text-green-500" size={24} />;
            default:
                return <MdAssignment className="text-gray-500" size={24} />;
        }
    };

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case "high":
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Tinggi</span>;
            case "medium":
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">Sedang</span>;
            case "low":
                return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Rendah</span>;
            default:
                return null;
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const getDaysRemaining = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredQueue = getFilteredQueue();

    // Stats calculation
    const stats = {
        total: reviewQueue.length,
        pending: reviewQueue.filter(item => item.status === "pending").length,
        inProgress: reviewQueue.filter(item => item.status === "in_progress").length,
        completed: reviewQueue.filter(item => item.status === "completed").length,
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg" data-aos="fade-up">
            <div className="p-5 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 md:mb-0">
                        Status Antrian Review
                    </h2>
                    <div className="flex items-center space-x-2">
                        <button
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            onClick={() => {
                                setIsLoading(true);
                                setTimeout(() => setIsLoading(false), 700);
                            }}
                        >
                            <MdRefresh size={20} className={`${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari proposal..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <MdSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        </div>
                        <div className="relative inline-block">
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                <MdFilterList size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-gray-50">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Total Proposal</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Menunggu Review</p>
                    <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Sedang Direview</p>
                    <p className="text-2xl font-bold text-blue-500">{stats.inProgress}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Selesai</p>
                    <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-5 py-3 border-b border-gray-200">
                <div className="flex overflow-x-auto pb-1 space-x-4">
                    <button
                        className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === "all" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                            }`}
                        onClick={() => handleFilterChange("all")}
                    >
                        Semua
                    </button>
                    <button
                        className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === "pending" ? "bg-yellow-100 text-yellow-700" : "text-gray-600 hover:bg-gray-100"
                            }`}
                        onClick={() => handleFilterChange("pending")}
                    >
                        Menunggu Review
                    </button>
                    <button
                        className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === "in_progress" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                            }`}
                        onClick={() => handleFilterChange("in_progress")}
                    >
                        Sedang Direview
                    </button>
                    <button
                        className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === "completed" ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"
                            }`}
                        onClick={() => handleFilterChange("completed")}
                    >
                        Selesai
                    </button>
                </div>
            </div>

            {/* Review Queue List */}
            <div className="divide-y divide-gray-200 max-h-[550px] overflow-y-auto">
                {isLoading ? (
                    <div className="p-10 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : filteredQueue.length === 0 ? (
                    <div className="p-10 text-center">
                        <MdAssignment className="mx-auto text-gray-300" size={48} />
                        <p className="mt-2 text-gray-500">Tidak ada proposal dalam antrian yang sesuai filter</p>
                    </div>
                ) : (
                    filteredQueue.map((item) => (
                        <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                            <div className="flex flex-col md:flex-row md:items-center">
                                <div className="md:flex-shrink-0 flex items-center mb-3 md:mb-0">
                                    {getStatusIcon(item.status)}
                                    <div className="ml-3">
                                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-md bg-gray-100 text-gray-800">
                                            {item.id}
                                        </span>
                                    </div>
                                </div>

                                <div className="md:ml-6 flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                        {item.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-y-1 gap-x-3 text-sm text-gray-500 mb-2">
                                        <span>{item.author}</span>
                                        <span>•</span>
                                        <span>{item.department}</span>
                                        <span>•</span>
                                        <span>Diterima: {formatDate(item.submittedDate)}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                        {getPriorityBadge(item.priority)}

                                        {item.status !== "completed" && (
                                            <span className={`text-xs font-medium ${getDaysRemaining(item.deadline) < 3 ? 'text-red-600' : 'text-gray-500'
                                                }`}>
                                                {getDaysRemaining(item.deadline)} hari tersisa
                                            </span>
                                        )}

                                        <div className="flex-grow"></div>

                                        {item.status === "in_progress" && (
                                            <div className="w-full md:w-48 mt-2 md:mt-0">
                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500 rounded-full"
                                                        style={{ width: `${item.progress}%` }}
                                                    ></div>
                                                </div>
                                                <div className="text-xs text-right mt-1 text-gray-500">{item.progress}% selesai</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="md:ml-4 flex md:flex-col justify-between items-end mt-3 md:mt-0">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                        {item.status === "completed" ? "Lihat Review" : "Review"}
                                    </button>
                                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full">
                                        <MdMoreVert size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 text-sm text-center text-gray-500">
                Menampilkan {filteredQueue.length} dari {reviewQueue.length} proposal
            </div>
        </div>
    );
};

export default ReviewQueueStatus;
