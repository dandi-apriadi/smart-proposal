import React, { useState } from "react";
import Card from "components/card";
import { Link } from "react-router-dom";
import { MdAttachMoney, MdOutlineArrowForward, MdCalendarToday, MdDone, MdTimeline, MdAccessTime, MdTrendingUp } from "react-icons/md";
import Chart from 'react-apexcharts';

// Dummy disbursement schedule data
const dummyDisbursementSchedule = [
    {
        phase: 1,
        name: "Tahap 1 - Awal Penelitian",
        description: "Pencairan dana tahap awal untuk memulai kegiatan penelitian",
        date: "15 Mei 2025",
        status: "Selesai",
        progress: 100,
        amount: 250000000
    },
    {
        phase: 2,
        name: "Tahap 2 - Tengah Penelitian",
        description: "Pencairan dana untuk keberlanjutan penelitian setelah laporan kemajuan",
        date: "15 Juli 2025",
        status: "Aktif",
        progress: 65,
        amount: 350000000
    },
    {
        phase: 3,
        name: "Tahap 3 - Akhir Penelitian",
        description: "Pencairan dana final setelah semua deliverables penelitian terpenuhi",
        date: "20 September 2025",
        status: "Belum Aktif",
        progress: 0,
        amount: 200000000
    }
];

