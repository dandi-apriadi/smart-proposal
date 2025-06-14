import React, { useState, useEffect } from 'react';
import {
  FaHistory,
  FaUserEdit,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaCalendar,
  FaFilter,
  FaClock,
  FaEllipsisH,
  FaAngleDown,
  FaSortAmountDown,
  FaChevronRight
} from 'react-icons/fa';

const LogActivitySummary = () => {
  const [filterDate, setFilterDate] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedActivity, setExpandedActivity] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest');

  const activities = [
    {
      id: 1,
      type: 'proposal',
      action: 'review',
      user: 'Dr. Ahmad',
      title: 'Review Proposal Pengadaan Lab',
      timestamp: '10:45 AM',
      date: 'Hari ini',
      status: 'success',
      details: 'Proposal telah divalidasi dan disetujui untuk dilanjutkan ke tahap berikutnya.',
      userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      type: 'system',
      action: 'validation',
      user: 'System ML',
      title: 'Validasi Otomatis Format',
      timestamp: '09:30 AM',
      date: 'Hari ini',
      status: 'warning',
      details: 'Format proposal memerlukan perbaikan pada struktur anggaran dan timeline.',
      userAvatar: 'https://randomuser.me/api/portraits/lego/5.jpg'
    },
    {
      id: 3,
      type: 'document',
      action: 'upload',
      user: 'Kepala Lab TI',
      title: 'Upload Dokumen Pendukung',
      timestamp: '08:15 AM',
      date: 'Hari ini',
      status: 'info',
      details: 'Dokumen pendukung telah diunggah untuk proposal pengadaan peralatan laboratorium.',
      userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 4,
      type: 'proposal',
      action: 'reject',
      user: 'Wadir 1',
      title: 'Penolakan Proposal Workshop',
      timestamp: '16:20 PM',
      date: 'Kemarin',
      status: 'error',
      details: 'Proposal workshop ditolak karena anggaran melebihi batas maksimum yang diperbolehkan.',
      userAvatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    }
  ];

  useEffect(() => {
    setFilteredActivities(activities);
  }, []);

  useEffect(() => {
    const results = activities.filter(activity =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sorting
    let sortedResults = [...results];
    if (sortOrder === 'newest') {
      // Assume the IDs are in chronological order where higher ID = newer
      sortedResults.sort((a, b) => b.id - a.id);
    } else if (sortOrder === 'oldest') {
      sortedResults.sort((a, b) => a.id - b.id);
    }

    setFilteredActivities(sortedResults);
  }, [searchTerm, sortOrder]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const toggleActivityExpand = (id) => {
    if (expandedActivity === id) {
      setExpandedActivity(null);
    } else {
      setExpandedActivity(id);
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-600';
      case 'warning': return 'bg-yellow-100 text-yellow-600';
      case 'info': return 'bg-blue-100 text-blue-600';
      case 'error': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case 'proposal': return <FaFileAlt />;
      case 'system': return <FaCheckCircle />;
      case 'document': return <FaUserEdit />;
      default: return <FaHistory />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-all hover:shadow-lg" data-aos="fade-up">
      {/* Header with dynamic gradient and floating elements */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 p-6 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 opacity-20 rounded-full -mt-20 -mr-20 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300 opacity-20 rounded-full -mb-10 -ml-10 blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-2.5 rounded-xl backdrop-blur-sm shadow-inner">
              <FaHistory className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-white text-xl font-bold tracking-tight">Log Aktivitas</h2>
              <p className="text-blue-100 text-sm">Pantau semua aktivitas sistem</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[140px]">
              <select
                className="appearance-none w-full bg-white bg-opacity-10 text-white border border-blue-500 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 focus:bg-opacity-15 transition-all pl-4 pr-10"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              >
                <option value="today" className="text-gray-800">Hari Ini</option>
                <option value="week" className="text-gray-800">Minggu Ini</option>
                <option value="month" className="text-gray-800">Bulan Ini</option>
                <option value="all" className="text-gray-800">Semua Waktu</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-white">
                <FaAngleDown />
              </div>
            </div>

            <button
              className="bg-white bg-opacity-10 text-white px-3 py-2 rounded-lg hover:bg-opacity-20 transition-all flex items-center space-x-1 border border-blue-500"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="text-sm" />
              <span className="text-sm">{showFilters ? 'Tutup Filter' : 'Filter'}</span>
            </button>

            <div className="relative min-w-[140px]">
              <select
                className="appearance-none w-full bg-white bg-opacity-10 text-white border border-blue-500 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 transition-all pr-10 pl-9"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest" className="text-gray-800">Terbaru</option>
                <option value="oldest" className="text-gray-800">Terlama</option>
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none text-white">
                <FaSortAmountDown className="text-sm" />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-white">
                <FaAngleDown />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search Bar with animations */}
      <div className="p-4 border-b relative">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari aktivitas, pengguna, atau detail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            {searchTerm && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </form>

        {/* Advanced Filters - Conditionally rendered with animation */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1.5">Tipe Aktivitas</label>
                <select className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Semua Tipe</option>
                  <option value="proposal">Proposal</option>
                  <option value="system">Sistem</option>
                  <option value="document">Dokumen</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1.5">Pengguna</label>
                <select className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Semua Pengguna</option>
                  <option value="admin">Admin</option>
                  <option value="system">Sistem</option>
                  <option value="user">Pengguna Regular</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1.5">Status</label>
                <select className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Semua Status</option>
                  <option value="success">Sukses</option>
                  <option value="warning">Peringatan</option>
                  <option value="info">Informasi</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                Reset
              </button>
              <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Terapkan Filter
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Activity Timeline with enhanced visuals */}
      <div className="divide-y divide-gray-100 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="hover:bg-blue-50 transition-colors duration-200"
              data-aos="fade-up"
              data-aos-delay={activity.id * 50}
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => toggleActivityExpand(activity.id)}
              >
                <div className="flex items-start space-x-4">
                  {/* User avatar or icon */}
                  <div className="relative">
                    {activity.userAvatar ? (
                      <img
                        src={activity.userAvatar}
                        alt={activity.user}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    ) : (
                      <div className={`rounded-full p-3 ${getStatusClasses(activity.status)}`}>
                        {getStatusIcon(activity.type)}
                      </div>
                    )}
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${getStatusClasses(activity.status)} flex items-center justify-center border-2 border-white`}>
                      {getStatusIcon(activity.type)}
                    </div>
                  </div>

                  {/* Content with hover effects */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{activity.details}</p>

                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {activity.user}
                          </span>

                          <div className="flex items-center text-xs text-gray-500">
                            <FaClock className="mr-1 text-gray-400" />
                            {activity.timestamp}
                          </div>

                          <div className="flex items-center text-xs text-gray-500">
                            <FaCalendar className="mr-1 text-gray-400" />
                            {activity.date}
                          </div>
                        </div>
                      </div>

                      {/* Status badge with hover effect */}
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activity.status === 'success' ? 'bg-green-100 text-green-800' :
                            activity.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                              activity.status === 'error' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                          }`}>
                          {activity.status === 'success' ? 'Sukses' :
                            activity.status === 'warning' ? 'Peringatan' :
                              activity.status === 'error' ? 'Error' : 'Info'}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100">
                          <FaEllipsisH className="text-xs" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {expandedActivity === activity.id && (
                      <div className="mt-3 pt-3 border-t border-gray-100 animate-fadeIn">
                        <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                          <p className="mb-2"><strong>Detail Aktivitas:</strong></p>
                          <p>{activity.details}</p>

                          <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                            <span className="text-xs text-gray-500">ID: ACT-{activity.id.toString().padStart(4, '0')}</span>
                            <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center">
                              Lihat Detail Lengkap <FaChevronRight className="ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-gray-500">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaHistory className="text-gray-400 text-2xl" />
            </div>
            <p className="font-medium">Tidak ada aktivitas ditemukan</p>
            <p className="text-sm mt-2 text-gray-400">Coba ubah filter pencarian atau hapus kata kunci</p>
            <button className="mt-4 px-4 py-2 border border-blue-300 text-blue-600 rounded-lg text-sm hover:bg-blue-50 transition-colors">
              Reset Pencarian
            </button>
          </div>
        )}
      </div>

      {/* Footer with modern styling */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <span className="text-sm text-gray-500">
            Menampilkan {filteredActivities.length} dari {activities.length} aktivitas
          </span>
          <div className="flex space-x-2">
            <button className="text-gray-600 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors">
              Export Log
            </button>
            <button className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center">
              <span className="mr-1">Lihat Semua</span>
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogActivitySummary;
