import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdAssessment,
    MdCalendarToday,
    MdOutlineTextSnippet,
    MdFileDownload,
    MdSecurity,
    MdAnalytics,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdOutlinePictureAsPdf,
    MdOutlineInsertDriveFile,
    MdOutlineCalculate,
    MdOutlineFileCopy,
    MdCheckCircle
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const FinancialReports = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterPeriod, setFilterPeriod] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data for Financial Reports
    const reportStats = {
        totalReports: 36,
        monthlyReports: 12,
        quarterlyReports: 4,
        sessionReports: 8,
        yearlyReports: 2,
        auditReports: 10
    };

    const reportModules = [
        {
            title: "Laporan Keuangan Bulanan",
            description: "Laporan keuangan lengkap untuk setiap bulan tahun 2025",
            icon: <MdCalendarToday className="h-8 w-8 text-blue-500" />,
            path: "/bendahara/financial-reports/monthly-financial-reports",
            color: "bg-blue-50 dark:bg-blue-900/20",
            count: 12,
            delay: 100
        },
        {
            title: "Laporan Keuangan per Sesi",
            description: "Laporan keuangan untuk setiap sesi pendanaan penelitian",
            icon: <MdOutlineTextSnippet className="h-8 w-8 text-purple-500" />,
            path: "/bendahara/financial-reports/session-financial-reports",
            color: "bg-purple-50 dark:bg-purple-900/20",
            count: 8,
            delay: 150
        },
        {
            title: "Ekspor Laporan Keuangan",
            description: "Ekspor dan unduh laporan keuangan dalam berbagai format",
            icon: <MdFileDownload className="h-8 w-8 text-green-500" />,
            path: "/bendahara/financial-reports/export-financial-reports",
            color: "bg-green-50 dark:bg-green-900/20",
            count: 36,
            delay: 200
        },
        {
            title: "Laporan Audit Keuangan",
            description: "Laporan hasil audit keuangan internal dan eksternal",
            icon: <MdSecurity className="h-8 w-8 text-red-500" />,
            path: "/bendahara/financial-reports/audit-reports",
            color: "bg-red-50 dark:bg-red-900/20",
            count: 10,
            delay: 250
        },
        {
            title: "Analisis Penggunaan Dana",
            description: "Analisis komprehensif penggunaan dana penelitian",
            icon: <MdAnalytics className="h-8 w-8 text-amber-500" />,
            path: "/bendahara/financial-reports/fund-utilization-analysis",
            color: "bg-amber-50 dark:bg-amber-900/20",
            count: 6,
            delay: 300
        },
    ];

    const recentReports = [
        {
            id: "FRP-2025-036",
            title: "Laporan Keuangan Bulanan - Juni 2025",
            type: "Bulanan",
            period: "Juni 2025",
            generatedDate: "30 Jun 2025",
            status: "Difinalisasi",
            format: "PDF"
        },
        {
            id: "FRP-2025-035",
            title: "Laporan Keuangan Bulanan - Mei 2025",
            type: "Bulanan",
            period: "Mei 2025",
            generatedDate: "31 Mei 2025",
            status: "Difinalisasi",
            format: "XLSX"
        },
        {
            id: "FRP-2025-034",
            title: "Laporan Triwulan II 2025",
            type: "Triwulan",
            period: "Q2 2025",
            generatedDate: "30 Jun 2025",
            status: "Draft",
            format: "PDF"
        },
        {
            id: "FRP-2025-033",
            title: "Laporan Sesi Pendanaan - Batch 2 2025",
            type: "Sesi",
            period: "Batch 2 2025",
            generatedDate: "15 Jun 2025",
            status: "Difinalisasi",
            format: "PDF"
        },
        {
            id: "FRP-2025-032",
            title: "Laporan Audit Internal Q2 2025",
            type: "Audit",
            period: "Q2 2025",
            generatedDate: "28 Jun 2025",
            status: "Draft",
            format: "PDF"
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

    const filteredReports = recentReports.filter(report => {
        const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === "all" || report.type.toLowerCase() === filterType.toLowerCase();
        const matchesPeriod = filterPeriod === "all" || report.period.includes(filterPeriod);

        return matchesSearch && matchesType && matchesPeriod;
    });

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Laporan Keuangan</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Kelola dan akses laporan keuangan lengkap untuk pembiayaan penelitian
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-5">
                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdAssessment className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Total Laporan</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {reportStats.totalReports}
                    </h4>
                </Card>

                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-indigo-100 dark:bg-indigo-900/30">
                            <MdCalendarToday className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Laporan Bulanan</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {reportStats.monthlyReports}
                    </h4>
                </Card>

                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/30">
                            <MdOutlineCalculate className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Laporan Triwulan</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {reportStats.quarterlyReports}
                    </h4>
                </Card>

                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                            <MdOutlineTextSnippet className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Laporan per Sesi</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {reportStats.sessionReports}
                    </h4>
                </Card>

                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdOutlineFileCopy className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Laporan Tahunan</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {reportStats.yearlyReports}
                    </h4>
                </Card>

                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="350">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-red-100 dark:bg-red-900/30">
                            <MdSecurity className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Laporan Audit</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {reportStats.auditReports}
                    </h4>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-5">
                {reportModules.map((module, index) => (
                    <Link to={module.path} key={index}>
                        <Card
                            extra={`flex flex-col p-6 hover:shadow-xl transition-all duration-300 cursor-pointer h-full ${module.color}`}
                            data-aos="fade-up"
                            data-aos-delay={module.delay}
                        >
                            <div className="flex items-center justify-between">
                                <div className="rounded-full p-3 bg-white dark:bg-navy-700">
                                    {module.icon}
                                </div>
                                <span className="px-2.5 py-1 text-xs font-medium bg-white dark:bg-navy-700 text-gray-700 dark:text-white rounded-full">
                                    {module.count} Laporan
                                </span>
                            </div>
                            <h4 className="mt-4 text-xl font-bold text-navy-700 dark:text-white">
                                {module.title}
                            </h4>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {module.description}
                            </p>
                        </Card>
                    </Link>
                ))}
            </div>

            <Card extra="p-6" data-aos="fade-up" data-aos-delay="400">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                        Laporan Keuangan Terbaru
                    </h5>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex items-center">
                            <div className="relative flex-grow md:w-64">
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
                                className="ml-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="all">Semua Jenis</option>
                                <option value="bulanan">Bulanan</option>
                                <option value="triwulan">Triwulan</option>
                                <option value="sesi">Sesi</option>
                                <option value="audit">Audit</option>
                            </select>
                            <select
                                className="ml-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                value={filterPeriod}
                                onChange={(e) => setFilterPeriod(e.target.value)}
                            >
                                <option value="all">Semua Periode</option>
                                <option value="2025">2025</option>
                                <option value="Q2">Q2 2025</option>
                                <option value="Juni">Juni 2025</option>
                                <option value="Mei">Mei 2025</option>
                            </select>
                        </div>
                        <button
                            onClick={handleRefresh}
                            className="p-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800"
                        >
                            <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                        </button>
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
                                    Judul Laporan
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Jenis
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Periode
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Tanggal Dibuat
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Status
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Format
                                </th>
                                <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.length > 0 ? (
                                filteredReports.map((report, index) => (
                                    <tr key={index}>
                                        <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                            {report.id}
                                        </td>
                                        <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white max-w-[200px] truncate">
                                            <Link to={`/bendahara/financial-reports/detail/${report.id}`} className="hover:text-brand-500">
                                                {report.title}
                                            </Link>
                                        </td>
                                        <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                            {report.type}
                                        </td>
                                        <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                            {report.period}
                                        </td>
                                        <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                            {report.generatedDate}
                                        </td>
                                        <td className="py-[14px] text-sm">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${report.status === "Difinalisasi" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                                                    report.status === "Draft" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                                                        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                                }`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="py-[14px] text-sm">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${report.format === "PDF" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                                                    report.format === "XLSX" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                                                        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                                }`}>
                                                {report.format}
                                            </span>
                                        </td>
                                        <td className="py-[14px] text-sm">
                                            <div className="flex space-x-2">
                                                <button className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100">
                                                    <MdOutlinePictureAsPdf size={16} />
                                                </button>
                                                <button className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100">
                                                    <MdOutlineInsertDriveFile size={16} />
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

            <Card extra="p-6 mt-5" data-aos="fade-up" data-aos-delay="450">
                <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-6">
                    Generate Laporan Keuangan Baru
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-3">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                                <MdCalendarToday className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h6 className="text-base font-medium text-navy-700 dark:text-white">
                                Laporan Bulanan
                            </h6>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Generate laporan keuangan bulanan untuk periode tertentu
                        </p>
                        <button className="w-full bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Generate Laporan
                        </button>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-3">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                                <MdOutlineCalculate className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h6 className="text-base font-medium text-navy-700 dark:text-white">
                                Laporan Triwulan
                            </h6>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Generate laporan keuangan triwulan dengan rekapitulasi
                        </p>
                        <button className="w-full bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Generate Laporan
                        </button>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-3">
                            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mr-3">
                                <MdAnalytics className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <h6 className="text-base font-medium text-navy-700 dark:text-white">
                                Analisis Keuangan
                            </h6>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Generate laporan analisis penggunaan dana penelitian
                        </p>
                        <button className="w-full bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Generate Laporan
                        </button>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-3">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                                <MdOutlineTextSnippet className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h6 className="text-base font-medium text-navy-700 dark:text-white">
                                Laporan Kustom
                            </h6>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Generate laporan keuangan kustom dengan parameter pilihan
                        </p>
                        <button className="w-full bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Generate Laporan
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default FinancialReports;
