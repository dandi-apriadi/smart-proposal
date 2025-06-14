import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaCheck,
  FaBell,
  FaEllipsisV,
  FaChevronRight,
  FaFilter,
  FaRegCalendarCheck
} from 'react-icons/fa';

const ScheduleDisplay = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  // Sample data for schedule items - expanded with more entries and blue theme
  const scheduleItems = [
    {
      id: 1,
      title: 'Review Proposal Pengadaan Lab',
      time: '10:30 - 11:30',
      location: 'Ruang Rapat Utama',
      participants: ['Dr. Ahmad', 'Ka. Prodi TI', 'Bendahara', 'Kajur Komputer'],
      isConfirmed: true,
      priority: 'high',
      date: new Date().toISOString().split('T')[0], // Today
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Deadline Proposal Beasiswa',
      time: '17:00',
      isConfirmed: false,
      priority: 'medium',
      date: new Date().toISOString().split('T')[0], // Today
      type: 'deadline'
    },
    {
      id: 3,
      title: 'Workshop AI untuk Dosen',
      time: '13:00 - 16:00',
      location: 'Lab Komputer',
      participants: ['Team IT', 'Dosen TI', 'Mahasiswa', 'Tim Pengembang', 'Pemateri'],
      isConfirmed: true,
      priority: 'medium',
      date: new Date().toISOString().split('T')[0], // Today
      type: 'event'
    },
    {
      id: 4,
      title: 'Deadline Laporan Keuangan',
      time: '12:00',
      isConfirmed: false,
      priority: 'high',
      date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], // Tomorrow
      type: 'deadline'
    },
    {
      id: 5,
      title: 'Koordinasi Program Kerja',
      time: '09:00 - 10:00',
      location: 'Ruang Wakil Direktur',
      participants: ['Ka. Jurusan', 'Sekretaris', 'Bendahara'],
      isConfirmed: true,
      priority: 'medium',
      date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], // Tomorrow
      type: 'meeting'
    },
    {
      id: 6,
      title: 'Seminar Penelitian Terbaru',
      time: '14:00 - 16:30',
      location: 'Aula Utama',
      participants: ['Rektor', 'Dekan', 'Tim Peneliti', 'Dosen', 'Mahasiswa'],
      isConfirmed: true,
      priority: 'high',
      date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0], // Day after tomorrow
      type: 'event'
    },
    {
      id: 7,
      title: 'Evaluasi Kinerja Semester',
      time: '10:00 - 12:00',
      location: 'Ruang Rapat Lt.3',
      participants: ['Wadir', 'Kajur', 'Ka. Prodi', 'Tim Evaluasi'],
      isConfirmed: true,
      priority: 'high',
      date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0], // 3 days from now
      type: 'meeting'
    },
    {
      id: 8,
      title: 'Deadline Pengajuan Dana Penelitian',
      time: '23:59',
      isConfirmed: false,
      priority: 'high',
      date: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString().split('T')[0], // 4 days from now
      type: 'deadline'
    },
    {
      id: 9,
      title: 'Rapat Anggaran Tahunan',
      time: '09:00 - 15:00',
      location: 'Ruang Senat',
      participants: ['Direktur', 'Wadir', 'Bendahara', 'Tim Keuangan', 'Kajur'],
      isConfirmed: true,
      priority: 'high',
      date: new Date().toISOString().split('T')[0], // Today
      type: 'meeting'
    },
    {
      id: 10,
      title: 'Persiapan Akreditasi',
      time: '13:30 - 15:30',
      location: 'Ruang Quality Assurance',
      participants: ['Tim ISO', 'Tim Akreditasi', 'Kajur', 'Kaprodi'],
      isConfirmed: true,
      priority: 'medium',
      date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], // Tomorrow
      type: 'meeting'
    }
  ];

  // Filter schedule items based on active tab
  const filteredSchedule = scheduleItems.filter(item => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

    if (activeTab === 'today') {
      return item.date === today;
    } else if (activeTab === 'tomorrow') {
      return item.date === tomorrow;
    } else if (activeTab === 'upcoming') {
      // Events beyond tomorrow
      return item.date > tomorrow;
    } else if (activeTab === 'deadlines') {
      return item.type === 'deadline';
    }
    return true;
  });

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'meeting': return <div className="bg-blue-100 p-3 rounded-full text-blue-600"><FaUsers /></div>;
      case 'deadline': return <div className="bg-red-100 p-3 rounded-full text-red-600"><FaClock /></div>;
      case 'event': return <div className="bg-green-100 p-3 rounded-full text-green-600"><FaRegCalendarCheck /></div>;
      default: return <div className="bg-gray-100 p-3 rounded-full text-gray-600"><FaCalendarAlt /></div>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl" data-aos="fade-up">
      {/* Header section - Changed from orange to blue */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400 opacity-20 rounded-full -mt-10 -mr-10 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-300 opacity-20 rounded-full -mb-10 -ml-10 blur-xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-2.5 rounded-xl backdrop-blur-sm shadow-inner">
              <FaCalendarAlt className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Jadwal & Deadline</h2>
              <p className="text-blue-100 text-sm">Manajemen waktu dan aktivitas</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              className="bg-white bg-opacity-10 text-white px-3 py-2 rounded-lg hover:bg-opacity-20 transition-all flex items-center space-x-1 border border-blue-400"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="text-sm" />
              <span className="text-sm">{showFilters ? 'Tutup Filter' : 'Filter'}</span>
            </button>

            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-blue-50 transition-colors">
              + Jadwal Baru
            </button>
          </div>
        </div>
      </div>

      {/* Filter panel - Changed from orange to blue */}
      {showFilters && (
        <div className="p-4 bg-blue-50 border-b border-blue-100 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Tipe Jadwal</label>
              <select className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Semua Tipe</option>
                <option value="meeting">Rapat</option>
                <option value="deadline">Deadline</option>
                <option value="event">Acara</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Prioritas</label>
              <select className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Semua Prioritas</option>
                <option value="high">Tinggi</option>
                <option value="medium">Sedang</option>
                <option value="low">Rendah</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Status</label>
              <select className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Semua Status</option>
                <option value="confirmed">Terkonfirmasi</option>
                <option value="unconfirmed">Belum Terkonfirmasi</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              Terapkan Filter
            </button>
          </div>
        </div>
      )}

      {/* Navigation tabs - Changed from orange to blue */}
      <div className="border-b border-gray-100">
        <div className="flex px-2 overflow-x-auto hide-scrollbar">
          {[
            {
              id: 'today',
              label: 'Hari Ini'
            },
            {
              id: 'tomorrow',
              label: 'Besok'
            },
            {
              id: 'upcoming',
              label: 'Mendatang'
            },
            {
              id: 'deadlines',
              label: 'Deadline'
            }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-4 relative whitespace-nowrap ${activeTab === tab.id
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule items - Modified for blue theme */}
      <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {filteredSchedule.length > 0 ? (
          filteredSchedule.map((item) => (
            <div
              key={item.id}
              className={`p-4 hover:bg-blue-50 transition-colors ${item.priority === 'high' ? 'border-l-4 border-red-500' :
                item.priority === 'medium' ? 'border-l-4 border-yellow-500' : ''
                }`}
              data-aos="fade-left"
              data-aos-delay={item.id * 50}
            >
              <div className="flex items-start space-x-4">
                {getTypeIcon(item.type)}

                <div className="flex-1">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <div className="flex items-center space-x-2">
                      {item.isConfirmed ? (
                        <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 border border-green-200">
                          <FaCheck className="mr-1" /> Terkonfirmasi
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                          <FaBell className="mr-1" /> Menunggu
                        </span>
                      )}
                      <button className="text-gray-400 hover:text-gray-600">
                        <FaEllipsisV />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaClock className="mr-1.5 text-blue-500" />
                      {item.time}
                    </div>

                    {item.location && (
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-1.5 text-blue-500" />
                        {item.location}
                      </div>
                    )}

                    {item.participants && (
                      <div className="flex items-center">
                        <FaUsers className="mr-1.5 text-blue-500" />
                        <span>{item.participants.length} peserta</span>
                      </div>
                    )}
                  </div>

                  {item.participants && (
                    <div className="mt-3 flex items-center">
                      <div className="flex -space-x-3 overflow-hidden mr-3 hover:space-x-1 transition-all duration-300">
                        {item.participants.slice(0, 3).map((participant, idx) => (
                          <div
                            key={idx}
                            className="h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xs font-medium text-blue-700 shadow-sm transform transition-all hover:scale-110 hover:z-10"
                            title={participant}
                          >
                            {participant.charAt(0)}
                          </div>
                        ))}
                        {item.participants.length > 3 && (
                          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-xs font-medium ring-2 ring-white text-gray-700 shadow-sm transform transition-all hover:scale-110 hover:z-10">
                            +{item.participants.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="ml-auto">
                        <button className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded-full transition-colors">
                          Detail
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 px-6 text-center">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <FaCalendarAlt className="text-blue-500 text-2xl animate-pulse" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Tidak Ada Jadwal</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              {activeTab === 'today' ? 'Tidak ada agenda untuk hari ini. Nikmati waktu Anda!' :
                activeTab === 'tomorrow' ? 'Tidak ada agenda untuk besok. Anda memiliki waktu untuk persiapan.' :
                  activeTab === 'deadlines' ? 'Tidak ada deadline yang akan datang dalam waktu dekat.' :
                    'Tidak ada agenda mendatang untuk ditampilkan saat ini.'}
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center mx-auto">
              <span className="mr-2">Tambah Jadwal Baru</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Footer section - Changed from orange to blue */}
      <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Sinkronkan dengan Google Calendar
        </button>
        <button className="inline-flex items-center text-gray-700 hover:text-gray-900 text-sm font-medium bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors shadow-sm">
          <span className="mr-1.5">Lihat Semua</span>
          <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default ScheduleDisplay;
