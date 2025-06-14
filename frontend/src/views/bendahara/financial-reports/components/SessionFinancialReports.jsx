import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdOutlineTextSnippet,
    MdFileDownload,
    MdArrowBack,
    MdFilterList,
    MdSearch,
    MdRefresh,
    MdVisibility,
    MdPrint,
    MdOutlineAttachMoney,
    MdHourglassTop,
    MdAssignment,
    MdCheck,
    MdCalendarToday
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const SessionFinancialReports = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSession, setFilterSession] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    // Dummy data for session financial reports
    const reportStats = {
        totalReports: 8,
        currentSessionReports: 2,
        completedReports: 6,
        pendingReports: 2
    };

    const sessionReports = [
        {
            id: "SFR-2025-S2",
            title: "Laporan Keuangan Sesi II 2025",
            period: "Juli - Desember 2025",
            sessionLabel: "Semester II 2025",
            sessionYear: "2025",
            sessionPeriod: "2",
            generatedDate: "Belum Final",
            status: "Draft",
            progress: 45,
            totalFunding: 2500000000,
            allocatedFunding: 2300000000,
            remainingBudget: 200000000,
            allocationRate: 92.0,
            approvedBy: "Belum Disetujui",
            fileFormat: "-",
            fileSize: "-"
        },
        {
            id: "SFR-2025-S1",
            title: "Laporan Keuangan Sesi I 2025",
            period: "Januari - Juni 2025",
            sessionLabel: "Semester I 2025",
            sessionYear: "2025",
            sessionPeriod: "1",
            generatedDate: "30 Jun 2025",
            status: "Final",
            progress: 100,
            totalFunding: 2500000000,
            allocatedFunding: 2350000000,
            remainingBudget: 150000000,
            allocationRate: 94.0,
            approvedBy: "Dr. Hadi Santoso, M.Ak",
            fileFormat: "PDF",
            fileSize: "3.8 MB"
        },
        {
            id: "SFR-2024-S2",
            title: "Laporan Keuangan Sesi II 2024",
            period: "Juli - Desember 2024",
            sessionLabel: "Semester II 2024",
            sessionYear: "2024",
            sessionPeriod: "2",
            generatedDate: "31 Des 2024",
            status: "Final",
            progress: 100,
            totalFunding: 2200000000,
            allocatedFunding: 2050000000,
            remainingBudget: 150000000,
            allocationRate: 93.2,
            approvedBy: "Dr. Hadi Santoso, M.Ak",
            fileFormat: "PDF",
            fileSize: "3.5 MB"
        },
        {
            id: "SFR-2024-S1",
            title: "Laporan Keuangan Sesi I 2024",
            period: "Januari - Juni 2024",
            sessionLabel: "Semester I 2024",
            sessionYear: "2024",
            sessionPeriod: "1",
            generatedDate: "30 Jun 2024",
            status: "Final",
            progress: 100,
            totalFunding: 2200000000,
            allocatedFunding: 1980000000,
            remainingBudget: 220000000,
            allocationRate: 90.0,
            approvedBy: "Dr. Hadi Santoso, M.Ak",
            fileFormat: "PDF",
            fileSize: "3.4 MB"
        },
        {
            id: "SFR-2023-S2",
            title: "Laporan Keuangan Sesi II 2023",
            period: "Juli - Desember 2023",
            sessionLabel: "Semester II 2023",
            sessionYear: "2023",
            sessionPeriod: "2",
            generatedDate: "31 Des 2023",
            status: "Final",
            progress: 100,
            totalFunding: 2000000000,
            allocatedFunding: 1950000000,
            remainingBudget: 50000000,
            allocationRate: 97.5,
            approvedBy: "Dr. Hadi Santoso, M.Ak",
            fileFormat: "PDF",
            fileSize: "3.2 MB"
        },
        {
            id: "SFR-2023-S1",
            title: "Laporan Keuangan Sesi I 2023",
            period: "Januari - Juni 2023",
            sessionLabel: "Semester I 2023",
            sessionYear: "2023",
            sessionPeriod: "1",
            generatedDate: "30 Jun 2023",
            status: "Final",
            progress: 100,
            totalFunding: 2000000000,
            allocatedFunding: 1850000000,
            remainingBudget: 150000000,
            allocationRate: 92.5,
            approvedBy: "Dr. Hadi Santoso, M.Ak",
            fileFormat: "PDF",
            fileSize: "3.1 MB"
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

    const handleReportSelect = (report) => {
        setSelectedReport(report);
    };

    const filteredReports = sessionReports.filter(report => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.period.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterSession === "all") return matchesSearch;
        if (filterSession === "2025") return matchesSearch && report.sessionYear === "2025";
        if (filterSession === "2024") return matchesSearch && report.sessionYear === "2024";
        if (filterSession === "2023") return matchesSearch && report.sessionYear === "2023";

        return matchesSearch;
    });

    const getAllocationRateColor = (rate) => {
        if (rate >= 90) return "text-green-600 dark:text-green-400";
        if (rate >= 80) return "text-blue-600 dark:text-blue-400";
        if (rate >= 70) return "text-amber-600 dark:text-amber-400";
        return "text-red-600 dark:text-red-400";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Final": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Draft": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link to="/bendahara/financial-reports" className="mr-3 p-2 bg-gray-100 dark:bg-navy-800 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700">
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Laporan Keuangan per Sesi</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Lihat dan kelola laporan keuangan per semester
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <Card extra="p-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdOutlineTextSnippet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Laporan</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {reportStats.totalReports}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                            <MdCalendarToday className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sesi Aktif</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {reportStats.currentSessionReports}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdHourglassTop className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Belum Final</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {reportStats.pendingReports}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/30">
                            <MdCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Telah Selesai</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {reportStats.completedReports}
                            </h4>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mb-5">
                <Card extra="p-6 lg:w-2/3" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                            Laporan Keuangan per Sesi
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
                                    value={filterSession}
                                    onChange={(e) => setFilterSession(e.target.value)}
                                >
                                    <option value="all">Semua Tahun</option>
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
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
                                        Periode
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Status
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Tanggal Laporan
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Alokasi Dana
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Tingkat Alokasi
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReports.length > 0 ? (
                                    filteredReports.map((report, index) => (
                                        <tr
                                            key={index}
                                            className={`hover:bg-gray-50 dark:hover:bg-navy-700 cursor-pointer ${selectedReport?.id === report.id ? 'bg-gray-50 dark:bg-navy-700' : ''}`}
                                            onClick={() => handleReportSelect(report)}
                                        >
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                <div>{report.sessionLabel}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{report.period}</div>
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                {report.generatedDate}
                                            </td>
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                {formatCurrency(report.allocatedFunding)}
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <div className={`font-medium ${getAllocationRateColor(report.allocationRate)}`}>
                                                    {report.allocationRate}%
                                                    <div className="w-24 h-1.5 bg-gray-200 dark:bg-navy-700 rounded-full mt-1.5">
                                                        <div className={`h-1.5 rounded-full ${report.allocationRate >= 90 ? 'bg-green-500' : report.allocationRate >= 80 ? 'bg-blue-500' : report.allocationRate >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${report.allocationRate}%` }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <div className="flex space-x-2">
                                                    <button className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100">
                                                        <MdVisibility size={16} />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100">
                                                        <MdFileDownload size={16} />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100">
                                                        <MdPrint size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-6 text-center text-gray-500 dark:text-gray-400">
                                            Tidak ada laporan yang sesuai dengan kriteria pencarian
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card extra="p-6 lg:w-1/3" data-aos="fade-up" data-aos-delay="350">
                    {selectedReport ? (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                    Detail Laporan
                                </h5>
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedReport.status)}`}>
                                    {selectedReport.status}
                                </span>
                            </div>

                            <div className="bg-gray-50 dark:bg-navy-800 rounded-lg p-4 mb-4">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-3">
                                    {selectedReport.title}
                                </h6>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">ID Laporan:</span>
                                        <span className="font-medium text-navy-700 dark:text-white">{selectedReport.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Periode:</span>
                                        <span className="font-medium text-navy-700 dark:text-white">{selectedReport.period}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Tanggal Dibuat:</span>
                                        <span className="font-medium text-navy-700 dark:text-white">{selectedReport.generatedDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Disetujui Oleh:</span>
                                        <span className="font-medium text-navy-700 dark:text-white">{selectedReport.approvedBy}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Format File:</span>
                                        <span className="font-medium text-navy-700 dark:text-white">{selectedReport.fileFormat} {selectedReport.fileSize !== "-" ? `(${selectedReport.fileSize})` : ""}</span>
                                    </div>
                                </div>
                            </div>

                            <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                Ringkasan Keuangan
                            </h6>
                            <div className="space-y-3 mb-4">
                                <div className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Total Anggaran:</span>
                                        <span className="text-sm font-medium text-navy-700 dark:text-white">
                                            {formatCurrency(selectedReport.totalFunding)}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Dana Teralokasi:</span>
                                        <span className="text-sm font-medium text-navy-700 dark:text-white">
                                            {formatCurrency(selectedReport.allocatedFunding)}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Sisa Anggaran:</span>
                                        <span className="text-sm font-medium text-navy-700 dark:text-white">
                                            {formatCurrency(selectedReport.remainingBudget)}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Tingkat Alokasi:</span>
                                        <span className={`text-sm font-medium ${getAllocationRateColor(selectedReport.allocationRate)}`}>
                                            {selectedReport.allocationRate}%
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 dark:bg-navy-800 rounded-full">
                                        <div className={`h-2 rounded-full ${selectedReport.allocationRate >= 90 ? 'bg-green-500' : selectedReport.allocationRate >= 80 ? 'bg-blue-500' : selectedReport.allocationRate >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${selectedReport.allocationRate}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            {selectedReport.status === "Draft" && (
                                <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                        <MdHourglassTop className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                        <span className="text-xs font-medium text-amber-800 dark:text-amber-400">Status Pengerjaan:</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 dark:bg-navy-800 rounded-full mb-1">
                                        <div className="h-2 rounded-full bg-amber-500" style={{ width: `${selectedReport.progress}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-amber-800 dark:text-amber-400">
                                        <span>Progress: {selectedReport.progress}%</span>
                                        <span>Estimasi selesai: 31 Des 2025</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2 mb-4">
                                <button className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg flex items-center gap-1.5">
                                    <MdVisibility size={16} />
                                    <span>Lihat Detail</span>
                                </button>
                                <button className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg flex items-center gap-1.5">
                                    <MdFileDownload size={16} />
                                    <span>Unduh Laporan</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <MdAssignment className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Pilih laporan untuk melihat detail
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default SessionFinancialReports;
