import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    MdDescription,
    MdAttachFile,
    MdHistory,
    MdDownload,
    MdAdd,
    MdEdit,
    MdDelete,
    MdVisibility,
    MdBarChart,
    MdCheckCircle,
    MdAccessTime,
    MdWarning
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProgressReporting = () => {
    const [activeTab, setActiveTab] = useState('templates');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const { baseURL } = useSelector((state) => state.auth);

    // Dummy data for demonstration
    const templates = [
        { id: 1, title: 'Progress Report - Month 1', deadline: '2025-05-15', status: 'Completed' },
        { id: 2, title: 'Progress Report - Month 2', deadline: '2025-06-15', status: 'In Progress' },
        { id: 3, title: 'Progress Report - Month 3', deadline: '2025-07-15', status: 'Upcoming' },
        { id: 4, title: 'Progress Report - Final', deadline: '2025-08-15', status: 'Upcoming' },
    ];

    const progressData = [
        { month: 'May', completion: 100 },
        { month: 'June', completion: 65 },
        { month: 'July', completion: 0 },
        { month: 'August', completion: 0 },
    ];

    const attachments = [
        { id: 1, name: 'Data Collection Results.pdf', size: '2.4 MB', date: '2025-05-10', reportId: 1 },
        { id: 2, name: 'Analysis Method.docx', size: '1.8 MB', date: '2025-05-10', reportId: 1 },
        { id: 3, name: 'Initial Findings.pdf', size: '3.2 MB', date: '2025-06-08', reportId: 2 },
        { id: 4, name: 'Research Progress Images.zip', size: '15.6 MB', date: '2025-06-10', reportId: 2 },
    ];

    const reviewHistory = [
        { id: 1, reportId: 1, reviewer: 'Dr. Surya Wijaya', date: '2025-05-18', status: 'Approved', comments: 'Excellent progress. Continue with the planned methodology.' },
        { id: 2, reportId: 2, reviewer: 'Dr. Surya Wijaya', date: '2025-06-20', status: 'Revision Needed', comments: 'Good progress, but please elaborate more on the data analysis section.' },
    ];

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Upcoming': return 'bg-gray-100 text-gray-800';
            case 'Revision Needed': return 'bg-yellow-100 text-yellow-800';
            case 'Approved': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed': return <MdCheckCircle className="inline mr-1" />;
            case 'In Progress': return <MdAccessTime className="inline mr-1" />;
            case 'Upcoming': return <MdAccessTime className="inline mr-1" />;
            case 'Revision Needed': return <MdWarning className="inline mr-1" />;
            case 'Approved': return <MdCheckCircle className="inline mr-1" />;
            default: return <MdAccessTime className="inline mr-1" />;
        }
    };

    return (
        <div className="mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Progress Reporting</h1>
                <div className="flex space-x-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-300">
                        <MdAdd className="mr-2" /> New Report
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <nav className="flex flex-wrap -mb-px">
                    <button
                        onClick={() => setActiveTab('templates')}
                        className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'templates'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <MdDescription className="mr-2 text-xl" /> Report Templates
                    </button>
                    <button
                        onClick={() => setActiveTab('progress')}
                        className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'progress'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <MdBarChart className="mr-2 text-xl" /> Progress Visualization
                    </button>
                    <button
                        onClick={() => setActiveTab('attachments')}
                        className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'attachments'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <MdAttachFile className="mr-2 text-xl" /> Attachments
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'history'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <MdHistory className="mr-2 text-xl" /> Review History
                    </button>
                </nav>
            </div>

            {/* Content based on active tab */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                {activeTab === 'templates' && (
                    <div data-aos="fade-up">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Progress Report Templates</h2>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search templates..."
                                    className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {templates.map((template) => (
                                        <tr key={template.id} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{template.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{template.deadline}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(template.status)}`}>
                                                    {getStatusIcon(template.status)} {template.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-800">
                                                        <MdVisibility className="text-xl" title="View" />
                                                    </button>
                                                    <button className="text-green-600 hover:text-green-800">
                                                        <MdEdit className="text-xl" title="Edit" />
                                                    </button>
                                                    <button className="text-blue-600 hover:text-blue-800">
                                                        <MdDownload className="text-xl" title="Download" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'progress' && (
                    <div data-aos="fade-up">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Progress Visualization</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Overall Completion</h3>
                                <div className="h-8 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                                        style={{ width: `${(165 / 400) * 100}%` }}
                                    >
                                        41%
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h4 className="text-md font-medium text-gray-700 mb-2">Monthly Progress</h4>
                                    <div className="space-y-4">
                                        {progressData.map((item, index) => (
                                            <div key={index} className="space-y-1">
                                                <div className="flex justify-between text-sm">
                                                    <span className="font-medium">{item.month}</span>
                                                    <span>{item.completion}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-600 rounded-full"
                                                        style={{ width: `${item.completion}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Upcoming Deadlines</h3>
                                <div className="space-y-4">
                                    {templates.filter(t => t.status !== 'Completed').map((template) => (
                                        <div key={template.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${template.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {template.status === 'In Progress' ?
                                                    <MdAccessTime className="text-xl" /> :
                                                    <MdDescription className="text-xl" />
                                                }
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium">{template.title}</h4>
                                                <div className="text-sm text-gray-500">Due: {template.deadline}</div>
                                            </div>
                                            <div>
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(template.status)}`}>
                                                    {template.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'attachments' && (
                    <div data-aos="fade-up">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Attachment Management</h2>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-300">
                                <MdAdd className="mr-2" /> Upload New File
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {attachments.map((file) => (
                                <div key={file.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg mr-4">
                                            <MdAttachFile className="text-2xl" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 mb-1">{file.name}</h3>
                                            <div className="text-sm text-gray-500 mb-1">Size: {file.size}</div>
                                            <div className="text-sm text-gray-500 mb-2">Uploaded: {file.date}</div>
                                            <div className="text-sm text-gray-500">
                                                Report: {templates.find(t => t.id === file.reportId)?.title}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button className="text-gray-500 hover:text-gray-700">
                                            <MdVisibility className="text-xl" title="View" />
                                        </button>
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <MdDownload className="text-xl" title="Download" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800">
                                            <MdDelete className="text-xl" title="Delete" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div data-aos="fade-up">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Review History</h2>

                        <div className="space-y-6">
                            {reviewHistory.map((review) => {
                                const report = templates.find(t => t.id === review.reportId);
                                return (
                                    <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex flex-wrap justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-medium text-lg text-gray-900">
                                                    {report?.title}
                                                </h3>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    Reviewed by: {review.reviewer} on {review.date}
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(review.status)}`}>
                                                {getStatusIcon(review.status)} {review.status}
                                            </span>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="font-medium text-gray-800 mb-2">Review Comments:</h4>
                                            <p className="text-gray-700">{review.comments}</p>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                                                View Full Report <MdVisibility className="ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProgressReporting;