const DisbursementStatus = ({ disbursementSchedule = dummyDisbursementSchedule }) => {
    const [activeTab, setActiveTab] = useState('progress');    // Calculate total amount and amounts by status
    const totalAmount = disbursementSchedule.reduce((sum, phase) => sum + (phase.amount || 0), 0);
    const disbursedAmount = disbursementSchedule
        .filter(phase => phase.status === 'Selesai')
        .reduce((sum, phase) => sum + (phase.amount || 0), 0);
    const activeAmount = disbursementSchedule
        .filter(phase => phase.status === 'Aktif')
        .reduce((sum, phase) => sum + (phase.amount || 0), 0);
    const pendingAmount = disbursementSchedule
        .filter(phase => phase.status === 'Belum Aktif')
        .reduce((sum, phase) => sum + (phase.amount || 0), 0);

    // Chart configurations
    const donutChartOptions = {
        chart: {
            type: 'donut',
            fontFamily: 'inherit',
            foreColor: '#697a8d',
        },
        colors: ['#10b981', '#3b82f6', '#9ca3af'],
        labels: ['Selesai Dicairkan', 'Dalam Proses', 'Belum Dicairkan'],
        legend: {
            position: 'bottom',
            fontFamily: 'inherit',
            fontSize: '12px',
            offsetY: 5,
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        name: {
                            fontSize: '12px',
                            fontFamily: 'inherit',
                        },
                        value: {
                            fontSize: '16px',
                            fontFamily: 'inherit',
                            formatter: function (val) {
                                return 'Rp ' + parseInt(val).toLocaleString();
                            }
                        },
                        total: {
                            show: true,
                            label: 'Total Dana',
                            fontSize: '14px',
                            fontFamily: 'inherit',
                            color: '#566a7f',
                            formatter: function () {
                                return 'Rp ' + totalAmount.toLocaleString();
                            }
                        }
                    }
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 260
                }
            }
        }]
    };

    const donutChartSeries = [
        disbursedAmount,
        activeAmount,
        pendingAmount
    ];

    const progressChartOptions = {
        chart: {
            type: 'bar',
            fontFamily: 'inherit',
            foreColor: '#697a8d',
            toolbar: {
                show: false
            }
        },
        colors: ['#10b981', '#3b82f6', '#9ca3af'],
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '70%',
                borderRadius: 4,
                distributed: true,
                dataLabels: {
                    position: 'bottom'
                }
            }
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                colors: ['#fff'],
                fontSize: '12px',
                fontFamily: 'inherit',
                fontWeight: 500
            },
            formatter: function (val, opt) {
                return val + '%';
            },
            offsetX: 10
        },
        xaxis: {
            categories: disbursementSchedule.map(phase => phase.name),
            labels: {
                formatter: function (val) {
                    return val + '%';
                }
            },
            max: 100
        },
        yaxis: {
            labels: {
                maxWidth: 150
            }
        },
        grid: {
            show: false
        }
    };

    const progressChartSeries = [{
        name: 'Progress',
        data: disbursementSchedule.map(phase => phase.progress)
    }];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Selesai':
                return <MdDone className="h-5 w-5 text-green-500" />;
            case 'Aktif':
                return <MdTimeline className="h-5 w-5 text-blue-500" />;
            default:
                return <MdAccessTime className="h-5 w-5 text-gray-400" />;
        }
    };

    return (
        <Card extra="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                        <MdCalendarToday className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="ml-3">
                        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                            Status Pencairan Dana
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Rp {totalAmount.toLocaleString()} Total Alokasi Dana
                        </p>
                    </div>
                </div>
                <span className="px-2.5 py-1.5 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 rounded-full">
                    {disbursementSchedule.length} Tahap
                </span>
            </div>

            {/* Chart section */}
            <div className="mb-5 border border-gray-100 dark:border-navy-700 bg-white dark:bg-navy-800 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <MdTrendingUp className="h-5 w-5 text-brand-500 mr-2" />
                        <h5 className="font-medium text-navy-700 dark:text-white">
                            Visualisasi Dana
                        </h5>
                    </div>

                    <div className="flex space-x-1">
                        <button
                            onClick={() => setActiveTab('distribution')}
                            className={`px-3 py-1 text-xs rounded-md transition-colors ${activeTab === 'distribution'
                                ? 'bg-brand-500 text-white'
                                : 'bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            Distribusi
                        </button>
                        <button
                            onClick={() => setActiveTab('progress')}
                            className={`px-3 py-1 text-xs rounded-md transition-colors ${activeTab === 'progress'
                                ? 'bg-brand-500 text-white'
                                : 'bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            Progress
                        </button>
                    </div>
                </div>

                <div className="h-[240px]">
                    {activeTab === 'distribution' ? (
                        <Chart
                            options={donutChartOptions}
                            series={donutChartSeries}
                            type="donut"
                            height="100%"
                        />
                    ) : (
                        <Chart
                            options={progressChartOptions}
                            series={progressChartSeries}
                            type="bar"
                            height="100%"
                        />
                    )}
                </div>
            </div>

            {/* Timeline view of disbursement phases */}
            <div className="relative flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 dark:scrollbar-thumb-navy-600 pl-6 before:content-[''] before:absolute before:left-2.5 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200 dark:before:bg-navy-700">
                {disbursementSchedule.map((phase, index) => (
                    <div key={phase.phase} className="mb-4 last:mb-0">
                        {/* Timeline dot */}
                        <div className={`absolute left-0 rounded-full p-1.5 shadow-sm ${phase.status === 'Selesai'
                            ? 'bg-green-500'
                            : phase.status === 'Aktif'
                                ? 'bg-blue-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}>
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>

                        {/* Phase card */}
                        <div className={`p-4 rounded-xl shadow-sm border ${phase.status === 'Selesai'
                            ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/20'
                            : phase.status === 'Aktif'
                                ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20'
                                : 'bg-white dark:bg-navy-800 border-gray-100 dark:border-navy-700'
                            }`}>
                            <div className="flex items-start">
                                <div className="flex-grow">
                                    <div className="flex items-center">
                                        {getStatusIcon(phase.status)}
                                        <h5 className="ml-2 text-base font-medium text-navy-700 dark:text-white">
                                            {phase.name}
                                        </h5>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5">
                                        {phase.description}
                                    </p>
                                </div>
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ml-2 ${phase.status === 'Selesai'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : phase.status === 'Aktif'
                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                                    }`}>
                                    {phase.status}
                                </span>
                            </div>                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center">
                                    <MdAttachMoney className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                                        Rp {(phase.amount || 0).toLocaleString()}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                    Target: {phase.date}
                                </span>
                            </div>

                            {phase.progress !== undefined && (
                                <div className="mt-3">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                        <span className={`font-medium ${phase.progress === 100
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-blue-600 dark:text-blue-400'
                                            }`}>
                                            {phase.progress}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-1.5 overflow-hidden">
                                        <div className={`h-1.5 rounded-full ${phase.status === 'Selesai'
                                            ? 'bg-green-500'
                                            : 'bg-blue-500'
                                            }`}
                                            style={{ width: `${phase.progress}%` }}></div>
                                    </div>
                                </div>
                            )}

                            {phase.status === 'Aktif' && (
                                <div className="mt-4 flex">
                                    <Link
                                        to={`/bendahara/funding-management/fund-disbursement?phase=${phase.phase}`}
                                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-brand-500 text-white rounded-lg text-xs font-medium hover:bg-brand-600 transition-colors"
                                    >
                                        Kelola Pencairan
                                    </Link>
                                    <Link
                                        to={`/bendahara/funding-management/disbursement-schedule?phase=${phase.phase}`}
                                        className="flex-1 ml-2 inline-flex items-center justify-center px-3 py-2 bg-white dark:bg-navy-700 border border-gray-200 dark:border-navy-600 rounded-lg text-xs font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors"
                                    >
                                        Detail
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <Link
                    to="/bendahara/funding-management/disbursement-schedule"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-50 dark:bg-brand-500/20 py-3 text-sm font-medium text-brand-500 hover:bg-brand-100 dark:hover:bg-brand-500/30 transition-colors"
                >
                    Lihat Jadwal Pencairan Lengkap
                    <MdOutlineArrowForward className="h-4 w-4" />
                </Link>
            </div>
        </Card>
    );
};

export default DisbursementStatus;