import React, { useState, useEffect } from 'react';
import {
  MdAnalytics,
  MdTrendingUp,
  MdPieChart,
  MdBarChart,
  MdDownload,
  MdShare,
  MdPrint,
  MdInfo,
  MdCalendarToday,
  MdInsights,
  MdCheck,
  MdClose,
  MdFilterAlt,
  MdCompareArrows,
  MdShowChart,
  MdLightbulbOutline,
  MdOutlineBolt
} from 'react-icons/md';
import { FiTarget, FiTrendingUp, FiCheckCircle, FiXCircle, FiDatabase, FiAward, FiPieChart } from 'react-icons/fi';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HasilLaporanAkhir = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  const [activeTab, setActiveTab] = useState('overview');
  const [periodFilter, setPeriodFilter] = useState('6-months');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [chartType, setChartType] = useState('bar'); // 'bar', 'line', or 'stacked'

  const [reportData] = useState({
    reportPeriod: {
      start: "1 Januari 2025",
      end: "30 Juni 2025",
      lastUpdated: "15 Juli 2025, 09:45"
    },
    summary: {
      totalProposals: 387,
      approvedProposals: 302,
      rejectedProposals: 85,
      averageScore: 85.3,
      averageProcessingTime: "3.2 hari",
      successRate: 78.1,
      totalBudget: "Rp 12,5 Miliar"
    },
    departments: {
      "Teknik Informatika": { count: 124, approved: 98, rejected: 26, avgScore: 86.7 },
      "Manajemen": { count: 95, approved: 71, rejected: 24, avgScore: 83.2 },
      "Keuangan": { count: 88, approved: 75, rejected: 13, avgScore: 88.5 },
      "Sumber Daya Manusia": { count: 80, approved: 58, rejected: 22, avgScore: 82.1 }
    },
    mlMetrics: {
      accuracy: 96.2,
      precision: 94.8,
      recall: 95.1,
      f1Score: 95.0,
      falsePositiveRate: 3.4,
      falseNegativeRate: 4.2
    },
    categoryAnalysis: [
      { category: 'Pengadaan Barang', count: 145, percentage: 37, growth: 12, color: '#4F46E5' },
      { category: 'Pengembangan SDM', count: 102, percentage: 26, growth: 8, color: '#8B5CF6' },
      { category: 'Penelitian', count: 85, percentage: 22, growth: 15, color: '#EC4899' },
      { category: 'Infrastruktur', count: 55, percentage: 15, growth: -3, color: '#F59E0B' }
    ],
    monthlyTrends: [
      { month: 'Jan', proposals: 58, approved: 46, rejected: 12, avgScore: 84.3 },
      { month: 'Feb', proposals: 62, approved: 48, rejected: 14, avgScore: 83.8 },
      { month: 'Mar', proposals: 71, approved: 56, rejected: 15, avgScore: 85.1 },
      { month: 'Apr', proposals: 68, approved: 52, rejected: 16, avgScore: 84.7 },
      { month: 'Mei', proposals: 65, approved: 50, rejected: 15, avgScore: 85.6 },
      { month: 'Jun', proposals: 63, approved: 50, rejected: 13, avgScore: 87.2 }
    ],
    insightsAndRecommendations: [
      {
        title: "Peningkatan Sistem Verifikasi",
        description: "Analisis menunjukkan potensi peningkatan akurasi sebesar 2.3% dengan menambahkan verifikasi dua langkah pada proposal kategori pengadaan.",
        impact: "Tinggi",
        status: "new"
      },
      {
        title: "Optimalisasi Algoritma",
        description: "Refining model ML pada kategori penelitian dapat meningkatkan presisi pada proposal dengan nilai di bawah 80.",
        impact: "Medium",
        status: "implemented"
      },
      {
        title: "Pola Penolakan",
        description: "Terdeteksi pola penolakan meningkat 8% pada akhir kuartal, menunjukkan kebutuhan untuk review awal pada periode tersebut.",
        impact: "Tinggi",
        status: "pending"
      }
    ]
  });

  // Prepare chart data from reportData
  const monthlyLabels = reportData.monthlyTrends.map(item => item.month);

  // Bar Chart Data
  const barChartData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: 'Total Proposal',
        data: reportData.monthlyTrends.map(item => item.proposals),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 12,
      },
      {
        label: 'Disetujui',
        data: reportData.monthlyTrends.map(item => item.approved),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 12,
      },
      {
        label: 'Ditolak',
        data: reportData.monthlyTrends.map(item => item.rejected),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 12,
      }
    ]
  };

  // Stacked Bar Chart Data
  const stackedBarChartData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: 'Disetujui',
        data: reportData.monthlyTrends.map(item => item.approved),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 4,
          topRight: 4,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: 'Ditolak',
        data: reportData.monthlyTrends.map(item => item.rejected),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 4,
          topRight: 4,
          bottomLeft: 0,
          bottomRight: 0,
        },
      }
    ]
  };

  // Line Chart Data
  const lineChartData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: 'Total Proposal',
        data: reportData.monthlyTrends.map(item => item.proposals),
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Disetujui',
        data: reportData.monthlyTrends.map(item => item.approved),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Rata-rata Skor',
        data: reportData.monthlyTrends.map(item => item.avgScore),
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(168, 85, 247, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'y1',
      }
    ]
  };

  // Doughnut Chart Data for Category Analysis
  const doughnutChartData = {
    labels: reportData.categoryAnalysis.map(item => item.category),
    datasets: [
      {
        data: reportData.categoryAnalysis.map(item => item.count),
        backgroundColor: reportData.categoryAnalysis.map(item => item.color),
        borderColor: 'white',
        borderWidth: 2,
        hoverOffset: 10,
      }
    ]
  };

  // Chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        }
      },
      y: {
        grid: {
          color: 'rgba(243, 244, 246, 1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          stepSize: 20,
        },
        suggestedMin: 0,
      }
    }
  };

  const stackedBarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        }
      },
      y: {
        stacked: true,
        grid: {
          color: 'rgba(243, 244, 246, 1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          stepSize: 20,
        },
        suggestedMin: 0,
      }
    }
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        }
      },
      y: {
        grid: {
          color: 'rgba(243, 244, 246, 1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
        suggestedMin: 0,
      },
      y1: {
        position: 'right',
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          callback: function (value) {
            return value + '%';
          }
        },
        min: 70,
        max: 100,
      }
    }
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
  };

  // Generate percentage based on reportData.summary
  const approvalRate = Math.round((reportData.summary.approvedProposals / reportData.summary.totalProposals) * 100);
  const rejectionRate = Math.round((reportData.summary.rejectedProposals / reportData.summary.totalProposals) * 100);

  return (
    <div className="space-y-8">
      {/* Header - Modern Glass Morphism Design */}
      <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl" data-aos="fade-down">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-700 via-violet-800 to-indigo-900 opacity-95"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2029')] bg-cover mix-blend-overlay opacity-20"></div>

        <div className="relative p-8 text-white z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <MdCalendarToday className="h-5 w-5 text-purple-200" />
                <span className="text-sm font-medium text-purple-100">Periode: {reportData.reportPeriod.start} - {reportData.reportPeriod.end}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Hasil Laporan Akhir</h1>
              <p className="text-lg text-purple-100">Analisis Komprehensif Sistem Validasi Proposal</p>
              <div className="flex items-center gap-3 mt-4">
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  Last updated: {reportData.reportPeriod.lastUpdated}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-2 backdrop-blur-sm border border-white/20 transition-all">
                <MdPrint className="h-5 w-5" />
                <span>Cetak</span>
              </button>
              <button className="px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-2 backdrop-blur-sm border border-white/20 transition-all">
                <MdShare className="h-5 w-5" />
                <span>Bagikan</span>
              </button>
              <button className="px-4 py-2.5 bg-white bg-opacity-90 text-purple-900 hover:bg-white rounded-xl flex items-center gap-2 backdrop-blur-sm shadow-sm transition-all font-medium">
                <MdDownload className="h-5 w-5" />
                <span>Unduh PDF</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-8 flex border-b border-white/20">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-3 flex items-center gap-2 transition-colors border-b-2 ${activeTab === 'overview' ? 'border-white font-medium' : 'border-transparent text-white/70 hover:text-white hover:border-white/50'}`}
            >
              <MdInsights className="h-5 w-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-5 py-3 flex items-center gap-2 transition-colors border-b-2 ${activeTab === 'departments' ? 'border-white font-medium' : 'border-transparent text-white/70 hover:text-white hover:border-white/50'}`}
            >
              <MdBarChart className="h-5 w-5" />
              <span>Departemen</span>
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`px-5 py-3 flex items-center gap-2 transition-colors border-b-2 ${activeTab === 'trends' ? 'border-white font-medium' : 'border-transparent text-white/70 hover:text-white hover:border-white/50'}`}
            >
              <MdShowChart className="h-5 w-5" />
              <span>Tren</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4" data-aos="fade-up">
        <h2 className="text-xl font-bold text-gray-800">Dashboard Analytics</h2>

        <div className="flex flex-wrap gap-3">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setPeriodFilter('3-months')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${periodFilter === '3-months' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600'}`}
            >
              3 Bulan
            </button>
            <button
              onClick={() => setPeriodFilter('6-months')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${periodFilter === '6-months' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600'}`}
            >
              6 Bulan
            </button>
            <button
              onClick={() => setPeriodFilter('1-year')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${periodFilter === '1-year' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600'}`}
            >
              1 Tahun
            </button>
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-lg border-0 text-sm focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Semua Departemen</option>
            {Object.keys(reportData.departments).map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Key Stats - Modern Cards with Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up">
            <Card extra="p-4 hover:shadow-lg transition-all border-l-4 border-l-indigo-500" data-aos-delay="100">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-indigo-100/70">
                  <FiDatabase className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4 flex flex-col">
                  <p className="text-sm font-medium text-gray-500">Total Proposal</p>
                  <div className="flex items-end gap-2">
                    <h3 className="text-2xl font-bold text-gray-800">{reportData.summary.totalProposals}</h3>
                    <div className="flex items-center text-green-600 text-xs font-medium mb-1">
                      <FiTrendingUp className="h-3 w-3 mr-1" />
                      +12%
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card extra="p-4 hover:shadow-lg transition-all border-l-4 border-l-green-500" data-aos-delay="200">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-green-100/70">
                  <FiCheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4 flex flex-col">
                  <p className="text-sm font-medium text-gray-500">Proposal Disetujui</p>
                  <div className="flex items-end gap-2">
                    <h3 className="text-2xl font-bold text-gray-800">{reportData.summary.approvedProposals}</h3>
                    <span className="text-xs font-medium text-gray-500 mb-1">{approvalRate}%</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card extra="p-4 hover:shadow-lg transition-all border-l-4 border-l-red-500" data-aos-delay="300">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-red-100/70">
                  <FiXCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4 flex flex-col">
                  <p className="text-sm font-medium text-gray-500">Proposal Ditolak</p>
                  <div className="flex items-end gap-2">
                    <h3 className="text-2xl font-bold text-gray-800">{reportData.summary.rejectedProposals}</h3>
                    <span className="text-xs font-medium text-gray-500 mb-1">{rejectionRate}%</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card extra="p-4 hover:shadow-lg transition-all border-l-4 border-l-purple-500" data-aos-delay="400">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-purple-100/70">
                  <FiTarget className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4 flex flex-col">
                  <p className="text-sm font-medium text-gray-500">Rata-rata Skor</p>
                  <div className="flex items-end gap-2">
                    <h3 className="text-2xl font-bold text-gray-800">{reportData.summary.averageScore}%</h3>
                    <div className="flex items-center text-green-600 text-xs font-medium mb-1">
                      <FiTrendingUp className="h-3 w-3 mr-1" />
                      +2.4%
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card extra="p-4 hover:shadow-lg transition-all border-l-4 border-l-amber-500" data-aos-delay="100">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-amber-100/70">
                  <MdCalendarToday className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-4 flex flex-col">
                  <p className="text-sm font-medium text-gray-500">Waktu Pemrosesan</p>
                  <h3 className="text-2xl font-bold text-gray-800">{reportData.summary.averageProcessingTime}</h3>
                </div>
              </div>
            </Card>

            <Card extra="p-4 hover:shadow-lg transition-all border-l-4 border-l-cyan-500" data-aos-delay="200">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-cyan-100/70">
                  <FiAward className="h-6 w-6 text-cyan-600" />
                </div>
                <div className="ml-4 flex flex-col">
                  <p className="text-sm font-medium text-gray-500">Tingkat Keberhasilan</p>
                  <h3 className="text-2xl font-bold text-gray-800">{reportData.summary.successRate}%</h3>
                </div>
              </div>
            </Card>

            <Card extra="p-4 hover:shadow-lg transition-all border-l-4 border-l-blue-500" data-aos-delay="300">
              <div className="flex items-center">
                <div className="rounded-full p-3 bg-blue-100/70">
                  <FiPieChart className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4 flex flex-col">
                  <p className="text-sm font-medium text-gray-500">Total Anggaran</p>
                  <h3 className="text-2xl font-bold text-gray-800">{reportData.summary.totalBudget}</h3>
                </div>
              </div>
            </Card>
          </div>

          {/* ML Performance Metrics - Modern visualization */}
          <Card extra="p-6 hover:shadow-lg transition-all overflow-hidden" data-aos="fade-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <MdAnalytics className="h-5 w-5 mr-2 text-purple-600" />
                Performa Machine Learning
              </h2>
              <button className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <MdInfo className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(reportData.mlMetrics).map(([key, value], index) => (
                <div key={key} className="relative" data-aos="fade-up" data-aos-delay={index * 50}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl"></div>
                  <div className="relative p-4 rounded-xl border border-gray-100 bg-white bg-opacity-50 backdrop-blur-sm">
                    <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-2xl font-bold text-gray-800">{value}%</span>
                      <div className="flex-1">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
                            style={{ width: `${value}%`, transition: 'width 1s ease-in-out' }}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">0%</span>
                          <span className="text-xs text-gray-500">100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Category Analysis & Recommendations - Modern 2 column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card extra="p-6 hover:shadow-lg transition-all" data-aos="fade-right">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <MdPieChart className="h-5 w-5 mr-2 text-purple-600" />
                  Analisis Kategori
                </h2>
                <button className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <MdInfo className="h-5 w-5" />
                </button>
              </div>

              <div className="h-[300px] mb-4">
                <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
              </div>

              <div className="space-y-4 mt-6">
                {reportData.categoryAnalysis.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="text-gray-700 font-medium">{category.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-800 font-medium">{category.count}</span>
                      <div className={`flex items-center text-xs ${category.growth >= 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                        {category.growth >= 0 ?
                          <FiTrendingUp className="h-3 w-3 mr-1" /> :
                          <MdTrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                        }
                        {category.growth >= 0 ? '+' : ''}{category.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card extra="p-6 hover:shadow-lg transition-all" data-aos="fade-left">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <MdLightbulbOutline className="h-5 w-5 mr-2 text-purple-600" />
                Insight & Rekomendasi
              </h2>
              <div className="space-y-5">
                {reportData.insightsAndRecommendations.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${item.impact === 'Tinggi'
                      ? 'bg-red-50 border-red-100'
                      : item.impact === 'Medium'
                        ? 'bg-amber-50 border-amber-100'
                        : 'bg-blue-50 border-blue-100'
                      }`}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${item.impact === 'Tinggi'
                        ? 'bg-red-100 text-red-600'
                        : item.impact === 'Medium'
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-blue-100 text-blue-600'
                        }`}>
                        <MdOutlineBolt className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          {item.status === 'new' && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Baru</span>
                          )}
                          {item.status === 'implemented' && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Diterapkan</span>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-medium text-gray-500">Impact:</span>
                          <span className={`text-xs font-medium ${item.impact === 'Tinggi' ? 'text-red-600' :
                            item.impact === 'Medium' ? 'text-amber-600' : 'text-blue-600'
                            }`}>{item.impact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}

      {activeTab === 'departments' && (
        <div className="grid grid-cols-1 gap-6" data-aos="fade-up">
          <Card extra="p-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Performa Per Departemen</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Departemen</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Total</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Disetujui</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Ditolak</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Rata-rata Skor</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Success Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(reportData.departments).map(([dept, data], index) => {
                    const successRate = Math.round((data.approved / data.count) * 100);
                    return (
                      <tr key={dept} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-50 transition-colors`}>
                        <td className="py-3 px-4 border-b border-gray-100">
                          <div className="font-medium text-gray-800">{dept}</div>
                        </td>
                        <td className="py-3 px-4 border-b border-gray-100">{data.count}</td>
                        <td className="py-3 px-4 border-b border-gray-100">
                          <div className="flex items-center gap-1">
                            <span className="text-green-600">{data.approved}</span>
                            <span className="text-xs text-gray-500">({Math.round((data.approved / data.count) * 100)}%)</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 border-b border-gray-100">
                          <div className="flex items-center gap-1">
                            <span className="text-red-600">{data.rejected}</span>
                            <span className="text-xs text-gray-500">({Math.round((data.rejected / data.count) * 100)}%)</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${data.avgScore >= 85 ? 'bg-green-500' :
                                  data.avgScore >= 75 ? 'bg-blue-500' : 'bg-amber-500'
                                  }`}
                                style={{ width: `${data.avgScore}%` }}
                              />
                            </div>
                            <span>{data.avgScore}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 border-b border-gray-100">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${successRate >= 85 ? 'bg-green-100 text-green-800' :
                            successRate >= 75 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                            {successRate}%
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="grid grid-cols-1 gap-6" data-aos="fade-up">
          <Card extra="p-6 hover:shadow-lg transition-all">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Tren Bulanan</h2>

              <div className="flex items-center space-x-4">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setChartType('bar')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors flex items-center ${chartType === "bar" ? "bg-white shadow-sm text-gray-800" : "text-gray-600"
                      }`}
                  >
                    <MdBarChart className="h-4 w-4 mr-1" />
                    Bar
                  </button>
                  <button
                    onClick={() => setChartType('stacked')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors flex items-center ${chartType === "stacked" ? "bg-white shadow-sm text-gray-800" : "text-gray-600"
                      }`}
                  >
                    <MdCompareArrows className="h-4 w-4 mr-1" />
                    Stacked
                  </button>
                  <button
                    onClick={() => setChartType('line')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors flex items-center ${chartType === "line" ? "bg-white shadow-sm text-gray-800" : "text-gray-600"
                      }`}
                  >
                    <MdShowChart className="h-4 w-4 mr-1" />
                    Line
                  </button>
                </div>
              </div>
            </div>

            <div className="h-[400px] mb-6">
              {chartType === 'bar' && <Bar data={barChartData} options={barChartOptions} />}
              {chartType === 'stacked' && <Bar data={stackedBarChartData} options={stackedBarChartOptions} />}
              {chartType === 'line' && <Line data={lineChartData} options={lineChartOptions} />}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl text-center">
                <span className="text-sm text-gray-600">Rata-rata Proposal/Bulan</span>
                <div className="text-2xl font-bold text-gray-800 mt-1">
                  {Math.round(reportData.monthlyTrends.reduce((sum, month) => sum + month.proposals, 0) / reportData.monthlyTrends.length)}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl text-center">
                <span className="text-sm text-gray-600">Tertinggi</span>
                <div className="text-2xl font-bold text-gray-800 mt-1">
                  {Math.max(...reportData.monthlyTrends.map(month => month.proposals))}
                </div>
                <div className="text-xs text-gray-500">{reportData.monthlyTrends.reduce((highest, month) =>
                  month.proposals > highest.proposals ? month : highest
                ).month}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl text-center">
                <span className="text-sm text-gray-600">Tren</span>
                <div className="flex justify-center items-center mt-1">
                  <FiTrendingUp className="h-5 w-5 mr-1 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">+3.8%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Metric Cards for In-depth Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card extra="p-6 hover:shadow-lg transition-all" data-aos="fade-up">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <MdAnalytics className="h-5 w-5 mr-2 text-purple-600" />
                Perbandingan Tingkat Persetujuan
              </h2>
              <p className="text-gray-600 text-sm mb-6">Rasio proposal yang disetujui terhadap total proposal per bulan</p>

              <div className="space-y-4">
                {reportData.monthlyTrends.map((month, index) => {
                  const approvalPercentage = Math.round((month.approved / month.proposals) * 100);
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="min-w-[40px] text-gray-600 font-medium">{month.month}</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <div className="flex items-center text-sm">
                            <span className="font-medium">{approvalPercentage}%</span>
                            <span className="ml-2 text-gray-500">({month.approved}/{month.proposals})</span>
                          </div>
                          <span className="text-sm text-gray-500">{month.avgScore.toFixed(1)}% avg score</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${approvalPercentage >= 85 ? 'bg-green-500' :
                                approvalPercentage >= 75 ? 'bg-blue-500' : 'bg-amber-500'
                              }`}
                            style={{ width: `${approvalPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card extra="p-6 hover:shadow-lg transition-all" data-aos="fade-up">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <MdShowChart className="h-5 w-5 mr-2 text-purple-600" />
                Tren Rata-rata Skor
              </h2>
              <p className="text-gray-600 text-sm mb-6">Perkembangan kualitas proposal berdasarkan skor rata-rata bulanan</p>

              <div className="h-[240px]">
                <Line
                  data={{
                    labels: monthlyLabels,
                    datasets: [{
                      label: 'Rata-rata Skor',
                      data: reportData.monthlyTrends.map(item => item.avgScore),
                      borderColor: 'rgba(147, 51, 234, 1)',
                      backgroundColor: 'rgba(147, 51, 234, 0.1)',
                      fill: true,
                      tension: 0.4,
                      pointBackgroundColor: 'rgba(147, 51, 234, 1)',
                      pointBorderColor: '#fff',
                      pointBorderWidth: 2,
                      pointRadius: 4,
                      pointHoverRadius: 6,
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        min: 70,
                        max: 100,
                        ticks: {
                          callback: function (value) {
                            return value + '%';
                          }
                        },
                      }
                    }
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default HasilLaporanAkhir;
