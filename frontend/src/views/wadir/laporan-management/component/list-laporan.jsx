import React, { useState, useEffect } from 'react';
import {
  MdSearch,
  MdFilterList,
  MdDownload,
  MdVisibility,
  MdDelete,
  MdSort,
  MdMoreVert,
  MdCheckCircle,
  MdWarning,
  MdGridView,
  MdViewList,
  MdOutlineSort,
  MdOutlineFilterAlt,
  MdOutlineFilePresent,
  MdOutlineDelete,
  MdOutlineShare,
  MdCalendarToday,
  MdOutlineAttachFile,
  MdPerson
} from 'react-icons/md';
import {
  FiCalendar,
  FiClock,
  FiFile,
  FiFileText,
  FiFilter,
  FiGrid,
  FiList,
  FiSearch,
  FiUser,
  FiTag,
  FiDownload,
  FiEye,
  FiMoreVertical,
  FiChevronDown,
  FiCheck,
  FiAlertCircle,
  FiBriefcase,
  FiStar
} from 'react-icons/fi';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ListLaporan = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  // State variables
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Laporan Pengadaan Laboratorium",
      category: "Pengadaan",
      department: "Teknik Informatika",
      status: "completed",
      date: "2023-12-20",
      priority: "high",
      author: "Dr. Ahmad",
      fileSize: "2.4 MB"
    },
    {
      id: 2,
      title: "Laporan Kegiatan Workshop AI",
      category: "Kegiatan",
      department: "P3M",
      status: "pending",
      date: "2023-12-18",
      priority: "medium",
      author: "Prof. Sarah",
      fileSize: "1.8 MB"
    },
    {
      id: 3,
      title: "Progress Implementasi Sistem ML",
      category: "Teknologi",
      department: "Teknik Informatika",
      status: "completed",
      date: "2023-12-15",
      priority: "high",
      author: "Tim Pengembang",
      fileSize: "3.2 MB"
    },
    {
      id: 4,
      title: "Laporan Evaluasi Kinerja Sistem",
      category: "Evaluasi",
      department: "Quality Control",
      status: "pending",
      date: "2023-12-14",
      priority: "medium",
      author: "Dr. Michael",
      fileSize: "1.5 MB"
    },
    {
      id: 5,
      title: "Pengujian Akurasi Model Random Forest",
      category: "Penelitian",
      department: "Lab AI",
      status: "completed",
      date: "2023-12-12",
      priority: "high",
      author: "Tim Riset",
      fileSize: "4.1 MB"
    },
    {
      id: 6,
      title: "Laporan Pelatihan Model ML",
      category: "Teknologi",
      department: "Lab AI",
      status: "pending",
      date: "2023-12-10",
      priority: "medium",
      author: "Dr. Lisa",
      fileSize: "2.8 MB"
    },
    {
      id: 7,
      title: "Dokumentasi API Sistem",
      category: "Teknologi",
      department: "Teknik Informatika",
      status: "completed",
      date: "2023-12-08",
      priority: "low",
      author: "Tim Developer",
      fileSize: "1.2 MB"
    },
    {
      id: 8,
      title: "Laporan Pengujian User Interface",
      category: "Evaluasi",
      department: "UI/UX Team",
      status: "completed",
      date: "2023-12-05",
      priority: "medium",
      author: "Design Team",
      fileSize: "2.6 MB"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("list"); // list or grid
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  // Filter reports based on search and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory === "all" ||
      report.category.toLowerCase() === filterCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    // Sort logic
    let comparison = 0;

    if (sortBy === "date") {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortBy === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Get priority badge based on priority level
  const getPriorityBadge = (priority) => {
    const colorMap = {
      high: "red",
      medium: "amber",
      low: "blue"
    };

    const textMap = {
      high: "Tinggi",
      medium: "Menengah",
      low: "Rendah"
    };

    const color = colorMap[priority] || "gray";
    const text = textMap[priority] || priority;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800 dark:bg-${color}-900/30 dark:text-${color}-400 border border-${color}-200 dark:border-${color}-900/50`}>
        <span className={`w-1.5 h-1.5 mr-1.5 rounded-full bg-${color}-500`}></span>
        {text}
      </span>
    );
  };

  // Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const openReportDetails = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 inline-block">
                Daftar Laporan
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1.5">
                Kelola dan akses semua laporan dengan cepat dan mudah
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 bg-white dark:bg-navy-700 border border-gray-200 dark:border-navy-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-600 shadow-sm transition-all flex items-center gap-2">
                <FiFilter className="h-5 w-5" />
                <span>Filter</span>
              </button>

              <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm flex items-center gap-2">
                <MdOutlineFilePresent className="h-5 w-5" />
                <span>Buat Laporan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Search and Filter Panel */}
      <div
        className="backdrop-blur-md bg-white/70 dark:bg-navy-800/70 rounded-2xl shadow-lg mb-6 border border-gray-100 dark:border-navy-700"
        data-aos="fade-up"
      >
        <div className="p-6">
          {/* Search bar and view toggle */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-grow max-w-xl">
              <input
                type="text"
                placeholder="Cari berdasarkan judul, penulis, atau departemen..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white/50 dark:bg-navy-700/50 dark:border-navy-600 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex bg-white dark:bg-navy-800 rounded-lg border border-gray-200 dark:border-navy-700">
              <button
                className={`px-3 py-2 ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <FiGrid className="h-5 w-5" />
              </button>
              <button
                className={`px-3 py-2 ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <FiList className="h-5 w-5" />
              </button>
            </div>

            <button
              className="px-4 py-2.5 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-700 transition-all flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <MdFilterList className="h-5 w-5" />
              <span>Filters</span>
              <FiChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex items-center ml-auto gap-1 text-gray-600 dark:text-gray-400">
              <span className="text-sm">Sort:</span>
              <select
                className="pl-2 pr-8 py-2 bg-transparent border-0 focus:outline-none focus:ring-0 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Tanggal</option>
                <option value="title">Judul</option>
                <option value="priority">Prioritas</option>
              </select>
              <button
                className="p-1 text-gray-400 hover:text-blue-600"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                title={sortOrder === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
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

          {/* Collapsible filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 mt-4 border-t border-gray-100 dark:border-navy-700 animate-fadeIn">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Kategori</label>
                <select
                  className="w-full p-2.5 border border-gray-200 dark:border-navy-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-navy-800"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">Semua Kategori</option>
                  <option value="pengadaan">Pengadaan</option>
                  <option value="kegiatan">Kegiatan</option>
                  <option value="teknologi">Teknologi</option>
                  <option value="keuangan">Keuangan</option>
                  <option value="evaluasi">Evaluasi</option>
                  <option value="penelitian">Penelitian</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Status</label>
                <select
                  className="w-full p-2.5 border border-gray-200 dark:border-navy-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-navy-800"
                >
                  <option value="all">Semua Status</option>
                  <option value="completed">Selesai</option>
                  <option value="pending">Dalam Proses</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Departemen</label>
                <select
                  className="w-full p-2.5 border border-gray-200 dark:border-navy-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-navy-800"
                >
                  <option>Semua Departemen</option>
                  <option>Teknik Informatika</option>
                  <option>P3M</option>
                  <option>Lab AI</option>
                  <option>Quality Control</option>
                </select>
              </div>
            </div>
          )}

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Menampilkan {filteredReports.length} dari {reports.length} laporan
          </div>
        </div>
      </div>

      {/* Reports Display Based on View Mode */}
      {filteredReports.length === 0 ? (
        <div className="bg-white dark:bg-navy-800 rounded-2xl p-10 text-center shadow-sm border border-gray-100 dark:border-navy-700" data-aos="fade-up">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-navy-700 rounded-full flex items-center justify-center mb-4">
            <MdWarning className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Tidak ada laporan ditemukan</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Kami tidak dapat menemukan laporan yang sesuai dengan kriteria pencarian Anda. Coba sesuaikan filter atau istilah pencarian Anda.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Reset Filter
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white dark:bg-navy-800 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 overflow-hidden group cursor-pointer"
              onClick={() => openReportDetails(report)}
              data-aos="fade-up"
            >
              {/* Category header */}
              <div className="flex justify-between items-center px-4 py-2 bg-gray-50 dark:bg-navy-900/50 border-b border-gray-100 dark:border-navy-700">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{report.category}</span>
                <div className="flex items-center gap-1.5">
                  {getPriorityBadge(report.priority)}
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {report.title}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${report.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                      {report.status === 'completed'
                        ? <><FiCheck className="mr-1" /> Selesai</>
                        : <><FiClock className="mr-1" /> Proses</>}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <FiUser className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{report.author}</span>
                  </div>
                  <div className="flex items-center">
                    <FiBriefcase className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{report.department}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{formatDate(report.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <FiFile className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{report.fileSize}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-navy-700 flex items-center justify-between">
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
                      <FiEye className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors">
                      <FiDownload className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                      <MdOutlineDelete className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="relative group">
                    <button className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors">
                      <FiMoreVertical className="h-4 w-4" />
                    </button>
                    <div className="absolute right-0 bottom-full mb-2 w-36 bg-white dark:bg-navy-800 shadow-lg rounded-lg py-1 border border-gray-100 dark:border-navy-700 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-10">
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
          ))}
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white dark:bg-navy-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 overflow-hidden group cursor-pointer"
              onClick={() => openReportDetails(report)}
              data-aos="fade-up"
            >
              <div className="flex">
                {/* Left side color indicator based on priority */}
                <div className={`w-1.5 ${report.priority === 'high' ? 'bg-red-500' :
                    report.priority === 'medium' ? 'bg-amber-500' :
                      'bg-blue-500'
                  }`}></div>

                <div className="flex-grow p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-grow">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {report.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.status === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                          {report.status === 'completed'
                            ? <><FiCheck className="mr-1" /> Selesai</>
                            : <><FiClock className="mr-1" /> Proses</>}
                        </span>
                        {getPriorityBadge(report.priority)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <FiTag className="mr-2 h-4 w-4 text-gray-400" />
                          <span>{report.category}</span>
                        </div>
                        <div className="flex items-center">
                          <FiBriefcase className="mr-2 h-4 w-4 text-gray-400" />
                          <span>{report.department}</span>
                        </div>
                        <div className="flex items-center">
                          <FiUser className="mr-2 h-4 w-4 text-gray-400" />
                          <span>{report.author}</span>
                        </div>
                        <div className="flex items-center">
                          <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                          <span>{formatDate(report.date)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center px-3 py-1 bg-gray-50 dark:bg-navy-900/50 rounded-lg text-xs text-gray-600 dark:text-gray-400">
                        <FiFile className="mr-1.5" />
                        {report.fileSize}
                      </div>

                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 transition-colors">
                          <FiEye className="h-5 w-5" />
                        </button>
                        <button className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 transition-colors">
                          <FiDownload className="h-5 w-5" />
                        </button>
                        <div className="relative">
                          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 text-gray-500 dark:text-gray-400 transition-colors">
                            <FiMoreVertical className="h-5 w-5" />
                          </button>
                          <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-navy-800 shadow-lg rounded-lg py-1 border border-gray-100 dark:border-navy-700 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-10">
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
            </div>
          ))}
        </div>
      )}

      {/* Show More Button */}
      {filteredReports.length > 0 && (
        <div className="flex justify-center" data-aos="fade-up">
          <button className="px-6 py-2.5 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-700 shadow-sm transition-all">
            Load More
          </button>
        </div>
      )}

      {/* Report Detail Modal */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div
            className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            data-aos="zoom-in"
            data-aos-duration="300"
          >
            <div className="sticky top-0 z-10 bg-white dark:bg-navy-800 flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-navy-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Detail Laporan</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-lg ${selectedReport.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    selectedReport.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                  <FiFileText className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedReport.title}</h2>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedReport.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                      {selectedReport.status === 'completed'
                        ? <><FiCheck className="mr-1" /> Selesai</>
                        : <><FiClock className="mr-1" /> Proses</>}
                    </span>
                    {getPriorityBadge(selectedReport.priority)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-navy-900/50 p-5 rounded-xl">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Informasi Laporan</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Kategori:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedReport.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Departemen:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedReport.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Penulis:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedReport.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tanggal:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatDate(selectedReport.date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Ukuran File:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedReport.fileSize}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-navy-900/50 p-5 rounded-xl">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Tindakan</h3>

                  <div className="space-y-3">
                    <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <FiEye className="h-5 w-5" />
                      Lihat Laporan
                    </button>

                    <button className="w-full px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                      <FiDownload className="h-5 w-5" />
                      Unduh Laporan
                    </button>

                    <button className="w-full px-4 py-2.5 bg-white dark:bg-navy-700 border border-gray-200 dark:border-navy-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-600 transition-colors flex items-center justify-center gap-2">
                      <MdOutlineShare className="h-5 w-5" />
                      Bagikan
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-navy-700 pt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Versi dan Komentar</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 p-2 rounded-full">
                      <FiUser className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 dark:text-white">{selectedReport.author}</span>
                        <span className="mx-2 text-gray-300 dark:text-gray-700">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(selectedReport.date)}</span>
                      </div>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        Versi terbaru laporan telah diunggah dengan perubahan pada bagian analisis data dan rekomendasi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListLaporan;
