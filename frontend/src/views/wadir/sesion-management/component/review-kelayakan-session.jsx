import React, { useState, useEffect } from 'react';
import {
  MdAssessment,
  MdAutoGraph,
  MdCheckCircle,
  MdWarning,
  MdError,
  MdTimeline,
  MdPeople,
  MdSpeed,
  MdSettings,
  MdTrendingUp,
  MdTrendingDown,
  MdInsights,
  MdDateRange,
  MdAccessTime
} from 'react-icons/md';
import { IoStatsChart } from 'react-icons/io5';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactApexChart from 'react-apexcharts';

const ReviewKelayakanSession = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [sessionData] = useState({
    id: 'SES-2025-047',
    name: 'Sesi Evaluasi Proposal Q2 2025',
    created: '2025-04-15T08:30:00',
    deadline: '2025-05-10T23:59:59',
    status: 'active',
    progress: 68,
    mlMetrics: {
      overallAccuracy: 94.2,
      formatValidation: 96.5,
      documentCompleteness: 91.3,
      contentCompliance: 92.8,
      semanticAnalysis: 93.5
    },
    trends: {
      weeklyAccuracy: [91.2, 91.8, 92.5, 93.1, 93.8, 94.0, 94.2],
      proposalVolume: [12, 18, 25, 34, 38, 42, 47]
    },
    userMetrics: {
      activeUsers: 32,
      totalReviewers: 40,
      averageProcessingTime: '3.2',
      completionRate: 68,
      reviewsPerDay: 8.5,
      satisfactionScore: 4.7
    },
    validationResults: [
      {
        category: 'Format Dokumen',
        status: 'optimal',
        score: 96,
        trend: 'up',
        change: '+2.5%',
        issues: []
      },
      {
        category: 'Kelengkapan Data',
        status: 'warning',
        score: 85,
        trend: 'up',
        change: '+1.2%',
        issues: [
          'Beberapa proposal tidak menyertakan lampiran yang lengkap',
          'Format RAB perlu diperbarui sesuai template 2025'
        ]
      },
      {
        category: 'Standar Administrasi',
        status: 'optimal',
        score: 94,
        trend: 'stable',
        change: '0%',
        issues: []
      },
      {
        category: 'Kualitas Konten',
        status: 'optimal',
        score: 92,
        trend: 'up',
        change: '+3.4%',
        issues: []
      },
      {
        category: 'Kesesuaian Anggaran',
        status: 'warning',
        score: 87,
        trend: 'down',
        change: '-1.3%',
        issues: [
          'Beberapa proposal memiliki alokasi anggaran yang tidak proporsional',
          'Justifikasi anggaran perlu diperjelas'
        ]
      }
    ],
    recommendations: [
      'Berikan pelatihan terkait penyusunan RAB untuk pengusul proposal',
      'Tingkatkan pemeriksaan pada kelengkapan dokumen pendukung',
      'Evaluasi template proposal untuk kategori kesesuaian anggaran'
    ]
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Helper functions for trend icons and colors
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <MdTrendingUp className="h-4 w-4 text-emerald-600" />;
      case 'down': return <MdTrendingDown className="h-4 w-4 text-red-600" />;
      default: return <MdTimeline className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-emerald-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Calculate days remaining
  const getDaysRemaining = () => {
    const today = new Date();
    const deadline = new Date(sessionData.deadline);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Chart options
  const accuracyChartOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#8b5cf6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 100]
      }
    },
    tooltip: { theme: 'dark' },
    xaxis: { labels: { show: false } }
  };

  const volumeChartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    plotOptions: {
      bar: { borderRadius: 4, columnWidth: '60%' }
    },
    colors: ['#a78bfa'],
    tooltip: { theme: 'dark' },
    xaxis: { labels: { show: false } }
  };

  return (
    <div className="space-y-6">
      {/* Header with enhanced design */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-2xl p-8 text-white shadow-lg" data-aos="fade-down">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <MdAssessment className="h-8 w-8" />
              <h1 className="text-3xl font-bold">Review Kelayakan Sesi</h1>
              <span className={`ml-2 px-3 py-1 text-xs font-medium rounded-full ${sessionData.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}>
                {sessionData.status === 'active' ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>
            <p className="text-lg opacity-90">{sessionData.name}</p>
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center gap-2 text-white/80">
                <MdDateRange className="h-4 w-4" />
                <span>Deadline: {formatDate(sessionData.deadline)}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MdAccessTime className="h-4 w-4" />
                <span>{getDaysRemaining()} hari tersisa</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <span className="text-2xl font-bold">{sessionData.progress}%</span>
              <span className="text-sm ml-1 text-white/80">Progress</span>
            </div>
            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${sessionData.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* ML Performance Metrics in a more modern layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4" data-aos="fade-up">
        {Object.entries(sessionData.mlMetrics).map(([key, value], index) => {
          const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();

          return (
            <Card
              key={key}
              extra="p-4 hover:shadow-lg transition-all border border-gray-100"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start justify-between">
                <div className={`rounded-full p-2.5 ${value >= 95 ? 'bg-emerald-100' :
                    value >= 90 ? 'bg-green-100' :
                      value >= 85 ? 'bg-yellow-100' :
                        'bg-red-100'
                  }`}>
                  <MdSpeed className={`h-5 w-5 ${value >= 95 ? 'text-emerald-600' :
                      value >= 90 ? 'text-green-600' :
                        value >= 85 ? 'text-yellow-600' :
                          'text-red-600'
                    }`} />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${value >= 95 ? 'bg-emerald-100 text-emerald-800' :
                    value >= 90 ? 'bg-green-100 text-green-800' :
                      value >= 85 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                  }`}>{value}%</span>
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {formattedKey}
                </p>
                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                  <div
                    className={`h-full rounded-full ${value >= 95 ? 'bg-emerald-500' :
                        value >= 90 ? 'bg-green-500' :
                          value >= 85 ? 'bg-yellow-500' :
                            'bg-red-500'
                      }`}
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts and User Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Charts */}
        <Card extra="p-6" data-aos="fade-up">
          <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <IoStatsChart className="h-5 w-5 text-violet-600" />
            Tren Performa AI
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700">Akurasi Mingguan</h3>
                <span className="text-xs font-medium text-emerald-600">
                  +{(sessionData.trends.weeklyAccuracy[sessionData.trends.weeklyAccuracy.length - 1] -
                    sessionData.trends.weeklyAccuracy[0]).toFixed(1)}%
                </span>
              </div>
              <ReactApexChart
                options={accuracyChartOptions}
                series={[{ name: "Akurasi", data: sessionData.trends.weeklyAccuracy }]
                }
                type="line"
                height={120}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700">Volume Proposal</h3>
                <span className="text-xs font-medium text-purple-600">
                  {sessionData.trends.proposalVolume[sessionData.trends.proposalVolume.length - 1]} proposal
                </span>
              </div>
              <ReactApexChart
                options={volumeChartOptions}
                series={[{ name: "Proposal", data: sessionData.trends.proposalVolume }]
                }
                type="bar"
                height={120}
              />
            </div>
          </div>
        </Card>

        {/* User Metrics - Modern cards layout */}
        <Card extra="p-6" data-aos="fade-up">
          <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <MdPeople className="h-5 w-5 text-violet-600" />
            Metrik Pengguna
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-violet-50 to-white rounded-xl border border-violet-100">
              <p className="text-xs font-medium text-violet-800 mb-1">
                Reviewer Aktif
              </p>
              <div className="flex items-end gap-1">
                <h4 className="text-2xl font-bold text-gray-800">
                  {sessionData.userMetrics.activeUsers}
                </h4>
                <span className="text-xs text-gray-500 mb-1">
                  /{sessionData.userMetrics.totalReviewers}
                </span>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100">
              <p className="text-xs font-medium text-indigo-800 mb-1">
                Tingkat Penyelesaian
              </p>
              <h4 className="text-2xl font-bold text-gray-800">
                {sessionData.userMetrics.completionRate}%
              </h4>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
              <p className="text-sm text-gray-700">Waktu Proses Rata-rata</p>
              <span className="font-medium">{sessionData.userMetrics.averageProcessingTime} min</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
              <p className="text-sm text-gray-700">Review Per Hari</p>
              <span className="font-medium">{sessionData.userMetrics.reviewsPerDay}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
              <p className="text-sm text-gray-700">Skor Kepuasan</p>
              <div className="flex items-center">
                <span className="font-medium mr-2">{sessionData.userMetrics.satisfactionScore}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className={`w-4 h-4 ${star <= Math.floor(sessionData.userMetrics.satisfactionScore) ? 'text-amber-400' : 'text-gray-300'}`}
                      fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* System Recommendations */}
        <Card extra="p-6" data-aos="fade-up">
          <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <MdSettings className="h-5 w-5 text-violet-600" />
            Rekomendasi Sistem
          </h2>

          <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-indigo-900">Ringkasan</h3>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-lg">
                Score: {sessionData.mlMetrics.overallAccuracy}%
              </span>
            </div>
            <p className="text-sm text-indigo-800">
              Sesi berjalan dengan baik dengan tingkat akurasi ML di atas 90%.
              Terdapat {sessionData.validationResults.filter(r => r.status === 'warning').length} kategori
              yang perlu mendapat perhatian khusus.
            </p>
          </div>

          <h3 className="text-sm font-medium text-gray-700 mb-3">Saran Tindakan:</h3>
          <div className="space-y-3">
            {sessionData.recommendations.map((rec, idx) => (
              <div key={idx} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
                <div className="flex items-start gap-3">
                  <div className="bg-violet-100 text-violet-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-gray-700">{rec}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Validation Results with modern design */}
      <Card extra="p-6" data-aos="fade-up">
        <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
          <MdAutoGraph className="h-5 w-5 text-violet-600" />
          Hasil Validasi Kategori
        </h2>
        <div className="space-y-4">
          {sessionData.validationResults.map((result, index) => (
            <div
              key={index}
              className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${getStatusColor(result.status)}`}>
                    {result.status === 'optimal' ? <MdCheckCircle className="h-5 w-5" /> :
                      result.status === 'warning' ? <MdWarning className="h-5 w-5" /> :
                        <MdError className="h-5 w-5" />}
                  </div>
                  <h3 className="font-medium text-gray-800">{result.category}</h3>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {getTrendIcon(result.trend)}
                    <span className={`text-xs font-medium ${getTrendColor(result.trend)}`}>
                      {result.change}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.score >= 90 ? 'bg-green-100 text-green-800' :
                      result.score >= 85 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    {result.score}%
                  </span>
                </div>
              </div>

              {result.issues.length > 0 && (
                <div className="mt-3 ml-12">
                  <ul className="space-y-1 text-sm text-gray-600">
                    {result.issues.map((issue, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
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

export default ReviewKelayakanSession;
