import React, { useState, useEffect } from "react";
import {
    MdHistory,
    MdCheckCircle,
    MdWarning,
    MdNotifications,
    MdFilterList,
    MdSearch,
    MdRefresh,
    MdExpandMore,
    MdMoreVert
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Card from "components/card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RecentActivity = ({ activities: initialActivities, isLoading = false }) => {
    const [activities, setActivities] = useState(initialActivities || []);
    const [filter, setFilter] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedItem, setExpandedItem] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        if (initialActivities) {
            setActivities(initialActivities);
        }
    }, [initialActivities]);

    // Mock data if no activities are provided
    useEffect(() => {
        if (!initialActivities && !activities.length) {
            const mockActivities = [
                { id: 1, action: "Proposal disetujui", date: "2025-04-15 09:30", status: "success", details: "Proposal 'Pengembangan Aplikasi Mobile' telah disetujui oleh Reviewer. Anda dapat melanjutkan ke tahap berikutnya." },
                { id: 2, action: "Feedback diterima", date: "2025-04-13 14:20", status: "info", details: "Reviewer telah memberikan feedback untuk proposal Anda. Silakan tinjau dan lakukan revisi sesuai kebutuhan." },
                { id: 3, action: "Laporan kemajuan diunggah", date: "2025-04-10 11:45", status: "success", details: "Laporan kemajuan untuk periode April telah berhasil diunggah. Menunggu tinjauan dari komite." },
                { id: 4, action: "Revisi proposal diminta", date: "2025-04-08 16:30", status: "warning", details: "Reviewer meminta revisi pada bagian metodologi dan anggaran. Harap perbaiki dalam 7 hari." },
                { id: 5, action: "Proposal baru diajukan", date: "2025-04-05 10:15", status: "success", details: "Proposal 'Analisis Machine Learning untuk Prediksi Kelulusan' telah berhasil diajukan. Sedang menunggu proses review." },
            ];
            setActivities(mockActivities);
        }
    }, [initialActivities, activities]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        // Simulate refresh delay
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    };

    const toggleExpand = (id) => {
        if (expandedItem === id) {
            setExpandedItem(null);
        } else {
            setExpandedItem(id);
        }
    };

    const filteredActivities = activities.filter(activity => {
        // Apply status filter
        if (filter !== "all" && activity.status !== filter) return false;

        // Apply search filter
        if (searchTerm && !activity.action.toLowerCase().includes(searchTerm.toLowerCase())) return false;

        return true;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case "success":
                return <MdCheckCircle className="text-green-600" size={20} />;
            case "warning":
                return <MdWarning className="text-orange-600" size={20} />;
            default:
                return <MdNotifications className="text-blue-600" size={20} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "success":
                return "bg-green-100 text-green-600";
            case "warning":
                return "bg-orange-100 text-orange-600";
            default:
                return "bg-blue-100 text-blue-600";
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return "Hari ini";
        } else if (diffInDays === 1) {
            return "Kemarin";
        } else if (diffInDays < 7) {
            return `${diffInDays} hari yang lalu`;
        } else {
            return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        }
    };

    // Skeleton loader for loading state
    if (isLoading) {
        return (
            <Card extra="p-[20px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                        <MdHistory className="inline-block mr-2" size={22} />
                        Aktivitas Terbaru
                    </h5>
                    <Skeleton width={40} height={40} circle={true} />
                </div>
                <div className="flex flex-col gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-start">
                            <Skeleton circle height={36} width={36} className="mr-3" />
                            <div className="flex-1">
                                <Skeleton height={20} width="80%" />
                                <Skeleton height={16} width="40%" className="mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        );
    }

    return (
        <Card extra="p-[20px] overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                    <MdHistory className="inline-block mr-2 text-navy-700 dark:text-white" size={22} />
                    Aktivitas Terbaru
                </h5>
                <div className="flex items-center mt-2 sm:mt-0 space-x-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari aktivitas..."
                            className="py-1 px-3 pr-8 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 transition-all duration-300 focus:w-48"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <MdSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    <button
                        className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <MdFilterList size={20} className="text-gray-600" />
                    </button>
                    <button
                        className={`p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300 ${isRefreshing ? 'animate-spin' : ''}`}
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                    >
                        <MdRefresh size={20} className="text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Filters */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mb-4"
                    >
                        <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg">
                            <button
                                onClick={() => setFilter("all")}
                                className={`py-1 px-3 text-xs rounded-full transition-all ${filter === "all" ? "bg-navy-700 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => setFilter("success")}
                                className={`py-1 px-3 text-xs rounded-full transition-all ${filter === "success" ? "bg-green-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                Sukses
                            </button>
                            <button
                                onClick={() => setFilter("warning")}
                                className={`py-1 px-3 text-xs rounded-full transition-all ${filter === "warning" ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                Perhatian
                            </button>
                            <button
                                onClick={() => setFilter("info")}
                                className={`py-1 px-3 text-xs rounded-full transition-all ${filter === "info" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                Informasi
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Activity List */}
            {filteredActivities.length > 0 ? (
                <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 timeline-scroll">
                    {filteredActivities.map((activity, index) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="relative"
                        >
                            {index !== filteredActivities.length - 1 && (
                                <div className="absolute left-[15px] top-6 h-full w-0.5 bg-gray-200 z-0"></div>
                            )}
                            <div className="flex items-start z-10 relative group">
                                <div
                                    className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 
                  ${getStatusColor(activity.status)} transition-transform duration-300 group-hover:scale-110`}
                                >
                                    {getStatusIcon(activity.status)}
                                </div>

                                <div className="flex-1 bg-gray-50 dark:bg-navy-700 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-600 transition-all duration-300 cursor-pointer" onClick={() => toggleExpand(activity.id)}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-navy-700 dark:text-white">{activity.action}</p>
                                            <p className="text-xs text-gray-500 mt-1">{formatDate(activity.date)}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <motion.div
                                                animate={{ rotate: expandedItem === activity.id ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <MdExpandMore size={20} className="text-gray-500" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedItem === activity.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-navy-500">
                                                    <p className="text-sm text-gray-700 dark:text-gray-300">{activity.details}</p>
                                                    <div className="mt-2 flex justify-end">
                                                        <button className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                                                            Lihat Detail
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                                        <MdMoreVert size={16} className="text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-8 px-4 bg-gray-50 dark:bg-navy-700 rounded-lg text-center">
                    <MdHistory size={48} className="text-gray-400 mb-2" />
                    <h6 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Tidak Ada Aktivitas</h6>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Belum ada aktivitas terbaru yang tercatat</p>
                    <button className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors">
                        Lihat Semua Riwayat
                    </button>
                </div>
            )}

            {/* View All Button */}
            {filteredActivities.length > 0 && (
                <div className="mt-4 text-center">
                    <button className="text-sm text-blue-500 hover:text-blue-700 font-medium transition-colors">
                        Lihat Semua Aktivitas
                    </button>
                </div>
            )}

            {/* Custom scrollbar styles */}
            <style jsx>{`
        .timeline-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .timeline-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .timeline-scroll::-webkit-scrollbar-thumb {
          background: #c5c5c5;
          border-radius: 10px;
        }
        .timeline-scroll::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
        </Card>
    );
};

export default RecentActivity;
