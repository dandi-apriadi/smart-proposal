import React, { useState, useEffect } from 'react';
import {
    MdAccessTime,
    MdEdit,
    MdUpload,
    MdFileDownload,
    MdDelete,
    MdVisibility,
    MdFilterList,
    MdRefresh,
    MdViewList,
    MdTimeline
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RecentActions = () => {
    const [view, setView] = useState('list'); // 'list' or 'timeline'
    const [filter, setFilter] = useState('all');
    const [actions, setActions] = useState([]);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });

        // Dummy data for recent actions
        const dummyActions = [
            {
                id: 1,
                type: 'edit',
                description: 'Edit proposal "Pengembangan Sistem Validasi Format Proposal"',
                timestamp: '2025-04-15T09:30:00',
                status: 'success',
                icon: <MdEdit className="text-blue-500" />
            },
            {
                id: 2,
                type: 'upload',
                description: 'Upload laporan kemajuan untuk proposal P001',
                timestamp: '2025-04-14T14:45:00',
                status: 'success',
                icon: <MdUpload className="text-green-500" />
            },
            {
                id: 3,
                type: 'download',
                description: 'Download template laporan akhir',
                timestamp: '2025-04-13T11:20:00',
                status: 'success',
                icon: <MdFileDownload className="text-indigo-500" />
            },
            {
                id: 4,
                type: 'view',
                description: 'Melihat feedback dari reviewer',
                timestamp: '2025-04-12T10:15:00',
                status: 'info',
                icon: <MdVisibility className="text-purple-500" />
            },
            {
                id: 5,
                type: 'delete',
                description: 'Menghapus draft proposal "Sistem Monitoring IoT"',
                timestamp: '2025-04-11T16:50:00',
                status: 'warning',
                icon: <MdDelete className="text-red-500" />
            },
            {
                id: 6,
                type: 'edit',
                description: 'Revisi proposal "Implementasi Blockchain"',
                timestamp: '2025-04-10T13:25:00',
                status: 'success',
                icon: <MdEdit className="text-blue-500" />
            },
            {
                id: 7,
                type: 'upload',
                description: 'Upload dokumen pendukung proposal',
                timestamp: '2025-04-09T15:10:00',
                status: 'success',
                icon: <MdUpload className="text-green-500" />
            }
        ];

        setActions(dummyActions);
    }, []);

    const filteredActions = filter === 'all'
        ? actions
        : actions.filter(action => action.type === filter);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'success': return 'bg-green-100 text-green-800';
            case 'warning': return 'bg-yellow-100 text-yellow-800';
            case 'error': return 'bg-red-100 text-red-800';
            case 'info': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 sm:mb-0">
                    Recent Actions
                </h2>

                <div className="flex flex-wrap gap-3">
                    <div className="relative inline-block">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Activities</option>
                            <option value="edit">Edits</option>
                            <option value="upload">Uploads</option>
                            <option value="download">Downloads</option>
                            <option value="view">Views</option>
                            <option value="delete">Deletions</option>
                        </select>
                        <MdFilterList className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>

                    <div className="flex rounded-md shadow-sm">
                        <button
                            onClick={() => setView('list')}
                            className={`px-4 py-2 text-sm font-medium rounded-l-md border ${view === 'list'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            <MdViewList className="inline-block mr-1" /> List
                        </button>
                        <button
                            onClick={() => setView('timeline')}
                            className={`px-4 py-2 text-sm font-medium rounded-r-md border ${view === 'timeline'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            <MdTimeline className="inline-block mr-1" /> Timeline
                        </button>
                    </div>

                    <button
                        onClick={() => setActions([...actions])}
                        className="flex items-center px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                        <MdRefresh className="mr-1" /> Refresh
                    </button>
                </div>
            </div>

            {filteredActions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No recent activities found.
                </div>
            ) : view === 'list' ? (
                <div className="overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {filteredActions.map((action, index) => (
                            <li
                                key={action.id}
                                className="py-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                                data-aos="fade-up"
                                data-aos-delay={index * 50}
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                        {action.icon}
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="flex justify-between items-baseline">
                                            <p className="text-sm font-medium text-gray-900">
                                                {action.description}
                                            </p>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(action.status)}`}>
                                                {action.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1 flex items-center">
                                            <MdAccessTime className="mr-1" />
                                            {formatDate(action.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="relative pl-6 border-l-2 border-gray-200 mt-4">
                    {filteredActions.map((action, index) => (
                        <div
                            key={action.id}
                            className="mb-8 relative"
                            data-aos="fade-right"
                            data-aos-delay={index * 50}
                        >
                            <div className="absolute -left-9 mt-1.5 w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-md border border-gray-200">
                                {action.icon}
                            </div>

                            <div className="ml-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
                                <div className="flex justify-between items-baseline mb-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        {action.description}
                                    </p>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(action.status)}`}>
                                        {action.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <MdAccessTime className="mr-1" />
                                    {formatDate(action.timestamp)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {filteredActions.length > 0 && (
                <div className="mt-6 text-center">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        View All Activity History
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecentActions;
