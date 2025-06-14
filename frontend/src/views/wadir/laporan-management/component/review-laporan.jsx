import React, { useState, useEffect } from 'react';
import {
  MdDescription,
  MdCheck,
  MdClose,
  MdComment,
  MdHistory,
  MdAutoGraph,
  MdWarning,
  MdAttachFile,
  MdSend,
  MdOutlineFilePresent,
  MdChevronRight,
  MdInfo
} from 'react-icons/md';
import { FiFileText, FiClock, FiUser, FiCalendar, FiBarChart2, FiFlag } from 'react-icons/fi';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ReviewLaporan = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  const [activeReport, setActiveReport] = useState({
    id: "LAP2025/04/003",
    title: "Pengembangan Sistem Pendukung Keputusan Berbasis AI untuk Evaluasi Proposal Penelitian",
    author: "Dr. Surya Wijaya",
    department: "Research & Development",
    submissionDate: "15 April 2025",
    status: "under_review",
    priority: "High",
    mlScore: 87.3,
    pageCount: 24,
    lastUpdate: "2 hours ago",
    validationResults: {
      metodologi: 92,
      analisis: 87,
      konsistensi: 85,
      kelengkapan: 91,
      referensi: 82
    },
    sections: [
      { name: "Abstrak", status: "validated", score: 95, comment: "Abstrak sudah mencakup poin-poin utama dengan baik" },
      { name: "Pendahuluan", status: "validated", score: 90, comment: "Latar belakang komprehensif" },
      { name: "Metodologi", status: "needs_revision", score: 76, comment: "Perlu detail lebih lanjut tentang metode pengumpulan data" },
      { name: "Analisis Data", status: "needs_revision", score: 72, comment: "Analisis statistik perlu ditinjau ulang" },
      { name: "Hasil", status: "validated", score: 88, comment: "Visualisasi data baik" },
      { name: "Kesimpulan", status: "validated", score: 94, comment: "Kesimpulan sesuai dengan tujuan penelitian" }
    ],
    reviewHistory: [
      { date: "12 April 2025", reviewer: "Prof. Aditya", action: "Initial review", notes: "Perlu perbaikan pada metodologi" },
      { date: "14 April 2025", reviewer: "Dr. Kartika", action: "Secondary review", notes: "Sudah ada perbaikan signifikan" }
    ]
  });

  const [reviewNote, setReviewNote] = useState("");
  const [activeTab, setActiveTab] = useState("document");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSections = activeReport.sections.filter(section => {
    if (statusFilter === "all") return true;
    return section.status === statusFilter;
  });

  return (
    <div className="space-y-8" data-aos="fade-up">
      {/* Header - Modern Glass Morphism Style */}
      <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-800 opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-4.0.3')] bg-cover mix-blend-overlay opacity-20"></div>
        <div className="relative p-8 text-white z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm flex items-center">
                  <FiFileText className="mr-1.5 h-3.5 w-3.5" />
                  <span>{activeReport.id}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center
                  ${activeReport.priority === 'High' ? 'bg-red-400/30 text-red-50' :
                    activeReport.priority === 'Medium' ? 'bg-yellow-400/30 text-yellow-50' :
                      'bg-green-400/30 text-green-50'}`}>
                  <FiFlag className="mr-1.5 h-3 w-3" />
                  {activeReport.priority} Priority
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tight leading-tight">{activeReport.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center text-sm text-white/80">
                  <FiUser className="mr-2 h-4 w-4" />
                  {activeReport.author}
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <FiCalendar className="mr-2 h-4 w-4" />
                  Submitted: {activeReport.submissionDate}
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <FiClock className="mr-2 h-4 w-4" />
                  Last update: {activeReport.lastUpdate}
                </div>
              </div>
              <div className="mt-3 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg inline-block">
                <span className="text-sm">{activeReport.department} • {activeReport.pageCount} pages</span>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-3">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-white/70">Skor AI</span>
                  <span className="text-lg font-bold">
                    {activeReport.mlScore.toFixed(1)}<span className="text-sm font-normal">/100</span>
                  </span>
                </div>
                <div className="relative h-20 w-20">
                  <svg className="h-20 w-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke={activeReport.mlScore >= 85 ? '#10B981' : activeReport.mlScore >= 70 ? '#3B82F6' : '#F59E0B'}
                      strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - activeReport.mlScore / 100)}`}
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute top-0 left-0 h-20 w-20 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-xl">{activeReport.mlScore}</span>
                      <span className="text-xs text-white/90">score</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`px-4 py-1.5 rounded-lg text-sm font-medium flex items-center
                ${activeReport.status === 'under_review'
                  ? 'bg-blue-600/30 border border-blue-500/30'
                  : activeReport.status === 'approved'
                    ? 'bg-green-600/30 border border-green-500/30'
                    : 'bg-amber-600/30 border border-amber-500/30'}`}
              >
                <span className="mr-1.5 h-2 w-2 rounded-full bg-white animate-pulse"></span>
                {activeReport.status === 'under_review' ? 'Dalam Peninjauan' :
                  activeReport.status === 'approved' ? 'Disetujui' : 'Revisi Diperlukan'}
              </div>
            </div>
          </div>
        </div>

        {/* Header Tabs */}
        <div className="relative bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("document")}
              className={`px-6 py-3 flex items-center space-x-2 transition-colors border-b-2 whitespace-nowrap
                ${activeTab === "document"
                  ? 'text-white border-white font-medium'
                  : 'text-white/70 border-transparent hover:text-white hover:border-white/50'}`}
            >
              <MdDescription className="h-5 w-5" />
              <span>Dokumen</span>
            </button>
            <button
              onClick={() => setActiveTab("sections")}
              className={`px-6 py-3 flex items-center space-x-2 transition-colors border-b-2 whitespace-nowrap
                ${activeTab === "sections"
                  ? 'text-white border-white font-medium'
                  : 'text-white/70 border-transparent hover:text-white hover:border-white/50'}`}
            >
              <MdAutoGraph className="h-5 w-5" />
              <span>Analisis</span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-3 flex items-center space-x-2 transition-colors border-b-2 whitespace-nowrap
                ${activeTab === "history"
                  ? 'text-white border-white font-medium'
                  : 'text-white/70 border-transparent hover:text-white hover:border-white/50'}`}
            >
              <MdHistory className="h-5 w-5" />
              <span>Riwayat</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Review Area */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === "document" && (
            <Card extra="p-6 overflow-hidden" data-aos="fade-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Dokumen Laporan</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  <MdAttachFile className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <MdDescription className="h-16 w-16 mx-auto text-gray-300" />
                  <p className="text-gray-500 mt-4 mb-6">Preview Dokumen</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2 shadow-sm">
                      <MdOutlineFilePresent className="h-4 w-4" />
                      Lihat Dokumen Lengkap
                    </button>
                    <button className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                      <MdAttachFile className="h-4 w-4" />
                      Lihat Lampiran
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "sections" && (
            <Card extra="p-6 overflow-hidden" data-aos="fade-up">
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <h2 className="text-xl font-bold text-gray-800">Analisis Bagian Laporan</h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setStatusFilter("all")}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === "all" ? "bg-white shadow-sm text-gray-800" : "text-gray-600"
                      }`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setStatusFilter("validated")}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === "validated" ? "bg-white shadow-sm text-gray-800" : "text-gray-600"
                      }`}
                  >
                    Tervalidasi
                  </button>
                  <button
                    onClick={() => setStatusFilter("needs_revision")}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${statusFilter === "needs_revision" ? "bg-white shadow-sm text-gray-800" : "text-gray-600"
                      }`}
                  >
                    Perlu Revisi
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredSections.map((section, index) => (
                  <div
                    key={index}
                    className={`bg-white border rounded-xl p-5 transition-all hover:shadow-md ${section.status === 'needs_revision' ? 'border-l-4 border-l-yellow-500' : 'border-l-4 border-l-green-500'
                      }`}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-800">{section.name}</span>
                        <div
                          className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center
                            ${section.status === 'validated'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'}`}
                        >
                          {section.status === 'validated'
                            ? <><MdCheck className="mr-1 h-3 w-3" /> Tervalidasi</>
                            : <><MdWarning className="mr-1 h-3 w-3" /> Perlu Revisi</>}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 relative h-8 w-8">
                          <svg className="h-8 w-8 transform -rotate-90">
                            <circle
                              cx="16"
                              cy="16"
                              r="14"
                              stroke="#E5E7EB"
                              strokeWidth="3"
                              fill="none"
                            />
                            <circle
                              cx="16"
                              cy="16"
                              r="14"
                              stroke={section.score >= 85 ? '#10B981' : section.score >= 70 ? '#3B82F6' : '#F59E0B'}
                              strokeWidth="3"
                              strokeDasharray={`${2 * Math.PI * 14}`}
                              strokeDashoffset={`${2 * Math.PI * 14 * (1 - section.score / 100)}`}
                              fill="none"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                            <span className="text-xs font-bold">{section.score}</span>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-colors">
                          <MdChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    {section.comment && (
                      <div className="mt-3 pl-3 border-l-2 border-gray-200 text-sm text-gray-600">
                        {section.comment}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "history" && (
            <Card extra="p-6 overflow-hidden" data-aos="fade-up">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Riwayat Review</h2>
              <div className="space-y-6">
                {activeReport.reviewHistory.map((item, index) => (
                  <div key={index} className="relative pl-6 pb-6">
                    <div className="absolute left-0 top-1 h-full w-[1px] bg-gray-200"></div>
                    <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-blue-600 transform -translate-x-[5px]"></div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{item.action}</p>
                          <p className="text-sm text-gray-600">By: {item.reviewer}</p>
                        </div>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{item.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* ML Analysis */}
          <Card extra="p-6 hover:shadow-lg transition-all border-t-4 border-t-blue-600" data-aos="fade-left">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FiBarChart2 className="text-blue-600" /> Analisis AI
              </h2>
              <div className="p-1.5 bg-blue-50 rounded-full cursor-pointer hover:bg-blue-100 transition-colors">
                <MdInfo className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="space-y-5">
              {Object.entries(activeReport.validationResults).map(([key, value], index) => (
                <div key={key} data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                    <span className={`text-sm font-semibold ${value >= 90 ? 'text-green-600' :
                        value >= 80 ? 'text-blue-600' :
                          value >= 70 ? 'text-amber-600' : 'text-red-600'
                      }`}>{value}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full ${value >= 90 ? 'bg-green-500' :
                          value >= 80 ? 'bg-blue-500' :
                            value >= 70 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                      style={{ width: `${value}%`, transition: 'width 1s ease-in-out' }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <button className="w-full mt-3 text-sm text-blue-600 py-2.5 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors flex items-center justify-center">
                  <MdAutoGraph className="mr-2" /> Lihat analisis detail
                </button>
              </div>
            </div>
          </Card>

          {/* Review Notes */}
          <Card extra="p-6 hover:shadow-lg transition-all" data-aos="fade-left">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Catatan Review</h2>
            <div className="space-y-4">
              <textarea
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px] text-gray-700 placeholder-gray-400 bg-gray-50"
                placeholder="Tambahkan catatan review..."
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
              />
              <div className="flex flex-col space-y-2">
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 font-medium">
                  <MdSend className="h-5 w-5" />
                  Kirim Review
                </button>
                <button className="w-full px-4 py-2.5 bg-transparent text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm">
                  Simpan Draft
                </button>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4" data-aos="fade-up">
            <button className="group relative px-6 py-3.5 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg hover:from-green-600 hover:to-green-700 transition-all overflow-hidden">
              <div className="absolute inset-0 w-full h-full transition-all scale-x-0 group-hover:scale-x-100 group-hover:bg-white/10 origin-left"></div>
              <div className="relative flex items-center justify-center gap-2 font-medium">
                <MdCheck className="h-5 w-5" />
                <span>Setujui</span>
              </div>
            </button>
            <button className="group relative px-6 py-3.5 bg-white border-2 border-red-500 text-red-600 rounded-xl hover:bg-red-50 transition-all overflow-hidden">
              <div className="absolute inset-0 w-full h-full transition-all scale-x-0 group-hover:scale-x-100 group-hover:bg-red-100/30 origin-left"></div>
              <div className="relative flex items-center justify-center gap-2 font-medium">
                <MdClose className="h-5 w-5" />
                <span>Tolak</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewLaporan;
