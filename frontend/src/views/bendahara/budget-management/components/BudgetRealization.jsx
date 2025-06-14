import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdStackedLineChart,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdFileDownload,
    MdArrowBack,
    MdCalendarToday,
    MdAssessment,
    MdCompareArrows,
    MdWarning,
    MdInfo,
    MdTrendingUp,
    MdTrendingDown,
    MdFilterAlt,
    MdShowChart,
    MdOutlineTask
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
// Import Recharts components
import {
    AreaChart, Area, LineChart, Line,
    BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer
} from 'recharts';

const BudgetRealization = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterQuarter, setFilterQuarter] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Dummy data for budget realization
    const realizationStats = {
        totalBudget: 5000000000,
        budgetRealized: 3850000000,
        realizationPercentage: 77,
        remainingBudget: 1150000000
    };

    const realizationReports = [
        {
            id: "REP-2025-Q2",
            title: "Laporan Realisasi Anggaran Q2 2025",
            period: "April - Juni 2025",
            submissionDate: "15 Jul 2025",
            planned: 1250000000,
            realized: 1150000000,
            percentage: 92,
            status: "Tinggi",
            categories: 6,
            notes: "Realisasi anggaran dalam kuartal kedua menunjukkan tingkat penyerapan yang sangat baik"
        },
        {
            id: "REP-2025-Q1",
            title: "Laporan Realisasi Anggaran Q1 2025",
            period: "Januari - Maret 2025",
            submissionDate: "15 Apr 2025",
            planned: 1000000000,
            realized: 950000000,
            percentage: 95,
            status: "Tinggi",
            categories: 6,
            notes: "Realisasi anggaran dalam kuartal pertama menunjukkan tingkat penyerapan yang sangat baik"
        },
        {
            id: "REP-2024-Q4",
            title: "Laporan Realisasi Anggaran Q4 2024",
            period: "Oktober - Desember 2024",
            submissionDate: "15 Jan 2025",
            planned: 1100000000,
            realized: 1050000000,
            percentage: 95.45,
            status: "Tinggi",
            categories: 6,
            notes: "Realisasi anggaran akhir tahun menunjukkan tingkat penyerapan yang sangat tinggi sesuai dengan target"
        },
        {
            id: "REP-2024-Q3",
            title: "Laporan Realisasi Anggaran Q3 2024",
            period: "Juli - September 2024",
            submissionDate: "15 Oct 2024",
            planned: 950000000,
            realized: 700000000,
            percentage: 73.68,
            status: "Sedang",
            categories: 6,
            notes: "Realisasi anggaran kuartal ketiga menunjukkan perlambatan penyerapan anggaran terutama di bulan Agustus"
        },
        {
            id: "REP-2024-Q2",
            title: "Laporan Realisasi Anggaran Q2 2024",
            period: "April - Juni 2024",
            submissionDate: "15 Jul 2024",
            planned: 850000000,
            realized: 550000000,
            percentage: 64.71,
            status: "Sedang",
            categories: 6,
            notes: "Realisasi anggaran kuartal kedua lebih rendah dari target karena penundaan beberapa penelitian"
        },
        {
            id: "REP-2024-Q1",
            title: "Laporan Realisasi Anggaran Q1 2024",
            period: "Januari - Maret 2024",
            submissionDate: "15 Apr 2024",
            planned: 750000000,
            realized: 450000000,
            percentage: 60.00,
            status: "Rendah",
            categories: 6,
            notes: "Realisasi anggaran kuartal pertama di bawah target karena keterlambatan persetujuan anggaran tahunan"
        }
    ];

    // Dummy category data for selected report
    const categoryBreakdown = [
        { category: "Penelitian Unggulan", planned: 400000000, realized: 380000000, percentage: 95.00 },
        { category: "Penelitian Terapan", planned: 300000000, realized: 275000000, percentage: 91.67 },
        { category: "Penelitian Dasar", planned: 200000000, realized: 195000000, percentage: 97.50 },
        { category: "Penelitian Pengembangan", planned: 150000000, realized: 130000000, percentage: 86.67 },
        { category: "Penelitian Kolaborasi", planned: 120000000, realized: 110000000, percentage: 91.67 },
        { category: "Penelitian Mahasiswa", planned: 80000000, realized: 60000000, percentage: 75.00 }
    ];

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }, []);

    // Set the first report as selected by default
    useEffect(() => {
        if (realizationReports.length > 0 && !selectedReport) {
            setSelectedReport(realizationReports[0]);
        }
    }, [realizationReports, selectedReport]);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleReportSelect = (report) => {
        setSelectedReport(report);
    };

    const filteredReports = realizationReports.filter(report => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.period.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesQuarter =
            filterQuarter === "all" ||
            report.id.toLowerCase().includes(filterQuarter.toLowerCase());

        return matchesSearch && matchesQuarter;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "tinggi": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "sedang": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "rendah": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getPercentageColor = (percentage) => {
        if (percentage >= 90) return "text-green-600 dark:text-green-400";
        if (percentage >= 70) return "text-blue-600 dark:text-blue-400";
        if (percentage >= 50) return "text-amber-600 dark:text-amber-400";
        return "text-red-600 dark:text-red-400";
    };

    const getProgressBarColor = (percentage) => {
        if (percentage >= 90) return "bg-gradient-to-r from-green-400 to-green-600";
        if (percentage >= 70) return "bg-gradient-to-r from-blue-400 to-blue-600";
        if (percentage >= 50) return "bg-gradient-to-r from-amber-400 to-amber-600";
        return "bg-gradient-to-r from-red-400 to-red-600";
    };

    // Prepare data for trend chart (quarterly realization)
    const trendChartData = realizationReports.slice(0, 6).reverse().map(report => ({
        quarter: report.id.split('-')[2],
        planned: report.planned / 1000000,
        realized: report.realized / 1000000,
        percentage: report.percentage
    }));

    // Prepare comparison data for the current selected report
    const getComparisonData = () => {
        if (!selectedReport) return [];

        // Create comparison data for planned vs realized
        return [
            { name: 'Direncanakan', value: selectedReport.planned },
            { name: 'Direalisasikan', value: selectedReport.realized }
        ];
    };

    // Custom tooltip for trend chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-navy-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-navy-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        Direncanakan: Rp {payload[0].value.toFixed(2)} M
                    </p>
                    <p className="text-xs font-medium text-green-600 dark:text-green-400">
                        Direalisasikan: Rp {payload[1].value.toFixed(2)} M
                    </p>
                    <p className="text-xs font-medium mt-1">
                        Persentase: <span className={getPercentageColor(payload[2].value)}>
                            {payload[2].value}%
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    // Custom tooltip for category charts
    const CategoryTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-navy-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-navy-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{payload[0].name}</p>
                    <p className="text-xs font-medium text-brand-500 dark:text-brand-400">
                        Rp {payload[0].value.toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#ec4899', '#14b8a6'];

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link to="/bendahara/budget-management" className="mr-3 p-2.5 bg-brand-50 dark:bg-navy-800 rounded-full hover:bg-brand-100 dark:hover:bg-navy-700 transition-all duration-300 shadow-sm">
                        <MdArrowBack className="h-5 w-5 text-brand-500 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white tracking-tight">Laporan Realisasi Anggaran</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Pantau dan analisis realisasi anggaran penelitian
                        </p>
                    </div>
                </div>
            </div>

            {/* Summary Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 shadow-md">
                            <MdStackedLineChart className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Total Realisasi</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {realizationStats.realizationPercentage}%
                            </h4>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                Rp {(realizationStats.budgetRealized / 1000000000).toFixed(2)} M dari {(realizationStats.totalBudget / 1000000000).toFixed(2)} M
                            </span>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
                        <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full"
                            style={{ width: `${realizationStats.realizationPercentage}%` }}></div>
                    </div>
                </Card>

                <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 shadow-md">
                            <MdAssessment className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Realisasi Kuartal Ini</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {realizationReports[0].percentage}%
                                <span className="ml-2 text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                    Q2 2025
                                </span>
                            </h4>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                {realizationReports[0].period}
                            </span>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
                        <div className="h-1 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 rounded-full"
                            style={{ width: `${realizationReports[0].percentage}%` }}></div>
                    </div>
                </Card>

                <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 shadow-md">
                            <MdCompareArrows className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Perbandingan YoY</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1 flex items-center">
                                {(realizationReports[0].percentage - realizationReports[4].percentage) >= 0 ? (
                                    <>
                                        +{(realizationReports[0].percentage - realizationReports[4].percentage).toFixed(1)}%
                                        <MdTrendingUp className="ml-1 text-green-500 dark:text-green-400" />
                                    </>
                                ) : (
                                    <>
                                        {(realizationReports[0].percentage - realizationReports[4].percentage).toFixed(1)}%
                                        <MdTrendingDown className="ml-1 text-red-500 dark:text-red-400" />
                                    </>
                                )}
                            </h4>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                vs Q2 2024 ({realizationReports[4].percentage}%)
                            </span>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
                        <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 rounded-full"
                            style={{ width: `${(realizationReports[0].percentage - realizationReports[4].percentage) + 50}%` }}></div>
                    </div>
                </Card>
            </div>

            {/* Trend Chart Card */}
            <Card extra="p-6 mb-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="250">
                <div className="flex items-center justify-between mb-6">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                        <MdShowChart className="mr-2 h-5 w-5 text-brand-500 dark:text-brand-400" />
                        Tren Realisasi Anggaran
                    </h5>
                    <div className="flex items-center gap-2">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
                            Q1 2024 - Q2 2025
                        </span>
                        <button className="p-2 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-200">
                            <MdFileDownload className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="h-80" data-aos="fade-up" data-aos-delay="300">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={trendChartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-navy-700" />
                            <XAxis
                                dataKey="quarter"
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                axisLine={{ stroke: '#E5E7EB' }}
                                className="dark:text-gray-400 dark:stroke-navy-700"
                            />
                            <YAxis
                                yAxisId="left"
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                tickFormatter={(value) => `${value}M`}
                                axisLine={{ stroke: '#E5E7EB' }}
                                className="dark:text-gray-400 dark:stroke-navy-700"
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                domain={[0, 100]}
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                tickFormatter={(value) => `${value}%`}
                                axisLine={{ stroke: '#E5E7EB' }}
                                className="dark:text-gray-400 dark:stroke-navy-700"
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                wrapperStyle={{ paddingTop: 15 }}
                                formatter={(value) => <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>}
                            />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="planned"
                                name="Direncanakan"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ r: 4, strokeWidth: 2 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="realized"
                                name="Direalisasikan"
                                stroke="#22c55e"
                                strokeWidth={2}
                                dot={{ r: 4, strokeWidth: 2 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="percentage"
                                name="Persentase"
                                stroke="#f59e0b"
                                strokeWidth={2}
                                dot={{ r: 4, strokeWidth: 2 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <div className="flex flex-col lg:flex-row gap-6 mb-5">
                <Card extra="p-6 lg:w-7/12 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0 flex items-center">
                            <MdOutlineTask className="mr-2 h-5 w-5 text-brand-500 dark:text-brand-400" />
                            Laporan Realisasi Anggaran
                            <span className="bg-brand-50 text-brand-500 text-xs px-2 py-1 rounded-full ml-2 dark:bg-brand-900/30 dark:text-brand-400">
                                {filteredReports.length} Laporan
                            </span>
                        </h5>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari laporan..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <select
                                    className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 appearance-none pr-8 transition-all duration-200 relative"
                                    value={filterQuarter}
                                    onChange={(e) => setFilterQuarter(e.target.value)}
                                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
                                >
                                    <option value="all">Semua Periode</option>
                                    <option value="2025-q2">Q2 2025</option>
                                    <option value="2025-q1">Q1 2025</option>
                                    <option value="2024-q4">Q4 2024</option>
                                    <option value="2024-q3">Q3 2024</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleRefresh}
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-200"
                                    title="Refresh data"
                                >
                                    <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                                </button>
                                <button
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-200"
                                    title="Download laporan"
                                >
                                    <MdFileDownload className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] table-auto">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-navy-800 rounded-lg">
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Laporan
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Periode
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Direncanakan
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Direalisasikan
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Persentase
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReports.length > 0 ? (
                                    filteredReports.map((report, index) => (
                                        <tr
                                            key={index}
                                            className={`hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-all duration-200 cursor-pointer ${selectedReport?.id === report.id ? 'bg-gray-50 dark:bg-navy-700/50' : ''}`}
                                            onClick={() => handleReportSelect(report)}
                                        >
                                            <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                                                <Link to={`/bendahara/budget-management/budget-realization/${report.id}`} className="hover:text-brand-500 transition-colors duration-200">
                                                    {report.title}
                                                </Link>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                    <span className="py-0.5 px-1.5 bg-gray-100 dark:bg-navy-800 rounded-md">{report.id}</span>
                                                    <span className="ml-1.5">{report.categories} kategori</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-navy-700">
                                                <div className="font-medium">{report.period}</div>
                                                <div className="text-xs flex items-center mt-0.5">
                                                    <MdCalendarToday className="h-3 w-3 mr-1" />
                                                    Disubmit: {report.submissionDate}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                                                Rp {report.planned.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                                                Rp {report.realized.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                                <div className={`font-medium ${getPercentageColor(report.percentage)}`}>
                                                    {report.percentage}%
                                                    <div className="w-24 h-2 bg-gray-200 dark:bg-navy-700 rounded-full mt-1.5 overflow-hidden">
                                                        <div
                                                            className={`h-2 rounded-full ${getProgressBarColor(report.percentage)} transition-all duration-500 ease-out`}
                                                            style={{ width: `${report.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                                                    {report.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center">
                                                <MdInfo className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" />
                                                <p>Tidak ada laporan yang sesuai dengan kriteria pencarian</p>
                                                <button
                                                    className="mt-3 text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
                                                    onClick={() => {
                                                        setSearchTerm("");
                                                        setFilterQuarter("all");
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

                <Card extra="p-6 lg:w-5/12 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="350">
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                            Detail Realisasi
                        </h5>
                        {selectedReport && (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                {selectedReport.id}
                            </span>
                        )}
                    </div>

                    {selectedReport ? (
                        <>
                            <div className="bg-gray-50 dark:bg-navy-800 rounded-lg p-4 mb-5">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-1">
                                    {selectedReport.title}
                                </h6>
                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    <MdCalendarToday className="h-3 w-3" />
                                    <span>{selectedReport.period}</span>
                                </div>

                                {/* Chart for Planned vs Realized */}
                                <div className="h-36 mb-4" data-aos="fade-up" data-aos-delay="400">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={getComparisonData()}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                            barSize={40}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-navy-700" />
                                            <XAxis
                                                dataKey="name"
                                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                                axisLine={{ stroke: '#E5E7EB' }}
                                                className="dark:text-gray-400"
                                            />
                                            <YAxis
                                                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                                axisLine={false}
                                                tickLine={false}
                                                className="dark:text-gray-400"
                                            />
                                            <Tooltip content={<CategoryTooltip />} />
                                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                                {getComparisonData().map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={index === 0 ? '#3b82f6' : '#22c55e'}
                                                        className="hover:opacity-80 transition-opacity duration-300"
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="space-y-2 mt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Direncanakan:</span>
                                        <span className="text-xs font-medium text-navy-700 dark:text-white">
                                            Rp {selectedReport.planned.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Direalisasikan:</span>
                                        <span className="text-xs font-medium text-navy-700 dark:text-white">
                                            Rp {selectedReport.realized.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Persentase:</span>
                                        <span className={`text-xs font-medium ${getPercentageColor(selectedReport.percentage)}`}>
                                            {selectedReport.percentage}%
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Progress:</div>
                                    <div className="w-full h-2.5 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                                        <div className={`h-2.5 rounded-full ${getProgressBarColor(selectedReport.percentage)} transition-all duration-500 ease-out`}
                                            style={{ width: `${selectedReport.percentage}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5">
                                <div className="flex items-center justify-between mb-3">
                                    <h6 className="text-sm font-medium text-navy-700 dark:text-white">
                                        Realisasi per Kategori
                                    </h6>
                                    <div className="p-1 bg-gray-100 dark:bg-navy-800 rounded-lg">
                                        <div className="flex text-xs">
                                            <button
                                                className={`px-2 py-1 rounded-md ${activeIndex === 0 ? 'bg-white dark:bg-navy-700 shadow-sm' : 'text-gray-500 dark:text-gray-400'} transition-all duration-200`}
                                                onClick={() => setActiveIndex(0)}
                                            >
                                                Chart
                                            </button>
                                            <button
                                                className={`px-2 py-1 rounded-md ${activeIndex === 1 ? 'bg-white dark:bg-navy-700 shadow-sm' : 'text-gray-500 dark:text-gray-400'} transition-all duration-200`}
                                                onClick={() => setActiveIndex(1)}
                                            >
                                                List
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {activeIndex === 0 ? (
                                    // Chart view
                                    <div className="h-60 mb-2" data-aos="fade-up" data-aos-delay="450">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={categoryBreakdown}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="realized"
                                                    nameKey="category"
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {categoryBreakdown.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip content={<CategoryTooltip />} formatter={(value) => `Rp ${value.toLocaleString()}`} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                ) : (
                                    // List view
                                    <div className="space-y-3">
                                        {categoryBreakdown.map((cat, idx) => (
                                            <div key={idx} className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600 hover:shadow-md transition-all duration-200">
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <div className="flex items-center">
                                                        <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                                        <span className="text-xs font-medium text-navy-700 dark:text-white">{cat.category}</span>
                                                    </div>
                                                    <span className={`text-xs font-medium ${getPercentageColor(cat.percentage)}`}>
                                                        {cat.percentage}%
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                                    Rp {cat.realized.toLocaleString()} dari Rp {cat.planned.toLocaleString()}
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-100 dark:bg-navy-800 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-1.5 rounded-full ${getProgressBarColor(cat.percentage)}`}
                                                        style={{ width: `${cat.percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 hover:shadow-md transition-all duration-200">
                                <div className="flex items-start gap-2 mb-2">
                                    <MdWarning className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                                    <h6 className="text-sm font-medium text-amber-800 dark:text-amber-400">
                                        Catatan Realisasi
                                    </h6>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {selectedReport.notes}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <MdAssessment className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                Pilih laporan untuk melihat detail realisasi anggaran per kategori
                            </p>
                            <button className="px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs rounded-lg transition-colors duration-200">
                                Pilih Laporan
                            </button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default BudgetRealization;
