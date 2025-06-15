import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/userService';
import { authUtils } from '../utils/auth';

// Custom hook for user management operations
export const useUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [userStats, setUserStats] = useState({
        total: { value: 0, trend: '+0%', isPositive: true },
        active: { value: 0, trend: '+0%', isPositive: true },
        dosen: { value: 0, trend: '+0%', isPositive: true },
        reviewers: { value: 0, trend: '+0%', isPositive: true },
        admins: 0,
        wadir: 0,
        inactive: 0,
        recentlyActive: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        items_per_page: 10
    });

    // Initialize authentication on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                const authResult = await authUtils.autoLogin(); if (authResult) {
                    setIsAuthenticated(true);
                    console.log('Authentication successful');
                } else {
                    setIsAuthenticated(false);
                    setError('Authentication required. Please check your credentials.');
                }
            } catch (error) {
                console.error('Authentication initialization failed:', error);
                setIsAuthenticated(false);
                setError('Failed to authenticate. Please try logging in manually.');
            }
        };

        initAuth();
    }, []);

    // Fetch all users with filters and pagination
    const fetchUsers = useCallback(async (params = {}) => {
        if (!isAuthenticated) {
            console.log('Not authenticated, skipping user fetch');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await userService.getAllUsers(params);

            if (result.success) {
                setUsers(result.data.users || []);
                setPagination(result.data.pagination || pagination);
            } else {
                setError(result.message);
                setUsers([]);
            }
        } catch (err) {
            console.error('Fetch users error:', err);
            // Check if it's an authentication error
            if (err.response?.status === 401) {
                setIsAuthenticated(false);
                setError('Session expired. Please log in again.');
            } else {
                setError('Failed to fetch users');
            }
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);    // Fetch user statistics
    const fetchUserStats = useCallback(async () => {
        if (!isAuthenticated) {
            console.log('Not authenticated, skipping stats fetch');
            return;
        }

        try {
            const result = await userService.getUserStats();

            if (result.success) {
                setUserStats(result.data);
            } else {
                console.error('Failed to fetch user stats:', result.message);
            }
        } catch (err) {
            console.error('Error fetching user stats:', err);
        }
    }, [isAuthenticated]);

    // Fetch user stats when authentication changes
    useEffect(() => {
        if (isAuthenticated) {
            fetchUserStats();
        }
    }, [isAuthenticated, fetchUserStats]);

    // Create new user
    const createUser = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const result = await userService.createUser(userData);

            if (result.success) {
                // Refresh user list after creation
                await fetchUsers();
                await fetchUserStats();
                return { success: true, message: result.message, data: result.data };
            } else {
                setError(result.message);
                return { success: false, message: result.message };
            }
        } catch (err) {
            const errorMessage = 'Failed to create user';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Update user
    const updateUser = async (userId, userData) => {
        setLoading(true);
        setError(null);

        try {
            const result = await userService.updateUser(userId, userData);

            if (result.success) {
                // Update user in the list
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === userId ? { ...user, ...result.data } : user
                    )
                );
                await fetchUserStats();
                return { success: true, message: result.message };
            } else {
                setError(result.message);
                return { success: false, message: result.message };
            }
        } catch (err) {
            const errorMessage = 'Failed to update user';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Delete user
    const deleteUser = async (userId) => {
        setLoading(true);
        setError(null);

        try {
            const result = await userService.deleteUser(userId);

            if (result.success) {
                // Remove user from the list
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
                await fetchUserStats();
                return { success: true, message: result.message };
            } else {
                setError(result.message);
                return { success: false, message: result.message };
            }
        } catch (err) {
            const errorMessage = 'Failed to delete user';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Update user status
    const updateUserStatus = async (userId, status) => {
        try {
            const result = await userService.updateUserStatus(userId, status);

            if (result.success) {
                // Update user status in the list
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === userId ? { ...user, status } : user
                    )
                );
                await fetchUserStats();
                return { success: true, message: result.message };
            } else {
                return { success: false, message: result.message };
            }
        } catch (err) {
            return { success: false, message: 'Failed to update user status' };
        }
    };

    // Get user by ID
    const getUserById = async (userId) => {
        try {
            const result = await userService.getUserById(userId);
            return result;
        } catch (err) {
            return { success: false, message: 'Failed to fetch user details' };
        }
    };

    // Change user password
    const changePassword = async (userId, passwordData) => {
        try {
            const result = await userService.changePassword(userId, passwordData);
            return result;
        } catch (err) {
            return { success: false, message: 'Failed to change password' };
        }
    };

    // Get users by role
    const getUsersByRole = async (role) => {
        try {
            const result = await userService.getUsersByRole(role);
            return result;
        } catch (err) {
            return { success: false, message: 'Failed to fetch users by role' };
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchUsers();
        fetchUserStats();
    }, []);

    return {
        // Data
        users,
        userStats,
        loading,
        error,
        pagination,
        isAuthenticated,

        // Actions
        fetchUsers,
        fetchUserStats, createUser,
        updateUser,
        deleteUser,
        updateUserStatus,
        getUserById,
        changePassword,
        getUsersByRole,

        // Utilities
        clearError: () => setError(null),

        // Auth utilities
        retryAuth: async () => {
            try {
                const authResult = await authUtils.autoLogin();
                if (authResult) {
                    setIsAuthenticated(true);
                    setError(null);
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Retry auth failed:', error);
                return false;
            }
        }
    };
};

export default useUserManagement;
