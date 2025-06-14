import React, { useState, useEffect } from 'react';
import {
    MdOutlineAssignmentTurnedIn,
    MdOutlineAssessment,
    MdSave,
    MdDownload,
    MdArchive,
    MdClose,
    MdCheck,
    MdWarning,
    MdInfo,
    MdAccessTime,
    MdCalendarToday,
    MdPeople,
    MdFolder,
    MdBarChart,
    MdOutlineCloudDone,
    MdOutlineCancel,
    MdOutlineAssignment,
    MdOutlineSecurity,
    MdOutlineGroupWork,
    MdOutlineTimer,
    MdChevronRight,
    MdDateRange,
    MdFolderOpen,
    MdHistory,
    MdEmail,
    MdPlayArrow
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactApexChart from 'react-apexcharts';

const CloseSession = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
        });
    }, []);

    // Session data state
    const [sessionData] = useState({
        id: 'SES-2025-093',
        name: 'Validasi Proposal Penelitian Q2 2025',
        startDate: '2025-04-01T09:00:00',
        endDate: '2025-04-15T18:00:00',
        duration: '14 hari, 9 jam, 42 menit',
        status: 'in_review',
        reviewCompletion: 100,
        validationCompletion: 97,
        stats: {
            totalProposals: 78,
            approved: 52,
            rejected: 11,
            revised: 15,
            totalBudget: 'Rp 4.325.500.000',
            allocatedBudget: 'Rp 3.256.750.000',
            reviewers: 24,
            departments: 7,
            mlAccuracy: 93.4
        },
        activitySummary: {
            totalActions: 486,
            comments: 253,
            uploads: 127,
            revisions: 94,
            approvals: 52
        },
        pendingItems: {
            pendingApprovals: 2,
            pendingReviews: 0,
            pendingDocuments: 3
        },
        topPerformers: [
            { name: 'Dr. Budi Santoso', reviews: 14, department: 'Teknik Informatika' },
            { name: 'Dr. Maya Wijaya', reviews: 12, department: 'Teknik Informatika' },
            { name: 'Prof. Hendro Wicaksono', reviews: 10, department: 'Teknik Elektro' }
        ]
    });

    // Form states
    const [isClosingConfirmed, setIsClosingConfirmed] = useState(false);
    const [closingReason, setClosingReason] = useState('');
    const [sendNotification, setSendNotification] = useState(true);
    const [archiveData, setArchiveData] = useState(true);
    const [generateReport, setGenerateReport] = useState(true);
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingComplete, setProcessingComplete] = useState(false);
    const [processingMessage, setProcessingMessage] = useState('');
    const [processingStep, setProcessingStep] = useState(0);

    // Alert states
    const [showWarning, setShowWarning] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    // Handle form submission
    const handleCloseSession = () => {
        if (!isClosingConfirmed) {
            setIsClosingConfirmed(true);
            return;
        }

        setIsSubmitting(true);
        setIsProcessing(true);
        setProcessingStep(1);
        setProcessingMessage('Memvalidasi status sesi...');

        // Simulate API calls with timeouts
        const processSteps = [
            { message: 'Memvalidasi status sesi...', time: 1500 },
            { message: 'Menghitung statistik akhir...', time: 2000 },
            { message: 'Memastikan semua data terekam...', time: 1800 },
            { message: generateReport ? 'Membuat laporan akhir...' : 'Melewati pembuatan laporan...', time: 2500 },
            { message: archiveData ? 'Mengarsipkan data sesi...' : 'Melewati pengarsipan data...', time: 2000 },
            { message: sendNotification ? 'Mengirim notifikasi penutupan...' : 'Melewati pengiriman notifikasi...', time: 1500 },
            { message: 'Finalisasi penutupan sesi...', time: 1800 }
        ];

        let currentStep = 0;
        const intervalId = setInterval(() => {
            currentStep++;
            if (currentStep < processSteps.length) {
                setProcessingStep(currentStep + 1);
                setProcessingMessage(processSteps[currentStep].message);
            } else {
                clearInterval(intervalId);
                setProcessingComplete(true);
                setShowSuccess(true);
            }
        }, 2000); // Change messages every 2 seconds
    };

    // Chart options for completion radial chart
    const completionChartOptions = {
        chart: {
            height: 280,
            type: 'radialBar',
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
        labels: ['Completed'],
        colors: ['#6366f1']
    };

    // Chart options for results pie chart
    const resultsChartOptions = {
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
        }]
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Define the step descriptions for the closing process
    const closingSteps = [
        {
            icon: <MdOutlineAssessment className="h-6 w-6 text-blue-600" />,
            title: 'Validasi Status Sesi',
            description: 'Memastikan semua proposal telah direview dan tidak ada item tertunda'
        },
        {
            icon: <MdBarChart className="h-6 w-6 text-purple-600" />,
            title: 'Finalisasi Statistik',
            description: 'Menghitung dan memfinalisasi semua statistik dan metrik performa'
        },
        {
            icon: <MdOutlineGroupWork className="h-6 w-6 text-emerald-600" />,
            title: 'Konfirmasi Keputusan',
            description: 'Finalisasi keputusan untuk semua proposal dalam sesi'
        },
        {
            icon: <MdDownload className="h-6 w-6 text-amber-600" />,
            title: 'Pembuatan Laporan',
            description: 'Generate laporan ringkasan dan detail untuk semua aktivitas'
        },
        {
            icon: <MdArchive className="h-6 w-6 text-indigo-600" />,
            title: 'Pengarsipan Data',
            description: 'Arsip semua data sesi untuk referensi dan audit di masa mendatang'
        },
        {
            icon: <MdEmail className="h-6 w-6 text-red-600" />,
            title: 'Notifikasi Penutupan',
            description: 'Mengirim notifikasi kepada semua peserta tentang penutupan sesi'
        },
        {
            icon: <MdOutlineCloudDone className="h-6 w-6 text-green-600" />,
            title: 'Penutupan Sesi',
            description: 'Finalisasi penutupan sesi dan penguncian semua perubahan'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header with 3D Gradient Effect */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden" data-aos="fade-down">
                {/* Abstract background blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full -translate-x-10 translate-y-20 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex flex-wrap justify-between items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <MdOutlineAssignmentTurnedIn className="h-8 w-8" />
                                <h1 className="text-3xl font-bold">Tutup Sesi</h1>
                                <span className="px-3 py-1 bg-blue-500/50 backdrop-blur-sm rounded-full text-xs font-medium border border-blue-400/20">
                                    Tahap Final
                                </span>
                            </div>
                            <p className="text-xl opacity-90">{sessionData.name}</p>

                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <MdCalendarToday className="h-4 w-4" />
                                    <span>{formatDate(sessionData.startDate)} - {formatDate(sessionData.endDate)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MdAccessTime className="h-4 w-4" />
                                    <span>Durasi: {sessionData.duration}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <button
                                className="px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl transition-all flex items-center gap-2"
                                onClick={() => window.history.back()}
                            >
                                <MdClose className="h-5 w-5" />
                                <span>Kembali</span>
                            </button>
                            {!isClosingConfirmed && !isProcessing && !processingComplete && (
                                <button
                                    className="px-4 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-2 font-medium shadow-lg"
                                    onClick={() => setIsClosingConfirmed(true)}
                                >
                                    <MdOutlineCloudDone className="h-5 w-5" />
                                    <span>Tutup Sesi Sekarang</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Warning Alert if there are pending items */}
            {showWarning && sessionData.pendingItems &&
                (sessionData.pendingItems.pendingApprovals > 0 ||
                    sessionData.pendingItems.pendingReviews > 0 ||
                    sessionData.pendingItems.pendingDocuments > 0) && (
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-lg relative" data-aos="fade-up">
                        <button
                            className="absolute top-3 right-3 text-amber-500 hover:text-amber-700"
                            onClick={() => setShowWarning(false)}
                        >
                            <MdClose className="h-5 w-5" />
                        </button>
                        <div className="flex gap-4">
                            <div>
                                <MdWarning className="h-7 w-7 text-amber-500" />
                            </div>
                            <div>
                                <h3 className="text-amber-800 font-medium mb-1">Perhatian: Item yang Belum Selesai</h3>
                                <p className="text-amber-700">
                                    Ada beberapa item yang belum selesai dalam sesi ini. Penutupan sesi akan menandai semua item sebagai selesai.
                                </p>
                                <div className="flex gap-4 mt-3">
                                    {sessionData.pendingItems.pendingApprovals > 0 && (
                                        <div className="bg-amber-100 px-3 py-1.5 rounded-lg">
                                            <span className="text-amber-800 font-medium">{sessionData.pendingItems.pendingApprovals}</span>
                                            <span className="text-amber-700"> persetujuan tertunda</span>
                                        </div>
                                    )}
                                    {sessionData.pendingItems.pendingReviews > 0 && (
                                        <div className="bg-amber-100 px-3 py-1.5 rounded-lg">
                                            <span className="text-amber-800 font-medium">{sessionData.pendingItems.pendingReviews}</span>
                                            <span className="text-amber-700"> review tertunda</span>
                                        </div>
                                    )}
                                    {sessionData.pendingItems.pendingDocuments > 0 && (
                                        <div className="bg-amber-100 px-3 py-1.5 rounded-lg">
                                            <span className="text-amber-800 font-medium">{sessionData.pendingItems.pendingDocuments}</span>
                                            <span className="text-amber-700"> dokumen tertunda</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            {/* Success Alert after completion */}
            {showSuccess && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-lg relative" data-aos="fade-up">
                    <button
                        className="absolute top-3 right-3 text-emerald-500 hover:text-emerald-700"
                        onClick={() => setShowSuccess(false)}
                    >
                        <MdClose className="h-5 w-5" />
                    </button>
                    <div className="flex gap-4">
                        <div>
                            <MdCheck className="h-7 w-7 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="text-emerald-800 font-medium mb-1">Sesi Berhasil Ditutup</h3>
                            <p className="text-emerald-700">
                                Sesi "{sessionData.name}" telah berhasil ditutup dan diarsipkan. Semua data telah direkam dengan aman.
                            </p>
                            <div className="flex gap-2 mt-3">
                                <button className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
                                    <MdDownload className="h-4 w-4" />
                                    <span>Unduh Laporan</span>
                                </button>
                                <button className="bg-white border border-emerald-600 text-emerald-600 px-3 py-1.5 rounded-lg flex items-center gap-1">
                                    <MdPlayArrow className="h-4 w-4" />
                                    <span>Mulai Sesi Baru</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Session Stats */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Session Summary Card */}
                    <Card extra="p-6" data-aos="fade-up">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-800">Ringkasan Sesi</h2>
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                                ID: {sessionData.id}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-indigo-100 p-2">
                                        <MdOutlineAssignment className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Proposal</p>
                                        <p className="text-xl font-bold text-gray-800">{sessionData.stats.totalProposals}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-3 px-2">
                                    <span>{sessionData.stats.approved} disetujui</span>
                                    <span>{sessionData.stats.revised} revisi</span>
                                    <span>{sessionData.stats.rejected} ditolak</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-emerald-100 p-2">
                                        <MdBarChart className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Anggaran Dialokasikan</p>
                                        <p className="text-xl font-bold text-gray-800">{sessionData.stats.allocatedBudget}</p>
                                    </div>
                                </div>
                                <div className="mt-3 text-xs text-gray-500 px-2">
                                    <span>Dari total pengajuan {sessionData.stats.totalBudget}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-purple-100 p-2">
                                        <MdPeople className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Peserta</p>
                                        <p className="text-xl font-bold text-gray-800">{sessionData.stats.reviewers} reviewer</p>
                                    </div>
                                </div>
                                <div className="mt-3 text-xs text-gray-500 px-2">
                                    <span>Dari {sessionData.stats.departments} departemen</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-base font-semibold text-gray-700 mb-3">Hasil Proposal</h3>
                                <div className="h-[280px] flex items-center justify-center">
                                    <ReactApexChart
                                        options={resultsChartOptions}
                                        series={[sessionData.stats.approved, sessionData.stats.revised, sessionData.stats.rejected]}
                                        type="pie"
                                        height={250}
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base font-semibold text-gray-700 mb-3">Ringkasan Aktivitas</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">Total Aktivitas</span>
                                        <span className="font-semibold">{sessionData.activitySummary.totalActions}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">Komentar</span>
                                        <span className="font-semibold">{sessionData.activitySummary.comments}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">Unggahan Dokumen</span>
                                        <span className="font-semibold">{sessionData.activitySummary.uploads}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">Revisi</span>
                                        <span className="font-semibold">{sessionData.activitySummary.revisions}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">Persetujuan</span>
                                        <span className="font-semibold">{sessionData.activitySummary.approvals}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Top Performers Card */}
                    <Card extra="p-6" data-aos="fade-up">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Kontributor Terbaik</h2>

                        <div className="space-y-3">
                            {sessionData.topPerformers.map((performer, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-indigo-100 h-10 w-10 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">{performer.name}</p>
                                            <p className="text-sm text-gray-500">{performer.department}</p>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                                        {performer.reviews} reviews
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Close Session Form */}
                <div className="space-y-6">
                    {/* Completion Status Card */}
                    <Card extra="p-6" data-aos="fade-up">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Status Penyelesaian</h2>

                        <div className="flex justify-center">
                            <ReactApexChart
                                options={completionChartOptions}
                                series={[
                                    Math.round((sessionData.reviewCompletion + sessionData.validationCompletion) / 2)
                                ]}
                                type="radialBar"
                                height={280}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <div className="bg-indigo-50 p-3 rounded-lg">
                                <p className="text-xs text-indigo-700">Review</p>
                                <p className="text-lg font-medium text-indigo-900">{sessionData.reviewCompletion}%</p>
                                <div className="w-full bg-indigo-200 rounded-full h-1.5 mt-1.5">
                                    <div
                                        className="bg-indigo-600 h-1.5 rounded-full"
                                        style={{ width: `${sessionData.reviewCompletion}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="bg-indigo-50 p-3 rounded-lg">
                                <p className="text-xs text-indigo-700">Validasi</p>
                                <p className="text-lg font-medium text-indigo-900">{sessionData.validationCompletion}%</p>
                                <div className="w-full bg-indigo-200 rounded-full h-1.5 mt-1.5">
                                    <div
                                        className="bg-indigo-600 h-1.5 rounded-full"
                                        style={{ width: `${sessionData.validationCompletion}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Close Session Form */}
                    {!processingComplete && (
                        <Card extra="p-6" data-aos="fade-up">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">
                                {isClosingConfirmed ? 'Konfirmasi Penutupan' : 'Tutup Sesi'}
                            </h2>

                            {isProcessing ? (
                                <div className="space-y-5">
                                    <div className="flex justify-center">
                                        <div className="w-full max-w-md">
                                            <div className="mb-5">
                                                <p className="text-center text-gray-700 mb-1">Sedang memproses penutupan sesi</p>
                                                <p className="text-center text-indigo-600 font-medium">{processingMessage}</p>
                                            </div>

                                            <div className="relative pt-1">
                                                <div className="flex mb-2 items-center justify-between">
                                                    <div>
                                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                                            Langkah {processingStep} dari {closingSteps.length}
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs font-semibold inline-block text-indigo-600">
                                                            {Math.round((processingStep / closingSteps.length) * 100)}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                                                    <div style={{ width: `${(processingStep / closingSteps.length) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500"></div>
                                                </div>
                                            </div>

                                            {/* Visualize all steps */}
                                            <div className="space-y-3 mt-6">
                                                {closingSteps.map((step, index) => (
                                                    <div
                                                        key={index}
                                                        className={`flex items-center p-3 rounded-lg ${index + 1 < processingStep ? 'bg-emerald-100 text-emerald-800' :
                                                            index + 1 === processingStep ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' :
                                                                'bg-gray-100 text-gray-500'
                                                            }`}
                                                    >
                                                        <div className="mr-3">
                                                            {index + 1 < processingStep ? (
                                                                <MdCheck className="h-5 w-5 text-emerald-600" />
                                                            ) : (
                                                                step.icon
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium">{step.title}</p>
                                                            <p className="text-xs">{step.description}</p>
                                                        </div>
                                                        {index + 1 === processingStep && (
                                                            <div className="w-5 h-5 border-t-2 border-r-2 border-indigo-600 rounded-full animate-spin ml-2"></div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : isClosingConfirmed ? (
                                <div className="space-y-4">
                                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                                        <div className="flex items-start">
                                            <MdInfo className="h-5 w-5 text-indigo-600 mt-0.5 mr-2" />
                                            <p className="text-indigo-800 text-sm">
                                                Anda akan menutup sesi "{sessionData.name}". Setelah sesi ditutup, tidak ada perubahan yang dapat dilakukan terhadap hasil proposal.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Alasan Penutupan
                                            </label>
                                            <select
                                                value={closingReason}
                                                onChange={(e) => setClosingReason(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                                required
                                            >
                                                <option value="">Pilih alasan...</option>
                                                <option value="completed">Semua review selesai</option>
                                                <option value="deadline">Tenggat waktu tercapai</option>
                                                <option value="administrative">Keputusan administratif</option>
                                                <option value="other">Alasan lain</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Catatan Tambahan
                                            </label>
                                            <textarea
                                                value={additionalNotes}
                                                onChange={(e) => setAdditionalNotes(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                                rows="3"
                                                placeholder="Tambahkan catatan opsional untuk pengarsipan..."
                                            ></textarea>
                                        </div>

                                        <div className="space-y-2 pt-2">
                                            <div className="flex items-center">
                                                <input
                                                    id="generate-report"
                                                    type="checkbox"
                                                    checked={generateReport}
                                                    onChange={() => setGenerateReport(!generateReport)}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="generate-report" className="ml-2 text-sm text-gray-700">
                                                    Buat laporan akhir sesi
                                                </label>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    id="archive-data"
                                                    type="checkbox"
                                                    checked={archiveData}
                                                    onChange={() => setArchiveData(!archiveData)}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="archive-data" className="ml-2 text-sm text-gray-700">
                                                    Arsipkan semua data sesi
                                                </label>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    id="send-notification"
                                                    type="checkbox"
                                                    checked={sendNotification}
                                                    onChange={() => setSendNotification(!sendNotification)}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="send-notification" className="ml-2 text-sm text-gray-700">
                                                    Kirim notifikasi ke peserta
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsClosingConfirmed(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCloseSession}
                                            disabled={!closingReason || isSubmitting}
                                            className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 ${(!closingReason || isSubmitting) ? 'opacity-60 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                                                    <span>Memproses...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <MdOutlineCloudDone className="h-5 w-5" />
                                                    <span>Tutup Sesi</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    <p className="text-gray-700">
                                        Anda akan menutup sesi validasi ini dan membuat laporan akhir. Anda yakin ingin melanjutkan?
                                    </p>

                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-blue-800 mb-2">Langkah Penutupan Sesi:</h3>
                                        <ol className="space-y-2 pl-5 list-decimal text-sm text-blue-700">
                                            <li>Validasi status semua proposal</li>
                                            <li>Finalisasi semua statistik</li>
                                            <li>Kompilasi semua data untuk laporan</li>
                                            <li>Pengarsipan data</li>
                                            <li>Penutupan akses ke sesi</li>
                                        </ol>
                                    </div>

                                    <div className="flex justify-end pt-3">
                                        <button
                                            type="button"
                                            onClick={handleCloseSession}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                                        >
                                            <MdChevronRight className="h-5 w-5" />
                                            <span>Lanjut ke Penutupan</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    )}

                    {/* Session Info Card */}
                    <Card extra="p-6" data-aos="fade-up">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Informasi Sesi</h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MdDateRange className="h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Periode</p>
                                    <p className="text-gray-800">{formatDate(sessionData.startDate).split(',')[0]} - {formatDate(sessionData.endDate).split(',')[0]}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MdAccessTime className="h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Durasi</p>
                                    <p className="text-gray-800">{sessionData.duration}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MdOutlineSecurity className="h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Performa ML</p>
                                    <p className="text-gray-800">{sessionData.stats.mlAccuracy}% akurasi</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MdFolderOpen className="h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Total Dokumen</p>
                                    <p className="text-gray-800">{sessionData.activitySummary.uploads} dokumen</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MdFolder className="h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Ukuran Data</p>
                                    <p className="text-gray-800">245.8 MB</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MdHistory className="h-5 w-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Aktivitas Terakhir</p>
                                    <p className="text-gray-800">15 menit yang lalu</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Actions Card - shows after completion */}
                    {processingComplete && (
                        <Card extra="p-6" data-aos="fade-up">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Aksi Cepat</h2>

                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-left transition-colors">
                                    <div className="flex items-center">
                                        <MdDownload className="h-5 w-5 text-indigo-600 mr-3" />
                                        <span className="text-gray-800">Unduh Laporan Akhir</span>
                                    </div>
                                    <MdChevronRight className="h-5 w-5 text-gray-400" />
                                </button>

                                <button className="w-full flex items-center justify-between p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-left transition-colors">
                                    <div className="flex items-center">
                                        <MdPeople className="h-5 w-5 text-indigo-600 mr-3" />
                                        <span className="text-gray-800">Distribusikan ke Peserta</span>
                                    </div>
                                    <MdChevronRight className="h-5 w-5 text-gray-400" />
                                </button>

                                <button className="w-full flex items-center justify-between p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-left transition-colors">
                                    <div className="flex items-center">
                                        <MdFolder className="h-5 w-5 text-indigo-600 mr-3" />
                                        <span className="text-gray-800">Akses Data Arsip</span>
                                    </div>
                                    <MdChevronRight className="h-5 w-5 text-gray-400" />
                                </button>

                                <button className="w-full flex items-center justify-between p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-left transition-colors">
                                    <div className="flex items-center">
                                        <MdPlayArrow className="h-5 w-5 text-indigo-600 mr-3" />
                                        <span className="text-gray-800">Mulai Sesi Baru</span>
                                    </div>
                                    <MdChevronRight className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CloseSession;
