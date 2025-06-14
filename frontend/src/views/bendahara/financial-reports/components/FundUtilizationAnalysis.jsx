import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdAnalytics,
    MdArrowBack,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdPieChart,
    MdBarChart,
    MdShowChart,
    MdOutlineAttachMoney,
    MdCategory,
    MdCalendarToday,
    MdOutlineAccountBalance,
    MdFileDownload,
    MdOutlineMoreVert,
    MdCompareArrows,
    MdInfo,
    MdGroup,
    MdTrendingUp,
    MdTrendingDown,
    MdSettings
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

// Mock charts (in real app, use Chart.js, Recharts, or similar)
const BarChartMock = () => (
    <div className="h-72 bg-white dark:bg-navy-800 rounded-lg p-4 border border-gray-100 dark:border-navy-700">
        <div className="flex justify-between items-center mb-4">
            <h6 className="text-sm font-medium text-navy-700 dark:text-white">Analisis Pengeluaran per Kategori</h6>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <MdOutlineMoreVert />
            </button>
        </div>
        <div className="h-[calc(100%-32px)] relative">
            <div className="absolute bottom-0 left-0 w-full flex items-end justify-between gap-2 px-2">
                <div className="flex flex-col items-center">
                    <div className="w-12 bg-brand-500 rounded-t" style={{ height: '60%' }}></div>
                    <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">SDM</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 bg-blue-500 rounded-t" style={{ height: '85%' }}></div>
                    <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Peralatan</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 bg-purple-500 rounded-t" style={{ height: '45%' }}></div>
                    <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Perjalanan</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 bg-amber-500 rounded-t" style={{ height: '70%' }}></div>
                    <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Material</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 bg-green-500 rounded-t" style={{ height: '40%' }}></div>
                    <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Seminar</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 bg-red-500 rounded-t" style={{ height: '30%' }}></div>
                    <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Publikasi</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 bg-gray-500 rounded-t" style={{ height: '20%' }}></div>
                    <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Lainnya</p>
                </div>
            </div>
        </div>
    </div>
);

const PieChartMock = () => (
    <div className="h-72 bg-white dark:bg-navy-800 rounded-lg p-4 border border-gray-100 dark:border-navy-700">
        <div className="flex justify-between items-center mb-4">
            <h6 className="text-sm font-medium text-navy-700 dark:text-white">Distribusi Penggunaan Dana</h6>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <MdOutlineMoreVert />
            </button>
        </div>
        <div className="flex items-center justify-center h-[calc(100%-64px)]">
            <div className="relative w-40 h-40 rounded-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0" style={{ background: 'conic-gradient(#3B82F6 0% 30%, #8B5CF6 30% 45%, #EAB308 45% 60%, #10B981 60% 70%, #EF4444 70% 80%, #6B7280 80% 100%)' }}>
                </div>
                <div className="absolute w-20 h-20 bg-white dark:bg-navy-800 rounded-full"></div>
            </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-2">
            <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Peralatan (30%)</span>
            </div>
            <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">SDM (15%)</span>
            </div>
            <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Material (15%)</span>
            </div>
        </div>
    </div>
);

const LineChartMock = () => (
    <div className="h-72 bg-white dark:bg-navy-800 rounded-lg p-4 border border-gray-100 dark:border-navy-700">
        <div className="flex justify-between items-center mb-4">
            <h6 className="text-sm font-medium text-navy-700 dark:text-white">Tren Penggunaan Dana</h6>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <MdOutlineMoreVert />
            </button>
        </div>
        <div className="h-[calc(100%-32px)] relative flex items-center">
            <div className="w-full h-40 relative">
                <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                    <path
                        d="M0,150 L40,120 L80,135 L120,90 L160,100 L200,70 L240,90 L280,50 L320,40 L360,20 L400,10"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="2"
                    />
                    <path
                        d="M0,150 L40,140 L80,145 L120,130 L160,135 L200,110 L240,130 L280,115 L320,120 L360,100 L400,105"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                    />
                </svg>
                <div className="absolute bottom-1 left-0 w-full flex justify-between px-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Jan</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Mar</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Mei</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Jul</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Sep</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Nov</div>
                </div>
            </div>
        </div>
    </div>
);

