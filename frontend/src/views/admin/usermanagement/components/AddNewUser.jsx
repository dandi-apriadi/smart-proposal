import React, { useState, useEffect, useRef } from "react";
import {
    MdPersonAdd,
    MdEmail,
    MdPhone,
    MdBadge,
    MdSchool,
    MdDomain,
    MdLock,
    MdVisibility,
    MdVisibilityOff,
    MdInfo,
    MdCheck,
    MdClose,
    MdArrowBack,
    MdRefresh,
    MdAdminPanelSettings,
    MdSupervisorAccount,
    MdAssignment,
    MdWorkspaces,
    MdSend,
    MdKeyboardTab
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const AddNewUser = ({ onCancel, onSuccess }) => {
    // References for form sections - for smoother scrolling and focus management
    const personalFormRef = useRef(null);
    const securityFormRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "dosen", // default role
        department: "",
        password: "",
        confirmPassword: "",
        status: "active",
        sendCredentials: true,
    });

    // UI state
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStep, setFormStep] = useState(1);
    const [passwordStrength, setPasswordStrength] = useState(0);
    // Track whether fields have been touched
    const [touched, setTouched] = useState({});

    // Handle field blur - mark field as touched
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
    };

    // Department options
    const departments = [
        "Computer Science",
        "Information Systems",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Business Administration",
        "Physics",
        "Mathematics",
        "Chemistry",
        "IT Support"
    ];

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        // Clear error when field is changed
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            });
        }

        // Check password strength
        if (name === "password") {
            const strength = calculatePasswordStrength(value);
            setPasswordStrength(strength);
        }
    };

    // Calculate password strength
    const calculatePasswordStrength = (password) => {
        if (!password) return 0;
        let score = 0;

        // Length check
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;

        // Character variety check
        if (/[A-Z]/.test(password)) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        return Math.min(score, 5);
    };

    // Get password strength display properties
    const getPasswordStrengthProps = () => {
        const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
        const colors = [
            "from-red-400 to-red-600",
            "from-orange-400 to-orange-600",
            "from-yellow-400 to-yellow-500",
            "from-lime-400 to-lime-600",
            "from-green-400 to-green-600"
        ];

        return {
            label: passwordStrength > 0 ? labels[passwordStrength - 1] : "No Password",
            color: passwordStrength > 0 ? colors[passwordStrength - 1] : "bg-gray-200",
            percent: passwordStrength * 20,
        };
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        // First step validation
        if (formStep === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
            if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
            if (!formData.email.trim()) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
            if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
            else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, '')))
                newErrors.phone = "Phone number is invalid";
        }

        // Second step validation
        if (formStep === 2) {
            if (!formData.department) newErrors.department = "Department is required";
            if (!formData.password) newErrors.password = "Password is required";
            else if (formData.password.length < 8)
                newErrors.password = "Password must be at least 8 characters";
            if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm password";
            else if (formData.password !== formData.confirmPassword)
                newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Navigate between form steps
    const nextStep = () => {
        if (validateForm()) {
            setFormStep(2);
        }
    };

    const prevStep = () => {
        setFormStep(1);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (onSuccess) {
                onSuccess({
                    ...formData,
                    fullName: `${formData.firstName} ${formData.lastName}`,
                    id: Math.floor(Math.random() * 10000),
                    createdAt: new Date().toISOString(),
                });
            }

            // Reset form after successful submission
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                role: "dosen",
                department: "",
                password: "",
                confirmPassword: "",
                status: "active",
                sendCredentials: true,
            });
            setFormStep(1);

        } catch (error) {
            console.error("Error adding user:", error);
            setErrors({ submit: "Failed to create user. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Generate random password
    const generatePassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let password = "";
        for (let i = 0; i < 12; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        setFormData({
            ...formData,
            password,
            confirmPassword: password,
        });

        setPasswordStrength(calculatePasswordStrength(password));
    };

    // Role details with enhanced visuals and improved text contrast
    const roleDetails = {
        admin: {
            icon: <MdAdminPanelSettings className="h-7 w-7" />,
            title: "Administrator",
            description: "Full system access and configuration control",
            color: "from-indigo-500 to-violet-600",
            hoverColor: "hover:from-indigo-600 hover:to-violet-700",
            shadowColor: "shadow-indigo-200/50",
            lightBg: "bg-indigo-50",
            textColor: "text-indigo-700",
            borderColor: "border-indigo-200",
            selectedTextColor: "text-indigo-50",
            selectedIconBg: "bg-indigo-200/30"
        },
        dosen: {
            icon: <MdSchool className="h-7 w-7" />,
            title: "Dosen",
            description: "Create and manage course proposals",
            color: "from-yellow-400 to-blue-500", // Brighter blue gradient
            hoverColor: "hover:from-sky-500 hover:to-blue-600",
            shadowColor: "shadow-blue-200/50",
            lightBg: "bg-sky-50",
            textColor: "text-sky-700",
            borderColor: "border-sky-200",
            selectedTextColor: "text-sky-50",
            selectedIconBg: "bg-sky-200/30"
        },
        reviewer: {
            icon: <MdSupervisorAccount className="h-7 w-7" />,
            title: "Reviewer",
            description: "Review and evaluate submitted proposals",
            color: "from-amber-500 to-orange-600",
            hoverColor: "hover:from-amber-600 hover:to-orange-700",
            shadowColor: "shadow-amber-200/50",
            lightBg: "bg-amber-50",
            textColor: "text-amber-700",
            borderColor: "border-amber-200",
            selectedTextColor: "text-amber-50",
            selectedIconBg: "bg-amber-200/30"
        },
        wadir: {
            icon: <MdWorkspaces className="h-7 w-7" />,
            title: "Wadir",
            description: "Oversee process and make final decisions",
            color: "from-green-400 to-purple-500", // Brighter purple gradient
            hoverColor: "hover:from-fuchsia-500 hover:to-purple-600",
            shadowColor: "shadow-purple-200/50",
            lightBg: "bg-fuchsia-50",
            textColor: "text-fuchsia-700",
            borderColor: "border-fuchsia-200",
            selectedTextColor: "text-fuchsia-50",
            selectedIconBg: "bg-fuchsia-200/30"
        }
    };

    // Input field styling with floating label effect
    const formFieldClass = (error, touched) => `
        group relative rounded-lg border ${error && touched
            ? 'border-red-400 ring-1 ring-red-400'
            : 'border-gray-300 hover:border-gray-400 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200'
        } 
        transition-all duration-200 bg-white shadow-sm mb-6
    `;

    const inputClass = (error) => `
        block w-full h-14 px-4 py-4 pt-7 text-gray-700 bg-transparent appearance-none 
        focus:outline-none rounded-lg text-base
        ${error ? 'text-red-500' : 'text-gray-700'}
    `;

    const labelClass = `
        absolute text-xs font-medium top-2 left-0 px-4
        transform origin-left transition-all duration-200 
        text-gray-500 group-focus-within:text-indigo-600
    `;

    // Enhance checkbox toggle styles
    const toggleClass = {
        container: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ease-in-out duration-300`,
        active: `bg-indigo-600`,
        inactive: `bg-gray-300`,
        circle: `inline-block h-4 w-4 transform rounded-full bg-white transition ease-in-out duration-300 shadow-md`,
        activePosition: `translate-x-6`,
        inactivePosition: `translate-x-1`
    };

    // Button styles for better consistency
    const buttonStyles = {
        primary: `flex items-center justify-center px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-500 to-purple-600 
                  text-white transition-all duration-300 shadow-md 
                  hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                  disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]`,
        secondary: `flex items-center justify-center px-6 py-3 rounded-xl font-medium bg-white 
                    text-gray-700 border border-gray-300 transition-all duration-300 
                    hover:bg-gray-50 hover:shadow focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 
                    active:scale-[0.98]`
    };

    return (
        <div className="w-full max-w-4xl mx-auto" data-aos="fade-up">
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                {/* Glass morphism background effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-50 blur-2xl -mr-32 -mt-32 z-0"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-100 to-blue-100 rounded-full opacity-50 blur-2xl -ml-32 -mb-32 z-0"></div>

                {/* Content container with proper padding */}
                <div className="relative z-10 p-8">
                    {/* Header with enhanced styling */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-5">
                            <div data-aos="fade-right" data-aos-delay="100">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                    {formStep === 1 ? "Add New User" : "Configure Access & Security"}
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    {formStep === 1 ? "Create a new account by entering user details" : "Set permissions and security preferences"}
                                </p>
                            </div>

                            {/* Improved progress indicator */}
                            <div className="flex flex-col items-center mt-4 md:mt-0" data-aos="fade-left" data-aos-delay="150">
                                <div className="flex items-center">
                                    <div className="relative flex items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 text-white font-medium
                                            ${formStep >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                                            1
                                        </div>
                                        <div className={`w-16 h-1 ${formStep > 1 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-medium
                                            ${formStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                            2
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full justify-between text-xs mt-1 px-1">
                                    <span className={`text-center ${formStep >= 1 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                                        Personal Info
                                    </span>
                                    <span className={`text-center ${formStep >= 2 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                                        Access & Security
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="relative z-10" ref={personalFormRef}>
                        {/* Step 1: Personal Information */}
                        {formStep === 1 && (
                            <div className="space-y-8" data-aos="fade-up" data-aos-delay="200">
                                {/* Personal Information Section */}
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                                        <MdPersonAdd className="mr-2 text-indigo-600" size={20} />
                                        Personal Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                        {/* First Name Input - fixed positioning */}
                                        <div className={formFieldClass(errors.firstName, touched.firstName)}>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 z-10 pointer-events-none">
                                                <MdPersonAdd size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`${inputClass(errors.firstName)} pl-10`}
                                                placeholder=""
                                                aria-invalid={errors.firstName ? "true" : "false"}
                                                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                                            />
                                            <label htmlFor="firstName" className={labelClass}>
                                                First Name *
                                            </label>
                                            {errors.firstName && touched.firstName && (
                                                <p className="text-sm text-red-500 absolute -bottom-5 left-1" id="firstName-error">
                                                    {errors.firstName}
                                                </p>
                                            )}
                                        </div>

                                        {/* Last Name Input */}
                                        <div className={formFieldClass(errors.lastName, touched.lastName)}>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={inputClass(errors.lastName)}
                                                placeholder=""
                                                aria-invalid={errors.lastName ? "true" : "false"}
                                                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                                            />
                                            <label htmlFor="lastName" className={labelClass}>
                                                Last Name *
                                            </label>
                                            {errors.lastName && touched.lastName && (
                                                <p className="text-sm text-red-500 absolute -bottom-5 left-1" id="lastName-error">
                                                    {errors.lastName}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email Input */}
                                        <div className={formFieldClass(errors.email, touched.email)}>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 z-10 pointer-events-none">
                                                <MdEmail size={18} />
                                            </div>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`${inputClass(errors.email)} pl-10`}
                                                placeholder=""
                                                aria-invalid={errors.email ? "true" : "false"}
                                                aria-describedby={errors.email ? "email-error" : undefined}
                                            />
                                            <label htmlFor="email" className={labelClass}>
                                                Email Address *
                                            </label>
                                            {errors.email && touched.email && (
                                                <p className="text-sm text-red-500 absolute -bottom-5 left-1" id="email-error">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone Input */}
                                        <div className={formFieldClass(errors.phone, touched.phone)}>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 z-10 pointer-events-none">
                                                <MdPhone size={18} />
                                            </div>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`${inputClass(errors.phone)} pl-10`}
                                                placeholder=""
                                                aria-invalid={errors.phone ? "true" : "false"}
                                                aria-describedby={errors.phone ? "phone-error" : undefined}
                                            />
                                            <label htmlFor="phone" className={labelClass}>
                                                Phone Number *
                                            </label>
                                            {errors.phone && touched.phone && (
                                                <p className="text-sm text-red-500 absolute -bottom-5 left-1" id="phone-error">
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Role Selection - Fixed height cards with more polished look */}
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                                        <MdBadge className="mr-2 text-indigo-600" size={20} />
                                        Role Assignment
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {Object.keys(roleDetails).map(role => (
                                            <div
                                                key={role}
                                                onClick={() => setFormData({ ...formData, role })}
                                                className={`
                                                    relative rounded-xl p-4 cursor-pointer transition-all duration-300 h-[170px] flex flex-col
                                                    ${formData.role === role
                                                        ? `bg-gradient-to-br ${roleDetails[role].color} ${roleDetails[role].selectedTextColor} shadow-lg ${roleDetails[role].shadowColor}`
                                                        : `bg-white border ${roleDetails[role].borderColor} hover:shadow-md ${roleDetails[role].hoverColor}`
                                                    }
                                                `}
                                                role="radio"
                                                aria-checked={formData.role === role}
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === ' ' || e.key === 'Enter') {
                                                        e.preventDefault();
                                                        setFormData({ ...formData, role });
                                                    }
                                                }}
                                            >
                                                {formData.role === role && (
                                                    <div className="absolute top-2 right-2 bg-white rounded-full p-0.5 shadow-lg z-10">
                                                        <MdCheck className="text-green-600" size={14} />
                                                    </div>
                                                )}
                                                <div className="flex flex-col items-center text-center h-full justify-between">
                                                    <div className={`
                                                        p-3 rounded-full mb-2
                                                        ${formData.role === role
                                                            ? roleDetails[role].selectedIconBg
                                                            : `${roleDetails[role].lightBg} ${roleDetails[role].textColor}`
                                                        }
                                                    `}>
                                                        {roleDetails[role].icon}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-base mb-1">{roleDetails[role].title}</h4>
                                                        <p className={`text-xs mb-2 ${formData.role === role ? 'text-white/90' : 'text-gray-500'}`}>
                                                            {roleDetails[role].description}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Selection indicator at bottom of card */}
                                                {formData.role === role && (
                                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/40 rounded-b-xl"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-3 pt-4">
                                    {onCancel && (
                                        <button
                                            type="button"
                                            onClick={onCancel}
                                            className={buttonStyles.secondary}
                                        >
                                            <MdClose className="mr-1.5" /> Cancel
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className={buttonStyles.primary}
                                    >
                                        Continue <MdKeyboardTab className="ml-1.5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Access Settings - Enhanced with more consistent UI */}
                        {formStep === 2 && (
                            <div className="space-y-8" data-aos="fade-up" data-aos-delay="200" ref={securityFormRef}>
                                {/* Department & Status Section */}
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                                        <MdDomain className="mr-2 text-indigo-600" size={20} />
                                        Department & Status
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                        {/* Department Selection - Fixed select styling */}
                                        <div className={formFieldClass(errors.department, touched.department)}>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 z-10 pointer-events-none">
                                                <MdDomain size={18} />
                                            </div>
                                            <select
                                                id="department"
                                                name="department"
                                                value={formData.department}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`${inputClass(errors.department)} pl-10 cursor-pointer appearance-none`}
                                                aria-invalid={errors.department ? "true" : "false"}
                                                aria-describedby={errors.department ? "department-error" : undefined}
                                            >
                                                <option value="" disabled></option>
                                                {departments.map((dept) => (
                                                    <option key={dept} value={dept}>{dept}</option>
                                                ))}
                                            </select>
                                            <label htmlFor="department" className={labelClass}>
                                                Department/Division *
                                            </label>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </div>
                                            {errors.department && touched.department && (
                                                <p className="text-sm text-red-500 absolute -bottom-5 left-1" id="department-error">
                                                    {errors.department}
                                                </p>
                                            )}
                                        </div>

                                        {/* Account Status - Enhanced Radio Card Style with consistent heights */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Account Status
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <label
                                                    className={`
                                                        flex items-center p-4 cursor-pointer rounded-lg border transition-all duration-200 h-[60px]
                                                        ${formData.status === 'active'
                                                            ? 'border-green-500 bg-green-50 text-green-700 shadow'
                                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                        }
                                                    `}
                                                >
                                                    <div className="relative flex items-center justify-center mr-3 w-5 h-5">
                                                        <input
                                                            type="radio"
                                                            name="status"
                                                            value="active"
                                                            id="status-active"
                                                            checked={formData.status === "active"}
                                                            onChange={handleChange}
                                                            className="sr-only"
                                                        />
                                                        <div className={`absolute inset-0 rounded-full border ${formData.status === 'active' ? 'border-green-500' : 'border-gray-300'}`}></div>
                                                        {formData.status === 'active' && (
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="block font-medium text-sm">Active</span>
                                                        <span className="text-xs opacity-75">Can login immediately</span>
                                                    </div>
                                                </label>

                                                <label
                                                    className={`
                                                        flex items-center p-4 cursor-pointer rounded-lg border transition-all duration-200 h-[60px]
                                                        ${formData.status === 'inactive'
                                                            ? 'border-gray-500 bg-gray-50 text-gray-700 shadow'
                                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                        }
                                                    `}
                                                >
                                                    <div className="relative flex items-center justify-center mr-3 w-5 h-5">
                                                        <input
                                                            type="radio"
                                                            name="status"
                                                            value="inactive"
                                                            id="status-inactive"
                                                            checked={formData.status === "inactive"}
                                                            onChange={handleChange}
                                                            className="sr-only"
                                                        />
                                                        <div className={`absolute inset-0 rounded-full border ${formData.status === 'inactive' ? 'border-gray-500' : 'border-gray-300'}`}></div>
                                                        {formData.status === 'inactive' && (
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="block font-medium text-sm">Inactive</span>
                                                        <span className="text-xs opacity-75">Disabled access</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Password Section - Improved layout */}
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                                        <MdLock className="mr-2 text-indigo-600" size={20} />
                                        Security Settings
                                    </h3>

                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password *
                                            </label>
                                            <button
                                                type="button"
                                                onClick={generatePassword}
                                                className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-full flex items-center transition-colors"
                                            >
                                                <MdRefresh className="mr-1" size={14} /> Generate Password
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Password field - Fixed positioning */}
                                            <div className={formFieldClass(errors.password, touched.password)}>
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 z-10 pointer-events-none">
                                                    <MdLock size={18} />
                                                </div>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    id="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`${inputClass(errors.password)} pl-10`}
                                                    placeholder=""
                                                    aria-invalid={errors.password ? "true" : "false"}
                                                    aria-describedby={errors.password ? "password-error" : undefined}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                >
                                                    {showPassword ? (
                                                        <MdVisibilityOff size={18} />
                                                    ) : (
                                                        <MdVisibility size={18} />
                                                    )}
                                                </button>
                                                {errors.password && touched.password && (
                                                    <p className="text-sm text-red-500 absolute -bottom-5 left-1" id="password-error">
                                                        {errors.password}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Password strength meter - Enhanced with proper spacing */}
                                            {formData.password && (
                                                <div className="mt-1 px-1 mb-8">
                                                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full bg-gradient-to-r ${getPasswordStrengthProps().color} transition-all duration-500`}
                                                            style={{ width: `${getPasswordStrengthProps().percent}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <p className="text-xs text-gray-500">
                                                            Strength: <span className="font-medium">{getPasswordStrengthProps().label}</span>
                                                        </p>
                                                        {passwordStrength < 3 && formData.password && (
                                                            <p className="text-xs text-amber-600">Add numbers, symbols & mixed case</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Confirm Password field */}
                                            <div className={formFieldClass(errors.confirmPassword, touched.confirmPassword)}>
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 z-10 pointer-events-none">
                                                    <MdLock size={18} />
                                                </div>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`${inputClass(errors.confirmPassword)} pl-10`}
                                                    placeholder=""
                                                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                                                    aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                                                />
                                                {errors.confirmPassword && touched.confirmPassword && (
                                                    <p className="text-sm text-red-500 absolute -bottom-5 left-1" id="confirmPassword-error">
                                                        {errors.confirmPassword}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Email credentials option - Fixed toggle switch */}
                                            <div className="flex items-center mt-8 pt-4 border-t border-gray-100">
                                                <label htmlFor="sendCredentials" className="flex items-center cursor-pointer">
                                                    <div className="relative mr-3">
                                                        <input
                                                            type="checkbox"
                                                            id="sendCredentials"
                                                            name="sendCredentials"
                                                            checked={formData.sendCredentials}
                                                            onChange={handleChange}
                                                            className="sr-only"
                                                        />
                                                        <div className={`${toggleClass.container} ${formData.sendCredentials ? toggleClass.active : toggleClass.inactive}`}>
                                                            <div className={`${toggleClass.circle} ${formData.sendCredentials ? toggleClass.activePosition : toggleClass.inactivePosition}`}></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <MdSend className={`mr-2 ${formData.sendCredentials ? 'text-indigo-600' : 'text-gray-400'}`} size={16} />
                                                        <span className="text-sm text-gray-700">
                                                            Send account credentials to user's email address
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Error message */}
                                {errors.submit && (
                                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center animate-pulse">
                                        <MdInfo className="mr-2 flex-shrink-0" size={20} />
                                        <p>{errors.submit}</p>
                                    </div>
                                )}

                                {/* Form Actions */}
                                <div className="flex justify-between pt-4">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className={buttonStyles.secondary}
                                    >
                                        <MdArrowBack className="mr-1.5" /> Back
                                    </button>

                                    <div className="flex space-x-3">
                                        {onCancel && (
                                            <button
                                                type="button"
                                                onClick={onCancel}
                                                className={buttonStyles.secondary}
                                            >
                                                <MdClose className="mr-1.5" /> Cancel
                                            </button>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={buttonStyles.primary}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Creating User...
                                                </>
                                            ) : (
                                                <>
                                                    <MdPersonAdd className="mr-1.5" size={20} /> Create User
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewUser;
