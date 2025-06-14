import React, { useState, useEffect } from 'react';
import {
  MdAdd,
  MdAccessTime,
  MdPeople,
  MdSecurity,
  MdSettings,
  MdClose,
  MdCheck,
  MdInfo,
  MdCalendarToday,
  MdNotifications,
  MdOutlineVerified,
  MdOutlineSchool,
  MdKeyboardArrowRight,
  MdDescription,
  MdShield,
  MdGroups,
  MdSchedule,
  MdAutoAwesome,
  MdCode,
  MdScience,
  MdOutlineAirplay,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineRecommend,
  MdOutlinePrivacyTip,
  MdOutlineEditCalendar
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const AddSession = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enhanced initial form data with more academic research relevant fields
  const [formData, setFormData] = useState({
    // Basic info
    sessionName: '',
    sessionType: 'review',
    sessionDescription: '',
    researchType: 'applied',
    priorityLevel: 'normal',

    // Schedule
    startDate: '',
    endDate: '',
    duration: '',
    reviewPeriod: '14',
    automaticReminders: true,

    // Participants
    maxReviewers: '5',
    maxProposals: '50',
    allowedFaculties: [],
    reviewerMinQualification: 'doctorate',
    requireExpertise: true,

    // Security settings
    securityLevel: 'tinggi',
    requireTwoFactor: true,
    sessionTimeout: '60',
    trackingEnabled: true,
    geolocationRestriction: false,

    // Validation settings
    enableMlValidation: true,
    mlThreshold: 85,
    validationRules: ['plagiarism', 'completeness', 'budget'],
    aiAssistedReviews: true,
    requireConsensus: true,

    // Notification
    sendReminders: true,
    reminderInterval: '24',
    notificationChannels: ['email', 'system']
  });

  // Enhanced with more specific Indonesian academic departments
  const faculties = [
    'Fakultas Ilmu Komputer & TI',
    'Fakultas Teknik & Rekayasa',
    'Fakultas Ekonomi & Bisnis',
    'Fakultas Kedokteran & Kesehatan',
    'Fakultas Ilmu Sosial & Politik',
    'Fakultas Pendidikan & Keguruan',
    'Fakultas Pertanian & Lingkungan',
    'Fakultas Hukum & Keadilan',
    'Fakultas Seni & Budaya',
    'Fakultas MIPA',
    'Sekolah Pascasarjana'
  ];

  // Enhanced session types with more specialized categories
  const sessionTypes = [
    { id: 'review', name: 'Review Proposal Penelitian', description: 'Evaluasi menyeluruh terhadap proposal penelitian baru', icon: <MdDescription /> },
    { id: 'validation', name: 'Validasi Anggaran Riset', description: 'Validasi dan persetujuan terhadap anggaran penelitian', icon: <MdOutlineAnalytics /> },
    { id: 'progress', name: 'Evaluasi Kemajuan', description: 'Evaluasi berkala kemajuan penelitian yang sedang berlangsung', icon: <MdOutlineAirplay /> },
    { id: 'final', name: 'Review Hasil Akhir', description: 'Evaluasi laporan akhir dan hasil penelitian', icon: <MdOutlineRecommend /> },
    { id: 'collaborative', name: 'Kolaborasi Lintas Institusi', description: 'Sesi kolaboratif dengan peneliti dari berbagai institusi', icon: <MdGroups /> },
    { id: 'international', name: 'Review Kerjasama Internasional', description: 'Evaluasi proposal kerjasama dengan institusi luar negeri', icon: <MdOutlineSchool /> }
  ];

  // Enhanced validation rule options with more detailed academic options
  const validationRuleOptions = [
    { id: 'plagiarism', name: 'Deteksi Plagiarisme', description: 'Memeriksa keaslian dengan teknologi AI terhadap database karya ilmiah', icon: <MdOutlinePrivacyTip /> },
    { id: 'completeness', name: 'Kelengkapan Dokumen', description: 'Memastikan semua persyaratan administrasi telah terpenuhi', icon: <MdDescription /> },
    { id: 'budget', name: 'Validasi Anggaran', description: 'Analisis kelayakan dan efisiensi penggunaan anggaran yang diusulkan', icon: <MdOutlineAnalytics /> },
    { id: 'methodology', name: 'Evaluasi Metodologi', description: 'Menilai kesesuaian dan validitas metodologi penelitian', icon: <MdScience /> },
    { id: 'references', name: 'Kualitas Referensi', description: 'Menilai relevansi dan kredibilitas referensi yang digunakan', icon: <MdOutlineRecommend /> },
    { id: 'innovation', name: 'Tingkat Inovasi', description: 'Menilai kebaruan dan potensi kontribusi terhadap ilmu pengetahuan', icon: <MdOutlineIntegrationInstructions /> },
    { id: 'feasibility', name: 'Kelayakan Implementasi', description: 'Evaluasi terhadap kemungkinan implementasi dalam waktu yang ditentukan', icon: <MdOutlineEditCalendar /> }
  ];

  // Research types
  const researchTypes = [
    { id: 'basic', name: 'Penelitian Dasar', description: 'Penelitian dengan fokus pengembangan teori dan pengetahuan' },
    { id: 'applied', name: 'Penelitian Terapan', description: 'Penelitian dengan fokus penerapan praktis' },
    { id: 'development', name: 'Penelitian Pengembangan', description: 'Pengembangan produk atau proses baru' },
    { id: 'community', name: 'Pengabdian Masyarakat', description: 'Program yang berfokus pada pengembangan komunitas' }
  ];

  // Notification channels
  const notificationChannels = [
    { id: 'email', name: 'Email', icon: <MdOutlinePrivacyTip /> },
    { id: 'system', name: 'Notifikasi Sistem', icon: <MdNotifications /> },
    { id: 'sms', name: 'SMS', icon: <MdOutlinePrivacyTip /> },
    { id: 'whatsapp', name: 'WhatsApp', icon: <MdOutlinePrivacyTip /> }
  ];

  // Form animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle array-type toggles (validation rules, faculties, etc.)
  const handleValidationRuleToggle = (ruleId) => {
    if (formData.validationRules.includes(ruleId)) {
      setFormData({
        ...formData,
        validationRules: formData.validationRules.filter(id => id !== ruleId)
      });
    } else {
      setFormData({
        ...formData,
        validationRules: [...formData.validationRules, ruleId]
      });
    }
  };

  const handleFacultyToggle = (faculty) => {
    if (formData.allowedFaculties.includes(faculty)) {
      setFormData({
        ...formData,
        allowedFaculties: formData.allowedFaculties.filter(f => f !== faculty)
      });
    } else {
      setFormData({
        ...formData,
        allowedFaculties: [...formData.allowedFaculties, faculty]
      });
    }
  };

  const handleNotificationChannelToggle = (channelId) => {
    if (formData.notificationChannels.includes(channelId)) {
      setFormData({
        ...formData,
        notificationChannels: formData.notificationChannels.filter(id => id !== channelId)
      });
    } else {
      setFormData({
        ...formData,
        notificationChannels: [...formData.notificationChannels, channelId]
      });
    }
  };

  // Form submission with loading state
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      alert('Sesi validasi berhasil dibuat!');
    }, 1500);
  };

  // Step validation
  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.sessionName.trim() !== '' &&
          formData.sessionType !== '' &&
          formData.startDate !== '' &&
          formData.endDate !== '';
      case 2:
        return formData.maxReviewers !== '' &&
          formData.maxProposals !== '' &&
          formData.allowedFaculties.length > 0;
      case 3:
        return true; // Security settings have defaults
      default:
        return true;
    }
  };

  // Step navigation
  const goToNextStep = () => {
    if (currentStep < 3 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Modern Step indicator component with progress line
  const StepIndicator = () => (
    <div className="flex flex-col items-center mb-10" data-aos="fade-down">
      <div className="flex items-center justify-center w-full max-w-2xl">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center relative">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all
                ${currentStep >= step
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-500 text-white border-indigo-600 shadow-lg'
                  : 'bg-white text-gray-400 border-gray-300'
                }`}
            >
              <div className="flex flex-col items-center">
                {currentStep > step ? (
                  <MdCheck className="h-6 w-6 mb-0.5" />
                ) : (
                  <span className="text-xl">{step}</span>
                )}
              </div>
            </div>
            {step < 3 && (
              <div className="w-28 sm:w-40 h-1 mx-1 relative">
                <div className={`absolute inset-0 bg-gray-200 ${currentStep > step ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : ''}`}></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex w-full justify-between max-w-lg mt-3 text-sm text-gray-600">
        <div className={`w-1/3 text-center ${currentStep >= 1 ? 'text-indigo-600 font-medium' : ''}`}>
          Informasi Dasar
        </div>
        <div className={`w-1/3 text-center ${currentStep >= 2 ? 'text-indigo-600 font-medium' : ''}`}>
          Peserta
        </div>
        <div className={`w-1/3 text-center ${currentStep >= 3 ? 'text-indigo-600 font-medium' : ''}`}>
          Keamanan & Validasi
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8" data-aos="fade-up">
      {/* Enhanced Header with 3D-like Gradient Background */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full -translate-x-10 translate-y-20 blur-3xl"></div>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Buat Sesi Validasi Baru</h1>
            <p className="opacity-90 max-w-2xl">Konfigurasi sesi review untuk memastikan evaluasi proposal penelitian yang efektif dan transparan</p>
          </div>
          <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm shadow-lg">
            <MdAdd className="h-7 w-7 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Enhanced Step Indicator */}
      <StepIndicator />

      {/* Form Container */}
      {!showPreview ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <Card extra="p-8 shadow-lg border border-gray-100 rounded-3xl" data-aos="fade-up">
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Step 1: Enhanced Basic Info & Schedule */}
              {currentStep === 1 && (
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-3 rounded-xl mr-3 shadow-sm">
                      <MdDescription className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Informasi Dasar</h2>
                  </div>

                  {/* Enhanced form grid with floating labels */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <input
                        id="sessionName"
                        name="sessionName"
                        type="text"
                        className="block w-full px-4 py-4 pt-6 rounded-xl text-gray-900 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm peer"
                        value={formData.sessionName}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="sessionName"
                        className="absolute text-sm font-medium text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-indigo-600"
                      >
                        Nama Sesi <span className="text-red-500">*</span>
                      </label>
                      <p className="mt-1 text-xs text-gray-500 pl-1">Contoh: Review Proposal Penelitian Q3 2026</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jenis Penelitian <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {researchTypes.map((type) => (
                          <div
                            key={type.id}
                            className={`border rounded-xl p-3 cursor-pointer transition-all hover:shadow-md ${formData.researchType === type.id
                                ? 'border-indigo-500 bg-indigo-50/70 shadow-sm border-2'
                                : 'border-gray-200 hover:border-gray-300'
                              }`}
                            onClick={() => setFormData({ ...formData, researchType: type.id })}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-800">{type.name}</span>
                              {formData.researchType === type.id && (
                                <div className="h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center">
                                  <MdCheck className="h-4 w-4 text-white" />
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Session Types with Icons */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Tipe Sesi <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {sessionTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${formData.sessionType === type.id
                              ? 'border-indigo-500 bg-indigo-50/70 shadow-sm border-2'
                              : 'border-gray-200 hover:border-gray-300'
                            }`}
                          onClick={() => setFormData({ ...formData, sessionType: type.id })}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <div className={`p-2 rounded-lg mr-3 ${formData.sessionType === type.id ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'
                                }`}>
                                {type.icon}
                              </div>
                              <span className="font-medium text-gray-800">{type.name}</span>
                            </div>
                            {formData.sessionType === type.id && (
                              <div className="h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center">
                                <MdCheck className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 ml-11">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deskripsi
                    </label>
                    <textarea
                      name="sessionDescription"
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                      value={formData.sessionDescription}
                      onChange={handleInputChange}
                      placeholder="Jelaskan tujuan dan ekspektasi dari sesi ini..."
                    ></textarea>
                  </div>

                  <div className="flex items-center mt-10 mb-6">
                    <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-3 rounded-xl mr-3 shadow-sm">
                      <MdSchedule className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Jadwal</h2>
                  </div>

                  {/* Enhanced date picker fields with shadows */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="startDate">
                        Tanggal Mulai <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MdCalendarToday className="h-5 w-5 text-indigo-500" />
                        </div>
                        <input
                          id="startDate"
                          name="startDate"
                          type="date"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="endDate">
                        Tanggal Selesai <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MdCalendarToday className="h-5 w-5 text-indigo-500" />
                        </div>
                        <input
                          id="endDate"
                          name="endDate"
                          type="date"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="reviewPeriod">
                        Periode Review (hari)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MdAccessTime className="h-5 w-5 text-indigo-500" />
                        </div>
                        <select
                          id="reviewPeriod"
                          name="reviewPeriod"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                          value={formData.reviewPeriod}
                          onChange={handleInputChange}
                        >
                          <option value="7">7 hari</option>
                          <option value="14">14 hari</option>
                          <option value="21">21 hari</option>
                          <option value="30">30 hari</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced info alert with glass effect */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 flex items-start mt-6 backdrop-blur-sm">
                    <MdInfo className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-700 font-medium">Periode Aktif</p>
                      <p className="text-sm text-blue-600">
                        Sesi akan dibuat aktif sesuai dengan rentang tanggal yang dipilih. Pastikan tanggal mulai lebih awal daripada tanggal selesai.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Participants */}
              {currentStep === 2 && (
                <div className="space-y-8" data-aos="fade-up">
                  <div className="flex items-center mb-6">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                      <MdGroups className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Konfigurasi Peserta</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="maxReviewers">
                        Jumlah Maksimum Reviewer
                      </label>
                      <input
                        id="maxReviewers"
                        name="maxReviewers"
                        type="number"
                        className="w-full px-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        value={formData.maxReviewers}
                        onChange={handleInputChange}
                        placeholder="Contoh: 5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="maxProposals">
                        Jumlah Maksimum Proposal
                      </label>
                      <input
                        id="maxProposals"
                        name="maxProposals"
                        type="number"
                        className="w-full px-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        value={formData.maxProposals}
                        onChange={handleInputChange}
                        placeholder="Contoh: 50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Fakultas yang Diizinkan <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {faculties.map((faculty) => (
                        <div
                          key={faculty}
                          className={`flex items-center border rounded-xl p-4 cursor-pointer transition-all ${formData.allowedFaculties.includes(faculty)
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                          onClick={() => handleFacultyToggle(faculty)}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${formData.allowedFaculties.includes(faculty) ? 'bg-indigo-600' : 'border border-gray-300'
                            }`}>
                            {formData.allowedFaculties.includes(faculty) && (
                              <MdCheck className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <span className="text-gray-800">{faculty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 flex items-start mt-6">
                    <MdInfo className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      Pilih setidaknya satu fakultas yang diizinkan untuk berpartisipasi dalam sesi ini. Semua dosen dan peneliti dari fakultas tersebut akan dapat mengikutinya.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Security & Validation Settings */}
              {currentStep === 3 && (
                <div className="space-y-8" data-aos="fade-up">
                  <div className="flex items-center mb-6">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                      <MdShield className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Keamanan & Validasi</h2>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Keamanan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Level Keamanan
                        </label>
                        <div className="flex border border-gray-300 rounded-xl p-1 bg-gray-50">
                          {['rendah', 'sedang', 'tinggi'].map((level) => (
                            <button
                              key={level}
                              type="button"
                              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${formData.securityLevel === level
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-700 hover:bg-gray-200'
                                }`}
                              onClick={() => setFormData({ ...formData, securityLevel: level })}
                            >
                              {level.charAt(0).toUpperCase() + level.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="sessionTimeout">
                          Timeout Sesi (menit)
                        </label>
                        <input
                          id="sessionTimeout"
                          name="sessionTimeout"
                          type="number"
                          className="w-full px-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                          value={formData.sessionTimeout}
                          onChange={handleInputChange}
                          placeholder="Contoh: 60"
                        />
                      </div>

                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="requireTwoFactor"
                            className="sr-only peer"
                            checked={formData.requireTwoFactor}
                            onChange={handleInputChange}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          <span className="ml-3 text-sm font-medium text-gray-700">Wajibkan Verifikasi 2 Langkah</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Validasi</h3>

                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-medium text-gray-700">
                          <div className="flex items-center">
                            <MdAutoAwesome className="h-5 w-5 text-indigo-600 mr-2" />
                            Validasi Machine Learning
                          </div>
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="enableMlValidation"
                            className="sr-only peer"
                            checked={formData.enableMlValidation}
                            onChange={handleInputChange}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>

                      {formData.enableMlValidation && (
                        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Threshold Validasi: <span className="text-indigo-700 font-bold">{formData.mlThreshold}%</span>
                          </label>
                          <input
                            type="range"
                            name="mlThreshold"
                            min="0"
                            max="100"
                            step="5"
                            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            value={formData.mlThreshold}
                            onChange={handleInputChange}
                          />
                          <div className="flex justify-between text-xs text-indigo-600 mt-1">
                            <span>Lebih Fleksibel</span>
                            <span>Lebih Ketat</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Aturan Validasi yang Diterapkan
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {validationRuleOptions.map((rule) => (
                          <div
                            key={rule.id}
                            className={`border rounded-xl p-3 cursor-pointer transition-all ${formData.validationRules.includes(rule.id)
                              ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300'
                              }`}
                            onClick={() => handleValidationRuleToggle(rule.id)}
                          >
                            <div className="flex items-start">
                              <div className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center mr-2 ${formData.validationRules.includes(rule.id) ? 'bg-indigo-600' : 'border border-gray-300'
                                }`}>
                                {formData.validationRules.includes(rule.id) && (
                                  <MdCheck className="h-4 w-4 text-white" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{rule.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{rule.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifikasi</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Kirim Pengingat</p>
                          <p className="text-xs text-gray-500 mt-1">Kirim pengingat otomatis kepada reviewer</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="sendReminders"
                            className="sr-only peer"
                            checked={formData.sendReminders}
                            onChange={handleInputChange}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>

                      {formData.sendReminders && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="reminderInterval">
                            Interval Pengingat (jam)
                          </label>
                          <select
                            id="reminderInterval"
                            name="reminderInterval"
                            className="w-full px-4 py-2 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                            value={formData.reminderInterval}
                            onChange={handleInputChange}
                          >
                            <option value="12">12 jam sebelumnya</option>
                            <option value="24">24 jam sebelumnya</option>
                            <option value="48">48 jam sebelumnya</option>
                            <option value="72">72 jam sebelumnya</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons with enhanced styling */}
              <div className="flex justify-between mt-12">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={goToPreviousStep}
                  className={`${currentStep === 1 ? 'invisible' : 'visible'} px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center shadow-sm`}
                >
                  <MdKeyboardArrowRight className="h-5 w-5 rotate-180 mr-1" />
                  Kembali
                </motion.button>

                {currentStep < 3 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={goToNextStep}
                    disabled={!isStepValid(currentStep)}
                    className={`px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center shadow-md ${!isStepValid(currentStep) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Lanjut <MdKeyboardArrowRight className="h-5 w-5 ml-1" />
                  </motion.button>
                ) : (
                  <div className="space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setShowPreview(true)}
                      className="px-6 py-3 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-all shadow-md"
                    >
                      Pratinjau
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleSubmit}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ?
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Memproses...
                        </div> :
                        "Buat Sesi"
                      }
                    </motion.button>
                  </div>
                )}
              </div>
            </form>
          </Card>
        </motion.div>
      ) : (
        /* Enhanced Preview Mode with animations and modern card design */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card extra="p-8 shadow-lg border border-gray-100 rounded-3xl" data-aos="fade-up">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Pratinjau Sesi</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Kembali ke Edit
              </button>
            </div>

            <div className="space-y-8">
              {/* Basic Info Preview */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Informasi Dasar</h3>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Nama Sesi</p>
                      <p className="font-medium text-gray-800">{formData.sessionName || '(Belum diisi)'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tipe Sesi</p>
                      <p className="font-medium text-gray-800">
                        {sessionTypes.find(t => t.id === formData.sessionType)?.name || '(Belum dipilih)'}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Deskripsi</p>
                      <p className="font-medium text-gray-800">{formData.sessionDescription || '(Tidak ada deskripsi)'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Preview */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Jadwal</h3>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Tanggal Mulai</p>
                      <p className="font-medium text-gray-800">{formData.startDate || '(Belum diisi)'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tanggal Selesai</p>
                      <p className="font-medium text-gray-800">{formData.endDate || '(Belum diisi)'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Durasi Per Sesi</p>
                      <p className="font-medium text-gray-800">{formData.duration ? `${formData.duration} menit` : '(Belum diisi)'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Participants Preview */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Peserta</h3>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Jumlah Maksimum Reviewer</p>
                      <p className="font-medium text-gray-800">{formData.maxReviewers || '(Belum diisi)'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Jumlah Maksimum Proposal</p>
                      <p className="font-medium text-gray-800">{formData.maxProposals || '(Belum diisi)'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Fakultas yang Diizinkan</p>
                      {formData.allowedFaculties.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.allowedFaculties.map(faculty => (
                            <span key={faculty} className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-100 text-indigo-800 text-xs">
                              {faculty}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="font-medium text-gray-800">(Belum dipilih)</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Validation Preview */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Keamanan & Validasi</h3>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Level Keamanan</p>
                      <p className="font-medium text-gray-800">{formData.securityLevel.charAt(0).toUpperCase() + formData.securityLevel.slice(1)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Verifikasi 2 Langkah</p>
                      <p className="font-medium text-gray-800">{formData.requireTwoFactor ? 'Diaktifkan' : 'Tidak Aktif'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Timeout Sesi</p>
                      <p className="font-medium text-gray-800">{formData.sessionTimeout} menit</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Validasi Machine Learning</p>
                      <p className="font-medium text-gray-800">{formData.enableMlValidation ? `Aktif (${formData.mlThreshold}%)` : 'Tidak Aktif'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Aturan Validasi</p>
                      {formData.validationRules.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.validationRules.map(ruleId => {
                            const rule = validationRuleOptions.find(r => r.id === ruleId);
                            return (
                              <span key={ruleId} className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-100 text-indigo-800 text-xs">
                                {rule?.name || ruleId}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="font-medium text-gray-800">(Belum dipilih)</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Preview */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Notifikasi</h3>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Kirim Pengingat</p>
                      <p className="font-medium text-gray-800">{formData.sendReminders ? 'Ya' : 'Tidak'}</p>
                    </div>
                    {formData.sendReminders && (
                      <div>
                        <p className="text-sm text-gray-500">Interval Pengingat</p>
                        <p className="font-medium text-gray-800">{formData.reminderInterval} jam sebelumnya</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all shadow-lg flex items-center font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <MdCheck className="mr-2" /> Buat Sesi Sekarang
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default AddSession;
