import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdOutlineReceiptLong,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdArrowBack,
    MdFileDownload,
    MdAttachMoney,
    MdMoneyOff,
    MdOutlineAddCircleOutline,
    MdOutlineRemoveCircleOutline,
    MdBarChart,
    MdPieChart,
    MdCheckCircle,
    MdCancel,
    MdAccountBalance,
    MdDateRange,
    MdToday,
    MdReceipt,
    MdSort,
    MdKeyboardArrowUp,
    MdKeyboardArrowDown,
    MdVisibility,
    MdInfo,
    MdPerson,
    MdCalendarToday,
    MdClose,
    MdAccountBalanceWallet,
    MdAssignment,
    MdInfoOutline
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const TransactionHistory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterDate, setFilterDate] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [sortField, setSortField] = useState("date");
    const [sortDirection, setSortDirection] = useState("desc");
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // Dummy data for transaction statistics
    const transactionStats = {
        totalTransactions: 456,
        disbursements: 228,
        refunds: 42,
        totalAmount: 4250000000,
        thisMonthAmount: 650000000
    };

    // Dummy data for transactions
    const transactions = [
        {
            id: "TRX-2025-456",
            type: "disbursement",
            proposalId: "PRP-2025-042",
            title: "Pengembangan Machine Learning untuk Deteksi Penyakit Tanaman",
            researcher: "Dr. Budi Santoso",
            faculty: "Fakultas Teknik",
            amount: 75000000,
            date: "15 Jun 2025",
            status: "Berhasil",
            reference: "REF-2025-456",
            bankAccount: "BNI - 0123456789",
            notes: "Pencairan dana penelitian tahap pertama",
            disburserName: "Dra. Siska Widyawati, M.Ak"
        },
        {
            id: "TRX-2025-455",
            type: "disbursement",
            proposalId: "PRP-2025-039",
            title: "Analisis Big Data untuk Prediksi Perilaku Konsumen",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            amount: 50000000,
            date: "14 Jun 2025",
            status: "Berhasil",
            reference: "REF-2025-455",
            bankAccount: "BCA - 1234567890",
            notes: "Pencairan dana penelitian tahap pertama",
            disburserName: "Dra. Siska Widyawati, M.Ak"
        },
        {
            id: "TRX-2025-454",
            type: "refund",
            proposalId: "PRP-2024-112",
            title: "Pengembangan Bahan Ajar Berbasis Multimedia untuk Pendidikan Dasar",
            researcher: "Prof. Dewi Lestari",
            faculty: "Fakultas Keguruan",
            amount: 15000000,
            date: "12 Jun 2025",
            status: "Berhasil",
            reference: "REF-2025-454",
            bankAccount: "BNI - 9876543210",
            notes: "Pengembalian dana penelitian yang tidak terpakai",
            disburserName: "Dra. Siska Widyawati, M.Ak"
        },
        {
            id: "TRX-2025-453",
            type: "disbursement",
            proposalId: "PRP-2025-036",
            title: "Efektivitas Metode Pembelajaran Jarak Jauh pada Mahasiswa",
            researcher: "Dr. Andi Wijaya",
            faculty: "Fakultas Psikologi",
            amount: 90000000,
            date: "10 Jun 2025",
            status: "Berhasil",
            reference: "REF-2025-453",
            bankAccount: "Mandiri - 1234567890",
            notes: "Pencairan dana penelitian tahap pertama",
            disburserName: "Dra. Siska Widyawati, M.Ak"
        },
        {
            id: "TRX-2025-452",
            type: "disbursement",
            proposalId: "PRP-2025-034",
            title: "Pengembangan Energi Terbarukan di Daerah Terpencil",
            researcher: "Dr. Adi Suryanto",
            faculty: "Fakultas Teknik",
            amount: 120000000,
            date: "08 Jun 2025",
            status: "Berhasil",
            reference: "REF-2025-452",
            bankAccount: "BRI - 0987654321",
            notes: "Pencairan dana penelitian tahap pertama",
            disburserName: "Dra. Siska Widyawati, M.Ak"
        },
        {
            id: "TRX-2025-451",
            type: "disbursement",
            proposalId: "PRP-2025-032",
            title: "Pengembangan Bahan Bakar Alternatif dari Mikroalga",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            amount: 85000000,
            date: "05 Jun 2025",
            status: "Gagal",
            reference: "REF-2025-451",
            bankAccount: "BCA - 9876543210",
            notes: "Pencairan dana penelitian tahap kedua - Gagal karena nomor rekening tidak valid",
            disburserName: "Dra. Siska Widyawati, M.Ak"
        },
        {
            id: "TRX-2025-450",
            type: "refund",
            proposalId: "PRP-2024-086",
            title: "Inventarisasi Keanekaragaman Hayati Hutan Mangrove",
            researcher: "Dr. Ahmad Fauzi",
            faculty: "Fakultas Biologi",
            amount: 12500000,
            date: "01 Jun 2025",
            status: "Berhasil",
            reference: "REF-2025-450",
            bankAccount: "Mandiri - 0123456789",
            notes: "Pengembalian dana penelitian yang tidak terpakai",
            disburserName: "Dra. Siska Widyawati, M.Ak"
        },
        {
            id: "TRX-2025-449",
            type: "disbursement",
            proposalId: "PRP-2025-030",
            title: "Pengaruh Media Sosial terhadap Perilaku Konsumen",
            researcher: "Dr. Siti Rahayu",
            faculty: "Fakultas Ekonomi",
            amount: 45000000,
            date: "28 Mei 2025",
            status: "Berhasil",
            reference: "REF-2025-449",
            bankAccount: "BNI - 1234567890",
            notes: "Pencairan dana penelitian tahap pertama",
            disburserName: "Dra. Siska Widyawati, M.Ak"
        },
        {
            id: "TRX-2025-448",
            type: "refund",
            proposalId: "PRP-2024-078",
            title: "Studi Komparatif Implementasi E-Government di Indonesia",
            researcher: "Dr. Bambang Sutrisno",
            faculty: "Fakultas Ilmu Administrasi",
            amount: 8500000,
            date: "25 Mei 2025",
            status: "Berhasil",
            reference: "REF-2025-448",
            bankAccount: "BRI - 9876543210",
            notes: "Pengembalian dana penelitian yang tidak terpakai",
            disburserName: "Dra. Siska Widyawati, M.Ak"
        },
        {
            id: "TRX-2025-447",
            type: "disbursement",
            proposalId: "PRP-2025-028",
            title: "Inventarisasi Keanekaragaman Hayati Hutan Mangrove",
            researcher: "Dr. Ahmad Fauzi",
            faculty: "Fakultas Biologi",
            amount: 65000000,
            date: "20 Mei 2025",
            status: "Berhasil",
            reference: "REF-2025-447",
            bankAccount: "Mandiri - 0123456789",
            notes: "Pencairan dana penelitian tahap pertama",
            disburserName: "Dra. Siska Widyawati, M.Ak"
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

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedTransactions = [...transactions].sort((a, b) => {
        let compareA, compareB;

        // Determine which field to sort by
        switch (sortField) {
            case 'id':
                compareA = a.id;
                compareB = b.id;
                break;
            case 'amount':
                compareA = a.amount;
                compareB = b.amount;
                break;
            case 'date':
            default:
                // Convert dates to sortable format (simple string comparison works for this format)
                compareA = a.date;
                compareB = b.date;
        }

        // Compare based on direction
        if (sortDirection === 'asc') {
            if (compareA < compareB) return -1;
            if (compareA > compareB) return 1;
            return 0;
        } else {
            if (compareA > compareB) return -1;
            if (compareA < compareB) return 1;
            return 0;
        }
    });

    const filteredTransactions = sortedTransactions.filter(transaction => {
        const matchesSearch =
            transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.proposalId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = filterCategory === "all" || transaction.type === filterCategory;
        let matchesDate = true;

        if (filterDate === "today") {
            matchesDate = transaction.date.includes("15 Jun 2025");
        } else if (filterDate === "this_week") {
            matchesDate = transaction.date.includes("Jun 2025");
        } else if (filterDate === "this_month") {
            matchesDate = transaction.date.includes("Jun 2025") || transaction.date.includes("May 2025");
        }

        return matchesSearch && matchesCategory && matchesDate;
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getTransactionIcon = (type, status) => {
        if (type === "disbursement") {
            return <MdOutlineAddCircleOutline className={`h-5 w-5 ${status === "Berhasil" ? "text-green-500" : "text-gray-500"}`} />;
        } else if (type === "refund") {
            return <MdOutlineRemoveCircleOutline className={`h-5 w-5 ${status === "Berhasil" ? "text-amber-500" : "text-gray-500"}`} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Berhasil": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Gagal": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            case "Pending": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link to="/bendahara/activity-tracker" className="mr-3 p-2 bg-gray-100 dark:bg-navy-800 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700">
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Riwayat Transaksi</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Lihat dan lacak riwayat transaksi keuangan dana penelitian
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <Card extra="p-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdOutlineReceiptLong className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Transaksi</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {transactionStats.totalTransactions}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                            <MdOutlineAddCircleOutline className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pencairan Dana</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {transactionStats.disbursements}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdOutlineRemoveCircleOutline className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pengembalian</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {transactionStats.refunds}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/30">
                            <MdAttachMoney className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Nilai</p>
                            <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                                {formatCurrency(transactionStats.totalAmount)}
                            </h4>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mb-5">
                <Card extra="p-6 lg:w-2/3" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                            Daftar Transaksi
                        </h5>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari transaksi..."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <select
                                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                >
                                    <option value="all">Semua Jenis</option>
                                    <option value="disbursement">Pencairan Dana</option>
                                    <option value="refund">Pengembalian Dana</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <select
                                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                >
                                    <option value="all">Semua Waktu</option>
                                    <option value="today">Hari Ini</option>
                                    <option value="this_week">Minggu Ini</option>
                                    <option value="this_month">Bulan Ini</option>
                                </select>
                                <button
                                    onClick={handleRefresh}
                                    className="p-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800"
                                >
                                    <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                                </button>
                                <button
                                    className="p-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800"
                                >
                                    <MdFileDownload className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] table-auto">
                            <thead>
                                <tr>
                                    <th
                                        className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white cursor-pointer"
                                        onClick={() => handleSort('id')}
                                    >
                                        <div className="flex items-center">
                                            ID Transaksi
                                            {sortField === 'id' && (
                                                sortDirection === 'asc' ?
                                                    <MdKeyboardArrowUp className="ml-1" /> :
                                                    <MdKeyboardArrowDown className="ml-1" />
                                            )}
                                        </div>
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Jenis
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Peneliti
                                    </th>
                                    <th
                                        className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white cursor-pointer"
                                        onClick={() => handleSort('amount')}
                                    >
                                        <div className="flex items-center">
                                            Jumlah
                                            {sortField === 'amount' && (
                                                sortDirection === 'asc' ?
                                                    <MdKeyboardArrowUp className="ml-1" /> :
                                                    <MdKeyboardArrowDown className="ml-1" />
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white cursor-pointer"
                                        onClick={() => handleSort('date')}
                                    >
                                        <div className="flex items-center">
                                            Tanggal
                                            {sortField === 'date' && (
                                                sortDirection === 'asc' ?
                                                    <MdKeyboardArrowUp className="ml-1" /> :
                                                    <MdKeyboardArrowDown className="ml-1" />
                                            )}
                                        </div>
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Status
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((transaction, index) => (
                                        <tr
                                            key={index}
                                            className={`hover:bg-gray-50 dark:hover:bg-navy-700 ${selectedTransaction?.id === transaction.id ? "bg-gray-50 dark:bg-navy-700" : ""}`}
                                            onClick={() => setSelectedTransaction(transaction)}
                                        >
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                {transaction.id}
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.proposalId}</div>
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <div className="flex items-center">
                                                    {getTransactionIcon(transaction.type, transaction.status)}
                                                    <span className="ml-2">
                                                        {transaction.type === "disbursement" ? "Pencairan" : "Pengembalian"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white max-w-[150px] truncate">
                                                {transaction.researcher}
                                                <div className="text-xs text-gray-500 dark:text-gray-400 font-normal">{transaction.faculty}</div>
                                            </td>
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                {formatCurrency(transaction.amount)}
                                            </td>
                                            <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                {transaction.date}
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <div className="flex space-x-2">
                                                    <button
                                                        className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedTransaction(transaction);
                                                        }}
                                                    >
                                                        <MdVisibility size={16} />
                                                    </button>
                                                    <button
                                                        className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // Would handle receipt download
                                                        }}
                                                    >
                                                        <MdReceipt size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="py-6 text-center text-gray-500 dark:text-gray-400">
                                            Tidak ada transaksi yang sesuai dengan kriteria pencarian
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Menampilkan {filteredTransactions.length} dari {transactions.length} transaksi
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white disabled:opacity-50" disabled>
                                Sebelumnya
                            </button>
                            <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white">
                                Berikutnya
                            </button>
                        </div>
                    </div>
                </Card>

                <Card extra="p-6 lg:w-1/3" data-aos="fade-up" data-aos-delay="350">
                    {selectedTransaction ? (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                    Detail Transaksi
                                </h5>
                                <button
                                    onClick={() => setSelectedTransaction(null)}
                                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-navy-700"
                                >
                                    <MdClose size={20} className="text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <div className={`p-3 rounded-full ${selectedTransaction.type === "disbursement" ? "bg-green-100 dark:bg-green-900/30" : "bg-amber-100 dark:bg-amber-900/30"}`}>
                                    {selectedTransaction.type === "disbursement" ? (
                                        <MdOutlineAddCircleOutline className={`h-8 w-8 ${selectedTransaction.status === "Berhasil" ? "text-green-600 dark:text-green-400" : "text-gray-500"}`} />
                                    ) : (
                                        <MdOutlineRemoveCircleOutline className={`h-8 w-8 ${selectedTransaction.status === "Berhasil" ? "text-amber-600 dark:text-amber-400" : "text-gray-500"}`} />
                                    )}
                                </div>
                                <div className="text-right">
                                    <span className="block text-base font-semibold text-navy-700 dark:text-white">
                                        {formatCurrency(selectedTransaction.amount)}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {selectedTransaction.date}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                    <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-3">
                                        Informasi Transaksi
                                    </h6>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">ID Transaksi:</span>
                                            <span className="text-navy-700 dark:text-white font-medium">{selectedTransaction.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Jenis:</span>
                                            <span className="text-navy-700 dark:text-white font-medium">
                                                {selectedTransaction.type === "disbursement" ? "Pencairan Dana" : "Pengembalian Dana"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Referensi:</span>
                                            <span className="text-navy-700 dark:text-white font-medium">{selectedTransaction.reference}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                            <span className={`font-medium ${selectedTransaction.status === "Berhasil" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                                                {selectedTransaction.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                    <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-3">
                                        Detail Proposal
                                    </h6>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">ID Proposal:</span>
                                            <span className="text-navy-700 dark:text-white font-medium">{selectedTransaction.proposalId}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 dark:text-gray-400">Judul:</span>
                                            <p className="mt-1 text-navy-700 dark:text-white">{selectedTransaction.title}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Peneliti:</span>
                                            <span className="text-navy-700 dark:text-white font-medium">{selectedTransaction.researcher}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Fakultas:</span>
                                            <span className="text-navy-700 dark:text-white">{selectedTransaction.faculty}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                    <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-3">
                                        Informasi Pembayaran
                                    </h6>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Rekening:</span>
                                            <span className="text-navy-700 dark:text-white">{selectedTransaction.bankAccount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Petugas:</span>
                                            <span className="text-navy-700 dark:text-white">{selectedTransaction.disburserName}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 dark:text-gray-400">Catatan:</span>
                                            <p className="mt-1 text-navy-700 dark:text-white">{selectedTransaction.notes}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <button className="w-full px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                                        <MdReceipt size={16} />
                                        <span>Lihat Bukti Transaksi</span>
                                    </button>
                                    <button className="w-full px-4 py-2 bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 text-gray-700 dark:text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                                        <MdFileDownload size={16} />
                                        <span>Unduh Laporan</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <MdInfoOutline className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-lg font-medium text-navy-700 dark:text-white mb-2">
                                Detail Transaksi
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Pilih transaksi dari tabel untuk melihat detailnya
                            </p>
                        </div>
                    )}
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <Card extra="p-6" data-aos="fade-up" data-aos-delay="400">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-base font-bold text-navy-700 dark:text-white">
                            Statistik Transaksi
                        </h5>
                        <div className="flex gap-2">
                            <button className="p-1.5 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-navy-600">
                                <MdBarChart size={18} />
                            </button>
                            <button className="p-1.5 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-navy-600">
                                <MdPieChart size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="h-64 bg-gray-50 dark:bg-navy-800 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400">Grafik statistik transaksi akan ditampilkan di sini</p>
                    </div>
                </Card>

                <Card extra="p-6" data-aos="fade-up" data-aos-delay="450">
                    <h5 className="text-base font-bold text-navy-700 dark:text-white mb-4">
                        Ringkasan Pencairan Bulan Ini
                    </h5>
                    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <MdAccountBalance className="h-8 w-8 text-green-500 dark:text-green-400 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Pencairan Juni</p>
                                <p className="text-xl font-bold text-green-700 dark:text-green-400">{formatCurrency(transactionStats.thisMonthAmount)}</p>
                            </div>
                        </div>
                        <button className="p-1.5 rounded-lg bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-600">
                            <MdVisibility size={18} />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-white dark:bg-navy-700 border border-gray-100 dark:border-navy-600 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                                    <MdAccountBalanceWallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-navy-700 dark:text-white">Fakultas Teknik</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">5 transaksi</p>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-navy-700 dark:text-white">
                                {formatCurrency(280000000)}
                            </p>
                        </div>

                        <div className="p-3 rounded-lg bg-white dark:bg-navy-700 border border-gray-100 dark:border-navy-600 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                                    <MdAccountBalanceWallet className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-navy-700 dark:text-white">Fakultas Ekonomi</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">3 transaksi</p>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-navy-700 dark:text-white">
                                {formatCurrency(95000000)}
                            </p>
                        </div>

                        <div className="p-3 rounded-lg bg-white dark:bg-navy-700 border border-gray-100 dark:border-navy-600 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-3">
                                    <MdAccountBalanceWallet className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-navy-700 dark:text-white">Fakultas Psikologi</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">2 transaksi</p>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-navy-700 dark:text-white">
                                {formatCurrency(140000000)}
                            </p>
                        </div>

                        <Link to="/bendahara/financial-reports/fund-utilization-analysis" className="block text-brand-500 hover:underline text-center text-sm mt-3">
                            Lihat analisis lengkap
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TransactionHistory;
