import React, { useState, useEffect } from 'react';
import {
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdDelete,
    MdMarkEmailRead,
    MdMarkEmailUnread,
    MdArchive,
    MdFileDownload,
    MdFilterList,
    MdRefresh,
    MdSend,
    MdWarning
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BulkActions = () => {
    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    // State for notification data
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New Proposal Submitted', recipient: 'All Reviewers', type: 'Info', status: 'Unread', date: '2025-04-15' },
        { id: 2, title: 'Session Upload Deadline Approaching', recipient: 'All Users', type: 'Warning', status: 'Read', date: '2025-04-14' },
        { id: 3, title: 'System Maintenance Notification', recipient: 'All Users', type: 'Alert', status: 'Unread', date: '2025-04-13' },
        { id: 4, title: 'Review Process Complete', recipient: 'Admin Team', type: 'Success', status: 'Unread', date: '2025-04-12' },
        { id: 5, title: 'New User Registration', recipient: 'Admin Team', type: 'Info', status: 'Read', date: '2025-04-11' },
        { id: 6, title: 'Proposal Rejected', recipient: 'John Doe', type: 'Alert', status: 'Unread', date: '2025-04-10' },
        { id: 7, title: 'Progress Report Due', recipient: 'All Researchers', type: 'Warning', status: 'Read', date: '2025-04-09' },
        { id: 8, title: 'Session Timeline Updated', recipient: 'All Users', type: 'Info', status: 'Unread', date: '2025-04-08' },
    ]);

    // State for selected notifications
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [filterType, setFilterType] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [confirmAction, setConfirmAction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Toggle select all notifications
    const handleSelectAll = () => {
        if (selectAll) {
            setSelected([]);
        } else {
            setSelected(filteredNotifications.map(notif => notif.id));
        }
        setSelectAll(!selectAll);
    };

    // Toggle selection of individual notification
    const handleSelect = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(item => item !== id));
            setSelectAll(false);
        } else {
            setSelected([...selected, id]);
            if (selected.length + 1 === filteredNotifications.length) {
                setSelectAll(true);
            }
        }
    };

    // Filter notifications based on type and status
    const filteredNotifications = notifications.filter(notif => {
        return (filterType === 'All' || notif.type === filterType) &&
            (filterStatus === 'All' || notif.status === filterStatus);
    });

    // Handle bulk actions
    const handleBulkAction = (action) => {
        if (selected.length === 0) return;
        setConfirmAction(action);
    };

    // Execute confirmed bulk action
    const executeAction = () => {
        setIsLoading(true);
        setTimeout(() => {
            let updatedNotifications = [...notifications];

            switch (confirmAction) {
                case 'delete':
                    updatedNotifications = notifications.filter(notif => !selected.includes(notif.id));
                    break;
                case 'markRead':
                    updatedNotifications = notifications.map(notif =>
                        selected.includes(notif.id) ? { ...notif, status: 'Read' } : notif
                    );
                    break;
                case 'markUnread':
                    updatedNotifications = notifications.map(notif =>
                        selected.includes(notif.id) ? { ...notif, status: 'Unread' } : notif
                    );
                    break;
                case 'archive':
                    // In a real app, this would update the archive status
                    console.log('Archived notifications:', selected);
                    break;
                case 'resend':
                    // In a real app, this would trigger a resend action
                    console.log('Resent notifications:', selected);
                    break;
                default:
                    break;
            }

            setNotifications(updatedNotifications);
            setSelected([]);
            setSelectAll(false);
            setConfirmAction(null);
            setIsLoading(false);
        }, 800);
    };

    // Get status badge color
    const getStatusColor = (status) => {
        return status === 'Unread' ? 'bg-blue-500' : 'bg-gray-400';
    };

    // Get type badge color
    const getTypeColor = (type) => {
        switch (type) {
            case 'Info': return 'bg-blue-500';
            case 'Warning': return 'bg-yellow-500';
            case 'Alert': return 'bg-red-500';
            case 'Success': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="flex flex-col w-full p-4 gap-4" data-aos="fade-up">
            {/* Header and Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h2 className="text-2xl font-semibold text-gray-800">Notification Bulk Actions</h2>

                <div className="flex flex-wrap gap-2">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">All Types</option>
                        <option value="Info">Info</option>
                        <option value="Warning">Warning</option>
                        <option value="Alert">Alert</option>
                        <option value="Success">Success</option>
                    </select>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">All Status</option>
                        <option value="Read">Read</option>
                        <option value="Unread">Unread</option>
                    </select>

                    <button
                        onClick={() => { setFilterType('All'); setFilterStatus('All'); }}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm flex items-center gap-1 transition-colors"
                    >
                        <MdRefresh size={18} />
                        <span className="hidden sm:inline">Reset</span>
                    </button>
                </div>
            </div>

            {/* Action Toolbar */}
            <div className="bg-white rounded-lg shadow mb-4">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-wrap gap-2 items-center">
                        <button
                            onClick={handleSelectAll}
                            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                            title={selectAll ? "Deselect All" : "Select All"}
                        >
                            {selectAll ? <MdCheckBox size={24} className="text-blue-500" /> : <MdCheckBoxOutlineBlank size={24} />}
                        </button>

                        <span className="text-sm text-gray-500 mr-2">
                            {selected.length} of {filteredNotifications.length} selected
                        </span>

                        <div className="flex-grow"></div>

                        <button
                            onClick={() => handleBulkAction('markRead')}
                            disabled={selected.length === 0}
                            className={`px-3 py-2 rounded-md text-sm flex items-center gap-1 transition-colors ${selected.length ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <MdMarkEmailRead size={18} />
                            <span className="hidden sm:inline">Mark Read</span>
                        </button>

                        <button
                            onClick={() => handleBulkAction('markUnread')}
                            disabled={selected.length === 0}
                            className={`px-3 py-2 rounded-md text-sm flex items-center gap-1 transition-colors ${selected.length ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <MdMarkEmailUnread size={18} />
                            <span className="hidden sm:inline">Mark Unread</span>
                        </button>

                        <button
                            onClick={() => handleBulkAction('archive')}
                            disabled={selected.length === 0}
                            className={`px-3 py-2 rounded-md text-sm flex items-center gap-1 transition-colors ${selected.length ? 'bg-gray-700 text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <MdArchive size={18} />
                            <span className="hidden sm:inline">Archive</span>
                        </button>

                        <button
                            onClick={() => handleBulkAction('resend')}
                            disabled={selected.length === 0}
                            className={`px-3 py-2 rounded-md text-sm flex items-center gap-1 transition-colors ${selected.length ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <MdSend size={18} />
                            <span className="hidden sm:inline">Resend</span>
                        </button>

                        <button
                            onClick={() => handleBulkAction('delete')}
                            disabled={selected.length === 0}
                            className={`px-3 py-2 rounded-md text-sm flex items-center gap-1 transition-colors ${selected.length ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <MdDelete size={18} />
                            <span className="hidden sm:inline">Delete</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Notifications Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden" data-aos="fade-up" data-aos-delay="200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Notification
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Recipient
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredNotifications.length > 0 ? (
                                filteredNotifications.map((notification) => (
                                    <tr
                                        key={notification.id}
                                        className={`hover:bg-gray-50 ${selected.includes(notification.id) ? 'bg-blue-50' : ''}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <button onClick={() => handleSelect(notification.id)}>
                                                    {selected.includes(notification.id) ? (
                                                        <MdCheckBox size={20} className="text-blue-500" />
                                                    ) : (
                                                        <MdCheckBoxOutlineBlank size={20} />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{notification.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{notification.recipient}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(notification.type)} text-white`}>
                                                {notification.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(notification.status)} text-white`}>
                                                {notification.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {notification.date}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No notifications found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center bg-white rounded-lg shadow p-4 mt-4">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredNotifications.length}</span> of <span className="font-medium">{filteredNotifications.length}</span> notifications
                </div>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        Next
                    </button>
                </div>
            </div>

            {/* Confirmation Modal */}
            {confirmAction && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6" data-aos="zoom-in">
                        <div className="flex items-center text-red-500 mb-4">
                            <MdWarning size={24} className="mr-2" />
                            <h3 className="text-lg font-medium">Confirm Action</h3>
                        </div>
                        <p className="mb-6 text-gray-600">
                            {confirmAction === 'delete' && `Are you sure you want to delete ${selected.length} selected notification(s)?`}
                            {confirmAction === 'markRead' && `Are you sure you want to mark ${selected.length} notification(s) as read?`}
                            {confirmAction === 'markUnread' && `Are you sure you want to mark ${selected.length} notification(s) as unread?`}
                            {confirmAction === 'archive' && `Are you sure you want to archive ${selected.length} selected notification(s)?`}
                            {confirmAction === 'resend' && `Are you sure you want to resend ${selected.length} selected notification(s)?`}
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setConfirmAction(null)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm transition-colors"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={executeAction}
                                className={`px-4 py-2 ${confirmAction === 'delete' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                                    } text-white rounded-md text-sm transition-colors flex items-center`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    'Confirm'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BulkActions;
