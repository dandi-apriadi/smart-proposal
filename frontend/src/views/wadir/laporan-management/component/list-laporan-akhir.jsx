import React, { useState, useEffect } from 'react';
import {
  MdSearch,
  MdFilterList,
  MdDownload,
  MdVisibility,
  MdArchive,
  MdShare,
  MdVerified,
  MdError,
  MdAccessTime,
  MdPictureAsPdf,
  MdCalendarToday,
  MdOutlineVerified,
  MdGridView,
  MdViewList,
  MdOutlineAttachFile,
  MdOutlineFilterAlt,
  MdOutlineAnalytics
} from 'react-icons/md';
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiDownload,
  FiEye,
  FiFileText,
  FiFilter,
  FiGrid,
  FiList,
  FiShare2,
  FiTag,
  FiUser,
  FiChevronDown,
  FiBarChart2,
  FiCheckCircle,
  FiArchive
} from 'react-icons/fi';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ListLaporanAkhir = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [finalReports, setFinalReports] = useState([
    {
      id: 1,
      title: "Laporan Akhir Implementasi Sistem Validasi ML",
      category: "Implementasi",
      department: "Teknik Informatika",
      submissionDate: "2023-12-20",
      completionDate: "2023-12-25",
      status: "verified",
      mlScore: 98.5,
      author: "Tim Pengembang AI",
      fileSize: "5.2 MB",
      documentType: "pdf",
      tags: ["Machine Learning", "Implementasi", "Sistem"]
    },
    {
      id: 2,
      title: "Evaluasi Performa Model Random Forest",
      category: "Evaluasi",
      department: "Lab AI",
      submissionDate: "2023-12-18",
      completionDate: "2023-12-22",
      status: "verified",
      mlScore: 95.8,
      author: "Dr. Sarah Johnson",
      fileSize: "4.8 MB",
      documentType: "pdf",
      tags: ["Evaluasi", "Random Forest", "ML Model"]
    },
    {
      id: 3,
      title: "Pengembangan Framework ML untuk Validasi Dokumen",
      category: "Pengembangan",
      department: "Teknik Informatika",
      submissionDate: "2023-12-15",
      completionDate: "2023-12-22",
      status: "verified",
      mlScore: 94.2,
      author: "Tim Riset",
      fileSize: "6.7 MB",
      documentType: "pdf",
      tags: ["Framework", "Document Validation", "ML"]
    },
    {
      id: 4,
      title: "Analisis Peningkatan Akurasi Model Klasifikasi",
      category: "Analisis",
      department: "Lab AI",
      submissionDate: "2023-12-10",
      completionDate: "2023-12-18",
      status: "pending",
      mlScore: 89.7,
      author: "Dr. Michael Chen",
      fileSize: "4.1 MB",
      documentType: "pdf",
      tags: ["Classification", "Accuracy", "Analysis"]
    },
    {
      id: 5,
      title: "Laporan Integrasi API dengan Model Prediksi",
      category: "Implementasi",
      department: "Software Development",
      submissionDate: "2023-12-08",
      completionDate: "2023-12-16",
      status: "verified",
      mlScore: 96.3,
      author: "Tim DevOps",
      fileSize: "3.8 MB",
      documentType: "pdf",
      tags: ["API", "Integration", "Prediction Model"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // list or grid
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Statistics calculations
  const verifiedCount = finalReports.filter(r => r.status === "verified").length;
  const pendingCount = finalReports.filter(r => r.status === "pending").length;
  const totalArchiveCount = 156; // This could be from an API in real implementation

  // Filter reports based on search and filters
  const filteredReports = finalReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = filterCategory === "all" ||
      report.category.toLowerCase() === filterCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    let comparison = 0;

    if (sortBy === "date") {
      comparison = new Date(b.completionDate) - new Date(a.completionDate);
    } else if (sortBy === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === "score") {
      comparison = b.mlScore - a.mlScore;
    }

    return sortOrder === "asc" ? -comparison : comparison;
  });

  // Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Handle report selection for detail view
  const openReportDetail = (report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen pt-4 pb-8 bg-gradient-to-b from-blue-50 to-white dark:from-navy-900 dark:to-navy-800">
      {/* Modern Header with Visual Elements */}
      <div className="relative mb-8 overflow-hidden" data-aos="fade-down">
        {/* Abstract background elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-10 right-20 w-20 h-20 bg-purple-500/10 rounded-full blur-lg"></div>
        <div className="absolute -bottom-8 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 inline-block mb-2">
            Laporan Akhir
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
            Koleksi dan manajemen laporan akhir yang telah terverifikasi dan siap untuk diarsip
          </p>

          <div className="mt-6 flex items-center space-x-2">
            <div className="flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300">
              <FiCheckCircle className="mr-1" />
              {verifiedCount} laporan terverifikasi
            </div>
            <div className="flex items-center px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-300">
              <FiClock className="mr-1" />
              {pendingCount} menunggu review
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8" data-aos="fade-up">
        <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 border border-gray-100 dark:border-navy-700 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full -mt-8 -mr-8 transition-transform group-hover:scale-110"></div>

          <div className="flex items-center z-10 relative">
            <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30 mr-4 text-green-600 dark:text-green-400">
              <FiCheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Laporan Terverifikasi</p>
              <div className="flex items-baseline">
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">{verifiedCount}</h4>
                <span className="ml-2 text-xs text-green-600 dark:text-green-400 font-medium">+12% dari bulan lalu</span>
              </div>
            </div>
          </div>

          <div className="mt-4 h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
            <div className="bg-green-500 h-1 rounded-full" style={{ width: `${(verifiedCount / (verifiedCount + pendingCount)) * 100}%` }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 border border-gray-100 dark:border-navy-700 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full -mt-8 -mr-8 transition-transform group-hover:scale-110"></div>

          <div className="flex items-center z-10 relative">
            <div className="rounded-full p-3 bg-yellow-100 dark:bg-yellow-900/30 mr-4 text-yellow-600 dark:text-yellow-400">
              <FiClock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Menunggu Review</p>
              <div className="flex items-baseline">
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">{pendingCount}</h4>
                <span className="ml-2 text-xs text-yellow-600 dark:text-yellow-400 font-medium">Perlu tindakan segera</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex space-x-1">
            {[...Array(pendingCount)].map((_, i) => (
              <div key={i} className="h-6 w-1.5 bg-yellow-500/60 rounded-sm"></div>
            ))}
            {[...Array(3 - pendingCount)].map((_, i) => (
              <div key={i} className="h-6 w-1.5 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 border border-gray-100 dark:border-navy-700 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full -mt-8 -mr-8 transition-transform group-hover:scale-110"></div>

          <div className="flex items-center z-10 relative">
            <div className="rounded-full p-3 bg-indigo-100 dark:bg-indigo-900/30 mr-4 text-indigo-600 dark:text-indigo-400">
              <FiArchive className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Arsip</p>
              <div className="flex items-baseline">
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">{totalArchiveCount}</h4>
                <span className="ml-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium">Terindex dan tersimpan</span>
              </div>
            </div>
          </div>

          <div className="mt-4 h-10 flex items-end gap-0.5">
            {[65, 75, 60, 80, 95, 85, 90].map((height, i) => (
              <div key={i} className="flex-1 bg-indigo-500/60 rounded-t" style={{ height: `${height}%` }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Search and Filter Panel */}
      <div
        className="backdrop-blur-md bg-white/70 dark:bg-navy-800/70 rounded-2xl shadow-lg mb-6 border border-gray-100 dark:border-navy-700"
        data-aos="fade-up"
      >
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-grow max-w-xl">
              <input
                type="text"
                placeholder="Cari berdasarkan judul, penulis, atau tag..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm bg-white/50 dark:bg-navy-700/50 dark:border-navy-600 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MdSearch className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex bg-white dark:bg-navy-800 rounded-lg border border-gray-200 dark:border-navy-700">
              <button
                className={`px-3 py-2 ${viewMode === 'grid' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <MdGridView className="h-5 w-5" />
              </button>
              <button
                className={`px-3 py-2 ${viewMode === 'list' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <MdViewList className="h-5 w-5" />
              </button>
            </div>

            <button
              className="px-4 py-2.5 bg-white dark:bg-navy-700 border border-gray-200 dark:border-navy-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-600 transition-all flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter className="h-5 w-5" />
              <span>Filter</span>
              <FiChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex items-center ml-auto gap-1 text-gray-600 dark:text-gray-400">
              <span className="text-sm">Sort:</span>
              <select
                className="bg-transparent text-gray-700 dark:text-gray-300 py-2 pl-2 pr-8 focus:outline-none focus:ring-0 text-sm border-0"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Tanggal</option>
                <option value="title">Judul</option>
                <option value="score">ML Score</option>
              </select>
              <button
                className="p-1 text-gray-400 hover:text-indigo-600"
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

          {/* Expandable filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 mt-4 border-t border-gray-100 dark:border-navy-700 animate-fadeIn">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Kategori</label>
                <select
                  className="w-full p-2.5 border border-gray-200 dark:border-navy-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-navy-800"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">Semua Kategori</option>
                  <option value="implementasi">Implementasi</option>
                  <option value="evaluasi">Evaluasi</option>
                  <option value="pengembangan">Pengembangan</option>
                  <option value="analisis">Analisis</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Status</label>
                <select
                  className="w-full p-2.5 border border-gray-200 dark:border-navy-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-navy-800"
                >
                  <option value="all">Semua Status</option>
                  <option value="verified">Terverifikasi</option>
                  <option value="pending">Menunggu Review</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Departemen</label>
                <select
                  className="w-full p-2.5 border border-gray-200 dark:border-navy-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-navy-800"
                >
                  <option>Semua Departemen</option>
                  <option>Teknik Informatika</option>
                  <option>Lab AI</option>
                  <option>Software Development</option>
                </select>
              </div>
            </div>
          )}

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Menampilkan {filteredReports.length} dari {finalReports.length} laporan akhir
          </div>
        </div>
      </div>

      {/* Reports Display Based on View Mode */}
      {filteredReports.length === 0 ? (
        <div className="bg-white dark:bg-navy-800 rounded-2xl p-10 text-center shadow-sm border border-gray-100 dark:border-navy-700" data-aos="fade-up">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-navy-700 rounded-full flex items-center justify-center mb-4">
            <MdError className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Tidak ada laporan ditemukan</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Kami tidak dapat menemukan laporan akhir yang sesuai dengan kriteria pencarian Anda. Coba sesuaikan filter atau istilah pencarian Anda.
          </p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
            Reset Filter
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white dark:bg-navy-800 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 overflow-hidden group cursor-pointer"
              onClick={() => openReportDetail(report)}
              data-aos="fade-up"
            >
              <div className={`h-2 ${report.mlScore >= 95 ? 'bg-green-500' :
                  report.mlScore >= 85 ? 'bg-blue-500' :
                    'bg-yellow-500'
                }`}></div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-lg ${report.documentType === 'pdf' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}>
                    <MdPictureAsPdf className="h-6 w-6" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${report.status === 'verified'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900/50'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/50'
                    }`}>
                    {report.status === 'verified'
                      ? <><FiCheck className="inline mr-1" /> Terverifikasi</>
                      : <><FiClock className="inline mr-1" /> Menunggu</>}
                  </div>
                </div>

                <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 transition-colors mb-3">
                  {report.title}
                </h3>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <FiUser className="mr-1.5" />
                  <span>{report.author}</span>
                  <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                  <span>{report.department}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Submit</p>
                    <p className="font-medium text-gray-800 dark:text-white flex items-center">
                      <FiCalendar className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                      {formatDate(report.submissionDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Selesai</p>
                    <p className="font-medium text-gray-800 dark:text-white flex items-center">
                      <FiCalendar className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                      {formatDate(report.completionDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ML Score</p>
                    <p className={`font-medium ${report.mlScore >= 95 ? 'text-green-600 dark:text-green-400' :
                        report.mlScore >= 85 ? 'text-blue-600 dark:text-blue-400' :
                          'text-yellow-600 dark:text-yellow-400'
                      }`}>
                      {report.mlScore}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Ukuran</p>
                    <p className="font-medium text-gray-800 dark:text-white">{report.fileSize}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {report.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 rounded-md text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-navy-700">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <FiBarChart2 className="mr-1.5" />
                    Kategori: {report.category}
                  </div>

                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        openReportDetail(report);
                      }}
                    >
                      <FiEye className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiDownload className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiShare2 className="h-4 w-4" />
                    </button>
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
              onClick={() => openReportDetail(report)}
              data-aos="fade-up"
            >
              <div className="flex">
                {/* Left side color indicator based on ML score */}
                <div className={`w-1.5 ${report.mlScore >= 95 ? 'bg-green-500' :
                    report.mlScore >= 85 ? 'bg-blue-500' :
                      'bg-yellow-500'
                  }`}></div>

                <div className="flex-grow p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-lg ${report.documentType === 'pdf' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                          'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                        <MdPictureAsPdf className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {report.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <FiUser className="mr-1.5" />
                          <span>{report.author}</span>
                          <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                          <span>{report.department}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${report.status === 'verified'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                        {report.status === 'verified'
                          ? <><FiCheck className="inline mr-1" /> Terverifikasi</>
                          : <><FiClock className="inline mr-1" /> Menunggu</>}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50`}>
                        {report.category}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4">
                    <div className="flex items-center text-sm">
                      <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Submit:</span>
                        <span className="ml-1 text-gray-800 dark:text-white">{formatDate(report.submissionDate)}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Selesai:</span>
                        <span className="ml-1 text-gray-800 dark:text-white">{formatDate(report.completionDate)}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <FiBarChart2 className="mr-2 h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">ML Score:</span>
                        <span className={`ml-1 font-medium ${report.mlScore >= 95 ? 'text-green-600 dark:text-green-400' :
                            report.mlScore >= 85 ? 'text-blue-600 dark:text-blue-400' :
                              'text-yellow-600 dark:text-yellow-400'
                          }`}>{report.mlScore}%</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <FiFileText className="mr-2 h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Ukuran:</span>
                        <span className="ml-1 text-gray-800 dark:text-white">{report.fileSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {report.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 rounded-md text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-100 dark:border-navy-700">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <MdOutlineVerified className="mr-1.5" />
                      Tervalidasi pada {formatDate(report.completionDate)}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="px-3 py-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:bg-indigo-900/40 rounded-lg transition-colors flex items-center gap-1.5 text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openReportDetail(report);
                        }}
                      >
                        <FiEye className="h-4 w-4" />
                        <span>Lihat</span>
                      </button>
                      <button
                        className="px-3 py-1.5 text-green-600 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 rounded-lg transition-colors flex items-center gap-1.5 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiDownload className="h-4 w-4" />
                        <span>Unduh</span>
                      </button>
                      <button
                        className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-full transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiShare2 className="h-4 w-4" />
                      </button>
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
        <div className="flex justify-center" data-aos="fade-up">
          <nav className="flex items-center space-x-2" aria-label="Pagination">
            <button className="p-2 rounded-lg border border-gray-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-700 disabled:opacity-50">
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">
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

      {/* Report Detail Modal */}
      {showDetailModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div
            className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            data-aos="zoom-in"
            data-aos-duration="300"
          >
            <div className="sticky top-0 z-10 bg-white dark:bg-navy-800 flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-navy-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Detail Laporan Akhir</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-lg ${selectedReport.documentType === 'pdf'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                  <MdPictureAsPdf className="h-7 w-7" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedReport.title}</h2>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${selectedReport.status === 'verified'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                      {selectedReport.status === 'verified'
                        ? <><FiCheck className="inline mr-1" /> Terverifikasi</>
                        : <><FiClock className="inline mr-1" /> Menunggu</>}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Kategori: <span className="font-medium">{selectedReport.category}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-navy-900/50 p-5 rounded-xl">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Informasi Laporan</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Penulis:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedReport.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Departemen:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedReport.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tanggal Submit:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatDate(selectedReport.submissionDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tanggal Selesai:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatDate(selectedReport.completionDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Ukuran File:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedReport.fileSize}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-navy-900/50 p-5 rounded-xl">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">ML Analysis</h3>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Overall Score:</span>
                      <span className={`font-bold text-xl ${selectedReport.mlScore >= 95 ? 'text-green-600 dark:text-green-400' :
                          selectedReport.mlScore >= 85 ? 'text-blue-600 dark:text-blue-400' :
                            'text-yellow-600 dark:text-yellow-400'
                        }`}>
                        {selectedReport.mlScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2 mb-4">
                      <div
                        className={`h-2 rounded-full ${selectedReport.mlScore >= 95 ? 'bg-green-500' :
                            selectedReport.mlScore >= 85 ? 'bg-blue-500' :
                              'bg-yellow-500'
                          }`}
                        style={{ width: `${selectedReport.mlScore}%` }}
                      ></div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start">
                        <FiCheckCircle className={`mt-0.5 mr-2 ${selectedReport.mlScore >= 90 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-gray-700 dark:text-gray-300">
                          {selectedReport.mlScore >= 90 ? 'Validasi format dan konten memenuhi standar' : 'Format belum sepenuhnya sesuai standar'}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <FiCheckCircle className={`mt-0.5 mr-2 ${selectedReport.mlScore >= 85 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-gray-700 dark:text-gray-300">
                          {selectedReport.mlScore >= 85 ? 'Konten lengkap dan terstruktur dengan baik' : 'Beberapa bagian konten perlu diperbaiki'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 rounded-lg text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-navy-700">
                <button className="px-4 py-2.5 bg-white dark:bg-navy-700 border border-gray-200 dark:border-navy-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-600 transition-colors flex items-center gap-2">
                  <FiShare2 className="h-5 w-5" />
                  Share
                </button>

                <div className="flex gap-3">
                  <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <FiEye className="h-5 w-5" />
                    Lihat Laporan
                  </button>
                  <button className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                    <FiDownload className="h-5 w-5" />
                    Unduh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListLaporanAkhir;
