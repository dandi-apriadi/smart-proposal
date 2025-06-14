import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdReportProblem,
    MdFilterList,
    MdSearch,
    MdOutlineMarkEmailRead,
    MdClose,
    MdArrowBack,
    MdRefresh,
    MdFileDownload,
    MdLightbulb,
    MdWarningAmber,
    MdError,
    MdAssignment,
    MdAutorenew,
    MdCheck,
    MdDocumentScanner
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const ReportsRequiringAction = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPriority, setFilterPriority] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data for reports requiring action
    const actionStats = {
        totalReports: 18,
        unreadReports: 6,
        highPriorityReports: 4,
        mediumPriorityReports: 9,
        lowPriorityReports: 5
    };

    const reportsRequiringAction = [
        {
            id: "ACT-2025-0018",
            title: "Laporan Keuangan Memerlukan Revisi",
            message: "Laporan penggunaan dana Dr. Budi Santoso memerlukan revisi terkait beberapa bukti pengeluaran yang belum valid.",
            type: "Laporan Keuangan",
            researcher: "Dr. Budi Santoso",
            faculty: "Fakultas Teknik",
            researchTitle: "Pengembangan Machine Learning untuk Deteksi Penyakit Tanaman",
            documentId: "RPT-2025-0042",
            priority: "Tinggi",
            dueDate: "17 Jun 2025",
            remainingDays: 2,
            date: "15 Jun 2025",
            time: "30 menit yang lalu",
            isRead: false,
            actions: ["Review", "Hubungi Peneliti", "Tandai Selesai"]
        },
        {
            id: "ACT-2025-0017",
            title: "Bukti Pengeluaran Tidak Sesuai",
            message: "Bukti pengeluaran untuk pembelian peralatan dalam penelitian Prof. Dewi Lestari tidak sesuai dengan anggaran yang diajukan.",
            type: "Bukti Pengeluaran",
            researcher: "Prof. Dewi Lestari",
            faculty: "Fakultas Ekonomi",
            researchTitle: "Analisis Dampak Ekonomi dari Perubahan Iklim di Indonesia",
            documentId: "RPT-2025-0041",
            priority: "Tinggi",
            dueDate: "18 Jun 2025",
            remainingDays: 3,
            date: "15 Jun 2025",
            time: "2 jam yang lalu",
            isRead: false,
            actions: ["Review", "Hubungi Peneliti", "Tandai Selesai"]
        },
        {
            id: "ACT-2025-0016",
            title: "Status TGR Perlu Diperbarui",
            message: "Status TGR Dr. Andi Wijaya perlu diperbarui sebelum proposal baru dapat diproses.",
            type: "Status TGR",
            researcher: "Dr. Andi Wijaya",
            faculty: "Fakultas Psikologi",
            researchTitle: "Efektivitas Metode Pembelajaran Jarak Jauh pada Mahasiswa",
            documentId: "TGR-2025-010",
            priority: "Sedang",
            dueDate: "20 Jun 2025",
            remainingDays: 5,
            date: "14 Jun 2025",
            time: "1 hari yang lalu",
            isRead: true,
            actions: ["Review", "Perbarui Status", "Tandai Selesai"]
        },
        {
            id: "ACT-2025-0015",
            title: "Notifikasi Keterlambatan Laporan",
            message: "Dr. Ratna Sari belum mengirimkan laporan kemajuan keuangan yang seharusnya dikirim tanggal 10 Juni 2025.",
            type: "Keterlambatan",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            researchTitle: "Sistem Monitoring Kualitas Air Berbasis IoT",
            documentId: "RPT-DUE-2025-032",
            priority: "Tinggi",
            dueDate: "16 Jun 2025",
            remainingDays: 1,
            date: "14 Jun 2025",
            time: "1 hari yang lalu",
            isRead: false,
            actions: ["Kirim Pengingat", "Tandai Selesai"]
        },
        {
            id: "ACT-2025-0014",
            title: "Kelebihan Penggunaan Anggaran",
            message: "Prof. Hendra Gunawan melaporkan penggunaan dana yang melebihi anggaran yang telah disetujui.",
            type: "Kelebihan Anggaran",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            researchTitle: "Pengembangan Bahan Bakar Alternatif dari Mikroalga",
            documentId: "BDG-EXCESS-024",
            priority: "Sedang",
            dueDate: "19 Jun 2025",
            remainingDays: 4,
            date: "13 Jun 2025",
            time: "2 hari yang lalu",
            isRead: true,
            actions: ["Review", "Hubungi Peneliti", "Tandai Selesai"]
        },
        {
            id: "ACT-2025-0013",
            title: "Perlu Verifikasi Realokasi Dana",
            message: "Dr. Maya Putri mengajukan permohonan untuk realokasi dana dari satu kategori ke kategori lain dalam penelitiannya.",
            type: "Realokasi Dana",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            researchTitle: "Analisis Big Data untuk Prediksi Perilaku Konsumen",
            documentId: "REAL-2025-018",
            priority: "Rendah",
            dueDate: "25 Jun 2025",
            remainingDays: 10,
            date: "12 Jun 2025",
            time: "3 hari yang lalu",
            isRead: true,
            actions: ["Review", "Setujui", "Tolak", "Tandai Selesai"]
        },
        {
            id: "ACT-2025-0012",
            title: "Laporan Akhir Memerlukan Tanda Tangan",
            message: "Laporan akhir penelitian dari Dr. Eko Prasetyo memerlukan tanda tangan bendahara untuk pencairan dana tahap akhir.",
            type: "Tanda Tangan",
            researcher: "Dr. Eko Prasetyo",
            faculty: "Fakultas MIPA",
            researchTitle: "Ekstraksi Senyawa Bioaktif dari Tanaman Herbal Indonesia",
            documentId: "FIN-RPT-2025-028",
            priority: "Sedang",
            dueDate: "21 Jun 2025",
            remainingDays: 6,
            date: "11 Jun 2025",
            time: "4 hari yang lalu",
            isRead: false,
            actions: ["Review", "Tanda Tangani", "Tandai Selesai"]
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

    const filteredReports = reportsRequiringAction.filter(report => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.researcher.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPriority = filterPriority === "all" || report.priority.toLowerCase() === filterPriority.toLowerCase();

        return matchesSearch && matchesPriority;
    });

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case "tinggi": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            case "sedang": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "rendah": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority.toLowerCase()) {
            case "tinggi": return <MdError className="h-5 w-5 text-red-600 dark:text-red-400" />;
            case "sedang": return <MdWarningAmber className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
            case "rendah": return <MdLightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
            default: return <MdReportProblem className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
        }
    };

    const getTypeIcon = (type) => {
        switch (type.toLowerCase()) {
            case "laporan keuangan":
                return <MdAssignment className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
            case "bukti pengeluaran":
                return <MdDocumentScanner className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
            case "status tgr":
                return <MdWarningAmber className="h-5 w-5 text-red-600 dark:text-red-400" />;
            case "keterlambatan":
                return <MdAutorenew className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
            case "kelebihan anggaran":
                return <MdReportProblem className="h-5 w-5 text-red-600 dark:text-red-400" />;
            case "realokasi dana":
                return <MdAutorenew className="h-5 w-5 text-green-600 dark:text-green-400" />;
            case "tanda tangan":
                return <MdCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
            default:
                return <MdReportProblem className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
        }
    };

    const getRemainingDaysColor = (days) => {
        if (days <= 2) return "text-red-600 dark:text-red-400";
        if (days <= 5) return "text-amber-600 dark:text-amber-400";
        return "text-green-600 dark:text-green-400";
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link to="/bendahara/notification-hub" className="mr-3 p-2 bg-gray-100 dark:bg-navy-800 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700">
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Laporan Memerlukan Tindakan</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Notifikasi laporan yang memerlukan tindakan Anda
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
                <Card extra="p-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdReportProblem className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Laporan</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {actionStats.totalReports}
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
                                {actionStats.unreadReports}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-red-100 dark:bg-red-900/30">
                            <MdError className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Prioritas Tinggi</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {actionStats.highPriorityReports}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdWarningAmber className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Prioritas Sedang</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {actionStats.mediumPriorityReports}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdLightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Prioritas Rendah</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {actionStats.lowPriorityReports}
                            </h4>
                        </div>
                    </div>
                </Card>
            </div>

            <Card extra="p-6" data-aos="fade-up" data-aos-delay="350">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                        Laporan Memerlukan Tindakan
                    </h5>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-grow w-full md:w-64">
                                <input
                                    type="text"
                                    placeholder="Cari laporan..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <select
                                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
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
                    {filteredReports.length > 0 ? (
                        filteredReports.map((report, index) => (
                            <div
                                key={report.id}
                                className={`p-4 border-l-4 border-l-red-500 rounded-lg ${!report.isRead ? 'bg-gray-50 dark:bg-navy-800' : 'bg-white dark:bg-navy-700'} transition-all`}
                                data-aos="fade-up"
                                data-aos-delay={100 + (index * 50)}
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <div className="p-2.5 rounded-full bg-red-100 dark:bg-red-900/30 mr-3">
                                                    {getTypeIcon(report.type)}
                                                </div>
                                                <h6 className="font-medium text-navy-700 dark:text-white flex items-center">
                                                    {report.title}
                                                    {!report.isRead && (
                                                        <span className="ml-2 w-2 h-2 inline-block rounded-full bg-brand-500"></span>
                                                    )}
                                                </h6>
                                            </div>
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center ${getPriorityColor(report.priority)}`}>
                                                {getPriorityIcon(report.priority)}
                                                <span className="ml-1">{report.priority}</span>
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 ml-12 mb-3">
                                            {report.message}
                                        </p>

                                        <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Peneliti:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{report.researcher}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Fakultas:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{report.faculty}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Judul Penelitian:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{report.researchTitle}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">ID Dokumen:</span>
                                                <Link to={`/bendahara/report-verification/detail/${report.documentId}`} className="text-sm font-medium text-brand-500 hover:underline">
                                                    {report.documentId}
                                                </Link>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Tenggat Waktu:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{report.dueDate}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Sisa Waktu:</span>
                                                <span className={`text-sm font-medium ${getRemainingDaysColor(report.remainingDays)}`}>
                                                    {report.remainingDays} hari lagi
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-3 ml-12 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{report.time} • {report.date}</span>
                                                <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{report.type}</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                {/* Action buttons */}
                                                <div className="flex gap-2">
                                                    {report.actions.map((action, idx) => (
                                                        <button
                                                            key={idx}
                                                            className={`px-3 py-1 text-xs font-medium rounded ${action === "Review"
                                                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100"
                                                                    : action === "Tandai Selesai"
                                                                        ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100"
                                                                        : action === "Hubungi Peneliti" || action === "Kirim Pengingat"
                                                                            ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100"
                                                                            : action === "Tolak"
                                                                                ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100"
                                                                                : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100"
                                                                }`}
                                                        >
                                                            {action}
                                                        </button>
                                                    ))}
                                                </div>
                                                {!report.isRead && (
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
                            <MdReportProblem className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                            <p className="text-lg font-medium">Tidak ada laporan yang memerlukan tindakan</p>
                            <p className="text-sm">Tidak ada laporan yang sesuai dengan kriteria pencarian.</p>
                        </div>
                    )}
                </div>

                {filteredReports.length > 5 && (
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

export default ReportsRequiringAction;
