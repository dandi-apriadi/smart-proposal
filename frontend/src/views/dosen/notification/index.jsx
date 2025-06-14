import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    MdNotifications,
    MdAccessTime,
    MdFeedback,
    MdSettings,
    MdMarkEmailRead,
    MdDeleteOutline,
    MdFilterList,
    MdRefresh,
    MdNotificationsActive,
    MdNotificationsOff,
    MdErrorOutline,
    MdCheck,
    MdInfoOutline,
    MdClose,
    MdArrowBack
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NotificationHub = () => {
    const dispatch = useDispatch();
    const { baseURL } = useSelector((state) => state.auth);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });

        // In a real implementation, fetch notifications from API
        // dispatch(fetchNotifications());
    }, []);

    // Dummy notifications data
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'important',
            title: 'Batas Waktu Pengajuan Proposal',
            message: 'Deadline pengajuan proposal untuk Session 2025-01 adalah 15 April 2025.',
            timestamp: '2025-04-01T09:30:00',
            isRead: false,
        },
        {
            id: 2,
            type: 'deadline',
            title: 'Reminder: Pengajuan Laporan Kemajuan',
            message: 'Laporan kemajuan untuk proposal "Sistem Validasi Berbasis ML" harus diserahkan dalam 3 hari.',
            timestamp: '2025-04-02T14:15:00',
            isRead: false,
        },
        {
            id: 3,
            type: 'feedback',
            title: 'Feedback Diterima',
            message: 'Anda telah menerima feedback baru untuk proposal "Sistem Validasi Format Proposal" dari reviewer Dr. Budi Santoso.',
            timestamp: '2025-04-03T11:45:00',
            isRead: true,
        },
        {
            id: 4,
            type: 'important',
            title: 'Proposal Disetujui',
            message: 'Selamat! Proposal "Sistem Validasi Format Proposal" telah disetujui untuk pendanaan.',
            timestamp: '2025-04-05T16:20:00',
            isRead: true,
        },
        {
            id: 5,
            type: 'deadline',
            title: 'Session Baru Dibuka',
            message: 'Session baru 2025-02 telah dibuka untuk pengajuan proposal. Periode pengajuan: 20 April - 10 Mei 2025',
            timestamp: '2025-04-10T08:00:00',
            isRead: false,
        },
    ]);

    // Filter states
    const [activeFilter, setActiveFilter] = useState('all');
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);

    // Settings modal state
    const [showSettings, setShowSettings] = useState(false);

    // Notification detail modal state
    const [selectedNotification, setSelectedNotification] = useState(null);

    // Notification preferences
    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        importantAlerts: true,
        deadlineReminders: true,
        feedbackNotifications: true,
    });

    // Filter notifications based on selected filters
    const getFilteredNotifications = () => {
        let filtered = [...notifications];

        if (activeFilter !== 'all') {
            filtered = filtered.filter(notif => notif.type === activeFilter);
        }

        if (showUnreadOnly) {
            filtered = filtered.filter(notif => !notif.isRead);
        }

        return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    };

    // Mark notification as read
    const markAsRead = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, isRead: true } : notif
        ));
    };

    // Mark all as read
    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    };

    // Delete notification
    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    // Format timestamp to readable date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get notification icon based on type
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'important':
                return <MdNotificationsActive className="text-red-500 text-xl" />;
            case 'deadline':
                return <MdAccessTime className="text-orange-500 text-xl" />;
            case 'feedback':
                return <MdFeedback className="text-blue-500 text-xl" />;
            default:
                return <MdInfoOutline className="text-gray-500 text-xl" />;
        }
    };

    // Get badge color based on type
    const getBadgeColor = (type) => {
        switch (type) {
            case 'important':
                return 'bg-red-100 text-red-800';
            case 'deadline':
                return 'bg-orange-100 text-orange-800';
            case 'feedback':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get badge text based on type
    const getBadgeText = (type) => {
        switch (type) {
            case 'important':
                return 'Penting';
            case 'deadline':
                return 'Deadline';
            case 'feedback':
                return 'Feedback';
            default:
                return 'Info';
        }
    };

    // Get unread count
    const getUnreadCount = () => {
        return notifications.filter(notif => !notif.isRead).length;
    };

    // Open notification detail
    const openNotificationDetail = (notification) => {
        markAsRead(notification.id);
        setSelectedNotification(notification);
    };

    // Close notification detail
    const closeNotificationDetail = () => {
        setSelectedNotification(null);
    };

    return (
        <div className="mx-auto px-4 py-6 max-w-6xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6" data-aos="fade-down">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                        <MdNotifications className="mr-2 text-blue-600 text-3xl" />
                        Notification Hub
                        {getUnreadCount() > 0 && (
                            <span className="ml-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                                {getUnreadCount()}
                            </span>
                        )}
                    </h1>
                    <p className="text-gray-600 mt-1">Kelola semua notifikasi dan pengingat penting di sini</p>
                </div>

                <div className="flex mt-4 md:mt-0 space-x-2">
                    <button
                        onClick={markAllAsRead}
                        className="flex items-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all"
                        disabled={getUnreadCount() === 0}
                    >
                        <MdMarkEmailRead className="mr-1" />
                        <span>Tandai Semua Dibaca</span>
                    </button>
                    <button
                        onClick={() => setShowSettings(true)}
                        className="flex items-center px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-all"
                    >
                        <MdSettings className="mr-1" />
                        <span className="hidden sm:inline">Pengaturan</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm mb-6 p-4" data-aos="fade-up" data-aos-delay="100">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center mr-2">
                        <MdFilterList className="text-gray-500 mr-1" />
                        <span className="text-gray-700 font-medium">Filter:</span>
                    </div>

                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeFilter === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Semua
                    </button>

                    <button
                        onClick={() => setActiveFilter('important')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center ${activeFilter === 'important'
                            ? 'bg-red-600 text-white'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                            }`}
                    >
                        <MdNotificationsActive className="mr-1" />
                        Penting
                    </button>

                    <button
                        onClick={() => setActiveFilter('deadline')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center ${activeFilter === 'deadline'
                            ? 'bg-orange-600 text-white'
                            : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                            }`}
                    >
                        <MdAccessTime className="mr-1" />
                        Deadline
                    </button>

                    <button
                        onClick={() => setActiveFilter('feedback')}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center ${activeFilter === 'feedback'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                            }`}
                    >
                        <MdFeedback className="mr-1" />
                        Feedback
                    </button>

                    <div className="ml-auto">
                        <button
                            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                            className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${showUnreadOnly
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {showUnreadOnly ? (
                                <>
                                    <MdCheck className="mr-1" />
                                    Belum Dibaca
                                </>
                            ) : (
                                <>
                                    <MdCheck className="mr-1" />
                                    Semua Status
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-5" data-aos="fade-up" data-aos-delay="200">
                {getFilteredNotifications().length === 0 ? (
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-10 text-center border border-gray-100 transition-all hover:shadow-lg">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                            <MdNotificationsOff className="text-gray-400 text-4xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak Ada Notifikasi</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            {activeFilter !== 'all'
                                ? `Tidak ada notifikasi dengan filter "${getBadgeText(activeFilter)}"`
                                : showUnreadOnly
                                    ? 'Tidak ada notifikasi yang belum dibaca'
                                    : 'Anda tidak memiliki notifikasi saat ini'}
                        </p>
                    </div>
                ) : (
                    getFilteredNotifications().map((notification) => (
                        <div
                            key={notification.id}
                            className={`group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] ${notification.isRead
                                ? 'border border-gray-100 shadow-sm'
                                : 'border-l-4 border-l-blue-500 border-y border-r border-gray-100 shadow'
                                }`}
                            data-aos="fade-up"
                        >
                            <div className="flex items-start p-5">
                                <div className={`flex-shrink-0 mr-4 ${!notification.isRead ? 'animate-pulse' : ''
                                    }`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.type === 'important' ? 'bg-red-50' :
                                        notification.type === 'deadline' ? 'bg-orange-50' :
                                            notification.type === 'feedback' ? 'bg-blue-50' : 'bg-gray-50'
                                        }`}>
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                </div>
                                <div className="flex-grow cursor-pointer" onClick={() => openNotificationDetail(notification)}>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getBadgeColor(notification.type)} shadow-sm`}>
                                            {getBadgeText(notification.type)}
                                        </span>
                                        {!notification.isRead && (
                                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800 shadow-sm animate-pulse">
                                                Baru
                                            </span>
                                        )}
                                    </div>
                                    <h3 className={`font-medium ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                                        {notification.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                        {notification.message}
                                    </p>
                                    <div className="text-gray-400 text-xs mt-2 flex items-center">
                                        <MdAccessTime className="mr-1" />
                                        {formatDate(notification.timestamp)}
                                    </div>
                                </div>
                                <div className="flex-shrink-0 flex space-x-1 ml-2">
                                    {!notification.isRead && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                markAsRead(notification.id);
                                            }}
                                            className="p-1 hover:bg-blue-50 rounded text-blue-600 transition-colors"
                                            title="Tandai sudah dibaca"
                                        >
                                            <MdMarkEmailRead />
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNotification(notification.id);
                                        }}
                                        className="p-1 hover:bg-red-50 rounded text-red-500 transition-colors"
                                        title="Hapus notifikasi"
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div
                        className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
                        data-aos="zoom-in"
                    >
                        <div className="p-5 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                                    <MdSettings className="mr-2 text-blue-600" />
                                    Pengaturan Notifikasi
                                </h3>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                                >
                                    <MdClose />
                                </button>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-800">Notifikasi Email</h4>
                                        <p className="text-sm text-gray-600">Terima notifikasi melalui email</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={preferences.emailNotifications}
                                            onChange={() => setPreferences({
                                                ...preferences,
                                                emailNotifications: !preferences.emailNotifications
                                            })}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-800">Notifikasi Penting</h4>
                                        <p className="text-sm text-gray-600">Terima notifikasi untuk pemberitahuan penting</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={preferences.importantAlerts}
                                            onChange={() => setPreferences({
                                                ...preferences,
                                                importantAlerts: !preferences.importantAlerts
                                            })}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-800">Pengingat Deadline</h4>
                                        <p className="text-sm text-gray-600">Terima pengingat untuk tenggat waktu</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={preferences.deadlineReminders}
                                            onChange={() => setPreferences({
                                                ...preferences,
                                                deadlineReminders: !preferences.deadlineReminders
                                            })}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-800">Notifikasi Feedback</h4>
                                        <p className="text-sm text-gray-600">Terima notifikasi untuk umpan balik proposal</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={preferences.feedbackNotifications}
                                            onChange={() => setPreferences({
                                                ...preferences,
                                                feedbackNotifications: !preferences.feedbackNotifications
                                            })}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Simpan Pengaturan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Detail Modal */}
            {selectedNotification && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div
                        className="bg-white rounded-xl shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
                        data-aos="fade-up"
                    >
                        <div className="p-5 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={closeNotificationDetail}
                                    className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                                >
                                    <MdArrowBack />
                                </button>
                                <h3 className="text-xl font-bold text-gray-800">
                                    Detail Notifikasi
                                </h3>
                                <button
                                    onClick={() => deleteNotification(selectedNotification.id) || closeNotificationDetail()}
                                    className="p-1 rounded-full hover:bg-red-100 text-red-500"
                                    title="Hapus notifikasi"
                                >
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex items-center mb-4">
                                {getNotificationIcon(selectedNotification.type)}
                                <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${getBadgeColor(selectedNotification.type)}`}>
                                    {getBadgeText(selectedNotification.type)}
                                </span>
                            </div>

                            <h2 className="text-xl font-bold text-gray-800 mb-3">
                                {selectedNotification.title}
                            </h2>

                            <p className="text-gray-700 mb-4">
                                {selectedNotification.message}
                            </p>

                            <div className="text-gray-500 text-sm flex items-center mt-6">
                                <MdAccessTime className="mr-1" />
                                {formatDate(selectedNotification.timestamp)}
                            </div>
                        </div>

                        <div className="p-5 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={closeNotificationDetail}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationHub;
