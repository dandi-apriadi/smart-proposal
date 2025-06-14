import React from 'react';
import {
    MdOutlineTextSnippet,
    MdAnalytics,
    MdPieChart,
    MdMoneyOff,
    MdStackedLineChart,
    MdCalendarToday,
    MdOutlineAttachMoney,
    MdTrendingUp,
    MdEdit,
    MdVisibility,
    MdDashboard,
    MdOutlineBarChart,
    MdRefresh,
    MdNotifications,
    MdAccountBalance,
    MdCategory,
    MdFileDownload,
    MdSettings,
    MdOutlineCurrencyExchange,
    MdAccessTime
} from "react-icons/md";

export const featureDetails = {
    "sessionAllocation": {
        title: "Alokasi Dana per Sesi",
        description: "Kelola alokasi dana penelitian berdasarkan periode / sesi pendanaan dengan akurasi tinggi. Tentukan prioritas dan fokus pembiayaan penelitian",
        icon: <MdOutlineTextSnippet className="h-8 w-8 text-indigo-500" />,
        path: "/bendahara/budget-management/session-allocation",
        color: "from-indigo-500 to-blue-500",
        iconBg: "bg-indigo-100",
        actions: [
            { label: "Alokasi Baru", icon: <MdEdit className="h-4 w-4" /> },
            { label: "Lihat Detail", icon: <MdVisibility className="h-4 w-4" /> },
        ],
        stats: [
            { label: "Sesi Aktif", value: "3", icon: <MdCalendarToday className="h-4 w-4 text-indigo-500" /> },
            { label: "Total Alokasi", value: "Rp 2.75M", icon: <MdOutlineAttachMoney className="h-4 w-4 text-green-500" /> },
            { label: "Performa", value: "92%", icon: <MdTrendingUp className="h-4 w-4 text-green-500" /> }
        ],
        details: {
            items: [
                { name: "Semester 1 2025", allocation: "Rp 1.2M", progress: 100, status: "Selesai" },
                { name: "Semester 2 2025", allocation: "Rp 1.5M", progress: 65, status: "Berjalan" },
                { name: "Khusus RnD", allocation: "Rp 0.8M", progress: 30, status: "Berjalan" }
            ]
        },
        moreInfo: "Alokasi dana per sesi memungkinkan manajemen yang lebih baik dengan membagi total anggaran dalam periode waktu tertentu, memastikan penggunaan dana yang efisien dan efektif."
    },
    "fundMonitoring": {
        title: "Monitoring Penggunaan Dana",
        description: "Monitor penggunaan dana penelitian secara real-time dengan visualisasi data dan notifikasi perubahan status",
        icon: <MdAnalytics className="h-8 w-8 text-cyan-500" />,
        path: "/bendahara/budget-management/fund-monitoring",
        color: "from-cyan-500 to-blue-500",
        iconBg: "bg-cyan-100",
        actions: [
            { label: "Dashboard", icon: <MdDashboard className="h-4 w-4" /> },
            { label: "Lihat Detail", icon: <MdVisibility className="h-4 w-4" /> },
        ],
        stats: [
            { label: "Dana Terpakai", value: "78.57%", icon: <MdOutlineBarChart className="h-4 w-4 text-amber-500" /> },
            { label: "Update Terakhir", value: "Hari Ini", icon: <MdRefresh className="h-4 w-4 text-blue-500" /> },
            { label: "Notifikasi", value: "3", icon: <MdNotifications className="h-4 w-4 text-red-500" /> }
        ],
        details: {
            alerts: [
                { title: "Penggunaan Dana Tinggi", message: "Fakultas Teknik telah menggunakan 85% dana", severity: "warning" },
                { title: "Dana Tidak Terpakai", message: "Dana riset AI belum digunakan: Rp 120 juta", severity: "info" },
                { title: "Pembaruan Otomatis", message: "Monitoring diperbarui tiap 15 menit", severity: "success" }
            ]
        },
        moreInfo: "Pemantauan dana penelitian memungkinkan transparansi penuh atas penggunaan anggaran dengan pelaporan real-time, pemantauan tren, dan notifikasi untuk perubahan signifikan."
    },
    "budgetDistribution": {
        title: "Distribusi Anggaran",
        description: "Analisa distribusi anggaran berdasarkan fakultas dan jenis penelitian untuk pengambilan keputusan strategis",
        icon: <MdPieChart className="h-8 w-8 text-pink-500" />,
        path: "/bendahara/budget-management/budget-distribution",
        color: "from-pink-500 to-rose-500",
        iconBg: "bg-pink-100",
        actions: [
            { label: "Laporan", icon: <MdFileDownload className="h-4 w-4" /> },
            { label: "Lihat Detail", icon: <MdVisibility className="h-4 w-4" /> },
        ],
        stats: [
            { label: "Fakultas", value: "5", icon: <MdAccountBalance className="h-4 w-4 text-violet-500" /> },
            { label: "Jenis Penelitian", value: "12", icon: <MdPieChart className="h-4 w-4 text-pink-500" /> },
            { label: "Kategori", value: "8", icon: <MdCategory className="h-4 w-4 text-blue-500" /> }
        ],
        details: {
            categories: [
                { name: "Riset Dasar", percentage: 35, color: "#4318FF" },
                { name: "Riset Terapan", percentage: 25, color: "#6AD2FF" },
                { name: "Pengembangan", percentage: 20, color: "#FF9A7B" },
                { name: "Lainnya", percentage: 20, color: "#A0AEC0" }
            ]
        },
        moreInfo: "Analisis distribusi anggaran memberikan wawasan tentang alokasi dana di seluruh fakultas dan program penelitian, memungkinkan perencanaan yang lebih strategis untuk periode mendatang."
    },
    "remainingBudget": {
        title: "Sisa Anggaran",
        description: "Monitor dan kelola sisa anggaran penelitian yang belum teralokasi dan rencanakan penggunaannya",
        icon: <MdMoneyOff className="h-8 w-8 text-amber-500" />,
        path: "/bendahara/budget-management/remaining-budget",
        color: "from-amber-500 to-orange-500",
        iconBg: "bg-amber-100",
        actions: [
            { label: "Realokasi", icon: <MdSettings className="h-4 w-4" /> },
            { label: "Lihat Detail", icon: <MdVisibility className="h-4 w-4" /> },
        ],
        stats: [
            { label: "Sisa Dana", value: "Rp 0.75M", icon: <MdMoneyOff className="h-4 w-4 text-amber-500" /> },
            { label: "Persentase", value: "21.43%", icon: <MdOutlineBarChart className="h-4 w-4 text-amber-500" /> },
            { label: "Dapat Dialokasi", value: "Rp 0.6M", icon: <MdOutlineCurrencyExchange className="h-4 w-4 text-green-500" /> }
        ],
        details: {
            suggestions: [
                { title: "Realokasi Dana", description: "Sisihkan Rp 300 juta untuk penelitian unggulan", impact: "Tinggi" },
                { title: "Dana Simpanan", description: "Simpan Rp 200 juta untuk kebutuhan mendadak", impact: "Sedang" },
                { title: "Penelitian Baru", description: "Alokasikan Rp 250 juta untuk program baru", impact: "Tinggi" }
            ]
        },
        moreInfo: "Manajemen sisa anggaran memungkinkan pemanfaatan dana yang belum digunakan agar tidak terbuang, dapat dialokasikan ke proyek yang membutuhkan tambahan atau digunakan untuk inisiatif baru."
    },
    "budgetRealization": {
        title: "Laporan Realisasi Anggaran",
        description: "Lihat dan ekspor laporan realisasi anggaran per periode dengan berbagai format laporan keuangan",
        icon: <MdStackedLineChart className="h-8 w-8 text-green-500" />,
        path: "/bendahara/budget-management/budget-realization",
        color: "from-green-500 to-emerald-500",
        iconBg: "bg-green-100",
        actions: [
            { label: "Ekspor", icon: <MdFileDownload className="h-4 w-4" /> },
            { label: "Lihat Detail", icon: <MdVisibility className="h-4 w-4" /> },
        ],
        stats: [
            { label: "Jenis Laporan", value: "8", icon: <MdOutlineTextSnippet className="h-4 w-4 text-green-500" /> },
            { label: "Performa", value: "94.2%", icon: <MdStackedLineChart className="h-4 w-4 text-green-500" /> },
            { label: "Periode", value: "4", icon: <MdAccessTime className="h-4 w-4 text-blue-500" /> }
        ],
        details: {
            reports: [
                { name: "Realisasi Triwulan 1", date: "31 Mar 2025", status: "Selesai", format: "PDF, XLS" },
                { name: "Realisasi Triwulan 2", date: "30 Jun 2025", status: "Pending", format: "PDF, XLS" },
                { name: "Realisasi Tahunan", date: "31 Des 2025", status: "Belum", format: "PDF, XLS, PPT" }
            ]
        },
        moreInfo: "Laporan realisasi anggaran menyediakan dokumentasi lengkap tentang bagaimana dana telah digunakan, memungkinkan perbandingan antara anggaran yang direncanakan dan realisasi aktual."
    }
};
