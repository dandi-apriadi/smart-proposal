import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdArrowBack,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdTimeline,
    MdPerson,
    MdCalendarToday,
    MdOutlinePictureAsPdf,
    MdFileDownload,
    MdReportProblem,
    MdHistory,
    MdVerifiedUser,
    MdOutlineVerifiedUser,
    MdAttachMoney,
    MdWarning,
    MdOutlineFilterAlt,
    MdList,
    MdDone,
    MdDateRange,
    MdVisibility,
    MdKeyboardArrowRight,
    MdOutlineCalendarMonth,
    MdEventAvailable,
    MdCheckCircleOutline,
    MdAccessTime,
    MdCategory,
    MdMonetizationOn,
    MdArrowDownward,
    MdArrowUpward,
    MdSort,
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const TgrHistory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterYear, setFilterYear] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [viewMode, setViewMode] = useState("list");
    const [isLoading, setIsLoading] = useState(false);
    const [sortField, setSortField] = useState("resolutionDate");
    const [sortDirection, setSortDirection] = useState("desc");

    // Dummy data for TGR history
    const historyStats = {
        totalCases: 25,
        resolvedCases: 18,
        currentYear: 10,
        avgResolutionDays: 15,
    };

    const tgrHistoryData = [
        {
            id: "TGR-2025-001",
            proposalId: "PRP-2025-001",
            title: "Analisis Kelayakan Usaha Mikro",
            researcher: "Dr. John Doe",
            faculty: "Fakultas Ekonomi",
            amount: 50000000,
            issueDate: "10 Jan 2025",
            resolutionDate: "15 Jan 2025",
            status: "Terselesaikan",
            resolutionDays: 5,
            category: "Dana Tidak Terpakai",
            resolution:
                "Dana sebesar Rp 5.000.000 telah dikembalikan sepenuhnya ke kas universitas",
        },
        {
            id: "TGR-2025-002",
            proposalId: "PRP-2025-002",
            title: "Pengembangan Aplikasi Mobile untuk Edukasi Keuangan",
            researcher: "Dr. Jane Smith",
            faculty: "Fakultas Teknologi Informasi",
            amount: 75000000,
            issueDate: "12 Jan 2025",
            resolutionDate: "20 Jan 2025",
            status: "Terselesaikan",
            resolutionDays: 8,
            category: "Bukti Tidak Valid",
            resolution:
                "Peneliti telah menyediakan bukti pengeluaran yang valid dan sesuai",
        },
        {
            id: "TGR-2025-003",
            proposalId: "PRP-2025-003",
            title: "Studi Banding Sistem Perpajakan di ASEAN",
            researcher: "Dr. Ahmad Fauzi",
            faculty: "Fakultas Hukum",
            amount: 60000000,
            issueDate: "15 Jan 2025",
            resolutionDate: "25 Jan 2025",
            status: "Terselesaikan",
            resolutionDays: 10,
            category: "Dana Tidak Terpakai",
            resolution:
                "Dana sebesar Rp 6.000.000 telah dikembalikan sepenuhnya ke kas universitas",
        },
        {
            id: "TGR-2025-004",
            proposalId: "PRP-2025-004",
            title: "Penerapan Teknologi Blockchain untuk Transparansi Anggaran",
            researcher: "Dr. Lisa Wong",
            faculty: "Fakultas Ekonomi",
            amount: 90000000,
            issueDate: "20 Jan 2025",
            resolutionDate: "28 Jan 2025",
            status: "Terselesaikan",
            resolutionDays: 8,
            category: "Bukti Tidak Valid",
            resolution:
                "Peneliti telah menyediakan bukti pengeluaran yang valid dan sesuai",
        },
        {
            id: "TGR-2025-005",
            proposalId: "PRP-2025-005",
            title: "Optimalisasi Penerimaan Pajak Daerah",
            researcher: "Dr. Kevin Tan",
            faculty: "Fakultas Ekonomi",
            amount: 55000000,
            issueDate: "25 Jan 2025",
            resolutionDate: "05 Feb 2025",
            status: "Terselesaikan",
            resolutionDays: 11,
            category: "Dana Tidak Terpakai",
            resolution:
                "Dana sebesar Rp 18.000.000 telah dikembalikan sepenuhnya ke kas universitas",
        },
        {
            id: "TGR-2024-012",
            proposalId: "PRP-2022-025",
            title: "Pemanfaatan Kecerdasan Buatan untuk Sistem Deteksi Dini Penyakit",
            researcher: "Dr. Anton Wijaya",
            faculty: "Fakultas Kedokteran",
            amount: 55000000,
            issueDate: "18 Sep 2024",
            resolutionDate: "10 Oct 2024",
            status: "Terselesaikan",
            resolutionDays: 22,
            category: "Bukti Tidak Valid",
            resolution:
                "Peneliti telah menyediakan bukti pengeluaran yang valid dan sesuai",
        },
    ];

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
        });
    }, []);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const filteredHistory = tgrHistoryData.filter((item) => {
        const matchesSearch =
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.proposalId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesYear =
            filterYear === "all" || item.id.includes(filterYear);
        const matchesCategory =
            filterCategory === "all" ||
            item.category.toLowerCase().includes(filterCategory.toLowerCase());

        return matchesSearch && matchesYear && matchesCategory;
    });

    const sortedHistory = [...filteredHistory].sort((a, b) => {
        let comparison = 0;
        if (sortField === "resolutionDays") {
            comparison = a.resolutionDays - b.resolutionDays;
        } else if (sortField === "amount") {
            comparison = a.amount - b.amount;
        } else if (sortField === "resolutionDate") {
            const dateA = new Date(a.resolutionDate.split(" ").reverse().join(" "));
            const dateB = new Date(b.resolutionDate.split(" ").reverse().join(" "));
            comparison = dateA - dateB;
        } else {
            comparison = a[sortField] > b[sortField] ? 1 : -1;
        }

        return sortDirection === "asc" ? comparison : -comparison;
    });

    const getResolutionDaysColor = (days) => {
        if (days <= 14) return "text-green-600 dark:text-green-400";
        if (days <= 30) return "text-amber-600 dark:text-amber-400";
        return "text-red-600 dark:text-red-400";
    };

    const getCategoryColor = (category) => {
        switch (category.toLowerCase()) {
            case "laporan tidak lengkap":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "dana tidak terpakai":
                return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "bukti tidak valid":
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link
                        to="/bendahara/tgr-management"
                        className="mr-3 p-2.5 bg-brand-50 dark:bg-navy-800 rounded-full hover:bg-brand-100 dark:hover:bg-navy-700 transition-all duration-300 shadow-sm"
                    >
                        <MdArrowBack className="h-5 w-5 text-brand-500 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white tracking-tight">
                            Riwayat TGR
                        </h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Lihat dan analisis riwayat kasus TGR (Tuntutan Ganti Rugi) yang telah
                            terselesaikan
                        </p>
                    </div>
                </div>
            </div>

            {/* Modern Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                <Card extra="p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 shadow-md">
                            <MdList className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Total Kasus</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {historyStats.totalCases}
                            </h4>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
                        <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full"
                            style={{ width: '100%' }}></div>
                    </div>
                </Card>

                <Card extra="p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 shadow-md">
                            <MdDone className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Terselesaikan</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {historyStats.resolvedCases}
                            </h4>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
                        <div className="h-1 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 rounded-full"
                            style={{ width: `${(historyStats.resolvedCases / historyStats.totalCases) * 100}%` }}></div>
                    </div>
                </Card>

                <Card extra="p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 shadow-md">
                            <MdDateRange className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Tahun Ini</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {historyStats.currentYear}
                            </h4>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
                        <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 rounded-full"
                            style={{ width: `${(historyStats.currentYear / historyStats.totalCases) * 100}%` }}></div>
                    </div>
                </Card>

                <Card extra="p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 shadow-md">
                            <MdTimeline className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Rata-Rata Penyelesaian</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {historyStats.avgResolutionDays} Hari
                            </h4>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
                        <div className="h-1 bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 rounded-full"
                            style={{ width: `${Math.min((historyStats.avgResolutionDays / 30) * 100, 100)}%` }}></div>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mb-5">
                <Card extra="p-6 w-full hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                        <div className="flex items-center gap-3">
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                                <MdHistory className="mr-2 h-5 w-5 text-brand-500 dark:text-brand-400" />
                                Riwayat Kasus TGR
                                <span className="ml-2 px-2.5 py-1 text-xs font-medium rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-500 dark:text-brand-400">
                                    {filteredHistory.length} Kasus
                                </span>
                            </h5>
                            <div className="flex gap-2 bg-gray-100 dark:bg-navy-700 p-1 rounded-lg">
                                <button
                                    className={`text-xs px-3 py-1.5 rounded-md transition-all duration-200 ${viewMode === "list"
                                            ? "bg-white dark:bg-navy-600 text-brand-500 dark:text-white shadow-sm"
                                            : "text-gray-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-white"
                                        }`}
                                    onClick={() => setViewMode("list")}
                                >
                                    <div className="flex items-center gap-1">
                                        <MdList size={16} />
                                        <span>List</span>
                                    </div>
                                </button>
                                <button
                                    className={`text-xs px-3 py-1.5 rounded-md transition-all duration-200 ${viewMode === "timeline"
                                            ? "bg-white dark:bg-navy-600 text-brand-500 dark:text-white shadow-sm"
                                            : "text-gray-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-white"
                                        }`}
                                    onClick={() => setViewMode("timeline")}
                                >
                                    <div className="flex items-center gap-1">
                                        <MdTimeline size={16} />
                                        <span>Timeline</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-52">
                                    <input
                                        type="text"
                                        placeholder="Cari riwayat TGR..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <select
                                    className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 appearance-none pr-8 transition-all duration-200"
                                    value={filterYear}
                                    onChange={(e) => setFilterYear(e.target.value)}
                                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
                                >
                                    <option value="all">Semua Tahun</option>
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                </select>
                                <select
                                    className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 appearance-none pr-8 transition-all duration-200"
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
                                >
                                    <option value="all">Semua Kategori</option>
                                    <option value="laporan tidak lengkap">
                                        Laporan Tidak Lengkap
                                    </option>
                                    <option value="dana tidak terpakai">Dana Tidak Terpakai</option>
                                    <option value="bukti tidak valid">Bukti Tidak Valid</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleRefresh}
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-200"
                                    title="Refresh data"
                                >
                                    <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                                </button>
                                <button
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-200"
                                    title="Download data"
                                >
                                    <MdFileDownload className="h-5 w-5" />
                                </button>
                                <button
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-200"
                                    title="Filter lanjutan"
                                >
                                    <MdOutlineFilterAlt className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {viewMode === "list" ? (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px] table-auto">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-navy-800 rounded-lg">
                                        <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                            <div
                                                className="flex items-center cursor-pointer"
                                                onClick={() => handleSort('id')}
                                            >
                                                ID TGR
                                                {sortField === 'id' && (
                                                    <span className="ml-1">
                                                        {sortDirection === 'asc' ?
                                                            <MdArrowUpward className="h-4 w-4" /> :
                                                            <MdArrowDownward className="h-4 w-4" />
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                        <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                            <div
                                                className="flex items-center cursor-pointer"
                                                onClick={() => handleSort('researcher')}
                                            >
                                                Peneliti
                                                {sortField === 'researcher' && (
                                                    <span className="ml-1">
                                                        {sortDirection === 'asc' ?
                                                            <MdArrowUpward className="h-4 w-4" /> :
                                                            <MdArrowDownward className="h-4 w-4" />
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                        <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                            <div
                                                className="flex items-center cursor-pointer"
                                                onClick={() => handleSort('category')}
                                            >
                                                Kategori
                                                {sortField === 'category' && (
                                                    <span className="ml-1">
                                                        {sortDirection === 'asc' ?
                                                            <MdArrowUpward className="h-4 w-4" /> :
                                                            <MdArrowDownward className="h-4 w-4" />
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                        <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                            <div
                                                className="flex items-center cursor-pointer"
                                                onClick={() => handleSort('amount')}
                                            >
                                                Jumlah
                                                {sortField === 'amount' && (
                                                    <span className="ml-1">
                                                        {sortDirection === 'asc' ?
                                                            <MdArrowUpward className="h-4 w-4" /> :
                                                            <MdArrowDownward className="h-4 w-4" />
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                        <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                            <div
                                                className="flex items-center cursor-pointer"
                                                onClick={() => handleSort('resolutionDate')}
                                            >
                                                Tanggal Penyelesaian
                                                {sortField === 'resolutionDate' && (
                                                    <span className="ml-1">
                                                        {sortDirection === 'asc' ?
                                                            <MdArrowUpward className="h-4 w-4" /> :
                                                            <MdArrowDownward className="h-4 w-4" />
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                        <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                            <div
                                                className="flex items-center cursor-pointer"
                                                onClick={() => handleSort('resolutionDays')}
                                            >
                                                Waktu Penyelesaian
                                                {sortField === 'resolutionDays' && (
                                                    <span className="ml-1">
                                                        {sortDirection === 'asc' ?
                                                            <MdArrowUpward className="h-4 w-4" /> :
                                                            <MdArrowDownward className="h-4 w-4" />
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                        <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedHistory.length > 0 ? (
                                        sortedHistory.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-all duration-200"
                                            >
                                                <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                                                    <span className="bg-gray-100 dark:bg-navy-800 px-2.5 py-1 rounded-md">{item.id}</span>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {item.proposalId}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                                    <div className="font-medium text-navy-700 dark:text-white">
                                                        {item.researcher}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {item.faculty}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                                    <span
                                                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                                                            item.category
                                                        )}`}
                                                    >
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                                                    <div className="flex items-center">
                                                        <MdMonetizationOn className="h-4 w-4 text-green-500 mr-1" />
                                                        <span>Rp {item.amount.toLocaleString()}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-navy-700">
                                                    <div className="flex items-center">
                                                        <MdOutlineCalendarMonth className="h-4 w-4 text-blue-500 mr-1" />
                                                        <span>{item.resolutionDate}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                                    <span className={`flex items-center ${getResolutionDaysColor(item.resolutionDays)}`}>
                                                        <MdAccessTime className="h-4 w-4 mr-1" />
                                                        {item.resolutionDays} hari
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                                    <Link to={`/bendahara/tgr-management/tgr-list/${item.id}`}>
                                                        <button className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200" title="Lihat Detail">
                                                            <MdVisibility size={18} />
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="py-8 text-center text-gray-500 dark:text-gray-400"
                                            >
                                                <div className="flex flex-col items-center">
                                                    <MdHistory className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-2" />
                                                    <p className="text-base font-medium">Tidak ada data riwayat TGR</p>
                                                    <p className="text-sm mt-1">Tidak ada data yang sesuai dengan kriteria pencarian Anda.</p>
                                                    <button
                                                        className="mt-3 text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
                                                        onClick={() => {
                                                            setSearchTerm("");
                                                            setFilterYear("all");
                                                            setFilterCategory("all");
                                                        }}
                                                    >
                                                        Reset filter
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="relative pl-8">
                            {/* Timeline line */}
                            <div className="absolute left-4 top-6 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-green-400 dark:from-blue-500 dark:via-purple-500 dark:to-green-500 rounded-full"></div>

                            {/* Timeline items */}
                            {sortedHistory.length > 0 ? (
                                sortedHistory.map((item, index) => (
                                    <div key={index} className="mb-8 relative" data-aos="fade-up" data-aos-delay={100 + index * 50}>
                                        {/* Timeline dot */}
                                        <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-navy-800 border-4 border-green-400 dark:border-green-500 shadow-md z-10">
                                            <MdCheckCircleOutline className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        </div>

                                        {/* Content */}
                                        <div className="ml-12 bg-white dark:bg-navy-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-navy-700">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                                <div className="flex items-center mb-2 md:mb-0">
                                                    <span className="text-sm font-medium text-navy-700 dark:text-white bg-gray-100 dark:bg-navy-700 px-2.5 py-1 rounded-md">
                                                        {item.id}
                                                    </span>
                                                    <span className="mx-2 text-gray-300 dark:text-gray-600">
                                                        •
                                                    </span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {item.proposalId}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                                                            item.category
                                                        )}`}
                                                    >
                                                        {item.category}
                                                    </span>
                                                    <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 flex items-center">
                                                        <MdEventAvailable className="h-3.5 w-3.5 mr-1 text-blue-500" />
                                                        {item.resolutionDate}
                                                    </span>
                                                </div>
                                            </div>

                                            <h6 className="text-base font-bold text-navy-700 dark:text-white mb-3">
                                                {item.title}
                                            </h6>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div className="flex items-start gap-3 bg-gray-50 dark:bg-navy-900 p-3 rounded-lg">
                                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                        <MdPerson className="h-5 w-5 text-blue-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            Peneliti:
                                                        </p>
                                                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                                                            {item.researcher}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {item.faculty}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3 bg-gray-50 dark:bg-navy-900 p-3 rounded-lg">
                                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                        <MdAttachMoney className="h-5 w-5 text-green-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            Jumlah TGR:
                                                        </p>
                                                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                                                            Rp {item.amount.toLocaleString()}
                                                        </p>
                                                        <div className="flex items-center mt-1">
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">
                                                                Waktu Penyelesaian:
                                                            </span>
                                                            <span
                                                                className={`text-xs font-medium ${getResolutionDaysColor(
                                                                    item.resolutionDays
                                                                )}`}
                                                            >
                                                                {item.resolutionDays} hari
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-gray-50 dark:bg-navy-900 rounded-lg border border-gray-100 dark:border-navy-700 mb-3">
                                                <div className="flex items-start gap-2 mb-1">
                                                    <MdVerifiedUser className="h-5 w-5 text-green-500 mt-0.5" />
                                                    <h6 className="text-sm font-medium text-navy-700 dark:text-white">
                                                        Resolusi
                                                    </h6>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 pl-7">
                                                    {item.resolution}
                                                </p>
                                            </div>

                                            <div className="flex justify-end">
                                                <Link to={`/bendahara/tgr-management/tgr-list/${item.id}`}>
                                                    <button className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow">
                                                        Lihat Detail
                                                        <MdKeyboardArrowRight className="h-4 w-4" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center py-16 bg-white dark:bg-navy-800 rounded-xl border border-gray-100 dark:border-navy-700 shadow-sm">
                                    <div className="p-4 bg-gray-100 dark:bg-navy-700 rounded-full mb-4">
                                        <MdHistory className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <p className="text-lg font-medium text-navy-700 dark:text-white mb-1">Tidak ada riwayat TGR</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                                        Tidak ada data yang sesuai dengan kriteria pencarian Anda. Coba ubah filter atau reset pencarian.
                                    </p>
                                    <button
                                        className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-brand-500 hover:text-brand-600 bg-brand-50 hover:bg-brand-100 dark:text-brand-400 dark:bg-brand-900/20 dark:hover:bg-brand-900/30 transition-colors duration-200"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setFilterYear("all");
                                            setFilterCategory("all");
                                        }}
                                    >
                                        Reset Pencarian
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {sortedHistory.length > 8 && (
                        <div className="mt-6 text-center">
                            <button className="px-4 py-2.5 text-sm font-medium text-brand-500 hover:text-white bg-brand-50 hover:bg-brand-500 dark:text-brand-400 dark:bg-brand-900/20 dark:hover:bg-brand-500 dark:hover:text-white rounded-lg transition-all duration-200">
                                Muat Lebih Banyak
                            </button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default TgrHistory;