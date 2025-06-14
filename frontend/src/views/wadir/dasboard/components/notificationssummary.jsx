import React, { useState } from 'react';
import { FaBell, FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaClock, FaFilter, FaCheck, FaTrash, FaAngleDown, FaAngleUp, FaEllipsisH, FaRegBell, FaEnvelope, FaCog, FaEye, FaRegCalendarCheck } from 'react-icons/fa';

const NotificationsSummary = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [expandedFilters, setExpandedFilters] = useState(false);
  const [notificationData, setNotificationData] = useState([
    {
      id: 1,
      type: 'proposal',
      title: 'Proposal Baru Memerlukan Review',
      message: 'Proposal pengadaan laboratorium komputer telah diajukan oleh Jurusan TI dan memerlukan review segera.',
      time: '5 menit yang lalu',
      status: 'unread',
      priority: 'high',
      action: 'review'
    },
    {
      id: 2,
      type: 'report',
      title: 'Laporan Kegiatan Selesai',
      message: 'Laporan workshop AI telah selesai diproses. Silahkan tinjau dan berikan persetujuan akhir.',
      time: '1 jam yang lalu',
      status: 'read',
      priority: 'medium',
      action: 'approve'
    },
    {
      id: 3,
      type: 'system',
      title: 'Pembaruan Sistem',
      message: 'Sistem validasi telah diperbarui ke versi terbaru. Beberapa perbaikan dan peningkatan performa telah diterapkan.',
      time: '2 jam yang lalu',
      status: 'read',
      priority: 'low',
      action: 'info'
    },
    {
      id: 4,
      type: 'proposal',
      title: 'Deadline Proposal Mendekati',
      message: 'Proposal pengadaan alat laboratorium akan berakhir dalam 2 hari. Pastikan untuk menyelesaikan review tepat waktu.',
      time: '5 jam yang lalu',
      status: 'unread',
      priority: 'high',
      action: 'deadline'
    },
    {
      id: 5,
      type: 'meeting',
      title: 'Pengingat Rapat',
      message: 'Rapat koordinasi dengan Jurusan TI akan diadakan besok pukul 10:00 WIB di ruang rapat utama.',
      time: '6 jam yang lalu',
      status: 'read',
      priority: 'medium',
      action: 'calendar'
    }
  ]);

  const toggleNotification = (id) => {
    if (expandedNotification === id) {
      setExpandedNotification(null);
    } else {
      setExpandedNotification(id);
      // Mark as read when expanded
      setNotificationData(prevData =>
        prevData.map(notification =>
          notification.id === id
            ? { ...notification, status: 'read' }
            : notification
        )
      );
    }
  };

  const markAllAsRead = () => {
    setNotificationData(prevData =>
      prevData.map(notification => ({ ...notification, status: 'read' }))
    );
  };

  const deleteNotification = (id) => {
    setNotificationData(prevData =>
      prevData.filter(notification => notification.id !== id)
    );
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notificationData.filter(n => n.status === 'unread');
      case 'important':
        return notificationData.filter(n => n.priority === 'high');
      default:
        return notificationData;
    }
  };

  const getIconForType = (type, priority) => {
    const classes = {
      high: "bg-red-100 text-red-600",
      medium: "bg-yellow-100 text-yellow-600",
      low: "bg-blue-100 text-blue-600"
    };

    const priorityClass = classes[priority];

    switch (type) {
      case 'proposal': return <div className={`${priorityClass} p-2.5 rounded-xl`}><FaExclamationCircle /></div>;
      case 'report': return <div className={`${priorityClass} p-2.5 rounded-xl`}><FaCheckCircle /></div>;
      case 'system': return <div className={`${priorityClass} p-2.5 rounded-xl`}><FaCog /></div>;
      case 'meeting': return <div className={`${priorityClass} p-2.5 rounded-xl`}><FaEnvelope /></div>;
      default: return <div className={`${priorityClass} p-2.5 rounded-xl`}><FaInfoCircle /></div>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl h-full flex flex-col" data-aos="fade-up">
      {/* Header with animated gradient background */}
      <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 p-6 relative overflow-hidden">
        {/* Animated background dots */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-white opacity-10 blur-xl"></div>
          <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-purple-400 opacity-20 blur-xl"></div>
          <div className="absolute -bottom-6 left-20 w-20 h-20 rounded-full bg-purple-300 opacity-20 blur-xl"></div>
        </div>

        <div className="relative z-10 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg shadow-inner">
              <FaBell className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">Notifikasi</h2>
              <p className="text-purple-100 text-sm">Informasi penting untuk Anda</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-white/90 text-purple-800 font-semibold px-3.5 py-1.5 rounded-full text-sm shadow-sm">
              {notificationData.filter(n => n.status === 'unread').length} Baru
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs with modern design */}
      <div className="border-b border-gray-100">
        <div className="flex px-2 overflow-x-auto hide-scrollbar">
          {[
            { id: 'all', label: 'Semua', icon: <FaBell className="mr-1.5" /> },
            { id: 'unread', label: 'Belum Dibaca', icon: <FaExclamationCircle className="mr-1.5" /> },
            { id: 'important', label: 'Penting', icon: <FaInfoCircle className="mr-1.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-3 relative flex items-center text-sm ${activeTab === tab.id
                  ? 'text-purple-700 font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'unread' && notificationData.filter(n => n.status === 'unread').length > 0 && (
                <span className="ml-1.5 bg-purple-100 text-purple-800 text-xs px-1.5 py-0.5 rounded-full">
                  {notificationData.filter(n => n.status === 'unread').length}
                </span>
              )}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></span>
              )}
            </button>
          ))}

          <button
            onClick={() => setExpandedFilters(!expandedFilters)}
            className="ml-auto py-4 px-3 text-gray-500 hover:text-gray-700 flex items-center text-sm"
          >
            <FaFilter className="mr-1.5" />
            Filter
            {expandedFilters ? <FaAngleUp className="ml-1" /> : <FaAngleDown className="ml-1" />}
          </button>
        </div>

        {/* Expandable Filter Options */}
        {expandedFilters && (
          <div className="p-4 bg-gray-50 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-3 animate-fadeIn">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Periode</label>
              <select className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm">
                <option>Hari Ini</option>
                <option>Minggu Ini</option>
                <option>Bulan Ini</option>
                <option>Semua Waktu</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Tipe</label>
              <select className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm">
                <option>Semua Tipe</option>
                <option>Proposal</option>
                <option>Laporan</option>
                <option>Sistem</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Prioritas</label>
              <select className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm">
                <option>Semua Prioritas</option>
                <option>Tinggi</option>
                <option>Sedang</option>
                <option>Rendah</option>
              </select>
            </div>
          </div>
        )}
      </div>


      {/* Notifications List with enhanced animations */}
      <div className="divide-y divide-gray-100 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {getFilteredNotifications().length > 0 ? (
          getFilteredNotifications().map((notification) => (
            <div
              key={notification.id}
              className={`transition-colors duration-200 ${notification.status === 'unread'
                ? 'bg-purple-50 hover:bg-purple-100/70'
                : 'hover:bg-gray-50'}`}
              data-aos="fade-up"
              data-aos-delay={notification.id * 50}
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => toggleNotification(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  {getIconForType(notification.type, notification.priority)}

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between">
                      <h3 className={`font-semibold pr-2 ${notification.status === 'unread' ? 'text-gray-900' : 'text-gray-600'}`}>
                        {notification.title}
                        {notification.status === 'unread' && (
                          <span className="inline-block w-2 h-2 bg-purple-600 rounded-full ml-2"></span>
                        )}
                      </h3>
                      <div className="flex items-center text-gray-400 text-xs">
                        <FaClock className="mr-1" />
                        {notification.time}
                      </div>
                    </div>

                    <div className="mt-1 text-gray-500 text-sm line-clamp-2">
                      {notification.message}
                    </div>

                    {expandedNotification === notification.id && (
                      <div className="mt-3 pt-3 border-t border-gray-100 animate-fadeIn">
                        <p className="text-sm text-gray-600 mb-3">{notification.message}</p>

                        {notification.action && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {notification.action === 'review' && (
                              <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center">
                                <FaEye className="mr-1.5" /> Lihat Proposal
                              </button>
                            )}
                            {notification.action === 'approve' && (
                              <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700 transition-colors shadow-sm flex items-center">
                                <FaCheck className="mr-1.5" /> Setujui Laporan
                              </button>
                            )}
                            {notification.action === 'deadline' && (
                              <button className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-700 transition-colors shadow-sm flex items-center">
                                <FaClock className="mr-1.5" /> Lihat Deadline
                              </button>
                            )}
                            {notification.action === 'calendar' && (
                              <button className="bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-orange-700 transition-colors shadow-sm flex items-center">
                                <FaRegCalendarCheck className="mr-1.5" /> Tambah ke Kalender
                              </button>
                            )}
                          </div>
                        )}

                        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                          <div className="flex space-x-2">
                            <button
                              className="text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-2.5 py-1.5 rounded text-xs flex items-center transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                setNotificationData(prevData =>
                                  prevData.map(n =>
                                    n.id === notification.id
                                      ? { ...n, status: 'read' }
                                      : n
                                  )
                                );
                              }}
                            >
                              <FaCheck className="mr-1" /> Tandai Dibaca
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded text-xs flex items-center transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <FaTrash className="mr-1" /> Hapus
                            </button>
                          </div>
                          <button
                            className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaEllipsisH />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="rounded-full bg-purple-100 p-5 mb-4">
              <FaRegBell className="text-purple-500 text-2xl" />
            </div>
            <p className="text-gray-700 font-medium">Tidak ada notifikasi</p>
            <p className="text-gray-400 text-sm mt-2 max-w-xs">Semua notifikasi akan muncul di sini. Silahkan cek kembali nanti.</p>
          </div>
        )}
      </div>

      {/* Footer with Action Buttons */}
      <div className="p-4 bg-gray-50 border-t flex flex-wrap justify-between items-center gap-3">
        <button
          className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:shadow-sm transition-all"
          onClick={markAllAsRead}
        >
          <FaCheck className="mr-1.5" /> Tandai Semua Dibaca
        </button>
        <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all shadow-sm hover:shadow flex items-center whitespace-nowrap">
          <span className="mr-1.5">Lihat Semua</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotificationsSummary;
