import React, { useState } from "react";
import Card from "components/card";
import { Link } from "react-router-dom";
import { MdAssessment, MdCheckCircle, MdPendingActions, MdWarning, MdOutlineArrowForward, MdSearch, MdFilterList } from "react-icons/md";
import Chart from 'react-apexcharts';

const CurrentFinancialReports = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showDetailList, setShowDetailList] = useState(false);
    const [activeChart, setActiveChart] = useState("status");

    // Dummy financial reports data - aggregate stats
    const financialReportsStats = {
        submittedReports: 28,
        pendingVerification: 12,
        verified: 16,
        issues: 3
    };

    // Dummy financial reports detailed data
    const dummyFinancialReports = [
        {
            id: "LKP-2025-042",
            proposalId: "PRP-2025-042",
            title: "Laporan Keuangan - Machine Learning untuk Deteksi Penyakit",
            researcher: "Dr. Budi Santoso",
            amount: 75000000,
            amountSpent: 42500000,
            submissionDate: "12 Jun 2025",
            dueDate: "15 Jul 2025",
            status: "pending",
            progress: 65,
            attachments: 4,
            comments: 2
        },
        {
            id: "LKP-2025-038",
            proposalId: "PRP-2025-038",
            title: "Laporan Keuangan - Analisis Dampak Ekonomi",
            researcher: "Prof. Dewi Lestari",
            amount: 65000000,
            amountSpent: 38250000,
            submissionDate: "10 Jun 2025",
            dueDate: "10 Jul 2025",
            status: "verified",
            progress: 70,
            attachments: 5,
            comments: 0
        },
        {
            id: "LKP-2025-036",
            proposalId: "PRP-2025-036",
            title: "Laporan Keuangan - Metode Pembelajaran Jarak Jauh",
            researcher: "Dr. Andi Wijaya",
            amount: 50000000,
            amountSpent: 35000000,
            submissionDate: "08 Jun 2025",
            dueDate: "08 Jul 2025",
            status: "verified",
            progress: 85,
            attachments: 6,
            comments: 1
        },
        {
            id: "LKP-2025-035",
            proposalId: "PRP-2025-035",
            title: "Laporan Keuangan - Monitoring Kualitas Air",
            researcher: "Dr. Ratna Sari",
            amount: 82000000,
            amountSpent: 37500000,
            submissionDate: "07 Jun 2025",
            dueDate: "07 Jul 2025",
            status: "issue",
            progress: 45,
            attachments: 3,
            comments: 7,
            issue: "Dokumentasi pengeluaran tidak lengkap"
        },
        {
            id: "LKP-2025-032",
            proposalId: "PRP-2025-032",
            title: "Laporan Keuangan - Bahan Bakar Alternatif",
            researcher: "Prof. Hendra Gunawan",
            amount: 95000000,
            amountSpent: 68000000,
            submissionDate: "05 Jun 2025",
            dueDate: "05 Jul 2025",
            status: "pending",
            progress: 75,
            attachments: 7,
            comments: 2
        },
        {
            id: "LKP-2025-029",
            proposalId: "PRP-2025-029",
            title: "Laporan Keuangan - Big Data untuk Prediksi Konsumen",
            researcher: "Dr. Maya Putri",
            amount: 68000000,
            amountSpent: 41000000,
            submissionDate: "04 Jun 2025",
            dueDate: "04 Jul 2025",
            status: "verified",
            progress: 60,
            attachments: 5,
            comments: 1
        },
        {
            id: "LKP-2025-027",
            proposalId: "PRP-2025-027",
            title: "Laporan Keuangan - Blockchain dalam Sistem Pembiayaan",
            researcher: "Dr. Farhan Akbar",
            amount: 90000000,
            amountSpent: 54000000,
            submissionDate: "02 Jun 2025",
            dueDate: "02 Jul 2025",
            status: "pending",
            progress: 80,
            attachments: 6,
            comments: 3
        },
        {
            id: "LKP-2025-025",
            proposalId: "PRP-2025-025",
            title: "Laporan Keuangan - Vaksin Berbasis DNA",
            researcher: "Prof. Amelia Wijaya",
            amount: 120000000,
            amountSpent: 84000000,
            submissionDate: "31 Mei 2025",
            dueDate: "30 Jun 2025",
            status: "verified",
            progress: 90,
            attachments: 8,
            comments: 0
        },
        {
            id: "LKP-2025-023",
            proposalId: "PRP-2025-023",
            title: "Laporan Keuangan - Optimasi Proses Manufaktur",
            researcher: "Dr. Rudi Hartanto",
            amount: 85000000,
            amountSpent: 62000000,
            submissionDate: "28 Mei 2025",
            dueDate: "28 Jun 2025",
            status: "verified",
            progress: 95,
            attachments: 7,
            comments: 1
        },
        {
            id: "LKP-2025-022",
            proposalId: "PRP-2025-022",
            title: "Laporan Keuangan - Kebijakan Publik Era Digital",
            researcher: "Prof. Diana Kusuma",
            amount: 55000000,
            amountSpent: 28000000,
            submissionDate: "25 Mei 2025",
            dueDate: "25 Jun 2025",
            status: "issue",
            progress: 50,
            attachments: 4,
            comments: 5,
            issue: "Pengeluaran melebihi anggaran untuk beberapa item"
        }
    ];

    // Chart configuration for status distribution
    const statusChartOptions = {
        chart: {
            type: 'donut',
            foreColor: '#697a8d',
        },
        colors: ['#ffab00', '#00c853', '#ff1744'],
        labels: ['Menunggu Verifikasi', 'Terverifikasi', 'Bermasalah'],
        legend: {
            position: 'bottom',
            fontSize: '12px',
            fontFamily: 'inherit',
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#566a7f',
                        }
                    }
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 250
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const statusChartSeries = [
        financialReportsStats.pendingVerification,
        financialReportsStats.verified,
        financialReportsStats.issues
    ];

    // Chart configuration for spending vs budget
    const spendingChartOptions = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: false,
            toolbar: {
                show: false
            },
            foreColor: '#697a8d',
        },
        colors: ['#2196f3', '#e0e0e0'],
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '80%',
                borderRadius: 3,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(0) + '%';
            },
            offsetX: 30,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        grid: {
            show: false,
        },
        xaxis: {
            categories: dummyFinancialReports.slice(0, 5).map(report => report.title.substring(19)),
            labels: {
                formatter: function (val) {
                    return val + "%";
                }
            },
            max: 100
        },
        yaxis: {
            title: {
                text: undefined
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "%";
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            offsetY: 10
        }
    };

    const spendingChartSeries = [
        {
            name: 'Dana Terpakai',
            data: dummyFinancialReports.slice(0, 5).map(report => Math.round((report.amountSpent / report.amount) * 100))
        }
    ];

    // Chart configuration for progress trend
    const progressChartOptions = {
        chart: {
            type: 'area',
            height: 350,
            toolbar: {
                show: false
            },
            foreColor: '#697a8d',
        },
        colors: ['#7367f0'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
            }
        },
        xaxis: {
            categories: dummyFinancialReports.slice(0, 7).map(report => report.submissionDate),
            axisBorder: {
                show: false
            },
        },
        yaxis: {
            min: 0,
            max: 100,
            labels: {
                formatter: function (val) {
                    return val.toFixed(0) + "%";
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "%";
                }
            }
        }
    };

    const progressChartSeries = [
        {
            name: 'Progress Penelitian',
            data: dummyFinancialReports.slice(0, 7).map(report => report.progress).reverse()
        }
    ];

    const filteredReports = dummyFinancialReports.filter(
        (report) =>
            report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.researcher.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "text-amber-600 dark:text-amber-400";
            case "verified":
                return "text-green-600 dark:text-green-400";
            case "issue":
                return "text-red-600 dark:text-red-400";
            default:
                return "text-gray-600 dark:text-gray-400";
        }
    };

    const getStatusBg = (status) => {
        switch (status) {
            case "pending":
                return "bg-amber-50 dark:bg-amber-900/10";
            case "verified":
                return "bg-green-50 dark:bg-green-900/10";
            case "issue":
                return "bg-red-50 dark:bg-red-900/10";
            default:
                return "bg-gray-50 dark:bg-navy-700/50";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <MdPendingActions className="h-4 w-4" />;
            case "verified":
                return <MdCheckCircle className="h-4 w-4" />;
            case "issue":
                return <MdWarning className="h-4 w-4" />;
            default:
                return null;
        }
    };

    return (
        <Card extra="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <MdAssessment className="h-6 w-6 text-blue-500 mr-2" />
                    <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                        Status Laporan Keuangan
                    </h4>
                </div>
                <button
                    onClick={() => setShowDetailList(!showDetailList)}
                    className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-colors"
                >
                    {showDetailList ? "Lihat Statistik" : "Lihat Detail"}
                </button>
            </div>

            {!showDetailList ? (
                <>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="flex flex-col justify-between p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-xl">
                            <div className="mb-2">
                                <p className="text-xs text-blue-700 dark:text-blue-400">Total Laporan</p>
                                <h5 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                    {financialReportsStats.submittedReports}
                                </h5>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600 dark:text-gray-400">Laporan aktif</span>
                                <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400 rounded-full">
                                    Q2 2025
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl">
                            <div className="flex items-center">
                                <MdPendingActions className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                                <p className="text-xs text-amber-700 dark:text-amber-400">Menunggu Verifikasi</p>
                            </div>
                            <h5 className="text-2xl font-bold text-navy-700 dark:text-white my-2">
                                {financialReportsStats.pendingVerification}
                            </h5>
                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-1.5">
                                <div
                                    className="bg-amber-500 h-1.5 rounded-full"
                                    style={{ width: `${(financialReportsStats.pendingVerification / financialReportsStats.submittedReports) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between p-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-xl">
                            <div className="flex items-center">
                                <MdCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                                <p className="text-xs text-green-700 dark:text-green-400">Terverifikasi</p>
                            </div>
                            <h5 className="text-2xl font-bold text-navy-700 dark:text-white my-2">
                                {financialReportsStats.verified}
                            </h5>
                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-1.5">
                                <div
                                    className="bg-green-500 h-1.5 rounded-full"
                                    style={{ width: `${(financialReportsStats.verified / financialReportsStats.submittedReports) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl">
                            <div className="flex items-center">
                                <MdWarning className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                                <p className="text-xs text-red-700 dark:text-red-400">Bermasalah</p>
                            </div>
                            <h5 className="text-2xl font-bold text-navy-700 dark:text-white my-2">
                                {financialReportsStats.issues}
                            </h5>
                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-1.5">
                                <div
                                    className="bg-red-500 h-1.5 rounded-full"
                                    style={{ width: `${(financialReportsStats.issues / financialReportsStats.submittedReports) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="mt-4 border border-gray-100 dark:border-navy-700 rounded-xl p-3 bg-white dark:bg-navy-800">
                        <div className="flex justify-between items-center mb-2">
                            <h5 className="text-sm font-medium text-navy-700 dark:text-white">Visualisasi Data</h5>
                            <div className="flex space-x-1">
                                <button
                                    onClick={() => setActiveChart("status")}
                                    className={`px-2 py-1 text-xs rounded-md ${activeChart === "status"
                                        ? "bg-brand-500 text-white"
                                        : "bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300"}`}
                                >
                                    Status
                                </button>
                                <button
                                    onClick={() => setActiveChart("spending")}
                                    className={`px-2 py-1 text-xs rounded-md ${activeChart === "spending"
                                        ? "bg-brand-500 text-white"
                                        : "bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300"}`}
                                >
                                    Pengeluaran
                                </button>
                                <button
                                    onClick={() => setActiveChart("progress")}
                                    className={`px-2 py-1 text-xs rounded-md ${activeChart === "progress"
                                        ? "bg-brand-500 text-white"
                                        : "bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300"}`}
                                >
                                    Progress
                                </button>
                            </div>
                        </div>

                        <div className="mt-2 chart-container" style={{ height: "300px" }}>
                            {activeChart === "status" && (
                                <Chart
                                    options={statusChartOptions}
                                    series={statusChartSeries}
                                    type="donut"
                                    height="100%"
                                />
                            )}

                            {activeChart === "spending" && (
                                <Chart
                                    options={spendingChartOptions}
                                    series={spendingChartSeries}
                                    type="bar"
                                    height="100%"
                                />
                            )}

                            {activeChart === "progress" && (
                                <Chart
                                    options={progressChartOptions}
                                    series={progressChartSeries}
                                    type="area"
                                    height="100%"
                                />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col flex-grow">
                    <div className="mb-3 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MdSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                            placeholder="Cari laporan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 dark:scrollbar-thumb-navy-600">
                        <div className="flex flex-col gap-2">
                            {filteredReports.length > 0 ? (
                                filteredReports.map((report) => (
                                    <div
                                        key={report.id}
                                        className="p-3 rounded-xl bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h5 className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[75%]">
                                                {report.title}
                                            </h5>
                                            <div className={`px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-medium ${getStatusBg(report.status)} ${getStatusColor(report.status)}`}>
                                                {getStatusIcon(report.status)}
                                                <span>
                                                    {report.status === "pending" ? "Menunggu" :
                                                        report.status === "verified" ? "Terverifikasi" :
                                                            "Bermasalah"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {report.researcher} • {report.id}
                                                </span>
                                            </div>
                                            <span className="text-xs font-medium text-brand-500">
                                                Rp {report.amountSpent.toLocaleString()} / {report.amount.toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="mt-2">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-gray-500 dark:text-gray-400">Progress</span>
                                                <span className="text-gray-700 dark:text-gray-300">{report.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-1.5">
                                                <div
                                                    className={`h-1.5 rounded-full ${report.status === "issue" ? "bg-red-500" :
                                                        report.status === "verified" ? "bg-green-500" : "bg-amber-500"
                                                        }`}
                                                    style={{ width: `${report.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
                                    Tidak ada laporan yang sesuai dengan pencarian
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4">
                <Link
                    to="/bendahara/report-verification/financial-progress-reports"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-50 dark:bg-brand-500/20 py-2.5 text-sm font-medium text-brand-500 hover:bg-brand-100 dark:hover:bg-brand-500/30 transition-colors"
                >
                    Verifikasi Laporan Keuangan
                    <MdOutlineArrowForward className="h-4 w-4" />
                </Link>
            </div>
        </Card>
    );
};

export default CurrentFinancialReports;
