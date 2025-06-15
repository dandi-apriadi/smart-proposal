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
    MdKeyboardTab,
    MdBusiness,
    MdWork
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const AddNewUser = ({ onCancel, onSuccess }) => {
    // References for form sections
    const personalFormRef = useRef(null);
    const securityFormRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // Form state - improved with additional fields
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "dosen",
        department: "",
        faculty: "",
        position: "",
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
    const [touched, setTouched] = useState({});

    // Handle field blur
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
    };

    // Enhanced department options
    const departments = [
        "Teknik Informatika",
        "Sistem Informasi",
        "Teknik Elektro",
        "Teknik Mesin",
        "Teknik Sipil",
        "Teknik Industri",
        "Administrasi Bisnis",
        "Akuntansi",
        "Manajemen",
        "Fisika",
        "Matematika",
        "Kimia",
        "Biologi",
        "IT Support",
        "Lainnya"
    ];

    // Faculty options
    const faculties = [
        "Fakultas Teknik",
        "Fakultas Ekonomi dan Bisnis",
        "Fakultas Sains dan Teknologi",
        "Fakultas Ilmu Sosial dan Politik",
        "Fakultas Kedokteran",
        "Fakultas Hukum",
        "Lainnya"
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

        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
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

    // Enhanced validation
    const validateForm = () => {
        const newErrors = {};

        if (formStep === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
            if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
            if (!formData.email.trim()) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
            if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
            else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, '')))
                newErrors.phone = "Phone number is invalid";
        }

        if (formStep === 2) {
            if (!formData.department) newErrors.department = "Department is required";
            if (!formData.faculty) newErrors.faculty = "Faculty is required";
            if (!formData.password) newErrors.password = "Password is required";
            else if (formData.password.length < 8)
                newErrors.password = "Password must be at least 8 characters";
            else if (passwordStrength < 3)
                newErrors.password = "Password is too weak. Please include uppercase, lowercase, numbers, and symbols";
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
        setErrors({});

        try {
            const userData = {
                username: formData.email.split('@')[0],
                password: formData.password,
                email: formData.email,
                full_name: `${formData.firstName} ${formData.lastName}`,
                role: formData.role,
                department: formData.department,
                faculty: formData.faculty,
                position: formData.position || null,
                status: formData.status
            };

            if (onSuccess) {
                const result = await onSuccess(userData);

                if (result.success) {
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        role: "dosen",
                        department: "",
                        faculty: "",
                        position: "",
                        password: "",
                        confirmPassword: "",
                        status: "active",
                        sendCredentials: true,
                    });
                    setFormStep(1);
                } else {
                    setErrors({ submit: result.message || 'Failed to create user' });
                }
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setErrors({ submit: 'An unexpected error occurred. Please try again.' });
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

    // Enhanced role details
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
            color: "from-emerald-400 to-cyan-500",
            hoverColor: "hover:from-emerald-500 hover:to-cyan-600",
            shadowColor: "shadow-emerald-200/50",
            lightBg: "bg-emerald-50",
            textColor: "text-emerald-700",
            borderColor: "border-emerald-200",
            selectedTextColor: "text-emerald-50",
            selectedIconBg: "bg-emerald-200/30"
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
            color: "from-rose-400 to-pink-500",
            hoverColor: "hover:from-rose-500 hover:to-pink-600",
            shadowColor: "shadow-rose-200/50",
            lightBg: "bg-rose-50",
            textColor: "text-rose-700",
            borderColor: "border-rose-200",
            selectedTextColor: "text-rose-50",
            selectedIconBg: "bg-rose-200/30"
        }
    };

    // Styling classes
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

    const toggleClass = {
        container: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ease-in-out duration-300`,
        active: `bg-indigo-600`,
        inactive: `bg-gray-300`,
        circle: `inline-block h-4 w-4 transform rounded-full bg-white transition ease-in-out duration-300 shadow-md`,
        activePosition: `translate-x-6`,
        inactivePosition: `translate-x-1`
    };

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
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Background effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-50 blur-2xl -mr-32 -mt-32 z-0"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-100 to-blue-100 rounded-full opacity-50 blur-2xl -ml-32 -mb-32 z-0"></div>

                {/* Content container */}
                <div className="relative z-10 p-8">
                    {/* Enhanced Header */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6">
                            <div data-aos="fade-right" data-aos-delay="100">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                                    {formStep === 1 ? "Add New User" : "Configure Access & Security"}
                                </h2>
                                <p className="text-gray-600">
                                    {formStep === 1 ? "Create a new account by entering user details" : "Set permissions and security preferences"}
                                </p>
                            </div>

                            {/* Improved progress indicator */}
                            <div className="flex flex-col items-center mt-6 md:mt-0" data-aos="fade-left" data-aos-delay="150">
                                <div className="flex items-center">
                                    <div className="relative flex items-center">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 text-white font-semibold transition-all duration-300
                                            ${formStep >= 1 ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg' : 'bg-gray-300'}`}>
                                            1
                                        </div>
                                        <div className={`w-20 h-1 transition-all duration-500 ${formStep > 1 ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-200'}`}></div>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 font-semibold transition-all duration-300
                                            ${formStep >= 2 ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>
                                            2
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full justify-between text-xs mt-2 px-2">
                                    <span className={`text-center font-medium ${formStep >= 1 ? 'text-indigo-600' : 'text-gray-500'}`}>
                                        Personal Info
                                    </span>
                                    <span className={`text-center font-medium ${formStep >= 2 ? 'text-indigo-600' : 'text-gray-500'}`}>
                                        Access & Security
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="relative z-10">
                        {/* Step 1: Personal Information */}
                        {formStep === 1 && (
                            <div className="space-y-8" data-aos="fade-up" data-aos-delay="200">
                                {/* Personal Information Section */}
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                        <MdPersonAdd className="mr-2 text-indigo-600" size={20} />
                                        Personal Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                        {/* First Name */}
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
                                            />
                                            <label htmlFor="firstName" className={labelClass}>
                                                First Name *
                                            </label>
                                            {errors.firstName && touched.firstName && (
                                                <p className="text-sm text-red-500 absolute -bottom-5 left-1">
                                                    {errors.firstName}
                                                </p>
                                            )}
                                        </div>

                                        {/* Last Name */}
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
                                            />
                                            <label htmlFor="lastName" className={labelClass}>
                                                Last Name *
                                            </label>
                                            {errors.lastName && touched.lastName && (
                                                <p className="text-sm text-red-500 absolute -bottom-5 left-1">
                                                    {errors.lastName}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
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
                                            />
                                            <label htmlFor="email" className={labelClass}>
                                                Email Address *
                                            </label>
                                            {errors.email && touched.email && (
                                                <p className="text-sm text-red-500 absolute -bottom-5 left-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone */}
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
                                            />
                                            <label htmlFor="phone" className={labelClass}>
                                                Phone Number *
                                            </label>
                                            {errors.phone && touched.phone && (
                                                <p className="text-sm text-red-500 absolute -bottom-5 left-1">
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Role Selection */}
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                        <MdBadge className="mr-2 text-indigo-600" size={20} />
                                        Role Assignment
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {Object.keys(roleDetails).map(role => (
                                            <div
                                                key={role}
                                                onClick={() => setFormData({ ...formData, role })}
                                                className={`
                                                    relative rounded-xl p-5 cursor-pointer transition-all duration-300 h-[180px] flex flex-col
                                                    ${formData.role === role
                                                        ? `bg-gradient-to-br ${roleDetails[role].color} ${roleDetails[role].selectedTextColor} shadow-xl ${roleDetails[role].shadowColor} transform scale-105`
                                                        : `bg-white border-2 ${roleDetails[role].borderColor} hover:shadow-lg ${roleDetails[role].hoverColor} hover:border-opacity-60`
                                                    }
                                                `}
                                                role="radio"
                                                aria-checked={formData.role === role}
                                                tabIndex={0}
                                            >
                                                {formData.role === role && (
                                                    <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-lg z-10">
                                                        <MdCheck className="text-green-600" size={16} />
                                                    </div>
                                                )}
                                                <div className="flex flex-col items-center text-center h-full justify-between">
                                                    <div className={`
                                                        p-3 rounded-full mb-3 transition-all duration-300
                                                        ${formData.role === role
                                                            ? roleDetails[role].selectedIconBg
                                                            : `${roleDetails[role].lightBg} ${roleDetails[role].textColor}`
                                                        }
                                                    `}>
                                                        {roleDetails[role].icon}
                                                    </div>
                                                    <div className="flex-1 flex flex-col justify-center">
                                                        <h4 className="font-semibold text-base mb-2">{roleDetails[role].title}</h4>
                                                        <p className={`text-xs leading-relaxed ${formData.role === role ? 'text-white/90' : 'text-gray-500'}`}>
                                                            {roleDetails[role].description}
                                                        </p>
                                                    </div>
                                                </div>

                                                {formData.role === role && (
                                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/40 rounded-b-xl"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-3 pt-6">
                                    {onCancel && (
                                        <button
                                            type="button"
                                            onClick={onCancel}
                                            className={buttonStyles.secondary}
                                        >
                                            <MdClose className="mr-2" /> Cancel
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className={buttonStyles.primary}
                                    >
                                        Continue <MdKeyboardTab className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Access Settings */}
                        {formStep === 2 && (
                            <div className="space-y-8" data-aos="fade-up" data-aos-delay="200">
                                {/* Organization Information */}
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                        <MdBusiness className="mr-2 text-indigo-600" size={20} />
                                        Organization Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Faculty */}
                                        <div className={formFieldClass(errors.faculty, touched.faculty)}>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 z-10 pointer-events-none">
                                                <MdSchool size={18} />
                                            </div>
                                            <select
                                                id="faculty"
                                                name="faculty"
                                                value={formData.faculty}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`${inputClass(errors.faculty)} pl-10 cursor-pointer appearance-none`}
                                            >
                                                <option value="" disabled></option>
                                                {faculties.map((faculty) => (
                                                    <option key={faculty} value={faculty}>{faculty}</option>
                                                ))}
                                            </select>
                                            <label htmlFor="faculty" className={labelClass}>
                                                Faculty *
                                            </label>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </div>
                                            {errors.faculty && touched.faculty && (
                                                <p className="text-sm text-red-500 absolute -bottom-5 left-1">
                                                    {errors.faculty}
                                                </p>
                                            )}
                                        </div>

                                        {/* Department */}
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
                                            >
                                                <option value="" disabled></option>
                                                {departments.map((dept) => (
                                                    <option key={dept} value={dept}>{dept}</option>
                                                ))}
                                            </select>
                                            <label htmlFor="department" className={labelClass}>
                                                Department/Program *
                                            </label>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </div>
                                            {errors.department && touched.department && (
                                                <p className="text-sm text-red-500 absolute -bottom-5 left-1">
                                                    {errors.department}
                                                </p>
                                            )}
                                        </div>

                                        {/* Position */}
                                        <div className={formFieldClass(errors.position, touched.position)}>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 z-10 pointer-events-none">
                                                <MdWork size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                id="position"
                                                name="position"
                                                value={formData.position}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`${inputClass(errors.position)} pl-10`}
                                                placeholder=""
                                            />
                                            <label htmlFor="position" className={labelClass}>
                                                Position/Title
                                            </label>
                                        </div>

                                        {/* Account Status */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Account Status
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <label className={`
                                                    flex items-center p-4 cursor-pointer rounded-lg border transition-all duration-200 h-[70px]
                                                    ${formData.status === 'active'
                                                        ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                    }
                                                `}>
                                                    <div className="relative flex items-center justify-center mr-3 w-5 h-5">
                                                        <input
                                                            type="radio"
                                                            name="status"
                                                            value="active"
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

                                                <label className={`
                                                    flex items-center p-4 cursor-pointer rounded-lg border transition-all duration-200 h-[70px]
                                                    ${formData.status === 'inactive'
                                                        ? 'border-gray-500 bg-gray-50 text-gray-700 shadow-md'
                                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                    }
                                                `}>
                                                    <div className="relative flex items-center justify-center mr-3 w-5 h-5">
                                                        <input
                                                            type="radio"
                                                            name="status"
                                                            value="inactive"
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

                                {/* Security Settings */}
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                        <MdLock className="mr-2 text-indigo-600" size={20} />
                                        Security Settings
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Password *
                                            </label>
                                            <button
                                                type="button"
                                                onClick={generatePassword}
                                                className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-full flex items-center transition-colors font-medium"
                                            >
                                                <MdRefresh className="mr-1" size={14} /> Generate Strong Password
                                            </button>
                                        </div>

                                        {/* Password */}
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
                                                className={`${inputClass(errors.password)} pl-10 pr-12`}
                                                placeholder=""
                                            />
                                            <label htmlFor="password" className={labelClass}>
                                                Password *
                                            </label>
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                                            </button>
                                            {errors.password && touched.password && (
                                                <p className="text-sm text-red-500 absolute -bottom-5 left-1">
                                                    {errors.password}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password strength meter */}
                                        {formData.password && (
                                            <div className="px-1 mb-6">
                                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full bg-gradient-to-r ${getPasswordStrengthProps().color} transition-all duration-500`}
                                                        style={{ width: `${getPasswordStrengthProps().percent}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between items-center mt-2">
                                                    <p className="text-xs text-gray-600">
                                                        Strength: <span className="font-semibold">{getPasswordStrengthProps().label}</span>
                                                    </p>
                                                    {passwordStrength < 3 && formData.password && (
                                                        <p className="text-xs text-amber-600 font-medium">Include uppercase, lowercase, numbers & symbols</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Confirm Password */}
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
                                            />
                                            <label htmlFor="confirmPassword" className={labelClass}>
                                                Confirm Password *
                                            </label>
                                            {errors.confirmPassword && touched.confirmPassword && (
                                                <p className="text-sm text-red-500 absolute -bottom-5 left-1">
                                                    {errors.confirmPassword}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email credentials option */}
                                        <div className="flex items-center mt-8 pt-6 border-t border-gray-200">
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
                                                    <span className="text-sm text-gray-700 font-medium">
                                                        Send account credentials to user's email address
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Error message */}
                                {errors.submit && (
                                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center animate-pulse">
                                        <MdInfo className="mr-2 flex-shrink-0" size={20} />
                                        <p className="font-medium">{errors.submit}</p>
                                    </div>
                                )}

                                {/* Form Actions */}
                                <div className="flex justify-between pt-6">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className={buttonStyles.secondary}
                                    >
                                        <MdArrowBack className="mr-2" /> Back
                                    </button>

                                    <div className="flex space-x-3">
                                        {onCancel && (
                                            <button
                                                type="button"
                                                onClick={onCancel}
                                                className={buttonStyles.secondary}
                                            >
                                                <MdClose className="mr-2" /> Cancel
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
                                                    <MdPersonAdd className="mr-2" size={20} /> Create User
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
