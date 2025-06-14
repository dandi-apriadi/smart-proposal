import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    MdWarning,
    MdAccessTime,
    MdCalendarToday,
    MdCheck,
    MdChevronRight,
    MdNotifications,
    MdFileUpload,
    MdAssignment,
    MdDescription
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DeadlineReminder = () => {
    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // Get auth state from Redux store
    const { baseURL } = useSelector((state) => state.auth);

    // Dummy data for deadlines (in a real app, this would come from an API)
    const [deadlines, setDeadlines] = useState([
        {
            id: 1,
            type: 'proposal',
            title: 'Batas Pengumpulan Proposal',
            description: 'Pengajuan proposal penelitian untuk periode Semester Ganjil 2025/2026',
            dueDate: '2025-05-15T23:59:59',
            daysLeft: 3,
            icon: <MdFileUpload className="text-blue-500" size={24} />,
            status: 'urgent',
            session: 'Penelitian Dosen 2025',
            acknowledged: false
        },
        {
            id: 2,
            type: 'progress',
            title: 'Laporan Kemajuan',
            description: 'Pengumpulan laporan kemajuan untuk proyek "Sistem Validasi Format Proposal"',
            dueDate: '2025-06-20T23:59:59',
            daysLeft: 12,
            icon: <MdAssignment className="text-green-500" size={24} />,
            status: 'upcoming',
            session: 'Penelitian Dosen 2025',
            acknowledged: false
        },
        {
            id: 3,
            type: 'final',
            title: 'Laporan Akhir',
            description: 'Pengumpulan laporan akhir beserta dokumentasi pendukung',
            dueDate: '2025-08-30T23:59:59',
            daysLeft: 45,
            icon: <MdDescription className="text-purple-500" size={24} />,
            status: 'normal',
            session: 'Penelitian Dosen 2025',
            acknowledged: false
        }
    ]);

    // Function to handle acknowledging a reminder
    const handleAcknowledge = (id) => {
        setDeadlines(deadlines.map(deadline =>
            deadline.id === id ? { ...deadline, acknowledged: true } : deadline
        ));
    };

    // Get status color based on days left
    const getStatusColor = (status) => {
        switch (status) {
            case 'urgent':
                return 'border-red-500 bg-red-50';
            case 'upcoming':
                return 'border-yellow-500 bg-yellow-50';
            default:
                return 'border-blue-500 bg-blue-50';
        }
    };

    // Get status icon based on days left
    const getStatusIcon = (status) => {
        switch (status) {
            case 'urgent':
                return <MdWarning className="text-red-500" size={20} />;
            case 'upcoming':
                return <MdAccessTime className="text-yellow-500" size={20} />;
            default:
                return <MdCalendarToday className="text-blue-500" size={20} />;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full" data-aos="fade-up">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <MdNotifications className="text-blue-600" size={24} />
                    <h2 className="text-xl font-semibold text-gray-800">Deadline Reminders</h2>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {deadlines.filter(d => !d.acknowledged).length} Active
                </span>
            </div>

            {deadlines.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>No upcoming deadlines at the moment.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {deadlines.map((deadline) => (
                        <div
                            key={deadline.id}
                            className={`border-l-4 rounded-lg p-4 transition-all duration-300 hover:shadow-md ${getStatusColor(deadline.status)} ${deadline.acknowledged ? 'opacity-50' : ''}`}
                            data-aos="fade-right"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex space-x-3">
                                    <div className="mt-1">
                                        {deadline.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">{deadline.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{deadline.description}</p>
                                        <div className="flex items-center mt-2 text-sm text-gray-500">
                                            <span className="flex items-center">
                                                {getStatusIcon(deadline.status)}
                                                <span className="ml-1">
                                                    {deadline.daysLeft <= 0
                                                        ? 'Due today!'
                                                        : `${deadline.daysLeft} days remaining`}
                                                </span>
                                            </span>
                                            <span className="mx-2">•</span>
                                            <span>{new Date(deadline.dueDate).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}</span>
                                            <span className="mx-2">•</span>
                                            <span className="truncate max-w-[150px]">{deadline.session}</span>
                                        </div>
                                    </div>
                                </div>

                                {!deadline.acknowledged && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleAcknowledge(deadline.id)}
                                            className="flex items-center justify-center rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-200 transition-colors"
                                            title="Mark as acknowledged"
                                        >
                                            <MdCheck size={18} className="text-gray-600" />
                                        </button>
                                        <button
                                            className="flex items-center justify-center rounded-full w-8 h-8 bg-blue-100 hover:bg-blue-200 transition-colors"
                                            title="View details"
                                        >
                                            <MdChevronRight size={18} className="text-blue-600" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Progress bar for deadline */}
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                                <div
                                    className={`h-1.5 rounded-full ${deadline.status === 'urgent' ? 'bg-red-500' :
                                            deadline.status === 'upcoming' ? 'bg-yellow-500' : 'bg-blue-500'
                                        }`}
                                    style={{ width: `${Math.min(100, (1 - deadline.daysLeft / 100) * 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4 text-center">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    View All Reminders
                </button>
            </div>
        </div>
    );
};

export default DeadlineReminder;
