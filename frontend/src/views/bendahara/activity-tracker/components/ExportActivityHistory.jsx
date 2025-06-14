import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdFileDownload,
    MdArrowBack,
    MdSearch,
    MdRefresh,
    MdToday,
    MdDateRange,
    MdSchedule,
    MdAdd,
    MdEdit,
    MdNotificationsActive,
    MdAttachMoney,
    MdCheck,
    MdClose
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const ExportActivityHistory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterMonth, setFilterMonth] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [exportFormat, setExportFormat] = useState("excel");
    const [exportHistory, setExportHistory] = useState([
        {
            id: "EXP-2025-001",
            filename: "aktivitas_penelitian_januari_2025.xlsx",
            timestamp: "2025-01-31 14:22",
            fileType: "excel",
            fileSize: "150 KB",
            activities: 25,
            period: "01 Jan 2025 - 31 Jan 2025"
        },
        {
            id: "EXP-2025-002",
            filename: "aktivitas_penelitian_februari_2025.pdf",
            timestamp: "2025-02-28 09:15",
            fileType: "pdf",
            fileSize: "200 KB",
            activities: 20,
            period: "01 Feb 2025 - 28 Feb 2025"
        },
        {
            id: "EXP-2025-003",
            filename: "aktivitas_penelitian_maret_2025.csv",
            timestamp: "2025-03-31 16:45",
            fileType: "csv",
            fileSize: "100 KB",
            activities: 30,
            period: "01 Mar 2025 - 31 Mar 2025"
        }
    ]);

    // Dummy data for activity history
    const activityData = [
        {
            id: "ACT-2025-001",
            date: "2025-06-15",
            description: "Pencairan dana untuk proposal PRP-2025-042",
            user: "Dra. Siska Widyawati, M.Ak",
            type: "Pencairan"
        },
        {
            id: "ACT-2025-002",
            date: "2025-06-15",
            description: "Verifikasi laporan kemajuan PRP-2025-036",
            user: "Dra. Siska Widyawati, M.Ak",
            type: "Verifikasi"
        },
        {
            id: "ACT-2025-003",
            date: "2025-06-15",
            description: "Pembuatan laporan keuangan bulanan Mei 2025",
            user: "Dra. Siska Widyawati, M.Ak",
            type: "Laporan"
        },
        {
            id: "ACT-2025-004",
            date: "2025-06-14",
            description: "Validasi status bebas TGR Dr. Adi Suryanto",
            user: "Dra. Siska Widyawati, M.Ak",
            type: "TGR"
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

    const filteredActivities = activityData.filter(activity => {
        const matchesSearch =
            activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.id.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    const getFileTypeIcon = (type) => {
        switch (type) {
            case "excel":
                return <img src="/icons/excel-icon.png" alt="Excel" className="h-4 w-4" />;
            case "pdf":
                return <img src="/icons/pdf-icon.png" alt="PDF" className="h-4 w-4" />;
            case "csv":
                return <img src="/icons/csv-icon.png" alt="CSV" className="h-4 w-4" />;
            default:
                return null;
        }
    };

    const getFileTypeClass = (type) => {
        switch (type) {
            case "excel":
                return "text-green-600 dark:text-green-400";
            case "pdf":
                return "text-red-600 dark:text-red-400";
            case "csv":
                return "text-blue-600 dark:text-blue-400";
            default:
                return "";
        }
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link to="/bendahara/activity-tracker" className="mr-3 p-2 bg-gray-100 dark:bg-navy-800 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700">
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Ekspor Riwayat Aktivitas</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Halaman ini memungkinkan Anda untuk mengekspor riwayat aktivitas ke dalam berbagai format.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
                <Card extra="p-6" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex flex-col mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
                            Aktivitas Penelitian Terbaru
                        </h5>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px] table-auto">
                                <thead>
                                    <tr>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            ID Aktivitas
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Tanggal
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Deskripsi
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Pengguna
                                        </th>
                                        <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                            Jenis
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredActivities.length > 0 ? (
                                        filteredActivities.map((activity, index) => (
                                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-navy-700">
                                                <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                                    {activity.id}
                                                </td>
                                                <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                    {activity.date}
                                                </td>
                                                <td className="py-[14px] text-sm text-gray-800 dark:text-white">
                                                    {activity.description}
                                                </td>
                                                <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                                    {activity.user}
                                                </td>
                                                <td className="py-[14px] text-sm">
                                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getFileTypeClass(activity.type)}`}>
                                                        {activity.type}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-gray-500 dark:text-gray-400">
                                                Tidak ada aktivitas yang sesuai dengan kriteria pencarian
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>

                <Card extra="p-6" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex flex-col mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
                            Ekspor Riwayat Aktivitas
                        </h5>

                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Dari Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Hingga Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Format
                                    </label>
                                    <select
                                        className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                        value={exportFormat}
                                        onChange={(e) => setExportFormat(e.target.value)}
                                    >
                                        <option value="excel">Excel (.xlsx)</option>
                                        <option value="pdf">PDF (.pdf)</option>
                                        <option value="csv">CSV (.csv)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleRefresh}
                                    className="flex-1 p-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800"
                                >
                                    <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                                    <span className="ml-2">Segarkan</span>
                                </button>
                                <button className="flex-1 p-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white">
                                    <MdFileDownload className="h-5 w-5" />
                                    <span className="ml-2">Ekspor</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-navy-600 pt-4">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Total Aktivitas</span>
                                <span className="text-sm font-medium text-navy-700 dark:text-white">42 Aktivitas</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Periode</span>
                                <span className="text-sm font-medium text-navy-700 dark:text-white">
                                    {startDate || "01 Jun 2025"} - {endDate || "15 Jun 2025"}
                                </span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Format</span>
                                <span className="text-sm font-medium text-navy-700 dark:text-white">
                                    {exportFormat.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <table className="w-full mt-4 mb-4 text-xs">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-navy-800">
                                    <th className="py-2 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Tanggal</th>
                                    <th className="py-2 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Aktivitas</th>
                                    <th className="py-2 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Pengguna</th>
                                    <th className="py-2 px-3 text-left font-medium text-gray-600 dark:text-gray-300">Jenis</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100 dark:border-navy-700">
                                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">15 Jun 2025, 10:35</td>
                                    <td className="py-2 px-3 text-gray-800 dark:text-white">Pencairan dana untuk proposal PRP-2025-042</td>
                                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Dra. Siska Widyawati, M.Ak</td>
                                    <td className="py-2 px-3">
                                        <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                            Pencairan
                                        </span>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-navy-700">
                                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">15 Jun 2025, 09:22</td>
                                    <td className="py-2 px-3 text-gray-800 dark:text-white">Verifikasi laporan kemajuan PRP-2025-036</td>
                                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Dra. Siska Widyawati, M.Ak</td>
                                    <td className="py-2 px-3">
                                        <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                            Verifikasi
                                        </span>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-navy-700">
                                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">15 Jun 2025, 08:45</td>
                                    <td className="py-2 px-3 text-gray-800 dark:text-white">Pembuatan laporan keuangan bulanan Mei 2025</td>
                                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Dra. Siska Widyawati, M.Ak</td>
                                    <td className="py-2 px-3">
                                        <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                                            Laporan
                                        </span>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-navy-700">
                                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">14 Jun 2025, 16:30</td>
                                    <td className="py-2 px-3 text-gray-800 dark:text-white">Validasi status bebas TGR Dr. Adi Suryanto</td>
                                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Dra. Siska Widyawati, M.Ak</td>
                                    <td className="py-2 px-3">
                                        <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                            TGR
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                            <p>Menampilkan 4 dari 42 aktivitas</p>
                            <p className="mt-1">Ekspor data untuk melihat semua aktivitas</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-8" data-aos="fade-up" data-aos-delay="300">
                <Card extra="p-6 lg:w-full">
                    <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-6">
                        Riwayat Ekspor
                    </h5>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] table-auto">
                            <thead>
                                <tr>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        ID Ekspor
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Nama File
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Waktu Ekspor
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Tipe
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Aktivitas
                                    </th>
                                    <th className="border-b border-gray-200 pb-[10px] text-start text-sm font-medium text-gray-600 dark:border-navy-700 dark:text-white">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {exportHistory.map((export_, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-navy-700">
                                        <td className="py-[14px] text-sm font-medium text-navy-700 dark:text-white">
                                            {export_.id}
                                        </td>
                                        <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center">
                                                {getFileTypeIcon(export_.fileType)}
                                                <span className="ml-2">{export_.filename}</span>
                                            </div>
                                        </td>
                                        <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                            {export_.timestamp}
                                        </td>
                                        <td className="py-[14px] text-sm">
                                            <span className={`font-medium ${getFileTypeClass(export_.fileType)}`}>
                                                {export_.fileType}
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">
                                                ({export_.fileSize})
                                            </span>
                                        </td>
                                        <td className="py-[14px] text-sm text-gray-600 dark:text-gray-400">
                                            {export_.activities} aktivitas
                                            <div className="text-xs text-gray-500">
                                                {export_.period}
                                            </div>
                                        </td>
                                        <td className="py-[14px] text-sm">
                                            <div className="flex space-x-2">
                                                <button className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100">
                                                    <MdFileDownload size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ExportActivityHistory;