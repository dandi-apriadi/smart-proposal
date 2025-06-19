import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    MdAttachMoney, MdOutlinePending, MdAssessment,
    MdReceiptLong, MdArrowUpward, MdArrowDownward,
    MdOutlineWarning, MdCalendarToday, MdAccountBalance,
    MdNotificationsActive, MdFilterList, MdRefresh
} from "react-icons/md";
import Card from "components/card";
import BendaharaGreeting from "./components/BendaharaGreeting";
import FundingSummary from "./components/FundingSummary";
import PendingProposals from "./components/PendingProposals";
import CurrentFinancialReports from "./components/CurrentFinancialReports";
import DisbursementStatus from "./components/DisbursementStatus";
import AOS from "aos";
import "aos/dist/aos.css";

const BendaharaDashboard = () => {
    const [timeFilter, setTimeFilter] = useState("monthly");
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data embedded directly in the component
    const fundingStats = {
        totalAllocated: 2750000000,
        totalAllocatedTrend: 5.2,
        disbursed: 1500000000,
        disbursedTrend: 7.8,
        pendingVerification: 8,
        pendingVerificationTrend: 2.1,
        tgrCases: 3,
        tgrCasesTrend: -1.5
    };

    const financialOverview = {
        totalAllocated: 2750000000,
        totalDisbursed: 1500000000,
        allocatedGrowth: 5.2,
        disbursedGrowth: 7.8,
        facultyDistribution: [
            {
                faculty: "Fakultas Teknik",
                allocated: 850000000,
                disbursed: 460000000,
            },
            {
                faculty: "Fakultas Ekonomi",
                allocated: 700000000,
                disbursed: 380000000,
            },
            {
                faculty: "Fakultas Kedokteran",
                allocated: 550000000,
                disbursed: 350000000,
            },
            {
                faculty: "Fakultas Hukum",
                allocated: 350000000,
                disbursed: 180000000,
            },
            {
                faculty: "Fakultas Psikologi",
                allocated: 300000000,
                disbursed: 130000000,
            },
        ]
    };

    const pendingProposals = [
        {
            id: "PRP-2025-042",
            title: "Pengembangan Machine Learning untuk Deteksi Penyakit Tanaman",
            researcher: "Dr. Budi Santoso",
            amount: 75000000,
            approvedDate: "10 Jun 2025",
            priority: "Tinggi"
        },
        {
            id: "PRP-2025-038",
            title: "Analisis Dampak Ekonomi dari Perubahan Iklim di Indonesia",
            researcher: "Prof. Dewi Lestari",
            amount: 65000000,
            approvedDate: "08 Jun 2025",
            priority: "Sedang"
        },
        {
            id: "PRP-2025-036",
            title: "Efektivitas Metode Pembelajaran Jarak Jauh pada Mahasiswa",
            researcher: "Dr. Andi Wijaya",
            amount: 50000000,
            approvedDate: "05 Jun 2025",
            priority: "Rendah"
        },
        {
            id: "PRP-2025-035",
            title: "Sistem Monitoring Kualitas Air Berbasis IoT",
            researcher: "Dr. Ratna Sari",
            amount: 82000000,
            approvedDate: "04 Jun 2025",
            priority: "Tinggi"
        },
        {
            id: "PRP-2025-032",
            title: "Pengembangan Bahan Bakar Alternatif dari Mikroalga",
            researcher: "Prof. Hendra Gunawan",
            amount: 95000000,
            approvedDate: "02 Jun 2025",
            priority: "Sedang"
        },
        {
            id: "PRP-2025-029",
            title: "Analisis Big Data untuk Prediksi Perilaku Konsumen",
            researcher: "Dr. Maya Putri",
            amount: 68000000,
            approvedDate: "28 Mei 2025",
            priority: "Sedang"
        }
    ]; const disbursementSchedule = [
        {
            phase: 1,
            name: "Pencairan Dana Tahap I",
            status: "Selesai",
            description: "Pencairan awal untuk semua proposal yang disetujui",
            date: "15 Maret 2025",
            progress: 100,
            amount: 800000000
        },
        {
            phase: 2,
            name: "Pencairan Dana Tahap II",
            status: "Aktif",
            description: "Pencairan berdasarkan evaluasi laporan kemajuan",
            date: "30 Juni 2025",
            progress: 65,
            amount: 450000000
        },
        {
            phase: 3,
            name: "Pencairan Dana Tahap III",
            status: "Belum Mulai",
            description: "Pencairan final setelah laporan akhir disetujui",
            date: "15 Oktober 2025",
            progress: 0,
            amount: 350000000
        }
    ];

    const recentTransactions = [
        {
            id: "TRX-2025-0178",
            researcher: "Dr. Budi Santoso",
            date: "12 Jun 2025",
            amount: 30000000,
            status: "Sukses"
        },
        {
            id: "TRX-2025-0177",
            researcher: "Prof. Dewi Lestari",
            date: "12 Jun 2025",
            amount: 25000000,
            status: "Sukses"
        },
        {
            id: "TRX-2025-0176",
            researcher: "Dr. Andi Wijaya",
            date: "10 Jun 2025",
            amount: 20000000,
            status: "Pending"
        },
        {
            id: "TRX-2025-0175",
            researcher: "Dr. Ratna Sari",
            date: "08 Jun 2025",
            amount: 35000000,
            status: "Sukses"
        },
        {
            id: "TRX-2025-0174",
            researcher: "Prof. Hendra Gunawan",
            date: "07 Jun 2025",
            amount: 40000000,
            status: "Gagal"
        },
        {
            id: "TRX-2025-0173",
            researcher: "Dr. Maya Putri",
            date: "05 Jun 2025",
            amount: 28000000,
            status: "Sukses"
        },
        {
            id: "TRX-2025-0172",
            researcher: "Dr. Eko Prasetyo",
            date: "03 Jun 2025",
            amount: 22000000,
            status: "Sukses"
        },
        {
            id: "TRX-2025-0171",
            researcher: "Prof. Sinta Wijaya",
            date: "01 Jun 2025",
            amount: 33000000,
            status: "Sukses"
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

    return (
        <div className="pt-5">
            {/* Greeting and Header Section */}
            <div className="mb-6" data-aos="fade-up">
                <BendaharaGreeting />
            </div>

            {/* Filters and controls */}
            <div className="flex flex-wrap items-center justify-between mb-6" data-aos="fade-up" data-aos-delay="100">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                    Overview Keuangan
                </h4>
                <div className="flex flex-wrap gap-3 items-center">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium ${timeFilter === "weekly" ? "bg-brand-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-800"} border border-gray-200 rounded-l-lg`}
                            onClick={() => setTimeFilter("weekly")}
                        >
                            Mingguan
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium ${timeFilter === "monthly" ? "bg-brand-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-800"} border-t border-b border-gray-200`}
                            onClick={() => setTimeFilter("monthly")}
                        >
                            Bulanan
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium ${timeFilter === "yearly" ? "bg-brand-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-800"} border border-gray-200 rounded-r-lg`}
                            onClick={() => setTimeFilter("yearly")}
                        >
                            Tahunan
                        </button>
                    </div>
                    <button
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 dark:border-navy-600 dark:text-white dark:hover:bg-navy-800"
                        onClick={handleRefresh}
                    >
                        <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                    </button>
                    <button
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 dark:border-navy-600 dark:text-white dark:hover:bg-navy-800"
                    >
                        <MdFilterList className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Total Dana Card */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="150"
                    className="flex items-center justify-between bg-white dark:bg-navy-700 p-4 rounded-2xl shadow-md overflow-hidden relative"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-white">Total Dana Dialokasikan</p>
                        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">Rp {fundingStats.totalAllocated.toLocaleString()}</h4>
                        <div className="flex items-center mt-1">
                            <span className={`text-xs font-medium ${fundingStats.totalAllocatedTrend >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {fundingStats.totalAllocatedTrend >= 0 ? "+" : ""}{fundingStats.totalAllocatedTrend}%
                            </span>
                            {fundingStats.totalAllocatedTrend >= 0 ?
                                <MdArrowUpward className="h-3 w-3 text-green-500" /> :
                                <MdArrowDownward className="h-3 w-3 text-red-500" />
                            }
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs periode lalu</span>
                        </div>
                    </div>
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <MdAccountBalance className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-green-500/10"></div>
                </div>

                {/* Dana Dicairkan */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="flex items-center justify-between bg-white dark:bg-navy-700 p-4 rounded-2xl shadow-md overflow-hidden relative"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-white">Dana Dicairkan</p>
                        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">Rp {fundingStats.disbursed.toLocaleString()}</h4>
                        <div className="flex items-center mt-1">
                            <span className={`text-xs font-medium ${fundingStats.disbursedTrend >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {fundingStats.disbursedTrend >= 0 ? "+" : ""}{fundingStats.disbursedTrend}%
                            </span>
                            {fundingStats.disbursedTrend >= 0 ?
                                <MdArrowUpward className="h-3 w-3 text-green-500" /> :
                                <MdArrowDownward className="h-3 w-3 text-red-500" />
                            }
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs periode lalu</span>
                        </div>
                    </div>
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <MdAttachMoney className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-blue-500/10"></div>
                </div>

                {/* Belum Terverifikasi */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="flex items-center justify-between bg-white dark:bg-navy-700 p-4 rounded-2xl shadow-md overflow-hidden relative"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-white">Menunggu Verifikasi</p>
                        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{fundingStats.pendingVerification} Laporan</h4>
                        <div className="flex items-center mt-1">
                            <span className={`text-xs font-medium ${fundingStats.pendingVerificationTrend <= 0 ? "text-green-500" : "text-red-500"}`}>
                                {fundingStats.pendingVerificationTrend >= 0 ? "+" : ""}{fundingStats.pendingVerificationTrend}%
                            </span>
                            {fundingStats.pendingVerificationTrend <= 0 ?
                                <MdArrowDownward className="h-3 w-3 text-green-500" /> :
                                <MdArrowUpward className="h-3 w-3 text-red-500" />
                            }
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs periode lalu</span>
                        </div>
                    </div>
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                        <MdOutlinePending className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-amber-500/10"></div>
                </div>

                {/* Kasus TGR */}
                <div
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className="flex items-center justify-between bg-white dark:bg-navy-700 p-4 rounded-2xl shadow-md overflow-hidden relative"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-white">Kasus TGR Aktif</p>
                        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">{fundingStats.tgrCases} Kasus</h4>
                        <div className="flex items-center mt-1">
                            <span className={`text-xs font-medium ${fundingStats.tgrCasesTrend <= 0 ? "text-green-500" : "text-red-500"}`}>
                                {fundingStats.tgrCasesTrend >= 0 ? "+" : ""}{fundingStats.tgrCasesTrend}%
                            </span>
                            {fundingStats.tgrCasesTrend <= 0 ?
                                <MdArrowDownward className="h-3 w-3 text-green-500" /> :
                                <MdArrowUpward className="h-3 w-3 text-red-500" />
                            }
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs periode lalu</span>
                        </div>
                    </div>
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                        <MdOutlineWarning className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-red-500/10"></div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left side - 8 columns */}
                <div className="lg:col-span-8 space-y-5">
                    {/* Funding Summary Component */}
                    <div data-aos="fade-up" data-aos-delay="350">
                        <FundingSummary financialOverview={financialOverview} />
                    </div>

                    {/* Disbursement Status Component */}
                    <div data-aos="fade-up" data-aos-delay="400">
                        <DisbursementStatus disbursementSchedule={disbursementSchedule} />
                    </div>

                    {/* Recent Transactions */}
                    <Card extra="p-4" data-aos="fade-up" data-aos-delay="450">
                        <div className="flex justify-between items-center mb-3">
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                Transaksi Terbaru
                            </h5>
                            <Link to="/bendahara/funding-management/payment-history" className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:hover:text-brand-400">
                                Lihat Semua
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[500px] table-auto">
                                <thead>
                                    <tr>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            ID Transaksi
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Peneliti
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Tanggal
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Jumlah
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTransactions.slice(0, 5).map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                {transaction.id}
                                            </td>
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                {transaction.researcher}
                                            </td>
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                {transaction.date}
                                            </td>
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                Rp {transaction.amount.toLocaleString()}
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${transaction.status === 'Sukses' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                    transaction.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                                                        transaction.status === 'Gagal' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                                            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                                                    }`}>
                                                    {transaction.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Right side - 4 columns */}
                <div className="lg:col-span-4 space-y-5">
                    {/* Pending Proposals Component */}
                    <div data-aos="fade-up" data-aos-delay="350">
                        <PendingProposals pendingProposals={pendingProposals} />
                    </div>

                    {/* Current Financial Reports Component */}
                    <div data-aos="fade-up" data-aos-delay="400">
                        <CurrentFinancialReports />
                    </div>

                    {/* Upcoming Deadlines Card */}
                    <Card extra="p-4" data-aos="fade-up" data-aos-delay="450">
                        <div className="flex items-center justify-between mb-3">
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                Tenggat Waktu Mendatang
                            </h5>
                            <div className="p-2.5 bg-brand-50 dark:bg-brand-500/20 rounded-full">
                                <MdCalendarToday className="h-5 w-5 text-brand-500 dark:text-brand-400" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-start p-3 bg-gray-50 dark:bg-navy-800 rounded-xl">
                                <div className="flex flex-col items-center mr-3">
                                    <span className="text-lg font-bold text-red-600">15</span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Jun</span>
                                </div>
                                <div>
                                    <h6 className="text-sm font-medium text-gray-900 dark:text-white">Laporan Dana Penelitian Q2</h6>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Batas waktu pengumpulan laporan keuangan Q2</p>
                                </div>
                                <div className="ml-auto flex flex-col items-end">
                                    <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900/20 rounded-full">3 hari lagi</span>
                                </div>
                            </div>

                            <div className="flex items-start p-3 bg-gray-50 dark:bg-navy-800 rounded-xl">
                                <div className="flex flex-col items-center mr-3">
                                    <span className="text-lg font-bold text-amber-600">22</span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Jun</span>
                                </div>
                                <div>
                                    <h6 className="text-sm font-medium text-gray-900 dark:text-white">Verifikasi Bukti Pengeluaran</h6>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Deadline validasi bukti penggunaan dana</p>
                                </div>
                                <div className="ml-auto flex flex-col items-end">
                                    <span className="px-2 py-1 text-xs font-medium text-amber-600 bg-amber-100 dark:bg-amber-900/20 rounded-full">10 hari lagi</span>
                                </div>
                            </div>

                            <div className="flex items-start p-3 bg-gray-50 dark:bg-navy-800 rounded-xl">
                                <div className="flex flex-col items-center mr-3">
                                    <span className="text-lg font-bold text-gray-600">30</span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Jun</span>
                                </div>
                                <div>
                                    <h6 className="text-sm font-medium text-gray-900 dark:text-white">Pencairan Tahap II</h6>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Jadwal pencairan dana tahap kedua</p>
                                </div>
                                <div className="ml-auto flex flex-col items-end">
                                    <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 dark:bg-gray-700/50 rounded-full">18 hari lagi</span>
                                </div>
                            </div>
                        </div>

                        <Link to="/bendahara/funding-management/disbursement-schedule" className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 dark:border-navy-700 py-2.5 text-sm font-medium text-brand-500 hover:bg-gray-50 dark:hover:bg-navy-800">
                            Lihat Semua Jadwal
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </Card>

                    {/* Urgent Notifications */}
                    <Card extra="p-4" data-aos="fade-up" data-aos-delay="500">
                        <div className="flex items-center justify-between mb-3">
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                Notifikasi Penting
                            </h5>
                            <div className="p-2.5 bg-red-50 dark:bg-red-900/20 rounded-full">
                                <MdNotificationsActive className="h-5 w-5 text-red-500" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl">
                                <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 mr-3">
                                    <MdOutlineWarning className="h-5 w-5 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h6 className="text-sm font-medium text-gray-900 dark:text-white">Dana penelitian belum terserap</h6>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                        5 penelitian belum melakukan pelaporan penggunaan dana tahap I
                                    </p>
                                    <div className="mt-1">
                                        <button className="text-xs font-medium text-red-600 dark:text-red-400">
                                            Kirim Pengingat
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl">
                                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 mr-3">
                                    <MdAssessment className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <h6 className="text-sm font-medium text-gray-900 dark:text-white">Laporan keuangan mendekati tenggat</h6>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                        8 laporan keuangan harus diselesaikan dalam 3 hari
                                    </p>
                                    <div className="mt-1">
                                        <button className="text-xs font-medium text-amber-600 dark:text-amber-400">
                                            Lihat Laporan
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-xl">
                                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
                                    <MdReceiptLong className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h6 className="text-sm font-medium text-gray-900 dark:text-white">Verifikasi bukti pengeluaran</h6>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                        12 bukti pengeluaran memerlukan verifikasi anda
                                    </p>
                                    <div className="mt-1">
                                        <button className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                            Verifikasi Sekarang
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to="/bendahara/notification-hub" className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 dark:border-navy-700 py-2.5 text-sm font-medium text-brand-500 hover:bg-gray-50 dark:hover:bg-navy-800">
                            Lihat Semua Notifikasi
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default BendaharaDashboard;
