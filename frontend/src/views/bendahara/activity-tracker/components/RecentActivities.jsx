import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdHistory,
    MdArrowBack,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdFileDownload,
    MdCalendarToday,
    MdNotifications,
    MdPerson,
    MdVerifiedUser,
    MdAttachMoney,
    MdAccountBalance,
    MdReceipt,
    MdWarning,
    MdTimeline,
    MdToday,
    MdTune
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const RecentActivities = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterDate, setFilterDate] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data for activity tracker
    const activityStats = {
        totalActivities: 362,
        todayActivities: 18,
        thisWeekActivities: 74,
        thisMonthActivities: 145
    };

    const activityTypes = [
        { key: "all", label: "Semua Aktivitas", icon: <MdHistory className="h-4 w-4" /> },
        { key: "disbursement", label: "Pencairan Dana", icon: <MdAttachMoney className="h-4 w-4" /> },
        { key: "verification", label: "Verifikasi", icon: <MdVerifiedUser className="h-4 w-4" /> },
        { key: "tgr", label: "Manajemen TGR", icon: <MdWarning className="h-4 w-4" /> },
        { key: "reports", label: "Laporan", icon: <MdReceipt className="h-4 w-4" /> },
        { key: "budget", label: "Anggaran", icon: <MdAccountBalance className="h-4 w-4" /> }
    ];

    const recentActivities = [
        {
            id: "ACT-2025-362",
            type: "disbursement",
            title: "Pencairan dana penelitian",
            detail: "Pencairan dana untuk proposal PRP-2025-042 sebesar Rp 75.000.000",
            date: "15 Jun 2025, 10:35",
            user: "Dra. Siska Widyawati, M.Ak",
            target: "Dr. Budi Santoso",
            targetEntity: "Proposal PRP-2025-042",
            iconColor: "blue"
        },
        {
            id: "ACT-2025-361",
            type: "verification",
            title: "Verifikasi laporan kemajuan",
            detail: "Laporan kemajuan keuangan untuk proposal PRP-2025-036 telah diverifikasi",
            date: "15 Jun 2025, 09:22",
            user: "Dra. Siska Widyawati, M.Ak",
            target: "Dr. Andi Wijaya",
            targetEntity: "Laporan LPK-2025-036-01",
            iconColor: "green"
        },
        {
            id: "ACT-2025-360",
            type: "reports",
            title: "Laporan keuangan bulanan",
            detail: "Laporan keuangan bulanan untuk Mei 2025 telah dibuat",
            date: "15 Jun 2025, 08:45",
            user: "Dra. Siska Widyawati, M.Ak",
            target: "Sistem",
            targetEntity: "Laporan MFR-2025-05",
            iconColor: "purple"
        },
        {
            id: "ACT-2025-359",
            type: "tgr",
            title: "Validasi bebas TGR",
            detail: "Status bebas TGR untuk Dr. Adi Suryanto telah divalidasi",
            date: "14 Jun 2025, 16:30",
            user: "Dra. Siska Widyawati, M.Ak",
            target: "Dr. Adi Suryanto",
            targetEntity: "TGR-2025-014",
            iconColor: "amber"
        },
        {
            id: "ACT-2025-358",
            type: "budget",
            title: "Distribusi anggaran",
            detail: "Distribusi anggaran fakultas untuk semester II 2025 telah ditetapkan",
            date: "14 Jun 2025, 14:15",
            user: "Dra. Siska Widyawati, M.Ak",
            target: "Sistem",
            targetEntity: "Budget BD-2025-S2",
            iconColor: "green"
        },
        {
            id: "ACT-2025-357",
            type: "verification",
            title: "Validasi bukti pengeluaran",
            detail: "Bukti pengeluaran untuk proposal PRP-2025-039 telah divalidasi",
            date: "14 Jun 2025, 11:20",
            user: "Dra. Siska Widyawati, M.Ak",
            target: "Dr. Maya Putri",
            targetEntity: "Bukti BP-2025-039-05",
            iconColor: "green"
        },
        {
            id: "ACT-2025-356",
            type: "disbursement",
            title: "Jadwal pencairan dana",
            detail: "Jadwal pencairan dana untuk proposal PRP-2025-034 telah dibuat",
            date: "14 Jun 2025, 10:05",
            user: "Dra. Siska Widyawati, M.Ak",
            target: "Dr. Adi Suryanto",
            targetEntity: "Jadwal SCH-2025-016",
            iconColor: "blue"
        },
        {
            id: "ACT-2025-355",
            type: "reports",
            title: "Analisis penggunaan dana",
            detail: "Analisis penggunaan dana penelitian Q2 2025 telah dibuat",
            date: "13 Jun 2025, 16:45",
            user: "Dra. Siska Widyawati, M.Ak",
            target: "Sistem",
            targetEntity: "Analisis AUD-2025-Q2",
            iconColor: "purple"
        },
        {
            id: "ACT-2025-354",
            type: "verification",
            title: "Verifikasi laporan akhir",
            detail: "Laporan akhir keuangan untuk proposal PRP-2024-112 telah diverifikasi",
            date: "13 Jun 2025, 15:10",
            user: "Dra. Siska Widyawati, M.Ak",
            target: "Prof. Dewi Lestari",
            targetEntity: "Laporan LAK-2024-112",
            iconColor: "green"
        },
        {
            id: "ACT-2025-353",
            type: "tgr",
            title: "Pembuatan TGR",
            detail: "TGR untuk proposal PRP-2024-086 telah dibuat",
            date: "13 Jun 2025, 11:30",
            user: "Dra. Siska Widyawati, M.Ak",
            target: "Dr. Ahmad Fauzi",
            targetEntity: "TGR-2025-012",
            iconColor: "red"
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
            activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.targetEntity.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === "all" || activity.type === filterType;
        let matchesDate = true;

        if (filterDate === "today") {
            matchesDate = activity.date.includes("15 Jun 2025");
        } else if (filterDate === "yesterday") {
            matchesDate = activity.date.includes("14 Jun 2025");
        } else if (filterDate === "this_week") {
            matchesDate = activity.date.includes("Jun 2025");
        }

        return matchesSearch && matchesType && matchesDate;
    });

    const getTypeIcon = (type) => {
        switch (type) {
            case "disbursement": return <MdAttachMoney className={`h-5 w-5 text-blue-500`} />;
            case "verification": return <MdVerifiedUser className={`h-5 w-5 text-green-500`} />;
            case "tgr": return <MdWarning className={`h-5 w-5 text-amber-500`} />;
            case "reports": return <MdReceipt className={`h-5 w-5 text-purple-500`} />;
            case "budget": return <MdAccountBalance className={`h-5 w-5 text-green-500`} />;
            default: return <MdHistory className={`h-5 w-5 text-gray-500`} />;
        }
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link to="/bendahara/activity-tracker" className="mr-3 p-2 bg-gray-100 dark:bg-navy-800 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700">
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Aktivitas Terbaru</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Lihat dan lacak aktivitas terbaru dalam sistem
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <Card extra="p-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdHistory className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Aktivitas</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {activityStats.totalActivities}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                            <MdToday className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hari Ini</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {activityStats.todayActivities}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdCalendarToday className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Minggu Ini</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {activityStats.thisWeekActivities}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/30">
                            <MdTimeline className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Bulan Ini</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {activityStats.thisMonthActivities}
                            </h4>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
                <Card extra="p-6 w-full" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                            Aktivitas Terbaru
                        </h5>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari aktivitas..."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div className="flex">
                                    <button
                                        className="p-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800"
                                        onClick={() => document.getElementById('filterDropdown').classList.toggle('hidden')}
                                    >
                                        <MdFilterList className="h-5 w-5" />
                                    </button>
                                    <div id="filterDropdown" className="hidden absolute mt-10 right-0 w-64 bg-white dark:bg-navy-800 rounded-lg shadow-lg border border-gray-200 dark:border-navy-700 z-20">
                                        <div className="p-3 border-b border-gray-200 dark:border-navy-700">
                                            <h6 className="text-sm font-medium text-navy-700 dark:text-white">
                                                Filter Aktivitas
                                            </h6>
                                        </div>
                                        <div className="p-3">
                                            <div className="mb-3">
                                                <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">
                                                    Jenis Aktivitas
                                                </label>
                                                <select
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white"
                                                    value={filterType}
                                                    onChange={(e) => setFilterType(e.target.value)}
                                                >
                                                    <option value="all">Semua Jenis</option>
                                                    <option value="disbursement">Pencairan Dana</option>
                                                    <option value="verification">Verifikasi</option>
                                                    <option value="tgr">Manajemen TGR</option>
                                                    <option value="reports">Laporan</option>
                                                    <option value="budget">Anggaran</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">
                                                    Periode
                                                </label>
                                                <select
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white"
                                                    value={filterDate}
                                                    onChange={(e) => setFilterDate(e.target.value)}
                                                >
                                                    <option value="all">Semua Waktu</option>
                                                    <option value="today">Hari Ini</option>
                                                    <option value="yesterday">Kemarin</option>
                                                    <option value="this_week">Minggu Ini</option>
                                                </select>
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    className="px-3 py-1.5 bg-brand-500 text-white rounded hover:bg-brand-600 text-xs"
                                                    onClick={() => document.getElementById('filterDropdown').classList.add('hidden')}
                                                >
                                                    Terapkan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

                    <div className="overflow-hidden">
                        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                            {activityTypes.map((type) => (
                                <button
                                    key={type.key}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${filterType === type.key
                                            ? 'bg-brand-500 text-white'
                                            : 'bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600'
                                        }`}
                                    onClick={() => setFilterType(type.key)}
                                >
                                    {type.icon}
                                    <span>{type.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="relative pl-4 space-y-6 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-0.5 before:bg-gray-200 dark:before:bg-navy-700">
                            {filteredActivities.length > 0 ? (
                                filteredActivities.map((activity, index) => (
                                    <div key={index} className="relative">
                                        {/* Timeline dot */}
                                        <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-white dark:bg-navy-800 border-2 border-blue-500 z-10"></div>

                                        <div className="pl-6">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                <div className="flex items-center gap-3 mb-1 md:mb-0">
                                                    <div className="p-2 bg-gray-100 dark:bg-navy-700 rounded-full">
                                                        {getTypeIcon(activity.type)}
                                                    </div>
                                                    <div>
                                                        <h6 className="text-sm font-medium text-navy-700 dark:text-white">{activity.title}</h6>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">{activity.detail}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</span>
                                                    <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">ID: {activity.id}</span>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center gap-3 text-xs">
                                                <div className="flex items-center gap-1">
                                                    <MdPerson className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                                                    <span className="text-gray-600 dark:text-gray-400">Pengguna: {activity.user}</span>
                                                </div>
                                                <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                                <div className="flex items-center gap-1">
                                                    <MdPerson className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                                                    <span className="text-gray-600 dark:text-gray-400">Target: {activity.target}</span>
                                                </div>
                                                <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                                <div className="flex items-center gap-1">
                                                    <MdTune className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                                                    <span className="text-gray-600 dark:text-gray-400">Entitas: {activity.targetEntity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-10 text-center">
                                    <MdHistory className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                                    <p className="mt-2 text-gray-500 dark:text-gray-400">Tidak ada aktivitas yang ditemukan</p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center mt-6">
                            <button className="px-4 py-2 bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 text-sm text-gray-700 dark:text-white rounded-lg">
                                Muat Lebih Banyak
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default RecentActivities;
