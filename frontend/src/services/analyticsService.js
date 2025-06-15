import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const analyticsAPI = axios.create({
    baseURL: `${API_BASE_URL}/api/analytics`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

console.log('Analytics API Base URL:', `${API_BASE_URL}/api/analytics`);

// Add request interceptor for authentication
analyticsAPI.interceptors.request.use(
    (config) => {
        // Debug log
        console.log('Analytics API Request URL:', config.baseURL + config.url);
        // Remove token-based auth since backend uses session-based auth
        // Just ensure credentials are included for session cookies
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
analyticsAPI.interceptors.response.use(
    (response) => {
        console.log('Analytics API Success:', response.config.url);
        return response;
    },
    (error) => {
        console.error('Analytics API Error:', error.config?.url, error.response?.status, error.response?.data || error.message);

        if (error.response?.status === 401) {
            // Handle unauthorized access - redirect to login
            console.warn('Unauthorized access - user needs to login');
            // Don't automatically redirect, let the component handle it
        }

        return Promise.reject(error);
    }
);

// Analytics service functions
export const analyticsService = {
    // Get user overview statistics
    getUserOverview: async (timeRange = 'yearly') => {
        try {
            const response = await analyticsAPI.get('/overview', {
                params: { timeRange }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user overview:', error);
            throw error;
        }
    },

    // Get user role distribution
    getUserRoles: async () => {
        try {
            const response = await analyticsAPI.get('/roles');
            return response.data;
        } catch (error) {
            console.error('Error fetching user roles:', error);
            throw error;
        }
    },

    // Get user activity trends
    getUserActivity: async (timeRange = 'yearly') => {
        try {
            const response = await analyticsAPI.get('/activity', {
                params: { timeRange }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user activity:', error);
            throw error;
        }
    },

    // Get registration trends
    getRegistrationTrends: async (timeRange = 'yearly') => {
        try {
            const response = await analyticsAPI.get('/registration-trends', {
                params: { timeRange }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching registration trends:', error);
            throw error;
        }
    },

    // Get department distribution
    getDepartmentDistribution: async () => {
        try {
            const response = await analyticsAPI.get('/department-distribution');
            return response.data;
        } catch (error) {
            console.error('Error fetching department distribution:', error);
            throw error;
        }
    },

    // Get user status distribution
    getUserStatus: async () => {
        try {
            const response = await analyticsAPI.get('/user-status');
            return response.data;
        } catch (error) {
            console.error('Error fetching user status:', error);
            throw error;
        }
    },

    // Get user insights overview
    getUserInsightsOverview: async () => {
        try {
            const response = await analyticsAPI.get('/insights/overview');
            return response.data;
        } catch (error) {
            console.error('Error fetching user insights overview:', error);
            throw error;
        }
    },

    // Get engagement metrics
    getEngagementMetrics: async () => {
        try {
            const response = await analyticsAPI.get('/insights/engagement');
            return response.data;
        } catch (error) {
            console.error('Error fetching engagement metrics:', error);
            throw error;
        }
    },

    // Get retention metrics
    getRetentionMetrics: async () => {
        try {
            const response = await analyticsAPI.get('/insights/retention');
            return response.data;
        } catch (error) {
            console.error('Error fetching retention metrics:', error);
            throw error;
        }
    },

    // Get all analytics data in one call
    getAllAnalytics: async (timeRange = 'yearly') => {
        try {
            const response = await analyticsAPI.get('/all', {
                params: { timeRange }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching all analytics:', error);
            throw error;
        }
    }
};

export default analyticsService;
