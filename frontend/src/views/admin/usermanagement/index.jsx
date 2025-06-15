import React, { useState, useEffect } from "react";
import {
    MdSearch,
    MdFilterList,
    MdEdit,
    MdDelete,
    MdPersonAdd,
    MdRefresh,
    MdVisibility,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdPersonOutline,
    MdAdminPanelSettings,
    MdSchool,
    MdSupervisorAccount,
    MdMoreVert,
    MdWarning,
    MdCheckCircle,
    MdClose,
    MdEmail,
    MdBusiness,
    MdWork,
    MdDateRange,
    MdAccessTime,
    MdSave,
    MdCancel
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import { useUserManagement } from "../../../hooks/useUserManagement";
import AddNewUser from "./components/AddNewUser_enhanced";

const UserDirectory = () => {
    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);    // Use custom hook for user management
    const {
        users,
        userStats,
        loading,
        error,
        pagination,
        isAuthenticated,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
        updateUserStatus,
        getUserById,
        clearError,
        retryAuth
    } = useUserManagement();

    // State for UI controls
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState("full_name");
    const [sortDirection, setSortDirection] = useState("asc"); const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [editUserData, setEditUserData] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    // Calculate derived values for pagination and display
    const currentItems = users || [];
    const totalPages = pagination.total_pages || 1;

    // Sync currentPage with pagination.current_page
    useEffect(() => {
        if (pagination.current_page !== currentPage) {
            setCurrentPage(pagination.current_page);
        }
    }, [pagination.current_page]);    // Effect untuk fetch data dengan filter
    useEffect(() => {
        const params = {
            page: currentPage,
            limit: 10,
            search: searchTerm,
            role: roleFilter !== 'all' ? roleFilter : undefined,
            status: statusFilter !== 'all' ? statusFilter : undefined
        };
        fetchUsers(params);
    }, [currentPage, searchTerm, roleFilter, statusFilter]); // Removed fetchUsers from dependency array

    // Effect to fetch users when authentication status changes
    useEffect(() => {
        if (isAuthenticated) {
            const params = {
                page: currentPage,
                limit: 10,
                search: searchTerm,
                role: roleFilter !== 'all' ? roleFilter : undefined,
                status: statusFilter !== 'all' ? statusFilter : undefined
            };
            fetchUsers(params);
        }
    }, [isAuthenticated, fetchUsers]);

    // Show message utility
    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    // Role icon mapping
    const getRoleIcon = (role) => {
        switch (role) {
            case "admin":
                return <MdAdminPanelSettings className="text-indigo-600" />;
            case "dosen":
                return <MdSchool className="text-green-600" />;
            case "reviewer":
                return <MdSupervisorAccount className="text-amber-600" />;
            case "wadir":
                return <MdPersonOutline className="text-red-600" />;
            default:
                return <MdPersonOutline className="text-gray-600" />;
        }
    };

    // Handle sorting
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
        // Refresh data with new sort
        fetchUsers({
            page: currentPage,
            limit: 10,
            search: searchTerm,
            role: roleFilter !== 'all' ? roleFilter : undefined,
            status: statusFilter !== 'all' ? statusFilter : undefined
        });
    };    // User action handlers
    const handleViewUser = async (user) => {
        const result = await getUserById(user.user_id);
        if (result.success) {
            setSelectedUser(result.data);
            setShowUserModal(true);
        } else {
            showMessage('error', result.message);
        }
    }; const handleEditUser = async (userId) => {
        try {
            const result = await getUserById(userId);
            if (result.success) {
                setEditUserData(result.data);
                setShowEditUserModal(true);
                setShowUserModal(false); // Close detail modal if open
            } else {
                showMessage('error', result.message);
            }
        } catch (error) {
            showMessage('error', 'Failed to load user data for editing');
        }
    }; const refreshUsers = () => {
        const params = {
            page: currentPage,
            limit: 10,
            search: searchTerm,
            role: roleFilter !== 'all' ? roleFilter : undefined,
            status: statusFilter !== 'all' ? statusFilter : undefined
        };
        fetchUsers(params);
    };

    const handleUpdateUser = async (userData) => {
        setActionLoading(true);
        try {
            const result = await updateUser(editUserData.user_id, userData);

            if (result.success) {
                showMessage('success', result.message);
                setShowEditUserModal(false);
                setEditUserData(null);
                // Refresh user list
                refreshUsers();
            } else {
                showMessage('error', result.message);
            }
        } catch (error) {
            showMessage('error', 'Failed to update user');
        } finally {
            setActionLoading(false);
        }
    }; const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    }; const confirmDeleteUser = async () => {
        if (!userToDelete) return;

        setActionLoading(true);
        const result = await deleteUser(userToDelete.user_id);

        if (result.success) {
            showMessage('success', result.message);
            setShowDeleteModal(false);
            setUserToDelete(null);
            // Refresh user list to remove deleted user from table
            refreshUsers();
        } else {
            showMessage('error', result.message);
        }
        setActionLoading(false);
    };

    const handleAddUser = () => {
        setShowAddUserModal(true);
    }; const handleCreateUser = async (userData) => {
        const result = await createUser(userData);
        if (result.success) {
            showMessage('success', result.message);
            setShowAddUserModal(false);
            // Refresh user list to show the new user
            refreshUsers();
            return { success: true };
        } else {
            showMessage('error', result.message);
            return { success: false, message: result.message };
        }
    }; const handleStatusToggle = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        const result = await updateUserStatus(userId, newStatus);

        if (result.success) {
            showMessage('success', `User status updated to ${newStatus}`);
            // Refresh user list to show updated status
            refreshUsers();
        } else {
            showMessage('error', result.message);
        }
    };

    const handleRefresh = () => {
        fetchUsers({
            page: currentPage,
            limit: 10,
            search: searchTerm,
            role: roleFilter !== 'all' ? roleFilter : undefined,
            status: statusFilter !== 'all' ? statusFilter : undefined
        });
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-xl p-8 overflow-hidden relative">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 z-0"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full -ml-32 -mb-32 z-0"></div>

            {/* Header with Title and Actions - Improved design */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10">
                <div data-aos="fade-right" className="border-l-4 border-indigo-600 pl-4">
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                        User Directory
                        <span className="ml-3 px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full">
                            {userStats?.total?.value || 0} Users
                        </span>
                    </h2>
                    <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3" data-aos="fade-left">
                    <button
                        onClick={handleAddUser}
                        className="flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl 
                        hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg 
                        hover:shadow-indigo-200 transform hover:-translate-y-0.5"
                    >
                        <MdPersonAdd className="mr-2 text-xl" />
                        <span className="font-medium">Add User</span>
                    </button>                    <button
                        onClick={handleRefresh}
                        disabled={loading}
                        className="flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 
                        transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5 disabled:opacity-50"
                    >
                        <MdRefresh className={`mr-2 text-xl ${loading ? 'animate-spin' : ''}`} />
                        <span className="font-medium">Refresh</span>
                    </button>
                </div>
            </div>

            {/* Enhanced User Statistics Cards with animations and trends */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-aos="fade-up">
                <div className="relative bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl shadow-sm hover:shadow-md 
                    transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden">
                    <div className="absolute w-20 h-20 rounded-full bg-indigo-100 -right-6 -top-6 opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm text-indigo-700 font-medium mb-1">Total Users</div>                            <div className="text-3xl font-bold text-indigo-900">{userStats?.total?.value || 0}</div>
                            <div className={`flex items-center mt-1 text-xs font-semibold ${userStats?.total?.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{userStats?.total?.trend || '+0%'}</span>
                                <svg className={`w-3 h-3 ml-1 ${!userStats?.total?.isPositive && 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                <span className="ml-1 text-gray-500">vs last month</span>
                            </div>
                        </div>
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 group-hover:bg-indigo-200 transition-colors">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="relative bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-sm hover:shadow-md 
                    transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden">
                    <div className="absolute w-20 h-20 rounded-full bg-green-100 -right-6 -top-6 opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm text-green-700 font-medium mb-1">Active Users</div>                            <div className="text-3xl font-bold text-green-900">{userStats?.active?.value || 0}</div>
                            <div className={`flex items-center mt-1 text-xs font-semibold ${userStats?.active?.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{userStats?.active?.trend || '+0%'}</span>
                                <svg className={`w-3 h-3 ml-1 ${!userStats?.active?.isPositive && 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                <span className="ml-1 text-gray-500">vs last month</span>
                            </div>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg text-green-600 group-hover:bg-green-200 transition-colors">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl shadow-sm hover:shadow-md 
                    transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden">
                    <div className="absolute w-20 h-20 rounded-full bg-amber-100 -right-6 -top-6 opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm text-amber-700 font-medium mb-1">Dosen</div>                            <div className="text-3xl font-bold text-amber-900">{userStats?.dosen?.value || 0}</div>
                            <div className={`flex items-center mt-1 text-xs font-semibold ${userStats?.dosen?.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{userStats?.dosen?.trend || '+0%'}</span>
                                <svg className={`w-3 h-3 ml-1 ${!userStats?.dosen?.isPositive && 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                <span className="ml-1 text-gray-500">vs last month</span>
                            </div>
                        </div>
                        <div className="p-2 bg-amber-100 rounded-lg text-amber-600 group-hover:bg-amber-200 transition-colors">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-sm hover:shadow-md 
                    transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden">
                    <div className="absolute w-20 h-20 rounded-full bg-purple-100 -right-6 -top-6 opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm text-purple-700 font-medium mb-1">Reviewers</div>                            <div className="text-3xl font-bold text-purple-900">{userStats?.reviewers?.value || 0}</div>
                            <div className={`flex items-center mt-1 text-xs font-semibold ${userStats?.reviewers?.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{userStats?.reviewers?.trend || '+0%'}</span>
                                <svg className={`w-3 h-3 ml-1 ${!userStats?.reviewers?.isPositive && 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                <span className="ml-1 text-gray-500">vs last month</span>
                            </div>
                        </div>
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600 group-hover:bg-purple-200 transition-colors">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional mini stats row */}
            <div className="flex flex-wrap gap-4 mb-8" data-aos="fade-up" data-aos-delay="100">
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-sm text-gray-600">Admins: <span className="font-semibold text-gray-900">{userStats?.admins || 0}</span></span>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-600">Wadir: <span className="font-semibold text-gray-900">{userStats?.wadir || 0}</span></span>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="text-sm text-gray-600">Inactive: <span className="font-semibold text-gray-900">{userStats?.inactive || 0}</span></span>
                </div>                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Recently Active: <span className="font-semibold text-gray-900">{userStats?.recentlyActive || 0}</span></span>
                </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0" data-aos="fade-up">
                <div className="flex items-center relative w-full md:w-1/3">
                    <MdSearch className="absolute left-3 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex space-x-2">
                    <select
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="dosen">Dosen</option>
                        <option value="reviewer">Reviewer</option>
                        <option value="wadir">Wadir</option>
                    </select>
                    <select
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>                    <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        <MdFilterList className="mr-1" />
                        Filters
                    </button>
                </div>
            </div>

            {/* Error and Loading Messages */}
            {message.text && (
                <div className={`mb-6 p-4 rounded-lg flex items-center ${message.type === 'error'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-green-50 text-green-700 border border-green-200'
                    }`} data-aos="fade-down">
                    {message.type === 'error' ? <MdWarning className="mr-2" /> : <MdCheckCircle className="mr-2" />}
                    {message.text}
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center" data-aos="fade-down">
                    <MdWarning className="mr-2" />
                    {error}
                    {!isAuthenticated && (
                        <button
                            onClick={retryAuth}
                            className="ml-4 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                        >
                            Retry Authentication
                        </button>
                    )}
                </div>
            )}

            {/* Authentication Status */}
            {!isAuthenticated && !error && (
                <div className="mb-6 p-4 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg flex items-center justify-between" data-aos="fade-down">
                    <div className="flex items-center">
                        <MdWarning className="mr-2" />
                        <span>Authentication required to load user data</span>
                    </div>
                    <button
                        onClick={retryAuth}
                        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                    >
                        Login & Load Data
                    </button>
                </div>
            )}

            {/* Loading Overlay */}
            {loading && (
                <div className="mb-6 p-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg flex items-center" data-aos="fade-down">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                    Loading users...
                </div>
            )}

            {/* User Table */}
            <div className="overflow-x-auto rounded-lg shadow" data-aos="fade-up" data-aos-delay="100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>                            <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort("full_name")}
                        >
                            <div className="flex items-center">
                                Name
                                {sortField === "full_name" && (
                                    <span className="ml-1">
                                        {sortDirection === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </div>
                        </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Department
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Login
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.length > 0 ? (
                            currentItems.map((user) => (
                                <tr key={user.user_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">                                        <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                            {getRoleIcon(user.role)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user.full_name || user.name}</div>
                                            <div className="text-sm text-gray-500">ID: {user.user_id}</div>
                                        </div>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : ''}
                      ${user.role === 'dosen' ? 'bg-green-100 text-green-800' : ''}
                      ${user.role === 'reviewer' ? 'bg-amber-100 text-amber-800' : ''}
                      ${user.role === 'wadir' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </td>                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.department || 'Not specified'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    `}>
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </td>                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.last_login
                                            ? new Date(user.last_login).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })
                                            : 'Never'
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleViewUser(user)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                                title="View details"
                                            >
                                                <MdVisibility size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleEditUser(user.user_id)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Edit user"
                                            >
                                                <MdEdit size={20} />
                                            </button>                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Delete user"
                                            >
                                                <MdDelete size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                    No users found matching your criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{((pagination.current_page - 1) * pagination.items_per_page) + 1}</span> to{" "}
                            <span className="font-medium">
                                {Math.min(pagination.current_page * pagination.items_per_page, pagination.total_items)}
                            </span>{" "}
                            of <span className="font-medium">{pagination.total_items}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={() => setCurrentPage(pagination.current_page > 1 ? pagination.current_page - 1 : 1)}
                                disabled={pagination.current_page === 1 || loading}
                                className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${pagination.current_page === 1 || loading
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                <MdKeyboardArrowLeft className="h-5 w-5" />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page
                                        ? "bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        : "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                disabled={currentPage === totalPages}
                                className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${currentPage === totalPages
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                <MdKeyboardArrowRight className="h-5 w-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>            {/* Enhanced User Detail Modal */}
            {showUserModal && selectedUser && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 rounded-t-xl">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        {getRoleIcon(selectedUser.role)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">User Profile</h2>
                                        <p className="text-indigo-100 text-sm">{selectedUser.full_name}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowUserModal(false)}
                                    className="text-white hover:text-indigo-200 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10"
                                >
                                    <MdClose size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* Profile Section */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                        <MdPersonOutline className="mr-2 text-indigo-600" />
                                        Profile Information
                                    </h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedUser.status === 'active'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {selectedUser.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <div className="flex items-center text-sm text-gray-500 mb-1">
                                            <MdPersonOutline className="mr-2" />
                                            Full Name
                                        </div>
                                        <p className="font-medium text-gray-900">{selectedUser.full_name}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center text-sm text-gray-500 mb-1">
                                            <MdEmail className="mr-2" />
                                            Email Address
                                        </div>
                                        <p className="font-medium text-gray-900">{selectedUser.email}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center text-sm text-gray-500 mb-1">
                                            <MdWork className="mr-2" />
                                            Role
                                        </div>
                                        <div className="flex items-center">
                                            {getRoleIcon(selectedUser.role)}
                                            <span className="ml-2 font-medium text-gray-900 capitalize">{selectedUser.role}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center text-sm text-gray-500 mb-1">
                                            <MdBusiness className="mr-2" />
                                            Department
                                        </div>
                                        <p className="font-medium text-gray-900">{selectedUser.department || 'Not specified'}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center text-sm text-gray-500 mb-1">
                                            <MdBusiness className="mr-2" />
                                            Faculty
                                        </div>
                                        <p className="font-medium text-gray-900">{selectedUser.faculty || 'Not specified'}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center text-sm text-gray-500 mb-1">
                                            <MdWork className="mr-2" />
                                            Position
                                        </div>
                                        <p className="font-medium text-gray-900">{selectedUser.position || 'Not specified'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Section */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                                    <MdAccessTime className="mr-2 text-indigo-600" />
                                    Activity Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <div className="flex items-center text-sm text-gray-500 mb-1">
                                            <MdDateRange className="mr-2" />
                                            Account Created
                                        </div>
                                        <p className="font-medium text-gray-900">
                                            {new Date(selectedUser.created_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center text-sm text-gray-500 mb-1">
                                            <MdAccessTime className="mr-2" />
                                            Last Login
                                        </div>
                                        <p className="font-medium text-gray-900">
                                            {selectedUser.last_login
                                                ? new Date(selectedUser.last_login).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })
                                                : 'Never logged in'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-100 px-6 py-4 rounded-b-xl">
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowUserModal(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => handleEditUser(selectedUser.user_id)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center"
                                >
                                    <MdEdit className="mr-2" />
                                    Edit User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditUserModal && editUserData && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4 rounded-t-xl">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <MdEdit className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Edit User</h2>
                                        <p className="text-amber-100 text-sm">{editUserData.full_name}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowEditUserModal(false);
                                        setEditUserData(null);
                                    }}
                                    className="text-white hover:text-amber-200 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10"
                                >
                                    <MdClose size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const userData = {
                                full_name: formData.get('full_name'),
                                email: formData.get('email'),
                                role: formData.get('role'),
                                department: formData.get('department'),
                                faculty: formData.get('faculty'),
                                position: formData.get('position'),
                                status: formData.get('status')
                            };
                            handleUpdateUser(userData);
                        }}>
                            <div className="p-6 space-y-6">
                                {/* Basic Information */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <MdPersonOutline className="mr-2 text-amber-600" />
                                        Basic Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <MdPersonOutline className="inline mr-1" />
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="full_name"
                                                defaultValue={editUserData.full_name}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <MdEmail className="inline mr-1" />
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                defaultValue={editUserData.email}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Role and Department */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <MdWork className="mr-2 text-amber-600" />
                                        Role & Department
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <MdWork className="inline mr-1" />
                                                Role *
                                            </label>
                                            <select
                                                name="role"
                                                defaultValue={editUserData.role}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="wadir">Wadir</option>
                                                <option value="dosen">Dosen</option>
                                                <option value="reviewer">Reviewer</option>
                                                <option value="bendahara">Bendahara</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Status *
                                            </label>
                                            <select
                                                name="status"
                                                defaultValue={editUserData.status}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <MdBusiness className="inline mr-1" />
                                                Department
                                            </label>
                                            <input
                                                type="text"
                                                name="department"
                                                defaultValue={editUserData.department || ''}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <MdBusiness className="inline mr-1" />
                                                Faculty
                                            </label>
                                            <input
                                                type="text"
                                                name="faculty"
                                                defaultValue={editUserData.faculty || ''}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <MdWork className="inline mr-1" />
                                                Position
                                            </label>
                                            <input
                                                type="text"
                                                name="position"
                                                defaultValue={editUserData.position || ''}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-100 px-6 py-4 rounded-b-xl">
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowEditUserModal(false);
                                            setEditUserData(null);
                                        }}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium flex items-center"
                                        disabled={actionLoading}
                                    >
                                        <MdCancel className="mr-2" />
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium flex items-center disabled:opacity-50"
                                        disabled={actionLoading}
                                    >
                                        {actionLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <MdSave className="mr-2" />
                                                Update User
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}            {/* Add User Modal */}
            {showAddUserModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <AddNewUser
                            onCancel={() => setShowAddUserModal(false)}
                            onSuccess={handleCreateUser}
                        />
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && userToDelete && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <div className="flex items-center mb-4">
                            <MdWarning className="text-red-600 mr-3" size={24} />
                            <h2 className="text-xl font-bold text-gray-800">Confirm Delete</h2>
                        </div>

                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete user <strong>{userToDelete.full_name}</strong>?
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setUserToDelete(null);
                                }}
                                disabled={actionLoading}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteUser}
                                disabled={actionLoading}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center"
                            >
                                {actionLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete User'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDirectory;
