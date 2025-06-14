import React from 'react';
import {
    MdOutlineTextSnippet,
    MdAnalytics,
    MdPieChart,
    MdMoneyOff,
    MdStackedLineChart
} from "react-icons/md";

export const budgetModules = [
    {
        id: "sessionAllocation",
        title: "Alokasi Dana per Sesi",
        description: "Kelola alokasi dana penelitian berdasarkan periode / sesi pendanaan",
        icon: <MdOutlineTextSnippet className="h-8 w-8 text-indigo-500" />,
        path: "/bendahara/budget-management/session-allocation",
        color: "bg-indigo-50 dark:bg-indigo-900/20",
        delay: 100
    },
    {
        id: "fundMonitoring",
        title: "Monitoring Penggunaan Dana",
        description: "Monitor penggunaan dana penelitian secara real-time",
        icon: <MdAnalytics className="h-8 w-8 text-cyan-500" />,
        path: "/bendahara/budget-management/fund-monitoring",
        color: "bg-cyan-50 dark:bg-cyan-900/20",
        delay: 150
    },
    {
        id: "budgetDistribution",
        title: "Distribusi Anggaran",
        description: "Analisa distribusi anggaran berdasarkan fakultas dan jenis penelitian",
        icon: <MdPieChart className="h-8 w-8 text-pink-500" />,
        path: "/bendahara/budget-management/budget-distribution",
        color: "bg-pink-50 dark:bg-pink-900/20",
        delay: 200
    },
    {
        id: "remainingBudget",
        title: "Sisa Anggaran",
        description: "Monitor dan kelola sisa anggaran penelitian yang belum teralokasi",
        icon: <MdMoneyOff className="h-8 w-8 text-amber-500" />,
        path: "/bendahara/budget-management/remaining-budget",
        color: "bg-amber-50 dark:bg-amber-900/20",
        delay: 250
    },
    {
        id: "budgetRealization",
        title: "Laporan Realisasi Anggaran",
        description: "Lihat dan ekspor laporan realisasi anggaran per periode",
        icon: <MdStackedLineChart className="h-8 w-8 text-green-500" />,
        path: "/bendahara/budget-management/budget-realization",
        color: "bg-green-50 dark:bg-green-900/20",
        delay: 300
    },
];
