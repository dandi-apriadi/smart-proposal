import React, { useState, useEffect } from 'react';
import {
    MdWarning, MdInfo, MdClose, MdDone, MdAccessTime,
    MdNotifications, MdFilterList, MdRefresh, MdSearch, MdLightbulbOutline
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ImportantAlert = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    // Dummy data for important alerts
    const [alerts, setAlerts] = useState([
        {
            id: 1,
            type: 'critical',
            title: 'Proposal Deadline Approaching',
            message: 'Your proposal submission deadline is in 2 days. Please ensure all requirements are met before submission.',
            timestamp: '2025-04-15T08:30:00',
            read: false,
        },
        {
            id: 2,
            type: 'high',
            title: 'Review Feedback Available',
            message: 'Your proposal "AI-Based Learning System" has received feedback from reviewers. Please check and make necessary revisions.',
            timestamp: '2025-04-14T14:45:00',
            read: false,
        },
        {
            id: 3,
            type: 'medium',
            title: 'Progress Report Due Next Week',
            message: 'Your mid-term progress report for the ongoing project is due next week. Start preparing your documentation.',
            timestamp: '2025-04-13T11:20:00',
            read: true,
        },
        {
            id: 4,
            type: 'low',
            title: 'New Session Announced',
            message: 'A new proposal submission session has been announced for the upcoming semester. Check eligibility criteria.',
            timestamp: '2025-04-10T09:15:00',
            read: true,
        }
    ]);

    // Function to mark alert as read
    const markAsRead = (id) => {
        setAlerts(alerts.map(alert =>
            alert.id === id ? { ...alert, read: true } : alert
        ));
    };

    // Function to dismiss/remove alert
    const dismissAlert = (id) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
    };

    // Function to format timestamp
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Function to get appropriate icon based on alert type
    const getAlertIcon = (type) => {
        switch (type) {
            case 'critical':
            case 'high':
                return <MdWarning className="text-red-500 text-xl" />;
            case 'medium':
                return <MdInfo className="text-amber-500 text-xl" />;
            case 'low':
                return <MdNotifications className="text-blue-500 text-xl" />;
            default:
                return <MdInfo className="text-gray-500 text-xl" />;
        }
    };

    // Added filter state
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filter alerts based on type and search term
    const filteredAlerts = alerts.filter(alert => {
        const matchesFilter = filter === 'all' || alert.type === filter;
        const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alert.message.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Count unread notifications
    const unreadCount = alerts.filter(alert => !alert.read).length;

    // Function to get glassmorphism card style based on type
    const getAlertClass = (type, read) => {
        let baseClasses = "border-l-4 rounded-xl shadow-lg transition-all duration-300 mb-4 hover:shadow-xl backdrop-blur-sm transform hover:-translate-y-1";

        if (read) baseClasses += " opacity-85";

        switch (type) {
            case 'critical': return `${baseClasses} border-red-600 bg-gradient-to-r from-red-50 to-red-100`;
            case 'high': return `${baseClasses} border-red-400 bg-gradient-to-r from-red-50 to-pink-50`;
            case 'medium': return `${baseClasses} border-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50`;
            case 'low': return `${baseClasses} border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50`;
            default: return `${baseClasses} border-gray-400 bg-gradient-to-r from-gray-50 to-slate-50`;
        }
    };

    return (
        <div className="w-full mx-auto p-4">
            {/* Header section with enhanced styling */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-5 mb-6 text-white">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold flex items-center">
                        <MdNotifications className="mr-2 text-yellow-300 text-3xl" />
                        Pemberitahuan Penting
                        {unreadCount > 0 && (
                            <span className="ml-3 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full animate-pulse">
                                {unreadCount} baru
                            </span>
                        )}
                    </h2>
                    <div className="text-sm flex items-center bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                        <MdAccessTime className="mr-1" />
                        {new Date().toLocaleDateString('id-ID')}
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MdSearch className="text-white/70" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-4 py-2 bg-white/20 border-0 rounded-lg focus:ring-2 focus:ring-white/50 placeholder-white/70 text-white backdrop-blur-sm"
                            placeholder="Cari notifikasi..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg backdrop-blur-sm"
                    >
                        <MdFilterList />
                        Filter
                    </button>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setFilter('all');
                            setShowFilters(false);
                        }}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg backdrop-blur-sm"
                        title="Reset filter"
                    >
                        <MdRefresh />
                    </button>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className="mt-3 p-3 bg-white/20 rounded-lg backdrop-blur-sm grid grid-cols-2 sm:grid-cols-5 gap-2" data-aos="fade-down">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-white text-indigo-600 font-medium' : 'bg-white/30 hover:bg-white/40'}`}
                        >
                            Semua
                        </button>
                        <button
                            onClick={() => setFilter('critical')}
                            className={`px-3 py-2 rounded-lg transition-colors ${filter === 'critical' ? 'bg-white text-red-600 font-medium' : 'bg-white/30 hover:bg-white/40'}`}
                        >
                            Kritis
                        </button>
                        <button
                            onClick={() => setFilter('high')}
                            className={`px-3 py-2 rounded-lg transition-colors ${filter === 'high' ? 'bg-white text-red-500 font-medium' : 'bg-white/30 hover:bg-white/40'}`}
                        >
                            Penting
                        </button>
                        <button
                            onClick={() => setFilter('medium')}
                            className={`px-3 py-2 rounded-lg transition-colors ${filter === 'medium' ? 'bg-white text-amber-500 font-medium' : 'bg-white/30 hover:bg-white/40'}`}
                        >
                            Sedang
                        </button>
                        <button
                            onClick={() => setFilter('low')}
                            className={`px-3 py-2 rounded-lg transition-colors ${filter === 'low' ? 'bg-white text-blue-500 font-medium' : 'bg-white/30 hover:bg-white/40'}`}
                        >
                            Rendah
                        </button>
                    </div>
                )}
            </div>

            {filteredAlerts.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl shadow-md border border-gray-100" data-aos="fade-up">
                    <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                        <MdLightbulbOutline className="text-5xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada pemberitahuan</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        {searchTerm || filter !== 'all'
                            ? 'Tidak ada pemberitahuan yang sesuai dengan kriteria pencarian Anda'
                            : 'Saat ini tidak ada pemberitahuan penting yang perlu ditindaklanjuti'}
                    </p>
                    {(searchTerm || filter !== 'all') && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilter('all');
                            }}
                            className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium"
                        >
                            Reset Filter
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredAlerts.map((alert, index) => (
                        <div
                            key={alert.id}
                            className={getAlertClass(alert.type, alert.read)}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start">
                                        <div className="mr-4 p-2 rounded-full bg-white shadow-sm">
                                            {getAlertIcon(alert.type)}
                                        </div>
                                        <div>
                                            <div className="flex items-center">
                                                <h3 className={`font-bold text-lg ${alert.read ? 'text-gray-600' : 'text-gray-800'}`}>
                                                    {alert.title}
                                                </h3>
                                                {!alert.read && (
                                                    <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 mt-1 leading-relaxed">{alert.message}</p>
                                            <div className="text-xs text-gray-500 mt-3 flex items-center">
                                                <MdAccessTime className="mr-1" />
                                                {formatTime(alert.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-1">
                                        {!alert.read && (
                                            <button
                                                onClick={() => markAsRead(alert.id)}
                                                className="p-2 rounded-full hover:bg-white/60 transition-colors duration-200"
                                                title="Tandai sudah dibaca"
                                            >
                                                <MdDone className="text-green-600" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => dismissAlert(alert.id)}
                                            className="p-2 rounded-full hover:bg-white/60 transition-colors duration-200"
                                            title="Tutup notifikasi"
                                        >
                                            <MdClose className="text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {alerts.length > 0 && (
                <div className="mt-8 flex justify-between bg-white p-4 rounded-xl shadow-sm">
                    <button
                        onClick={() => setAlerts(alerts.map(alert => ({ ...alert, read: true })))}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200 font-medium"
                    >
                        <MdDone className="text-lg" />
                        Tandai semua sudah dibaca
                    </button>
                    <button
                        onClick={() => setAlerts([])}
                        className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors duration-200 font-medium"
                    >
                        <MdClose className="text-lg" />
                        Hapus semua notifikasi
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImportantAlert;
