import React, { useState, useEffect } from "react";
import {
  MdSearch,
  MdFilterList,
  MdDescription,
  MdDownload,
  MdVisibility,
  MdCalendarToday,
  MdBarChart,
  MdPieChart,
  MdAdd,
  MdOutlineFilterAlt,
  MdOutlineSortByAlpha,
  MdOutlineInsertDriveFile,
  MdOutlineMoreVert,
  MdOutlineShare,
  MdOutlineDelete,
  MdGridView,
  MdViewList,
  MdOutlineFilePresent,
  MdOutlineSync,
  MdCheckCircle
} from "react-icons/md";
import {
  FiCalendar,
  FiChevronDown,
  FiClock,
  FiDownload,
  FiFileText,
  FiFilter,
  FiUsers
} from "react-icons/fi";
import Card from "components/card";
import AOS from "aos";
import "aos/dist/aos.css";

const LaporanManagement = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  // States
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Laporan Pengadaan Lab Komputer 2023",
      category: "Pengadaan",
      date: "2023-12-20",
      status: "completed",
      department: "Teknik Informatika",
      downloadCount: 45,
      fileSize: "4.2 MB",
      fileType: "pdf",
      author: "Dr. Ahmad",
      lastModified: "2023-12-22"
    },
    {
      id: 2,
      title: "Laporan Workshop AI dan Machine Learning",
      category: "Kegiatan",
      date: "2023-12-15",
      status: "pending",
      department: "P3M",
      downloadCount: 23,
      fileSize: "2.8 MB",
      fileType: "pdf",
      author: "Prof. Sarah",
      lastModified: "2023-12-17"
    },
    {
      id: 3,
      title: "Analisis Kebutuhan Infrastruktur IT 2024",
      category: "Analisis",
      date: "2024-01-05",
      status: "completed",
      department: "BAAK",
      downloadCount: 17,
      fileSize: "3.5 MB",
      fileType: "pdf",
      author: "Ir. Budi",
      lastModified: "2024-01-10"
    },
    {
      id: 4,
      title: "Laporan Keuangan Pengadaan Q4 2023",
      category: "Keuangan",
      date: "2023-12-30",
      status: "completed",
      department: "Keuangan",
      downloadCount: 56,
      fileSize: "1.7 MB",
      fileType: "xlsx",
      author: "Dra. Siti",
      lastModified: "2024-01-02"
    },
    {
      id: 5,
      title: "Evaluasi Program Pengabdian Masyarakat",
      category: "Evaluasi",
      date: "2024-01-12",
      status: "pending",
      department: "P3M",
      downloadCount: 8,
      fileSize: "5.1 MB",
      fileType: "docx",
      author: "Dr. Hendra",
      lastModified: "2024-01-14"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort reports
  const filteredReports = reports
    .filter(report => {
      // Search filter
      const searchMatch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.author.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const categoryMatch = filterCategory === "all" || report.category === filterCategory;

      // Status filter
      const statusMatch = filterStatus === "all" || report.status === filterStatus;

      // Department filter
      const departmentMatch = filterDepartment === "all" || report.department === filterDepartment;

      return searchMatch && categoryMatch && statusMatch && departmentMatch;
    })
    .sort((a, b) => {
      // Sort logic
      let comparison = 0;

      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === "date") {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortBy === "downloads") {
        comparison = a.downloadCount - b.downloadCount;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Extract unique categories and departments
  const categories = ["all", ...new Set(reports.map(report => report.category))];
  const departments = ["all", ...new Set(reports.map(report => report.department))];

  // Calculate statistics
  const totalReports = reports.length;
  const completedReports = reports.filter(r => r.status === "completed").length;
  const pendingReports = reports.filter(r => r.status === "pending").length;
  const recentReports = reports.filter(r => new Date(r.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length;

  // File type icon mapping
  const getFileTypeIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <div className="bg-red-100 text-red-600 p-2 rounded-full"><MdOutlineFilePresent /></div>;
      case 'xlsx':
        return <div className="bg-green-100 text-green-600 p-2 rounded-full"><MdOutlineFilePresent /></div>;
      case 'docx':
        return <div className="bg-blue-100 text-blue-600 p-2 rounded-full"><MdOutlineFilePresent /></div>;
      default:
        return <div className="bg-gray-100 text-gray-600 p-2 rounded-full"><MdOutlineFilePresent /></div>;
    }
  };

  return (
    <div className="min-h-screen pt-4 pb-8 bg-gradient-to-b from-blue-50 to-white dark:from-navy-900 dark:to-navy-800">
      {/* Modern Header with Visual Elements */}
      <div className="relative mb-8 overflow-hidden" data-aos="fade-down">
        {/* Abstract background elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-10 right-20 w-20 h-20 bg-indigo-500/10 rounded-full blur-lg"></div>
        <div className="absolute -bottom-8 left-10 w-32 h-32 bg-sky-500/10 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 inline-block mb-2">
              Manajemen Laporan
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Kelola, pantau, dan analisis semua laporan kegiatan dan pengadaan di satu tempat dengan mudah
            </p>

            <div className="mt-6 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex space-x-2">
                <div className="flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800/60 dark:text-blue-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>
                  {reports.length} laporan tersedia
                </div>
                <div className="flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-800/60 dark:text-green-300">
                  <MdCheckCircle className="mr-1" />
                  {completedReports} selesai
                </div>
              </div>

              <button
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm flex items-center gap-2"
              >
                <MdAdd className="h-5 w-5" />
                Buat Laporan Baru
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards - Enhanced with visualization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6" data-aos="fade-up">
        {[
          {
            icon: <MdDescription className="h-6 w-6" />,
            title: "Total Laporan",
            value: totalReports,
            color: "blue",
            change: "+12% dari bulan lalu",
            chart: (
              <div className="h-8 w-16 flex items-end gap-0.5 ml-auto">
                {[40, 60, 45, 75, 60, 90, 80].map((h, i) => (
                  <div key={i} className="w-1.5 bg-blue-500/60 rounded-t" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            )
          },
          {
            icon: <MdCalendarToday className="h-6 w-6" />,
            title: "Bulan Ini",
            value: recentReports,
            color: "green",
            change: "+8 laporan baru",
            chart: (
              <div className="h-8 w-16 flex items-end gap-0.5 ml-auto">
                {[20, 30, 40, 45, 60, 75, 85].map((h, i) => (
                  <div key={i} className="w-1.5 bg-green-500/60 rounded-t" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            )
          },
          {
            icon: <MdOutlineSync className="h-6 w-6" />,
            title: "Dalam Proses",
            value: pendingReports,
            color: "amber",
            change: "-2 dari minggu lalu",
            chart: (
              <div className="h-8 w-16 flex items-end gap-0.5 ml-auto">
                {[50, 40, 30, 35, 30, 20, 15].map((h, i) => (
                  <div key={i} className="w-1.5 bg-amber-500/60 rounded-t" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            )
          },
          {
            icon: <MdPieChart className="h-6 w-6" />,
            title: "Selesai",
            value: completedReports,
            color: "indigo",
            change: "+14% dari bulan lalu",
            chart: (
              <div className="h-8 w-16 flex items-end gap-0.5 ml-auto">
                {[30, 45, 50, 65, 75, 80, 95].map((h, i) => (
                  <div key={i} className="w-1.5 bg-indigo-500/60 rounded-t" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            )
          }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-navy-800 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 overflow-hidden group"
            data-aos="fade-up"
            data-aos-delay={index * 50}
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <div
                  className={`p-2.5 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}
                >
                  {stat.icon}
                </div>
                {stat.chart}
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</h3>
                <div className="flex justify-between items-end">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">{stat.change}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Modern Search and Filter Section with Glassmorphism */}
      <div
        className="backdrop-blur-md bg-white/70 dark:bg-navy-800/70 rounded-2xl shadow-lg mb-6 border border-gray-100 dark:border-navy-700"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="p-6">
          {/* Search bar and view toggle */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="relative flex-grow max-w-xl">
              <input
                type="text"
                placeholder="Cari laporan berdasarkan judul, departemen, atau pembuat..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white/50 dark:bg-navy-700/50 dark:border-navy-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MdSearch className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex bg-white dark:bg-navy-800 rounded-lg border border-gray-200 dark:border-navy-700">
              <button
                className={`px-3 py-2 ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setViewMode('grid')}
              >
                <MdGridView className="h-5 w-5" />
              </button>
              <button
                className={`px-3 py-2 ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setViewMode('list')}
              >
                <MdViewList className="h-5 w-5" />
              </button>
            </div>

            <button
              className="px-4 py-2 bg-white border border-gray-200 dark:bg-navy-700 dark:border-navy-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-600 transition-all flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <MdOutlineFilterAlt className="h-5 w-5" />
              Filter
              <FiChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex items-center gap-1 ml-auto">
              <span className="text-sm text-gray-500">Sort:</span>
              <select
                className="bg-transparent text-gray-700 dark:text-gray-300 py-2 pl-2 pr-8 focus:outline-none focus:ring-0 text-sm border-0"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="downloads">Downloads</option>
              </select>
              <button
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Advanced filters (collapsible) */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-navy-700 animate-fadeIn">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Kategori</label>
                <select
                  className="w-full p-2.5 border border-gray-200 dark:border-navy-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-navy-800"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
                <select
                  className="w-full p-2.5 border border-gray-200 dark:border-navy-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-navy-800"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">In Progress</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Departemen</label>
                <select
                  className="w-full p-2.5 border border-gray-200 dark:border-navy-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-navy-800"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department === 'all' ? 'All Departments' : department}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reports Display - Grid or List View */}
      {filteredReports.length === 0 ? (
        <div className="bg-white dark:bg-navy-800 rounded-2xl p-10 text-center shadow-sm" data-aos="fade-up">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-navy-700 rounded-full flex items-center justify-center mb-4">
            <MdDescription className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No reports found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            We couldn't find any reports matching your search criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {filteredReports.map((report, index) => (
            <div
              key={report.id}
              className="bg-white dark:bg-navy-800 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              {/* Category indicator */}
              <div className="flex items-center border-b border-gray-100 dark:border-navy-700">
                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 px-4 text-xs font-medium">
                  {report.category}
                </div>
                <div className={`ml-auto py-2 px-3 text-xs font-medium ${report.status === 'completed'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-amber-600 dark:text-amber-400'
                  }`}>
                  {report.status === 'completed' ? 'Completed' : 'In Progress'}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  {getFileTypeIcon(report.fileType)}
                  <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {report.title}
                  </h3>
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <FiUsers className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{report.department}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{new Date(report.date).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center">
                    <FiFileText className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{report.fileSize} · {report.fileType.toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-navy-700">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <FiDownload className="mr-1.5" />
                    <span>{report.downloadCount} downloads</span>
                  </div>

                  <div className="flex space-x-1">
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                      <MdVisibility className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors">
                      <MdDownload className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md transition-colors">
                      <MdOutlineShare className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {filteredReports.map((report, index) => (
            <div
              key={report.id}
              className="bg-white dark:bg-navy-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left side with color indicator */}
                <div className={`w-full md:w-1.5 h-1.5 md:h-auto ${report.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'
                  }`}></div>

                <div className="p-5 flex-grow">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {getFileTypeIcon(report.fileType)}
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {report.title}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center">
                            <FiFileText className="mr-1.5 h-3.5 w-3.5" />
                            {report.fileSize} · {report.fileType.toUpperCase()}
                          </span>
                          <span className="flex items-center">
                            <FiCalendar className="mr-1.5 h-3.5 w-3.5" />
                            {new Date(report.date).toLocaleDateString('id-ID')}
                          </span>
                          <span className="flex items-center">
                            <FiUsers className="mr-1.5 h-3.5 w-3.5" />
                            {report.department}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-1 px-2.5 text-xs rounded-full">
                        {report.category}
                      </span>

                      <span className={`py-1 px-2.5 text-xs rounded-full flex items-center gap-1 ${report.status === 'completed'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                        }`}>
                        {report.status === 'completed'
                          ? <><MdCheckCircle className="h-3 w-3" /> Completed</>
                          : <><FiClock className="h-3 w-3" /> In Progress</>
                        }
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-navy-700">
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <FiDownload className="mr-1.5" />
                        {report.downloadCount} downloads
                      </span>
                      <span>
                        Last modified: {report.lastModified}
                      </span>
                      <span>
                        Author: {report.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 rounded-md transition-colors flex items-center gap-1.5">
                        <MdVisibility className="h-4 w-4" />
                        <span className="text-sm">View</span>
                      </button>
                      <button className="px-3 py-1.5 text-green-600 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 rounded-md transition-colors flex items-center gap-1.5">
                        <MdDownload className="h-4 w-4" />
                        <span className="text-sm">Download</span>
                      </button>
                      <div className="relative group">
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-md transition-colors">
                          <MdOutlineMoreVert className="h-5 w-5" />
                        </button>
                        <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-navy-800 shadow-lg rounded-lg py-1 border border-gray-100 dark:border-navy-700 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-10">
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700 flex items-center">
                            <MdOutlineShare className="mr-2 h-4 w-4" />
                            Share
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-navy-700 flex items-center">
                            <MdOutlineDelete className="mr-2 h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredReports.length > 0 && (
        <div className="flex justify-center" data-aos="fade-up" data-aos-delay="200">
          <nav className="flex items-center space-x-2" aria-label="Pagination">
            <button className="p-2 rounded-lg border border-gray-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-700 disabled:opacity-50">
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
              1
            </button>

            <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-700">
              2
            </button>

            <span className="px-4 py-2 text-gray-700 dark:text-gray-300">...</span>

            <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-700">
              8
            </button>

            <button className="p-2 rounded-lg border border-gray-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-700">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default LaporanManagement;
