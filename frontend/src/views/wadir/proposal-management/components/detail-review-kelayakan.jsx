import React, { useState, useEffect } from 'react';
import {
  MdAssessment,
  MdVerified,
  MdWarning,
  MdError,
  MdCheck,
  MdClose,
  MdHistory,
  MdDescription,
  MdAutorenew,
  MdPerson,
  MdOutlineCalendarToday,
  MdArrowForward,
  MdOutlineDescription,
  MdDownload,
  MdOutlineAttachFile,
  MdOutlineAssignment,
  MdOutlineFactCheck,
  MdOutlineNotes,
  MdEdit
} from 'react-icons/md';
import {
  FiPieChart,
  FiBarChart2,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiFileText,
  FiUser,
  FiThumbsUp,
  FiThumbsDown
} from 'react-icons/fi';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DetailReviewKelayakan = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  // State for review notes and decision
  const [reviewNotes, setReviewNotes] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [decision, setDecision] = useState(null);

  // Expanded proposal details with more information
  const [proposalDetails] = useState({
    id: "PROP-2023-001",
    title: "Pengadaan Laboratorium Komputer",
    department: "Teknik Informatika",
    submitter: "Dr. Ahmad",
    submissionDate: "2023-12-20",
    dueDate: "2024-01-15",
    budget: "Rp 350.000.000",
    status: "under_review",
    priority: "high",
    category: "Infrastructure",
    documents: [
      { name: "proposal_main.pdf", size: "2.4 MB", type: "pdf" },
      { name: "budget_details.xlsx", size: "1.2 MB", type: "excel" },
      { name: "technical_specs.pdf", size: "3.8 MB", type: "pdf" },
      { name: "support_letter.pdf", size: "0.5 MB", type: "pdf" }
    ],
    mlAnalysis: {
      overallScore: 92,
      formatCompliance: 95,
      contentValidity: 90,
      documentCompleteness: 94,
      budgetAccuracy: 89,
      relevance: 93
    },
    validationHistory: [
      {
        stage: "Format Check",
        status: "passed",
        timestamp: "2023-12-20 10:30",
        notes: "Format sesuai standar",
        validator: "System ML"
      },
      {
        stage: "Document Verification",
        status: "warning",
        timestamp: "2023-12-20 10:35",
        notes: "Beberapa lampiran perlu diperbaiki",
        validator: "System ML"
      },
      {
        stage: "Budget Validation",
        status: "passed",
        timestamp: "2023-12-21 14:22",
        notes: "Anggaran sesuai dengan standar institusi",
        validator: "Finance Dept."
      }
    ]
  });

  // Helper function to get score color
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 75) return 'text-blue-600 dark:text-blue-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Helper function to get score background color
  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Helper function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed': return <FiCheckCircle className="h-5 w-5" />;
      case 'warning': return <FiAlertCircle className="h-5 w-5" />;
      case 'failed': return <FiThumbsDown className="h-5 w-5" />;
      default: return <FiClock className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen pt-4 pb-8 bg-gradient-to-b from-purple-50 to-white dark:from-navy-900 dark:to-navy-800">
      {/* Modern Header with Visual Elements */}
      <div className="relative mb-8 overflow-hidden" data-aos="fade-down">
        {/* Abstract background elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-10 right-20 w-20 h-20 bg-indigo-500/10 rounded-full blur-lg"></div>
        <div className="absolute -bottom-8 left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-xl"></div>

        <div className="relative z-10 mb-6">
          <div className="flex flex-wrap gap-2 items-center text-sm text-purple-700">
            <span>Proposal Management</span>
            <MdArrowForward className="h-4 w-4" />
            <span>Review</span>
            <MdArrowForward className="h-4 w-4" />
            <span className="font-medium">Kelayakan</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-3">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 inline-block mb-2">
                Review Kelayakan Proposal
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-md text-sm font-medium inline-block">
                  ID: {proposalDetails.id}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                  <FiClock className="h-4 w-4" />
                  Submitted: {new Date(proposalDetails.submissionDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center gap-2"
                onClick={() => { setDecision('approve'); setShowDecisionModal(true); }}
              >
                <MdCheck className="h-5 w-5" />
                Approve
              </button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:shadow-lg hover:from-red-600 hover:to-rose-700 transition-all flex items-center gap-2"
                onClick={() => { setDecision('reject'); setShowDecisionModal(true); }}
              >
                <MdClose className="h-5 w-5" />
                Reject
              </button>
              <button
                className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all flex items-center gap-2"
              >
                <MdEdit className="h-5 w-5" />
                Request Revision
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-navy-700 overflow-x-auto hide-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: <MdOutlineDescription className="h-5 w-5" /> },
            { id: 'documents', label: 'Documents', icon: <MdOutlineAttachFile className="h-5 w-5" /> },
            { id: 'analysis', label: 'ML Analysis', icon: <FiPieChart className="h-5 w-5" /> },
            { id: 'history', label: 'History', icon: <MdHistory className="h-5 w-5" /> },
            { id: 'notes', label: 'Review Notes', icon: <MdOutlineNotes className="h-5 w-5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap relative 
        ${activeTab === tab.id ? 'text-purple-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></span>
              )}
            </button>
          ))}
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Dynamic based on active tab */}
        <div className="lg:col-span-2">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6" data-aos="fade-up">
              {/* Proposal Summary Card */}
              <Card extra="backdrop-blur-sm bg-white/90 dark:bg-navy-800/90 p-6 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="rounded-xl p-3 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40 text-purple-600 dark:text-purple-400">
                    <MdOutlineDescription className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{proposalDetails.title}</h2>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <FiUser className="h-4 w-4 mr-1.5" />
                        <span>{proposalDetails.submitter}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MdDescription className="h-4 w-4 mr-1.5" />
                        <span>{proposalDetails.department}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <FiFileText className="h-4 w-4 mr-1.5" />
                        <span>{proposalDetails.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col items-end">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${proposalDetails.priority === 'high'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        : proposalDetails.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}
                    >
                      {proposalDetails.priority.charAt(0).toUpperCase() + proposalDetails.priority.slice(1)} Priority
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-navy-900/50 p-4 rounded-xl">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Submission Date</div>
                    <div className="flex items-center">
                      <MdOutlineCalendarToday className="mr-2 text-purple-500" />
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {new Date(proposalDetails.submissionDate).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-navy-900/50 p-4 rounded-xl">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Due Date</div>
                    <div className="flex items-center">
                      <MdOutlineCalendarToday className="mr-2 text-purple-500" />
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {new Date(proposalDetails.dueDate).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-navy-900/50 p-4 rounded-xl">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Budget</div>
                    <div className="flex items-center">
                      <FiBarChart2 className="mr-2 text-purple-500" />
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {proposalDetails.budget}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ML Score Card */}
                <div className="mt-6 p-5 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-900/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-800 dark:text-white flex items-center gap-2">
                      <FiPieChart className="text-purple-500" /> ML Analysis Score
                    </h3>
                    <div className="flex items-center">
                      <div className="flex items-center gap-1.5 mr-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-300">Overall</span>
                      </div>
                      <span className={`text-lg font-bold ${getScoreColor(proposalDetails.mlAnalysis.overallScore)}`}>
                        {proposalDetails.mlAnalysis.overallScore}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-2 text-xs">
                      {[
                        { key: 'formatCompliance', label: 'Format' },
                        { key: 'contentValidity', label: 'Content' },
                        { key: 'documentCompleteness', label: 'Completeness' }
                      ].map((item) => (
                        <div key={item.key} className="flex-1 bg-white/50 dark:bg-navy-800/50 p-3 rounded-lg">
                          <div className="flex justify-between font-medium mb-1.5">
                            <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
                            <span className={getScoreColor(proposalDetails.mlAnalysis[item.key])}>
                              {proposalDetails.mlAnalysis[item.key]}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${getScoreBgColor(proposalDetails.mlAnalysis[item.key])}`}
                              style={{ width: `${proposalDetails.mlAnalysis[item.key]}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>


                </div>
              </Card>

              {/* Validation Progress Card */}
              <Card extra="backdrop-blur-sm bg-white/90 dark:bg-navy-800/90 p-6 border border-gray-100 dark:border-navy-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                  <MdOutlineFactCheck className="mr-2 text-purple-500" /> Validation Progress
                </h3>

                {/* Timeline Style Validation History */}
                <div className="space-y-6 relative pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:border-l-2 before:border-dashed before:border-gray-300 dark:before:border-gray-700">
                  {proposalDetails.validationHistory.map((item, index) => (
                    <div key={index} className={`relative ${index === 0 && 'pt-2'}`}>
                      {/* Timeline dot */}
                      <div className={`absolute -left-6 p-1.5 rounded-full ${item.status === 'passed'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : item.status === 'warning'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        }`}>
                        {getStatusIcon(item.status)}
                      </div>

                      {/* Content */}
                      <div className="bg-gray-50 dark:bg-navy-900/50 rounded-lg p-4">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-white">{item.stage}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.notes}</p>
                          </div>
                          <div className="text-xs text-gray-500 space-y-1 flex flex-col items-end">
                            <span>{item.timestamp}</span>
                            <span className="bg-gray-200 dark:bg-navy-700 px-2 py-1 rounded">
                              {item.validator}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next step indicator */}
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between pl-8 pt-4 border-t border-gray-200 dark:border-navy-700">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-0">
                    <FiClock className="mr-1.5" />
                    <span>Next step: Final Review by Wadir</span>
                  </div>

                  <button className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium flex items-center">
                    View Complete History
                    <MdArrowForward className="ml-1" />
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <Card extra="backdrop-blur-sm bg-white/90 dark:bg-navy-800/90 p-6 border border-gray-100 dark:border-navy-700" data-aos="fade-up">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <MdOutlineAttachFile className="mr-2 text-purple-500" /> Attached Documents
              </h3>

              <div className="space-y-3">
                {proposalDetails.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-navy-800/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${doc.type === 'pdf' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                        doc.type === 'excel' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                          'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                        <FiFileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 dark:text-white">{doc.name}</h4>
                        <p className="text-xs text-gray-500">{doc.size}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                      <MdDownload className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ML Analysis Tab */}
          {activeTab === 'analysis' && (
            <Card extra="backdrop-blur-sm bg-white/90 dark:bg-navy-800/90 p-6 border border-gray-100 dark:border-navy-700" data-aos="fade-up">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <FiPieChart className="mr-2 text-purple-500" /> ML Analysis Details
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {Object.entries(proposalDetails.mlAnalysis).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 dark:bg-navy-900/50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-2xl font-bold ${getScoreColor(value)}`}>{value}%</span>
                      <div className={`px-2 py-0.5 text-xs rounded-full ${value >= 90 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        value >= 75 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          value >= 60 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                        {value >= 90 ? 'Excellent' :
                          value >= 75 ? 'Good' :
                            value >= 60 ? 'Fair' : 'Poor'}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getScoreBgColor(value)}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-900/30">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2 flex items-center">
                  <FiThumbsUp className="mr-1.5 text-purple-500" /> AI Recommendation
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Based on ML analysis, this proposal meets all the requirements and is recommended for approval.
                  The budget allocation is within institutional guidelines and document formatting follows the established template.
                </p>
              </div>
            </Card>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <Card
              extra="backdrop-blur-sm bg-white/90 dark:bg-navy-800/90 p-6 border border-gray-100 dark:border-navy-700"
              data-aos="fade-up"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <MdHistory className="mr-2 text-purple-500" /> Complete Review History
              </h3>

              {/* Timeline component - expanded history */}
              <div className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-0 before:bottom-0 before:border-l-2 before:border-dashed before:border-gray-300 dark:before:border-gray-700">
                {[
                  {
                    date: "2023-12-20 09:15",
                    title: "Proposal Submitted",
                    description: "Initial submission by Dr. Ahmad",
                    type: "info"
                  },
                  {
                    date: "2023-12-20 10:30",
                    title: "Format Check",
                    description: "Format sesuai standar",
                    type: "success"
                  },
                  {
                    date: "2023-12-20 10:35",
                    title: "Document Verification",
                    description: "Beberapa lampiran perlu diperbaiki",
                    type: "warning"
                  },
                  {
                    date: "2023-12-21 14:22",
                    title: "Budget Validation",
                    description: "Anggaran sesuai dengan standar institusi",
                    type: "success"
                  },
                  {
                    date: "2023-12-22 11:05",
                    title: "Technical Review",
                    description: "Spesifikasi teknis sudah sesuai kebutuhan",
                    type: "success"
                  }
                ].map((item, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="relative">
                      {/* Timeline dot */}
                      <div
                        className={`absolute -left-6 p-1.5 rounded-full 
                ${item.type === 'success'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : item.type === 'warning'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                              : item.type === 'error'
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          }`}
                      >
                        {item.type === 'success' ? (
                          <FiCheckCircle className="h-5 w-5" />
                        ) : item.type === 'warning' ? (
                          <FiAlertCircle className="h-5 w-5" />
                        ) : item.type === 'error' ? (
                          <FiThumbsDown className="h-5 w-5" />
                        ) : (
                          <FiClock className="h-5 w-5" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="bg-gray-50 dark:bg-navy-900/50 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-white">{item.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}


          {/* Review Notes Tab */}
          {activeTab === 'notes' && (
            <Card extra="backdrop-blur-sm bg-white/90 dark:bg-navy-800/90 p-6 border border-gray-100 dark:border-navy-700" data-aos="fade-up">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <MdOutlineNotes className="mr-2 text-purple-500" /> Review Notes
              </h3>

              <div className="mb-4 p-4 bg-gray-50 dark:bg-navy-900/50 rounded-xl border border-gray-200 dark:border-navy-700">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Previous Notes</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white dark:bg-navy-800 rounded-lg">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm text-gray-700 dark:text-gray-300">Technical Dept</span>
                      <span className="text-xs text-gray-500">2023-12-21</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Spesifikasi teknis sudah memenuhi standar. Pastikan vendor yang dipilih memiliki dukungan teknis lokal.
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-navy-800 rounded-lg">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm text-gray-700 dark:text-gray-300">Finance Dept</span>
                      <span className="text-xs text-gray-500">2023-12-20</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Anggaran sudah sesuai. Perhatikan jadwal pencairan dana yang diusulkan agar sesuai dengan tahun anggaran.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="reviewNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Add Your Review Notes
                </label>
                <textarea
                  id="reviewNotes"
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-navy-800 dark:border-navy-700 dark:text-white"
                  placeholder="Enter your review notes here..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                ></textarea>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Save Notes
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card extra="backdrop-blur-sm bg-white/90 dark:bg-navy-800/90 p-6 border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all" data-aos="fade-left">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <MdAssessment className="mr-2 text-purple-500" /> Review Status
            </h3>

            <div className="mb-6">
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-100 dark:border-purple-900/30">
                <div className="p-2 rounded-lg bg-white dark:bg-navy-800 text-purple-600 dark:text-purple-400">
                  <FiClock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Under Review</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Final approval required by Wakil Direktur
                  </p>
                </div>
              </div>
            </div>

            {/* ML Validation Summary */}
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-navy-700">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30">
                <h4 className="font-medium text-gray-800 dark:text-white flex items-center">
                  <MdAutorenew className="mr-1.5 text-purple-600 dark:text-purple-400" /> ML Validation
                </h4>
              </div>

              <div className="p-4 bg-white dark:bg-navy-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Overall Score:</span>
                  <span className={`font-bold ${getScoreColor(proposalDetails.mlAnalysis.overallScore)}`}>
                    {proposalDetails.mlAnalysis.overallScore}%
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Format standards met</span>
                  </div>
                  <div className="flex items-center">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Content quality validated</span>
                  </div>
                  <div className="flex items-center">
                    <FiAlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Some budget items need review</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Documents */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Key Documents</h4>
              <div className="space-y-2">
                {proposalDetails.documents.slice(0, 2).map((doc, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800/50 transition-colors text-left"
                  >
                    <div className="flex items-center">
                      <FiFileText className={`mr-2 ${doc.type === 'pdf' ? 'text-red-500' :
                        doc.type === 'excel' ? 'text-green-500' :
                          'text-blue-500'
                        }`} />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{doc.name}</span>
                    </div>
                    <MdDownload className="text-gray-400" />
                  </button>
                ))}

                <button className="w-full text-center text-sm text-purple-600 dark:text-purple-400 py-2 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                  View All Documents
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-navy-700">
              <button className="w-full mb-3 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center">
                <MdHistory className="mr-2" /> Complete Review Log
              </button>
              <button className="w-full px-4 py-2.5 bg-white border border-gray-200 text-gray-700 dark:bg-navy-800 dark:border-navy-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors flex items-center justify-center">
                <MdOutlineDescription className="mr-2" /> Download Full Proposal
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Decision Modal */}
      {showDecisionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div
            className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl w-full max-w-md"
            data-aos="zoom-in"
            data-aos-duration="200"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                {decision === 'approve'
                  ? <><MdCheck className="text-green-500 mr-2" /> Approve Proposal</>
                  : <><MdClose className="text-red-500 mr-2" /> Reject Proposal</>
                }
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {decision === 'approve'
                  ? 'Are you sure you want to approve this proposal? This will move the proposal to the next stage in the workflow.'
                  : 'Are you sure you want to reject this proposal? The submitter will be notified about this decision.'
                }
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Add comment (optional)
                </label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-navy-700 dark:border-navy-600 dark:text-white"
                  placeholder="Enter your comments here..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowDecisionModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-navy-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-navy-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 text-white rounded-lg transition-colors ${decision === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                    }`}
                >
                  Confirm {decision === 'approve' ? 'Approval' : 'Rejection'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailReviewKelayakan;
