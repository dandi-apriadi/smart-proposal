import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
  MdOutlineTextSnippet,
  MdSearch,
  MdFilterList,
  MdRefresh,
  MdFileDownload,
  MdArrowBack,
  MdAdd,
  MdEdit,
  MdDelete,
  MdSave,
  MdAttachMoney,
  MdArrowDropDown,
  MdArrowDropUp,
  MdCalendarToday,
  MdOutlineAccountBalanceWallet,
  MdOutlineCategory,
  MdClose,
  MdOutlineWallet,
  MdPieChart,
  MdAddChart,
  MdOutlineHistory,
  MdAssignment,
  MdInfoOutline,
  MdCheck,
  MdPriorityHigh,
  MdLightbulbOutline,
  MdEventBusy
} from "react-icons/md";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import AOS from "aos";
import "aos/dist/aos.css";

const SessionAllocation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("2025");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSession, setExpandedSession] = useState(null);
  const [category1Value, setCategory1Value] = useState(50);
  const [category2Value, setCategory2Value] = useState(30);
  const [category3Value, setCategory3Value] = useState(20);
  const [showTips, setShowTips] = useState(false);

  // Enhanced dummy data with more session allocations
  const sessionAllocations = [
    {
      id: "SES-2025-001",
      name: "Sesi Penelitian Semester I 2025",
      startDate: "2025-01-10",
      endDate: "2025-06-30",
      totalBudget: 1000000000,
      allocatedBudget: 500000000,
      remainingBudget: 500000000,
      status: "Aktif",
      lastUpdated: "2025-01-15",
      owner: "Dr. Ahmad Rizki",
      notes: "Sesi pendanaan utama untuk penelitian semester pertama 2025",
      categories: [
        { name: "Penelitian Unggulan", allocation: 250000000, used: 200000000, color: "#4F46E5" },
        { name: "Penelitian Dasar", allocation: 150000000, used: 50000000, color: "#0EA5E9" },
        { name: "Penelitian Terapan", allocation: 100000000, used: 30000000, color: "#10B981" }
      ]
    },
    {
      id: "SES-2025-002",
      name: "Sesi Penelitian Semester II 2025",
      startDate: "2025-07-01",
      endDate: "2025-12-31",
      totalBudget: 1200000000,
      allocatedBudget: 600000000,
      remainingBudget: 600000000,
      status: "Perencanaan",
      lastUpdated: "2025-01-10",
      owner: "Dr. Siti Nurhaliza",
      notes: "Persiapan pendanaan untuk penelitian semester kedua 2025",
      categories: [
        { name: "Penelitian Unggulan", allocation: 300000000, used: 0, color: "#4F46E5" },
        { name: "Penelitian Dasar", allocation: 180000000, used: 0, color: "#0EA5E9" },
        { name: "Penelitian Terapan", allocation: 120000000, used: 0, color: "#10B981" }
      ]
    },
    {
      id: "SES-2025-003",
      name: "Sesi Penelitian Khusus AI & Big Data",
      startDate: "2025-03-15",
      endDate: "2025-09-15",
      totalBudget: 850000000,
      allocatedBudget: 750000000,
      remainingBudget: 100000000,
      status: "Aktif",
      lastUpdated: "2025-03-20",
      owner: "Prof. Budi Santoso",
      notes: "Alokasi khusus untuk penelitian di bidang AI dan Big Data",
      categories: [
        { name: "Penelitian AI", allocation: 450000000, used: 320000000, color: "#8B5CF6" },
        { name: "Penelitian Big Data", allocation: 300000000, used: 280000000, color: "#EC4899" },
        { name: "Penelitian IoT", allocation: 100000000, used: 50000000, color: "#F59E0B" }
      ]
    },
    {
      id: "SES-2025-004",
      name: "Sesi Pendanaan Kolaborasi Industri",
      startDate: "2025-02-01",
      endDate: "2025-10-31",
      totalBudget: 2000000000,
      allocatedBudget: 1800000000,
      remainingBudget: 200000000,
      status: "Aktif",
      lastUpdated: "2025-04-05",
      owner: "Dr. Maya Wijaya",
      notes: "Pendanaan khusus untuk penelitian kolaborasi dengan industri",
      categories: [
        { name: "Riset Aplikatif", allocation: 1200000000, used: 950000000, color: "#EF4444" },
        { name: "Pengembangan Produk", allocation: 500000000, used: 320000000, color: "#F59E0B" },
        { name: "Studi Implementasi", allocation: 300000000, used: 180000000, color: "#3B82F6" }
      ]
    },
    {
      id: "SES-2025-005",
      name: "Sesi Penelitian Kebijakan Publik",
      startDate: "2025-05-01",
      endDate: "2026-01-31",
      totalBudget: 750000000,
      allocatedBudget: 350000000,
      remainingBudget: 400000000,
      status: "Tertunda",
      lastUpdated: "2025-01-25",
      owner: "Dr. Indra Kusuma",
      notes: "Menunggu persetujuan final dari komite kebijakan",
      categories: [
        { name: "Kebijakan Ekonomi", allocation: 300000000, used: 0, color: "#8B5CF6" },
        { name: "Kebijakan Sosial", allocation: 250000000, used: 0, color: "#EC4899" },
        { name: "Kebijakan Lingkungan", allocation: 200000000, used: 0, color: "#10B981" }
      ]
    }
  ];

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

  const toggleExpandSession = (sessionId) => {
    if (expandedSession === sessionId) {
      setExpandedSession(null);
    } else {
      setExpandedSession(sessionId);
    }
  };

  const filteredSessions = sessionAllocations.filter(session => {
    const matchesSearch =
      session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = filterYear === "all" || session.id.includes(filterYear);

    return matchesSearch && matchesYear;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Aktif": return {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-700 dark:text-green-400",
        icon: <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
      };
      case "Perencanaan": return {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-700 dark:text-blue-400",
        icon: <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
      };
      default: return {
        bg: "bg-gray-100 dark:bg-gray-900/30",
        text: "text-gray-700 dark:text-gray-400",
        icon: <span className="w-2 h-2 bg-gray-500 rounded-full mr-1"></span>
      };
    }
  };

  // Calculate progress percentage
  const calculateProgress = (session) => {
    const usedAmount = session.categories.reduce((sum, cat) => sum + cat.used, 0);
    return Math.round((usedAmount / session.totalBudget) * 100);
  };

  // Calculate total budget from all sessions
  const totalBudget = sessionAllocations.reduce((sum, session) => sum + session.totalBudget, 0);

  // Calculate total used budget
  const totalUsed = sessionAllocations.reduce((sum, session) => {
    return sum + session.categories.reduce((catSum, cat) => catSum + cat.used, 0);
  }, 0);

  // Calculate active sessions count
  const activeSessionsCount = sessionAllocations.filter(session => session.status === "Aktif").length;

  // Calculate percentage for form category allocation
  useEffect(() => {
    const total = category1Value + category2Value + category3Value;
    if (total !== 100) {
      // Adjust the last slider to make total 100%
      setCategory3Value(100 - category1Value - category2Value);
    }
  }, [category1Value, category2Value]);

  // Generate data for pie chart
  const generatePieData = (session) => {
    return session.categories.map(cat => ({
      name: cat.name,
      value: cat.allocation,
      color: cat.color
    }));
  };

  return (
    <div className="pt-5">
      {/* Hero section with gradient background */}
      <div className="mb-8 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl p-8 text-white relative overflow-hidden" data-aos="fade-up">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-8 translate-y-8"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <Link to="/bendahara/budget-management" className="mr-4 p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all">
              <MdArrowBack className="h-5 w-5 text-white" />
            </Link>
            <div>
              <h2 className="text-2xl font-bold">Alokasi Dana per Sesi</h2>
              <p className="mt-1 text-indigo-100">
                Kelola alokasi dana per sesi untuk penelitian dengan mudah dan efisien
              </p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-xs text-white/70">Total Anggaran</p>
              <p className="text-xl font-semibold">Rp {(totalBudget / 1000000000).toFixed(2)}M</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-xs text-white/70">Realisasi</p>
              <p className="text-xl font-semibold">{Math.round((totalUsed / totalBudget) * 100)}%</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-xs text-white/70">Sesi Aktif</p>
              <p className="text-xl font-semibold">{activeSessionsCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-5 mb-8">
        {/* Left Column - Session List */}
        <Card extra="p-0 xl:w-3/4 overflow-hidden" data-aos="fade-up" data-aos-delay="350">
          {/* Search and Filter Header */}
          <div className="p-6 border-b border-gray-100 dark:border-navy-700 bg-white dark:bg-navy-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                <MdOutlineCategory className="mr-2 h-5 w-5 text-indigo-500" />
                Alokasi Sesi Penelitian <span className="ml-2 text-xs py-1 px-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">{sessionAllocations.length} sesi</span>
              </h5>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-grow min-w-[180px] max-w-[250px]">
                  <input
                    type="text"
                    placeholder="Cari sesi..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <MdSearch className="absolute left-3 top-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>

                <select
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none pr-10 relative transition-all"
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px'
                  }}
                >
                  <option value="all">Semua Tahun</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={handleRefresh}
                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-800 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-700 transition-all relative group"
                    aria-label="Refresh"
                  >
                    <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                    <span className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Refresh Data
                    </span>
                  </button>

                  <button
                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-800 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-700 transition-all relative group"
                    aria-label="Export"
                  >
                    <MdFileDownload className="h-5 w-5" />
                    <span className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Ekspor Data
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Session List */}
          <div className="p-6 bg-gray-50 dark:bg-navy-900/40 min-h-[400px]">
            <div className="space-y-4">
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => {
                  const status = getStatusColor(session.status);
                  const progressPercentage = calculateProgress(session);
                  const pieData = generatePieData(session);

                  return (
                    <div
                      key={session.id}
                      className="bg-white dark:bg-navy-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 overflow-hidden"
                      data-aos="fade-up"
                    >
                      <div
                        className={`cursor-pointer transition-colors duration-200 ${expandedSession === session.id ? 'bg-gray-50/70 dark:bg-navy-700/50' : ''}`}
                        onClick={() => toggleExpandSession(session.id)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-5">
                          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                            <div className="flex items-center mb-2 md:mb-0">
                              <div className="bg-gray-100 dark:bg-navy-900 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mr-3 border border-gray-200 dark:border-navy-700">
                                {session.id}
                              </div>
                              <span className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center ${status.bg} ${status.text}`}>
                                {status.icon} {session.status}
                              </span>
                            </div>
                            <h6 className="font-semibold text-navy-700 dark:text-white text-sm md:text-base">
                              {session.name}
                            </h6>
                          </div>

                          <div className="flex items-center mt-3 md:mt-0">
                            <div className="flex flex-col items-end mr-4">
                              <p className="text-xs text-gray-500 dark:text-gray-400">Total Anggaran</p>
                              <p className="text-sm font-semibold text-navy-700 dark:text-white">
                                Rp {(session.totalBudget / 1000000).toLocaleString()}M
                              </p>
                            </div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${expandedSession === session.id ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" : "bg-gray-100 text-gray-600 dark:bg-navy-700 dark:text-gray-400"}`}>
                              {expandedSession === session.id ? <MdArrowDropUp className="h-6 w-6" /> : <MdArrowDropDown className="h-6 w-6" />}
                            </div>
                          </div>
                        </div>

                        {/* Progress bar beneath session header */}
                        <div className="px-5 pb-5">
                          <div className="flex justify-between items-center text-xs mb-1.5">
                            <span className="text-gray-500 dark:text-gray-400">Penggunaan Dana</span>
                            <span className={`font-medium ${progressPercentage >= 80 ? 'text-red-500' : progressPercentage >= 60 ? 'text-amber-500' : 'text-green-500'}`}>{progressPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 rounded-full ${progressPercentage >= 80 ? 'bg-red-500' : progressPercentage >= 60 ? 'bg-amber-500' : 'bg-green-500'}`}
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded details */}
                      {expandedSession === session.id && (
                        <div className="p-5 border-t border-gray-100 dark:border-navy-700 bg-white dark:bg-navy-800 animate-fade-in-down">
                          {/* Basic info cards */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                            <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4 flex items-start">
                              <div className="mr-3 p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                                <MdCalendarToday className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Periode Sesi</p>
                                <p className="text-sm font-medium text-navy-700 dark:text-white">
                                  {new Date(session.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - {new Date(session.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                              </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4 flex items-start">
                              <div className="mr-3 p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                                <MdOutlineAccountBalanceWallet className="h-5 w-5 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Dana Teralokasi</p>
                                <p className="text-sm font-medium text-navy-700 dark:text-white">
                                  Rp {(session.allocatedBudget / 1000000).toLocaleString()}M
                                </p>
                              </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4 flex items-start">
                              <div className="mr-3 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                                <MdOutlineWallet className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sisa Anggaran</p>
                                <p className="text-sm font-medium text-navy-700 dark:text-white">
                                  Rp {(session.remainingBudget / 1000000).toLocaleString()}M
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Advanced info cards */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4">
                              <div className="flex items-center mb-3">
                                <MdAssignment className="h-5 w-5 text-indigo-500 mr-2" />
                                <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Detail Sesi</h6>
                              </div>
                              <div className="text-xs space-y-1.5">
                                <div className="flex justify-between">
                                  <span className="text-gray-500 dark:text-gray-400">Penanggung Jawab:</span>
                                  <span className="text-navy-700 dark:text-white font-medium">{session.owner}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500 dark:text-gray-400">Update Terakhir:</span>
                                  <span className="text-navy-700 dark:text-white font-medium">
                                    {new Date(session.lastUpdated).toLocaleDateString('id-ID')}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500 dark:text-gray-400">Kategori:</span>
                                  <span className="text-navy-700 dark:text-white font-medium">{session.categories.length}</span>
                                </div>
                              </div>
                              <div className="mt-3 pt-2 border-t border-gray-200 dark:border-navy-700">
                                <p className="text-xs text-gray-600 dark:text-gray-400 italic">"{session.notes}"</p>
                              </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4 col-span-1 md:col-span-2">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center">
                                  <MdPieChart className="h-5 w-5 text-indigo-500 mr-2" />
                                  <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Alokasi Anggaran</h6>
                                </div>
                                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 p-1 rounded bg-white dark:bg-navy-800">
                                  Total: Rp {(session.totalBudget / 1000000).toLocaleString()}M
                                </div>
                              </div>

                              <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-grow">
                                  <div className="space-y-3">
                                    {session.categories.map((category, idx) => {
                                      const usagePercentage = Math.round((category.used / category.allocation) * 100);
                                      return (
                                        <div key={idx} className="flex items-center gap-3">
                                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }}></div>
                                          <div className="text-xs text-gray-700 dark:text-gray-300 font-medium flex-shrink-0 w-32">
                                            {category.name}
                                          </div>
                                          <div className="flex-grow">
                                            <div className="flex justify-between text-xs mb-1">
                                              <span className="text-gray-500 dark:text-gray-400">
                                                Rp {(category.used / 1000000).toLocaleString()}M / Rp {(category.allocation / 1000000).toLocaleString()}M
                                              </span>
                                              <span className={usagePercentage >= 80 ? 'text-red-500' : usagePercentage >= 60 ? 'text-amber-500' : 'text-green-500'}>
                                                {usagePercentage}%
                                              </span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-1.5">
                                              <div
                                                className="h-1.5 rounded-full"
                                                style={{
                                                  width: `${usagePercentage}%`,
                                                  backgroundColor: category.color
                                                }}
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div className="w-full md:w-32 h-32 flex-shrink-0">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                      <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={40}
                                        innerRadius={25}
                                        paddingAngle={2}
                                      >
                                        {pieData.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                      </Pie>
                                      <Tooltip formatter={(value) => [`Rp ${(value / 1000000).toFixed(1)}M`, undefined]} />
                                    </PieChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex justify-between space-x-3 mt-5 pt-4 border-t border-gray-100 dark:border-navy-700">
                            <div>
                              <button
                                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-navy-900 text-gray-700 dark:text-gray-300 text-xs hover:bg-gray-200 dark:hover:bg-navy-700 transition-colors"
                                onClick={(e) => { e.stopPropagation(); /* Add action */ }}
                              >
                                <MdOutlineHistory className="h-4 w-4 mr-1 inline" /> Histori
                              </button>
                            </div>

                            <div className="flex gap-2">
                              <button className="px-4 py-2 rounded-xl bg-white dark:bg-navy-800 border border-indigo-200 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex items-center">
                                <MdEdit className="h-4 w-4 mr-1.5" />
                                Edit Sesi
                              </button>

                              {session.status !== "Aktif" && (
                                <button className="px-4 py-2 rounded-xl bg-white dark:bg-navy-800 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center">
                                  <MdDelete className="h-4 w-4 mr-1.5" />
                                  Hapus Sesi
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-navy-800 rounded-xl shadow-sm border border-dashed border-gray-300 dark:border-navy-600">
                  <MdSearch className="h-12 w-12 mb-3 text-gray-400 dark:text-gray-600" />
                  <p className="text-lg font-medium">Tidak ada sesi yang ditemukan</p>
                  <p className="mt-1 text-sm">Coba ubah filter atau kata kunci pencarian</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Right Column - Create New Session */}
        <Card extra="p-0 xl:w-1/4 overflow-hidden" data-aos="fade-up" data-aos-delay="400">
          <div className="p-6 bg-gradient-to-br from-indigo-500 to-blue-600 text-white relative">
            <div className="absolute top-2 right-2">
              <button
                className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                onClick={() => setShowTips(!showTips)}
              >
                <MdInfoOutline className="h-4 w-4" />
              </button>
            </div>
            <h5 className="text-lg font-bold mb-2 flex items-center">
              <MdAdd className="h-5 w-5 mr-2" />
              Tambah Sesi Baru
            </h5>
            <p className="text-sm text-indigo-100 mb-4">Buat sesi pendanaan baru dengan alokasi kategori yang sesuai</p>

            {/* Tips popup */}
            {showTips && (
              <div className="absolute top-16 right-4 w-64 bg-white dark:bg-navy-900 p-3 rounded-lg shadow-xl text-gray-700 dark:text-gray-300 text-xs z-10 animate-fade-in-down">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold flex items-center">
                    <MdLightbulbOutline className="h-4 w-4 mr-1 text-amber-500" />
                    Tips Alokasi Anggaran
                  </span>
                  <button onClick={() => setShowTips(false)}>
                    <MdClose className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Tetapkan kategori penelitian prioritas dengan alokasi minimum 50%</li>
                  <li>Pastikan total alokasi seluruh kategori adalah 100%</li>
                  <li>Sertakan catatan khusus untuk mempermudah pelacakan</li>
                </ul>
              </div>
            )}
          </div>

          <div className="p-6 bg-white dark:bg-navy-800">
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Nama Sesi
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-900 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  placeholder="Sesi Penelitian Semester I 2025"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-900 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Tanggal Selesai
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-900 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Total Anggaran
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400">Rp</span>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-900 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                    placeholder="1.000.000.000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Penanggung Jawab
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-900 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  placeholder="Nama penanggung jawab"
                />
              </div>

              <div className="pt-3">
                <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                  <MdOutlineCategory className="h-4 w-4 mr-1.5 text-indigo-500" />
                  Alokasi Kategori
                </h6>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-navy-900 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-white">Penelitian Unggulan</label>
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{category1Value}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="90"
                      value={category1Value}
                      onChange={(e) => setCategory1Value(parseInt(e.target.value))}
                      className="w-full h-2 bg-indigo-200 dark:bg-indigo-900/50 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-navy-900 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-white">Penelitian Dasar</label>
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{category2Value}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={90 - category1Value}
                      value={category2Value}
                      onChange={(e) => setCategory2Value(parseInt(e.target.value))}
                      className="w-full h-2 bg-indigo-200 dark:bg-indigo-900/50 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-navy-900 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-white">Penelitian Terapan</label>
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{category3Value}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      disabled
                      value={category3Value}
                      className="w-full h-2 bg-indigo-200 dark:bg-indigo-900/50 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">Otomatis menyesuaikan dengan total 100%</p>
                  </div>

                  {/* Visual representation of allocation */}
                  <div className="h-8 flex rounded-lg overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${category1Value}%` }}></div>
                    <div className="h-full bg-blue-500" style={{ width: `${category2Value}%` }}></div>
                    <div className="h-full bg-green-500" style={{ width: `${category3Value}%` }}></div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Catatan (Opsional)
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-900 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  placeholder="Tambahkan catatan untuk sesi ini..."
                  rows={3}
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full mt-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <MdSave className="h-5 w-5 mr-2" />
                Simpan Sesi Baru
              </button>
            </form>
          </div>
        </Card>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SessionAllocation;