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
    MdWork,
    MdAccountCircle,
    MdSecurity,
    MdGroup,
    MdCheckCircle,
    MdError,
    MdWarning
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

    // Form state - enhanced with additional fields
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

    // Form flow state
    const [formStep, setFormStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');    // Advanced form state
    const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
    const [showAdvancedFields, setShowAdvancedFields] = useState(false);
    const [emailValidationStatus, setEmailValidationStatus] = useState('');
    const [isCheckingEmail, setIsCheckingEmail] = useState(false); const [formProgress, setFormProgress] = useState(0);
    const [showRoleComparison, setShowRoleComparison] = useState(false);
    const [showRoleGuide, setShowRoleGuide] = useState(false);

    // Enhanced faculty and department options with more comprehensive coverage
    const faculties = [
        "Fakultas Teknik",
        "Fakultas Ekonomi dan Bisnis",
        "Fakultas Sains dan Teknologi",
        "Fakultas Ilmu Sosial dan Politik",
        "Fakultas Kedokteran",
        "Fakultas Hukum",
        "Fakultas Pendidikan",
        "Fakultas Pertanian",
        "Fakultas Psikologi",
        "Fakultas Komunikasi dan Media",
        "Fakultas Ilmu Budaya",
        "Fakultas Keguruan dan Ilmu Pendidikan",
        "Fakultas Keperawatan dan Kesehatan",
        "Fakultas Farmasi"
    ];

    const departments = [
        // Teknik
        "Teknik Informatika",
        "Teknik Sipil",
        "Teknik Elektro",
        "Teknik Mesin",
        "Teknik Industri",
        "Teknik Lingkungan",
        "Teknik Arsitektur",
        "Sistem Informasi",
        // Ekonomi & Bisnis
        "Manajemen",
        "Akuntansi",
        "Ekonomi Pembangunan",
        "Administrasi Bisnis",
        "Manajemen Keuangan",
        "Perbankan dan Keuangan",
        // Sains & Teknologi
        "Matematika",
        "Fisika",
        "Kimia",
        "Biologi",
        "Statistika",
        "Ilmu Komputer",
        "Teknologi Pangan",
        // Sosial & Politik
        "Ilmu Komunikasi",
        "Hubungan Internasional",
        "Administrasi Publik",
        "Sosiologi",
        "Ilmu Politik",
        "Kriminologi",
        // Kedokteran & Kesehatan
        "Kedokteran Umum",
        "Kedokteran Gigi",
        "Farmasi",
        "Keperawatan",
        "Kebidanan",
        "Kesehatan Masyarakat",
        "Gizi",
        // Hukum
        "Ilmu Hukum",
        "Hukum Bisnis",
        "Hukum Internasional",
        // Pendidikan
        "Pendidikan Guru Sekolah Dasar",
        "Pendidikan Bahasa Inggris",
        "Pendidikan Matematika",
        "Pendidikan Fisika",
        "Pendidikan Kimia",
        "Pendidikan Biologi",
        "Bimbingan dan Konseling",
        "Pendidikan Olahraga",
        // Pertanian
        "Agroteknologi",
        "Agribisnis",
        "Kehutanan",
        "Peternakan",
        "Ilmu Tanah",
        "Proteksi Tanaman",
        // Psikologi
        "Psikologi Klinis",
        "Psikologi Pendidikan",
        "Psikologi Industri",
        // Komunikasi & Media
        "Jurnalistik",
        "Public Relations",
        "Broadcasting",
        "Desain Komunikasi Visual",
        "Periklanan",
        // Ilmu Budaya
        "Bahasa dan Sastra Indonesia",
        "Bahasa dan Sastra Inggris",
        "Sejarah",
        "Arkeologi",
        "Antropologi"
    ];    // Position options
    const positions = [
        "Dosen Tetap",
        "Dosen Tidak Tetap",
        "Profesor",
        "Lektor Kepala",
        "Lektor",
        "Asisten Ahli",
        "Tenaga Pengajar",
        "Reviewer Internal",
        "Reviewer Eksternal",
        "Ketua Program Studi",
        "Sekretaris Program Studi",
        "Dekan",
        "Wakil Dekan",
        "Kepala Bagian",
        "Sekretaris Fakultas",
        "Staff Administrasi",
        "Koordinator Penelitian", "Koordinator Pengabdian Masyarakat"
    ];

    // Role recommendations based on position
    const getRecommendedRole = (position) => {
        const roleMap = {
            "Profesor": "dosen",
            "Lektor Kepala": "dosen",
            "Lektor": "dosen",
            "Asisten Ahli": "dosen",
            "Dosen Tetap": "dosen",
            "Dosen Tidak Tetap": "dosen",
            "Tenaga Pengajar": "dosen",
            "Reviewer Internal": "reviewer",
            "Reviewer Eksternal": "reviewer",
            "Dekan": "wadir",
            "Wakil Dekan": "wadir",
            "Ketua Program Studi": "wadir",
            "Sekretaris Program Studi": "admin",
            "Kepala Bagian": "wadir",
            "Sekretaris Fakultas": "admin",
            "Staff Administrasi": "admin",
            "Koordinator Penelitian": "reviewer",
            "Koordinator Pengabdian Masyarakat": "reviewer"
        };
        return roleMap[position] || null;
    };

    // Auto-suggest role when position changes
    const handlePositionChange = (e) => {
        const { value } = e.target;
        const recommendedRole = getRecommendedRole(value);

        setFormData({
            ...formData,
            position: value,
            ...(recommendedRole && !formData.role ? { role: recommendedRole } : {})
        });

        // Clear position error
        if (errors.position) {
            setErrors({
                ...errors,
                position: null,
            });
        }
    };

    // Initialize filtered departments after departments array is defined
    const [filteredDepartments, setFilteredDepartments] = useState(departments);

    // Department filtering based on faculty
    const departmentsByFaculty = {
        "Fakultas Teknik": [
            "Teknik Informatika",
            "Teknik Sipil",
            "Teknik Elektro",
            "Teknik Mesin",
            "Teknik Industri",
            "Teknik Lingkungan",
            "Teknik Arsitektur",
            "Sistem Informasi"
        ],
        "Fakultas Ekonomi dan Bisnis": [
            "Manajemen",
            "Akuntansi",
            "Ekonomi Pembangunan",
            "Administrasi Bisnis",
            "Manajemen Keuangan",
            "Perbankan dan Keuangan"
        ],
        "Fakultas Sains dan Teknologi": [
            "Matematika",
            "Fisika",
            "Kimia",
            "Biologi",
            "Statistika",
            "Ilmu Komputer",
            "Teknologi Pangan"
        ],
        "Fakultas Ilmu Sosial dan Politik": [
            "Ilmu Komunikasi",
            "Hubungan Internasional",
            "Administrasi Publik",
            "Sosiologi",
            "Ilmu Politik",
            "Kriminologi"
        ],
        "Fakultas Kedokteran": [
            "Kedokteran Umum",
            "Kedokteran Gigi",
            "Keperawatan",
            "Kebidanan",
            "Kesehatan Masyarakat",
            "Gizi"
        ],
        "Fakultas Hukum": [
            "Ilmu Hukum",
            "Hukum Bisnis",
            "Hukum Internasional"
        ],
        "Fakultas Pendidikan": [
            "Pendidikan Guru Sekolah Dasar",
            "Pendidikan Bahasa Inggris",
            "Pendidikan Matematika",
            "Pendidikan Fisika",
            "Pendidikan Kimia",
            "Pendidikan Biologi",
            "Bimbingan dan Konseling",
            "Pendidikan Olahraga"
        ],
        "Fakultas Pertanian": [
            "Agroteknologi",
            "Agribisnis",
            "Kehutanan",
            "Peternakan",
            "Ilmu Tanah",
            "Proteksi Tanaman"
        ],
        "Fakultas Psikologi": [
            "Psikologi Klinis",
            "Psikologi Pendidikan",
            "Psikologi Industri"
        ],
        "Fakultas Komunikasi dan Media": [
            "Jurnalistik",
            "Public Relations",
            "Broadcasting",
            "Desain Komunikasi Visual",
            "Periklanan"
        ],
        "Fakultas Ilmu Budaya": [
            "Bahasa dan Sastra Indonesia",
            "Bahasa dan Sastra Inggris",
            "Sejarah",
            "Arkeologi",
            "Antropologi"
        ],
        "Fakultas Farmasi": [
            "Farmasi"
        ]
    };

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

    // Handle field blur for validation
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true,
        });
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

    // Generate strong password
    const generatePassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let password = "";
        for (let i = 0; i < 12; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setFormData({ ...formData, password, confirmPassword: password });
        setPasswordStrength(calculatePasswordStrength(password));
    };

    // Enhanced validation with better error messages
    const validateForm = () => {
        const newErrors = {};

        if (formStep === 1) {
            // Personal information validation
            if (!formData.firstName.trim()) {
                newErrors.firstName = "First name is required";
            } else if (formData.firstName.trim().length < 2) {
                newErrors.firstName = "First name must be at least 2 characters";
            }

            if (!formData.lastName.trim()) {
                newErrors.lastName = "Last name is required";
            } else if (formData.lastName.trim().length < 2) {
                newErrors.lastName = "Last name must be at least 2 characters";
            }

            if (!formData.email.trim()) {
                newErrors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Please enter a valid email address";
            }

            if (!formData.phone.trim()) {
                newErrors.phone = "Phone number is required";
            } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
                newErrors.phone = "Please enter a valid phone number";
            }
        }

        if (formStep === 2) {
            // Organization and security validation
            if (!formData.department) {
                newErrors.department = "Department is required";
            }

            if (!formData.faculty) {
                newErrors.faculty = "Faculty is required";
            }

            if (!formData.password) {
                newErrors.password = "Password is required";
            } else if (formData.password.length < 8) {
                newErrors.password = "Password must be at least 8 characters long";
            } else if (passwordStrength < 3) {
                newErrors.password = "Password is too weak. Please include uppercase, lowercase, numbers, and special characters";
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = "Please confirm your password";
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Navigate between form steps
    const nextStep = () => {
        if (validateForm()) {
            setFormStep(2);
            if (securityFormRef.current) {
                securityFormRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const prevStep = () => {
        setFormStep(1);
        if (personalFormRef.current) {
            personalFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitAttempted(true);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare user data with proper field mapping
            const userData = {
                username: formData.email.split('@')[0], // Generate username from email
                first_name: formData.firstName.trim(),
                last_name: formData.lastName.trim(),
                full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
                email: formData.email.trim().toLowerCase(),
                phone: formData.phone.trim(),
                role: formData.role,
                department: formData.department || null,
                faculty: formData.faculty || null,
                position: formData.position || null,
                password: formData.password,
                status: formData.status,
            };

            console.log('Submitting user data:', { ...userData, password: '[HIDDEN]' });

            // Call the parent success handler
            await onSuccess(userData);

            // Show success notification
            setSuccessMessage('User created successfully!');
            setShowSuccessNotification(true);

            // Reset form on success
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
            setErrors({});
            setTouched({});
            setSubmitAttempted(false);
        } catch (error) {
            console.error("Error creating user:", error);
            setErrors({
                submit: error.message || "Failed to create user. Please try again."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Role comparison component
    const RoleComparisonModal = () => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                            <MdAssignment className="mr-3 text-indigo-600" size={28} />
                            Role Comparison
                        </h3>
                        <button
                            onClick={() => setShowRoleComparison(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <MdClose size={24} />
                        </button>
                    </div>
                    <p className="text-gray-600 mt-2">Compare roles to make an informed decision</p>
                </div>

                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Feature</th>
                                    {Object.keys(roleDetails).map(role => (
                                        <th key={role} className="text-center py-4 px-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`p-3 rounded-xl mb-2 ${roleDetails[role].lightBg} ${roleDetails[role].textColor}`}>
                                                    {roleDetails[role].icon}
                                                </div>
                                                <span className="font-semibold text-gray-800">{roleDetails[role].title}</span>
                                                <span className="text-xs text-gray-500">{roleDetails[role].badge}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="py-4 px-4 font-medium text-gray-700">Access Level</td>
                                    {Object.keys(roleDetails).map(role => (
                                        <td key={role} className="text-center py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleDetails[role].lightBg} ${roleDetails[role].textColor}`}>
                                                {roleDetails[role].level}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-4 px-4 font-medium text-gray-700">Primary Function</td>
                                    {Object.keys(roleDetails).map(role => (
                                        <td key={role} className="text-center py-4 px-4 text-sm text-gray-600">
                                            {roleDetails[role].description}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-4 px-4 font-medium text-gray-700">Requirements</td>
                                    {Object.keys(roleDetails).map(role => (
                                        <td key={role} className="text-center py-4 px-4 text-sm text-gray-600">
                                            {roleDetails[role].requirements}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-4 px-4 font-medium text-gray-700">Key Permissions</td>
                                    {Object.keys(roleDetails).map(role => (
                                        <td key={role} className="py-4 px-4">
                                            <div className="space-y-1">
                                                {roleDetails[role].permissions.map((permission, index) => (
                                                    <div key={index} className="flex items-center justify-center text-xs text-gray-600">
                                                        <MdCheck className="mr-1 text-green-500" size={14} />
                                                        {permission}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            <MdInfo className="inline mr-1" size={16} />
                            Choose the role that best matches the user's responsibilities
                        </div>
                        <button
                            onClick={() => setShowRoleComparison(false)}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                        >
                            Close Comparison
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Enhanced role details with comprehensive information
    const roleDetails = {
        admin: {
            icon: <MdAdminPanelSettings className="h-8 w-8" />,
            title: "Administrator",
            description: "Complete system control and user management authority",
            detailedDescription: "Manages users, system settings, and has access to all modules",
            permissions: ["User Management", "System Settings", "All Reports", "Data Export"],
            requirements: "Technical background preferred", level: "High Access",
            color: "from-cyan-500 to-teal-600",
            hoverColor: "hover:from-purple-600 hover:to-indigo-700",
            shadowColor: "shadow-cyan-200/50",
            lightBg: "bg-purple-50",
            textColor: "text-purple-700",
            borderColor: "border-purple-200",
            selectedTextColor: "text-purple-50",
            selectedIconBg: "bg-purple-200/30",
            badge: "🔑 Super User"
        },
        dosen: {
            icon: <MdSchool className="h-8 w-8" />,
            title: "Dosen",
            description: "Submit, manage and track research proposals effectively",
            detailedDescription: "Primary users who create and submit research proposals",
            permissions: ["Create Proposals", "View Own Proposals", "Submit Reports", "Profile Management"],
            requirements: "Academic staff member", level: "Standard Access",
            color: "from-blue-500 to-blue-700",
            hoverColor: "hover:from-yellow-600 hover:to-yellow-700",
            shadowColor: "shadow-blue-200/50",
            lightBg: "bg-blue-50",
            textColor: "text-blue-700",
            borderColor: "border-blue-200",
            selectedTextColor: "text-blue-50",
            selectedIconBg: "bg-blue-200/30",
            badge: "📚 Academic"
        },
        reviewer: {
            icon: <MdSupervisorAccount className="h-8 w-8" />,
            title: "Reviewer",
            description: "Evaluate and provide expert feedback on research proposals",
            detailedDescription: "Subject matter experts who assess proposal quality and feasibility",
            permissions: ["Review Proposals", "Rate Submissions", "Provide Feedback", "Generate Reviews"],
            requirements: "Senior academic or industry expert", level: "Review Access",
            color: "from-orange-500 to-red-600",
            hoverColor: "hover:from-amber-600 hover:to-orange-700",
            shadowColor: "shadow-orange-200/50",
            lightBg: "bg-amber-50",
            textColor: "text-amber-700",
            borderColor: "border-amber-200",
            selectedTextColor: "text-amber-50",
            selectedIconBg: "bg-amber-200/30",
            badge: "⭐ Expert"
        },
        wadir: {
            icon: <MdWorkspaces className="h-8 w-8" />,
            title: "Wadir",
            description: "Strategic oversight and final decision-making authority",
            detailedDescription: "Senior management role with approval and oversight responsibilities",
            permissions: ["Approve Proposals", "View All Data", "Strategic Reports", "Policy Decisions"],
            requirements: "Senior management position", level: "Executive Access",
            color: "from-indigo-500 to-purple-600",
            hoverColor: "hover:from-blue-500 hover:to-blue-600",
            shadowColor: "shadow-indigo-200/50",
            lightBg: "bg-rose-50",
            textColor: "text-rose-700",
            borderColor: "border-rose-200",
            selectedTextColor: "text-blue-500",
            selectedIconBg: "bg-rose-200/30",
            badge: "👑 Executive"
        }
    };

    // Enhanced styling classes
    const formFieldClass = (error, touched) => `
        group relative rounded-xl border ${error && (touched || submitAttempted)
            ? 'border-red-400 ring-2 ring-red-100 bg-red-50/30'
            : 'border-gray-300 hover:border-gray-400 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 bg-white'
        } 
        transition-all duration-200 shadow-sm mb-6
    `;

    const inputClass = (error) => `
        block w-full h-14 px-4 py-4 pt-7 text-gray-700 bg-transparent appearance-none 
        focus:outline-none rounded-xl text-base font-medium
        ${error ? 'text-red-600' : 'text-gray-700'}
        placeholder-transparent
    `;

    const labelClass = `
        absolute text-xs font-semibold top-2 left-0 px-4
        transform origin-left transition-all duration-200 
        text-gray-500 group-focus-within:text-indigo-600 pointer-events-none
    `;

    const buttonStyles = {
        primary: `flex items-center justify-center px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 
                  text-white transition-all duration-300 shadow-lg 
                  hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 
                  disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] min-w-[140px]`,
        secondary: `flex items-center justify-center px-8 py-4 rounded-xl font-semibold bg-white 
                    text-gray-700 border-2 border-gray-300 transition-all duration-300 
                    hover:bg-gray-50 hover:shadow-md hover:border-gray-400 focus:ring-4 focus:ring-gray-200 
                    active:scale-[0.98] min-w-[120px]`,
        danger: `flex items-center justify-center px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-red-500 to-red-600 
                 text-white transition-all duration-300 shadow-md 
                 hover:shadow-lg hover:from-red-600 hover:to-red-700 focus:ring-4 focus:ring-red-200 
                 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]`
    };

    // Tooltip component for better user guidance
    const Tooltip = ({ text, children, position = "top" }) => {
        const [isVisible, setIsVisible] = useState(false);

        return (
            <div className="relative inline-block">
                <div
                    onMouseEnter={() => setIsVisible(true)}
                    onMouseLeave={() => setIsVisible(false)}
                    onFocus={() => setIsVisible(true)}
                    onBlur={() => setIsVisible(false)}
                >
                    {children}
                </div>
                {isVisible && (
                    <div className={`absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg max-w-xs 
                        ${position === 'top' ? 'bottom-full mb-2 left-1/2 transform -translate-x-1/2' :
                            position === 'bottom' ? 'top-full mt-2 left-1/2 transform -translate-x-1/2' :
                                position === 'left' ? 'right-full mr-2 top-1/2 transform -translate-y-1/2' :
                                    'left-full ml-2 top-1/2 transform -translate-y-1/2'}`}>
                        {text}
                        <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45
                            ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' :
                                position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' :
                                    position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' :
                                        'right-full top-1/2 -translate-y-1/2 -mr-1'}`}>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Success notification component
    const SuccessNotification = ({ message, isVisible, onClose }) => {
        useEffect(() => {
            if (isVisible) {
                const timer = setTimeout(() => {
                    onClose();
                }, 3000);
                return () => clearTimeout(timer);
            }
        }, [isVisible, onClose]);

        if (!isVisible) return null;

        return (
            <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center">
                <MdCheckCircle className="mr-3" size={20} />
                <span className="font-medium">{message}</span>
                <button
                    onClick={onClose}
                    className="ml-4 text-white hover:text-green-200 focus:outline-none"
                >
                    <MdClose size={18} />
                </button>
            </div>
        );
    };

    // Form validation summary component
    const ValidationSummary = ({ errors, isVisible }) => {
        if (!isVisible || Object.keys(errors).length === 0) return null;

        const errorList = Object.entries(errors).filter(([key, value]) => key !== 'submit' && value);

        if (errorList.length === 0) return null;

        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6" data-aos="fade-down">
                <div className="flex items-center mb-4">
                    <MdWarning className="text-red-600 mr-3" size={20} />
                    <h4 className="text-red-800 font-semibold">Please fix the following errors:</h4>
                </div>
                <ul className="space-y-2">
                    {errorList.map(([field, error]) => (
                        <li key={field} className="flex items-center text-sm text-red-700">
                            <MdError className="mr-2 flex-shrink-0" size={16} />
                            <span className="capitalize font-medium mr-2">{field.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span>{error}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    // Auto-suggest email based on name
    const generateSuggestedEmail = () => {
        if (formData.firstName && formData.lastName) {
            const firstName = formData.firstName.toLowerCase().replace(/\s+/g, '');
            const lastName = formData.lastName.toLowerCase().replace(/\s+/g, '');
            return `${firstName}.${lastName}@university.edu`;
        }
        return '';
    };

    // Auto-fill email suggestion when name is entered
    const handleNameChange = (e) => {
        handleChange(e);
        // Auto-suggest email when both names are entered and email is still empty
        if ((e.target.name === 'firstName' || e.target.name === 'lastName') &&
            !formData.email && formData.firstName && formData.lastName) {
            setTimeout(() => {
                const suggestedEmail = generateSuggestedEmail();
                if (suggestedEmail) {
                    setFormData(prev => ({ ...prev, email: suggestedEmail }));
                }
            }, 500);
        }
    };

    // Format phone number as user types
    const formatPhoneNumber = (value) => {
        // Remove all non-digit characters
        const phoneNumber = value.replace(/\D/g, '');

        // Format as (XXX) XXX-XXXX for US numbers
        if (phoneNumber.length <= 10) {
            if (phoneNumber.length <= 3) {
                return phoneNumber;
            } else if (phoneNumber.length <= 6) {
                return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
            } else {
                return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
            }
        }
        // For international numbers, just add spacing
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    };

    // Handle phone input with formatting
    const handlePhoneChange = (e) => {
        const formatted = formatPhoneNumber(e.target.value);
        setFormData({ ...formData, phone: formatted });

        // Clear error when field is changed
        if (errors.phone) {
            setErrors({ ...errors, phone: null });
        }
    };

    // Advanced email validation with duplicate checking
    const checkEmailAvailability = async (email) => {
        if (!email || !email.includes('@')) return;

        setIsCheckingEmail(true);
        try {
            // Simulate API call to check email availability
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate email check result (in real app, this would be an API call)
            const isDuplicate = Math.random() < 0.1; // 10% chance of duplicate for demo

            if (isDuplicate) {
                setEmailValidationStatus('exists');
                setErrors(prev => ({ ...prev, email: 'Email address already exists' }));
            } else {
                setEmailValidationStatus('available');
                setErrors(prev => ({ ...prev, email: null }));
            }
        } catch (error) {
            setEmailValidationStatus('error');
        } finally {
            setIsCheckingEmail(false);
        }
    };

    // Enhanced email change handler
    const handleEmailChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, email: value });
        setEmailValidationStatus('');

        // Clear previous errors
        if (errors.email) {
            setErrors({ ...errors, email: null });
        }

        // Debounced email validation
        clearTimeout(window.emailTimeout);
        window.emailTimeout = setTimeout(() => {
            if (value && value.includes('@') && value.includes('.')) {
                checkEmailAvailability(value);
            }
        }, 800);
    };

    // Enhanced faculty change handler
    const handleFacultyChange = (e) => {
        const { value } = e.target;
        setIsLoadingDepartments(true);

        setFormData(prev => ({
            ...prev,
            faculty: value,
            department: '' // Reset department when faculty changes
        }));

        // Clear errors
        if (errors.faculty) {
            setErrors({ ...errors, faculty: null });
        }

        // Simulate loading delay for better UX
        setTimeout(() => {
            setIsLoadingDepartments(false);
        }, 500);
    };

    // Filter departments when faculty changes
    useEffect(() => {
        if (formData.faculty && departmentsByFaculty[formData.faculty]) {
            setFilteredDepartments(departmentsByFaculty[formData.faculty]);
            // Reset department if it's not valid for the selected faculty
            if (formData.department && !departmentsByFaculty[formData.faculty].includes(formData.department)) {
                setFormData(prev => ({ ...prev, department: '' }));
            }
        } else {
            setFilteredDepartments(departments);
        }
    }, [formData.faculty]);    // Calculate form completion progress
    useEffect(() => {
        const requiredFields = [
            'firstName', 'lastName', 'email', 'phone', 'role',
            'faculty', 'department', 'password', 'confirmPassword', 'status'
        ];
        const optionalFields = ['position']; // Optional fields

        const filledRequired = requiredFields.filter(field =>
            formData[field] && formData[field].toString().trim() !== ''
        ).length;

        const filledOptional = optionalFields.filter(field =>
            formData[field] && formData[field].toString().trim() !== ''
        ).length;

        // Calculate progress: 90% for required fields, 10% for optional fields
        const requiredProgress = (filledRequired / requiredFields.length) * 90;
        const optionalProgress = (filledOptional / optionalFields.length) * 10;

        const totalProgress = Math.min(requiredProgress + optionalProgress, 100);
        setFormProgress(totalProgress);
    }, [formData]);    // Progress indicator component
    const FormProgressBar = ({ progress }) => (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-700">Form Completion</span>
                <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${progress === 100 ? 'text-green-600' : progress >= 80 ? 'text-blue-600' : 'text-gray-600'}`}>
                        {Math.round(progress)}%
                    </span>
                    {progress === 100 && (
                        <div className="flex items-center text-green-600">
                            <MdCheckCircle size={16} />
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${progress === 100
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-200/50 shadow-lg'
                        : progress >= 80
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-blue-200/50 shadow-md'
                            : progress >= 50
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                                : 'bg-gradient-to-r from-red-500 to-red-600'
                        }`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="mt-3">
                {progress === 100 && (
                    <div className="flex items-center text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                        <MdCheckCircle className="mr-2" size={16} />
                        <span className="text-sm font-semibold">Perfect! All required fields completed.</span>
                    </div>
                )}
                {progress >= 80 && progress < 100 && (
                    <div className="flex items-center text-blue-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                        <MdInfo className="mr-2" size={16} />
                        <span className="text-sm font-medium">Almost there! Just a few more fields to complete.</span>
                    </div>
                )}
                {progress >= 50 && progress < 80 && (
                    <div className="flex items-center text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-200">
                        <MdInfo className="mr-2" size={16} />
                        <span className="text-sm font-medium">Great progress! You're more than halfway done.</span>
                    </div>
                )}
                {progress < 50 && (
                    <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                        <MdInfo className="mr-2" size={16} />
                        <span className="text-sm font-medium">Keep going! Fill in more fields to complete your form.</span>
                    </div>
                )}
            </div>
        </div>
    );

    // Enhanced input field with status indicators
    const EnhancedInputField = ({
        type = "text",
        id,
        name,
        value,
        onChange,
        onBlur,
        placeholder,
        label,
        icon,
        error,
        touched,
        required = false,
        loading = false,
        status = '',
        helpText = '',
        className = ''
    }) => (
        <div className={`${formFieldClass(error, touched)} ${className}`}>
            {icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 z-10 pointer-events-none">
                    {icon}
                </div>
            )}
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`${inputClass(error)} ${icon ? 'pl-12' : 'pl-4'} ${loading ? 'pr-12' : 'pr-4'}`}
                placeholder={placeholder}
                required={required}
            />
            <label htmlFor={id} className={labelClass}>
                {label} {required && '*'}
            </label>

            {/* Loading indicator */}
            {loading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                </div>
            )}

            {/* Status indicator */}
            {status && !loading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {status === 'available' && <MdCheckCircle className="text-green-500" size={18} />}
                    {status === 'exists' && <MdError className="text-red-500" size={18} />}
                    {status === 'error' && <MdWarning className="text-yellow-500" size={18} />}
                </div>
            )}

            {/* Help text */}
            {helpText && !error && (
                <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <MdInfo className="mr-1" size={14} />
                    {helpText}
                </p>
            )}

            {/* Error message */}
            {error && (touched || submitAttempted) && (
                <p className="text-sm text-red-500 mt-2 flex items-center">
                    <MdError className="mr-1" size={16} />
                    {error}
                </p>
            )}
        </div>
    );

    // Quick actions toolbar component
    const QuickActionsToolbar = () => (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-600">Quick Actions:</span>
                    <button
                        type="button"
                        onClick={() => {
                            const randomNames = [
                                { first: "Ahmad", last: "Rahman" },
                                { first: "Siti", last: "Nurhaliza" },
                                { first: "Budi", last: "Santoso" },
                                { first: "Dewi", last: "Sartika" },
                                { first: "Rizki", last: "Pratama" }
                            ];
                            const random = randomNames[Math.floor(Math.random() * randomNames.length)];
                            setFormData(prev => ({
                                ...prev,
                                firstName: random.first,
                                lastName: random.last,
                                email: `${random.first.toLowerCase()}.${random.last.toLowerCase()}@university.edu`
                            }));
                        }}
                        className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors font-medium border border-blue-200"
                    >
                        🎲 Fill Demo Data
                    </button>

                    <button
                        type="button"
                        onClick={() => {
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
                            setErrors({});
                            setTouched({});
                            setFormStep(1);
                        }}
                        className="text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors font-medium border border-gray-200"
                    >
                        🗑️ Clear Form
                    </button>
                </div>

                <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span>Step {formStep} of 2</span>
                    <span>•</span>
                    <span>{Math.round(formProgress)}% Complete</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-5xl mx-auto" data-aos="fade-up">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Enhanced background effects */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 rounded-full opacity-60 blur-3xl -mr-48 -mt-48 z-0"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100 via-teal-50 to-blue-100 rounded-full opacity-60 blur-3xl -ml-48 -mb-48 z-0"></div>

                {/* Content container */}
                <div className="relative z-10 p-8">
                    {/* Enhanced Header */}
                    <div className="mb-10">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-200 pb-8">
                            <div data-aos="fade-right" data-aos-delay="100">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                        <MdPersonAdd className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                            {formStep === 1 ? "Personal Information" : "Organization & Security"}
                                        </h2>
                                        <p className="text-gray-600 mt-1">
                                            {formStep === 1 ? "Enter basic user details and role assignment" : "Set department, permissions and security preferences"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced progress indicator */}
                            <div className="flex flex-col items-center mt-6 lg:mt-0" data-aos="fade-left" data-aos-delay="150">
                                <div className="flex items-center">
                                    <div className="relative flex items-center">
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center z-10 text-white font-bold transition-all duration-300 border-4 border-white
                                            ${formStep >= 1 ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl' : 'bg-gray-300'}`}>
                                            <MdAccountCircle size={20} />
                                        </div>
                                        <div className={`w-24 h-2 rounded-full transition-all duration-500 ${formStep > 1 ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-200'}`}></div>
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center z-10 font-bold transition-all duration-300 border-4 border-white
                                            ${formStep >= 2 ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl' : 'bg-gray-200 text-gray-500'}`}>
                                            <MdSecurity size={20} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center mt-3 space-x-8">
                                    <span className={`text-sm font-medium ${formStep >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                                        Personal
                                    </span>
                                    <span className={`text-sm font-medium ${formStep >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                                        Organization
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Quick Actions Toolbar */}
                        <QuickActionsToolbar />

                        {/* Step 1: Personal Information */}
                        {formStep === 1 && (
                            <div ref={personalFormRef} className="space-y-8" data-aos="fade-up" data-aos-delay="200">
                                {/* Form Progress */}
                                <FormProgressBar progress={formProgress} />

                                {/* Validation Summary */}
                                <ValidationSummary errors={errors} isVisible={submitAttempted} />

                                {/* Personal Details */}
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center">
                                        <MdAccountCircle className="mr-3 text-indigo-600" size={24} />
                                        Personal Details
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* First Name */}
                                        <EnhancedInputField
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleNameChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your first name"
                                            label="First Name"
                                            icon={<MdPersonAdd size={18} />}
                                            error={errors.firstName}
                                            touched={touched.firstName}
                                            required
                                        />

                                        {/* Last Name */}
                                        <EnhancedInputField
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleNameChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your last name"
                                            label="Last Name"
                                            icon={<MdPersonAdd size={18} />}
                                            error={errors.lastName}
                                            touched={touched.lastName}
                                            required
                                        />

                                        {/* Email */}
                                        <EnhancedInputField
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleEmailChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter email address"
                                            label="Email Address"
                                            icon={<MdEmail size={18} />}
                                            error={errors.email}
                                            touched={touched.email}
                                            helpText={formData.firstName && formData.lastName ? "Email auto-suggested based on name" : ''}
                                            status={emailValidationStatus}
                                            loading={isCheckingEmail}
                                            required
                                        />

                                        {/* Phone */}
                                        <EnhancedInputField
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handlePhoneChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter phone number"
                                            label="Phone Number"
                                            icon={<MdPhone size={18} />}
                                            error={errors.phone}
                                            touched={touched.phone}
                                            required
                                        />
                                    </div>
                                </div>                                {/* Enhanced Role Selection with Detailed Information */}
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100">                                    <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                                        <MdGroup className="mr-3 text-indigo-600" size={24} />
                                        Role Assignment
                                    </h3>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowRoleGuide(!showRoleGuide)}
                                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                                        >
                                            <MdInfo className="mr-1" size={14} />
                                            {showRoleGuide ? 'Hide' : 'Show'} Guide
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowRoleComparison(true)}
                                            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center transition-colors"
                                        >
                                            <MdAssignment className="mr-1" size={14} />
                                            Compare
                                        </button>
                                    </div>
                                </div>{/* Compact Role Guide */}
                                    {showRoleGuide && (
                                        <div className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-blue-800 mb-3 flex items-center text-sm">
                                                <MdInfo className="mr-2" size={18} />
                                                Role Guide - Choose the right role for user permissions
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                                {Object.entries(roleDetails).map(([role, details]) => (
                                                    <div key={role} className="bg-white rounded-lg p-3 border border-blue-100">
                                                        <div className="flex items-center mb-2">
                                                            <div className={`p-1.5 rounded-lg mr-2 ${details.lightBg} ${details.textColor}`}>
                                                                {React.cloneElement(details.icon, { size: 16 })}
                                                            </div>
                                                            <div>
                                                                <h5 className="font-semibold text-gray-800 text-xs">{details.title}</h5>
                                                                <span className="text-xs text-gray-500">{details.level}</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{details.description}</p>
                                                        <div className="flex flex-wrap gap-1">
                                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                                                {details.permissions[0]}
                                                            </span>
                                                            {details.permissions.length > 1 && (
                                                                <span className="text-xs text-gray-400">+{details.permissions.length - 1}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}                                    {/* Compact Role Recommendation */}
                                    {formData.position && getRecommendedRole(formData.position) && formData.role !== getRecommendedRole(formData.position) && (
                                        <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center">
                                            <MdWarning className="mr-2 text-yellow-600 flex-shrink-0" size={18} />
                                            <div className="flex-1">
                                                <p className="text-yellow-800 text-sm">
                                                    <span className="font-medium">Suggested:</span> Based on "{formData.position}",
                                                    we recommend <span className="font-semibold">{roleDetails[getRecommendedRole(formData.position)]?.title}</span> role.
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, role: getRecommendedRole(formData.position) })}
                                                className="ml-3 text-xs bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-3 py-1 rounded-full font-medium transition-colors"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    )}{/* Compact Role Selection Cards */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                        {Object.keys(roleDetails).map(role => (<div
                                            key={role}
                                            onClick={() => setFormData({ ...formData, role })}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    setFormData({ ...formData, role });
                                                }
                                            }} className={`
                                                    relative rounded-xl p-4 cursor-pointer transition-all duration-300 border-2
                                                    ${formData.role === role
                                                    ? `bg-gradient-to-br ${roleDetails[role].color} text-white shadow-lg transform scale-105 border-transparent` : `bg-white ${roleDetails[role].borderColor} hover:shadow-md ${role === 'dosen' ? 'hover:border-blue-400 hover:bg-blue-50/60' :
                                                        role === 'wadir' ? 'hover:border-indigo-400 hover:bg-indigo-50/60' :
                                                            role === 'reviewer' ? 'hover:border-orange-400 hover:bg-orange-50/60' :
                                                                'hover:border-cyan-400 hover:bg-cyan-50/60'
                                                    }`
                                                }
                                                `}
                                            role="radio"
                                            aria-checked={formData.role === role}
                                            aria-describedby={`role-${role}-description`}
                                            tabIndex={0}
                                        >
                                            {/* Selection indicator */}
                                            {formData.role === role && (
                                                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg z-10">
                                                    <MdCheckCircle className="text-white" size={16} />
                                                </div>
                                            )}

                                            {/* Role content - compact version */}
                                            <div className="text-center space-y-3">
                                                {/* Icon */}
                                                <div className={`
                                                        inline-flex p-3 rounded-xl transition-all duration-300 mx-auto
                                                        ${formData.role === role
                                                        ? 'bg-white/20'
                                                        : `${roleDetails[role].lightBg} ${roleDetails[role].textColor}`
                                                    }
                                                    `}>
                                                    {React.cloneElement(roleDetails[role].icon, {
                                                        size: 24,
                                                        className: formData.role === role ? 'text-white' : ''
                                                    })}
                                                </div>

                                                {/* Title */}
                                                <h4 className={`font-bold text-base ${formData.role === role ? 'text-white' : 'text-gray-800'}`}>
                                                    {roleDetails[role].title}
                                                </h4>

                                                {/* Brief description */}
                                                <p className={`text-xs leading-relaxed ${formData.role === role ? 'text-white/90' : 'text-gray-600'}`}>
                                                    {roleDetails[role].description.split(' ').slice(0, 6).join(' ')}...
                                                </p>

                                                {/* Access level badge */}
                                                <span className={`
                                                        inline-block text-xs px-2 py-1 rounded-full font-medium
                                                        ${formData.role === role
                                                        ? 'bg-white/20 text-white'
                                                        : `${roleDetails[role].lightBg} ${roleDetails[role].textColor}`
                                                    }
                                                    `}>
                                                    {roleDetails[role].level}
                                                </span>                                                </div>
                                        </div>
                                        ))}
                                    </div>{/* Compact Selected Role Details Panel */}
                                    {formData.role && (
                                        <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border border-gray-200">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center">
                                                    <div className={`p-2 rounded-lg mr-3 ${roleDetails[formData.role].lightBg} ${roleDetails[formData.role].textColor}`}>
                                                        {React.cloneElement(roleDetails[formData.role].icon, { size: 20 })}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800">
                                                            Selected: {roleDetails[formData.role].title}
                                                        </h4>
                                                        <p className="text-sm text-gray-600">{roleDetails[formData.role].detailedDescription}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleDetails[formData.role].lightBg} ${roleDetails[formData.role].textColor}`}>
                                                    {roleDetails[formData.role].level}
                                                </span>
                                            </div>

                                            {/* Compact permissions list */}
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                {roleDetails[formData.role].permissions.map((permission, index) => (
                                                    <div key={index} className="flex items-center text-xs text-gray-600">
                                                        <MdCheck className="mr-1 text-green-500 flex-shrink-0" size={14} />
                                                        <span className="truncate">{permission}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}                                    {/* Role Selection Helper */}
                                    {!formData.role && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center">
                                            <MdInfo className="mr-2 text-blue-600 flex-shrink-0" size={18} />
                                            <p className="text-blue-800 text-sm">
                                                <span className="font-medium">Select a role above</span> to define user permissions and access levels.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between items-center pt-8">
                                    <div className="flex items-center text-gray-500">
                                        <MdInfo className="mr-2" size={16} />
                                        <span className="text-sm">Step 1 of 2 - Personal Information</span>
                                    </div>

                                    <div className="flex space-x-4">
                                        {onCancel && (
                                            <button
                                                type="button"
                                                onClick={onCancel}
                                                className={buttonStyles.secondary}
                                            >
                                                <MdClose className="mr-2" size={18} /> Cancel
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className={buttonStyles.primary}
                                        >
                                            Continue <MdKeyboardTab className="ml-2" size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}                        {/* Step 2: Organization & Security */}
                        {formStep === 2 && (
                            <div ref={securityFormRef} className="space-y-5" data-aos="fade-up" data-aos-delay="200">
                                {/* Form Progress */}
                                <FormProgressBar progress={formProgress} />

                                {/* Validation Summary */}
                                <ValidationSummary errors={errors} isVisible={submitAttempted} />                                {/* Organization Information */}
                                <div className="bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30 rounded-2xl p-7 shadow-lg border border-blue-200/50 backdrop-blur-sm">
                                    <div className="flex items-center mb-6">
                                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg mr-4">
                                            <MdBusiness className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Organization Information</h3>
                                            <p className="text-sm text-gray-600 mt-1">Configure academic affiliation and organizational details</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">                                        {/* Faculty Field */}
                                        <div className="space-y-2">
                                            <div className="relative group">
                                                <div className={`
                                                    relative rounded-xl border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm
                                                    ${errors.faculty && (touched.faculty || submitAttempted)
                                                        ? 'border-red-400 ring-4 ring-red-100/50 shadow-red-200/30'
                                                        : formData.faculty
                                                            ? 'border-blue-500 ring-4 ring-blue-100/50 shadow-blue-200/30'
                                                            : 'border-gray-300 hover:border-blue-400 group-focus-within:border-blue-500 group-focus-within:ring-4 group-focus-within:ring-blue-100/50 hover:shadow-md'
                                                    } shadow-sm
                                                `}>
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                                        <div className={`
                                                            p-2 rounded-lg transition-all duration-300
                                                            ${formData.faculty ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500 group-focus-within:bg-blue-500 group-focus-within:text-white'}
                                                        `}>
                                                            <MdSchool size={18} />
                                                        </div>
                                                    </div>
                                                    <select
                                                        id="faculty"
                                                        name="faculty"
                                                        value={formData.faculty}
                                                        onChange={handleFacultyChange}
                                                        onBlur={handleBlur}
                                                        className="
                                                            w-full h-16 pl-16 pr-12 text-gray-800 font-medium text-base
                                                            bg-transparent border-none outline-none cursor-pointer appearance-none
                                                            focus:text-gray-900
                                                        "
                                                    >
                                                        <option value="" disabled className="text-gray-500">Choose your faculty...</option>
                                                        {faculties.map((faculty) => (
                                                            <option key={faculty} value={faculty} className="text-gray-800 py-2">{faculty}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                        <div className="bg-gray-100 p-2 rounded-lg group-focus-within:bg-blue-100 transition-colors">
                                                            <svg className="w-5 h-5 text-gray-600 group-focus-within:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <label htmlFor="faculty" className="absolute -top-2 left-4 px-2 bg-white text-xs font-bold text-blue-600 rounded">
                                                    Faculty *
                                                </label>
                                            </div>
                                            {errors.faculty && (touched.faculty || submitAttempted) && (
                                                <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                                                    <MdError size={16} />
                                                    <span className="text-sm font-medium">{errors.faculty}</span>
                                                </div>
                                            )}
                                            {formData.faculty && !errors.faculty && (
                                                <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                                                    <MdCheckCircle size={16} />
                                                    <span className="text-sm font-medium">Faculty selected</span>
                                                </div>
                                            )}
                                        </div>                                        {/* Department Field */}
                                        <div className="space-y-2">
                                            <div className="relative group">
                                                <div className={`
                                                    relative rounded-xl border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm
                                                    ${errors.department && (touched.department || submitAttempted)
                                                        ? 'border-red-400 ring-4 ring-red-100/50 shadow-red-200/30'
                                                        : formData.department
                                                            ? 'border-blue-500 ring-4 ring-blue-100/50 shadow-blue-200/30'
                                                            : 'border-gray-300 hover:border-blue-400 group-focus-within:border-blue-500 group-focus-within:ring-4 group-focus-within:ring-blue-100/50 hover:shadow-md'
                                                    } shadow-sm
                                                    ${(isLoadingDepartments || !formData.faculty) ? 'opacity-60 cursor-not-allowed' : ''}
                                                `}>
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                                        <div className={`
                                                            p-2 rounded-lg transition-all duration-300
                                                            ${formData.department ? 'bg-blue-500 text-white' :
                                                                !formData.faculty ? 'bg-gray-200 text-gray-400' :
                                                                    'bg-gray-100 text-gray-500 group-focus-within:bg-blue-500 group-focus-within:text-white'}
                                                        `}>
                                                            <MdDomain size={18} />
                                                        </div>
                                                    </div>
                                                    <select
                                                        id="department"
                                                        name="department"
                                                        value={formData.department}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled={isLoadingDepartments || !formData.faculty}
                                                        className="
                                                            w-full h-16 pl-16 pr-12 text-gray-800 font-medium text-base
                                                            bg-transparent border-none outline-none cursor-pointer appearance-none
                                                            focus:text-gray-900 disabled:cursor-not-allowed
                                                        "
                                                    >
                                                        <option value="" disabled className="text-gray-500">
                                                            {isLoadingDepartments ? 'Loading departments...' :
                                                                !formData.faculty ? 'Select faculty first' :
                                                                    'Choose your department...'}
                                                        </option>
                                                        {!isLoadingDepartments && filteredDepartments.map((dept) => (
                                                            <option key={dept} value={dept} className="text-gray-800 py-2">{dept}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                        <div className="bg-gray-100 p-2 rounded-lg group-focus-within:bg-blue-100 transition-colors">
                                                            {isLoadingDepartments ? (
                                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                                            ) : (
                                                                <svg className="w-5 h-5 text-gray-600 group-focus-within:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <label htmlFor="department" className="absolute -top-2 left-4 px-2 bg-white text-xs font-bold text-blue-600 rounded">
                                                    Department/Program *
                                                </label>
                                            </div>
                                            {errors.department && (touched.department || submitAttempted) && (
                                                <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                                                    <MdError size={16} />
                                                    <span className="text-sm font-medium">{errors.department}</span>
                                                </div>
                                            )}
                                            {formData.department && !errors.department && (
                                                <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                                                    <MdCheckCircle size={16} />
                                                    <span className="text-sm font-medium">Department selected</span>
                                                </div>
                                            )}
                                            {!formData.faculty && (
                                                <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                                                    <MdWarning size={16} />
                                                    <span className="text-sm font-medium">Please select a faculty first</span>
                                                </div>
                                            )}
                                        </div>                                        {/* Position Field */}
                                        <div className="space-y-2">
                                            <div className="relative group">
                                                <div className={`
                                                    relative rounded-xl border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm
                                                    ${errors.position && (touched.position || submitAttempted)
                                                        ? 'border-red-400 ring-4 ring-red-100/50 shadow-red-200/30'
                                                        : formData.position
                                                            ? 'border-blue-500 ring-4 ring-blue-100/50 shadow-blue-200/30'
                                                            : 'border-gray-300 hover:border-blue-400 group-focus-within:border-blue-500 group-focus-within:ring-4 group-focus-within:ring-blue-100/50 hover:shadow-md'
                                                    } shadow-sm
                                                `}>
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                                        <div className={`
                                                            p-2 rounded-lg transition-all duration-300
                                                            ${formData.position ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500 group-focus-within:bg-blue-500 group-focus-within:text-white'}
                                                        `}>
                                                            <MdWork size={18} />
                                                        </div>
                                                    </div>
                                                    <select
                                                        id="position"
                                                        name="position"
                                                        value={formData.position}
                                                        onChange={handlePositionChange}
                                                        onBlur={handleBlur}
                                                        className="
                                                            w-full h-16 pl-16 pr-12 text-gray-800 font-medium text-base
                                                            bg-transparent border-none outline-none cursor-pointer appearance-none
                                                            focus:text-gray-900
                                                        "
                                                    >
                                                        <option value="" className="text-gray-500">Select position (optional)...</option>
                                                        {positions.map((pos) => (
                                                            <option key={pos} value={pos} className="text-gray-800 py-2">{pos}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                        <div className="bg-gray-100 p-2 rounded-lg group-focus-within:bg-blue-100 transition-colors">
                                                            <svg className="w-5 h-5 text-gray-600 group-focus-within:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <label htmlFor="position" className="absolute -top-2 left-4 px-2 bg-white text-xs font-bold text-gray-600 rounded">
                                                    Position/Title
                                                </label>
                                            </div>
                                            {formData.position && (
                                                <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                                                    <MdCheckCircle size={16} />
                                                    <span className="text-sm font-medium">Position: {formData.position}</span>
                                                </div>
                                            )}
                                        </div>                                        {/* Account Status Field */}
                                        <div className="space-y-3">
                                            <div className="flex items-center mb-4">
                                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-md mr-3">
                                                    <MdAccountCircle className="text-white" size={20} />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-bold text-gray-800">Account Status</label>
                                                    <p className="text-xs text-gray-600">Set the initial account state</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* Active Status */}
                                                <label className={`
                                                    relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all duration-300 group
                                                    ${formData.status === 'active'
                                                        ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-200/30 scale-105'
                                                        : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/30 hover:shadow-md'
                                                    }
                                                `}>
                                                    <div className="relative mr-4">
                                                        <input
                                                            type="radio"
                                                            name="status"
                                                            value="active"
                                                            checked={formData.status === "active"}
                                                            onChange={handleChange}
                                                            className="sr-only"
                                                        />
                                                        <div className={`
                                                            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                                            ${formData.status === 'active'
                                                                ? 'border-green-500 bg-green-500 shadow-md'
                                                                : 'border-gray-300 bg-white group-hover:border-green-400'
                                                            }
                                                        `}>
                                                            {formData.status === 'active' && (
                                                                <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center mb-1">
                                                            <MdCheckCircle className="text-green-500 mr-2" size={16} />
                                                            <span className="font-bold text-green-700">Active</span>
                                                        </div>
                                                        <span className="text-sm text-green-600">User can login immediately</span>
                                                    </div>
                                                </label>

                                                {/* Inactive Status */}
                                                <label className={`
                                                    relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all duration-300 group
                                                    ${formData.status === 'inactive'
                                                        ? 'border-gray-500 bg-gradient-to-br from-gray-50 to-slate-50 shadow-lg shadow-gray-200/30 scale-105'
                                                        : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50/50 hover:shadow-md'
                                                    }
                                                `}>
                                                    <div className="relative mr-4">
                                                        <input
                                                            type="radio"
                                                            name="status"
                                                            value="inactive"
                                                            checked={formData.status === "inactive"}
                                                            onChange={handleChange}
                                                            className="sr-only"
                                                        />
                                                        <div className={`
                                                            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                                            ${formData.status === 'inactive'
                                                                ? 'border-gray-500 bg-gray-500 shadow-md'
                                                                : 'border-gray-300 bg-white group-hover:border-gray-400'
                                                            }
                                                        `}>
                                                            {formData.status === 'inactive' && (
                                                                <div className="w-3 h-3 rounded-full bg-white"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center mb-1">
                                                            <MdClose className="text-gray-500 mr-2" size={16} />
                                                            <span className="font-bold text-gray-700">Inactive</span>
                                                        </div>
                                                        <span className="text-sm text-gray-600">Account disabled, no access</span>
                                                    </div>
                                                </label>
                                            </div>

                                            {/* Status Info */}
                                            <div className={`
                                                mt-4 p-3 rounded-lg border transition-all duration-300
                                                ${formData.status === 'active'
                                                    ? 'bg-green-50 border-green-200 text-green-700'
                                                    : 'bg-gray-50 border-gray-200 text-gray-700'
                                                }
                                            `}>
                                                <div className="flex items-center text-sm">
                                                    <MdInfo className="mr-2" size={16} />
                                                    <span>
                                                        {formData.status === 'active'
                                                            ? 'The user will be able to login and access the system immediately after account creation.'
                                                            : 'The account will be created but the user won\'t be able to login until activated.'
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                {/* Security Settings */}
                                <div className="bg-gradient-to-br from-white via-purple-50/20 to-indigo-50/30 rounded-2xl p-7 shadow-lg border border-purple-200/50 backdrop-blur-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center">
                                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg mr-4">
                                                <MdLock className="text-white" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">Security Settings</h3>
                                                <p className="text-sm text-gray-600 mt-1">Configure account passwords and security options</p>
                                            </div>
                                        </div>
                                        <Tooltip text="Generate a secure 12-character password with mixed case, numbers, and symbols">
                                            <button
                                                type="button"
                                                onClick={generatePassword}
                                                className="flex items-center px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl focus:ring-4 focus:ring-purple-200"
                                            >
                                                <MdRefresh className="mr-2" size={18} />
                                                Generate Password
                                            </button>
                                        </Tooltip>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">                                        {/* Password Field */}
                                        <div className="space-y-3">
                                            <div className="relative group">
                                                <div className={`
                                                    relative rounded-xl border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm
                                                    ${errors.password && (touched.password || submitAttempted)
                                                        ? 'border-red-400 ring-4 ring-red-100/50 shadow-red-200/30'
                                                        : formData.password
                                                            ? 'border-purple-500 ring-4 ring-purple-100/50 shadow-purple-200/30'
                                                            : 'border-gray-300 hover:border-purple-400 group-focus-within:border-purple-500 group-focus-within:ring-4 group-focus-within:ring-purple-100/50 hover:shadow-md'
                                                    } shadow-sm
                                                `}>
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                                        <div className={`
                                                            p-2 rounded-lg transition-all duration-300
                                                            ${formData.password ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-500 group-focus-within:bg-purple-500 group-focus-within:text-white'}
                                                        `}>
                                                            <MdLock size={18} />
                                                        </div>
                                                    </div>
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        id="password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className="
                                                            w-full h-16 pl-16 pr-16 text-gray-800 font-medium text-base
                                                            bg-transparent border-none outline-none
                                                            focus:text-gray-900 placeholder-gray-400
                                                        "
                                                        placeholder="Enter a strong password..."
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gray-100 hover:bg-purple-100 text-gray-500 hover:text-purple-600 focus:outline-none transition-all duration-300"
                                                    >
                                                        {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                                                    </button>
                                                </div>
                                                <label htmlFor="password" className="absolute -top-2 left-4 px-2 bg-white text-xs font-bold text-purple-600 rounded">
                                                    Password *
                                                </label>
                                            </div>

                                            {/* Password Strength Indicator */}
                                            {formData.password && (
                                                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-sm font-bold text-gray-700">Password Strength</span>
                                                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${passwordStrength >= 4 ? 'text-green-700 bg-green-100' :
                                                            passwordStrength >= 3 ? 'text-yellow-700 bg-yellow-100' :
                                                                passwordStrength >= 2 ? 'text-orange-700 bg-orange-100' : 'text-red-700 bg-red-100'
                                                            }`}>
                                                            {getPasswordStrengthProps().label}
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                                                        <div
                                                            className={`h-full rounded-full bg-gradient-to-r ${getPasswordStrengthProps().color} transition-all duration-500 shadow-md`}
                                                            style={{ width: `${getPasswordStrengthProps().percent}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}

                                            {errors.password && (touched.password || submitAttempted) && (
                                                <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                                                    <MdError size={16} />
                                                    <span className="text-sm font-medium">{errors.password}</span>
                                                </div>
                                            )}
                                        </div>                                        {/* Confirm Password Field */}
                                        <div className="space-y-3">
                                            <div className="relative group">
                                                <div className={`
                                                    relative rounded-xl border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm
                                                    ${errors.confirmPassword && (touched.confirmPassword || submitAttempted)
                                                        ? 'border-red-400 ring-4 ring-red-100/50 shadow-red-200/30'
                                                        : formData.confirmPassword
                                                            ? 'border-purple-500 ring-4 ring-purple-100/50 shadow-purple-200/30'
                                                            : 'border-gray-300 hover:border-purple-400 group-focus-within:border-purple-500 group-focus-within:ring-4 group-focus-within:ring-purple-100/50 hover:shadow-md'
                                                    } shadow-sm
                                                `}>
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                                        <div className={`
                                                            p-2 rounded-lg transition-all duration-300
                                                            ${formData.confirmPassword ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-500 group-focus-within:bg-purple-500 group-focus-within:text-white'}
                                                        `}>
                                                            <MdLock size={18} />
                                                        </div>
                                                    </div>
                                                    <input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className="
                                                            w-full h-16 pl-16 pr-16 text-gray-800 font-medium text-base
                                                            bg-transparent border-none outline-none
                                                            focus:text-gray-900 placeholder-gray-400
                                                        "
                                                        placeholder="Confirm your password..."
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gray-100 hover:bg-purple-100 text-gray-500 hover:text-purple-600 focus:outline-none transition-all duration-300"
                                                    >
                                                        {showConfirmPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                                                    </button>
                                                </div>
                                                <label htmlFor="confirmPassword" className="absolute -top-2 left-4 px-2 bg-white text-xs font-bold text-purple-600 rounded">
                                                    Confirm Password *
                                                </label>
                                            </div>

                                            {/* Password Match Indicator */}
                                            {formData.confirmPassword && (
                                                <div className={`
                                                    flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-300
                                                    ${formData.password === formData.confirmPassword
                                                        ? 'text-green-600 bg-green-50 border-green-200'
                                                        : 'text-red-600 bg-red-50 border-red-200'
                                                    }
                                                `}>
                                                    {formData.password === formData.confirmPassword ? (
                                                        <>
                                                            <MdCheckCircle size={16} />
                                                            <span className="text-sm font-semibold">Passwords match perfectly!</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <MdError size={16} />
                                                            <span className="text-sm font-medium">Passwords don't match</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                            {errors.confirmPassword && (touched.confirmPassword || submitAttempted) && (
                                                <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                                                    <MdError size={16} />
                                                    <span className="text-sm font-medium">{errors.confirmPassword}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>                                    {/* Send Credentials Option */}
                                    <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200/60 shadow-sm">
                                        <div className="flex items-center mb-4">
                                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-md mr-3">
                                                <MdSend className="text-white" size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-indigo-800">Email Notification</h4>
                                                <p className="text-sm text-indigo-600">Notify user about their new account</p>
                                            </div>
                                        </div>

                                        <label className="flex items-center cursor-pointer group">
                                            <div className="relative mr-4">
                                                <input
                                                    type="checkbox"
                                                    name="sendCredentials"
                                                    checked={formData.sendCredentials}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                                <div className={`
                                                    w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110
                                                    ${formData.sendCredentials
                                                        ? 'bg-gradient-to-br from-indigo-500 to-blue-600 border-indigo-500 shadow-lg shadow-indigo-200/50'
                                                        : 'border-gray-300 bg-white hover:border-indigo-300 hover:bg-indigo-50'
                                                    }
                                                `}>
                                                    {formData.sendCredentials && (
                                                        <MdCheck className="text-white" size={18} />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-base font-semibold text-indigo-800 block">
                                                    Send login credentials via email
                                                </span>
                                                <p className="text-sm text-indigo-600 mt-1">
                                                    User will receive their username and password securely by email
                                                </p>
                                                {formData.sendCredentials && (
                                                    <div className="mt-2 flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-lg border border-green-200">
                                                        <MdCheckCircle className="mr-2" size={14} />
                                                        <span className="text-xs font-medium">Email notification enabled</span>
                                                    </div>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Error Display */}
                                {errors.submit && (
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
                                        <MdWarning className="text-red-600 mr-3" size={20} />
                                        <span className="text-red-600 font-medium">{errors.submit}</span>
                                    </div>
                                )}                                {/* Action Buttons */}
                                <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-6">
                                    <div className="flex items-center text-gray-500">
                                        <MdInfo className="mr-2" size={16} />
                                        <span className="text-sm font-medium">Step 2 of 2 - Organization & Security</span>
                                    </div>

                                    <div className="flex space-x-3">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex items-center px-5 py-2.5 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
                                        >
                                            <MdArrowBack className="mr-2" size={18} /> Back
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex items-center px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                    Creating User...
                                                </>
                                            ) : (
                                                <>
                                                    <MdSend className="mr-2" size={18} />
                                                    Create User
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>                    {/* Success Notification */}
                    <SuccessNotification
                        message={successMessage}
                        isVisible={showSuccessNotification}
                        onClose={() => setShowSuccessNotification(false)}
                    />
                </div>
            </div>

            {/* Role Comparison Modal */}
            {showRoleComparison && <RoleComparisonModal />}
        </div>
    );
};

export default AddNewUser;
