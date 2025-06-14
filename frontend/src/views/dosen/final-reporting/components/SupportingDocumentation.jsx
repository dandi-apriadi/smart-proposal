import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    MdCloudUpload,
    MdDelete,
    MdFileDownload,
    MdVisibility,
    MdCheckCircle,
    MdError,
    MdWarning,
    MdInfoOutline,
    MdAddCircleOutline,
    MdFilterList,
    MdSort,
    MdAttachFile
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SupportingDocumentation = () => {
    const [dragActive, setDragActive] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [selectedDocType, setSelectedDocType] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState('dateDesc');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [previewDocument, setPreviewDocument] = useState(null);
    const { baseURL } = useSelector((state) => state.auth);

    // Document types with required/optional status
    const documentTypes = [
        { id: 'main-report', name: 'Laporan Akhir Penelitian', required: true, description: 'Dokumen utama hasil penelitian' },
        { id: 'completion-form', name: 'Formulir Penyelesaian', required: true, description: 'Formulir yang menyatakan penelitian telah selesai' },
        { id: 'publication', name: 'Bukti Publikasi', required: true, description: 'Bukti penelitian telah dipublikasikan' },
        { id: 'visual-doc', name: 'Dokumentasi Visual', required: false, description: 'Foto atau video hasil penelitian' },
        { id: 'supporting-data', name: 'Data Pendukung', required: false, description: 'Data tambahan yang mendukung hasil penelitian' }
    ];

    // Sample documents for demonstration
    const sampleDocuments = [
        {
            id: 1,
            name: 'Laporan_Akhir_Penelitian_2025.pdf',
            type: 'main-report',
            size: '4.2 MB',
            format: 'application/pdf',
            uploadDate: '2025-09-15T09:30:00Z',
            status: 'verified',
            notes: 'Dokumen telah diverifikasi dan diterima'
        },
        {
            id: 2,
            name: 'Form_Penyelesaian_Rev2.docx',
            type: 'completion-form',
            size: '1.8 MB',
            format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            uploadDate: '2025-09-10T14:20:00Z',
            status: 'rejected',
            notes: 'Tanda tangan ketua peneliti tidak ada'
        },
        {
            id: 3,
            name: 'Jurnal_Publikasi_IEEE.pdf',
            type: 'publication',
            size: '3.5 MB',
            format: 'application/pdf',
            uploadDate: '2025-09-12T11:45:00Z',
            status: 'processing',
            notes: 'Sedang dalam proses verifikasi'
        },
        {
            id: 4,
            name: 'Dokumentasi_Foto_Penelitian.zip',
            type: 'visual-doc',
            size: '12.7 MB',
            format: 'application/zip',
            uploadDate: '2025-09-08T16:30:00Z',
            status: 'verified',
            notes: 'Dokumentasi lengkap dan terverifikasi'
        }
    ];

    useEffect(() => {
        // Initialize AOS animation library
        AOS.init({
            duration: 800,
            once: true
        });

        // Load sample documents for demonstration
        setDocuments(sampleDocuments);
    }, []);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (files) => {
        // In a real application, you would upload these files to a server
        // For this demo, we'll just add them to our local state
        const newDocuments = Array.from(files).map((file, index) => ({
            id: Date.now() + index,
            name: file.name,
            type: selectedDocType || 'supporting-data',
            size: formatFileSize(file.size),
            format: file.type,
            uploadDate: new Date().toISOString(),
            status: 'processing',
            notes: 'Dokumen baru diunggah, menunggu verifikasi'
        }));

        setDocuments([...documents, ...newDocuments]);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getDocumentTypeById = (typeId) => {
        return documentTypes.find(type => type.id === typeId) || { name: 'Lainnya' };
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'verified':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'verified':
                return <MdCheckCircle className="text-green-500" />;
            case 'rejected':
                return <MdError className="text-red-500" />;
            case 'processing':
                return <MdWarning className="text-yellow-500" />;
            default:
                return <MdInfoOutline className="text-gray-500" />;
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setShowFilterMenu(false);
    };

    const handleSortChange = (sortOption) => {
        setSortBy(sortOption);
        setShowSortMenu(false);
    };

    const handleDeleteDocument = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    const handlePreviewDocument = (document) => {
        setPreviewDocument(document);
    };

    const closePreview = () => {
        setPreviewDocument(null);
    };

    const filteredDocuments = documents.filter(doc => {
        if (activeFilter === 'all') return true;
        return doc.status === activeFilter;
    });

    const sortedDocuments = [...filteredDocuments].sort((a, b) => {
        switch (sortBy) {
            case 'nameAsc':
                return a.name.localeCompare(b.name);
            case 'nameDesc':
                return b.name.localeCompare(a.name);
            case 'dateAsc':
                return new Date(a.uploadDate) - new Date(b.uploadDate);
            case 'dateDesc':
                return new Date(b.uploadDate) - new Date(a.uploadDate);
            case 'statusAsc':
                return a.status.localeCompare(b.status);
            case 'statusDesc':
                return b.status.localeCompare(a.status);
            default:
                return 0;
        }
    });

    return (
        <div className="bg-white rounded-xl shadow-md p-6" data-aos="fade-up">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Dokumentasi Pendukung</h2>
                <p className="text-gray-600">
                    Unggah dokumen pendukung untuk laporan akhir penelitian Anda
                </p>
            </div>

            {/* Information Card */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6" data-aos="fade-up" data-aos-delay="100">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <MdInfoOutline className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Informasi Penting</h3>
                        <div className="mt-2 text-sm text-blue-700">
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Format file yang diperbolehkan: PDF, DOC, DOCX, JPG, PNG, ZIP (Max 20MB)</li>
                                <li>Dokumen dengan tanda (<span className="text-red-500 font-medium">*</span>) wajib diunggah</li>
                                <li>Batas waktu unggah dokumen: <span className="font-medium">{formatDate('2025-10-15T23:59:59Z')}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Document Types Section */}
            <div className="mb-8" data-aos="fade-up" data-aos-delay="150">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Jenis Dokumen</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documentTypes.map((type) => {
                        const hasUploaded = documents.some(doc => doc.type === type.id && doc.status !== 'rejected');
                        return (
                            <div
                                key={type.id}
                                className={`border rounded-lg p-4 transition duration-200 ${hasUploaded
                                    ? 'bg-green-50 border-green-200'
                                    : type.required
                                        ? 'bg-yellow-50 border-yellow-200'
                                        : 'bg-gray-50 border-gray-200'
                                    }`}
                                data-aos="fade-up"
                                data-aos-delay={200 + documentTypes.indexOf(type) * 50}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium text-gray-800">
                                        {type.name} {type.required && <span className="text-red-500">*</span>}
                                    </h4>
                                    {hasUploaded && <MdCheckCircle className="text-green-500 h-5 w-5" />}
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                                <button
                                    className={`text-sm px-3 py-1.5 rounded-md w-full flex items-center justify-center ${hasUploaded
                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                        }`}
                                    onClick={() => {
                                        setSelectedDocType(type.id);
                                        document.getElementById('file-upload').click();
                                    }}
                                >
                                    {hasUploaded ? (
                                        <>
                                            <MdFileDownload className="mr-1" /> Lihat Dokumen
                                        </>
                                    ) : (
                                        <>
                                            <MdAddCircleOutline className="mr-1" /> Unggah Dokumen
                                        </>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Upload Area */}
            <div
                className={`border-2 border-dashed rounded-lg p-8 mb-8 text-center transition duration-200 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                data-aos="fade-up"
                data-aos-delay="300"
            >
                <input
                    type="file"
                    id="file-upload"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                />
                <MdCloudUpload className="mx-auto h-12 w-12 text-blue-500 mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Unggah Dokumen Anda
                </h3>
                <p className="text-gray-600 mb-4">
                    Seret dan lepaskan file di sini, atau klik untuk memilih file
                </p>
                <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                    <MdAttachFile className="-ml-1 mr-2 h-5 w-5" />
                    Pilih File
                </label>
            </div>

            {/* Document List */}
            <div data-aos="fade-up" data-aos-delay="400">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Dokumen Terunggah {documents.length > 0 && `(${documents.length})`}
                    </h3>
                    <div className="flex space-x-2">
                        {/* Filter Dropdown */}
                        <div className="relative">
                            <button
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                onClick={() => setShowFilterMenu(!showFilterMenu)}
                            >
                                <MdFilterList className="-ml-1 mr-1 h-5 w-5" />
                                Filter
                            </button>
                            {showFilterMenu && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                            onClick={() => handleFilterChange('all')}
                                        >
                                            Semua Dokumen
                                        </button>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'verified' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                            onClick={() => handleFilterChange('verified')}
                                        >
                                            Terverifikasi
                                        </button>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'processing' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                            onClick={() => handleFilterChange('processing')}
                                        >
                                            Sedang Diproses
                                        </button>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === 'rejected' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                            onClick={() => handleFilterChange('rejected')}
                                        >
                                            Ditolak
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                onClick={() => setShowSortMenu(!showSortMenu)}
                            >
                                <MdSort className="-ml-1 mr-1 h-5 w-5" />
                                Urutkan
                            </button>
                            {showSortMenu && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${sortBy === 'dateDesc' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                            onClick={() => handleSortChange('dateDesc')}
                                        >
                                            Terbaru
                                        </button>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${sortBy === 'dateAsc' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                            onClick={() => handleSortChange('dateAsc')}
                                        >
                                            Terlama
                                        </button>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${sortBy === 'nameAsc' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                            onClick={() => handleSortChange('nameAsc')}
                                        >
                                            Nama (A-Z)
                                        </button>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${sortBy === 'nameDesc' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                            onClick={() => handleSortChange('nameDesc')}
                                        >
                                            Nama (Z-A)
                                        </button>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${sortBy === 'statusAsc' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                            onClick={() => handleSortChange('statusAsc')}
                                        >
                                            Status (A-Z)
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {documents.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500">
                            Belum ada dokumen yang diunggah
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama Dokumen
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Jenis
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ukuran
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal Unggah
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedDocuments.map((document) => (
                                    <tr key={document.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-50 rounded-md">
                                                    {document.format.includes('pdf') ? '📄' :
                                                        document.format.includes('word') ? '📝' :
                                                            document.format.includes('image') ? '🖼️' :
                                                                document.format.includes('zip') ? '🗜️' : '📁'}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                                        {document.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {getDocumentTypeById(document.type).name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{document.size}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{formatDate(document.uploadDate)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(document.status)}`}>
                                                {getStatusIcon(document.status)}
                                                <span className="ml-1">
                                                    {document.status === 'verified' && 'Terverifikasi'}
                                                    {document.status === 'rejected' && 'Ditolak'}
                                                    {document.status === 'processing' && 'Diproses'}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex space-x-2">
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    onClick={() => handlePreviewDocument(document)}
                                                    title="Lihat Dokumen"
                                                >
                                                    <MdVisibility />
                                                </button>
                                                <button
                                                    className="text-green-600 hover:text-green-900"
                                                    title="Unduh Dokumen"
                                                >
                                                    <MdFileDownload />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => handleDeleteDocument(document.id)}
                                                    title="Hapus Dokumen"
                                                >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Document Preview Modal */}
            {previewDocument && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closePreview}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            {previewDocument.name}
                                        </h3>
                                        <div className="mt-2">
                                            <div className="flex space-x-4 text-sm text-gray-500 mb-4">
                                                <div>Jenis: {getDocumentTypeById(previewDocument.type).name}</div>
                                                <div>Ukuran: {previewDocument.size}</div>
                                                <div>Tanggal: {formatDate(previewDocument.uploadDate)}</div>
                                            </div>
                                            <div className="mb-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(previewDocument.status)}`}>
                                                    {getStatusIcon(previewDocument.status)}
                                                    <span className="ml-1">
                                                        {previewDocument.status === 'verified' && 'Terverifikasi'}
                                                        {previewDocument.status === 'rejected' && 'Ditolak'}
                                                        {previewDocument.status === 'processing' && 'Diproses'}
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-medium">Catatan:</span> {previewDocument.notes}
                                                </p>
                                            </div>
                                            <div className="bg-gray-100 p-4 rounded-lg h-64 flex items-center justify-center">
                                                {previewDocument.format.includes('pdf') ? (
                                                    <div className="text-center">
                                                        <div className="text-6xl">📄</div>
                                                        <p className="mt-2 text-gray-600">Dokumen PDF</p>
                                                    </div>
                                                ) : previewDocument.format.includes('word') ? (
                                                    <div className="text-center">
                                                        <div className="text-6xl">📝</div>
                                                        <p className="mt-2 text-gray-600">Dokumen Word</p>
                                                    </div>
                                                ) : previewDocument.format.includes('image') ? (
                                                    <div className="text-center">
                                                        <div className="text-6xl">🖼️</div>
                                                        <p className="mt-2 text-gray-600">Dokumen Gambar</p>
                                                    </div>
                                                ) : previewDocument.format.includes('zip') ? (
                                                    <div className="text-center">
                                                        <div className="text-6xl">🗜️</div>
                                                        <p className="mt-2 text-gray-600">Dokumen ZIP</p>
                                                    </div>
                                                ) : (
                                                    <div className="text-center">
                                                        <div className="text-6xl">📁</div>
                                                        <p className="mt-2 text-gray-600">Dokumen</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={closePreview}
                                >
                                    Tutup
                                </button>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Unduh
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupportingDocumentation;
