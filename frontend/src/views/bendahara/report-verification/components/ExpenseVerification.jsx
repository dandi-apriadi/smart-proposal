import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdReceiptLong,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdFileDownload,
    MdArrowBack,
    MdCheckCircle,
    MdHourglassEmpty,
    MdWarning,
    MdVisibility,
    MdVerified,
    MdThumbUp,
    MdThumbDown,
    MdAttachFile,
    MdReceipt,
    MdOutlinePictureAsPdf,
    MdImage
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const ExpenseVerification = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterExpenseType, setFilterExpenseType] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data for expense verification
    const expenseStats = {
        totalExpenses: 42,
        verifiedExpenses: 26,
        pendingVerification: 14,
        rejectedExpenses: 2
    };

    const expenseItems = [
        {
            id: "EXP-2025-042",
            proposalId: "PRP-2025-035",
            description: "Pembelian Sensor Monitoring Kualitas Air",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            submissionDate: "10 Jun 2025",
            amount: 12500000,
            expenseType: "Equipment",
            receiptType: "Invoice",
            status: "Menunggu Verifikasi",
            attachments: 2
        },
        {
            id: "EXP-2025-041",
            proposalId: "PRP-2025-032",
            description: "Bahan Kimia untuk Kultivasi Mikroalga",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            submissionDate: "09 Jun 2025",
            amount: 8750000,
            expenseType: "Material & Supplies",
            receiptType: "Invoice",
            status: "Menunggu Verifikasi",
            attachments: 1
        },
        {
            id: "EXP-2025-040",
            proposalId: "PRP-2025-039",
            description: "Lisensi Software Analisis Data BigQuery",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            submissionDate: "07 Jun 2025",
            amount: 15000000,
            expenseType: "Software",
            receiptType: "Digital Receipt",
            status: "Ditolak",
            attachments: 1,
            rejectionReason: "Bukti pembayaran tidak lengkap"
        },
        {
            id: "EXP-2025-039",
            proposalId: "PRP-2025-038",
            description: "Transportasi dan Akomodasi Survey Lapangan",
            researcher: "Prof. Dewi Lestari",
            faculty: "Fakultas Ekonomi",
            submissionDate: "05 Jun 2025",
            amount: 9200000,
            expenseType: "Travel & Accommodation",
            receiptType: "Multiple Receipts",
            status: "Terverifikasi",
            attachments: 6
        },
        {
            id: "EXP-2025-038",
            proposalId: "PRP-2025-028",
            description: "Server dan GPU untuk Computing",
            researcher: "Dr. Eko Prasetyo",
            faculty: "Fakultas Ilmu Komputer",
            submissionDate: "03 Jun 2025",
            amount: 27500000,
            expenseType: "Equipment",
            receiptType: "Invoice",
            status: "Terverifikasi",
            attachments: 3
        },
        {
            id: "EXP-2025-037",
            proposalId: "PRP-2025-025",
            description: "Honor untuk Tim Pengumpul Data",
            researcher: "Dr. Siti Aminah",
            faculty: "Fakultas Keguruan",
            submissionDate: "01 Jun 2025",
            amount: 6300000,
            expenseType: "Human Resources",
            receiptType: "Payment Voucher",
            status: "Terverifikasi",
            attachments: 4
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

    const filteredExpenses = expenseItems.filter(expense => {
        const matchesSearch =
            expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.proposalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === "all" || expense.status.toLowerCase() === filterStatus.toLowerCase();
        const matchesType = filterExpenseType === "all" || expense.expenseType.toLowerCase().includes(filterExpenseType.toLowerCase());

        return matchesSearch && matchesStatus && matchesType;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "terverifikasi": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "menunggu verifikasi": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "ditolak": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getExpenseTypeColor = (type) => {
        switch (type.toLowerCase()) {
            case "equipment": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "material & supplies": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "software": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
            case "travel & accommodation": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "human resources": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getReceiptTypeIcon = (type) => {
        switch (type.toLowerCase()) {
            case "invoice": return <MdReceipt className="h-4 w-4" />;
            case "digital receipt": return <MdOutlinePictureAsPdf className="h-4 w-4" />;
            case "multiple receipts": return <MdAttachFile className="h-4 w-4" />;
            case "payment voucher": return <MdImage className="h-4 w-4" />;
            default: return <MdReceipt className="h-4 w-4" />;
        }
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link to="/bendahara/report-verification" className="mr-3 p-2 bg-gray-100 dark:bg-navy-800 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700">
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Verifikasi Bukti Pengeluaran</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Verifikasi bukti pengeluaran dana penelitian yang diajukan oleh peneliti
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <Card extra="p-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdReceiptLong className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pengeluaran</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {expenseStats.totalExpenses}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                            <MdCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Terverifikasi</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {expenseStats.verifiedExpenses}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdHourglassEmpty className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Menunggu Verifikasi</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {expenseStats.pendingVerification}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-red-100 dark:bg-red-900/30">
                            <MdWarning className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ditolak</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {expenseStats.rejectedExpenses}
                            </h4>
                        </div>
                    </div>
                </Card>
            </div>

            <Card extra="p-6" data-aos="fade-up" data-aos-delay="300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                        Daftar Bukti Pengeluaran
                    </h5>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-grow w-full md:w-48">
                                <input
                                    type="text"
                                    placeholder="Cari pengeluaran..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <select
                                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">Semua Status</option>
                                <option value="terverifikasi">Terverifikasi</option>
                                <option value="menunggu verifikasi">Menunggu Verifikasi</option>
                                <option value="ditolak">Ditolak</option>
                            </select>
                            <select
                                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                value={filterExpenseType}
                                onChange={(e) => setFilterExpenseType(e.target.value)}
                            >
                                <option value="all">Semua Tipe</option>
                                <option value="equipment">Equipment</option>
                                <option value="material">Material & Supplies</option>
                                <option value="software">Software</option>
                                <option value="travel">Travel & Accommodation</option>
                                <option value="human">Human Resources</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
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
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    ID Pengeluaran
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Peneliti
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Deskripsi
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Jumlah
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Tipe Pengeluaran
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Bukti
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
                            {filteredExpenses.length > 0 ? (
                                filteredExpenses.map((expense, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-navy-700">
                                        <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                            {expense.id}
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{expense.proposalId}</div>
                                        </td>
                                        <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                            {expense.researcher}
                                            <div className="text-xs text-gray-500 dark:text-gray-500">{expense.faculty}</div>
                                        </td>
                                        <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white max-w-[180px] truncate">
                                            <span title={expense.description}>{expense.description}</span>
                                        </td>
                                        <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                            Rp {expense.amount.toLocaleString()}
                                        </td>
                                        <td className="py-[14px] text-sm">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getExpenseTypeColor(expense.expenseType)}`}>
                                                {expense.expenseType}
                                            </span>
                                        </td>
                                        <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                {getReceiptTypeIcon(expense.receiptType)}
                                                <span className="text-xs">{expense.receiptType}</span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {expense.attachments} lampiran
                                            </div>
                                        </td>
                                        <td className="py-[14px] text-sm">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(expense.status)}`}>
                                                {expense.status}
                                            </span>
                                            {expense.rejectionReason && (
                                                <div className="mt-1 text-xs text-red-500 dark:text-red-400 max-w-[150px]">
                                                    {expense.rejectionReason}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-[14px] text-sm">
                                            <div className="flex space-x-2">
                                                <Link to={`/bendahara/report-verification/expense-detail/${expense.id}`}>
                                                    <button className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100">
                                                        <MdVisibility size={16} />
                                                    </button>
                                                </Link>
                                                {expense.status === "Menunggu Verifikasi" && (
                                                    <>
                                                        <button className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100">
                                                            <MdThumbUp size={16} />
                                                        </button>
                                                        <button className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100">
                                                            <MdThumbDown size={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="py-6 text-center text-gray-500 dark:text-gray-400">
                                        Tidak ada pengeluaran yang sesuai dengan kriteria pencarian
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ExpenseVerification;
