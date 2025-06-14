import React, { useState } from 'react';
import { FaChartPie, FaCheckCircle, FaTimesCircle, FaSpinner, FaEllipsisV, FaFilter, FaDownload, FaEye, FaClipboardList } from 'react-icons/fa';

const ProposalSummary = () => {
  const [timeFilter, setTimeFilter] = useState('month');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeProposal, setActiveProposal] = useState(null);

  const proposals = [
    {
      title: 'Pengadaan Lab Komputer',
      submitter: 'Jurusan TI',
      mlScore: 98,
      status: 'processing',
      createdAt: '2023-12-19',
      dueDate: '2023-12-30',
      details: 'Proposal pengadaan 30 unit komputer untuk lab pembelajaran mahasiswa dengan spesifikasi tinggi.'
    },
    {
      title: 'Workshop AI',
      submitter: 'PUDIR 1',
      mlScore: 95,
      status: 'approved',
      createdAt: '2023-12-17',
      dueDate: '2023-12-25',
      details: 'Workshop tentang aplikasi praktis AI dan machine learning untuk dosen dan mahasiswa tingkat akhir.'
    },
    {
      title: 'Seminar Nasional',
      submitter: 'Akademik',
      mlScore: 72,
      status: 'revision',
      createdAt: '2023-12-15',
      dueDate: '2023-12-28',
      details: 'Seminar dengan tema teknologi pendidikan di era digital yang akan mengundang pembicara nasional.'
    },
    {
      title: 'Renovasi Ruang Kuliah',
      submitter: 'Jurusan Sipil',
      mlScore: 89,
      status: 'processing',
      createdAt: '2023-12-14',
      dueDate: '2023-12-26',
      details: 'Renovasi 5 ruang kuliah dengan peningkatan fasilitas multimedia dan pengaturan ulang layout.'
    }
  ];

  const handleRowClick = (id) => {
    setActiveProposal(activeProposal === id ? null : id);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl" data-aos="fade-up">
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 p-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="bg-white text-blue-600 p-1.5 rounded-lg shadow-sm">
              <FaChartPie />
            </span>
            Ringkasan Proposal
          </h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <select
                className="bg-white/90 backdrop-blur-sm border border-blue-300 rounded-lg px-4 py-2 text-sm appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-sm text-blue-800"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="month">Bulan Ini</option>
                <option value="quarter">3 Bulan Terakhir</option>
                <option value="half">6 Bulan Terakhir</option>
                <option value="year">Tahun Ini</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-blue-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="bg-white/90 backdrop-blur-sm p-2.5 rounded-lg shadow-sm hover:bg-white hover:shadow focus:outline-none text-blue-800"
              aria-label="Filter"
            >
              <FaFilter />
            </button>
          </div>
        </div>
      </div>

      {/* Filter dropdown menu with improved design */}
      {showFilterMenu && (
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-blue-700 block mb-1.5">Status</label>
              <select className="w-full bg-white border border-blue-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm">
                <option>Semua Status</option>
                <option>Disetujui</option>
                <option>Diproses</option>
                <option>Perlu Revisi</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-blue-700 block mb-1.5">Pengaju</label>
              <select className="w-full bg-white border border-blue-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm">
                <option>Semua Pengaju</option>
                <option>Jurusan</option>
                <option>Administrasi</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-blue-700 block mb-1.5">ML Score</label>
              <select className="w-full bg-white border border-blue-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm">
                <option>Semua Score</option>
                <option>High (90-100)</option>
                <option>Medium (70-89)</option>
                <option>Low (Below 70)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors">
              Terapkan Filter
            </button>
          </div>
        </div>
      )}

      {/* ML Insights Cards - Enhanced responsive grid with better hover effects */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 transform transition duration-300 hover:scale-105 hover:shadow-md group border border-blue-200" data-aos="fade-up" data-aos-delay="100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 font-semibold">Akurasi ML</p>
              <h3 className="text-3xl font-bold text-blue-800 group-hover:text-blue-900 transition-colors">95.8%</h3>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-xl text-white shadow-md group-hover:shadow-lg transition-all">
              <FaChartPie className="text-2xl" />
            </div>
          </div>
          <p className="text-sm text-blue-600 mt-4 font-medium flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            <span>2.1% dari bulan lalu</span>
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 transform transition duration-300 hover:scale-105 hover:shadow-md group border border-green-200" data-aos="fade-up" data-aos-delay="200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 font-semibold">Proposal Valid</p>
              <h3 className="text-3xl font-bold text-green-800 group-hover:text-green-900 transition-colors">85</h3>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-xl text-white shadow-md group-hover:shadow-lg transition-all">
              <FaCheckCircle className="text-2xl" />
            </div>
          </div>
          <div className="w-full bg-green-200 h-3 rounded-full mt-3 overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-green-600 mt-2 font-medium">75% dari total proposal</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 transform transition duration-300 hover:scale-105 hover:shadow-md group border border-red-200" data-aos="fade-up" data-aos-delay="300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 font-semibold">Perlu Revisi</p>
              <h3 className="text-3xl font-bold text-red-800 group-hover:text-red-900 transition-colors">12</h3>
            </div>
            <div className="bg-gradient-to-br from-red-400 to-red-600 p-3 rounded-xl text-white shadow-md group-hover:shadow-lg transition-all">
              <FaTimesCircle className="text-2xl" />
            </div>
          </div>
          <div className="w-full bg-red-200 h-3 rounded-full mt-3 overflow-hidden">
            <div className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full" style={{ width: '25%' }}></div>
          </div>
          <p className="text-xs text-red-600 mt-2 font-medium">25% dari total proposal</p>
        </div>
      </div>

      {/* Recent Proposals with ML Status - Modern interactive table */}
      <div className="px-6 pb-6" data-aos="fade-up" data-aos-delay="400">
        <div className="flex flex-wrap justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <span className="bg-blue-600 text-white p-1.5 rounded-md mr-2 flex-shrink-0">
              <FaClipboardList className="text-sm" />
            </span>
            Proposal Terbaru
          </h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center bg-blue-50 px-3 py-1.5 rounded-lg">
            Lihat Semua
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Proposal
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Pengaju
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    ML Score
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {proposals.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr
                      className={`hover:bg-blue-50 transition-colors cursor-pointer ${activeProposal === index ? 'bg-blue-50' : ''}`}
                      onClick={() => handleRowClick(index)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-500 mt-1 hidden md:block">
                          Dibuat: {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{item.submitter}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${item.mlScore >= 90 ? 'bg-green-100 text-green-800' :
                          item.mlScore >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {item.mlScore}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${item.status === 'approved' ? 'bg-green-100 text-green-800' :
                          item.status === 'processing' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {item.status === 'approved' ?
                            <FaCheckCircle className="mr-1 text-green-500" /> :
                            item.status === 'processing' ?
                              <FaSpinner className="mr-1 text-blue-500 animate-spin" /> :
                              <FaTimesCircle className="mr-1 text-red-500" />
                          }
                          {item.status === 'approved' ? 'Disetujui' :
                            item.status === 'processing' ? 'Diproses' : 'Perlu Revisi'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-1.5 rounded-full"
                            onClick={(e) => { e.stopPropagation(); }}
                          >
                            <FaEye size={14} />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-800 hover:bg-green-100 p-1.5 rounded-full"
                            onClick={(e) => { e.stopPropagation(); }}
                          >
                            <FaDownload size={14} />
                          </button>
                          <button
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full"
                            onClick={(e) => { e.stopPropagation(); }}
                          >
                            <FaEllipsisV size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {activeProposal === index && (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 bg-blue-50 animate-fadeIn">
                          <div className="text-sm text-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                              <div>
                                <span className="block text-xs font-medium text-gray-500">Tanggal Dibuat</span>
                                <span className="block font-medium text-gray-800">{new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                              </div>
                              <div>
                                <span className="block text-xs font-medium text-gray-500">Deadline</span>
                                <span className="block font-medium text-gray-800">{new Date(item.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                              </div>
                              <div>
                                <span className="block text-xs font-medium text-gray-500">ML Score</span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${item.mlScore >= 90 ? 'bg-green-100 text-green-800' :
                                  item.mlScore >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                  }`}>{item.mlScore}% - {item.mlScore >= 90 ? 'Sangat Baik' : item.mlScore >= 80 ? 'Baik' : 'Perlu Perbaikan'}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="block text-xs font-medium text-gray-500 mb-1">Deskripsi</span>
                              <p>{item.details}</p>
                            </div>
                            <div className="flex justify-end mt-3">
                              <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
                                Lihat Detail Lengkap
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ML Analysis Progress - Enhanced with better gradients and animations */}
      <div className="px-6 pb-6" data-aos="fade-up" data-aos-delay="500">
        <div className="bg-gradient-to-r from-gray-50 via-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200/70">
          <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
            <span className="bg-blue-600 text-white p-1.5 rounded-md mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z" clipRule="evenodd" />
              </svg>
            </span>
            Analisis Machine Learning
          </h3>
          <div className="space-y-5">
            <div className="transform transition-transform hover:translate-x-1 duration-300 ease-in-out">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-600 mr-2"></div>
                  Format Dokumen
                </span>
                <span className="text-sm font-bold text-blue-600">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="transform transition-transform hover:translate-x-1 duration-300 ease-in-out">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <div className="h-3 w-3 rounded-full bg-indigo-600 mr-2"></div>
                  Kelengkapan Data
                </span>
                <span className="text-sm font-bold text-indigo-600">88%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-3 rounded-full transition-all duration-1000" style={{ width: '88%' }}></div>
              </div>
            </div>

            <div className="transform transition-transform hover:translate-x-1 duration-300 ease-in-out">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <div className="h-3 w-3 rounded-full bg-purple-600 mr-2"></div>
                  Kesesuaian Anggaran
                </span>
                <span className="text-sm font-bold text-purple-600">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full transition-all duration-1000" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalSummary;
