import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdVerifiedUser,
    MdFilterList,
    MdSearch,
    MdOutlineMarkEmailRead,
    MdClose,
    MdArrowBack,
    MdRefresh,
    MdFileDownload,
    MdCheck,
    MdCancel,
    MdReceipt,
    MdAttachFile,
    MdAssignment,
    MdCheckCircle,
    MdVerified
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const VerificationRequests = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data for verification requests
    const verificationStats = {
        totalRequests: 16,
        unreadRequests: 6,
        pendingVerification: 10,
        verifiedRequests: 6
    };

    const verificationRequests = [
        {
            id: "VRF-2025-0016",
            title: "Permintaan Verifikasi Laporan Penggunaan Dana",
            message: "Dr. Budi Santoso telah mengirimkan laporan penggunaan dana untuk penelitian Machine Learning untuk diverifikasi.",
            type: "Laporan Dana",
            researcher: "Dr. Budi Santoso",
            faculty: "Fakultas Teknik",
            submittedDate: "15 Jun 2025",
            researchTitle: "Pengembangan Machine Learning untuk Deteksi Penyakit Tanaman",
            documentId: "RPT-2025-0042",
            status: "Menunggu",
            time: "10 menit yang lalu",
            isRead: false,
            actions: ["Verifikasi", "Tolak"]
        },
        {
            id: "VRF-2025-0015",
            title: "Permintaan Verifikasi Bukti Pengeluaran",
            message: "Prof. Dewi Lestari telah mengirimkan bukti pengeluaran untuk penelitian Ekonomi Perubahan Iklim untuk diverifikasi.",
            type: "Bukti Pengeluaran",
            researcher: "Prof. Dewi Lestari",
            faculty: "Fakultas Ekonomi",
            submittedDate: "14 Jun 2025",
            researchTitle: "Analisis Dampak Ekonomi dari Perubahan Iklim di Indonesia",
            documentId: "RPT-2025-0041",
            status: "Menunggu",
            time: "1 hari yang lalu",
            isRead: true,
            actions: ["Verifikasi", "Tolak"]
        },
        {
            id: "VRF-2025-0014",
            title: "Permintaan Verifikasi Status Bebas TGR",
            message: "Dr. Andi Wijaya meminta verifikasi status bebas TGR untuk proposal penelitian baru.",
            type: "Status TGR",
            researcher: "Dr. Andi Wijaya",
            faculty: "Fakultas Psikologi",
            submittedDate: "14 Jun 2025",
            researchTitle: "Efektivitas Metode Pembelajaran Jarak Jauh pada Mahasiswa",
            documentId: "TGR-CLEAR-0028",
            status: "Menunggu",
            time: "1 hari yang lalu",
            isRead: false,
            actions: ["Verifikasi", "Tolak"]
        },
        {
            id: "VRF-2025-0013",
            title: "Permintaan Verifikasi Laporan Akhir Keuangan",
            message: "Dr. Ratna Sari telah mengirimkan laporan akhir keuangan untuk penelitian Monitoring Kualitas Air.",
            type: "Laporan Akhir",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            submittedDate: "13 Jun 2025",
            researchTitle: "Sistem Monitoring Kualitas Air Berbasis IoT",
            documentId: "RPT-2025-0040",
            status: "Menunggu",
            time: "2 hari yang lalu",
            isRead: false,
            actions: ["Verifikasi", "Tolak", "Minta Revisi"]
        },
        {
            id: "VRF-2025-0012",
            title: "Permintaan Validasi Alokasi Dana",
            message: "Bagian Keuangan meminta validasi untuk alokasi dana penelitian batch 3 tahun 2025.",
            type: "Alokasi Dana",
            researcher: "Bagian Keuangan",
            faculty: "Administrasi Universitas",
            submittedDate: "12 Jun 2025",
            researchTitle: "Alokasi Dana Penelitian Batch 3 2025",
            documentId: "ALLOC-2025-003",
            status: "Menunggu",
            time: "3 hari yang lalu",
            isRead: true,
            actions: ["Validasi", "Minta Revisi"]
        },
        {
            id: "VRF-2025-0011",
            title: "Permintaan Verifikasi Bukti Pengeluaran",
            message: "Prof. Hendra Gunawan telah mengirimkan bukti pengeluaran untuk penelitian Bahan Bakar Alternatif.",
            type: "Bukti Pengeluaran",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            submittedDate: "11 Jun 2025",
            researchTitle: "Pengembangan Bahan Bakar Alternatif dari Mikroalga",
            documentId: "RPT-2025-0038",
            status: "Selesai",
            time: "4 hari yang lalu",
            isRead: true,
            actions: []
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

    const filteredRequests = verificationRequests.filter(request => {
        const matchesSearch =
            request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.researcher.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === "all" || request.type.toLowerCase().includes(filterType.toLowerCase());

        return matchesSearch && matchesType;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "Menunggu": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "Selesai": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Ditolak": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case "Laporan Dana":
                return <MdReceipt className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
            case "Bukti Pengeluaran":
                return <MdAttachFile className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
            case "Status TGR":
                return <MdCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
            case "Laporan Akhir":
                return <MdAssignment className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
            case "Alokasi Dana":
                return <MdVerified className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
            default:
                return <MdVerifiedUser className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
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
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Permintaan Verifikasi</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Notifikasi untuk verifikasi laporan dan dokumen keuangan
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <Card extra="p-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdVerifiedUser className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Permintaan</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {verificationStats.totalRequests}
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
                                {verificationStats.unreadRequests}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-red-100 dark:bg-red-900/30">
                            <MdCancel className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Menunggu Verifikasi</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {verificationStats.pendingVerification}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                            <MdCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sudah Diverifikasi</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {verificationStats.verifiedRequests}
                            </h4>
                        </div>
                    </div>
                </Card>
            </div>

            <Card extra="p-6" data-aos="fade-up" data-aos-delay="300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                        Permintaan Verifikasi
                    </h5>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-grow w-full md:w-64">
                                <input
                                    type="text"
                                    placeholder="Cari permintaan..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <select
                                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="all">Semua Tipe</option>
                                <option value="laporan">Laporan Dana</option>
                                <option value="bukti">Bukti Pengeluaran</option>
                                <option value="tgr">Status TGR</option>
                                <option value="akhir">Laporan Akhir</option>
                                <option value="alokasi">Alokasi Dana</option>
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
                    {filteredRequests.length > 0 ? (
                        filteredRequests.map((request, index) => (
                            <div
                                key={request.id}
                                className={`p-4 border-l-4 border-l-blue-500 rounded-lg ${!request.isRead ? 'bg-gray-50 dark:bg-navy-800' : 'bg-white dark:bg-navy-700'} transition-all`}
                                data-aos="fade-up"
                                data-aos-delay={100 + (index * 50)}
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <div className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
                                                    {getTypeIcon(request.type)}
                                                </div>
                                                <h6 className="font-medium text-navy-700 dark:text-white">
                                                    {request.title}
                                                    {!request.isRead && (
                                                        <span className="ml-2 w-2 h-2 inline-block rounded-full bg-brand-500"></span>
                                                    )}
                                                </h6>
                                            </div>
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                                                {request.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 ml-12 mb-3">
                                            {request.message}
                                        </p>

                                        <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Peneliti:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{request.researcher}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Fakultas:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{request.faculty}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Judul Penelitian:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{request.researchTitle}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">ID Dokumen:</span>
                                                <Link to={`/bendahara/report-verification/detail/${request.documentId}`} className="text-sm font-medium text-brand-500 hover:underline">
                                                    {request.documentId}
                                                </Link>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Jenis Dokumen:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{request.type}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Tanggal Pengajuan:</span>
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{request.submittedDate}</span>
                                            </div>
                                        </div>

                                        <div className="mt-3 ml-12 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{request.time}</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                {/* Action buttons */}
                                                <div className="flex gap-2">
                                                    {request.actions.map((action, idx) => (
                                                        <button
                                                            key={idx}
                                                            className={`px-3 py-1 text-xs font-medium rounded ${action === "Verifikasi" || action === "Validasi"
                                                                    ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
                                                                    : action === "Tolak"
                                                                        ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                                                                        : "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                                                                }`}
                                                        >
                                                            {action}
                                                        </button>
                                                    ))}
                                                </div>
                                                {!request.isRead && (
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
                            <MdVerifiedUser className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                            <p className="text-lg font-medium">Tidak ada permintaan verifikasi</p>
                            <p className="text-sm">Tidak ada permintaan verifikasi yang sesuai dengan kriteria pencarian.</p>
                        </div>
                    )}
                </div>

                {filteredRequests.length > 5 && (
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

export default VerificationRequests;
