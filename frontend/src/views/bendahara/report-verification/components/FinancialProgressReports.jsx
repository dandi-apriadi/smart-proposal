import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdAssessment,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdFileDownload,
    MdArrowBack,
    MdCheckCircle,
    MdHourglassEmpty,
    MdWarning,
    MdEdit,
    MdVerified,
    MdMoreVert,
    MdVisibility,
    MdHistory,
    MdOutlineAttachMoney,
    MdCalendarToday,
    MdPerson,
    MdOutlineTrendingUp,
    MdOutlineFilterAlt,
    MdKeyboardArrowDown,
    MdDescription,
    MdOutlineDashboardCustomize
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import Chart from 'react-apexcharts';

const FinancialProgressReports = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState("table"); // table or card

    // Dummy data for financial progress reports
    const reportsData = [
        {
            id: "RKP-2025-001",
            proposalId: "PRP-2025-042",
            title: "Laporan Kemajuan Penelitian AI",
            researcher: "Dr. Budi Santoso",
            faculty: "Fakultas Teknik",
            submissionDate: "15 Mei 2025",
            period: "April 2025",
            budgetUsed: 50000000,
            totalBudget: 75000000,
            priority: "Tinggi",
            status: "Terverifikasi"
        },
        {
            id: "RKP-2025-002",
            proposalId: "PRP-2025-036",
            title: "Laporan Kemajuan Penelitian Psikologi",
            researcher: "Dr. Andi Wijaya",
            faculty: "Fakultas Psikologi",
            submissionDate: "20 Mei 2025",
            period: "April 2025",
            budgetUsed: 30000000,
            totalBudget: 50000000,
            priority: "Sedang",
            status: "Menunggu Verifikasi"
        },
        {
            id: "RKP-2025-003",
            proposalId: "PRP-2025-034",
            title: "Laporan Kemajuan Energi Terbarukan",
            researcher: "Dr. Adi Suryanto",
            faculty: "Fakultas Teknik",
            submissionDate: "10 Mei 2025",
            period: "April 2025",
            budgetUsed: 20000000,
            totalBudget: 35000000,
            priority: "Rendah",
            status: "Ditolak"
        }
    ];

    // Summary stats
    const reportStats = {
        total: reportsData.length,
        verified: reportsData.filter(r => r.status === "Terverifikasi").length,
        pending: reportsData.filter(r => r.status === "Menunggu Verifikasi").length,
        rejected: reportsData.filter(r => r.status === "Ditolak").length,
        totalBudgetUsed: reportsData.reduce((sum, report) => sum + report.budgetUsed, 0),
        totalBudget: reportsData.reduce((sum, report) => sum + report.totalBudget, 0)
    };

    // Budget usage chart config
    const budgetChartOptions = {
        chart: {
            type: 'donut',
            fontFamily: 'inherit',
            foreColor: '#697a8d',
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        colors: ['#10b981', '#6366f1', '#ef4444'],
        labels: ['Terverifikasi', 'Menunggu', 'Ditolak'],
        plotOptions: {
            pie: {
                donut: {
                    size: '78%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: () => reportStats.total,
                            fontSize: '22px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 600,
                            color: '#1e293b'
                        },
                        value: {
                            fontSize: '16px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            color: '#64748b',
                            offsetY: 8
                        }
                    }
                }
            }
        },
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            fillSeriesColor: false,
            style: {
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif'
            }
        },
        stroke: {
            width: 3,
            colors: ['#fff']
        }
    };

    const budgetChartSeries = [
        reportStats.verified,
        reportStats.pending,
        reportStats.rejected
    ];

    useEffect(() => {
        AOS.init({
            duration: 800,
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

    const filteredReports = reportsData.filter(report => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.proposalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.id.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterStatus === "all") return matchesSearch;
        else if (filterStatus === "terverifikasi") return matchesSearch && report.status === "Terverifikasi";
        else if (filterStatus === "menunggu verifikasi") return matchesSearch && report.status === "Menunggu Verifikasi";
        else if (filterStatus === "ditolak") return matchesSearch && report.status === "Ditolak";

        return matchesSearch;
    });

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "Tinggi": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            case "Sedang": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "Rendah": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Terverifikasi": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Menunggu Verifikasi": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
            case "Ditolak": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Terverifikasi": return <MdCheckCircle className="h-4 w-4" />;
            case "Menunggu Verifikasi": return <MdHourglassEmpty className="h-4 w-4" />;
            case "Ditolak": return <MdWarning className="h-4 w-4" />;
            default: return null;
        }
    };

    return (
        <div className="pt-8 px-2">
            {/* Hero Section with improved gradient and visual elements */}
            <div className="relative mb-10 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 rounded-3xl p-8 text-white overflow-hidden shadow-xl" data-aos="fade-up">
                <div className="absolute inset-0 bg-pattern-dots opacity-10 mix-blend-soft-light"></div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-white to-transparent opacity-10 rounded-full transform translate-x-32 -translate-y-32 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-white to-transparent opacity-10 rounded-full transform -translate-x-20 translate-y-20 blur-xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-400 opacity-20 rounded-full transform translate-x-10 translate-y-10 blur-lg"></div>

                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="mb-6 lg:mb-0 lg:pr-8 max-w-2xl">
                        <div className="flex items-center mb-4">
                            <Link to="/bendahara/report-verification" className="mr-4 p-2.5 backdrop-blur-md bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-300 shadow-sm hover:shadow">
                                <MdArrowBack className="h-5 w-5 text-white" />
                            </Link>
                            <h1 className="text-3xl font-bold tracking-tight">Laporan Kemajuan Keuangan</h1>
                        </div>
                        <p className="text-blue-100 max-w-lg text-base">
                            Kelola dan verifikasi laporan kemajuan keuangan dari semua proposal yang didanai dengan mudah dan efisien
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="backdrop-blur-md bg-white/20 rounded-2xl py-3.5 px-5 shadow-sm hover:shadow-md transition-all duration-300">
                            <p className="text-sm text-blue-100 font-medium">Dana Terlapor</p>
                            <div className="flex items-center mt-2 gap-2">
                                <MdOutlineAttachMoney className="h-5 w-5" />
                                <p className="text-2xl font-bold">Rp {(reportStats.totalBudgetUsed / 1000000).toFixed(0)}M</p>
                            </div>
                        </div>
                        <div className="backdrop-blur-md bg-white/20 rounded-2xl py-3.5 px-5 shadow-sm hover:shadow-md transition-all duration-300">
                            <p className="text-sm text-blue-100 font-medium">Persentase Penggunaan</p>
                            <div className="flex items-center mt-2 gap-2">
                                <MdOutlineTrendingUp className="h-5 w-5" />
                                <p className="text-2xl font-bold">
                                    {Math.round((reportStats.totalBudgetUsed / reportStats.totalBudget) * 100)}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards - Redesigned with more modern look */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300 overflow-hidden relative" data-aos="fade-up" data-aos-delay="100">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10 rounded-full -mr-8 -mt-8 opacity-70"></div>
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-blue-100 dark:bg-blue-900/30 shadow-sm">
                            <MdDescription className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4 relative z-10">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Laporan</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {reportStats.total}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 mr-1"></span>
                                <span className="text-xs text-blue-600 dark:text-blue-400">
                                    Periode Mei 2025
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300 overflow-hidden relative" data-aos="fade-up" data-aos-delay="150">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-green-50 to-transparent dark:from-green-900/10 rounded-full -mr-8 -mt-8 opacity-70"></div>
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-green-100 dark:bg-green-900/30 shadow-sm">
                            <MdCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4 relative z-10">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Terverifikasi</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {reportStats.verified}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                                <span className="text-xs text-green-600 dark:text-green-400">
                                    {Math.round((reportStats.verified / reportStats.total) * 100)}% dari total
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300 overflow-hidden relative" data-aos="fade-up" data-aos-delay="200">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-indigo-50 to-transparent dark:from-indigo-900/10 rounded-full -mr-8 -mt-8 opacity-70"></div>
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-indigo-100 dark:bg-indigo-900/30 shadow-sm">
                            <MdHourglassEmpty className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="ml-4 relative z-10">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Menunggu Verifikasi</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {reportStats.pending}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500 mr-1"></span>
                                <span className="text-xs text-indigo-600 dark:text-indigo-400">
                                    {Math.round((reportStats.pending / reportStats.total) * 100)}% dari total
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300 overflow-hidden relative" data-aos="fade-up" data-aos-delay="250">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-red-50 to-transparent dark:from-red-900/10 rounded-full -mr-8 -mt-8 opacity-70"></div>
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-red-100 dark:bg-red-900/30 shadow-sm">
                            <MdWarning className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4 relative z-10">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Ditolak</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {reportStats.rejected}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mr-1"></span>
                                <span className="text-xs text-red-600 dark:text-red-400">
                                    {Math.round((reportStats.rejected / reportStats.total) * 100)}% dari total
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                <Card extra="p-6 xl:col-span-2 shadow-sm hover:shadow-md transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                        <div className="flex items-center gap-3">
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                Daftar Laporan Kemajuan Keuangan
                            </h5>
                            <div className="flex gap-2 items-center">
                                <button
                                    onClick={() => setViewMode("table")}
                                    className={`p-1.5 rounded-lg transition-colors ${viewMode === "table"
                                        ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                                        : "bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400"
                                        }`}
                                    title="Tampilan Tabel"
                                >
                                    <MdFilterList className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode("card")}
                                    className={`p-1.5 rounded-lg transition-colors ${viewMode === "card"
                                        ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                                        : "bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400"
                                        }`}
                                    title="Tampilan Kartu"
                                >
                                    <MdOutlineDashboardCustomize className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MdSearch className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari laporan..."
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MdOutlineFilterAlt className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        className="appearance-none pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="all">Semua Status</option>
                                        <option value="terverifikasi">Terverifikasi</option>
                                        <option value="menunggu verifikasi">Menunggu Verifikasi</option>
                                        <option value="ditolak">Ditolak</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <MdKeyboardArrowDown className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleRefresh}
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors shadow-sm"
                                    title="Refresh data"
                                >
                                    <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                                </button>
                                <button
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors shadow-sm"
                                    title="Download data"
                                >
                                    <MdFileDownload className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {viewMode === "table" ? (
                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-navy-700 shadow-sm">
                            <table className="w-full min-w-[800px] table-auto">
                                <thead className="bg-gray-50 dark:bg-navy-800">
                                    <tr>
                                        <th className="px-4 py-3.5 text-start rounded-tl-lg text-sm font-medium text-gray-600 dark:text-gray-300">
                                            ID Laporan
                                        </th>
                                        <th className="px-4 py-3.5 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Judul & Peneliti
                                        </th>
                                        <th className="px-4 py-3.5 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Tanggal
                                        </th>
                                        <th className="px-4 py-3.5 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Penggunaan Dana
                                        </th>
                                        <th className="px-4 py-3.5 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Status
                                        </th>
                                        <th className="px-4 py-3.5 text-start text-sm font-medium text-gray-600 dark:text-gray-300 rounded-tr-lg">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReports.length > 0 ? (
                                        filteredReports.map((report, index) => (
                                            <tr key={index} className="border-t border-gray-100 dark:border-navy-700 hover:bg-gray-50/70 dark:hover:bg-navy-800/70 transition-colors">
                                                <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                                    <Link to={`/bendahara/report-verification/detail/${report.id}`} className="hover:text-indigo-500">
                                                        {report.id}
                                                        <div className="text-xs text-indigo-500 dark:text-indigo-400">{report.proposalId}</div>
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <Link
                                                        to={`/bendahara/report-verification/detail/${report.id}`}
                                                        className="text-sm font-medium text-navy-700 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 line-clamp-2 max-w-[260px]"
                                                    >
                                                        {report.title}
                                                    </Link>
                                                    <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                        <MdPerson className="h-3.5 w-3.5 mr-1" />
                                                        {report.researcher}
                                                        <span className="mx-1.5">•</span>
                                                        {report.faculty}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col text-xs">
                                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                            <MdCalendarToday className="h-3.5 w-3.5 mr-1.5" />
                                                            <span>{report.submissionDate}</span>
                                                        </div>
                                                        <div className="mt-1 text-gray-500 dark:text-gray-500">
                                                            Periode: {report.period}
                                                        </div>
                                                        <span className={`mt-1 px-2 py-0.5 w-fit rounded-full text-[10px] ${getPriorityColor(report.priority)}`}>
                                                            Prioritas: {report.priority}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col">
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                                {Math.round((report.budgetUsed / report.totalBudget) * 100)}%
                                                            </span>
                                                            <span className="text-xs font-medium text-indigo-500">
                                                                {(report.budgetUsed / 1000000).toFixed(1)}M
                                                            </span>
                                                        </div>
                                                        <div className="w-full h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-2 rounded-full ${report.status === 'Ditolak'
                                                                    ? 'bg-red-500'
                                                                    : report.status === 'Terverifikasi'
                                                                        ? 'bg-green-500'
                                                                        : 'bg-indigo-500'
                                                                    }`}
                                                                style={{
                                                                    width: `${(report.budgetUsed / report.totalBudget) * 100}%`,
                                                                    transition: 'width 1s ease-in-out'
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            Total: {(report.totalBudget / 1000000).toFixed(1)}M
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={`px-3 py-1.5 text-xs font-medium rounded-full flex items-center w-fit gap-1.5 ${getStatusColor(report.status)}`}>
                                                        {getStatusIcon(report.status)}
                                                        {report.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex space-x-2">
                                                        <Link to={`/bendahara/report-verification/detail/${report.id}`}>
                                                            <button className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors shadow-sm">
                                                                <MdVisibility size={18} />
                                                            </button>
                                                        </Link>
                                                        {report.status === "Menunggu Verifikasi" && (
                                                            <button className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors shadow-sm">
                                                                <MdVerified size={18} />
                                                            </button>
                                                        )}
                                                        <button className="p-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-800 transition-colors shadow-sm">
                                                            <MdHistory size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-gray-500 dark:text-gray-400">
                                                <div className="flex flex-col items-center">
                                                    <div className="p-4 rounded-full bg-gray-100 dark:bg-navy-700 mb-3">
                                                        <MdSearch className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                    Tidak ada laporan yang sesuai dengan kriteria pencarian
                                                    <button
                                                        onClick={() => {
                                                            setSearchTerm("");
                                                            setFilterStatus("all");
                                                        }}
                                                        className="mt-3 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredReports.length > 0 ? (
                                filteredReports.map((report, index) => (
                                    <Link
                                        key={index}
                                        to={`/bendahara/report-verification/detail/${report.id}`}
                                        className="block group"
                                    >
                                        <div className={`p-5 rounded-xl border ${report.status === 'Terverifikasi'
                                            ? 'border-green-200 dark:border-green-900/30 bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-900/10 dark:to-green-900/5'
                                            : report.status === 'Ditolak'
                                                ? 'border-red-200 dark:border-red-900/30 bg-gradient-to-br from-red-50 to-red-50/50 dark:from-red-900/10 dark:to-red-900/5'
                                                : 'border-indigo-200 dark:border-indigo-900/30 bg-gradient-to-br from-indigo-50 to-indigo-50/50 dark:from-indigo-900/10 dark:to-indigo-900/5'
                                            } hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="bg-white dark:bg-navy-700 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-navy-600 text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                                                    {report.id}
                                                </div>
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 ${getStatusColor(report.status)}`}>
                                                    {getStatusIcon(report.status)}
                                                    {report.status}
                                                </span>
                                            </div>

                                            <h3 className="text-base font-semibold text-navy-700 dark:text-white line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {report.title}
                                            </h3>

                                            <div className="flex items-center mb-3">
                                                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-200 to-blue-300 dark:from-indigo-900 dark:to-blue-900 flex items-center justify-center mr-2.5 shadow-sm">
                                                    <span className="text-xs font-medium text-indigo-800 dark:text-indigo-200">
                                                        {report.researcher.split(' ')[0][0]}{report.researcher.split(' ')[1]?.[0] || ''}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        {report.researcher}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {report.faculty}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                                                <div className="flex items-center">
                                                    <MdCalendarToday className="h-3.5 w-3.5 mr-1" />
                                                    {report.submissionDate}
                                                </div>
                                                <span className={`px-2.5 py-1 rounded-full shadow-sm ${getPriorityColor(report.priority)}`}>
                                                    {report.priority}
                                                </span>
                                            </div>

                                            <div className="mb-1 mt-2 flex justify-between text-xs text-gray-600 dark:text-gray-400">
                                                <span>Penggunaan Dana</span>
                                                <span className="font-medium">{Math.round((report.budgetUsed / report.totalBudget) * 100)}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2.5 mb-1.5 overflow-hidden">
                                                <div
                                                    className={`h-2.5 rounded-full ${report.status === 'Ditolak'
                                                        ? 'bg-red-500'
                                                        : report.status === 'Terverifikasi'
                                                            ? 'bg-green-500'
                                                            : 'bg-indigo-500'
                                                        }`}
                                                    style={{
                                                        width: `${(report.budgetUsed / report.totalBudget) * 100}%`,
                                                        transition: 'width 1s ease-in-out'
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="font-medium text-indigo-600 dark:text-indigo-400">Rp {report.budgetUsed.toLocaleString()}</span>
                                                <span className="text-gray-500 dark:text-gray-400">Dari Rp {report.totalBudget.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-2 py-12 text-center text-gray-500 dark:text-gray-400">
                                    <div className="flex flex-col items-center">
                                        <div className="p-5 rounded-full bg-gray-100 dark:bg-navy-700 mb-4 shadow-inner">
                                            <MdSearch className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <p className="mb-3 text-lg">Tidak ada laporan yang sesuai dengan kriteria pencarian</p>
                                        <button
                                            onClick={() => {
                                                setSearchTerm("");
                                                setFilterStatus("all");
                                            }}
                                            className="px-5 py-2.5 text-sm font-medium rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors shadow-sm"
                                        >
                                            Reset Filter
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Card>

                <Card extra="p-0 shadow-sm hover:shadow-md transition-all duration-300" data-aos="fade-up" data-aos-delay="350">
                    <div className="p-6 border-b border-gray-100 dark:border-navy-700">
                        <h3 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                            <MdOutlineTrendingUp className="h-5 w-5 mr-2 text-indigo-500" />
                            Status Verifikasi
                        </h3>
                    </div>

                    <div className="p-6">
                        <div className="h-72 mb-6">
                            <Chart
                                options={budgetChartOptions}
                                series={budgetChartSeries}
                                type="donut"
                                height="100%"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center mb-6">
                            <div className="p-3.5 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/10 dark:to-green-900/5 border border-green-100 dark:border-green-900/30 shadow-sm">
                                <div className="flex justify-center mb-1.5">
                                    <div className="p-1.5 bg-white dark:bg-navy-800 rounded-full shadow">
                                        <MdCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                                <p className="text-xs text-green-800 dark:text-green-300 font-medium">Terverifikasi</p>
                                <p className="text-lg font-bold text-green-700 dark:text-green-400">{reportStats.verified}</p>
                            </div>

                            <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-900/10 dark:to-indigo-900/5 border border-indigo-100 dark:border-indigo-900/30 shadow-sm">
                                <div className="flex justify-center mb-1.5">
                                    <div className="p-1.5 bg-white dark:bg-navy-800 rounded-full shadow">
                                        <MdHourglassEmpty className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                </div>
                                <p className="text-xs text-indigo-800 dark:text-indigo-300 font-medium">Menunggu</p>
                                <p className="text-lg font-bold text-indigo-700 dark:text-indigo-400">{reportStats.pending}</p>
                            </div>

                            <div className="p-3.5 rounded-xl bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/10 dark:to-red-900/5 border border-red-100 dark:border-red-900/30 shadow-sm">
                                <div className="flex justify-center mb-1.5">
                                    <div className="p-1.5 bg-white dark:bg-navy-800 rounded-full shadow">
                                        <MdWarning className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    </div>
                                </div>
                                <p className="text-xs text-red-800 dark:text-red-300 font-medium">Ditolak</p>
                                <p className="text-lg font-bold text-red-700 dark:text-red-400">{reportStats.rejected}</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-navy-700">
                            <h4 className="text-base font-medium text-navy-700 dark:text-white mb-3 flex items-center">
                                <MdOutlineAttachMoney className="h-5 w-5 mr-1.5 text-gray-500 dark:text-gray-400" />
                                Penggunaan Dana
                            </h4>
                            <div className="mb-2.5 flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Total Dana Terpakai</span>
                                <span className="text-sm font-bold text-navy-700 dark:text-white">Rp {reportStats.totalBudgetUsed.toLocaleString()}</span>
                            </div>
                            <div className="mb-2.5 flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Total Anggaran</span>
                                <span className="text-sm font-bold text-navy-700 dark:text-white">Rp {reportStats.totalBudget.toLocaleString()}</span>
                            </div>
                            <div className="mb-2 flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Persentase</span>
                                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{Math.round((reportStats.totalBudgetUsed / reportStats.totalBudget) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2.5 mb-6 overflow-hidden">
                                <div
                                    className="bg-indigo-500 h-2.5 rounded-full"
                                    style={{
                                        width: `${(reportStats.totalBudgetUsed / reportStats.totalBudget) * 100}%`,
                                        transition: 'width 1.5s ease-in-out'
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="/bendahara/funding-management/fund-utilization"
                                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm hover:shadow"
                            >
                                <MdAssessment className="h-4 w-4" />
                                Lihat Laporan Rinci
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default FinancialProgressReports;