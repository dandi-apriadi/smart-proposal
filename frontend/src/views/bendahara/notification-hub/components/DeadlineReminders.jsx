import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdCalendarToday,
    MdFilterList,
    MdSearch,
    MdOutlineMarkEmailRead,
    MdClose,
    MdArrowBack,
    MdRefresh,
    MdFileDownload,
    MdAlarm,
    MdTimeline,
    MdAttachMoney,
    MdWarning,
    MdAssignmentTurnedIn,
    MdAssignment
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const DeadlineReminders = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterUrgency, setFilterUrgency] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data for deadline reminders
    const deadlineStats = {
        totalReminders: 19,
        unreadReminders: 9,
        urgentReminders: 5,
        upcomingDeadlines: 14
    };

    const deadlineReminders = [
        {
            id: "DEAD-2025-0019",
            title: "Tenggat Pencairan Dana Tahap II",
            message: "Tenggat waktu untuk pencairan dana tahap II akan berakhir dalam 3 hari. 15 proposal memerlukan pencairan.",
            relatedId: "DISB-PHASE-2",
            deadline: "18 Jun 2025",
            remainingDays: 3,
            urgency: "Tinggi",
            category: "Pencairan Dana",
            date: "15 Jun 2025",
            time: "2 jam yang lalu",
            isRead: false,
            actions: ["Lihat Proposal", "Jadwalkan Pencairan"]
        },
        {
            id: "DEAD-2025-0018",
            title: "Laporan Keuangan Bulanan Juni",
            message: "Tenggat waktu untuk mengirimkan laporan keuangan bulanan Juni 2025 adalah 5 hari lagi.",
            relatedId: "FRP-2025-JUNE",
            deadline: "20 Jun 2025",
            remainingDays: 5,
            urgency: "Sedang",
            category: "Laporan Keuangan",
            date: "15 Jun 2025",
            time: "5 jam yang lalu",
            isRead: true,
            actions: ["Siapkan Laporan"]
        },
        {
            id: "DEAD-2025-0017",
            title: "Verifikasi Bukti Pengeluaran",
            message: "10 bukti pengeluaran memerlukan verifikasi sebelum tenggat waktu berakhir dalam 2 hari.",
            relatedId: "EXP-VERIF-2025-Q2",
            deadline: "17 Jun 2025",
            remainingDays: 2,
            urgency: "Tinggi",
            category: "Verifikasi",
            date: "14 Jun 2025",
            time: "1 hari yang lalu",
            isRead: false,
            actions: ["Verifikasi Sekarang"]
        },
        {
            id: "DEAD-2025-0016",
            title: "Penyelesaian Kasus TGR",
            message: "Tenggat untuk menyelesaikan kasus TGR peneliti Dr. Ratna Sari tinggal 7 hari lagi.",
            relatedId: "TGR-2025-008",
            deadline: "22 Jun 2025",
            remainingDays: 7,
            urgency: "Sedang",
            category: "TGR",
            date: "13 Jun 2025",
            time: "2 hari yang lalu",
            isRead: false,
            actions: ["Lihat Detail TGR"]
        },
        {
            id: "DEAD-2025-0015",
            title: "Audit Keuangan Triwulan II",
            message: "Persiapan untuk audit keuangan triwulan II harus selesai dalam 10 hari.",
            relatedId: "AUDIT-Q2-2025",
            deadline: "25 Jun 2025",
            remainingDays: 10,
            urgency: "Rendah",
            category: "Audit",
            date: "12 Jun 2025",
            time: "3 hari yang lalu",
            isRead: true,
            actions: ["Lihat Checklist Audit"]
        },
        {
            id: "DEAD-2025-0014",
            title: "Validasi Laporan Penggunaan Dana",
            message: "Laporan penggunaan dana dari 5 peneliti perlu divalidasi sebelum 19 Juni 2025.",
            relatedId: "VALID-JUNE-2025",
            deadline: "19 Jun 2025",
            remainingDays: 4,
            urgency: "Sedang",
            category: "Validasi",
            date: "11 Jun 2025",
            time: "4 hari yang lalu",
            isRead: true,
            actions: ["Validasi Sekarang"]
        },
        {
            id: "DEAD-2025-0013",
            title: "Batas Waktu Revisi TGR",
            message: "Batas waktu revisi untuk kasus TGR Prof. Hendra Gunawan akan berakhir dalam 1 hari.",
            relatedId: "TGR-2025-009",
            deadline: "16 Jun 2025",
            remainingDays: 1,
            urgency: "Tinggi",
            category: "TGR",
            date: "10 Jun 2025",
            time: "5 hari yang lalu",
            isRead: false,
            actions: ["Lihat Detail TGR"]
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

    const filteredReminders = deadlineReminders.filter(reminder => {
        const matchesSearch =
            reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reminder.message.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesUrgency = filterUrgency === "all" || reminder.urgency.toLowerCase() === filterUrgency.toLowerCase();

        return matchesSearch && matchesUrgency;
    });

    const getUrgencyColor = (urgency) => {
        switch (urgency.toLowerCase()) {
            case "tinggi": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            case "sedang": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "rendah": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getRemainingDaysColor = (days) => {
        if (days <= 2) return "text-red-600 dark:text-red-400";
        if (days <= 5) return "text-amber-600 dark:text-amber-400";
        return "text-green-600 dark:text-green-400";
    };

    const getCategoryIcon = (category) => {
        switch (category.toLowerCase()) {
            case "pencairan dana": return <MdAttachMoney className="h-5 w-5 text-green-600 dark:text-green-400" />;
            case "laporan keuangan": return <MdAssignment className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
            case "verifikasi": return <MdAssignmentTurnedIn className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
            case "tgr": return <MdWarning className="h-5 w-5 text-red-600 dark:text-red-400" />;
            case "audit": return <MdAlarm className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
            case "validasi": return <MdTimeline className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
            default: return <MdCalendarToday className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
        }
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link to="/bendahara/notification-hub" className="mr-3 p-2 bg-gray-100 dark:bg-navy-800 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700">
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Pengingat Tenggat Waktu</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Pengingat tenggat waktu pencairan dan pelaporan keuangan
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <Card extra="p-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdCalendarToday className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pengingat</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {deadlineStats.totalReminders}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdOutlineMarkEmailRead className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Belum Dibaca</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {deadlineStats.unreadReminders}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-red-100 dark:bg-red-900/30">
                            <MdWarning className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Prioritas Tinggi</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {deadlineStats.urgentReminders}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                            <MdAlarm className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tenggat Mendatang</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {deadlineStats.upcomingDeadlines}
                            </h4>
                        </div>
                    </div>
                </Card>
            </div>

            <Card extra="p-6" data-aos="fade-up" data-aos-delay="300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                        Pengingat Tenggat Waktu
                    </h5>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-grow w-full md:w-64">
                                <input
                                    type="text"
                                    placeholder="Cari pengingat..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <select
                                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                value={filterUrgency}
                                onChange={(e) => setFilterUrgency(e.target.value)}
                            >
                                <option value="all">Semua Prioritas</option>
                                <option value="tinggi">Prioritas Tinggi</option>
                                <option value="sedang">Prioritas Sedang</option>
                                <option value="rendah">Prioritas Rendah</option>
                            </select>
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

                <div className="space-y-4">
                    {filteredReminders.length > 0 ? (
                        filteredReminders.map((reminder, index) => (
                            <div
                                key={reminder.id}
                                className={`p-4 border-l-4 border-l-amber-500 rounded-lg ${!reminder.isRead ? 'bg-gray-50 dark:bg-navy-800' : 'bg-white dark:bg-navy-700'} transition-all`}
                                data-aos="fade-up"
                                data-aos-delay={100 + (index * 50)}
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <div className="p-2.5 rounded-full bg-amber-100 dark:bg-amber-900/30 mr-3">
                                                    {getCategoryIcon(reminder.category)}
                                                </div>
                                                <h6 className="font-medium text-navy-700 dark:text-white">
                                                    {reminder.title}
                                                    {!reminder.isRead && (
                                                        <span className="ml-2 w-2 h-2 inline-block rounded-full bg-brand-500"></span>
                                                    )}
                                                </h6>
                                            </div>
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getUrgencyColor(reminder.urgency)}`}>
                                                {reminder.urgency}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 ml-12 mb-3">
                                            {reminder.message}
                                        </p>

                                        <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Tenggat:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{reminder.deadline}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Sisa Waktu:</span>
                                                <span className={`text-sm font-medium ${getRemainingDaysColor(reminder.remainingDays)}`}>
                                                    {reminder.remainingDays} hari lagi
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Kategori:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{reminder.category}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">ID Terkait:</span>
                                                <Link to={`/bendahara/detail/${reminder.relatedId}`} className="text-sm font-medium text-brand-500 hover:underline">
                                                    {reminder.relatedId}
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="mt-3 ml-12 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{reminder.time} • {reminder.date}</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                {/* Action buttons */}
                                                <div className="flex gap-2">
                                                    {reminder.actions.map((action, idx) => (
                                                        <button key={idx} className="px-3 py-1 text-xs font-medium bg-brand-50 dark:bg-brand-500/20 text-brand-500 hover:bg-brand-100 dark:hover:bg-brand-500/30 rounded">
                                                            {action}
                                                        </button>
                                                    ))}
                                                </div>
                                                {!reminder.isRead && (
                                                    <button className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                                        <MdOutlineMarkEmailRead className="h-5 w-5" />
                                                    </button>
                                                )}
                                                <button className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-800">
                                                    <MdClose className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <MdCalendarToday className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                            <p className="text-lg font-medium">Tidak ada pengingat tenggat waktu</p>
                            <p className="text-sm">Tidak ada pengingat tenggat waktu yang sesuai dengan kriteria pencarian.</p>
                        </div>
                    )}
                </div>

                {filteredReminders.length > 5 && (
                    <div className="mt-6 text-center">
                        <button className="px-4 py-2 text-sm font-medium text-brand-500 hover:text-brand-600 dark:hover:text-brand-400">
                            Muat Lebih Banyak
                        </button>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default DeadlineReminders;
