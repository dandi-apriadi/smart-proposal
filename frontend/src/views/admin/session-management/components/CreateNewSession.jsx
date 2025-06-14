import React, { useState, useEffect } from 'react';
import {
    FiCalendar, FiClock, FiInfo, FiUsers, FiCheckCircle,
    FiSave, FiArrowLeft, FiArrowRight, FiX, FiAlertTriangle,
    FiPlusCircle, FiArrowUpRight, FiActivity, FiTag, FiCheckSquare,
    FiBriefcase
} from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

const CreateNewSession = ({ onClose, onSessionCreated }) => {
    // Multi-step form state
    const [currentStep, setCurrentStep] = useState(1);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Sample reviewer data (in a real app this would come from an API)
    const [availableReviewers, setAvailableReviewers] = useState([
        { id: "reviewer1", name: "Dr. Ahmad Santoso", department: "Teknik Informatika", role: "Dosen", expertise: "Machine Learning" },
        { id: "reviewer2", name: "Prof. Rina Wulandari", department: "Teknik Elektro", role: "Ketua Jurusan", expertise: "Renewable Energy" },
        { id: "reviewer3", name: "Dr. Budi Pratama", department: "Administrasi Bisnis", role: "Dosen", expertise: "Business Development" },
        { id: "reviewer4", name: "Ir. Dewi Anggraini", department: "Teknik Sipil", role: "Koordinator Penelitian", expertise: "Infrastructure" },
        { id: "reviewer5", name: "Dr. Hendra Wijaya", department: "Akuntansi", role: "Dosen", expertise: "Financial Analysis" },
    ]);

    // Form data state
    const [sessionData, setSessionData] = useState({
        name: '',
        description: '',
        status: 'draft',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
        proposalDeadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        reviewDeadline: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        progressReportDeadline: new Date(new Date().setMonth(new Date().getMonth() + 4)),
        finalReportDeadline: new Date(new Date().setMonth(new Date().getMonth() + 5)),
        reviewers: []
    });

    // AOS initialization
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const AOS = require('aos');
            AOS.init({
                duration: 600, // Faster animations for a more modern feel
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // More sophisticated easing
                once: false, // Animations occur every time
            });
            AOS.refresh();
        }
    }, [currentStep]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSessionData({
            ...sessionData,
            [name]: value
        });

        // Clear error for this field if it exists
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: null
            });
        }
    };

    // Handle date change
    const handleDateChange = (date, fieldName) => {
        setSessionData({
            ...sessionData,
            [fieldName]: date
        });

        // Clear error for this field if it exists
        if (formErrors[fieldName]) {
            setFormErrors({
                ...formErrors,
                [fieldName]: null
            });
        }
    };

    // Fix the handleReviewerToggle function to prevent list disappearance
    const handleReviewerToggle = (reviewerId) => {
        const isSelected = sessionData.reviewers.some(r => r.userId === reviewerId);

        if (isSelected) {
            // Remove reviewer - checking if they are lead first
            const isLead = sessionData.reviewers.some(r => r.userId === reviewerId && r.role === "lead");

            setSessionData({
                ...sessionData,
                reviewers: sessionData.reviewers.filter(r => r.userId !== reviewerId)
            });
        } else {
            // Add reviewer without any animation or effects that could cause UI issues
            setSessionData({
                ...sessionData,
                reviewers: [
                    ...sessionData.reviewers,
                    { userId: reviewerId, role: "member" }
                ]
            });
        }
    };

    // Set reviewer as lead
    const handleSetLeadReviewer = (reviewerId) => {
        const updatedReviewers = sessionData.reviewers.map(reviewer => ({
            ...reviewer,
            role: reviewer.userId === reviewerId ? "lead" : "member"
        }));

        setSessionData({
            ...sessionData,
            reviewers: updatedReviewers
        });
    };

    // Validate current step
    const validateStep = (step) => {
        const errors = {};

        if (step === 1) {
            if (!sessionData.name.trim()) errors.name = "Session name is required";
            if (!sessionData.description.trim()) errors.description = "Description is required";
        }

        if (step === 2) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (!sessionData.startDate) errors.startDate = "Start date is required";
            if (!sessionData.endDate) errors.endDate = "End date is required";
            if (!sessionData.proposalDeadline) errors.proposalDeadline = "Proposal deadline is required";
            if (!sessionData.reviewDeadline) errors.reviewDeadline = "Review deadline is required";
            if (!sessionData.progressReportDeadline) errors.progressReportDeadline = "Progress report deadline is required";
            if (!sessionData.finalReportDeadline) errors.finalReportDeadline = "Final report deadline is required";

            if (sessionData.startDate < today) errors.startDate = "Start date cannot be in the past";
            if (sessionData.endDate <= sessionData.startDate) errors.endDate = "End date must be after start date";

            // Check timeline sequence
            if (sessionData.proposalDeadline <= sessionData.startDate)
                errors.proposalDeadline = "Proposal deadline must be after start date";

            if (sessionData.reviewDeadline <= sessionData.proposalDeadline)
                errors.reviewDeadline = "Review deadline must be after proposal deadline";

            if (sessionData.progressReportDeadline <= sessionData.reviewDeadline)
                errors.progressReportDeadline = "Progress report deadline must be after review deadline";

            if (sessionData.finalReportDeadline <= sessionData.progressReportDeadline)
                errors.finalReportDeadline = "Final report deadline must be after progress report deadline";

            if (sessionData.finalReportDeadline >= sessionData.endDate)
                errors.finalReportDeadline = "Final report deadline must be before end date";
        }

        if (step === 3) {
            if (sessionData.reviewers.length === 0) errors.reviewers = "At least one reviewer must be selected";
            if (!sessionData.reviewers.some(r => r.role === "lead")) errors.leadReviewer = "A lead reviewer must be assigned";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle next step
    const handleNextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
        } else {
            toast.error("Please fix the errors before continuing");
        }
    };

    // Handle previous step
    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(currentStep)) {
            toast.error("Please fix the errors before submitting");
            return;
        }

        setIsSubmitting(true);

        try {
            // In a real app, you would send data to your API here
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating API call

            toast.success("Session created successfully!");

            // Call the onSessionCreated callback with the new session data
            if (onSessionCreated) {
                onSessionCreated({
                    ...sessionData,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    proposalCount: 0,
                    approvedCount: 0,
                    participantCount: 0
                });
            }

            // Close the modal
            if (onClose) {
                onClose();
            }
        } catch (error) {
            toast.error("Failed to create session. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render progress indicator
    const renderProgressIndicator = () => {
        const steps = [
            { number: 1, label: "Basic Info", icon: <FiInfo size={18} />, description: "Session details & description" },
            { number: 2, label: "Timeline", icon: <FiCalendar size={18} />, description: "Set all important deadlines" },
            { number: 3, label: "Reviewers", icon: <FiUsers size={18} />, description: "Assign reviewers to session" },
            { number: 4, label: "Review", icon: <FiCheckCircle size={18} />, description: "Confirm all details" }
        ];

        // Calculate completion percentage
        const completionPercentage = Math.floor(((currentStep - 1) / (steps.length - 1)) * 100);

        return (
            <div className="w-full mb-12 mt-2">
                {/* Modern simplified progress header */}
                <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
                            {steps[currentStep - 1].icon && React.cloneElement(steps[currentStep - 1].icon, {
                                className: "text-white",
                                size: 20
                            })}
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700">Step {currentStep} of {steps.length}</h3>
                            <p className="text-xs text-gray-500">{steps[currentStep - 1].description}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <div className="text-sm font-medium text-indigo-700 mb-1">
                            {completionPercentage}% Complete
                        </div>
                        <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Steps indicator - simplified and modern with fixed visibility */}
                <div className="relative mb-6">
                    {/* Progress track */}
                    <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>

                    {/* Active progress fill */}
                    <div
                        className="absolute top-6 left-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                    ></div>

                    {/* Step circles */}
                    <div className="flex justify-between items-center relative">
                        {steps.map((step) => {
                            // Determine step status
                            const isActive = currentStep === step.number;
                            const isCompleted = currentStep > step.number;
                            const isPending = currentStep < step.number;

                            return (
                                <div
                                    key={step.number}
                                    className="flex flex-col items-center"
                                >
                                    <button
                                        type="button"
                                        onClick={() => currentStep > step.number && setCurrentStep(step.number)}
                                        disabled={currentStep < step.number}
                                        className={`
                                            relative z-10 w-12 h-12 rounded-full flex items-center justify-center 
                                            transition-all duration-300 outline-none border-2
                                            ${isActive ? 'ring-4 ring-indigo-100' : ''}
                                            ${isCompleted
                                                ? 'bg-blue-500 border-white text-white shadow-md hover:shadow-lg cursor-pointer'
                                                : isActive
                                                    ? 'bg-indigo-600 border-white text-white shadow-md'
                                                    : 'bg-white border-gray-200 text-gray-400 cursor-not-allowed'
                                            }
                                        `}
                                    >
                                        {isCompleted ? (
                                            <FiCheckCircle size={18} className="text-white" />
                                        ) : (
                                            <span className="text-sm font-semibold">{step.number}</span>
                                        )}
                                    </button>

                                    <span className={`
                                        mt-2 text-xs font-medium tracking-wide transition-colors
                                        ${isActive
                                            ? 'text-indigo-700 font-semibold'
                                            : isCompleted
                                                ? 'text-emerald-600 font-semibold'
                                                : 'text-gray-400'
                                        }
                                    `}>
                                        {step.label}
                                    </span>

                                    {/* Completion status indicator */}
                                    {isCompleted && (
                                        <div className="mt-1 text-xs text-emerald-500 font-medium">
                                            Completed
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Section title and description - enhanced */}
                <div className="text-center mb-8 bg-indigo-50 rounded-xl py-4 px-6 border border-indigo-100 shadow-sm">
                    <div
                        key={currentStep}
                        className="animate-slide-up"
                    >
                        <h2 className="text-lg font-semibold text-indigo-800 mb-1">
                            {steps[currentStep - 1].label}
                        </h2>
                        <p className="text-sm text-indigo-600">
                            {steps[currentStep - 1].description}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    // Render step 1: Basic information
    const renderStep1 = () => {
        return (
            <div data-aos="fade-up" className="space-y-8">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
                        <FiTag className="mr-2 text-indigo-500" />
                        Session Name <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={sessionData.name}
                            onChange={handleInputChange}
                            placeholder="e.g., Research Proposal Session 2025-1"
                            className={`
                                w-full px-5 py-3.5 bg-white border rounded-xl focus:ring-3 focus:outline-none 
                                transition-all duration-200 group-hover:border-indigo-300 shadow-sm text-base
                                ${formErrors.name
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                    : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                                }
                            `}
                        />
                        {formErrors.name && (
                            <p className="mt-1.5 text-sm text-red-500 flex items-center">
                                <FiAlertTriangle className="mr-1.5" size={14} /> {formErrors.name}
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-gray-700 flex items-center">
                        <FiInfo className="mr-2 text-indigo-500" />
                        Description <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                        <textarea
                            id="description"
                            name="description"
                            value={sessionData.description}
                            onChange={handleInputChange}
                            rows={5}
                            placeholder="Provide a detailed description of this session..."
                            className={`
                                w-full px-5 py-3.5 bg-white border rounded-xl focus:ring-3 focus:outline-none 
                                transition-all duration-200 group-hover:border-indigo-300 resize-none shadow-sm text-base
                                ${formErrors.description
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                    : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                                }
                            `}
                        />
                        {formErrors.description && (
                            <p className="mt-1.5 text-sm text-red-500 flex items-center">
                                <FiAlertTriangle className="mr-1.5" size={14} /> {formErrors.description}
                            </p>
                        )}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-blue-500 flex items-center justify-center shadow-sm">
                                <FiInfo className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="ml-5">
                            <h3 className="text-md font-semibold text-blue-800">Important Information</h3>
                            <div className="mt-2 text-sm text-blue-700 space-y-2">
                                <p className="flex items-start">
                                    <FiCheckSquare className="mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
                                    This session will be created in <strong>Draft</strong> status.
                                    You can review and make changes before activating it.
                                </p>
                                <p className="flex items-start">
                                    <FiCheckSquare className="mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
                                    Remember, only one active session is allowed at a time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render step 2: Timeline setup
    const renderStep2 = () => {
        // Create timeline data for visualization
        const timelineEvents = [
            { date: sessionData.startDate, label: "Session Start", color: "bg-green-500", icon: <FiCalendar /> },
            { date: sessionData.proposalDeadline, label: "Proposal Deadline", color: "bg-blue-500", icon: <FiClock /> },
            { date: sessionData.reviewDeadline, label: "Review Deadline", color: "bg-indigo-500", icon: <FiCheckSquare /> },
            { date: sessionData.progressReportDeadline, label: "Progress Report", color: "bg-purple-500", icon: <FiActivity /> },
            { date: sessionData.finalReportDeadline, label: "Final Report", color: "bg-pink-500", icon: <FiInfo /> },
            { date: sessionData.endDate, label: "Session End", color: "bg-red-500", icon: <FiCalendar /> }
        ];

        // Sort by date
        timelineEvents.sort((a, b) => a.date - b.date);

        // Calculate positions based on timeline duration
        const startTime = sessionData.startDate.getTime();
        const endTime = sessionData.endDate.getTime();
        const totalDuration = endTime - startTime;

        // Format date for display
        const formatTimelineDate = (date) => {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        };

        // Calculate months between dates for better visualization
        const getMonthsDifference = (date1, date2) => {
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return Math.round(diffDays / 30);
        };

        const totalMonths = getMonthsDifference(sessionData.startDate, sessionData.endDate);

        return (
            <div data-aos="fade-up" className="space-y-8">
                {/* Session duration config */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-800 flex items-center">
                            <FiCalendar className="mr-2 text-indigo-600" /> Session Duration
                        </h3>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2" data-aos="fade-up" data-aos-delay="100">
                                <label className="block text-sm font-medium text-gray-700">
                                    Session Start Date <span className="text-red-500">*</span>
                                </label>
                                <div className={`relative ${formErrors.startDate ? "border-red-300 rounded-lg" : ""}`}>
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiCalendar className="text-indigo-400" />
                                    </div>
                                    <DatePicker
                                        selected={sessionData.startDate}
                                        onChange={(date) => handleDateChange(date, 'startDate')}
                                        className={`
                                            w-full pl-10 px-5 py-3.5 border rounded-xl focus:ring-3 focus:outline-none text-base
                                            ${formErrors.startDate
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                                            }
                                        `}
                                        dateFormat="MMMM d, yyyy"
                                        minDate={new Date()}
                                        wrapperClassName="w-full"
                                    />
                                </div>
                                {formErrors.startDate && (
                                    <p className="mt-1.5 text-sm text-red-500 flex items-center">
                                        <FiAlertTriangle className="mr-1.5" size={14} /> {formErrors.startDate}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2" data-aos="fade-up" data-aos-delay="200">
                                <label className="block text-sm font-medium text-gray-700">
                                    Session End Date <span className="text-red-500">*</span>
                                </label>
                                <div className={`relative ${formErrors.endDate ? "border-red-300 rounded-lg" : ""}`}>
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiCalendar className="text-indigo-400" />
                                    </div>
                                    <DatePicker
                                        selected={sessionData.endDate}
                                        onChange={(date) => handleDateChange(date, 'endDate')}
                                        className={`
                                            w-full pl-10 px-5 py-3.5 border rounded-xl focus:ring-3 focus:outline-none text-base
                                            ${formErrors.endDate
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                                            }
                                        `}
                                        dateFormat="MMMM d, yyyy"
                                        minDate={sessionData.startDate}
                                        wrapperClassName="w-full"
                                    />
                                </div>
                                {formErrors.endDate && (
                                    <p className="mt-1.5 text-sm text-red-500 flex items-center">
                                        <FiAlertTriangle className="mr-1.5" size={14} /> {formErrors.endDate}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Duration summary */}
                        <div className="mt-5 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <FiClock className="h-5 w-5 text-indigo-600" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-sm font-medium text-indigo-800">Session Duration</h4>
                                    <p className="mt-1 text-sm text-indigo-700">
                                        This session will run for approximately <span className="font-semibold">{totalMonths} months</span>,
                                        from <span className="font-semibold">{formatTimelineDate(sessionData.startDate)}</span> to
                                        <span className="font-semibold"> {formatTimelineDate(sessionData.endDate)}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline visualization - improved to prevent overflow */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-800 flex items-center">
                            <FiActivity className="mr-2 text-indigo-600" /> Session Timeline Visualization
                        </h3>
                    </div>

                    <div className="p-6">
                        {/* Enhanced timeline visualization without guide lines */}
                        <div className="mb-8 bg-gradient-to-b from-gray-50 to-white p-6 pt-20 pb-24 rounded-xl border border-gray-100 overflow-hidden relative shadow-sm">
                            {/* Removed visual guide lines for months */}

                            <div className="relative mx-[8%] my-[6%] h-20">
                                {/* Main timeline line - more subtle */}
                                <div className="absolute top-0 left-3 right-0 h-2 bg-gradient-to-r from-indigo-100 via-blue-100 to-indigo-100 rounded-full shadow-inner"></div>

                                {/* Timeline events - with clamped position to prevent overflow */}
                                {timelineEvents.map((event, index) => {
                                    // Calculate position but clamp between 0-100% to avoid overflow
                                    let position = ((event.date.getTime() - startTime) / totalDuration) * 100;
                                    position = Math.min(Math.max(position, 0), 100);

                                    // Ensure the first and last items are properly aligned
                                    if (index === 0) position = 0;
                                    if (index === timelineEvents.length - 1) position = 100;

                                    // Get base color for styling
                                    const baseColor = event.color.replace('bg-', '').replace('-500', '');

                                    return (
                                        <div
                                            key={index}
                                            className="absolute transform -translate-x-1/2 transition-all duration-500 group cursor-pointer"
                                            style={{ left: `${position}%`, top: '-13px' }}
                                            data-aos="fade-down"
                                            data-aos-delay={index * 100}
                                        >
                                            {/* Timeline node - enhanced */}
                                            <div className={`
                                                w-12 h-12 rounded-full ${event.color} border-4 border-white shadow-lg 
                                                flex items-center justify-center text-white z-10
                                                group-hover:scale-110 transition-transform duration-300
                                            `}>
                                                {React.cloneElement(event.icon, { size: 18 })}

                                                {/* Small date indicator below node */}
                                                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-500 bg-white px-2 py-0.5 rounded-full shadow-sm border border-gray-100">
                                                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </div>
                                            </div>

                                            {/* Position labels with cleaner design */}
                                            <div className={`
                                                absolute text-xs text-center w-36 transition-all duration-300
                                                ${index % 2 === 0 ? '-top-24' : 'top-16'} 
                                                left-1/2 transform -translate-x-1/2
                                                group-hover:font-semibold
                                            `}>
                                                <div className={`
                                                    py-2 px-3 rounded-lg mt-6 shadow-md transition-all
                                                    bg-white border-l-4 border-${baseColor}-500
                                                    group-hover:shadow-lg
                                                `}>
                                                    <div className={`font-semibold text-${baseColor}-700`}>{event.label}</div>
                                                    <div className="mt-1 text-xs text-gray-500">{formatTimelineDate(event.date)}</div>
                                                </div>

                                                {/* Subtle connector line */}
                                                <div className={`
                                                    absolute left-1/2 transform -translate-x-1/2 w-px h-6
                                                    bg-${baseColor}-300 opacity-70
                                                    ${index % 2 === 0 ? 'bottom-0' : 'top-0'}
                                                `}></div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Time duration indicator at bottom */}
                                <div className="absolute -bottom-20 left-0 right-0 flex items-center justify-center">
                                    <div className="bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100 flex items-center">
                                        <FiClock className="text-indigo-500 mr-2" size={14} />
                                        <span className="text-xs font-medium text-gray-600">
                                            Duration: {totalMonths} months
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline sequence explanation - simplified */}
                        <div className="p-5 bg-white rounded-xl border border-gray-200 mb-5 shadow-sm">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                <FiActivity className="mr-2 text-indigo-500" /> Timeline Sequence
                            </h4>

                            <div className="flex flex-wrap items-center gap-y-3 gap-x-1 justify-center">
                                {timelineEvents.map((event, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                                            <div className={`w-3 h-3 rounded-full ${event.color} mr-2`}></div>
                                            <span className="text-xs font-medium text-gray-700">{event.label}</span>
                                        </div>
                                        {index < timelineEvents.length - 1 && (
                                            <FiArrowRight className="text-gray-300 mx-1" size={14} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Compact timeline summary removed as it was redundant */}
                    </div>
                </div>

                {/* Deadline Configuration */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-800 flex items-center">
                            <FiClock className="mr-2 text-indigo-600" /> Deadline Configuration
                        </h3>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2" data-aos="fade-up" data-aos-delay="100">
                                <label className="block text-sm font-medium text-gray-700 flex items-center">
                                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2 flex-shrink-0"></div>
                                    Proposal Submission Deadline <span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs text-gray-500">Participants must submit proposals by this date</p>
                                <div className={`relative ${formErrors.proposalDeadline ? "border-red-300 rounded-lg" : ""}`}>
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiCalendar className="text-indigo-400" />
                                    </div>
                                    <DatePicker
                                        selected={sessionData.proposalDeadline}
                                        onChange={(date) => handleDateChange(date, 'proposalDeadline')}
                                        className={`
                                            w-full pl-10 px-5 py-3.5 border rounded-xl focus:ring-3 focus:outline-none text-base
                                            ${formErrors.proposalDeadline
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                                            }
                                        `}
                                        dateFormat="MMMM d, yyyy"
                                        minDate={sessionData.startDate}
                                        maxDate={sessionData.endDate}
                                        wrapperClassName="w-full"
                                    />
                                </div>
                                {formErrors.proposalDeadline && (
                                    <p className="mt-1.5 text-sm text-red-500 flex items-center">
                                        <FiAlertTriangle className="mr-1.5" size={14} /> {formErrors.proposalDeadline}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2" data-aos="fade-up" data-aos-delay="150">
                                <label className="block text-sm font-medium text-gray-700 flex items-center">
                                    <div className="w-4 h-4 rounded-full bg-indigo-500 mr-2 flex-shrink-0"></div>
                                    Review Completion Deadline <span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs text-gray-500">Reviewers must complete all evaluations by this date</p>
                                <div className={`relative ${formErrors.reviewDeadline ? "border-red-300 rounded-lg" : ""}`}>
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiCalendar className="text-indigo-400" />
                                    </div>
                                    <DatePicker
                                        selected={sessionData.reviewDeadline}
                                        onChange={(date) => handleDateChange(date, 'reviewDeadline')}
                                        className={`
                                            w-full pl-10 px-5 py-3.5 border rounded-xl focus:ring-3 focus:outline-none text-base
                                            ${formErrors.reviewDeadline
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                                            }
                                        `}
                                        dateFormat="MMMM d, yyyy"
                                        minDate={sessionData.proposalDeadline}
                                        maxDate={sessionData.endDate}
                                        wrapperClassName="w-full"
                                    />
                                </div>
                                {formErrors.reviewDeadline && (
                                    <p className="mt-1.5 text-sm text-red-500 flex items-center">
                                        <FiAlertTriangle className="mr-1.5" size={14} /> {formErrors.reviewDeadline}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2" data-aos="fade-up" data-aos-delay="200">
                                <label className="block text-sm font-medium text-gray-700 flex items-center">
                                    <div className="w-4 h-4 rounded-full bg-purple-500 mr-2 flex-shrink-0"></div>
                                    Progress Report Deadline <span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs text-gray-500">Participants must submit progress reports by this date</p>
                                <div className={`relative ${formErrors.progressReportDeadline ? "border-red-300 rounded-lg" : ""}`}>
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiCalendar className="text-indigo-400" />
                                    </div>
                                    <DatePicker
                                        selected={sessionData.progressReportDeadline}
                                        onChange={(date) => handleDateChange(date, 'progressReportDeadline')}
                                        className={`
                                            w-full pl-10 px-5 py-3.5 border rounded-xl focus:ring-3 focus:outline-none text-base
                                            ${formErrors.progressReportDeadline
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                                            }
                                        `}
                                        dateFormat="MMMM d, yyyy"
                                        minDate={sessionData.reviewDeadline}
                                        maxDate={sessionData.endDate}
                                        wrapperClassName="w-full"
                                    />
                                </div>
                                {formErrors.progressReportDeadline && (
                                    <p className="mt-1.5 text-sm text-red-500 flex items-center">
                                        <FiAlertTriangle className="mr-1.5" size={14} /> {formErrors.progressReportDeadline}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2" data-aos="fade-up" data-aos-delay="250">
                                <label className="block text-sm font-medium text-gray-700 flex items-center">
                                    <div className="w-4 h-4 rounded-full bg-pink-500 mr-2 flex-shrink-0"></div>
                                    Final Report Deadline <span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs text-gray-500">Participants must submit final reports by this date</p>
                                <div className={`relative ${formErrors.finalReportDeadline ? "border-red-300 rounded-lg" : ""}`}>
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiCalendar className="text-indigo-400" />
                                    </div>
                                    <DatePicker
                                        selected={sessionData.finalReportDeadline}
                                        onChange={(date) => handleDateChange(date, 'finalReportDeadline')}
                                        className={`
                                            w-full pl-10 px-5 py-3.5 border rounded-xl focus:ring-3 focus:outline-none text-base
                                            ${formErrors.finalReportDeadline
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                                            }
                                        `}
                                        dateFormat="MMMM d, yyyy"
                                        minDate={sessionData.progressReportDeadline}
                                        maxDate={sessionData.endDate}
                                        wrapperClassName="w-full"
                                    />
                                </div>
                                {formErrors.finalReportDeadline && (
                                    <p className="mt-1.5 text-sm text-red-500 flex items-center">
                                        <FiAlertTriangle className="mr-1.5" size={14} /> {formErrors.finalReportDeadline}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 via-violet-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 shadow-sm">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center shadow-sm">
                                <FiInfo className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="ml-5">
                            <h3 className="text-md font-semibold text-indigo-800">Timeline Requirements</h3>
                            <div className="mt-2 text-sm text-indigo-700">
                                <p>All dates must follow this sequence:</p>
                                <div className="mt-3 flex items-center space-x-2 flex-wrap">
                                    <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
                                        Start Date
                                    </span>
                                    <FiArrowRight className="text-gray-400" />
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
                                        Proposal Deadline
                                    </span>
                                    <FiArrowRight className="text-gray-400" />
                                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
                                        Review Deadline
                                    </span>
                                    <FiArrowRight className="text-gray-400" />
                                    <span className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
                                        Progress Report
                                    </span>
                                    <FiArrowRight className="text-gray-400" />
                                    <span className="bg-pink-100 text-pink-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
                                        Final Report
                                    </span>
                                    <FiArrowRight className="text-gray-400" />
                                    <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
                                        End Date
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render step 3: Reviewer assignment
    const renderStep3 = () => {
        return (
            <div data-aos="fade-up" className="space-y-8">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-800 flex items-center">
                            <FiUsers className="mr-2 text-indigo-600" /> Reviewer Assignment
                        </h3>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-2">Selected:</span>
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                                {sessionData.reviewers.length} / {availableReviewers.length}
                            </span>
                        </div>
                    </div>

                    <div className="p-6">
                        {formErrors.reviewers && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm">
                                <p className="text-sm text-red-600 flex items-center">
                                    <FiAlertTriangle className="mr-2 flex-shrink-0" /> {formErrors.reviewers}
                                </p>
                            </div>
                        )}

                        {formErrors.leadReviewer && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm">
                                <p className="text-sm text-red-600 flex items-center">
                                    <FiAlertTriangle className="mr-2 flex-shrink-0" /> {formErrors.leadReviewer}
                                </p>
                            </div>
                        )}

                        <div className="mb-5">
                            <p className="text-sm text-gray-600 mb-2 flex items-center">
                                <FiInfo className="mr-2 text-indigo-500" />
                                Select reviewers for this session and assign one reviewer as the lead.
                            </p>
                        </div>

                        {/* Removed max-height and overflow to prevent disappearing issues */}
                        <div className="grid grid-cols-1 gap-4">
                            {availableReviewers.map((reviewer, index) => {
                                const isSelected = sessionData.reviewers.some(r => r.userId === reviewer.id);
                                const isLead = sessionData.reviewers.some(r => r.userId === reviewer.id && r.role === "lead");

                                return (
                                    <div
                                        key={reviewer.id}
                                        className={`
                                            p-5 border rounded-xl transition-all duration-200 shadow-sm
                                            ${isSelected
                                                ? isLead
                                                    ? 'border-indigo-300 bg-indigo-50'
                                                    : 'border-green-300 bg-green-50'
                                                : 'border-gray-200 bg-white'
                                            }
                                        `}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <div className={`
                                                        w-12 h-12 rounded-full flex items-center justify-center shadow-sm
                                                        ${isSelected
                                                            ? isLead
                                                                ? 'bg-indigo-500 text-white'
                                                                : 'bg-green-500 text-white'
                                                            : 'bg-gray-200 text-gray-600'
                                                        }
                                                    `}>
                                                        <span className="font-semibold text-sm">
                                                            {reviewer.name.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-3.5">
                                                    <div className="flex items-center">
                                                        <label htmlFor={`reviewer-${reviewer.id}`} className="block cursor-pointer">
                                                            <span className="text-base font-semibold text-gray-900">{reviewer.name}</span>
                                                        </label>
                                                        {isLead && (
                                                            <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                                                                Lead Reviewer
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap items-center mt-1.5 text-sm text-gray-500">
                                                        <span className="mr-4 flex items-center">
                                                            <FiBriefcase className="mr-1.5 text-gray-400" size={14} />
                                                            {reviewer.department}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <FiTag className="mr-1.5 text-gray-400" size={14} />
                                                            {reviewer.expertise}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3 ml-0 sm:ml-3">
                                                {isSelected && !isLead && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSetLeadReviewer(reviewer.id)}
                                                        className="inline-flex items-center px-3 py-1.5 border border-indigo-300 text-xs font-medium rounded-full text-indigo-700 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                                                    >
                                                        <FiArrowUpRight className="mr-1.5" size={14} />
                                                        Set as Lead
                                                    </button>
                                                )}

                                                {/* Simplified toggle switch */}
                                                <div className="relative inline-block w-14 align-middle select-none">
                                                    <input
                                                        type="checkbox"
                                                        id={`reviewer-${reviewer.id}`}
                                                        checked={isSelected}
                                                        onChange={() => handleReviewerToggle(reviewer.id)}
                                                        className="sr-only"
                                                    />
                                                    <label
                                                        htmlFor={`reviewer-${reviewer.id}`}
                                                        className={`block overflow-hidden h-6 rounded-full cursor-pointer 
                                                        ${isSelected ? 'bg-green-500' : 'bg-gray-300'}`}
                                                    >
                                                        <span
                                                            className={`block h-6 w-6 rounded-full bg-white border border-gray-200 shadow-sm transform transition-transform duration-200 ease-in-out
                                                            ${isSelected ? 'translate-x-8' : 'translate-x-0'}`}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Render step 4: Review and confirm
    const renderStep4 = () => {
        return (
            <div data-aos="fade-up" className="space-y-8">
                <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 p-6 rounded-2xl border border-green-100 shadow-sm">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-sm">
                                <FiCheckCircle className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="ml-5">
                            <h3 className="text-md font-semibold text-green-800">Ready to Create</h3>
                            <div className="mt-2 text-sm text-green-700">
                                <p>
                                    Please review all information below before creating this session.
                                    The session will be created in <strong>Draft</strong> status.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden" data-aos="fade-up" data-aos-delay="100">
                    <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-800">Session Information</h3>
                    </div>

                    <div className="p-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
                                <h4 className="text-sm font-medium text-gray-500 mb-1.5">Session Name</h4>
                                <p className="text-base text-gray-900 font-semibold">{sessionData.name}</p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
                                <h4 className="text-sm font-medium text-gray-500 mb-1.5">Status</h4>
                                <p className="text-base">
                                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 shadow-sm">
                                        Draft
                                    </span>
                                </p>
                            </div>

                            <div className="md:col-span-2 bg-gray-50 p-5 rounded-xl shadow-sm">
                                <h4 className="text-sm font-medium text-gray-500 mb-1.5">Description</h4>
                                <p className="text-base text-gray-900">{sessionData.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden" data-aos="fade-up" data-aos-delay="150">
                    <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-800">Timeline</h3>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center mr-2.5 shadow-sm">
                                        <FiCalendar className="text-white" size={16} />
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-700">Start Date</h4>
                                </div>
                                <p className="text-sm text-gray-900 font-semibold mt-1">
                                    {sessionData.startDate.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center mr-2.5 shadow-sm">
                                        <FiClock className="text-white" size={16} />
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-700">Proposal Deadline</h4>
                                </div>
                                <p className="text-sm text-gray-900 font-semibold mt-1">
                                    {sessionData.proposalDeadline.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 flex items-center justify-center mr-2.5 shadow-sm">
                                        <FiCheckSquare className="text-white" size={16} />
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-700">Review Deadline</h4>
                                </div>
                                <p className="text-sm text-gray-900 font-semibold mt-1">
                                    {sessionData.reviewDeadline.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 flex items-center justify-center mr-2.5 shadow-sm">
                                        <FiActivity className="text-white" size={16} />
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-700">Progress Report</h4>
                                </div>
                                <p className="text-sm text-gray-900 font-semibold mt-1">
                                    {sessionData.progressReportDeadline.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 flex items-center justify-center mr-2.5 shadow-sm">
                                        <FiInfo className="text-white" size={16} />
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-700">Final Report</h4>
                                </div>
                                <p className="text-sm text-gray-900 font-semibold mt-1">
                                    {sessionData.finalReportDeadline.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-center mr-2.5 shadow-sm">
                                        <FiCalendar className="text-white" size={16} />
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-700">End Date</h4>
                                </div>
                                <p className="text-sm text-gray-900 font-semibold mt-1">
                                    {sessionData.endDate.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden" data-aos="fade-up" data-aos-delay="200">
                    <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-800">Reviewers ({sessionData.reviewers.length})</h3>
                    </div>

                    <div className="p-6">
                        {sessionData.reviewers.length === 0 ? (
                            <p className="text-sm text-gray-500 p-4 bg-gray-50 rounded-xl">No reviewers assigned</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {sessionData.reviewers.map((reviewer, index) => {
                                    const reviewerData = availableReviewers.find(r => r.id === reviewer.userId);
                                    if (!reviewerData) return null;

                                    return (
                                        <div
                                            key={reviewer.userId}
                                            data-aos="fade-up"
                                            data-aos-delay={index * 50}
                                            className={`
                                                flex items-center justify-between p-4 rounded-xl border shadow-sm
                                                ${reviewer.role === 'lead'
                                                    ? 'bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200'
                                                    : 'bg-gray-50 border-gray-200'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center">
                                                <div className={`
                                                    w-10 h-10 rounded-full flex items-center justify-center mr-3.5 shadow-sm
                                                    ${reviewer.role === 'lead'
                                                        ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white'
                                                        : 'bg-gradient-to-br from-gray-300 to-gray-400 text-white'
                                                    }
                                                `}>
                                                    <span className="font-medium text-xs">
                                                        {reviewerData.name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{reviewerData.name}</p>
                                                    <p className="text-xs text-gray-500">{reviewerData.department}</p>
                                                </div>
                                            </div>
                                            <span className={`
                                                inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm
                                                ${reviewer.role === 'lead'
                                                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                                                }
                                            `}>
                                                {reviewer.role === 'lead' ? 'Lead Reviewer' : 'Member'}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Render form step content
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return renderStep3();
            case 4:
                return renderStep4();
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl mx-auto overflow-hidden">
            <div className="px-7 py-5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center">
                    <FiPlusCircle className="mr-2.5" /> Create New Session
                </h2>
                <button
                    onClick={onClose}
                    className="text-white hover:text-indigo-100 transition-colors p-1.5 rounded-full hover:bg-indigo-500/30"
                >
                    <FiX size={24} />
                </button>
            </div>

            <div className="p-7">
                {renderProgressIndicator()}

                <form onSubmit={handleSubmit}>
                    <div className="mt-8">
                        {renderStepContent()}
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between">
                        <div>
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="inline-flex items-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <FiArrowLeft className="mr-2.5 -ml-1" />
                                    Previous
                                </button>
                            )}
                        </div>

                        <div>
                            {currentStep < 4 ? (
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-violet-700 hover:from-indigo-700 hover:to-violet-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Next
                                    <FiArrowRight className="ml-2.5 -mr-1" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`
                                        inline-flex items-center px-7 py-3.5 border border-transparent shadow-sm text-sm font-medium 
                                        rounded-xl text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                                        ${isSubmitting
                                            ? 'bg-green-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                                        }
                                    `}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating Session...
                                        </>
                                    ) : (
                                        <>
                                            <FiSave className="mr-2.5 -ml-1" />
                                            Create Session
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* Custom CSS for toggle switch */}
            <style jsx>{`
                .toggle-checkbox:checked {
                    right: 0;
                    border-color: #10B981;
                }
                .toggle-checkbox:checked + .toggle-label {
                    background-image: linear-gradient(to right, #10B981, #059669);
                }
                .toggle-checkbox {
                    right: 0;
                    border-color: #D1D5DB;
                    z-index: 10;
                }
                .toggle-label {
                    width: 3.5rem;
                }
                
                /* Floating animations */
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                }
                
                @keyframes float-fast {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                
                @keyframes slide-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .animate-float-slow {
                    animation: float-slow 5s ease-in-out infinite;
                }
                
                .animate-float-medium {
                    animation: float-medium 4s ease-in-out infinite;
                }
                
                .animate-float-fast {
                    animation: float-fast 6s ease-in-out infinite;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default CreateNewSession;
