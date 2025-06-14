import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdAssessment,
    MdFileDownload,
    MdArrowBack,
    MdCalendarToday,
    MdFilterList,
    MdSearch,
    MdRefresh,
    MdOutlinePictureAsPdf,
    MdOutlineDocumentScanner,
    MdVisibility,
    MdPrint,
    MdAnalytics,
    MdCompareArrows,
    MdOutlineAttachMoney,
    MdRequestPage,
    MdCheckCircle
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const MonthlyFinancialReports = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterYear, setFilterYear] = useState("2025");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    // Dummy data for monthly financial reports
    const reportStats = {
        totalReports: 30,
        thisYearReports: 12,
        pendingReports: 2,
        completedReports: 28
    };

    const monthlyReports = [
        {
            id: "MFR-2025-06",
            title: "Laporan Keuangan Bulanan - Juni 2025",
            period: "Juni 2025",
            year: "2025",
            month: "06",
            generatedDate: "30 Jun 2025",
            status: "Final",
            totalFunding: 1250000000,
            totalDisbursement: 1180000000,
            remainingBudget: 70000000,
            disbursementRate: 94.4,
            approvedBy: "Dr. Hadi Santoso, M.Ak",
            fileFormat: "PDF",
            fileSize: "2.4 MB",
            detailsLink: "/reports/monthly/2025-06"
        },
        {
            id: "MFR-2025-05",
            title: "Laporan Keuangan Bulanan - Mei 2025",
            period: "Mei 2025",
            year: "2025",
            month: "05",
            generatedDate: "31 Mei 2025",
            status: "Final",
            totalFunding: 1250000000,
            totalDisbursement: 950000000,
            remainingBudget: 300000000,
            disbursementRate: 76.0,
            approvedBy: "Dr. Hadi Santoso, M.Ak",
            fileFormat: "PDF",
            fileSize: "2.2 MB",
            detailsLink: "/reports/monthly/2025-05"
        },
        {
            id: "MFR-2025-04",
            title: "Laporan Keuangan Bulanan - April 2025",
            period: "April 2025",
            year: "2025",
            month: "04",
            generatedDate: "30 Apr 2025",
            status: "Final",
            totalFunding: 1250000000,
            totalDisbursement: 850000000,
            remainingBudget: 400000000,
            disbursementRate: 68.0,
            approvedBy: "Dr. Hadi Santoso, M.Ak",
            fileFormat: "PDF",
            fileSize: "2.1 MB",
            detailsLink: "/reports/monthly/2025-04"
        },
        {
            id: "MFR-2025-03",
            title: "Laporan Keuangan Bulanan - Maret 2025",
            period: "Maret 2025",
            year: "2025",
            month: "03",
            generatedDate: "31 Mar 2025",
            status: "Final",
            totalFunding: 1250000000,
            totalDisbursement: 700000000,
            remainingBudget: 550000000,
            disbursementRate: 56.0,
            approvedBy: "Dr. Hadi Santoso, M.Ak",
            fileFormat: "PDF",
            fileSize: "1.9 MB",
            detailsLink: "/reports/monthly/2025-03"
        },
        {
            id: "MFR-2025-02",
            title: "Laporan Keuangan Bulanan - Februari 2025",
            period: "Februari 2025",
            year: "2025",
            month: "02",
            generatedDate: "28 Feb 2025",
            status: "Final",
            totalFunding: 1250000000,
            totalDisbursement: 500000000,
            remainingBudget: 750000000,
            disbursementRate: 40.0,
            approvedBy: "Dr. Hadi Santoso, M.Ak",
            fileFormat: "PDF",
            fileSize: "1.8 MB",
            detailsLink: "/reports/monthly/2025-02"
        },
        {
            id: "MFR-2025-01",
            title: "Laporan Keuangan Bulanan - Januari 2025",
            period: "Januari 2025",
            year: "2025",
            month: "01",
            generatedDate: "31 Jan 2025",
            status: "Final",
            totalFunding: 1250000000,
            totalDisbursement: 300000000,
            remainingBudget: 950000000,
            disbursementRate: 24.0,
            approvedBy: "Dr. Hadi Santoso, M.Ak",
            fileFormat: "PDF",
            fileSize: "1.7 MB",
            detailsLink: "/reports/monthly/2025-01"
        },
        {
            id: "MFR-2024-12",
            title: "Laporan Keuangan Bulanan - Desember 2024",
            period: "Desember 2024",
            year: "2024",
            month: "12",
            generatedDate: "31 Dec 2024",
            status: "Final",
            totalFunding: 1100000000,
            totalDisbursement: 1075000000,
            remainingBudget: 25000000,
            disbursementRate: 97.7,
            approvedBy: "Dr. Hadi Santoso, M.Ak",
            fileFormat: "PDF",
            fileSize: "2.0 MB",
            detailsLink: "/reports/monthly/2024-12"
        }
    ];

    // Key financial indicators
    const keyIndicators = [
        { name: "Total Pendanaan", value: "Rp 1,250,000,000", change: "+13.64%", isPositive: true },
        { name: "Total Pencairan", value: "Rp 1,180,000,000", change: "+9.77%", isPositive: true },
        { name: "Sisa Anggaran", value: "Rp 70,000,000", change: "-76.67%", isPositive: false },
        { name: "Tingkat Pencairan", value: "94.4%", change: "+24.03%", isPositive: true },
        { name: "Jumlah Proposal", value: "42", change: "+10.53%", isPositive: true },
        { name: "Rata-rata Dana per Proposal", value: "Rp 28,095,238", change: "+3.28%", isPositive: true }
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

    const filteredReports = monthlyReports.filter(report => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.period.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesYear = report.year === filterYear;

        return matchesSearch && matchesYear;
    });

    const getDisbursementRateColor = (rate) => {
        if (rate >= 85) return "text-green-600 dark:text-green-400";
        if (rate >= 70) return "text-blue-600 dark:text-blue-400";
        if (rate >= 50) return "text-amber-600 dark:text-amber-400";
        return "text-red-600 dark:text-red-400";
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
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Laporan Keuangan Bulanan</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Lihat dan kelola laporan keuangan bulanan
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <Card extra="p-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdAssessment className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tahun Ini</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {reportStats.thisYearReports}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdRequestPage className="h-6 w-6 text-amber-600 dark:text-amber-400" />
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
                            <MdCheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                            Laporan Keuangan Bulanan
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
                                    value={filterYear}
                                    onChange={(e) => setFilterYear(e.target.value)}
                                >
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
                                        Total Pencairan
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Tingkat Pencairan
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
                                                {report.period}
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{report.id}</div>
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                {report.generatedDate}
                                            </td>
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                {formatCurrency(report.totalDisbursement)}
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <div className={`font-medium ${getDisbursementRateColor(report.disbursementRate)}`}>
                                                    {report.disbursementRate}%
                                                    <div className="w-24 h-1.5 bg-gray-200 dark:bg-navy-700 rounded-full mt-1.5">
                                                        <div className={`h-1.5 rounded-full ${report.disbursementRate >= 85 ? 'bg-green-500' : report.disbursementRate >= 70 ? 'bg-blue-500' : report.disbursementRate >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${report.disbursementRate}%` }}></div>
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
                                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
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
                                        <span className="font-medium text-navy-700 dark:text-white">{selectedReport.fileFormat} ({selectedReport.fileSize})</span>
                                    </div>
                                </div>
                            </div>

                            <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                Ringkasan Keuangan
                            </h6>
                            <div className="space-y-3 mb-4">
                                <div className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Total Pendanaan:</span>
                                        <span className="text-sm font-medium text-navy-700 dark:text-white">
                                            {formatCurrency(selectedReport.totalFunding)}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Total Pencairan:</span>
                                        <span className="text-sm font-medium text-navy-700 dark:text-white">
                                            {formatCurrency(selectedReport.totalDisbursement)}
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
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Tingkat Pencairan:</span>
                                        <span className={`text-sm font-medium ${getDisbursementRateColor(selectedReport.disbursementRate)}`}>
                                            {selectedReport.disbursementRate}%
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 dark:bg-navy-800 rounded-full">
                                        <div className={`h-2 rounded-full ${selectedReport.disbursementRate >= 85 ? 'bg-green-500' : selectedReport.disbursementRate >= 70 ? 'bg-blue-500' : selectedReport.disbursementRate >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${selectedReport.disbursementRate}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 mb-4">
                                <button className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg flex items-center gap-1.5">
                                    <MdVisibility size={16} />
                                    <span>Lihat Detail</span>
                                </button>
                                <button className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg flex items-center gap-1.5">
                                    <MdFileDownload size={16} />
                                    <span>Unduh PDF</span>
                                </button>
                                <button className="px-3 py-2 bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 text-gray-700 dark:text-white text-xs font-medium rounded-lg flex items-center gap-1.5">
                                    <MdPrint size={16} />
                                    <span>Cetak</span>
                                </button>
                            </div>

                            <Link to={`/bendahara/financial-reports/export-financial-reports`} className="block text-xs text-center text-brand-500 hover:underline mt-3">
                                Lihat semua laporan keuangan
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
                                Indikator Keuangan Kunci
                            </h5>
                            <div className="space-y-3">
                                {keyIndicators.map((indicator, idx) => (
                                    <div key={idx} className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">{indicator.name}:</span>
                                            <div className="flex items-center">
                                                <span className="text-sm font-medium text-navy-700 dark:text-white mr-2">
                                                    {indicator.value}
                                                </span>
                                                <span className={`text-xs ${indicator.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                                                    {indicator.change}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <MdOutlineAttachMoney className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    <h6 className="text-sm font-medium text-blue-800 dark:text-blue-400">
                                        Pencairan Bulan Ini
                                    </h6>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Total pencairan bulan Juni 2025 sebesar Rp 1.180.000.000 mengalami peningkatan sebesar 24% dibandingkan bulan sebelumnya dengan tingkat penyerapan anggaran mencapai 94.4%.
                                </p>
                            </div>

                            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-5">
                                Pilih laporan bulanan untuk melihat detail
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default MonthlyFinancialReports;
