import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
  MdPieChart,
  MdSearch,
  MdFilterList,
  MdRefresh,
  MdFileDownload,
  MdArrowBack,
  MdAdd,
  MdEdit,
  MdDelete,
  MdOutlineTextSnippet,
  MdFilterAlt,
  MdBarChart,
  MdAccountBalance,
  MdGroups,
  MdCategory,
  MdInfo
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
// Import Recharts components
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  LabelList
} from 'recharts';

const BudgetDistribution = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("2025");
  const [isLoading, setIsLoading] = useState(false);
  const [activePieIndex, setActivePieIndex] = useState(null);

  // Dummy data for budget distribution
  const distributionStats = {
    totalBudget: 4850000000,
    categoriesCount: 4,
    facultiesCount: 10,
    departmentsCount: 24
  };

  const categoryDistribution = [
    {
      id: "CAT-2025-001",
      name: "Penelitian Unggulan",
      budget: 2400000000,
      percentage: 49.48,
      color: "bg-blue-500",
      proposals: 18,
      averageFunding: 133333333
    },
    {
      id: "CAT-2025-002",
      name: "Penelitian Dasar",
      budget: 1450000000,
      percentage: 29.90,
      color: "bg-green-500",
      proposals: 25,
      averageFunding: 58000000
    },
    {
      id: "CAT-2025-003",
      name: "Penelitian Terapan",
      budget: 650000000,
      percentage: 13.40,
      color: "bg-amber-500",
      proposals: 14,
      averageFunding: 46428571
    },
    {
      id: "CAT-2025-004",
      name: "Penelitian Kolaboratif",
      budget: 350000000,
      percentage: 7.22,
      color: "bg-purple-500",
      proposals: 5,
      averageFunding: 70000000
    }
  ];

  const facultyDistribution = [
    { name: "Fakultas Teknik", budget: 1250000000, percentage: 25.77, color: "#3b82f6" }, // blue-500
    { name: "Fakultas Kedokteran", budget: 850000000, percentage: 17.53, color: "#22c55e" }, // green-500
    { name: "Fakultas Ekonomi", budget: 650000000, percentage: 13.40, color: "#f59e0b" }, // amber-500
    { name: "Fakultas MIPA", budget: 550000000, percentage: 11.34, color: "#a855f7" }, // purple-500
    { name: "Fakultas Ilmu Komputer", budget: 420000000, percentage: 8.66, color: "#6366f1" }, // indigo-500
    { name: "Lainnya", budget: 1130000000, percentage: 23.30, color: "#6b7280" }, // gray-500
  ];

  // Prepare data for pie chart
  const pieChartData = categoryDistribution.map(category => ({
    name: category.name,
    value: category.budget,
    percentage: category.percentage,
    color: category.color.replace('bg-', '').split('-')[0],
  }));

  // Define colors for pie chart
  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#6366f1', '#6b7280'];

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

  const filteredCategories = categoryDistribution.filter(category => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Custom tooltip for category pie chart
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-navy-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-navy-700">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{payload[0].name}</p>
          <p className="text-sm font-bold text-brand-500 dark:text-brand-400">
            Rp {payload[0].value.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {payload[0].payload.percentage}% dari total
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for faculty bar chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-navy-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-navy-700">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
          <p className="text-sm font-bold text-brand-500 dark:text-brand-400">
            Rp {payload[0].value.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {payload[0].payload.percentage}% dari total
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="pt-5">
      <div className="mb-8" data-aos="fade-up">
        <div className="flex items-center">
          <Link to="/bendahara/budget-management" className="mr-3 p-2.5 bg-brand-50 dark:bg-navy-800 rounded-full hover:bg-brand-100 dark:hover:bg-navy-700 transition-all duration-300 shadow-sm">
            <MdArrowBack className="h-5 w-5 text-brand-500 dark:text-white" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-navy-700 dark:text-white tracking-tight">Distribusi Anggaran</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Distribusi anggaran penelitian berdasarkan kategori dan fakultas
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
                Rp {distributionStats.totalBudget.toLocaleString()}
              </h4>
            </div>
          </div>
          <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4"></div>
        </Card>

        <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="150">
          <div className="flex items-center">
            <div className="rounded-full p-3.5 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 shadow-md">
              <MdCategory className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Jumlah Kategori</p>
              <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                {distributionStats.categoriesCount} <span className="text-sm text-gray-500 dark:text-gray-400">kategori</span>
              </h4>
            </div>
          </div>
          <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4"></div>
        </Card>

        <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="200">
          <div className="flex items-center">
            <div className="rounded-full p-3.5 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 shadow-md">
              <MdOutlineTextSnippet className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Jumlah Fakultas</p>
              <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                {distributionStats.facultiesCount} <span className="text-sm text-gray-500 dark:text-gray-400">fakultas</span>
              </h4>
            </div>
          </div>
          <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4"></div>
        </Card>

        <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="250">
          <div className="flex items-center">
            <div className="rounded-full p-3.5 bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 shadow-md">
              <MdGroups className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Jumlah Departemen</p>
              <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                {distributionStats.departmentsCount} <span className="text-sm text-gray-500 dark:text-gray-400">departemen</span>
              </h4>
            </div>
          </div>
          <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4"></div>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-5">
        <Card extra="p-6 lg:w-1/2 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="300">
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
              Distribusi per Kategori
              <span className="bg-brand-50 text-brand-500 text-xs px-2 py-1 rounded-full ml-2 dark:bg-brand-900/30 dark:text-brand-400">{filteredCategories.length}</span>
            </h5>
            <div className="flex gap-2">
              <select
                className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 appearance-none pr-8"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
              <button
                onClick={handleRefresh}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-200"
                title="Refresh data"
              >
                <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          <div className="mb-6">
            {/* Pie Chart Implementation */}
            <div className="h-64 relative mb-4" data-aos="fade-up" data-aos-delay="350">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={(_, index) => setActivePieIndex(index)}
                    onMouseLeave={() => setActivePieIndex(null)}
                    className="focus:outline-none"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        className={`${activePieIndex === index ? 'opacity-80' : 'opacity-100'} transition-opacity duration-300`}
                        stroke={activePieIndex === index ? "#fff" : "none"}
                        strokeWidth={activePieIndex === index ? 2 : 0}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {categoryDistribution.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-colors duration-200 cursor-pointer"
                  onMouseEnter={() => setActivePieIndex(index)}
                  onMouseLeave={() => setActivePieIndex(null)}
                >
                  <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                  <div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rounded-lg overflow-hidden">
              <thead className="bg-gray-50 dark:bg-navy-800">
                <tr>
                  <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white">
                    Kategori
                  </th>
                  <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white">
                    Anggaran
                  </th>
                  <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white">
                    Persentase
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setActivePieIndex(index)}
                    onMouseLeave={() => setActivePieIndex(null)}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                      <div className="flex items-center">
                        <div className={`w-2.5 h-2.5 rounded-full ${category.color} mr-2`}></div>
                        {category.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-navy-700">
                      Rp {category.budget.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-navy-800 rounded-full text-xs">
                        {category.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card extra="p-6 lg:w-1/2 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="350">
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
              Distribusi per Fakultas
              <span className="bg-brand-50 text-brand-500 text-xs px-2 py-1 rounded-full ml-2 dark:bg-brand-900/30 dark:text-brand-400">{facultyDistribution.length}</span>
            </h5>
            <div className="flex gap-2">
              <select
                className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 appearance-none pr-8"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
              <button
                className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-200"
                title="Download laporan"
              >
                <MdFileDownload className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Modern Bar Chart Implementation */}
          <div className="mb-6 h-64" data-aos="fade-up" data-aos-delay="400">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={facultyDistribution}
                margin={{ top: 10, right: 0, left: 0, bottom: 25 }}
                barSize={24}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-navy-700" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#6B7280', fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB', strokeOpacity: 0.8 }}
                  className="dark:text-gray-400 dark:stroke-navy-700"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tickFormatter={(value) => value.split(' ')[1] || value}
                />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                  tick={{ fill: '#6B7280', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  className="dark:text-gray-400"
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="budget" radius={[4, 4, 0, 0]}>
                  {facultyDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="hover:opacity-80 transition-opacity duration-300"
                    />
                  ))}
                  <LabelList dataKey="percentage" position="top" fill="#6B7280" fontSize={10} formatter={(value) => `${value}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rounded-lg overflow-hidden">
              <thead className="bg-gray-50 dark:bg-navy-800">
                <tr>
                  <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white">
                    Fakultas
                  </th>
                  <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white">
                    Anggaran
                  </th>
                  <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white">
                    Persentase
                  </th>
                </tr>
              </thead>
              <tbody>
                {facultyDistribution.map((faculty, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-all duration-200 cursor-pointer">
                    <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                      <div className="flex items-center">
                        <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: faculty.color }}></div>
                        {faculty.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-navy-700">
                      Rp {faculty.budget.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-navy-800 rounded-full text-xs">
                        {faculty.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card extra="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="400">
        <div className="flex items-center justify-between mb-6">
          <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
            Detail Distribusi Anggaran per Kategori
            <span className="bg-brand-50 text-brand-500 text-xs px-2 py-1 rounded-full ml-2 dark:bg-brand-900/30 dark:text-brand-400">{filteredCategories.length} Kategori</span>
          </h5>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Cari kategori..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-200">
                <MdFilterAlt className="h-5 w-5" />
              </button>
              <button className="p-2.5 rounded-xl bg-brand-500 text-white hover:bg-brand-600 transition-all duration-200">
                <MdAdd className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] table-auto rounded-lg overflow-hidden">
            <thead className="bg-gray-50 dark:bg-navy-800">
              <tr>
                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white">
                  ID Kategori
                </th>
                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white">
                  Nama Kategori
                </th>
                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white">
                  Anggaran
                </th>
                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white">
                  Persentase
                </th>
                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white">
                  Jumlah Proposal
                </th>
                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white">
                  Pendanaan Rata-rata
                </th>
                <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-all duration-200 cursor-pointer">
                    <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                      <span className="py-1 px-2 bg-brand-50 dark:bg-navy-800 rounded-md text-brand-500 dark:text-brand-400">{category.id}</span>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                        {category.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                      Rp {category.budget.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 dark:bg-navy-700 rounded-full h-1.5 mr-2">
                          <div
                            className={`h-1.5 rounded-full ${category.color.replace('bg-', 'bg-')}`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          {category.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-navy-700">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-navy-800 rounded-lg text-xs">
                        {category.proposals} proposal
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-navy-700">
                      Rp {category.averageFunding.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                      <div className="flex space-x-2">
                        <button className="p-1.5 rounded-lg bg-brand-50 dark:bg-brand-900/20 text-brand-500 dark:text-brand-400 hover:bg-brand-100 transition-colors duration-200" title="Edit kategori">
                          <MdEdit size={16} />
                        </button>
                        <button className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-100 transition-colors duration-200" title="Hapus kategori">
                          <MdDelete size={16} />
                        </button>
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
                        onClick={() => setSearchTerm("")}
                      >
                        Reset pencarian
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default BudgetDistribution;
