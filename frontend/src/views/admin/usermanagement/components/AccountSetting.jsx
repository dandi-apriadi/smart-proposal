import React, { useState, useEffect } from "react";
import {
    MdPerson,
    MdLock,
    MdNotifications,
    MdAccessTime,
    MdSecurity,
    MdEdit,
    MdSave,
    MdClose,
    MdAdd,
    MdDelete,
    MdCheck,
    MdInfo,
    MdWarning,
    MdEmail,
    MdPhone,
    MdSchool,
    MdLocationOn,
    MdLanguage,
    MdVisibility,
    MdVisibilityOff,
    MdHistory,
    MdDevices
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const AccountSetting = ({ userId }) => {
    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // State for tabs
    const [activeTab, setActiveTab] = useState("profile");

    // Dummy user data
    const [userData, setUserData] = useState({
        id: "USR-2023-001",
        name: "Dr. Asep Saepudin, S.T., M.T.",
        email: "asep.saepudin@polimdo.ac.id",
        phone: "+62812345678",
        position: "Associate Professor",
        department: "Computer Science",
        photo: "https://randomuser.me/api/portraits/men/75.jpg",
        role: "admin",
        status: "active",
        createdAt: "2023-05-10T08:30:00Z",
        lastLogin: "2023-09-28T14:45:22Z",
        location: "Manado, North Sulawesi",
        bio: "Specializing in machine learning and data science with 10+ years of experience in academic research and industry projects.",
        twoFactorEnabled: true,
        notificationPreferences: {
            email: true,
            browser: true,
            mobile: false,
            proposalUpdates: true,
            sessionNotifications: true,
            systemAlerts: true,
            weeklyDigest: false
        },
        socialLinks: {
            website: "https://example.edu/asep",
            googleScholar: "https://scholar.google.com/123456",
            orcid: "0000-0001-2345-6789",
            scopus: "987654321"
        }
    });

    // Recent login sessions (dummy data)
    const [loginSessions, setLoginSessions] = useState([
        { id: 1, device: "Windows 11 - Chrome 117", location: "Manado, Indonesia", ip: "182.23.45.67", time: "Today, 14:45", active: true },
        { id: 2, device: "macOS - Safari 16", location: "Jakarta, Indonesia", ip: "114.5.12.89", time: "Yesterday, 09:12", active: false },
        { id: 3, device: "iOS 17 - Safari Mobile", location: "Manado, Indonesia", ip: "182.23.45.91", time: "Sep 25, 2023, 18:30", active: false },
        { id: 4, device: "Android 14 - Chrome Mobile", location: "Yogyakarta, Indonesia", ip: "36.82.110.23", time: "Sep 20, 2023, 10:15", active: false },
    ]);

    // State for form editing
    const [editing, setEditing] = useState({
        profile: false,
        security: false,
        notifications: false
    });

    // Form states
    const [profileForm, setProfileForm] = useState({ ...userData });
    const [securityForm, setSecurityForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        twoFactorEnabled: userData.twoFactorEnabled
    });
    const [notificationForm, setNotificationForm] = useState({ ...userData.notificationPreferences });

    // Password visibility state
    const [passwordVisibility, setPasswordVisibility] = useState({
        current: false,
        new: false,
        confirm: false
    });

    // Handle edit toggle
    const toggleEdit = (section) => {
        setEditing({ ...editing, [section]: !editing[section] });

        // Reset form state when cancelling
        if (editing[section]) {
            if (section === "profile") setProfileForm({ ...userData });
            else if (section === "security") setSecurityForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
                twoFactorEnabled: userData.twoFactorEnabled
            });
            else if (section === "notifications") setNotificationForm({ ...userData.notificationPreferences });
        }
    };

    // Handle profile form changes
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileForm({ ...profileForm, [name]: value });
    };

    // Handle security form changes
    const handleSecurityChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSecurityForm({
            ...securityForm,
            [name]: type === "checkbox" ? checked : value
        });
    };

    // Handle notification preferences changes
    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotificationForm({ ...notificationForm, [name]: checked });
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setPasswordVisibility({
            ...passwordVisibility,
            [field]: !passwordVisibility[field]
        });
    };

    // Save profile changes
    const saveProfileChanges = () => {
        // Here you would normally make an API call to update the user profile
        setUserData({ ...userData, ...profileForm });
        toggleEdit("profile");
    };

    // Save security changes
    const saveSecurityChanges = () => {
        // Here you would normally validate passwords and make an API call
        setUserData({ ...userData, twoFactorEnabled: securityForm.twoFactorEnabled });
        toggleEdit("security");
    };

    // Save notification preferences
    const saveNotificationPreferences = () => {
        // Here you would normally make an API call to update preferences
        setUserData({ ...userData, notificationPreferences: notificationForm });
        toggleEdit("notifications");
    };

    // Terminate session
    const terminateSession = (sessionId) => {
        // Here you would normally make an API call to terminate the session
        setLoginSessions(loginSessions.filter(session => session.id !== sessionId));
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6" data-aos="fade-down">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="flex items-center">
                        <div className="relative">
                            <img
                                src={userData.photo}
                                alt={userData.name}
                                className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                            />
                            <div className="absolute bottom-0 right-0 bg-green-500 h-5 w-5 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="ml-4">
                            <h1 className="text-2xl font-bold">{userData.name}</h1>
                            <p className="text-indigo-200">{userData.role} • {userData.department}</p>
                            <div className="flex items-center mt-1">
                                <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-700 text-indigo-100">
                                    {userData.status === 'active' ? 'Active Account' : 'Inactive Account'}
                                </span>
                                <span className="ml-2 text-xs text-indigo-200">ID: {userData.id}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex">
                        <button
                            className="px-4 py-2 flex items-center text-sm rounded-lg border border-indigo-300 bg-indigo-700 bg-opacity-40 hover:bg-opacity-60 transition-colors"
                        >
                            <MdHistory className="mr-1" /> Account History
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200" data-aos="fade-up">
                <nav className="flex overflow-x-auto">
                    <button
                        className={`py-4 px-6 font-medium text-sm flex items-center whitespace-nowrap ${activeTab === 'profile' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <MdPerson className="mr-2" size={20} />
                        Profile Information
                    </button>
                    <button
                        className={`py-4 px-6 font-medium text-sm flex items-center whitespace-nowrap ${activeTab === 'security' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('security')}
                    >
                        <MdLock className="mr-2" size={20} />
                        Security Settings
                    </button>
                    <button
                        className={`py-4 px-6 font-medium text-sm flex items-center whitespace-nowrap ${activeTab === 'notifications' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <MdNotifications className="mr-2" size={20} />
                        Notification Preferences
                    </button>
                    <button
                        className={`py-4 px-6 font-medium text-sm flex items-center whitespace-nowrap ${activeTab === 'sessions' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('sessions')}
                    >
                        <MdDevices className="mr-2" size={20} />
                        Active Sessions
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div data-aos="fade-up">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
                            <button
                                className={`px-4 py-2 rounded-lg flex items-center ${editing.profile ? 'bg-gray-200 text-gray-700' : 'bg-indigo-50 text-indigo-600'}`}
                                onClick={() => toggleEdit('profile')}
                            >
                                {editing.profile ? (
                                    <>
                                        <MdClose className="mr-1" /> Cancel
                                    </>
                                ) : (
                                    <>
                                        <MdEdit className="mr-1" /> Edit Profile
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="bg-white rounded-lg">
                            <form>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        {editing.profile ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={profileForm.name}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
                                                <MdPerson className="text-gray-500 mr-2" />
                                                <span>{userData.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        {editing.profile ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={profileForm.email}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
                                                <MdEmail className="text-gray-500 mr-2" />
                                                <span>{userData.email}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        {editing.profile ? (
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={profileForm.phone}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
                                                <MdPhone className="text-gray-500 mr-2" />
                                                <span>{userData.phone}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Position Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                        {editing.profile ? (
                                            <input
                                                type="text"
                                                name="position"
                                                value={profileForm.position}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
                                                <MdSchool className="text-gray-500 mr-2" />
                                                <span>{userData.position}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Department Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                        {editing.profile ? (
                                            <input
                                                type="text"
                                                name="department"
                                                value={profileForm.department}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
                                                <MdLocationOn className="text-gray-500 mr-2" />
                                                <span>{userData.department}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Location Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        {editing.profile ? (
                                            <input
                                                type="text"
                                                name="location"
                                                value={profileForm.location}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ) : (
                                            <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
                                                <MdLocationOn className="text-gray-500 mr-2" />
                                                <span>{userData.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Bio Field - Spans full width */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
                                        {editing.profile ? (
                                            <textarea
                                                name="bio"
                                                value={profileForm.bio}
                                                onChange={handleProfileChange}
                                                rows="3"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            ></textarea>
                                        ) : (
                                            <div className="px-3 py-2 bg-gray-50 rounded-lg">
                                                <p>{userData.bio}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Social Links Section */}
                                {editing.profile && (
                                    <div className="mt-6">
                                        <h3 className="text-md font-medium text-gray-700 mb-3">Academic & Social Links</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-500 mb-1">Website URL</label>
                                                <input
                                                    type="url"
                                                    name="website"
                                                    value={profileForm.socialLinks?.website || ""}
                                                    onChange={(e) => setProfileForm({
                                                        ...profileForm,
                                                        socialLinks: { ...profileForm.socialLinks, website: e.target.value }
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="https://yoursite.edu"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-500 mb-1">Google Scholar</label>
                                                <input
                                                    type="url"
                                                    name="googleScholar"
                                                    value={profileForm.socialLinks?.googleScholar || ""}
                                                    onChange={(e) => setProfileForm({
                                                        ...profileForm,
                                                        socialLinks: { ...profileForm.socialLinks, googleScholar: e.target.value }
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="https://scholar.google.com/..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-500 mb-1">ORCID ID</label>
                                                <input
                                                    type="text"
                                                    name="orcid"
                                                    value={profileForm.socialLinks?.orcid || ""}
                                                    onChange={(e) => setProfileForm({
                                                        ...profileForm,
                                                        socialLinks: { ...profileForm.socialLinks, orcid: e.target.value }
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="0000-0000-0000-0000"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-500 mb-1">Scopus ID</label>
                                                <input
                                                    type="text"
                                                    name="scopus"
                                                    value={profileForm.socialLinks?.scopus || ""}
                                                    onChange={(e) => setProfileForm({
                                                        ...profileForm,
                                                        socialLinks: { ...profileForm.socialLinks, scopus: e.target.value }
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="Scopus ID"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Social Links Display */}
                                {!editing.profile && userData.socialLinks && (
                                    <div className="mt-6">
                                        <h3 className="text-md font-medium text-gray-700 mb-3">Academic & Social Links</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                                            {userData.socialLinks.website && (
                                                <a href={userData.socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
                                                    <MdLanguage className="mr-2" />
                                                    <span className="text-sm truncate">Personal Website</span>
                                                </a>
                                            )}
                                            {userData.socialLinks.googleScholar && (
                                                <a href={userData.socialLinks.googleScholar} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                                                    <MdSchool className="mr-2" />
                                                    <span className="text-sm truncate">Google Scholar</span>
                                                </a>
                                            )}
                                            {userData.socialLinks.orcid && (
                                                <a href={`https://orcid.org/${userData.socialLinks.orcid}`} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                                                    <MdPerson className="mr-2" />
                                                    <span className="text-sm truncate">ORCID</span>
                                                </a>
                                            )}
                                            {userData.socialLinks.scopus && (
                                                <a href={`https://www.scopus.com/authid/detail.uri?authorId=${userData.socialLinks.scopus}`} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                                                    <MdSchool className="mr-2" />
                                                    <span className="text-sm truncate">Scopus</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Save button when editing */}
                                {editing.profile && (
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={saveProfileChanges}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                                        >
                                            <MdSave className="mr-1" /> Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div data-aos="fade-up">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
                            <button
                                className={`px-4 py-2 rounded-lg flex items-center ${editing.security ? 'bg-gray-200 text-gray-700' : 'bg-indigo-50 text-indigo-600'}`}
                                onClick={() => toggleEdit('security')}
                            >
                                {editing.security ? (
                                    <>
                                        <MdClose className="mr-1" /> Cancel
                                    </>
                                ) : (
                                    <>
                                        <MdEdit className="mr-1" /> Update Security
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="bg-white rounded-lg">
                            <form>
                                {/* Password Change Section */}
                                <div className="mb-6">
                                    <h3 className="text-md font-medium text-gray-700 mb-3">Change Password</h3>

                                    {!editing.security ? (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-gray-600">Password last changed on {new Date(userData.lastLogin).toLocaleDateString()}</p>
                                            <div className="mt-2 flex items-center text-sm text-indigo-600">
                                                <MdLock className="mr-1" />
                                                <span>••••••••••••</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {/* Current Password */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={passwordVisibility.current ? "text" : "password"}
                                                        name="currentPassword"
                                                        value={securityForm.currentPassword}
                                                        onChange={handleSecurityChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        placeholder="Enter current password"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                        onClick={() => togglePasswordVisibility('current')}
                                                    >
                                                        {passwordVisibility.current ? <MdVisibilityOff /> : <MdVisibility />}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* New Password */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={passwordVisibility.new ? "text" : "password"}
                                                        name="newPassword"
                                                        value={securityForm.newPassword}
                                                        onChange={handleSecurityChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        placeholder="Enter new password"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                        onClick={() => togglePasswordVisibility('new')}
                                                    >
                                                        {passwordVisibility.new ? <MdVisibilityOff /> : <MdVisibility />}
                                                    </button>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.
                                                </p>
                                            </div>

                                            {/* Confirm Password */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={passwordVisibility.confirm ? "text" : "password"}
                                                        name="confirmPassword"
                                                        value={securityForm.confirmPassword}
                                                        onChange={handleSecurityChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        placeholder="Confirm new password"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                        onClick={() => togglePasswordVisibility('confirm')}
                                                    >
                                                        {passwordVisibility.confirm ? <MdVisibilityOff /> : <MdVisibility />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Two-Factor Authentication */}
                                <div className="mb-6">
                                    <h3 className="text-md font-medium text-gray-700 mb-3">Two-Factor Authentication</h3>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="twoFactorEnabled"
                                                    name="twoFactorEnabled"
                                                    type="checkbox"
                                                    checked={editing.security ? securityForm.twoFactorEnabled : userData.twoFactorEnabled}
                                                    onChange={handleSecurityChange}
                                                    disabled={!editing.security}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="twoFactorEnabled" className="font-medium text-gray-700">Enable Two-Factor Authentication</label>
                                                <p className="text-gray-500">Protect your account with an additional security layer. We'll send a verification code to your email when you sign in from a new device.</p>
                                            </div>
                                        </div>

                                        {!editing.security && userData.twoFactorEnabled && (
                                            <div className="mt-3 p-3 bg-green-50 text-green-700 rounded-lg flex items-start">
                                                <MdSecurity className="flex-shrink-0 mt-0.5 mr-2" />
                                                <div>
                                                    <p className="font-medium">Two-factor authentication is enabled</p>
                                                    <p className="text-sm">Your account has an extra layer of security.</p>
                                                </div>
                                            </div>
                                        )}

                                        {editing.security && securityForm.twoFactorEnabled && !userData.twoFactorEnabled && (
                                            <div className="mt-3 p-3 bg-blue-50 text-blue-700 rounded-lg flex items-start">
                                                <MdInfo className="flex-shrink-0 mt-0.5 mr-2" />
                                                <p className="text-sm">After saving, you'll need to verify your email to complete the setup.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Account Activity */}
                                <div>
                                    <h3 className="text-md font-medium text-gray-700 mb-3">Account Activity</h3>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Last login</p>
                                                <p className="font-medium">{new Date(userData.lastLogin).toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Account created</p>
                                                <p className="font-medium">{new Date(userData.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Save button when editing */}
                                {editing.security && (
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={saveSecurityChanges}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                                        >
                                            <MdSave className="mr-1" /> Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div data-aos="fade-up">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>
                            <button
                                className={`px-4 py-2 rounded-lg flex items-center ${editing.notifications ? 'bg-gray-200 text-gray-700' : 'bg-indigo-50 text-indigo-600'}`}
                                onClick={() => toggleEdit('notifications')}
                            >
                                {editing.notifications ? (
                                    <>
                                        <MdClose className="mr-1" /> Cancel
                                    </>
                                ) : (
                                    <>
                                        <MdEdit className="mr-1" /> Edit Preferences
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="bg-white rounded-lg">
                            <form>
                                {/* Notification Channels */}
                                <div className="mb-6">
                                    <h3 className="text-md font-medium text-gray-700 mb-3">Notification Channels</h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <MdEmail className="text-gray-500 mr-3" />
                                                <span className="font-medium">Email Notifications</span>
                                            </div>
                                            <div>
                                                <label className="inline-flex relative items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="email"
                                                        className="sr-only peer"
                                                        checked={editing.notifications ? notificationForm.email : userData.notificationPreferences.email}
                                                        onChange={handleNotificationChange}
                                                        disabled={!editing.notifications}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <MdNotifications className="text-gray-500 mr-3" />
                                                <span className="font-medium">Browser Notifications</span>
                                            </div>
                                            <div>
                                                <label className="inline-flex relative items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="browser"
                                                        className="sr-only peer"
                                                        checked={editing.notifications ? notificationForm.browser : userData.notificationPreferences.browser}
                                                        onChange={handleNotificationChange}
                                                        disabled={!editing.notifications}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <MdPhone className="text-gray-500 mr-3" />
                                                <span className="font-medium">Mobile Notifications</span>
                                            </div>
                                            <div>
                                                <label className="inline-flex relative items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="mobile"
                                                        className="sr-only peer"
                                                        checked={editing.notifications ? notificationForm.mobile : userData.notificationPreferences.mobile}
                                                        onChange={handleNotificationChange}
                                                        disabled={!editing.notifications}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Notification Types */}
                                <div>
                                    <h3 className="text-md font-medium text-gray-700 mb-3">Notification Types</h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <span className="font-medium">Proposal Updates</span>
                                                <p className="text-sm text-gray-500">Notifications about proposal submissions, reviews, and status changes</p>
                                            </div>
                                            <div>
                                                <label className="inline-flex relative items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="proposalUpdates"
                                                        className="sr-only peer"
                                                        checked={editing.notifications ? notificationForm.proposalUpdates : userData.notificationPreferences.proposalUpdates}
                                                        onChange={handleNotificationChange}
                                                        disabled={!editing.notifications}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <span className="font-medium">Session Notifications</span>
                                                <p className="text-sm text-gray-500">Updates about session timelines, deadlines, and changes</p>
                                            </div>
                                            <div>
                                                <label className="inline-flex relative items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="sessionNotifications"
                                                        className="sr-only peer"
                                                        checked={editing.notifications ? notificationForm.sessionNotifications : userData.notificationPreferences.sessionNotifications}
                                                        onChange={handleNotificationChange}
                                                        disabled={!editing.notifications}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <span className="font-medium">System Alerts</span>
                                                <p className="text-sm text-gray-500">Important system updates, maintenance notices, and policy changes</p>
                                            </div>
                                            <div>
                                                <label className="inline-flex relative items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="systemAlerts"
                                                        className="sr-only peer"
                                                        checked={editing.notifications ? notificationForm.systemAlerts : userData.notificationPreferences.systemAlerts}
                                                        onChange={handleNotificationChange}
                                                        disabled={!editing.notifications}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <span className="font-medium">Weekly Digest</span>
                                                <p className="text-sm text-gray-500">Weekly summary of all activities and updates</p>
                                            </div>
                                            <div>
                                                <label className="inline-flex relative items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="weeklyDigest"
                                                        className="sr-only peer"
                                                        checked={editing.notifications ? notificationForm.weeklyDigest : userData.notificationPreferences.weeklyDigest}
                                                        onChange={handleNotificationChange}
                                                        disabled={!editing.notifications}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Save button when editing */}
                                {editing.notifications && (
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={saveNotificationPreferences}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                                        >
                                            <MdSave className="mr-1" /> Save Preferences
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                )}

                {/* Active Sessions Tab */}
                {activeTab === 'sessions' && (
                    <div data-aos="fade-up">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Active Sessions</h2>
                            <p className="text-gray-500 mt-1">These are devices currently logged into your account. You can terminate any suspicious sessions.</p>
                        </div>

                        <div className="bg-white rounded-lg">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {loginSessions.map((session) => (
                                            <tr key={session.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <MdDevices className="flex-shrink-0 mr-2 text-gray-500" />
                                                        <span className="text-sm text-gray-900">{session.device}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{session.location}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{session.ip}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{session.time}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {session.active ? (
                                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Current Session
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                            Active
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {!session.active && (
                                                        <button
                                                            className="text-red-600 hover:text-red-800"
                                                            onClick={() => terminateSession(session.id)}
                                                        >
                                                            Terminate
                                                        </button>
                                                    )}
                                                    {session.active && (
                                                        <span className="text-gray-400">Current</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {loginSessions.length === 0 && (
                                <div className="p-6 text-center text-gray-500">
                                    <p>No active sessions found.</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
                            <MdWarning className="flex-shrink-0 text-yellow-500 mt-0.5 mr-3" size={20} />
                            <div>
                                <p className="text-yellow-700 font-medium">Security Tip</p>
                                <p className="text-sm text-yellow-600">If you notice any suspicious activity, terminate the session immediately and change your password.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountSetting;
