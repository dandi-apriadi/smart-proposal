import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    MdCheckCircle,
    MdPending,
    MdWarning,
    MdCancel,
    MdHourglassEmpty,
    MdFileDownload,
    MdHistory,
    MdFeedback,
    MdEditDocument,
    MdTimeline,
    MdArrowDropDown,
    MdArrowDropUp,
    MdRefresh
} from 'react-icons/md';

const SubmissionStatus = ({ reportId }) => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [historyExpanded, setHistoryExpanded] = useState(false);
    const [feedbackExpanded, setFeedbackExpanded] = useState(false);
    const [activeSession, setActiveSession] = useState(null);

    // Dummy data for initial design
    useEffect(() => {
        // In a real implementation, this would fetch data from the API
        const dummyReport = {
            id: reportId || "FR2025042301",
            title: "Perancangan Sistem Validasi Format Proposal Berbasis ML",
            status: "under_review", // submitted, under_review, revision_needed, accepted, rejected
            submissionDate: "2025-08-10T14:30:00Z",
            lastUpdated: "2025-08-12T09:15:00Z",
            deadline: "2025-10-15T23:59:59Z",
            reviewer: "Dr. Sutanto Priyo",
            feedback: [
                {
                    id: 1,
                    date: "2025-08-12T09:15:00Z",
                    reviewer: "Dr. Sutanto Priyo",
                    content: "Laporan sudah baik secara konten, namun ada beberapa bagian metodologi yang perlu diperjelas. Silakan revisi sesuai komentar yang tertera pada dokumen.",
                    status: "revision_needed"
                }
            ],
            history: [
                {
                    id: 1,
                    date: "2025-08-10T14:30:00Z",
                    action: "submitted",
                    user: "Prof. Bambang Supriadi",
                    notes: "Initial submission of final report"
                },
                {
                    id: 2,
                    date: "2025-08-11T10:00:00Z",
                    action: "assigned",
                    user: "System",
                    notes: "Report assigned to Dr. Sutanto Priyo for review"
                },
                {
                    id: 3,
                    date: "2025-08-12T09:15:00Z",
                    action: "reviewed",
                    user: "Dr. Sutanto Priyo",
                    notes: "Review completed. Revision requested."
                }
            ],
            documents: [
                {
                    id: 1,
                    name: "Laporan_Akhir_FR2025042301.pdf",
                    uploadDate: "2025-08-10T14:30:00Z",
                    size: "2.4 MB",
                    type: "main_report"
                },
                {
                    id: 2,
                    name: "Lampiran_Data_Penelitian.xlsx",
                    uploadDate: "2025-08-10T14:30:00Z",
                    size: "1.1 MB",
                    type: "attachment"
                }
            ]
        };

        const dummySession = {
            id: "2025-1",
            name: "Session 2025-1",
            status: "active",
            finalReportDeadline: "2025-10-15T23:59:59Z"
        };

        setTimeout(() => {
            setReport(dummyReport);
            setActiveSession(dummySession);
            setLoading(false);
        }, 1000);
    }, [reportId]);

    // Status color and icon mapping
    const statusConfig = {
        submitted: {
            color: "bg-blue-100 text-blue-800",
            icon: <MdPending className="w-5 h-5 text-blue-500" />,
            text: "Submitted"
        },
        under_review: {
            color: "bg-yellow-100 text-yellow-800",
            icon: <MdHourglassEmpty className="w-5 h-5 text-yellow-500" />,
            text: "Under Review"
        },
        revision_needed: {
            color: "bg-orange-100 text-orange-800",
            icon: <MdWarning className="w-5 h-5 text-orange-500" />,
            text: "Revision Needed"
        },
        accepted: {
            color: "bg-green-100 text-green-800",
            icon: <MdCheckCircle className="w-5 h-5 text-green-500" />,
            text: "Accepted"
        },
        rejected: {
            color: "bg-red-100 text-red-800",
            icon: <MdCancel className="w-5 h-5 text-red-500" />,
            text: "Rejected"
        }
    };

    // Format date helper
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // Calculate days remaining
    const calculateTimeRemaining = (deadlineString) => {
        const now = new Date();
        const deadline = new Date(deadlineString);
        const diffTime = deadline - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <MdWarning className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No Report Found</h2>
                <p className="text-gray-600 mb-4">No final report submission found for this session.</p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Create New Report
                </button>
            </div>
        );
    }

    const daysRemaining = calculateTimeRemaining(report.deadline);
    const isLate = daysRemaining < 0;

    return (
        <div className="space-y-6">
            {/* Status Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{report.title}</h1>
                        <p className="text-gray-600 mt-1">ID: {report.id}</p>
                    </div>
                    <div className={`${statusConfig[report.status].color} px-4 py-2 rounded-full flex items-center mt-4 md:mt-0`}>
                        {statusConfig[report.status].icon}
                        <span className="ml-2 font-medium">{statusConfig[report.status].text}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Submission Date</p>
                        <p className="font-medium">{formatDate(report.submissionDate)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                        <p className="font-medium">{formatDate(report.lastUpdated)}</p>
                    </div>
                    <div className={`p-4 rounded-lg ${isLate ? 'bg-red-50' : 'bg-blue-50'}`}>
                        <p className="text-sm text-gray-500 mb-1">Deadline</p>
                        <p className="font-medium">{formatDate(report.deadline)}</p>
                        <p className={`text-sm mt-1 ${isLate ? 'text-red-600 font-semibold' : 'text-blue-600'}`}>
                            {isLate
                                ? `Overdue by ${Math.abs(daysRemaining)} days`
                                : `${daysRemaining} days remaining`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <MdTimeline className="w-5 h-5 text-blue-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">Submission Timeline</h2>
                </div>

                <div className="relative">
                    <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

                    {report.history.map((item, index) => (
                        <div key={item.id} className="relative pl-10 pb-8">
                            <div className="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 z-10">
                                {item.action === 'submitted' && <MdEditDocument className="w-4 h-4 text-blue-600" />}
                                {item.action === 'assigned' && <MdPending className="w-4 h-4 text-yellow-600" />}
                                {item.action === 'reviewed' && <MdFeedback className="w-4 h-4 text-purple-600" />}
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 capitalize">
                                            {item.action.replace('_', ' ')}
                                        </h3>
                                        <p className="text-sm text-gray-500">{item.user}</p>
                                    </div>
                                    <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
                                </div>
                                <p className="mt-2 text-gray-600">{item.notes}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Feedback Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setFeedbackExpanded(!feedbackExpanded)}
                >
                    <div className="flex items-center">
                        <MdFeedback className="w-5 h-5 text-blue-500 mr-2" />
                        <h2 className="text-xl font-semibold text-gray-800">Reviewer Feedback</h2>
                    </div>
                    {feedbackExpanded ?
                        <MdArrowDropUp className="w-6 h-6 text-gray-500" /> :
                        <MdArrowDropDown className="w-6 h-6 text-gray-500" />
                    }
                </div>

                {feedbackExpanded && (
                    <div className="mt-4">
                        {report.feedback.length > 0 ? (
                            report.feedback.map(item => (
                                <div key={item.id} className="bg-gray-50 p-4 rounded-lg mt-3 border-l-4 border-yellow-400">
                                    <div className="flex justify-between items-start">
                                        <p className="font-medium text-gray-800">{item.reviewer}</p>
                                        <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
                                    </div>
                                    <p className="mt-2 text-gray-600">{item.content}</p>
                                    <div className="mt-3">
                                        <span className={`${statusConfig[item.status].color} px-3 py-1 rounded-full text-xs`}>
                                            {statusConfig[item.status].text}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 italic mt-3">No feedback has been provided yet.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <MdFileDownload className="w-5 h-5 text-blue-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">Submitted Documents</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {report.documents.map(doc => (
                        <div key={doc.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium text-gray-800">{doc.name}</p>
                                <p className="text-xs text-gray-500">
                                    {doc.size} • Uploaded {formatDate(doc.uploadDate)}
                                </p>
                            </div>
                            <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
                                <MdFileDownload className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
                {(report.status === 'revision_needed') && (
                    <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium">
                        Submit Revision
                    </button>
                )}
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium flex items-center justify-center">
                    <MdRefresh className="w-5 h-5 mr-2" />
                    Refresh Status
                </button>
            </div>
        </div>
    );
};

export default SubmissionStatus;
