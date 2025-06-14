import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    MdFileDownload,
    MdFilterList,
    MdCalendarToday,
    MdDescription,
    MdCheck,
    MdError,
    MdPictureAsPdf,
    MdTableChart,
    MdInsertDriveFile,
    MdClose
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ExportActivity = () => {
    const dispatch = useDispatch();
    const { baseURL } = useSelector(state => state.auth);
    const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    const [endDate, setEndDate] = useState(new Date());
    const [activityType, setActivityType] = useState('all');
    const [exportFormat, setExportFormat] = useState('csv');
    const [showFilters, setShowFilters] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [previewData, setPreviewData] = useState([]);
    // Add notification state
    const [notification, setNotification] = useState(null);

    // Enhanced mock activity data for preview
    const mockActivityData = [
        // Login/Logout Activities
        { id: 1, type: 'login', action: 'User logged in', timestamp: '2025-04-10T09:30:00Z', details: 'IP: 192.168.1.1, Browser: Chrome' },
        { id: 2, type: 'login', action: 'User logged out', timestamp: '2025-04-10T17:45:00Z', details: 'Session duration: 8h 15m' },
        { id: 3, type: 'login', action: 'Failed login attempt', timestamp: '2025-04-11T08:22:00Z', details: 'IP: 203.0.113.45, Browser: Firefox' },
        { id: 4, type: 'login', action: 'Password changed', timestamp: '2025-04-11T08:30:00Z', details: 'Security update' },
        { id: 5, type: 'login', action: 'User logged in', timestamp: '2025-04-11T08:35:00Z', details: 'IP: 192.168.1.1, Browser: Chrome' },

        // Review Activities
        { id: 6, type: 'review', action: 'Started review', timestamp: '2025-04-11T09:15:00Z', details: 'Proposal ID: PRO-2025-042, Title: AI-Based Learning System' },
        { id: 7, type: 'review', action: 'Reviewed proposal', timestamp: '2025-04-11T11:45:00Z', details: 'Proposal ID: PRO-2025-042, Score: 87/100' },
        { id: 8, type: 'review', action: 'Requested revision', timestamp: '2025-04-11T14:20:00Z', details: 'Proposal ID: PRO-2025-039, Section: Methodology' },
        { id: 9, type: 'review', action: 'Completed final review', timestamp: '2025-04-13T10:15:00Z', details: 'Proposal ID: PRO-2025-047, Status: Approved' },
        { id: 10, type: 'review', action: 'Rejected proposal', timestamp: '2025-04-13T15:30:00Z', details: 'Proposal ID: PRO-2025-051, Reason: Insufficient budget details' },

        // Feedback Activities
        { id: 11, type: 'feedback', action: 'Submitted feedback', timestamp: '2025-04-14T09:20:00Z', details: 'Proposal ID: PRO-2025-039, Rating: 4/5' },
        { id: 12, type: 'feedback', action: 'Received feedback response', timestamp: '2025-04-14T13:45:00Z', details: 'From: Dr. Jane Smith, RE: Proposal PRO-2025-042' },
        { id: 13, type: 'feedback', action: 'Updated feedback', timestamp: '2025-04-14T16:10:00Z', details: 'Proposal ID: PRO-2025-047, Added comments on budget' },
        { id: 14, type: 'feedback', action: 'Feedback acknowledged', timestamp: '2025-04-15T10:25:00Z', details: 'By: Prof. Robert Johnson (Submitter)' },
        { id: 15, type: 'feedback', action: 'Provided improvement suggestions', timestamp: '2025-04-15T14:50:00Z', details: 'Proposal ID: PRO-2025-062, Section: Literature Review' },

        // Report Activities
        { id: 16, type: 'report', action: 'Generated summary report', timestamp: '2025-04-16T09:30:00Z', details: 'Report type: Weekly Review Summary' },
        { id: 17, type: 'report', action: 'Exported performance metrics', timestamp: '2025-04-16T11:45:00Z', details: 'Format: PDF, Period: Apr 1-15, 2025' },
        { id: 18, type: 'report', action: 'Scheduled automated report', timestamp: '2025-04-16T14:20:00Z', details: 'Frequency: Weekly, Recipients: 3' },
        { id: 19, type: 'report', action: 'Reviewed progress report', timestamp: '2025-04-17T10:05:00Z', details: 'Project ID: PRJ-2025-018, Status: On Track' },
        { id: 20, type: 'report', action: 'Compiled department statistics', timestamp: '2025-04-17T15:30:00Z', details: 'Department: Computer Science, Proposals: 27' },

        // Additional Recent Activities (Various Types)
        { id: 21, type: 'login', action: 'User logged in', timestamp: '2025-04-18T08:45:00Z', details: 'IP: 192.168.1.1, Browser: Safari' },
        { id: 22, type: 'review', action: 'Started batch review', timestamp: '2025-04-18T09:30:00Z', details: 'Assigned proposals: 5' },
        { id: 23, type: 'review', action: 'Approved proposal', timestamp: '2025-04-18T11:20:00Z', details: 'Proposal ID: PRO-2025-058, Fast-tracked' },
        { id: 24, type: 'feedback', action: 'Submitted feedback', timestamp: '2025-04-18T14:15:00Z', details: 'Proposal ID: PRO-2025-063, Rating: 5/5' },
        { id: 25, type: 'report', action: 'Generated approval report', timestamp: '2025-04-18T16:40:00Z', details: 'For Session: 2025-1, Approved: 35/48' },

        // Previous Month Activities
        { id: 26, type: 'login', action: 'User logged in', timestamp: '2025-03-15T09:15:00Z', details: 'IP: 192.168.1.5, Browser: Edge' },
        { id: 27, type: 'review', action: 'Reviewed proposal', timestamp: '2025-03-15T11:30:00Z', details: 'Proposal ID: PRO-2025-029, Score: 92/100' },
        { id: 28, type: 'feedback', action: 'Submitted feedback', timestamp: '2025-03-16T13:45:00Z', details: 'Proposal ID: PRO-2025-031, Rating: 3/5' },
        { id: 29, type: 'report', action: 'Generated monthly digest', timestamp: '2025-03-31T16:00:00Z', details: 'Period: March 2025, Format: Excel' },
        { id: 30, type: 'login', action: 'User logged out', timestamp: '2025-03-31T17:30:00Z', details: 'Session duration: 7h 45m' }
    ];

    // Simple notification handler (replacement for middleware)
    const showNotification = (type, title, message) => {
        setNotification({ type, title, message });

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });

        // Fetch activity data (using mock data for now)
        setPreviewData(mockActivityData);
    }, []);

    // Filter activities based on selected criteria
    const filteredActivities = previewData.filter(activity => {
        const activityDate = new Date(activity.timestamp);
        const isWithinDateRange = activityDate >= startDate && activityDate <= endDate;
        const matchesType = activityType === 'all' || activity.type === activityType;

        return isWithinDateRange && matchesType;
    });

    // Handle export action
    const handleExport = async () => {
        setIsExporting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success notification directly
            showNotification(
                'success',
                'Export Successful',
                `Activity history exported as ${exportFormat.toUpperCase()} successfully.`
            );

        } catch (error) {
            // Show error notification directly
            showNotification(
                'error',
                'Export Failed',
                'There was an error exporting your activity history.'
            );
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8" data-aos="fade-up">
            {/* Notification Banner */}
            {notification && (
                <div
                    className={`mb-4 p-4 rounded-md flex justify-between items-center ${notification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                        'bg-red-50 text-red-700 border border-red-200'
                        }`}
                >
                    <div className="flex items-center">
                        {notification.type === 'success' ? (
                            <MdCheck className="mr-2" size={20} />
                        ) : (
                            <MdError className="mr-2" size={20} />
                        )}
                        <div>
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm">{notification.message}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setNotification(null)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <MdClose size={18} />
                    </button>
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <MdFileDownload className="mr-2 text-blue-600" size={24} />
                    Export Activity History
                </h2>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <MdFilterList className="mr-1" size={20} />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {/* Filters Section */}
            <div
                className={`bg-gray-50 rounded-lg p-4 mb-6 transition-all duration-300 ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden p-0'
                    }`}
                data-aos="fade-down"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Date Range Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                            <MdCalendarToday className="mr-1 text-gray-500" size={18} />
                            Date Range
                        </label>
                        <div className="flex items-center space-x-2">
                            <DatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                placeholderText="Start Date"
                            />
                            <span className="text-gray-500">to</span>
                            <DatePicker
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                placeholderText="End Date"
                            />
                        </div>
                    </div>

                    {/* Activity Type Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                            <MdDescription className="mr-1 text-gray-500" size={18} />
                            Activity Type
                        </label>
                        <select
                            value={activityType}
                            onChange={e => setActivityType(e.target.value)}
                            className="form-select w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        >
                            <option value="all">All Activities</option>
                            <option value="login">Login/Logout</option>
                            <option value="review">Reviews</option>
                            <option value="feedback">Feedback</option>
                            <option value="report">Reports</option>
                        </select>
                    </div>

                    {/* Export Format Selection */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Export Format</label>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={() => setExportFormat('csv')}
                                className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center text-sm transition-colors ${exportFormat === 'csv'
                                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <MdTableChart className="mr-1" size={18} />
                                CSV
                            </button>
                            <button
                                type="button"
                                onClick={() => setExportFormat('pdf')}
                                className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center text-sm transition-colors ${exportFormat === 'pdf'
                                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <MdPictureAsPdf className="mr-1" size={18} />
                                PDF
                            </button>
                            <button
                                type="button"
                                onClick={() => setExportFormat('excel')}
                                className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center text-sm transition-colors ${exportFormat === 'excel'
                                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <MdInsertDriveFile className="mr-1" size={18} />
                                Excel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Preview ({filteredActivities.length} activities)</h3>
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredActivities.length > 0 ? (
                                    filteredActivities.map(activity => (
                                        <tr key={activity.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activity.type === 'login' ? 'bg-green-100 text-green-800' :
                                                    activity.type === 'review' ? 'bg-blue-100 text-blue-800' :
                                                        activity.type === 'feedback' ? 'bg-purple-100 text-purple-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {activity.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{activity.action}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(activity.timestamp).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.details}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No activities found matching your criteria
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Export Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleExport}
                    disabled={isExporting || filteredActivities.length === 0}
                    className={`
                        flex items-center px-4 py-2 rounded-md text-white font-medium transition-all
                        ${isExporting || filteredActivities.length === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                        }
                    `}
                >
                    {isExporting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Exporting...
                        </>
                    ) : (
                        <>
                            <MdFileDownload className="mr-1" size={20} />
                            Export as {exportFormat.toUpperCase()}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ExportActivity;
