import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    MdFileDownload,
    MdCalendarToday,
    MdHistory,
    MdFilterList,
    MdPictureAsPdf,
    MdInsertDriveFile,
    MdTableView,
    MdCheck,
    MdError,
    MdHourglassEmpty,
    MdRefresh,
    MdDeleteForever,
    MdOpenInNew,
    MdPreview
} from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const ExportHistory = () => {
    const [exportJobs, setExportJobs] = useState([]);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [exportFormat, setExportFormat] = useState('pdf');
    const [activityTypes, setActivityTypes] = useState([]);
    const [selectedActivityTypes, setSelectedActivityTypes] = useState([]);
    const [previewData, setPreviewData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [exportSuccess, setExportSuccess] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    const { user } = useSelector((state) => state.auth);

    // Dummy data for activity types
    const dummyActivityTypes = [
        { id: 'proposal_created', label: 'Proposal Created' },
        { id: 'proposal_edited', label: 'Proposal Edited' },
        { id: 'document_uploaded', label: 'Document Uploaded' },
        { id: 'proposal_submitted', label: 'Proposal Submitted' },
        { id: 'feedback_received', label: 'Feedback Received' },
        { id: 'review_complete', label: 'Review Complete' },
        { id: 'report_submitted', label: 'Report Submitted' }
    ];

    // Dummy data for export jobs
    const dummyExportJobs = [
        {
            id: 'exp-1',
            dateCreated: new Date('2025-04-15T14:30:00'),
            dateRange: {
                start: new Date('2025-03-01'),
                end: new Date('2025-04-15')
            },
            format: 'pdf',
            status: 'completed',
            fileSize: '2.4 MB',
            activityCount: 24,
            downloadUrl: '#'
        },
        {
            id: 'exp-2',
            dateCreated: new Date('2025-04-10T09:15:00'),
            dateRange: {
                start: new Date('2025-02-01'),
                end: new Date('2025-04-01')
            },
            format: 'csv',
            status: 'completed',
            fileSize: '1.1 MB',
            activityCount: 18,
            downloadUrl: '#'
        },
        {
            id: 'exp-3',
            dateCreated: new Date('2025-04-05T16:45:00'),
            dateRange: {
                start: new Date('2025-01-01'),
                end: new Date('2025-03-31')
            },
            format: 'excel',
            status: 'failed',
            errorMessage: 'Server error occurred during export',
            activityCount: 42
        },
        {
            id: 'exp-4',
            dateCreated: new Date('2025-04-02T11:20:00'),
            dateRange: {
                start: new Date('2025-03-15'),
                end: new Date('2025-03-31')
            },
            format: 'pdf',
            status: 'processing',
            activityCount: 8
        }
    ];

    // Dummy data for activities preview
    const dummyPreviewData = [
        {
            id: 'act-1',
            type: 'proposal_created',
            title: 'Created Proposal: Perancangan Sistem Validasi Format',
            timestamp: new Date('2025-04-10T09:30:00'),
            details: 'New proposal draft created from template'
        },
        {
            id: 'act-2',
            type: 'proposal_edited',
            title: 'Edited Proposal: Perancangan Sistem Validasi Format',
            timestamp: new Date('2025-04-11T14:20:00'),
            details: 'Updated methodology section and budget'
        },
        {
            id: 'act-3',
            type: 'document_uploaded',
            title: 'Uploaded Document: Research Timeline',
            timestamp: new Date('2025-04-12T10:15:00'),
            details: 'Added supporting document to proposal'
        },
        {
            id: 'act-4',
            type: 'proposal_submitted',
            title: 'Submitted Proposal for Review',
            timestamp: new Date('2025-04-14T16:45:00'),
            details: 'Proposal submitted to current active session'
        },
        {
            id: 'act-5',
            type: 'feedback_received',
            title: 'Received Feedback on Proposal',
            timestamp: new Date('2025-04-16T11:30:00'),
            details: 'Reviewer comments received on methodology'
        }
    ];

    useEffect(() => {
        // Simulate loading data
        setIsLoading(true);
        setTimeout(() => {
            setActivityTypes(dummyActivityTypes);
            setExportJobs(dummyExportJobs);
            setPreviewData(dummyPreviewData);
            setIsLoading(false);
        }, 800);
    }, []);

    const handleActivityTypeToggle = (typeId) => {
        if (selectedActivityTypes.includes(typeId)) {
            setSelectedActivityTypes(selectedActivityTypes.filter(id => id !== typeId));
        } else {
            setSelectedActivityTypes([...selectedActivityTypes, typeId]);
        }
    };

    const handleExport = () => {
        if (!startDate || !endDate) {
            alert('Please select a date range for export');
            return;
        }

        setIsExporting(true);
        setExportSuccess(null);

        // Simulate export process
        setTimeout(() => {
            const success = Math.random() > 0.2; // 80% chance of success
            setIsExporting(false);
            setExportSuccess(success);

            if (success) {
                // Add new export job to the list
                const newExport = {
                    id: `exp-${Date.now()}`,
                    dateCreated: new Date(),
                    dateRange: {
                        start: startDate,
                        end: endDate
                    },
                    format: exportFormat,
                    status: 'completed',
                    fileSize: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
                    activityCount: Math.floor(Math.random() * 30) + 5,
                    downloadUrl: '#'
                };

                setExportJobs([newExport, ...exportJobs]);

                // Reset form after successful export
                setTimeout(() => {
                    setExportSuccess(null);
                }, 3000);
            }
        }, 2000);
    };

    const handleGeneratePreview = () => {
        if (!startDate || !endDate) {
            alert('Please select a date range for preview');
            return;
        }

        setIsLoading(true);

        // Simulate preview generation
        setTimeout(() => {
            // Filter dummy data based on selected date range and activity types
            let filtered = [...dummyPreviewData];

            if (selectedActivityTypes.length > 0) {
                filtered = filtered.filter(item =>
                    selectedActivityTypes.includes(item.type)
                );
            }

            setPreviewData(filtered);
            setShowPreview(true);
            setIsLoading(false);
        }, 1000);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <MdCheck className="text-green-500" />;
            case 'failed':
                return <MdError className="text-red-500" />;
            case 'processing':
                return <MdHourglassEmpty className="text-yellow-500" />;
            default:
                return null;
        }
    };

    const getFormatIcon = (format) => {
        switch (format) {
            case 'pdf':
                return <MdPictureAsPdf className="text-red-500" />;
            case 'csv':
                return <MdTableView className="text-green-600" />;
            case 'excel':
                return <MdInsertDriveFile className="text-green-700" />;
            default:
                return <MdFileDownload />;
        }
    };

    if (isLoading && !previewData.length && !exportJobs.length) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md w-full">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800">Export Activity History</h2>
                <p className="text-gray-600 mt-1">Download your activity records for reporting and documentation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {/* Export Options Panel */}
                <div className="md:col-span-1 bg-gray-50 p-5 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Export Options</h3>

                    {/* Date Range Selection */}
                    <div className="mb-5">
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <MdCalendarToday className="mr-2" /> Date Range
                        </label>
                        <DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => setDateRange(update)}
                            isClearable={true}
                            placeholderText="Select date range"
                            className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Activity Type Filter */}
                    <div className="mb-5">
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <MdFilterList className="mr-2" /> Activity Types
                        </label>
                        <div className="max-h-48 overflow-y-auto bg-white rounded-md border border-gray-300 p-2">
                            {activityTypes.map(type => (
                                <div
                                    key={type.id}
                                    className="flex items-center mb-2 last:mb-0"
                                >
                                    <input
                                        type="checkbox"
                                        id={`type-${type.id}`}
                                        checked={selectedActivityTypes.includes(type.id)}
                                        onChange={() => handleActivityTypeToggle(type.id)}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label
                                        htmlFor={`type-${type.id}`}
                                        className="ml-2 text-sm text-gray-700"
                                    >
                                        {type.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Format Selection */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setExportFormat('pdf')}
                                className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${exportFormat === 'pdf'
                                    ? 'bg-blue-100 border-2 border-blue-500'
                                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <MdPictureAsPdf className={`text-2xl ${exportFormat === 'pdf' ? 'text-blue-600' : 'text-red-500'}`} />
                                <span className="text-xs mt-1">PDF</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setExportFormat('csv')}
                                className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${exportFormat === 'csv'
                                    ? 'bg-blue-100 border-2 border-blue-500'
                                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <MdTableView className={`text-2xl ${exportFormat === 'csv' ? 'text-blue-600' : 'text-green-600'}`} />
                                <span className="text-xs mt-1">CSV</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setExportFormat('excel')}
                                className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${exportFormat === 'excel'
                                    ? 'bg-blue-100 border-2 border-blue-500'
                                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <MdInsertDriveFile className={`text-2xl ${exportFormat === 'excel' ? 'text-blue-600' : 'text-green-700'}`} />
                                <span className="text-xs mt-1">Excel</span>
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-3 mt-6">
                        <button
                            type="button"
                            onClick={handleExport}
                            disabled={isExporting || !startDate || !endDate}
                            className={`flex items-center justify-center py-2.5 px-4 rounded-md ${isExporting || !startDate || !endDate
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                } transition-colors`}
                        >
                            {isExporting ? (
                                <>
                                    <div className="animate-spin h-5 w-5 mr-3 border-2 border-t-transparent border-white rounded-full"></div>
                                    Exporting...
                                </>
                            ) : (
                                <>
                                    <MdFileDownload className="mr-2" />
                                    Export History
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleGeneratePreview}
                            disabled={isLoading || !startDate || !endDate}
                            className={`flex items-center justify-center py-2.5 px-4 rounded-md border ${isLoading || !startDate || !endDate
                                ? 'bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed'
                                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                                } transition-colors`}
                        >
                            <MdPreview className="mr-2" />
                            Generate Preview
                        </button>
                    </div>

                    {/* Export Status Message */}
                    {exportSuccess !== null && (
                        <div className={`mt-4 p-3 rounded-md ${exportSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            <div className="flex items-center">
                                {exportSuccess ? (
                                    <MdCheck className="mr-2" />
                                ) : (
                                    <MdError className="mr-2" />
                                )}
                                <p className="text-sm">
                                    {exportSuccess
                                        ? 'Export completed successfully!'
                                        : 'Export failed. Please try again.'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Preview Panel + Export History */}
                <div className="md:col-span-2">
                    {/* Data Preview */}
                    {showPreview && (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
                            <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg flex justify-between items-center">
                                <h3 className="font-medium text-gray-800 flex items-center">
                                    <MdPreview className="mr-2" />
                                    Preview Data
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {previewData.length} activities found
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                {previewData.length > 0 ? (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Activity
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Type
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {previewData.map((activity) => (
                                                <tr key={activity.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {activity.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {activityTypes.find(t => t.id === activity.type)?.label || activity.type}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {format(activity.timestamp, 'MMM d, yyyy h:mm a')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        No activities found for the selected criteria
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Export History */}
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                            <h3 className="font-medium text-gray-800 flex items-center">
                                <MdHistory className="mr-2" />
                                Recent Exports
                            </h3>
                        </div>

                        {exportJobs.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Format
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Period
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {exportJobs.map((job) => (
                                            <motion.tr
                                                key={job.id}
                                                className="hover:bg-gray-50"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {format(job.dateCreated, 'MMM d, yyyy h:mm a')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="mr-2">{getFormatIcon(job.format)}</span>
                                                        <span className="text-sm text-gray-900 uppercase">{job.format}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {format(job.dateRange.start, 'MMM d')} - {format(job.dateRange.end, 'MMM d, yyyy')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="mr-2">{getStatusIcon(job.status)}</span>
                                                        <span className={`text-sm capitalize ${job.status === 'completed' ? 'text-green-800' :
                                                            job.status === 'failed' ? 'text-red-800' :
                                                                'text-yellow-800'
                                                            }`}>
                                                            {job.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                    <div className="flex justify-end space-x-2">
                                                        {job.status === 'completed' && (
                                                            <a
                                                                href={job.downloadUrl}
                                                                className="text-blue-600 hover:text-blue-800 p-1"
                                                                title="Download"
                                                            >
                                                                <MdFileDownload />
                                                            </a>
                                                        )}

                                                        {job.status === 'failed' && (
                                                            <button
                                                                type="button"
                                                                className="text-blue-600 hover:text-blue-800 p-1"
                                                                title="Retry"
                                                            >
                                                                <MdRefresh />
                                                            </button>
                                                        )}

                                                        <button
                                                            type="button"
                                                            className="text-gray-600 hover:text-gray-800 p-1"
                                                            title="Delete"
                                                        >
                                                            <MdDeleteForever />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                <MdHistory className="mx-auto mb-3 text-4xl text-gray-300" />
                                <p>No export history found</p>
                                <p className="text-sm mt-1">Your export history will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportHistory;
