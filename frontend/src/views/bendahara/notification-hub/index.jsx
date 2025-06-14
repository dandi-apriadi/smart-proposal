import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdNotifications,
    MdOutlineNotificationsActive,
    MdNotificationsNone,
    MdPriorityHigh,
    MdAttachMoney,
    MdCalendarToday,
    MdVerifiedUser,
    MdWarning,
    MdReportProblem,
    MdSettings,
    MdAssessment,
    MdRefresh,
    MdFilterList,
    MdSearch,
    MdCheck,
    MdClose,
    MdOutlineMarkEmailRead,
    MdOutlineMarkEmailUnread,
    MdCheckCircle
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const NotificationHub = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterPriority, setFilterPriority] = useState("all");

    // Dummy data for Notification Hub
    const notificationStats = {
        totalNotifications: 28,
        unreadNotifications: 12,
        highPriorityNotifications: 5,
        todayNotifications: 8
    };

    const notificationModules = [
        {
            title: "Pemberitahuan Pencairan",
            description: "Notifikasi terkait proses pencairan dana penelitian",
            icon: <MdAttachMoney className="h-8 w-8 text-green-500" />,
            path: "/bendahara/notification-hub/disbursement-notifications",
            color: "bg-green-50 dark:bg-green-900/20",
            count: 7,
            delay: 100
        },
        {
            title: "Pengingat Tenggat Waktu",
            description: "Pengingat tenggat waktu pencairan dan pelaporan keuangan",
            icon: <MdCalendarToday className="h-8 w-8 text-amber-500" />,
            path: "/bendahara/notification-hub/deadline-reminders",
            color: "bg-amber-50 dark:bg-amber-900/20",
            count: 9,
            delay: 150
        },
        {
            title: "Permintaan Verifikasi",
            description: "Notifikasi untuk verifikasi laporan dan dokumen keuangan",
            icon: <MdVerifiedUser className="h-8 w-8 text-blue-500" />,
            path: "/bendahara/notification-hub/verification-requests",
            color: "bg-blue-50 dark:bg-blue-900/20",
            count: 6,
            delay: 200
        },
        {
            title: "Laporan Memerlukan Tindakan",
            description: "Notifikasi laporan yang memerlukan tindakan Anda",
            icon: <MdReportProblem className="h-8 w-8 text-red-500" />,
            path: "/bendahara/notification-hub/reports-requiring-action",
            color: "bg-red-50 dark:bg-red-900/20",
            count: 6,
            delay: 250
        }
    ];

    const recentNotifications = [
        {
            id: "NT-2025-0028",
            title: "Permintaan Verifikasi Laporan Penggunaan Dana",
            message: "Dr. Budi Santoso telah mengirimkan laporan penggunaan dana untuk penelitian Machine Learning untuk diverifikasi.",
            type: "Permintaan Verifikasi",
            time: "10 menit yang lalu",
            priority: "Tinggi",
            status: "Unread",
            relatedId: "RPT-2025-0042"
        },
        {
            id: "NT-2025-0027",
            title: "Pengingat: Tenggat Pencairan Tahap II",
            message: "Tenggat untuk pencairan dana tahap II akan berakhir dalam 3 hari. 15 proposal menunggu pencairan.",
            type: "Pengingat Tenggat",
            time: "2 jam yang lalu",
            priority: "Tinggi",
            status: "Read",
            relatedId: null
        },
        {
            id: "NT-2025-0026",
            title: "Dana Berhasil Dicairkan",
            message: "Dana untuk penelitian 'Analisis Dampak Ekonomi dari Perubahan Iklim di Indonesia' telah berhasil dicairkan.",
            type: "Pencairan",
            time: "5 jam yang lalu",
            priority: "Sedang",
            status: "Unread",
            relatedId: "PRP-2025-038"
        },
        {
            id: "NT-2025-0025",
            title: "Laporan Audit Keuangan Q2 2025 Tersedia",
            message: "Laporan audit keuangan untuk Q2 2025 telah tersedia dalam sistem. Silakan review sebelum difinalisasi.",
            type: "Laporan",
            time: "Kemarin",
            priority: "Sedang",
            status: "Unread",
            relatedId: "FRP-2025-032"
        },
        {
            id: "NT-2025-0024",
            title: "Pengingat: Kasus TGR Memerlukan Tindakan",
            message: "5 kasus TGR memerlukan tindakan Anda segera. 2 di antaranya sudah melewati tenggat waktu.",
            type: "TGR",
            time: "Kemarin",
            priority: "Tinggi",
            status: "Read",
            relatedId: null
        },
        {
            id: "NT-2025-0023",
            title: "Notifikasi dari Sistem: Pemeliharaan Server",
            message: "Server akan mengalami pemeliharaan pada tanggal 15 Juni 2025 pukul 22:00-24:00 WIB. Sistem akan tidak tersedia selama waktu tersebut.",
            type: "Sistem",
            time: "2 hari yang lalu",
            priority: "Rendah",
            status: "Read",
            relatedId: null
        },
        {
            id: "NT-2025-0022",
            title: "Anggaran Bulanan Juni Telah Diperbarui",
            message: "Anggaran untuk bulan Juni 2025 telah diperbarui. Silakan review di dashboard manajemen anggaran.",
            type: "Anggaran",
            time: "3 hari yang lalu",
            priority: "Sedang",
            status: "Read",
            relatedId: null
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

    const filteredNotifications = recentNotifications.filter(notification => {
        const matchesSearch =
            notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === "all" || notification.type.toLowerCase().includes(filterType.toLowerCase());
        const matchesPriority = filterPriority === "all" || notification.priority.toLowerCase() === filterPriority.toLowerCase();

        return matchesSearch && matchesType && matchesPriority;
    });

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Notification Hub</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Kelola semua notifikasi dan pemberitahuan terkait pengelolaan keuangan penelitian
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdNotifications className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Total Notifikasi</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {notificationStats.totalNotifications}
                    </h4>
                </Card>

                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdOutlineNotificationsActive className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Belum Dibaca</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {notificationStats.unreadNotifications}
                    </h4>
                    <div className="mt-1 flex items-center">
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                            {Math.round((notificationStats.unreadNotifications / notificationStats.totalNotifications) * 100)}%
                        </span>
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                            dari total notifikasi
                        </span>
                    </div>
                </Card>

                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-red-100 dark:bg-red-900/30">
                            <MdPriorityHigh className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Prioritas Tinggi</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {notificationStats.highPriorityNotifications}
                    </h4>
                    <div className="mt-1 flex items-center">
                        <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                            {Math.round((notificationStats.highPriorityNotifications / notificationStats.totalNotifications) * 100)}%
                        </span>
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                            dari total notifikasi
                        </span>
                    </div>
                </Card>

                <Card extra="p-4 flex flex-col" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                            <MdNotificationsNone className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Hari Ini</p>
                    <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                        {notificationStats.todayNotifications}
                    </h4>
                    <div className="mt-1 flex items-center">
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                            +3
                        </span>
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                            dibanding kemarin
                        </span>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
                {notificationModules.map((module, index) => (
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
                                    {module.count} Notifikasi
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
                            Notifikasi Terkini
                        </h5>
                        <div className="flex items-center">
                            <button className="flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-blue-100">
                                <MdOutlineMarkEmailRead className="mr-1" />
                                Tandai Semua Dibaca
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex items-center">
                            <div className="relative flex-grow md:w-64">
                                <input
                                    type="text"
                                    placeholder="Cari notifikasi..."
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
                                <option value="all">Semua Tipe</option>
                                <option value="pencairan">Pencairan</option>
                                <option value="pengingat">Pengingat</option>
                                <option value="verifikasi">Verifikasi</option>
                                <option value="tgr">TGR</option>
                                <option value="laporan">Laporan</option>
                                <option value="anggaran">Anggaran</option>
                                <option value="sistem">Sistem</option>
                            </select>
                            <select
                                className="ml-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                            >
                                <option value="all">Semua Prioritas</option>
                                <option value="tinggi">Tinggi</option>
                                <option value="sedang">Sedang</option>
                                <option value="rendah">Rendah</option>
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

                <div className="flex flex-col space-y-4">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification, index) => (
                            <Card
                                extra={`p-4 border-l-4 ${notification.priority === "Tinggi"
                                    ? "border-l-red-500"
                                    : notification.priority === "Sedang"
                                        ? "border-l-amber-500"
                                        : "border-l-blue-500"
                                    } ${notification.status === "Unread" ? "bg-gray-50 dark:bg-navy-800" : ""}`}
                                key={index}
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex-grow">
                                        <div className="flex items-center mb-2">
                                            <div className={`p-2 rounded-full mr-3 ${getNotificationIconBgColor(notification.type)}`}>
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div>
                                                <h6 className="font-medium text-navy-700 dark:text-white flex items-center">
                                                    {notification.title}
                                                    {notification.status === "Unread" && (
                                                        <span className="ml-2 w-2 h-2 rounded-full bg-brand-500"></span>
                                                    )}
                                                </h6>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                                    {notification.time} • {notification.type}
                                                    <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${notification.priority === "Tinggi" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                                                        notification.priority === "Sedang" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                                                            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                                        }`}>
                                                        {notification.priority}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 ml-12">
                                            {notification.message}
                                        </p>
                                        {notification.relatedId && (
                                            <div className="ml-12 mt-2">
                                                <Link to={`/bendahara/detail/${notification.relatedId}`} className="text-xs text-brand-500 hover:underline">
                                                    Lihat detail untuk {notification.relatedId}
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex space-x-2 mt-3 md:mt-0">
                                        <button className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-navy-700">
                                            {notification.status === "Unread" ? (
                                                <MdOutlineMarkEmailRead className="h-5 w-5" />
                                            ) : (
                                                <MdOutlineMarkEmailUnread className="h-5 w-5" />
                                            )}
                                        </button>
                                        <button className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-navy-700">
                                            <MdClose className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <MdNotificationsNone className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                            <p className="text-lg font-medium">Tidak ada notifikasi ditemukan</p>
                            <p className="text-sm">Tidak ada notifikasi yang sesuai dengan kriteria pencarian Anda</p>
                        </div>
                    )}
                </div>

                {filteredNotifications.length > 5 && (
                    <div className="mt-6 flex justify-center">
                        <button className="px-4 py-2 text-sm font-medium text-brand-500 hover:text-brand-600 dark:hover:text-brand-400">
                            Lihat Semua Notifikasi (28)
                        </button>
                    </div>
                )}
            </Card>

            <Card extra="p-6 mt-5" data-aos="fade-up" data-aos-delay="350">
                <div className="flex items-center justify-between mb-6">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                        <MdSettings className="mr-2 h-5 w-5" />
                        Pengaturan Notifikasi
                    </h5>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <h6 className="text-base font-medium text-navy-700 dark:text-white mb-3">
                            Preferensi Notifikasi
                        </h6>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm text-gray-700 dark:text-gray-300">Email Notifikasi</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm text-gray-700 dark:text-gray-300">Notifikasi dalam Aplikasi</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm text-gray-700 dark:text-gray-300">Notifikasi Prioritas Tinggi</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h6 className="text-base font-medium text-navy-700 dark:text-white mb-3">
                            Tipe Notifikasi
                        </h6>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm text-gray-700 dark:text-gray-300">Pencairan Dana</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm text-gray-700 dark:text-gray-300">Verifikasi Laporan</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm text-gray-700 dark:text-gray-300">Tenggat Waktu</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm text-gray-700 dark:text-gray-300">Kasus TGR</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Simpan Pengaturan
                    </button>
                </div>
            </Card>
        </div>
    );
};

// Helper function to get notification icon based on type
const getNotificationIcon = (type) => {
    switch (type.toLowerCase()) {
        case "pencairan":
            return <MdAttachMoney className="h-5 w-5 text-green-600 dark:text-green-400" />;
        case "pengingat tenggat":
            return <MdCalendarToday className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
        case "permintaan verifikasi":
            return <MdVerifiedUser className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
        case "tgr":
            return <MdWarning className="h-5 w-5 text-red-600 dark:text-red-400" />;
        case "laporan":
            return <MdAssessment className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
        case "anggaran":
            return <MdAttachMoney className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
        case "sistem":
            return <MdNotifications className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
        default:
            return <MdNotifications className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
};

// Helper function to get notification icon background color based on type
const getNotificationIconBgColor = (type) => {
    switch (type.toLowerCase()) {
        case "pencairan":
            return "bg-green-100 dark:bg-green-900/30";
        case "pengingat tenggat":
            return "bg-amber-100 dark:bg-amber-900/30";
        case "permintaan verifikasi":
            return "bg-blue-100 dark:bg-blue-900/30";
        case "tgr":
            return "bg-red-100 dark:bg-red-900/30";
        case "laporan":
            return "bg-purple-100 dark:bg-purple-900/30";
        case "anggaran":
            return "bg-indigo-100 dark:bg-indigo-900/30";
        case "sistem":
            return "bg-gray-100 dark:bg-gray-800";
        default:
            return "bg-gray-100 dark:bg-gray-800";
    }
};

export default NotificationHub;
