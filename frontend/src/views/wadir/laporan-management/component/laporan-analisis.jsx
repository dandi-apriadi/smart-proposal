import React, { useState, useEffect } from 'react';
import {
  MdAnalytics,
  MdBarChart,
  MdTimeline,
  MdTrendingUp,
  MdFilePresent,
  MdCheck,
  MdClose,
  MdWarning,
  MdOutlineInsertChart,
  MdOutlineTask,
  MdOutlineAutoGraph,
  MdOutlineFilePresent,
  MdHourglassTop,
  MdInfoOutline,
  MdArrowUpward,
  MdArrowDownward,
  MdMore
} from 'react-icons/md';
import {
  FiActivity,
  FiArrowUp,
  FiArrowDown,
  FiPieChart,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiFileText,
  FiTrendingUp,
  FiBarChart2,
  FiMoreHorizontal
} from 'react-icons/fi';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LaporanAnalisis = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [analysisData] = useState({
    totalReports: 156,
    completedReports: 124,
    pendingReports: 32,
    averageScore: 88.5,
    monthlyTrend: '+12%',
    monthlySeries: [35, 28, 45, 42, 56, 65, 70, 65, 72, 78, 82, 95],
    categories: [
      { name: 'Pengadaan', count: 45, percentage: 28.8, color: 'blue' },
      { name: 'Kegiatan', count: 62, percentage: 39.7, color: 'indigo' },
      { name: 'Keuangan', count: 49, percentage: 31.5, color: 'purple' }
    ],
    performance: {
      thisMonth: 42,
      lastMonth: 35,
      trend: '+20%'
    },
    recentReports: [
      { id: 1, title: 'Laporan Pengadaan Lab Komputer', status: 'completed', score: 92, date: '2024-01-15', department: 'Teknik Informatika' },
      { id: 2, title: 'Laporan Workshop AI dan Machine Learning', status: 'pending', score: 78, date: '2024-01-12', department: 'P3M' },
      { id: 3, title: 'Evaluasi Program Magang Industri', status: 'completed', score: 88, date: '2024-01-10', department: 'BAAK' },
      { id: 4, title: 'Laporan Keuangan Pengadaan Q4', status: 'completed', score: 95, date: '2024-01-08', department: 'Keuangan' },
      { id: 5, title: 'Rencana Strategis Penelitian 2025', status: 'pending', score: 82, date: '2024-01-05', department: 'P3M' }
    ]
  });

  return (
    <div className="min-h-screen pt-4 pb-8 bg-gradient-to-b from-blue-50 to-white dark:from-navy-900 dark:to-navy-800">
      {/* Modern Header with Visual Elements */}
      <div className="relative mb-8 overflow-hidden" data-aos="fade-down">
        {/* Abstract background elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-10 right-20 w-20 h-20 bg-indigo-500/10 rounded-full blur-lg"></div>
        <div className="absolute -bottom-8 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 inline-block">
                Analisis Laporan
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Ringkasan dan analisis mendalam dari semua laporan kegiatan dan pengadaan
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                <FiTrendingUp className="mr-1.5" />
                {analysisData.monthlyTrend} dari bulan lalu
              </div>

              <button className="px-4 py-2 bg-white border border-gray-200 dark:bg-navy-700 dark:border-navy-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-600 shadow-sm transition-all flex items-center gap-2">
                <MdOutlineInsertChart className="h-5 w-5" />
                <span className="hidden md:inline">Export</span> Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6" data-aos="fade-up">
        {[
          {
            title: 'Total Laporan',
            value: analysisData.totalReports,
            icon: <MdOutlineFilePresent className="h-6 w-6" />,
            color: 'blue',
            trend: '+8% dari bulan lalu',
            sparkline: [35, 40, 45, 42, 50, 55, 60]
          },
          {
            title: 'Laporan Selesai',
            value: analysisData.completedReports,
            icon: <FiCheckCircle className="h-6 w-6" />,
            color: 'green',
            trend: '+12% dari bulan lalu',
            sparkline: [50, 55, 60, 58, 62, 65, 70]
          },
          {
            title: 'Dalam Proses',
            value: analysisData.pendingReports,
            icon: <FiClock className="h-6 w-6" />,
            color: 'amber',
            trend: '-5% dari bulan lalu',
            sparkline: [20, 18, 15, 16, 14, 12, 10]
          },
          {
            title: 'Rata-rata Skor',
            value: `${analysisData.averageScore}%`,
            icon: <FiActivity className="h-6 w-6" />,
            color: 'purple',
            trend: '+3.2% improvement',
            sparkline: [75, 78, 80, 82, 85, 86, 88]
          }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-navy-800 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 group overflow-hidden"
            data-aos="fade-up"
            data-aos-delay={index * 50}
          >
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div
                  className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}
                >
                  {stat.icon}
                </div>

                {/* Mini sparkline chart */}
                <div className="h-10 flex items-end gap-0.5">
                  {stat.sparkline.map((value, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-${stat.color}-500/60 rounded-t`}
                      style={{ height: `${value}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</h3>
                <div className="flex justify-between items-end">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">{stat.trend}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Analysis Details with Modern Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Category Analysis - Enhanced */}
        <div
          className="lg:col-span-2 bg-white dark:bg-navy-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-navy-700"
          data-aos="fade-right"
          data-aos-delay="50"
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
              <FiPieChart className="mr-2 text-blue-500" /> Analisis Kategori
            </h3>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <FiMoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-5">
            {analysisData.categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full bg-${category.color}-500 mr-2`}></span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {category.count} <span className="text-xs text-gray-500 dark:text-gray-500">Laporan</span>
                    </span>
                    <span className={`text-sm font-medium text-${category.color}-600 dark:text-${category.color}-400`}>
                      {category.percentage}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${category.color}-500 dark:bg-${category.color}-400 rounded-full`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-navy-700">
            <div className="bg-gray-50 dark:bg-navy-900/50 rounded-xl p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Completed Rate</div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-800 dark:text-white">79.5%</span>
                <span className="text-green-600 dark:text-green-400 flex items-center text-xs font-medium">
                  <FiArrowUp className="mr-1" /> 3.2%
                </span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-navy-900/50 rounded-xl p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average Time</div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-800 dark:text-white">6.2 days</span>
                <span className="text-green-600 dark:text-green-400 flex items-center text-xs font-medium">
                  <FiArrowDown className="mr-1" /> 0.8 days
                </span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-navy-900/50 rounded-xl p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Review Rate</div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-800 dark:text-white">94.2%</span>
                <span className="text-green-600 dark:text-green-400 flex items-center text-xs font-medium">
                  <FiArrowUp className="mr-1" /> 1.5%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trend - Enhanced */}
        <div
          className="bg-white dark:bg-navy-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-navy-700"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
              <FiBarChart2 className="mr-2 text-indigo-500" /> Tren Bulanan
            </h3>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${analysisData.monthlyTrend.startsWith('+')
              ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
              }`}>
              {analysisData.monthlyTrend}
            </div>
          </div>

          {/* Visual chart representation */}
          <div className="h-60 flex items-end gap-2 mb-4">
            {analysisData.monthlySeries.map((value, index) => (
              <div key={index} className="relative flex-1 flex flex-col items-center group">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none">
                  {value} reports
                </div>

                <div
                  className={`w-full rounded-t ${index === analysisData.monthlySeries.length - 1
                    ? 'bg-blue-500'
                    : 'bg-blue-200 dark:bg-blue-900/40'
                    }`}
                  style={{ height: `${(value / Math.max(...analysisData.monthlySeries)) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index].charAt(0)}
                </span>
              </div>
            ))}
          </div>

          {/* Performance comparison */}
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-navy-700">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mt-1">{analysisData.performance.thisMonth}</h4>
              </div>
              <div className="h-10 w-px bg-gray-200 dark:bg-navy-700"></div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Month</p>
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mt-1">{analysisData.performance.lastMonth}</h4>
              </div>
              <div className="h-10 w-px bg-gray-200 dark:bg-navy-700"></div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Trend</p>
                <h4 className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">{analysisData.performance.trend}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports Table - Enhanced */}
      <div
        className="bg-white dark:bg-navy-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-navy-700"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
            <MdOutlineTask className="mr-2 text-blue-500" /> Analisis Terbaru
          </h3>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3">Laporan</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Skor</th>
                <th className="px-6 py-3">Tanggal</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-navy-700">
              {analysisData.recentReports.map((report, index) => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded-md ${report.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                        } mr-3`}>
                        <FiFileText className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {report.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {report.department}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.status === 'completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                      {report.status === 'completed' ?
                        <><FiCheckCircle className="mr-1" /> Selesai</> :
                        <><FiClock className="mr-1" /> Proses</>
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`text-sm font-medium ${report.score >= 90 ? 'text-green-600 dark:text-green-400' :
                        report.score >= 80 ? 'text-blue-600 dark:text-blue-400' :
                          'text-amber-600 dark:text-amber-400'
                        }`}>
                        {report.score}%
                      </div>
                      <div className="ml-2 w-16 bg-gray-200 dark:bg-navy-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${report.score >= 90 ? 'bg-green-500' :
                            report.score >= 80 ? 'bg-blue-500' :
                              'bg-amber-500'
                            }`}
                          style={{ width: `${report.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1.5" />
                      {new Date(report.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LaporanAnalisis;
