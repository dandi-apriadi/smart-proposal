import React, { useState, useEffect } from 'react';
import {
  MdInsights,
  MdTrendingUp,
  MdTrendingDown,
  MdPieChart,
  MdTimeline,
  MdPeople,
  MdAssignment,
  MdAutorenew,
  MdDownload,
  MdOutlinePlayCircle,
  MdOutlinePauseCircle,
  MdCategory,
  MdAccessTime,
  MdDateRange,
  MdBarChart,
  MdCheck,
  MdClose,
  MdOutlineRefresh,
  MdSearch
} from 'react-icons/md';
import { FiClock, FiFilter } from 'react-icons/fi';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactApexChart from 'react-apexcharts';

const LaporanKemajuanSession = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [sessionProgress] = useState({
    currentSession: {
      id: 'SES-2025-087',
      name: 'Validasi Proposal Q2 2025',
      date: '15 April 2025',
      startTime: '09:30',
      elapsedTime: '02:45:12',
      remainingTime: '01:14:48',
      duration: '240', // minutes
      status: 'active',
      progress: 64,
      activeUsers: 27,
      totalProposals: 52,
      validatedProposals: 33,
      pendingProposals: 19,
      approvalRate: 78,
      mlAccuracy: 94.3,
      trends: {
        activeUsers: [12, 18, 23, 25, 27],
        validatedProposals: [8, 15, 21, 28, 33],
        mlAccuracy: [92.1, 92.8, 93.5, 93.9, 94.3]
      }
    },
    validationMetrics: {
      formatCompliance: {
        value: 93,
        trend: 'up',
        change: '+2.5%',
        color: 'emerald'
      },
      documentCompleteness: {
        value: 89,
        trend: 'up',
        change: '+1.2%',
        color: 'blue'
      },
      contentStandardization: {
        value: 92,
        trend: 'stable',
        change: '0%',
        color: 'indigo'
      },
      budgetAccuracy: {
        value: 86,
        trend: 'down',
        change: '-1.3%',
        color: 'amber'
      },
      timelineRealism: {
        value: 90,
        trend: 'up',
        change: '+3.1%',
        color: 'violet'
      }
    },
    departmentStats: [
      { name: 'Teknik Informatika', count: 12, percentage: 23 },
      { name: 'Teknik Elektro', count: 9, percentage: 17 },
      { name: 'Manajemen Bisnis', count: 8, percentage: 15 },
      { name: 'P3M', count: 7, percentage: 14 },
      { name: 'Akuntansi', count: 6, percentage: 12 },
      { name: 'Lainnya', count: 10, percentage: 19 }
    ],
    recentValidations: [
      {
        id: 'PRO-087',
        title: "Pengembangan AI untuk Optimasi Energi Kampus",
        time: "10:45",
        timestamp: "15 Apr 2025, 10:45",
        status: "validated",
        score: 96,
        department: "Teknik Informatika",
        reviewer: "Dr. Budi Santoso",
        validationTime: "8.2"
      },
      {
        id: 'PRO-086',
        title: "Workshop Nasional Machine Learning 2025",
        time: "10:32",
        timestamp: "15 Apr 2025, 10:32",
        status: "revision",
        score: 82,
        department: "P3M",
        reviewer: "Dr. Rina Wijaya",
        validationTime: "12.5",
        issues: ["Anggaran belum terperinci", "Timeline kegiatan belum jelas"]
      },
      {
        id: 'PRO-085',
        title: "Sistem IoT untuk Efisiensi Laboratorium",
        time: "10:18",
        timestamp: "15 Apr 2025, 10:18",
        status: "validated",
        score: 93,
        department: "Teknik Elektro",
        reviewer: "Prof. Hendra Kuswanto",
        validationTime: "7.8"
      },
      {
        id: 'PRO-084',
        title: "Pelatihan Kewirausahaan Digital",
        time: "10:05",
        timestamp: "15 Apr 2025, 10:05",
        status: "rejected",
        score: 67,
        department: "Manajemen Bisnis",
        reviewer: "Dr. Maya Purnama",
        validationTime: "9.4",
        issues: ["Format proposal tidak sesuai", "Biaya terlalu tinggi", "Jadwal bertabrakan dengan kegiatan lain"]
      },
      {
        id: 'PRO-083',
        title: "Pengabdian Masyarakat: Digitalisasi UMKM",
        time: "09:52",
        timestamp: "15 Apr 2025, 09:52",
        status: "validated",
        score: 91,
        department: "Akuntansi",
        reviewer: "Dr. Amir Pratama",
        validationTime: "10.1"
      }
    ]
  });

  // Helper functions
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <MdTrendingUp className="h-4 w-4 text-emerald-600" />;
      case 'down': return <MdTrendingDown className="h-4 w-4 text-red-600" />;
      default: return <MdTimeline className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'validated':
        return 'bg-emerald-100 text-emerald-800';
      case 'revision':
        return 'bg-amber-100 text-amber-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'validated':
        return <MdCheck className="h-4 w-4 text-emerald-600" />;
      case 'revision':
        return <MdOutlineRefresh className="h-4 w-4 text-amber-600" />;
      case 'rejected':
        return <MdClose className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  // Chart options
  const proposalProgressOptions = {
    chart: {
      type: 'radialBar',
      height: 230,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.05
          }
        },
        track: {
          background: '#f2f2f2',
          strokeWidth: '100%',
          margin: 0
        },
        dataLabels: {
          name: {
            fontSize: '16px',
            color: '#888',
            offsetY: -10
          },
          value: {
            offsetY: 0,
            fontSize: '22px',
            color: '#111',
            formatter: function (val) {
              return val + "%";
            }
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#4f46e5'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      dashArray: 4
    },
    colors: ['#6366f1'],
    labels: ['Progress'],
  };

  const departmentChartOptions = {
    chart: {
      type: 'donut',
      height: 250,
      toolbar: {
        show: false
      }
    },
    labels: sessionProgress.departmentStats.map(dept => dept.name),
    colors: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f97316'],
    legend: {
      position: 'bottom',
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
      offsetY: 0
    },
    plotOptions: {
      pie: {
        donut: {
          size: '55%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              color: '#111',
              offsetY: 2,
              formatter: function (val) {
                return val + '%';
              }
            },
            total: {
              show: true,
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              label: 'Total',
              color: '#888',
              formatter: function () {
                return sessionProgress.currentSession.totalProposals;
              }
            }
          }
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }],
    dataLabels: {
      enabled: false
    }
  };

  const trendsChartOptions = {
    chart: {
      type: 'area',
      height: 150,
      sparkline: {
        enabled: true
      },
      toolbar: {
        show: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      padding: {
        top: 10,
        right: 0,
        bottom: 0,
        left: 0
      },
    }
  };

  return (
    <div className="space-y-6">
      {/* Header - Modern Design with More Info */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg" data-aos="fade-down">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <MdInsights className="h-7 w-7" />
              <h1 className="text-3xl font-bold">Laporan Kemajuan Sesi</h1>
              <span className={`ml-2 px-3 py-1 text-xs font-medium rounded-full ${sessionProgress.currentSession.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                }`}>
                {sessionProgress.currentSession.status === 'active' ? 'Aktif' : 'Paused'}
              </span>
            </div>
            <p className="text-xl opacity-90">{sessionProgress.currentSession.name}</p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-2">
                <MdDateRange className="h-4 w-4" />
                <span>{sessionProgress.currentSession.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="h-4 w-4" />
                <span>Mulai: {sessionProgress.currentSession.startTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MdAccessTime className="h-4 w-4" />
                <span>Sisa Waktu: {sessionProgress.currentSession.remainingTime}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl transition-all flex items-center gap-2">
              {sessionProgress.currentSession.status === 'active' ?
                <MdOutlinePauseCircle className="h-5 w-5" /> :
                <MdOutlinePlayCircle className="h-5 w-5" />
              }
              {sessionProgress.currentSession.status === 'active' ? 'Jeda Sesi' : 'Lanjutkan'}
            </button>
            <button className="px-4 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-2 font-medium">
              <MdDownload className="h-5 w-5" />
              Unduh Laporan
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Overview - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" data-aos="fade-up">
        <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="rounded-full p-3 bg-indigo-100">
              <MdAssignment className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
              Total
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 font-medium">Proposal Diajukan</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {sessionProgress.currentSession.totalProposals}
            </h3>
            <div className="flex items-center mt-2 text-xs font-medium text-indigo-600">
              <MdTrendingUp className="h-4 w-4 mr-1" />
              <span>+{sessionProgress.currentSession.trends.validatedProposals[sessionProgress.currentSession.trends.validatedProposals.length - 1] - sessionProgress.currentSession.trends.validatedProposals[0]} dari sesi sebelumnya</span>
            </div>
          </div>
        </Card>

        <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="rounded-full p-3 bg-emerald-100">
              <MdAutorenew className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {Math.round((sessionProgress.currentSession.validatedProposals / sessionProgress.currentSession.totalProposals) * 100)}%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 font-medium">Tervalidasi</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {sessionProgress.currentSession.validatedProposals}
            </h3>
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full"
                  style={{ width: `${Math.round((sessionProgress.currentSession.validatedProposals / sessionProgress.currentSession.totalProposals) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="rounded-full p-3 bg-blue-100">
              <MdPeople className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800">
              Online
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 font-medium">Pengguna Aktif</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {sessionProgress.currentSession.activeUsers}
            </h3>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <ReactApexChart
                options={{
                  ...trendsChartOptions,
                  colors: ['#3b82f6']
                }}
                series={[{ name: 'Pengguna', data: sessionProgress.currentSession.trends.activeUsers }]
                }
                type="area"
                height={30}
                width={80}
              />
              <span className="ml-2 font-medium text-blue-600">
                +{sessionProgress.currentSession.trends.activeUsers[sessionProgress.currentSession.trends.activeUsers.length - 1] - sessionProgress.currentSession.trends.activeUsers[0]}
              </span>
            </div>
          </div>
        </Card>

        <Card extra="p-5 hover:shadow-lg transition-all border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="rounded-full p-3 bg-purple-100">
              <MdTrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-800">
              AI
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 font-medium">Akurasi ML</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {sessionProgress.currentSession.mlAccuracy}%
            </h3>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <ReactApexChart
                options={{
                  ...trendsChartOptions,
                  colors: ['#8b5cf6']
                }}
                series={[{ name: 'Akurasi', data: sessionProgress.currentSession.trends.mlAccuracy }]
                }
                type="area"
                height={30}
                width={80}
              />
              <span className="ml-2 font-medium text-purple-600">
                +{(sessionProgress.currentSession.trends.mlAccuracy[sessionProgress.currentSession.trends.mlAccuracy.length - 1] - sessionProgress.currentSession.trends.mlAccuracy[0]).toFixed(1)}%
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Dashboard Overview - Second Row with Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Circular Progress Chart */}
        <Card extra="p-6" data-aos="fade-up">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MdPieChart className="h-5 w-5 text-indigo-600" />
            Progress Sesi
          </h2>
          <div className="flex flex-col items-center">
            <ReactApexChart
              options={proposalProgressOptions}
              series={[sessionProgress.currentSession.progress]}
              type="radialBar"
              height={230}
            />
            <div className="text-center mt-3">
              <p className="text-sm text-gray-600">Status Validasi Proposal</p>
              <div className="flex justify-center gap-4 mt-3">
                <div className="flex flex-col items-center">
                  <div className="text-emerald-600 text-xl font-bold">{sessionProgress.currentSession.validatedProposals}</div>
                  <div className="text-xs text-gray-500">Tervalidasi</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-amber-600 text-xl font-bold">{sessionProgress.currentSession.pendingProposals}</div>
                  <div className="text-xs text-gray-500">Menunggu</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-indigo-600 text-xl font-bold">{sessionProgress.currentSession.approvalRate}%</div>
                  <div className="text-xs text-gray-500">Rata-rata Persetujuan</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Validation Metrics */}
        <Card extra="p-6" data-aos="fade-up">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MdBarChart className="h-5 w-5 text-indigo-600" />
            Metrik Validasi
          </h2>
          <div className="space-y-5">
            {Object.entries(sessionProgress.validationMetrics).map(([key, metric]) => (
              <div key={key}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full bg-${metric.color}-500`}></span>
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-xs font-medium ${metric.trend === 'up' ? 'text-emerald-600' :
                        metric.trend === 'down' ? 'text-red-600' :
                          'text-gray-600'
                      }`}>
                      {metric.change}
                    </span>
                    <span className="text-sm font-medium text-indigo-700">{metric.value}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className={`bg-${metric.color}-500 h-2.5 rounded-full transition-all`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Department Distribution */}
        <Card extra="p-6" data-aos="fade-up">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MdCategory className="h-5 w-5 text-indigo-600" />
            Distribusi Departemen
          </h2>
          <ReactApexChart
            options={departmentChartOptions}
            series={sessionProgress.departmentStats.map(dept => dept.percentage)}
            type="donut"
            height={250}
          />
        </Card>
      </div>

      {/* Recent Validations - Enhanced with more details */}
      <Card extra="p-6" data-aos="fade-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <MdTimeline className="h-5 w-5 text-indigo-600" />
            Validasi Terbaru
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari proposal..."
                className="pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <MdSearch className="absolute left-3 top-2 text-gray-400 h-4 w-4" />
            </div>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all">
              <FiFilter className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {sessionProgress.recentValidations.map((validation) => (
            <div
              key={validation.id}
              className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md">
                      {validation.id}
                    </span>
                    <h3 className="font-medium text-gray-800 line-clamp-1">{validation.title}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
                    <span className="text-gray-600">{validation.department}</span>
                    <span className="flex items-center text-gray-500">
                      <FiClock className="h-3 w-3 mr-1" />
                      {validation.timestamp}
                    </span>
                    <span className="text-gray-500">
                      Reviewer: <span className="text-gray-700">{validation.reviewer}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 bg-gray-50 rounded-lg text-sm text-gray-600">
                    {validation.validationTime} menit
                  </div>
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusBadge(validation.status)}`}>
                    {getStatusIcon(validation.status)}
                    <span>
                      {validation.status === 'validated' ? 'Tervalidasi' :
                        validation.status === 'revision' ? 'Perlu Revisi' : 'Ditolak'}
                    </span>
                  </span>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${validation.score >= 90 ? 'bg-emerald-100 text-emerald-800' :
                      validation.score >= 80 ? 'bg-blue-100 text-blue-800' :
                        validation.score >= 70 ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                    }`}>
                    {validation.score}%
                  </span>
                </div>
              </div>

              {/* Issues section for proposals needing revision or rejected */}
              {(validation.status === 'revision' || validation.status === 'rejected') && validation.issues && (
                <div className="mt-3 ml-6 border-l-2 border-gray-200 pl-4">
                  <p className="text-xs font-medium text-gray-500 mb-1">Catatan Perbaikan:</p>
                  <ul className="space-y-1">
                    {validation.issues.map((issue, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className={`text-${validation.status === 'revision' ? 'amber' : 'red'}-500 mt-1`}>•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LaporanKemajuanSession;
