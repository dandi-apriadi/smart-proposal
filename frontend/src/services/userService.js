import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Important for session-based authentication
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            window.location.href = '/auth/sign-in';
        }
        return Promise.reject(error);
    }
);

// User Management Service Functions
export const userService = {
    // Get all users with pagination and filters
    getAllUsers: async (params = {}) => {
        try {
            const response = await api.get('/api/users', { params });
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch users',
                error: error.response?.data
            };
        }
    },

    // Get user statistics for dashboard
    getUserStats: async () => {
        try {
            const response = await api.get('/api/users/stats');
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch user statistics',
                error: error.response?.data
            };
        }
    },    // Get user by ID
    getUserById: async (userId) => {
        // Validate userId parameter
        if (!userId || userId === 'undefined') {
            return {
                success: false,
                message: 'Invalid user ID provided',
                error: 'User ID is required'
            };
        }

        try {
            const response = await api.get(`/api/users/${userId}`);
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch user',
                error: error.response?.data
            };
        }
    },    // Create new user
    createUser: async (userData) => {
        try {
            console.log('UserService - Creating user with data:', { ...userData, password: '[HIDDEN]' });
            const response = await api.post('/api/users', userData);
            console.log('UserService - Create user response:', response.data);
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            console.error('UserService - Create user error:', error.response?.data || error.message);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to create user',
                error: error.response?.data
            };
        }
    },

    // Update user
    updateUser: async (userId, userData) => {
        try {
            const response = await api.put(`/api/users/${userId}`, userData);
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update user',
                error: error.response?.data
            };
        }
    },    // Delete user
    deleteUser: async (userId) => {
        // Validate userId parameter
        if (!userId || userId === 'undefined') {
            return {
                success: false,
                message: 'Invalid user ID provided',
                error: 'User ID is required'
            };
        }

        try {
            const response = await api.delete(`/api/users/${userId}`);
            return {
                success: true,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to delete user',
                error: error.response?.data
            };
        }
    },

    // Change user password
    changePassword: async (userId, passwordData) => {
        try {
            const response = await api.patch(`/api/users/${userId}/password`, passwordData);
            return {
                success: true,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to change password',
                error: error.response?.data
            };
        }
    },

    // Update user status
    updateUserStatus: async (userId, status) => {
        try {
            const response = await api.patch(`/api/users/${userId}/status`, { status });
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update user status',
                error: error.response?.data
            };
        }
    },

    // Get users by role
    getUsersByRole: async (role) => {
        try {
            const response = await api.get(`/api/users/role/${role}`);
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch users by role',
                error: error.response?.data
            };
        }
    },

    // Update last login
    updateLastLogin: async (userId) => {
        try {
            const response = await api.patch(`/api/users/${userId}/last-login`);
            return {
                success: true,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update last login',
                error: error.response?.data
            };
        }
    }
};

export default userService;
