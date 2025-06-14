import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    MdOutlineAssignment,
    MdUploadFile,
    MdSave,
    MdSend,
    MdCheck,
    MdClose,
    MdAttachFile,
    MdFeedback,
    MdAccessTime,
    MdRefresh,
    MdInfo,
    MdEdit,
    MdCloudUpload,
    MdDelete,
    MdDownload,
    MdWarning,
    MdOutlineCalendarToday
} from 'react-icons/md';
import { Editor } from '@tinymce/tinymce-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FinalReporting = () => {
    const { user } = useSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState('overview');
    const [activeSectionTab, setActiveSectionTab] = useState('abstract');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    // Dummy data
    const [reportData, setReportData] = useState({
        title: 'Perancangan Sistem Validasi Format Proposal Pengadaan Kegiatan Berbasis Machine Learning',
        abstract: 'Perancangan Sistem Validasi Format Proposal Pengadaan Kegiatan Berbasis Machine Learning dengan Algoritma Random Forest...',
        introduction: 'Penelitian ini bertujuan untuk mengembangkan sistem validasi otomatis...',
        methodology: 'Metodologi yang digunakan dalam penelitian ini meliputi pengumpulan data, preprocessing...',
        results: 'Hasil penelitian menunjukkan bahwa sistem yang dikembangkan mampu...',
        discussion: 'Berdasarkan hasil yang diperoleh, dapat dianalisis bahwa...',
        conclusion: 'Sistem validasi format proposal berbasis machine learning berhasil dikembangkan dan...',
        references: 'Smith, J. (2023). Machine Learning Applications in Document Validation...'
    });

    const [files, setFiles] = useState([
        { id: 1, name: 'final_report.pdf', size: '2.4 MB', type: 'application/pdf', uploadDate: '2025-05-08' },
        { id: 2, name: 'supporting_data.xlsx', size: '1.8 MB', type: 'application/excel', uploadDate: '2025-05-07' },
        { id: 3, name: 'presentation.pptx', size: '5.1 MB', type: 'application/powerpoint', uploadDate: '2025-05-06' }
    ]);

    const [submissionStatus, setSubmissionStatus] = useState({
        status: 'in_review', // draft, submitted, in_review, revision_required, approved, rejected
        timeline: [
            { id: 1, step: 'Draft Created', date: '2025-05-02', status: 'completed' },
            { id: 2, step: 'Submitted', date: '2025-05-08', status: 'completed' },
            { id: 3, step: 'Under Review', date: '2025-05-09', status: 'current' },
            { id: 4, step: 'Feedback', date: null, status: 'pending' },
            { id: 5, step: 'Final Approval', date: null, status: 'pending' }
        ],
        deadline: '2025-05-20'
    });

    const [feedbacks, setFeedbacks] = useState([
        {
            id: 1,
            reviewer: 'Dr. Ahmad Wijaya',
            section: 'methodology',
            message: 'Metodologi perlu diperjelas terkait proses pengolahan data yang digunakan untuk pelatihan model Random Forest.',
            date: '2025-05-05',
            status: 'unresolved',
            response: ''
        },
        {
            id: 2,
            reviewer: 'Prof. Siti Rahayu',
            section: 'results',
            message: 'Hasil pengujian perlu dilengkapi dengan metrik evaluasi model yang lebih komprehensif.',
            date: '2025-05-04',
            status: 'resolved',
            response: 'Sudah ditambahkan metrik precision, recall, dan F1-score pada hasil pengujian.'
        }
    ]);

    useEffect(() => {
        AOS.init({ duration: 800 });
        // Fetch report data, files, submission status, and feedbacks
    }, []);

    const handleChangeReportData = (section, content) => {
        setReportData({
            ...reportData,
            [section]: content
        });
        handleAutoSave();
    };

    const handleFileUpload = (e) => {
        const newFiles = Array.from(e.target.files).map((file, index) => ({
            id: files.length + index + 1,
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            type: file.type,
            uploadDate: new Date().toISOString().split('T')[0]
        }));

        setFiles([...files, ...newFiles]);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(null), 2000);
    };

    const handleDeleteFile = (id) => {
        setFiles(files.filter(file => file.id !== id));
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(null), 2000);
    };

    const handleAutoSave = () => {
        // Simulate auto-save
        setSaveStatus('saving');
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus(null), 2000);
        }, 1000);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            // Update submission status
            const newTimeline = submissionStatus.timeline.map(item => {
                if (item.id === 2) {
                    return { ...item, status: 'completed', date: new Date().toISOString().split('T')[0] };
                }
                if (item.id === 3) {
                    return { ...item, status: 'current' };
                }
                return item;
            });

            setSubmissionStatus({
                ...submissionStatus,
                status: 'submitted',
                timeline: newTimeline
            });
        }, 2000);
    };

    const handleFeedbackResponse = (id, response) => {
        setFeedbacks(feedbacks.map(feedback => {
            if (feedback.id === id) {
                return {
                    ...feedback,
                    response,
                    status: response ? 'resolved' : 'unresolved'
                };
            }
            return feedback;
        }));
        handleAutoSave();
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div
                className="bg-gradient-to-br from-blue-800 via-indigo-700 to-purple-800 text-white py-8 px-4 sm:px-6 lg:px-8 shadow-lg relative overflow-hidden"
                data-aos="fade-down"
                data-aos-duration="600"
            >
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-white opacity-5 transform -skew-x-12"></div>

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
                    <div className="flex items-center mb-4 md:mb-0 transform transition hover:scale-102 duration-300">
                        <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-4">
                            <MdOutlineAssignment className="text-4xl text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Laporan Akhir</h1>
                            <p className="text-blue-100 mt-1 font-light text-sm">
                                {reportData.title.length > 60 ? reportData.title.substring(0, 60) + '...' : reportData.title}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <div className="flex items-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl px-4 py-2 shadow-inner">
                            <MdOutlineCalendarToday className="mr-2 text-blue-200" />
                            <span className="text-sm font-medium">Deadline: {submissionStatus.deadline}</span>
                        </div>
                        <div className={`flex items-center rounded-xl px-4 py-2 shadow-inner ${submissionStatus.status === 'draft' ? 'bg-gray-600 bg-opacity-30' :
                            submissionStatus.status === 'submitted' ? 'bg-yellow-500 bg-opacity-30' :
                                submissionStatus.status === 'in_review' ? 'bg-blue-500 bg-opacity-30' :
                                    submissionStatus.status === 'revision_required' ? 'bg-orange-500 bg-opacity-30' :
                                        submissionStatus.status === 'approved' ? 'bg-green-500 bg-opacity-30' :
                                            'bg-red-500 bg-opacity-30'
                            }`}>
                            <div className={`w-2 h-2 mr-2 rounded-full animate-pulse ${submissionStatus.status === 'draft' ? 'bg-gray-400' :
                                submissionStatus.status === 'submitted' ? 'bg-yellow-300' :
                                    submissionStatus.status === 'in_review' ? 'bg-blue-300' :
                                        submissionStatus.status === 'revision_required' ? 'bg-orange-300' :
                                            submissionStatus.status === 'approved' ? 'bg-green-300' :
                                                'bg-red-300'
                                }`}></div>
                            <span className="capitalize text-sm font-medium">
                                {submissionStatus.status.replace('_', ' ')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div
                    className="flex flex-wrap mb-8 border-b border-gray-200"
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                    <button
                        className={`mr-6 py-3 px-1 font-medium text-sm transition-all duration-200 border-b-2 ${activeTab === 'overview'
                            ? 'border-blue-600 text-blue-600 font-semibold'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`mr-6 py-3 px-1 font-medium text-sm transition-all duration-200 border-b-2 ${activeTab === 'report'
                            ? 'border-blue-600 text-blue-600 font-semibold'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setActiveTab('report')}
                    >
                        Report Builder
                    </button>
                    <button
                        className={`mr-6 py-3 px-1 font-medium text-sm transition-all duration-200 border-b-2 ${activeTab === 'documents'
                            ? 'border-blue-600 text-blue-600 font-semibold'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setActiveTab('documents')}
                    >
                        Supporting Documents
                    </button>
                    <button
                        className={`mr-6 py-3 px-1 font-medium text-sm transition-all duration-200 border-b-2 ${activeTab === 'feedback'
                            ? 'border-blue-600 text-blue-600 font-semibold'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setActiveTab('feedback')}
                    >
                        Feedback
                        {feedbacks.filter(f => f.status === 'unresolved').length > 0 && (
                            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full shadow-sm">
                                {feedbacks.filter(f => f.status === 'unresolved').length}
                            </span>
                        )}
                    </button>
                </div>

                {/* Status Bar */}
                {saveStatus && (
                    <div
                        className={`fixed bottom-4 right-4 flex items-center rounded-xl px-4 py-3 text-white ${saveStatus === 'saving' ? 'bg-yellow-500' : 'bg-green-500'
                            } shadow-xl backdrop-filter backdrop-blur-sm bg-opacity-90 transition-all duration-300 transform translate-y-0 z-50`}
                        data-aos="fade-left"
                    >
                        {saveStatus === 'saving' ? (
                            <>
                                <MdRefresh className="animate-spin mr-2 text-lg" />
                                <span className="font-medium">Saving...</span>
                            </>
                        ) : (
                            <>
                                <MdCheck className="mr-2 text-lg" />
                                <span className="font-medium">Changes saved</span>
                            </>
                        )}
                    </div>
                )}

                {/* Tab Content */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Laporan Akhir Overview</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <h3 className="text-sm font-medium text-blue-800 mb-2">Report Status</h3>
                                    <p className="text-2xl font-bold capitalize text-blue-900">
                                        {submissionStatus.status.replace('_', ' ')}
                                    </p>
                                </div>

                                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                                    <h3 className="text-sm font-medium text-indigo-800 mb-2">Supporting Documents</h3>
                                    <p className="text-2xl font-bold text-indigo-900">{files.length}</p>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                    <h3 className="text-sm font-medium text-purple-800 mb-2">Feedback Items</h3>
                                    <p className="text-2xl font-bold text-purple-900">
                                        {feedbacks.length}
                                        <span className="text-sm ml-2 font-normal">
                                            ({feedbacks.filter(f => f.status === 'unresolved').length} unresolved)
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-lg font-medium mb-6">Submission Timeline</h3>

                            {/* Modern Timeline */}
                            <div className="relative px-4 py-2">
                                {/* Timeline connector */}
                                <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200 rounded-full"></div>

                                {submissionStatus.timeline.map((step, index) => (
                                    <div
                                        key={step.id}
                                        className="mb-8 relative flex flex-col sm:flex-row sm:items-center"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                    >
                                        {/* Step indicator */}
                                        <div className={`
                                            absolute left-0 flex items-center justify-center -ml-4 z-10
                                            w-8 h-8 rounded-full shadow-md transition-all duration-300
                                            ${step.status === 'completed'
                                                ? 'bg-gradient-to-r from-green-400 to-green-500 animate-pulse-slow'
                                                : step.status === 'current'
                                                    ? 'bg-gradient-to-r from-blue-400 to-blue-500 animate-pulse'
                                                    : 'bg-gradient-to-r from-gray-300 to-gray-400'
                                            }
                                        `}>
                                            {step.status === 'completed' ? (
                                                <MdCheck className="text-white text-sm" />
                                            ) : step.status === 'current' ? (
                                                <MdAccessTime className="text-white text-sm" />
                                            ) : (
                                                <span className="text-white text-xs">{index + 1}</span>
                                            )}
                                        </div>

                                        {/* Step content */}
                                        <div className={`
                                            ml-10 p-4 rounded-lg transition-all duration-300 w-full
                                            ${step.status === 'completed'
                                                ? 'bg-green-50 border-l-4 border-green-400'
                                                : step.status === 'current'
                                                    ? 'bg-blue-50 border-l-4 border-blue-400 shadow-md'
                                                    : 'bg-gray-50 border-l-4 border-gray-300'
                                            }
                                        `}>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className={`font-medium text-base 
                                                        ${step.status === 'completed' ? 'text-green-700' :
                                                            step.status === 'current' ? 'text-blue-700' :
                                                                'text-gray-600'}
                                                    `}>
                                                        {step.step}
                                                    </h4>

                                                    {step.date ? (
                                                        <p className="text-sm flex items-center mt-1">
                                                            <MdOutlineCalendarToday className="mr-1 text-xs" />
                                                            <span>{step.date}</span>
                                                        </p>
                                                    ) : (
                                                        <p className="text-sm text-gray-400 italic mt-1">Pending</p>
                                                    )}
                                                </div>

                                                {/* Status badges */}
                                                <div>
                                                    {step.status === 'completed' && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            <MdCheck className="mr-1 text-xs" />
                                                            Completed
                                                        </span>
                                                    )}
                                                    {step.status === 'current' && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            <MdRefresh className="mr-1 text-xs animate-spin-slow" />
                                                            In Progress
                                                        </span>
                                                    )}
                                                    {step.status === 'pending' && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            <MdInfo className="mr-1 text-xs" />
                                                            Pending
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Timeline end indicator */}
                                <div className="absolute left-0 -bottom-2 w-1 h-8 bg-gradient-to-b from-purple-200 to-transparent rounded-full"></div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
                                    onClick={() => setActiveTab('report')}
                                >
                                    <MdEdit className="mr-2" />
                                    Edit Report
                                </button>

                                <button
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
                                    onClick={() => setActiveTab('documents')}
                                >
                                    <MdAttachFile className="mr-2" />
                                    Manage Documents
                                </button>

                                <button
                                    className={`px-4 py-2 rounded-md flex items-center transition-colors duration-200 ${submissionStatus.status === 'draft'
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        }`}
                                    disabled={submissionStatus.status !== 'draft'}
                                    onClick={handleSubmit}
                                >
                                    <MdSend className="mr-2" />
                                    Submit Final Report
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Report Builder Tab */}
                    {activeTab === 'report' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Report Builder</h2>

                            {/* Title Section */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Report Title</label>
                                <input
                                    type="text"
                                    value={reportData.title}
                                    onChange={(e) => handleChangeReportData('title', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Section Tabs */}
                            <div className="flex flex-wrap mb-4 border-b border-gray-200">
                                {['abstract', 'introduction', 'methodology', 'results', 'discussion', 'conclusion', 'references'].map((section) => (
                                    <button
                                        key={section}
                                        className={`mr-2 py-2 px-3 text-sm transition-all duration-200 border-b-2 capitalize ${activeSectionTab === section
                                            ? 'border-blue-600 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                        onClick={() => setActiveSectionTab(section)}
                                    >
                                        {section}
                                        {feedbacks.some(f => f.section === section && f.status === 'unresolved') && (
                                            <span className="ml-1 inline-flex items-center justify-center w-2 h-2 bg-red-500 rounded-full"></span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Editor */}
                            <div className="mb-6">
                                <div className="bg-gray-50 p-3 mb-3 rounded-md flex items-center">
                                    <MdInfo className="text-blue-600 mr-2" />
                                    <span className="text-sm text-gray-600">
                                        {activeSectionTab === 'abstract' && 'Provide a comprehensive summary of your research (150-250 words).'}
                                        {activeSectionTab === 'introduction' && 'State the problem, provide background information, and outline your research objectives.'}
                                        {activeSectionTab === 'methodology' && 'Describe your research design, data collection methods, and analysis techniques.'}
                                        {activeSectionTab === 'results' && 'Present your findings with supporting data, tables, or figures.'}
                                        {activeSectionTab === 'discussion' && 'Interpret your results and relate them to your research objectives.'}
                                        {activeSectionTab === 'conclusion' && 'Summarize key findings and their implications. Suggest areas for future research.'}
                                        {activeSectionTab === 'references' && 'List all sources cited in your report following the required citation style.'}
                                    </span>
                                </div>

                                {/* This is where a real rich text editor would be implemented */}
                                <textarea
                                    value={reportData[activeSectionTab]}
                                    onChange={(e) => handleChangeReportData(activeSectionTab, e.target.value)}
                                    className="w-full min-h-[300px] p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={`Enter your ${activeSectionTab} here...`}
                                />
                            </div>

                            {/* Feedback for current section */}
                            {feedbacks.filter(f => f.section === activeSectionTab).length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-md font-medium mb-3">Section Feedback</h3>
                                    {feedbacks.filter(f => f.section === activeSectionTab).map(feedback => (
                                        <div key={feedback.id} className="bg-yellow-50 p-3 rounded-md border border-yellow-100 mb-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-medium text-yellow-800">{feedback.reviewer}</span>
                                                <span className="text-xs text-gray-500">{feedback.date}</span>
                                            </div>
                                            <p className="text-sm text-gray-800 mb-3">{feedback.message}</p>

                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Your Response</label>
                                                <textarea
                                                    value={feedback.response}
                                                    onChange={(e) => handleFeedbackResponse(feedback.id, e.target.value)}
                                                    className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Respond to this feedback..."
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex justify-between mt-8">
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center transition-colors duration-200"
                                    onClick={() => setActiveTab('overview')}
                                >
                                    Back to Overview
                                </button>

                                <div className="flex space-x-4">
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
                                        onClick={handleAutoSave}
                                    >
                                        <MdSave className="mr-2" />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Supporting Documents Tab */}
                    {activeTab === 'documents' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Supporting Documents</h2>

                            <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
                                <h3 className="text-md font-medium text-blue-800 mb-2">Upload Guidelines</h3>
                                <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                                    <li>Upload your final report document (PDF format required)</li>
                                    <li>Include any additional supporting materials (data, charts, etc.)</li>
                                    <li>Maximum file size: 10MB per file</li>
                                    <li>Acceptable formats: PDF, DOCX, XLSX, PPTX, ZIP</li>
                                </ul>
                            </div>

                            {/* Upload Area */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                                <MdCloudUpload className="mx-auto text-5xl text-gray-400 mb-3" />
                                <p className="text-gray-500 mb-4">Drag and drop files here, or click to select files</p>
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    multiple
                                    onChange={handleFileUpload}
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center transition-colors duration-200 cursor-pointer"
                                >
                                    <MdUploadFile className="mr-2" />
                                    Select Files
                                </label>
                            </div>

                            {/* File List */}
                            {files.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Uploaded Files</h3>
                                    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                                        <ul className="divide-y divide-gray-200">
                                            {files.map(file => (
                                                <li key={file.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className="bg-gray-100 rounded p-2 mr-3">
                                                                <MdAttachFile className="text-gray-500" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-800">{file.name}</p>
                                                                <p className="text-xs text-gray-500">
                                                                    {file.size} • Uploaded on {file.uploadDate}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <button
                                                                className="text-blue-600 hover:text-blue-800"
                                                                title="Download"
                                                            >
                                                                <MdDownload />
                                                            </button>
                                                            <button
                                                                className="text-red-600 hover:text-red-800"
                                                                title="Delete"
                                                                onClick={() => handleDeleteFile(file.id)}
                                                            >
                                                                <MdDelete />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between mt-8">
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center transition-colors duration-200"
                                    onClick={() => setActiveTab('overview')}
                                >
                                    Back to Overview
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Feedback Tab */}
                    {activeTab === 'feedback' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Feedback Management</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-white rounded-md border border-gray-200 p-4">
                                    <div className="text-2xl font-bold text-blue-600 mb-2">{feedbacks.length}</div>
                                    <div className="text-sm text-gray-500">Total Feedback Items</div>
                                </div>
                                <div className="bg-white rounded-md border border-gray-200 p-4">
                                    <div className="text-2xl font-bold text-green-600 mb-2">
                                        {feedbacks.filter(f => f.status === 'resolved').length}
                                    </div>
                                    <div className="text-sm text-gray-500">Resolved</div>
                                </div>
                                <div className="bg-white rounded-md border border-gray-200 p-4">
                                    <div className="text-2xl font-bold text-red-600 mb-2">
                                        {feedbacks.filter(f => f.status === 'unresolved').length}
                                    </div>
                                    <div className="text-sm text-gray-500">Unresolved</div>
                                </div>
                            </div>

                            {/* Feedback List */}
                            <div className="space-y-4">
                                {feedbacks.map(feedback => (
                                    <div
                                        key={feedback.id}
                                        className={`bg-white rounded-lg border p-4 ${feedback.status === 'unresolved'
                                            ? 'border-red-200'
                                            : 'border-green-200'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center">
                                                <div className={`w-2 h-2 rounded-full mr-2 ${feedback.status === 'unresolved' ? 'bg-red-500' : 'bg-green-500'
                                                    }`}></div>
                                                <h3 className="font-medium">{feedback.reviewer}</h3>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-sm text-gray-500 mr-3">
                                                    Section: <span className="capitalize">{feedback.section}</span>
                                                </span>
                                                <span className="text-xs text-gray-400">{feedback.date}</span>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-3 rounded-md mb-3">
                                            <p className="text-gray-800">{feedback.message}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
                                            <textarea
                                                value={feedback.response}
                                                onChange={(e) => handleFeedbackResponse(feedback.id, e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Type your response here..."
                                            ></textarea>
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <button
                                                className={`px-3 py-1 rounded-md text-sm ${feedback.status === 'resolved'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    }`}
                                                disabled={feedback.status === 'resolved'}
                                                onClick={() => handleFeedbackResponse(feedback.id, feedback.response || 'Acknowledged')}
                                            >
                                                {feedback.status === 'resolved' ? 'Resolved' : 'Mark as Resolved'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between mt-8">
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center transition-colors duration-200"
                                    onClick={() => setActiveTab('overview')}
                                >
                                    Back to Overview
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Bar */}
                <div
                    className="sticky bottom-0 bg-white border-t border-gray-200 py-4 px-6 flex justify-between items-center mt-auto shadow-lg backdrop-filter backdrop-blur-sm rounded-t-xl"
                    data-aos="fade-up"
                >
                    <div className="text-gray-500 text-sm flex items-center">
                        <MdAccessTime className="mr-2 text-gray-400" />
                        Last saved: {new Date().toLocaleString()}
                    </div>

                    <div className="flex space-x-4">
                        <button
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded-xl flex items-center transition-all duration-200 hover:shadow-md font-medium text-sm"
                        >
                            <MdSave className="mr-2" />
                            Save Draft
                        </button>

                        <button
                            className={`px-5 py-2.5 rounded-xl flex items-center transition-all duration-200 font-medium text-sm ${isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : submissionStatus.status === 'draft'
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                            disabled={isSubmitting || submissionStatus.status !== 'draft'}
                            onClick={handleSubmit}
                        >
                            {isSubmitting ? (
                                <>
                                    <MdRefresh className="animate-spin mr-2" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <MdSend className="mr-2" />
                                    Submit Final Report
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinalReporting;
