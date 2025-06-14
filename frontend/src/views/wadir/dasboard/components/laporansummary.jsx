import React, { useState } from 'react';
import { FaFileAlt, FaChartBar, FaDownload, FaEye, FaFilter, FaSearch, FaSortAmountDown, FaAngleDown, FaChevronRight, FaChartLine, FaChartPie } from 'react-icons/fa';

const LaporanSummary = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Array of stats for cards
  const statCards = [
    { title: 'Total Laporan', value: '245', change: '+12%', color: 'blue', trend: 'up' },
    { title: 'Disetujui', value: '182', change: '+8%', color: 'green', trend: 'up' },
    { title: 'Ditolak', value: '63', change: '-5%', color: 'red', trend: 'down' },
    { title: 'Dalam Review', value: '28', change: '+2%', color: 'yellow', trend: 'up' }
  ];

  // Array for performance metrics
  const performanceMetrics = [
    { label: 'Ketepatan Waktu', value: 85, color: 'blue' },
    { label: 'Kelengkapan Dokumen', value: 92, color: 'indigo' },
    { label: 'Kesesuaian Format', value: 88, color: 'purple' }
  ];

  const reports = [
    { title: 'Laporan Pengadaan Lab Komputer', date: '2023-12-20', status: 'approved', department: 'Jurusan TI' },
    { title: 'Laporan Workshop AI', date: '2023-12-18', status: 'pending', department: 'PUDIR 1' },
    { title: 'Laporan Seminar Nasional', date: '2023-12-15', status: 'rejected', department: 'Akademik' },
    { title: 'Laporan Kegiatan Mahasiswa', date: '2023-12-12', status: 'approved', department: 'Kemahasiswaan' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      {/* Header Section with dynamic gradient */}
      <div
        className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 p-6 text-white relative overflow-hidden"
        data-aos="fade-down"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500 opacity-20 rounded-full -mt-10 -mr-10 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400 opacity-20 rounded-full -mb-10 -ml-10 blur-xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-2.5 rounded-xl backdrop-blur-sm shadow-inner">
              <FaFileAlt className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Ringkasan Laporan</h2>
              <p className="text-indigo-100 text-sm">Manajemen dan analisis laporan proposal</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              className="bg-white bg-opacity-10 text-white px-3 py-2 rounded-lg hover:bg-opacity-20 transition-all flex items-center space-x-1 border border-indigo-500"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="text-sm" />
              <span className="text-sm">{showFilters ? 'Tutup Filter' : 'Filter'}</span>
            </button>

            <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-50 transition-colors flex items-center gap-2">
              <FaChartLine className="text-sm" />
              <span>Analisis</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel - Conditionally rendered */}
      {showFilters && (
        <div className="p-4 bg-gray-50 border-b border-gray-100 animate-fadeIn">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-gray-500 mb-1">Cari Laporan</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Kata kunci..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Kategori</label>
              <select
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">Semua Kategori</option>
                <option value="procurement">Pengadaan</option>
                <option value="activity">Kegiatan</option>
                <option value="finance">Keuangan</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">Semua Status</option>
                <option value="approved">Disetujui</option>
                <option value="pending">Pending</option>
                <option value="rejected">Ditolak</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Periode</label>
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="month">Bulan Ini</option>
                <option value="quarter">3 Bulan Terakhir</option>
                <option value="year">Tahun Ini</option>
                <option value="all">Semua Waktu</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards - Enhanced with shadows and hover effects */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 border-b border-gray-100"
        data-aos="fade-up"
      >
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow transform hover:scale-105 duration-300 relative overflow-hidden`}
          >
            {/* Colored stripe on left or indicator */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${stat.color}-500`}></div>

            <p className="text-gray-600 text-sm pl-3">{stat.title}</p>
            <div className="flex items-center justify-between mt-2 pl-3">
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports Table - Modernized with better spacing and visual hierarchy */}
      <div className="p-6" data-aos="fade-up" data-aos-delay="200">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <span className="bg-indigo-600 text-white p-1 rounded-md mr-2 flex-shrink-0">
              <FaFileAlt className="text-sm" />
            </span>
            Laporan Terbaru
          </h3>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <select className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8">
                <option>Terbaru Dulu</option>
                <option>Terlama Dulu</option>
              </select>
              <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <FaSortAmountDown className="text-xs" />
              </div>
              <div className="absolute right-0 inset-y-0 flex items-center pr-2 pointer-events-none text-gray-500">
                <FaAngleDown />
              </div>
            </div>

            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
              Lihat Semua
              <FaChevronRight className="ml-1 text-xs" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Judul Laporan
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Departemen
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {reports.map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-md ${report.status === 'approved' ? 'bg-green-100' :
                            report.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                          } mr-3`}>
                          <FaFileAlt className={`${report.status === 'approved' ? 'text-green-600' :
                              report.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                            }`} />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{report.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {report.department}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(report.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.status === 'approved' ? 'bg-green-100 text-green-800' :
                          report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {report.status === 'approved' ? 'Disetujui' :
                          report.status === 'pending' ? 'Dalam Review' : 'Ditolak'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50">
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50">
                          <FaDownload className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Summary Analysis - Enhanced with modern cards and interactive elements */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-b-xl"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {/* Performance Analysis */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <FaChartBar className="text-indigo-600 mr-2" />
            Analisis Performa
          </h3>
          <div className="space-y-5">
            {performanceMetrics.map((item, index) => (
              <div key={index} className="transform transition-transform hover:scale-102">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{item.label}</span>
                  <span className={`text-sm font-bold text-${item.color}-600`}>{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>Target: 80%</span>
                  <span className="text-green-600 font-medium">+{item.value - 80}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution Card with placeholder for chart */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <FaChartPie className="text-indigo-600 mr-2" />
              <span>Distribusi Status</span>
            </div>
            <div>
              <select className="text-xs border-gray-200 rounded p-1 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option>Bulan Ini</option>
                <option>Kuartal Ini</option>
                <option>Tahun Ini</option>
              </select>
            </div>
          </h3>

          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
            {/* Placeholder for actual chart - in a real app, you'd use a chart library here */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border-8 border-indigo-500 border-t-transparent border-r-transparent animate-spin"></div>
              <p className="text-gray-500 mt-4">Grafik Distribusi Status</p>
              <button className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                Lihat Detail Lengkap <FaChevronRight className="ml-1 text-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanSummary;
