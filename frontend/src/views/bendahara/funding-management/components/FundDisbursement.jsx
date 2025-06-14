import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdAttachMoney,
    MdOutlineAttachMoney,
    MdArrowBack,
    MdCheckCircle,
    MdCalendarToday,
    MdPayment,
    MdAccountBalance,
    MdWarning,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdCancel,
    MdPerson,
    MdReceipt,
    MdOutlineTrendingUp,
    MdInfo,
    MdOutlineFileUpload,
    MdCheck,
    MdDashboard,
    MdWorkOutline,
    MdPendingActions,
    MdRequestQuote
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const FundDisbursement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [selectedProposals, setSelectedProposals] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');
    const [processingStep, setProcessingStep] = useState(1);
    const [showUploadModal, setShowUploadModal] = useState(false);

    // Dummy data
    const disbursementStats = {
        pendingDisbursements: 8,
        disbursedThisMonth: 12,
        totalDisbursedAmount: 855000000,
        scheduledDisbursements: 5
    };

    const pendingDisbursements = [
        {
            id: "PRP-2025-042",
            title: "Pengembangan Machine Learning untuk Deteksi Penyakit Tanaman",
            researcher: "Dr. Budi Santoso",
            faculty: "Fakultas Teknik",
            amount: 75000000,
            approvalDate: "25 Apr 2025",
            scheduledDate: "20 Jun 2025",
            category: "Teknologi",
            paymentMethod: "Transfer Bank",
            bankAccount: "BNI - 0123456789",
            accountName: "Budi Santoso",
            disbursementStatus: "Siap Dicairkan"
        },
        {
            id: "PRP-2025-036",
            title: "Efektivitas Metode Pembelajaran Jarak Jauh pada Mahasiswa",
            researcher: "Dr. Andi Wijaya",
            faculty: "Fakultas Psikologi",
            amount: 50000000,
            approvalDate: "10 Apr 2025",
            scheduledDate: "25 Jun 2025",
            category: "Pendidikan",
            paymentMethod: "Transfer Bank",
            bankAccount: "BCA - 1234567890",
            accountName: "Andi Wijaya",
            disbursementStatus: "Menunggu Verifikasi"
        },
        {
            id: "PRP-2025-034",
            title: "Pengembangan Energi Terbarukan di Daerah Terpencil",
            researcher: "Dr. Adi Suryanto",
            faculty: "Fakultas Teknik",
            amount: 85000000,
            approvalDate: "05 Apr 2025",
            scheduledDate: "22 Jun 2025",
            category: "Energi",
            paymentMethod: "Transfer Bank",
            bankAccount: "Mandiri - 9876543210",
            accountName: "Adi Suryanto",
            disbursementStatus: "Siap Dicairkan"
        },
        {
            id: "PRP-2025-030",
            title: "Pengaruh Media Sosial terhadap Perilaku Konsumen",
            researcher: "Dr. Siti Rahayu",
            faculty: "Fakultas Ekonomi",
            amount: 70000000,
            approvalDate: "01 Apr 2025",
            scheduledDate: "18 Jun 2025",
            category: "Sosial",
            paymentMethod: "Transfer Bank",
            bankAccount: "BRI - 0987654321",
            accountName: "Siti Rahayu",
            disbursementStatus: "Dokumen Tidak Lengkap"
        }
    ];

    // New dummy data for completed disbursements
    const completedDisbursements = [
        {
            id: "PRP-2025-039",
            title: "Analisis Big Data untuk Prediksi Perilaku Konsumen",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            amount: 68000000,
            disbursedDate: "05 May 2025",
            category: "Ekonomi",
            paymentMethod: "Transfer Bank",
            bankAccount: "BCA - 5678901234",
            accountName: "Maya Putri",
            disbursementStatus: "Selesai Dicairkan",
            paymentProof: "transfer-receipt-01.pdf"
        },
        {
            id: "PRP-2025-038",
            title: "Analisis Dampak Ekonomi dari Perubahan Iklim di Indonesia",
            researcher: "Prof. Dewi Lestari",
            faculty: "Fakultas Ekonomi",
            amount: 65000000,
            disbursedDate: "01 May 2025",
            category: "Ekonomi",
            paymentMethod: "Transfer Bank",
            bankAccount: "Mandiri - 1230984567",
            accountName: "Dewi Lestari",
            disbursementStatus: "Selesai Dicairkan",
            paymentProof: "transfer-receipt-02.pdf"
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

    const toggleSelect = (proposalId) => {
        if (selectedProposals.includes(proposalId)) {
            setSelectedProposals(selectedProposals.filter(id => id !== proposalId));
        } else {
            setSelectedProposals([...selectedProposals, proposalId]);
        }
    };

    const selectAll = () => {
        if (selectedProposals.length === filteredDisbursements.length) {
            setSelectedProposals([]);
        } else {
            setSelectedProposals(filteredDisbursements.map(proposal => proposal.id));
        }
    };

    const filteredDisbursements = pendingDisbursements.filter(disbursement => {
        const matchesSearch =
            disbursement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            disbursement.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            disbursement.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = filterCategory === "all" || disbursement.category.toLowerCase() === filterCategory.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    // Calculate total amount for selected proposals
    const calculateTotalSelected = () => {
        return pendingDisbursements
            .filter(proposal => selectedProposals.includes(proposal.id))
            .reduce((total, proposal) => total + proposal.amount, 0);
    };

    // Get color variants for categories
    const getCategoryColor = (category) => {
        switch (category.toLowerCase()) {
            case 'teknologi': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'pendidikan': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
            case 'energi': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
            case 'sosial': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400';
            case 'ekonomi': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    // Get color variants for status badges
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'siap dicairkan':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'menunggu verifikasi':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
            case 'selesai dicairkan':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'dokumen tidak lengkap':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    // Format date for better display
    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split(' ');
        return `${day} ${month} ${year}`;
    };

    return (
        <div className="pt-8 px-2">
            {/* Hero Section with gradient background */}
            <div className="relative mb-10 bg-gradient-to-r from-brand-600 to-brand-400 rounded-3xl p-8 text-white overflow-hidden" data-aos="fade-up">
                <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full transform -translate-x-10 translate-y-10"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-6 lg:mb-0">
                        <div className="flex items-center">
                            <Link to="/bendahara/funding-management" className="mr-4 p-2.5 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl hover:bg-opacity-30 transition-all">
                                <MdArrowBack className="h-5 w-5 text-white" />
                            </Link>
                            <div>
                                <h2 className="text-3xl font-bold">Pencairan Dana Penelitian</h2>
                                <p className="mt-2 text-brand-100 max-w-xl">
                                    Kelola, proses dan pantau pencairan dana untuk proposal yang telah disetujui
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                            <p className="text-sm text-brand-100">Menunggu Pencairan</p>
                            <div className="flex items-center mt-1">
                                <MdPendingActions className="h-5 w-5 mr-2" />
                                <p className="text-2xl font-bold">{disbursementStats.pendingDisbursements}</p>
                            </div>
                        </div>

                        <div className="hidden md:block bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                            <p className="text-sm text-brand-100">Total Alokasi</p>
                            <div className="flex items-center mt-1">
                                <MdAttachMoney className="h-5 w-5 mr-2" />
                                <p className="text-2xl font-bold">Rp {disbursementStats.totalDisbursedAmount.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards - Improved with better visual hierarchy and layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8" data-aos="fade-up">
                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdOutlineAttachMoney className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Menunggu Pencairan</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {disbursementStats.pendingDisbursements}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 mr-1"></span>
                                <span className="text-xs text-amber-600 dark:text-amber-400">
                                    Perlu tindakan segera
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-green-100 dark:bg-green-900/30">
                            <MdCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Dicairkan Bulan Ini</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {disbursementStats.disbursedThisMonth}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                                <span className="text-xs text-green-600 dark:text-green-400">
                                    Selesai diproses
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdAttachMoney className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Dicairkan</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                Rp {disbursementStats.totalDisbursedAmount.toLocaleString()}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 mr-1"></span>
                                <span className="text-xs text-blue-600 dark:text-blue-400">
                                    Tahun anggaran 2025
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-purple-100 dark:bg-purple-900/30">
                            <MdCalendarToday className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Terjadwal Minggu Depan</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {disbursementStats.scheduledDisbursements}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-500 mr-1"></span>
                                <span className="text-xs text-purple-600 dark:text-purple-400">
                                    Siap dicairkan
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Navigation Tabs for toggling between pending and completed disbursements */}
            <div className="flex items-center mb-6 border-b border-gray-200 dark:border-navy-700" data-aos="fade-up" data-aos-delay="100">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-5 py-3 font-medium text-sm transition-colors relative ${activeTab === 'pending'
                        ? 'text-brand-500 dark:text-brand-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <MdPendingActions className={activeTab === 'pending' ? "h-5 w-5 text-brand-500" : "h-5 w-5"} />
                        Menunggu Pencairan
                        <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                            {disbursementStats.pendingDisbursements}
                        </span>
                    </div>
                    {activeTab === 'pending' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 dark:bg-brand-400"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-5 py-3 font-medium text-sm transition-colors relative ${activeTab === 'completed'
                        ? 'text-brand-500 dark:text-brand-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <MdCheckCircle className={activeTab === 'completed' ? "h-5 w-5 text-brand-500" : "h-5 w-5"} />
                        Dana Dicairkan
                        <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            {disbursementStats.disbursedThisMonth}
                        </span>
                    </div>
                    {activeTab === 'completed' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 dark:bg-brand-400"></div>
                    )}
                </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-6 mb-5">
                <Card extra="p-6 xl:w-2/3" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                            {activeTab === 'pending' ? 'Daftar Menunggu Pencairan' : 'Riwayat Dana Dicairkan'}
                        </h5>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari proposal..."
                                        className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <MdSearch className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div className="relative">
                                    <select
                                        className="appearance-none px-4 py-2.5 pl-10 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                    >
                                        <option value="all">Semua Kategori</option>
                                        <option value="teknologi">Teknologi</option>
                                        <option value="pendidikan">Pendidikan</option>
                                        <option value="energi">Energi</option>
                                        <option value="sosial">Sosial</option>
                                        <option value="ekonomi">Ekonomi</option>
                                    </select>
                                    <MdFilterList className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
                                </div>
                            </div>
                            <button
                                onClick={handleRefresh}
                                className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors"
                                title="Refresh Data"
                            >
                                <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                            </button>
                        </div>
                    </div>

                    {activeTab === 'pending' ? (
                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-navy-700">
                            <table className="w-full min-w-[800px] table-auto">
                                <thead className="bg-gray-50 dark:bg-navy-800">
                                    <tr>
                                        <th className="px-4 py-3 text-start rounded-tl-lg">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-400"
                                                    checked={selectedProposals.length === filteredDisbursements.length && filteredDisbursements.length > 0}
                                                    onChange={selectAll}
                                                />
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Proposal
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Peneliti
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Jumlah
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Jadwal
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300 rounded-tr-lg">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDisbursements.length > 0 ? (
                                        filteredDisbursements.map((disbursement, index) => (
                                            <tr key={index} className={`border-t border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors ${selectedProposals.includes(disbursement.id) ? 'bg-brand-50 dark:bg-brand-500/10' : ''}`}>
                                                <td className="px-4 py-4">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-brand-500 focus:ring-brand-400"
                                                        checked={selectedProposals.includes(disbursement.id)}
                                                        onChange={() => toggleSelect(disbursement.id)}
                                                    />
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className={`${getCategoryColor(disbursement.category)} h-8 w-8 flex items-center justify-center rounded-lg`}>
                                                            <MdWorkOutline className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <Link
                                                                to={`/bendahara/funding-management/proposal/${disbursement.id}`}
                                                                className="text-sm font-medium text-navy-700 dark:text-white hover:text-brand-500 line-clamp-2 max-w-[200px]"
                                                            >
                                                                {disbursement.title}
                                                            </Link>
                                                            <div className="mt-1 flex items-center text-xs text-gray-500">
                                                                <span className="mr-2">{disbursement.id}</span>
                                                                <span className={`px-1.5 py-0.5 rounded-sm ${getCategoryColor(disbursement.category)}`}>
                                                                    {disbursement.category}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-navy-700 flex items-center justify-center mr-2">
                                                            <MdPerson className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-navy-700 dark:text-white">
                                                                {disbursement.researcher}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {disbursement.faculty}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-semibold text-navy-700 dark:text-white">
                                                    Rp {disbursement.amount.toLocaleString()}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center text-xs">
                                                        <MdCalendarToday className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1.5" />
                                                        <span className="text-gray-600 dark:text-gray-300">
                                                            {disbursement.scheduledDate}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={`px-2.5 py-1.5 text-xs font-medium rounded-full ${getStatusColor(disbursement.disbursementStatus)}`}>
                                                        {disbursement.disbursementStatus}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-gray-500 dark:text-gray-400">
                                                <div className="flex flex-col items-center">
                                                    <div className="p-3 rounded-full bg-gray-100 dark:bg-navy-700 mb-2">
                                                        <MdSearch className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                    Tidak ada proposal yang sesuai dengan kriteria pencarian
                                                    <button
                                                        onClick={() => {
                                                            setSearchTerm("");
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
                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-navy-700">
                            <table className="w-full min-w-[800px] table-auto">
                                <thead className="bg-gray-50 dark:bg-navy-800">
                                    <tr>
                                        <th className="px-4 py-3 text-start rounded-tl-lg text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Proposal
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Peneliti
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Jumlah
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Tanggal Pencairan
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Metode
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300 rounded-tr-lg">
                                            Bukti
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {completedDisbursements.map((disbursement, index) => (
                                        <tr key={index} className="border-t border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
                                            <td className="px-4 py-4">
                                                <div className="flex items-start gap-3">
                                                    <div className={`${getCategoryColor(disbursement.category)} h-8 w-8 flex items-center justify-center rounded-lg`}>
                                                        <MdDashboard className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <Link
                                                            to={`/bendahara/funding-management/proposal/${disbursement.id}`}
                                                            className="text-sm font-medium text-navy-700 dark:text-white hover:text-brand-500 line-clamp-2 max-w-[200px]"
                                                        >
                                                            {disbursement.title}
                                                        </Link>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {disbursement.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-navy-700 flex items-center justify-center mr-2">
                                                        <MdPerson className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                                                            {disbursement.researcher}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {disbursement.faculty}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-semibold text-navy-700 dark:text-white">
                                                Rp {disbursement.amount.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center text-xs">
                                                    <MdCalendarToday className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1.5" />
                                                    <span className="text-gray-600 dark:text-gray-300">
                                                        {disbursement.disbursedDate}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                {disbursement.paymentMethod}
                                            </td>
                                            <td className="px-4 py-4">
                                                <button
                                                    onClick={() => { setShowUploadModal(true) }}
                                                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-800 flex items-center gap-1.5"
                                                >
                                                    <MdReceipt className="h-4 w-4" />
                                                    Lihat Bukti
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'pending' && selectedProposals.length > 0 && (
                        <div className="mt-6 flex flex-wrap justify-between items-center p-4 bg-gray-50 dark:bg-navy-800 rounded-xl border border-gray-100 dark:border-navy-700">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <div className="text-sm font-medium text-gray-700 dark:text-white mr-4">
                                    {selectedProposals.length} proposal dipilih
                                </div>
                                <div className="text-sm font-medium text-brand-500 dark:text-brand-400">
                                    Total: Rp {calculateTotalSelected().toLocaleString()}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button className="px-3 py-2 text-sm font-medium bg-white dark:bg-navy-700 text-gray-700 dark:text-white border border-gray-200 dark:border-navy-600 hover:bg-gray-50 dark:hover:bg-navy-600 rounded-lg transition-colors flex items-center gap-2">
                                    <MdCancel className="h-4 w-4" />
                                    Batalkan
                                </button>
                                <button className="px-3 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors flex items-center gap-2">
                                    <MdAttachMoney className="h-4 w-4" />
                                    Proses Pencairan
                                </button>
                            </div>
                        </div>
                    )}
                </Card>

                <Card extra="p-0 xl:w-1/3" data-aos="fade-up" data-aos-delay="200">
                    <div className="p-6 border-b border-gray-100 dark:border-navy-700">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-1">
                            Proses Pencairan Dana
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Kelola pembayaran untuk proposal yang dipilih
                        </p>
                    </div>

                    <div className="p-6">
                        {/* Stepper for disbursement process */}
                        <div className="mb-6">
                            <div className="flex items-center">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${processingStep >= 1 ? 'bg-brand-500 text-white' : 'bg-gray-200 dark:bg-navy-700 text-gray-500 dark:text-gray-400'}`}>
                                    {processingStep > 1 ? <MdCheck className="h-5 w-5" /> : 1}
                                </div>
                                <div className={`flex-1 h-1 mx-2 ${processingStep >= 2 ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}></div>
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${processingStep >= 2 ? 'bg-brand-500 text-white' : 'bg-gray-200 dark:bg-navy-700 text-gray-500 dark:text-gray-400'}`}>
                                    {processingStep > 2 ? <MdCheck className="h-5 w-5" /> : 2}
                                </div>
                                <div className={`flex-1 h-1 mx-2 ${processingStep >= 3 ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}></div>
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${processingStep >= 3 ? 'bg-brand-500 text-white' : 'bg-gray-200 dark:bg-navy-700 text-gray-500 dark:text-gray-400'}`}>
                                    3
                                </div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                                <div className={`w-8 text-center ${processingStep >= 1 ? 'text-brand-500 dark:text-brand-400' : ''}`}>Pilih</div>
                                <div className={`w-8 text-center ${processingStep >= 2 ? 'text-brand-500 dark:text-brand-400' : ''}`}>Verifikasi</div>
                                <div className={`w-8 text-center ${processingStep >= 3 ? 'text-brand-500 dark:text-brand-400' : ''}`}>Proses</div>
                            </div>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Proposal yang Dipilih
                                </label>
                                <div className="p-4 bg-gray-50 dark:bg-navy-800 rounded-xl border border-gray-100 dark:border-navy-700 min-h-[100px] max-h-[150px] overflow-y-auto shadow-sm">
                                    {selectedProposals.length > 0 ? (
                                        <ul className="space-y-3">
                                            {selectedProposals.map((proposalId) => {
                                                const proposal = pendingDisbursements.find(p => p.id === proposalId);
                                                return proposal && (
                                                    <li key={proposalId} className="flex justify-between items-center p-2 rounded-lg bg-white dark:bg-navy-700 shadow-sm">
                                                        <div className="flex items-center">
                                                            <div className={`h-7 w-7 rounded-md flex items-center justify-center mr-2 ${getCategoryColor(proposal.category)}`}>
                                                                <MdRequestQuote className="h-4 w-4" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-navy-700 dark:text-white font-medium">{proposal.id}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">{proposal.researcher}</p>
                                                            </div>
                                                        </div>
                                                        <span className="text-xs font-medium text-brand-500">Rp {proposal.amount.toLocaleString()}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-20 text-center">
                                            <MdInfo className="h-5 w-5 text-gray-400 dark:text-gray-500 mb-1" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Pilih proposal untuk diproses
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        Metode Pembayaran
                                    </label>
                                    <select
                                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                                        defaultValue="bank"
                                    >
                                        <option value="bank">Transfer Bank</option>
                                        <option value="cash">Tunai</option>
                                        <option value="fintech">E-Wallet/Fintech</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        Tanggal Pencairan
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                                        defaultValue="2025-06-15"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Referensi Pembayaran
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                                    placeholder="Masukkan nomor referensi pembayaran"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Catatan Pencairan
                                </label>
                                <textarea
                                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                                    rows={3}
                                    placeholder="Tambahkan catatan untuk pencairan dana ini..."
                                ></textarea>
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row gap-3">
                                <button
                                    type="button"
                                    className="order-2 sm:order-1 px-4 py-2.5 rounded-xl bg-white dark:bg-navy-700 text-gray-700 dark:text-white border border-gray-200 dark:border-navy-600 hover:bg-gray-50 dark:hover:bg-navy-800 text-sm font-medium transition-colors flex-1 flex items-center justify-center gap-2"
                                    onClick={() => setSelectedProposals([])}
                                >
                                    <MdCancel className="h-4 w-4" />
                                    Batalkan
                                </button>
                                <button
                                    type="button"
                                    className="order-1 sm:order-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors flex-1 flex items-center justify-center gap-2"
                                    disabled={selectedProposals.length === 0}
                                >
                                    <MdOutlineFileUpload className="h-4 w-4" />
                                    Unggah Bukti & Proses
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 border-t border-gray-200 dark:border-navy-700 pt-4">
                            <h6 className="text-base font-medium text-navy-700 dark:text-white mb-3 flex items-center">
                                <MdInfo className="h-4 w-4 text-brand-500 mr-2" />
                                Informasi Pencairan
                            </h6>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                    <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-800/50">
                                        <MdAccountBalance className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="text-xs">
                                        <p className="text-blue-800 dark:text-blue-400 font-medium">Transfer Bank</p>
                                        <p className="text-gray-600 dark:text-gray-400">Diproses dalam 1-2 hari kerja</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                                    <div className="rounded-full p-2 bg-amber-100 dark:bg-amber-800/50">
                                        <MdWarning className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div className="text-xs">
                                        <p className="text-amber-800 dark:text-amber-400 font-medium">Dokumen Wajib</p>
                                        <p className="text-gray-600 dark:text-gray-400">Pastikan semua dokumen penelitian lengkap</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                    <div className="rounded-full p-2 bg-green-100 dark:bg-green-800/50">
                                        <MdPayment className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="text-xs">
                                        <p className="text-green-800 dark:text-green-400 font-medium">Pencairan Terjadwal</p>
                                        <p className="text-gray-600 dark:text-gray-400">Atur pencairan dana sesuai jadwal</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Modal for viewing payment proof */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-navy-800 rounded-2xl w-full max-w-lg shadow-xl">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                                    Bukti Pembayaran
                                </h3>
                                <button
                                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-navy-700"
                                    onClick={() => setShowUploadModal(false)}
                                >
                                    <MdCancel className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>

                            <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-6 mb-4">
                                <div className="flex justify-center items-center mb-4">
                                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                                        <MdReceipt className="h-7 w-7 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                                <div className="text-center mb-4">
                                    <h4 className="text-base font-medium text-navy-700 dark:text-white">
                                        transfer-receipt-01.pdf
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Bukti transfer untuk proposal PRP-2025-039
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg p-3 text-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Pembayaran berhasil dilakukan pada 05 May 2025
                                    </p>
                                    <button className="px-4 py-2 bg-brand-50 dark:bg-brand-500/20 text-brand-500 text-sm rounded-lg hover:bg-brand-100 dark:hover:bg-brand-500/30 transition-colors flex items-center justify-center gap-2 w-full">
                                        <MdOutlineFileUpload className="h-4 w-4" />
                                        Unduh Bukti Pembayaran
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    className="px-4 py-2 bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-white rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-navy-600"
                                    onClick={() => setShowUploadModal(false)}
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FundDisbursement;
