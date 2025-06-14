import React, { useState, useEffect } from 'react';
import {
    FiFileText, FiUpload, FiTrash2, FiEdit2, FiEye,
    FiDownload, FiPlus, FiSearch, FiFilter, FiMenu,
    FiChevronDown, FiCheck, FiX, FiAlertTriangle,
    FiClock, FiFolder, FiTag, FiUsers
} from 'react-icons/fi';
import { toast } from 'react-toastify';

// Sample data for templates
const sampleTemplates = [
    {
        id: 1,
        title: 'Template Proposal Pengadaan Barang',
        category: 'Pengadaan',
        department: 'Umum',
        version: '2.1',
        lastUpdated: '2025-03-12',
        fileType: 'docx',
        fileSize: '285 KB',
        isDefault: true,
        downloads: 187
    },
    {
        id: 2,
        title: 'Template Proposal Kegiatan Mahasiswa',
        category: 'Kegiatan',
        department: 'Kemahasiswaan',
        version: '1.3',
        lastUpdated: '2025-02-28',
        fileType: 'docx',
        fileSize: '210 KB',
        isDefault: false,
        downloads: 154
    },
    {
        id: 3,
        title: 'Template Proposal Penelitian',
        category: 'Penelitian',
        department: 'LPPM',
        version: '3.0',
        lastUpdated: '2025-01-15',
        fileType: 'docx',
        fileSize: '320 KB',
        isDefault: false,
        downloads: 205
    },
    {
        id: 4,
        title: 'Template Proposal Pengabdian Masyarakat',
        category: 'Pengabdian',
        department: 'LPPM',
        version: '1.8',
        lastUpdated: '2025-02-10',
        fileType: 'docx',
        fileSize: '275 KB',
        isDefault: false,
        downloads: 112
    },
    {
        id: 5,
        title: 'Template Proposal Kerjasama Industri',
        category: 'Kerjasama',
        department: 'Humas',
        version: '2.2',
        lastUpdated: '2025-03-01',
        fileType: 'docx',
        fileSize: '295 KB',
        isDefault: false,
        downloads: 98
    }
];

// Sample data for categories/departments
const categories = ['Pengadaan', 'Kegiatan', 'Penelitian', 'Pengabdian', 'Kerjasama', 'Workshop', 'Seminar'];
const departments = ['Umum', 'Kemahasiswaan', 'LPPM', 'Humas', 'Teknik Informatika', 'Teknik Elektro', 'Akuntansi'];

