import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdHistory,
    MdTimeline,
    MdPerson,
    MdReceiptLong,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdFileDownload,
    MdDateRange,
    MdPersonAdd,
    MdEdit,
    MdVerifiedUser,
    MdAttachMoney,
    MdAssessment,
    MdWarning,
    MdAssignmentTurnedIn
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const ActivityTracker = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterActivity, setFilterActivity] = useState("all");
    const [filterDate, setFilterDate] = useState("all");
    const [timelineView, setTimelineView] = useState(false);

    // Dummy data for Activity Tracker
    const activityStats = {
        totalActivities: 168,
        loginActivities: 42,
        financialActivities: 78,
        verificationActivities: 36,
        exportActivities: 12
    };

    const recentActivities = [
        {
            id: "ACT-2025-0168",
            user: "Bendahara",
            action: "Verifikasi Laporan Keuangan",
            description: "Memverifikasi laporan penggunaan dana penelitian Machine Learning",
            target: "RPT-2025-0042",
            targetType: "Laporan",
            timestamp: "Hari ini, 14:32",
            date: "15 Jun 2025",
            type: "Verifikasi",
            icon: <MdVerifiedUser className="h-5 w-5 text-blue-500" />
        },
        {
            id: "ACT-2025-0167",
            user: "Bendahara",
            action: "Pencairan Dana Penelitian",
            description: "Melakukan pencairan dana untuk penelitian Analisis Dampak Ekonomi dari Perubahan Iklim",
            target: "PRP-2025-038",
            targetType: "Proposal",
            timestamp: "Hari ini, 11:15",
            date: "15 Jun 2025",
            type: "Keuangan",
            icon: <MdAttachMoney className="h-5 w-5 text-green-500" />
        },
        {
            id: "ACT-2025-0166",
            user: "Bendahara",
            action: "Login ke Sistem",
            description: "Login sukses ke dalam sistem SmartProposal",
            target: null,
            targetType: null,
            timestamp: "Hari ini, 08:03",
            date: "15 Jun 2025",
            type: "Login",
            icon: <MdPerson className="h-5 w-5 text-gray-500" />
        },
        {
            id: "ACT-2025-0165",
            user: "Bendahara",
            action: "Ekspor Laporan Keuangan",
            description: "Mengekspor laporan keuangan bulanan Mei 2025",
            target: "FRP-2025-035",
            targetType: "Laporan",
            timestamp: "Kemarin, 16:45",
            date: "14 Jun 2025",
            type: "Ekspor",
            icon: <MdFileDownload className="h-5 w-5 text-purple-500" />
        },
        {
            id: "ACT-2025-0164",
            user: "Bendahara",
            action: "Validasi TGR",
            description: "Melakukan validasi status bebas TGR untuk peneliti Dr. Budi Santoso",
            target: "TGR-2025-012",
            targetType: "TGR",
            timestamp: "Kemarin, 14:22",
            date: "14 Jun 2025",
            type: "Validasi",
            icon: <MdAssignmentTurnedIn className="h-5 w-5 text-amber-500" />
        },
        {
            id: "ACT-2025-0163",
            user: "Bendahara",
            action: "Perbarui Laporan Realisasi Anggaran",
            description: "Memperbarui data realisasi anggaran bulan Juni 2025",
            target: null,
            targetType: "Anggaran",
            timestamp: "Kemarin, 10:17",
            date: "14 Jun 2025",
            type: "Keuangan",
            icon: <MdEdit className="h-5 w-5 text-amber-500" />
        },
        {
            id: "ACT-2025-0162",
            user: "Bendahara",
            action: "Tindak Lanjut Kasus TGR",
            description: "Melakukan tindak lanjut pada kasus TGR peneliti Dr. Ratna Sari",
            target: "TGR-2025-008",
            targetType: "TGR",
            timestamp: "2 hari lalu, 15:38",
            date: "13 Jun 2025",
            type: "TGR",
            icon: <MdWarning className="h-5 w-5 text-red-500" />
        },
        {
            id: "ACT-2025-0161",
            user: "Bendahara",
            action: "Audit Laporan Keuangan",
            description: "Melakukan audit internal pada Laporan Keuangan Q2 2025",
            target: "FRP-2025-032",
            targetType: "Laporan",
            timestamp: "2 hari lalu, 11:05",
            date: "13 Jun 2025",
            type: "Audit",
            icon: <MdAssessment className="h-5 w-5 text-indigo-500" />
        },
    ];

    const activityModules = [
        {
            title: "Aktivitas Terbaru",
            description: "Lihat dan filter semua aktivitas terbaru dalam sistem",
            icon: <MdHistory className="h-8 w-8 text-blue-500" />,
            path: "/bendahara/activity-tracker/recent-activities",
            color: "bg-blue-50 dark:bg-blue-900/20",
            count: activityStats.totalActivities,
            delay: 100
        },
        {
            title: "Riwayat Transaksi",
            description: "Temukan dan telusuri semua transaksi keuangan yang dilakukan",
            icon: <MdReceiptLong className="h-8 w-8 text-green-500" />,
            path: "/bendahara/activity-tracker/transaction-history",
            color: "bg-green-50 dark:bg-green-900/20",
            count: activityStats.financialActivities,
            delay: 150
        },
        {
            title: "Ekspor Riwayat Aktivitas",
            description: "Ekspor dan unduh riwayat aktivitas dalam berbagai format",
            icon: <MdFileDownload className="h-8 w-8 text-purple-500" />,
            path: "/bendahara/activity-tracker/export-activity-history",
            color: "bg-purple-50 dark:bg-purple-900/20",
            count: activityStats.exportActivities,
            delay: 200
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

    const filteredActivities = recentActivities.filter(activity => {
        const matchesSearch =
            activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (activity.target && activity.target.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesType = filterActivity === "all" || activity.type.toLowerCase() === filterActivity.toLowerCase();
        const matchesDate = filterDate === "all" ||
            (filterDate === "today" && activity.date === "15 Jun 2025") ||
            (filterDate === "yesterday" && activity.date === "14 Jun 2025") ||
            (filterDate === "week" && ["13 Jun 2025", "14 Jun 2025", "15 Jun 2025"].includes(activity.date));

        return matchesSearch && matchesType && matchesDate;
    });

    const getActivityTypeColor = (type) => {
        switch (type.toLowerCase()) {
            case "login": return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
            case "keuangan": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "verifikasi": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "ekspor": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
            case "audit": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
            case "validasi": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "tgr": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Activity Tracker</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Lacak dan monitor semua aktivitas terkait pengelolaan keuangan penelitian
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdHistory className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Total Aktivitas</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {activityStats.totalActivities}
                    </h4>
                    <div className="mt-1 flex items-center">
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            +24
                        </span>
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                            minggu ini
                        </span>
                    </div>
                </Card>

                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                            <MdAttachMoney className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Aktivitas Keuangan</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {activityStats.financialActivities}
                    </h4>
                    <div className="mt-1 flex items-center">
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                            {Math.round((activityStats.financialActivities / activityStats.totalActivities) * 100)}%
                        </span>
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                            dari total aktivitas
                        </span>
                    </div>
                </Card>

                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-indigo-100 dark:bg-indigo-900/30">
                            <MdVerifiedUser className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Aktivitas Verifikasi</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {activityStats.verificationActivities}
                    </h4>
                    <div className="mt-1 flex items-center">
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                            {Math.round((activityStats.verificationActivities / activityStats.totalActivities) * 100)}%
                        </span>
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                            dari total aktivitas
                        </span>
                    </div>
                </Card>

                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-gray-100 dark:bg-gray-800">
                            <MdPerson className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Aktivitas Login</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {activityStats.loginActivities}
                    </h4>
                    <div className="mt-1 flex items-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {Math.round((activityStats.loginActivities / activityStats.totalActivities) * 100)}%
                        </span>
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                            dari total aktivitas
                        </span>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {activityModules.map((module, index) => (
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
                                    {module.count} Aktivitas
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

            <Card extra="p-6" data-aos="fade-up" data-aos-delay="300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center mb-4 md:mb-0">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white mr-4">
                            Aktivitas Terkini
                        </h5>
                        <div className="flex items-center">
                            <button
                                className={`flex items-center px-3 py-1.5 rounded-l-lg ${!timelineView
                                    ? "bg-brand-500 text-white"
                                    : "bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-white"} 
                text-xs font-medium transition-colors`}
                                onClick={() => setTimelineView(false)}
                            >
                                <MdHistory className="mr-1" />
                                List View
                            </button>
                            <button
                                className={`flex items-center px-3 py-1.5 rounded-r-lg ${timelineView
                                    ? "bg-brand-500 text-white"
                                    : "bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-white"} 
                text-xs font-medium transition-colors`}
                                onClick={() => setTimelineView(true)}
                            >
                                <MdTimeline className="mr-1" />
                                Timeline
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex items-center">
                            <div className="relative flex-grow md:w-64">
                                <input
                                    type="text"
                                    placeholder="Cari aktivitas..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <select
                                className="ml-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                value={filterActivity}
                                onChange={(e) => setFilterActivity(e.target.value)}
                            >
                                <option value="all">Semua Tipe</option>
                                <option value="login">Login</option>
                                <option value="keuangan">Keuangan</option>
                                <option value="verifikasi">Verifikasi</option>
                                <option value="validasi">Validasi</option>
                                <option value="ekspor">Ekspor</option>
                                <option value="tgr">TGR</option>
                                <option value="audit">Audit</option>
                            </select>
                            <select
                                className="ml-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            >
                                <option value="all">Semua Waktu</option>
                                <option value="today">Hari Ini</option>
                                <option value="yesterday">Kemarin</option>
                                <option value="week">Minggu Ini</option>
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

                {timelineView ? (
                    <div className="relative pl-8 pb-4">
                        {/* Timeline line */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 dark:bg-navy-700"></div>

                        {/* Timeline items */}
                        {filteredActivities.length > 0 ? (
                            filteredActivities.map((activity, index) => (
                                <div key={index} className="mb-8 relative">
                                    {/* Timeline dot with icon */}
                                    <div className="absolute -left-4 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-navy-800 border-4 border-gray-200 dark:border-navy-700">
                                        {activity.icon}
                                    </div>

                                    {/* Activity content */}
                                    <div className="bg-white dark:bg-navy-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-navy-700">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h6 className="text-base font-medium text-navy-700 dark:text-white">
                                                    {activity.action}
                                                </h6>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    {activity.description}
                                                </p>
                                            </div>
                                            <div className="mt-2 md:mt-0 text-right">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {activity.timestamp}
                                                </span>
                                                <div className="mt-1">
                                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getActivityTypeColor(activity.type)}`}>
                                                        {activity.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {activity.target && (
                                            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-navy-700">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {activity.targetType}: <Link to={`/bendahara/detail/${activity.target}`} className="text-brand-500 hover:underline">{activity.target}</Link>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-6 text-center text-gray-500 dark:text-gray-400">
                                Tidak ada aktivitas yang sesuai dengan kriteria pencarian
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] table-auto">
                            <thead>
                                <tr>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        ID
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Aktivitas
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Deskripsi
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Target
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Waktu
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Tipe
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredActivities.length > 0 ? (
                                    filteredActivities.map((activity, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                {activity.id}
                                            </td>
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                <div className="flex items-center">
                                                    <div className="p-1.5 rounded-full bg-white dark:bg-navy-700 border border-gray-100 dark:border-navy-600 mr-2">
                                                        {activity.icon}
                                                    </div>
                                                    {activity.action}
                                                </div>
                                            </td>
                                            <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400 max-w-[250px] truncate">
                                                {activity.description}
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                {activity.target ? (
                                                    <Link to={`/bendahara/detail/${activity.target}`} className="text-brand-500 hover:underline">
                                                        {activity.target}
                                                    </Link>
                                                ) : (
                                                    <span className="text-gray-400 dark:text-gray-600">-</span>
                                                )}
                                            </td>
                                            <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                <div className="flex flex-col">
                                                    <span>{activity.timestamp}</span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-500">{activity.date}</span>
                                                </div>
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getActivityTypeColor(activity.type)}`}>
                                                    {activity.type}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-6 text-center text-gray-500 dark:text-gray-400">
                                            Tidak ada aktivitas yang sesuai dengan kriteria pencarian
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="mt-6 flex justify-center">
                    <button className="px-4 py-2 text-sm font-medium text-brand-500 hover:text-brand-600 dark:hover:text-brand-400">
                        Muat Lebih Banyak Aktivitas
                    </button>
                </div>
            </Card>

            <Card extra="p-6 mt-5" data-aos="fade-up" data-aos-delay="350">
                <div className="flex items-center justify-between mb-6">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                        <MdFileDownload className="mr-2 h-5 w-5" />
                        Ekspor Data Aktivitas
                    </h5>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="p-4 rounded-xl border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800">
                        <h6 className="text-base font-medium text-navy-700 dark:text-white mb-2">
                            Riwayat Aktivitas
                        </h6>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Ekspor semua data aktivitas dalam periode waktu tertentu
                        </p>

                        <div className="space-y-3 mb-4">
                            <div>
                                <label className="text-xs text-gray-700 dark:text-gray-300 block mb-1">Periode</label>
                                <select className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white">
                                    <option value="this-week">Minggu Ini</option>
                                    <option value="this-month">Bulan Ini</option>
                                    <option value="last-month">Bulan Lalu</option>
                                    <option value="this-quarter">Kuartal Ini</option>
                                    <option value="custom">Kustom</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs text-gray-700 dark:text-gray-300 block mb-1">Format</label>
                                <select className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white">
                                    <option value="xlsx">Excel (.xlsx)</option>
                                    <option value="csv">CSV</option>
                                    <option value="pdf">PDF</option>
                                </select>
                            </div>
                        </div>

                        <button className="w-full bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Ekspor Aktivitas
                        </button>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800">
                        <h6 className="text-base font-medium text-navy-700 dark:text-white mb-2">
                            Riwayat Transaksi Keuangan
                        </h6>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Ekspor data transaksi keuangan untuk keperluan audit
                        </p>

                        <div className="space-y-3 mb-4">
                            <div>
                                <label className="text-xs text-gray-700 dark:text-gray-300 block mb-1">Tipe Transaksi</label>
                                <select className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white">
                                    <option value="all">Semua Transaksi</option>
                                    <option value="disbursement">Pencairan Dana</option>
                                    <option value="verification">Verifikasi Laporan</option>
                                    <option value="tgr">Kasus TGR</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs text-gray-700 dark:text-gray-300 block mb-1">Format</label>
                                <select className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white">
                                    <option value="xlsx">Excel (.xlsx)</option>
                                    <option value="csv">CSV</option>
                                    <option value="pdf">PDF</option>
                                </select>
                            </div>
                        </div>

                        <button className="w-full bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Ekspor Transaksi
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ActivityTracker;
