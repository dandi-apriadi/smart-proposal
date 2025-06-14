import React, { useState, useEffect } from 'react';
import {
    FiFileText, FiCheckCircle, FiXCircle, FiAlertTriangle,
    FiBarChart2, FiMessageSquare, FiFilter, FiSearch,
    FiDownload, FiExternalLink, FiChevronRight, FiChevronLeft,
    FiCalendar, FiUser, FiBriefcase, FiBox, FiMenu, FiX
} from 'react-icons/fi';
import { toast } from 'react-toastify';

// Sample data to populate the reviews page
const sampleProposals = [
    {
        id: 'P-2025-001',
        title: 'Pengadaan Laboratorium Komputer Jurusan Teknik Informatika',
        submitter: 'Dr. Rendi Sutanto',
        department: 'Teknik Informatika',
        dateSubmitted: '2025-04-15',
        status: 'pending',
        mlScore: 87,
        fileType: 'pdf',
        fileSize: '2.4 MB',
        issues: ['Format anggaran tidak sesuai', 'Kurang rinci pada timeline']
    },
    {
        id: 'P-2025-002',
        title: 'Workshop Penelitian dan Publikasi Ilmiah',
        submitter: 'Prof. Lisa Mardiana',
        department: 'Penelitian dan Pengabdian',
        dateSubmitted: '2025-04-14',
        status: 'pending',
        mlScore: 92,
        fileType: 'docx',
        fileSize: '1.8 MB',
        issues: []
    },
    {
        id: 'P-2025-003',
        title: 'Seminar Nasional Teknologi Terapan',
        submitter: 'Dr. Budi Prakoso',
        department: 'Teknik Elektro',
        dateSubmitted: '2025-04-13',
        status: 'reviewed',
        mlScore: 78,
        fileType: 'pdf',
        fileSize: '3.1 MB',
        issues: ['Latar belakang kurang lengkap', 'Format cover tidak sesuai', 'Referensi tidak diformat dengan benar']
    },
    {
        id: 'P-2025-004',
        title: 'Modernisasi Fasilitas Perpustakaan Kampus',
        submitter: 'Ir. Santi Wijaya',
        department: 'Sarana dan Prasarana',
        dateSubmitted: '2025-04-12',
        status: 'approved',
        mlScore: 95,
        fileType: 'pdf',
        fileSize: '4.2 MB',
        issues: []
    },
    {
        id: 'P-2025-005',
        title: 'Program Magang Industri Mahasiswa Akuntansi',
        submitter: 'Dr. Andi Firmansyah',
        department: 'Akuntansi',
        dateSubmitted: '2025-04-11',
        status: 'rejected',
        mlScore: 65,
        fileType: 'docx',
        fileSize: '1.5 MB',
        issues: ['Tidak ada anggaran', 'Format tidak sesuai standar', 'Tidak ada tanda tangan pimpinan']
    }
];