const TemplateProposalPage = () => {
    // State management
    const [templates, setTemplates] = useState(sampleTemplates);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [newTemplate, setNewTemplate] = useState({
        title: '',
        category: 'Pengadaan',
        department: 'Umum',
        version: '1.0',
        file: null,
        isDefault: false
    });
    const [isEditMode, setIsEditMode] = useState(false);

    // Filtered templates based on search and filters
    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !filterCategory || template.category === filterCategory;
        const matchesDepartment = !filterDepartment || template.department === filterDepartment;
        return matchesSearch && matchesCategory && matchesDepartment;
    });

    // AOS initialization
    useEffect(() => {
        // Initialize AOS
        if (typeof window !== 'undefined') {
            const AOS = require('aos');
            AOS.init({
                duration: 600,
                easing: 'ease-out',
                once: false,
            });
            AOS.refresh();
        }
    }, []);

    // Reset form when modal is closed
    useEffect(() => {
        if (!showAddModal) {
            setNewTemplate({
                title: '',
                category: 'Pengadaan',
                department: 'Umum',
                version: '1.0',
                file: null,
                isDefault: false
            });
            setIsEditMode(false);
        }
    }, [showAddModal]);

    // Handle adding/editing template
    const handleSaveTemplate = () => {
        if (!newTemplate.title.trim()) {
            toast.error('Judul template tidak boleh kosong');
            return;
        }

        if (!isEditMode && !newTemplate.file) {
            toast.error('File template harus diunggah');
            return;
        }

        if (isEditMode) {
            // Update existing template
            const updatedTemplates = templates.map(template =>
                template.id === selectedTemplate.id
                    ? {
                        ...template,
                        title: newTemplate.title,
                        category: newTemplate.category,
                        department: newTemplate.department,
                        version: newTemplate.version,
                        isDefault: newTemplate.isDefault,
                        lastUpdated: new Date().toISOString().split('T')[0]
                    }
                    : newTemplate.isDefault && template.id !== selectedTemplate.id
                        ? { ...template, isDefault: false }
                        : template
            );
            setTemplates(updatedTemplates);
            toast.success('Template berhasil diperbarui');
        } else {
            // Add new template
            const newId = Math.max(...templates.map(t => t.id)) + 1;

            // If new template is set as default, update other templates
            let updatedTemplates = templates;
            if (newTemplate.isDefault) {
                updatedTemplates = templates.map(template => ({
                    ...template,
                    isDefault: false
                }));
            }

            setTemplates([
                ...updatedTemplates,
                {
                    id: newId,
                    title: newTemplate.title,
                    category: newTemplate.category,
                    department: newTemplate.department,
                    version: newTemplate.version,
                    lastUpdated: new Date().toISOString().split('T')[0],
                    fileType: newTemplate.file ? newTemplate.file.name.split('.').pop() : 'docx',
                    fileSize: newTemplate.file ? `${Math.round(newTemplate.file.size / 1024)} KB` : '250 KB',
                    isDefault: newTemplate.isDefault,
                    downloads: 0
                }
            ]);
            toast.success('Template berhasil ditambahkan');
        }

        setShowAddModal(false);
    };

    // Handle template edit
    const handleEditTemplate = (template) => {
        setSelectedTemplate(template);
        setNewTemplate({
            title: template.title,
            category: template.category,
            department: template.department,
            version: template.version,
            isDefault: template.isDefault,
            file: null
        });
        setIsEditMode(true);
        setShowAddModal(true);
    };

    // Handle template preview
    const handlePreviewTemplate = (template) => {
        setSelectedTemplate(template);
        setShowPreviewModal(true);
    };

    // Handle delete confirmation
    const handleDeleteConfirm = (template) => {
        setSelectedTemplate(template);
        setShowDeleteConfirm(true);
    };

    // Handle template deletion
    const handleDeleteTemplate = () => {
        setTemplates(templates.filter(template => template.id !== selectedTemplate.id));
        setShowDeleteConfirm(false);
        toast.success('Template berhasil dihapus');
    };

    // Handle set as default template
    const handleSetDefault = (templateId) => {
        const updatedTemplates = templates.map(template => ({
            ...template,
            isDefault: template.id === templateId
        }));
        setTemplates(updatedTemplates);
        toast.success('Template default berhasil diubah');
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file type
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (!['doc', 'docx', 'pdf'].includes(fileExtension)) {
                toast.error('Format file tidak didukung. Gunakan .doc, .docx, atau .pdf');
                return;
            }

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Ukuran file terlalu besar. Maksimal 5MB');
                return;
            }

            setNewTemplate({ ...newTemplate, file: file });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10 bg-white rounded-2xl shadow-sm p-6 border border-gray-100" data-aos="fade-down">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                        Manajemen Template Proposal
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Kelola template proposal yang akan digunakan sebagai standar format di Politeknik Negeri Manado
                    </p>
                </div>

                {/* Controls */}
                <div className="mb-8 bg-white rounded-2xl shadow-sm p-5 border border-gray-100" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex flex-col md:flex-row gap-3 md:items-center flex-1">
                            <div className="relative flex-1 max-w-md">
                                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari template..."
                                    className="pl-11 pr-4 py-3 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3 flex-1 md:flex-none">
                                <div className="relative flex-1 md:flex-none">
                                    <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <select
                                        className="pl-9 pr-8 py-3 appearance-none border border-gray-200 rounded-xl bg-white w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                    >
                                        <option value="">Semua Kategori</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="relative flex-1 md:flex-none">
                                    <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <select
                                        className="pl-9 pr-8 py-3 appearance-none border border-gray-200 rounded-xl bg-white w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        value={filterDepartment}
                                        onChange={(e) => setFilterDepartment(e.target.value)}
                                    >
                                        <option value="">Semua Departemen</option>
                                        {departments.map((department, index) => (
                                            <option key={index} value={department}>{department}</option>
                                        ))}
                                    </select>
                                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        <button
                            className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl hover:from-indigo-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            onClick={() => setShowAddModal(true)}
                        >
                            <FiPlus className="mr-2" /> Tambah Template
                        </button>
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.length === 0 ? (
                        <div className="col-span-full p-10 bg-white rounded-2xl shadow-sm text-center border border-gray-100" data-aos="fade-up">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <FiAlertTriangle className="text-3xl text-yellow-500" />
                            </div>
                            <p className="text-gray-500 text-lg">Tidak ada template yang ditemukan</p>
                            <p className="text-gray-400 text-sm mt-2">Coba ubah filter atau tambahkan template baru</p>
                        </div>
                    ) : (
                        filteredTemplates.map((template, index) => (
                            <div
                                key={template.id}
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                data-aos="fade-up"
                                data-aos-delay={100 + index * 50}
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center ${template.isDefault ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                            {template.isDefault ? (
                                                <>
                                                    <FiCheck className="mr-1" /> Template Default
                                                </>
                                            ) : 'Template'}
                                        </div>
                                        <div className="flex space-x-1">
                                            <button
                                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                                onClick={() => handleEditTemplate(template)}
                                                title="Edit template"
                                            >
                                                <FiEdit2 className="text-gray-500" />
                                            </button>
                                            <button
                                                className="p-2 rounded-full hover:bg-red-50 transition-colors"
                                                onClick={() => handleDeleteConfirm(template)}
                                                title="Hapus template"
                                            >
                                                <FiTrash2 className="text-red-500" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                                            <FiFileText className="text-indigo-600" />
                                        </div>
                                        <h3 className="font-bold text-gray-800 truncate flex-1">{template.title}</h3>
                                    </div>

                                    <div className="flex items-center mb-4">
                                        <span className="text-xs font-semibold uppercase bg-gray-100 text-gray-600 rounded-md px-2 py-1 mr-2">
                                            {template.fileType}
                                        </span>
                                        <span className="text-xs text-gray-500">{template.fileSize}</span>
                                        <div className="ml-auto flex items-center text-xs text-gray-500">
                                            <FiDownload className="mr-1 text-gray-400" />
                                            <span>{template.downloads}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-2 mb-5">
                                        <div className="flex items-center text-sm">
                                            <FiTag className="text-gray-400 mr-2" />
                                            <span className="text-gray-700">{template.category}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <FiUsers className="text-gray-400 mr-2" />
                                            <span className="text-gray-700">{template.department}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <FiMenu className="text-gray-400 mr-2" />
                                            <span className="text-gray-700">v{template.version}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <FiClock className="text-gray-400 mr-2" />
                                            <span className="text-gray-700">{new Date(template.lastUpdated).toLocaleDateString('id-ID')}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            className="inline-flex justify-center items-center px-3 py-2.5 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                            onClick={() => handlePreviewTemplate(template)}
                                        >
                                            <FiEye className="mr-2" /> Preview
                                        </button>
                                        <button className="inline-flex justify-center items-center px-3 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all">
                                            <FiDownload className="mr-2" /> Unduh
                                        </button>
                                        {!template.isDefault && (
                                            <button
                                                className="col-span-2 mt-2 inline-flex justify-center items-center px-3 py-2.5 border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                                onClick={() => handleSetDefault(template.id)}
                                            >
                                                <FiCheck className="mr-2" /> Jadikan Template Default
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Add/Edit Template Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                            </div>

                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                            <div
                                className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                data-aos="zoom-in"
                                data-aos-duration="300"
                            >
                                <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                            {isEditMode ? <FiEdit2 className="text-white" /> : <FiPlus className="text-white" />}
                                        </div>
                                        <h3 className="ml-3 text-lg font-medium text-white">
                                            {isEditMode ? 'Edit Template' : 'Tambah Template Baru'}
                                        </h3>
                                        <button
                                            className="ml-auto rounded-full p-1 text-white hover:bg-white hover:bg-opacity-20 transition-colors"
                                            onClick={() => setShowAddModal(false)}
                                        >
                                            <FiX />
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-white px-6 py-6">
                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                                Judul Template
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                                placeholder="Masukkan judul template"
                                                value={newTemplate.title}
                                                onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Kategori
                                                </label>
                                                <div className="relative">
                                                    <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <select
                                                        id="category"
                                                        className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all"
                                                        value={newTemplate.category}
                                                        onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                                                    >
                                                        {categories.map((category, index) => (
                                                            <option key={index} value={category}>{category}</option>
                                                        ))}
                                                    </select>
                                                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Departemen
                                                </label>
                                                <div className="relative">
                                                    <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <select
                                                        id="department"
                                                        className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all"
                                                        value={newTemplate.department}
                                                        onChange={(e) => setNewTemplate({ ...newTemplate, department: e.target.value })}
                                                    >
                                                        {departments.map((department, index) => (
                                                            <option key={index} value={department}>{department}</option>
                                                        ))}
                                                    </select>
                                                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Versi
                                                </label>
                                                <div className="relative">
                                                    <FiMenu className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        id="version"
                                                        className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                                        placeholder="1.0"
                                                        value={newTemplate.version}
                                                        onChange={(e) => setNewTemplate({ ...newTemplate, version: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                                                    File Template
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        className="sr-only"
                                                        accept=".doc,.docx,.pdf"
                                                        onChange={handleFileChange}
                                                    />
                                                    <label
                                                        htmlFor="file"
                                                        className="w-full cursor-pointer inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                                    >
                                                        <FiUpload className="mr-2" />
                                                        {newTemplate.file ? `${newTemplate.file.name.substring(0, 15)}...` : 'Pilih file'}
                                                    </label>
                                                </div>
                                                <p className="mt-1.5 text-xs text-gray-500">Format: .doc, .docx, atau .pdf (max 5MB)</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center pt-2">
                                            <div className="relative inline-block w-10 mr-2 align-middle">
                                                <input
                                                    id="isDefault"
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={newTemplate.isDefault}
                                                    onChange={(e) => setNewTemplate({ ...newTemplate, isDefault: e.target.checked })}
                                                />
                                                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-300 transition-colors"></div>
                                                <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-all peer-checked:left-5"></div>
                                            </div>
                                            <label htmlFor="isDefault" className="text-sm text-gray-700">
                                                Jadikan sebagai template default
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        className="px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="button"
                                        className="px-5 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none transition-all"
                                        onClick={handleSaveTemplate}
                                    >
                                        {isEditMode ? 'Simpan Perubahan' : 'Tambah Template'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Preview Modal */}
                {showPreviewModal && selectedTemplate && (
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                            </div>

                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                            <div
                                className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
                                data-aos="zoom-in"
                                data-aos-duration="300"
                            >
                                <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                            <FiEye className="text-white" />
                                        </div>
                                        <h3 className="ml-3 text-lg font-medium text-white truncate max-w-md">
                                            {selectedTemplate.title}
                                        </h3>
                                        <button
                                            className="ml-auto rounded-full p-1 text-white hover:bg-white hover:bg-opacity-20 transition-colors"
                                            onClick={() => setShowPreviewModal(false)}
                                        >
                                            <FiX />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="mb-4 grid grid-cols-3 gap-4 text-sm">
                                        <div className="bg-gray-50 p-3 rounded-xl">
                                            <div className="text-gray-500 mb-1 flex items-center">
                                                <FiTag className="mr-1" /> Kategori
                                            </div>
                                            <div className="font-medium">{selectedTemplate.category}</div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-xl">
                                            <div className="text-gray-500 mb-1 flex items-center">
                                                <FiUsers className="mr-1" /> Departemen
                                            </div>
                                            <div className="font-medium">{selectedTemplate.department}</div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-xl">
                                            <div className="text-gray-500 mb-1 flex items-center">
                                                <FiMenu className="mr-1" /> Versi
                                            </div>
                                            <div className="font-medium">{selectedTemplate.version}</div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-6 h-96 overflow-auto">
                                        {/* Preview placeholder */}
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <div className="bg-white p-4 rounded-xl shadow-sm mb-4 inline-flex items-center justify-center">
                                                <FiFileText className="text-6xl text-indigo-500" />
                                            </div>
                                            <p className="text-gray-800 font-medium mb-2">Preview Dokumen {selectedTemplate.fileType.toUpperCase()}</p>
                                            <p className="text-sm text-gray-500 max-w-md text-center">
                                                Ini adalah tampilan preview template proposal. Pada implementasi sebenarnya, ini akan menampilkan dokumen menggunakan komponen viewer yang sesuai.
                                            </p>
                                            <button className="mt-6 inline-flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                                <FiEye className="mr-2" /> Tampilkan Dokumen Lengkap
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100">
                                    <div className="flex items-center text-sm">
                                        <div className="flex items-center text-gray-500 mr-4">
                                            <FiClock className="mr-1" /> Diperbarui: {new Date(selectedTemplate.lastUpdated).toLocaleDateString('id-ID')}
                                        </div>
                                        <div className="flex items-center text-gray-500">
                                            <FiDownload className="mr-1" /> {selectedTemplate.downloads} unduhan
                                        </div>
                                    </div>
                                    <button className="inline-flex items-center px-5 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all">
                                        <FiDownload className="mr-2" /> Unduh Template
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && selectedTemplate && (
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                            </div>

                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                            <div
                                className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                data-aos="zoom-in"
                                data-aos-duration="300"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-center mb-5">
                                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
                                            <FiAlertTriangle className="text-3xl text-red-600" />
                                        </div>
                                    </div>
                                    <div className="text-center mb-5">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            Hapus Template
                                        </h3>
                                        <p className="text-gray-500">
                                            Apakah Anda yakin ingin menghapus template "{selectedTemplate.title}"? <br />
                                            <span className="font-medium text-red-500">Tindakan ini tidak dapat dibatalkan.</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-6 py-4 flex space-x-3 justify-center border-t border-gray-100">
                                    <button
                                        type="button"
                                        className="px-5 py-2.5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                        onClick={() => setShowDeleteConfirm(false)}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="button"
                                        className="px-5 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all"
                                        onClick={handleDeleteTemplate}
                                    >
                                        Hapus Template
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TemplateProposalPage;
