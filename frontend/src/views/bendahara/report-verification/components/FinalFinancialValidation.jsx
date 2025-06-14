import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdVerified,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdFileDownload,
    MdArrowBack,
    MdCheckCircle,
    MdHourglassEmpty,
    MdWarning,
    MdVisibility,
    MdDone,
    MdCancel,
    MdDescription,
    MdDocumentScanner,
    MdGavel,
    MdCalendarToday,
    MdOutlineTrendingUp,
    MdPerson,
    MdOutlineCurrencyExchange,
    MdAccountBalance,
    MdOutlineFilterAlt,
    MdKeyboardArrowDown,
    MdAccessTime,
    MdInfo,
    MdTask,
    MdPendingActions,
    MdAttachMoney
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import Chart from 'react-apexcharts';

const FinalFinancialValidation = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [showReportDetail, setShowReportDetail] = useState(false);

    // Dummy data for final financial validation
    const validationStats = {
        totalReports: 18,
        validatedReports: 12,
        pendingValidation: 5,
        rejectedReports: 1
    };

    const finalReports = [
        {
            id: "FFR-2025-018",
            proposalId: "PRP-2024-085",
            title: "Laporan Akhir Keuangan: Identifikasi Bakteri Probiotik dari Produk Pangan Fermentasi Tradisional",
            researcher: "Dr. Ahmad Fauzi",
            faculty: "Fakultas Biologi",
            submissionDate: "08 Jun 2025",
            researchPeriod: "Jan 2024 - Des 2024",
            totalBudget: 100000000,
            finalUtilization: 98750000,
            status: "Menunggu Validasi",
            notes: "Menunggu persetujuan akhir dari bendahara"
        },
        {
            id: "FFR-2025-017",
            proposalId: "PRP-2024-078",
            title: "Laporan Akhir Keuangan: Studi Perbandingan Algoritma Machine Learning untuk Deteksi Penyakit Jantung",
            researcher: "Prof. Siti Mahmudah",
            faculty: "Fakultas Kedokteran",
            submissionDate: "05 Jun 2025",
            researchPeriod: "Jan 2024 - Des 2024",
            totalBudget: 120000000,
            finalUtilization: 119250000,
            status: "Tervalidasi",
            notes: "Semua laporan penggunaan dana telah tervalidasi dengan baik"
        },
        {
            id: "FFR-2025-016",
            proposalId: "PRP-2024-072",
            title: "Laporan Akhir Keuangan: Pengembangan Aplikasi Mobile untuk Monitoring Kualitas Udara",
            researcher: "Dr. Bambang Hermawan",
            faculty: "Fakultas Teknik",
            submissionDate: "01 Jun 2025",
            researchPeriod: "Jan 2024 - Des 2024",
            totalBudget: 85000000,
            finalUtilization: 83200000,
            status: "Ditolak",
            notes: "Bukti penggunaan dana untuk pembelian sensor tidak sesuai dengan jumlah dalam laporan",
            rejectionReason: "Terdapat ketidaksesuaian dalam laporan keuangan dan bukti pengeluaran"
        },
        {
            id: "FFR-2025-015",
            proposalId: "PRP-2024-068",
            title: "Laporan Akhir Keuangan: Dampak Penggunaan Media Sosial terhadap Kesehatan Mental Remaja",
            researcher: "Dr. Ratih Kusuma",
            faculty: "Fakultas Psikologi",
            submissionDate: "28 Mei 2025",
            researchPeriod: "Jan 2024 - Des 2024",
            totalBudget: 75000000,
            finalUtilization: 74800000,
            status: "Tervalidasi",
            notes: "Laporan keuangan lengkap dan terperinci"
        },
        {
            id: "FFR-2025-014",
            proposalId: "PRP-2024-065",
            title: "Laporan Akhir Keuangan: Efektivitas Teknik Pembelajaran Berbasis Proyek di Perguruan Tinggi",
            researcher: "Dr. Yudi Pratama",
            faculty: "Fakultas Keguruan dan Ilmu Pendidikan",
            submissionDate: "25 Mei 2025",
            researchPeriod: "Jan 2024 - Des 2024",
            totalBudget: 65000000,
            finalUtilization: 64200000,
            status: "Menunggu Validasi",
            notes: "Menunggu review dari tim keuangan"
        },
        {
            id: "FFR-2025-013",
            proposalId: "PRP-2024-059",
            title: "Laporan Akhir Keuangan: Pemanfaatan Limbah Pertanian untuk Bahan Bakar Alternatif",
            researcher: "Prof. Abdul Rahman",
            faculty: "Fakultas Pertanian",
            submissionDate: "20 Mei 2025",
            researchPeriod: "Jan 2024 - Des 2024",
            totalBudget: 110000000,
            finalUtilization: 109500000,
            status: "Tervalidasi",
            notes: "Penggunaan dana sangat efisien dan sesuai rencana"
        }
    ];

    // Validation status donut chart config
    const validationStatusOptions = {
        chart: {
            type: 'donut',
            fontFamily: 'inherit',
            foreColor: '#1e40af', // Changed to blue text
            toolbar: {
                show: false
            },
            background: '#ffffff'
        },
        colors: ['#10b981', '#f97316', '#ef4444'], // Keep distinct colors for status
        labels: ['Tervalidasi', 'Menunggu', 'Ditolak'],
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        name: {
                            fontSize: '14px',
                            fontFamily: 'inherit'
                        },
                        value: {
                            fontSize: '22px',
                            fontFamily: 'inherit',
                            formatter: function (val) {
                                return val;
                            }
                        },
                        total: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'inherit',
                            label: 'Total',
                            formatter: function () {
                                return validationStats.totalReports;
                            }
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 280
                }
            }
        }]
    };

    const validationStatusSeries = [
        validationStats.validatedReports,
        validationStats.pendingValidation,
        validationStats.rejectedReports
    ];

    // Monthly validation activity bar chart config
    const monthlyActivityOptions = {
        chart: {
            type: 'bar',
            height: 250,
            toolbar: {
                show: false
            },
            fontFamily: 'inherit',
            foreColor: '#374151', // Dark gray text
            background: '#ffffff' // White background
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '60%',
                dataLabels: {
                    position: 'top'
                }
            }
        },
        colors: ['#3b82f6'], // Using blue for the bar chart
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                fontFamily: 'inherit',
                colors: ['#374151']
            }
        },
        grid: {
            show: true,
            borderColor: '#e0e0e0',
            strokeDashArray: 3,
            position: 'back',
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        xaxis: {
            categories: ['Mar', 'Apr', 'May', 'Jun'],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: 'inherit'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val.toFixed(0);
                },
                style: {
                    fontSize: '12px',
                    fontFamily: 'inherit'
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " laporan";
                }
            }
        }
    };

    const monthlyActivitySeries = [{
        name: 'Laporan Divalidasi',
        data: [12, 6, 8, 5]
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

    const openReportDetail = (report) => {
        setSelectedReport(report);
        setShowReportDetail(true);
    };

    const filteredReports = finalReports.filter(report => {
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
            case "tervalidasi": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "menunggu validasi": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "ditolak": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case "tervalidasi": return <MdCheckCircle className="h-4 w-4" />;
            case "menunggu validasi": return <MdHourglassEmpty className="h-4 w-4" />;
            case "ditolak": return <MdWarning className="h-4 w-4" />;
            default: return null;
        }
    };

    const getBudgetUsageColor = (total, used) => {
        const percentage = (used / total) * 100;
        if (percentage > 98) return "text-green-600 dark:text-green-400";
        if (percentage > 90) return "text-blue-600 dark:text-blue-400";
        return "text-amber-600 dark:text-amber-400";
    };

    const calculateTotalBudgetUtilized = () => {
        return finalReports.reduce((sum, report) => sum + report.finalUtilization, 0);
    };

    const calculateTotalBudget = () => {
        return finalReports.reduce((sum, report) => sum + report.totalBudget, 0);
    };

    const totalUtilizedBudget = calculateTotalBudgetUtilized();
    const totalBudget = calculateTotalBudget();

    return (
        <div className="pt-8 px-2 bg-white">
            {/* Hero Section with blue accents */}
            <div className="relative mb-10 bg-white rounded-3xl p-8 text-gray-800 overflow-hidden border border-blue-100 shadow-sm" data-aos="fade-up">
                {/* Blue pattern background */}
                <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
                <div className="absolute right-0 top-0 w-32 h-32 bg-blue-100 rounded-full opacity-70 -mr-10 -mt-10"></div>
                <div className="absolute left-0 bottom-0 w-24 h-24 bg-blue-100 rounded-full opacity-70 -ml-10 -mb-10"></div>
                <div className="absolute right-1/4 bottom-0 w-16 h-16 bg-blue-200 rounded-full opacity-50"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-8 lg:mb-0 lg:mr-8 lg:max-w-2xl">
                        <div className="flex items-center mb-4">
                            <Link to="/bendahara/report-verification" className="mr-4 p-2.5 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
                                <MdArrowBack className="h-5 w-5 text-blue-600" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Validasi Laporan Akhir</h1>
                                <div className="h-1 w-20 bg-blue-400 mt-2 mb-2 rounded-full"></div>
                            </div>
                        </div>
                        <p className="text-lg text-gray-700 mb-8 bg-white rounded-lg px-4 py-2 inline-block border-l-4 border-blue-400 shadow-sm">
                            Verifikasi dan validasi laporan akhir keuangan penelitian sebagai penutup administrasi keuangan
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white rounded-2xl py-3.5 px-5 shadow-md border border-blue-100 hover:border-blue-200 transition-all">
                                <p className="text-sm font-medium text-blue-700 uppercase tracking-wide">Dana Tervalidasi</p>
                                <div className="flex items-center mt-1 gap-2">
                                    <MdAttachMoney className="h-6 w-6 text-blue-600" />
                                    <p className="text-2xl font-bold text-gray-800">Rp 0.5 M</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl py-3.5 px-5 shadow-md border border-blue-100 hover:border-blue-200 transition-all">
                                <p className="text-sm font-medium text-blue-700 uppercase tracking-wide">Penelitian Selesai</p>
                                <div className="flex items-center mt-1 gap-2">
                                    <MdTask className="h-6 w-6 text-blue-600" />
                                    <p className="text-2xl font-bold text-gray-800">12 penelitian</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 lg:w-72 shadow-md border border-blue-100">
                        <h3 className="text-center text-lg font-semibold mb-3 text-gray-800">Status Validasi</h3>
                        <Chart
                            options={validationStatusOptions}
                            series={validationStatusSeries}
                            type="donut"
                            height={200}
                        />
                        <div className="grid grid-cols-3 gap-2 mt-4 bg-blue-50 rounded-lg p-2 border border-blue-100">
                            <div className="flex flex-col items-center bg-white rounded-md p-1.5 border border-blue-50 hover:border-blue-200 transition-all">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-xs font-medium text-gray-700">Tervalidasi</span>
                                </div>
                                <p className="font-semibold text-gray-800">{validationStats.validatedReports}</p>
                            </div>
                            <div className="flex flex-col items-center bg-white rounded-md p-1.5 border border-blue-50 hover:border-blue-200 transition-all">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                    <span className="text-xs font-medium text-gray-700">Menunggu</span>
                                </div>
                                <p className="font-semibold text-gray-800">{validationStats.pendingValidation}</p>
                            </div>
                            <div className="flex flex-col items-center bg-white rounded-md p-1.5 border border-blue-50 hover:border-blue-200 transition-all">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <span className="text-xs font-medium text-gray-700">Ditolak</span>
                                </div>
                                <p className="font-semibold text-gray-800">{validationStats.rejectedReports}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards - adding blue accents */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card extra="p-5 border border-blue-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdDescription className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-blue-700 dark:text-gray-400">Total Laporan Akhir</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {validationStats.totalReports}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 mr-1"></span>
                                <span className="text-xs text-blue-600 dark:text-blue-400">
                                    Periode 2024-2025
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-blue-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-green-100 dark:bg-green-900/30">
                            <MdCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Tervalidasi</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {validationStats.validatedReports}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                                <span className="text-xs text-green-600 dark:text-green-400">
                                    {Math.round((validationStats.validatedReports / validationStats.totalReports) * 100)}% dari total
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-blue-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdHourglassEmpty className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Menunggu Validasi</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {validationStats.pendingValidation}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 mr-1"></span>
                                <span className="text-xs text-amber-600 dark:text-amber-400">
                                    {Math.round((validationStats.pendingValidation / validationStats.totalReports) * 100)}% perlu tindakan
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-blue-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-red-100 dark:bg-red-900/30">
                            <MdWarning className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Ditolak</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {validationStats.rejectedReports}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mr-1"></span>
                                <span className="text-xs text-red-600 dark:text-red-400">
                                    Memerlukan revisi
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Main content - adding blue styling */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                <Card extra="p-6 xl:col-span-2 border border-blue-100" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                        <h5 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <MdVerified className="h-5 w-5 text-blue-600" />
                            Daftar Laporan Akhir Keuangan
                        </h5>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MdSearch className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari laporan..."
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-blue-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MdOutlineFilterAlt className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <select
                                        className="appearance-none pl-10 pr-8 py-2.5 rounded-xl border border-blue-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="all">Semua Status</option>
                                        <option value="tervalidasi">Tervalidasi</option>
                                        <option value="menunggu validasi">Menunggu Validasi</option>
                                        <option value="ditolak">Ditolak</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <MdKeyboardArrowDown className="h-5 w-5 text-blue-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleRefresh}
                                    className="p-2.5 rounded-xl border border-blue-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-blue-600 dark:text-white hover:bg-blue-50 dark:hover:bg-navy-800 transition-colors"
                                    title="Refresh data"
                                >
                                    <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                                </button>
                                <button
                                    className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors flex items-center gap-2"
                                    title="Ekspor data"
                                >
                                    <MdFileDownload className="h-5 w-5" />
                                    <span className="hidden md:inline">Ekspor</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-blue-100 dark:border-navy-700">
                        <table className="w-full min-w-[800px] table-auto">
                            <thead className="bg-blue-50 dark:bg-navy-800">
                                <tr>
                                    <th className="px-4 py-3 text-start rounded-tl-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Peneliti & Judul
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Periode
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Dana Terpakai
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-700 dark:text-gray-300 rounded-tr-lg">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReports.length > 0 ? (
                                    filteredReports.map((report, index) => (
                                        <tr key={index} className="border-t border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
                                            <td className="px-4 py-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            {report.researcher.split(" ")[0][0]}{report.researcher.split(" ")[1]?.[0]}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex gap-2">
                                                            <span>{report.id}</span>
                                                            <span>•</span>
                                                            <span>{report.proposalId}</span>
                                                        </div>
                                                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                                                            {report.researcher}
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                                                ({report.faculty})
                                                            </span>
                                                        </p>
                                                        <Link to={`/bendahara/report-verification/detail/${report.id}`} className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 line-clamp-1">
                                                            {report.title.replace("Laporan Akhir Keuangan: ", "")}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex flex-col text-xs">
                                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                        <MdCalendarToday className="h-3.5 w-3.5 mr-1.5" />
                                                        <span>{report.researchPeriod}</span>
                                                    </div>
                                                    <div className="mt-1 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded-full text-[10px] w-fit flex items-center gap-1">
                                                        <MdAccessTime className="h-3 w-3" />
                                                        Disubmit: {report.submissionDate}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex flex-col">
                                                    <div className="flex justify-between mb-1">
                                                        <span className={`text-xs font-medium ${getBudgetUsageColor(report.totalBudget, report.finalUtilization)}`}>
                                                            {Math.round((report.finalUtilization / report.totalBudget) * 100)}%
                                                        </span>
                                                        <span className="text-xs font-medium text-brand-500">
                                                            {(report.finalUtilization / 1000000).toFixed(1)}M
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2 overflow-hidden">
                                                        <div
                                                            className={`h-2 rounded-full ${report.status === 'Ditolak'
                                                                ? 'bg-red-500'
                                                                : report.status === 'Tervalidasi'
                                                                    ? 'bg-green-500'
                                                                    : 'bg-indigo-500'
                                                                }`}
                                                            style={{ width: `${(report.finalUtilization / report.totalBudget) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        Total: {(report.totalBudget / 1000000).toFixed(1)}M
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center w-fit gap-1 ${getStatusColor(report.status)}`}>
                                                        {getStatusIcon(report.status)}
                                                        {report.status}
                                                    </span>
                                                    {report.notes && (
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 max-w-[200px]" title={report.notes}>
                                                            {report.notes}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => openReportDetail(report)}
                                                        className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                                        title="Lihat Detail"
                                                    >
                                                        <MdVisibility size={18} />
                                                    </button>
                                                    {report.status === "Menunggu Validasi" && (
                                                        <>
                                                            <button className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors" title="Setujui">
                                                                <MdDone size={18} />
                                                            </button>
                                                            <button className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors" title="Tolak">
                                                                <MdCancel size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button className="p-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-800 transition-colors" title="Lihat Dokumen">
                                                        <MdDocumentScanner size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
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

                    {filteredReports.length > 0 && (
                        <div className="mt-5 flex flex-wrap items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-4">
                            <div>
                                Menampilkan {filteredReports.length} dari {finalReports.length} laporan
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                    &lt;
                                </button>
                                <span className="px-2">Halaman 1 dari 1</span>
                                <button className="p-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                    &gt;
                                </button>
                            </div>
                        </div>
                    )}
                </Card>

                <div className="space-y-6">
                    <Card extra="p-5 border border-blue-100" data-aos="fade-up" data-aos-delay="350">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <div className="rounded-xl p-2 bg-blue-100 dark:bg-indigo-900/30">
                                    <MdOutlineTrendingUp className="h-5 w-5 text-blue-600 dark:text-indigo-400" />
                                </div>
                                <h5 className="text-base font-bold text-gray-800 dark:text-white">
                                    Aktivitas Validasi
                                </h5>
                            </div>
                            <select className="text-xs rounded-lg border border-blue-200 dark:border-navy-600 bg-white dark:bg-navy-700 px-2 py-1 text-gray-600 dark:text-gray-300">
                                <option>4 Bulan Terakhir</option>
                                <option>6 Bulan Terakhir</option>
                                <option>1 Tahun</option>
                            </select>
                        </div>
                        <Chart
                            options={monthlyActivityOptions}
                            series={monthlyActivitySeries}
                            type="bar"
                            height={210}
                        />
                    </Card>

                    <Card extra="p-5 border border-blue-100" data-aos="fade-up" data-aos-delay="400">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="rounded-xl p-2.5 bg-blue-100 dark:bg-blue-900/30">
                                <MdGavel className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h5 className="text-base font-bold text-gray-800 dark:text-white">
                                Pedoman Validasi
                            </h5>
                        </div>
                        <div className="p-3.5 bg-blue-50 dark:bg-blue-900/10 rounded-xl mb-4 border border-blue-100 dark:border-blue-900/30">
                            <div className="flex items-start gap-2">
                                <MdInfo className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                    Pastikan semua dokumen laporan akhir keuangan telah lengkap sebelum melakukan validasi final
                                </p>
                            </div>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 mt-0.5 flex-shrink-0">
                                    <MdCheckCircle className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-xs">Penggunaan anggaran sesuai dengan proposal awal</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 mt-0.5 flex-shrink-0">
                                    <MdCheckCircle className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-xs">Bukti pengeluaran sesuai dengan jumlah laporan</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 mt-0.5 flex-shrink-0">
                                    <MdCheckCircle className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-xs">Realokasi anggaran telah mendapat persetujuan</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 mt-0.5 flex-shrink-0">
                                    <MdCheckCircle className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-xs">Laporan telah ditandatangani peneliti dan ketua departemen</span>
                            </li>
                        </ul>
                    </Card>

                    <Card extra="p-5 border border-blue-100" data-aos="fade-up" data-aos-delay="450">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-base font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                <MdPendingActions className="h-5 w-5 text-amber-500" />
                                Menunggu Validasi
                            </h5>
                        </div>
                        <div className="space-y-3">
                            {finalReports.filter(r => r.status === "Menunggu Validasi").slice(0, 3).map((report, i) => (
                                <div
                                    key={i}
                                    onClick={() => openReportDetail(report)}
                                    className="p-3 border border-amber-100 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-900/10 rounded-xl cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-colors"
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs font-medium text-amber-800 dark:text-amber-400">
                                            {report.id}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {report.submissionDate}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-navy-700 dark:text-white mt-1 line-clamp-1">
                                        {report.title.replace("Laporan Akhir Keuangan: ", "")}
                                    </p>
                                    <div className="flex justify-between mt-1">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">
                                            {report.researcher}
                                        </span>
                                        <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                                            {Math.round((report.finalUtilization / report.totalBudget) * 100)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {finalReports.filter(r => r.status === "Menunggu Validasi").length > 3 && (
                                <Link to="/bendahara/report-verification/pending-validation" className="flex justify-center items-center text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline py-1">
                                    Lihat {finalReports.filter(r => r.status === "Menunggu Validasi").length - 3} lainnya
                                </Link>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Report Detail Modal - with blue accents */}
            {showReportDetail && selectedReport && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-navy-800 rounded-2xl w-full max-w-2xl p-6 shadow-xl relative border border-blue-100">
                        <button
                            onClick={() => setShowReportDetail(false)}
                            className="absolute right-4 top-4 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-navy-700"
                        >
                            <MdCancel className="h-6 w-6 text-blue-500 dark:text-gray-400" />
                        </button>

                        <div className="flex items-center mb-5">
                            <div className={`h-12 w-12 rounded-xl mr-4 flex items-center justify-center ${selectedReport.status === "Tervalidasi"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : selectedReport.status === "Ditolak"
                                    ? "bg-red-100 dark:bg-red-900/30"
                                    : "bg-amber-100 dark:bg-amber-900/30"
                                }`}>
                                {selectedReport.status === "Tervalidasi"
                                    ? <MdCheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
                                    : selectedReport.status === "Ditolak"
                                        ? <MdWarning className="h-7 w-7 text-red-600 dark:text-red-400" />
                                        : <MdHourglassEmpty className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                                }
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-navy-700 dark:text-white">{selectedReport.id}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {selectedReport.proposalId} • {selectedReport.submissionDate}
                                </p>
                            </div>
                        </div>

                        <h4 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
                            {selectedReport.title.replace("Laporan Akhir Keuangan: ", "")}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Informasi Peneliti
                                </h5>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Nama Peneliti</p>
                                        <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                            {selectedReport.researcher}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Fakultas</p>
                                        <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                            {selectedReport.faculty}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Periode Penelitian</p>
                                        <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                            {selectedReport.researchPeriod}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Rincian Keuangan
                                </h5>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Total Anggaran</p>
                                        <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                            Rp {selectedReport.totalBudget.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Dana Terpakai</p>
                                        <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                            Rp {selectedReport.finalUtilization.toLocaleString()}
                                            <span className="ml-2 text-xs text-indigo-500">
                                                ({Math.round((selectedReport.finalUtilization / selectedReport.totalBudget) * 100)}%)
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Penggunaan Dana</p>
                                        <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2 mb-1">
                                            <div
                                                className={`h-2 rounded-full ${selectedReport.status === 'Ditolak'
                                                    ? 'bg-red-500'
                                                    : selectedReport.status === 'Tervalidasi'
                                                        ? 'bg-green-500'
                                                        : 'bg-indigo-500'
                                                    }`}
                                                style={{ width: `${(selectedReport.finalUtilization / selectedReport.totalBudget) * 100}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                            <span>Terpakai</span>
                                            <span>Total</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`p-4 rounded-xl ${selectedReport.status === "Tervalidasi"
                            ? "bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30"
                            : selectedReport.status === "Ditolak"
                                ? "bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30"
                                : "bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30"
                            } mb-6`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-sm font-medium ${selectedReport.status === "Tervalidasi"
                                    ? "text-green-700 dark:text-green-400"
                                    : selectedReport.status === "Ditolak"
                                        ? "text-red-700 dark:text-red-400"
                                        : "text-amber-700 dark:text-amber-400"
                                    }`}>
                                    Status: {selectedReport.status}
                                </span>
                            </div>
                            <p className={`text-sm ${selectedReport.status === "Tervalidasi"
                                ? "text-green-600 dark:text-green-400"
                                : selectedReport.status === "Ditolak"
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-amber-600 dark:text-amber-400"
                                }`}>
                                {selectedReport.notes || "Tidak ada catatan"}
                            </p>
                            {selectedReport.rejectionReason && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                    Alasan penolakan: {selectedReport.rejectionReason}
                                </p>
                            )}
                        </div>

                        {selectedReport.status === "Menunggu Validasi" && (
                            <div className="flex justify-end gap-3 mt-5">
                                <button
                                    onClick={() => setShowReportDetail(false)}
                                    className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600 text-sm font-medium"
                                >
                                    Tutup
                                </button>
                                <Link
                                    to={`/bendahara/report-verification/detail/${selectedReport.id}`}
                                    className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium flex items-center"
                                >
                                    <MdCheckCircle className="h-4 w-4 mr-1.5" />
                                    Validasi Sekarang
                                </Link>
                            </div>
                        )}
                        {selectedReport.status !== "Menunggu Validasi" && (
                            <div className="flex justify-end gap-3 mt-5">
                                <button
                                    onClick={() => setShowReportDetail(false)}
                                    className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600 text-sm font-medium"
                                >
                                    Tutup
                                </button>
                                <Link
                                    to={`/bendahara/report-verification/detail/${selectedReport.id}`}
                                    className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium flex items-center"
                                >
                                    <MdVisibility className="h-4 w-4 mr-1.5" />
                                    Detail Lengkap
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinalFinancialValidation;
