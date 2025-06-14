import React, { useState, useEffect } from 'react';
import {
    MdSearch, MdFilterList, MdAdd, MdCheck, MdClose, MdDelete, MdEdit,
    MdFileUpload, MdHistory, MdSave, MdCancel, MdDescription,
    MdSort, MdArrowBack, MdAttachFile, MdPerson, MdDateRange,
    MdAssignment, MdLabel, MdKeyboardArrowDown, MdFileDownload,
    MdVisibility, MdInfo, MdAccessTime, MdCheckCircle
} from 'react-icons/md';

const DecisionDocumentation = () => {
    const [decisions, setDecisions] = useState([]);
    const [filteredDecisions, setFilteredDecisions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');
    const [showNewDecisionForm, setShowNewDecisionForm] = useState(false);
    const [showDetailView, setShowDetailView] = useState(false);
    const [selectedDecision, setSelectedDecision] = useState(null);
    const [formExpanded, setFormExpanded] = useState({});

    // New decision form state
    const [newDecision, setNewDecision] = useState({
        title: '',
        proposalId: '',
        proposalTitle: '',
        decisionType: 'approval',
        status: 'draft',
        reasoning: '',
        considerations: '',
        conditions: '',
        attachments: []
    });

    // Fetch dummy data on component mount
    useEffect(() => {
        // In a real application, this would be an API call
        const dummyDecisions = [
            {
                id: 'dec-001',
                title: 'Approval for IoT Network Security Research',
                proposalId: 'PROP-2025-0042',
                proposalTitle: 'Pengembangan Sistem Keamanan Jaringan IoT Menggunakan Blockchain',
                author: 'Dr. Budi Santoso',
                department: 'Teknik Informatika',
                decisionType: 'approval',
                status: 'final',
                reasoning: 'Proposal menunjukkan metodologi yang kuat dengan kontribusi signifikan pada bidang keamanan IoT. Tujuan penelitian jelas dan dapat dicapai dalam waktu yang ditentukan.',
                considerations: 'Kekuatan proposal terletak pada kombinasi teknologi blockchain dengan keamanan IoT, yang merupakan area penelitian yang sedang berkembang pesat.',
                conditions: 'Persetujuan diberikan dengan catatan perlu pelaporan berkala setiap dua bulan tentang kemajuan implementasi sistem blockchain.',
                attachments: [
                    { name: 'Lembar_Evaluasi.pdf', size: '2.3 MB', url: '#' },
                    { name: 'Catatan_Reviewer.docx', size: '512 KB', url: '#' }
                ],
                date: '2025-04-15',
                reviewer: 'Prof. Ahmad Wijaya'
            },
            {
                id: 'dec-002',
                title: 'Revisi untuk Penelitian Pembelajaran Jarak Jauh',
                proposalId: 'PROP-2025-0039',
                proposalTitle: 'Analisis Efektivitas Pembelajaran Jarak Jauh pada Mahasiswa Teknik',
                author: 'Dr. Siti Rahayu',
                department: 'Teknik Elektro',
                decisionType: 'revision',
                status: 'final',
                reasoning: 'Proposal memiliki ide yang baik namun metodologi pengumpulan data perlu diperkuat. Analisis statistik yang diusulkan tidak cukup komprehensif.',
                considerations: 'Topik penelitian sangat relevan dengan situasi pendidikan saat ini, tetapi perlu penyempurnaan dalam metode penelitian.',
                conditions: 'Penulis diminta untuk merevisi bagian metodologi dan menambahkan detail tentang teknik analisis data yang akan digunakan.',
                attachments: [
                    { name: 'Formulir_Revisi.pdf', size: '1.8 MB', url: '#' }
                ],
                date: '2025-04-12',
                reviewer: 'Prof. Ahmad Wijaya'
            },
            {
                id: 'dec-003',
                title: 'Penolakan Proposal Energi Terbarukan',
                proposalId: 'PROP-2025-0037',
                proposalTitle: 'Implementasi Energi Surya di Kampus Politeknik',
                author: 'Dr. Hadi Wijaya',
                department: 'Teknik Mesin',
                decisionType: 'rejection',
                status: 'final',
                reasoning: 'Proposal tidak menunjukkan kebaruan yang cukup. Usulan implementasi terlalu umum dan sudah banyak diimplementasikan di tempat lain.',
                considerations: 'Meskipun energi terbarukan adalah topik penting, proposal tidak menawarkan pendekatan inovatif atau solusi baru.',
                conditions: 'Penulis disarankan untuk mengembangkan aspek inovasi dan menyusun proposal baru di masa depan.',
                attachments: [
                    { name: 'Evaluasi_Penolakan.pdf', size: '1.5 MB', url: '#' },
                    { name: 'Saran_Perbaikan.docx', size: '450 KB', url: '#' }
                ],
                date: '2025-04-08',
                reviewer: 'Prof. Ahmad Wijaya'
            },
            {
                id: 'dec-004',
                title: 'Persetujuan Bersyarat untuk Riset AI',
                proposalId: 'PROP-2025-0045',
                proposalTitle: 'Pengembangan Model AI untuk Prediksi Keberhasilan Akademik',
                author: 'Dr. Diana Putri',
                department: 'Teknik Informatika',
                decisionType: 'conditional',
                status: 'draft',
                reasoning: 'Proposal memiliki metodologi yang kuat dan potensi dampak yang signifikan. Namun, aspek etika penggunaan data mahasiswa perlu lebih diperhatikan.',
                considerations: 'Penggunaan AI untuk prediksi akademik adalah area penelitian yang menjanjikan, tetapi harus mempertimbangkan privasi data.',
                conditions: 'Peneliti harus mendapatkan persetujuan etik dari komite etik kampus dan menjamin anonimitas data mahasiswa.',
                attachments: [
                    { name: 'Persetujuan_Bersyarat.pdf', size: '2.1 MB', url: '#' }
                ],
                date: '2025-04-18',
                reviewer: 'Prof. Ahmad Wijaya'
            }
        ];

        setDecisions(dummyDecisions);
        setFilteredDecisions(dummyDecisions);
    }, []);

    // Filter decisions based on search, type, and status
    useEffect(() => {
        let filtered = decisions;

        if (searchQuery) {
            filtered = filtered.filter(
                decision =>
                    decision.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    decision.proposalTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    decision.proposalId.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterType !== 'all') {
            filtered = filtered.filter(decision => decision.decisionType === filterType);
        }

        if (filterStatus !== 'all') {
            filtered = filtered.filter(decision => decision.status === filterStatus);
        }

        // Sort decisions
        filtered = [...filtered].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        setFilteredDecisions(filtered);
    }, [searchQuery, filterType, filterStatus, sortOrder, decisions]);

    const handleNewDecisionChange = (e) => {
        const { name, value } = e.target;
        setNewDecision(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddAttachment = (e) => {
        if (e.target.files.length > 0) {
            const newAttachments = Array.from(e.target.files).map(file => ({
                name: file.name,
                size: `${Math.round(file.size / 1024)} KB`,
                url: '#'
            }));

            setNewDecision(prev => ({
                ...prev,
                attachments: [...prev.attachments, ...newAttachments]
            }));
        }
    };

    const handleRemoveAttachment = (index) => {
        setNewDecision(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    const toggleSectionExpand = (section) => {
        setFormExpanded(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleSubmitDecision = (status) => {
        const currentDate = new Date().toISOString().split('T')[0];
        const newDecisionItem = {
            ...newDecision,
            id: `dec-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
            status,
            date: currentDate,
            reviewer: 'Prof. Ahmad Wijaya' // This would come from auth context in a real app
        };

        setDecisions(prev => [newDecisionItem, ...prev]);
        setShowNewDecisionForm(false);

        // Reset the form
        setNewDecision({
            title: '',
            proposalId: '',
            proposalTitle: '',
            decisionType: 'approval',
            status: 'draft',
            reasoning: '',
            considerations: '',
            conditions: '',
            attachments: []
        });

        // Clear expanded sections
        setFormExpanded({});
    };

    const handleViewDecision = (decision) => {
        setSelectedDecision(decision);
        setShowDetailView(true);
    };

    const getDecisionTypeBadge = (type) => {
        switch (type) {
            case 'approval':
                return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center"><MdCheck className="mr-1" /> Approval</span>;
            case 'rejection':
                return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center"><MdClose className="mr-1" /> Rejection</span>;
            case 'revision':
                return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center"><MdEdit className="mr-1" /> Revision</span>;
            case 'conditional':
                return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center"><MdInfo className="mr-1" /> Conditional</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Unknown</span>;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'draft':
                return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center"><MdAccessTime className="mr-1" /> Draft</span>;
            case 'final':
                return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center"><MdCheckCircle className="mr-1" /> Final</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Unknown</span>;
        }
    };

    // Main content view (decision list or new decision form or detail view)
    const renderMainContent = () => {
        if (showDetailView && selectedDecision) {
            return (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <button
                        onClick={() => setShowDetailView(false)}
                        className="text-blue-600 hover:underline flex items-center mb-6"
                    >
                        <MdArrowBack className="mr-1" /> Back to Decisions
                    </button>

                    <div className="border-b border-gray-200 pb-4 mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">{selectedDecision.title}</h2>
                            <div className="flex gap-2">
                                {getDecisionTypeBadge(selectedDecision.decisionType)}
                                {getStatusBadge(selectedDecision.status)}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-gray-500">Proposal ID</p>
                                <p className="text-gray-700 font-medium">{selectedDecision.proposalId}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Decision Date</p>
                                <p className="text-gray-700">{selectedDecision.date}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-500">Proposal Title</p>
                                <p className="text-gray-700">{selectedDecision.proposalTitle}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Author</p>
                                <p className="text-gray-700">{selectedDecision.author}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Department</p>
                                <p className="text-gray-700">{selectedDecision.department}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-500">Reviewer</p>
                                <p className="text-gray-700">{selectedDecision.reviewer}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Decision Reasoning</h3>
                            <p className="text-gray-700">{selectedDecision.reasoning}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Considerations</h3>
                            <p className="text-gray-700">{selectedDecision.considerations}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Conditions & Requirements</h3>
                            <p className="text-gray-700">{selectedDecision.conditions}</p>
                        </div>

                        {selectedDecision.attachments.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Supporting Documents</h3>
                                <div className="space-y-2">
                                    {selectedDecision.attachments.map((file, index) => (
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
                        )}

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            {selectedDecision.status === 'draft' ? (
                                <>
                                    <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 flex items-center">
                                        <MdDelete className="mr-2" /> Delete
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                                        <MdEdit className="mr-2" /> Edit
                                    </button>
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                                        <MdCheck className="mr-2" /> Finalize
                                    </button>
                                </>
                            ) : (
                                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                                    <MdFileDownload className="mr-2" /> Export as PDF
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        if (showNewDecisionForm) {
            return (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">New Decision Documentation</h2>
                        <button
                            onClick={() => setShowNewDecisionForm(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <MdCancel className="text-xl" />
                        </button>
                    </div>

                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                                    Decision Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newDecision.title}
                                    onChange={handleNewDecisionChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter a descriptive title for this decision"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="proposalId">
                                    Proposal ID
                                </label>
                                <input
                                    type="text"
                                    id="proposalId"
                                    name="proposalId"
                                    value={newDecision.proposalId}
                                    onChange={handleNewDecisionChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. PROP-2025-0042"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="decisionType">
                                    Decision Type
                                </label>
                                <select
                                    id="decisionType"
                                    name="decisionType"
                                    value={newDecision.decisionType}
                                    onChange={handleNewDecisionChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="approval">Approval</option>
                                    <option value="rejection">Rejection</option>
                                    <option value="revision">Revision Required</option>
                                    <option value="conditional">Conditional Approval</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="proposalTitle">
                                    Proposal Title
                                </label>
                                <input
                                    type="text"
                                    id="proposalTitle"
                                    name="proposalTitle"
                                    value={newDecision.proposalTitle}
                                    onChange={handleNewDecisionChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter the title of the proposal"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div
                                    className="bg-gray-50 p-3 flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSectionExpand('reasoning')}
                                >
                                    <h3 className="font-medium text-gray-700">Decision Reasoning</h3>
                                    <MdKeyboardArrowDown className={`text-gray-500 transform transition-transform ${formExpanded.reasoning ? 'rotate-180' : ''}`} />
                                </div>
                                {(formExpanded.reasoning || newDecision.reasoning) && (
                                    <div className="p-3">
                                        <textarea
                                            name="reasoning"
                                            value={newDecision.reasoning}
                                            onChange={handleNewDecisionChange}
                                            rows={4}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Provide a detailed explanation for your decision..."
                                        ></textarea>
                                    </div>
                                )}
                            </div>

                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div
                                    className="bg-gray-50 p-3 flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSectionExpand('considerations')}
                                >
                                    <h3 className="font-medium text-gray-700">Key Considerations</h3>
                                    <MdKeyboardArrowDown className={`text-gray-500 transform transition-transform ${formExpanded.considerations ? 'rotate-180' : ''}`} />
                                </div>
                                {(formExpanded.considerations || newDecision.considerations) && (
                                    <div className="p-3">
                                        <textarea
                                            name="considerations"
                                            value={newDecision.considerations}
                                            onChange={handleNewDecisionChange}
                                            rows={3}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="List the key factors that influenced your decision..."
                                        ></textarea>
                                    </div>
                                )}
                            </div>

                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div
                                    className="bg-gray-50 p-3 flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSectionExpand('conditions')}
                                >
                                    <h3 className="font-medium text-gray-700">Conditions & Requirements</h3>
                                    <MdKeyboardArrowDown className={`text-gray-500 transform transition-transform ${formExpanded.conditions ? 'rotate-180' : ''}`} />
                                </div>
                                {(formExpanded.conditions || newDecision.conditions) && (
                                    <div className="p-3">
                                        <textarea
                                            name="conditions"
                                            value={newDecision.conditions}
                                            onChange={handleNewDecisionChange}
                                            rows={3}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Specify any conditions or requirements for approval or revision..."
                                        ></textarea>
                                    </div>
                                )}
                            </div>

                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div
                                    className="bg-gray-50 p-3 flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSectionExpand('attachments')}
                                >
                                    <h3 className="font-medium text-gray-700">Supporting Documents</h3>
                                    <MdKeyboardArrowDown className={`text-gray-500 transform transition-transform ${formExpanded.attachments ? 'rotate-180' : ''}`} />
                                </div>
                                {(formExpanded.attachments || newDecision.attachments.length > 0) && (
                                    <div className="p-3">
                                        <div className="mb-3">
                                            <label className="block text-sm text-gray-500 mb-2">Upload files to support your decision:</label>
                                            <div className="flex items-center">
                                                <label className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 flex items-center">
                                                    <MdFileUpload className="mr-1" /> Upload Files
                                                    <input
                                                        type="file"
                                                        multiple
                                                        className="hidden"
                                                        onChange={handleAddAttachment}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        {newDecision.attachments.length > 0 && (
                                            <div className="space-y-2">
                                                {newDecision.attachments.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                                                        <div className="flex items-center">
                                                            <MdAttachFile className="text-gray-500 mr-1" />
                                                            <span className="text-gray-700 text-sm">{file.name}</span>
                                                            <span className="text-gray-500 text-xs ml-2">({file.size})</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveAttachment(index)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => setShowNewDecisionForm(false)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
                            >
                                <MdCancel className="mr-2" /> Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSubmitDecision('draft')}
                                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center"
                            >
                                <MdSave className="mr-2" /> Save as Draft
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSubmitDecision('final')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                            >
                                <MdCheck className="mr-2" /> Submit Final Decision
                            </button>
                        </div>
                    </form>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Decision Documentation</h1>
                        <button
                            onClick={() => setShowNewDecisionForm(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                        >
                            <MdAdd className="mr-2" /> New Decision
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search decisions..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <MdSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center">
                                <MdFilterList className="text-gray-500 mr-1" />
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Types</option>
                                    <option value="approval">Approval</option>
                                    <option value="rejection">Rejection</option>
                                    <option value="revision">Revision</option>
                                    <option value="conditional">Conditional</option>
                                </select>
                            </div>

                            <div className="flex items-center">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="draft">Draft</option>
                                    <option value="final">Final</option>
                                </select>
                            </div>

                            <div className="flex items-center">
                                <MdSort className="text-gray-500 mr-1" />
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {filteredDecisions.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <MdDescription className="mx-auto text-gray-400 text-5xl mb-2" />
                            <h3 className="text-lg font-medium text-gray-500 mb-1">No decisions found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredDecisions.map((decision) => (
                                <div
                                    key={decision.id}
                                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4"
                                >
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                                        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">{decision.title}</h2>
                                        <div className="flex items-center gap-2">
                                            {getDecisionTypeBadge(decision.decisionType)}
                                            {getStatusBadge(decision.status)}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                                        <div className="flex items-center text-sm">
                                            <MdAssignment className="text-gray-500 mr-1" />
                                            <span className="text-gray-700">{decision.proposalId}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <MdPerson className="text-gray-500 mr-1" />
                                            <span className="text-gray-700">{decision.author}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <MdDateRange className="text-gray-500 mr-1" />
                                            <span className="text-gray-700">{decision.date}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-4 line-clamp-2">{decision.reasoning}</p>

                                    {decision.attachments.length > 0 && (
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            <MdAttachFile className="text-gray-500" />
                                            <span className="text-sm text-gray-500">{decision.attachments.length} attachment(s)</span>
                                        </div>
                                    )}

                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleViewDecision(decision)}
                                            className="px-3 py-1.5 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 flex items-center text-sm"
                                        >
                                            <MdVisibility className="mr-1" /> View Details
                                        </button>

                                        {decision.status === 'draft' && (
                                            <button className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center text-sm">
                                                <MdEdit className="mr-1" /> Edit
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Main component return
    return (
        <div className="bg-gray-50 min-h-screen p-4">
            <div className="max-w-7xl mx-auto">
                {renderMainContent()}
            </div>
        </div>
    );
};

export default DecisionDocumentation;
