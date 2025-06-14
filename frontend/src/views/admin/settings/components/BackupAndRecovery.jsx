import React, { useState, useEffect } from 'react';
import {
    FiHardDrive, FiDownload, FiUpload, FiClock, FiCalendar,
    FiCheck, FiX, FiAlertTriangle, FiRotateCw, FiDatabase,
    FiShield, FiServer, FiArchive, FiTrash2, FiFile, FiBox
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const BackupAndRecovery = ({ compactMode = false }) => {
    // States for backup and recovery
    const [backupStatus, setBackupStatus] = useState({
        lastBackupDate: "2025-04-12T08:30:00Z",
        lastBackupSize: "156.8 MB",
        backupHealth: "good", // good, warning, critical
        autoBackupEnabled: true,
        backupFrequency: "daily", // daily, weekly, monthly
        backupRetention: 30, // days
        totalBackups: 24,
        storageUsed: "3.2 GB",
        storageAvailable: "10 GB",
    });

    const [backupHistory, setBackupHistory] = useState([
        {
            id: "bkp-2025-04-12",
            date: "2025-04-12T08:30:00Z",
            size: "156.8 MB",
            type: "automatic",
            status: "completed",
            contenType: "full", // full, proposals, users, settings
            note: "Daily automatic backup"
        },
        {
            id: "bkp-2025-04-11",
            date: "2025-04-11T08:30:00Z",
            size: "155.2 MB",
            type: "automatic",
            status: "completed",
            contenType: "full",
            note: "Daily automatic backup"
        },
        {
            id: "bkp-2025-04-10-manual",
            date: "2025-04-10T14:22:15Z",
            size: "154.9 MB",
            type: "manual",
            status: "completed",
            contenType: "full",
            note: "Pre-update manual backup"
        },
        {
            id: "bkp-2025-04-10",
            date: "2025-04-10T08:30:00Z",
            size: "154.7 MB",
            type: "automatic",
            status: "completed",
            contenType: "full",
            note: "Daily automatic backup"
        },
        {
            id: "bkp-2025-04-09",
            date: "2025-04-09T08:30:00Z",
            size: "153.1 MB",
            type: "automatic",
            status: "completed",
            contenType: "full",
            note: "Daily automatic backup"
        }
    ]);

    const [isCreatingBackup, setIsCreatingBackup] = useState(false);
    const [isRestoringBackup, setIsRestoringBackup] = useState(false);
    const [selectedBackupForRestore, setSelectedBackupForRestore] = useState(null);
    const [showRestoreConfirmation, setShowRestoreConfirmation] = useState(false);
    const [backupFilter, setBackupFilter] = useState("all"); // all, manual, automatic

    // AOS initialization
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const AOS = require('aos');
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
            });
            AOS.refresh();
        }
    }, []);

    // Calculate storage usage percentage
    const storagePercentage = () => {
        const used = parseFloat(backupStatus.storageUsed);
        const available = parseFloat(backupStatus.storageAvailable);
        return Math.round((used / available) * 100);
    };

    // Handle backup creation
    const handleCreateBackup = () => {
        setIsCreatingBackup(true);
        const toastId = toast.loading("Creating system backup...");

        // Simulate API call
        setTimeout(() => {
            const newBackup = {
                id: `bkp-${new Date().toISOString().split('T')[0]}-manual`,
                date: new Date().toISOString(),
                size: "157.2 MB",
                type: "manual",
                status: "completed",
                contenType: "full",
                note: "Manual backup"
            };

            setBackupHistory([newBackup, ...backupHistory]);
            setBackupStatus({
                ...backupStatus,
                lastBackupDate: newBackup.date,
                lastBackupSize: newBackup.size,
                totalBackups: backupStatus.totalBackups + 1
            });

            setIsCreatingBackup(false);

            toast.update(toastId, {
                render: "Backup created successfully!",
                type: toast.TYPE.SUCCESS,
                isLoading: false,
                autoClose: 3000,
                closeButton: true
            });
        }, 3000);
    };

    // Handle restore from backup
    const handleRestoreBackup = (backupId) => {
        const backupToRestore = backupHistory.find(backup => backup.id === backupId);
        setSelectedBackupForRestore(backupToRestore);
        setShowRestoreConfirmation(true);
    };

    // Confirm and execute restore
    const confirmRestore = () => {
        setShowRestoreConfirmation(false);
        setIsRestoringBackup(true);

        const toastId = toast.loading(`Restoring system from backup: ${selectedBackupForRestore.id}...`);

        // Simulate API call
        setTimeout(() => {
            setIsRestoringBackup(false);

            toast.update(toastId, {
                render: "System restored successfully! Redirecting to login...",
                type: toast.TYPE.SUCCESS,
                isLoading: false,
                autoClose: 3000,
                closeButton: true
            });

            // In a real app, you might want to redirect to login or reload the app
            setTimeout(() => {
                // window.location.href = '/login';
                console.log("System restored, would redirect to login");
            }, 3000);
        }, 5000);
    };

    // Format date string
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filter backups based on type
    const filteredBackups = backupFilter === "all"
        ? backupHistory
        : backupHistory.filter(backup => backup.type === backupFilter);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300" data-aos="fade-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center">
                    <FiDatabase className="text-lg text-indigo-600 mr-2" />
                    <h2 className={`${compactMode ? 'text-lg' : 'text-xl'} font-semibold text-slate-800`}>Backup & Recovery</h2>
                </div>
                <button
                    type="button"
                    onClick={handleCreateBackup}
                    disabled={isCreatingBackup}
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
            ${isCreatingBackup ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200`}
                >
                    {isCreatingBackup ? (
                        <>
                            <FiRotateCw className="animate-spin mr-1.5 h-4 w-4" /> Creating...
                        </>
                    ) : (
                        <>
                            <FiHardDrive className="mr-1.5 h-4 w-4" /> Create Backup
                        </>
                    )}
                </button>
            </div>

            {/* Content */}
            <div className={`${compactMode ? 'p-4' : 'p-6'}`}>
                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Last Backup Status */}
                    <div className="bg-slate-50 rounded-lg border border-slate-100 p-4">
                        <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-slate-700">Last Backup</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${backupStatus.backupHealth === 'good' ? 'bg-green-100 text-green-800' :
                                    backupStatus.backupHealth === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'}`}>
                                {backupStatus.backupHealth === 'good' ?
                                    <FiCheck className="mr-1 h-3 w-3" /> :
                                    backupStatus.backupHealth === 'warning' ?
                                        <FiAlertTriangle className="mr-1 h-3 w-3" /> :
                                        <FiX className="mr-1 h-3 w-3" />}
                                {backupStatus.backupHealth === 'good' ? 'Healthy' :
                                    backupStatus.backupHealth === 'warning' ? 'Warning' : 'Critical'}
                            </span>
                        </div>
                        <div className="mt-3">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>Date</span>
                                <span className="font-medium text-slate-700">{formatDate(backupStatus.lastBackupDate)}</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>Size</span>
                                <span className="font-medium text-slate-700">{backupStatus.lastBackupSize}</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Total Backups</span>
                                <span className="font-medium text-slate-700">{backupStatus.totalBackups}</span>
                            </div>
                        </div>
                    </div>

                    {/* Auto Backup Settings */}
                    <div className="bg-slate-50 rounded-lg border border-slate-100 p-4">
                        <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-slate-700">Auto Backup</h3>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={backupStatus.autoBackupEnabled}
                                    onChange={() => setBackupStatus({ ...backupStatus, autoBackupEnabled: !backupStatus.autoBackupEnabled })}
                                />
                                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer 
                               peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                               after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 
                               after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                        <div className="mt-3">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>Frequency</span>
                                <select
                                    className="bg-transparent border-none font-medium text-slate-700 focus:ring-0 p-0 text-xs"
                                    value={backupStatus.backupFrequency}
                                    onChange={(e) => setBackupStatus({ ...backupStatus, backupFrequency: e.target.value })}
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>Time</span>
                                <span className="font-medium text-slate-700">08:30 UTC</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Retention</span>
                                <select
                                    className="bg-transparent border-none font-medium text-slate-700 focus:ring-0 p-0 text-xs"
                                    value={backupStatus.backupRetention}
                                    onChange={(e) => setBackupStatus({ ...backupStatus, backupRetention: parseInt(e.target.value) })}
                                >
                                    <option value="7">7 days</option>
                                    <option value="14">14 days</option>
                                    <option value="30">30 days</option>
                                    <option value="60">60 days</option>
                                    <option value="90">90 days</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Storage Status */}
                    <div className="bg-slate-50 rounded-lg border border-slate-100 p-4">
                        <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-slate-700">Storage</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${storagePercentage() < 70 ? 'bg-green-100 text-green-800' :
                                    storagePercentage() < 90 ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'}`}>
                                {storagePercentage()}% Used
                            </span>
                        </div>
                        <div className="mt-3">
                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div
                                    className={`h-2.5 rounded-full ${storagePercentage() < 70 ? 'bg-green-500' :
                                        storagePercentage() < 90 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                    style={{ width: `${storagePercentage()}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                <span>{backupStatus.storageUsed} used</span>
                                <span>{backupStatus.storageAvailable} total</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Backup History */}
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-medium text-slate-700">Backup History</h3>
                        <div className="flex space-x-2">
                            <button
                                className={`px-3 py-1 text-xs rounded-md ${backupFilter === 'all' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}
                                onClick={() => setBackupFilter('all')}
                            >
                                All
                            </button>
                            <button
                                className={`px-3 py-1 text-xs rounded-md ${backupFilter === 'manual' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}
                                onClick={() => setBackupFilter('manual')}
                            >
                                Manual
                            </button>
                            <button
                                className={`px-3 py-1 text-xs rounded-md ${backupFilter === 'automatic' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}
                                onClick={() => setBackupFilter('automatic')}
                            >
                                Automatic
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Backup ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Size</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Note</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {filteredBackups.map((backup) => (
                                    <tr key={backup.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <FiBox className="text-slate-400 mr-2" />
                                                <span className="text-sm text-slate-900">{backup.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {formatDate(backup.date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {backup.size}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${backup.type === 'automatic' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                                                {backup.type === 'automatic' ? <FiClock className="mr-1 h-3 w-3" /> : <FiUser className="mr-1 h-3 w-3" />}
                                                {backup.type.charAt(0).toUpperCase() + backup.type.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {backup.note}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleRestoreBackup(backup.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-md p-1.5 transition-colors duration-200"
                                                    title="Restore from this backup"
                                                >
                                                    <FiRotateCw className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => console.log(`Download backup: ${backup.id}`)}
                                                    className="text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-md p-1.5 transition-colors duration-200"
                                                    title="Download backup"
                                                >
                                                    <FiDownload className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm(`Are you sure you want to delete the backup: ${backup.id}?`)) {
                                                            setBackupHistory(backupHistory.filter(b => b.id !== backup.id));
                                                            setBackupStatus({
                                                                ...backupStatus,
                                                                totalBackups: backupStatus.totalBackups - 1
                                                            });
                                                            toast.success("Backup deleted successfully");
                                                        }
                                                    }}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded-md p-1.5 transition-colors duration-200"
                                                    title="Delete backup"
                                                >
                                                    <FiTrash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredBackups.length === 0 && (
                        <div className="text-center py-12">
                            <FiArchive className="mx-auto h-10 w-10 text-slate-300" />
                            <h3 className="mt-2 text-sm font-medium text-slate-700">No backups found</h3>
                            <p className="mt-1 text-sm text-slate-500">No backup history matching your filter criteria.</p>
                        </div>
                    )}
                </div>

                {/* Manual Restore Section */}
                <div className="mt-8 border-t border-slate-200 pt-6">
                    <h3 className="text-base font-medium text-slate-700 mb-4">Manual Restore</h3>
                    <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                        <p className="text-sm text-slate-600 mb-4">
                            You can restore the system from an uploaded backup file. The system will be unavailable during the restore process.
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="relative">
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer bg-white py-2 px-3 border border-slate-300 rounded-md shadow-sm text-sm leading-4 font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span>Select backup file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".bak,.zip" />
                                </label>
                                <span className="ml-3 text-sm text-slate-500">No file selected</span>
                            </div>
                            <button
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => toast.info("Upload functionality would be implemented here")}
                            >
                                <FiUpload className="mr-2 -ml-1 h-4 w-4" />
                                Upload & Restore
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Restore Confirmation Modal */}
            {showRestoreConfirmation && (
                <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowRestoreConfirmation(false)}></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                                    <FiAlertTriangle className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h3 className="text-lg leading-6 font-medium text-slate-900" id="modal-title">
                                        Confirm System Restore
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-slate-500">
                                            You are about to restore the system from backup: <strong>{selectedBackupForRestore?.id}</strong> created on {formatDate(selectedBackupForRestore?.date)}.
                                            This action will:
                                        </p>
                                        <ul className="list-disc text-left text-sm text-slate-500 ml-5 mt-2">
                                            <li>Log out all users</li>
                                            <li>Temporarily make the system unavailable</li>
                                            <li>Restore all data to the state at the time of the backup</li>
                                            <li>Any changes made after this backup will be lost</li>
                                        </ul>
                                        <p className="text-sm text-slate-500 mt-2">
                                            Are you sure you want to proceed?
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:col-start-2 sm:text-sm"
                                    onClick={confirmRestore}
                                >
                                    Confirm Restore
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                    onClick={() => setShowRestoreConfirmation(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Restoring Overlay */}
            {isRestoringBackup && (
                <div className="fixed z-50 inset-0 overflow-y-auto bg-slate-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
                        <FiRotateCw className="animate-spin h-12 w-12 text-indigo-600 mx-auto" />
                        <h3 className="mt-4 text-xl font-semibold text-slate-900">Restoring System</h3>
                        <p className="mt-2 text-slate-500">
                            Please do not close or refresh this window. Your system is being restored from backup.
                        </p>
                        <div className="mt-6">
                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div className="bg-indigo-600 h-2.5 rounded-full animate-progress"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Fix the missing FiUser icon
const FiUser = ({ className }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    );
};

export default BackupAndRecovery;
