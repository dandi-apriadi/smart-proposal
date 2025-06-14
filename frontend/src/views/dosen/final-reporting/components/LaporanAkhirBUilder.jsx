import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdCloudUpload, MdDelete, MdSave, MdSend, MdWarning, MdCheckCircle, MdAttachFile, MdInfo, MdAdd, MdHelp } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LaporanAkhirBuilder = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [activeSection, setActiveSection] = useState('abstract');
    const [submitConfirm, setSubmitConfirm] = useState(false);

    // Dummy data for session and report
    const [session, setSession] = useState({
        _id: "session123",
        name: "Session 2025-1",
        status: "active",
        finalReportDeadline: new Date('2025-10-15').toLocaleDateString(),
        remainingDays: 45
    });

    const [report, setReport] = useState({
        _id: "report123",
        title: "Perancangan Sistem Validasi Format Proposal Pengadaan Kegiatan",
        status: "draft", // draft, submitted, reviewed, approved, rejected
        abstract: "Perancangan Sistem Validasi Format Proposal Pengadaan Kegiatan Berbasis Machine Learning dengan Algoritma Random Forest...",
        introduction: "Pendahuluan tentang penelitian yang dilakukan...",
        methods: "Metode yang digunakan dalam penelitian...",
        results: "Hasil penelitian yang telah dilakukan...",
        discussion: "Pembahasan mengenai hasil penelitian...",
        conclusion: "Kesimpulan dari penelitian...",
        references: "Daftar referensi yang digunakan...",
        lastSaved: new Date().toLocaleString(),
        attachments: [
            { id: "att1", name: "Data_Penelitian.xlsx", size: "2.4 MB", type: "application/excel" },
            { id: "att2", name: "Dokumentasi_Pengujian.pdf", size: "5.1 MB", type: "application/pdf" }
        ],
        feedback: [
            { id: "fb1", from: "Dr. Ahmad Reviewer", date: "2025-09-10", message: "Bagian metode perlu diperjelas dengan diagram alur.", resolved: false },
            { id: "fb2", from: "Prof. Siti Evaluator", date: "2025-09-12", message: "Hasil penelitian sudah baik dan komprehensif.", resolved: true }
        ]
    });

    // Handle form changes
    const handleInputChange = (field, value) => {
        setReport({
            ...report,
            [field]: value,
            lastSaved: new Date().toLocaleString()
        });
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newAttachment = {
                id: `att${Date.now()}`,
                name: file.name,
                size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                type: file.type
            };

            setReport({
                ...report,
                attachments: [...report.attachments, newAttachment],
                lastSaved: new Date().toLocaleString()
            });
        }
    };

    // Handle file deletion
    const handleDeleteFile = (id) => {
        setReport({
            ...report,
            attachments: report.attachments.filter(att => att.id !== id),
            lastSaved: new Date().toLocaleString()
        });
    };

    // Handle report submission
    const handleSubmit = () => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setReport({
                ...report,
                status: 'submitted',
                lastSaved: new Date().toLocaleString()
            });
            setSubmitConfirm(false);
            setIsLoading(false);

            // Add notification handling here
        }, 2000);
    };

    // Handle save draft
    const handleSaveDraft = () => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Add notification handling here
        }, 1000);
    };

    // Mark feedback as resolved
    const handleResolveFeedback = (id) => {
        setReport({
            ...report,
            feedback: report.feedback.map(fb =>
                fb.id === id ? { ...fb, resolved: !fb.resolved } : fb
            )
        });
    };

    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    return (
        <div className="w-full h-full bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-md rounded-lg mb-6 p-6" data-aos="fade-down">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Laporan Akhir Builder</h1>
                        <p className="text-gray-600 mt-1">Session: {session.name}</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md flex items-center">
                            <MdInfo className="mr-2" size={20} />
                            <span>Tenggat: {session.finalReportDeadline} ({session.remainingDays} hari lagi)</span>
                        </div>
                        <div className="mt-2 flex items-center">
                            <span className="text-gray-600 mr-4">Status: </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${report.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                report.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                                    report.status === 'reviewed' ? 'bg-purple-100 text-purple-800' :
                                        report.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                }`}>
                                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Editor Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white shadow-md rounded-lg p-6" data-aos="fade-up">
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Judul Laporan Akhir
                            </label>
                            <input
                                id="title"
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={report.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                            />
                        </div>

                        {/* Report Section Tabs */}
                        <div className="flex overflow-x-auto mb-4 pb-1 border-b">
                            {['abstract', 'introduction', 'methods', 'results', 'discussion', 'conclusion', 'references'].map((section) => (
                                <button
                                    key={section}
                                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeSection === section
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-600 hover:text-blue-500'
                                        }`}
                                    onClick={() => setActiveSection(section)}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Current Section Editor */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={activeSection}>
                                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                            </label>
                            <textarea
                                id={activeSection}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[300px]"
                                value={report[activeSection]}
                                onChange={(e) => handleInputChange(activeSection, e.target.value)}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-between items-center mt-6">
                            <div className="text-sm text-gray-600">
                                Terakhir disimpan: {report.lastSaved}
                            </div>
                            <div className="flex space-x-4 mt-3 sm:mt-0">
                                <button
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md flex items-center hover:bg-gray-300 transition-colors"
                                    onClick={handleSaveDraft}
                                    disabled={isLoading}
                                >
                                    <MdSave className="mr-2" />
                                    Simpan Draft
                                </button>
                                {report.status === 'draft' && (
                                    <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
                                        onClick={() => setSubmitConfirm(true)}
                                        disabled={isLoading}
                                    >
                                        <MdSend className="mr-2" />
                                        Submit Laporan
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Attachments and Feedback */}
                <div className="lg:col-span-1">
                    {/* Attachments Section */}
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6" data-aos="fade-left">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <MdAttachFile className="mr-2" />
                            Dokumen Pendukung
                        </h2>

                        {/* File Upload */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4 hover:bg-gray-50 transition-colors">
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={handleFileUpload}
                                disabled={report.status !== 'draft'}
                            />
                            <label
                                htmlFor="file-upload"
                                className={`flex flex-col items-center justify-center cursor-pointer ${report.status !== 'draft' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <MdCloudUpload className="text-blue-500" size={40} />
                                <p className="mt-2 text-sm text-gray-600">Klik untuk upload dokumen</p>
                                <p className="text-xs text-gray-500 mt-1">PDF, DOCX, XLSX, JPG, PNG (Max. 10MB)</p>
                            </label>
                        </div>

                        {/* Attachments List */}
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                            {report.attachments.length > 0 ? (
                                report.attachments.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-2 rounded-md mr-3">
                                                <MdAttachFile className="text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{file.name}</p>
                                                <p className="text-xs text-gray-500">{file.size}</p>
                                            </div>
                                        </div>
                                        {report.status === 'draft' && (
                                            <button
                                                onClick={() => handleDeleteFile(file.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                <MdDelete size={20} />
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">Belum ada dokumen yang diunggah</p>
                            )}
                        </div>
                    </div>

                    {/* Feedback Section */}
                    <div className="bg-white shadow-md rounded-lg p-6" data-aos="fade-left" data-aos-delay="100">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Umpan Balik Reviewer</h2>

                        {report.feedback.length > 0 ? (
                            <div className="space-y-4 max-h-80 overflow-y-auto">
                                {report.feedback.map((feedback) => (
                                    <div
                                        key={feedback.id}
                                        className={`p-4 rounded-lg border-l-4 ${feedback.resolved
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-yellow-500 bg-yellow-50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="font-medium text-gray-800">{feedback.from}</p>
                                            <span className="text-xs text-gray-500">{feedback.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">{feedback.message}</p>
                                        <div className="flex justify-between items-center">
                                            <span className={`text-xs font-medium ${feedback.resolved ? 'text-green-600' : 'text-yellow-600'
                                                }`}>
                                                {feedback.resolved ? 'Resolved' : 'Pending'}
                                            </span>
                                            <button
                                                onClick={() => handleResolveFeedback(feedback.id)}
                                                className={`text-xs px-3 py-1 rounded-full ${feedback.resolved
                                                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    }`}
                                            >
                                                {feedback.resolved ? 'Mark as Pending' : 'Mark as Resolved'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <MdInfo size={30} className="mx-auto mb-2" />
                                <p>Belum ada umpan balik</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Submission Confirmation Modal */}
            {submitConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full" data-aos="zoom-in">
                        <div className="text-center mb-6">
                            <div className="bg-yellow-100 p-3 rounded-full inline-block">
                                <MdWarning className="text-yellow-600" size={30} />
                            </div>
                            <h3 className="text-lg font-bold mt-4 text-gray-800">Konfirmasi Pengiriman</h3>
                            <p className="text-gray-600 mt-2">
                                Laporan yang sudah dikirim tidak dapat diubah lagi. Pastikan semua data sudah benar.
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setSubmitConfirm(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Batalkan
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex justify-center items-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        <MdCheckCircle className="mr-2" />
                                        Kirim Laporan
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LaporanAkhirBuilder;
