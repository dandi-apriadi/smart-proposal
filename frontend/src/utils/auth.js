import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance for auth
const authAPI = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Test login function - for development/testing purposes
export const testLogin = async () => {
    try {
        const response = await authAPI.post('/api/shared/login', {
            email: 'dandigeming85@gmail.com', // Test user email
            password: 'password123' // Test password - adjust as needed
        });

        console.log('Test login successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Test login failed:', error.response?.data || error.message);
        throw error;
    }
};

// Check current authentication status
export const checkAuth = async () => {
    try {
        const response = await authAPI.get('/api/shared/me');
        return { user: response.data };
    } catch (error) {
        console.error('Auth check failed:', error.response?.data || error.message);
        return null;
    }
};

// Logout function
export const logout = async () => {
    try {
        const response = await authAPI.delete('/api/shared/logout');
        return response.data;
    } catch (error) {
        console.error('Logout failed:', error.response?.data || error.message);
        throw error;
    }
};

// Authentication utility functions
export const authUtils = {
    testLogin,
    checkAuth,
    logout,

    // Auto-login for development/testing
    autoLogin: async () => {
        try {
            console.log('Attempting auto-login...');
            const authStatus = await checkAuth();

            if (authStatus && authStatus.user) {
                console.log('User already authenticated:', authStatus.user);
                return authStatus;
            }

            console.log('No existing session, attempting test login...');
            return await testLogin();
        } catch (error) {
            console.error('Auto-login failed:', error);
            return null;
        }
    }
};
