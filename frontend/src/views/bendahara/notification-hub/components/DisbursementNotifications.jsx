import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdAttachMoney,
    MdFilterList,
    MdSearch,
    MdCheckCircle,
    MdOutlineMarkEmailRead,
    MdClose,
    MdArrowBack,
    MdRefresh,
    MdFileDownload
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const DisbursementNotifications = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data for disbursement notifications
    const disbursementStats = {
        totalNotifications: 21,
        unreadNotifications: 7,
        successfulDisbursements: 14,
        pendingDisbursements: 7
    };

    const disbursementNotifications = [
        {
            id: "DISB-2025-0021",
            title: "Dana Berhasil Dicairkan",
            message: "Dana untuk penelitian 'Analisis Dampak Ekonomi dari Perubahan Iklim di Indonesia' telah berhasil dicairkan sebesar Rp 65.000.000.",
            proposalId: "PRP-2025-038",
            researcher: "Prof. Dewi Lestari",
            faculty: "Fakultas Ekonomi",
            amount: 65000000,
            status: "Sukses",
            date: "15 Jun 2025",
            time: "5 jam yang lalu",
            isRead: false,
            type: "Pencairan Berhasil"
        },
        {
            id: "DISB-2025-0020",
            title: "Dana Berhasil Dicairkan",
            message: "Dana untuk penelitian 'Sistem Monitoring Kualitas Air Berbasis IoT' telah berhasil dicairkan sebesar Rp 82.000.000.",
            proposalId: "PRP-2025-035",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            amount: 82000000,
            status: "Sukses",
            date: "14 Jun 2025",
            time: "1 hari yang lalu",
            isRead: true,
            type: "Pencairan Berhasil"
        },
        {
            id: "DISB-2025-0019",
            title: "Pencairan Dana Memerlukan Verifikasi",
            message: "Pencairan dana untuk penelitian 'Efektivitas Metode Pembelajaran Jarak Jauh pada Mahasiswa' memerlukan verifikasi tambahan.",
            proposalId: "PRP-2025-036",
            researcher: "Dr. Andi Wijaya",
            faculty: "Fakultas Psikologi",
            amount: 50000000,
            status: "Memerlukan Tindakan",
            date: "14 Jun 2025",
            time: "1 hari yang lalu",
            isRead: false,
            type: "Verifikasi Pencairan"
        },
        {
            id: "DISB-2025-0018",
            title: "Jumlah Dana Diperbarui",
            message: "Jumlah dana untuk pencairan penelitian 'Pengembangan Bahan Bakar Alternatif dari Mikroalga' telah diperbarui dari Rp 90.000.000 menjadi Rp 95.000.000.",
            proposalId: "PRP-2025-032",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            amount: 95000000,
            status: "Info",
            date: "13 Jun 2025",
            time: "2 hari yang lalu",
            isRead: true,
            type: "Perubahan Dana"
        },
        {
            id: "DISB-2025-0017",
            title: "Pembayaran Ditolak",
            message: "Pencairan dana untuk penelitian 'Pengaruh Media Sosial terhadap Perilaku Konsumen' ditolak oleh sistem perbankan. Mohon verifikasi rekening tujuan.",
            proposalId: "PRP-2025-030",
            researcher: "Dr. Siti Rahayu",
            faculty: "Fakultas Ekonomi",
            amount: 70000000,
            status: "Gagal",
            date: "12 Jun 2025",
            time: "3 hari yang lalu",
            isRead: false,
            type: "Pencairan Gagal"
        },
        {
            id: "DISB-2025-0016",
            title: "Dana Berhasil Dicairkan",
            message: "Dana untuk penelitian 'Analisis Big Data untuk Prediksi Perilaku Konsumen' telah berhasil dicairkan sebesar Rp 68.000.000.",
            proposalId: "PRP-2025-029",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            amount: 68000000,
            status: "Sukses",
            date: "12 Jun 2025",
            time: "3 hari yang lalu",
            isRead: true,
            type: "Pencairan Berhasil"
        },
        {
            id: "DISB-2025-0015",
            title: "Pencairan Dana Menunggu Persetujuan",
            message: "Pencairan dana untuk penelitian 'Pengembangan Machine Learning untuk Deteksi Penyakit Tanaman' senilai Rp 75.000.000 menunggu persetujuan akhir.",
            proposalId: "PRP-2025-042",
            researcher: "Dr. Budi Santoso",
            faculty: "Fakultas Teknik",
            amount: 75000000,
            status: "Menunggu",
            date: "11 Jun 2025",
            time: "4 hari yang lalu",
            isRead: true,
            type: "Menunggu Persetujuan"
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

    const filteredNotifications = disbursementNotifications.filter(notification => {
        const matchesSearch =
            notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.researcher.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === "all" ||
            (filterStatus === "unread" && !notification.isRead) ||
            (filterStatus === "success" && notification.status === "Sukses") ||
            (filterStatus === "pending" && (notification.status === "Menunggu" || notification.status === "Memerlukan Tindakan")) ||
            (filterStatus === "failed" && notification.status === "Gagal");

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "Sukses": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Memerlukan Tindakan": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "Menunggu": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "Gagal": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            case "Info": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
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
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Pemberitahuan Pencairan</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Notifikasi terkait proses pencairan dana penelitian
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <Card extra="p-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdAttachMoney className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Notifikasi</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {disbursementStats.totalNotifications}
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
                                {disbursementStats.unreadNotifications}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                            <MdCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pencairan Sukses</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {disbursementStats.successfulDisbursements}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-red-100 dark:bg-red-900/30">
                            <MdAttachMoney className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pencairan Tertunda</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {disbursementStats.pendingDisbursements}
                            </h4>
                        </div>
                    </div>
                </Card>
            </div>

            <Card extra="p-6" data-aos="fade-up" data-aos-delay="300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                        Notifikasi Pencairan Dana
                    </h5>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-grow w-full md:w-64">
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
                                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">Semua Status</option>
                                <option value="unread">Belum Dibaca</option>
                                <option value="success">Sukses</option>
                                <option value="pending">Tertunda/Tindakan</option>
                                <option value="failed">Gagal</option>
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
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification, index) => (
                            <div
                                key={notification.id}
                                className={`p-4 border-l-4 border-l-brand-500 rounded-lg ${!notification.isRead ? 'bg-gray-50 dark:bg-navy-800' : 'bg-white dark:bg-navy-700'} transition-all`}
                                data-aos="fade-up"
                                data-aos-delay={100 + (index * 50)}
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <div className="p-2.5 rounded-full bg-green-100 dark:bg-green-900/30 mr-3">
                                                    <MdAttachMoney className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                </div>
                                                <h6 className="font-medium text-navy-700 dark:text-white">
                                                    {notification.title}
                                                    {!notification.isRead && (
                                                        <span className="ml-2 w-2 h-2 inline-block rounded-full bg-brand-500"></span>
                                                    )}
                                                </h6>
                                            </div>
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(notification.status)}`}>
                                                {notification.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 ml-12 mb-3">
                                            {notification.message}
                                        </p>

                                        <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Peneliti:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{notification.researcher}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Fakultas:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{notification.faculty}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">ID Proposal:</span>
                                                <Link to={`/bendahara/funding-management/proposal/${notification.proposalId}`} className="text-sm font-medium text-brand-500 hover:underline">
                                                    {notification.proposalId}
                                                </Link>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Jumlah:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">Rp {notification.amount.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="mt-3 ml-12 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time} • {notification.date}</span>
                                                <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{notification.type}</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                {!notification.isRead && (
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
                            <MdAttachMoney className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                            <p className="text-lg font-medium">Tidak ada notifikasi pencairan</p>
                            <p className="text-sm">Tidak ada notifikasi pencairan dana yang sesuai dengan kriteria pencarian.</p>
                        </div>
                    )}
                </div>

                {filteredNotifications.length > 5 && (
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

export default DisbursementNotifications;
