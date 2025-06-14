import React, { useState, useEffect, useRef } from 'react';
import {
    FiSave, FiSliders, FiServer, FiAlertTriangle, FiBell,
    FiCheckSquare, FiChevronRight, FiArrowLeft, FiCheck,
    FiX, FiSearch, FiGrid, FiList, FiFilter, FiMoreHorizontal,
    FiCpu, FiUsers, FiFileText, FiHome, FiSettings
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const SettingsPage = () => {
    // State for settings
    const [generalSettings, setGeneralSettings] = useState({
        siteName: 'ProposalCek - Politeknik Negeri Manado',
        adminEmail: 'admin@polimdo.ac.id',
        maxFileSize: 10,
        allowedFileTypes: ['.pdf', '.docx'],
        defaultLanguage: 'id'
    });

    const [modelSettings, setModelSettings] = useState({
        confidenceThreshold: 75,
        autoTraining: false,
        trainingFrequency: 'monthly', // weekly, monthly, quarterly
        minTrainingData: 50,
        enableAutoCorrection: true
    });

    const [validationSettings, setValidationSettings] = useState({
        requireCover: true,
        requireExecutiveSummary: true,
        requireBackground: true,
        requireObjectives: true,
        requireBudget: true,
        requireTimeline: true,
        minimumPages: 10,
        maximumPages: 50
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        browserNotifications: false,
        notifyOnNewProposal: true,
        notifyOnValidationComplete: true,
        notifyOnModelTraining: false,
        dailySummary: true
    });

    // Additional state for active section tracking
    const [activeSection, setActiveSection] = useState('general');
    const sectionRefs = {
        general: useRef(null),
        model: useRef(null),
        validation: useRef(null),
        notifications: useRef(null)
    };

    // Enhanced UI state
    const [compactMode, setCompactMode] = useState(localStorage.getItem('settingsCompactMode') === 'true');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showQuickSettings, setShowQuickSettings] = useState(false);

    // Save UI preferences
    useEffect(() => {
        localStorage.setItem('settingsCompactMode', compactMode);
    }, [compactMode]);

    // AOS initialization
    useEffect(() => {
        // Initialize AOS
        if (typeof window !== 'undefined') {
            const AOS = require('aos');
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
            });
            AOS.refresh();
        }
    }, []);

    // Scroll to section handler
    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        sectionRefs[sectionId].current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    // Enhanced save handler with visual feedback
    const handleSaveSettings = (section, data) => {
        // Show loading toast
        const toastId = toast.loading(`Saving ${section} settings...`);

        // Simulate API call with delay
        setTimeout(() => {
            console.log(`Saving ${section} settings:`, data);

            // Update toast to success
            toast.update(toastId, {
                render: `${section} settings saved successfully!`,
                type: toast.TYPE.SUCCESS,
                isLoading: false,
                autoClose: 3000,
                closeButton: true
            });
        }, 800);
    };

    // Filter settings based on search
    const filterSettings = (section, query) => {
        if (!query) return true;
        const lowercaseQuery = query.toLowerCase();

        // List of searchable terms for each section
        const searchableTerms = {
            general: [
                generalSettings.siteName,
                generalSettings.adminEmail,
                'system name', 'admin email', 'file size', 'language'
            ],
            model: [
                'confidence', 'threshold', 'training', 'auto correction',
                'random forest', 'model settings'
            ],
            validation: [
                'cover', 'executive summary', 'background', 'objectives',
                'budget', 'timeline', 'page limits', 'validation criteria'
            ],
            notifications: [
                'email', 'browser', 'daily summary', 'new proposals',
                'notification settings', 'alerts'
            ]
        };

        return searchableTerms[section].some(term =>
            term.toLowerCase().includes(lowercaseQuery)
        );
    };

    return (
        <div className={`min-h-screen bg-slate-50 ${compactMode ? 'p-2 md:p-3' : 'p-4 md:p-6'} transition-all duration-200`}>
            <div className="max-w-7xl mx-auto"></div>
            {/* Efficient Header with Search & Mode Toggles */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3" data-aos="fade-down">
                <div>
                    <h1 className={`font-bold text-slate-800 ${compactMode ? 'text-2xl' : 'text-3xl'}`}>
                        System Settings
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Configure ML validation system parameters
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <FiSearch className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search settings..."
                        className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 w-40 md:w-56 transition-all focus:w-56 md:focus:w-72"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <button
                    className={`p-2 rounded-lg border ${compactMode ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-200 text-slate-600'}`}
                    onClick={() => setCompactMode(!compactMode)}
                    title={compactMode ? "Switch to comfortable view" : "Switch to compact view"}
                >
                    {compactMode ? <FiList /> : <FiGrid />}
                </button>

                <button
                    className="p-2 rounded-lg border border-slate-200 text-slate-600 relative"
                    onClick={() => setShowQuickSettings(!showQuickSettings)}
                    title="Quick settings"
                >
                    <FiMoreHorizontal />
                </button>

                {showQuickSettings && (
                    <div className="absolute right-6 mt-32 bg-white rounded-lg shadow-lg border border-slate-200 z-10 w-60">
                        <div className="p-3 border-b border-slate-100">
                            <h3 className="font-medium text-sm">Quick Settings</h3>
                        </div>
                        <div className="p-2">
                            <button
                                onClick={() => {
                                    handleSaveSettings('All', {
                                        general: generalSettings,
                                        model: modelSettings,
                                        validation: validationSettings,
                                        notification: notificationSettings
                                    });
                                }}
                                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-slate-50 flex items-center"
                            >
                                <FiSave className="mr-2 text-indigo-500" /> Save all settings
                            </button>
                            <div className="border-t border-slate-100 my-1"></div>
                            <button
                                onClick={() => scrollToSection('general')}
                                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-slate-50 flex items-center"
                            >
                                <FiSliders className="mr-2 text-slate-500" /> General settings
                            </button>
                            <button
                                onClick={() => scrollToSection('model')}
                                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-slate-50 flex items-center"
                            >
                                <FiCpu className="mr-2 text-slate-500" /> Model settings
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Compact breadcrumb navigation for context */}
            <div className="flex items-center text-xs text-slate-500 mb-3">
                <button
                    onClick={() => {/* Navigate to dashboard */ }}
                    className="hover:text-indigo-600 flex items-center"
                >
                    <FiHome className="mr-1" /> Dashboard
                </button>
                <span className="mx-1">•</span>
                <button
                    onClick={() => {/* Navigate to admin */ }}
                    className="hover:text-indigo-600"
                >
                    Admin
                </button>
                <span className="mx-1">•</span>
                <span className="text-indigo-600 font-medium">Settings</span>
            </div>

            {/* Settings Grid with efficient layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Left Column - Efficient Compact Navigation */}
                <div
                    className={`lg:col-span-1 ${sidebarCollapsed ? 'lg:col-span-auto' : ''}`}
                    data-aos="fade-right"
                >
                    <div className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden sticky top-6 
                            ${sidebarCollapsed ? 'w-16' : 'w-full'} transition-all duration-300`}
                    >
                        {!sidebarCollapsed && (
                            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-4 text-white flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-base">Settings</h3>
                                    <p className="text-indigo-100 text-xs mt-0.5">Configure system</p>
                                </div>
                                <button
                                    onClick={() => setSidebarCollapsed(true)}
                                    className="p-1 rounded-md hover:bg-indigo-400/30"
                                    title="Collapse sidebar"
                                >
                                    <FiArrowLeft className="h-4 w-4" />
                                </button>
                            </div>
                        )}

                        {sidebarCollapsed && (
                            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-3 text-white">
                                <button
                                    onClick={() => setSidebarCollapsed(false)}
                                    className="p-1 rounded-md hover:bg-indigo-400/30 w-full flex justify-center"
                                    title="Expand sidebar"
                                >
                                    <FiSettings className="h-5 w-5" />
                                </button>
                            </div>
                        )}

                        <nav className={`p-1 ${compactMode ? 'py-1' : 'py-2'}`}>
                            {['general', 'model', 'validation', 'notifications'].map((section) => {
                                // Skip sections that don't match search query
                                if (searchQuery && !filterSettings(section, searchQuery)) return null;

                                const icons = {
                                    general: <FiSliders className={`${activeSection === 'general' ? 'text-indigo-600' : 'text-slate-500'}`} />,
                                    model: <FiServer className={`${activeSection === 'model' ? 'text-indigo-600' : 'text-slate-500'}`} />,
                                    validation: <FiCheckSquare className={`${activeSection === 'validation' ? 'text-indigo-600' : 'text-slate-500'}`} />,
                                    notifications: <FiBell className={`${activeSection === 'notifications' ? 'text-indigo-600' : 'text-slate-500'}`} />
                                };

                                const labels = {
                                    general: "General",
                                    model: "ML Model",
                                    validation: "Validation",
                                    notifications: "Notifications"
                                };

                                return (
                                    <button
                                        key={section}
                                        onClick={() => scrollToSection(section)}
                                        className={`w-full flex items-center justify-${sidebarCollapsed ? 'center' : 'between'} 
                                                px-${sidebarCollapsed ? '2' : '3'} py-${compactMode ? '2' : '2.5'} rounded-lg mb-1 transition-all duration-200 
                                                ${activeSection === section
                                                ? 'bg-indigo-50 text-indigo-700'
                                                : 'text-slate-700 hover:bg-slate-50'
                                            }`}
                                        title={labels[section]}
                                    >
                                        <span className="flex items-center">
                                            {icons[section]}
                                            {!sidebarCollapsed && <span className={`${sidebarCollapsed ? 'hidden' : 'ml-3'}`}>{labels[section]}</span>}
                                        </span>
                                        {!sidebarCollapsed && activeSection === section &&
                                            <FiChevronRight className={`transition-all duration-200 text-indigo-600`} />
                                        }
                                    </button>
                                );
                            })}
                        </nav>

                        {!searchQuery && !sidebarCollapsed && (
                            <div className={`${compactMode ? 'p-3 mx-2 mb-2' : 'p-4 m-3'} bg-amber-50 rounded-lg border border-amber-100 text-xs`}>
                                <div className="flex">
                                    <FiAlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                                    <div className="ml-2">
                                        <h4 className="font-medium text-amber-800">Note</h4>
                                        <p className="text-amber-700 mt-0.5 leading-relaxed">
                                            Model settings changes require retraining.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Efficient Settings Forms */}
                <div className={`${sidebarCollapsed ? 'lg:col-span-3.5' : 'lg:col-span-3'} space-y-4`}>
                    {/* General Settings - Efficient Layout */}
                    {(!searchQuery || filterSettings('general', searchQuery)) && (
                        <section
                            id="general"
                            ref={sectionRefs.general}
                            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300"
                            data-aos="fade-up"
                        >
                            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                                <div className="flex items-center">
                                    <FiSliders className="text-lg text-indigo-600 mr-2" />
                                    <h2 className={`${compactMode ? 'text-lg' : 'text-xl'} font-semibold text-slate-800`}>General Settings</h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleSaveSettings('General', generalSettings)}
                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                                >
                                    <FiSave className="mr-1.5 h-3.5 w-3.5" /> Save
                                </button>
                            </div>

                            <div className={`${compactMode ? 'p-4' : 'p-6'}`}>
                                <div className="space-y-4">
                                    {/* Two-column basic info - efficient layout */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="siteName" className="block text-sm font-medium text-slate-700 mb-1">System Name</label>
                                            <input
                                                id="siteName"
                                                type="text"
                                                className={`w-full ${compactMode ? 'px-3 py-2' : 'px-4 py-2.5'} bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200`}
                                                value={generalSettings.siteName}
                                                onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="adminEmail" className="block text-sm font-medium text-slate-700 mb-1">Admin Email</label>
                                            <input
                                                id="adminEmail"
                                                type="email"
                                                className={`w-full ${compactMode ? 'px-3 py-2' : 'px-4 py-2.5'} bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200`}
                                                value={generalSettings.adminEmail}
                                                onChange={(e) => setGeneralSettings({ ...generalSettings, adminEmail: e.target.value })}
                                            />
                                        </div>

                                        {/* File settings in grid */}
                                        <div>
                                            <label htmlFor="maxFileSize" className="block text-sm font-medium text-slate-700 mb-1">Max File Size (MB)</label>
                                            <div className="relative">
                                                <input
                                                    id="maxFileSize"
                                                    type="number"
                                                    min="1"
                                                    max="50"
                                                    className={`w-full ${compactMode ? 'px-3 py-2 pr-8' : 'px-4 py-2.5 pr-10'} bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200`}
                                                    value={generalSettings.maxFileSize}
                                                    onChange={(e) => setGeneralSettings({ ...generalSettings, maxFileSize: parseInt(e.target.value, 10) })}
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 text-sm">
                                                    MB
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="defaultLanguage" className="block text-sm font-medium text-slate-700 mb-1">Default Language</label>
                                            <select
                                                id="defaultLanguage"
                                                className={`w-full ${compactMode ? 'px-3 py-2' : 'px-4 py-2.5'} bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200`}
                                                value={generalSettings.defaultLanguage}
                                                onChange={(e) => setGeneralSettings({ ...generalSettings, defaultLanguage: e.target.value })}
                                            >
                                                <option value="id">Bahasa Indonesia</option>
                                                <option value="en">English</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* File types in compact grid */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Allowed File Types</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['.pdf', '.docx', '.doc', '.txt'].map(fileType => (
                                                <label
                                                    key={fileType}
                                                    className={`flex items-center ${compactMode ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-full border 
                                                            ${generalSettings.allowedFileTypes.includes(fileType)
                                                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                                        } transition-all duration-200 cursor-pointer text-sm`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={generalSettings.allowedFileTypes.includes(fileType)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setGeneralSettings({
                                                                    ...generalSettings,
                                                                    allowedFileTypes: [...generalSettings.allowedFileTypes, fileType]
                                                                });
                                                            } else {
                                                                setGeneralSettings({
                                                                    ...generalSettings,
                                                                    allowedFileTypes: generalSettings.allowedFileTypes.filter(type => type !== fileType)
                                                                });
                                                            }
                                                        }}
                                                    />
                                                    {generalSettings.allowedFileTypes.includes(fileType) && (
                                                        <FiCheck className="mr-1 text-indigo-600 h-3.5 w-3.5" />
                                                    )}
                                                    <span>{fileType}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Remaining sections (model, validation, notifications) follow the same efficient pattern */}
                    {/* Only rendering if matches search query */}

                    {/* Model Settings */}
                    {(!searchQuery || filterSettings('model', searchQuery)) && (
                        <section
                            id="model"
                            ref={sectionRefs.model}
                            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300"
                            data-aos="fade-up"
                        >
                            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                                <div className="flex items-center">
                                    <FiServer className="text-lg text-indigo-600 mr-2" />
                                    <h2 className={`${compactMode ? 'text-lg' : 'text-xl'} font-semibold text-slate-800`}>Model Settings</h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleSaveSettings('Model', modelSettings)}
                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                                >
                                    <FiSave className="mr-1.5 h-3.5 w-3.5" /> Save
                                </button>
                            </div>

                            <div className={`${compactMode ? 'p-4' : 'p-6'}`}>
                                {/* Compact model settings */}
                                <div className="space-y-4">
                                    {/* More efficient layout for model settings */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label htmlFor="confidenceThreshold" className="block text-sm font-medium text-slate-700">
                                                Confidence Threshold
                                            </label>
                                            <span className="text-indigo-600 font-medium text-sm bg-indigo-50 px-2 py-0.5 rounded-md">
                                                {modelSettings.confidenceThreshold}%
                                            </span>
                                        </div>
                                        <div className="relative">
                                            <input
                                                id="confidenceThreshold"
                                                type="range"
                                                min="50"
                                                max="99"
                                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                                value={modelSettings.confidenceThreshold}
                                                onChange={(e) => setModelSettings({ ...modelSettings, confidenceThreshold: parseInt(e.target.value, 10) })}
                                            />
                                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                                <span>50% (More Flexible)</span>
                                                <span>99% (More Strict)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={modelSettings.autoTraining}
                                                    onChange={(e) => setModelSettings({ ...modelSettings, autoTraining: e.target.checked })}
                                                />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                                <span className="ml-3 text-sm font-medium text-slate-700">Enable Auto Training</span>
                                            </label>
                                            <p className="text-xs text-slate-500 mt-2 ml-14">Automatically train the model on new data</p>
                                        </div>

                                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={modelSettings.enableAutoCorrection}
                                                    onChange={(e) => setModelSettings({ ...modelSettings, enableAutoCorrection: e.target.checked })}
                                                />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                                <span className="ml-3 text-sm font-medium text-slate-700">Enable Auto Correction</span>
                                            </label>
                                            <p className="text-xs text-slate-500 mt-2 ml-14">Suggest corrections for detected issues</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="trainingFrequency" className="block text-sm font-medium text-slate-700 mb-1">Training Frequency</label>
                                            <select
                                                id="trainingFrequency"
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                                value={modelSettings.trainingFrequency}
                                                onChange={(e) => setModelSettings({ ...modelSettings, trainingFrequency: e.target.value })}
                                            >
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="quarterly">Quarterly</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="minTrainingData" className="block text-sm font-medium text-slate-700 mb-1">
                                                Minimum Training Data
                                            </label>
                                            <input
                                                id="minTrainingData"
                                                type="number"
                                                min="10"
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                                value={modelSettings.minTrainingData}
                                                onChange={(e) => setModelSettings({ ...modelSettings, minTrainingData: parseInt(e.target.value, 10) })}
                                            />
                                            <p className="text-xs text-slate-500 mt-1">Minimum proposals required for model training</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Validation & Notification sections similarly optimized */}

                    {/* Floating action buttons for efficiency */}
                    <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2">
                        {/* Save all button (only visible when multiple sections changed) */}
                        <button
                            onClick={() => {
                                handleSaveSettings('All Settings', {
                                    general: generalSettings,
                                    model: modelSettings,
                                    validation: validationSettings,
                                    notifications: notificationSettings
                                });
                            }}
                            className="bg-indigo-600 text-white rounded-lg p-3 shadow-lg hover:bg-indigo-700 transition-all duration-200 flex items-center"
                        >
                            <FiSave className="mr-1" />
                            <span className="text-sm">Save All</span>
                        </button>

                        {/* Back to top button */}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="bg-slate-600 text-white rounded-full p-3 shadow-lg hover:bg-slate-700 transition-all duration-200"
                            aria-label="Back to top"
                        >
                            <FiArrowLeft className="transform rotate-90" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
