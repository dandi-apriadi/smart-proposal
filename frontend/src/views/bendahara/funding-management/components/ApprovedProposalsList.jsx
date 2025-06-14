import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdFileDownload,
    MdCheck,
    MdArrowBack,
    MdAttachMoney,
    MdCheckCircle,
    MdMoreVert,
    MdEdit,
    MdOutlineTrendingUp,
    MdOutlineDescription,
    MdOutlineTimer,
    MdCalendarToday,
    MdPerson,
    MdSchool
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const ApprovedProposalsList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

    // Dummy data for approved proposals
    const approvedProposalsStats = {
        totalApproved: 32,
        fundedProposals: 24,
        pendingFunding: 8,
        totalBudgetApproved: 2450000000
    };

    const approvedProposals = [
        {
            id: "PRP-2025-042",
            title: "Pengembangan Machine Learning untuk Deteksi Penyakit Tanaman",
            researcher: "Dr. Budi Santoso",
            faculty: "Fakultas Teknik",
            submissionDate: "10 Mar 2025",
            approvalDate: "25 Apr 2025",
            status: "Menunggu Pencairan",
            amount: 75000000,
            disbursementSchedule: "20 Jun 2025",
            category: "Teknologi"
        },
        {
            id: "PRP-2025-039",
            title: "Analisis Big Data untuk Prediksi Perilaku Konsumen",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            submissionDate: "05 Mar 2025",
            approvalDate: "20 Apr 2025",
            status: "Dana Dicairkan",
            amount: 68000000,
            disbursementSchedule: "15 Mei 2025",
            category: "Ekonomi"
        },
        {
            id: "PRP-2025-038",
            title: "Analisis Dampak Ekonomi dari Perubahan Iklim di Indonesia",
            researcher: "Prof. Dewi Lestari",
            faculty: "Fakultas Ekonomi",
            submissionDate: "28 Feb 2025",
            approvalDate: "15 Apr 2025",
            status: "Dana Dicairkan",
            amount: 65000000,
            disbursementSchedule: "10 Mei 2025",
            category: "Ekonomi"
        },
        {
            id: "PRP-2025-036",
            title: "Efektivitas Metode Pembelajaran Jarak Jauh pada Mahasiswa",
            researcher: "Dr. Andi Wijaya",
            faculty: "Fakultas Psikologi",
            submissionDate: "25 Feb 2025",
            approvalDate: "10 Apr 2025",
            status: "Menunggu Pencairan",
            amount: 50000000,
            disbursementSchedule: "25 Jun 2025",
            category: "Pendidikan"
        },
        {
            id: "PRP-2025-035",
            title: "Sistem Monitoring Kualitas Air Berbasis IoT",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            submissionDate: "20 Feb 2025",
            approvalDate: "05 Apr 2025",
            status: "Dana Dicairkan",
            amount: 82000000,
            disbursementSchedule: "05 Mei 2025",
            category: "Kesehatan"
        },
        {
            id: "PRP-2025-032",
            title: "Pengembangan Bahan Bakar Alternatif dari Mikroalga",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            submissionDate: "15 Feb 2025",
            approvalDate: "01 Apr 2025",
            status: "Dana Dicairkan",
            amount: 95000000,
            disbursementSchedule: "01 Mei 2025",
            category: "Energi"
        }
    ];

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true
        });
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const toggleRowSelection = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Teknologi': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Ekonomi': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'Pendidikan': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
            case 'Kesehatan': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            case 'Energi': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    const filteredProposals = approvedProposals.filter(proposal => {
        const matchesSearch =
            proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proposal.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proposal.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === "all" || proposal.status.toLowerCase() === filterStatus.toLowerCase();

        const matchesCategory = filterCategory === "all" || proposal.category === filterCategory;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const categories = [...new Set(approvedProposals.map(proposal => proposal.category))];

    // Calculate statistics
    const totalAmount = filteredProposals.reduce((sum, proposal) => sum + proposal.amount, 0);
    const averageAmount = filteredProposals.length > 0
        ? totalAmount / filteredProposals.length
        : 0;

    return (
        <div className="pt-8 px-2">
            {/* Hero Section */}
            <div className="relative mb-10 bg-gradient-to-r from-brand-600 to-brand-400 rounded-3xl p-8 text-white overflow-hidden" data-aos="fade-up">
                <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center">
                            <Link to="/bendahara/funding-management" className="mr-4 p-2.5 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl hover:bg-opacity-30 transition-all">
                                <MdArrowBack className="h-5 w-5 text-white" />
                            </Link>
                            <div>
                                <h2 className="text-3xl font-bold">Daftar Proposal Disetujui</h2>
                                <p className="mt-2 text-brand-100 max-w-xl">
                                    Kelola dan proses pembayaran untuk proposal penelitian yang telah mendapatkan persetujuan pendanaan
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                                <p className="text-sm text-brand-100">Total Proposal</p>
                                <p className="text-2xl font-bold">{approvedProposalsStats.totalApproved}</p>
                            </div>
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                                <p className="text-sm text-brand-100">Total Dana</p>
                                <p className="text-2xl font-bold">Rp {approvedProposalsStats.totalBudgetApproved.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Cari proposal..."
                                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white/60"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MdSearch className="absolute right-3 top-3 text-white" />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-2.5 rounded-xl border ${viewMode === 'table'
                                    ? 'bg-white text-brand-600 border-transparent'
                                    : 'bg-white/20 border-white/30 text-white hover:bg-white/30'} transition-all`}
                                title="Tampilan Tabel"
                            >
                                <MdOutlineDescription className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('card')}
                                className={`p-2.5 rounded-xl border ${viewMode === 'card'
                                    ? 'bg-white text-brand-600 border-transparent'
                                    : 'bg-white/20 border-white/30 text-white hover:bg-white/30'} transition-all`}
                                title="Tampilan Kartu"
                            >
                                <MdOutlineTrendingUp className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Disetujui</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {approvedProposalsStats.totalApproved}
                            </h4>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Periode 2025
                            </p>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-green-100 dark:bg-green-900/30">
                            <MdAttachMoney className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Proposal Terdanai</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {approvedProposalsStats.fundedProposals}
                            </h4>
                            <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                                {Math.round(approvedProposalsStats.fundedProposals / approvedProposalsStats.totalApproved * 100)}% dari total
                            </p>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdOutlineTimer className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Menunggu Pencairan</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {approvedProposalsStats.pendingFunding}
                            </h4>
                            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                                Perlu segera diproses
                            </p>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-purple-100 dark:bg-purple-900/30">
                            <MdAttachMoney className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Rata-rata Dana</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                Rp {Math.round(averageAmount).toLocaleString()}
                            </h4>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Per proposal
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters and Table */}
            <Card extra="p-6 border border-gray-100 dark:border-navy-700 shadow-sm" data-aos="fade-up" data-aos-delay="300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                            Daftar Proposal Disetujui
                        </h5>
                        <div className="px-3 py-1 rounded-xl bg-brand-50 dark:bg-brand-500/20 text-brand-500 text-sm font-medium">
                            {filteredProposals.length} Proposal
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <select
                                    className="appearance-none px-4 py-2.5 pl-10 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 transition-colors"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="dana dicairkan">Dana Dicairkan</option>
                                    <option value="menunggu pencairan">Menunggu Pencairan</option>
                                </select>
                                <MdFilterList className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
                            </div>

                            <div className="relative">
                                <select
                                    className="appearance-none px-4 py-2.5 pl-10 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 transition-colors"
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                >
                                    <option value="all">Semua Kategori</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <MdSchool className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleRefresh}
                                className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors"
                                title="Refresh data"
                            >
                                <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                            </button>
                            <button
                                className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white transition-colors flex items-center gap-2"
                                title="Ekspor data"
                            >
                                <MdFileDownload className="h-5 w-5" />
                                <span className="hidden md:inline">Ekspor</span>
                            </button>
                        </div>
                    </div>
                </div>

                {viewMode === 'table' ? (
                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-navy-700">
                        <table className="w-full min-w-[800px] table-auto">
                            <thead className="bg-gray-50 dark:bg-navy-800">
                                <tr>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                        ID Proposal
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Judul & Kategori
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Peneliti
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Dana
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Jadwal
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProposals.length > 0 ? (
                                    filteredProposals.map((proposal, index) => (
                                        <tr key={index} className="border-b border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
                                            <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="mr-3 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                                        checked={selectedRows.includes(proposal.id)}
                                                        onChange={() => toggleRowSelection(proposal.id)}
                                                    />
                                                    {proposal.id}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="max-w-[250px]">
                                                    <Link to={`/bendahara/funding-management/proposal/${proposal.id}`} className="text-sm font-medium text-navy-700 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 line-clamp-2">
                                                        {proposal.title}
                                                    </Link>
                                                    <div className="mt-1">
                                                        <span className={`${getCategoryColor(proposal.category)} text-xs px-2 py-0.5 rounded-full`}>
                                                            {proposal.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-navy-700 dark:text-white">
                                                        {proposal.researcher}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {proposal.faculty}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                                Rp {proposal.amount.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                    <MdCalendarToday className="mr-1.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                                    {proposal.disbursementSchedule}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2.5 py-1.5 text-xs font-medium rounded-full ${proposal.status === "Dana Dicairkan"
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                                    }`}>
                                                    {proposal.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex space-x-2">
                                                    <Link to={`/bendahara/funding-management/proposal/${proposal.id}`}>
                                                        <button className="p-2 rounded-xl bg-brand-50 dark:bg-brand-500/20 text-brand-500 hover:bg-brand-100 transition-colors">
                                                            <MdEdit size={18} />
                                                        </button>
                                                    </Link>
                                                    <div className="relative group">
                                                        <button className="p-2 rounded-xl bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-800 transition-colors">
                                                            <MdMoreVert size={18} />
                                                        </button>
                                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-navy-800 rounded-xl shadow-lg border border-gray-200 dark:border-navy-700 hidden group-hover:block z-10">
                                                            <ul className="py-1.5">
                                                                <li>
                                                                    <Link to={`/bendahara/funding-management/fund-disbursement/${proposal.id}`} className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-navy-700">
                                                                        <MdAttachMoney className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                                                        Proses Pencairan
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/bendahara/funding-management/payment-history/${proposal.id}`} className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-navy-700">
                                                                        <MdOutlineTimer className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                                                        Riwayat Pembayaran
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="py-8 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center">
                                                <div className="p-3 rounded-full bg-gray-100 dark:bg-navy-700 mb-2">
                                                    <MdSearch className="h-6 w-6 text-gray-400" />
                                                </div>
                                                Tidak ada proposal yang sesuai dengan kriteria pencarian
                                                <button
                                                    onClick={() => {
                                                        setSearchTerm("");
                                                        setFilterStatus("all");
                                                        setFilterCategory("all");
                                                    }}
                                                    className="mt-2 text-brand-500 hover:text-brand-600 text-sm font-medium"
                                                >
                                                    Reset Filter
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
                        {filteredProposals.length > 0 ? (
                            filteredProposals.map((proposal, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-navy-800 rounded-xl border border-gray-200 dark:border-navy-700 p-5 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <span className={`${getCategoryColor(proposal.category)} text-xs px-2.5 py-1 rounded-full`}>
                                            {proposal.category}
                                        </span>
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${proposal.status === "Dana Dicairkan"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                            }`}>
                                            {proposal.status}
                                        </span>
                                    </div>

                                    <Link to={`/bendahara/funding-management/proposal/${proposal.id}`} className="block">
                                        <h3 className="text-base font-medium text-navy-700 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 line-clamp-2 mb-2">
                                            {proposal.title}
                                        </h3>
                                    </Link>

                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2.5">
                                        <MdPerson className="mr-1.5 h-4 w-4 text-gray-500" />
                                        {proposal.researcher}
                                    </div>

                                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                                        <div className="flex items-center">
                                            <MdCalendarToday className="mr-1 h-3.5 w-3.5" />
                                            {proposal.disbursementSchedule}
                                        </div>
                                        <div>ID: {proposal.id}</div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="text-lg font-bold text-navy-700 dark:text-white">
                                            Rp {proposal.amount.toLocaleString()}
                                        </div>
                                        <div className="flex space-x-2">
                                            <Link to={`/bendahara/funding-management/proposal/${proposal.id}`}>
                                                <button className="p-2 rounded-xl bg-brand-50 dark:bg-brand-500/20 text-brand-500 hover:bg-brand-100 transition-colors">
                                                    <MdEdit size={18} />
                                                </button>
                                            </Link>
                                            <Link to={`/bendahara/funding-management/fund-disbursement/${proposal.id}`}>
                                                <button className="p-2 rounded-xl bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-800 transition-colors">
                                                    <MdAttachMoney size={18} />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-center text-gray-500 dark:text-gray-400">
                                <div className="flex flex-col items-center">
                                    <div className="p-3 rounded-full bg-gray-100 dark:bg-navy-700 mb-2">
                                        <MdSearch className="h-6 w-6 text-gray-400" />
                                    </div>
                                    Tidak ada proposal yang sesuai dengan kriteria pencarian
                                    <button
                                        onClick={() => {
                                            setSearchTerm("");
                                            setFilterStatus("all");
                                            setFilterCategory("all");
                                        }}
                                        className="mt-2 text-brand-500 hover:text-brand-600 text-sm font-medium"
                                    >
                                        Reset Filter
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {filteredProposals.length > 0 && (
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Menampilkan {filteredProposals.length} dari {approvedProposals.length} proposal
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Halaman 1 dari 1</span>
                            <button className="p-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-500 dark:text-gray-400 opacity-50 cursor-not-allowed">
                                &lt;
                            </button>
                            <button className="p-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-500 dark:text-gray-400 opacity-50 cursor-not-allowed">
                                &gt;
                            </button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ApprovedProposalsList;
