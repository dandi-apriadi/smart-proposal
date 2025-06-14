import React, { useState, useEffect } from "react";
import {
    MdSearch, MdFilterList, MdVisibility, MdCheck, MdClose, MdRefresh,
    MdBarChart, MdInsights, MdTrendingUp, MdWarning, MdOutlineAssessment,
    MdEqualizer, MdOutlineRateReview, MdOutlineDocumentScanner
} from "react-icons/md";
import { FiCornerUpRight, FiPieChart, FiAlertTriangle, FiClock, FiThumbsUp } from "react-icons/fi";
import Card from "components/card";
import AOS from "aos";
import "aos/dist/aos.css";

const ProposalAnalysis = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
        });
    }, []);

    // Sample data - replace with actual API call
    const [proposals, setProposals] = useState([
        {
            id: 1,
            title: "Pengadaan Peralatan Laboratorium Komputer",
            submitter: "Jurusan Teknik Informatika",
            date: "2025-04-15",
            status: "pending",
            priority: "high",
            mlScore: 87,
            details: {
                budget: "Rp 250.000.000",
                completeness: 92,
                format: 95,
                budgetValidity: 83
            }
        },
        {
            id: 2,
            title: "Seminar Teknologi AI untuk Mahasiswa",
            submitter: "Himpunan Mahasiswa TI",
            date: "2025-04-12",
            status: "validated",
            priority: "medium",
            mlScore: 92,
            details: {
                budget: "Rp 75.000.000",
                completeness: 97,
                format: 89,
                budgetValidity: 94
            }
        },
        {
            id: 3,
            title: "Workshop Data Science & Machine Learning",
            submitter: "P3M",
            date: "2025-04-10",
            status: "rejected",
            priority: "low",
            mlScore: 65,
            details: {
                budget: "Rp 120.000.000",
                completeness: 68,
                format: 72,
                budgetValidity: 59
            }
        },
        {
            id: 4,
            title: "Pengadaan Software Lisensi untuk Fakultas",
            submitter: "BAUK",
            date: "2025-04-08",
            status: "pending",
            priority: "high",
            mlScore: 78,
            details: {
                budget: "Rp 350.000.000",
                completeness: 81,
                format: 74,
                budgetValidity: 76
            }
        },
        {
            id: 5,
            title: "Pelatihan Dosen dalam Pengembangan Kurikulum",
            submitter: "P3M",
            date: "2025-04-05",
            status: "pending",
            priority: "medium",
            mlScore: 83,
            details: {
                budget: "Rp 95.000.000",
                completeness: 85,
                format: 88,
                budgetValidity: 79
            }
        },
        {
            id: 6,
            title: "Pembangunan Laboratorium IoT",
            submitter: "Teknik Elektro",
            date: "2025-04-18",
            status: "pending",
            priority: "high",
            mlScore: 91,
            details: {
                budget: "Rp 385.000.000",
                completeness: 93,
                format: 90,
                budgetValidity: 88
            }
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeProposal, setActiveProposal] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const filteredProposals = proposals.filter(proposal => {
        const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proposal.submitter.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || proposal.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const refreshData = () => {
        setIsRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'validated': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getMlScoreColor = (score) => {
        if (score >= 90) return 'text-green-500';
        if (score >= 75) return 'text-blue-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    const openDetails = (proposal) => {
        setActiveProposal(proposal);
        setShowDetails(true);
    };

    return (
        <div className="min-h-screen pt-4 pb-8 bg-gradient-to-b from-blue-50 to-white dark:from-navy-900 dark:to-navy-800" data-aos="fade-up">
            {/* Modern Header with Gradient */}
            <div className="relative mb-8 overflow-hidden">
                {/* Abstract background elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute top-10 right-20 w-20 h-20 bg-indigo-500/10 rounded-full blur-lg"></div>
                <div className="absolute -bottom-8 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>

                <div className="relative z-10">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 inline-block">
                        Analisis Proposal
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">
                        Sistem analisis cerdas berbasis Machine Learning untuk validasi proposal dengan tingkat akurasi tinggi
                    </p>

                    <div className="mt-6 flex items-center space-x-3">
                        <div className="flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800/60 dark:text-blue-300">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>
                            ML Engine aktif
                        </div>
                        <div className="flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-800/60 dark:text-green-300">
                            <MdOutlineAssessment className="mr-1.5" />
                            6 proposal dianalisis
                        </div>
                    </div>
                </div>
            </div>

            {/* ML Analysis Dashboard */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[
                    {
                        title: "Akurasi ML",
                        value: "95.8%",
                        icon: <MdTrendingUp />,
                        color: "green",
                        subtext: "2.1% lebih tinggi dari sebelumnya"
                    },
                    {
                        title: "Format Valid",
                        value: "87.5%",
                        icon: <MdOutlineDocumentScanner />,
                        color: "blue",
                        subtext: "Rata-rata proposal"
                    },
                    {
                        title: "Tingkat Keberhasilan",
                        value: "78.3%",
                        icon: <FiPieChart />,
                        color: "indigo",
                        subtext: "Proposals diterima"
                    },
                    {
                        title: "Waktu Analisis",
                        value: "1.2 detik",
                        icon: <FiClock />,
                        color: "purple",
                        subtext: "Per proposal"
                    }
                ].map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-navy-800 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 group overflow-hidden"
                        data-aos="fade-up"
                        data-aos-delay={100 + index * 50}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.title}</p>
                                    <h3 className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">{stat.value}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.subtext}</p>
                                </div>
                                <div
                                    className={`bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400 rounded-xl p-3.5 group-hover:scale-110 transition-transform`}
                                >
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="w-full h-1 bg-gray-100 dark:bg-navy-700 rounded-full mt-4 overflow-hidden">
                                <div
                                    className={`h-full bg-${stat.color}-500 dark:bg-${stat.color}-400 rounded-full`}
                                    style={{
                                        width:
                                            index === 0
                                                ? "95.8%"
                                                : index === 1
                                                    ? "87.5%"
                                                    : index === 2
                                                        ? "78.3%"
                                                        : "92%"
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Analysis Detail Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div
                    className="bg-white dark:bg-navy-800 rounded-2xl shadow-md border border-gray-100 dark:border-navy-700 p-6"
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                    <div className="flex items-center mb-5">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-xl text-blue-600 dark:text-blue-400">
                            <MdOutlineRateReview className="h-6 w-6" />
                        </div>
                        <h3 className="ml-3 text-lg font-bold text-gray-800 dark:text-white">Analisis Format Dokumen</h3>
                    </div>

                    <div className="space-y-5">
                        {[
                            { label: "Struktur Proposal", score: 92 },
                            { label: "Kelengkapan Dokumen", score: 88 },
                            { label: "Kesesuaian Format", score: 95 },
                            { label: "Validasi Anggaran", score: 89 }
                        ].map((item, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <FiCornerUpRight className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 mr-2" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="bg-gray-100 dark:bg-navy-700 px-2 py-1 rounded text-xs font-semibold text-gray-800 dark:text-white">
                                            {item.score}/100
                                        </div>
                                        <div
                                            className={`w-2 h-2 rounded-full ${item.score >= 90 ? 'bg-green-500' : item.score >= 80 ? 'bg-blue-500' : 'bg-yellow-500'
                                                }`}
                                        ></div>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${item.score >= 90 ? 'bg-green-500' : item.score >= 80 ? 'bg-blue-500' : 'bg-yellow-500'
                                            }`}
                                        style={{ width: `${item.score}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="bg-white dark:bg-navy-800 rounded-2xl shadow-md border border-gray-100 dark:border-navy-700 p-6"
                    data-aos="fade-left"
                    data-aos-delay="100"
                >
                    <div className="flex items-center mb-5">
                        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2.5 rounded-xl text-indigo-600 dark:text-indigo-400">
                            <MdInsights className="h-6 w-6" />
                        </div>
                        <h3 className="ml-3 text-lg font-bold text-gray-800 dark:text-white">Insight Machine Learning</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                title: "Rekomendasi Sistem",
                                message:
                                    "Proposal memenuhi 92% kriteria standar dan dapat dilanjutkan ke tahap evaluasi berikutnya tanpa revisi mayor.",
                                type: "success",
                                icon: <FiThumbsUp className="h-5 w-5" />
                            },
                            {
                                title: "Potensi Masalah Terdeteksi",
                                message:
                                    "Bagian anggaran memerlukan detail tambahan dan beberapa justifikasi biaya kurang spesifik.",
                                type: "warning",
                                icon: <FiAlertTriangle className="h-5 w-5" />
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-xl border ${item.type === 'success'
                                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900/40'
                                    : 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900/40'
                                    }`}
                            >
                                <div className="flex items-start">
                                    <div
                                        className={`rounded-lg p-2.5 ${item.type === 'success'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
                                            }`}
                                    >
                                        {item.icon}
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="font-medium text-gray-800 dark:text-white">{item.title}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/40 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium text-gray-800 dark:text-white">Rekomendasi Tindakan</h4>
                                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">AI Generated</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <MdCheck className="text-green-500 mr-2" />
                                    <p>Lanjutkan ke tahap review komite</p>
                                </div>
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <MdCheck className="text-green-500 mr-2" />
                                    <p>Minta tambahan detail anggaran sebelum persetujuan final</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Search and Filter with Glassmorphism */}
            <div
                className="backdrop-blur-md bg-white/70 dark:bg-navy-800/70 rounded-2xl shadow-lg mb-6 border border-gray-100 dark:border-navy-700 p-6"
                data-aos="fade-up"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Cari proposal berdasarkan judul atau pengaju..."
                            className="pl-12 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white/50 dark:bg-navy-700/50 dark:border-navy-600 dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute left-4 top-3">
                            <MdSearch className="h-6 w-6 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            className="rounded-xl border border-gray-200 py-3 px-4 bg-white/50 dark:bg-navy-700/50 dark:border-navy-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:text-gray-300"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Semua Status</option>
                            <option value="pending">Pending</option>
                            <option value="validated">Tervalidasi</option>
                            <option value="rejected">Ditolak</option>
                        </select>

                        <button
                            onClick={refreshData}
                            className={`p-3 rounded-xl transition-all ${isRefreshing ? 'bg-gray-200 dark:bg-navy-700 text-gray-500 dark:text-gray-400' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'}`}
                            disabled={isRefreshing}
                        >
                            <MdRefresh className={`h-6 w-6 ${isRefreshing ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Proposal List with ML Scores - Enhanced Design */}
            <div className="space-y-5">
                {filteredProposals.length === 0 ? (
                    <div
                        className="bg-white dark:bg-navy-800 rounded-2xl shadow-md border border-gray-100 dark:border-navy-700 p-10 text-center"
                        data-aos="fade-up"
                    >
                        <div className="w-20 h-20 bg-gray-100 dark:bg-navy-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MdFilterList className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Tidak ada proposal yang ditemukan</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Coba sesuaikan filter pencarian Anda atau tambahkan proposal baru
                        </p>
                        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    filteredProposals.map((proposal, index) => (
                        <div
                            key={proposal.id}
                            className="bg-white dark:bg-navy-800 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 overflow-hidden cursor-pointer group"
                            data-aos="fade-up"
                            data-aos-delay={100 + (index * 50)}
                            onClick={() => openDetails(proposal)}
                        >
                            <div className="relative">
                                <div className={`absolute left-0 top-0 h-full w-1.5 ${proposal.priority === "high" ? "bg-red-500" :
                                    proposal.priority === "medium" ? "bg-yellow-500" :
                                        "bg-blue-500"
                                    }`}></div>

                                <div className="p-6 pl-8">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex-grow">
                                            <div className="flex items-center flex-wrap gap-2 mb-2">
                                                <h3 className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{proposal.title}</h3>
                                                <span className={`text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1 ${proposal.status === "validated" ?
                                                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900/50' :
                                                    proposal.status === "rejected" ?
                                                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900/50' :
                                                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/50'
                                                    }`}>
                                                    {proposal.status === "pending" ? <FiClock className="mr-1" /> :
                                                        proposal.status === "validated" ? <MdCheck className="mr-1" /> :
                                                            <MdClose className="mr-1" />}
                                                    {proposal.status === "pending" ? "Pending" :
                                                        proposal.status === "validated" ? "Tervalidasi" : "Ditolak"}
                                                </span>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 dark:text-gray-400 mb-4 gap-y-1 gap-x-6">
                                                <div className="flex items-center">
                                                    <MdOutlineAssessment className="mr-1.5 text-gray-500" />
                                                    <p>Pengaju: <span className="font-medium text-gray-700 dark:text-gray-300">{proposal.submitter}</span></p>
                                                </div>
                                                <div className="flex items-center">
                                                    <MdFilterList className="mr-1.5 text-gray-500" />
                                                    <p>Anggaran: <span className="font-medium text-gray-700 dark:text-gray-300">{proposal.details.budget}</span></p>
                                                </div>
                                                <div className="flex items-center">
                                                    <FiClock className="mr-1.5 text-gray-500" />
                                                    <p>Tanggal: {new Date(proposal.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <div className="flex flex-col mr-6">
                                                    <div className="flex items-center mb-1">
                                                        <span className="font-medium mr-2 text-sm text-gray-700 dark:text-gray-300">Skor ML:</span>
                                                        <span className={`font-bold text-lg ${proposal.mlScore >= 90 ? 'text-green-600 dark:text-green-400' :
                                                            proposal.mlScore >= 75 ? 'text-blue-600 dark:text-blue-400' :
                                                                proposal.mlScore >= 65 ? 'text-yellow-600 dark:text-yellow-400' :
                                                                    'text-red-600 dark:text-red-400'
                                                            }`}>
                                                            {proposal.mlScore}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full ${proposal.mlScore >= 90 ? 'bg-green-500' :
                                                                proposal.mlScore >= 75 ? 'bg-blue-500' :
                                                                    proposal.mlScore >= 65 ? 'bg-yellow-500' :
                                                                        'bg-red-500'
                                                                }`}
                                                            style={{ width: `${proposal.mlScore}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div className="ml-auto mt-2 lg:mt-0 flex flex-wrap gap-2">
                                                    <button
                                                        className="px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-1.5 shadow-sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openDetails(proposal);
                                                        }}
                                                    >
                                                        <MdVisibility className="text-lg" />
                                                        <span>Detail</span>
                                                    </button>
                                                    {proposal.status === "pending" && (
                                                        <>
                                                            <button
                                                                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center gap-1.5 shadow-sm"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <MdCheck className="text-lg" />
                                                                <span>Validasi</span>
                                                            </button>
                                                            <button
                                                                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors flex items-center gap-1.5 shadow-sm"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <MdClose className="text-lg" />
                                                                <span>Tolak</span>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Proposal Detail Modal */}
            {showDetails && activeProposal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div
                        className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                        data-aos="zoom-in"
                        data-aos-duration="300"
                    >
                        <div className="sticky top-0 bg-white dark:bg-navy-800 z-10 flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-navy-700">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Detail Proposal</h3>
                            <button
                                onClick={() => setShowDetails(false)}
                                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6">
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${activeProposal.priority === "high" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                                activeProposal.priority === "medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                } mb-4`}>
                                {activeProposal.priority === "high" ? "Prioritas Tinggi" :
                                    activeProposal.priority === "medium" ? "Prioritas Sedang" :
                                        "Prioritas Rendah"}
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {activeProposal.title}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Detail Proposal</h4>
                                        <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4 space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-300">Pengaju:</span>
                                                <span className="font-medium text-gray-900 dark:text-white">{activeProposal.submitter}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-300">Tanggal:</span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {new Date(activeProposal.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-300">Status:</span>
                                                <span className={`font-medium ${activeProposal.status === "validated" ? "text-green-600 dark:text-green-400" :
                                                    activeProposal.status === "rejected" ? "text-red-600 dark:text-red-400" :
                                                        "text-yellow-600 dark:text-yellow-400"
                                                    }`}>
                                                    {activeProposal.status === "pending" ? "Pending" :
                                                        activeProposal.status === "validated" ? "Tervalidasi" : "Ditolak"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-300">Anggaran:</span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {activeProposal.details.budget}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">ML Analysis</h4>
                                        <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4">
                                            <div className="flex items-center mb-6">
                                                <div className="mr-4">
                                                    <div className={`rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl ${activeProposal.mlScore >= 90 ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                                                        activeProposal.mlScore >= 75 ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                                                            activeProposal.mlScore >= 65 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                                'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                                        }`}>
                                                        {activeProposal.mlScore}%
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="font-semibold text-gray-900 dark:text-white">ML Confidence Score</h5>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        {activeProposal.mlScore >= 90 ? 'Sangat Baik' :
                                                            activeProposal.mlScore >= 75 ? 'Baik' :
                                                                activeProposal.mlScore >= 65 ? 'Cukup' :
                                                                    'Perlu Peninjauan'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-gray-600 dark:text-gray-300">Kelengkapan Dokumen</span>
                                                        <span className="font-medium text-gray-900 dark:text-white">{activeProposal.details.completeness}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-500 h-2 rounded-full"
                                                            style={{ width: `${activeProposal.details.completeness}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-gray-600 dark:text-gray-300">Format Proposal</span>
                                                        <span className="font-medium text-gray-900 dark:text-white">{activeProposal.details.format}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                                                        <div
                                                            className="bg-indigo-500 h-2 rounded-full"
                                                            style={{ width: `${activeProposal.details.format}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-gray-600 dark:text-gray-300">Validitas Anggaran</span>
                                                        <span className="font-medium text-gray-900 dark:text-white">{activeProposal.details.budgetValidity}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                                                        <div
                                                            className="bg-purple-500 h-2 rounded-full"
                                                            style={{ width: `${activeProposal.details.budgetValidity}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Rekomendasi Sistem</h4>
                                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/40 rounded-xl p-5">
                                            <p className="text-gray-800 dark:text-gray-200 mb-4">
                                                Berdasarkan analisis ML, proposal ini {activeProposal.mlScore >= 75 ? 'direkomendasikan untuk disetujui' : 'perlu peninjauan lebih lanjut'} dengan beberapa catatan berikut:
                                            </p>
                                            <div className="space-y-2">
                                                {activeProposal.mlScore >= 75 ? (
                                                    <>
                                                        <div className="flex items-start">
                                                            <MdCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                                            <p className="text-sm text-gray-600 dark:text-gray-300">Format dan struktur proposal sudah sesuai standar</p>
                                                        </div>
                                                        <div className="flex items-start">
                                                            <MdCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                                            <p className="text-sm text-gray-600 dark:text-gray-300">Anggaran dan estimasi biaya dinilai rasional</p>
                                                        </div>
                                                        <div className="flex items-start">
                                                            <FiAlertTriangle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                                                            <p className="text-sm text-gray-600 dark:text-gray-300">Beberapa detail teknis masih memerlukan klarifikasi</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex items-start">
                                                            <FiAlertTriangle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                                                            <p className="text-sm text-gray-600 dark:text-gray-300">Format proposal belum sesuai standar yang ditetapkan</p>
                                                        </div>
                                                        <div className="flex items-start">
                                                            <FiAlertTriangle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                                                            <p className="text-sm text-gray-600 dark:text-gray-300">Anggaran belum dilengkapi dengan rincian yang memadai</p>
                                                        </div>
                                                        <div className="flex items-start">
                                                            <MdClose className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                                                            <p className="text-sm text-gray-600 dark:text-gray-300">Beberapa dokumen pendukung belum tersedia</p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tindakan</h4>
                                        <div className="flex flex-col gap-3">
                                            <button className="w-full py-2.5 flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors shadow-sm">
                                                <MdVisibility className="text-lg" />
                                                <span>Lihat Dokumen Lengkap</span>
                                            </button>

                                            {activeProposal.status === "pending" && (
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button className="py-2.5 flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors shadow-sm">
                                                        <MdCheck className="text-lg" />
                                                        <span>Validasi</span>
                                                    </button>
                                                    <button className="py-2.5 flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors shadow-sm">
                                                        <MdClose className="text-lg" />
                                                        <span>Tolak</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProposalAnalysis;
