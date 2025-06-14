import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdSecurity,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdArrowBack,
    MdOutlinePictureAsPdf,
    MdVisibility,
    MdFileDownload,
    MdOutlineVerified,
    MdVerified,
    MdReportProblem,
    MdCalendarToday,
    MdPerson,
    MdAttachFile,
    MdWarning,
    MdCheckCircle,
    MdList,
    MdTimeline,
    MdInfo,
    MdInfoOutline
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const AuditReports = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterYear, setFilterYear] = useState("2025");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [viewMode, setViewMode] = useState("list"); // 'list' or 'timeline'

    // Dummy data for audit reports
    const auditStats = {
        totalReports: 18,
        passedReports: 15,
        issueReports: 3,
        currentYearReports: 8
    };

    const auditReports = [
        {
            id: "ADT-2025-Q2",
            title: "Laporan Audit Keuangan Q2 2025",
            period: "April - Juni 2025",
            year: "2025",
            quarter: "Q2",
            auditDate: "15 Jul 2025",
            submissionDate: "10 Jul 2025",
            status: "Lulus Audit",
            auditor: "KAP Tjahjadi & Tamara",
            findings: 0,
            severity: "None",
            fileSize: "3.2 MB",
            notes: "Tidak ditemukan masalah dalam audit keuangan pengelolaan dana penelitian periode Q2 2025.",
            detailsLink: "/reports/audit/2025-Q2",
            history: [
                { date: "15 Jul 2025", action: "Laporan audit disetujui", actor: "Dr. Hadi Santoso, M.Ak" },
                { date: "12 Jul 2025", action: "Audit selesai dilakukan", actor: "KAP Tjahjadi & Tamara" },
                { date: "05 Jul 2025", action: "Mulai proses audit", actor: "KAP Tjahjadi & Tamara" },
                { date: "01 Jul 2025", action: "Dokumen audit disiapkan", actor: "Dra. Siska Widyawati, M.Ak" }
            ]
        },
        {
            id: "ADT-2025-Q1",
            title: "Laporan Audit Keuangan Q1 2025",
            period: "Januari - Maret 2025",
            year: "2025",
            quarter: "Q1",
            auditDate: "15 Apr 2025",
            submissionDate: "10 Apr 2025",
            status: "Lulus Audit dengan Catatan",
            auditor: "KAP Tjahjadi & Tamara",
            findings: 2,
            severity: "Minor",
            fileSize: "3.0 MB",
            notes: "Ditemukan 2 catatan minor terkait dokumentasi bukti pengeluaran yang perlu diperbaiki untuk periode berikutnya.",
            detailsLink: "/reports/audit/2025-Q1",
            history: [
                { date: "15 Apr 2025", action: "Laporan audit disetujui dengan catatan", actor: "Dr. Hadi Santoso, M.Ak" },
                { date: "12 Apr 2025", action: "Audit selesai dilakukan", actor: "KAP Tjahjadi & Tamara" },
                { date: "08 Apr 2025", action: "Temuan audit dibahas dengan bendahara", actor: "KAP Tjahjadi & Tamara" },
                { date: "05 Apr 2025", action: "Mulai proses audit", actor: "KAP Tjahjadi & Tamara" },
                { date: "01 Apr 2025", action: "Dokumen audit disiapkan", actor: "Dra. Siska Widyawati, M.Ak" }
            ]
        },
        {
            id: "ADT-2024-Q4",
            title: "Laporan Audit Keuangan Q4 2024",
            period: "Oktober - Desember 2024",
            year: "2024",
            quarter: "Q4",
            auditDate: "15 Jan 2025",
            submissionDate: "10 Jan 2025",
            status: "Lulus Audit",
            auditor: "KAP Tjahjadi & Tamara",
            findings: 0,
            severity: "None",
            fileSize: "2.8 MB",
            notes: "Tidak ditemukan masalah dalam audit keuangan pengelolaan dana penelitian periode Q4 2024.",
            detailsLink: "/reports/audit/2024-Q4",
            history: [
                { date: "15 Jan 2025", action: "Laporan audit disetujui", actor: "Dr. Hadi Santoso, M.Ak" },
                { date: "12 Jan 2025", action: "Audit selesai dilakukan", actor: "KAP Tjahjadi & Tamara" },
                { date: "05 Jan 2025", action: "Mulai proses audit", actor: "KAP Tjahjadi & Tamara" },
                { date: "01 Jan 2025", action: "Dokumen audit disiapkan", actor: "Dra. Siska Widyawati, M.Ak" }
            ]
        },
        {
            id: "ADT-2024-Q3",
            title: "Laporan Audit Keuangan Q3 2024",
            period: "Juli - September 2024",
            year: "2024",
            quarter: "Q3",
            auditDate: "15 Oct 2024",
            submissionDate: "10 Oct 2024",
            status: "Temuan Audit",
            auditor: "KAP Tjahjadi & Tamara",
            findings: 3,
            severity: "Major",
            fileSize: "3.5 MB",
            notes: "Ditemukan 3 temuan utama terkait penggunaan dana penelitian yang tidak sesuai dengan rencana anggaran. Memerlukan tindak lanjut segera.",
            detailsLink: "/reports/audit/2024-Q3",
            history: [
                { date: "20 Oct 2024", action: "Rencana tindak lanjut temuan disetujui", actor: "Dr. Hadi Santoso, M.Ak" },
                { date: "15 Oct 2024", action: "Laporan audit dengan temuan diterbitkan", actor: "KAP Tjahjadi & Tamara" },
                { date: "13 Oct 2024", action: "Temuan audit didiskusikan dengan pihak universitas", actor: "KAP Tjahjadi & Tamara" },
                { date: "05 Oct 2024", action: "Temuan awal audit disampaikan", actor: "KAP Tjahjadi & Tamara" },
                { date: "01 Oct 2024", action: "Mulai proses audit", actor: "KAP Tjahjadi & Tamara" },
                { date: "25 Sep 2024", action: "Dokumen audit disiapkan", actor: "Dra. Siska Widyawati, M.Ak" }
            ]
        },
        {
            id: "ADT-2024-Q2",
            title: "Laporan Audit Keuangan Q2 2024",
            period: "April - Juni 2024",
            year: "2024",
            quarter: "Q2",
            auditDate: "15 Jul 2024",
            submissionDate: "10 Jul 2024",
            status: "Lulus Audit dengan Catatan",
            auditor: "KAP Tjahjadi & Tamara",
            findings: 1,
            severity: "Minor",
            fileSize: "2.9 MB",
            notes: "Ditemukan 1 catatan minor terkait keterlambatan pelaporan penggunaan dana. Perlu perbaikan sistem notifikasi untuk periode berikutnya.",
            detailsLink: "/reports/audit/2024-Q2",
            history: [
                { date: "15 Jul 2024", action: "Laporan audit disetujui dengan catatan", actor: "Dr. Hadi Santoso, M.Ak" },
                { date: "12 Jul 2024", action: "Audit selesai dilakukan", actor: "KAP Tjahjadi & Tamara" },
                { date: "05 Jul 2024", action: "Mulai proses audit", actor: "KAP Tjahjadi & Tamara" },
                { date: "01 Jul 2024", action: "Dokumen audit disiapkan", actor: "Dra. Siska Widyawati, M.Ak" }
            ]
        },
        {
            id: "ADT-2024-Q1",
            title: "Laporan Audit Keuangan Q1 2024",
            period: "Januari - Maret 2024",
            year: "2024",
            quarter: "Q1",
            auditDate: "15 Apr 2024",
            submissionDate: "10 Apr 2024",
            status: "Lulus Audit",
            auditor: "KAP Tjahjadi & Tamara",
            findings: 0,
            severity: "None",
            fileSize: "2.7 MB",
            notes: "Tidak ditemukan masalah dalam audit keuangan pengelolaan dana penelitian periode Q1 2024.",
            detailsLink: "/reports/audit/2024-Q1",
            history: [
                { date: "15 Apr 2024", action: "Laporan audit disetujui", actor: "Dr. Hadi Santoso, M.Ak" },
                { date: "12 Apr 2024", action: "Audit selesai dilakukan", actor: "KAP Tjahjadi & Tamara" },
                { date: "05 Apr 2024", action: "Mulai proses audit", actor: "KAP Tjahjadi & Tamara" },
                { date: "01 Apr 2024", action: "Dokumen audit disiapkan", actor: "Dra. Siska Widyawati, M.Ak" }
            ]
        }
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

    const filteredReports = auditReports.filter(report => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.status.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesYear = filterYear === "all" || report.year === filterYear;

        return matchesSearch && matchesYear;
    });

    const getStatusColor = (status) => {
        if (status.includes("Lulus Audit") && !status.includes("Catatan")) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        if (status.includes("Catatan")) return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
        if (status.includes("Temuan")) return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case "Major": return "text-red-600 dark:text-red-400";
            case "Minor": return "text-amber-600 dark:text-amber-400";
            case "None": return "text-green-600 dark:text-green-400";
            default: return "text-gray-600 dark:text-gray-400";
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
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Laporan Audit Keuangan</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Lihat laporan hasil audit keuangan pengelolaan dana penelitian
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                <Card extra="p-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                            <MdSecurity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Audit</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {auditStats.totalReports}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                            <MdCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lulus Audit</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {auditStats.passedReports}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-red-100 dark:bg-red-900/30">
                            <MdReportProblem className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Temuan Audit</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {auditStats.issueReports}
                            </h4>
                        </div>
                    </div>
                </Card>

                <Card extra="p-4" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center">
                        <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/30">
                            <MdCalendarToday className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tahun 2025</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                                {auditStats.currentYearReports}
                            </h4>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mb-5">
                <Card extra="p-6 w-full" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div className="flex items-center gap-3 mb-3 md:mb-0">
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                Laporan Audit Keuangan
                            </h5>
                            <div className="flex gap-2">
                                <button
                                    className={`text-xs px-3 py-1 rounded-lg ${viewMode === 'list' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-700 dark:bg-navy-700 dark:text-white'}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <div className="flex items-center gap-1">
                                        <MdList size={14} />
                                        <span>List</span>
                                    </div>
                                </button>
                                <button
                                    className={`text-xs px-3 py-1 rounded-lg ${viewMode === 'timeline' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-700 dark:bg-navy-700 dark:text-white'}`}
                                    onClick={() => setViewMode('timeline')}
                                >
                                    <div className="flex items-center gap-1">
                                        <MdTimeline size={14} />
                                        <span>Timeline</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari laporan audit..."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <select
                                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                    value={filterYear}
                                    onChange={(e) => setFilterYear(e.target.value)}
                                >
                                    <option value="all">Semua Tahun</option>
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
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

                    {viewMode === 'list' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px] table-auto">
                                <thead>
                                    <tr>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            ID Laporan
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Periode
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Tanggal Audit
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Auditor
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Temuan
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Status
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
                                                <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                    {report.id}
                                                </td>
                                                <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                    {report.period}
                                                </td>
                                                <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                    {report.auditDate}
                                                </td>
                                                <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                    {report.auditor}
                                                </td>
                                                <td className="py-[14px] text-sm">
                                                    <span className={`font-medium ${report.findings === 0 ? "text-green-600 dark:text-green-400" : report.findings <= 2 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
                                                        {report.findings}
                                                    </span>
                                                    {report.findings > 0 && (
                                                        <span className={`ml-1.5 text-xs px-2 py-0.5 rounded-full ${getSeverityColor(report.severity)} bg-opacity-10`}>
                                                            {report.severity}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-[14px] text-sm">
                                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                                                        {report.status}
                                                    </span>
                                                </td>
                                                <td className="py-[14px] text-sm">
                                                    <div className="flex space-x-2">
                                                        <button className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100">
                                                            <MdVisibility size={16} />
                                                        </button>
                                                        <button className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100">
                                                            <MdOutlinePictureAsPdf size={16} />
                                                        </button>
                                                        <button className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100">
                                                            <MdFileDownload size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="py-6 text-center text-gray-500 dark:text-gray-400">
                                                Tidak ada laporan audit yang sesuai dengan kriteria pencarian
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="relative pl-8">
                            {/* Timeline line */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 dark:bg-navy-700"></div>

                            {/* Timeline items */}
                            {filteredReports.length > 0 ? (
                                filteredReports.map((report, index) => (
                                    <div key={index} className="mb-8 relative" onClick={() => handleReportSelect(report)}>
                                        {/* Timeline dot */}
                                        <div className={`absolute -left-4 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-navy-800 border-4 ${report.findings === 0 ? "border-green-400 dark:border-green-500" : report.findings <= 2 ? "border-amber-400 dark:border-amber-500" : "border-red-400 dark:border-red-500"}`}>
                                            {report.findings === 0 ? (
                                                <MdVerified className="h-5 w-5 text-green-600 dark:text-green-400" />
                                            ) : report.findings <= 2 ? (
                                                <MdWarning className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                            ) : (
                                                <MdReportProblem className="h-5 w-5 text-red-600 dark:text-red-400" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="ml-6 bg-white dark:bg-navy-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-navy-700 cursor-pointer hover:border-gray-300 dark:hover:border-navy-600">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                                <div className="mb-2 md:mb-0">
                                                    <span className="text-sm font-medium text-navy-700 dark:text-white">{report.id}</span>
                                                    <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">{report.period}</span>
                                                </div>
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                                                    {report.status}
                                                </span>
                                            </div>

                                            <div className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                                {report.title}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                                                <div className="flex items-center">
                                                    <MdCalendarToday className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1.5" />
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">Tanggal Audit: {report.auditDate}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <MdPerson className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1.5" />
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">Auditor: {report.auditor}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center mb-3">
                                                <div className={`mr-2 px-2 py-1 text-xs font-medium rounded-full ${report.findings === 0 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : report.findings <= 2 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}>
                                                    {report.findings === 0 ? "Tidak ada temuan" : `${report.findings} temuan`}
                                                </div>
                                                {report.findings > 0 && (
                                                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(report.severity)} bg-opacity-10`}>
                                                        Severity: {report.severity}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-navy-900 p-2 rounded">
                                                {report.notes}
                                            </div>

                                            <div className="flex justify-end mt-3">
                                                <div className="flex gap-2">
                                                    <button className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100">
                                                        <MdVisibility size={16} />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100">
                                                        <MdOutlinePictureAsPdf size={16} />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100">
                                                        <MdFileDownload size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                    <MdInfoOutline className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                                    <p className="text-lg font-medium">Tidak ada laporan audit</p>
                                    <p className="text-sm">Tidak ada data yang sesuai dengan kriteria pencarian Anda.</p>
                                </div>
                            )}
                        </div>
                    )}
                </Card>
            </div>

            {selectedReport && (
                <Card extra="p-6 mb-5" data-aos="fade-up" data-aos-delay="400">
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                            Detail Laporan Audit
                        </h5>
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedReport.status)}`}>
                            {selectedReport.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-navy-800 mb-4">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-3">
                                    {selectedReport.title}
                                </h6>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">ID Laporan:</span>
                                        <span className="text-xs font-medium text-navy-700 dark:text-white">{selectedReport.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Periode:</span>
                                        <span className="text-xs font-medium text-navy-700 dark:text-white">{selectedReport.period}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Tanggal Audit:</span>
                                        <span className="text-xs font-medium text-navy-700 dark:text-white">{selectedReport.auditDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Tanggal Pengajuan:</span>
                                        <span className="text-xs font-medium text-navy-700 dark:text-white">{selectedReport.submissionDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Auditor:</span>
                                        <span className="text-xs font-medium text-navy-700 dark:text-white">{selectedReport.auditor}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Ukuran File:</span>
                                        <span className="text-xs font-medium text-navy-700 dark:text-white">{selectedReport.fileSize}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                    Catatan Audit
                                </h6>
                                <div className="p-3 rounded-lg bg-white dark:bg-navy-700 border border-gray-100 dark:border-navy-600">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {selectedReport.notes}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium">
                                    <MdVisibility size={16} />
                                    <span>Lihat Detail</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium">
                                    <MdOutlinePictureAsPdf size={16} />
                                    <span>Unduh PDF</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 text-gray-700 dark:text-white rounded-lg text-sm font-medium">
                                    <MdAttachFile size={16} />
                                    <span>Lampiran</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-3">
                                Riwayat Audit
                            </h6>
                            <div className="relative pl-6 space-y-4">
                                <div className="absolute left-2 top-1 bottom-0 w-0.5 bg-gray-200 dark:bg-navy-700"></div>

                                {selectedReport.history.map((item, index) => (
                                    <div key={index} className="relative">
                                        <div className="absolute -left-6 mt-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-white dark:bg-navy-800 border-2 border-brand-500"></div>
                                        <div className="p-3 rounded-lg bg-white dark:bg-navy-700 border border-gray-100 dark:border-navy-600">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs font-medium text-navy-700 dark:text-white">{item.action}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
                                            </div>
                                            <span className="text-xs text-gray-600 dark:text-gray-400">{item.actor}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {selectedReport.findings > 0 && (
                                <div className={`mt-4 p-3 rounded-lg ${selectedReport.findings <= 2 ? "bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20" : "bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20"}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {selectedReport.findings <= 2 ? (
                                            <MdWarning className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                        ) : (
                                            <MdReportProblem className="h-4 w-4 text-red-600 dark:text-red-400" />
                                        )}
                                        <span className="text-xs font-medium text-gray-700 dark:text-white">
                                            Temuan: {selectedReport.findings} ({selectedReport.severity})
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {selectedReport.findings <= 2
                                            ? "Temuan ini memerlukan perbaikan untuk laporan berikutnya namun tidak membahayakan integritas keuangan secara keseluruhan."
                                            : "Temuan ini memerlukan tindakan koreksi segera dan perbaikan sistem untuk mencegah kesalahan serupa di masa mendatang."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default AuditReports;
