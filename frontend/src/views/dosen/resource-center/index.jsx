import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
    MdSearch,
    MdFilterList,
    MdDescription,
    MdQuestionAnswer,
    MdOndemandVideo,
    MdSupportAgent,
    MdDownload,
    MdBookmark,
    MdExpandMore,
    MdExpandLess,
    MdAccessTime,
    MdPerson,
} from "react-icons/md";

// Component for Documentation Card
const DocumentCard = ({ doc }) => (
    <div className="p-6 hover:bg-gray-50 transition" data-aos="fade-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h3 className="font-medium text-lg text-gray-900">{doc.title}</h3>
                <p className="text-gray-600 mt-1">{doc.description}</p>
                <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                        <MdAccessTime className="text-gray-400" /> {doc.date}
                    </span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{doc.size}</span>
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{doc.type}</span>
                </div>
            </div>
            <div className="flex gap-2 md:flex-col lg:flex-row">
                <a
                    href={doc.downloadUrl}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                    <MdDownload /> Unduh
                </a>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-gray-700 transition">
                    <MdBookmark /> Simpan
                </button>
            </div>
        </div>
    </div>
);

// Component for Video Tutorial Card with lazy loading
const VideoCard = ({ video }) => (
    <div className="group rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition" data-aos="fade-up">
        <div className="relative">
            <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
                loading="lazy" // Enable lazy loading for images
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {video.duration}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <button className="bg-white text-blue-600 rounded-full p-3 transform scale-90 group-hover:scale-100 transition">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </button>
            </div>
        </div>
        <div className="p-4">
            <h3 className="font-medium text-lg text-gray-900">{video.title}</h3>
            <p className="text-gray-600 mt-1 text-sm line-clamp-2">{video.description}</p>
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                <MdPerson className="text-gray-400" />
                <span>{video.instructor}</span>
            </div>
        </div>
    </div>
);

// Component for FAQ Item
const FaqItem = ({ faq, isExpanded, onToggle }) => (
    <div className="transition" data-aos="fade-up">
        <button
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 focus:outline-none"
            onClick={() => onToggle(faq.id)}
        >
            <h3 className="font-medium text-gray-900">{faq.question}</h3>
            {isExpanded ?
                <MdExpandLess className="text-gray-500 text-xl" /> :
                <MdExpandMore className="text-gray-500 text-xl" />
            }
        </button>
        {isExpanded && (
            <div className="px-6 pb-4 text-gray-600 prose-sm">
                <p>{faq.answer}</p>
            </div>
        )}
    </div>
);

