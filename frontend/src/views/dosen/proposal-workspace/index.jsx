import React, { useState, useEffect } from 'react';
import {
    MdAdd,
    MdDelete,
    MdEdit,
    MdOutlineDescription,
    MdDownload,
    MdInfo,
    MdWarning,
    MdCheckCircle,
    MdHourglassEmpty,
    MdFolder,
    MdPeople,
    MdSearch,
    MdFilterList,
    MdMoreVert,
    MdArrowForward,
    MdOutlineError,
    MdClose,
    MdTune,
    MdCalendarToday,
    MdAccessTime,
    MdInsertDriveFile,
    MdCloudUpload,
    MdAccountCircle
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Mock data for demonstration
const MOCK_PROPOSALS = [
    {
        id: 1,
        title: "Pengembangan Sistem IoT untuk Pemantauan Kualitas Air",
        status: "draft",
        createdAt: "2025-04-01",
        updatedAt: "2025-04-03",
        session: "Session 2025-1",
        collaborators: [
            { id: 101, name: "Dr. Siti Rahma", role: "Co-Researcher" },
            { id: 102, name: "Prof. Budi Santoso", role: "Advisor" }
        ],
        progress: 30,
        deadline: "2025-05-15",
        description: "Penelitian ini bertujuan untuk mengembangkan sistem IoT yang dapat memantau kualitas air secara real-time di beberapa lokasi strategis."
    },
    {
        id: 2,
        title: "Implementasi Machine Learning untuk Prediksi Kebutuhan Energi",
        status: "submitted",
        createdAt: "2025-03-25",
        updatedAt: "2025-04-01",
        session: "Session 2025-1",
        collaborators: [
            { id: 103, name: "Dr. Ahmad Rizki", role: "Data Scientist" },
            { id: 104, name: "Dr. Maya Putri", role: "Domain Expert" },
            { id: 105, name: "Ir. Joko Widodo", role: "Technical Advisor" }
        ],
        progress: 100,
        deadline: "2025-05-15",
        description: "Penelitian ini menggunakan algoritma machine learning untuk memprediksi kebutuhan energi di kampus berdasarkan pola historis penggunaan."
    },
    {
        id: 3,
        title: "Analisis Dampak Teknologi Blockchain pada Sistem Keuangan",
        status: "approved",
        createdAt: "2025-03-18",
        updatedAt: "2025-03-30",
        session: "Session 2024-2",
        collaborators: [
            { id: 106, name: "Dr. Rini Anggraini", role: "Financial Expert" }
        ],
        progress: 100,
        deadline: "2024-11-30",
        description: "Studi komprehensif mengenai dampak implementasi teknologi blockchain pada sistem keuangan di institusi pendidikan tinggi."
    },
    {
        id: 4,
        title: "Perancangan Sistem Validasi Format Proposal Pengadaan Kegiatan Berbasis Machine Learning",
        status: "under_review",
        createdAt: "2025-03-20",
        updatedAt: "2025-03-28",
        session: "Session 2025-1",
        collaborators: [
            { id: 107, name: "Prof. Dian Sastro", role: "ML Specialist" },
            { id: 108, name: "Dr. Hadi Gunawan", role: "System Architect" },
            { id: 109, name: "Ir. Sri Mulyani", role: "Document Specialist" },
            { id: 110, name: "Dr. Bayu Purnama", role: "Testing Engineer" }
        ],
        progress: 75,
        deadline: "2025-05-15",
        description: "Pengembangan sistem validasi otomatis untuk proposal kegiatan menggunakan algoritma Random Forest untuk meningkatkan efisiensi proses review."
    },
    {
        id: 5,
        title: "Pengembangan Aplikasi Mobile untuk Monitoring Performa Akademik",
        status: "rejected",
        createdAt: "2024-10-15",
        updatedAt: "2024-11-05",
        session: "Session 2024-2",
        collaborators: [
            { id: 111, name: "Dr. Adi Nugroho", role: "Mobile Developer" },
            { id: 112, name: "Prof. Endang Sukarna", role: "UX Specialist" }
        ],
        progress: 100,
        deadline: "2024-11-30",
        rejectReason: "Tidak memenuhi kriteria inovasi yang ditetapkan dan terdapat kesamaan signifikan dengan proyek yang sudah ada."
    }
];

const MOCK_TEMPLATES = [
    {
        id: 1,
        title: "Template Penelitian Dasar",
        category: "Research",
        description: "Template standar untuk proposal penelitian dasar",
        usage: 128,
        rating: 4.8
    },
    {
        id: 2,
        title: "Template Pengabdian Masyarakat",
        category: "Community Service",
        description: "Template untuk proposal pengabdian kepada masyarakat",
        usage: 87,
        rating: 4.5
    },
    {
        id: 3,
        title: "Template Inovasi Teknologi",
        category: "Innovation",
        description: "Template khusus untuk proposal inovasi teknologi",
        usage: 64,
        rating: 4.7
    },
    {
        id: 4,
        title: "Template Kerjasama Industri",
        category: "Industry",
        description: "Template untuk proposal kerjasama dengan industri",
        usage: 42,
        rating: 4.6
    }
];

const MOCK_SESSIONS = [
    {
        id: 1,
        name: "Session 2025-1",
        status: "active",
        startDate: "2025-04-01",
        endDate: "2025-10-31",
        proposalDeadline: "2025-05-15",
        reviewDeadline: "2025-06-15",
        progressReportDeadline: "2025-08-15",
        finalReportDeadline: "2025-10-15"
    }
];

const ProposalWorkspace = () => {
    const [activeTab, setActiveTab] = useState('myProposals');
    const [proposals, setProposals] = useState(MOCK_PROPOSALS);
    const [templates, setTemplates] = useState(MOCK_TEMPLATES);
    const [sessions, setSessions] = useState(MOCK_SESSIONS);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showNewProposalModal, setShowNewProposalModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [newProposalData, setNewProposalData] = useState({
        title: '',
        template: '',
        description: '',
        collaborators: []
    });

    // For countdown timer
    const [timeLeft, setTimeLeft] = useState({
        days: 30,
        hours: 12,
        minutes: 45
    });

    useEffect(() => {
        // Initialize AOS animation library
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });

        // In a real application, you would fetch data here
        // dispatch(fetchProposals());
        // dispatch(fetchTemplates());
        // dispatch(fetchActiveSessions());
    }, []);

    const filteredProposals = proposals.filter(proposal => {
        const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || proposal.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'bg-gray-200 text-gray-800';
            case 'submitted': return 'bg-blue-100 text-blue-800';
            case 'under_review': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'draft': return <MdOutlineDescription className="mr-1" />;
            case 'submitted': return <MdHourglassEmpty className="mr-1" />;
            case 'under_review': return <MdInfo className="mr-1" />;
            case 'approved': return <MdCheckCircle className="mr-1" />;
            case 'rejected': return <MdOutlineError className="mr-1" />;
            default: return <MdInfo className="mr-1" />;
        }
    };

    const handleNewProposal = () => {
        // Check if user already has an active proposal in the current session
        const activeSession = sessions.find(s => s.status === 'active');
        const hasActiveProposal = proposals.some(p =>
            p.session === activeSession?.name &&
            ['submitted', 'under_review', 'approved'].includes(p.status)
        );

        if (hasActiveProposal) {
            alert("Anda sudah memiliki proposal aktif untuk sesi ini. Maksimum 1 proposal aktif per sesi.");
            return;
        }

        setShowNewProposalModal(true);
    };

    const handleCloseModal = () => {
        setShowNewProposalModal(false);
        setShowDetailModal(false);
        setSelectedProposal(null);
    };

    const handleViewDetails = (proposal) => {
        setSelectedProposal(proposal);
        setShowDetailModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProposalData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitProposal = (e) => {
        e.preventDefault();

        // Would normally send to API, for demo we'll just add to state
        const newProposal = {
            id: proposals.length + 1,
            title: newProposalData.title,
            status: "draft",
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
            session: sessions.find(s => s.status === 'active')?.name,
            collaborators: [],
            progress: 10,
            deadline: sessions.find(s => s.status === 'active')?.proposalDeadline,
            description: newProposalData.description
        };

        setProposals([...proposals, newProposal]);
        setNewProposalData({ title: '', template: '', description: '', collaborators: [] });
        setShowNewProposalModal(false);
    };

    const renderStatusMilestone = (proposal) => {
        const statusOrder = ['draft', 'submitted', 'under_review', 'approved', 'rejected'];
        const currentIndex = statusOrder.indexOf(proposal.status);

        return (
            <div className="w-full mt-3">
                <div className="flex items-center justify-between">
                    {statusOrder.slice(0, 4).map((status, index) => (
                        <div key={status} className="flex flex-col items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentIndex && proposal.status !== 'rejected' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                                    } ${proposal.status === 'rejected' && index === currentIndex ? 'bg-red-500 text-white' : ''}`}
                            >
                                {index === 0 && <MdOutlineDescription />}
                                {index === 1 && <MdHourglassEmpty />}
                                {index === 2 && <MdInfo />}
                                {index === 3 && <MdCheckCircle />}
                            </div>
                            <span className="text-xs mt-1 text-gray-600 hidden md:inline">{status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}</span>
                        </div>
                    ))}
                </div>
                <div className="relative w-full h-1 bg-gray-200 mt-2 mb-4">
                    <div
                        className={`absolute top-0 left-0 h-1 ${proposal.status === 'rejected' ? 'bg-red-500' : 'bg-blue-600'
                            }`}
                        style={{
                            width: proposal.status === 'draft' ? '0%' :
                                proposal.status === 'submitted' ? '33%' :
                                    proposal.status === 'under_review' ? '66%' :
                                        '100%'
                        }}
                    ></div>
                </div>
            </div>
        );
    };

    // Tab navigation
    const renderTabNavigation = () => (
        <div className="mb-6 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px">
                <li className="mr-2">
                    <button
                        className={`inline-block p-4 ${activeTab === 'myProposals'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setActiveTab('myProposals')}
                    >
                        <div className="flex items-center">
                            <MdInsertDriveFile className="mr-2" />
                            <span>Proposal Saya</span>
                        </div>
                    </button>
                </li>
                <li className="mr-2">
                    <button
                        className={`inline-block p-4 ${activeTab === 'templateGallery'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setActiveTab('templateGallery')}
                    >
                        <div className="flex items-center">
                            <MdOutlineDescription className="mr-2" />
                            <span>Template Gallery</span>
                        </div>
                    </button>
                </li>
                <li>
                    <button
                        className={`inline-block p-4 ${activeTab === 'guidelines'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setActiveTab('guidelines')}
                    >
                        <div className="flex items-center">
                            <MdInfo className="mr-2" />
                            <span>Rules & Guidelines</span>
                        </div>
                    </button>
                </li>
            </ul>
        </div>
    );

    const renderMyProposalsTab = () => (
        <div className="space-y-6">
            {/* Header and Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Proposal Saya</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari proposal..."
                            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">Semua Status</option>
                        <option value="draft">Draft</option>
                        <option value="submitted">Submitted</option>
                        <option value="under_review">Under Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <button
                        onClick={handleNewProposal}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                    >
                        <MdAdd size={20} />
                        <span>Proposal Baru</span>
                    </button>
                </div>
            </div>

            {/* Active Session Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100" data-aos="fade-up">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Sesi Aktif</div>
                        <h3 className="text-xl font-bold text-gray-800">{sessions[0]?.name || "Tidak ada sesi aktif"}</h3>
                        <p className="text-gray-600 mt-1">Tenggat Proposal: {sessions[0]?.proposalDeadline || "N/A"}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="bg-amber-100 text-amber-800 py-1 px-3 rounded-full text-sm font-medium inline-flex items-center">
                            <MdWarning className="mr-1" />
                            <span>Sisa Waktu: {timeLeft.days} hari {timeLeft.hours} jam</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Important Rule Banner */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm" data-aos="fade-up" data-aos-delay="100">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <MdInfo className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-blue-700">
                            <span className="font-bold">Aturan Penting:</span> Maksimum 1 proposal aktif per sesi. Proposal hanya dapat diedit atau dihapus sebelum batas waktu pengumpulan.
                        </p>
                    </div>
                </div>
            </div>

            {/* Proposal List */}
            {filteredProposals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="150">
                    {filteredProposals.map((proposal) => (
                        <div
                            key={proposal.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden"
                        >
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                                        {getStatusIcon(proposal.status)}
                                        {proposal.status.replace('_', ' ').charAt(0).toUpperCase() + proposal.status.replace('_', ' ').slice(1)}
                                    </span>
                                    <div className="text-gray-400">
                                        <button className="hover:text-gray-600 focus:outline-none">
                                            <MdMoreVert size={20} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="mt-3 text-lg font-semibold text-gray-800 line-clamp-2">{proposal.title}</h3>

                                <div className="mt-4">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <MdCalendarToday className="mr-1.5" />
                                        <div>Diperbarui: {proposal.updatedAt}</div>
                                    </div>
                                    <div className="flex items-center mt-2 text-sm text-gray-500">
                                        <MdPeople className="mr-1.5" />
                                        <div>{proposal.collaborators.length} Kolaborator</div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="text-xs text-gray-500 mb-1 flex justify-between">
                                        <span>Progress</span>
                                        <span>{proposal.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${proposal.status === 'rejected'
                                                ? 'bg-red-500'
                                                : proposal.status === 'approved'
                                                    ? 'bg-green-500'
                                                    : 'bg-blue-500'
                                                }`}
                                            style={{ width: `${proposal.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {renderStatusMilestone(proposal)}

                                <div className="mt-4 flex justify-between">
                                    <button
                                        onClick={() => handleViewDetails(proposal)}
                                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-lg flex items-center transition-colors duration-200"
                                    >
                                        <MdInfo className="mr-1.5" />
                                        Detail
                                    </button>
                                    <div className="flex space-x-2">
                                        <button
                                            className={`p-1.5 rounded-lg flex items-center transition-colors duration-200 ${proposal.status === 'draft'
                                                ? 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                            disabled={proposal.status !== 'draft'}
                                            title={proposal.status === 'draft' ? "Edit Proposal" : "Tidak dapat mengedit proposal yang sudah disubmit"}
                                        >
                                            <MdEdit size={18} />
                                        </button>
                                        <button
                                            className={`p-1.5 rounded-lg flex items-center transition-colors duration-200 ${proposal.status === 'draft'
                                                ? 'bg-red-50 hover:bg-red-100 text-red-700'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                            disabled={proposal.status !== 'draft'}
                                            title={proposal.status === 'draft' ? "Hapus Proposal" : "Tidak dapat menghapus proposal yang sudah disubmit"}
                                        >
                                            <MdDelete size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm" data-aos="fade-up">
                    <MdFolder className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada proposal</h3>
                    <p className="mt-1 text-sm text-gray-500">Mulai dengan membuat proposal baru.</p>
                    <div className="mt-6">
                        <button
                            onClick={handleNewProposal}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <MdAdd className="-ml-1 mr-2 h-5 w-5" />
                            Buat Proposal
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    const renderTemplatesTab = () => (
        <div className="space-y-6" data-aos="fade-up">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Template Gallery</h2>
                <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari template..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden"
                    >
                        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-4">
                            <h3 className="text-lg font-medium text-white text-center">{template.title}</h3>
                        </div>
                        <div className="p-4">
                            <div className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
                                {template.category}
                            </div>
                            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{template.description}</p>

                            <div className="mt-4 flex justify-between items-center">
                                <div className="flex items-center">
                                    <span className="text-sm text-amber-500">★</span>
                                    <span className="ml-1 text-sm text-gray-500">{template.rating}</span>
                                </div>
                                <div className="text-sm text-gray-500">{template.usage} kali digunakan</div>
                            </div>

                            <button className="w-full mt-4 py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center">
                                <MdOutlineDescription className="mr-1.5" />
                                Gunakan Template
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderGuidelinesTab = () => (
        <div className="space-y-6" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-gray-800">Rules & Guidelines</h2>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Aturan Umum Proposal</h3>
                <ul className="space-y-4">
                    <li className="flex">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600">
                                1
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-gray-700"><span className="font-semibold">Maksimum 1 Proposal aktif per Session.</span> Anda hanya dapat memiliki satu proposal aktif (status submitted, under review, atau approved) untuk satu sesi.</p>
                        </div>
                    </li>

                    <li className="flex">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600">
                                2
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-gray-700"><span className="font-semibold">Edit dan Delete hanya tersedia pada status Draft.</span> Proposal yang sudah disubmit tidak dapat diedit atau dihapus.</p>
                        </div>
                    </li>

                    <li className="flex">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600">
                                3
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-gray-700"><span className="font-semibold">Perhatikan deadline setiap sesi.</span> Proposal tidak dapat disubmit setelah melewati deadline.</p>
                        </div>
                    </li>

                    <li className="flex">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600">
                                4
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-gray-700"><span className="font-semibold">Gunakan template yang disediakan.</span> Proposal harus mengikuti format dan struktur yang telah ditentukan.</p>
                        </div>
                    </li>

                    <li className="flex">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600">
                                5
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-gray-700"><span className="font-semibold">Lampirkan dokumen pendukung.</span> Pastikan semua dokumen pendukung yang diperlukan dilampirkan.</p>
                        </div>
                    </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Status Proposal</h3>
                <div className="space-y-3">
                    <div className="flex items-center">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                            <MdOutlineDescription className="mr-1" />
                            Draft
                        </div>
                        <p className="ml-3 text-gray-700">Proposal masih dalam tahap penyusunan dan belum disubmit.</p>
                    </div>

                    <div className="flex items-center">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <MdHourglassEmpty className="mr-1" />
                            Submitted
                        </div>
                        <p className="ml-3 text-gray-700">Proposal telah disubmit dan menunggu untuk direview.</p>
                    </div>

                    <div className="flex items-center">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <MdInfo className="mr-1" />
                            Under Review
                        </div>
                        <p className="ml-3 text-gray-700">Proposal sedang dalam proses review oleh tim penilai.</p>
                    </div>

                    <div className="flex items-center">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <MdCheckCircle className="mr-1" />
                            Approved
                        </div>
                        <p className="ml-3 text-gray-700">Proposal telah disetujui dan dapat dilanjutkan ke tahap implementasi.</p>
                    </div>

                    <div className="flex items-center">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <MdOutlineError className="mr-1" />
                            Rejected
                        </div>
                        <p className="ml-3 text-gray-700">Proposal ditolak. Silakan lihat alasan penolakan untuk informasi lebih lanjut.</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // New Proposal Modal
    const renderNewProposalModal = () => (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${showNewProposalModal ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Proposal Baru</h3>
                                    <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                                        <MdClose size={24} />
                                    </button>
                                </div>
                                <form onSubmit={handleSubmitProposal}>
                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul Proposal</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={newProposalData.title}
                                            onChange={handleInputChange}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Masukkan judul proposal"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">Template</label>
                                        <select
                                            id="template"
                                            name="template"
                                            value={newProposalData.template}
                                            onChange={handleInputChange}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            required
                                        >
                                            <option value="">Pilih Template</option>
                                            {templates.map(template => (
                                                <option key={template.id} value={template.id}>{template.title}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={newProposalData.description}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Deskripsi singkat tentang proposal"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="bg-blue-50 p-3 rounded-md mb-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <MdInfo className="h-5 w-5 text-blue-400" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-blue-700">
                                                    Proposal akan dibuat dengan status <span className="font-bold">Draft</span>. Anda dapat mengedit dan menambahkan detail lainnya sebelum disubmit.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button
                                            type="submit"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                                        >
                                            Buat Proposal
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                        >
                                            Batal
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Proposal Detail Modal
    const renderProposalDetailModal = () => {
        if (!selectedProposal) return null;

        return (
            <div className={`fixed inset-0 z-50 overflow-y-auto ${showDetailModal ? '' : 'hidden'}`}>
                <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Detail Proposal</h3>
                                        <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                                            <MdClose size={24} />
                                        </button>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-bold text-gray-800">{selectedProposal.title}</h2>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedProposal.status)}`}>
                                                {getStatusIcon(selectedProposal.status)}
                                                {selectedProposal.status.replace('_', ' ').charAt(0).toUpperCase() + selectedProposal.status.replace('_', ' ').slice(1)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Session: {selectedProposal.session} | Created: {selectedProposal.createdAt} | Updated: {selectedProposal.updatedAt}
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Progress</h4>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${selectedProposal.status === 'rejected'
                                                    ? 'bg-red-500'
                                                    : selectedProposal.status === 'approved'
                                                        ? 'bg-green-500'
                                                        : 'bg-blue-500'
                                                    }`}
                                                style={{ width: `${selectedProposal.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between mt-1">
                                            <span className="text-xs text-gray-500">{selectedProposal.progress}% completed</span>
                                            <span className="text-xs text-gray-500">Deadline: {selectedProposal.deadline}</span>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{selectedProposal.description}</p>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Collaborators</h4>
                                        <div className="space-y-2">
                                            {selectedProposal.collaborators && selectedProposal.collaborators.length > 0 ? (
                                                selectedProposal.collaborators.map((collaborator, index) => (
                                                    <div key={index} className="flex items-center bg-gray-50 p-2 rounded-md">
                                                        <MdAccountCircle className="text-gray-400 mr-2" size={20} />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-700">{collaborator.name}</p>
                                                            <p className="text-xs text-gray-500">{collaborator.role}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-500">Tidak ada kolaborator</p>
                                            )}
                                        </div>
                                    </div>

                                    {selectedProposal.status === 'rejected' && (
                                        <div className="mb-6">
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Alasan Penolakan</h4>
                                            <div className="bg-red-50 p-3 rounded-md border border-red-100">
                                                <p className="text-sm text-red-700">{selectedProposal.rejectReason}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-3">
                                        <div>
                                            {selectedProposal.status === 'draft' && (
                                                <button className="mr-3 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                    <MdCloudUpload className="mr-1.5" />
                                                    Submit Proposal
                                                </button>
                                            )}
                                        </div>
                                        <div>
                                            <button
                                                onClick={handleCloseModal}
                                                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Tutup
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="mx-auto px-4 py-6 max-w-7xl">
            {renderTabNavigation()}

            {activeTab === 'myProposals' && renderMyProposalsTab()}
            {activeTab === 'templateGallery' && renderTemplatesTab()}
            {activeTab === 'guidelines' && renderGuidelinesTab()}

            {renderNewProposalModal()}
            {renderProposalDetailModal()}
        </div>
    );
};

export default ProposalWorkspace;
