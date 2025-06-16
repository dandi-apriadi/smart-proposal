import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const dashboardAPI = axios.create({
    baseURL: `${API_BASE_URL}/api/dashboard`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

console.log('Dashboard API Base URL:', `${API_BASE_URL}/api/dashboard`);

// Add request interceptor for authentication
dashboardAPI.interceptors.request.use(
    (config) => {
        console.log('🔗 Dashboard API Request:', config.baseURL + config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
dashboardAPI.interceptors.response.use(
    (response) => {
        console.log('✅ Dashboard API Success:', response.config.url, response.status);
        return response;
    },
    (error) => {
        console.error('❌ Dashboard API Error:', error.config?.url, error.response?.status, error.response?.data || error.message);

        if (error.response?.status === 401) {
            console.warn('🔐 Unauthorized access - user needs to login');
        }

        return Promise.reject(error);
    }
);

// Dashboard service functions
export const dashboardService = {
    // Test API connection
    testConnection: async () => {
        try {
            const response = await dashboardAPI.get('/test');
            return {
                success: true,
                data: response.data,
                message: 'API connection successful'
            };
        } catch (error) {
            console.error('API connection test failed:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                message: 'API connection failed'
            };
        }
    },    // Get admin dashboard data
    getAdminDashboard: async () => {
        try {
            console.log('🔄 Attempting to fetch admin dashboard data...');
            // Try authenticated endpoint first
            const response = await dashboardAPI.get('/admin');
            console.log('✅ Admin dashboard data fetched successfully (authenticated)');
            return {
                success: true,
                data: response.data.data,
                isDemo: false
            };
        } catch (error) {
            console.warn('⚠️ Authenticated admin dashboard failed, trying demo data:', error.response?.status);

            // If authentication fails (401) or server error (500), try demo endpoint
            if (error.response?.status === 401 || error.response?.status === 500) {
                try {
                    console.log('🔄 Fetching demo dashboard data...');
                    const demoResponse = await dashboardAPI.get('/demo');
                    console.log('✅ Demo dashboard data fetched successfully');
                    return {
                        success: true,
                        data: demoResponse.data.data,
                        isDemo: true,
                        message: 'Using demo data - please login for live data'
                    };
                } catch (demoError) {
                    console.error('❌ Demo dashboard also failed:', demoError);
                }
            }

            console.error('❌ Error fetching admin dashboard:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                data: null
            };
        }
    },

    // Get wadir dashboard data
    getWadirDashboard: async () => {
        try {
            const response = await dashboardAPI.get('/wadir');
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('Error fetching wadir dashboard:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                data: null
            };
        }
    },

    // Get dosen dashboard data
    getDosenDashboard: async () => {
        try {
            const response = await dashboardAPI.get('/dosen');
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('Error fetching dosen dashboard:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                data: null
            };
        }
    },

    // Get reviewer dashboard data
    getReviewerDashboard: async () => {
        try {
            const response = await dashboardAPI.get('/reviewer');
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('Error fetching reviewer dashboard:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                data: null
            };
        }
    },

    // Get bendahara dashboard data
    getBendaharaDashboard: async () => {
        try {
            const response = await dashboardAPI.get('/bendahara');
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('Error fetching bendahara dashboard:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                data: null
            };
        }
    },

    // Auto-detect dashboard based on user role
    getDashboard: async () => {
        try {
            const response = await dashboardAPI.get('/');
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('Error fetching dashboard:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                data: null
            };
        }
    }
};

export default dashboardService;
