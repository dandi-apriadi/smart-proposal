import React, { useState, useEffect } from 'react';
import {
  MdDescription,
  MdAdd,
  MdEdit,
  MdDelete,
  MdContentCopy,
  MdDownload,
  MdAutorenew,
  MdSettings,
  MdWarning,
  MdVisibility,
  MdCheckCircle,
  MdPlaylistAdd,
  MdFormatListBulleted,
  MdAutoGraph,
  MdCalendarViewMonth,
  MdPeople,
  MdInsights,
  MdSearch,
  MdClose
} from 'react-icons/md';
import { HiTemplate } from 'react-icons/hi';
import { FiArrowRight, FiPlusCircle, FiChevronRight, FiInfo, FiLayers } from 'react-icons/fi';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateManagement = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Template Pengadaan Barang",
      category: "Pengadaan",
      lastModified: "2023-12-20",
      status: "active",
      mlScore: 95,
      sections: ["Pendahuluan", "Spesifikasi", "RAB", "Jadwal"],
      usage: 24,
      validationRules: {
        requiredDocs: ["RAB", "Justifikasi", "Spesifikasi"],
        formatChecks: true,
        mlValidation: true
      }
    },
    {
      id: 2,
      name: "Template Kegiatan Workshop",
      category: "Kegiatan",
      lastModified: "2023-12-18",
      status: "active",
      mlScore: 92,
      sections: ["Latar Belakang", "Tujuan", "Anggaran", "Timeline"],
      usage: 18,
      validationRules: {
        requiredDocs: ["Rundown", "RAB", "CV Pembicara"],
        formatChecks: true,
        mlValidation: true
      }
    },
    // Adding more templates for better showcase
    {
      id: 3,
      name: "Template Kegiatan Seminar",
      category: "Kegiatan",
      lastModified: "2024-01-05",
      status: "active",
      mlScore: 88,
      sections: ["Latar Belakang", "Tujuan", "Anggaran", "Peserta"],
      usage: 11,
      validationRules: {
        requiredDocs: ["Rundown", "RAB", "CV Pembicara", "Daftar Peserta"],
        formatChecks: true,
        mlValidation: true
      }
    },
    {
      id: 4,
      name: "Template Pengadaan IT",
      category: "Pengadaan",
      lastModified: "2024-01-10",
      status: "draft",
      mlScore: 78,
      sections: ["Pendahuluan", "Spesifikasi Teknis", "RAB", "Timeline"],
      usage: 5,
      validationRules: {
        requiredDocs: ["RAB", "Justifikasi", "Spesifikasi Teknis"],
        formatChecks: true,
        mlValidation: false
      }
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [templateView, setTemplateView] = useState('grid');
  const [currentCategory, setCurrentCategory] = useState('all');

  const categories = ['all', 'Pengadaan', 'Kegiatan', 'Infrastruktur', 'Penelitian'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = currentCategory === 'all' || template.category === currentCategory;
    return matchesSearch && matchesCategory;
  });

  const openTemplateDetail = (template) => {
    setSelectedTemplate(template);
    setShowDetailModal(true);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Pengadaan': 'blue',
      'Kegiatan': 'green',
      'Infrastruktur': 'purple',
      'Penelitian': 'orange',
      'default': 'gray'
    };

    return colors[category] || colors.default;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <MdCheckCircle className="mr-1" />Active
        </span>;
      case 'draft':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          <MdWarning className="mr-1" />Draft
        </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status}
        </span>;
    }
  };

  return (
    <div className="min-h-screen py-6 bg-gradient-to-b from-blue-50 to-white dark:from-navy-900 dark:to-navy-800">
      {/* Modern Header with Visual Elements */}
      <div className="relative mb-8 overflow-hidden" data-aos="fade-down">
        {/* Abstract background elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-10 right-20 w-20 h-20 bg-teal-500/10 rounded-full blur-lg"></div>
        <div className="absolute -bottom-8 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 inline-block">
                Template Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
                Kelola dan konfigurasi berbagai template proposal dengan validasi ML untuk meningkatkan kualitas dan konsistensi
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setCurrentCategory(category)}
                    className={`px-3 py-1 text-sm rounded-full transition-all ${currentCategory === category
                      ? 'bg-teal-500 text-white shadow-sm'
                      : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                  >
                    {category === 'all' ? 'Semua' : category}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0">
              <div className="flex bg-white dark:bg-navy-800 rounded-lg border border-gray-200 dark:border-navy-700">
                <button
                  className={`px-3 py-2 ${templateView === 'grid' ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
                  onClick={() => setTemplateView('grid')}
                >
                  <MdCalendarViewMonth className="h-5 w-5" />
                </button>
                <button
                  className={`px-3 py-2 ${templateView === 'list' ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
                  onClick={() => setTemplateView('list')}
                >
                  <MdFormatListBulleted className="h-5 w-5" />
                </button>
              </div>

              <button
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-sm flex items-center gap-2"
                onClick={() => setSelectedTemplate({})}
              >
                <MdAdd className="h-5 w-5" />
                Template Baru
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-md">
            <input
              type="text"
              placeholder="Cari template..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            />
            <MdSearch className="absolute top-3.5 left-3.5 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-8">
        {filteredTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <HiTemplate className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No templates found</h3>
            <p className="text-gray-500 text-center max-w-md mt-2">
              We couldn't find any templates matching your criteria. Try adjusting your filters or create a new template.
            </p>
            <button
              className="mt-6 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
              onClick={() => setSelectedTemplate({})}
            >
              <MdAdd className="h-5 w-5" />
              Create New Template
            </button>
          </div>
        ) : templateView === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-aos="fade-up">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden group"
                data-aos="fade-up"
                data-aos-delay={template.id * 50}
              >
                {/* Card Header */}
                <div className={`h-2 bg-${getCategoryColor(template.category)}-500`}></div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className={`p-2.5 rounded-md bg-${getCategoryColor(template.category)}-100 text-${getCategoryColor(template.category)}-600 mr-3`}>
                        <MdDescription className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 group-hover:text-teal-600 transition-colors">
                          {template.name}
                        </h3>
                        <div className="text-xs text-gray-500 mt-1">
                          {template.category}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(template.status)}
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MdAutorenew className="mr-1.5" />
                    <span>Updated: {template.lastModified}</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-500">ML Score</span>
                      <span className={`text-xs font-medium text-${template.mlScore >= 90 ? 'green' : template.mlScore >= 80 ? 'teal' : 'orange'}-600`}>
                        {template.mlScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full bg-${template.mlScore >= 90 ? 'green' : template.mlScore >= 80 ? 'teal' : 'orange'}-500`}
                        style={{ width: `${template.mlScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {template.sections.slice(0, 3).map((section, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                        {section}
                      </span>
                    ))}
                    {template.sections.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                        +{template.sections.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500">
                      <MdPeople className="mr-1" />
                      <span>{template.usage} penggunaan</span>
                    </div>

                    <div className="flex space-x-1">
                      <button
                        onClick={() => openTemplateDetail(template)}
                        className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                      >
                        <MdVisibility className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <MdEdit className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <MdDelete className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3" data-aos="fade-up">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden group flex"
                data-aos="fade-up"
                data-aos-delay={template.id * 50}
              >
                <div className={`w-1.5 bg-${getCategoryColor(template.category)}-500`}></div>
                <div className="flex-1 p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-md bg-${getCategoryColor(template.category)}-100 text-${getCategoryColor(template.category)}-600 mr-3 hidden sm:block`}>
                        <MdDescription className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900 group-hover:text-teal-600 transition-colors">
                            {template.name}
                          </h3>
                          {getStatusBadge(template.status)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-4">
                          <span>{template.category}</span>
                          <span className="flex items-center">
                            <MdAutorenew className="mr-1" />
                            {template.lastModified}
                          </span>
                          <span className="flex items-center">
                            <MdPeople className="mr-1" />
                            {template.usage} penggunaan
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <span className="text-sm mr-2">ML Score:</span>
                        <span className={`text-sm font-medium text-${template.mlScore >= 90 ? 'green' : template.mlScore >= 80 ? 'teal' : 'orange'}-600`}>
                          {template.mlScore}%
                        </span>
                      </div>

                      <div className="flex space-x-1">
                        <button
                          onClick={() => openTemplateDetail(template)}
                          className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                          title="View Details"
                        >
                          <MdVisibility className="h-5 w-5" />
                        </button>
                        <button
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit Template"
                        >
                          <MdEdit className="h-5 w-5" />
                        </button>
                        <button
                          className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                          title="Duplicate Template"
                        >
                          <MdContentCopy className="h-5 w-5" />
                        </button>
                        <button
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete Template"
                        >
                          <MdDelete className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Configuration & ML Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
        {/* ML Configuration Panel */}
        <Card
          extra="p-6 border border-gray-100 hover:shadow-md transition-all"
          data-aos="fade-right"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <MdAutoGraph className="text-teal-500 mr-2 h-5 w-5" />
              ML Configuration
            </h2>
            <button className="text-xs text-teal-600 hover:text-teal-800 flex items-center">
              Advanced Settings
              <FiChevronRight className="ml-1" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg border border-teal-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-teal-800">Format Validation</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-300 peer-checked:after:translate-x-full peer-checked:bg-teal-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-teal-700">Threshold Score</span>
                  <span className="text-sm font-medium text-teal-800">85%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="85"
                  className="w-full h-2 bg-teal-200 rounded-full appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-teal-600">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">Required Components</h3>
                <button className="text-teal-600 hover:bg-teal-50 p-1 rounded-md">
                  <FiPlusCircle />
                </button>
              </div>
              <div className="space-y-2">
                {["Pendahuluan", "RAB", "Timeline", "Kesimpulan"].map((item, index) => (
                  <label key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-teal-600 focus:ring-teal-500"
                        defaultChecked={index < 3}
                      />
                      <span className="text-sm text-gray-700 ml-2">{item}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-xs ${index < 2 ? 'text-red-600' : 'text-gray-500'}`}>
                        {index < 2 ? 'Required' : 'Optional'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-sm">
              <MdSettings className="h-5 w-5" />
              Save Configuration
            </button>
          </div>
        </Card>

        {/* ML Insights */}
        <Card
          extra="p-6 border border-gray-100 hover:shadow-md transition-all lg:col-span-2"
          data-aos="fade-left"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <MdInsights className="text-blue-500 mr-2 h-5 w-5" />
              ML Insights
            </h2>
            <button className="text-blue-500 hover:text-blue-700 px-3 py-1 text-sm rounded-lg border border-blue-200 hover:bg-blue-50">
              View Report
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-medium text-blue-700">Template Effectiveness</h3>
                <div className="text-lg font-bold text-blue-800">92%</div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-blue-700">Format Consistency</span>
                    <span className="text-blue-800 font-medium">96%</span>
                  </div>
                  <div className="w-full h-1.5 bg-blue-200 rounded-full">
                    <div className="h-1.5 bg-blue-600 rounded-full" style={{ width: "96%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-blue-700">Completeness</span>
                    <span className="text-blue-800 font-medium">88%</span>
                  </div>
                  <div className="w-full h-1.5 bg-blue-200 rounded-full">
                    <div className="h-1.5 bg-blue-600 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-blue-700">User Satisfaction</span>
                    <span className="text-blue-800 font-medium">93%</span>
                  </div>
                  <div className="w-full h-1.5 bg-blue-200 rounded-full">
                    <div className="h-1.5 bg-blue-600 rounded-full" style={{ width: "93%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Common Issues</h3>

              <div className="space-y-2.5">
                <div className="flex items-start">
                  <div className="p-1.5 rounded-md bg-amber-100 text-amber-600 mr-2.5">
                    <MdWarning className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-800">Missing Budget Details</h4>
                    <p className="text-xs text-gray-500 mt-0.5">18% of proposals have incomplete budget sections</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-1.5 rounded-md bg-amber-100 text-amber-600 mr-2.5">
                    <MdWarning className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-800">Timeline Inconsistencies</h4>
                    <p className="text-xs text-gray-500 mt-0.5">12% of proposals have inconsistent timelines</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-1.5 rounded-md bg-amber-100 text-amber-600 mr-2.5">
                    <MdWarning className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-800">Format Deviations</h4>
                    <p className="text-xs text-gray-500 mt-0.5">9% of proposals deviate from required format</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Recommendations</h3>

              <div className="space-y-3">
                <div className="flex items-center bg-teal-50 p-3 rounded-lg border border-teal-100">
                  <div className="p-2 rounded-md bg-teal-100 text-teal-600 mr-3">
                    <FiInfo className="h-4 w-4" />
                  </div>
                  <p className="text-xs text-teal-700">Consider adding detailed budget guidelines to increase proposal quality and approval rates.</p>
                </div>
                <div className="flex items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <div className="p-2 rounded-md bg-blue-100 text-blue-600 mr-3">
                    <FiLayers className="h-4 w-4" />
                  </div>
                  <p className="text-xs text-blue-700">Template structure consistency is high, maintain the current section organization.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Template Detail Modal */}
      {showDetailModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            data-aos="zoom-in"
            data-aos-duration="300"
          >
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Template Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdClose className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-5">
                <div className={`p-3 rounded-md bg-${getCategoryColor(selectedTemplate.category)}-100 text-${getCategoryColor(selectedTemplate.category)}-600 mr-4`}>
                  <MdDescription className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h2>
                  <div className="text-sm text-gray-500 mt-1 flex items-center flex-wrap gap-x-4 gap-y-2">
                    <span>{selectedTemplate.category}</span>
                    <span className="flex items-center">
                      <MdAutorenew className="mr-1.5" />
                      Updated: {selectedTemplate.lastModified}
                    </span>
                    <span className="flex items-center">
                      <MdPeople className="mr-1.5" />
                      {selectedTemplate.usage} uses
                    </span>
                    {getStatusBadge(selectedTemplate.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Template Sections</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <ul className="space-y-2">
                      {selectedTemplate.sections?.map((section, idx) => (
                        <li key={idx} className="flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors">
                          <div className="h-5 w-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs mr-3">
                            {idx + 1}
                          </div>
                          <span className="text-sm text-gray-700">{section}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full mt-3 flex items-center justify-center text-teal-600 hover:text-teal-800 text-sm">
                      <MdAdd className="mr-1" />
                      Add Section
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-3">ML Configuration</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">ML Score</span>
                        <span className={`text-sm font-medium text-${selectedTemplate.mlScore >= 90 ? 'green' : selectedTemplate.mlScore >= 80 ? 'teal' : 'orange'}-600`}>
                          {selectedTemplate.mlScore}%
                        </span>
                      </div>

                      <div>
                        <label className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">Format Validation</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked={selectedTemplate.validationRules?.formatChecks}
                            />
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300 peer-checked:after:translate-x-full peer-checked:bg-teal-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                          </label>
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">ML Validation</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked={selectedTemplate.validationRules?.mlValidation}
                            />
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300 peer-checked:after:translate-x-full peer-checked:bg-teal-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                          </label>
                        </label>
                      </div>

                      <div>
                        <h4 className="text-sm text-gray-700 mb-2">Required Documents</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTemplate.validationRules?.requiredDocs.map((doc, idx) => (
                            <span key={idx} className="text-xs px-2.5 py-1 bg-teal-100 text-teal-700 rounded-full">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Preview
                  </button>
                  <button className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center">
                    <MdContentCopy className="mr-1.5 h-4 w-4" />
                    Duplicate
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    Edit Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateManagement;
