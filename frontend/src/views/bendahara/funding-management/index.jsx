import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdPayment,
    MdOutlineAttachMoney,
    MdList,
    MdHistory,
    MdCalendarToday,
    MdDescription,
    MdArrowUpward,
    MdSearch,
    MdFilterList,
    MdDownload,
    MdMoreHoriz,
    MdChevronRight,
    MdInsights,
    MdDashboard
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import Chart from 'react-apexcharts';

const FundingManagement = () => {
    const [selectedTab, setSelectedTab] = useState('summary');

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true
        });
    }, []);

    // Chart options for the summary card
    const disbursementChartOptions = {
        chart: {
            type: 'donut',
            fontFamily: 'inherit',
            foreColor: '#697a8d',
            sparkline: {
                enabled: true
            }
        },
        colors: ['#10b981', '#3b82f6', '#9ca3af'],
        labels: ['Dicairkan', 'Diproses', 'Menunggu'],
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '75%'
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 80
                }
            }
        }]
    };

    const disbursementChartSeries = [55, 15, 30]; // Percentages

    const managementModules = [
        {
            title: "Daftar Proposal Disetujui",
            description: "Kelola semua proposal penelitian yang telah disetujui untuk mendapatkan pembiayaan",
            icon: <MdList className="h-8 w-8 text-brand-500" />,
            path: "/bendahara/funding-management/approved-proposals",
            color: "bg-brand-50 dark:bg-brand-900/20",
            delay: 100
        },
        {
            title: "Pencairan Dana",
            description: "Proses pencairan dana penelitian sesuai dengan jadwal dan persyaratan",
            icon: <MdOutlineAttachMoney className="h-8 w-8 text-green-500" />,
            path: "/bendahara/funding-management/fund-disbursement",
            color: "bg-green-50 dark:bg-green-900/20",
            delay: 150
        },
        {
            title: "Riwayat Pembayaran",
            description: "Lihat seluruh riwayat transaksi pembiayaan penelitian yang telah dilakukan",
            icon: <MdHistory className="h-8 w-8 text-blue-500" />,
            path: "/bendahara/funding-management/payment-history",
            color: "bg-blue-50 dark:bg-blue-900/20",
            delay: 200
        },
        {
            title: "Jadwal Pencairan",
            description: "Kelola jadwal pencairan dana sesuai dengan tahapan pembiayaan penelitian",
            icon: <MdCalendarToday className="h-8 w-8 text-purple-500" />,
            path: "/bendahara/funding-management/disbursement-schedule",
            color: "bg-purple-50 dark:bg-purple-900/20",
            delay: 250
        },
        {
            title: "Laporan Keuangan per Proposal",
            description: "Lihat dan kelola laporan keuangan untuk setiap proposal penelitian",
            icon: <MdDescription className="h-8 w-8 text-amber-500" />,
            path: "/bendahara/funding-management/proposal-financial-reports",
            color: "bg-amber-50 dark:bg-amber-900/20",
            delay: 300
        }
    ];

    return (
        <div className="pt-6 px-2">
            {/* Hero Section */}
            <div className="relative mb-8 bg-gradient-to-r from-brand-600 to-brand-400 rounded-3xl p-8 text-white overflow-hidden" data-aos="fade-up">
                <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">Manajemen Pembiayaan</h2>
                            <p className="mt-2 text-brand-100 max-w-xl">
                                Kelola seluruh aspek pembiayaan penelitian dari persetujuan hingga pencairan dana dengan efisien dan transparan
                            </p>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <button className="px-4 py-2.5 rounded-xl bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm transition-all flex items-center gap-2 font-medium">
                                <MdSearch className="h-5 w-5" /> Cari Proposal
                            </button>
                            <button className="p-2.5 rounded-xl bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm transition-all">
                                <MdFilterList className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                            <p className="text-sm text-brand-100">Total Dana</p>
                            <p className="text-2xl font-bold">Rp 2,750,000,000</p>
                        </div>
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                            <p className="text-sm text-brand-100">Sudah Dicairkan</p>
                            <p className="text-2xl font-bold">Rp 1,500,000,000</p>
                        </div>
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                            <p className="text-sm text-brand-100">Proposal Aktif</p>
                            <p className="text-2xl font-bold">42</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center mb-6 border-b border-gray-200 dark:border-navy-700" data-aos="fade-up">
                <button
                    onClick={() => setSelectedTab('summary')}
                    className={`px-5 py-3 font-medium text-sm transition-colors relative ${selectedTab === 'summary'
                            ? 'text-brand-500 dark:text-brand-400'
                            : 'text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <MdDashboard className={selectedTab === 'summary' ? "h-5 w-5 text-brand-500" : "h-5 w-5"} />
                        Ringkasan
                    </div>
                    {selectedTab === 'summary' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 dark:bg-brand-400"></div>
                    )}
                </button>
                <button
                    onClick={() => setSelectedTab('modules')}
                    className={`px-5 py-3 font-medium text-sm transition-colors relative ${selectedTab === 'modules'
                            ? 'text-brand-500 dark:text-brand-400'
                            : 'text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <MdInsights className={selectedTab === 'modules' ? "h-5 w-5 text-brand-500" : "h-5 w-5"} />
                        Modul Manajemen
                    </div>
                    {selectedTab === 'modules' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 dark:bg-brand-400"></div>
                    )}
                </button>
            </div>

            {selectedTab === 'modules' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {managementModules.map((module, index) => (
                        <Link to={module.path} key={index}>
                            <Card
                                extra={`flex flex-col p-6 hover:shadow-xl transition-all duration-300 cursor-pointer h-full transform hover:-translate-y-1 overflow-hidden relative ${module.color}`}
                                data-aos="fade-up"
                                data-aos-delay={module.delay}
                            >
                                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-gray-100 to-white dark:from-navy-800 dark:to-navy-700 opacity-20 transform translate-x-8 -translate-y-8"></div>
                                <div className="flex items-center justify-between">
                                    <div className="rounded-2xl p-3 bg-white dark:bg-navy-700 shadow-sm">
                                        {module.icon}
                                    </div>
                                    <MdChevronRight className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                                </div>
                                <h4 className="mt-4 text-xl font-bold text-navy-700 dark:text-white">
                                    {module.title}
                                </h4>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex-grow">
                                    {module.description}
                                </p>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

            {selectedTab === 'summary' && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div data-aos="fade-up" data-aos-delay="150" className="lg:col-span-2">
                            <Card extra="p-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="mb-4 md:mb-0">
                                        <h4 className="text-xl font-bold text-navy-700 dark:text-white flex items-center gap-2">
                                            <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-500/20">
                                                <MdOutlineAttachMoney className="h-5 w-5 text-brand-500" />
                                            </div>
                                            Ringkasan Status Pembiayaan
                                        </h4>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                                            Data pencairan dana Q2 2025
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button className="px-4 py-2 rounded-lg bg-white dark:bg-navy-700 border border-gray-200 dark:border-navy-600 text-gray-700 dark:text-white text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-navy-800 flex items-center gap-2">
                                            <MdFilterList className="h-4 w-4" />
                                            Filter
                                        </button>
                                        <button className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors flex items-center gap-2">
                                            <MdDownload className="h-4 w-4" />
                                            Ekspor
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-xl flex justify-between items-center">
                                        <div>
                                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Proposal Disetujui
                                            </h5>
                                            <p className="mt-2 text-2xl font-bold text-navy-700 dark:text-white">
                                                42
                                            </p>
                                            <div className="mt-1 flex items-center">
                                                <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-0.5">
                                                    <MdArrowUpward className="h-3 w-3" /> +8%
                                                </span>
                                                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                                    periode sebelumnya
                                                </span>
                                            </div>
                                        </div>
                                        <div className="h-16 w-16 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center">
                                            <MdList className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                        </div>
                                    </div>

                                    <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-xl flex justify-between items-center">
                                        <div>
                                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Dana Dicairkan
                                            </h5>
                                            <p className="mt-2 text-2xl font-bold text-navy-700 dark:text-white">
                                                Rp 1,5M
                                            </p>
                                            <div className="mt-1 flex items-center">
                                                <span className="text-xs text-green-600 dark:text-green-400">
                                                    55%
                                                </span>
                                                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                                    dari total anggaran
                                                </span>
                                            </div>
                                        </div>
                                        <div className="h-16 w-16 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center">
                                            <MdOutlineAttachMoney className="h-8 w-8 text-green-600 dark:text-green-400" />
                                        </div>
                                    </div>

                                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl flex justify-between items-center">
                                        <div>
                                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Menunggu Persetujuan
                                            </h5>
                                            <p className="mt-2 text-2xl font-bold text-navy-700 dark:text-white">
                                                Rp 367,5M
                                            </p>
                                            <div className="mt-1 flex items-center">
                                                <span className="text-xs text-amber-600 dark:text-amber-400">
                                                    8 proposal
                                                </span>
                                                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                                    perlu tindakan
                                                </span>
                                            </div>
                                        </div>
                                        <div className="h-16 w-16 bg-amber-100 dark:bg-amber-800/30 rounded-full flex items-center justify-center">
                                            <MdHistory className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div data-aos="fade-up" data-aos-delay="300">
                            <Card extra="p-6 h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-bold text-navy-700 dark:text-white flex items-center gap-2">
                                        <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/20">
                                            <MdInsights className="h-4 w-4 text-purple-500" />
                                        </div>
                                        Distribusi Dana
                                    </h4>
                                    <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-navy-800">
                                        <MdMoreHoriz className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    </button>
                                </div>

                                <div className="h-[220px] flex items-center justify-center">
                                    <Chart
                                        options={disbursementChartOptions}
                                        series={disbursementChartSeries}
                                        type="donut"
                                        height="100%"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    <div className="text-center p-2">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Dicairkan</p>
                                        <p className="text-sm font-medium mt-1 text-green-600 dark:text-green-400">55%</p>
                                    </div>
                                    <div className="text-center p-2">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Diproses</p>
                                        <p className="text-sm font-medium mt-1 text-blue-600 dark:text-blue-400">15%</p>
                                    </div>
                                    <div className="text-center p-2">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Menunggu</p>
                                        <p className="text-sm font-medium mt-1 text-gray-600 dark:text-gray-400">30%</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    <Card extra="p-6" data-aos="fade-up" data-aos-delay="400">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-lg font-bold text-navy-700 dark:text-white flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/20">
                                    <MdCalendarToday className="h-4 w-4 text-blue-500" />
                                </div>
                                Progres Pencairan Dana
                            </h4>
                            <button className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-navy-700 dark:hover:bg-navy-800 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                                Lihat Semua
                            </button>
                        </div>

                        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 dark:scrollbar-thumb-navy-600">
                            <table className="w-full min-w-[600px] table-auto">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-navy-800 rounded-lg">
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300 rounded-l-lg">
                                            Tahap Pencairan
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Target
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Terealisasi
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Progres
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300 rounded-r-lg">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                                Pencairan Tahap I
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                            Rp 1,375,000,000
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                            Rp 1,375,000,000
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2 max-w-[100px] overflow-hidden">
                                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                                </div>
                                                <span className="text-green-600 dark:text-green-400 whitespace-nowrap">100%</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm">
                                            <span className="px-2.5 py-1.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                Selesai
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                                                Pencairan Tahap II
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                            Rp 825,000,000
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                            Rp 125,000,000
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2 max-w-[100px] overflow-hidden">
                                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                                                </div>
                                                <span className="text-blue-600 dark:text-blue-400 whitespace-nowrap">15%</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm">
                                            <span className="px-2.5 py-1.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                                Dalam Proses
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                                                Pencairan Tahap III
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                            Rp 550,000,000
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-navy-700 dark:text-white">
                                            Rp 0
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2 max-w-[100px] overflow-hidden">
                                                    <div className="bg-gray-400 dark:bg-gray-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                                                </div>
                                                <span className="text-gray-600 dark:text-gray-400 whitespace-nowrap">0%</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm">
                                            <span className="px-2.5 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
                                                Belum Dimulai
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </>
            )}
        </div>
    );
};

export default FundingManagement;
