import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdWarning,
    MdOutlineAssignmentLate,
    MdAssignmentTurnedIn,
    MdHistory,
    MdVerified,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdMoreVert,
    MdAssignment,
    MdOutlineCheck,
    MdClose,
    MdNotificationsActive,
    MdEdit,
    MdInfo,
    MdAccessTime,
    MdTrendingUp,
    MdTrendingDown,
    MdDashboard
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
// Import Recharts components
import {
    PieChart, Pie, Cell,
    BarChart, Bar,
    LineChart, Line,
    AreaChart, Area,
    XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const TgrManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [activeIndex, setActiveIndex] = useState(0);
    const [activePieIndex, setActivePieIndex] = useState(null);

    // Dummy data for TGR Management
    const tgrStats = {
        activeCases: 12,
        pendingClearance: 8,
        resolvedCases: 25,
        totalAmount: 156000000
    };

    const tgrModules = [
        {
            title: "Daftar Penelitian dengan TGR",
            description: "Lihat dan kelola daftar penelitian yang memiliki status TGR",
            icon: <MdOutlineAssignmentLate className="h-8 w-8 text-red-500" />,
            path: "/bendahara/tgr-management/tgr-list",
            color: "bg-red-50 dark:bg-red-900/20",
            delay: 100
        },
        {
            title: "Proses Bebas TGR",
            description: "Kelola proses penyelesaian dan pembebasan TGR untuk peneliti",
            icon: <MdAssignmentTurnedIn className="h-8 w-8 text-amber-500" />,
            path: "/bendahara/tgr-management/tgr-clearance-process",
            color: "bg-amber-50 dark:bg-amber-900/20",
            delay: 150
        },
        {
            title: "Riwayat TGR",
            description: "Lihat riwayat lengkap kasus TGR yang telah diselesaikan",
            icon: <MdHistory className="h-8 w-8 text-blue-500" />,
            path: "/bendahara/tgr-management/tgr-history",
            color: "bg-blue-50 dark:bg-blue-900/20",
            delay: 200
        },
        {
            title: "Notifikasi TGR",
            description: "Kelola notifikasi dan pemberitahuan terkait kasus TGR",
            icon: <MdNotificationsActive className="h-8 w-8 text-purple-500" />,
            path: "/bendahara/tgr-management/tgr-notifications",
            color: "bg-purple-50 dark:bg-purple-900/20",
            delay: 250
        },
        {
            title: "Validasi Bebas TGR",
            description: "Validasi status bebas TGR untuk proposal dan peneliti",
            icon: <MdVerified className="h-8 w-8 text-green-500" />,
            path: "/bendahara/tgr-management/tgr-clearance-validation",
            color: "bg-green-50 dark:bg-green-900/20",
            delay: 300
        },
    ];

    const activeTgrCases = [
        {
            id: "TGR-2025-012",
            researcher: "Dr. Adi Suryanto",
            faculty: "Fakultas Teknik",
            projectTitle: "Pengembangan Sistem Energi Terbarukan",
            amount: 18500000,
            deadline: "25 Jul 2025",
            status: "Aktif",
            reason: "Laporan keuangan tidak lengkap",
            daysRemaining: 32
        },
        {
            id: "TGR-2025-011",
            researcher: "Dr. Maya Putri",
            faculty: "Fakultas Ekonomi",
            projectTitle: "Analisis Big Data untuk Prediksi Perilaku Konsumen",
            amount: 15200000,
            deadline: "18 Jul 2025",
            status: "Aktif",
            reason: "Ketidaksesuaian penggunaan dana",
            daysRemaining: 25
        },
        {
            id: "TGR-2025-010",
            researcher: "Prof. Dewi Lestari",
            faculty: "Fakultas Ekonomi",
            projectTitle: "Analisis Dampak Ekonomi dari Perubahan Iklim di Indonesia",
            amount: 22300000,
            deadline: "05 Jul 2025",
            status: "Proses Penyelesaian",
            reason: "Bukti pengeluaran tidak valid",
            daysRemaining: 12
        },
        {
            id: "TGR-2025-009",
            researcher: "Prof. Hendra Gunawan",
            faculty: "Fakultas Teknik",
            projectTitle: "Pengembangan Bahan Bakar Alternatif dari Mikroalga",
            amount: 27500000,
            deadline: "30 Jun 2025",
            status: "Proses Penyelesaian",
            reason: "Dana tidak terserap sesuai ketentuan",
            daysRemaining: 7
        },
        {
            id: "TGR-2025-008",
            researcher: "Dr. Ratna Sari",
            faculty: "Fakultas Kedokteran",
            projectTitle: "Sistem Monitoring Kualitas Air Berbasis IoT",
            amount: 12800000,
            deadline: "20 Jun 2025",
            status: "Menunggu Validasi",
            reason: "Keterlambatan pelaporan",
            daysRemaining: -3
        },
    ];

    const recentlyResolvedCases = [
        {
            id: "TGR-2025-007",
            researcher: "Dr. Eko Prasetyo",
            faculty: "Fakultas MIPA",
            amount: 9500000,
            resolvedDate: "10 Jun 2025",
            resolution: "Pengembalian Dana",
            notes: "Dana telah dikembalikan sepenuhnya"
        },
        {
            id: "TGR-2025-006",
            researcher: "Prof. Sinta Wijaya",
            faculty: "Fakultas Hukum",
            amount: 14300000,
            resolvedDate: "05 Jun 2025",
            resolution: "Cicilan",
            notes: "Pembayaran cicilan 1 dari 3 telah diterima"
        },
        {
            id: "TGR-2025-005",
            researcher: "Dr. Anwar Hidayat",
            faculty: "Fakultas Ilmu Budaya",
            amount: 8200000,
            resolvedDate: "02 Jun 2025",
            resolution: "Bukti Diterima",
            notes: "Bukti pengeluaran pengganti telah divalidasi"
        }
    ];

    // Generate monthly TGR data for trend chart
    const trendData = [
        { month: "Jan", active: 15, resolved: 10 },
        { month: "Feb", active: 18, resolved: 12 },
        { month: "Mar", active: 14, resolved: 16 },
        { month: "Apr", active: 16, resolved: 18 },
        { month: "May", active: 12, resolved: 14 },
        { month: "Jun", active: 12, resolved: 20 },
    ];

    // Generate data for status chart
    const tgrStatusData = [
        { name: "Aktif", value: tgrStats.activeCases - tgrStats.pendingClearance, color: "#ef4444" }, // red-500
        { name: "Proses", value: tgrStats.pendingClearance, color: "#f59e0b" }, // amber-500
        { name: "Selesai", value: tgrStats.resolvedCases, color: "#10b981" }, // green-500
    ];

    // Generate data for faculty distribution
    const facultyDistribution = [
        { name: "Teknik", value: 5, color: "#3b82f6" }, // blue-500
        { name: "Ekonomi", value: 3, color: "#8b5cf6" }, // purple-500
        { name: "MIPA", value: 2, color: "#ec4899" }, // pink-500
        { name: "Kedokteran", value: 1, color: "#f97316" }, // orange-500
        { name: "Lainnya", value: 1, color: "#6b7280" }, // gray-500
    ];

    // Calculate TGR resolution rate
    const resolutionRate = Math.round((tgrStats.resolvedCases / (tgrStats.activeCases + tgrStats.resolvedCases)) * 100);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    // Filter TGR cases based on search term and status filter
    const filteredTgrCases = activeTgrCases.filter(tgr => {
        const matchesSearch =
            tgr.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tgr.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tgr.id.toLowerCase().includes(searchTerm.toLowerCase());

        if (statusFilter === "all") return matchesSearch;
        return matchesSearch && tgr.status.toLowerCase() === statusFilter.toLowerCase();
    });

    // Custom tooltip for pie chart
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-navy-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-navy-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{payload[0].name}</p>
                    <p className="text-sm font-bold text-brand-500 dark:text-brand-400">
                        {payload[0].value} kasus ({((payload[0].value / (tgrStats.activeCases + tgrStats.resolvedCases)) * 100).toFixed(1)}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    // Custom tooltip for trend chart
    const TrendTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-navy-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-navy-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
                    <p className="text-xs font-medium text-red-600 dark:text-red-400">
                        Aktif: {payload[0].value} kasus
                    </p>
                    <p className="text-xs font-medium text-green-600 dark:text-green-400">
                        Selesai: {payload[1].value} kasus
                    </p>
                </div>
            );
        }
        return null;
    };

    const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-navy-700 dark:text-white tracking-tight">TGR Management</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Kelola Tuntutan Ganti Rugi (TGR) terkait pembiayaan penelitian
                </p>
            </div>

            {/* Stats Cards with Improved Design */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                <Card extra="p-4 flex flex-col hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 shadow-md">
                            <MdWarning className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Kasus TGR Aktif</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {tgrStats.activeCases}
                            </h4>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                        <span className="text-red-600 dark:text-red-400 font-medium">
                            {Math.round((tgrStats.activeCases / (tgrStats.activeCases + tgrStats.resolvedCases)) * 100)}%
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                            dari total kasus
                        </span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-2">
                        <div className="h-1 bg-gradient-to-r from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 rounded-full"
                            style={{ width: `${(tgrStats.activeCases / (tgrStats.activeCases + tgrStats.resolvedCases)) * 100}%` }}></div>
                    </div>
                </Card>

                <Card extra="p-4 flex flex-col hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 shadow-md">
                            <MdAssignmentTurnedIn className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Menunggu Penyelesaian</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {tgrStats.pendingClearance}
                            </h4>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                        <span className="text-amber-600 dark:text-amber-400 font-medium">
                            {Math.round((tgrStats.pendingClearance / tgrStats.activeCases) * 100)}%
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                            dari kasus aktif
                        </span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-2">
                        <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 rounded-full"
                            style={{ width: `${(tgrStats.pendingClearance / tgrStats.activeCases) * 100}%` }}></div>
                    </div>
                </Card>

                <Card extra="p-4 flex flex-col hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 shadow-md">
                            <MdVerified className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Kasus Terselesaikan</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {tgrStats.resolvedCases}
                            </h4>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                        <span className="text-green-600 dark:text-green-400 font-medium">
                            {Math.round((tgrStats.resolvedCases / (tgrStats.activeCases + tgrStats.resolvedCases)) * 100)}%
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                            dari total kasus
                        </span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-2">
                        <div className="h-1 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 rounded-full"
                            style={{ width: `${(tgrStats.resolvedCases / (tgrStats.activeCases + tgrStats.resolvedCases)) * 100}%` }}></div>
                    </div>
                </Card>

                <Card extra="p-4 flex flex-col hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 shadow-md">
                            <MdAssignment className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Total Nilai TGR</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                Rp {tgrStats.totalAmount.toLocaleString()}
                            </h4>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                            ~Rp {Math.round(tgrStats.totalAmount / tgrStats.activeCases).toLocaleString()}
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                            rata-rata per kasus
                        </span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-2">
                        <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full"
                            style={{ width: '100%' }}></div>
                    </div>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card extra="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                            <MdPieChartOutlined className="mr-2 h-5 w-5 text-brand-500 dark:text-brand-400" />
                            Distribusi Status TGR
                        </h5>
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
                            {tgrStats.activeCases + tgrStats.resolvedCases} Total
                        </span>
                    </div>

                    <div className="h-72" data-aos="fade-up" data-aos-delay="350">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={tgrStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={90}
                                    innerRadius={60}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={(_, index) => setActivePieIndex(index)}
                                    onMouseLeave={() => setActivePieIndex(null)}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {tgrStatusData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            stroke={activePieIndex === index ? "#fff" : "none"}
                                            strokeWidth={activePieIndex === index ? 2 : 0}
                                            opacity={activePieIndex === null || activePieIndex === index ? 1 : 0.7}
                                            className="transition-opacity duration-300"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-2">
                        {tgrStatusData.map((entry, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-200 cursor-pointer"
                                onMouseEnter={() => setActivePieIndex(index)}
                                onMouseLeave={() => setActivePieIndex(null)}
                            >
                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{entry.name}: {entry.value}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card extra="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="400">
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                            <MdInsertChartOutlined className="mr-2 h-5 w-5 text-brand-500 dark:text-brand-400" />
                            Tren TGR 6 Bulan Terakhir
                        </h5>
                        <div className="flex items-center">
                            <span className={`px-2 py-0.5 text-xs rounded-md mr-2 ${resolutionRate >= 60 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'}`}>
                                {resolutionRate}% Terselesaikan
                            </span>
                            <button className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-navy-700 dark:hover:bg-navy-600 transition-colors">
                                <MdRefresh className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>

                    <div className="h-72" data-aos="fade-up" data-aos-delay="450">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={trendData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                barSize={20}
                            >
                                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-navy-700" />
                                <XAxis
                                    dataKey="month"
                                    scale="point"
                                    padding={{ left: 10, right: 10 }}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    axisLine={{ stroke: '#E5E7EB' }}
                                    className="dark:text-gray-400"
                                />
                                <YAxis
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    axisLine={{ stroke: '#E5E7EB' }}
                                    className="dark:text-gray-400"
                                />
                                <Tooltip content={<TrendTooltip />} />
                                <Legend
                                    formatter={(value) => <span className="text-xs text-gray-600 dark:text-gray-400">{value}</span>}
                                    wrapperStyle={{ paddingTop: 10 }}
                                />
                                <Bar dataKey="active" name="Kasus Aktif" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="resolved" name="Kasus Selesai" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Improved Module Cards with Interactive Hover */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
                {tgrModules.map((module, index) => (
                    <Link to={module.path} key={index}>
                        <Card
                            extra={`flex flex-col p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full ${module.color} overflow-hidden relative group`}
                            data-aos="fade-up"
                            data-aos-delay={module.delay}
                        >
                            <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-3xl transform translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500"></div>

                            <div className="flex items-center">
                                <div className="rounded-xl p-3 bg-white dark:bg-navy-700 shadow-md transform group-hover:scale-110 transition-transform duration-300">
                                    {module.icon}
                                </div>
                            </div>
                            <h4 className="mt-4 text-xl font-bold text-navy-700 dark:text-white group-hover:text-navy-800 dark:group-hover:text-white transition-colors duration-300">
                                {module.title}
                            </h4>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                                {module.description}
                            </p>
                            <div className="mt-auto pt-4 flex items-center text-xs font-medium text-navy-700 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span>Lihat Detail</span>
                                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Modern Active Cases Table */}
            <Card extra="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="350">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0 flex items-center">
                        <MdWarning className="mr-2 h-5 w-5 text-red-500" />
                        Kasus TGR Aktif
                        <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400">
                            {filteredTgrCases.length} Kasus
                        </span>
                    </h5>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex items-center">
                            <div className="relative flex-grow md:w-64">
                                <input
                                    type="text"
                                    placeholder="Cari kasus TGR..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <select
                                className="ml-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 appearance-none pr-8 transition-all duration-200"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
                            >
                                <option value="all">Semua Status</option>
                                <option value="aktif">Aktif</option>
                                <option value="proses penyelesaian">Proses Penyelesaian</option>
                                <option value="menunggu validasi">Menunggu Validasi</option>
                            </select>
                        </div>
                        <button
                            onClick={handleRefresh}
                            className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-200"
                            title="Refresh data"
                        >
                            <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] table-auto">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-navy-800 rounded-lg">
                                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                    ID Kasus
                                </th>
                                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                    Peneliti
                                </th>
                                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                    Fakultas
                                </th>
                                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                    Judul Penelitian
                                </th>
                                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                    Jumlah TGR
                                </th>
                                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                    Tenggat Waktu
                                </th>
                                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                    Status
                                </th>
                                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTgrCases.length > 0 ? (
                                filteredTgrCases.map((tgr, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-all duration-200">
                                        <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                                            <span className="py-1 px-2 bg-gray-100 dark:bg-navy-800 rounded-md">{tgr.id}</span>
                                        </td>
                                        <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                                            {tgr.researcher}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-navy-700">
                                            {tgr.faculty}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 max-w-[200px] truncate border-b border-gray-100 dark:border-navy-700">
                                            <Link to={`/bendahara/tgr-management/detail/${tgr.id}`} className="hover:text-brand-500 transition-colors duration-200">
                                                {tgr.projectTitle}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                                            Rp {tgr.amount.toLocaleString()}
                                        </td>
                                        <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                            <div className="flex items-center">
                                                <span className={`text-sm ${tgr.daysRemaining <= 0 ? 'text-red-600 dark:text-red-400' : tgr.daysRemaining <= 7 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                                    {tgr.deadline}
                                                </span>
                                                {tgr.daysRemaining <= 7 && (
                                                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${tgr.daysRemaining <= 0 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                                        {tgr.daysRemaining <= 0 ? 'Terlambat' : `${tgr.daysRemaining} hari lagi`}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${tgr.status === "Aktif" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                                                tgr.status === "Proses Penyelesaian" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                                                    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                                }`}>
                                                {tgr.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                            <div className="flex space-x-2">
                                                <button className="p-1.5 rounded-lg bg-brand-50 dark:bg-brand-500/20 text-brand-500 dark:text-brand-400 hover:bg-brand-100 transition-colors duration-200" title="Edit kasus">
                                                    <MdEdit size={16} />
                                                </button>
                                                <div className="relative group">
                                                    <button className="p-1.5 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-800 transition-colors duration-200">
                                                        <MdMoreVert size={16} />
                                                    </button>
                                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-navy-800 rounded-lg shadow-lg border border-gray-200 dark:border-navy-700 hidden group-hover:block z-10 transform transition-all duration-200 origin-top-right">
                                                        <ul className="py-1">
                                                            <li>
                                                                <Link to={`/bendahara/tgr-management/detail/${tgr.id}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors duration-150">
                                                                    Lihat Detail
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to={`/bendahara/tgr-management/process/${tgr.id}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors duration-150">
                                                                    Proses Penyelesaian
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to={`/bendahara/tgr-management/send-notification/${tgr.id}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors duration-150">
                                                                    Kirim Notifikasi
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-col items-center">
                                            <MdInfo className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" />
                                            <p>Tidak ada kasus TGR yang sesuai dengan kriteria pencarian</p>
                                            <button
                                                className="mt-3 text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
                                                onClick={() => {
                                                    setSearchTerm("");
                                                    setStatusFilter("all");
                                                }}
                                            >
                                                Reset filter
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Modern Resolved Cases Section */}
            <Card extra="p-6 mt-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="400">
                <div className="flex items-center justify-between mb-6">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                        <MdVerified className="mr-2 h-5 w-5 text-green-500" />
                        Kasus TGR Terselesaikan Terbaru
                    </h5>
                    <Link
                        to="/bendahara/tgr-management/tgr-history"
                        className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 hover:underline flex items-center"
                    >
                        Lihat Semua
                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recentlyResolvedCases.map((tgr, index) => (
                        <div key={index} className="bg-white dark:bg-navy-800 p-4 rounded-xl border border-gray-100 dark:border-navy-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{tgr.id}</span>
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${tgr.resolution === "Pengembalian Dana" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                                    tgr.resolution === "Cicilan" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                                        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                    }`}>
                                    {tgr.resolution}
                                </span>
                            </div>
                            <h6 className="text-base font-medium text-navy-700 dark:text-white mb-1">
                                {tgr.researcher}
                            </h6>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {tgr.faculty}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-brand-500 dark:text-brand-400 font-medium">Rp {tgr.amount.toLocaleString()}</span>
                                <div className="flex items-center">
                                    <MdAccessTime className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 mr-1" />
                                    <span className="text-gray-500 dark:text-gray-400 text-xs">{tgr.resolvedDate}</span>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-navy-700">
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">Catatan:</span> {tgr.notes}
                                </p>
                            </div>
                            <div className="mt-3 flex justify-end">
                                <Link to={`/bendahara/tgr-management/resolved-detail/${tgr.id}`} className="text-xs text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 hover:underline flex items-center">
                                    Lihat detail penyelesaian
                                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Priority Actions Section - Modern Design */}
            <div className="mt-6 grid grid-cols-1 gap-5 mb-5">
                <Card extra="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="450">
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                            <MdWarning className="text-red-500 mr-2 h-5 w-5" />
                            Tindakan Prioritas TGR
                        </h5>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/2 p-5 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h6 className="text-base font-medium text-navy-700 dark:text-white flex items-center">
                                    <MdAccessTime className="text-red-500 mr-2 h-5 w-5" />
                                    TGR dengan Tenggat Dekat
                                </h6>
                                <span className="px-2 py-1 text-xs font-medium rounded-md bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                    {activeTgrCases.filter(tgr => tgr.daysRemaining > 0 && tgr.daysRemaining <= 14).length} Kasus
                                </span>
                            </div>
                            <div className="space-y-3">
                                {activeTgrCases
                                    .filter(tgr => tgr.daysRemaining > 0 && tgr.daysRemaining <= 14)
                                    .slice(0, 3)
                                    .map((tgr, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-navy-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                                            <div>
                                                <p className="text-sm font-medium text-navy-700 dark:text-white">{tgr.researcher}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
                                                    <span className="bg-gray-100 dark:bg-navy-800 px-1.5 py-0.5 rounded mr-1.5">{tgr.id}</span>
                                                    Rp {tgr.amount.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-xs font-medium text-amber-600 dark:text-amber-400">{tgr.deadline}</span>
                                                <span className="block text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full mt-1">
                                                    {tgr.daysRemaining} hari tersisa
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                {activeTgrCases.filter(tgr => tgr.daysRemaining > 0 && tgr.daysRemaining <= 14).length === 0 && (
                                    <div className="flex flex-col items-center justify-center p-6 text-center">
                                        <MdOutlineCheck className="h-10 w-10 text-green-500 mb-2" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Tidak ada kasus TGR dengan tenggat waktu dekat
                                        </p>
                                    </div>
                                )}

                                {activeTgrCases.filter(tgr => tgr.daysRemaining > 0 && tgr.daysRemaining <= 14).length > 3 && (
                                    <Link to="/bendahara/tgr-management/tgr-list?filter=deadline" className="text-xs font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 hover:underline block text-center mt-4">
                                        Lihat semua kasus dengan tenggat dekat
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="md:w-1/2 p-5 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/20 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h6 className="text-base font-medium text-navy-700 dark:text-white flex items-center">
                                    <MdWarning className="text-amber-500 mr-2 h-5 w-5" />
                                    TGR Terlambat
                                </h6>
                                <span className="px-2 py-1 text-xs font-medium rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                    {activeTgrCases.filter(tgr => tgr.daysRemaining <= 0).length} Kasus
                                </span>
                            </div>
                            <div className="space-y-3">
                                {activeTgrCases
                                    .filter(tgr => tgr.daysRemaining <= 0)
                                    .map((tgr, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-navy-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                                            <div>
                                                <p className="text-sm font-medium text-navy-700 dark:text-white">{tgr.researcher}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
                                                    <span className="bg-gray-100 dark:bg-navy-800 px-1.5 py-0.5 rounded mr-1.5">{tgr.id}</span>
                                                    Rp {tgr.amount.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-xs font-medium text-red-600 dark:text-red-400">{tgr.deadline}</span>
                                                <span className="block text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full mt-1">
                                                    Terlambat {Math.abs(tgr.daysRemaining)} hari
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                {activeTgrCases.filter(tgr => tgr.daysRemaining <= 0).length === 0 && (
                                    <div className="flex flex-col items-center justify-center p-6 text-center">
                                        <MdOutlineCheck className="h-10 w-10 text-green-500 mb-2" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Tidak ada kasus TGR yang terlambat
                                        </p>
                                    </div>
                                )}
                            </div>

                            {activeTgrCases.filter(tgr => tgr.daysRemaining <= 0).length > 0 && (
                                <div className="mt-5 pt-3 border-t border-amber-200 dark:border-amber-900/30">
                                    <Link to="/bendahara/tgr-management/tgr-clearance-process" className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow">
                                        <MdOutlineAssignmentLate className="h-5 w-5" />
                                        Proses Semua TGR Terlambat
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TgrManagement;

// You need to define these icons since they're not imported at the top
const MdPieChartOutlined = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <path d="M12 11h6v2h-6z" />
        <path d="M12 7h6v2h-6z" />
        <path d="M12 15h6v2h-6z" />
    </svg>
);

const MdInsertChartOutlined = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
);
