import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdMoneyOff,
    MdSearch,
    MdRefresh,
    MdFileDownload,
    MdArrowBack,
    MdPieChart,
    MdWarning,
    MdThumbUp,
    MdSavings,
    MdAccountBalance,
    MdInfo,
    MdTrendingUp,
    MdTrendingDown,
    MdFilterAlt,
    MdChecklist
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
// If you have recharts installed, uncomment these imports for better charts
// import {
//     PieChart, Pie, Cell, Sector,
//     ResponsiveContainer, Tooltip,
//     Legend
// } from 'recharts';

const RemainingBudget = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    // Dummy data for remaining budget
    const budgetStats = {
        totalBudget: 5000000000,
        allocatedBudget: 3850000000,
        remainingBudget: 1150000000,
        overutilizedCategories: 2,
        underutilizedCategories: 3
    };

    const budgetCategories = [
        {
            id: "BDG-CAT-001",
            name: "Penelitian Unggulan",
            allocated: 1500000000,
            used: 1250000000,
            remaining: 250000000,
            percentRemaining: 16.67,
            status: "Normal",
            projects: 12
        },
        {
            id: "BDG-CAT-002",
            name: "Penelitian Terapan",
            allocated: 1200000000,
            used: 950000000,
            remaining: 250000000,
            percentRemaining: 20.83,
            status: "Normal",
            projects: 18
        },
        {
            id: "BDG-CAT-003",
            name: "Penelitian Dasar",
            allocated: 800000000,
            used: 750000000,
            remaining: 50000000,
            percentRemaining: 6.25,
            status: "Low",
            projects: 24
        },
        {
            id: "BDG-CAT-004",
            name: "Penelitian Pengembangan",
            allocated: 750000000,
            used: 500000000,
            remaining: 250000000,
            percentRemaining: 33.33,
            status: "High",
            projects: 10
        },
        {
            id: "BDG-CAT-005",
            name: "Penelitian Kolaborasi",
            allocated: 500000000,
            used: 300000000,
            remaining: 200000000,
            percentRemaining: 40.00,
            status: "High",
            projects: 6
        },
        {
            id: "BDG-CAT-006",
            name: "Penelitian Mahasiswa",
            allocated: 250000000,
            used: 100000000,
            remaining: 150000000,
            percentRemaining: 60.00,
            status: "High",
            projects: 25
        },
    ];

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

    const filteredCategories = budgetCategories.filter(category => {
        const matchesSearch =
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterCategory === "all" || category.status.toLowerCase() === filterCategory.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "High": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Normal": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "Low": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "Depleted": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getPercentageColor = (percentage) => {
        if (percentage > 30) return "text-green-600 dark:text-green-400";
        if (percentage > 10) return "text-blue-600 dark:text-blue-400";
        if (percentage > 5) return "text-amber-600 dark:text-amber-400";
        return "text-red-600 dark:text-red-400";
    };

    const getProgressBarColor = (status) => {
        switch (status) {
            case "High": return "bg-gradient-to-r from-green-400 to-green-600";
            case "Normal": return "bg-gradient-to-r from-blue-400 to-blue-600";
            case "Low": return "bg-gradient-to-r from-amber-400 to-amber-600";
            case "Depleted": return "bg-gradient-to-r from-red-400 to-red-600";
            default: return "bg-gradient-to-r from-gray-400 to-gray-600";
        }
    };

    // Calculate percentage of total budget remaining
    const percentRemaining = ((budgetStats.remainingBudget / budgetStats.totalBudget) * 100).toFixed(1);
    const percentUsed = (100 - parseFloat(percentRemaining)).toFixed(1);

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link to="/bendahara/budget-management" className="mr-3 p-2.5 bg-brand-50 dark:bg-navy-800 rounded-full hover:bg-brand-100 dark:hover:bg-navy-700 transition-all duration-300 shadow-sm">
                        <MdArrowBack className="h-5 w-5 text-brand-500 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white tracking-tight">Sisa Anggaran</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Monitor dan kelola sisa anggaran untuk memastikan penggunaan yang optimal
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 shadow-md">
                            <MdAccountBalance className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Total Anggaran</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                Rp {(budgetStats.totalBudget / 1000000000).toFixed(1)} M
                            </h4>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4"></div>
                </Card>

                <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 shadow-md">
                            <MdSavings className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Sisa Anggaran</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1 flex items-center">
                                Rp {(budgetStats.remainingBudget / 1000000000).toFixed(1)} M
                                <span className="ml-2 text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">{percentRemaining}%</span>
                            </h4>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
                        <div className="h-1 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 rounded-full"
                            style={{ width: `${percentRemaining}%` }}></div>
                    </div>
                </Card>

                <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 shadow-md">
                            <MdWarning className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Rendah Terpakai</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {budgetStats.underutilizedCategories} <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">Kategori</span>
                            </h4>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
                        <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 rounded-full"
                            style={{ width: `${(budgetStats.underutilizedCategories / 6) * 100}%` }}></div>
                    </div>
                </Card>

                <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 shadow-md">
                            <MdMoneyOff className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Habis Terpakai</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {budgetStats.overutilizedCategories} <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">Kategori</span>
                            </h4>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
                        <div className="h-1 bg-gradient-to-r from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 rounded-full"
                            style={{ width: `${(budgetStats.overutilizedCategories / 6) * 100}%` }}></div>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 mb-5">
                <Card extra="p-6 lg:w-2/3 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0 flex items-center">
                            Sisa Anggaran per Kategori
                            <span className="bg-brand-50 text-brand-500 text-xs px-2 py-1 rounded-full ml-2 dark:bg-brand-900/30 dark:text-brand-400">{filteredCategories.length}</span>
                        </h5>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari kategori..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <select
                                    className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 appearance-none pr-8 transition-all duration-200 relative"
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="high">Sisa Banyak</option>
                                    <option value="normal">Sisa Normal</option>
                                    <option value="low">Sisa Sedikit</option>
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
                                        Kategori
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Alokasi
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Terpakai
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Sisa
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Status
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Progress
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((category, index) => (
                                        <tr
                                            key={index}
                                            className={`hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-all duration-200 cursor-pointer ${hoveredCategory === category.id ? 'bg-gray-50 dark:bg-navy-700/50' : ''}`}
                                            onMouseEnter={() => setHoveredCategory(category.id)}
                                            onMouseLeave={() => setHoveredCategory(null)}
                                        >
                                            <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                                                <Link to={`/bendahara/budget-management/category/${category.id}`} className="hover:text-brand-500 transition-colors duration-200">
                                                    {category.name}
                                                </Link>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{category.id} • {category.projects} penelitian</div>
                                            </td>
                                            <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                                                Rp {category.allocated.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-navy-700">
                                                Rp {category.used.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                                <div className={`font-medium ${getPercentageColor(category.percentRemaining)}`}>
                                                    Rp {category.remaining.toLocaleString()}
                                                    <span className="block text-xs font-normal mt-0.5">
                                                        {category.percentRemaining.toFixed(1)}% tersisa
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(category.status)}`}>
                                                    {category.status === "High" ? "Sisa Banyak" :
                                                        category.status === "Normal" ? "Sisa Normal" :
                                                            category.status === "Low" ? "Sisa Sedikit" :
                                                                "Habis"}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                                <div className="w-full h-2.5 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-2.5 rounded-full ${getProgressBarColor(category.status)} transition-all duration-500 ease-out`}
                                                        style={{ width: `${100 - category.percentRemaining}%` }}
                                                    ></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center">
                                                <MdInfo className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" />
                                                <p>Tidak ada kategori yang sesuai dengan kriteria pencarian</p>
                                                <button
                                                    className="mt-3 text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
                                                    onClick={() => {
                                                        setSearchTerm("");
                                                        setFilterCategory("all");
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

                <Card extra="p-6 lg:w-1/3 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="350">
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                            Distribusi Anggaran
                        </h5>
                        <select
                            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 appearance-none pr-8 transition-all duration-200"
                            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
                        >
                            <option>Tahun 2025</option>
                            <option>Tahun 2024</option>
                        </select>
                    </div>

                    <div className="flex justify-center mb-8" data-aos="zoom-in" data-aos-delay="400">
                        <div className="relative w-64 h-64">
                            {/* Modern donut chart implementation */}
                            <div className="w-full h-full rounded-full flex items-center justify-center border-[24px] border-gray-200 dark:border-navy-700">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle
                                            cx="50" cy="50" r="38"
                                            fill="none"
                                            stroke="#3b82f6"
                                            strokeWidth="24"
                                            strokeDasharray={`${percentUsed} ${percentRemaining}`}
                                            strokeDashoffset="25"
                                            className="transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                </div>
                                <div className="text-center z-10">
                                    <h3 className="text-3xl font-bold text-navy-700 dark:text-white">{percentRemaining}%</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Tersisa</p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-2.5 bg-white dark:bg-navy-700 rounded-full shadow-lg">
                                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-2">
                                    <MdThumbUp className="h-5 w-5 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 px-2">
                        <div className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-all duration-200 cursor-pointer">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2.5"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Terpakai</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-navy-700 dark:text-white">
                                    Rp {(budgetStats.allocatedBudget - budgetStats.remainingBudget).toLocaleString()}
                                </span>
                                <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                    {percentUsed}%
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-all duration-200 cursor-pointer">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-green-500 mr-2.5"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Tersisa</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-navy-700 dark:text-white">
                                    Rp {budgetStats.remainingBudget.toLocaleString()}
                                </span>
                                <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                                    {percentRemaining}%
                                </span>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 dark:border-navy-600 my-3"></div>
                        <div className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-all duration-200 cursor-pointer">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 mr-2.5"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Total</span>
                            </div>
                            <span className="text-sm font-medium text-navy-700 dark:text-white">
                                Rp {budgetStats.totalBudget.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 transition-all duration-300 hover:shadow-md">
                            <h6 className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-3 flex items-center">
                                <MdChecklist className="h-5 w-5 mr-2" />
                                Rekomendasi
                            </h6>
                            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-3">
                                <li className="flex items-start gap-3 p-2 rounded-lg bg-white dark:bg-navy-800/80 shadow-sm">
                                    <MdTrendingDown className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                    <span>Pertimbangkan realokasi anggaran dari kategori dengan sisa dana tinggi</span>
                                </li>
                                <li className="flex items-start gap-3 p-2 rounded-lg bg-white dark:bg-navy-800/80 shadow-sm">
                                    <MdTrendingUp className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                    <span>Prioritaskan pembiayaan proposal pada kategori dengan sisa dana rendah</span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 transition-all duration-300 hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <h6 className="text-sm font-medium text-blue-800 dark:text-blue-400">
                                    Ringkasan
                                </h6>
                                <span className="px-2 py-1 bg-white dark:bg-navy-800 rounded-lg text-xs text-blue-600 dark:text-blue-400 shadow-sm">
                                    Q2 2025
                                </span>
                            </div>
                            <div className="mt-3 space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-600 dark:text-gray-400">Penggunaan Budget Optimal</span>
                                    <span className="text-navy-700 dark:text-white font-medium">78%</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-200 dark:bg-navy-700 rounded-full">
                                    <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '78%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default RemainingBudget;
