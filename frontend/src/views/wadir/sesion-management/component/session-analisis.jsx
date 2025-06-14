import React, { useState, useEffect } from 'react';
import {
  MdTimeline,
  MdDevices,
  MdSecurity,
  MdPeople,
  MdLocationOn,
  MdAccessTime,
  MdWarning,
  MdTrendingUp,
  MdTrendingDown,
  MdLaptop,
  MdPhoneAndroid,
  MdTablet,
  MdInfo,
  MdSearch,
  MdMoreHoriz,
  MdNavigateNext,
  MdCalendarToday
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Chart from "react-apexcharts";

const SessionAnalysis = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  // Updated data with more relevant Indonesian context
  const [sessionData] = useState({
    activeUsers: 68,
    totalSessions: 245,
    averageDuration: '36m',
    securityAlerts: 5,
    percentageChange: {
      activeUsers: +12.5,
      totalSessions: +18.3,
      averageDuration: -4.2,
      securityAlerts: +40.0
    },
    deviceStats: {
      desktop: 57,
      mobile: 32,
      tablet: 11
    },
    browserStats: {
      chrome: 63,
      firefox: 15,
      safari: 18,
      edge: 4
    },
    locations: [
      { city: 'Manado', count: 142, percentage: 58 },
      { city: 'Jakarta', count: 43, percentage: 17.5 },
      { city: 'Makassar', count: 21, percentage: 8.5 },
      { city: 'Bandung', count: 18, percentage: 7.3 },
      { city: 'Surabaya', count: 12, percentage: 4.9 },
      { city: 'Lainnya', count: 9, percentage: 3.8 }
    ],
    timeDistribution: {
      morning: 35,
      afternoon: 45,
      evening: 15,
      night: 5
    },
    userRoles: {
      dosen: 35,
      mahasiswa: 25,
      admin: 15,
      reviewer: 20,
      lainnya: 5
    },
    securityIssues: [
      { type: 'Login Mencurigakan', count: 3, severity: 'high' },
      { type: 'Akses Tidak Dikenal', count: 1, severity: 'high' },
      { type: 'Perubahan IP', count: 8, severity: 'medium' },
      { type: 'Multiple Login', count: 12, severity: 'low' }
    ],
    weeklyTrend: [38, 42, 57, 64, 73, 62, 68],
    dailyUsage: [
      { time: '08:00', sessions: 14 },
      { time: '09:00', sessions: 22 },
      { time: '10:00', sessions: 37 },
      { time: '11:00', sessions: 43 },
      { time: '12:00', sessions: 38 },
      { time: '13:00', sessions: 35 },
      { time: '14:00', sessions: 42 },
      { time: '15:00', sessions: 40 },
      { time: '16:00', sessions: 35 },
      { time: '17:00', sessions: 25 },
      { time: '18:00', sessions: 18 },
    ],
    recentActivity: [
      {
        id: 1,
        user: 'Dr. Bambang Sutejo',
        role: 'Ketua Tim Reviewer',
        action: 'Review Proposal Penelitian',
        time: '2 menit yang lalu',
        device: 'Desktop',
        browser: 'Chrome',
        location: 'Manado'
      },
      {
        id: 2,
        user: 'Prof. Dr. Maya Wijaya',
        role: 'Dekan',
        action: 'Menyetujui Anggaran',
        time: '5 menit yang lalu',
        device: 'Mobile',
        browser: 'Safari',
        location: 'Jakarta'
      },
      {
        id: 3,
        user: 'Dr. Hadi Purnomo',
        role: 'Dosen',
        action: 'Mengupload Laporan Kemajuan',
        time: '12 menit yang lalu',
        device: 'Desktop',
        browser: 'Firefox',
        location: 'Manado'
      },
      {
        id: 4,
        user: 'Agus Santoso, M.Sc.',
        role: 'Peneliti',
        action: 'Mengajukan Proposal Baru',
        time: '23 menit yang lalu',
        device: 'Tablet',
        browser: 'Chrome',
        location: 'Makassar'
      },
      {
        id: 5,
        user: 'Dr. Ratna Dewi',
        role: 'Reviewer',
        action: 'Mengirim Feedback Proposal',
        time: '28 menit yang lalu',
        device: 'Desktop',
        browser: 'Edge',
        location: 'Bandung'
      }
    ]
  });

  const getDeviceIcon = (device) => {
    switch (device.toLowerCase()) {
      case 'desktop': return <MdLaptop className="h-5 w-5" />;
      case 'mobile': return <MdPhoneAndroid className="h-5 w-5" />;
      case 'tablet': return <MdTablet className="h-5 w-5" />;
      default: return <MdDevices className="h-5 w-5" />;
    }
  };

  const getTrendIcon = (value) => {
    if (value > 0) {
      return <MdTrendingUp className="h-4 w-4 text-green-600" />;
    } else if (value < 0) {
      return <MdTrendingDown className="h-4 w-4 text-red-600" />;
    }
    return null;
  };

  const getTrendClass = (value) => {
    if (value > 0) {
      return 'text-green-600';
    } else if (value < 0) {
      return 'text-red-600';
    }
    return 'text-gray-500';
  };

  // Chart options for usage trends
  const weeklyChartOptions = {
    chart: {
      id: "weekly-usage",
      toolbar: {
        show: false
      },
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      height: 250
    },
    colors: ['#6366f1'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      theme: 'light',
      x: {
        show: false
      }
    },
    xaxis: {
      categories: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
      }
    }
  };

  // Daily usage chart options
  const dailyChartOptions = {
    chart: {
      id: "daily-usage",
      toolbar: {
        show: false
      },
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      type: 'bar',
      height: 250
    },
    colors: ['#8b5cf6'],
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '60%',
        distributed: false
      },
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
    },
    xaxis: {
      categories: sessionData.dailyUsage.map(d => d.time),
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
      }
    }
  };

  // Donut chart options for device distribution
  const deviceChartOptions = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    colors: ['#4f46e5', '#10b981', '#f59e0b'],
    labels: ['Desktop', 'Mobile', 'Tablet'],
    legend: {
      position: 'bottom',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Perangkat',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
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
          height: 250
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div className="space-y-6">
      {/* Modern Header with Stats */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg" data-aos="fade-down">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          Analisis Sesi <span className="bg-white/20 ml-3 px-3 py-1 text-sm rounded-full">Real-time</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Active Users */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition duration-300 border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div className="rounded-full bg-indigo-500 p-2">
                <MdPeople className="h-5 w-5" />
              </div>
              <div className={`flex items-center text-xs font-medium ${getTrendClass(sessionData.percentageChange.activeUsers)}`}>
                {getTrendIcon(sessionData.percentageChange.activeUsers)}
                <span className="ml-1">{Math.abs(sessionData.percentageChange.activeUsers)}%</span>
              </div>
            </div>
            <p className="text-white/80 text-sm">Pengguna Aktif</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold">{sessionData.activeUsers}</h3>
              <p className="text-xs text-white/60">vs minggu lalu</p>
            </div>
          </div>

          {/* Total Sessions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition duration-300 border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div className="rounded-full bg-purple-500 p-2">
                <MdTimeline className="h-5 w-5" />
              </div>
              <div className={`flex items-center text-xs font-medium ${getTrendClass(sessionData.percentageChange.totalSessions)}`}>
                {getTrendIcon(sessionData.percentageChange.totalSessions)}
                <span className="ml-1">{Math.abs(sessionData.percentageChange.totalSessions)}%</span>
              </div>
            </div>
            <p className="text-white/80 text-sm">Total Sesi</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold">{sessionData.totalSessions}</h3>
              <p className="text-xs text-white/60">vs minggu lalu</p>
            </div>
          </div>

          {/* Average Duration */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition duration-300 border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div className="rounded-full bg-blue-500 p-2">
                <MdAccessTime className="h-5 w-5" />
              </div>
              <div className={`flex items-center text-xs font-medium ${getTrendClass(sessionData.percentageChange.averageDuration)}`}>
                {getTrendIcon(sessionData.percentageChange.averageDuration)}
                <span className="ml-1">{Math.abs(sessionData.percentageChange.averageDuration)}%</span>
              </div>
            </div>
            <p className="text-white/80 text-sm">Rata-rata Durasi</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold">{sessionData.averageDuration}</h3>
              <p className="text-xs text-white/60">vs minggu lalu</p>
            </div>
          </div>

          {/* Security Alerts */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition duration-300 border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div className="rounded-full bg-red-500 p-2">
                <MdWarning className="h-5 w-5" />
              </div>
              <div className={`flex items-center text-xs font-medium ${sessionData.percentageChange.securityAlerts > 0 ? 'text-red-400' : 'text-green-400'}`}>
                {getTrendIcon(sessionData.percentageChange.securityAlerts)}
                <span className="ml-1">{Math.abs(sessionData.percentageChange.securityAlerts)}%</span>
              </div>
            </div>
            <p className="text-white/80 text-sm">Alert Keamanan</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold">{sessionData.securityAlerts}</h3>
              <p className="text-xs text-white/60">vs minggu lalu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Trend Chart & Daily Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-right">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Tren Mingguan</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MdCalendarToday className="h-4 w-4" />
              <span>7 hari terakhir</span>
            </div>
          </div>
          <div className="h-[300px]">
            <Chart
              options={weeklyChartOptions}
              series={[{ name: 'Sesi', data: sessionData.weeklyTrend }]
              }
              type="area"
              height="100%"
            />
          </div>
        </Card>

        <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-left">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Penggunaan Harian</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MdAccessTime className="h-4 w-4" />
              <span>Hari ini</span>
            </div>
          </div>
          <div className="h-[300px]">
            <Chart
              options={dailyChartOptions}
              series={[{ name: 'Sesi', data: sessionData.dailyUsage.map(d => d.sessions) }]
              }
              type="bar"
              height="100%"
            />
          </div>
        </Card>
      </div>

      {/* Device Distribution, Location Analysis & Security Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Distribution with Donut Chart */}
        <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Distribusi Perangkat</h2>
          <div className="h-[250px]">
            <Chart
              options={deviceChartOptions}
              series={Object.values(sessionData.deviceStats)}
              type="donut"
              height="100%"
            />
          </div>
        </Card>

        {/* Location Analysis */}
        <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Analisis Lokasi</h2>
            <div className="text-sm text-gray-500 flex items-center">
              <MdInfo className="h-4 w-4 mr-1" />
              <span>Berdasarkan IP</span>
            </div>
          </div>
          <div className="overflow-hidden">
            {sessionData.locations.map((location, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <MdLocationOn className="h-4 w-4 text-indigo-600 mr-2" />
                    <span className="text-gray-700 text-sm font-medium">{location.city}</span>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{location.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${location.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Security Issues */}
        <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Isu Keamanan</h2>
            <div className="bg-red-100 text-red-700 rounded-full px-2 py-0.5 text-xs font-medium">
              {sessionData.securityIssues.length} isu
            </div>
          </div>
          <div className="space-y-3">
            {sessionData.securityIssues.map((issue, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${issue.severity === 'high' ? 'bg-red-50 border-l-4 border-red-500' :
                    issue.severity === 'medium' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                      'bg-blue-50 border-l-4 border-blue-500'
                  }`}
              >
                <div className="flex items-center">
                  <MdWarning
                    className={`h-5 w-5 mr-2 ${issue.severity === 'high' ? 'text-red-500' :
                        issue.severity === 'medium' ? 'text-yellow-500' :
                          'text-blue-500'
                      }`}
                  />
                  <span className="text-gray-800 text-sm font-medium">{issue.type}</span>
                </div>
                <span
                  className={`text-sm font-bold px-2 py-1 rounded ${issue.severity === 'high' ? 'bg-red-200 text-red-800' :
                      issue.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-blue-200 text-blue-800'
                    }`}
                >
                  {issue.count}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity with Modern Table */}
      <Card extra="p-6 shadow-sm border border-gray-100" data-aos="fade-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Aktivitas Terkini</h2>
          <div className="flex gap-2">
            <div className="relative w-64 hidden md:block">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari aktivitas..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
              <MdMoreHoriz className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 rounded-lg">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Pengguna</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Peran</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktivitas</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Perangkat</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Waktu</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {sessionData.recentActivity.map((activity, index) => (
                <tr key={activity.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50/30 transition-colors`}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {activity.user}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                      {activity.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {activity.action}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    <div className="flex items-center">
                      {getDeviceIcon(activity.device)}
                      <span className="ml-1">{activity.device}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <MdLocationOn className="text-indigo-500 mr-1" />
                      {activity.location}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                    {activity.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center px-2">
          <div className="text-xs text-gray-500">Menampilkan 5 dari 25 aktivitas</div>
          <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-900 font-medium">
            Lihat semua aktivitas <MdNavigateNext className="ml-1" />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SessionAnalysis;