const FundUtilizationAnalysis = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterYear, setFilterYear] = useState("2025");
    const [filterCategory, setFilterCategory] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data for fund utilization analysis
    const utilizationStats = {
        totalFunding: 5250000000,
        totalUtilized: 3750000000,
        utilizationRate: 71.4,
        remainingBudget: 1500000000,
        overBudgetCategories: 2,
        underUtilizedCategories: 3
    };

    const utilizationData = {
        byCategory: [
            { category: "Peralatan Penelitian", allocated: 1850000000, utilized: 1560000000, percentage: 84.3 },
            { category: "SDM & Gaji Peneliti", allocated: 1200000000, utilized: 980000000, percentage: 81.7 },
            { category: "Material & Bahan", allocated: 950000000, utilized: 760000000, percentage: 80.0 },
            { category: "Perjalanan Dinas", allocated: 650000000, utilized: 320000000, percentage: 49.2 },
            { category: "Publikasi & Seminar", allocated: 350000000, utilized: 80000000, percentage: 22.9 },
            { category: "Lainnya", allocated: 250000000, utilized: 50000000, percentage: 20.0 }
        ],
        byFaculty: [
            { faculty: "Fakultas Teknik", allocated: 1700000000, utilized: 1450000000, percentage: 85.3 },
            { faculty: "Fakultas Kedokteran", allocated: 1300000000, utilized: 850000000, percentage: 65.4 },
            { faculty: "Fakultas Ekonomi", allocated: 850000000, utilized: 620000000, percentage: 72.9 },
            { faculty: "Fakultas Psikologi", allocated: 750000000, utilized: 480000000, percentage: 64.0 },
            { faculty: "Fakultas Lainnya", allocated: 650000000, utilized: 350000000, percentage: 53.8 }
        ],
        monthlyTrend: [
            { month: "Jan 2025", allocated: 430000000, utilized: 380000000 },
            { month: "Feb 2025", allocated: 430000000, utilized: 410000000 },
            { month: "Mar 2025", allocated: 430000000, utilized: 390000000 },
            { month: "Apr 2025", allocated: 440000000, utilized: 380000000 },
            { month: "May 2025", allocated: 440000000, utilized: 360000000 },
            { month: "Jun 2025", allocated: 440000000, utilized: 380000000 }
        ]
    };

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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getUtilizationPercentageClass = (percentage) => {
        if (percentage > 90) return "text-red-600 dark:text-red-400";
        if (percentage > 75) return "text-amber-600 dark:text-amber-400";
        if (percentage > 50) return "text-green-600 dark:text-green-400";
        return "text-blue-600 dark:text-blue-400";
    };

    const getUtilizationBarColor = (percentage) => {
        if (percentage > 90) return "bg-red-500";
        if (percentage > 75) return "bg-amber-500";
        if (percentage > 50) return "bg-green-500";
        return "bg-blue-500";
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link to="/bendahara/financial-reports" className="mr-3 p-2 bg-gray-100 dark:bg-navy-800 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700">
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Analisis Penggunaan Dana</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Analisis menyeluruh tentang pemanfaatan dana penelitian
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <Card extra="p-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdOutlineAttachMoney className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pencairan</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {formatCurrency(utilizationStats.totalFunding)}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                            <MdShowChart className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Terpakai</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {formatCurrency(utilizationStats.totalUtilized)}
                                <span className="text-sm font-normal ml-1 text-green-600 dark:text-green-400">
                                    ({utilizationStats.utilizationRate}%)
                                </span>
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                            <MdCompareArrows className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sisa Anggaran</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {formatCurrency(utilizationStats.remainingBudget)}
                            </h4>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                <div className="lg:col-span-2">
                    <Card extra="p-6" data-aos="fade-up" data-aos-delay="300">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                                Penggunaan Dana per Kategori
                            </h5>
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-grow w-full md:w-52">
                                        <input
                                            type="text"
                                            placeholder="Cari kategori..."
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <select
                                        className="px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                        value={filterYear}
                                        onChange={(e) => setFilterYear(e.target.value)}
                                    >
                                        <option value="2025">2025</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                    </select>
                                </div>
                                <button
                                    onClick={handleRefresh}
                                    className="p-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800"
                                >
                                    <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px] table-auto">
                                <thead>
                                    <tr>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Kategori
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Dana Dialokasikan
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Dana Terpakai
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Persentase
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {utilizationData.byCategory.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-navy-700">
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                {item.category}
                                            </td>
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                {formatCurrency(item.allocated)}
                                            </td>
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                {formatCurrency(item.utilized)}
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <div className="flex items-center">
                                                    <span className={`mr-2 font-medium ${getUtilizationPercentageClass(item.percentage)}`}>
                                                        {item.percentage}%
                                                    </span>
                                                    <div className="w-24 h-1.5 bg-gray-200 dark:bg-navy-700 rounded-full">
                                                        <div className={`h-1.5 rounded-full ${getUtilizationBarColor(item.percentage)}`} style={{ width: `${item.percentage}%` }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                        <Card extra="p-3" data-aos="fade-up" data-aos-delay="350">
                            <BarChartMock />
                        </Card>

                        <Card extra="p-3" data-aos="fade-up" data-aos-delay="400">
                            <PieChartMock />
                        </Card>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-5">
                    <Card extra="p-6" data-aos="fade-up" data-aos-delay="450">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                Ringkasan Penggunaan Dana
                            </h5>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-lg border border-gray-100 dark:border-navy-700 bg-gray-50 dark:bg-navy-800">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2 flex items-center">
                                    <MdGroup className="mr-2 text-brand-500" /> Berdasarkan Fakultas
                                </h6>
                                <div className="space-y-3">
                                    {utilizationData.byFaculty.slice(0, 3).map((item, index) => (
                                        <div key={index} className="flex flex-col">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-gray-600 dark:text-gray-400">{item.faculty}</span>
                                                <span className="text-navy-700 dark:text-white font-medium">{item.percentage}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-200 dark:bg-navy-700 rounded-full">
                                                <div className={`h-1.5 rounded-full ${getUtilizationBarColor(item.percentage)}`} style={{ width: `${item.percentage}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 text-center">
                                    <button className="text-xs text-brand-500 hover:text-brand-600 dark:hover:text-brand-400">
                                        Lihat semua fakultas
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg border border-gray-100 dark:border-navy-700 bg-gray-50 dark:bg-navy-800">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2 flex items-center">
                                    <MdTrendingUp className="mr-2 text-green-500" /> Kategori Efisien
                                </h6>
                                <div className="space-y-2">
                                    <div className="p-2 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-navy-700 dark:text-white font-medium">Publikasi & Seminar</span>
                                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">22.9%</span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            77.1% dana belum terpakai dari total alokasi
                                        </p>
                                    </div>
                                    <div className="p-2 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-navy-700 dark:text-white font-medium">Lainnya</span>
                                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">20.0%</span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            80.0% dana belum terpakai dari total alokasi
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg border border-gray-100 dark:border-navy-700 bg-gray-50 dark:bg-navy-800">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2 flex items-center">
                                    <MdTrendingDown className="mr-2 text-red-500" /> Kategori Terpakai Tinggi
                                </h6>
                                <div className="space-y-2">
                                    <div className="p-2 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-navy-700 dark:text-white font-medium">Peralatan Penelitian</span>
                                            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">84.3%</span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            15.7% dana tersisa dari total alokasi
                                        </p>
                                    </div>
                                    <div className="p-2 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-navy-700 dark:text-white font-medium">SDM & Gaji Peneliti</span>
                                            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">81.7%</span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            18.3% dana tersisa dari total alokasi
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm transition-colors">
                                    <MdFileDownload className="h-5 w-5" />
                                    <span>Unduh Analisis Lengkap</span>
                                </button>
                            </div>
                        </div>
                    </Card>

                    <Card extra="p-3" data-aos="fade-up" data-aos-delay="500">
                        <LineChartMock />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FundUtilizationAnalysis;
