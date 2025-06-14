import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdFactCheck,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdFileDownload,
    MdArrowBack,
    MdCheckCircle,
    MdHourglassEmpty,
    MdWarning,
    MdVisibility,
    MdThumbUp,
    MdThumbDown,
    MdPerson,
    MdVerified,
    MdCancel,
    MdHistory,
    MdAssignmentTurnedIn,
    MdOutlineAssignmentLate,
    MdCalendarToday,
    MdOutlineFilterAlt,
    MdKeyboardArrowDown,
    MdDashboard,
    MdInsertChart,
    MdOutlineVerified
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import Chart from 'react-apexcharts';

const TgrStatusVerification = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState("all");

    // Dummy data for TGR status verification
    const verificationStats = {
        totalRequests: 24,
        verifiedStatus: 16,
        pendingVerification: 6,
        rejectedRequests: 2
    };

    const tgrStatusRequests = [
        {
            id: "TGR-VRF-024",
            proposalId: "PRP-2025-042",
            requestType: "Verifikasi Bebas TGR",
            researcher: "Dr. Budi Santoso",
            faculty: "Fakultas Teknik",
            nip: "198507252010121002",
            submissionDate: "10 Jun 2025",
            researchTitle: "Pengembangan Machine Learning untuk Deteksi Penyakit Tanaman",
            status: "Menunggu Verifikasi",
            previousTGR: "Tidak Ada",
            notes: "Memerlukan verifikasi untuk pencairan dana penelitian baru"
        },
        {
            id: "TGR-VRF-023",
            proposalId: "PRP-2025-039",
            requestType: "Verifikasi Bebas TGR",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            nip: "197605142008012007",
            submissionDate: "08 Jun 2025",
            researchTitle: "Analisis Big Data untuk Prediksi Perilaku Konsumen",
            status: "Terverifikasi",
            previousTGR: "Tidak Ada",
            notes: "Status bebas TGR telah diverifikasi"
        },
        {
            id: "TGR-VRF-022",
            proposalId: "PRP-2025-036",
            requestType: "Verifikasi Bebas TGR",
            researcher: "Dr. Andi Wijaya",
            faculty: "Fakultas Psikologi",
            nip: "198202182015041001",
            submissionDate: "05 Jun 2025",
            researchTitle: "Efektivitas Metode Pembelajaran Jarak Jauh pada Mahasiswa",
            status: "Ditolak",
            previousTGR: "Ada",
            notes: "Terdapat kasus TGR yang belum diselesaikan dari penelitian tahun 2023",
            rejectionReason: "Masih memiliki tanggungan TGR penelitian sebelumnya"
        },
        {
            id: "TGR-VRF-021",
            proposalId: "PRP-2025-035",
            requestType: "Verifikasi Bebas TGR",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            nip: "198903102012122003",
            submissionDate: "03 Jun 2025",
            researchTitle: "Sistem Monitoring Kualitas Air Berbasis IoT",
            status: "Menunggu Verifikasi",
            previousTGR: "Ada - Diselesaikan",
            notes: "Telah menyelesaikan TGR sebelumnya, menunggu konfirmasi"
        },
        {
            id: "TGR-VRF-020",
            proposalId: "PRP-2025-032",
            requestType: "Verifikasi Bebas TGR",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            nip: "196504121992031002",
            submissionDate: "01 Jun 2025",
            researchTitle: "Pengembangan Bahan Bakar Alternatif dari Mikroalga",
            status: "Terverifikasi",
            previousTGR: "Tidak Ada",
            notes: "Status bebas TGR sudah dikonfirmasi"
        },
        {
            id: "TGR-VRF-019",
            proposalId: "PRP-2025-030",
            requestType: "Verifikasi Bebas TGR",
            researcher: "Dr. Siti Rahayu",
            faculty: "Fakultas Ekonomi",
            nip: "197709232005012001",
            submissionDate: "28 Mei 2025",
            researchTitle: "Pengaruh Media Sosial terhadap Perilaku Konsumen",
            status: "Ditolak",
            previousTGR: "Ada",
            notes: "Masih memiliki tanggungan TGR yang belum diselesaikan",
            rejectionReason: "Terdapat berkas laporan keuangan yang belum lengkap pada penelitian sebelumnya"
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

    const filteredRequests = tgrStatusRequests.filter(request => {
        const matchesSearch =
            request.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.researchTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.proposalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.nip.includes(searchTerm);

        const matchesStatus = filterStatus === "all" || request.status.toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "terverifikasi": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "menunggu verifikasi": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "ditolak": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getPreviousTgrColor = (status) => {
        if (status === "Tidak Ada") return "text-green-600 dark:text-green-400";
        if (status === "Ada - Diselesaikan") return "text-blue-600 dark:text-blue-400";
        return "text-red-600 dark:text-red-400";
    };

    // Update chart options for white background with blue accents
    const tgrStatusOptions = {
        chart: {
            type: 'donut',
            fontFamily: 'inherit',
            foreColor: '#1e40af', // Darker blue text
            toolbar: {
                show: false
            },
            background: '#ffffff' // White background
        },
        colors: ['#3b82f6', '#f59e0b', '#ef4444'], // Blue for "Bebas TGR" instead of green
        labels: ['Bebas TGR', 'Kasus TGR', 'TGR Bermasalah'],
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#1e40af'
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#1e40af'
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#1e40af'
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        }
    };

    const tgrStatusSeries = [85, 12, 3];

    return (
        <div className="pt-8 px-2">
            {/* Hero Section with white background and blue accents */}
            <div className="relative mb-10 bg-white rounded-3xl p-8 text-gray-800 overflow-hidden border border-blue-100 shadow-sm" data-aos="fade-up">
                {/* Blue patterns in the background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full opacity-70 -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-full opacity-70 -ml-10 -mb-10"></div>
                <div className="absolute right-1/4 bottom-0 w-16 h-16 bg-blue-100 rounded-full opacity-50"></div>
                <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-200 rounded-full opacity-30"></div>

                {/* Dotted pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full" style={{
                        backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}></div>
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-6 lg:mb-0 lg:max-w-2xl">
                        <div className="flex items-center mb-4">
                            <Link to="/bendahara/report-verification" className="mr-4 p-2.5 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
                                <MdArrowBack className="h-5 w-5 text-blue-600" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Status Bebas TGR</h1>
                                <div className="h-1 w-20 bg-blue-400 mt-2 rounded-full"></div>
                            </div>
                        </div>
                        <p className="text-lg text-gray-600 mb-6 border-l-4 border-blue-400 pl-3">
                            Verifikasi status bebas TGR (Tuntutan Ganti Rugi) dari peneliti untuk memastikan kesesuaian administrasi keuangan
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white rounded-2xl py-3.5 px-5 shadow-sm border border-blue-100 hover:border-blue-200 transition-all">
                                <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">Total Permintaan</p>
                                <div className="flex items-center mt-1 gap-2">
                                    <MdOutlineVerified className="h-6 w-6 text-blue-500" />
                                    <p className="text-2xl font-bold text-gray-800">{verificationStats.totalRequests}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl py-3.5 px-5 shadow-sm border border-blue-100 hover:border-blue-200 transition-all">
                                <p className="text-sm font-medium text-green-600 uppercase tracking-wide">Terverifikasi</p>
                                <div className="flex items-center mt-1 gap-2">
                                    <MdCheckCircle className="h-6 w-6 text-green-500" />
                                    <p className="text-2xl font-bold text-gray-800">{verificationStats.verifiedStatus}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl py-3.5 px-5 shadow-sm border border-blue-100 hover:border-blue-200 transition-all">
                                <p className="text-sm font-medium text-amber-600 uppercase tracking-wide">Menunggu Verifikasi</p>
                                <div className="flex items-center mt-1 gap-2">
                                    <MdHourglassEmpty className="h-6 w-6 text-amber-500" />
                                    <p className="text-2xl font-bold text-gray-800">{verificationStats.pendingVerification}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 lg:max-w-xs shadow-sm border border-blue-100">
                        <h3 className="text-center text-lg font-semibold mb-4 text-gray-800">Statistik TGR</h3>
                        <Chart
                            options={tgrStatusOptions}
                            series={tgrStatusSeries}
                            type="donut"
                            height={220}
                        />
                        <div className="grid grid-cols-3 gap-2 mt-4 bg-blue-50 rounded-lg p-3">
                            <div className="flex flex-col items-center bg-white rounded-md p-2 border border-blue-50">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                    <span className="text-xs font-medium text-gray-700">Bebas TGR</span>
                                </div>
                                <p className="font-semibold text-gray-800 mt-1">85%</p>
                            </div>
                            <div className="flex flex-col items-center bg-white rounded-md p-2 border border-blue-50">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                    <span className="text-xs font-medium text-gray-700">Kasus TGR</span>
                                </div>
                                <p className="font-semibold text-gray-800 mt-1">12%</p>
                            </div>
                            <div className="flex flex-col items-center bg-white rounded-md p-2 border border-blue-50">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <span className="text-xs font-medium text-gray-700">Bermasalah</span>
                                </div>
                                <p className="font-semibold text-gray-800 mt-1">3%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex mb-6 border-b border-gray-200 dark:border-navy-700" data-aos="fade-up">
                <button
                    className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${selectedTab === 'all'
                        ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                    onClick={() => setSelectedTab('all')}
                >
                    <MdDashboard className={`h-4 w-4 ${selectedTab === 'all' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
                    Semua Permintaan
                </button>
                <button
                    className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${selectedTab === 'pending'
                        ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                    onClick={() => setSelectedTab('pending')}
                >
                    <MdHourglassEmpty className={`h-4 w-4 ${selectedTab === 'pending' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
                    Menunggu Verifikasi
                </button>
                <button
                    className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${selectedTab === 'completed'
                        ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                    onClick={() => setSelectedTab('completed')}
                >
                    <MdCheckCircle className={`h-4 w-4 ${selectedTab === 'completed' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
                    Terverifikasi
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mb-5">
                <Card extra="p-6 lg:w-2/3 border border-gray-100 dark:border-navy-700 shadow-sm" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center gap-2">
                            <MdFactCheck className="h-5 w-5 text-blue-600" />
                            Daftar Permintaan Verifikasi Bebas TGR
                        </h5>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MdSearch className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari peneliti/NIP..."
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MdOutlineFilterAlt className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        className="appearance-none pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="all">Semua Status</option>
                                        <option value="terverifikasi">Terverifikasi</option>
                                        <option value="menunggu verifikasi">Menunggu Verifikasi</option>
                                        <option value="ditolak">Ditolak</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <MdKeyboardArrowDown className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleRefresh}
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors"
                                    title="Refresh data"
                                >
                                    <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                                </button>
                                <button
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors"
                                    title="Download data"
                                >
                                    <MdFileDownload className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-navy-700">
                        <table className="w-full min-w-[800px] table-auto">
                            <thead className="bg-gray-50 dark:bg-navy-800">
                                <tr>
                                    <th className="px-4 py-3 text-start rounded-tl-lg text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Peneliti
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Fakultas/NIP
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Riwayat TGR
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Judul Penelitian
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300 rounded-tr-lg">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.length > 0 ? (
                                    filteredRequests.map((request, index) => (
                                        <tr key={index} className="border-t border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
                                            <td className="px-4 py-3.5 text-sm font-medium text-navy-700 dark:text-white">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                                                        <MdPerson className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        {request.researcher}
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                            {request.id} • {request.proposalId}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400">
                                                <div className="font-medium">{request.faculty}</div>
                                                <div className="text-xs bg-gray-100 dark:bg-navy-700 px-2 py-1 rounded-full inline-block mt-1">NIP: {request.nip}</div>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm">
                                                <div className={`font-medium ${getPreviousTgrColor(request.previousTGR)}`}>
                                                    {request.previousTGR}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                                                    <MdCalendarToday className="h-3.5 w-3.5 mr-1" />
                                                    {request.submissionDate}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 max-w-[200px]">
                                                <div className="line-clamp-2" title={request.researchTitle}>
                                                    {request.researchTitle}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center w-fit gap-1 ${getStatusColor(request.status)}`}>
                                                    {request.status === "Terverifikasi" && <MdCheckCircle className="h-3.5 w-3.5" />}
                                                    {request.status === "Menunggu Verifikasi" && <MdHourglassEmpty className="h-3.5 w-3.5" />}
                                                    {request.status === "Ditolak" && <MdWarning className="h-3.5 w-3.5" />}
                                                    {request.status}
                                                </span>
                                                {request.rejectionReason && (
                                                    <div className="mt-1.5 text-xs text-red-500 dark:text-red-400 line-clamp-1">
                                                        "{request.rejectionReason}"
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3.5 text-sm">
                                                <div className="flex space-x-2">
                                                    <Link to={`/bendahara/tgr-management/tgr-clearance-process/${request.id}`}>
                                                        <button className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                                            <MdVisibility size={18} />
                                                        </button>
                                                    </Link>
                                                    {request.status === "Menunggu Verifikasi" && (
                                                        <>
                                                            <button className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors" title="Setujui">
                                                                <MdThumbUp size={18} />
                                                            </button>
                                                            <button className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors" title="Tolak">
                                                                <MdThumbDown size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button className="p-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-800 transition-colors" title="Riwayat Verifikasi">
                                                        <MdHistory size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center">
                                                <div className="p-3 rounded-full bg-gray-100 dark:bg-navy-700 mb-2">
                                                    <MdSearch className="h-6 w-6 text-gray-400" />
                                                </div>
                                                Tidak ada permintaan yang sesuai dengan kriteria pencarian
                                                <button
                                                    onClick={() => {
                                                        setSearchTerm("");
                                                        setFilterStatus("all");
                                                    }}
                                                    className="mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm font-medium"
                                                >
                                                    Reset Filter
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filteredRequests.length > 0 && (
                        <div className="mt-5 flex flex-wrap items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-4">
                            <div>
                                Menampilkan {filteredRequests.length} dari {tgrStatusRequests.length} permintaan
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                    &lt;
                                </button>
                                <span className="px-2">Halaman 1 dari 1</span>
                                <button className="p-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                    &gt;
                                </button>
                            </div>
                        </div>
                    )}
                </Card>

                <Card extra="p-6 lg:w-1/3 border border-gray-100 dark:border-navy-700 shadow-sm" data-aos="fade-up" data-aos-delay="350">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center gap-2">
                            <MdInsertChart className="h-5 w-5 text-blue-600" />
                            Panduan Verifikasi
                        </h5>
                    </div>

                    <div className="mb-6 space-y-4">
                        <div className="p-4 border border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <MdFactCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h6 className="text-sm font-medium text-blue-800 dark:text-blue-400">
                                    Status Bebas TGR
                                </h6>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Status bebas TGR diperlukan sebelum peneliti dapat mengajukan proposal penelitian baru. Verifikasi dengan teliti riwayat TGR peneliti.
                            </p>
                        </div>

                        <div className="p-4 border border-green-100 dark:border-green-900/30 bg-green-50 dark:bg-green-900/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <MdVerified className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <h6 className="text-sm font-medium text-green-800 dark:text-green-400">
                                    Verifikasi Positif
                                </h6>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Berikan verifikasi positif jika peneliti tidak memiliki kewajiban TGR yang belum diselesaikan dari penelitian sebelumnya.
                            </p>
                        </div>

                        <div className="p-4 border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                    <MdCancel className="h-5 w-5 text-red-600 dark:text-red-400" />
                                </div>
                                <h6 className="text-sm font-medium text-red-800 dark:text-red-400">
                                    Verifikasi Negatif
                                </h6>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Jika peneliti masih memiliki tanggungan TGR yang belum diselesaikan, tolak verifikasi dan berikan alasan yang jelas.
                            </p>
                        </div>

                        <div className="p-4 border border-amber-100 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-900/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                    <MdAssignmentTurnedIn className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <h6 className="text-sm font-medium text-amber-800 dark:text-amber-400">
                                    Dokumen yang Diperiksa
                                </h6>
                            </div>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 pl-5 list-disc space-y-1.5">
                                <li>Laporan keuangan penelitian sebelumnya</li>
                                <li>Status TGR pada sistem keuangan</li>
                                <li>Riwayat penyelesaian TGR (jika ada)</li>
                                <li>Rekam jejak pengelolaan anggaran penelitian</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-navy-700 pt-4">
                        <div className="flex items-center justify-between mb-3">
                            <h6 className="text-base font-medium text-navy-700 dark:text-white flex items-center gap-1.5">
                                <MdOutlineVerified className="h-4 w-4 text-blue-600" />
                                Statistik TGR (2023-2025)
                            </h6>
                            <select className="px-2.5 py-1 text-xs rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white">
                                <option>2023-2025</option>
                                <option>2020-2022</option>
                            </select>
                        </div>
                        <div className="space-y-4 mt-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Peneliti Bebas TGR</span>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">85% dari total peneliti</div>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-green-600 dark:text-green-400 mr-3">85%</span>
                                    <div className="w-24 h-2.5 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full" style={{ width: "85%" }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dengan Kasus TGR</span>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">12% dalam proses</div>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-amber-600 dark:text-amber-400 mr-3">12%</span>
                                    <div className="w-24 h-2.5 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                                        <div className="bg-amber-500 h-full" style={{ width: "12%" }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Kasus TGR Bermasalah</span>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">3% memerlukan tindakan</div>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-red-600 dark:text-red-400 mr-3">3%</span>
                                    <div className="w-24 h-2.5 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                                        <div className="bg-red-500 h-full" style={{ width: "3%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <Link to="/bendahara/tgr-management/tgr-statistics" className="block w-full py-2.5 px-4 text-center bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-medium transition-all">
                                Lihat Statistik Lengkap
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TgrStatusVerification;
