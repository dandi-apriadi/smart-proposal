import React, { useState, useEffect } from 'react';
import {
    MdPlayCircleFilled,
    MdSearch,
    MdFilterList,
    MdClose,
    MdAccessTime,
    MdDateRange,
    MdCategory
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const VideoTutorial = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    // Dummy data for video tutorials
    const videoTutorials = [
        {
            id: 1,
            title: 'Cara Membuat Proposal Baru',
            description: 'Tutorial lengkap membuat proposal baru dari awal sampai submit',
            thumbnail: 'https://via.placeholder.com/1280x720/2563eb/FFFFFF?text=Tutorial+Proposal+Baru',
            duration: '10:25',
            category: 'proposal',
            date: '15 Mar 2025',
            views: 124
        },
        {
            id: 2,
            title: 'Mengisi Form Laporan Kemajuan',
            description: 'Panduan step-by-step mengisi laporan kemajuan dengan benar',
            thumbnail: 'https://via.placeholder.com/1280x720/059669/FFFFFF?text=Laporan+Kemajuan',
            duration: '8:15',
            category: 'laporan',
            date: '22 Mar 2025',
            views: 98
        },
        {
            id: 3,
            title: 'Menggunakan Template Proposal',
            description: 'Cara menggunakan dan menyesuaikan template proposal yang tersedia',
            thumbnail: 'https://via.placeholder.com/1280x720/d97706/FFFFFF?text=Template+Proposal',
            duration: '6:30',
            category: 'proposal',
            date: '10 Apr 2025',
            views: 156
        },
        {
            id: 4,
            title: 'Mengunggah Dokumen Pendukung',
            description: 'Tutorial cara mengunggah dan mengelola dokumen pendukung proposal',
            thumbnail: 'https://via.placeholder.com/1280x720/7c3aed/FFFFFF?text=Dokumen+Pendukung',
            duration: '4:45',
            category: 'dokumen',
            date: '5 Apr 2025',
            views: 67
        },
        {
            id: 5,
            title: 'Menyusun Laporan Akhir',
            description: 'Panduan lengkap menyusun laporan akhir yang sesuai standar',
            thumbnail: 'https://via.placeholder.com/1280x720/e11d48/FFFFFF?text=Laporan+Akhir',
            duration: '12:10',
            category: 'laporan',
            date: '18 Apr 2025',
            views: 89
        },
        {
            id: 6,
            title: 'Meninjau Feedback Reviewer',
            description: 'Cara memahami dan merespon feedback dari reviewer',
            thumbnail: 'https://via.placeholder.com/1280x720/0369a1/FFFFFF?text=Feedback+Reviewer',
            duration: '7:50',
            category: 'review',
            date: '25 Apr 2025',
            views: 112
        }
    ];

    const categories = [
        { id: 'all', name: 'Semua' },
        { id: 'proposal', name: 'Proposal' },
        { id: 'laporan', name: 'Laporan' },
        { id: 'dokumen', name: 'Dokumen' },
        { id: 'review', name: 'Review' }
    ];

    const filteredVideos = videoTutorials.filter(video => {
        const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const openVideoModal = (video) => {
        setSelectedVideo(video);
    };

    const closeVideoModal = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="px-4 py-6 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="mb-8 text-center" data-aos="fade-down">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Video Tutorial</h1>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    Kumpulan tutorial dan panduan video untuk membantu Anda dalam menggunakan sistem proposal.
                    Pelajari langkah-langkah mudah untuk membuat dan mengelola proposal Anda.
                </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4" data-aos="fade-up" data-aos-delay="100">
                {/* Search Bar */}
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Cari tutorial..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                </div>

                {/* Category Filters */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2">
                    <MdFilterList className="text-gray-600 text-xl hidden md:block" />
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeCategory === category.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                                }`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredVideos.length > 0 ? (
                    filteredVideos.map((video, index) => (
                        <div
                            key={video.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            data-aos="fade-up"
                            data-aos-delay={100 + (index * 50)}
                        >
                            <div className="relative group cursor-pointer" onClick={() => openVideoModal(video)}>
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <MdPlayCircleFilled className="text-white text-6xl" />
                                </div>
                                <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded flex items-center">
                                    <MdAccessTime className="mr-1" /> {video.duration}
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                                <div className="flex justify-between items-center text-xs text-gray-500">
                                    <span className="flex items-center">
                                        <MdDateRange className="mr-1" /> {video.date}
                                    </span>
                                    <span className="flex items-center">
                                        <MdCategory className="mr-1" /> {categories.find(c => c.id === video.category)?.name || video.category}
                                    </span>
                                    <span>{video.views} tayangan</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        <p className="text-xl mb-2">Tidak ada video tutorial ditemukan</p>
                        <p>Coba ubah kata kunci pencarian atau filter kategori</p>
                    </div>
                )}
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-bold text-xl">{selectedVideo.title}</h3>
                            <button onClick={closeVideoModal} className="text-gray-500 hover:text-gray-700">
                                <MdClose className="text-2xl" />
                            </button>
                        </div>
                        <div className="aspect-w-16 aspect-h-9 bg-gray-900">
                            {/* This would be a real video player in production */}
                            <div className="flex items-center justify-center h-full">
                                <img
                                    src={selectedVideo.thumbnail}
                                    alt={selectedVideo.title}
                                    className="max-h-full max-w-full"
                                />
                                <MdPlayCircleFilled className="absolute text-white text-7xl opacity-70" />
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                <span className="flex items-center">
                                    <MdDateRange className="mr-1" /> {selectedVideo.date}
                                </span>
                                <span className="flex items-center">
                                    <MdCategory className="mr-1" /> {categories.find(c => c.id === selectedVideo.category)?.name || selectedVideo.category}
                                </span>
                                <span>{selectedVideo.views} tayangan</span>
                            </div>
                            <p className="text-gray-700 mb-4">{selectedVideo.description}</p>
                            <div className="bg-gray-100 p-3 rounded-lg">
                                <h4 className="font-semibold mb-2">Tutorial Terkait</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {videoTutorials
                                        .filter(video => video.category === selectedVideo.category && video.id !== selectedVideo.id)
                                        .slice(0, 2)
                                        .map(video => (
                                            <div
                                                key={video.id}
                                                className="flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer"
                                                onClick={() => setSelectedVideo(video)}
                                            >
                                                <img
                                                    src={video.thumbnail}
                                                    alt={video.title}
                                                    className="w-16 h-12 object-cover rounded mr-2"
                                                />
                                                <div>
                                                    <h5 className="font-medium text-sm line-clamp-1">{video.title}</h5>
                                                    <span className="text-xs text-gray-500">{video.duration}</span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoTutorial;
