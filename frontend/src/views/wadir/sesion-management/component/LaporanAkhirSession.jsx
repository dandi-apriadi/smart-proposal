import React, { useState, useEffect } from 'react';
import {
    MdCheckCircle,
    MdCancel,
    MdPendingActions,
    MdOutlineAssignment,
    MdPeople,
    MdAccessTime,
    MdDateRange,
    MdOutlineVerified,
    MdBarChart,
    MdInsights,
    MdDownload,
    MdStar,
    MdStarHalf,
    MdOutlineDescription,
    MdAutoGraph,
    MdOpenInNew,
    MdHistory,
    MdComment,
    MdPlayCircleOutline,
    MdOutlineAnalytics,
    MdDoneAll,
    MdPrint,
    MdShare,
    MdCalendarToday,
    MdOutlineTrendingUp,
    MdOutlineTrendingDown,
    MdMoreHoriz,
    MdOutlineSort,
    MdSearch,
    MdInfo,
    MdHelpOutline,
    MdFilter,
    MdLightbulbOutline
} from 'react-icons/md';
import { FiClock, FiActivity } from 'react-icons/fi';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactApexChart from 'react-apexcharts';

const LaporanAkhirSession = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
        });
    }, []);

    // Session report data
    const [sessionReport] = useState({
        id: 'SES-2025-093',
        name: 'Validasi Proposal Penelitian Q2 2025',
        startDate: '2025-04-01T09:00:00',
        endDate: '2025-04-15T18:00:00',
        duration: '14 hari, 9 jam',
        status: 'completed',
        completionDate: '2025-04-15T17:42:33',
        summary: {
            totalProposals: 78,
            approved: 52,
            rejected: 11,
            revised: 15,
            approvalRate: 66.7,
            averageScore: 87.4,
            averageReviewTime: '5.8 jam',
            totalBudget: 'Rp 4.325.500.000',
            allocatedBudget: 'Rp 3.256.750.000'
        },
        participantStats: {
            totalReviewers: 24,
            activeReviewers: 22,
            mostActiveReviewer: 'Dr. Budi Santoso',
            reviewsPerReviewer: 3.5,
            facultyParticipation: [
                { name: 'Teknik Informatika', count: 18, percentage: 23.1 },
                { name: 'Teknik Elektro', count: 14, percentage: 17.9 },
                { name: 'Manajemen Bisnis', count: 11, percentage: 14.1 },
                { name: 'P3M', count: 9, percentage: 11.5 },
                { name: 'Akuntansi', count: 8, percentage: 10.3 },
                { name: 'Lainnya', count: 18, percentage: 23.1 }
            ]
        },
        evaluationMetrics: {
            methodology: { value: 86.8, change: '+3.2%' },
            innovation: { value: 84.5, change: '+1.8%' },
            feasibility: { value: 85.3, change: '+4.1%' },
            budget: { value: 83.7, change: '-1.2%' },
            impact: { value: 89.2, change: '+5.6%' },
            sustainability: { value: 82.4, change: '+0.9%' }
        },
        mlPerformance: {
            accuracy: 93.8,
            precision: 91.5,
            recall: 94.2,
            predictionRate: 87.6,
            manualOverrideRate: 5.2,
            timeReduction: "68%",
            comparisonToLastSession: "+7.4%"
        },
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
            },
            {
                id: 'PRO-438',
                title: 'Pemanfaatan Blockchain untuk Keamanan Data Penelitian',
                department: 'Teknik Informatika',
                pi: 'Dr. Maya Wijaya',
                score: 95.4,
                budget: 'Rp 320.000.000',
                status: 'approved'
            },
            {
                id: 'PRO-441',
                title: 'Pengembangan Material Ramah Lingkungan untuk Konstruksi',
                department: 'Teknik Sipil',
                pi: 'Prof. Agung Purnomo',
                score: 94.9,
                budget: 'Rp 395.000.000',
                status: 'approved'
            }
        ],
        budgetDistribution: [
            { category: 'Penelitian Terapan', value: 42.5 },
            { category: 'Penelitian Dasar', value: 25.8 },
            { category: 'Pengabdian Masyarakat', value: 18.3 },
            { category: 'Kerjasama Industri', value: 13.4 }
        ],
        recommendations: [
            'Tingkatkan pelatihan penulisan proposal untuk meningkatkan kualitas metodologi penelitian',
            'Perbaiki template anggaran untuk meningkatkan akurasi dan transparansi',
            'Evaluasi kembali bobot kriteria inovasi dalam penilaian',
            'Adakan workshop tentang keberlanjutan penelitian untuk meningkatkan aspek keberlanjutan',
            'Perluas jaringan reviewer dengan ahli dari luar institusi untuk mendapatkan perspektif yang lebih luas'
        ]
    });

    // Chart options for final results
    const proposalResultsChartOptions = {
        chart: {
            type: 'pie',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            toolbar: { show: false },
        },
        colors: ['#10b981', '#f97316', '#ef4444'],
        labels: ['Disetujui', 'Revisi', 'Ditolak'],
        stroke: { width: 0 },
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

    // Budget distribution chart
    const budgetDistChartOptions = {
        chart: {
            type: 'donut',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            toolbar: { show: false },
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            position: 'bottom',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
        colors: ['#6366f1', '#8b5cf6', '#d946ef', '#f97316'],
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
                            label: 'Total Anggaran',
                            formatter: function () {
                                return sessionReport.summary.totalBudget;
                            }
                        }
                    }
                }
            }
        }
    };

    // Faculty participation chart
    const facultyChartOptions = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            toolbar: { show: false },
            height: 320
        },
        colors: ['#8b5cf6'],
        grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 5,
                barHeight: '60%',
                distributed: false
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + '%';
            },
            style: {
                colors: ['#fff'],
                fontWeight: 500
            }
        },
        xaxis: {
            categories: sessionReport.participantStats.facultyParticipation.map(item => item.name),
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }
            }
        }
    };

    // Metrics radar chart
    const metricsRadarOptions = {
        chart: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            toolbar: { show: false },
            height: 320,
        },
        xaxis: {
            categories: Object.keys(sessionReport.evaluationMetrics).map(key =>
                key.charAt(0).toUpperCase() + key.slice(1)
            )
        },
        yaxis: {
            show: false
        },
        colors: ['#6366f1'],
        markers: {
            size: 5
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            opacity: 0.2
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val.toFixed(1) + '%';
                }
            }
        }
    };

    // ML Performance chart with comparison
    const mlPerformanceOptions = {
        chart: {
            height: 300,
            type: 'radialBar',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            toolbar: { show: false }
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                    margin: 0,
                    size: '70%',
                    background: '#fff',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 0,
                        blur: 4,
                        opacity: 0.24
                    }
                },
                track: {
                    background: '#fff',
                    strokeWidth: '67%',
                    margin: 0,
                    dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35
                    }
                },
                dataLabels: {
                    show: true,
                    name: {
                        offsetY: -10,
                        show: true,
                        color: '#888',
                        fontSize: '15px'
                    },
                    value: {
                        formatter: function (val) {
                            return parseInt(val) + '%';
                        },
                        color: '#111',
                        fontSize: '36px',
                        show: true,
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#8b5cf6'],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: 'round'
        },
        labels: ['Akurasi ML'],
        colors: ['#6366f1']
    };

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

    const getStatusClass = (status) => {
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

    const getTrendIcon = (change) => {
        if (change.startsWith('+')) {
            return <MdOutlineTrendingUp className="h-4 w-4 text-emerald-500" />;
        } else if (change.startsWith('-')) {
            return <MdOutlineTrendingDown className="h-4 w-4 text-red-500" />;
        }
        return null;
    };

    const getTrendClass = (change) => {
        if (change.startsWith('+')) {
            return 'text-emerald-600';
        } else if (change.startsWith('-')) {
            return 'text-red-600';
        }
        return 'text-gray-600';
    };

    return (
        <div className="space-y-6">
            {/* Premium Header with 3D Gradient Effect */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden" data-aos="fade-down">
                {/* Abstract background blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full -translate-x-10 translate-y-20 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex flex-wrap justify-between items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <MdOutlineDescription className="h-8 w-8" />
                                <h1 className="text-3xl font-bold">Laporan Akhir Sesi</h1>
                                <span className="px-3 py-1 bg-emerald-500 rounded-full text-xs font-medium">
                                    {sessionReport.status === 'completed' ? 'Selesai' : 'Draft'}
                                </span>
                            </div>
                            <p className="text-xl opacity-90">{sessionReport.name}</p>

                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <MdCalendarToday className="h-4 w-4" />
                                    <span>{formatDate(sessionReport.startDate)} - {formatDate(sessionReport.endDate)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MdAccessTime className="h-4 w-4" />
                                    <span>Durasi: {sessionReport.duration}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <button className="px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl transition-all flex items-center gap-2">
                                <MdPrint className="h-5 w-5" />
                                <span>Print</span>
                            </button>
                            <button className="px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl transition-all flex items-center gap-2">
                                <MdShare className="h-5 w-5" />
                                <span>Share</span>
                            </button>
                            <button className="px-4 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-2 font-medium shadow-lg">
                                <MdDownload className="h-5 w-5" />
                                <span>Download PDF</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Session Summary Stats Grid */}
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
                            {sessionReport.summary.totalProposals}
                        </h3>
                        <div className="flex justify-between items-center mt-3">
                            <div className="text-xs text-gray-500">
                                <span className="text-emerald-600 font-medium">{sessionReport.summary.approved}</span> disetujui
                            </div>
                            <div className="text-xs text-gray-500">
                                <span className="text-red-600 font-medium">{sessionReport.summary.rejected}</span> ditolak
                            </div>
                            <div className="text-xs text-gray-500">
                                <span className="text-amber-600 font-medium">{sessionReport.summary.revised}</span> revisi
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Approval Rate */}
                <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
                    <div className="flex items-start justify-between">
                        <div className="rounded-full p-3 bg-emerald-100">
                            <MdOutlineVerified className="h-6 w-6 text-emerald-600" />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                            Rate
                        </span>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 font-medium">Tingkat Persetujuan</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">
                            {sessionReport.summary.approvalRate}%
                        </h3>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3">
                            <div
                                className="bg-emerald-500 h-1.5 rounded-full"
                                style={{ width: `${sessionReport.summary.approvalRate}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Skor rata-rata: <span className="font-medium text-indigo-600">{sessionReport.summary.averageScore}</span></p>
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
                            {sessionReport.summary.allocatedBudget}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-gray-500">
                                Total pengajuan: <span className="font-medium text-blue-600">{sessionReport.summary.totalBudget}</span>
                            </div>
                            <div className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                                {Math.round((parseInt(sessionReport.summary.allocatedBudget.replace(/[^0-9]/g, '')) /
                                    parseInt(sessionReport.summary.totalBudget.replace(/[^0-9]/g, ''))) * 100)}%
                            </div>
                        </div>
                    </div>
                </Card>

                {/* ML Performance */}
                <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
                    <div className="flex items-start justify-between">
                        <div className="rounded-full p-3 bg-purple-100">
                            <MdAutoGraph className="h-6 w-6 text-purple-600" />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                            AI
                        </span>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 font-medium">Performa ML</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">
                            {sessionReport.mlPerformance.accuracy}%
                        </h3>
                        <div className="flex justify-between items-center text-xs mt-3">
                            <span className="text-gray-600">Penghematan waktu: <span className="font-medium text-purple-600">{sessionReport.mlPerformance.timeReduction}</span></span>
                            <span className="flex items-center text-emerald-600">
                                <MdOutlineTrendingUp className="mr-1 h-4 w-4" />
                                {sessionReport.mlPerformance.comparisonToLastSession}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts Row 1: Results & Budget Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Proposal Results Pie Chart */}
                <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <MdDoneAll className="h-5 w-5 text-indigo-600" />
                            Hasil Akhir Proposal
                        </h2>
                        <button className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                            <MdOpenInNew className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="h-[320px] flex items-center justify-center">
                        <ReactApexChart
                            options={proposalResultsChartOptions}
                            series={[
                                sessionReport.summary.approved,
                                sessionReport.summary.revised,
                                sessionReport.summary.rejected
                            ]}
                            type="pie"
                            height={300}
                            width={400}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="bg-emerald-50 p-3 rounded-lg text-center">
                            <p className="text-emerald-800 text-xl font-bold">{sessionReport.summary.approved}</p>
                            <p className="text-emerald-600 text-xs">Disetujui</p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg text-center">
                            <p className="text-amber-800 text-xl font-bold">{sessionReport.summary.revised}</p>
                            <p className="text-amber-600 text-xs">Revisi</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg text-center">
                            <p className="text-red-800 text-xl font-bold">{sessionReport.summary.rejected}</p>
                            <p className="text-red-600 text-xs">Ditolak</p>
                        </div>
                    </div>
                </Card>

                {/* Budget Distribution Chart */}
                <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <MdOutlineAnalytics className="h-5 w-5 text-indigo-600" />
                            Distribusi Anggaran
                        </h2>
                        <button className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                            <MdOpenInNew className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="h-[320px] flex items-center justify-center">
                        <ReactApexChart
                            options={budgetDistChartOptions}
                            series={sessionReport.budgetDistribution.map(item => item.value)}
                            type="donut"
                            height={320}
                        />
                    </div>
                </Card>
            </div>

            {/* Charts Row 2: Faculty Participation & Evaluation Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Faculty Participation Bar Chart */}
                <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <MdPeople className="h-5 w-5 text-indigo-600" />
                            Partisipasi Fakultas
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Total: {sessionReport.summary.totalProposals} proposal</span>
                        </div>
                    </div>
                    <div className="h-[320px]">
                        <ReactApexChart
                            options={facultyChartOptions}
                            series={[{
                                name: "Persentase",
                                data: sessionReport.participantStats.facultyParticipation.map(item => item.percentage)
                            }]}
                            type="bar"
                            height={320}
                        />
                    </div>
                </Card>

                {/* Evaluation Metrics Radar Chart */}
                <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <MdInsights className="h-5 w-5 text-indigo-600" />
                            Metrik Evaluasi
                        </h2>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            Skala 0-100
                        </div>
                    </div>
                    <div className="h-[320px]">
                        <ReactApexChart
                            options={metricsRadarOptions}
                            series={[{
                                name: "Skor",
                                data: Object.values(sessionReport.evaluationMetrics).map(metric => metric.value)
                            }]}
                            type="radar"
                            height={320}
                        />
                    </div>
                </Card>
            </div>

            {/* Evaluation Metrics Detail & ML Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Evaluation Metrics Detail Table */}
                <div className="lg:col-span-2">
                    <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Detail Metrik Evaluasi</h2>
                            <div className="flex items-center gap-2">
                                <button className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                                    <MdFilter className="h-5 w-5" />
                                </button>
                                <button className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                                    <MdOutlineSort className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 text-gray-700 text-sm">
                                    <tr>
                                        <th className="px-4 py-3 text-left rounded-tl-lg">Kategori</th>
                                        <th className="px-4 py-3 text-center">Skor</th>
                                        <th className="px-4 py-3 text-center">Perubahan</th>
                                        <th className="px-4 py-3 text-center rounded-tr-lg">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {Object.entries(sessionReport.evaluationMetrics).map(([key, metric], index) => {
                                        // Capitalize the key for display
                                        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

                                        // Determine status based on score
                                        let status, statusClass;
                                        if (metric.value >= 90) {
                                            status = "Sangat Baik";
                                            statusClass = "bg-emerald-100 text-emerald-800";
                                        } else if (metric.value >= 80) {
                                            status = "Baik";
                                            statusClass = "bg-blue-100 text-blue-800";
                                        } else if (metric.value >= 70) {
                                            status = "Cukup";
                                            statusClass = "bg-amber-100 text-amber-800";
                                        } else {
                                            status = "Perlu Perhatian";
                                            statusClass = "bg-red-100 text-red-800";
                                        }

                                        return (
                                            <tr key={key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-4 py-3">
                                                    <span className="font-medium text-gray-800">{formattedKey}</span>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <div className="flex justify-center items-center">
                                                        <span className="flex items-center justify-center w-12 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-medium">
                                                            {metric.value}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <div className="flex justify-center items-center">
                                                        <span className={`flex items-center ${getTrendClass(metric.change)}`}>
                                                            {getTrendIcon(metric.change)}
                                                            <span className="ml-1">{metric.change}</span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                                                        {status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* ML Performance Card */}
                <div>
                    <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <MdAutoGraph className="h-5 w-5 text-indigo-600" />
                                Performa ML
                            </h2>
                        </div>
                        <div className="flex justify-center">
                            <ReactApexChart
                                options={mlPerformanceOptions}
                                series={[sessionReport.mlPerformance.accuracy]}
                                type="radialBar"
                                height={300}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Presisi</p>
                                <p className="text-lg font-medium text-gray-800">{sessionReport.mlPerformance.precision}%</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Recall</p>
                                <p className="text-lg font-medium text-gray-800">{sessionReport.mlPerformance.recall}%</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Penghematan Waktu</p>
                                <p className="text-lg font-medium text-gray-800">{sessionReport.mlPerformance.timeReduction}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Override Manual</p>
                                <p className="text-lg font-medium text-gray-800">{sessionReport.mlPerformance.manualOverrideRate}%</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Top Proposals Section */}
            <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <MdStar className="h-5 w-5 text-amber-500" />
                        Proposal Terbaik
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="relative w-64 hidden md:block">
                            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari proposal..."
                                className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <button className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                            <MdMoreHoriz className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-gray-700 text-sm">
                            <tr>
                                <th className="px-4 py-3 text-left rounded-tl-lg">ID</th>
                                <th className="px-4 py-3 text-left">Judul Proposal</th>
                                <th className="px-4 py-3 text-left">Departemen</th>
                                <th className="px-4 py-3 text-left">Ketua Peneliti</th>
                                <th className="px-4 py-3 text-center">Skor</th>
                                <th className="px-4 py-3 text-right">Anggaran</th>
                                <th className="px-4 py-3 text-center rounded-tr-lg">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sessionReport.topProposals.map((proposal, index) => (
                                <tr key={proposal.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-4 py-3">
                                        <span className="font-mono text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md">
                                            {proposal.id}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-gray-800 max-w-md truncate">
                                            {proposal.title}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {proposal.department}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {proposal.pi}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center">
                                            <div className="flex items-center px-2 py-1 rounded bg-indigo-50 text-indigo-700 font-medium">
                                                {index < 3 && <MdStar className="h-4 w-4 text-amber-500 mr-1" />}
                                                {proposal.score}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right font-medium text-gray-800">
                                        {proposal.budget}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center">
                                            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(proposal.status)}`}>
                                                {getStatusIcon(proposal.status)}
                                                <span>{proposal.status === 'approved' ? 'Disetujui' :
                                                    proposal.status === 'rejected' ? 'Ditolak' : 'Revisi'}</span>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* System Recommendations Section */}
            <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <MdLightbulbOutline className="h-5 w-5 text-amber-500" />
                        Rekomendasi Sistem
                    </h2>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-5 rounded-xl border border-amber-100 mb-6">
                    <div className="flex items-start gap-3">
                        <div className="bg-amber-100 rounded-full p-2 mt-1">
                            <MdInfo className="text-amber-600 h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-amber-800 font-medium mb-1">Ringkasan Evaluasi</h3>
                            <p className="text-amber-700 text-sm">
                                Berdasarkan analisis terhadap {sessionReport.summary.totalProposals} proposal dalam sesi ini,
                                system mengidentifikasi beberapa area yang dapat ditingkatkan untuk meningkatkan
                                kualitas proposal penelitian di masa mendatang.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {sessionReport.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all">
                            <div className="bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center text-indigo-600 font-medium flex-shrink-0">
                                {index + 1}
                            </div>
                            <div>
                                <p className="text-gray-700">{recommendation}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-6">
                    <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2">
                        <MdComment className="h-5 w-5" />
                        <span>Tambahkan Komentar</span>
                    </button>
                </div>
            </Card>

            {/* Summary Footer */}
            <div className="bg-gradient-to-br from-gray-100 to-indigo-50 rounded-2xl p-6 border border-indigo-100" data-aos="fade-up">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">Laporan Selesai</h3>
                        <p className="text-gray-600">
                            Terima kasih telah menggunakan Smart Proposal. Laporan ini dihasilkan pada {formatDate(sessionReport.completionDate)}.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
                            <MdHistory className="h-5 w-5" />
                            <span>Lihat Riwayat</span>
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2">
                            <MdPlayCircleOutline className="h-5 w-5" />
                            <span>Sesi Baru</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaporanAkhirSession;
