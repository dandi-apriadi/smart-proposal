import React, { useState, useEffect } from 'react';
import {
    MdHistory,
    MdOutlineCalendarMonth,
    MdSearch,
    MdFilterList,
    MdDownload,
    MdMoreVert,
    MdVisibility,
    MdCheck,
    MdClose,
    MdInfo,
    MdArchive,
    MdOutlineAssessment,
    MdBarChart,
    MdOutlineAutoGraph,
    MdDateRange,
    MdAccessTime,
    MdPeople,
    MdFolderOpen,
    MdSort,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdRefresh,
    MdOutlineFilePresent,
    MdOutlineDescription,
    MdOutlineAssignment,
    MdOutlineTrendingUp,
    MdOutlineTrendingDown,
    MdChevronRight,
    MdOutlineFolder,
    MdOutlineDashboard
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactApexChart from 'react-apexcharts';

const SessionHistory = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
        });
    }, []);

    // Stats for timeline chart
    const [periodStats] = useState({
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        sessionCounts: [8, 10, 9, 12, 15, 14, 11, 9, 12, 10, 13, 11],
        approvalRates: [72, 68, 75, 79, 82, 80, 83, 79, 77, 75, 81, 82],
        revisionRates: [20, 22, 18, 14, 12, 15, 10, 16, 18, 19, 14, 13],
        rejectionRates: [8, 10, 7, 7, 6, 5, 7, 5, 5, 6, 5, 5]
    });

    const [selectedYear] = useState(2025);

    // Session history data
    const [sessions] = useState([
        {
            id: 'SES-2025-093',
            name: 'Validasi Proposal Penelitian Q2 2025',
            startDate: '2025-04-01T09:00:00',
            endDate: '2025-04-15T18:00:00',
            status: 'completed',
            proposals: 78,
            approved: 52,
            approvalRate: 66.7,
            budget: 'Rp 3.256.750.000',
            departments: ['Teknik Informatika', 'Teknik Elektro', 'Manajemen Bisnis'],
            participants: 24,
            mlAccuracy: 93.4,
            reportPath: '/reports/q2-2025.pdf'
        },
        {
            id: 'SES-2025-087',
            name: 'Validasi Proposal Q1 2025 (Batch 2)',
            startDate: '2025-03-10T10:30:00',
            endDate: '2025-03-25T17:00:00',
            status: 'completed',
            proposals: 65,
            approved: 45,
            approvalRate: 69.2,
            budget: 'Rp 2.850.500.000',
            departments: ['Teknik Informatika', 'Teknik Sipil', 'Ekonomi'],
            participants: 20,
            mlAccuracy: 91.2,
            reportPath: '/reports/q1-b2-2025.pdf'
        },
        {
            id: 'SES-2025-072',
            name: 'Validasi Proposal Q1 2025 (Batch 1)',
            startDate: '2025-02-15T09:00:00',
            endDate: '2025-03-01T18:00:00',
            status: 'completed',
            proposals: 59,
            approved: 38,
            approvalRate: 64.4,
            budget: 'Rp 2.570.000.000',
            departments: ['Teknik Informatika', 'Teknik Elektro', 'Teknik Sipil'],
            participants: 18,
            mlAccuracy: 89.8,
            reportPath: '/reports/q1-b1-2025.pdf'
        },
        {
            id: 'SES-2024-156',
            name: 'Validasi Proposal Q4 2024',
            startDate: '2024-12-05T10:00:00',
            endDate: '2024-12-20T17:30:00',
            status: 'completed',
            proposals: 82,
            approved: 57,
            approvalRate: 69.5,
            budget: 'Rp 3.890.250.000',
            departments: ['Teknik Informatika', 'Teknik Elektro', 'Ekonomi', 'Manajemen Bisnis'],
            participants: 26,
            mlAccuracy: 90.3,
            reportPath: '/reports/q4-2024.pdf'
        },
        {
            id: 'SES-2024-143',
            name: 'Validasi Proposal Khusus Penelitian AI 2024',
            startDate: '2024-11-10T09:00:00',
            endDate: '2024-11-20T18:00:00',
            status: 'completed',
            proposals: 45,
            approved: 32,
            approvalRate: 71.1,
            budget: 'Rp 1.950.000.000',
            departments: ['Teknik Informatika', 'Teknik Komputer'],
            participants: 15,
            mlAccuracy: 94.7,
            reportPath: '/reports/ai-2024.pdf'
        },
        {
            id: 'SES-2024-132',
            name: 'Validasi Proposal Q3 2024',
            startDate: '2024-09-01T09:00:00',
            endDate: '2024-09-15T17:00:00',
            status: 'completed',
            proposals: 71,
            approved: 48,
            approvalRate: 67.6,
            budget: 'Rp 3.100.500.000',
            departments: ['Teknik Informatika', 'Teknik Elektro', 'Teknik Mesin'],
            participants: 22,
            mlAccuracy: 88.9,
            reportPath: '/reports/q3-2024.pdf'
        },
        {
            id: 'SES-2024-118',
            name: 'Validasi Proposal Kerjasama Industri 2024',
            startDate: '2024-08-05T10:30:00',
            endDate: '2024-08-20T16:30:00',
            status: 'completed',
            proposals: 38,
            approved: 30,
            approvalRate: 78.9,
            budget: 'Rp 2.750.000.000',
            departments: ['Teknik Informatika', 'Manajemen Bisnis', 'Ekonomi'],
            participants: 18,
            mlAccuracy: 92.1,
            reportPath: '/reports/industry-2024.pdf'
        }
    ]);

    // Selected session for detailed view
    const [selectedSession, setSelectedSession] = useState(null);

    // Filter and search states
    const [searchQuery, setSearchQuery] = useState('');
    const [filterYear, setFilterYear] = useState('all');
    const [filterDepartment, setFilterDepartment] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Chart options for timeline
    const timelineOptions = {
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false
            },
            fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
        colors: ['#6366f1', '#f97316', '#ef4444'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [3, 3, 3],
            curve: 'smooth'
        },
        grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        },
        markers: {
            size: 4,
            colors: ['#fff'],
            strokeColors: ['#6366f1', '#f97316', '#ef4444'],
            strokeWidth: 2
        },
        xaxis: {
            categories: periodStats.months,
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }
            }
        },
        yaxis: {
            title: {
                text: 'Percentage (%)'
            },
            min: 0,
            max: 100
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (value) {
                    return value + "%";
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            fontSize: '12px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            offsetY: -30
        }
    };

    const timelineSeries = [
        {
            name: "Persetujuan",
            data: periodStats.approvalRates
        },
        {
            name: "Revisi",
            data: periodStats.revisionRates
        },
        {
            name: "Penolakan",
            data: periodStats.rejectionRates
        }
    ];

    // Chart options for session count
    const sessionCountOptions = {
        chart: {
            type: 'bar',
            height: 250,
            toolbar: {
                show: false
            },
            fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
        colors: ['#6366f1'],
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '60%',
                distributed: false
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4
        },
        xaxis: {
            categories: periodStats.months,
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }
            }
        },
        yaxis: {
            title: {
                text: 'Jumlah Sesi'
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " sesi";
                }
            }
        }
    };

    // Calculate average metrics
    const avgApprovalRate = sessions.reduce((sum, session) => sum + session.approvalRate, 0) / sessions.length;
    const avgParticipants = sessions.reduce((sum, session) => sum + session.participants, 0) / sessions.length;
    const avgMLAccuracy = sessions.reduce((sum, session) => sum + session.mlAccuracy, 0) / sessions.length;

    // Filter and sort sessions
    const filteredSessions = sessions.filter(session => {
        const matchesSearch = searchQuery === '' ||
            session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesYear = filterYear === 'all' ||
            new Date(session.startDate).getFullYear().toString() === filterYear;

        const matchesDepartment = filterDepartment === 'all' ||
            session.departments.includes(filterDepartment);

        return matchesSearch && matchesYear && matchesDepartment;
    });

    // Sort sessions
    const sortedSessions = [...filteredSessions].sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
            case 'date':
                comparison = new Date(a.startDate) - new Date(b.startDate);
                break;
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'proposals':
                comparison = a.proposals - b.proposals;
                break;
            case 'approval':
                comparison = a.approvalRate - b.approvalRate;
                break;
            default:
                comparison = new Date(a.startDate) - new Date(b.startDate);
        }

        return sortOrder === 'desc' ? -comparison : comparison;
    });

    // Pagination
    const totalPages = Math.ceil(sortedSessions.length / itemsPerPage);
    const paginatedSessions = sortedSessions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Get session years for filter
    const sessionYears = [...new Set(sessions.map(
        session => new Date(session.startDate).getFullYear()
    ))].sort().reverse();

    // Get all departments for filter
    const allDepartments = [...new Set(
        sessions.flatMap(session => session.departments)
    )].sort();

    // Back to list handler
    const handleBackToList = () => {
        setSelectedSession(null);
    };

    return (
        <div className="space-y-6">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden" data-aos="fade-down">
                {/* Abstract background blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full -translate-x-10 translate-y-20 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex flex-wrap justify-between items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <MdHistory className="h-8 w-8" />
                                <h1 className="text-3xl font-bold">Riwayat Sesi</h1>
                            </div>
                            <p className="text-xl opacity-90">
                                {selectedSession ? selectedSession.name : "Rekam jejak sesi validasi proposal"}
                            </p>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <button
                                className="px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl transition-all flex items-center gap-2"
                                onClick={() => setSelectedSession(null)}
                            >
                                <MdRefresh className="h-5 w-5" />
                                <span>Segarkan</span>
                            </button>
                            <button className="px-4 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-2 font-medium shadow-lg">
                                <MdDownload className="h-5 w-5" />
                                <span>Unduh Rekap</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {selectedSession ? (
                // Session Detail View
                <div className="space-y-6">
                    <div className="flex items-center">
                        <button
                            onClick={handleBackToList}
                            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                            <MdKeyboardArrowLeft className="h-5 w-5" />
                            <span>Kembali ke daftar</span>
                        </button>
                    </div>

                    {/* Session Info Card */}
                    <Card extra="p-6" data-aos="fade-up">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs rounded font-medium">
                                        {selectedSession.id}
                                    </span>
                                    <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">
                                        Selesai
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mt-2">{selectedSession.name}</h2>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <MdDateRange className="h-4 w-4 text-gray-500" />
                                        <span>{formatDate(selectedSession.startDate)} - {formatDate(selectedSession.endDate)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MdPeople className="h-4 w-4 text-gray-500" />
                                        <span>{selectedSession.participants} peserta</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1">
                                    <MdDownload className="h-5 w-5" />
                                    <span>Unduh Laporan</span>
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
                                    <MdArchive className="h-5 w-5" />
                                    <span>Arsip</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-indigo-100 p-2">
                                        <MdOutlineAssignment className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Proposal</p>
                                        <p className="text-xl font-bold text-gray-800">{selectedSession.proposals}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-3 px-2">
                                    <span>{selectedSession.approved} disetujui</span>
                                    <span>{selectedSession.proposals - selectedSession.approved} tidak disetujui</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-emerald-100 p-2">
                                        <MdOutlineTrendingUp className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Tingkat Persetujuan</p>
                                        <p className="text-xl font-bold text-gray-800">{selectedSession.approvalRate}%</p>
                                    </div>
                                </div>
                                <div className="w-full bg-emerald-200 rounded-full h-1.5 mt-3">
                                    <div
                                        className="bg-emerald-600 h-1.5 rounded-full"
                                        style={{ width: `${selectedSession.approvalRate}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-blue-100 p-2">
                                        <MdBarChart className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Anggaran Dialokasikan</p>
                                        <p className="text-xl font-bold text-gray-800">{selectedSession.budget}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-3">Departemen yang Berpartisipasi</h3>
                                <div className="space-y-2">
                                    {selectedSession.departments.map((dept, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700">{dept}</span>
                                            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                                                {Math.round(100 / selectedSession.departments.length)}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-700 mb-3">Metrik Kinerja</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">Akurasi ML</span>
                                        <span className="font-semibold">{selectedSession.mlAccuracy}%</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">Waktu Review Rata-rata</span>
                                        <span className="font-semibold">45 menit</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">Tingkat Konsensus Reviewer</span>
                                        <span className="font-semibold">87%</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">Tingkat Pemanfaatan AI</span>
                                        <span className="font-semibold">92%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Additional Session Data */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card extra="p-6" data-aos="fade-up">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Top Proposal</h3>
                            <div className="space-y-3">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="p-3 bg-gray-50 rounded-lg hover:shadow-md transition-all">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium ${index === 0 ? 'bg-amber-400 text-white' :
                                                    index === 1 ? 'bg-gray-300 text-gray-800' :
                                                        'bg-amber-700 text-white'
                                                }`}>
                                                {index + 1}
                                            </span>
                                            <h4 className="font-medium text-gray-800 line-clamp-1">
                                                {index === 0 ? 'Implementasi AI untuk Efisiensi Energi' :
                                                    index === 1 ? 'Sistem IoT untuk Smart Campus' :
                                                        'Pengembangan Platform Blockchain'}
                                            </h4>
                                        </div>
                                        <div className="ml-7">
                                            <p className="text-xs text-gray-500">
                                                {index === 0 ? 'Teknik Informatika • Dr. Hendro' :
                                                    index === 1 ? 'Teknik Elektro • Prof. Amalia' :
                                                        'Teknik Informatika • Dr. Maya'}
                                            </p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                                    {index === 0 ? '98.5' : index === 1 ? '97.2' : '96.8'} skor
                                                </span>
                                                <span className="text-xs text-gray-600">
                                                    {index === 0 ? 'Rp 425jt' : index === 1 ? 'Rp 380jt' : 'Rp 510jt'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-800 py-2">
                                    Lihat semua proposal
                                </button>
                            </div>
                        </Card>

                        <Card extra="p-6" data-aos="fade-up">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Top Reviewer</h3>
                            <div className="space-y-3">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-indigo-100 h-9 w-9 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {index === 0 ? 'Dr. Budi Santoso' :
                                                        index === 1 ? 'Dr. Maya Wijaya' :
                                                            'Prof. Hendro Wicaksono'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {index === 0 ? '14 reviews' :
                                                        index === 1 ? '12 reviews' :
                                                            '10 reviews'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, starIndex) => (
                                                <svg key={starIndex} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-800 py-2">
                                    Lihat semua reviewer
                                </button>
                            </div>
                        </Card>

                        <Card extra="p-6" data-aos="fade-up">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Dokumen & Arsip</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-gray-50 rounded-lg hover:shadow-md transition-all flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-red-100 p-2">
                                            <MdOutlineFilePresent className="h-5 w-5 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Laporan Final</p>
                                            <p className="text-xs text-gray-500">PDF • 2.3 MB</p>
                                        </div>
                                    </div>
                                    <button className="text-indigo-600 hover:text-indigo-800">
                                        <MdDownload className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="p-3 bg-gray-50 rounded-lg hover:shadow-md transition-all flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-green-100 p-2">
                                            <MdOutlineDescription className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Rekap Statistik</p>
                                            <p className="text-xs text-gray-500">Excel • 1.8 MB</p>
                                        </div>
                                    </div>
                                    <button className="text-indigo-600 hover:text-indigo-800">
                                        <MdDownload className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="p-3 bg-gray-50 rounded-lg hover:shadow-md transition-all flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-blue-100 p-2">
                                            <MdOutlineFolder className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Arsip Dokumen</p>
                                            <p className="text-xs text-gray-500">ZIP • 52.7 MB</p>
                                        </div>
                                    </div>
                                    <button className="text-indigo-600 hover:text-indigo-800">
                                        <MdDownload className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="p-3 bg-gray-50 rounded-lg hover:shadow-md transition-all flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-purple-100 p-2">
                                            <MdOutlineDashboard className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Dashboard Data</p>
                                            <p className="text-xs text-gray-500">Interactive • Online</p>
                                        </div>
                                    </div>
                                    <button className="text-indigo-600 hover:text-indigo-800">
                                        <MdVisibility className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            ) : (
                // Session List View
                <div className="space-y-6">
                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" data-aos="fade-up">
                        <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
                            <div className="flex items-start justify-between">
                                <div className="rounded-full p-3 bg-indigo-100">
                                    <MdHistory className="h-6 w-6 text-indigo-600" />
                                </div>
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                                    Total
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 font-medium">Total Sesi</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                    {sessions.length}
                                </h3>
                                <div className="text-xs text-gray-500 mt-3">
                                    <span className="text-indigo-600 font-medium">{sessions.filter(s => new Date(s.startDate).getFullYear() === 2025).length}</span> sesi di tahun 2025
                                </div>
                            </div>
                        </Card>

                        <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
                            <div className="flex items-start justify-between">
                                <div className="rounded-full p-3 bg-emerald-100">
                                    <MdCheck className="h-6 w-6 text-emerald-600" />
                                </div>
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                                    Avg
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 font-medium">Rata-rata Persetujuan</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                    {avgApprovalRate.toFixed(1)}%
                                </h3>
                                <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3">
                                    <div
                                        className="bg-emerald-500 h-1.5 rounded-full"
                                        style={{ width: `${avgApprovalRate}%` }}
                                    ></div>
                                </div>
                            </div>
                        </Card>

                        <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
                            <div className="flex items-start justify-between">
                                <div className="rounded-full p-3 bg-blue-100">
                                    <MdPeople className="h-6 w-6 text-blue-600" />
                                </div>
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                    Avg
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 font-medium">Rata-rata Peserta</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                    {avgParticipants.toFixed(1)}
                                </h3>
                                <div className="text-xs text-gray-500 mt-3">
                                    Dari <span className="font-medium text-blue-600">{allDepartments.length}</span> departemen berbeda
                                </div>
                            </div>
                        </Card>

                        <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
                            <div className="flex items-start justify-between">
                                <div className="rounded-full p-3 bg-purple-100">
                                    <MdOutlineAutoGraph className="h-6 w-6 text-purple-600" />
                                </div>
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                                    Avg
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 font-medium">Akurasi ML Rata-rata</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                    {avgMLAccuracy.toFixed(1)}%
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-3">
                                    <MdOutlineTrendingUp className="h-4 w-4" />
                                    <span>+2.5% dari tahun sebelumnya</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Performance Timeline */}
                    <Card extra="p-6" data-aos="fade-up">
                        <div className="flex flex-wrap justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Tren Performa {selectedYear}</h2>
                                <p className="text-sm text-gray-500">
                                    Persentase persetujuan, revisi, dan penolakan proposal
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5">
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                </select>
                                <button className="p-1.5 rounded-md border border-gray-300 hover:bg-gray-50">
                                    <MdDownload className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                        </div>
                        <div className="h-[350px]">
                            <ReactApexChart
                                options={timelineOptions}
                                series={timelineSeries}
                                type="line"
                                height={350}
                            />
                        </div>
                    </Card>

                    {/* Session Count */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <Card extra="p-6" data-aos="fade-up">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold text-gray-800">Jumlah Sesi</h2>
                                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                                        {selectedYear}
                                    </span>
                                </div>
                                <div className="h-[250px]">
                                    <ReactApexChart
                                        options={sessionCountOptions}
                                        series={[{
                                            name: "Jumlah Sesi",
                                            data: periodStats.sessionCounts
                                        }]}
                                        type="bar"
                                        height={250}
                                    />
                                </div>
                                <div className="mt-3 flex justify-between text-xs text-gray-500">
                                    <span>Total: {periodStats.sessionCounts.reduce((a, b) => a + b, 0)} sesi</span>
                                    <span>Rata-rata: {(periodStats.sessionCounts.reduce((a, b) => a + b, 0) / 12).toFixed(1)} sesi/bulan</span>
                                </div>
                            </Card>
                        </div>

                        <div className="lg:col-span-2">
                            <Card extra="p-6" data-aos="fade-up">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-bold text-gray-800">Sesi Terbaru</h2>
                                    <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                                        <span>Lihat semua</span>
                                        <MdChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {sessions.slice(0, 3).map(session => (
                                        <div
                                            key={session.id}
                                            className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 hover:bg-indigo-50/30 rounded-lg transition-colors cursor-pointer"
                                            onClick={() => setSelectedSession(session)}
                                        >
                                            <div className="mb-3 md:mb-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">
                                                        {session.id}
                                                    </span>
                                                    <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                                                        {new Date(session.startDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                                    </span>
                                                </div>
                                                <h3 className="font-medium text-gray-800">{session.name}</h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {formatDate(session.startDate)} - {formatDate(session.endDate)}
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <div className="bg-white px-2 py-1 rounded border border-gray-200 text-xs">
                                                    <span className="text-gray-500">Proposal:</span>
                                                    <span className="font-medium text-gray-800 ml-1">{session.proposals}</span>
                                                </div>
                                                <div className="bg-white px-2 py-1 rounded border border-gray-200 text-xs">
                                                    <span className="text-gray-500">Persetujuan:</span>
                                                    <span className="font-medium text-emerald-600 ml-1">{session.approvalRate}%</span>
                                                </div>
                                                <div className="bg-white px-2 py-1 rounded border border-gray-200 text-xs">
                                                    <span className="text-gray-500">Peserta:</span>
                                                    <span className="font-medium text-gray-800 ml-1">{session.participants}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Sessions List */}
                    <Card extra="p-6" data-aos="fade-up">
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Daftar Sesi</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {filteredSessions.length} sesi ditemukan
                                </p>
                            </div>

                            {/* Filter and Search */}
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative">
                                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari sesi..."
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div className="relative">
                                    <select
                                        className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        value={filterYear}
                                        onChange={(e) => setFilterYear(e.target.value)}
                                    >
                                        <option value="all">Semua Tahun</option>
                                        {sessionYears.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                    <MdFilterList className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>

                                <div className="relative">
                                    <select
                                        className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        value={filterDepartment}
                                        onChange={(e) => setFilterDepartment(e.target.value)}
                                    >
                                        <option value="all">Semua Departemen</option>
                                        {allDepartments.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                    <MdFilterList className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Sessions Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 text-gray-700 text-sm">
                                    <tr>
                                        <th
                                            className="px-4 py-3 text-left rounded-tl-lg cursor-pointer"
                                            onClick={() => {
                                                if (sortBy === 'date') {
                                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                                } else {
                                                    setSortBy('date');
                                                    setSortOrder('desc');
                                                }
                                            }}
                                        >
                                            <div className="flex items-center">
                                                <span>Tanggal</span>
                                                {sortBy === 'date' && (
                                                    <MdSort className="ml-1" />
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            className="px-4 py-3 text-left cursor-pointer"
                                            onClick={() => {
                                                if (sortBy === 'name') {
                                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                                } else {
                                                    setSortBy('name');
                                                    setSortOrder('asc');
                                                }
                                            }}
                                        >
                                            <div className="flex items-center">
                                                <span>Nama Sesi</span>
                                                {sortBy === 'name' && (
                                                    <MdSort className="ml-1" />
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            className="px-4 py-3 text-center cursor-pointer"
                                            onClick={() => {
                                                if (sortBy === 'proposals') {
                                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                                } else {
                                                    setSortBy('proposals');
                                                    setSortOrder('desc');
                                                }
                                            }}
                                        >
                                            <div className="flex items-center justify-center">
                                                <span>Proposal</span>
                                                {sortBy === 'proposals' && (
                                                    <MdSort className="ml-1" />
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            className="px-4 py-3 text-center cursor-pointer"
                                            onClick={() => {
                                                if (sortBy === 'approval') {
                                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                                } else {
                                                    setSortBy('approval');
                                                    setSortOrder('desc');
                                                }
                                            }}
                                        >
                                            <div className="flex items-center justify-center">
                                                <span>Persetujuan</span>
                                                {sortBy === 'approval' && (
                                                    <MdSort className="ml-1" />
                                                )}
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-center hidden md:table-cell">ML Akurasi</th>
                                        <th className="px-4 py-3 text-center rounded-tr-lg">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginatedSessions.length > 0 ? (
                                        paginatedSessions.map((session, index) => (
                                            <tr
                                                key={session.id}
                                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                                onClick={() => setSelectedSession(session)}
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-800">
                                                            {formatDate(session.startDate).split(',')[0]}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(session.startDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">
                                                                {session.id}
                                                            </span>
                                                        </div>
                                                        <span className="font-medium text-gray-800 mt-1">
                                                            {session.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <span className="font-medium text-gray-800">{session.proposals}</span>
                                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                                            <span className="text-emerald-600">{session.approved}</span>
                                                            <span className="mx-1">/</span>
                                                            <span>{session.proposals - session.approved}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <div className="inline-block w-16 bg-gray-100 rounded-full h-1.5">
                                                        <div
                                                            className="bg-emerald-500 h-1.5 rounded-full"
                                                            style={{ width: `${session.approvalRate}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="mt-1 text-sm font-medium text-gray-800">
                                                        {session.approvalRate}%
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center hidden md:table-cell">
                                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${session.mlAccuracy >= 93 ? 'bg-emerald-100 text-emerald-800' :
                                                            session.mlAccuracy >= 90 ? 'bg-blue-100 text-blue-800' :
                                                                'bg-amber-100 text-amber-800'
                                                        }`}>
                                                        {session.mlAccuracy}%
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            className="p-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedSession(session);
                                                            }}
                                                        >
                                                            <MdVisibility className="h-5 w-5 text-indigo-600" />
                                                        </button>
                                                        <button
                                                            className="p-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // Download report logic
                                                            }}
                                                        >
                                                            <MdDownload className="h-5 w-5 text-blue-600" />
                                                        </button>
                                                        <button
                                                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // More options logic
                                                            }}
                                                        >
                                                            <MdMoreVert className="h-5 w-5 text-gray-600" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center">
                                                <div className="flex flex-col items-center">
                                                    <MdInfo className="h-12 w-12 text-gray-300 mb-2" />
                                                    <p className="text-gray-500">Tidak ada sesi yang ditemukan</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-between items-center mt-5">
                                <div className="text-sm text-gray-500">
                                    Menampilkan {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredSessions.length)} dari {filteredSessions.length} sesi
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`p-1.5 rounded-lg border ${currentPage === 1 ? 'border-gray-200 text-gray-400' : 'border-gray-300 hover:bg-gray-50 text-gray-600'
                                            }`}
                                    >
                                        <MdKeyboardArrowLeft className="h-5 w-5" />
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-9 h-9 rounded-lg ${currentPage === page
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'border border-gray-300 hover:bg-gray-50 text-gray-600'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`p-1.5 rounded-lg border ${currentPage === totalPages ? 'border-gray-200 text-gray-400' : 'border-gray-300 hover:bg-gray-50 text-gray-600'
                                            }`}
                                    >
                                        <MdKeyboardArrowRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </div>
    );
};

export default SessionHistory;
