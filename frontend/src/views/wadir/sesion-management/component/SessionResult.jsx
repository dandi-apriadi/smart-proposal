import React, { useState, useEffect } from 'react';
import {
    MdBarChart,
    MdCheckCircle,
    MdCancel,
    MdPendingActions,
    MdSearch,
    MdFilterList,
    MdSort,
    MdOutlineTrendingUp,
    MdOutlineTrendingDown,
    MdDownload,
    MdPieChart,
    MdOutlineDescription,
    MdOutlineCheck,
    MdKeyboardArrowDown,
    MdOutlineVerified,
    MdKeyboardArrowUp,
    MdRefresh,
    MdMoreVert,
    MdOutlineStackedBarChart,
    MdOutlineAutoGraph,
    MdArchive,
    MdOutlineAssignment,
    MdPeople,
    MdDateRange,
    MdAccessTime,
    MdFunctions,
    MdShare,
    MdOutlineDashboard,
    MdStorefront,
    MdOutlineInsights,
    MdKeyboardArrowRight
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactApexChart from 'react-apexcharts';

const SessionResult = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
        });
    }, []);

    // Session data
    const [sessionData] = useState({
        id: 'SES-2025-093',
        name: 'Validasi Proposal Penelitian Q2 2025',
        status: 'completed',
        startDate: '2025-04-01T09:00:00',
        endDate: '2025-04-15T18:00:00',
        duration: '14 hari, 9 jam',
        summary: {
            totalProposals: 78,
            approved: 52,
            rejected: 11,
            revised: 15,
            averageScore: 87.4,
            topScore: 98.5,
            lowestScore: 67.3,
            totalBudget: 'Rp 4.325.500.000',
            allocatedBudget: 'Rp 3.256.750.000',
            remainingBudget: 'Rp 1.068.750.000'
        },
        categoryDistribution: [
            { name: 'Penelitian Dasar', count: 25, approved: 15, percentage: 32.1 },
            { name: 'Penelitian Terapan', count: 33, approved: 24, percentage: 42.3 },
            { name: 'Pengabdian Masyarakat', count: 14, approved: 10, percentage: 17.9 },
            { name: 'Kerjasama Industri', count: 6, approved: 3, percentage: 7.7 }
        ],
        departmentDistribution: [
            { name: 'Teknik Informatika', count: 18, approved: 13, percentage: 23.1 },
            { name: 'Teknik Elektro', count: 14, approved: 10, percentage: 17.9 },
            { name: 'Manajemen Bisnis', count: 11, approved: 7, percentage: 14.1 },
            { name: 'P3M', count: 9, approved: 7, percentage: 11.5 },
            { name: 'Akuntansi', count: 8, approved: 5, percentage: 10.3 },
            { name: 'Lainnya', count: 18, approved: 10, percentage: 23.1 }
        ],
        reviewMetrics: {
            averageReviewTime: '5.8 jam',
            fastestReview: '45 menit',
            slowestReview: '15.5 jam',
            totalReviewers: 24,
            activeReviewers: 22,
            reviewsPerReviewer: 3.5,
            mlAccuracy: 93.4,
            consensusRate: 89.7
        },
        budgetAllocation: [
            { category: 'Penelitian Dasar', budget: 'Rp 950.250.000', percentage: 29.2 },
            { category: 'Penelitian Terapan', budget: 'Rp 1.467.280.000', percentage: 45.0 },
            { category: 'Pengabdian Masyarakat', budget: 'Rp 535.220.000', percentage: 16.4 },
            { category: 'Kerjasama Industri', budget: 'Rp 304.000.000', percentage: 9.4 }
        ],
        topProposals: [
            {
                id: 'PRO-452',
                title: 'Implementasi AI untuk Efisiensi Energi Kampus',
                department: 'Teknik Informatika',
                pi: 'Dr. Hendro Wicaksono',
                score: 98.5,
                budget: 'Rp 425.000.000',
                status: 'approved'
            },
            {
                id: 'PRO-417',
                title: 'Pengembangan Platform IoT untuk Smart Classroom',
                department: 'Teknik Elektro',
                pi: 'Prof. Amalia Safira',
                score: 97.2,
                budget: 'Rp 380.000.000',
                status: 'approved'
            },
            {
                id: 'PRO-423',
                title: 'Sistem Pendeteksi Dini Bencana Berbasis Machine Learning',
                department: 'Teknik Informatika',
                pi: 'Dr. Budi Hartono',
                score: 96.8,
                budget: 'Rp 510.000.000',
                status: 'approved'
            }
        ],
        recentProposalResults: [
            {
                id: 'PRO-452',
                title: 'Implementasi AI untuk Efisiensi Energi Kampus',
                department: 'Teknik Informatika',
                pi: 'Dr. Hendro Wicaksono',
                score: 98.5,
                budget: 'Rp 425.000.000',
                status: 'approved',
                date: '2025-04-14T10:23:15'
            },
            {
                id: 'PRO-417',
                title: 'Pengembangan Platform IoT untuk Smart Classroom',
                department: 'Teknik Elektro',
                pi: 'Prof. Amalia Safira',
                score: 97.2,
                budget: 'Rp 380.000.000',
                status: 'approved',
                date: '2025-04-14T11:05:42'
            },
            {
                id: 'PRO-438',
                title: 'Pemanfaatan Blockchain untuk Keamanan Data Penelitian',
                department: 'Teknik Informatika',
                pi: 'Dr. Maya Wijaya',
                score: 95.4,
                budget: 'Rp 320.000.000',
                status: 'approved',
                date: '2025-04-14T13:18:29'
            },
            {
                id: 'PRO-441',
                title: 'Pengembangan Material Ramah Lingkungan untuk Konstruksi',
                department: 'Teknik Sipil',
                pi: 'Prof. Agung Purnomo',
                score: 94.9,
                budget: 'Rp 395.000.000',
                status: 'approved',
                date: '2025-04-14T14:42:56'
            },
            {
                id: 'PRO-437',
                title: 'Optimalisasi Supply Chain dengan Sistem Cerdas',
                department: 'Manajemen Bisnis',
                pi: 'Dr. Budi Santoso',
                score: 76.3,
                budget: 'Rp 210.000.000',
                status: 'revised',
                date: '2025-04-14T15:20:18'
            },
            {
                id: 'PRO-448',
                title: 'Pengembangan Algoritma Pengenalan Objek untuk Drone',
                department: 'Teknik Informatika',
                pi: 'Dr. Anita Wijayanti',
                score: 68.7,
                budget: 'Rp 290.000.000',
                status: 'rejected',
                date: '2025-04-15T09:15:27'
            },
        ]
    });

    // Filter and search states
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedSection, setExpandedSection] = useState(null);
    const [sortBy, setSortBy] = useState('score');
    const [sortOrder, setSortOrder] = useState('desc');

    // Chart options for results distribution
    const resultsPieOptions = {
        chart: {
            type: 'pie',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            toolbar: {
                show: false
            }
        },
        colors: ['#10b981', '#f97316', '#ef4444'],
        labels: ['Disetujui', 'Revisi', 'Ditolak'],
        stroke: {
            width: 0
        },
        legend: {
            position: 'bottom',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        plotOptions: {
            pie: {
                donut: {
                    size: '0%'
                }
            }
        }
    };

    // Chart options for department distribution
    const departmentDistOptions = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            toolbar: {
                show: false
            },
            height: 300
        },
        colors: ['#6366f1', '#cbd5e1'],
        plotOptions: {
            bar: {
                horizontal: true,
                columnWidth: '70%',
                borderRadius: 4,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },
        grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4
        },
        xaxis: {
            categories: sessionData.departmentDistribution.map(item => item.name)
        },
        legend: {
            position: 'bottom'
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " proposals";
                }
            }
        }
    };

    // Chart options for budget allocation
    const budgetOptions = {
        chart: {
            type: 'donut',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            toolbar: {
                show: false
            }
        },
        colors: ['#6366f1', '#8b5cf6', '#d946ef', '#f97316'],
        labels: sessionData.budgetAllocation.map(item => item.category),
        stroke: {
            width: 0
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '55%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '14px',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            formatter: function (val) {
                                return val + '%';
                            }
                        },
                        total: {
                            show: true,
                            fontSize: '14px',
                            label: 'Total Alokasi',
                            formatter: function () {
                                return sessionData.summary.allocatedBudget;
                            }
                        }
                    }
                }
            }
        },
        legend: {
            position: 'bottom'
        }
    };

    // Chart options for score distribution
    const scoreDistOptions = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            toolbar: {
                show: false
            },
            height: 250
        },
        colors: ['#6366f1'],
        plotOptions: {
            bar: {
                distributed: true,
                columnWidth: '60%',
                borderRadius: 3
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['60-69', '70-79', '80-89', '90-100'],
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }
            }
        },
        grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4
        },
        yaxis: {
            title: {
                text: 'Jumlah Proposal'
            }
        }
    };

    // Score distribution data (mockup)
    const scoreDistData = [
        {
            name: 'Proposal',
            data: [5, 12, 28, 33]
        }
    ];

    // Helper functions
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return 'bg-emerald-100 text-emerald-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'revised':
                return 'bg-amber-100 text-amber-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return 'Disetujui';
            case 'rejected':
                return 'Ditolak';
            case 'revised':
                return 'Perlu Revisi';
            default:
                return status;
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return <MdCheckCircle className="h-5 w-5 text-emerald-500" />;
            case 'rejected':
                return <MdCancel className="h-5 w-5 text-red-500" />;
            case 'revised':
                return <MdPendingActions className="h-5 w-5 text-amber-500" />;
            default:
                return null;
        }
    };

    // Calculate progress color
    const getProgressColor = (percentage) => {
        if (percentage >= 70) return 'bg-emerald-500';
        if (percentage >= 50) return 'bg-amber-500';
        return 'bg-red-500';
    };

    // Calculate approval rate by department
    const departmentData = sessionData.departmentDistribution.map(dept => ({
        name: dept.name,
        total: dept.count,
        approved: dept.approved
    }));

    return (
        <div className="space-y-6">
            {/* Enhanced Header with Visual Hierarchy */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden" data-aos="fade-down">
                {/* Abstract background blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full -translate-x-10 translate-y-20 blur-3xl"></div>

                <div className="relative z-10">
                    {/* Session indicator badge */}
                    <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-4">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        <span>ID: {sessionData.id}</span>
                    </div>

                    <div className="flex flex-wrap justify-between items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                                    <MdOutlineVerified className="h-8 w-8" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">Hasil Sesi</h1>
                                    <p className="text-lg opacity-90 mt-1">{sessionData.name}</p>
                                </div>
                                <span className="ml-2 px-3 py-1 bg-emerald-500 rounded-full text-xs font-medium">
                                    {sessionData.status === 'completed' ? 'Selesai' : 'Draft'}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm bg-white/10 backdrop-blur-sm rounded-xl p-3">
                                <div className="flex items-center gap-2">
                                    <MdDateRange className="h-4 w-4" />
                                    <span className="font-medium">Periode:</span>
                                    <span>{formatDate(sessionData.startDate).split(',')[0]} - {formatDate(sessionData.endDate).split(',')[0]}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MdAccessTime className="h-4 w-4" />
                                    <span className="font-medium">Durasi:</span>
                                    <span>{sessionData.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MdPeople className="h-4 w-4" />
                                    <span className="font-medium">Reviewer:</span>
                                    <span>{sessionData.reviewMetrics.activeReviewers}/{sessionData.reviewMetrics.totalReviewers} aktif</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <button className="px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl transition-all flex items-center gap-2">
                                <MdShare className="h-5 w-5" />
                                <span>Bagikan</span>
                            </button>
                            <button className="px-4 py-2.5 bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all flex items-center gap-2 font-medium shadow-lg">
                                <MdDownload className="h-5 w-5" />
                                <span>Unduh Laporan</span>
                            </button>
                        </div>
                    </div>

                    {/* Quick stats overview */}
                    <div className="grid grid-cols-4 gap-4 mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-center">
                            <p className="text-xs text-white/80">Total Proposal</p>
                            <p className="text-2xl font-bold">{sessionData.summary.totalProposals}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-white/80">Disetujui</p>
                            <p className="text-2xl font-bold text-emerald-300">{sessionData.summary.approved}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-white/80">Anggaran Dialokasi</p>
                            <p className="text-xl font-bold">{sessionData.summary.allocatedBudget.split(' ')[1]}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-white/80">Skor Rata-rata</p>
                            <p className="text-2xl font-bold">{sessionData.summary.averageScore}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Results Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" data-aos="fade-up">
                {/* Total Proposals */}
                <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
                    <div className="flex items-start justify-between">
                        <div className="rounded-full p-3 bg-indigo-100">
                            <MdOutlineAssignment className="h-6 w-6 text-indigo-600" />
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                            Total
                        </span>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 font-medium">Total Proposal</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">
                            {sessionData.summary.totalProposals}
                        </h3>
                        <div className="flex justify-between items-center mt-3">
                            <div className="text-xs text-gray-500">
                                <span className="text-emerald-600 font-medium">{sessionData.summary.approved}</span> disetujui
                            </div>
                            <div className="text-xs text-gray-500">
                                <span className="text-red-600 font-medium">{sessionData.summary.rejected}</span> ditolak
                            </div>
                            <div className="text-xs text-gray-500">
                                <span className="text-amber-600 font-medium">{sessionData.summary.revised}</span> revisi
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Approval Rate */}
                <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
                    <div className="flex items-start justify-between">
                        <div className="rounded-full p-3 bg-emerald-100">
                            <MdCheckCircle className="h-6 w-6 text-emerald-600" />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                            Rate
                        </span>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 font-medium">Tingkat Persetujuan</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">
                            {((sessionData.summary.approved / sessionData.summary.totalProposals) * 100).toFixed(1)}%
                        </h3>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3">
                            <div
                                className="bg-emerald-500 h-1.5 rounded-full"
                                style={{ width: `${(sessionData.summary.approved / sessionData.summary.totalProposals) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Skor rata-rata: <span className="font-medium text-indigo-600">{sessionData.summary.averageScore}</span></p>
                    </div>
                </Card>

                {/* Budget Allocation */}
                <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
                    <div className="flex items-start justify-between">
                        <div className="rounded-full p-3 bg-blue-100">
                            <MdBarChart className="h-6 w-6 text-blue-600" />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                            Budget
                        </span>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 font-medium">Anggaran Dialokasikan</p>
                        <h3 className="text-xl font-bold text-gray-800 mt-1">
                            {sessionData.summary.allocatedBudget}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-gray-500">
                                Total pengajuan: <span className="font-medium text-blue-600">{sessionData.summary.totalBudget}</span>
                            </div>
                            <div className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                                {Math.round((parseInt(sessionData.summary.allocatedBudget.replace(/[^0-9]/g, '')) /
                                    parseInt(sessionData.summary.totalBudget.replace(/[^0-9]/g, ''))) * 100)}%
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Review Performance */}
                <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
                    <div className="flex items-start justify-between">
                        <div className="rounded-full p-3 bg-purple-100">
                            <MdPeople className="h-6 w-6 text-purple-600" />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                            Review
                        </span>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 font-medium">Kinerja Reviewer</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">
                            {sessionData.reviewMetrics.activeReviewers}/{sessionData.reviewMetrics.totalReviewers}
                        </h3>
                        <div className="flex justify-between items-center text-xs mt-3">
                            <span className="text-gray-600">Waktu rata-rata: <span className="font-medium text-purple-600">{sessionData.reviewMetrics.averageReviewTime}</span></span>
                            <span className="flex items-center text-emerald-600">
                                <MdOutlineTrendingUp className="mr-1 h-4 w-4" />
                                {sessionData.reviewMetrics.reviewsPerReviewer.toFixed(1)} reviews/reviewer
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts Row: Results Distribution & Department Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Results Distribution Pie Chart */}
                <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <MdPieChart className="h-5 w-5 text-indigo-600" />
                            Distribusi Hasil
                        </h2>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                                <MdDownload className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="h-[320px] flex items-center justify-center">
                        <ReactApexChart
                            options={resultsPieOptions}
                            series={[
                                sessionData.summary.approved,
                                sessionData.summary.revised,
                                sessionData.summary.rejected
                            ]}
                            type="pie"
                            height={300}
                            width={400}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="bg-emerald-50 p-3 rounded-lg text-center">
                            <p className="text-emerald-800 text-xl font-bold">{sessionData.summary.approved}</p>
                            <p className="text-emerald-600 text-xs">Disetujui</p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg text-center">
                            <p className="text-amber-800 text-xl font-bold">{sessionData.summary.revised}</p>
                            <p className="text-amber-600 text-xs">Revisi</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg text-center">
                            <p className="text-red-800 text-xl font-bold">{sessionData.summary.rejected}</p>
                            <p className="text-red-600 text-xs">Ditolak</p>
                        </div>
                    </div>
                </Card>

                {/* Department Distribution Chart */}
                <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <MdOutlineStackedBarChart className="h-5 w-5 text-indigo-600" />
                            Distribusi Departemen
                        </h2>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                                <MdDownload className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="h-[320px]">
                        <ReactApexChart
                            options={departmentDistOptions}
                            series={[
                                {
                                    name: 'Total',
                                    data: departmentData.map(d => d.total)
                                },
                                {
                                    name: 'Disetujui',
                                    data: departmentData.map(d => d.approved)
                                }
                            ]}
                            type="bar"
                            height={320}
                        />
                    </div>
                </Card>
            </div>

            {/* Charts Row 2: Budget Allocation & Score Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Budget Allocation Donut Chart */}
                <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <MdFunctions className="h-5 w-5 text-indigo-600" />
                            Alokasi Anggaran
                        </h2>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                                <MdDownload className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="h-[320px]">
                        <ReactApexChart
                            options={budgetOptions}
                            series={sessionData.budgetAllocation.map(item => parseFloat(item.percentage))}
                            type="donut"
                            height={320}
                        />
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2">
                            <MdOutlineInsights className="h-5 w-5 text-blue-600" />
                            <p className="text-blue-800 text-sm">
                                Anggaran tersisa: <span className="font-medium">{sessionData.summary.remainingBudget}</span>
                                <span className="ml-1 text-xs">
                                    ({Math.round((parseInt(sessionData.summary.remainingBudget.replace(/[^0-9]/g, '')) /
                                        parseInt(sessionData.summary.totalBudget.replace(/[^0-9]/g, ''))) * 100)}% dari total)
                                </span>
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Score Distribution Bar Chart */}
                <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <MdOutlineAutoGraph className="h-5 w-5 text-indigo-600" />
                            Distribusi Skor
                        </h2>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                                <MdDownload className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="h-[250px]">
                        <ReactApexChart
                            options={scoreDistOptions}
                            series={scoreDistData}
                            type="bar"
                            height={250}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-5">
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500">Skor Rata-rata</p>
                            <p className="text-lg font-medium text-gray-800">{sessionData.summary.averageScore}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500">Skor Tertinggi</p>
                            <p className="text-lg font-medium text-gray-800">{sessionData.summary.topScore}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500">Skor Terendah</p>
                            <p className="text-lg font-medium text-gray-800">{sessionData.summary.lowestScore}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Top Proposals Section */}
            <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <MdOutlineCheck className="h-5 w-5 text-emerald-600" />
                        Proposal Teratas
                    </h2>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                        <span>Lihat semua proposal</span>
                        <MdKeyboardArrowRight className="h-5 w-5" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-gray-700 text-sm">
                            <tr>
                                <th className="px-4 py-3 text-left rounded-tl-lg">No</th>
                                <th className="px-4 py-3 text-left">Judul Proposal</th>
                                <th className="px-4 py-3 text-left">Departemen</th>
                                <th className="px-4 py-3 text-left">Peneliti</th>
                                <th className="px-4 py-3 text-center">Skor</th>
                                <th className="px-4 py-3 text-center rounded-tr-lg">Anggaran</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sessionData.topProposals.map((proposal, index) => (
                                <tr key={proposal.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-4 py-3">
                                        <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-medium text-sm">
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-gray-800">{proposal.title}</div>
                                        <div className="text-xs text-gray-500">{proposal.id}</div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {proposal.department}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {proposal.pi}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center">
                                            <div className="flex items-center justify-center w-12 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-medium">
                                                {proposal.score}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center font-medium text-gray-800">
                                        {proposal.budget}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Recent Proposal Results Section */}
            <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <MdOutlineDashboard className="h-5 w-5 text-indigo-600" />
                        Hasil Proposal Terbaru
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari proposal..."
                                className="pl-10 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <select
                                className="pl-4 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg appearance-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">Semua Status</option>
                                <option value="approved">Disetujui</option>
                                <option value="revised">Revisi</option>
                                <option value="rejected">Ditolak</option>
                            </select>
                            <MdFilterList className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <button className="p-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
                            <MdRefresh className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-gray-700 text-sm">
                            <tr>
                                <th className="px-4 py-3 text-left rounded-tl-lg">ID</th>
                                <th className="px-4 py-3 text-left">Judul Proposal</th>
                                <th className="px-4 py-3 text-left hidden md:table-cell">Departemen</th>
                                <th className="px-4 py-3 text-left hidden md:table-cell">Peneliti</th>
                                <th className="px-4 py-3 text-center">Skor</th>
                                <th className="px-4 py-3 text-center">Status</th>
                                <th className="px-4 py-3 text-center rounded-tr-lg">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sessionData.recentProposalResults
                                .filter(proposal => {
                                    if (filterStatus !== 'all' && proposal.status !== filterStatus) {
                                        return false;
                                    }
                                    if (searchQuery && !proposal.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                                        return false;
                                    }
                                    return true;
                                })
                                .map((proposal, index) => (
                                    <tr key={proposal.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-3">
                                            <span className="font-mono text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md">
                                                {proposal.id}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-800">{proposal.title}</div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(proposal.date).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                                            {proposal.department}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                                            {proposal.pi}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-center">
                                                <div className={`flex items-center justify-center w-12 h-8 rounded-lg font-medium
                        ${proposal.score >= 90 ? 'bg-emerald-50 text-emerald-700' :
                                                        proposal.score >= 80 ? 'bg-blue-50 text-blue-700' :
                                                            proposal.score >= 70 ? 'bg-amber-50 text-amber-700' :
                                                                'bg-red-50 text-red-700'}`}>
                                                    {proposal.score}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-center">
                                                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(proposal.status)}`}>
                                                    {getStatusIcon(proposal.status)}
                                                    <span>{getStatusText(proposal.status)}</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-center">
                                                <button className="p-1.5 rounded-lg hover:bg-gray-100">
                                                    <MdMoreVert className="h-5 w-5 text-gray-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Review Performance Detail */}
            <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <MdOutlineDashboard className="h-5 w-5 text-purple-600" />
                        Detail Kinerja Review
                    </h2>
                    <button
                        className="text-sm text-gray-500 flex items-center gap-1"
                        onClick={() => setExpandedSection(expandedSection === 'reviewMetrics' ? null : 'reviewMetrics')}
                    >
                        {expandedSection === 'reviewMetrics' ? (
                            <>
                                <span>Sembunyikan</span>
                                <MdKeyboardArrowUp className="h-5 w-5" />
                            </>
                        ) : (
                            <>
                                <span>Detail</span>
                                <MdKeyboardArrowDown className="h-5 w-5" />
                            </>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Reviewer Aktif</p>
                        <p className="text-xl font-bold text-gray-800">{sessionData.reviewMetrics.activeReviewers}/{sessionData.reviewMetrics.totalReviewers}</p>
                        <div className="w-full bg-gray-200 h-1.5 mt-2 rounded-full overflow-hidden">
                            <div
                                className="bg-purple-500 h-1.5"
                                style={{ width: `${(sessionData.reviewMetrics.activeReviewers / sessionData.reviewMetrics.totalReviewers) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Rata-rata Waktu Review</p>
                        <p className="text-xl font-bold text-gray-800">{sessionData.reviewMetrics.averageReviewTime}</p>
                        <div className="text-xs text-gray-500 mt-2">
                            Range: {sessionData.reviewMetrics.fastestReview} - {sessionData.reviewMetrics.slowestReview}
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Akurasi ML</p>
                        <p className="text-xl font-bold text-gray-800">{sessionData.reviewMetrics.mlAccuracy}%</p>
                        <div className="w-full bg-gray-200 h-1.5 mt-2 rounded-full overflow-hidden">
                            <div
                                className="bg-indigo-500 h-1.5"
                                style={{ width: `${sessionData.reviewMetrics.mlAccuracy}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Tingkat Konsensus</p>
                        <p className="text-xl font-bold text-gray-800">{sessionData.reviewMetrics.consensusRate}%</p>
                        <div className="w-full bg-gray-200 h-1.5 mt-2 rounded-full overflow-hidden">
                            <div
                                className="bg-emerald-500 h-1.5"
                                style={{ width: `${sessionData.reviewMetrics.consensusRate}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {expandedSection === 'reviewMetrics' && (
                    <div className="mt-6 border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-base font-semibold text-gray-700 mb-4">Top Reviewers</h3>
                                <div className="space-y-3">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium">
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {i === 0 ? 'Dr. Budi Santoso' :
                                                            i === 1 ? 'Prof. Amalia Wijaya' :
                                                                i === 2 ? 'Dr. Hendro Wicaksono' :
                                                                    i === 3 ? 'Dr. Maya Putri' : 'Prof. Iwan Setiawan'}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {i === 0 ? '14 reviews' :
                                                            i === 1 ? '12 reviews' :
                                                                i === 2 ? '10 reviews' :
                                                                    i === 3 ? '8 reviews' : '8 reviews'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded-full text-xs">
                                                {i === 0 ? '4.8' :
                                                    i === 1 ? '4.7' :
                                                        i === 2 ? '4.9' :
                                                            i === 3 ? '4.6' : '4.8'} rating
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-700 mb-4">Statistik Review</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-600">Distribusi Waktu Review</span>
                                        </div>
                                        <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="flex h-full">
                                                <div className="bg-green-500 h-full" style={{ width: '30%' }}></div>
                                                <div className="bg-blue-500 h-full" style={{ width: '45%' }}></div>
                                                <div className="bg-amber-500 h-full" style={{ width: '15%' }}></div>
                                                <div className="bg-red-500 h-full" style={{ width: '10%' }}></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-2 text-xs">
                                            <span className="text-green-600">&lt; 30m (30%)</span>
                                            <span className="text-blue-600">30m-1h (45%)</span>
                                            <span className="text-amber-600">1-2h (15%)</span>
                                            <span className="text-red-600">&gt; 2h (10%)</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-600">Keputusan vs Rekomendasi AI</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="text-center">
                                                <div className="flex items-center justify-center h-10 w-10 mx-auto rounded-full bg-emerald-100 text-emerald-800 font-medium">
                                                    {Math.round(sessionData.reviewMetrics.mlAccuracy)}%
                                                </div>
                                                <p className="text-xs mt-1 text-gray-600">Akurasi</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center justify-center h-10 w-10 mx-auto rounded-full bg-blue-100 text-blue-800 font-medium">
                                                    94%
                                                </div>
                                                <p className="text-xs mt-1 text-gray-600">Presisi</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center justify-center h-10 w-10 mx-auto rounded-full bg-purple-100 text-purple-800 font-medium">
                                                    92%
                                                </div>
                                                <p className="text-xs mt-1 text-gray-600">Recall</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-gray-600">Tingkat Efisiensi Review</span>
                                            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                                +12% dari sesi sebelumnya
                                            </span>
                                        </div>
                                        <div className="text-xl font-bold text-gray-800">68% lebih cepat</div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Penggunaan AI meningkatkan efisiensi review sebesar 68% dibandingkan metode manual
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Card>

            {/* Category Distribution Section */}
            <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <MdStorefront className="h-5 w-5 text-indigo-600" />
                        Distribusi Kategori
                    </h2>
                    <button className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                        <MdDownload className="h-5 w-5" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-gray-700 text-sm">
                            <tr>
                                <th className="px-4 py-3 text-left rounded-tl-lg">Kategori</th>
                                <th className="px-4 py-3 text-center">Jumlah</th>
                                <th className="px-4 py-3 text-center">Disetujui</th>
                                <th className="px-4 py-3 text-center">Rate</th>
                                <th className="px-4 py-3 text-center">Anggaran</th>
                                <th className="px-4 py-3 text-right rounded-tr-lg">% Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sessionData.categoryDistribution.map((category, index) => {
                                const approvalRate = (category.approved / category.count * 100).toFixed(1);
                                const budget = sessionData.budgetAllocation.find(b => b.category === category.name)?.budget || '-';
                                const budgetPercentage = sessionData.budgetAllocation.find(b => b.category === category.name)?.percentage || 0;

                                return (
                                    <tr key={category.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-3">
                                            <span className="font-medium text-gray-800">{category.name}</span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {category.count}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {category.approved}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center">
                                                <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${parseFloat(approvalRate) >= 70 ? 'bg-emerald-100 text-emerald-800' :
                                                    parseFloat(approvalRate) >= 50 ? 'bg-amber-100 text-amber-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {approvalRate}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center font-medium text-gray-800">
                                            {budget}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="text-sm font-medium text-gray-800">{budgetPercentage}%</span>
                                                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                                    <div
                                                        className={`h-1.5 rounded-full ${getProgressColor(budgetPercentage)}`}
                                                        style={{ width: `${budgetPercentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Footer Actions */}
            <div className="bg-gradient-to-br from-gray-100 to-emerald-50 rounded-2xl p-6 border border-emerald-100" data-aos="fade-up">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">Hasil Sesi Selesai</h3>
                        <p className="text-gray-600">
                            Sesi "{sessionData.name}" telah selesai dengan {sessionData.summary.approved} proposal disetujui dari total {sessionData.summary.totalProposals} proposal.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
                            <MdArchive className="h-5 w-5" />
                            <span>Arsipkan</span>
                        </button>
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2">
                            <MdDownload className="h-5 w-5" />
                            <span>Unduh Laporan</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionResult;
