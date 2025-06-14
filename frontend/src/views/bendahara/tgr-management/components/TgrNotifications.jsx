import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdSearch,
    MdRefresh,
    MdArrowBack,
    MdWarning,
    MdCheck,
    MdClose,
    MdOutlineMarkEmailRead,
    MdSend,
    MdEmail,
    MdAccessTime,
    MdCalendarToday,
    MdNotificationsActive,
    MdNotificationsNone,
    MdVisibility,
    MdReportProblem,
    MdPerson,
    MdNotifications,
    MdOutlineNotificationImportant,
    MdAttachMoney,
    MdMessage,
    MdMarkEmailRead,
    MdOutlineFilterAlt,
    MdDelete,
    MdPriorityHigh,
    MdFilterList,
    MdKeyboardArrowDown,
    MdSettings,
    MdOutlineAttachFile,
    MdArrowDropDown,
    MdMoreVert
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const TgrNotifications = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState("all");
    const [selectedAction, setSelectedAction] = useState("all");
    const [selectedNotificationId, setSelectedNotificationId] = useState(null);
    const [view, setView] = useState('card'); // 'card' or 'compact'
    const filtersRef = useRef(null);

    // Dummy data for TGR notifications
    const notificationsStats = {
        totalNotifications: 15,
        unreadNotifications: 6,
        thisWeekNotifications: 8,
        importantNotifications: 4
    };

    const tgrNotifications = [
        {
            id: "TGR-NOT-015",
            tgrId: "TGR-2025-018",
            title: "Batas Waktu TGR Mendekati",
            researcher: "Dr. Budi Santoso",
            faculty: "Fakultas Teknik",
            message: "Batas waktu penyelesaian TGR untuk kasus ini akan berakhir dalam 5 hari.",
            date: "15 Jun 2025",
            time: "10:30",
            status: "Unread",
            priority: "High",
            action: "Reminder",
            relatedAmount: 15000000
        },
        {
            id: "TGR-NOT-014",
            tgrId: "TGR-2025-017",
            title: "Dokumen Baru Diunggah",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            message: "Peneliti telah mengunggah dokumen baru terkait kasus TGR. Perlu verifikasi.",
            date: "14 Jun 2025",
            time: "14:45",
            status: "Unread",
            priority: "Medium",
            action: "Document Verification",
            relatedAmount: 8500000
        },
        {
            id: "TGR-NOT-013",
            tgrId: "TGR-2025-016",
            title: "Pembayaran TGR Dilakukan",
            researcher: "Dr. Andi Wijaya",
            faculty: "Fakultas Psikologi",
            message: "Peneliti telah melakukan pembayaran untuk penyelesaian TGR. Perlu verifikasi bukti pembayaran.",
            date: "12 Jun 2025",
            time: "09:15",
            status: "Unread",
            priority: "High",
            action: "Payment Verification",
            relatedAmount: 12000000
        },
        {
            id: "TGR-NOT-012",
            tgrId: "TGR-2025-015",
            title: "Permintaan Perpanjangan Waktu",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            message: "Peneliti mengajukan permohonan perpanjangan waktu untuk menyelesaikan TGR.",
            date: "10 Jun 2025",
            time: "15:20",
            status: "Read",
            priority: "Medium",
            action: "Extension Request",
            relatedAmount: 7500000
        },
        {
            id: "TGR-NOT-011",
            tgrId: "TGR-2025-015",
            title: "Konfirmasi Diterima",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            message: "Peneliti telah mengkonfirmasi penerimaan notifikasi TGR dan berjanji akan segera menyelesaikan.",
            date: "08 Jun 2025",
            time: "11:05",
            status: "Read",
            priority: "Low",
            action: "Confirmation",
            relatedAmount: 7500000
        },
        {
            id: "TGR-NOT-010",
            tgrId: "TGR-2025-014",
            title: "TGR Berhasil Diselesaikan",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            message: "Kasus TGR telah berhasil diselesaikan dan telah diverifikasi oleh bendahara.",
            date: "05 Jun 2025",
            time: "16:30",
            status: "Read",
            priority: "Low",
            action: "Completion",
            relatedAmount: 25000000
        },
        {
            id: "TGR-NOT-009",
            tgrId: "TGR-2025-013",
            title: "Permintaan Tambahan Dokumen",
            researcher: "Dr. Siti Rahayu",
            faculty: "Fakultas Ekonomi",
            message: "Bendahara meminta tambahan dokumen untuk proses verifikasi TGR.",
            date: "02 Jun 2025",
            time: "13:25",
            status: "Read",
            priority: "Medium",
            action: "Document Request",
            relatedAmount: 18000000
        }
    ];

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true
        });

        // Close filters dropdown when clicking outside
        function handleClickOutside(event) {
            if (filtersRef.current && !filtersRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleMarkAsRead = (id) => {
        // In a real application, you would update the notification status in the backend
        console.log(`Marked notification ${id} as read`);
    };

    const handleMarkAllAsRead = () => {
        // In a real application, you would update all notifications status in the backend
        console.log("Marked all notifications as read");
    };

    const filteredNotifications = tgrNotifications.filter(notification => {
        const matchesSearch =
            notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.tgrId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === "all" || notification.status.toLowerCase() === filterStatus.toLowerCase();
        const matchesPriority = selectedPriority === "all" || notification.priority.toLowerCase() === selectedPriority.toLowerCase();
        const matchesAction = selectedAction === "all" || notification.action.toLowerCase() === selectedAction.toLowerCase();

        return matchesSearch && matchesStatus && matchesPriority && matchesAction;
    });

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case "high": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            case "medium": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "low": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getActionColor = (action) => {
        switch (action) {
            case "Reminder": return "text-amber-600 dark:text-amber-400";
            case "Document Verification": return "text-blue-600 dark:text-blue-400";
            case "Payment Verification": return "text-green-600 dark:text-green-400";
            case "Extension Request": return "text-purple-600 dark:text-purple-400";
            case "Completion": return "text-green-600 dark:text-green-400";
            default: return "text-gray-600 dark:text-gray-400";
        }
    };

    const getActionIcon = (action) => {
        switch (action) {
            case "Reminder": return <MdAccessTime className="h-5 w-5" />;
            case "Document Verification": return <MdVisibility className="h-5 w-5" />;
            case "Payment Verification": return <MdCheck className="h-5 w-5" />;
            case "Extension Request": return <MdCalendarToday className="h-5 w-5" />;
            case "Confirmation": return <MdOutlineMarkEmailRead className="h-5 w-5" />;
            case "Completion": return <MdCheck className="h-5 w-5" />;
            case "Document Request": return <MdEmail className="h-5 w-5" />;
            default: return <MdNotificationsActive className="h-5 w-5" />;
        }
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link
                        to="/bendahara/tgr-management"
                        className="mr-3 p-2.5 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-navy-800 dark:to-navy-700 rounded-full hover:shadow-md hover:from-brand-100 hover:to-brand-200 dark:hover:from-navy-700 dark:hover:to-navy-600 transition-all duration-300"
                    >
                        <MdArrowBack className="h-5 w-5 text-brand-500 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white tracking-tight">
                            Notifikasi TGR
                        </h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Kelola dan pantau notifikasi terkait kasus TGR (Tuntutan Ganti Rugi)
                        </p>
                    </div>
                </div>
            </div>

            {/* Glass Morphism Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card extra="p-5 backdrop-blur-sm bg-white/60 dark:bg-navy-800/60 border border-gray-200/50 dark:border-navy-700/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                        <div className="flex items-center">
                            <div className="rounded-xl p-3.5 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 shadow-lg shadow-blue-500/30 dark:shadow-blue-700/30">
                                <MdNotifications className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Total Notifikasi</p>
                                <div className="flex items-baseline">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                        {notificationsStats.totalNotifications}
                                    </h4>
                                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">notifikasi</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full"
                            />
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card extra="p-5 backdrop-blur-sm bg-white/60 dark:bg-navy-800/60 border border-gray-200/50 dark:border-navy-700/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay="150">
                        <div className="flex items-center">
                            <div className="rounded-xl p-3.5 bg-gradient-to-br from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 shadow-lg shadow-red-500/30 dark:shadow-red-700/30">
                                <MdEmail className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Belum Dibaca</p>
                                <div className="flex items-baseline">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                        {notificationsStats.unreadNotifications}
                                    </h4>
                                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">notifikasi</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: `${(notificationsStats.unreadNotifications / notificationsStats.totalNotifications) * 100}%` }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="h-full bg-gradient-to-r from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 rounded-full"
                            />
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card extra="p-5 backdrop-blur-sm bg-white/60 dark:bg-navy-800/60 border border-gray-200/50 dark:border-navy-700/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                        <div className="flex items-center">
                            <div className="rounded-xl p-3.5 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 shadow-lg shadow-amber-500/30 dark:shadow-amber-700/30">
                                <MdCalendarToday className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Minggu Ini</p>
                                <div className="flex items-baseline">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                        {notificationsStats.thisWeekNotifications}
                                    </h4>
                                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">notifikasi</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: `${(notificationsStats.thisWeekNotifications / notificationsStats.totalNotifications) * 100}%` }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 rounded-full"
                            />
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card extra="p-5 backdrop-blur-sm bg-white/60 dark:bg-navy-800/60 border border-gray-200/50 dark:border-navy-700/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay="250">
                        <div className="flex items-center">
                            <div className="rounded-xl p-3.5 bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 shadow-lg shadow-purple-500/30 dark:shadow-purple-700/30">
                                <MdOutlineNotificationImportant className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Penting</p>
                                <div className="flex items-baseline">
                                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                        {notificationsStats.importantNotifications}
                                    </h4>
                                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">notifikasi</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: `${(notificationsStats.importantNotifications / notificationsStats.totalNotifications) * 100}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 rounded-full"
                            />
                        </div>
                    </Card>
                </motion.div>
            </div>

            <Card extra="p-6 backdrop-blur-sm bg-white/60 dark:bg-navy-800/60 border border-gray-200/50 dark:border-navy-700/50 hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <div className="flex items-center">
                        <div className="p-3 bg-brand-100 dark:bg-brand-900/30 rounded-full mr-3">
                            <MdNotifications className="h-6 w-6 text-brand-500 dark:text-brand-400" />
                        </div>
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                            Notifikasi TGR
                            <span className="ml-2 px-2.5 py-1 text-xs font-medium rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-500 dark:text-brand-400">
                                {filteredNotifications.length} Notifikasi
                            </span>
                        </h5>

                        <div className="ml-4 flex space-x-1">
                            <button
                                onClick={() => setView('card')}
                                className={`p-1.5 rounded-md transition-all ${view === 'card' ? 'bg-brand-50 text-brand-500 dark:bg-brand-900/30 dark:text-brand-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-700'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setView('compact')}
                                className={`p-1.5 rounded-md transition-all ${view === 'compact' ? 'bg-brand-50 text-brand-500 dark:bg-brand-900/30 dark:text-brand-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-700'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-grow w-full md:w-64">
                                <input
                                    type="text"
                                    placeholder="Cari notifikasi..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 backdrop-blur-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                            </div>

                            <div className="relative" ref={filtersRef}>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center gap-1 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-sm text-gray-700 dark:text-white hover:bg-white dark:hover:bg-navy-700 transition-all duration-200 backdrop-blur-sm"
                                >
                                    <MdOutlineFilterAlt className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span>Filter</span>
                                    <MdArrowDropDown className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                                </button>

                                {showFilters && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-xl shadow-xl z-10 p-4 backdrop-blur-sm bg-white/95 dark:bg-navy-800/95">
                                        <h6 className="text-sm font-medium text-gray-700 dark:text-white mb-3">Filter Notifikasi</h6>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Status</label>
                                                <select
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                                    value={filterStatus}
                                                    onChange={(e) => setFilterStatus(e.target.value)}
                                                >
                                                    <option value="all">Semua Status</option>
                                                    <option value="unread">Belum Dibaca</option>
                                                    <option value="read">Sudah Dibaca</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Prioritas</label>
                                                <select
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                                    value={selectedPriority}
                                                    onChange={(e) => setSelectedPriority(e.target.value)}
                                                >
                                                    <option value="all">Semua Prioritas</option>
                                                    <option value="high">Tinggi</option>
                                                    <option value="medium">Sedang</option>
                                                    <option value="low">Rendah</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Tindakan</label>
                                                <select
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                                    value={selectedAction}
                                                    onChange={(e) => setSelectedAction(e.target.value)}
                                                >
                                                    <option value="all">Semua Tindakan</option>
                                                    <option value="reminder">Pengingat</option>
                                                    <option value="document verification">Verifikasi Dokumen</option>
                                                    <option value="payment verification">Verifikasi Pembayaran</option>
                                                    <option value="extension request">Permintaan Perpanjangan</option>
                                                    <option value="confirmation">Konfirmasi</option>
                                                    <option value="completion">Penyelesaian</option>
                                                </select>
                                            </div>

                                            <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-navy-700">
                                                <button
                                                    onClick={() => {
                                                        setFilterStatus("all");
                                                        setSelectedPriority("all");
                                                        setSelectedAction("all");
                                                        setSearchTerm("");
                                                    }}
                                                    className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-navy-700 dark:hover:bg-navy-600 text-gray-700 dark:text-white rounded-lg mr-2"
                                                >
                                                    Reset
                                                </button>
                                                <button
                                                    onClick={() => setShowFilters(false)}
                                                    className="px-3 py-1.5 text-xs bg-brand-500 hover:bg-brand-600 text-white rounded-lg"
                                                >
                                                    Terapkan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleMarkAllAsRead()}
                                className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-navy-700 transition-all duration-200 backdrop-blur-sm tooltip-trigger"
                                title="Tandai semua dibaca"
                            >
                                <MdMarkEmailRead className="h-5 w-5" />
                                <span className="tooltip">Tandai Semua Dibaca</span>
                            </button>
                            <button
                                onClick={handleRefresh}
                                className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-navy-700 transition-all duration-200 backdrop-blur-sm tooltip-trigger"
                                title="Refresh data"
                            >
                                <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                                <span className="tooltip">Refresh</span>
                            </button>
                            <button
                                className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-navy-700 transition-all duration-200 backdrop-blur-sm tooltip-trigger"
                                title="Pengaturan"
                            >
                                <MdSettings className="h-5 w-5" />
                                <span className="tooltip">Pengaturan</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`space-y-4 ${view === 'compact' ? 'divide-y divide-gray-100 dark:divide-navy-700' : ''}`}>
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                onClick={() => setSelectedNotificationId(notification.id === selectedNotificationId ? null : notification.id)}
                                className={`${view === 'compact'
                                    ? `py-3 px-2 ${notification.status === "Unread" ? "bg-gray-50/80 dark:bg-navy-800/80" : "bg-white/80 dark:bg-navy-700/80"} backdrop-blur-sm`
                                    : `p-5 rounded-xl ${notification.status === "Unread"
                                        ? "bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-navy-800/80 dark:to-navy-700/80"
                                        : "bg-white/80 dark:bg-navy-700/80"
                                    } border ${notification.id === selectedNotificationId ? "border-brand-400" : "border-gray-100 dark:border-navy-700"} shadow-sm hover:shadow-md backdrop-blur-sm`
                                    } cursor-pointer transition-all duration-300`}
                            >
                                {view === 'compact' ? (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-2 rounded-full ${notification.priority === "High"
                                                ? "bg-red-100 dark:bg-red-900/20"
                                                : notification.priority === "Medium"
                                                    ? "bg-amber-100 dark:bg-amber-900/20"
                                                    : "bg-blue-100 dark:bg-blue-900/20"
                                                }`}>
                                                {getActionIcon(notification.action)}
                                            </div>
                                            <div>
                                                <div className="flex items-center">
                                                    <h6 className="text-sm font-medium text-navy-700 dark:text-white">
                                                        {notification.title}
                                                    </h6>
                                                    {notification.status === "Unread" && (
                                                        <span className="ml-2 w-2 h-2 inline-block rounded-full bg-red-500 animate-pulse"></span>
                                                    )}
                                                </div>
                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                    <span className="mr-2">{notification.researcher}</span>
                                                    <span>•</span>
                                                    <span className="mx-2">{notification.date}</span>
                                                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${getPriorityColor(notification.priority)}`}>
                                                        {notification.priority}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            {notification.status === "Unread" && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMarkAsRead(notification.id);
                                                    }}
                                                    className="p-1.5 rounded-lg bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-700"
                                                >
                                                    <MdOutlineMarkEmailRead className="h-4 w-4" />
                                                </button>
                                            )}
                                            <Link to={`/bendahara/tgr-management/tgr-list/${notification.tgrId}`}>
                                                <button
                                                    className="p-1.5 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-500 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/50"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <MdVisibility className="h-4 w-4" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex items-center">
                                                    <div className={`p-3 rounded-xl ${notification.priority === "High"
                                                        ? "bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20"
                                                        : notification.priority === "Medium"
                                                            ? "bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/20 dark:to-amber-800/20"
                                                            : "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20"
                                                        } mr-4 shadow-sm`}>
                                                        {getActionIcon(notification.action)}
                                                    </div>
                                                    <div>
                                                        <h6 className="font-semibold text-navy-700 dark:text-white flex items-center text-base">
                                                            {notification.title}
                                                            {notification.status === "Unread" && (
                                                                <span className="ml-2 w-2 h-2 inline-block rounded-full bg-red-500 animate-pulse"></span>
                                                            )}
                                                        </h6>
                                                        <div className="flex items-center mt-1">
                                                            <MdCalendarToday className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 mr-1.5" />
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">{notification.date}, {notification.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${getPriorityColor(notification.priority)}`}>
                                                        {notification.priority}
                                                    </span>
                                                    <div className="relative">
                                                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 text-gray-500 dark:text-gray-400">
                                                            <MdMoreVert className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="ml-16">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                                    {notification.message}
                                                </p>

                                                {notification.id === selectedNotificationId && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="mb-4"
                                                    >
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div className="flex items-start gap-3 bg-gray-50/60 dark:bg-navy-800/60 p-3 rounded-lg backdrop-blur-sm border border-gray-100/50 dark:border-navy-700/50">
                                                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                                    <MdPerson className="h-4 w-4 text-blue-600" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Peneliti:</p>
                                                                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                                                                        {notification.researcher}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                        {notification.faculty}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-start gap-3 bg-gray-50/60 dark:bg-navy-800/60 p-3 rounded-lg backdrop-blur-sm border border-gray-100/50 dark:border-navy-700/50">
                                                                <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-lg">
                                                                    <MdReportProblem className="h-4 w-4 text-brand-600" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">ID Kasus TGR:</p>
                                                                    <Link to={`/bendahara/tgr-management/tgr-list/${notification.tgrId}`} className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 hover:underline transition-colors">
                                                                        {notification.tgrId}
                                                                    </Link>
                                                                    <div className="flex items-center mt-1">
                                                                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Tindakan:</span>
                                                                        <span className={`text-xs font-medium ${getActionColor(notification.action)}`}>
                                                                            {notification.action}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg mr-2">
                                                            <MdAttachMoney className="h-3.5 w-3.5 text-green-600" />
                                                        </div>
                                                        <span className="text-sm font-medium text-navy-700 dark:text-white">
                                                            Rp {notification.relatedAmount.toLocaleString()}
                                                        </span>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        {notification.status === "Unread" && (
                                                            <button
                                                                className="px-3 py-2 text-xs font-medium rounded-lg bg-white dark:bg-navy-800 text-gray-700 dark:text-white border border-gray-200 dark:border-navy-600 hover:bg-gray-50 dark:hover:bg-navy-700 shadow-sm hover:shadow transition-all duration-200"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleMarkAsRead(notification.id);
                                                                }}
                                                            >
                                                                <div className="flex items-center gap-1.5">
                                                                    <MdOutlineMarkEmailRead className="h-4 w-4" />
                                                                    <span>Tandai Dibaca</span>
                                                                </div>
                                                            </button>
                                                        )}

                                                        <Link to={`/bendahara/tgr-management/tgr-list/${notification.tgrId}`}>
                                                            <button
                                                                className="px-3 py-2 text-xs font-medium rounded-lg bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white shadow-sm hover:shadow transition-all duration-300"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <div className="flex items-center gap-1.5">
                                                                    <MdVisibility className="h-4 w-4" />
                                                                    <span>Lihat Detail</span>
                                                                </div>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center py-16 bg-white/60 dark:bg-navy-800/60 rounded-xl shadow-sm backdrop-blur-sm"
                        >
                            <div className="p-5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-navy-700 dark:to-navy-800 rounded-full mb-4 shadow-inner">
                                <MdNotificationsNone className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                            </div>
                            <h5 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Tidak Ada Notifikasi</h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md text-center">
                                Tidak ada notifikasi yang sesuai dengan kriteria pencarian saat ini
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-4 px-4 py-2 bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow"
                                onClick={() => {
                                    setSearchTerm("");
                                    setFilterStatus("all");
                                    setSelectedPriority("all");
                                    setSelectedAction("all");
                                }}
                            >
                                Reset Filter
                            </motion.button>
                        </motion.div>
                    )}
                </div>

                {filteredNotifications.length > 5 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className="mt-6 text-center"
                    >
                        <button className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-navy-800 dark:to-navy-700 text-gray-700 dark:text-white hover:shadow rounded-lg transition-all duration-200">
                            Muat Lebih Banyak
                        </button>
                    </motion.div>
                )}
            </Card>

            {/* Enhanced Form with Glass Morphism Design */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Card extra="p-6 mt-6 backdrop-blur-sm bg-white/60 dark:bg-navy-800/60 border border-gray-200/50 dark:border-navy-700/50 hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="350">
                    <div className="flex items-center mb-6">
                        <div className="p-3 bg-gradient-to-br from-brand-300 to-brand-500 dark:from-brand-400 dark:to-brand-600 rounded-lg mr-3 shadow-lg shadow-brand-500/30 dark:shadow-brand-500/20">
                            <MdSend className="h-6 w-6 text-white" />
                        </div>
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">Kirim Notifikasi TGR</h5>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-5">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                                        <MdReportProblem className="mr-2 h-4 w-4 text-brand-500" />
                                        ID Kasus TGR
                                    </label>
                                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 appearance-none pr-8 transition-all duration-200 backdrop-blur-sm"
                                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1.5em 1.5em" }}
                                    >
                                        <option value="">Pilih Kasus TGR</option>
                                        <option value="TGR-2025-018">TGR-2025-018 - Dr. Budi Santoso</option>
                                        <option value="TGR-2025-017">TGR-2025-017 - Dr. Maya Putri</option>
                                        <option value="TGR-2025-016">TGR-2025-016 - Dr. Andi Wijaya</option>
                                        <option value="TGR-2025-015">TGR-2025-015 - Dr. Ratna Sari</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                                        <MdFilterList className="mr-2 h-4 w-4 text-amber-500" />
                                        Jenis Notifikasi
                                    </label>
                                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 appearance-none pr-8 transition-all duration-200 backdrop-blur-sm"
                                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1.5em 1.5em" }}
                                    >
                                        <option value="">Pilih Jenis Notifikasi</option>
                                        <option value="reminder">Pengingat</option>
                                        <option value="document_request">Permintaan Dokumen</option>
                                        <option value="payment_reminder">Pengingat Pembayaran</option>
                                        <option value="verification_result">Hasil Verifikasi</option>
                                        <option value="extension_response">Respons Perpanjangan</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                                        <MdPriorityHigh className="mr-2 h-4 w-4 text-red-500" />
                                        Prioritas
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <label className="relative cursor-pointer">
                                            <input type="radio" name="priority" value="high" className="peer sr-only" />
                                            <div className="flex flex-col items-center p-3 bg-white dark:bg-navy-700 border-2 border-gray-200 dark:border-navy-600 rounded-xl shadow-sm peer-checked:shadow peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/10 dark:peer-checked:border-red-400 transition-all duration-300">
                                                <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 mb-2">
                                                    <MdPriorityHigh className="h-5 w-5 text-red-500" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tinggi</span>
                                                <div className="absolute -right-1.5 -top-1.5 z-10 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center scale-0 peer-checked:scale-100 transition-transform">
                                                    <MdCheck size={12} />
                                                </div>
                                            </div>
                                        </label>

                                        <label className="relative cursor-pointer">
                                            <input type="radio" name="priority" value="medium" className="peer sr-only" defaultChecked />
                                            <div className="flex flex-col items-center p-3 bg-white dark:bg-navy-700 border-2 border-gray-200 dark:border-navy-600 rounded-xl shadow-sm peer-checked:shadow peer-checked:border-amber-500 peer-checked:bg-amber-50 dark:peer-checked:bg-amber-900/10 dark:peer-checked:border-amber-400 transition-all duration-300">
                                                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-2">
                                                    <MdWarning className="h-5 w-5 text-amber-500" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sedang</span>
                                                <div className="absolute -right-1.5 -top-1.5 z-10 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center scale-0 peer-checked:scale-100 transition-transform">
                                                    <MdCheck size={12} />
                                                </div>
                                            </div>
                                        </label>

                                        <label className="relative cursor-pointer">
                                            <input type="radio" name="priority" value="low" className="peer sr-only" />
                                            <div className="flex flex-col items-center p-3 bg-white dark:bg-navy-700 border-2 border-gray-200 dark:border-navy-600 rounded-xl shadow-sm peer-checked:shadow peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/10 dark:peer-checked:border-blue-400 transition-all duration-300">
                                                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-2">
                                                    <MdAccessTime className="h-5 w-5 text-blue-500" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rendah</span>
                                                <div className="absolute -right-1.5 -top-1.5 z-10 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center scale-0 peer-checked:scale-100 transition-transform">
                                                    <MdCheck size={12} />
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                                        <MdNotifications className="mr-2 h-4 w-4 text-blue-500" />
                                        Judul Notifikasi
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan judul notifikasi"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 backdrop-blur-sm"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                                        <MdMessage className="mr-2 h-4 w-4 text-green-500" />
                                        Pesan
                                    </label>
                                    <textarea
                                        placeholder="Masukkan pesan notifikasi..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-white/80 dark:bg-navy-700/80 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 backdrop-blur-sm"
                                        rows={5}
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                                        <MdOutlineAttachFile className="mr-2 h-4 w-4 text-purple-500" />
                                        Lampiran (Opsional)
                                    </label>
                                    <div className="mt-1 flex justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-white/40 dark:bg-navy-700/40 backdrop-blur-sm">
                                        <div className="p-6 text-center">
                                            <div className="mx-auto h-12 w-12 text-gray-400 mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                <label className="cursor-pointer bg-gradient-to-r from-brand-400 to-brand-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:from-brand-500 hover:to-brand-700 transition-all duration-200 shadow-sm hover:shadow">
                                                    <span>Upload File</span>
                                                    <input type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-2">atau drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                                PNG, JPG, PDF hingga 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="px-5 py-2.5 bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                            >
                                <MdSend className="mr-2 h-5 w-5" />
                                <span>Kirim Notifikasi</span>
                            </motion.button>
                        </div>
                    </form>
                </Card>
            </motion.div>

            <style jsx>{`
                .tooltip-trigger {
                    position: relative;
                }
                .tooltip {
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: rgba(0,0,0,0.7);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                .tooltip-trigger:hover .tooltip {
                    opacity: 1;
                    visibility: visible;
                }
            `}</style>
        </div>
    );
};

export default TgrNotifications;