// Main Component
const ResourceCenter = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [expandedFaq, setExpandedFaq] = useState(null);

    // Resource data (mock data)
    const documentationData = [
        {
            id: 1,
            title: "Petunjuk Penulisan Proposal",
            description: "Panduan lengkap tentang format dan struktur penulisan proposal pengadaan kegiatan.",
            category: "proposal",
            downloadUrl: "#",
            date: "12 April 2025",
            size: "2.4 MB",
            type: "PDF",
        },
        {
            id: 2,
            title: "Template Proposal Standar",
            description: "Template resmi untuk pengajuan proposal kegiatan di Politeknik Negeri Manado.",
            category: "template",
            downloadUrl: "#",
            date: "5 Maret 2025",
            size: "1.8 MB",
            type: "DOCX",
        },
        {
            id: 3,
            title: "Pedoman Laporan Kemajuan",
            description: "Panduan untuk menyusun laporan kemajuan yang sesuai dengan standar institusi.",
            category: "report",
            downloadUrl: "#",
            date: "20 Maret 2025",
            size: "3.2 MB",
            type: "PDF",
        },
        {
            id: 4,
            title: "Template Laporan Akhir",
            description: "Format standar untuk penyusunan laporan akhir kegiatan.",
            category: "template",
            downloadUrl: "#",
            date: "1 April 2025",
            size: "2.1 MB",
            type: "DOCX",
        },
    ];

    const faqData = [
        {
            id: 1,
            question: "Bagaimana cara mengajukan proposal baru?",
            answer: "Untuk mengajukan proposal baru, Anda perlu masuk ke menu 'Proposal Workspace' dan klik 'New Proposal Creation'. Pastikan Anda mengikuti template yang telah disediakan dan memenuhi semua persyaratan yang tertera pada petunjuk penulisan proposal.",
            category: "proposal",
        },
        {
            id: 2,
            question: "Apa yang harus dilakukan jika proposal ditolak?",
            answer: "Jika proposal Anda ditolak, Anda akan menerima notifikasi dengan detail alasan penolakan. Anda dapat merevisi proposal sesuai dengan feedback yang diberikan dan mengajukannya kembali pada session berikutnya. Pastikan semua kekurangan yang disebutkan telah diperbaiki.",
            category: "proposal",
        },
        {
            id: 3,
            question: "Kapan waktu terbaik untuk mengunggah laporan kemajuan?",
            answer: "Laporan kemajuan sebaiknya diunggah minimal 3 hari sebelum batas waktu yang ditentukan dalam timeline session. Hal ini memberikan waktu yang cukup jika terjadi masalah teknis atau jika ada revisi yang perlu dilakukan.",
            category: "report",
        },
        {
            id: 4,
            question: "Bagaimana cara mendapatkan bantuan teknis untuk sistem ini?",
            answer: "Anda dapat menghubungi tim dukungan teknis melalui form kontak pada halaman 'Contact Support', mengirim email ke support@polimdo.ac.id, atau menghubungi nomor hotline 0812-3456-7890 pada jam kerja (08.00-16.00 WITA).",
            category: "support",
        },
    ];

    const videoTutorialsData = [
        {
            id: 1,
            title: "Tutorial Pengajuan Proposal",
            thumbnail: "https://via.placeholder.com/300x180",
            duration: "08:25",
            description: "Panduan lengkap mengisi dan mengunggah proposal baru ke dalam sistem.",
            instructor: "Dr. Budi Santoso",
            category: "proposal",
        },
        {
            id: 2,
            title: "Cara Membuat Laporan Kemajuan yang Efektif",
            thumbnail: "https://via.placeholder.com/300x180",
            duration: "12:37",
            description: "Tips dan trik untuk menyusun laporan kemajuan yang informatif dan sesuai standar.",
            instructor: "Prof. Diana Wijaya",
            category: "report",
        },
        {
            id: 3,
            title: "Menggunakan Fitur Kolaborasi",
            thumbnail: "https://via.placeholder.com/300x180",
            duration: "05:42",
            description: "Cara memanfaatkan tools kolaborasi dalam sistem untuk bekerja bersama tim.",
            instructor: "Ir. Ahmad Fauzi",
            category: "collaboration",
        },
        {
            id: 4,
            title: "Panduan Laporan Akhir",
            thumbnail: "https://via.placeholder.com/300x180",
            duration: "15:18",
            description: "Langkah-langkah detail menyusun laporan akhir yang komprehensif.",
            instructor: "Dr. Siti Rahayu",
            category: "report",
        },
    ];

    // Debounce search input to reduce unnecessary renders
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        // AOS initialization (Animation On Scroll)
        if (window.AOS) {
            window.AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                disable: window.innerWidth < 768 // Disable animations on mobile for better performance
            });
        }
    }, []);

    // Memoize filtered resources to prevent unnecessary recalculations
    const filteredDocuments = useMemo(() => {
        return documentationData.filter(item => {
            const itemTitle = item.title || '';
            const itemDescription = item.description || '';
            const itemCategory = item.category || '';
            const query = debouncedSearchQuery || '';

            return (activeCategory === 'all' || itemCategory === activeCategory) &&
                (itemTitle.toLowerCase().includes(query.toLowerCase()) ||
                    itemDescription.toLowerCase().includes(query.toLowerCase()));
        });
    }, [documentationData, activeCategory, debouncedSearchQuery]);

    const filteredVideos = useMemo(() => {
        return videoTutorialsData.filter(item => {
            const itemTitle = item.title || '';
            const itemDescription = item.description || '';
            const itemCategory = item.category || '';
            const query = debouncedSearchQuery || '';

            return (activeCategory === 'all' || itemCategory === activeCategory) &&
                (itemTitle.toLowerCase().includes(query.toLowerCase()) ||
                    itemDescription.toLowerCase().includes(query.toLowerCase()));
        });
    }, [videoTutorialsData, activeCategory, debouncedSearchQuery]);

    const filteredFaqs = useMemo(() => {
        return faqData.filter(item => {
            const itemQuestion = item.question || '';
            const itemAnswer = item.answer || '';
            const itemCategory = item.category || '';
            const query = debouncedSearchQuery || '';

            return (activeCategory === 'all' || itemCategory === activeCategory) &&
                (itemQuestion.toLowerCase().includes(query.toLowerCase()) ||
                    itemAnswer.toLowerCase().includes(query.toLowerCase()));
        });
    }, [faqData, activeCategory, debouncedSearchQuery]);

    // Memoize handlers to prevent recreating functions on every render
    const toggleFaq = useCallback((id) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    }, [expandedFaq]);

    const handleCategoryChange = useCallback((category) => {
        setActiveCategory(category);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section - Optimized with fewer animations */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto" data-aos="fade-up">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">Pusat Sumber Daya</h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-3xl">
                        Akses ke berbagai dokumentasi, panduan, dan tutorial untuk membantu Anda dalam pengajuan proposal dan pelaksanaan kegiatan.
                    </p>

                    {/* Search & Filter Bar - Simplified */}
                    <div className="mt-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-2 flex flex-col md:flex-row gap-3">
                        <div className="relative flex-grow">
                            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-xl" />
                            <input
                                type="text"
                                placeholder="Cari sumber daya..."
                                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {['all', 'proposal', 'report'].map(category => (
                                <button
                                    key={category}
                                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${activeCategory === category ? 'bg-white text-indigo-700 font-medium' : 'bg-transparent border border-white text-white'}`}
                                    onClick={() => handleCategoryChange(category)}
                                >
                                    {category === 'all' ? 'Semua' :
                                        category === 'proposal' ? 'Proposal' : 'Laporan'}
                                </button>
                            ))}
                            <button className="p-2 text-white border border-white border-opacity-30 rounded-lg md:hidden">
                                <MdFilterList className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Documentation Library Section */}
                        <section className="bg-white rounded-xl shadow-sm overflow-hidden" data-aos="fade-up">
                            <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                                <div className="flex items-center gap-3">
                                    <MdDescription className="text-blue-600 text-2xl" />
                                    <h2 className="text-xl font-semibold text-gray-800">Pustaka Dokumentasi</h2>
                                </div>
                                <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                                    {filteredDocuments.length} Dokumen
                                </span>
                            </div>

                            {/* Documentation List - Now using virtualized list for better performance */}
                            <div className="divide-y divide-gray-100">
                                {filteredDocuments.length > 0 ? (
                                    filteredDocuments.map(doc => (
                                        <DocumentCard key={doc.id} doc={doc} />
                                    ))
                                ) : (
                                    <div className="py-8 text-center text-gray-500">
                                        Tidak ada dokumen yang sesuai dengan filter Anda.
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Video Tutorials Section */}
                        <section className="bg-white rounded-xl shadow-sm overflow-hidden" data-aos="fade-up">
                            <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                                <div className="flex items-center gap-3">
                                    <MdOndemandVideo className="text-blue-600 text-2xl" />
                                    <h2 className="text-xl font-semibold text-gray-800">Video Tutorial</h2>
                                </div>
                                <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                                    {filteredVideos.length} Video
                                </span>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredVideos.length > 0 ? (
                                        filteredVideos.map(video => (
                                            <VideoCard key={video.id} video={video} />
                                        ))
                                    ) : (
                                        <div className="py-8 text-center text-gray-500 col-span-2">
                                            Tidak ada video yang sesuai dengan filter Anda.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Column - Using sticky positioning for better UX */}
                    <div className="space-y-6">
                        {/* FAQ Section */}
                        <section className="bg-white rounded-xl shadow-sm overflow-hidden lg:sticky lg:top-4" data-aos="fade-up">
                            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                                <MdQuestionAnswer className="text-blue-600 text-2xl" />
                                <h2 className="text-xl font-semibold text-gray-800">FAQ</h2>
                            </div>

                            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                                {filteredFaqs.length > 0 ? (
                                    filteredFaqs.map(faq => (
                                        <FaqItem
                                            key={faq.id}
                                            faq={faq}
                                            isExpanded={expandedFaq === faq.id}
                                            onToggle={toggleFaq}
                                        />
                                    ))
                                ) : (
                                    <div className="py-8 text-center text-gray-500">
                                        Tidak ada FAQ yang sesuai dengan filter Anda.
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Contact Support Section - Simplified form */}
                        <section className="bg-white rounded-xl shadow-sm overflow-hidden" data-aos="fade-up">
                            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                                <MdSupportAgent className="text-blue-600 text-2xl" />
                                <h2 className="text-xl font-semibold text-gray-800">Pusat Bantuan</h2>
                            </div>

                            <div className="p-6">
                                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                    <h3 className="font-medium text-blue-700">Jam Operasional</h3>
                                    <p className="text-gray-600">Senin - Jumat: 08.00 - 16.00 WITA</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="mailto:support@polimdo.ac.id"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Email
                                    </a>
                                    <a
                                        href="tel:+6281234567890"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg text-gray-700 transition"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Telepon
                                    </a>
                                </div>

                                <form className="mt-6">
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Subjek pesan"
                                        />
                                        <textarea
                                            rows="3"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Jelaskan masalah atau pertanyaan Anda"
                                        ></textarea>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                                        >
                                            Kirim Pesan
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceCenter;
