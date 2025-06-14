import React, { useState, useEffect } from 'react';
import {
    MdSearch,
    MdFilterList,
    MdFileDownload,
    MdBookmark,
    MdFavorite,
    MdFavoriteBorder,
    MdDescription,
    MdPictureAsPdf,
    MdInsertDriveFile,
    MdImage,
    MdFolder,
    MdChevronRight
} from 'react-icons/md';

const DocumentationLibrary = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [favorites, setFavorites] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Categories for documentation
    const categories = [
        { id: 'all', name: 'Semua Dokumen' },
        { id: 'proposal', name: 'Panduan Proposal' },
        { id: 'templates', name: 'Template Dokumen' },
        { id: 'reports', name: 'Laporan' },
        { id: 'guidelines', name: 'Pedoman & Aturan' },
        { id: 'references', name: 'Referensi' },
    ];

    // Sample documents data (dummy data)
    const dummyDocuments = [
        {
            id: 1,
            title: 'Panduan Penulisan Proposal Penelitian',
            description: 'Dokumen resmi berisi pedoman lengkap untuk menulis proposal penelitian yang sesuai standar.',
            category: 'proposal',
            fileType: 'pdf',
            fileSize: '2.4 MB',
            dateAdded: '2025-03-15',
            downloadCount: 245,
            thumbnailUrl: 'https://via.placeholder.com/100x140'
        },
        {
            id: 2,
            title: 'Template Proposal Pengadaan Kegiatan',
            description: 'Template standar untuk proposal pengadaan kegiatan di Politeknik Negeri Manado.',
            category: 'templates',
            fileType: 'docx',
            fileSize: '1.2 MB',
            dateAdded: '2025-02-28',
            downloadCount: 312,
            thumbnailUrl: 'https://via.placeholder.com/100x140'
        },
        {
            id: 3,
            title: 'Pedoman Penulisan Laporan Kemajuan',
            description: 'Petunjuk teknis untuk menyusun laporan kemajuan yang sesuai dengan standar institusi.',
            category: 'reports',
            fileType: 'pdf',
            fileSize: '3.1 MB',
            dateAdded: '2025-03-05',
            downloadCount: 178,
            thumbnailUrl: 'https://via.placeholder.com/100x140'
        },
        {
            id: 4,
            title: 'Format Penulisan Bibliografi & Referensi',
            description: 'Panduan lengkap mengenai format penulisan referensi dan bibliografi sesuai standar akademik.',
            category: 'guidelines',
            fileType: 'pdf',
            fileSize: '1.5 MB',
            dateAdded: '2025-01-20',
            downloadCount: 156,
            thumbnailUrl: 'https://via.placeholder.com/100x140'
        },
        {
            id: 5,
            title: 'Template Laporan Akhir Kegiatan',
            description: 'Template resmi untuk menyusun laporan akhir kegiatan penelitian dan pengabdian.',
            category: 'templates',
            fileType: 'docx',
            fileSize: '2.0 MB',
            dateAdded: '2025-02-10',
            downloadCount: 209,
            thumbnailUrl: 'https://via.placeholder.com/100x140'
        },
        {
            id: 6,
            title: 'Contoh Proposal Yang Disetujui',
            description: 'Kompilasi contoh proposal yang telah disetujui sebagai referensi.',
            category: 'references',
            fileType: 'pdf',
            fileSize: '4.2 MB',
            dateAdded: '2025-01-15',
            downloadCount: 321,
            thumbnailUrl: 'https://via.placeholder.com/100x140'
        },
        {
            id: 7,
            title: 'Pedoman Penelitian dan Pengabdian',
            description: 'Dokumen resmi berisi pedoman penyelenggaraan penelitian dan pengabdian kepada masyarakat.',
            category: 'guidelines',
            fileType: 'pdf',
            fileSize: '5.3 MB',
            dateAdded: '2025-02-05',
            downloadCount: 287,
            thumbnailUrl: 'https://via.placeholder.com/100x140'
        },
        {
            id: 8,
            title: 'Template Presentasi Proposal',
            description: 'Template standar untuk presentasi proposal kegiatan dalam format PowerPoint.',
            category: 'templates',
            fileType: 'pptx',
            fileSize: '3.5 MB',
            dateAdded: '2025-03-01',
            downloadCount: 198,
            thumbnailUrl: 'https://via.placeholder.com/100x140'
        },
    ];

    useEffect(() => {
        // Simulate loading data from API
        setTimeout(() => {
            setDocuments(dummyDocuments);
            setIsLoading(false);
        }, 800);
    }, []);

    // Toggle favorite status for a document
    const toggleFavorite = (docId) => {
        if (favorites.includes(docId)) {
            setFavorites(favorites.filter(id => id !== docId));
        } else {
            setFavorites([...favorites, docId]);
        }
    };

    // Filter documents based on search term and active category
    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    // Function to render the appropriate icon based on file type
    const renderFileTypeIcon = (fileType) => {
        switch (fileType) {
            case 'pdf':
                return <MdPictureAsPdf className="text-red-500 text-2xl" />;
            case 'docx':
                return <MdDescription className="text-blue-500 text-2xl" />;
            case 'pptx':
                return <MdInsertDriveFile className="text-orange-500 text-2xl" />;
            case 'image':
                return <MdImage className="text-green-500 text-2xl" />;
            default:
                return <MdFolder className="text-gray-500 text-2xl" />;
        }
    };

    return (
        <div className="mx-auto px-4 py-8 bg-gray-50 min-h-screen" data-aos="fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Perpustakaan Dokumentasi</h1>

                {/* Search bar */}
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Cari dokumen..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <MdSearch className="absolute left-3 top-3 text-gray-500 text-xl" />
                </div>
            </div>

            {/* Categories tabs */}
            <div className="mb-8 overflow-x-auto" data-aos="fade-up" data-aos-delay="100">
                <div className="flex space-x-2 pb-2">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeCategory === category.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                } transition-all duration-200 shadow-sm`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Document grid */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : filteredDocuments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="200">
                    {filteredDocuments.map(doc => (
                        <div
                            key={doc.id}
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay={`${(doc.id % 8) * 50}`}
                        >
                            <div className="relative h-40 bg-gray-200 overflow-hidden">
                                <img
                                    src={doc.thumbnailUrl}
                                    alt={doc.title}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                                    onClick={() => toggleFavorite(doc.id)}
                                >
                                    {favorites.includes(doc.id) ? (
                                        <MdFavorite className="text-red-500 text-xl" />
                                    ) : (
                                        <MdFavoriteBorder className="text-gray-500 text-xl" />
                                    )}
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center mb-2">
                                    {renderFileTypeIcon(doc.fileType)}
                                    <span className="ml-2 text-xs uppercase font-semibold text-gray-500">.{doc.fileType}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{doc.title}</h3>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{doc.description}</p>
                                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                                    <span>Ditambahkan: {doc.dateAdded}</span>
                                    <span>{doc.fileSize}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">{doc.downloadCount} unduhan</span>
                                    <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors duration-200">
                                        <MdFileDownload className="text-lg" />
                                        <span>Unduh</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg p-8 text-center shadow-md" data-aos="fade-up">
                    <MdSearch className="text-5xl text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Tidak ada dokumen ditemukan</h3>
                    <p className="text-gray-500">Coba gunakan kata kunci lain atau pilih kategori berbeda</p>
                </div>
            )}

            {/* Recently viewed section */}
            <div className="mt-12" data-aos="fade-up" data-aos-delay="300">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Terakhir Dilihat</h2>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="divide-y divide-gray-100">
                        {dummyDocuments.slice(0, 3).map(doc => (
                            <div key={`recent-${doc.id}`} className="py-3 flex items-center justify-between">
                                <div className="flex items-center">
                                    {renderFileTypeIcon(doc.fileType)}
                                    <div className="ml-3">
                                        <h4 className="text-sm font-medium text-gray-800">{doc.title}</h4>
                                        <p className="text-xs text-gray-500">Dibuka: Hari ini</p>
                                    </div>
                                </div>
                                <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                                    <span>Buka</span>
                                    <MdChevronRight className="ml-1" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentationLibrary;
