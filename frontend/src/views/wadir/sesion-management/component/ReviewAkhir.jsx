import React, { useState, useEffect } from 'react';
import {
    MdCheckCircle,
    MdCancel,
    MdPendingActions,
    MdMoreVert,
    MdOutlineAssignment,
    MdChevronRight,
    MdFilterList,
    MdSearch,
    MdSort,
    MdDone,
    MdClose,
    MdEdit,
    MdOutlineVerified,
    MdOutlineRestore,
    MdOutlineDescription,
    MdDownload,
    MdPlayArrow,
    MdStop,
    MdArrowUpward,
    MdArrowDownward,
    MdInfo,
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdOutlineAnalytics,
    MdOutlineBadge,
    MdRefresh
} from 'react-icons/md';
import { FiClock, FiAlertCircle, FiCheck } from 'react-icons/fi';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactApexChart from 'react-apexcharts';

const ReviewAkhir = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
        });
    }, []);

    // State for review session
    const [reviewSession] = useState({
        id: 'SES-2025-087',
        name: 'Validasi Proposal Q2 2025',
        status: 'in_progress',
        progress: 92,
        deadline: '2025-04-20T23:59:00',
        remainingTime: '2 hari, 8 jam',
        summary: {
            totalProposals: 52,
            reviewed: 48,
            pending: 4,
            approved: 34,
            revisionRequired: 9,
            rejected: 5,
            averageScore: 85.7,
            highestScore: 98.2,
            lowestScore: 67.3
        },
        metrics: {
            reviewTime: {
                average: '45 menit',
                fastest: '18 menit',
                slowest: '2 jam 15 menit'
            },
            approvalRate: 70.8,
            rejectionRate: 10.4,
            revisionRate: 18.8,
            consensusRate: 92.5,
            mlAccuracy: 87.9
        },
        reviewers: [
            { id: 1, name: 'Dr. Budi Santoso', count: 14, score: 4.8 },
            { id: 2, name: 'Prof. Amalia Wijaya', count: 12, score: 4.7 },
            { id: 3, name: 'Dr. Hendro Wicaksono', count: 10, score: 4.9 },
            { id: 4, name: 'Dr. Maya Putri', count: 8, score: 4.6 },
            { id: 5, name: 'Prof. Iwan Setiawan', count: 8, score: 4.8 }
        ]
    });

    // State for proposals that need final review
    const [proposals, setProposals] = useState([
        {
            id: 'PRO-452',
            title: 'Implementasi AI untuk Efisiensi Energi Kampus',
            department: 'Teknik Informatika',
            pi: 'Dr. Hendro Wicaksono',
            budget: 'Rp 425.000.000',
            score: 98.2,
            status: 'approved',
            reviewers: 3,
            mlRecommendation: 'approve',
            consensusLevel: 'high',
            selected: false,
            needsAttention: false
        },
        {
            id: 'PRO-417',
            title: 'Pengembangan Platform IoT untuk Smart Classroom',
            department: 'Teknik Elektro',
            pi: 'Prof. Amalia Safira',
            budget: 'Rp 380.000.000',
            score: 97.5,
            status: 'approved',
            reviewers: 3,
            mlRecommendation: 'approve',
            consensusLevel: 'high',
            selected: false,
            needsAttention: false
        },
        {
            id: 'PRO-438',
            title: 'Pemanfaatan Blockchain untuk Keamanan Data Penelitian',
            department: 'Teknik Informatika',
            pi: 'Dr. Maya Wijaya',
            budget: 'Rp 320.000.000',
            score: 92.4,
            status: 'approved',
            reviewers: 3,
            mlRecommendation: 'approve',
            consensusLevel: 'high',
            selected: false,
            needsAttention: false
        },
        {
            id: 'PRO-429',
            title: 'Analisis Penerapan Smart Grid pada Kampus Berkelanjutan',
            department: 'Teknik Elektro',
            pi: 'Dr. Hadi Supriyanto',
            budget: 'Rp 290.000.000',
            score: 85.7,
            status: 'needs_review',
            reviewers: 3,
            mlRecommendation: 'approve',
            consensusLevel: 'medium',
            selected: false,
            needsAttention: true
        },
        {
            id: 'PRO-431',
            title: 'Pengembangan Sistem Prediksi Kelulusan Mahasiswa',
            department: 'Teknik Informatika',
            pi: 'Dr. Rini Hastuti',
            budget: 'Rp 215.000.000',
            score: 83.5,
            status: 'needs_review',
            reviewers: 3,
            mlRecommendation: 'revise',
            consensusLevel: 'low',
            selected: false,
            needsAttention: true
        },
        {
            id: 'PRO-443',
            title: 'Sistem Monitoring Kualitas Air Berbasis IoT',
            department: 'Teknik Lingkungan',
            pi: 'Prof. Bambang Sutrisno',
            budget: 'Rp 375.000.000',
            score: 89.8,
            status: 'approved',
            reviewers: 3,
            mlRecommendation: 'approve',
            consensusLevel: 'high',
            selected: false,
            needsAttention: false
        },
        {
            id: 'PRO-419',
            title: 'Aplikasi Mobile untuk Pelayanan Kesehatan Mahasiswa',
            department: 'Informatika Kesehatan',
            pi: 'Dr. Siti Rahayu',
            budget: 'Rp 240.000.000',
            score: 76.8,
            status: 'needs_review',
            reviewers: 3,
            mlRecommendation: 'revise',
            consensusLevel: 'low',
            selected: false,
            needsAttention: true
        },
        {
            id: 'PRO-427',
            title: 'Pengembangan Augmented Reality untuk Pembelajaran',
            department: 'Teknik Informatika',
            pi: 'Dr. Agus Pranoto',
            budget: 'Rp 310.000.000',
            score: 88.3,
            status: 'approved',
            reviewers: 3,
            mlRecommendation: 'approve',
            consensusLevel: 'high',
            selected: false,
            needsAttention: false
        },
        {
            id: 'PRO-449',
            title: 'Studi Optimalisasi Manajemen Transportasi Kampus',
            department: 'Sistem Transportasi',
            pi: 'Prof. Ratna Dewi',
            budget: 'Rp 195.000.000',
            score: 81.5,
            status: 'needs_review',
            reviewers: 3,
            mlRecommendation: 'approve',
            consensusLevel: 'medium',
            selected: false,
            needsAttention: true
        }
    ]);

    // Filter and sort states
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('score');
    const [sortDirection, setSortDirection] = useState('desc');
    const [expandedProposal, setExpandedProposal] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [showBatchActions, setShowBatchActions] = useState(false);

    // Filter proposals based on filter and search
    const filteredProposals = proposals.filter(proposal => {
        // Apply status filter
        if (filter !== 'all' && proposal.status !== filter) {
            if (filter === 'attention' && !proposal.needsAttention) {
                return false;
            } else if (filter !== 'attention' && proposal.status !== filter) {
                return false;
            }
        }

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                proposal.title.toLowerCase().includes(query) ||
                proposal.id.toLowerCase().includes(query) ||
                proposal.pi.toLowerCase().includes(query) ||
                proposal.department.toLowerCase().includes(query)
            );
        }

        return true;
    });

    // Sort proposals
    const sortedProposals = [...filteredProposals].sort((a, b) => {
        let comparison = 0;

        switch (sortField) {
            case 'score':
                comparison = a.score - b.score;
                break;
            case 'title':
                comparison = a.title.localeCompare(b.title);
                break;
            case 'department':
                comparison = a.department.localeCompare(b.department);
                break;
            case 'pi':
                comparison = a.pi.localeCompare(b.pi);
                break;
            case 'budget':
                const aBudget = parseFloat(a.budget.replace(/[^\d]/g, ''));
                const bBudget = parseFloat(b.budget.replace(/[^\d]/g, ''));
                comparison = aBudget - bBudget;
                break;
            default:
                comparison = a.score - b.score;
        }

        return sortDirection === 'desc' ? -comparison : comparison;
    });

    // Handle selection of proposals
    const handleSelectProposal = (id) => {
        setProposals(proposals.map(p => {
            if (p.id === id) {
                return { ...p, selected: !p.selected };
            }
            return p;
        }));

        // Check if we need to show batch actions
        const newSelectedCount = proposals.filter(p => p.id === id ? !p.selected : p.selected).length;
        setShowBatchActions(newSelectedCount > 0);
    };

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        setProposals(proposals.map(p => ({
            ...p,
            selected: newSelectAll
        })));

        setShowBatchActions(newSelectAll);
    };

    // Batch approve handler
    const handleBatchApprove = () => {
        setProposals(proposals.map(p => {
            if (p.selected) {
                return { ...p, status: 'approved', selected: false };
            }
            return p;
        }));
        setSelectAll(false);
        setShowBatchActions(false);
    };

    // Batch revision handler
    const handleBatchRevision = () => {
        setProposals(proposals.map(p => {
            if (p.selected) {
                return { ...p, status: 'revision_required', selected: false };
            }
            return p;
        }));
        setSelectAll(false);
        setShowBatchActions(false);
    };

    // Batch reject handler
    const handleBatchReject = () => {
        setProposals(proposals.map(p => {
            if (p.selected) {
                return { ...p, status: 'rejected', selected: false };
            }
            return p;
        }));
        setSelectAll(false);
        setShowBatchActions(false);
    };

    // Get status badge class
    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-emerald-100 text-emerald-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'needs_review':
                return 'bg-amber-100 text-amber-800';
            case 'revision_required':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get status text
    const getStatusText = (status) => {
        switch (status) {
            case 'approved':
                return 'Disetujui';
            case 'rejected':
                return 'Ditolak';
            case 'needs_review':
                return 'Perlu Review';
            case 'revision_required':
                return 'Perlu Revisi';
            default:
                return status;
        }
    };

    // Get consensus level class
    const getConsensusClass = (level) => {
        switch (level) {
            case 'high':
                return 'bg-emerald-100 text-emerald-800';
            case 'medium':
                return 'bg-amber-100 text-amber-800';
            case 'low':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get score class based on value
    const getScoreClass = (score) => {
        if (score >= 90) return 'bg-emerald-100 text-emerald-800';
        if (score >= 80) return 'bg-blue-100 text-blue-800';
        if (score >= 70) return 'bg-amber-100 text-amber-800';
        return 'bg-red-100 text-red-800';
    };

    // Chart options for summary stats
    const chartOptions = {
        chart: {
            type: 'radialBar',
            height: 250,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            toolbar: {
                show: false
            }
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
        labels: ['Progress'],
        colors: ['#6366f1']
    };

    // Distribution chart options
    const distributionChartOptions = {
        chart: {
            type: 'pie',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            toolbar: {
                show: false
            }
        },
        colors: ['#10b981', '#f97316', '#ef4444'],
        labels: ['Disetujui', 'Perlu Revisi', 'Ditolak'],
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

    return (
        <div className="space-y-6">
            {/* Header with 3D Gradient Effect */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden" data-aos="fade-down">
                {/* Abstract background blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full -translate-x-10 translate-y-20 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex flex-wrap justify-between items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <MdOutlineDescription className="h-8 w-8" />
                                <h1 className="text-3xl font-bold">Review Akhir</h1>
                                <span className="px-3 py-1 bg-blue-500 rounded-full text-xs font-medium">
                                    Tahap Final
                                </span>
                            </div>
                            <p className="text-xl opacity-90">{reviewSession.name}</p>

                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <FiClock className="h-4 w-4" />
                                    <span>Sisa Waktu: {reviewSession.remainingTime}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-blue-500/30 px-3 py-1 rounded-full">
                                    <span>{reviewSession.summary.reviewed} dari {reviewSession.summary.totalProposals} proposal direview</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <button className="px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl transition-all flex items-center gap-2">
                                <MdRefresh className="h-5 w-5" />
                                <span>Refresh</span>
                            </button>
                            <button className="px-4 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-2 font-medium shadow-lg">
                                <MdPlayArrow className="h-5 w-5" />
                                <span>Selesaikan Review</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Progress Card */}
                <Card extra="p-6" data-aos="fade-up">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Progress Review</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {reviewSession.progress}% selesai
                        </span>
                    </div>

                    <div className="flex justify-center">
                        <ReactApexChart
                            options={chartOptions}
                            series={[reviewSession.progress]}
                            type="radialBar"
                            height={250}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="bg-indigo-50 p-3 rounded-lg text-center">
                            <p className="text-indigo-800 text-lg font-bold">{reviewSession.summary.totalProposals}</p>
                            <p className="text-indigo-600 text-xs">Total</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                            <p className="text-green-800 text-lg font-bold">{reviewSession.summary.reviewed}</p>
                            <p className="text-green-600 text-xs">Direview</p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg text-center">
                            <p className="text-amber-800 text-lg font-bold">{reviewSession.summary.pending}</p>
                            <p className="text-amber-600 text-xs">Tertunda</p>
                        </div>
                    </div>
                </Card>

                {/* Results Distribution */}
                <Card extra="p-6" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Distribusi Hasil</h3>
                    </div>

                    <div className="h-[250px] flex items-center justify-center">
                        <ReactApexChart
                            options={distributionChartOptions}
                            series={[
                                reviewSession.summary.approved,
                                reviewSession.summary.revisionRequired,
                                reviewSession.summary.rejected
                            ]}
                            type="pie"
                            height={220}
                        />
                    </div>
                </Card>

                {/* Key Metrics */}
                <Card extra="p-6" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Metrik Utama</h3>
                        <button className="p-1 rounded-full hover:bg-gray-100">
                            <MdInfo className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">Skor Rata-rata</span>
                                <span className={`px-2 py-1 rounded-lg text-sm font-medium ${getScoreClass(reviewSession.summary.averageScore)}`}>
                                    {reviewSession.summary.averageScore}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                <div
                                    className="bg-indigo-600 h-1.5 rounded-full"
                                    style={{ width: `${reviewSession.summary.averageScore}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 rounded-lg p-3">
                                <span className="text-gray-600 text-sm block mb-1">Akurasi ML</span>
                                <span className="text-xl font-bold text-indigo-700">{reviewSession.metrics.mlAccuracy}%</span>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <span className="text-gray-600 text-sm block mb-1">Tingkat Konsensus</span>
                                <span className="text-xl font-bold text-indigo-700">{reviewSession.metrics.consensusRate}%</span>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <span className="text-gray-600 text-sm block mb-1">Waktu Rata-rata</span>
                                <span className="text-xl font-bold text-indigo-700">{reviewSession.metrics.reviewTime.average}</span>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <span className="text-gray-600 text-sm block mb-1">Tingkat Persetujuan</span>
                                <span className="text-xl font-bold text-indigo-700">{reviewSession.metrics.approvalRate}%</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Proposals Table */}
            <Card extra="p-6" data-aos="fade-up">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Proposal untuk Review Akhir</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {filteredProposals.length} proposal memerlukan keputusan akhir
                        </p>
                    </div>

                    {/* Filter and Search */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari proposal..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <select
                                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">Semua Status</option>
                                <option value="needs_review">Perlu Review</option>
                                <option value="approved">Disetujui</option>
                                <option value="revision_required">Perlu Revisi</option>
                                <option value="rejected">Ditolak</option>
                                <option value="attention">Perlu Perhatian</option>
                            </select>
                            <MdFilterList className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        <div className="relative">
                            <select
                                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={sortField}
                                onChange={(e) => setSortField(e.target.value)}
                            >
                                <option value="score">Skor</option>
                                <option value="title">Judul</option>
                                <option value="department">Departemen</option>
                                <option value="pi">Peneliti</option>
                                <option value="budget">Anggaran</option>
                            </select>
                            <MdSort className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        <button
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                        >
                            {sortDirection === 'asc' ? (
                                <MdArrowUpward className="h-5 w-5 text-gray-600" />
                            ) : (
                                <MdArrowDownward className="h-5 w-5 text-gray-600" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Batch Actions */}
                {showBatchActions && (
                    <div className="bg-indigo-50 p-4 rounded-lg mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-indigo-800 font-medium mr-2">
                                {proposals.filter(p => p.selected).length} proposal dipilih
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-1"
                                onClick={handleBatchApprove}
                            >
                                <MdDone className="h-5 w-5" />
                                <span>Setujui</span>
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
                                onClick={handleBatchRevision}
                            >
                                <MdEdit className="h-5 w-5" />
                                <span>Revisi</span>
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-1"
                                onClick={handleBatchReject}
                            >
                                <MdClose className="h-5 w-5" />
                                <span>Tolak</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left rounded-tl-lg">
                                    <div className="flex items-center">
                                        <div
                                            className="cursor-pointer"
                                            onClick={handleSelectAll}
                                        >
                                            {selectAll ? (
                                                <MdCheckBox className="h-5 w-5 text-indigo-600" />
                                            ) : (
                                                <MdCheckBoxOutlineBlank className="h-5 w-5 text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left">Proposal</th>
                                <th className="px-4 py-3 text-center">Skor</th>
                                <th className="px-4 py-3 text-center hidden md:table-cell">Reviewers</th>
                                <th className="px-4 py-3 text-center hidden md:table-cell">Konsensus</th>
                                <th className="px-4 py-3 text-center">Status</th>
                                <th className="px-4 py-3 text-center rounded-tr-lg">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sortedProposals.length > 0 ? (
                                sortedProposals.map(proposal => (
                                    <React.Fragment key={proposal.id}>
                                        <tr className={`${expandedProposal === proposal.id ? 'bg-indigo-50' : (proposal.needsAttention ? 'bg-amber-50/30' : '')}`}>
                                            <td className="px-4 py-3">
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={() => handleSelectProposal(proposal.id)}
                                                >
                                                    {proposal.selected ? (
                                                        <MdCheckBox className="h-5 w-5 text-indigo-600" />
                                                    ) : (
                                                        <MdCheckBoxOutlineBlank className="h-5 w-5 text-gray-400" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">
                                                            {proposal.id}
                                                        </span>
                                                        {proposal.needsAttention && (
                                                            <FiAlertCircle className="h-4 w-4 text-amber-500" />
                                                        )}
                                                    </div>
                                                    <div className="font-medium text-gray-800 mt-1">{proposal.title}</div>
                                                    <div className="flex items-center text-gray-500 text-xs mt-1">
                                                        <span>
                                                            {proposal.pi} · {proposal.department} · {proposal.budget}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex justify-center">
                                                    <span className={`inline-flex items-center justify-center w-12 h-8 rounded-lg font-medium ${getScoreClass(proposal.score)}`}>
                                                        {proposal.score}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center hidden md:table-cell">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                                                    {proposal.reviewers}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center hidden md:table-cell">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConsensusClass(proposal.consensusLevel)}`}>
                                                    {proposal.consensusLevel === 'high' ? 'Tinggi' :
                                                        proposal.consensusLevel === 'medium' ? 'Sedang' : 'Rendah'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(proposal.status)}`}>
                                                    {getStatusText(proposal.status)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-center items-center gap-2">
                                                    <button
                                                        className="p-1 hover:bg-gray-100 rounded"
                                                        onClick={() => setExpandedProposal(expandedProposal === proposal.id ? null : proposal.id)}
                                                    >
                                                        {expandedProposal === proposal.id ? (
                                                            <MdKeyboardArrowUp className="h-6 w-6 text-indigo-600" />
                                                        ) : (
                                                            <MdKeyboardArrowDown className="h-6 w-6 text-gray-500" />
                                                        )}
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded">
                                                        <MdMoreVert className="h-6 w-6 text-gray-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Expanded View */}
                                        {expandedProposal === proposal.id && (
                                            <tr className="bg-indigo-50">
                                                <td colSpan={7} className="px-4 py-4">
                                                    <div className="bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
                                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                                            <div>
                                                                <h4 className="text-lg font-semibold text-gray-800">{proposal.title}</h4>
                                                                <p className="text-gray-600">{proposal.department} - {proposal.pi}</p>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-gray-600 text-sm">ML Recommendation:</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${proposal.mlRecommendation === 'approve' ? 'bg-emerald-100 text-emerald-800' :
                                                                        proposal.mlRecommendation === 'revise' ? 'bg-amber-100 text-amber-800' :
                                                                            'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {proposal.mlRecommendation === 'approve' ? 'Setujui' :
                                                                        proposal.mlRecommendation === 'revise' ? 'Revisi' : 'Tolak'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                            <div className="bg-gray-50 rounded-lg p-3">
                                                                <span className="text-gray-500 text-xs">Anggaran</span>
                                                                <div className="text-lg font-semibold text-gray-800">{proposal.budget}</div>
                                                            </div>
                                                            <div className="bg-gray-50 rounded-lg p-3">
                                                                <span className="text-gray-500 text-xs">Skor</span>
                                                                <div className="text-lg font-semibold text-gray-800">{proposal.score}</div>
                                                            </div>
                                                            <div className="bg-gray-50 rounded-lg p-3">
                                                                <span className="text-gray-500 text-xs">Konsensus</span>
                                                                <div className="text-lg font-semibold text-gray-800">
                                                                    {proposal.consensusLevel === 'high' ? 'Tinggi' :
                                                                        proposal.consensusLevel === 'medium' ? 'Sedang' : 'Rendah'}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {proposal.needsAttention && (
                                                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                                                                <div className="flex items-start gap-2">
                                                                    <FiAlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                                                                    <div>
                                                                        <p className="font-medium text-amber-800">Perhatian Diperlukan</p>
                                                                        <p className="text-amber-700 text-sm mt-1">
                                                                            Terdapat perbedaan pendapat antar reviewer atau antara rekomendasi ML dan penilaian reviewer.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="flex flex-wrap gap-2 justify-end mt-4">
                                                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center gap-1">
                                                                <MdOutlineDescription className="h-5 w-5" />
                                                                <span>Lihat Detail</span>
                                                            </button>
                                                            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-1">
                                                                <MdDone className="h-5 w-5" />
                                                                <span>Setujui</span>
                                                            </button>
                                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1">
                                                                <MdEdit className="h-5 w-5" />
                                                                <span>Revisi</span>
                                                            </button>
                                                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-1">
                                                                <MdClose className="h-5 w-5" />
                                                                <span>Tolak</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-4 py-10 text-center">
                                        <div className="flex flex-col items-center">
                                            <MdOutlineAssignment className="h-12 w-12 text-gray-300 mb-2" />
                                            <p className="text-gray-500">Tidak ada proposal yang ditemukan</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-gray-500">
                        Menampilkan {sortedProposals.length} dari {proposals.length} proposal
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1">
                            <MdOutlineRestore className="h-5 w-5" />
                            <span>Reset</span>
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-1">
                            <MdOutlineVerified className="h-5 w-5" />
                            <span>Selesaikan Semua Review</span>
                        </button>
                    </div>
                </div>
            </Card>

            {/* Top Reviewers */}
            <Card extra="p-6" data-aos="fade-up">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Reviewer Terbaik</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {reviewSession.reviewers.map(reviewer => (
                        <div key={reviewer.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-indigo-100 rounded-full p-2">
                                    <MdOutlineBadge className="h-5 w-5 text-indigo-600" />
                                </div>
                                <h4 className="font-medium text-gray-800 truncate">{reviewer.name}</h4>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FiCheck
                                            key={star}
                                            className={`h-4 w-4 ${star <= Math.floor(reviewer.score) ? 'text-amber-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                                    {reviewer.count} review
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Summary Footer */}
            <div className="bg-gradient-to-br from-gray-100 to-indigo-50 rounded-2xl p-6 border border-indigo-100" data-aos="fade-up">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">Selesaikan Review Akhir</h3>
                        <p className="text-gray-600">
                            Setelah semua proposal direview, Anda dapat melanjutkan ke pembuatan laporan akhir sesi.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
                            <MdStop className="h-5 w-5" />
                            <span>Tunda</span>
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2">
                            <MdPlayArrow className="h-5 w-5" />
                            <span>Lanjutkan ke Laporan</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewAkhir;
