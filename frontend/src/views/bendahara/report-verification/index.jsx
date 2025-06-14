import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdVerifiedUser, MdSearch, MdFilterList, MdRefresh, MdAssessment, MdOutlineInsertChart,
    MdMonetizationOn, MdReceiptLong, MdVerified, MdFactCheck, MdKeyboardArrowDown,
    MdOutlineFilterAlt, MdOutlineCalendarToday, MdPerson, MdArrowForward,
    MdArrowUpward, MdNotifications, MdOutlinePriorityHigh, MdDescription,
    MdWarning, MdCancel, MdDone
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import Chart from 'react-apexcharts'; // Make sure to install this package

const ReportVerification = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    // Dummy data for report verification
    const reportVerificationStats = {
        totalReports: 42,
        pendingVerification: 18,
        verified: 24,
        rejectedReports: 3
    };

    const recentReports = [
        {
            id: "RPT-2025-0042",
            title: "Laporan Penggunaan Dana Penelitian Machine Learning",
            researcher: "Dr. Budi Santoso",
            faculty: "Fakultas Teknik",
            submittedDate: "11 Jun 2025",
            status: "Menunggu Verifikasi",
            type: "Keuangan",
            priority: "Tinggi"
        },
        {
            id: "RPT-2025-0041",
            title: "Bukti Pengeluaran Penelitian Ekonomi Perubahan Iklim",
            researcher: "Prof. Dewi Lestari",
            faculty: "Fakultas Ekonomi",
            submittedDate: "10 Jun 2025",
            status: "Menunggu Verifikasi",
            type: "Bukti Pengeluaran",
            priority: "Sedang"
        },
        {
            id: "RPT-2025-0040",
            title: "Laporan Akhir Keuangan Metode Pembelajaran Jarak Jauh",
            researcher: "Dr. Andi Wijaya",
            faculty: "Fakultas Psikologi",
            submittedDate: "09 Jun 2025",
            status: "Terverifikasi",
            type: "Laporan Akhir",
            priority: "Rendah"
        },
        {
            id: "RPT-2025-0039",
            title: "Laporan Penggunaan Dana Monitoring Kualitas Air",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            submittedDate: "08 Jun 2025",
            status: "Terverifikasi",
            type: "Keuangan",
            priority: "Tinggi"
        },
        {
            id: "RPT-2025-0038",
            title: "Bukti Pengeluaran Bahan Bakar Alternatif",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            submittedDate: "07 Jun 2025",
            status: "Ditolak",
            type: "Bukti Pengeluaran",
            priority: "Sedang"
        },
    ];

    const verificationModules = [
        {
            title: "Laporan Kemajuan Keuangan",
            description: "Verifikasi laporan kemajuan penggunaan dana penelitian dari para peneliti",
            icon: <MdAssessment className="h-8 w-8 text-blue-500" />,
            path: "/bendahara/report-verification/financial-progress-reports",
            color: "bg-blue-50 dark:bg-blue-900/20",
            count: 12,
            delay: 100
        },
        {
            title: "Laporan Penggunaan Dana",
            description: "Verifikasi dan validasi laporan penggunaan dana sesuai dengan anggaran",
            icon: <MdMonetizationOn className="h-8 w-8 text-green-500" />,
            path: "/bendahara/report-verification/fund-utilization-reports",
            color: "bg-green-50 dark:bg-green-900/20",
            count: 8,
            delay: 150
        },
        {
            title: "Verifikasi Bukti Pengeluaran",
            description: "Verifikasi bukti pengeluaran dari kegiatan penelitian yang dibiayai",
            icon: <MdReceiptLong className="h-8 w-8 text-amber-500" />,
            path: "/bendahara/report-verification/expense-verification",
            color: "bg-amber-50 dark:bg-amber-900/20",
            count: 18,
            delay: 200
        },
        {
            title: "Validasi Laporan Akhir Keuangan",
            description: "Validasi laporan keuangan akhir untuk penutupan proyek penelitian",
            icon: <MdVerified className="h-8 w-8 text-purple-500" />,
            path: "/bendahara/report-verification/final-financial-validation",
            color: "bg-purple-50 dark:bg-purple-900/20",
            count: 4,
            delay: 250
        },
        {
            title: "Status Bebas TGR",
            description: "Verifikasi status TGR untuk peneliti dan proyek penelitian",
            icon: <MdFactCheck className="h-8 w-8 text-red-500" />,
            path: "/bendahara/report-verification/tgr-status-verification",
            color: "bg-red-50 dark:bg-red-900/20",
            count: 3,
            delay: 300
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
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.id.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterStatus === "all") return matchesSearch;
        return matchesSearch && report.status.toLowerCase() === filterStatus.toLowerCase();
    });

    // Chart configuration for verification stats
    const verificationStatsOptions = {
        chart: {
            type: 'donut',
            fontFamily: 'inherit',
            foreColor: '#697a8d',
            toolbar: {
                show: false
            }
        },
        colors: ['#16a34a', '#f59e0b', '#ef4444'],
        labels: ['Terverifikasi', 'Menunggu', 'Ditolak'],
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
                                return reportVerificationStats.totalReports;
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

    const verificationStatsSeries = [
        reportVerificationStats.verified,
        reportVerificationStats.pendingVerification,
        reportVerificationStats.rejectedReports
    ];

    // Weekly trends chart
    const weeklyTrendsOptions = {
        chart: {
            type: 'area',
            height: 200,
            fontFamily: 'inherit',
            foreColor: '#697a8d',
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: false
            }
        },
        colors: ['#3b82f6', '#10b981'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.6,
                opacityTo: 0.1
            }
        },
        xaxis: {
            categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
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
            show: false
        },
        grid: {
            borderColor: '#e0e0e0',
            strokeDashArray: 5,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            fontSize: '12px',
            fontFamily: 'inherit'
        }
    };

    const weeklyTrendsSeries = [
        {
            name: 'Laporan Masuk',
            data: [4, 5, 8, 6, 7, 3, 6]
        },
        {
            name: 'Terverifikasi',
            data: [3, 4, 6, 5, 7, 2, 4]
        }
    ];

    const getStatusBadgeClass = (status) => {
        switch (status.toLowerCase()) {
            case 'terverifikasi': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'menunggu verifikasi': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
            case 'ditolak': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    const getTypeBadgeClass = (type) => {
        switch (type.toLowerCase()) {
            case 'keuangan': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'bukti pengeluaran': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
            case 'laporan akhir': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'terverifikasi': return <MdDone className="h-4 w-4" />;
            case 'menunggu verifikasi': return <MdOutlineCalendarToday className="h-4 w-4" />;
            case 'ditolak': return <MdCancel className="h-4 w-4" />;
            default: return null;
        }
    };

    const getPriorityBadgeClass = (priority) => {
        switch (priority.toLowerCase()) {
            case 'tinggi': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            case 'sedang': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
            case 'rendah': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    return (
        <div className="pt-8 px-2">
            {/* Hero Section */}
            <div className="relative mb-10 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl p-8 text-white overflow-hidden" data-aos="fade-up">
                <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full transform -translate-x-10 translate-y-10"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-8 lg:mb-0 lg:mr-8 lg:max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Verifikasi Laporan</h1>
                        <p className="text-indigo-100 text-lg mb-6">
                            Pantau dan verifikasi laporan keuangan serta bukti pengeluaran penelitian dengan pengalaman pengguna yang lebih baik.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                                <p className="text-sm text-indigo-100">Total Laporan</p>
                                <div className="flex items-center mt-1 gap-2">
                                    <MdDescription className="h-5 w-5" />
                                    <p className="text-2xl font-bold">{reportVerificationStats.totalReports}</p>
                                </div>
                            </div>
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                                <p className="text-sm text-indigo-100">Perlu Diverifikasi</p>
                                <div className="flex items-center mt-1 gap-2">
                                    <MdOutlinePriorityHigh className="h-5 w-5" />
                                    <p className="text-2xl font-bold">{reportVerificationStats.pendingVerification}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:max-w-xs">
                        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5">
                            <div className="text-center mb-3">
                                <h3 className="text-lg font-semibold">Status Verifikasi</h3>
                                <p className="text-sm text-indigo-100">Periode: Juni 2025</p>
                            </div>
                            <Chart
                                options={verificationStatsOptions}
                                series={verificationStatsSeries}
                                type="donut"
                                height={200}
                            />
                            <div className="grid grid-cols-3 mt-2 gap-2">
                                <div className="text-center">
                                    <div className="flex justify-center items-center mb-1">
                                        <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
                                        <span className="text-xs">Terverifikasi</span>
                                    </div>
                                    <p className="font-semibold">{reportVerificationStats.verified}</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex justify-center items-center mb-1">
                                        <div className="w-3 h-3 rounded-full bg-amber-400 mr-1"></div>
                                        <span className="text-xs">Menunggu</span>
                                    </div>
                                    <p className="font-semibold">{reportVerificationStats.pendingVerification}</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex justify-center items-center mb-1">
                                        <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
                                        <span className="text-xs">Ditolak</span>
                                    </div>
                                    <p className="font-semibold">{reportVerificationStats.rejectedReports}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Cards */}
            <div className="flex items-center justify-between mb-6" data-aos="fade-up">
                <h2 className="text-xl font-bold text-navy-700 dark:text-white">
                    Modul Verifikasi Laporan
                </h2>
                <Link to="/bendahara/report-verification/all" className="text-sm text-brand-500 hover:text-brand-600 font-medium flex items-center">
                    Lihat Semua
                    <MdArrowForward className="ml-1 h-4 w-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-8" data-aos="fade-up">
                {verificationModules.map((module, index) => (
                    <Link key={index} to={module.path}>
                        <Card
                            extra={`p-5 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-navy-700 hover:border-brand-500 dark:hover:border-brand-500 h-full`}
                            data-aos="fade-up"
                            data-aos-delay={module.delay}
                        >
                            <div className="flex flex-col h-full">
                                <div className={`rounded-xl p-3 ${module.color} mb-3`}>
                                    {module.icon}
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-base font-bold text-navy-700 dark:text-white">
                                        {module.title}
                                    </h4>
                                    <div className="px-2 py-1 bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 text-xs font-medium rounded-full">
                                        {module.count}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 flex-grow">
                                    {module.description}
                                </p>
                                <div className="text-right">
                                    <span className="text-brand-500 text-xs font-medium flex items-center justify-end">
                                        Detail
                                        <MdArrowForward className="ml-1 h-3 w-3" />
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                <Card extra="p-5 xl:col-span-2" data-aos="fade-up">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                            Aktivitas Verifikasi
                        </h3>
                        <div className="bg-gray-50 dark:bg-navy-900 text-xs text-gray-500 dark:text-gray-400 px-3 py-1 rounded-lg">
                            7 Hari Terakhir
                        </div>
                    </div>
                    <Chart
                        options={weeklyTrendsOptions}
                        series={weeklyTrendsSeries}
                        type="area"
                        height={200}
                    />

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                        <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Hari Ini
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                                <h4 className="text-xl font-bold text-navy-700 dark:text-white">6</h4>
                                <span className="text-xs flex items-center text-green-500">
                                    <MdArrowUpward className="h-3 w-3" />
                                    20%
                                </span>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Kemarin
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                                <h4 className="text-xl font-bold text-navy-700 dark:text-white">3</h4>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Terverifikasi
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                                <h4 className="text-xl font-bold text-green-600 dark:text-green-400">24</h4>
                                <span className="text-xs flex items-center text-green-500">
                                    <MdArrowUpward className="h-3 w-3" />
                                    12%
                                </span>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Ditolak
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                                <h4 className="text-xl font-bold text-red-600 dark:text-red-400">3</h4>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-0" data-aos="fade-up">
                    <div className="p-5 border-b border-gray-100 dark:border-navy-700">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                                <MdNotifications className="mr-2 h-5 w-5 text-amber-500" />
                                Perlu Tindakan
                            </h3>
                            <span className="px-2.5 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-medium rounded-full">
                                {reportVerificationStats.pendingVerification} menunggu
                            </span>
                        </div>
                    </div>

                    <div className="p-5 max-h-[320px] overflow-y-auto">
                        <div className="space-y-3">
                            {recentReports.filter(report => report.status === "Menunggu Verifikasi").map((report, index) => (
                                <Link key={index} to={`/bendahara/report-verification/detail/${report.id}`}>
                                    <div className="p-3 border border-gray-100 dark:border-navy-700 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-900 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full flex items-center gap-1 ${getTypeBadgeClass(report.type)}`}>
                                                {report.type}
                                            </span>
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityBadgeClass(report.priority)}`}>
                                                {report.priority}
                                            </span>
                                        </div>
                                        <h4 className="font-medium text-sm text-navy-700 dark:text-white mb-1 line-clamp-1">
                                            {report.title}
                                        </h4>
                                        <div className="flex items-center justify-between text-xs">
                                            <div className="text-gray-500 dark:text-gray-400">
                                                {report.researcher}
                                            </div>
                                            <div className="flex items-center text-amber-600 dark:text-amber-400">
                                                <MdOutlineCalendarToday className="h-3 w-3 mr-1" />
                                                {report.submittedDate}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="p-3 border-t border-gray-100 dark:border-navy-700 bg-gray-50 dark:bg-navy-900">
                        <Link to="/bendahara/report-verification/pending" className="flex items-center justify-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400">
                            Lihat Semua Menunggu Verifikasi
                            <MdArrowForward className="h-4 w-4" />
                        </Link>
                    </div>
                </Card>
            </div>

            <Card extra="p-5" data-aos="fade-up">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                        Laporan Terbaru untuk Diverifikasi
                    </h3>
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
                                    <MdOutlineFilterAlt className="h-5 w-5 text-gray-400" />
                                </div>
                                <select
                                    className="appearance-none pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="menunggu verifikasi">Menunggu Verifikasi</option>
                                    <option value="terverifikasi">Terverifikasi</option>
                                    <option value="ditolak">Ditolak</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <MdKeyboardArrowDown className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleRefresh}
                            className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors"
                            title="Refresh data"
                        >
                            <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-navy-700">
                    <table className="w-full min-w-[800px] table-auto">
                        <thead className="bg-gray-50 dark:bg-navy-800">
                            <tr>
                                <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300 rounded-tl-lg">
                                    ID Laporan
                                </th>
                                <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Jenis & Prioritas
                                </th>
                                <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Judul Laporan
                                </th>
                                <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Peneliti & Fakultas
                                </th>
                                <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Tanggal
                                </th>
                                <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300 rounded-tr-lg">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.length > 0 ? (
                                filteredReports.map((report, index) => (
                                    <tr key={index} className="border-t border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                            <Link to={`/bendahara/report-verification/detail/${report.id}`}>
                                                {report.id}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col gap-2">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center w-fit gap-1 ${getTypeBadgeClass(report.type)}`}>
                                                    {report.type}
                                                </span>
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center w-fit gap-1 ${getPriorityBadgeClass(report.priority)}`}>
                                                    <MdOutlinePriorityHigh className="h-3 w-3" />
                                                    {report.priority}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Link to={`/bendahara/report-verification/detail/${report.id}`} className="text-sm font-medium text-navy-700 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 block max-w-[280px]">
                                                <div className="line-clamp-2">
                                                    {report.title}
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center">
                                                <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center mr-3">
                                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                        {report.researcher.split(" ").map(n => n[0]).join("")}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                                                        {report.researcher}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {report.faculty}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                                                <MdOutlineCalendarToday className="h-4 w-4 mr-1.5" />
                                                {report.submittedDate}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center w-fit gap-1 ${getStatusBadgeClass(report.status)}`}>
                                                {getStatusIcon(report.status)}
                                                {report.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-gray-500 dark:text-gray-400">
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
                            Menampilkan {filteredReports.length} dari {recentReports.length} laporan
                        </div>
                        <Link to="/bendahara/report-verification/all" className="text-brand-500 hover:text-brand-600 font-medium flex items-center">
                            Lihat Semua Laporan
                            <MdArrowForward className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ReportVerification;
