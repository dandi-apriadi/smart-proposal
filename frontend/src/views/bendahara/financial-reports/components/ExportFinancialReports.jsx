import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdFileDownload,
    MdArrowBack,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdOutlinePictureAsPdf,
    MdTableView,
    MdInsertDriveFile,
    MdPrint,
    MdShare,
    MdCheck,
    MdInfoOutline,
    MdCalendarMonth,
    MdOutlineDocumentScanner,
    MdDateRange,
    MdAccountTree
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const ExportFinancialReports = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    // Dummy data for exportable reports
    const exportStats = {
        totalReports: 25,
        pdfReports: 15,
        excelReports: 8,
        wordReports: 2
    };

    const exportableReports = [
        {
            id: "EXP-2025-025",
            title: "Laporan Keuangan Bulanan Juni 2025",
            category: "Laporan Bulanan",
            period: "Juni 2025",
            generatedDate: "30 Jun 2025",
            fileType: "PDF",
            fileSize: "2.4 MB",
            lastExported: "01 Jul 2025",
            exportCount: 3,
            status: "Tersedia",
            creator: "Sistem"
        },
        {
            id: "EXP-2025-024",
            title: "Laporan Keuangan Semester I 2025",
            category: "Laporan Semester",
            period: "Jan-Jun 2025",
            generatedDate: "30 Jun 2025",
            fileType: "PDF",
            fileSize: "3.8 MB",
            lastExported: "01 Jul 2025",
            exportCount: 5,
            status: "Tersedia",
            creator: "Sistem"
        },
        {
            id: "EXP-2025-023",
            title: "Analisis Penggunaan Dana Q2 2025",
            category: "Analisis Penggunaan Dana",
            period: "Apr-Jun 2025",
            generatedDate: "30 Jun 2025",
            fileType: "Excel",
            fileSize: "1.7 MB",
            lastExported: "01 Jul 2025",
            exportCount: 2,
            status: "Tersedia",
            creator: "Sistem"
        },
        {
            id: "EXP-2025-022",
            title: "Daftar Pencairan Dana Penelitian Juni 2025",
            category: "Daftar Pencairan",
            period: "Juni 2025",
            generatedDate: "30 Jun 2025",
            fileType: "Excel",
            fileSize: "1.2 MB",
            lastExported: "01 Jul 2025",
            exportCount: 4,
            status: "Tersedia",
            creator: "Dra. Siska Widyawati, M.Ak"
        },
        {
            id: "EXP-2025-021",
            title: "Laporan Keuangan Bulanan Mei 2025",
            category: "Laporan Bulanan",
            period: "Mei 2025",
            generatedDate: "31 Mei 2025",
            fileType: "PDF",
            fileSize: "2.2 MB",
            lastExported: "02 Jun 2025",
            exportCount: 5,
            status: "Tersedia",
            creator: "Sistem"
        },
        {
            id: "EXP-2025-020",
            title: "Daftar Pencairan Dana Penelitian Mei 2025",
            category: "Daftar Pencairan",
            period: "Mei 2025",
            generatedDate: "31 Mei 2025",
            fileType: "Excel",
            fileSize: "1.1 MB",
            lastExported: "02 Jun 2025",
            exportCount: 3,
            status: "Tersedia",
            creator: "Dra. Siska Widyawati, M.Ak"
        },
        {
            id: "EXP-2025-019",
            title: "Laporan Evaluasi Keuangan Rapat Dewan Q2 2025",
            category: "Laporan Evaluasi",
            period: "Apr-Jun 2025",
            generatedDate: "30 Jun 2025",
            fileType: "Word",
            fileSize: "3.2 MB",
            lastExported: "01 Jul 2025",
            exportCount: 2,
            status: "Tersedia",
            creator: "Dra. Siska Widyawati, M.Ak"
        },
        {
            id: "EXP-2025-018",
            title: "Laporan Keuangan Bulanan April 2025",
            category: "Laporan Bulanan",
            period: "April 2025",
            generatedDate: "30 Apr 2025",
            fileType: "PDF",
            fileSize: "2.1 MB",
            lastExported: "02 Mei 2025",
            exportCount: 4,
            status: "Tersedia",
            creator: "Sistem"
        }
    ];

    // Report templates
    const reportTemplates = [
        { id: 1, name: "Laporan Bulanan", type: "PDF", category: "Standard" },
        { id: 2, name: "Laporan per Semester", type: "PDF", category: "Standard" },
        { id: 3, name: "Laporan Realisasi Anggaran", type: "Excel", category: "Standard" },
        { id: 4, name: "Daftar Pencairan Dana", type: "Excel", category: "Standard" },
        { id: 5, name: "Laporan Evaluasi Penggunaan Dana", type: "Word", category: "Custom" },
        { id: 6, name: "Laporan Audit Keuangan", type: "PDF", category: "Custom" }
    ];

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true
        });
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleReportSelect = (report) => {
        setSelectedReport(report);
    };

    const filteredReports = exportableReports.filter(report => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.period.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterType === "all") return matchesSearch;
        if (filterType === "pdf") return matchesSearch && report.fileType === "PDF";
        if (filterType === "excel") return matchesSearch && report.fileType === "Excel";
        if (filterType === "word") return matchesSearch && report.fileType === "Word";

        return matchesSearch;
    });

    const getFileTypeIcon = (fileType) => {
        switch (fileType) {
            case "PDF": return <MdOutlinePictureAsPdf className="h-5 w-5 text-red-600 dark:text-red-500" />;
            case "Excel": return <MdTableView className="h-5 w-5 text-green-600 dark:text-green-500" />;
            case "Word": return <MdInsertDriveFile className="h-5 w-5 text-blue-600 dark:text-blue-500" />;
            default: return <MdOutlineDocumentScanner className="h-5 w-5 text-gray-600 dark:text-gray-500" />;
        }
    };

    const getFileTypeBadgeClass = (fileType) => {
        switch (fileType) {
            case "PDF": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            case "Excel": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Word": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link to="/bendahara/financial-reports" className="mr-3 p-2 bg-gray-100 dark:bg-navy-800 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700">
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Ekspor Laporan Keuangan</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Ekspor dan unduh berbagai laporan keuangan dalam berbagai format
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                <Card extra="p-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdFileDownload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Laporan</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {exportStats.totalReports}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-red-100 dark:bg-red-900/30">
                            <MdOutlinePictureAsPdf className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">PDF</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {exportStats.pdfReports}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                            <MdTableView className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Excel</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {exportStats.excelReports}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdInsertDriveFile className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Word</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {exportStats.wordReports}
                            </h4>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mb-5">
                <Card extra="p-6 lg:w-2/3" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0">
                            Laporan yang Tersedia untuk Diunduh
                        </h5>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari laporan..."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <select
                                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                >
                                    <option value="all">Semua Format</option>
                                    <option value="pdf">PDF</option>
                                    <option value="excel">Excel</option>
                                    <option value="word">Word</option>
                                </select>
                            </div>
                            <button
                                onClick={handleRefresh}
                                className="p-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800"
                            >
                                <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] table-auto">
                            <thead>
                                <tr>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Judul Laporan
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Periode
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Format
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Ukuran
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Terakhir Diunduh
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReports.length > 0 ? (
                                    filteredReports.map((report, index) => (
                                        <tr
                                            key={index}
                                            className={`hover:bg-gray-50 dark:hover:bg-navy-700 cursor-pointer ${selectedReport?.id === report.id ? 'bg-gray-50 dark:bg-navy-700' : ''}`}
                                            onClick={() => handleReportSelect(report)}
                                        >
                                            <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white max-w-[250px]">
                                                <div className="truncate">{report.title}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{report.id} • {report.category}</div>
                                            </td>
                                            <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                {report.period}
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center justify-center w-16 ${getFileTypeBadgeClass(report.fileType)}`}>
                                                    {getFileTypeIcon(report.fileType)}
                                                    <span className="ml-1">{report.fileType}</span>
                                                </span>
                                            </td>
                                            <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                {report.fileSize}
                                            </td>
                                            <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                {report.lastExported} <span className="text-xs text-gray-500 dark:text-gray-500">({report.exportCount}x)</span>
                                            </td>
                                            <td className="py-[14px] text-sm">
                                                <div className="flex space-x-2">
                                                    <button className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100">
                                                        <MdFileDownload size={16} />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100">
                                                        <MdPrint size={16} />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100">
                                                        <MdShare size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-6 text-center text-gray-500 dark:text-gray-400">
                                            Tidak ada laporan yang sesuai dengan kriteria pencarian
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card extra="p-6 lg:w-1/3" data-aos="fade-up" data-aos-delay="350">
                    {selectedReport ? (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                    Detail Laporan
                                </h5>
                                <div className="flex items-center gap-1">
                                    {getFileTypeIcon(selectedReport.fileType)}
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getFileTypeBadgeClass(selectedReport.fileType)}`}>
                                        {selectedReport.fileType}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-navy-800 rounded-lg p-4 mb-4">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                    {selectedReport.title}
                                </h6>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">ID Laporan:</span>
                                        <span className="font-medium text-navy-700 dark:text-white">{selectedReport.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Kategori:</span>
                                        <span className="font-medium text-navy-700 dark:text-white">{selectedReport.category}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Periode:</span>
                                        <span className="font-medium text-navy-700 dark:text-white">{selectedReport.period}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Tanggal Dibuat:</span>
                                        <span className="font-medium text-navy-700 dark:text-white">{selectedReport.generatedDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Ukuran File:</span>
                                        <span className="font-medium text-navy-700 dark:text-white">{selectedReport.fileSize}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Dibuat Oleh:</span>
                                        <span className="font-medium text-navy-700 dark:text-white">{selectedReport.creator}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                    Riwayat Unduhan
                                </h6>
                                <div className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Terakhir diunduh:</span>
                                        <span className="text-xs font-medium text-navy-700 dark:text-white">{selectedReport.lastExported}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Jumlah unduhan:</span>
                                        <span className="text-xs font-medium text-navy-700 dark:text-white">{selectedReport.exportCount} kali</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg">
                                    <MdFileDownload size={18} />
                                    <span>Unduh {selectedReport.fileType}</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg">
                                    <MdPrint size={18} />
                                    <span>Cetak Laporan</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 text-gray-700 dark:text-white text-sm font-medium rounded-lg">
                                    <MdShare size={18} />
                                    <span>Bagikan Laporan</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                    Buat Laporan Baru
                                </h5>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        Pilih Template Laporan
                                    </label>
                                    <select className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400">
                                        <option value="">-- Pilih Template --</option>
                                        {reportTemplates.map(template => (
                                            <option key={template.id} value={template.id}>{template.name} ({template.type})</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        Periode
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="relative">
                                            <input type="text" placeholder="Mulai" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 pl-9" />
                                            <MdCalendarMonth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                        </div>
                                        <div className="relative">
                                            <input type="text" placeholder="Selesai" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 pl-9" />
                                            <MdCalendarMonth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        Format Output
                                    </label>
                                    <div className="flex gap-3">
                                        <label className="flex items-center px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-navy-600">
                                            <input type="radio" name="format" className="h-4 w-4 text-brand-500" defaultChecked />
                                            <MdOutlinePictureAsPdf className="h-4 w-4 text-red-500 ml-2 mr-1" />
                                            <span className="text-sm text-gray-700 dark:text-white">PDF</span>
                                        </label>
                                        <label className="flex items-center px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-navy-600">
                                            <input type="radio" name="format" className="h-4 w-4 text-brand-500" />
                                            <MdTableView className="h-4 w-4 text-green-500 ml-2 mr-1" />
                                            <span className="text-sm text-gray-700 dark:text-white">Excel</span>
                                        </label>
                                        <label className="flex items-center px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-navy-600">
                                            <input type="radio" name="format" className="h-4 w-4 text-brand-500" />
                                            <MdInsertDriveFile className="h-4 w-4 text-blue-500 ml-2 mr-1" />
                                            <span className="text-sm text-gray-700 dark:text-white">Word</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-lg mb-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <MdInfoOutline className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                    <h6 className="text-xs font-medium text-amber-800 dark:text-amber-400">
                                        Informasi
                                    </h6>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Ekspor laporan keuangan akan menghasilkan file yang dapat diunduh. Pilih template dan periode untuk membuat laporan baru.
                                </p>
                            </div>

                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-medium transition-colors">
                                <MdFileDownload className="h-5 w-5" />
                                <span>Buat & Unduh Laporan</span>
                            </button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ExportFinancialReports;
