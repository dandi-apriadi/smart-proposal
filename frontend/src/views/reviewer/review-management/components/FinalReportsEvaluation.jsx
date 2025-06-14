import React, { useState, useEffect } from 'react';
import {
    MdSearch, MdFilterList, MdStarRate, MdStarOutline,
    MdCheckCircle, MdCancel, MdAccessTime, MdFileDownload,
    MdArrowBack, MdSave, MdSend, MdAttachFile, MdDelete,
    MdPerson, MdDateRange, MdInfo
} from 'react-icons/md';

const FinalReportsEvaluation = () => {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isDetailView, setIsDetailView] = useState(false);
    const [evaluation, setEvaluation] = useState({
        scientificValue: 0,
        methodology: 0,
        results: 0,
        conclusion: 0,
        overallQuality: 0,
        comments: '',
        decision: '',
    });

    // Fetch data effect (using dummy data for now)
    useEffect(() => {
        // This would be replaced with actual API call
        const dummyReports = [
            {
                id: 1,
                title: "Pengembangan Sistem Deteksi Anomali pada Jaringan IoT",
                author: "Dr. Budi Santoso",
                department: "Teknik Informatika",
                submissionDate: "2025-05-10",
                deadline: "2025-05-20",
                status: "pending",
                abstract: "Penelitian ini mengembangkan sistem deteksi anomali untuk jaringan IoT menggunakan algoritma machine learning...",
                attachments: [
                    { name: "Laporan_Akhir.pdf", size: "3.2 MB" },
                    { name: "Data_Pendukung.xlsx", size: "1.7 MB" }
                ]
            },
            {
                id: 2,
                title: "Implementasi Blockchain untuk Sistem Manajemen Rantai Pasok",
                author: "Dr. Siti Rahayu",
                department: "Teknik Elektro",
                submissionDate: "2025-05-08",
                deadline: "2025-05-18",
                status: "in_progress",
                abstract: "Penelitian ini mengimplementasikan teknologi blockchain untuk meningkatkan keamanan dan transparansi sistem...",
                attachments: [
                    { name: "Final_Report.pdf", size: "4.5 MB" },
                    { name: "Presentasi.pptx", size: "2.3 MB" }
                ]
            },
            {
                id: 3,
                title: "Analisis Dampak Pembelajaran Jarak Jauh terhadap Mahasiswa Teknik",
                author: "Prof. Ahmad Wijaya",
                department: "Teknik Sipil",
                submissionDate: "2025-05-05",
                deadline: "2025-05-15",
                status: "completed",
                abstract: "Penelitian ini menganalisis dampak pembelajaran jarak jauh selama pandemi terhadap performa akademik...",
                attachments: [
                    { name: "Laporan_Final.pdf", size: "5.1 MB" },
                    { name: "Survey_Data.xlsx", size: "2.8 MB" }
                ]
            },
            {
                id: 4,
                title: "Optimasi Algoritma Deep Learning untuk Pengenalan Pola pada Data Medis",
                author: "Dr. Diana Putri",
                department: "Teknik Informatika",
                submissionDate: "2025-05-07",
                deadline: "2025-05-17",
                status: "pending",
                abstract: "Penelitian ini mengoptimasi algoritma deep learning untuk meningkatkan akurasi pengenalan pola pada data medis...",
                attachments: [
                    { name: "Final_Report.pdf", size: "6.3 MB" },
                    { name: "Medical_Data.csv", size: "3.4 MB" }
                ]
            },
        ];

        setReports(dummyReports);
        setFilteredReports(dummyReports);
    }, []);

    // Filter reports based on search and status
    useEffect(() => {
        let filtered = reports;

        if (searchQuery) {
            filtered = filtered.filter(
                report => report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    report.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterStatus !== 'all') {
            filtered = filtered.filter(report => report.status === filterStatus);
        }

        setFilteredReports(filtered);
    }, [searchQuery, filterStatus, reports]);

    const handleReportSelect = (report) => {
        setSelectedReport(report);
        setIsDetailView(true);
        // Reset evaluation form
        setEvaluation({
            scientificValue: 0,
            methodology: 0,
            results: 0,
            conclusion: 0,
            overallQuality: 0,
            comments: '',
            decision: '',
        });
    };

    const handleRatingChange = (category, value) => {
        setEvaluation(prev => ({
            ...prev,
            [category]: value
        }));
    };

    const handleCommentChange = (e) => {
        setEvaluation(prev => ({
            ...prev,
            comments: e.target.value
        }));
    };

    const handleDecisionChange = (decision) => {
        setEvaluation(prev => ({
            ...prev,
            decision
        }));
    };

    const handleSubmitEvaluation = () => {
        // This would submit the evaluation to the backend
        console.log("Submitting evaluation:", evaluation);

        // Update the report status in our local state
        const updatedReports = reports.map(report => {
            if (report.id === selectedReport.id) {
                return { ...report, status: 'completed' };
            }
            return report;
        });

        setReports(updatedReports);
        setFilteredReports(updatedReports);
        setIsDetailView(false);
        setSelectedReport(null);

        // Show success message (would be handled by a proper notification system)
        alert("Evaluation submitted successfully!");
    };

    const renderStarRating = (category, currentRating) => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => handleRatingChange(category, star)}
                        className="focus:outline-none"
                    >
                        {star <= currentRating ? (
                            <MdStarRate className="text-yellow-500 text-2xl" />
                        ) : (
                            <MdStarOutline className="text-gray-400 text-2xl" />
                        )}
                    </button>
                ))}
            </div>
        );
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center"><MdAccessTime className="mr-1" /> Pending</span>;
            case 'in_progress':
                return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center"><MdInfo className="mr-1" /> In Progress</span>;
            case 'completed':
                return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center"><MdCheckCircle className="mr-1" /> Completed</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center">Unknown</span>;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4">
            {!isDetailView ? (
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Final Reports Evaluation</h1>
                        <p className="text-gray-600 mb-6">Review and evaluate final reports submitted by researchers.</p>

                        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    placeholder="Search by title or author..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <MdSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
                            </div>

                            <div className="flex items-center gap-2">
                                <MdFilterList className="text-gray-500 text-xl" />
                                <select
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        {filteredReports.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No reports found matching your criteria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredReports.map((report) => (
                                    <div
                                        key={report.id}
                                        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
                                        onClick={() => handleReportSelect(report)}
                                    >
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{report.title}</h3>
                                                {getStatusBadge(report.status)}
                                            </div>

                                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                                <MdPerson className="mr-1" />
                                                <span>{report.author}</span>
                                            </div>

                                            <div className="flex items-center text-sm text-gray-600 mb-3">
                                                <MdDateRange className="mr-1" />
                                                <span>Submitted: {report.submissionDate}</span>
                                            </div>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{report.abstract}</p>

                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-xs text-red-600">Deadline: {report.deadline}</span>
                                                <button className="text-blue-600 text-sm hover:underline">
                                                    Review Report
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <button
                        onClick={() => setIsDetailView(false)}
                        className="flex items-center text-blue-600 mb-6 hover:underline"
                    >
                        <MdArrowBack className="mr-1" /> Back to Reports List
                    </button>

                    <div className="border-b border-gray-200 pb-6 mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">{selectedReport.title}</h2>
                            {getStatusBadge(selectedReport.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-gray-500">Author</p>
                                <p className="text-gray-700">{selectedReport.author}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Department</p>
                                <p className="text-gray-700">{selectedReport.department}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Submission Date</p>
                                <p className="text-gray-700">{selectedReport.submissionDate}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Review Deadline</p>
                                <p className="text-red-600 font-medium">{selectedReport.deadline}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-2">Abstract</p>
                            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedReport.abstract}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-2">Attachments</p>
                            <div className="space-y-2">
                                {selectedReport.attachments.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center">
                                            <MdAttachFile className="text-gray-500 mr-2" />
                                            <span className="text-gray-700">{file.name}</span>
                                            <span className="text-gray-500 text-xs ml-2">({file.size})</span>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800 flex items-center">
                                            <MdFileDownload className="mr-1" /> Download
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Evaluation Form</h3>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <p className="font-medium text-gray-700">Scientific Value</p>
                                    {renderStarRating('scientificValue', evaluation.scientificValue)}
                                </div>

                                <div className="space-y-2">
                                    <p className="font-medium text-gray-700">Methodology</p>
                                    {renderStarRating('methodology', evaluation.methodology)}
                                </div>

                                <div className="space-y-2">
                                    <p className="font-medium text-gray-700">Results & Analysis</p>
                                    {renderStarRating('results', evaluation.results)}
                                </div>

                                <div className="space-y-2">
                                    <p className="font-medium text-gray-700">Conclusion & Recommendations</p>
                                    {renderStarRating('conclusion', evaluation.conclusion)}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <p className="font-medium text-gray-700">Overall Quality</p>
                                    {renderStarRating('overallQuality', evaluation.overallQuality)}
                                </div>
                            </div>

                            <div>
                                <p className="font-medium text-gray-700 mb-2">Comments & Feedback</p>
                                <textarea
                                    rows={5}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Provide detailed feedback about the report..."
                                    value={evaluation.comments}
                                    onChange={handleCommentChange}
                                ></textarea>
                            </div>

                            <div>
                                <p className="font-medium text-gray-700 mb-3">Final Decision</p>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        className={`px-4 py-2 rounded-lg flex items-center ${evaluation.decision === 'approve'
                                                ? 'bg-green-100 text-green-800 border-2 border-green-500'
                                                : 'bg-gray-100 text-gray-800 hover:bg-green-50 hover:text-green-700'
                                            }`}
                                        onClick={() => handleDecisionChange('approve')}
                                    >
                                        <MdCheckCircle className="mr-2" /> Approve
                                    </button>

                                    <button
                                        className={`px-4 py-2 rounded-lg flex items-center ${evaluation.decision === 'revise'
                                                ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-500'
                                                : 'bg-gray-100 text-gray-800 hover:bg-yellow-50 hover:text-yellow-700'
                                            }`}
                                        onClick={() => handleDecisionChange('revise')}
                                    >
                                        <MdAccessTime className="mr-2" /> Needs Revision
                                    </button>

                                    <button
                                        className={`px-4 py-2 rounded-lg flex items-center ${evaluation.decision === 'reject'
                                                ? 'bg-red-100 text-red-800 border-2 border-red-500'
                                                : 'bg-gray-100 text-gray-800 hover:bg-red-50 hover:text-red-700'
                                            }`}
                                        onClick={() => handleDecisionChange('reject')}
                                    >
                                        <MdCancel className="mr-2" /> Reject
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
                                    onClick={() => setIsDetailView(false)}
                                >
                                    <MdCancel className="mr-2" /> Cancel
                                </button>

                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                    onClick={handleSubmitEvaluation}
                                    disabled={!evaluation.decision || evaluation.overallQuality === 0}
                                >
                                    <MdSend className="mr-2" /> Submit Evaluation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinalReportsEvaluation;
