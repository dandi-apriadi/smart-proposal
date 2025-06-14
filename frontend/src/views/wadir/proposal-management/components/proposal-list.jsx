import React, { useState, useEffect } from 'react';
import {
  MdSearch,
  MdFilterList,
  MdVisibility,
  MdDownload,
  MdCheck,
  MdClose,
  MdWarning,
  MdAutorenew,
  MdSort,
  MdDescription,
  MdOutlineCalendarToday,
  MdPerson,
  MdGridView,
  MdViewList,
  MdCheckCircle,
  MdAccessTime,
  MdOutlineInsertDriveFile,
  MdCancel,
  MdOutlineErrorOutline,
  MdOutlineDateRange
} from 'react-icons/md';
import { FiFilter, FiChevronDown, FiArrowUp, FiArrowDown, FiInfo } from 'react-icons/fi';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProposalList = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewType, setViewType] = useState('card');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Expanded sample data
  const [proposals] = useState([
    {
      id: 1,
      title: 'Pengadaan Laboratorium Komputer',
      department: 'Teknik Informatika',
      submitter: 'Dr. Ahmad',
      date: '2023-12-20',
      status: 'validated',
      mlScore: 95,
      priority: 'high',
      documentComplete: true,
      validationDetails: {
        format: 98,
        content: 95,
        requirements: 92
      }
    },
    {
      id: 2,
      title: 'Workshop Artificial Intelligence',
      department: 'P3M',
      submitter: 'Prof. Sarah',
      date: '2023-12-18',
      status: 'pending',
      mlScore: 78,
      priority: 'medium',
      documentComplete: false,
      validationDetails: {
        format: 85,
        content: 75,
        requirements: 80
      }
    },
    {
      id: 3,
      title: 'Pengembangan Sistem Informasi Akademik',
      department: 'BAAK',
      submitter: 'Ir. Budi',
      date: '2023-12-15',
      status: 'rejected',
      mlScore: 65,
      priority: 'high',
      documentComplete: true,
      validationDetails: {
        format: 70,
        content: 60,
        requirements: 65
      }
    },
    {
      id: 4,
      title: 'Seminar Nasional Teknologi Informasi',
      department: 'Rektorat',
      submitter: 'Dr. Diana',
      date: '2024-01-05',
      status: 'validated',
      mlScore: 92,
      priority: 'medium',
      documentComplete: true,
      validationDetails: {
        format: 95,
        content: 90,
        requirements: 88
      }
    },
    {
      id: 5,
      title: 'Pengadaan Peralatan Lab Jaringan',
      department: 'Teknik Informatika',
      submitter: 'Ir. Hendro',
      date: '2024-01-02',
      status: 'pending',
      mlScore: 82,
      priority: 'low',
      documentComplete: true,
      validationDetails: {
        format: 85,
        content: 80,
        requirements: 78
      }
    }
  ]);

  // Toggle sort order
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Filter and sort proposals
  const filteredProposals = proposals
    .filter(proposal => {
      const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.submitter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || proposal.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'mlScore') {
        comparison = a.mlScore - b.mlScore;
      } else if (sortBy === 'department') {
        comparison = a.department.localeCompare(b.department);
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'validated':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <MdCheckCircle className="mr-1" />
            Tervalidasi
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            <MdAccessTime className="mr-1" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            <MdCancel className="mr-1" />
            Ditolak
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
            {status}
          </span>
        );
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-red-800">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-yellow-800">
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></span>
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-blue-800">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></span>
            Low
          </span>
        );
      default: return null;
    }
  };

  const getMlScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const viewProposalDetails = (proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-4 pb-8 bg-gradient-to-b from-blue-50 to-white dark:from-navy-900 dark:to-navy-800">
      {/* Modern Header with Visual Elements */}
      <div className="relative mb-8 overflow-hidden" data-aos="fade-down">
        {/* Abstract background elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-10 right-20 w-20 h-20 bg-purple-500/10 rounded-full blur-lg"></div>
        <div className="absolute -bottom-8 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 inline-block">
            Proposal List
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-3xl">
            Kelola dan periksa proposal yang telah diajukan dengan bantuan validasi Machine Learning
          </p>

          <div className="mt-6 flex items-center space-x-2">
            <div className="flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>
              {filteredProposals.length} proposals found
            </div>
            <div className="flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300">
              <MdCheckCircle className="mr-1" />
              {proposals.filter(p => p.status === 'validated').length} validated
            </div>
            <div className="flex items-center px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-300">
              <MdAccessTime className="mr-1" />
              {proposals.filter(p => p.status === 'pending').length} pending
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Panel */}
      <div
        className="backdrop-blur-md bg-white/70 dark:bg-navy-800/70 rounded-2xl shadow-lg mb-6 border border-gray-100 dark:border-navy-700"
        data-aos="fade-up"
      >
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-grow max-w-xl">
              <input
                type="text"
                placeholder="Search by title, department, or submitter..."
                className="pl-11 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white/50 dark:bg-navy-700/50 dark:border-navy-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MdSearch className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex">
                <button
                  className={`p-2 rounded-l-lg border border-gray-200 ${viewType === 'card' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                  onClick={() => setViewType('card')}
                  title="Card view"
                >
                  <MdGridView className="h-5 w-5" />
                </button>
                <button
                  className={`p-2 rounded-r-lg border-t border-r border-b border-gray-200 ${viewType === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                  onClick={() => setViewType('list')}
                  title="List view"
                >
                  <MdViewList className="h-5 w-5" />
                </button>
              </div>

              <select
                className="rounded-lg border border-gray-200 py-2 pl-3 pr-8 bg-white/50 dark:bg-navy-700/50 dark:border-navy-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="validated">Validated</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                className="px-3 py-2 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter className="h-4 w-4" />
                {showFilters ? "Hide Filters" : "More Filters"}
                <FiChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100 animate-fadeIn">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Date Range</label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <input type="date" className="pl-9 w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <MdOutlineDateRange className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                  <div className="relative flex-1">
                    <input type="date" className="pl-9 w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <MdOutlineDateRange className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Department</label>
                <select className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Departments</option>
                  <option>Teknik Informatika</option>
                  <option>P3M</option>
                  <option>BAAK</option>
                  <option>Rektorat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">ML Score Range</label>
                <div className="px-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>0</span>
                    <span>100</span>
                  </div>
                  <input type="range" min="0" max="100" className="w-full accent-blue-500 h-1.5 bg-gray-200 rounded-full appearance-none" />
                </div>
              </div>
            </div>
          )}

          {/* Sort Controls */}
          <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              {filteredProposals.length} results found
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  className="border-0 bg-transparent text-sm text-gray-700 font-medium focus:outline-none cursor-pointer focus:ring-0"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                  }}
                >
                  <option value="date">Date</option>
                  <option value="mlScore">ML Score</option>
                  <option value="department">Department</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {sortOrder === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proposals List - Dynamic View (Card or List) */}
      {filteredProposals.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-10 text-center" data-aos="fade-up">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <MdOutlineInsertDriveFile className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No proposals found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We couldn't find any proposals matching your search criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      ) : viewType === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-aos="fade-up">
          {filteredProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white dark:bg-navy-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 overflow-hidden group cursor-pointer"
              onClick={() => viewProposalDetails(proposal)}
              data-aos="fade-up"
              data-aos-delay={proposal.id * 50}
            >
              <div className={`h-2 ${proposal.status === 'validated' ? 'bg-green-500' :
                proposal.status === 'pending' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>

              <div className="p-5">
                <div className="flex justify-between mb-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <MdOutlineCalendarToday className="h-4 w-4" />
                    <span>{new Date(proposal.date).toLocaleDateString()}</span>
                  </div>
                  {getStatusBadge(proposal.status)}
                </div>

                <h3 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {proposal.title}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MdPerson className="mr-1" />
                  <span>{proposal.submitter}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span>{proposal.department}</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">ML Score</div>
                    <div className="flex items-center">
                      <span className={`text-lg font-bold ${getMlScoreColor(proposal.mlScore)}`}>
                        {proposal.mlScore}%
                      </span>
                    </div>
                  </div>

                  {proposal.priority && getPriorityBadge(proposal.priority)}
                </div>

                <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-1.5 mb-4">
                  <div
                    className={`h-1.5 rounded-full ${proposal.mlScore >= 90 ? 'bg-green-500' :
                      proposal.mlScore >= 75 ? 'bg-blue-500' :
                        proposal.mlScore >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                      }`}
                    style={{ width: `${proposal.mlScore}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-navy-700">
                  <div className="space-y-1">
                    {proposal.documentComplete ? (
                      <span className="flex items-center text-xs text-green-600">
                        <MdCheck className="mr-1" />
                        Complete
                      </span>
                    ) : (
                      <span className="flex items-center text-xs text-yellow-600">
                        <MdWarning className="mr-1" />
                        Incomplete
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-1 text-gray-400 group-hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100">
                    <button className="p-1 hover:bg-blue-50 rounded" onClick={(e) => { e.stopPropagation(); viewProposalDetails(proposal); }}>
                      <MdVisibility className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-blue-50 rounded" onClick={(e) => { e.stopPropagation(); }}>
                      <MdDownload className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3" data-aos="fade-up">
          {filteredProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white dark:bg-navy-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-700 flex overflow-hidden cursor-pointer"
              onClick={() => viewProposalDetails(proposal)}
            >
              <div className={`w-1.5 ${proposal.status === 'validated' ? 'bg-green-500' :
                proposal.status === 'pending' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>

              <div className="flex flex-col md:flex-row flex-1 p-4">
                <div className="flex-grow pr-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                      {proposal.title}
                    </h3>
                    {getStatusBadge(proposal.status)}
                    {proposal.priority && getPriorityBadge(proposal.priority)}
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <MdOutlineCalendarToday className="mr-1.5" />
                      {new Date(proposal.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <MdPerson className="mr-1.5" />
                      {proposal.submitter}
                    </div>
                    <div className="flex items-center">
                      <MdDescription className="mr-1.5" />
                      {proposal.department}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Format:</div>
                      <div className="bg-gray-200 dark:bg-navy-700 rounded-full h-1.5 w-24">
                        <div
                          className="h-1.5 rounded-full bg-blue-500"
                          style={{ width: `${proposal.validationDetails.format}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Content:</div>
                      <div className="bg-gray-200 dark:bg-navy-700 rounded-full h-1.5 w-24">
                        <div
                          className="h-1.5 rounded-full bg-indigo-500"
                          style={{ width: `${proposal.validationDetails.content}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Requirements:</div>
                      <div className="bg-gray-200 dark:bg-navy-700 rounded-full h-1.5 w-24">
                        <div
                          className="h-1.5 rounded-full bg-purple-500"
                          style={{ width: `${proposal.validationDetails.requirements}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center justify-between md:justify-center md:border-l md:pl-4 pt-3 md:pt-0 mt-2 md:mt-0 border-t md:border-t-0">
                  <div className="flex items-center">
                    <div className="mr-2 md:mb-2 md:mr-0 text-center">
                      <div className="text-xs text-gray-500 mb-1">ML Score</div>
                      <div className={`text-xl font-bold ${getMlScoreColor(proposal.mlScore)}`}>
                        {proposal.mlScore}%
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <button
                      className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                      onClick={(e) => { e.stopPropagation(); viewProposalDetails(proposal); }}
                    >
                      <MdVisibility className="h-4 w-4" />
                    </button>
                    <button
                      className={`p-2 ${proposal.status === 'pending' ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-gray-300'
                        } rounded transition-colors`}
                      disabled={proposal.status !== 'pending'}
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <MdCheck className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {isModalOpen && selectedProposal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div
            className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto"
            data-aos="zoom-in"
            data-aos-duration="300"
          >
            <div className="sticky top-0 z-10 bg-white dark:bg-navy-800 flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-navy-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Proposal Details</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-lg ${selectedProposal.status === 'validated' ? 'bg-green-100 text-green-700' :
                  selectedProposal.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                  <MdDescription className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProposal.title}</h2>
                    {getStatusBadge(selectedProposal.status)}
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <MdPerson className="mr-1.5" /> Submitter: {selectedProposal.submitter}
                    </div>
                    <div className="flex items-center">
                      <MdDescription className="mr-1.5" /> Department: {selectedProposal.department}
                    </div>
                    <div className="flex items-center">
                      <MdOutlineCalendarToday className="mr-1.5" /> Date: {new Date(selectedProposal.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-navy-900 p-5 rounded-xl">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-4">ML Analysis</h3>

                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-300">ML Score</span>
                        <span className={`text-sm font-medium ${getMlScoreColor(selectedProposal.mlScore)}`}>
                          {selectedProposal.mlScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${selectedProposal.mlScore >= 90 ? 'bg-green-500' :
                            selectedProposal.mlScore >= 75 ? 'bg-blue-500' :
                              selectedProposal.mlScore >= 60 ? 'bg-yellow-500' :
                                'bg-red-500'
                            }`}
                          style={{ width: `${selectedProposal.mlScore}%` }}
                        ></div>
                      </div>
                    </div>

                    {Object.entries(selectedProposal.validationDetails).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{key}</span>
                          <span className={`text-sm font-medium ${value >= 90 ? 'text-green-600 dark:text-green-400' :
                            value >= 75 ? 'text-blue-600 dark:text-blue-400' :
                              value >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                                'text-red-600 dark:text-red-400'
                            }`}>
                            {value}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${value >= 90 ? 'bg-green-500' :
                              value >= 75 ? 'bg-blue-500' :
                                value >= 60 ? 'bg-yellow-500' :
                                  'bg-red-500'
                              }`}
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-navy-900 p-5 rounded-xl">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-4">Validation Summary</h3>

                  <div className={`p-4 mb-4 rounded-lg border ${selectedProposal.mlScore >= 80 ?
                    'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900/40' :
                    selectedProposal.mlScore >= 65 ?
                      'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900/40' :
                      'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900/40'
                    }`}>
                    <div className="flex items-start">
                      <div className={`p-2 rounded-md ${selectedProposal.mlScore >= 80 ?
                        'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
                        selectedProposal.mlScore >= 65 ?
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                        }`}>
                        <FiInfo className="h-5 w-5" />
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                          {selectedProposal.mlScore >= 80 ? 'Recommended for Approval' :
                            selectedProposal.mlScore >= 65 ? 'Needs Review' :
                              'Major Issues Detected'}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {selectedProposal.mlScore >= 80 ?
                            'This proposal meets quality standards and is recommended for approval.' :
                            selectedProposal.mlScore >= 65 ?
                              'This proposal needs review on certain areas before approval.' :
                              'This proposal has significant issues that need to be addressed.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <MdCheckCircle className={`mt-0.5 mr-2 ${selectedProposal.documentComplete ? 'text-green-500' : 'text-gray-400'}`} />
                      Required documents: {selectedProposal.documentComplete ? 'Complete' : 'Incomplete'}
                    </li>
                    <li className="flex items-start">
                      <MdCheckCircle className={`mt-0.5 mr-2 ${selectedProposal.validationDetails.format >= 80 ? 'text-green-500' : 'text-gray-400'}`} />
                      Format requirements: {selectedProposal.validationDetails.format >= 80 ? 'Met' : 'Not met'}
                    </li>
                    <li className="flex items-start">
                      <MdCheckCircle className={`mt-0.5 mr-2 ${selectedProposal.validationDetails.content >= 80 ? 'text-green-500' : 'text-gray-400'}`} />
                      Content quality: {selectedProposal.validationDetails.content >= 80 ? 'Good' : 'Needs improvement'}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-navy-700">
                <button className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <MdDownload className="h-5 w-5" />
                  Download Proposal
                </button>

                {selectedProposal.status === 'pending' && (
                  <div className="flex gap-3">
                    <button className="px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2">
                      <MdCheck className="h-5 w-5" />
                      Validate
                    </button>
                    <button className="px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2">
                      <MdClose className="h-5 w-5" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalList;
