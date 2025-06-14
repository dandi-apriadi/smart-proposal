import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdMonetizationOn,
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
    MdEdit,
    MdReceipt,
    MdPieChart,
    MdAttachMoney,
    MdAnalytics
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const FundUtilizationReports = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data for fund utilization reports
    const utilizationStats = {
        totalReports: 28,
        verifiedReports: 20,
        pendingVerification: 6,
        rejectedReports: 2
    };

    const utilizationReports = [
        {
            id: "UTL-2025-028",
            proposalId: "PRP-2025-035",
            title: "Laporan Penggunaan Dana: Sistem Monitoring Kualitas Air Berbasis IoT",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            submissionDate: "08 Jun 2025",
            category: "Equipment",
            amountUsed: 38000000,
            totalAllocated: 82000000,
            status: "Menunggu Verifikasi",
            notes: "Pembelian peralatan monitoring kualitas air"
        },
        {
            id: "UTL-2025-027",
            proposalId: "PRP-2025-032",
            title: "Laporan Penggunaan Dana: Pengembangan Bahan Bakar Alternatif dari Mikroalga",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            submissionDate: "06 Jun 2025",
            category: "Materials & Supplies",
            amountUsed: 45000000,
            totalAllocated: 95000000,
            status: "Terverifikasi",
            notes: "Pembelian bahan baku dan peralatan laboratorium"
        },
        {
            id: "UTL-2025-026",
            proposalId: "PRP-2025-039",
            title: "Laporan Penggunaan Dana: Analisis Big Data untuk Prediksi Perilaku Konsumen",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            submissionDate: "02 Jun 2025",
            category: "Software & Computing",
            amountUsed: 32000000,
            totalAllocated: 68000000,
            status: "Ditolak",
            notes: "Lisensi software analisis data dan server computing",
            rejectionReason: "Pembelian lisensi software tidak sesuai dengan rencana anggaran"
        },
        {
            id: "UTL-2025-025",
            proposalId: "PRP-2025-038",
            title: "Laporan Penggunaan Dana: Analisis Dampak Ekonomi dari Perubahan Iklim di Indonesia",
            researcher: "Prof. Dewi Lestari",
            faculty: "Fakultas Ekonomi",
            submissionDate: "28 Mei 2025",
            category: "Field Research",
            amountUsed: 30000000,
            totalAllocated: 65000000,
            status: "Terverifikasi",
            notes: "Biaya penelitian lapangan di 5 provinsi"
        },
        {
            id: "UTL-2025-024",
            proposalId: "PRP-2025-028",
            title: "Laporan Penggunaan Dana: Pengembangan Sistem Keamanan Jaringan Berbasis AI",
            researcher: "Dr. Eko Prasetyo",
            faculty: "Fakultas Ilmu Komputer",
            submissionDate: "25 Mei 2025",
            category: "Equipment & Software",
            amountUsed: 40000000,
            totalAllocated: 88000000,
            status: "Terverifikasi",
            notes: "Pembelian server dan pengembangan software AI"
        },
        {
            id: "UTL-2025-023",
            proposalId: "PRP-2025-025",
            title: "Laporan Penggunaan Dana: Studi Perbandingan Metode Pengajaran di Era Digital",
            researcher: "Dr. Siti Aminah",
            faculty: "Fakultas Keguruan",
            submissionDate: "22 Mei 2025",
            category: "Survey & Data Collection",
            amountUsed: 25000000,
            totalAllocated: 55000000,
            status: "Menunggu Verifikasi",
            notes: "Biaya survei dan pengumpulan data dari 20 sekolah"
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

    const filteredReports = utilizationReports.filter(report => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.proposalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === "all" || report.status.toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "terverifikasi": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "menunggu verifikasi": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "ditolak": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getCategoryColor = (category) => {
        switch (category.toLowerCase()) {
            case "equipment":
            case "equipment & software":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "materials & supplies":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "software & computing":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
            case "field research":
                return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "survey & data collection":
                return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
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
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Laporan Penggunaan Dana</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Verifikasi laporan rincian penggunaan dana penelitian dari para peneliti
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <Card extra="p-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdMonetizationOn className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Laporan</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {utilizationStats.totalReports}
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
                                {utilizationStats.verifiedReports}
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
                                {utilizationStats.pendingVerification}
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
                                {utilizationStats.rejectedReports}
                            </h4>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mb-5">
                <Card extra="p-6 lg:w-2/3" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                            Daftar Laporan Penggunaan Dana
                        </h5>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari laporan..."
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
                                        ID Laporan
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        ID Proposal
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Judul Laporan
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Peneliti
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Kategori
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Dana Terpakai
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
                                {filteredReports.length > 0 ? (
                                    filteredReports.map((report, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-navy-700">
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                {report.id}
                                            </td>
                                            <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                <Link to={`/bendahara/funding-management/proposal/${report.proposalId}`} className="hover:text-brand-500">
                                                    {report.proposalId}
                                                </Link>
                                            </td>
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white max-w-[200px] truncate">
                                                <Link to={`/bendahara/report-verification/detail/${report.id}`} className="hover:text-brand-500">
                                                    {report.title}
                                                </Link>
                                            </td>
                                            <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                {report.researcher}
                                                <span className="block text-xs text-gray-500">{report.faculty}</span>
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getCategoryColor(report.category)}`}>
                                                    {report.category}
                                                </span>
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-navy-700 dark:text-white">
                                                        Rp {report.amountUsed.toLocaleString()}
                                                    </span>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <div className="w-24 bg-gray-200 dark:bg-navy-700 rounded-full h-1.5 mr-2">
                                                            <div
                                                                className="bg-brand-500 h-1.5 rounded-full"
                                                                style={{ width: `${(report.amountUsed / report.totalAllocated) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {Math.round((report.amountUsed / report.totalAllocated) * 100)}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <div className="flex space-x-2">
                                                    <Link to={`/bendahara/report-verification/detail/${report.id}`}>
                                                        <button className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100">
                                                            <MdVisibility size={16} />
                                                        </button>
                                                    </Link>
                                                    {report.status === "Menunggu Verifikasi" && (
                                                        <button className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100">
                                                            <MdVerified size={16} />
                                                        </button>
                                                    )}
                                                    <button className="p-1.5 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-800">
                                                        <MdReceipt size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="py-6 text-center text-gray-500 dark:text-gray-400">
                                            Tidak ada laporan yang sesuai dengan kriteria pencarian
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card extra="p-6 lg:w-1/3" data-aos="fade-up" data-aos-delay="350">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
                        Ringkasan Penggunaan Dana
                    </h5>

                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">Berdasarkan Kategori</h6>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Equipment</span>
                                </div>
                                <span className="text-xs font-medium text-navy-700 dark:text-white">35%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Materials & Supplies</span>
                                </div>
                                <span className="text-xs font-medium text-navy-700 dark:text-white">28%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Software & Computing</span>
                                </div>
                                <span className="text-xs font-medium text-navy-700 dark:text-white">15%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Field Research</span>
                                </div>
                                <span className="text-xs font-medium text-navy-700 dark:text-white">12%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">Survey & Data Collection</span>
                                </div>
                                <span className="text-xs font-medium text-navy-700 dark:text-white">10%</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-navy-700 pt-4 mb-6">
                        <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Statistik Verifikasi</h6>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-50 dark:bg-navy-800 rounded-lg border border-gray-100 dark:border-navy-700">
                                <div className="flex items-center justify-between mb-2">
                                    <MdVerified className="h-5 w-5 text-green-500" />
                                    <span className="text-lg font-bold text-green-500">{utilizationStats.verifiedReports}</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Laporan Terverifikasi</p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-navy-800 rounded-lg border border-gray-100 dark:border-navy-700">
                                <div className="flex items-center justify-between mb-2">
                                    <MdWarning className="h-5 w-5 text-amber-500" />
                                    <span className="text-lg font-bold text-amber-500">{utilizationStats.pendingVerification}</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Menunggu Verifikasi</p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-navy-800 rounded-lg border border-gray-100 dark:border-navy-700">
                                <div className="flex items-center justify-between mb-2">
                                    <MdAttachMoney className="h-5 w-5 text-brand-500" />
                                    <span className="text-lg font-bold text-brand-500">72%</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Realisasi Anggaran</p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-navy-800 rounded-lg border border-gray-100 dark:border-navy-700">
                                <div className="flex items-center justify-between mb-2">
                                    <MdAnalytics className="h-5 w-5 text-blue-500" />
                                    <span className="text-lg font-bold text-blue-500">24</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Proposal Aktif</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-navy-700 pt-4">
                        <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Aktivitas Terbaru</h6>
                        <div className="space-y-2">
                            {utilizationReports.slice(0, 3).map((report, index) => (
                                <div key={index} className="p-2 bg-gray-50 dark:bg-navy-800 rounded-lg border border-gray-100 dark:border-navy-700">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-navy-700 dark:text-white">{report.researcher}</span>
                                        <span className={`text-xs ${report.status === "Terverifikasi" ? "text-green-500" : report.status === "Menunggu Verifikasi" ? "text-amber-500" : "text-red-500"}`}>
                                            {report.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">{report.title}</p>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-xs text-brand-500">Rp {report.amountUsed.toLocaleString()}</span>
                                        <span className="text-xs text-gray-500">{report.submissionDate}</span>
                                    </div>
                                </div>
                            ))}
                            <Link to="/bendahara/report-verification/fund-utilization-reports" className="block text-xs text-brand-500 hover:underline text-center mt-2">
                                Lihat Semua Laporan
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default FundUtilizationReports;
