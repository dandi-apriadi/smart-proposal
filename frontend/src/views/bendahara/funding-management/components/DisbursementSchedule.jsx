import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdCalendarToday,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdFileDownload,
    MdArrowBack,
    MdToday,
    MdDateRange,
    MdSchedule,
    MdAdd,
    MdEdit,
    MdNotificationsActive,
    MdAttachMoney,
    MdCheck,
    MdClose,
    MdKeyboardArrowDown,
    MdOutlineInfo,
    MdOutlineCalendarViewMonth,
    MdOutlineGridView,
    MdEventAvailable,
    MdAccessTime,
    MdPerson,
    MdSchool,
    MdOutlineAttachMoney,
    MdAccountBalance,
    MdWarning,
    MdMoreVert
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import Chart from 'react-apexcharts';

const DisbursementSchedule = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterMonth, setFilterMonth] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState("table"); // "table", "calendar", "cards"
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [showScheduleDetails, setShowScheduleDetails] = useState(false);

    // Dummy data for disbursement schedule
    const scheduleStats = {
        totalScheduled: 18,
        scheduledThisMonth: 8,
        scheduledNextMonth: 6,
        scheduledToday: 2
    };

    const disbursementSchedules = [
        {
            id: "SCH-2025-018",
            proposalId: "PRP-2025-042",
            title: "Pengembangan Machine Learning untuk Deteksi Penyakit Tanaman",
            researcher: "Dr. Budi Santoso",
            faculty: "Fakultas Teknik",
            amount: 75000000,
            scheduledDate: "20 Jun 2025",
            daysRemaining: 5,
            disbursementPhase: "Tahap 1",
            status: "Dijadwalkan",
            bankAccount: "BNI - 0123456789",
            notes: "Dana penelitian tahap pertama"
        },
        {
            id: "SCH-2025-017",
            proposalId: "PRP-2025-036",
            title: "Efektivitas Metode Pembelajaran Jarak Jauh pada Mahasiswa",
            researcher: "Dr. Andi Wijaya",
            faculty: "Fakultas Psikologi",
            amount: 50000000,
            scheduledDate: "25 Jun 2025",
            daysRemaining: 10,
            disbursementPhase: "Tahap 1",
            status: "Dijadwalkan",
            bankAccount: "BCA - 1234567890",
            notes: "Dana penelitian tahap pertama"
        },
        {
            id: "SCH-2025-016",
            proposalId: "PRP-2025-034",
            title: "Pengembangan Energi Terbarukan di Daerah Terpencil",
            researcher: "Dr. Adi Suryanto",
            faculty: "Fakultas Teknik",
            amount: 85000000,
            scheduledDate: "22 Jun 2025",
            daysRemaining: 7,
            disbursementPhase: "Tahap 1",
            status: "Dijadwalkan",
            bankAccount: "Mandiri - 9876543210",
            notes: "Dana penelitian tahap pertama"
        },
        {
            id: "SCH-2025-015",
            proposalId: "PRP-2025-035",
            title: "Sistem Monitoring Kualitas Air Berbasis IoT",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            amount: 30000000,
            scheduledDate: "15 Jul 2025",
            daysRemaining: 30,
            disbursementPhase: "Tahap 2",
            status: "Dijadwalkan",
            bankAccount: "BNI - 0123456789",
            notes: "Dana penelitian tahap kedua"
        },
        {
            id: "SCH-2025-014",
            proposalId: "PRP-2025-032",
            title: "Pengembangan Bahan Bakar Alternatif dari Mikroalga",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            amount: 35000000,
            scheduledDate: "10 Jul 2025",
            daysRemaining: 25,
            disbursementPhase: "Tahap 2",
            status: "Dijadwalkan",
            bankAccount: "BCA - 9876543210",
            notes: "Dana penelitian tahap kedua"
        },
        {
            id: "SCH-2025-013",
            proposalId: "PRP-2025-039",
            title: "Analisis Big Data untuk Prediksi Perilaku Konsumen",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            amount: 25000000,
            scheduledDate: "05 Jul 2025",
            daysRemaining: 20,
            disbursementPhase: "Tahap 2",
            status: "Dijadwalkan",
            bankAccount: "Mandiri - 1234567890",
            notes: "Dana penelitian tahap kedua"
        },
        {
            id: "SCH-2025-012",
            proposalId: "PRP-2025-030",
            title: "Pengaruh Media Sosial terhadap Perilaku Konsumen",
            researcher: "Dr. Siti Rahayu",
            faculty: "Fakultas Ekonomi",
            amount: 70000000,
            scheduledDate: "15 Jun 2025",
            daysRemaining: 0,
            disbursementPhase: "Tahap 1",
            status: "Siap Dicairkan",
            bankAccount: "BRI - 0987654321",
            notes: "Dana penelitian tahap pertama"
        },
        {
            id: "SCH-2025-011",
            proposalId: "PRP-2025-038",
            title: "Analisis Dampak Ekonomi dari Perubahan Iklim di Indonesia",
            researcher: "Prof. Dewi Lestari",
            faculty: "Fakultas Ekonomi",
            amount: 25000000,
            scheduledDate: "15 Jun 2025",
            daysRemaining: 0,
            disbursementPhase: "Tahap 2",
            status: "Siap Dicairkan",
            bankAccount: "BNI - 2345678901",
            notes: "Dana penelitian tahap kedua"
        }
    ];

    // Chart configuration for monthly disbursement
    const monthlySummaryOptions = {
        chart: {
            type: 'bar',
            height: 180,
            toolbar: {
                show: false
            },
            fontFamily: 'inherit',
            foreColor: '#697a8d'
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '60%',
                distributed: true
            },
        },
        colors: ['#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6'],
        dataLabels: {
            enabled: false
        },
        grid: {
            borderColor: '#e0e0e0',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: true
                }
            }
        },
        xaxis: {
            categories: ['Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov'],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: 'inherit'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val.toFixed(0);
                },
                style: {
                    fontSize: '12px',
                    fontFamily: 'inherit'
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " jadwal";
                }
            }
        }
    };

    const monthlySummarySeries = [{
        name: 'Jadwal Pencairan',
        data: [8, 6, 4, 3, 5, 2]
    }];

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

    const openScheduleDetails = (schedule) => {
        setSelectedSchedule(schedule);
        setShowScheduleDetails(true);
    };

    const filteredSchedules = disbursementSchedules.filter(schedule => {
        const matchesSearch =
            schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            schedule.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            schedule.proposalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            schedule.id.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterMonth === "all") return matchesSearch;
        else if (filterMonth === "june") return matchesSearch && schedule.scheduledDate.includes("Jun");
        else if (filterMonth === "july") return matchesSearch && schedule.scheduledDate.includes("Jul");
        else if (filterMonth === "today") return matchesSearch && schedule.daysRemaining === 0;

        return matchesSearch;
    });

    const getDateClass = (daysRemaining) => {
        if (daysRemaining === 0) return "text-red-600 dark:text-red-400 font-medium";
        if (daysRemaining <= 5) return "text-amber-600 dark:text-amber-400 font-medium";
        return "text-gray-600 dark:text-gray-400";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Dijadwalkan": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "Siap Dicairkan": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    // Group schedules by date for calendar view
    const schedulesByDate = filteredSchedules.reduce((acc, schedule) => {
        const date = schedule.scheduledDate.split(" ")[0]; // Get just the day number
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(schedule);
        return acc;
    }, {});

    return (
        <div className="pt-8 px-2">
            {/* Hero Section */}
            <div className="relative mb-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl p-8 text-white overflow-hidden" data-aos="fade-up">
                <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full transform -translate-x-10 translate-y-10"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    <div className="mb-2 lg:mb-0">
                        <div className="flex items-center gap-4">
                            <Link to="/bendahara/funding-management" className="p-2.5 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl hover:bg-opacity-30 transition-all">
                                <MdArrowBack className="h-5 w-5 text-white" />
                            </Link>
                            <div>
                                <h2 className="text-3xl font-bold">Jadwal Pencairan Dana</h2>
                                <p className="mt-2 text-purple-100">
                                    Kelola dan pantau semua jadwal pencairan dana untuk proposal yang disetujui
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                            <p className="text-sm text-purple-100">Jadwal Bulan Ini</p>
                            <div className="flex items-center mt-1 gap-2">
                                <MdDateRange className="h-5 w-5" />
                                <p className="text-2xl font-bold">{scheduleStats.scheduledThisMonth}</p>
                            </div>
                        </div>

                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl py-3 px-5">
                            <p className="text-sm text-purple-100">Untuk Hari Ini</p>
                            <div className="flex items-center mt-1 gap-2">
                                <MdToday className="h-5 w-5" />
                                <p className="text-2xl font-bold">
                                    {scheduleStats.scheduledToday}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdCalendarToday className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Dijadwalkan</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {scheduleStats.totalScheduled}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500 mr-1"></span>
                                <span className="text-xs text-blue-600 dark:text-blue-400">
                                    Semua jadwal aktif
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-green-100 dark:bg-green-900/30">
                            <MdToday className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Hari Ini</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {scheduleStats.scheduledToday}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                                <span className="text-xs text-green-600 dark:text-green-400">
                                    {scheduleStats.scheduledToday} jadwal
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdDateRange className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Bulan Ini</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {scheduleStats.scheduledThisMonth}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 mr-1"></span>
                                <span className="text-xs text-amber-600 dark:text-amber-400">
                                    {scheduleStats.scheduledThisMonth} jadwal
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card extra="p-5 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-2xl p-3 bg-purple-100 dark:bg-purple-900/30">
                            <MdSchedule className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Bulan Depan</p>
                            <h4 className="mt-1 text-2xl font-bold text-navy-700 dark:text-white">
                                {scheduleStats.scheduledNextMonth}
                            </h4>
                            <div className="mt-1 flex items-center">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-500 mr-1"></span>
                                <span className="text-xs text-purple-600 dark:text-purple-400">
                                    {scheduleStats.scheduledNextMonth} jadwal
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* View Toggle Buttons */}
            <div className="flex items-center justify-center md:justify-end mb-6">
                <div className="bg-white dark:bg-navy-800 rounded-xl p-1 shadow-sm border border-gray-100 dark:border-navy-700 flex">
                    <button
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${viewMode === 'table'
                                ? 'bg-brand-500 text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700'
                            }`}
                        onClick={() => setViewMode('table')}
                    >
                        <MdOutlineGridView className="h-4 w-4" />
                        Tabel
                    </button>
                    <button
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${viewMode === 'calendar'
                                ? 'bg-brand-500 text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700'
                            }`}
                        onClick={() => setViewMode('calendar')}
                    >
                        <MdOutlineCalendarViewMonth className="h-4 w-4" />
                        Kalender
                    </button>
                    <button
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${viewMode === 'cards'
                                ? 'bg-brand-500 text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700'
                            }`}
                        onClick={() => setViewMode('cards')}
                    >
                        <MdOutlineInfo className="h-4 w-4" />
                        Kartu
                    </button>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-6 mb-8">
                <Card extra="p-6 xl:w-3/4" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                            Jadwal Pencairan Dana
                        </h5>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari jadwal..."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <select
                                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                    value={filterMonth}
                                    onChange={(e) => setFilterMonth(e.target.value)}
                                >
                                    <option value="all">Semua Periode</option>
                                    <option value="today">Hari Ini</option>
                                    <option value="june">Juni 2025</option>
                                    <option value="july">Juli 2025</option>
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

                    {viewMode === 'table' && (
                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-navy-700">
                            <table className="w-full min-w-[800px] table-auto">
                                <thead className="bg-gray-50 dark:bg-navy-800">
                                    <tr>
                                        <th className="px-4 py-3 text-start rounded-tl-lg text-sm font-medium text-gray-600 dark:text-gray-300">
                                            ID Jadwal
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Proposal
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Peneliti
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Jumlah
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Tanggal
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Tahap
                                        </th>
                                        <th className="px-4 py-3 text-start text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-start rounded-tr-lg text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSchedules.length > 0 ? (
                                        filteredSchedules.map((schedule, index) => (
                                            <tr key={index} className="border-t border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
                                                <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                    {schedule.id}
                                                </td>
                                                <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                    <Link to={`/bendahara/funding-management/proposal/${schedule.proposalId}`} className="hover:text-brand-500">
                                                        {schedule.proposalId}
                                                    </Link>
                                                </td>
                                                <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white max-w-[150px] truncate">
                                                    {schedule.researcher}
                                                    <span className="block text-xs font-normal text-gray-500 dark:text-gray-400">{schedule.faculty}</span>
                                                </td>
                                                <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                    Rp {schedule.amount.toLocaleString()}
                                                </td>
                                                <td className="py-[14px] text-sm">
                                                    <span className={getDateClass(schedule.daysRemaining)}>
                                                        {schedule.scheduledDate}
                                                        {schedule.daysRemaining === 0 ? (
                                                            <span className="block text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded-full mt-1 text-center">
                                                                Hari ini
                                                            </span>
                                                        ) : schedule.daysRemaining <= 5 ? (
                                                            <span className="block text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 rounded-full mt-1 text-center">
                                                                {schedule.daysRemaining} hari lagi
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                </td>
                                                <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                    {schedule.disbursementPhase}
                                                </td>
                                                <td className="py-[14px] text-sm">
                                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(schedule.status)}`}>
                                                        {schedule.status}
                                                    </span>
                                                </td>
                                                <td className="py-[14px] text-sm">
                                                    <div className="flex space-x-2">
                                                        <Link to={`/bendahara/funding-management/fund-disbursement/${schedule.proposalId}`}>
                                                            <button className={`p-1.5 rounded-lg ${schedule.daysRemaining === 0 ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400"} hover:bg-gray-200 dark:hover:bg-navy-800`}>
                                                                <MdAttachMoney size={16} />
                                                            </button>
                                                        </Link>
                                                        <button className="p-1.5 rounded-lg bg-brand-50 dark:bg-brand-500/20 text-brand-500 hover:bg-brand-100">
                                                            <MdEdit size={16} />
                                                        </button>
                                                        <button className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100">
                                                            <MdNotificationsActive size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="py-6 text-center text-gray-500 dark:text-gray-400">
                                                Tidak ada jadwal yang sesuai dengan kriteria pencarian
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {viewMode === 'calendar' && (
                        <div className="bg-white dark:bg-navy-800 rounded-xl border border-gray-200 dark:border-navy-700 p-4">
                            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <div>Min</div>
                                <div>Sen</div>
                                <div>Sel</div>
                                <div>Rab</div>
                                <div>Kam</div>
                                <div>Jum</div>
                                <div>Sab</div>
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {/* Empty cells for days before June 1 (adjust as needed) */}
                                {Array(3).fill().map((_, i) => (
                                    <div key={`empty-${i}`} className="h-24 p-2 text-sm text-gray-400 border border-gray-100 dark:border-navy-700 rounded-lg bg-gray-50 dark:bg-navy-900"></div>
                                ))}

                                {/* Days of the month */}
                                {Array(30).fill().map((_, i) => {
                                    const day = i + 1;
                                    const today = 15; // Simulating June 15th as today
                                    const schedules = schedulesByDate[day.toString()] || [];

                                    return (
                                        <div
                                            key={`day-${day}`}
                                            className={`h-24 p-2 text-sm border rounded-lg ${day === today
                                                    ? 'border-brand-500 dark:border-brand-400'
                                                    : 'border-gray-100 dark:border-navy-700'
                                                } ${day < today
                                                    ? 'bg-gray-50 dark:bg-navy-900'
                                                    : 'bg-white dark:bg-navy-800'
                                                } overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-navy-600`}
                                        >
                                            <div className={`text-right mb-1 ${day === today
                                                    ? 'text-brand-500 dark:text-brand-400 font-medium'
                                                    : 'text-gray-700 dark:text-gray-300'
                                                }`}>
                                                {day}
                                            </div>

                                            {schedules.map((schedule, idx) => (
                                                <div
                                                    key={`schedule-${day}-${idx}`}
                                                    onClick={() => openScheduleDetails(schedule)}
                                                    className={`mb-1 p-1 text-xs rounded cursor-pointer ${schedule.status === "Siap Dicairkan"
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                                        }`}
                                                >
                                                    <div className="truncate font-medium">{schedule.researcher.split(' ')[0]}</div>
                                                    <div className="truncate opacity-80">Rp {(schedule.amount / 1000000).toFixed(0)}jt</div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {viewMode === 'cards' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filteredSchedules.length > 0 ? (
                                filteredSchedules.map((schedule, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-xl border ${schedule.daysRemaining === 0
                                                ? 'border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10'
                                                : schedule.daysRemaining <= 5
                                                    ? 'border-amber-200 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-900/10'
                                                    : 'border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800'
                                            } hover:shadow-md transition-all duration-300 cursor-pointer`}
                                        onClick={() => openScheduleDetails(schedule)}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center">
                                                <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${schedule.daysRemaining === 0
                                                        ? "bg-red-100 dark:bg-red-900/30"
                                                        : schedule.daysRemaining <= 5
                                                            ? "bg-amber-100 dark:bg-amber-900/30"
                                                            : "bg-blue-100 dark:bg-blue-900/30"
                                                    }`}>
                                                    {schedule.daysRemaining === 0
                                                        ? <MdToday className="h-6 w-6 text-red-600 dark:text-red-400" />
                                                        : schedule.daysRemaining <= 5
                                                            ? <MdAccessTime className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                                            : <MdCalendarToday className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                                    }
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-semibold text-navy-700 dark:text-white">
                                                        {schedule.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {schedule.researcher} - {schedule.faculty}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-xs font-medium rounded-full ${getStatusColor(schedule.status)}`}>
                                                    {schedule.status}
                                                </div>
                                                <div className="mt-1 text-sm">
                                                    {schedule.daysRemaining} hari lagi
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <div className="flex-1 min-w-[120px]">
                                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                    Jumlah Dana
                                                </div>
                                                <div className="text-sm font-semibold text-navy-700 dark:text-white">
                                                    Rp {schedule.amount.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-[120px]">
                                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                    Tanggal Jadwal
                                                </div>
                                                <div className="text-sm font-semibold text-navy-700 dark:text-white">
                                                    {schedule.scheduledDate}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-[120px]">
                                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                    Tahap Pencairan
                                                </div>
                                                <div className="text-sm font-semibold text-navy-700 dark:text-white">
                                                    {schedule.disbursementPhase}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-10 text-center text-gray-500 dark:text-gray-400">
                                    Tidak ada jadwal yang sesuai dengan kriteria pencarian
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                </Card>

                <Card extra="p-0 xl:w-1/4" data-aos="fade-up" data-aos-delay="350">
                    <div className="p-6 border-b border-gray-100 dark:border-navy-700">
                        <div className="flex items-center justify-between">
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                Ringkasan Jadwal
                            </h5>
                            <Link to="/bendahara/funding-management/approved-proposals">
                                <button className="flex items-center justify-center p-2.5 rounded-full bg-brand-50 dark:bg-brand-500/20 text-brand-500 hover:bg-brand-100 dark:hover:bg-brand-500/30 transition-colors">
                                    <MdAdd className="h-5 w-5" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Monthly Summary Chart */}
                        <div className="mb-6">
                            <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Distribusi Jadwal Bulanan
                            </h6>
                            <Chart
                                options={monthlySummaryOptions}
                                series={monthlySummarySeries}
                                type="bar"
                                height={180}
                            />
                        </div>

                        {/* Action cards and info panels */}
                        <div className="space-y-4">
                            <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <MdCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    <h6 className="text-sm font-medium text-green-800 dark:text-green-400">
                                        Siap Dicairkan Hari Ini
                                    </h6>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                    {scheduleStats.scheduledToday} proposal siap untuk proses pencairan dana hari ini.
                                </p>
                                <Link to="/bendahara/funding-management/fund-disbursement">
                                    <button className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors">
                                        Proses Pencairan
                                    </button>
                                </Link>
                            </div>

                            <div className="p-4 rounded-lg border border-gray-100 dark:border-navy-700 bg-gray-50 dark:bg-navy-800">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-3">
                                    Jadwal Pencairan Terbaru
                                </h6>
                                <div className="space-y-2">
                                    {disbursementSchedules.slice(0, 3).map((schedule, index) => (
                                        <div key={index} className="p-2 rounded-lg bg-white dark:bg-navy-700 border border-gray-100 dark:border-navy-800">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs font-medium text-navy-700 dark:text-white">{schedule.researcher}</span>
                                                <span className={`text-xs ${getDateClass(schedule.daysRemaining)}`}>{schedule.scheduledDate}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{schedule.faculty}</span>
                                                <span className="text-xs font-medium text-brand-500">Rp {schedule.amount.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link to="/bendahara/funding-management/disbursement-schedule" className="block text-xs text-center text-brand-500 hover:underline mt-3">
                                    Lihat semua jadwal
                                </Link>
                            </div>

                            <div className="p-4 rounded-lg border border-gray-100 dark:border-navy-700 bg-gray-50 dark:bg-navy-800">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                    Pengingat Pencairan Dana
                                </h6>
                                <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <MdCalendarToday className="h-4 w-4 text-amber-500" />
                                        <span>Pastikan bukti pembayaran terlampir untuk setiap pencairan</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <MdCalendarToday className="h-4 w-4 text-amber-500" />
                                        <span>Verifikasi kembali rekening tujuan sebelum dicairkan</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <MdCalendarToday className="h-4 w-4 text-amber-500" />
                                        <span>Nominal pencairan harus sesuai dengan persetujuan</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Schedule Details Modal */}
            {showScheduleDetails && selectedSchedule && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-navy-800 rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${selectedSchedule.daysRemaining === 0
                                            ? "bg-red-100 dark:bg-red-900/30"
                                            : selectedSchedule.daysRemaining <= 5
                                                ? "bg-amber-100 dark:bg-amber-900/30"
                                                : "bg-blue-100 dark:bg-blue-900/30"
                                        }`}>
                                        {selectedSchedule.daysRemaining === 0
                                            ? <MdToday className="h-6 w-6 text-red-600 dark:text-red-400" />
                                            : selectedSchedule.daysRemaining <= 5
                                                ? <MdAccessTime className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                                : <MdCalendarToday className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        }
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                                            Detail Jadwal Pencairan
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {selectedSchedule.id}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowScheduleDetails(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
                                >
                                    <MdClose className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>

                            {/* Status indicator */}
                            <div className="mb-4">
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedSchedule.status)}`}>
                                    {selectedSchedule.status}
                                </span>
                            </div>

                            {/* Details grid */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Peneliti
                                    </div>
                                    <div className="text-navy-700 dark:text-white">
                                        {selectedSchedule.researcher}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Fakultas
                                    </div>
                                    <div className="text-navy-700 dark:text-white">
                                        {selectedSchedule.faculty}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Jumlah Dana
                                    </div>
                                    <div className="text-navy-700 dark:text-white">
                                        Rp {selectedSchedule.amount.toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Tanggal Jadwal
                                    </div>
                                    <div className="text-navy-700 dark:text-white">
                                        {selectedSchedule.scheduledDate}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Tahap Pencairan
                                    </div>
                                    <div className="text-navy-700 dark:text-white">
                                        {selectedSchedule.disbursementPhase}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Rekening Tujuan
                                    </div>
                                    <div className="text-navy-700 dark:text-white">
                                        {selectedSchedule.bankAccount}
                                    </div>
                                </div>
                            </div>

                            {/* Actions and buttons */}
                            <div className="mt-6 flex gap-3">
                                <Link to={`/bendahara/funding-management/fund-disbursement/${selectedSchedule.proposalId}`}>
                                    <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                        <MdAttachMoney className="h-5 w-5" />
                                        Proses Pencairan
                                    </button>
                                </Link>
                                <button className="w-full bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                    <MdEdit className="h-5 w-5" />
                                    Edit Jadwal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisbursementSchedule;
