import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  MdCloudUpload,
  MdCheckCircle,
  MdError,
  MdWarning,
  MdDelete,
  MdRefresh,
  MdAnalytics,
  MdDescription,
  MdAutorenew,
  MdFilePresent,
  MdMoreVert
} from 'react-icons/md';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { BsFileEarmarkPdf, BsFileWord } from 'react-icons/bs';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Tooltip } from 'react-tooltip';

const ProposalUploadControl = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [validationResults, setValidationResults] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  // Improved ML validation function with more realistic data
  const validateProposal = useCallback(async (file) => {
    setIsProcessing(true);

    // Simulate file upload progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress > 100) progress = 100;

      setUploadProgress(prev => ({
        ...prev,
        [file.name]: progress
      }));

      if (progress === 100) clearInterval(progressInterval);
    }, 300);

    // Simulate API call to ML service with more realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate more detailed validation results
    const proposalTypes = ['Penelitian', 'Pengabdian', 'Inovasi', 'Kerjasama', 'Program Kerja'];
    const proposalType = proposalTypes[Math.floor(Math.random() * proposalTypes.length)];

    const formatIssues = [
      'Format halaman tidak konsisten',
      'Margin dokumen tidak sesuai',
      'Penggunaan font tidak standar',
      'Header/footer tidak sesuai template'
    ];

    const missingDocs = [
      'Lembar pengesahan',
      'Abstrak/ringkasan',
      'Metodologi',
      'RAB',
      'Timeline',
      'CV Tim'
    ];

    const contentSuggestions = [
      'Perjelas tujuan dan manfaat',
      'Tambahkan referensi terbaru',
      'Jelaskan metodologi lebih detail',
      'Sertakan dampak yang terukur',
      'Perbarui data pendukung'
    ];

    // Generate random issues
    const hasFormatIssues = Math.random() > 0.6;
    const selectedFormatIssues = hasFormatIssues
      ? formatIssues.filter(() => Math.random() > 0.5).slice(0, Math.floor(Math.random() * 3) + 1)
      : [];

    const selectedMissingDocs = missingDocs
      .filter(() => Math.random() > 0.7)
      .slice(0, Math.floor(Math.random() * 3));

    const selectedSuggestions = contentSuggestions
      .filter(() => Math.random() > 0.5)
      .slice(0, Math.floor(Math.random() * 4) + 1);

    // Calculate scores with more variation
    const formatScore = Math.floor(Math.random() * (100 - 75) + 75);
    const completenessScore = Math.floor(Math.random() * (100 - 70) + 70);
    const complianceScore = Math.floor(Math.random() * (100 - 65) + 65);

    // Calculate weighted overall score
    const overallScore = Math.floor(
      (formatScore * 0.3) +
      (completenessScore * 0.4) +
      (complianceScore * 0.3)
    );

    return {
      score: overallScore,
      type: proposalType,
      timestamp: new Date().toISOString(),
      format: {
        score: formatScore,
        isValid: formatScore > 80,
        issues: selectedFormatIssues
      },
      documentation: {
        completeness: completenessScore,
        missingDocs: selectedMissingDocs
      },
      content: {
        standardCompliance: complianceScore,
        suggestions: selectedSuggestions
      }
    };
  }, []);

  const handleFileUpload = async (event) => {
    const files = event?.target?.files
      ? Array.from(event.target.files)
      : Array.from(event);

    if (!files || files.length === 0) return;

    const newFiles = files.filter(file =>
      !uploadedFiles.some(existing => existing.name === file.name)
    );

    setUploadedFiles(prev => [...prev, ...newFiles]);

    for (const file of newFiles) {
      // Initialize progress
      setUploadProgress(prev => ({
        ...prev,
        [file.name]: 0
      }));

      const result = await validateProposal(file);
      setValidationResults(prev => ({
        ...prev,
        [file.name]: result
      }));
    }

    setIsProcessing(false);
  };

  const removeFile = (fileName) => {
    setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
    setValidationResults(prev => {
      const newResults = { ...prev };
      delete newResults[fileName];
      return newResults;
    });
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  // File icon helper
  const getFileIcon = (fileName) => {
    if (fileName.toLowerCase().endsWith('.pdf')) {
      return <BsFileEarmarkPdf className="h-8 w-8 text-red-500" />;
    } else if (fileName.toLowerCase().endsWith('.doc') || fileName.toLowerCase().endsWith('.docx')) {
      return <BsFileWord className="h-8 w-8 text-blue-600" />;
    } else {
      return <MdFilePresent className="h-8 w-8 text-gray-500" />;
    }
  };

  // Get score color helper
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  // Get score background helper
  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-emerald-50';
    if (score >= 80) return 'bg-green-50';
    if (score >= 70) return 'bg-yellow-50';
    if (score >= 60) return 'bg-orange-50';
    return 'bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-500 rounded-2xl p-8 text-white shadow-lg"
        data-aos="fade-down"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <MdAnalytics className="h-8 w-8" />
              Kontrol Upload Proposal
            </h1>
            <p className="opacity-90 text-white/80">
              Validasi dan evaluasi proposal menggunakan teknologi AI
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="px-5 py-2.5 bg-white text-blue-600 hover:bg-blue-50 font-medium rounded-xl transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
              onClick={() => fileInputRef.current.click()}
              id="upload-btn"
            >
              <MdCloudUpload className="h-5 w-5" />
              <span>Upload Proposal</span>
            </button>
            <Tooltip anchorSelect="#upload-btn" place="top">
              Klik untuk mengunggah file proposal
            </Tooltip>
            <input
              ref={fileInputRef}
              id="fileUpload"
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <Card
        extra={`p-0 overflow-hidden ${isDragging ? 'ring-2 ring-blue-500' : ''}`}
        data-aos="fade-up"
      >
        <div
          ref={dropAreaRef}
          className={`border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-gray-300'} rounded-xl p-12 text-center transition-all duration-300`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <div className={`relative rounded-full p-6 ${isDragging ? 'bg-blue-100' : 'bg-blue-50'} mb-6`}>
              <MdCloudUpload className={`h-14 w-14 ${isDragging ? 'text-blue-600' : 'text-blue-500'} transition-all`} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Drag & Drop Proposal
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Format file yang didukung: PDF, DOC, DOCX. Maksimal ukuran file 10MB.
            </p>
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
            >
              Pilih File
            </button>
          </div>
        </div>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card extra="p-6" data-aos="fade-up">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center">
              {uploadedFiles.length}
            </span>
            <span>File Proposal Terupload</span>
          </h2>
          <div className="space-y-6">
            {uploadedFiles.map((file) => {
              const result = validationResults[file.name];
              const progress = uploadProgress[file.name] || 0;
              const isComplete = progress === 100 && result;

              return (
                <div
                  key={file.name}
                  className="p-6 bg-white border rounded-xl hover:shadow-md transition-all duration-300"
                  data-aos="fade-up"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {getFileIcon(file.name)}
                      <div>
                        <h3 className="font-medium text-gray-800">{file.name}</h3>
                        <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                          {result && (
                            <>
                              <span>•</span>
                              <span>{result.type}</span>
                              <span>•</span>
                              <span>{new Date(result.timestamp).toLocaleDateString('id-ID')}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {isComplete ? (
                        <>
                          <div className={`text-sm font-semibold px-3 py-1 rounded-full ${getScoreBg(result.score)}`}>
                            <span className={`${getScoreColor(result.score)}`}>
                              Score: {result.score}%
                            </span>
                          </div>
                          <button
                            onClick={() => removeFile(file.name)}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-all"
                            id={`delete-${file.name}`}
                          >
                            <MdDelete className="h-5 w-5" />
                          </button>
                          <Tooltip anchorSelect={`#delete-${file.name}`}>Hapus file</Tooltip>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <MdAutorenew className="h-5 w-5 text-blue-600 animate-spin" />
                          <span className="text-sm text-blue-600">Processing {progress}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress bar for uploading */}
                  {progress < 100 && (
                    <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}

                  {/* Validation Results */}
                  {isComplete && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Format Section */}
                      <div className={`p-4 rounded-xl border ${result.format.isValid ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-800">Format Dokumen</h4>
                          <span className={`text-sm font-bold ${getScoreColor(result.format.score)}`}>
                            {result.format.score}%
                          </span>
                        </div>

                        {result.format.isValid ? (
                          <div className="flex items-center gap-2 text-green-600 text-sm">
                            <MdCheckCircle />
                            <span>Format Valid</span>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2 text-amber-600 text-sm mb-2">
                              <MdWarning />
                              <span>Memerlukan Perbaikan</span>
                            </div>
                            <ul className="text-xs text-amber-700 list-disc pl-5 space-y-1">
                              {result.format.issues.map((issue, idx) => (
                                <li key={idx}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Documentation Section */}
                      <div className="p-4 rounded-xl border border-blue-200 bg-blue-50">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-800">Kelengkapan</h4>
                          <span className={`text-sm font-bold ${getScoreColor(result.documentation.completeness)}`}>
                            {result.documentation.completeness}%
                          </span>
                        </div>

                        {result.documentation.missingDocs.length === 0 ? (
                          <div className="flex items-center gap-2 text-blue-600 text-sm">
                            <MdCheckCircle />
                            <span>Dokumen Lengkap</span>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2 text-blue-600 text-sm mb-2">
                              <MdWarning />
                              <span>Dokumen Kurang</span>
                            </div>
                            <ul className="text-xs text-blue-700 list-disc pl-5 space-y-1">
                              {result.documentation.missingDocs.map((doc, idx) => (
                                <li key={idx}>{doc}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-4 rounded-xl border border-purple-200 bg-purple-50">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-800">Konten</h4>
                          <span className={`text-sm font-bold ${getScoreColor(result.content.standardCompliance)}`}>
                            {result.content.standardCompliance}%
                          </span>
                        </div>

                        {result.content.suggestions.length === 0 ? (
                          <div className="flex items-center gap-2 text-purple-600 text-sm">
                            <MdCheckCircle />
                            <span>Konten Sudah Baik</span>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2 text-purple-600 text-sm mb-2">
                              <MdAnalytics />
                              <span>Saran Perbaikan</span>
                            </div>
                            <ul className="text-xs text-purple-700 list-disc pl-5 space-y-1">
                              {result.content.suggestions.map((suggestion, idx) => (
                                <li key={idx}>{suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
          <div className="bg-white p-8 rounded-xl flex flex-col items-center gap-4 shadow-2xl max-w-md w-full mx-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <MdAutorenew className="h-8 w-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-800 mb-1">Memproses Validasi AI</h3>
              <p className="text-gray-500 text-sm">Sistem AI sedang menganalisis proposal Anda...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalUploadControl;
