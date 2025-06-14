import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdDescription,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdFileDownload,
    MdArrowBack,
    MdReceiptLong,
    MdCheckCircle,
    MdHourglassEmpty,
    MdWarning,
    MdCalendarToday,
    MdPerson,
    MdTrendingUp,
    MdAssessment,
    MdGridView,
    MdOutlineTableRows,
    MdClose,
    MdOutlineMoreVert,
    MdOutlineRemoveRedEye,
    MdNotificationsActive,
    MdOutlineCurrencyExchange,
    MdCategory,  // Changed from MdCategoryOutlined to MdCategory
    MdInsertDriveFile,
    MdOutlineArrowForward
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import Chart from 'react-apexcharts';

const ProposalFinancialReports = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState("table"); // "table" or "grid"
    const [selectedReport, setSelectedReport] = useState(null);
    const [showReportDetails, setShowReportDetails] = useState(false);

    // Dummy data for proposal financial reports
    const reportStats = {
        totalReports: 42,
        completedReports: 28,
        pendingReports: 10,
        overdueReports: 4
    };

    const financialReports = [
        {
            id: "FRP-2025-042",
            proposalId: "PRP-2025-035",
            title: "Laporan Keuangan: Sistem Monitoring Kualitas Air Berbasis IoT",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            category: "Laporan Penggunaan Dana",
            submissionDate: "05 Jun 2025",
            status: "Selesai",
            budgetUsed: 38000000,
            totalBudget: 82000000
        },
        {
            id: "FRP-2025-041",
            proposalId: "PRP-2025-032",
            title: "Laporan Keuangan: Pengembangan Bahan Bakar Alternatif dari Mikroalga",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            category: "Laporan Penggunaan Dana",
            submissionDate: "01 Jun 2025",
            status: "Selesai",
            budgetUsed: 45000000,
            totalBudget: 95000000
        },
        {
            id: "FRP-2025-040",
            proposalId: "PRP-2025-039",
            title: "Laporan Keuangan: Analisis Big Data untuk Prediksi Perilaku Konsumen",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            category: "Laporan Kemajuan",
            submissionDate: "28 Mei 2025",
            status: "Menunggu Revisi",
            budgetUsed: 32000000,
            totalBudget: 68000000
        },
        {
            id: "FRP-2025-039",
            proposalId: "PRP-2025-038",
            title: "Laporan Keuangan: Analisis Dampak Ekonomi dari Perubahan Iklim di Indonesia",
            researcher: "Prof. Dewi Lestari",
            faculty: "Fakultas Ekonomi",
            category: "Laporan Penggunaan Dana",
            submissionDate: "20 Mei 2025",
            status: "Selesai",
            budgetUsed: 30000000,
            totalBudget: 65000000
        },
        {
            id: "FRP-2025-038",
            proposalId: "PRP-2025-028",
            title: "Laporan Keuangan: Pengembangan Sistem Keamanan Jaringan Berbasis AI",
            researcher: "Dr. Eko Prasetyo",
            faculty: "Fakultas Ilmu Komputer",
            category: "Laporan Akhir",
            dueDate: "30 Jun 2025",
            status: "Menunggu Pengajuan",
            budgetUsed: 60000000,
            totalBudget: 88000000
        },
        {
            id: "FRP-2025-037",
            proposalId: "PRP-2025-025",
            title: "Laporan Keuangan: Studi Perbandingan Metode Pengajaran di Era Digital",
            researcher: "Dr. Siti Aminah",
            faculty: "Fakultas Keguruan",
            category: "Laporan Penggunaan Dana",
            dueDate: "15 Jun 2025",
            status: "Terlambat",
            budgetUsed: 0,
            totalBudget: 55000000
        }
    ];

    // Chart configuration for budget usage
    const budgetChartOptions = {
        chart: {
            type: 'donut',
            height: 240,
            fontFamily: 'inherit',
            foreColor: '#697a8d',
        },
        colors: ['#10b981', '#3b82f6', '#f97316', '#ef4444'],
        labels: ['Selesai', 'Menunggu Revisi', 'Menunggu Pengajuan', 'Terlambat'],
        legend: {
            position: 'bottom',
            fontSize: '12px',
            fontFamily: 'inherit',
            offsetY: 5,
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        name: {
                            fontSize: '12px',
                            fontFamily: 'inherit',
                        },
                        value: {
                            fontSize: '16px',
                            fontFamily: 'inherit',
                            formatter: function (val) {
                                return val;
                            }
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            fontSize: '14px',
                            fontFamily: 'inherit',
                            color: '#566a7f',
                            formatter: function () {
                                return reportStats.totalReports;
                            }
                        }
                    }
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 220
                }
            }
        }]
    };

    const budgetChartSeries = [
        reportStats.completedReports,
        reportStats.pendingReports / 2, // Simplified for visualization
        reportStats.pendingReports / 2, // Simplified for visualization
        reportStats.overdueReports
    ];

    const budgetUsageChartOptions = {
        chart: {
            type: 'bar',
            height: 200,
            toolbar: {
                show: false
            },
            fontFamily: 'inherit',
            foreColor: '#697a8d',
        },
        colors: ['#3b82f6'],
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '70%',
                borderRadius: 4,
                distributed: true,
                dataLabels: {
                    position: 'bottom'
                },
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                colors: ['#fff'],
                fontSize: '12px',
                fontFamily: 'inherit',
                fontWeight: 500
            },
            formatter: function (val) {
                return val + '%';
            },
            offsetX: 10
        },
        grid: {
            show: false,
        },
        xaxis: {
            categories: financialReports.slice(0, 5).map(report => report.id),
            labels: {
                formatter: function (val) {
                    return val + "%";
                }
            },
            max: 100
        },
        yaxis: {
            labels: {
                maxWidth: 150
            }
        }
    };

    const budgetUsageChartSeries = [{
        name: 'Penggunaan Dana',
        data: financialReports.slice(0, 5).map(report =>
            Math.round(report.budgetUsed / report.totalBudget * 100)
        )
    }];

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

    const openReportDetails = (report) => {
        setSelectedReport(report);
        setShowReportDetails(true);
    };

    const filteredReports = financialReports.filter(report => {
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
            case "selesai": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "menunggu revisi": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "menunggu pengajuan": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "terlambat": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case "selesai": return <MdCheckCircle className="h-4 w-4" />;
            case "menunggu revisi": return <MdHourglassEmpty className="h-4 w-4" />;
            case "menunggu pengajuan": return <MdCalendarToday className="h-4 w-4" />;
            case "terlambat": return <MdWarning className="h-4 w-4" />;
            default: return null;
        }
    };

    return (
        <div className="pt-8 px-2">
            {/* Hero Section with gradient background */}
            <div className="relative mb-10 bg-gradient-to-r from-teal-600 to-blue-500 rounded-3xl p-8 text-white overflow-hidden" data-aos="fade-up">
                <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full transform -translate-x-10 translate-y-10"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    <div className="mb-2 lg:mb-0">
                        <div className="flex items-center gap-4">
                            <Link to="/bendahara/funding-management" className="p-2.5 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl hover:bg-opacity-30 transition-all">
                                <MdArrowBack className="h-5 w-5 text-white" />
                            </Link>
                            <div>
                                <h2 className="text-3xl font-bold">Laporan Keuangan Proposal</h2>
                                <p className="mt-2 text-teal-100">
                                    Pantau dan verifikasi laporan pengelolaan dana untuk semua proposal yang didanai
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                            <p className="text-sm text-teal-100">Total Dana Terlapor</p>
                            <div className="flex items-center mt-1 gap-2">
                                <MdOutlineCurrencyExchange className="h-5 w-5" />
                                <p className="text-2xl font-bold">Rp 350M</p>
                            </div>
                        </div>

                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                            <p className="text-sm text-teal-100">Proposal Aktif</p>
                            <div className="flex items-center mt-1 gap-2">
                                <MdInsertDriveFile className="h-5 w-5" />
                                <p className="text-2xl font-bold">42</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdDescription className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Laporan</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {reportStats.totalReports}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 mr-1"></span>
                                <span className="text-xs text-blue-600 dark:text-blue-400">
                                    Periode Q2 2025
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-green-100 dark:bg-green-900/30">
                            <MdCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Laporan Selesai</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {reportStats.completedReports}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                                <span className="text-xs text-green-600 dark:text-green-400">
                                    {Math.round((reportStats.completedReports / reportStats.totalReports) * 100)}% selesai
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdHourglassEmpty className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Menunggu Pengajuan</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {reportStats.pendingReports}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 mr-1"></span>
                                <span className="text-xs text-amber-600 dark:text-amber-400">
                                    {Math.round((reportStats.pendingReports / reportStats.totalReports) * 100)}% dari total
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-red-100 dark:bg-red-900/30">
                            <MdWarning className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Laporan Terlambat</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {reportStats.overdueReports}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mr-1"></span>
                                <span className="text-xs text-red-600 dark:text-red-400">
                                    Perlu tindakan segera
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col xl:flex-row gap-6 mb-8">
                <Card extra="p-6 xl:w-2/3" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                        <div className="flex items-center gap-4">
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                Daftar Laporan Keuangan
                            </h5>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode("table")}
                                    className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table'
                                        ? 'bg-brand-50 dark:bg-brand-500/20 text-brand-500'
                                        : 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400'
                                        }`}
                                    title="Tampilan Tabel"
                                >
                                    <MdOutlineTableRows className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid'
                                        ? 'bg-brand-50 dark:bg-brand-500/20 text-brand-500'
                                        : 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400'
                                        }`}
                                    title="Tampilan Grid"
                                >
                                    <MdGridView className="h-5 w-5" />
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
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MdFilterList className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        className="appearance-none pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="all">Semua Status</option>
                                        <option value="selesai">Selesai</option>
                                        <option value="menunggu revisi">Menunggu Revisi</option>
                                        <option value="menunggu pengajuan">Menunggu Pengajuan</option>
                                        <option value="terlambat">Terlambat</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleRefresh}
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors"
                                    title="Refresh data"
                                >
                                    <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                                </button>
                                <button
                                    className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white transition-colors flex items-center gap-2"
                                    title="Ekspor data"
                                >
                                    <MdFileDownload className="h-5 w-5" />
                                    <span className="hidden md:inline">Ekspor</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {viewMode === "table" ? (
                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-navy-700">
                            <table className="w-full min-w-[800px] table-auto">
                                <thead className="bg-gray-50 dark:bg-navy-800">
                                    <tr>
                                        <th className="px-4 py-3 text-start rounded-tl-lg text-sm font-medium text-gray-600 dark:text-gray-300">
                                            ID Laporan
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Judul & Peneliti
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Kategori
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Tanggal
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Penggunaan Dana
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300 rounded-tr-lg">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReports.length > 0 ? (
                                        filteredReports.map((report, index) => (
                                            <tr key={index} className="border-t border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
                                                <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                                    <div className="flex flex-col">
                                                        <span>{report.id}</span>
                                                        <Link to={`/bendahara/funding-management/proposal/${report.proposalId}`} className="text-xs text-brand-500 hover:text-brand-600">
                                                            {report.proposalId}
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <Link
                                                        to={`/bendahara/report-verification/detail/${report.id}`}
                                                        className="text-sm font-medium text-navy-700 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 line-clamp-2 max-w-[220px]"
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
                                                    <span className="px-2.5 py-1.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 flex items-center w-fit gap-1">
                                                        <MdCategory className="h-3.5 w-3.5" />
                                                        {report.category}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col text-xs">
                                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                            <MdCalendarToday className="h-3.5 w-3.5 mr-1.5" />
                                                            {report.submissionDate || report.dueDate}
                                                        </div>
                                                        {report.dueDate && !report.submissionDate && (
                                                            <span className="mt-1 px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-[10px] w-fit">
                                                                Tenggat
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col">
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                                {Math.round((report.budgetUsed / report.totalBudget) * 100)}%
                                                            </span>
                                                            <span className="text-xs font-medium text-brand-500 dark:text-brand-400">
                                                                {report.budgetUsed > 0
                                                                    ? `Rp ${(report.budgetUsed / 1000000).toFixed(1)}M`
                                                                    : "Belum ada data"}
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-1.5 overflow-hidden">
                                                            <div
                                                                className={`h-1.5 rounded-full ${report.status === 'Terlambat' ? 'bg-red-500' : 'bg-brand-500'}`}
                                                                style={{ width: `${report.budgetUsed > 0 ? (report.budgetUsed / report.totalBudget) * 100 : 0}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            Total: Rp {(report.totalBudget / 1000000).toFixed(1)}M
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={`px-2.5 py-1.5 text-xs font-medium rounded-full flex items-center w-fit gap-1 ${getStatusColor(report.status)}`}>
                                                        {getStatusIcon(report.status)}
                                                        {report.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => openReportDetails(report)}
                                                            className="p-2 rounded-lg bg-brand-50 dark:bg-brand-500/20 text-brand-500 hover:bg-brand-100 dark:hover:bg-brand-500/30 transition-colors"
                                                            title="Lihat Detail"
                                                        >
                                                            <MdOutlineRemoveRedEye size={18} />
                                                        </button>
                                                        <button
                                                            className="p-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-800 transition-colors"
                                                            title="Opsi Lainnya"
                                                        >
                                                            <MdOutlineMoreVert size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-gray-500 dark:text-gray-400">
                                                <div className="flex flex-col items-center">
                                                    <div className="p-3 rounded-full bg-gray-100 dark:bg-navy-700 mb-2">
                                                        <MdSearch className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                    Tidak ada laporan yang sesuai dengan kriteria pencarian
                                                    <button
                                                        onClick={() => {
                                                            setSearchTerm("");
                                                            setFilterStatus("all");
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredReports.length > 0 ? (
                                filteredReports.map((report, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-xl border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center w-fit gap-1 ${getStatusColor(report.status)}`}>
                                                {getStatusIcon(report.status)}
                                                {report.status}
                                            </span>
                                            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                                {report.category}
                                            </span>
                                        </div>

                                        <Link
                                            to={`/bendahara/report-verification/detail/${report.id}`}
                                            className="block mb-3 text-navy-700 dark:text-white hover:text-brand-500 dark:hover:text-brand-400"
                                        >
                                            <h3 className="text-base font-medium line-clamp-2">
                                                {report.title}
                                            </h3>
                                        </Link>

                                        <div className="flex items-center mb-3 text-sm text-gray-600 dark:text-gray-400">
                                            <MdPerson className="h-4 w-4 mr-1.5" />
                                            {report.researcher}
                                            <span className="mx-1.5">•</span>
                                            <span className="text-xs">{report.faculty}</span>
                                        </div>

                                        <div className="flex items-center mb-4 text-xs text-gray-500 dark:text-gray-400">
                                            <MdCalendarToday className="h-3.5 w-3.5 mr-1.5" />
                                            {report.submissionDate || report.dueDate}
                                            {report.dueDate && !report.submissionDate && (
                                                <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-[10px]">
                                                    Tenggat
                                                </span>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                    Penggunaan Dana
                                                </span>
                                                <span className="text-xs font-medium text-brand-500 dark:text-brand-400">
                                                    {Math.round((report.budgetUsed / report.totalBudget) * 100)}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-brand-500 h-2 rounded-full"
                                                    style={{ width: `${report.budgetUsed > 0 ? (report.budgetUsed / report.totalBudget) * 100 : 0}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                <span>Rp {report.budgetUsed.toLocaleString()}</span>
                                                <span>Rp {report.totalBudget.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{report.id}</span>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => openReportDetails(report)}
                                                    className="p-2 rounded-lg bg-brand-50 dark:bg-brand-500/20 text-brand-500 hover:bg-brand-100 hover:text-brand-600 dark:hover:bg-brand-500/30 transition-colors"
                                                    title="Lihat Detail"
                                                >
                                                    <MdOutlineRemoveRedEye size={18} />
                                                </button>
                                                <button
                                                    className="p-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-800 transition-colors"
                                                    title="Opsi Lainnya"
                                                >
                                                    <MdOutlineMoreVert size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-10 text-center text-gray-500 dark:text-gray-400">
                                    <div className="flex flex-col items-center">
                                        <div className="p-4 rounded-full bg-gray-100 dark:bg-navy-700 mb-3">
                                            <MdSearch className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <p className="mb-2">Tidak ada laporan yang sesuai dengan kriteria pencarian</p>
                                        <button
                                            onClick={() => {
                                                setSearchTerm("");
                                                setFilterStatus("all");
                                            }}
                                            className="px-4 py-2 text-sm font-medium rounded-lg bg-brand-50 dark:bg-brand-500/20 text-brand-500"
                                        >
                                            Reset Filter
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {filteredReports.length > 0 && (
                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Menampilkan {filteredReports.length} dari {financialReports.length} laporan
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Halaman 1 dari 1</span>
                                <button className="p-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-500 dark:text-gray-400 opacity-50 cursor-not-allowed">
                                    &lt;
                                </button>
                                <button className="p-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-500 dark:text-gray-400 opacity-50 cursor-not-allowed">
                                    &gt;
                                </button>
                            </div>
                        </div>
                    )}
                </Card>

                <Card extra="p-0 xl:w-1/3" data-aos="fade-up" data-aos-delay="350">
                    <div className="p-6 border-b border-gray-100 dark:border-navy-700">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                            Ringkasan Laporan
                        </h5>
                    </div>

                    <div className="p-6">
                        <div className="mb-6">
                            <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                                <MdTrendingUp className="h-4 w-4 text-brand-500" />
                                Status Laporan
                            </h6>
                            <div className="h-[240px]">
                                <Chart
                                    options={budgetChartOptions}
                                    series={budgetChartSeries}
                                    type="donut"
                                    height="100%"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                                <MdAssessment className="h-4 w-4 text-brand-500" />
                                Penggunaan Dana Teratas
                            </h6>
                            <div className="h-[200px]">
                                <Chart
                                    options={budgetUsageChartOptions}
                                    series={budgetUsageChartSeries}
                                    type="bar"
                                    height="100%"
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-100 dark:border-navy-700 pt-6">
                            <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Perlu Perhatian
                            </h6>
                            <div className="space-y-3">
                                {financialReports.filter(r => r.status === 'Terlambat' || r.status === 'Menunggu Revisi').slice(0, 3).map((report, i) => (
                                    <div key={i} className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-2">
                                                <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                                    {report.status === 'Terlambat' ?
                                                        <MdWarning className="h-4 w-4 text-red-600 dark:text-red-400" /> :
                                                        <MdHourglassEmpty className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                                    }
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-navy-700 dark:text-white line-clamp-1">{report.title.substring(18)}</p>
                                                    <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">{report.status}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => openReportDetails(report)}
                                                className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"
                                            >
                                                <MdNotificationsActive className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link
                            to="/bendahara/report-verification/financial-progress-reports"
                            className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-brand-50 dark:bg-brand-500/20 py-3 text-sm font-medium text-brand-500 hover:bg-brand-100 dark:hover:bg-brand-500/30 transition-colors"
                        >
                            Lihat Semua Laporan Keuangan
                            <MdOutlineArrowForward className="h-4 w-4" />
                        </Link>
                    </div>
                </Card>
            </div>

            {/* Report Details Modal */}
            {showReportDetails && selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-navy-800 rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${selectedReport.status === 'Selesai'
                                        ? "bg-green-100 dark:bg-green-900/30"
                                        : selectedReport.status === 'Terlambat'
                                            ? "bg-red-100 dark:bg-red-900/30"
                                            : "bg-blue-100 dark:bg-blue-900/30"
                                        }`}>
                                        {selectedReport.status === 'Selesai'
                                            ? <MdCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                            : selectedReport.status === 'Terlambat'
                                                ? <MdWarning className="h-6 w-6 text-red-600 dark:text-red-400" />
                                                : <MdReceiptLong className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        }
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                                            Detail Laporan Keuangan
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {selectedReport.id}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowReportDetails(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
                                >
                                    <MdClose className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className={`py-2 px-4 rounded-lg ${selectedReport.status === 'Selesai'
                                    ? "bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500"
                                    : selectedReport.status === 'Terlambat'
                                        ? "bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500"
                                        : selectedReport.status === 'Menunggu Revisi'
                                            ? "bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500"
                                            : "bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500"
                                    }`}>
                                    <div className="flex items-center justify-between">
                                        <p className={`text-sm font-medium ${selectedReport.status === 'Selesai'
                                            ? "text-green-700 dark:text-green-400"
                                            : selectedReport.status === 'Terlambat'
                                                ? "text-red-700 dark:text-red-400"
                                                : selectedReport.status === 'Menunggu Revisi'
                                                    ? "text-amber-700 dark:text-amber-400"
                                                    : "text-blue-700 dark:text-blue-400"
                                            }`}>
                                            Status: {selectedReport.status}
                                        </p>
                                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                            {selectedReport.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-base font-medium text-navy-700 dark:text-white mb-4">
                                {selectedReport.title}
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        Informasi Proposal
                                    </h5>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">ID Proposal</p>
                                            <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                                {selectedReport.proposalId}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Peneliti</p>
                                            <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                                {selectedReport.researcher}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                {selectedReport.faculty}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal</p>
                                            <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                                {selectedReport.submissionDate || selectedReport.dueDate}
                                                {selectedReport.dueDate && !selectedReport.submissionDate && (
                                                    <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-xs">
                                                        Tenggat
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        Detail Keuangan
                                    </h5>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Total Anggaran</p>
                                            <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                                Rp {selectedReport.totalBudget.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Dana Terpakai</p>
                                            <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                                Rp {selectedReport.budgetUsed.toLocaleString()}
                                                <span className="ml-2 text-xs text-brand-500">
                                                    ({Math.round((selectedReport.budgetUsed / selectedReport.totalBudget) * 100)}%)
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Progres Penggunaan Dana</p>
                                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-brand-500 h-2 rounded-full"
                                                    style={{ width: `${selectedReport.budgetUsed > 0 ? (selectedReport.budgetUsed / selectedReport.totalBudget) * 100 : 0}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                                <button
                                    onClick={() => setShowReportDetails(false)}
                                    className="order-2 sm:order-1 py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600 text-sm font-medium transition-colors"
                                >
                                    Tutup
                                </button>
                                <Link
                                    to={`/bendahara/report-verification/detail/${selectedReport.id}`}
                                    className="order-1 sm:order-2 py-2.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <MdOutlineRemoveRedEye className="h-4 w-4" />
                                    Lihat Detail Lengkap
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProposalFinancialReports;