const ProposalReviewsPage = () => {
    // State management
    const [proposals, setProposals] = useState(sampleProposals);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Format validation checklist
    const [formatChecklist, setFormatChecklist] = useState({
        coverValid: false,
        backgroundValid: false,
        objectivesValid: false,
        methodologyValid: false,
        budgetValid: false,
        timelineValid: false,
        referencesValid: false
    });

    // Filtered proposals based on status and search
    const filteredProposals = proposals.filter(proposal => {
        const matchesStatus = filterStatus === 'all' || proposal.status === filterStatus;
        const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            proposal.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            proposal.submitter.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // AOS initialization
    useEffect(() => {
        // Initialize AOS
        if (typeof window !== 'undefined') {
            const AOS = require('aos');
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
            });
            AOS.refresh();
        }

        // Set first proposal as selected by default
        if (filteredProposals.length > 0 && !selectedProposal) {
            setSelectedProposal(filteredProposals[0]);
            // Pre-fill checklist based on ML score
            initializeChecklist(filteredProposals[0].mlScore);
        }
    }, [filteredProposals]);

    // Initialize checklist based on ML score
    const initializeChecklist = (score) => {
        // Simple logic - higher score means more items checked
        setFormatChecklist({
            coverValid: score > 70,
            backgroundValid: score > 75,
            objectivesValid: score > 80,
            methodologyValid: score > 82,
            budgetValid: score > 85,
            timelineValid: score > 88,
            referencesValid: score > 90
        });
    };

    // Handle proposal selection
    const handleSelectProposal = (proposal) => {
        setSelectedProposal(proposal);
        setShowDetails(true); // Show the details panel on mobile
        initializeChecklist(proposal.mlScore);
        setFeedback(''); // Reset feedback
    };

    // Handle proposal validation actions
    const handleProposalAction = (action) => {
        toast.success(`Proposal ${selectedProposal.id} ${action} successfully`);

        // Update proposal status in the list
        const updatedProposals = proposals.map(p => {
            if (p.id === selectedProposal.id) {
                return { ...p, status: action === 'approved' ? 'approved' : action === 'rejected' ? 'rejected' : 'reviewed' };
            }
            return p;
        });

        setProposals(updatedProposals);

        // Update selected proposal
        setSelectedProposal({
            ...selectedProposal,
            status: action === 'approved' ? 'approved' : action === 'rejected' ? 'rejected' : 'reviewed'
        });
    };

    // Send feedback to the user
    const handleSendFeedback = () => {
        if (!feedback.trim()) {
            toast.error('Please enter feedback before sending');
            return;
        }

        toast.success('Feedback sent to the submitter');
        setFeedback('');
    };

    // Get status badge styles based on status
    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-gradient-to-r from-green-500/10 to-green-500/20 text-green-700 border border-green-200';
            case 'rejected':
                return 'bg-gradient-to-r from-red-500/10 to-red-500/20 text-red-700 border border-red-200';
            case 'reviewed':
                return 'bg-gradient-to-r from-blue-500/10 to-blue-500/20 text-blue-700 border border-blue-200';
            default:
                return 'bg-gradient-to-r from-amber-500/10 to-amber-500/20 text-amber-700 border border-amber-200';
        }
    };

    // Get ML score indicator style
    const getMlScoreStyle = (score) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 80) return 'text-blue-600';
        if (score >= 70) return 'text-amber-600';
        return 'text-red-600';
    };

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="h-full min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-indigo-50/30 to-gray-100">
            {/* Header - Fixed at the top */}
            <header className="h-14 border-b border-gray-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-3 md:px-5 sticky top-0 z-20 shadow-sm">
                <div className="flex items-center">
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 mr-3 rounded-full hover:bg-gray-100 lg:hidden"
                    >
                        {isSidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                    </button>
                    <h1 className="text-lg font-bold text-gray-800 tracking-tight">Validasi Proposal</h1>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" size={14} />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari proposal..."
                            className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-36 md:w-56 bg-gray-50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center text-sm bg-white border border-gray-200 rounded-full px-2.5 py-1 shadow-sm">
                        <FiFilter className="text-indigo-500 mr-1.5" size={14} />
                        <select
                            className="bg-transparent border-none text-sm focus:outline-none text-gray-700 cursor-pointer pr-1 py-0 max-w-[120px]"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">Semua</option>
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </header>

            <div className="flex h-[calc(100vh-3.5rem)]">
                {/* Left panel - Proposal list */}
                <aside
                    className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white border-r border-gray-200 w-full max-w-[280px] lg:max-w-[260px] fixed lg:static left-0 top-14 bottom-0 z-10 shadow-lg lg:shadow-none overflow-hidden`}
                >
                    <div className="h-full flex flex-col">
                        <div className="overflow-y-auto flex-grow" style={{ height: "calc(100vh - 3.5rem)" }}>
                            {filteredProposals.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">
                                    <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                        <FiFileText className="text-3xl text-gray-300" />
                                    </div>
                                    <p className="text-sm">Tidak ada proposal yang ditemukan</p>
                                </div>
                            ) : (
                                filteredProposals.map((proposal) => (
                                    <div
                                        key={proposal.id}
                                        className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${selectedProposal?.id === proposal.id ? 'bg-indigo-50/70 border-l-4 border-l-indigo-500' : ''}`}
                                        onClick={() => handleSelectProposal(proposal)}
                                    >
                                        <div className="flex justify-between items-start mb-1.5">
                                            <h3 className="font-medium text-gray-900 pr-2 line-clamp-2 text-sm">{proposal.title}</h3>
                                            <span className={`text-xs px-2 py-0.5 rounded-full uppercase font-medium whitespace-nowrap ml-1.5 ${getStatusBadge(proposal.status)}`}>
                                                {proposal.status === 'pending' ? 'Pending' :
                                                    proposal.status === 'reviewed' ? 'Reviewed' :
                                                        proposal.status === 'approved' ? 'Approved' : 'Rejected'}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500 mb-1.5">
                                            <div className="flex items-center">
                                                <FiBox className="mr-1 text-indigo-400" size={12} />
                                                <span>{proposal.id}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FiFileText className="mr-1 text-indigo-400" size={12} />
                                                <span>{proposal.fileType.toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500 mb-1.5">
                                            <div className="flex items-center">
                                                <FiUser className="mr-1 text-indigo-400" size={12} />
                                                <span>{proposal.submitter}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FiBriefcase className="mr-1 text-indigo-400" size={12} />
                                                <span>{proposal.department}</span>
                                            </div>
                                        </div>
                                        <div className="mt-1.5 flex justify-between items-center">
                                            <div className="flex items-center text-xs text-gray-500">
                                                <FiCalendar className="mr-1 text-indigo-400" size={12} />
                                                <span>{new Date(proposal.dateSubmitted).toLocaleDateString('id-ID')}</span>
                                            </div>
                                            <div className={`flex items-center text-xs font-medium ${getMlScoreStyle(proposal.mlScore)}`}>
                                                <FiBarChart2 className="mr-0.5" size={12} />
                                                <span>{proposal.mlScore}%</span>
                                            </div>
                                        </div>
                                        {proposal.issues.length > 0 && (
                                            <div className="mt-1.5 flex items-start gap-1 text-red-500 text-xs">
                                                <FiAlertTriangle className="mt-0.5 flex-shrink-0" size={10} />
                                                <span>{proposal.issues.length} masalah terdeteksi</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </aside>

                {/* Main content area */}
                <main className={`flex-1 transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'lg:ml-0' : 'ml-0'}`}>
                    {selectedProposal ? (
                        <div className="h-full overflow-y-auto" style={{ height: "calc(100vh - 3.5rem)" }}>
                            {/* Proposal header - Sticky */}
                            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 p-3">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                                    <div>
                                        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1 line-clamp-1">{selectedProposal.title}</h2>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-600">
                                            <div className="flex items-center">
                                                <FiUser className="mr-1 text-indigo-400" size={12} />
                                                <span>{selectedProposal.submitter}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FiBriefcase className="mr-1 text-indigo-400" size={12} />
                                                <span>{selectedProposal.department}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-2.5 py-1 rounded-full uppercase font-medium inline-flex items-center ${getStatusBadge(selectedProposal.status)}`}>
                                        {selectedProposal.status === 'pending' ? (
                                            <><FiAlertTriangle className="mr-1" size={12} /> Pending</>
                                        ) : selectedProposal.status === 'reviewed' ? (
                                            <><FiMessageSquare className="mr-1" size={12} /> Reviewed</>
                                        ) : selectedProposal.status === 'approved' ? (
                                            <><FiCheckCircle className="mr-1" size={12} /> Approved</>
                                        ) : (
                                            <><FiXCircle className="mr-1" size={12} /> Rejected</>
                                        )}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-3 items-center text-xs p-2 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-center">
                                        <FiBox className="mr-1 text-indigo-400" size={12} />
                                        <span className="text-gray-700 font-medium">{selectedProposal.id}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FiFileText className="mr-1 text-indigo-400" size={12} />
                                        <span>{selectedProposal.fileType.toUpperCase()} • {selectedProposal.fileSize}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FiCalendar className="mr-1 text-indigo-400" size={12} />
                                        <span>{new Date(selectedProposal.dateSubmitted).toLocaleDateString('id-ID')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Document and validation panels */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-7rem)]">
                                {/* Document preview pane */}
                                <div className="p-3 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-semibold text-gray-800 flex items-center text-sm">
                                            <FiFileText className="mr-1.5 text-indigo-500" />
                                            Preview Dokumen
                                        </h3>
                                        <div className="flex gap-1">
                                            <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors" title="Download">
                                                <FiDownload size={16} />
                                            </button>
                                            <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors" title="Open in new tab">
                                                <FiExternalLink size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Document preview placeholder - takes more space */}
                                    <div className="bg-white rounded-lg border border-gray-200 shadow-inner h-[40vh] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
                                        <div className="absolute top-0 left-0 w-full h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3">
                                            <div className="flex space-x-1.5">
                                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                            </div>
                                            <div className="mx-auto font-medium text-xs text-gray-600">
                                                {selectedProposal.id} - {selectedProposal.fileType.toUpperCase()}
                                            </div>
                                        </div>

                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center p-4 relative z-10">
                                                <div className="w-16 h-20 mx-auto relative mb-3 transform transition-transform hover:scale-110 hover:rotate-1">
                                                    <div className="absolute inset-0 bg-indigo-100 rounded-lg transform -rotate-3"></div>
                                                    <div className="absolute inset-0 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center transform rotate-1">
                                                        <FiFileText className="text-2xl text-indigo-500" />
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 mb-3 text-sm">Preview dokumen {selectedProposal.fileType.toUpperCase()}</p>
                                                <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition-all shadow-sm hover:shadow group">
                                                    <span className="flex items-center">
                                                        Lihat Dokumen Lengkap
                                                        <FiExternalLink className="ml-1.5 group-hover:translate-x-0.5 transition-transform" size={14} />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ML prediction results */}
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm">
                                            <FiBarChart2 className="mr-1.5 text-indigo-500" />
                                            Hasil Analisis Machine Learning
                                        </h3>

                                        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-medium">Skor Kesesuaian Format</span>
                                                <div className={`text-sm font-bold ${getMlScoreStyle(selectedProposal.mlScore)} flex items-center`}>
                                                    <span className="bg-gray-100 rounded-lg px-2 py-0.5 inline-flex items-center">
                                                        <FiBarChart2 className="mr-1" size={12} />
                                                        {selectedProposal.mlScore}%
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                                                <div
                                                    className={`h-2 rounded-full ${selectedProposal.mlScore >= 90 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                                                        selectedProposal.mlScore >= 80 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                                                            selectedProposal.mlScore >= 70 ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
                                                                'bg-gradient-to-r from-red-400 to-red-500'
                                                        }`}
                                                    style={{ width: `${selectedProposal.mlScore}%` }}
                                                ></div>
                                            </div>

                                            <div className="space-y-2">
                                                <span className="text-xs font-medium">Masalah yang terdeteksi:</span>
                                                {selectedProposal.issues.length === 0 ? (
                                                    <p className="text-xs text-green-600 flex items-center bg-green-50/70 p-2 rounded-lg border border-green-100">
                                                        <FiCheckCircle className="mr-1.5 text-green-500" size={12} /> Tidak ada masalah terdeteksi
                                                    </p>
                                                ) : (
                                                    <ul className="text-xs space-y-1.5 text-red-600 bg-red-50/70 p-2 rounded-lg border border-red-100">
                                                        {selectedProposal.issues.map((issue, index) => (
                                                            <li key={index} className="flex items-start">
                                                                <FiAlertTriangle className="mr-1.5 mt-0.5 flex-shrink-0 text-red-500" size={12} />
                                                                <span>{issue}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Validation panel */}
                                <div className="p-3 overflow-y-auto">
                                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-sm">
                                        <FiCheckCircle className="mr-1.5 text-indigo-500" />
                                        Validasi Manual
                                    </h3>

                                    <div className="space-y-2 mb-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                        {Object.entries({
                                            coverValid: 'Format Cover Sesuai',
                                            backgroundValid: 'Latar Belakang Lengkap',
                                            objectivesValid: 'Tujuan Jelas',
                                            methodologyValid: 'Metodologi Sesuai',
                                            budgetValid: 'Anggaran Terperinci',
                                            timelineValid: 'Timeline Tepat',
                                            referencesValid: 'Referensi Sesuai Format'
                                        }).map(([key, label]) => (
                                            <div key={key} className="flex items-center p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={key}
                                                        checked={formatChecklist[key]}
                                                        onChange={(e) => setFormatChecklist({ ...formatChecklist, [key]: e.target.checked })}
                                                        className="h-3.5 w-3.5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-colors"
                                                    />
                                                    <label htmlFor={key} className="ml-2 text-xs text-gray-700 cursor-pointer flex-1">
                                                        {label}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Feedback form */}
                                    <div className="mb-4">
                                        <label htmlFor="feedback" className="block text-xs font-medium text-gray-700 mb-1.5 flex items-center">
                                            <FiMessageSquare className="mr-1.5 text-indigo-500" />
                                            Umpan Balik untuk Pengusul
                                        </label>
                                        <textarea
                                            id="feedback"
                                            rows={3}
                                            placeholder="Masukkan komentar atau saran perbaikan..."
                                            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all text-xs bg-white"
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                        ></textarea>

                                        <button
                                            className="mt-2 w-full inline-flex justify-center items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transition-all"
                                            onClick={handleSendFeedback}
                                        >
                                            <FiMessageSquare className="mr-1.5" size={12} /> Kirim Umpan Balik
                                        </button>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <button
                                            className={`inline-flex flex-col justify-center items-center p-2 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500 transition-all ${selectedProposal.status === 'approved' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => handleProposalAction('approved')}
                                            disabled={selectedProposal.status === 'approved'}
                                        >
                                            <FiCheckCircle className="text-xl mb-1" />
                                            <span>Setujui</span>
                                        </button>

                                        <button
                                            className={`inline-flex flex-col justify-center items-center p-2 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-500 transition-all ${selectedProposal.status === 'reviewed' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => handleProposalAction('reviewed')}
                                            disabled={selectedProposal.status === 'reviewed'}
                                        >
                                            <FiMessageSquare className="text-xl mb-1" />
                                            <span>Revisi</span>
                                        </button>

                                        <button
                                            className={`inline-flex flex-col justify-center items-center p-2 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-all ${selectedProposal.status === 'rejected' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => handleProposalAction('rejected')}
                                            disabled={selectedProposal.status === 'rejected'}
                                        >
                                            <FiXCircle className="text-xl mb-1" />
                                            <span>Tolak</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-md w-full max-w-md">
                                <div className="w-16 h-20 mx-auto relative mb-4">
                                    <div className="absolute inset-0 bg-indigo-100 rounded-lg transform -rotate-6"></div>
                                    <div className="absolute inset-0 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center transform rotate-3">
                                        <FiFileText className="text-3xl text-indigo-400" />
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Proposal Dipilih</h2>
                                <p className="text-gray-600 mb-4 max-w-md mx-auto text-sm">Silakan pilih proposal dari daftar untuk melihat detail dan memulai proses validasi</p>
                                <button
                                    onClick={toggleSidebar}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm inline-flex items-center justify-center gap-2 text-sm"
                                >
                                    <FiChevronLeft size={16} />
                                    <span>Lihat Daftar Proposal</span>
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProposalReviewsPage;
