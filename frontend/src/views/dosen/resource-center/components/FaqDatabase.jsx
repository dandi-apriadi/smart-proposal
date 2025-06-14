import React, { useState, useEffect } from 'react';
import {
    MdSearch,
    MdExpandMore,
    MdExpandLess,
    MdFilterList,
    MdInfoOutline,
    MdHelp,
    MdQuestionAnswer,
    MdDescription,
    MdAssignment
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FaqDatabase = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedQuestions, setExpandedQuestions] = useState({});

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    // Dummy FAQ data with categories
    const faqData = [
        {
            id: 1,
            category: 'proposal',
            question: 'Bagaimana cara memulai proposal baru?',
            answer: 'Untuk memulai proposal baru, kunjungi "Proposal Workspace" dan klik tombol "New Proposal". Pilih template yang sesuai dan ikuti langkah-langkah yang disediakan. Pastikan semua bidang wajib diisi sebelum menyimpan.'
        },
        {
            id: 2,
            category: 'proposal',
            question: 'Berapa jumlah maksimum proposal yang dapat diajukan dalam satu session?',
            answer: 'Setiap dosen hanya diperbolehkan mengajukan maksimal 1 proposal aktif per session. Proposal tambahan hanya dapat diajukan setelah proposal sebelumnya selesai atau ditolak.'
        },
        {
            id: 3,
            category: 'submission',
            question: 'Apa saja dokumen pendukung yang wajib dilampirkan?',
            answer: 'Dokumen pendukung yang wajib dilampirkan meliputi: CV terbaru, dokumen anggaran, surat pernyataan, dan dokumen pendukung lainnya sesuai dengan jenis proposal. Semua dokumen harus dalam format PDF.'
        },
        {
            id: 4,
            category: 'submission',
            question: 'Bagaimana cara mengunggah proposal yang sudah selesai?',
            answer: 'Setelah menyelesaikan proposal, klik tombol "Submit" di halaman detail proposal. Sistem akan melakukan validasi kelengkapan dokumen dan format sebelum memproses pengajuan Anda.'
        },
        {
            id: 5,
            category: 'review',
            question: 'Berapa lama proses review proposal berlangsung?',
            answer: 'Proses review proposal biasanya membutuhkan waktu 2-3 minggu setelah batas akhir pengajuan. Anda akan mendapatkan notifikasi saat status proposal Anda berubah.'
        },
        {
            id: 6,
            category: 'review',
            question: 'Bagaimana jika proposal saya tidak disetujui?',
            answer: 'Jika proposal tidak disetujui, Anda akan menerima notifikasi dengan detail alasan penolakan. Anda dapat merevisi dan mengajukan kembali pada session berikutnya dengan memperbaiki bagian yang direkomendasikan.'
        },
        {
            id: 7,
            category: 'reporting',
            question: 'Kapan saya harus menyerahkan laporan kemajuan?',
            answer: 'Laporan kemajuan harus diserahkan di tengah periode pelaksanaan, biasanya sekitar 3 bulan setelah proposal disetujui. Tanggal pasti akan diumumkan di dashboard Anda.'
        },
        {
            id: 8,
            category: 'reporting',
            question: 'Bagaimana format laporan akhir yang benar?',
            answer: 'Laporan akhir harus mengikuti template yang disediakan di Resource Center. Laporan ini mencakup ringkasan eksekutif, metodologi, hasil, kesimpulan, dan laporan keuangan.'
        },
        {
            id: 9,
            category: 'system',
            question: 'Apa yang harus dilakukan jika saya mengalami masalah teknis?',
            answer: 'Jika Anda mengalami masalah teknis, kunjungi halaman "Contact Support" di Resource Center. Anda juga dapat mengirimkan email ke support@polimdo.ac.id dengan detail masalah yang Anda alami.'
        },
        {
            id: 10,
            category: 'system',
            question: 'Apakah sistem dapat mendeteksi format proposal yang tidak sesuai?',
            answer: 'Ya, sistem kami menggunakan teknologi Machine Learning dengan algoritma Random Forest untuk memvalidasi format proposal secara otomatis. Sistem akan memberikan umpan balik langsung jika terdapat ketidaksesuaian format.'
        }
    ];

    // Categories for filtering
    const categories = [
        { id: 'all', name: 'Semua', icon: <MdFilterList className="w-5 h-5" /> },
        { id: 'proposal', name: 'Proposal', icon: <MdDescription className="w-5 h-5" /> },
        { id: 'submission', name: 'Pengajuan', icon: <MdAssignment className="w-5 h-5" /> },
        { id: 'review', name: 'Review', icon: <MdQuestionAnswer className="w-5 h-5" /> },
        { id: 'reporting', name: 'Pelaporan', icon: <MdInfoOutline className="w-5 h-5" /> },
        { id: 'system', name: 'Sistem', icon: <MdHelp className="w-5 h-5" /> }
    ];

    // Filter FAQs based on search term and category
    const filteredFaqs = faqData.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;

        return matchesSearch && matchesCategory;
    });

    // Toggle expanded state for a question
    const toggleQuestion = (id) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 my-8">
            {/* Header section */}
            <div className="mb-8" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Pertanyaan yang Sering Diajukan</h2>
                <p className="text-gray-600">
                    Temukan jawaban untuk pertanyaan umum tentang pengajuan proposal, pelaporan, dan penggunaan sistem.
                </p>
            </div>

            {/* Search bar */}
            <div className="relative mb-6" data-aos="fade-up" data-aos-delay="100">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Cari pertanyaan atau kata kunci..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Category filters */}
            <div className="mb-8 overflow-x-auto" data-aos="fade-up" data-aos-delay="150">
                <div className="flex space-x-2 pb-2">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === category.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <span className="mr-1.5">{category.icon}</span>
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* FAQ list */}
            <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map(faq => (
                        <div
                            key={faq.id}
                            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md"
                            data-aos="fade-up"
                            data-aos-delay={150 + (faq.id * 50)}
                        >
                            <button
                                className="flex justify-between items-center w-full px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={() => toggleQuestion(faq.id)}
                            >
                                <span className="font-medium text-gray-800">{faq.question}</span>
                                {expandedQuestions[faq.id] ? (
                                    <MdExpandLess className="h-6 w-6 text-blue-500" />
                                ) : (
                                    <MdExpandMore className="h-6 w-6 text-gray-500" />
                                )}
                            </button>

                            {expandedQuestions[faq.id] && (
                                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <MdInfoOutline className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Tidak ada hasil</h3>
                        <p className="mt-1 text-gray-500">
                            Tidak ada pertanyaan yang cocok dengan kriteria pencarian Anda.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setActiveCategory('all');
                                }}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Reset Filter
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Contact support section */}
            <div className="mt-10 bg-blue-50 rounded-lg p-4 border border-blue-200" data-aos="fade-up" data-aos-delay="300">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <MdHelp className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Belum menemukan jawaban?</h3>
                        <div className="mt-2 text-sm text-blue-700">
                            <p>
                                Jika Anda memiliki pertanyaan yang tidak tercantum di sini, silakan hubungi tim dukungan kami melalui halaman Contact Support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqDatabase;
