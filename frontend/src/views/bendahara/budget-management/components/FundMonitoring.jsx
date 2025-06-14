import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
  MdAnalytics,
  MdSearch,
  MdFilterList,
  MdRefresh,
  MdFileDownload,
  MdArrowBack,
  MdAttachMoney,
  MdFilterAlt,
  MdOutlineCalendarMonth,
  MdTrendingUp,
  MdTrendingDown,
  MdDateRange,
  MdInfo
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
// Import Recharts components
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const FundMonitoring = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Dummy data for fund monitoring
  const monitoringStats = {
    totalBudget: 4850000000,
    usedBudget: 3215000000,
    remainingBudget: 1635000000,
    utilizationRate: 66.29
  };

  const monitoringData = [
    {
      id: "FND-2025-001",
      category: "Penelitian Unggulan",
      allocated: 2400000000,
      used: 1650000000,
      remaining: 750000000,
      utilizationRate: 68.75,
      lastTransaction: "12 Jun 2025",
      trend: "up"
    },
    {
      id: "FND-2025-002",
      category: "Penelitian Dasar",
      allocated: 1450000000,
      used: 950000000,
      remaining: 500000000,
      utilizationRate: 65.52,
      lastTransaction: "10 Jun 2025",
      trend: "stable"
    },
    {
      id: "FND-2025-003",
      category: "Penelitian Terapan",
      allocated: 650000000,
      used: 420000000,
      remaining: 230000000,
      utilizationRate: 64.62,
      lastTransaction: "08 Jun 2025",
      trend: "down"
    },
    {
      id: "FND-2025-004",
      category: "Penelitian Kolaboratif",
      allocated: 350000000,
      used: 195000000,
      remaining: 155000000,
      utilizationRate: 55.71,
      lastTransaction: "05 Jun 2025",
      trend: "up"
    }
  ];

  // Monthly usage data for charts
  const monthlyData = [
    { month: "Jan", amount: 280000000 },
    { month: "Feb", amount: 350000000 },
    { month: "Mar", amount: 420000000 },
    { month: "Apr", amount: 380000000 },
    { month: "May", amount: 450000000 },
    { month: "Jun", amount: 510000000 }
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

  const filteredData = monitoringData.filter(item => {
    const matchesSearch =
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory === "all" || item.category.toLowerCase().includes(filterCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up": return <MdTrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case "down": return <MdTrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />;
      default: return null;
    }
  };

  const getUtilizationColor = (rate) => {
    if (rate > 80) return "text-red-600 dark:text-red-400";
    if (rate > 50) return "text-amber-600 dark:text-amber-400";
    return "text-green-600 dark:text-green-400";
  };

  const getUtilizationGradient = (rate) => {
    if (rate > 80) return "from-red-500 to-red-600 dark:from-red-400 dark:to-red-500";
    if (rate > 50) return "from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500";
    return "from-green-500 to-green-600 dark:from-green-400 dark:to-green-500";
  };

  // Format currency for chart tooltips
  const formatTooltipCurrency = (value) => {
    return `Rp ${value.toLocaleString()}`;
  };

  // Get filtered monthly data based on period selection
  const getFilteredMonthlyData = () => {
    switch (filterPeriod) {
      case "1-month":
        return monthlyData.slice(-1);
      case "3-months":
        return monthlyData.slice(-3);
      default:
        return monthlyData;
    }
  };

  // Calculate custom chart domain for better visualization
  const calculateChartDomain = () => {
    const filteredData = getFilteredMonthlyData();
    const maxValue = Math.max(...filteredData.map(item => item.amount));
    // Set minimum domain to 0 or slightly lower than min value for better visual
    const minValue = 0;
    // Add 10% padding to max value for better visual
    const maxDomainValue = maxValue * 1.1;

    return [minValue, maxDomainValue];
  };

  // Custom tooltip component for chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-navy-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-navy-700">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{`${label}`}</p>
          <p className="text-sm font-bold text-brand-500 dark:text-brand-400">
            {`Rp ${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pt-5">
      <div className="mb-8" data-aos="fade-up">
        <div className="flex items-center">
          <Link to="/bendahara/budget-management" className="mr-3 p-2.5 bg-brand-50 dark:bg-navy-800 rounded-full hover:bg-brand-100 dark:hover:bg-navy-700 transition-all duration-300 shadow-sm">
            <MdArrowBack className="h-5 w-5 text-brand-500 dark:text-white" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white tracking-tight">Monitoring Penggunaan Dana</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Pantau penggunaan dana penelitian secara real-time
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="100">
          <div className="flex items-center">
            <div className="rounded-full p-3.5 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 shadow-md">
              <MdAttachMoney className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Total Anggaran</p>
              <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                Rp {monitoringStats.totalBudget.toLocaleString()}
              </h4>
            </div>
          </div>
          <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4"></div>
        </Card>

        <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="150">
          <div className="flex items-center">
            <div className="rounded-full p-3.5 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 shadow-md">
              <MdAttachMoney className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Dana Terpakai</p>
              <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                Rp {monitoringStats.usedBudget.toLocaleString()}
              </h4>
            </div>
          </div>
          <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
            <div className="h-1 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 rounded-full"
              style={{ width: `${monitoringStats.utilizationRate}%` }}></div>
          </div>
        </Card>

        <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="200">
          <div className="flex items-center">
            <div className="rounded-full p-3.5 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 shadow-md">
              <MdAttachMoney className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Sisa Anggaran</p>
              <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                Rp {monitoringStats.remainingBudget.toLocaleString()}
              </h4>
            </div>
          </div>
          <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
            <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 rounded-full"
              style={{ width: `${100 - monitoringStats.utilizationRate}%` }}></div>
          </div>
        </Card>

        <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="250">
          <div className="flex items-center">
            <div className="rounded-full p-3.5 bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 shadow-md">
              <MdAnalytics className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Tingkat Penggunaan</p>
              <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1 flex items-center">
                {monitoringStats.utilizationRate}%
                <span className={`ml-2 text-xs px-2 py-1 rounded-full bg-${monitoringStats.utilizationRate > 80 ? 'red' : monitoringStats.utilizationRate > 50 ? 'amber' : 'green'}-100 dark:bg-${monitoringStats.utilizationRate > 80 ? 'red' : monitoringStats.utilizationRate > 50 ? 'amber' : 'green'}-900/30 text-${monitoringStats.utilizationRate > 80 ? 'red' : monitoringStats.utilizationRate > 50 ? 'amber' : 'green'}-600 dark:text-${monitoringStats.utilizationRate > 80 ? 'red' : monitoringStats.utilizationRate > 50 ? 'amber' : 'green'}-400`}>
                  {monitoringStats.utilizationRate > 80 ? 'Tinggi' : monitoringStats.utilizationRate > 50 ? 'Sedang' : 'Rendah'}
                </span>
              </h4>
            </div>
          </div>
          <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
            <div className={`h-1 bg-gradient-to-r ${getUtilizationGradient(monitoringStats.utilizationRate)} rounded-full`}
              style={{ width: `${monitoringStats.utilizationRate}%` }}></div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-5">
        <Card extra="p-6 lg:w-2/3 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0 flex items-center">
              Penggunaan Dana per Kategori
              <span className="bg-brand-50 text-brand-500 text-xs px-2 py-1 rounded-full ml-2 dark:bg-brand-900/30 dark:text-brand-400">{filteredData.length} Kategori</span>
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
                  <option value="all">Semua Kategori</option>
                  <option value="unggulan">Penelitian Unggulan</option>
                  <option value="dasar">Penelitian Dasar</option>
                  <option value="terapan">Penelitian Terapan</option>
                  <option value="kolaboratif">Penelitian Kolaboratif</option>
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
                  <th className="border-b border-gray-200 py-3 px-4 text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                    ID
                  </th>
                  <th className="border-b border-gray-200 py-3 px-4 text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                    Kategori
                  </th>
                  <th className="border-b border-gray-200 py-3 px-4 text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                    Dana Dialokasikan
                  </th>
                  <th className="border-b border-gray-200 py-3 px-4 text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                    Dana Terpakai
                  </th>
                  <th className="border-b border-gray-200 py-3 px-4 text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                    Sisa Dana
                  </th>
                  <th className="border-b border-gray-200 py-3 px-4 text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                    Penggunaan
                  </th>
                  <th className="border-b border-gray-200 py-3 px-4 text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-all duration-200 cursor-pointer">
                      <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                        <span className="py-1 px-2 bg-brand-50 dark:bg-navy-800 rounded-md text-brand-500 dark:text-brand-400">{item.id}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-navy-700">
                        {item.category}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                        Rp {item.allocated.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                        Rp {item.used.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                        Rp {item.remaining.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                        <div className="flex items-center gap-2">
                          <div className="w-full max-w-[100px] bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${getUtilizationGradient(item.utilizationRate)} h-2 rounded-full transition-all duration-500 ease-out`}
                              style={{ width: `${item.utilizationRate}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.utilizationRate > 80 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : item.utilizationRate > 50 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'}`}>
                            {item.utilizationRate}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                        <div className="flex items-center">
                          <span className={`flex items-center justify-center p-1.5 rounded-full ${item.trend === "up" ? "bg-green-100 dark:bg-green-900/30" : item.trend === "down" ? "bg-red-100 dark:bg-red-900/30" : "bg-gray-100 dark:bg-navy-700"}`}>
                            {getTrendIcon(item.trend)}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 bg-gray-100 dark:bg-navy-800 py-0.5 px-2 rounded-full">
                            {item.lastTransaction}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center">
                        <MdInfo className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" />
                        <p>Tidak ada data yang sesuai dengan kriteria pencarian</p>
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
              Tren Penggunaan Dana
            </h5>
            <select
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 appearance-none pr-8"
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
            >
              <option value="all">6 Bulan Terakhir</option>
              <option value="3-months">3 Bulan Terakhir</option>
              <option value="1-month">1 Bulan Terakhir</option>
            </select>
          </div>

          <div className="h-64 mb-6 relative" data-aos="fade-up" data-aos-delay="400">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getFilteredMonthlyData()}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                barSize={20}
              >
                <defs>
                  {/* Create gradient definitions for the bars */}
                  {getFilteredMonthlyData().map((entry, index) => {
                    const gradientPosition = index / (getFilteredMonthlyData().length - 1) * 100;
                    return (
                      <linearGradient
                        key={`gradient-${index}`}
                        id={`barGradient-${index}`}
                        x1="0" y1="0" x2="0" y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={`hsl(${220 + gradientPosition}, 80%, 45%)`}
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="100%"
                          stopColor={`hsl(${220 + gradientPosition}, 70%, 55%)`}
                          stopOpacity={0.7}
                        />
                      </linearGradient>
                    );
                  })}
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  strokeOpacity={0.7}
                  vertical={false}
                  className="dark:stroke-navy-700"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB', strokeOpacity: 0.8 }}
                  className="dark:text-gray-400 dark:stroke-navy-700"
                />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                  tick={{ fill: '#6B7280', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  className="dark:text-gray-400"
                  domain={calculateChartDomain()}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(229, 231, 235, 0.2)', className: "dark:fill-navy-700 dark:fill-opacity-30" }}
                  wrapperClassName="outline-none"
                />
                {getFilteredMonthlyData().map((entry, index) => (
                  <Bar
                    key={`bar-${index}`}
                    dataKey="amount"
                    fill={`url(#barGradient-${index})`}
                    radius={[4, 4, 0, 0]}
                    fillOpacity={0.9}
                    className="hover:opacity-80 transition-opacity duration-300"
                    name={entry.month}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Alternative Chart Options - uncomment one of these if you prefer a different style */}
          {/* 
          // Area Chart Option
          <div className="h-64 mb-6 relative" data-aos="fade-up" data-aos-delay="400">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={getFilteredMonthlyData()}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.7} vertical={false} className="dark:stroke-navy-700" />
                <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#E5E7EB', strokeOpacity: 0.8 }} className="dark:text-gray-400 dark:stroke-navy-700" />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} tick={{ fill: '#6B7280', fontSize: 11 }} tickLine={false} axisLine={false} className="dark:text-gray-400" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="amount" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" activeDot={{ r: 6, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          */}

          {/* 
          // Line Chart Option
          <div className="h-64 mb-6 relative" data-aos="fade-up" data-aos-delay="400">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={getFilteredMonthlyData()}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.7} vertical={false} className="dark:stroke-navy-700" />
                <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#E5E7EB', strokeOpacity: 0.8 }} className="dark:text-gray-400 dark:stroke-navy-700" />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} tick={{ fill: '#6B7280', fontSize: 11 }} tickLine={false} axisLine={false} className="dark:text-gray-400" />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="amount" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4, strokeWidth: 0, fill: '#4F46E5' }} activeDot={{ r: 7, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          */}

          <div className="border-t border-gray-200 dark:border-navy-700 pt-5">
            <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-4 flex items-center">
              <span className="h-4 w-1 bg-brand-500 dark:bg-brand-400 rounded-full mr-2"></span>
              Ringkasan Penggunaan
            </h6>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 transition-all duration-200 cursor-pointer">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <MdOutlineCalendarMonth className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-3">Penggunaan Bulanan Rata-rata</span>
                </div>
                <span className="text-sm font-bold text-navy-700 dark:text-white bg-white dark:bg-navy-900 py-1 px-3 rounded-lg shadow-sm">
                  Rp {(3215000000 / 6).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 transition-all duration-200 cursor-pointer">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                    <MdTrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-3">Bulan Tertinggi</span>
                </div>
                <span className="text-sm font-bold text-navy-700 dark:text-white bg-white dark:bg-navy-900 py-1 px-3 rounded-lg shadow-sm">
                  Jun - Rp {monthlyData[5].amount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 transition-all duration-200 cursor-pointer">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                    <MdTrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-3">Bulan Terendah</span>
                </div>
                <span className="text-sm font-bold text-navy-700 dark:text-white bg-white dark:bg-navy-900 py-1 px-3 rounded-lg shadow-sm">
                  Jan - Rp {monthlyData[0].amount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 transition-all duration-200 cursor-pointer">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <MdDateRange className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-3">Proyeksi Akhir Tahun</span>
                </div>
                <span className="text-sm font-bold text-navy-700 dark:text-white bg-white dark:bg-navy-900 py-1 px-3 rounded-lg shadow-sm">
                  Rp {(3215000000 * 2).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div >
  );
};

export default FundMonitoring;
