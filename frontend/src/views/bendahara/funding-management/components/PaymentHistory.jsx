import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdHistory,
    MdFilterList,
    MdSearch,
    MdAttachMoney,
    MdFileDownload,
    MdRefresh,
    MdArrowBack,
    MdPayment,
    MdCheck,
    MdClose,
    MdError,
    MdDateRange,
    MdReceipt,
    MdOutlineTrendingUp,
    MdCalendarToday,
    MdOutlineInfo,
    MdAccountBalance,
    MdTrendingUp,
    MdTrendingDown,
    MdArrowUpward,
    MdArrowDownward,
    MdOutlineRemoveRedEye,
    MdOutlineMoreVert
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import Chart from 'react-apexcharts';

const PaymentHistory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);
    const [activeView, setActiveView] = useState("list"); // list, analytics

    // Dummy data
    const paymentStats = {
        totalPayments: 36,
        totalAmountPaid: 3200000000,
        successfulPayments: 32,
        failedPayments: 4
    };

    const paymentHistory = [
        {
            id: "PAY-2025-0036",
            proposalId: "PRP-2025-035",
            title: "Sistem Monitoring Kualitas Air Berbasis IoT",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            amount: 82000000,
            paymentDate: "05 Jun 2025",
            status: "Sukses",
            paymentMethod: "Transfer Bank",
            receiptNumber: "TRF-82761923",
            bankAccount: "BNI - 0123456789",
            notes: "Pencairan tahap pertama"
        },
        {
            id: "PAY-2025-0035",
            proposalId: "PRP-2025-032",
            title: "Pengembangan Bahan Bakar Alternatif dari Mikroalga",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            amount: 95000000,
            paymentDate: "01 Jun 2025",
            status: "Sukses",
            paymentMethod: "Transfer Bank",
            receiptNumber: "TRF-82761804",
            bankAccount: "BCA - 9876543210",
            notes: "Pencairan tahap pertama"
        },
        {
            id: "PAY-2025-0034",
            proposalId: "PRP-2025-039",
            title: "Analisis Big Data untuk Prediksi Perilaku Konsumen",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            amount: 68000000,
            paymentDate: "28 Mei 2025",
            status: "Sukses",
            paymentMethod: "Transfer Bank",
            receiptNumber: "TRF-82760978",
            bankAccount: "Mandiri - 1234567890",
            notes: "Pencairan tahap pertama"
        },
        {
            id: "PAY-2025-0033",
            proposalId: "PRP-2025-030",
            title: "Pengaruh Media Sosial terhadap Perilaku Konsumen",
            researcher: "Dr. Siti Rahayu",
            faculty: "Fakultas Ekonomi",
            amount: 70000000,
            paymentDate: "24 Mei 2025",
            status: "Gagal",
            paymentMethod: "Transfer Bank",
            receiptNumber: null,
            bankAccount: "BRI - 0987654321",
            notes: "Rekening tidak valid"
        },
        {
            id: "PAY-2025-0032",
            proposalId: "PRP-2025-038",
            title: "Analisis Dampak Ekonomi dari Perubahan Iklim di Indonesia",
            researcher: "Prof. Dewi Lestari",
            faculty: "Fakultas Ekonomi",
            amount: 65000000,
            paymentDate: "20 Mei 2025",
            status: "Sukses",
            paymentMethod: "Transfer Bank",
            receiptNumber: "TRF-82759325",
            bankAccount: "BNI - 2345678901",
            notes: "Pencairan tahap pertama"
        },
        {
            id: "PAY-2025-0031",
            proposalId: "PRP-2025-028",
            title: "Pengembangan Sistem Keamanan Jaringan Berbasis AI",
            researcher: "Dr. Eko Prasetyo",
            faculty: "Fakultas Ilmu Komputer",
            amount: 88000000,
            paymentDate: "18 Mei 2025",
            status: "Sukses",
            paymentMethod: "Transfer Bank",
            receiptNumber: "TRF-82757821",
            bankAccount: "BCA - 3456789012",
            notes: "Pencairan tahap pertama"
        }
    ];

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true
        });
    }, []);

    // Chart configuration
    const paymentTrendOptions = {
        chart: {
            type: 'area',
            toolbar: {
                show: false
            },
            fontFamily: 'inherit',
            foreColor: '#697a8d',
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
                opacityTo: 0.1,
            }
        },
        grid: {
            borderColor: '#e0e0e0',
            strokeDashArray: 3,
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    fontWeight: 400,
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return 'Rp ' + (val / 1000000).toFixed(0) + ' jt';
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return 'Rp ' + val.toLocaleString();
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 500,
            labels: {
                colors: ['#697a8d']
            },
            markers: {
                width: 10,
                height: 10,
                offsetX: -2
            }
        }
    };

    const paymentTrendSeries = [
        {
            name: 'Total Dana',
            data: [120000000, 250000000, 310000000, 420000000, 580000000, 620000000]
        },
        {
            name: 'Sukses',
            data: [100000000, 230000000, 290000000, 380000000, 550000000, 600000000]
        }
    ];

    const statusDistributionOptions = {
        chart: {
            height: 240,
            type: 'donut',
            fontFamily: 'inherit',
            foreColor: '#697a8d',
        },
        colors: ['#10b981', '#ef4444', '#f59e0b'],
        labels: ['Sukses', 'Gagal', 'Pending'],
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#566a7f',
                        }
                    }
                }
            }
        },
        legend: {
            show: false
        }
    };

    const statusDistributionSeries = [32, 4, 0];

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const openPaymentDetails = (payment) => {
        setSelectedPayment(payment);
        setShowPaymentDetails(true);
    };

    const filteredPayments = paymentHistory.filter(payment => {
        const matchesSearch =
            payment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.proposalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.id.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesDate = true;
        if (filterDate !== "all") {
            if (filterDate === "current-month") {
                matchesDate = payment.paymentDate.includes("Mei") || payment.paymentDate.includes("Jun");
            }
            else if (filterDate === "previous-month") {
                matchesDate = payment.paymentDate.includes("Apr");
            }
        }

        const matchesStatus = filterStatus === "all" || payment.status.toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesDate && matchesStatus;
    });

    return (
        <div className="pt-8 px-2">
            {/* Hero Section */}
            <div className="relative mb-10 bg-gradient-to-r from-blue-600 to-purple-500 rounded-3xl p-8 text-white overflow-hidden" data-aos="fade-up">
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
                                <h2 className="text-3xl font-bold">Riwayat Pembayaran</h2>
                                <p className="mt-2 text-blue-100">
                                    Riwayat lengkap pencairan dana untuk semua proposal yang telah disetujui
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                            <p className="text-sm text-blue-100">Total Dana Dicairkan</p>
                            <div className="flex items-center mt-1 gap-2">
                                <MdAttachMoney className="h-5 w-5" />
                                <p className="text-2xl font-bold">Rp {(paymentStats.totalAmountPaid / 1000000000).toFixed(1)} Milyar</p>
                            </div>
                        </div>

                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                            <p className="text-sm text-blue-100">Tingkat Keberhasilan</p>
                            <div className="flex items-center mt-1 gap-2">
                                <MdTrendingUp className="h-5 w-5" />
                                <p className="text-2xl font-bold">
                                    {Math.round((paymentStats.successfulPayments / paymentStats.totalPayments) * 100)}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toggle between views */}
            <div className="flex items-center justify-center md:justify-start mb-8">
                <div className="bg-white dark:bg-navy-800 rounded-xl p-1 shadow-sm border border-gray-100 dark:border-navy-700 flex">
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'list'
                                ? 'bg-brand-500 text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700'
                            }`}
                        onClick={() => setActiveView('list')}
                    >
                        <div className="flex items-center gap-2">
                            <MdHistory className="h-4 w-4" />
                            Daftar Pembayaran
                        </div>
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'analytics'
                                ? 'bg-brand-500 text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700'
                            }`}
                        onClick={() => setActiveView('analytics')}
                    >
                        <div className="flex items-center gap-2">
                            <MdOutlineTrendingUp className="h-4 w-4" />
                            Analisis Pembayaran
                        </div>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdHistory className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Pembayaran</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {paymentStats.totalPayments}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 mr-1"></span>
                                <span className="text-xs text-blue-600 dark:text-blue-400">
                                    Semua pembayaran
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-green-100 dark:bg-green-900/30">
                            <MdCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Pembayaran Sukses</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {paymentStats.successfulPayments}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <MdArrowUpward className="h-3.5 w-3.5 text-green-500" />
                                <span className="text-xs text-green-600 dark:text-green-400">
                                    {Math.round((paymentStats.successfulPayments / paymentStats.totalPayments) * 100)}% tingkat sukses
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-red-100 dark:bg-red-900/30">
                            <MdClose className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Pembayaran Gagal</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {paymentStats.failedPayments}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <MdArrowDownward className="h-3.5 w-3.5 text-red-500" />
                                <span className="text-xs text-red-600 dark:text-red-400">
                                    {Math.round((paymentStats.failedPayments / paymentStats.totalPayments) * 100)}% tingkat gagal
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-purple-100 dark:bg-purple-900/30">
                            <MdAttachMoney className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Dana Dicairkan</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                Rp {(paymentStats.totalAmountPaid / 1000000000).toFixed(1)} M
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-500 mr-1"></span>
                                <span className="text-xs text-purple-600 dark:text-purple-400">
                                    Tahun anggaran 2025
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {activeView === 'analytics' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <Card extra="p-6 lg:col-span-2" data-aos="fade-up" data-aos-delay="300">
                        <div className="flex items-center justify-between mb-6">
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                Tren Pencairan Dana
                            </h5>
                            <div className="flex items-center space-x-2">
                                <select
                                    className="px-2 py-1 text-sm rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white"
                                >
                                    <option value="6months">6 Bulan Terakhir</option>
                                    <option value="year">1 Tahun</option>
                                    <option value="all">Semua</option>
                                </select>
                            </div>
                        </div>

                        <div className="h-80">
                            <Chart
                                options={paymentTrendOptions}
                                series={paymentTrendSeries}
                                type="area"
                                height="100%"
                            />
                        </div>
                    </Card>

                    <Card extra="p-6" data-aos="fade-up" data-aos-delay="350">
                        <div className="flex items-center justify-between mb-6">
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                Distribusi Status
                            </h5>
                        </div>

                        <div className="h-60">
                            <Chart
                                options={statusDistributionOptions}
                                series={statusDistributionSeries}
                                type="donut"
                                height="100%"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4">
                            <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-navy-800">
                                <div className="w-3 h-3 rounded-full bg-green-500 mb-1"></div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Sukses</p>
                                <p className="text-sm font-medium text-navy-700 dark:text-white">
                                    {paymentStats.successfulPayments}
                                </p>
                            </div>
                            <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-navy-800">
                                <div className="w-3 h-3 rounded-full bg-red-500 mb-1"></div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Gagal</p>
                                <p className="text-sm font-medium text-navy-700 dark:text-white">
                                    {paymentStats.failedPayments}
                                </p>
                            </div>
                            <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-navy-800">
                                <div className="w-3 h-3 rounded-full bg-amber-500 mb-1"></div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
                                <p className="text-sm font-medium text-navy-700 dark:text-white">0</p>
                            </div>
                        </div>
                    </Card>
                </div>
            ) : null}

            <Card extra="p-6" data-aos="fade-up" data-aos-delay={activeView === 'analytics' ? "400" : "300"}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                        Daftar Riwayat Pembayaran
                    </h5>
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-grow w-full md:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MdSearch className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari pembayaran..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MdCalendarToday className="h-5 w-5 text-gray-400" />
                                </div>
                                <select
                                    className="appearance-none pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                >
                                    <option value="all">Semua Tanggal</option>
                                    <option value="current-month">Bulan Ini</option>
                                    <option value="previous-month">Bulan Lalu</option>
                                </select>
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
                                    <option value="sukses">Sukses</option>
                                    <option value="gagal">Gagal</option>
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

                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-navy-700">
                    <table className="w-full min-w-[800px] table-auto">
                        <thead className="bg-gray-50 dark:bg-navy-800">
                            <tr>
                                <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300 rounded-tl-lg">
                                    ID Pembayaran
                                </th>
                                <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Proposal
                                </th>
                                <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Peneliti
                                </th>
                                <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Jumlah
                                </th>
                                <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Tanggal
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
                            {filteredPayments.length > 0 ? (
                                filteredPayments.map((payment, index) => (
                                    <tr key={index} className="border-t border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                            <div className="flex items-center">
                                                <div className={`w-2 h-2 rounded-full ${payment.status === "Sukses" ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
                                                {payment.id}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm">
                                            <div>
                                                <Link to={`/bendahara/funding-management/proposal/${payment.proposalId}`} className="font-medium text-navy-700 dark:text-white hover:text-brand-500 dark:hover:text-brand-400">
                                                    {payment.proposalId}
                                                </Link>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1" title={payment.title}>
                                                    {payment.title}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center mr-2">
                                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                        {payment.researcher.split(' ')[0][0]}{payment.researcher.split(' ')[1]?.[0]}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                                                        {payment.researcher}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {payment.faculty}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-semibold text-navy-700 dark:text-white">
                                            Rp {payment.amount.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                                                <MdCalendarToday className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                                                <span>{payment.paymentDate}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2.5 py-1.5 text-xs font-medium rounded-full flex items-center w-fit gap-1 ${payment.status === "Sukses"
                                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                                }`}>
                                                {payment.status === "Sukses" ? <MdCheck className="h-3.5 w-3.5" /> : <MdClose className="h-3.5 w-3.5" />}
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => openPaymentDetails(payment)}
                                                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 text-gray-700 dark:text-white transition-colors flex items-center gap-1.5"
                                            >
                                                <MdOutlineRemoveRedEye className="h-4 w-4" />
                                                Detail
                                            </button>
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
                                            Tidak ada pembayaran yang sesuai dengan kriteria pencarian
                                            <button
                                                onClick={() => {
                                                    setSearchTerm("");
                                                    setFilterDate("all");
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

                {filteredPayments.length > 0 && (
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Menampilkan {filteredPayments.length} dari {paymentHistory.length} pembayaran
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

            {/* Payment Details Modal */}
            {showPaymentDetails && selectedPayment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-navy-800 rounded-2xl w-full max-w-xl shadow-xl overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${selectedPayment.status === "Sukses"
                                            ? "bg-green-100 dark:bg-green-900/30"
                                            : "bg-red-100 dark:bg-red-900/30"
                                        }`}>
                                        {selectedPayment.status === "Sukses"
                                            ? <MdCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                                            : <MdError className="h-6 w-6 text-red-600 dark:text-red-400" />
                                        }
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                                            Detail Pembayaran
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {selectedPayment.id}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowPaymentDetails(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
                                >
                                    <MdClose className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className={`py-2 px-4 rounded-lg ${selectedPayment.status === "Sukses"
                                        ? "bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500"
                                        : "bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500"
                                    }`}>
                                    <div className="flex items-center">
                                        <p className={`text-sm font-medium ${selectedPayment.status === "Sukses"
                                                ? "text-green-700 dark:text-green-400"
                                                : "text-red-700 dark:text-red-400"
                                            }`}>
                                            {selectedPayment.status === "Sukses"
                                                ? "Pembayaran Berhasil"
                                                : "Pembayaran Gagal"
                                            }
                                        </p>
                                        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                                            {selectedPayment.paymentDate}
                                        </span>
                                    </div>
                                    {selectedPayment.status !== "Sukses" && (
                                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                            {selectedPayment.notes}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        Informasi Proposal
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">ID Proposal</p>
                                            <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                                {selectedPayment.proposalId}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Judul</p>
                                            <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                                {selectedPayment.title}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Peneliti</p>
                                            <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                                {selectedPayment.researcher}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                {selectedPayment.faculty}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        Detail Pembayaran
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Jumlah</p>
                                            <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                                Rp {selectedPayment.amount.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Metode Pembayaran</p>
                                            <p className="text-sm font-medium text-navy-700 dark:text-white mt-1">
                                                {selectedPayment.paymentMethod}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                {selectedPayment.bankAccount}
                                            </p>
                                        </div>
                                        {selectedPayment.receiptNumber && (
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Nomor Referensi</p>
                                                <p className="text-sm font-medium text-brand-500 dark:text-brand-400 mt-1">
                                                    {selectedPayment.receiptNumber}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {selectedPayment.status === "Sukses" && (
                                <div className="border-t border-gray-200 dark:border-navy-700 pt-4">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                                        <MdReceipt className="h-4 w-4 text-brand-500 mr-1" />
                                        Bukti Pembayaran
                                    </h4>
                                    <div className="p-4 rounded-lg border border-dashed border-gray-200 dark:border-navy-600 flex flex-col items-center justify-center">
                                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-2">
                                            <MdReceipt className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                                            Bukti Transfer - {selectedPayment.receiptNumber}.pdf
                                        </p>
                                        <button className="mt-3 px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-500/20 text-brand-500 dark:text-brand-400 text-xs font-medium hover:bg-brand-100 dark:hover:bg-brand-500/30 transition-colors">
                                            Download Bukti Pembayaran
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setShowPaymentDetails(false)}
                                    className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-navy-600 text-sm font-medium transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
