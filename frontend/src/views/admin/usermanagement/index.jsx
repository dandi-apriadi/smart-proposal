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
    MdMoreVert
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const UserDirectory = () => {
    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // State for search and filters
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [sortField, setSortField] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);

    // Dummy data for users
    const dummyUsers = [
        { id: 1, name: "John Doe", email: "john.doe@polimdo.ac.id", role: "admin", status: "active", department: "Computer Science", lastLogin: "2 hours ago", createdAt: "2024-03-15" },
        { id: 2, name: "Jane Smith", email: "jane.smith@polimdo.ac.id", role: "dosen", status: "active", department: "Information Systems", lastLogin: "1 day ago", createdAt: "2024-02-20" },
        { id: 3, name: "Robert Johnson", email: "r.johnson@polimdo.ac.id", role: "reviewer", status: "inactive", department: "Computer Science", lastLogin: "3 days ago", createdAt: "2024-01-10" },
        { id: 4, name: "Emily Davis", email: "e.davis@polimdo.ac.id", role: "wadir", status: "active", department: "Administration", lastLogin: "5 hours ago", createdAt: "2023-12-05" },
        { id: 5, name: "Michael Brown", email: "m.brown@polimdo.ac.id", role: "dosen", status: "active", department: "Electrical Engineering", lastLogin: "1 hour ago", createdAt: "2024-03-01" },
        { id: 6, name: "Sarah Wilson", email: "s.wilson@polimdo.ac.id", role: "dosen", status: "active", department: "Mechanical Engineering", lastLogin: "2 days ago", createdAt: "2024-02-15" },
        { id: 7, name: "David Moore", email: "d.moore@polimdo.ac.id", role: "reviewer", status: "active", department: "Civil Engineering", lastLogin: "4 hours ago", createdAt: "2024-01-25" },
        { id: 8, name: "Amanda Taylor", email: "a.taylor@polimdo.ac.id", role: "dosen", status: "inactive", department: "Business Administration", lastLogin: "1 week ago", createdAt: "2023-11-20" },
        { id: 9, name: "James Anderson", email: "j.anderson@polimdo.ac.id", role: "dosen", status: "active", department: "Physics", lastLogin: "3 hours ago", createdAt: "2024-03-10" },
        { id: 10, name: "Lisa Thomas", email: "l.thomas@polimdo.ac.id", role: "reviewer", status: "active", department: "Mathematics", lastLogin: "12 hours ago", createdAt: "2024-02-28" },
        { id: 11, name: "Richard White", email: "r.white@polimdo.ac.id", role: "dosen", status: "active", department: "Chemistry", lastLogin: "2 days ago", createdAt: "2024-01-15" },
        { id: 12, name: "Patricia Harris", email: "p.harris@polimdo.ac.id", role: "admin", status: "active", department: "IT Support", lastLogin: "6 hours ago", createdAt: "2023-12-20" },
    ];

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

    // Filter and sort users
    const filteredUsers = dummyUsers.filter(user => {
        return (
            (searchTerm === "" ||
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (roleFilter === "all" || user.role === roleFilter) &&
            (statusFilter === "all" || user.status === statusFilter)
        );
    }).sort((a, b) => {
        if (sortDirection === "asc") {
            return a[sortField] > b[sortField] ? 1 : -1;
        } else {
            return a[sortField] < b[sortField] ? 1 : -1;
        }
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    // Handle sorting
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    // User action handlers (dummy implementations)
    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    const handleEditUser = (userId) => {
        console.log("Edit user:", userId);
        // Would navigate to edit page or open edit modal
    };

    const handleDeleteUser = (userId) => {
        console.log("Delete user:", userId);
        // Would show confirmation dialog and handle deletion
    };

    const handleAddUser = () => {
        console.log("Add new user");
        // Would navigate to add user page or open add user modal
    };

    // Enhanced user statistics with trends
    const userStats = {
        total: {
            value: dummyUsers.length,
            trend: '+12%',
            isPositive: true
        },
        active: {
            value: dummyUsers.filter(u => u.status === "active").length,
            trend: '+8%',
            isPositive: true
        },
        dosen: {
            value: dummyUsers.filter(u => u.role === "dosen").length,
            trend: '+5%',
            isPositive: true
        },
        reviewers: {
            value: dummyUsers.filter(u => u.role === "reviewer").length,
            trend: '-2%',
            isPositive: false
        },
        admins: dummyUsers.filter(u => u.role === "admin").length,
        wadir: dummyUsers.filter(u => u.role === "wadir").length,
        inactive: dummyUsers.filter(u => u.status === "inactive").length,
        recentlyActive: dummyUsers.filter(u => u.lastLogin.includes("hour")).length
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
                            {userStats.total.value} Users
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
                    </button>
                    <button className="flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 
                    transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5">
                        <MdRefresh className="mr-2 text-xl" />
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
                            <div className="text-sm text-indigo-700 font-medium mb-1">Total Users</div>
                            <div className="text-3xl font-bold text-indigo-900">{userStats.total.value}</div>
                            <div className={`flex items-center mt-1 text-xs font-semibold ${userStats.total.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{userStats.total.trend}</span>
                                <svg className={`w-3 h-3 ml-1 ${!userStats.total.isPositive && 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                            <div className="text-sm text-green-700 font-medium mb-1">Active Users</div>
                            <div className="text-3xl font-bold text-green-900">{userStats.active.value}</div>
                            <div className={`flex items-center mt-1 text-xs font-semibold ${userStats.active.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{userStats.active.trend}</span>
                                <svg className={`w-3 h-3 ml-1 ${!userStats.active.isPositive && 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                            <div className="text-sm text-amber-700 font-medium mb-1">Dosen</div>
                            <div className="text-3xl font-bold text-amber-900">{userStats.dosen.value}</div>
                            <div className={`flex items-center mt-1 text-xs font-semibold ${userStats.dosen.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{userStats.dosen.trend}</span>
                                <svg className={`w-3 h-3 ml-1 ${!userStats.dosen.isPositive && 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                            <div className="text-sm text-purple-700 font-medium mb-1">Reviewers</div>
                            <div className="text-3xl font-bold text-purple-900">{userStats.reviewers.value}</div>
                            <div className={`flex items-center mt-1 text-xs font-semibold ${userStats.reviewers.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{userStats.reviewers.trend}</span>
                                <svg className={`w-3 h-3 ml-1 ${!userStats.reviewers.isPositive && 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <span className="text-sm text-gray-600">Admins: <span className="font-semibold text-gray-900">{userStats.admins}</span></span>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-600">Wadir: <span className="font-semibold text-gray-900">{userStats.wadir}</span></span>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="text-sm text-gray-600">Inactive: <span className="font-semibold text-gray-900">{userStats.inactive}</span></span>
                </div>

                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Recently Active: <span className="font-semibold text-gray-900">{userStats.recentlyActive}</span></span>
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
                    </select>
                    <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        <MdFilterList className="mr-1" />
                        Filters
                    </button>
                </div>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto rounded-lg shadow" data-aos="fade-up" data-aos-delay="100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort("name")}
                            >
                                <div className="flex items-center">
                                    Name
                                    {sortField === "name" && (
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
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                {getRoleIcon(user.role)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">ID: {user.id}</div>
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
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.department}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    `}>
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.lastLogin}
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
                                                onClick={() => handleEditUser(user.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Edit user"
                                            >
                                                <MdEdit size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
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
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                            <span className="font-medium">
                                {indexOfLastItem > filteredUsers.length ? filteredUsers.length : indexOfLastItem}
                            </span>{" "}
                            of <span className="font-medium">{filteredUsers.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                                disabled={currentPage === 1}
                                className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${currentPage === 1
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
            </div>

            {/* User Detail Modal (simplified) */}
            {showUserModal && selectedUser && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">User Details</h2>
                            <button
                                onClick={() => setShowUserModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-gray-600">Name</p>
                                <p className="font-medium">{selectedUser.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="font-medium">{selectedUser.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Role</p>
                                <p className="font-medium">{selectedUser.role}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Department</p>
                                <p className="font-medium">{selectedUser.department}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Status</p>
                                <p className="font-medium">{selectedUser.status}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Created</p>
                                <p className="font-medium">{selectedUser.createdAt}</p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4 border-t">
                            <button
                                onClick={() => handleEditUser(selectedUser.id)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Edit User
                            </button>
                            <button
                                onClick={() => setShowUserModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDirectory;
