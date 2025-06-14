import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdVerified,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdArrowBack,
    MdCheckCircle,
    MdCancel,
    MdDocumentScanner,
    MdHistory,
    MdPerson,
    MdFilePresent,
    MdAttachFile,
    MdWarningAmber,
    MdDone,
    MdClose,
    MdOutlineVerified,
    MdFilterAlt,
    MdOutlineDownload,
    MdOutlineContentCopy,
    MdInfoOutline,
    MdInsertDriveFile,
    MdOpenInNew,
    MdOutlineFileDownload,
    MdOutlineDescription,
    MdOutlineCalendarToday,
    MdOutlinePayment,
    MdOutlineBadge,
    MdOutlineAssignment
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const TgrClearanceValidation = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedValidation, setSelectedValidation] = useState(null);
    const [showValidationModal, setShowValidationModal] = useState(false);
    const [validationAction, setValidationAction] = useState(null); // "approve" or "reject"
    const [validationNote, setValidationNote] = useState("");
    const [animateStats, setAnimateStats] = useState(false);

    // Dummy data for TGR clearance validation
    const validationStats = {
        totalRequests: 28,
        pendingValidation: 8,
        approvedRequests: 18,
        rejectedRequests: 2
    };

    const validationRequests = [
        {
            id: "VAL-2025-028",
            tgrId: "TGR-2025-016",
            proposalId: "PRP-2023-036",
            title: "Efektivitas Metode Pembelajaran Jarak Jauh pada Mahasiswa",
            researcher: "Dr. Andi Wijaya",
            faculty: "Fakultas Psikologi",
            nip: "198202182015041001",
            submissionDate: "14 Jun 2025",
            requestType: "Validasi Bebas TGR",
            status: "Menunggu Validasi",
            documents: [
                { name: "Bukti Pengembalian Dana", verified: false },
                { name: "Laporan Penggunaan Dana", verified: false },
                { name: "Bukti Pembayaran TGR", verified: false }
            ],
            notes: "Peneliti telah menyelesaikan seluruh kewajiban TGR dan mengajukan validasi status bebas TGR",
            amount: 12000000,
            paymentDate: "12 Jun 2025"
        },
        {
            id: "VAL-2025-027",
            tgrId: "TGR-2025-017",
            proposalId: "PRP-2023-039",
            title: "Analisis Big Data untuk Prediksi Perilaku Konsumen",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            nip: "197605142008012007",
            submissionDate: "12 Jun 2025",
            requestType: "Validasi Bebas TGR",
            status: "Menunggu Validasi",
            documents: [
                { name: "Bukti Pengembalian Dana", verified: true },
                { name: "Laporan Penggunaan Dana", verified: false },
                { name: "Surat Pernyataan", verified: true }
            ],
            notes: "Dana yang tidak terpakai telah dikembalikan dan laporan keuangan telah disubmit",
            amount: 8500000,
            paymentDate: "10 Jun 2025"
        },
        {
            id: "VAL-2025-026",
            tgrId: "TGR-2025-014",
            proposalId: "PRP-2023-032",
            title: "Pengembangan Bahan Bakar Alternatif dari Mikroalga",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            nip: "196504121992031002",
            submissionDate: "02 Jun 2025",
            requestType: "Validasi Bebas TGR",
            status: "Disetujui",
            documents: [
                { name: "Bukti Pengembalian Dana", verified: true },
                { name: "Laporan Penggunaan Dana", verified: true },
                { name: "Bukti Transfer", verified: true }
            ],
            notes: "Seluruh TGR telah diselesaikan sesuai ketentuan",
            amount: 25000000,
            paymentDate: "28 Mei 2025",
            validatorName: "Dra. Siska Widyawati, M.Ak",
            validationDate: "05 Jun 2025"
        },
        {
            id: "VAL-2025-025",
            tgrId: "TGR-2025-013",
            proposalId: "PRP-2023-030",
            title: "Pengaruh Media Sosial terhadap Perilaku Konsumen",
            researcher: "Dr. Siti Rahayu",
            faculty: "Fakultas Ekonomi",
            nip: "197709232005012001",
            submissionDate: "25 Mei 2025",
            requestType: "Validasi Bebas TGR",
            status: "Disetujui",
            documents: [
                { name: "Laporan Keuangan", verified: true },
                { name: "Bukti Pengeluaran", verified: true },
                { name: "Surat Pernyataan", verified: true }
            ],
            notes: "Dokumen telah dilengkapi sesuai permintaan, TGR dinyatakan selesai",
            validatorName: "Dra. Siska Widyawati, M.Ak",
            validationDate: "30 Mei 2025"
        },
        {
            id: "VAL-2025-024",
            tgrId: "TGR-2025-012",
            proposalId: "PRP-2023-028",
            title: "Inventarisasi Keanekaragaman Hayati Hutan Mangrove",
            researcher: "Dr. Ahmad Fauzi",
            faculty: "Fakultas Biologi",
            nip: "198507152009121004",
            submissionDate: "20 Mei 2025",
            requestType: "Validasi Bebas TGR",
            status: "Ditolak",
            documents: [
                { name: "Bukti Pengembalian Dana", verified: false },
                { name: "Laporan Keuangan", verified: false }
            ],
            notes: "Bukti pengembalian dana tidak valid dan laporan keuangan tidak lengkap",
            rejectionReason: "Dokumen tidak lengkap dan bukti pembayaran tidak valid",
            validatorName: "Drs. Bambang Sudrajat, M.Ak",
            validationDate: "23 Mei 2025"
        }
    ];

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true
        });

        // Trigger stats animation after component mount
        setTimeout(() => setAnimateStats(true), 300);
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleValidationSelect = (validation) => {
        setSelectedValidation(validation);
    };

    const filteredRequests = validationRequests.filter(request => {
        const matchesSearch =
            request.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.tgrId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === "all" || request.status.toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "disetujui": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "menunggu validasi": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "ditolak": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const toggleDocumentVerification = (docIndex) => {
        if (selectedValidation) {
            const updatedDocs = [...selectedValidation.documents];
            updatedDocs[docIndex].verified = !updatedDocs[docIndex].verified;

            const updatedValidation = {
                ...selectedValidation,
                documents: updatedDocs
            };

            setSelectedValidation(updatedValidation);
        }
    };

    const allDocumentsVerified = () => {
        return selectedValidation?.documents.every(doc => doc.verified);
    };

    const handleApproveClick = () => {
        setValidationAction("approve");
        setShowValidationModal(true);
    };

    const handleRejectClick = () => {
        setValidationAction("reject");
        setShowValidationModal(true);
    };

    const submitValidation = () => {
        // Handle validation submission
        console.log(`Validation ${validationAction}d with note: ${validationNote}`);
        setShowValidationModal(false);
        setValidationNote("");

        // In a real app, you would update the status here and refresh the data
    };

    // Function to calculate percentage for stats progress bars
    const getProgressPercentage = (value) => {
        return (value / validationStats.totalRequests) * 100;
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link
                        to="/bendahara/tgr-management"
                        className="mr-3 p-2.5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-navy-800 dark:to-navy-700 rounded-full hover:shadow-md hover:from-gray-100 hover:to-gray-200 dark:hover:from-navy-700 dark:hover:to-navy-600 transition-all duration-300"
                    >
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white tracking-tight">
                            Validasi Bebas TGR
                        </h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Validasi permintaan status bebas TGR dari peneliti
                        </p>
                    </div>
                </div>
            </div>

            {/* Modern Stats Cards with Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card extra="p-5 backdrop-blur-sm bg-white/60 dark:bg-navy-800/60 border border-gray-200/50 dark:border-navy-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                        <div className="flex items-center">
                            <div className="rounded-xl p-3.5 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 shadow-lg shadow-blue-500/30 dark:shadow-blue-700/30">
                                <MdDocumentScanner className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Total Permintaan
                                </p>
                                <div className="flex items-baseline">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                        {validationStats.totalRequests}
                                    </h4>
                                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">permintaan</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: animateStats ? "100%" : "0%" }}
                                transition={{ duration: 1.2, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full"
                            />
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card extra="p-5 backdrop-blur-sm bg-white/60 dark:bg-navy-800/60 border border-gray-200/50 dark:border-navy-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay="150">
                        <div className="flex items-center">
                            <div className="rounded-xl p-3.5 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 shadow-lg shadow-amber-500/30 dark:shadow-amber-700/30">
                                <MdWarningAmber className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Menunggu Validasi
                                </p>
                                <div className="flex items-baseline">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                        {validationStats.pendingValidation}
                                    </h4>
                                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">permintaan</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: animateStats ? `${getProgressPercentage(validationStats.pendingValidation)}%` : "0%" }}
                                transition={{ duration: 1.2, delay: 0.3 }}
                                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 rounded-full"
                            />
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card extra="p-5 backdrop-blur-sm bg-white/60 dark:bg-navy-800/60 border border-gray-200/50 dark:border-navy-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                        <div className="flex items-center">
                            <div className="rounded-xl p-3.5 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 shadow-lg shadow-green-500/30 dark:shadow-green-700/30">
                                <MdCheckCircle className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Disetujui
                                </p>
                                <div className="flex items-baseline">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                        {validationStats.approvedRequests}
                                    </h4>
                                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">permintaan</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: animateStats ? `${getProgressPercentage(validationStats.approvedRequests)}%` : "0%" }}
                                transition={{ duration: 1.2, delay: 0.4 }}
                                className="h-full bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 rounded-full"
                            />
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card extra="p-5 backdrop-blur-sm bg-white/60 dark:bg-navy-800/60 border border-gray-200/50 dark:border-navy-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay="250">
                        <div className="flex items-center">
                            <div className="rounded-xl p-3.5 bg-gradient-to-br from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 shadow-lg shadow-red-500/30 dark:shadow-red-700/30">
                                <MdCancel className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Ditolak
                                </p>
                                <div className="flex items-baseline">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                        {validationStats.rejectedRequests}
                                    </h4>
                                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">permintaan</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: animateStats ? `${getProgressPercentage(validationStats.rejectedRequests)}%` : "0%" }}
                                transition={{ duration: 1.2, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 rounded-full"
                            />
                        </div>
                    </Card>
                </motion.div>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mb-5">
                {/* Enhanced List View with Modern Table */}
                <Card extra="p-6 lg:w-2/3 backdrop-blur-sm bg-white/60 dark:bg-navy-800/60 border border-gray-200/50 dark:border-navy-700/50 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                                <MdVerified className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                Daftar Permintaan Validasi
                                <span className="ml-2 px-2.5 py-1 text-xs font-medium rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-500 dark:text-brand-400">
                                    {filteredRequests.length} Permintaan
                                </span>
                            </h5>
                        </div>

                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari validasi..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 backdrop-blur-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <select
                                    className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 appearance-none pr-8 transition-all duration-200 backdrop-blur-sm"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="menunggu validasi">Menunggu Validasi</option>
                                    <option value="disetujui">Disetujui</option>
                                    <option value="ditolak">Ditolak</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleRefresh}
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-navy-700 transition-all duration-200 backdrop-blur-sm tooltip-trigger"
                                    title="Refresh data"
                                >
                                    <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                                    <span className="tooltip">Refresh</span>
                                </button>
                                <button
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-navy-700 transition-all duration-200 backdrop-blur-sm tooltip-trigger"
                                    title="Filter lanjutan"
                                >
                                    <MdFilterAlt className="h-5 w-5" />
                                    <span className="tooltip">Filter</span>
                                </button>
                                <button
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-navy-700 transition-all duration-200 backdrop-blur-sm tooltip-trigger"
                                    title="Download data"
                                >
                                    <MdOutlineDownload className="h-5 w-5" />
                                    <span className="tooltip">Download</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] table-auto">
                            <thead>
                                <tr className="bg-gray-50/80 dark:bg-navy-800/50 backdrop-blur-sm rounded-lg">
                                    <th className="py-4 px-4 text-start text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        ID Validasi
                                    </th>
                                    <th className="py-4 px-4 text-start text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Peneliti
                                    </th>
                                    <th className="py-4 px-4 text-start text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Judul Penelitian
                                    </th>
                                    <th className="py-4 px-4 text-start text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Tanggal Pengajuan
                                    </th>
                                    <th className="py-4 px-4 text-start text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Status
                                    </th>
                                    <th className="py-4 px-4 text-start text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-navy-700">
                                {filteredRequests.length > 0 ? (
                                    filteredRequests.map((request, index) => (
                                        <motion.tr
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            key={index}
                                            className={`hover:bg-gray-50/90 dark:hover:bg-navy-700/90 backdrop-blur-sm cursor-pointer transition-all duration-200 ${selectedValidation?.id === request.id ? 'bg-blue-50/80 dark:bg-blue-900/20 border-l-4 border-l-blue-500 dark:border-l-blue-400' : ''
                                                }`}
                                            onClick={() => handleValidationSelect(request)}
                                        >
                                            <td className="py-4 px-4 text-sm font-medium text-navy-700 dark:text-white">
                                                <div className="flex items-center">
                                                    <span className="bg-gray-100 dark:bg-navy-800 px-2.5 py-1 rounded-md text-gray-700 dark:text-gray-300">{request.id}</span>
                                                    <div className="ml-2 text-xs text-gray-500 dark:text-gray-400">{request.tgrId}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                                                <div className="font-medium text-navy-700 dark:text-white">{request.researcher}</div>
                                                <div className="text-xs flex items-center mt-0.5">
                                                    <MdOutlineBadge className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                                    {request.faculty}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-sm font-medium text-navy-700 dark:text-white max-w-[200px] truncate">
                                                <div className="flex items-center">
                                                    <MdOutlineAssignment className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                                                    <span className="truncate">{request.title}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                                                <div className="flex items-center">
                                                    <MdOutlineCalendarToday className="h-4 w-4 mr-1.5 text-amber-500" />
                                                    {request.submissionDate}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-sm">
                                                <span className={`px-2.5 py-1.5 text-xs font-medium rounded-full flex items-center w-fit gap-1 ${getStatusColor(request.status)}`}>
                                                    {request.status === "Menunggu Validasi" && <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>}
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-sm">
                                                <div className="flex space-x-2">
                                                    <button className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors tooltip-trigger">
                                                        <MdDocumentScanner size={16} />
                                                        <span className="tooltip">Lihat Dokumen</span>
                                                    </button>
                                                    <button className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors tooltip-trigger">
                                                        <MdHistory size={16} />
                                                        <span className="tooltip">Riwayat</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center">
                                                <MdDocumentScanner className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                                                <p className="text-base font-medium">Tidak ada permintaan validasi</p>
                                                <p className="text-sm mt-1">Tidak ada data yang sesuai dengan kriteria pencarian Anda.</p>
                                                <button
                                                    className="mt-3 text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
                                                    onClick={() => {
                                                        setSearchTerm("");
                                                        setFilterStatus("all");
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
                </Card>

                {/* Enhanced Detail View with Glass Morphism */}
                <Card extra="p-6 lg:w-1/3 backdrop-blur-sm bg-white/60 dark:bg-navy-800/60 border border-gray-200/50 dark:border-navy-700/50 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="350">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineDescription className="h-5 w-5 mr-2 text-brand-500 dark:text-brand-400" />
                            Detail Validasi
                        </h5>
                        {selectedValidation && (
                            <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${getStatusColor(selectedValidation.status)} shadow-sm`}>
                                {selectedValidation.status}
                            </span>
                        )}
                    </div>

                    {selectedValidation ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-5"
                        >
                            {/* Researcher Info Card */}
                            <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-navy-800/80 dark:to-navy-700/80 border border-gray-100/50 dark:border-navy-700/50 shadow-sm hover:shadow transition-all duration-300">
                                <div className="flex items-center mb-3">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-500/20 dark:from-blue-500/20 dark:to-blue-600/20 flex items-center justify-center mr-3 shadow-sm border border-blue-100/50 dark:border-blue-900/20">
                                        <MdPerson className="h-7 w-7 text-blue-500 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-base text-navy-700 dark:text-white">
                                            {selectedValidation.researcher}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                                            <span>{selectedValidation.faculty}</span>
                                            <span className="mx-1">•</span>
                                            <span>NIP: {selectedValidation.nip}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Research Title */}
                                <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100/50 dark:border-blue-900/20">
                                    <h6 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        Judul Penelitian
                                    </h6>
                                    <p className="text-sm font-semibold text-navy-700 dark:text-white">
                                        {selectedValidation.title}
                                    </p>
                                    <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        <span className="flex items-center gap-1">
                                            <MdDocumentScanner className="h-3.5 w-3.5 text-brand-500" />
                                            {selectedValidation.tgrId}
                                        </span>
                                        <span>•</span>
                                        <span>{selectedValidation.proposalId}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            {selectedValidation.amount && (
                                <div className="p-4 rounded-xl bg-gradient-to-br from-green-50/80 to-green-100/30 dark:from-green-900/10 dark:to-green-900/5 border border-green-100/50 dark:border-green-900/20 shadow-sm backdrop-blur-sm">
                                    <h6 className="text-sm font-medium text-green-800 dark:text-green-400 mb-3 flex items-center">
                                        <MdOutlinePayment className="mr-2 h-4 w-4" />
                                        Informasi Pembayaran
                                    </h6>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-white/60 dark:bg-navy-800/60 rounded-lg shadow-sm backdrop-blur-sm">
                                            <span className="text-xs text-gray-600 dark:text-gray-400 block">Jumlah TGR:</span>
                                            <span className="text-sm font-bold text-green-600 dark:text-green-400 mt-1 block">
                                                Rp {selectedValidation.amount.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="p-3 bg-white/60 dark:bg-navy-800/60 rounded-lg shadow-sm backdrop-blur-sm">
                                            <span className="text-xs text-gray-600 dark:text-gray-400 block">Tanggal Pembayaran:</span>
                                            <span className="text-sm font-medium text-navy-700 dark:text-white mt-1 flex items-center">
                                                <MdOutlineCalendarToday className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                                                {selectedValidation.paymentDate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Documents Verification */}
                            <div className="rounded-xl bg-gray-50/80 dark:bg-navy-900/50 p-4 border border-gray-100/50 dark:border-navy-700/50 shadow-sm backdrop-blur-sm">
                                <h6 className="text-sm font-bold text-navy-700 dark:text-white mb-3 flex items-center">
                                    <MdAttachFile className="mr-2 h-4 w-4 text-gray-500" />
                                    Dokumen Verifikasi
                                </h6>
                                <div className="space-y-2.5">
                                    {selectedValidation.documents.map((doc, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                                            className="flex items-center justify-between p-3 bg-white/70 dark:bg-navy-800/70 rounded-lg border border-gray-200/50 dark:border-navy-700/50 shadow-sm hover:shadow hover:bg-white dark:hover:bg-navy-800 group transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <div className="flex items-center">
                                                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 mr-3">
                                                    <MdInsertDriveFile className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-navy-700 dark:text-white">{doc.name}</span>
                                                    <div className="flex gap-2 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="text-xs text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 flex items-center">
                                                            <MdOpenInNew className="h-3.5 w-3.5 mr-0.5" />
                                                            Lihat
                                                        </button>
                                                        <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center">
                                                            <MdOutlineFileDownload className="h-3.5 w-3.5 mr-0.5" />
                                                            Download
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {selectedValidation.status === "Menunggu Validasi" ? (
                                                <button
                                                    className={`w-9 h-9 rounded-full ${doc.verified
                                                        ? "bg-gradient-to-br from-green-100 to-green-200 text-green-600 dark:from-green-500/20 dark:to-green-600/20 dark:text-green-400"
                                                        : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 dark:from-gray-700/50 dark:to-gray-800/50 dark:text-gray-400"
                                                        } flex items-center justify-center transition-all duration-300 hover:shadow-md`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleDocumentVerification(idx);
                                                    }}
                                                >
                                                    {doc.verified ? <MdCheckCircle size={20} /> : <MdOutlineVerified size={20} />}
                                                </button>
                                            ) : (
                                                <div className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${doc.verified
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"}`}
                                                >
                                                    {doc.verified ?
                                                        <><MdCheckCircle size={14} /> Terverifikasi</> :
                                                        <><MdCancel size={14} /> Tidak Valid</>
                                                    }
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {selectedValidation.documents.length === 0 && (
                                    <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                        Tidak ada dokumen yang perlu diverifikasi
                                    </div>
                                )}
                            </div>

                            {/* Notes Section */}
                            <div className="rounded-xl bg-gray-50/80 dark:bg-navy-900/50 p-4 border border-gray-100/50 dark:border-navy-700/50 shadow-sm backdrop-blur-sm">
                                <h6 className="text-sm font-bold text-navy-700 dark:text-white mb-3">
                                    Catatan Validasi
                                </h6>
                                <div className="p-3 bg-white/70 dark:bg-navy-800/70 rounded-lg border border-gray-100/50 dark:border-navy-700/50 shadow-sm text-sm text-gray-600 dark:text-gray-400">
                                    {selectedValidation.notes || "Tidak ada catatan"}
                                </div>

                                {selectedValidation.rejectionReason && (
                                    <div className="mt-3 p-3 bg-gradient-to-r from-red-50 to-red-100/30 dark:from-red-900/10 dark:to-red-900/5 rounded-lg border border-red-100/50 dark:border-red-900/20 backdrop-blur-sm">
                                        <h6 className="text-xs font-medium text-red-800 dark:text-red-400 mb-1 flex items-center">
                                            <MdWarningAmber className="h-3.5 w-3.5 mr-1" />
                                            Alasan Penolakan:
                                        </h6>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            {selectedValidation.rejectionReason}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons for Pending Validation */}
                            {selectedValidation.status === "Menunggu Validasi" && (
                                <div className="pt-4 border-t border-gray-200 dark:border-navy-600">
                                    <textarea
                                        placeholder="Tambahkan catatan validasi..."
                                        className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 backdrop-blur-sm"
                                        rows={2}
                                        value={validationNote}
                                        onChange={(e) => setValidationNote(e.target.value)}
                                    />
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleApproveClick}
                                            className={`flex-1 px-4 py-2.5 rounded-xl ${!allDocumentsVerified()
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-navy-700 dark:text-gray-500"
                                                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-sm hover:shadow-md transition-all duration-300"}`}
                                            disabled={!allDocumentsVerified()}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <MdCheckCircle size={18} />
                                                <span>Setujui</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={handleRejectClick}
                                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <MdCancel size={18} />
                                                <span>Tolak</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Validator Information */}
                            {selectedValidation.validatorName && (
                                <div className="p-3 bg-gray-50/60 dark:bg-navy-800/60 rounded-xl backdrop-blur-sm border border-gray-100/50 dark:border-navy-700/50">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                            <MdPerson className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs">Divalidasi oleh:</span>
                                                <span className="text-xs font-medium text-navy-700 dark:text-white">{selectedValidation.validatorName}</span>
                                            </div>
                                            {selectedValidation.validationDate && (
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <MdOutlineCalendarToday className="h-3 w-3 text-gray-400" />
                                                    <span className="text-xs">{selectedValidation.validationDate}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="p-5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-navy-700 dark:to-navy-800 rounded-full mb-4 shadow-inner">
                                <MdDocumentScanner className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                            </div>
                            <p className="text-base text-gray-500 dark:text-gray-400 font-medium mb-2">
                                Pilih permintaan validasi
                            </p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs">
                                Silahkan pilih permintaan validasi dari daftar untuk melihat detail dan melakukan validasi
                            </p>
                        </div>
                    )}
                </Card>
            </div>

            {/* Validation Confirmation Modal */}
            {showValidationModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-navy-800 rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden"
                    >
                        <div className={`p-4 flex items-center ${validationAction === "approve" ? "bg-green-500" : "bg-red-500"}`}>
                            <div className="p-2 bg-white/20 rounded-full mr-3">
                                {validationAction === "approve" ? <MdCheckCircle className="h-6 w-6 text-white" /> : <MdCancel className="h-6 w-6 text-white" />}
                            </div>
                            <h3 className="text-lg font-bold text-white">
                                {validationAction === "approve" ? "Setujui Validasi" : "Tolak Validasi"}
                            </h3>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                {validationAction === "approve"
                                    ? "Apakah Anda yakin ingin menyetujui permintaan validasi ini? Validasi yang sudah disetujui tidak dapat dibatalkan."
                                    : "Apakah Anda yakin ingin menolak permintaan validasi ini? Berikan alasan penolakan yang jelas untuk peneliti."
                                }
                            </p>

                            <textarea
                                placeholder={validationAction === "approve"
                                    ? "Tambahkan catatan (opsional)"
                                    : "Berikan alasan penolakan (wajib)"}
                                className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                rows={3}
                                value={validationNote}
                                onChange={(e) => setValidationNote(e.target.value)}
                                required={validationAction === "reject"}
                            />

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowValidationModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={submitValidation}
                                    disabled={validationAction === "reject" && !validationNote.trim()}
                                    className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${validationAction === "approve"
                                        ? "bg-green-500 hover:bg-green-600"
                                        : "bg-red-500 hover:bg-red-600"
                                        } ${(validationAction === "reject" && !validationNote.trim()) ? "opacity-50 cursor-not-allowed" : ""}
                                    transition-colors`}
                                >
                                    {validationAction === "approve" ? "Setujui" : "Tolak"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            <style jsx>{`
                .tooltip-trigger {
                    position: relative;
                }
                
                .tooltip {
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: rgba(0,0,0,0.7);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.2s;
                    white-space: nowrap;
                    z-index: 20;
                }
                
                .tooltip-trigger:hover .tooltip {
                    opacity: 1;
                    visibility: visible;
                }
            `}</style>
        </div>
    );
};

export default TgrClearanceValidation;
