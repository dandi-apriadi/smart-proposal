import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Token management utility
export const getAuthToken = () => {
    // Try multiple sources for the token
    const token = localStorage.getItem('token') ||
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('token') ||
        sessionStorage.getItem('authToken') ||
        getTokenFromReduxStore();

    console.log('🔍 Token search result:', token ? 'Found' : 'Not found');
    return token;
};

// Check if user is authenticated (for session-based auth)
export const isAuthenticated = () => {
    try {
        // Check if Redux store has user data
        const state = window.__REDUX_STORE__?.getState?.();
        const hasUser = !!(state?.auth?.user);

        console.log('🔍 Authentication check:', hasUser ? 'Authenticated' : 'Not authenticated');
        return hasUser;
    } catch (error) {
        console.warn('Could not check authentication status');
        return false;
    }
};

// Helper function to get token from Redux store
function getTokenFromReduxStore() {
    try {
        // Try to get token from Redux store if available
        const state = window.__REDUX_STORE__?.getState?.();
        return state?.auth?.token || state?.user?.token || null;
    } catch (error) {
        console.warn('Could not access Redux store for token');
        return null;
    }
}

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

        // For session-based auth, check if user is authenticated
        if (isAuthenticated()) {
            console.log('✅ User authenticated via session');
        } else {
            console.warn('⚠️ User not authenticated');
        }

        // Still try to add Bearer token if available (for JWT fallback)
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('🔐 Adding Bearer token to request');
        }

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
    getAdminDashboard: async (userToken = null) => {
        try {
            console.log('🔄 Attempting to fetch admin dashboard data...');
            console.log('🔐 User token provided:', !!userToken);
            console.log('🔐 Auth token available:', !!getAuthToken());
            console.log('👤 User authenticated:', isAuthenticated());

            // Set token for this specific request if provided
            const config = {};
            if (userToken) {
                config.headers = {
                    'Authorization': `Bearer ${userToken}`
                };
                console.log('🔐 Using provided token for request');
            }

            // Try authenticated endpoint first
            console.log('📡 Making request to /admin endpoint...');
            const response = await dashboardAPI.get('/admin', config);
            console.log('✅ Admin dashboard response received:', response.status);
            console.log('📊 Response data structure:', {
                hasData: !!response.data,
                dataKeys: response.data ? Object.keys(response.data) : [],
                hasDataField: !!response.data?.data,
                dataFieldKeys: response.data?.data ? Object.keys(response.data.data) : []
            });
            console.log('📊 Full response data:', response.data);

            console.log('✅ Admin dashboard data fetched successfully (authenticated)');
            return {
                success: true,
                data: response.data.data,
                isDemo: false
            };
        } catch (error) {
            console.warn('⚠️ Authenticated admin dashboard failed:', error.response?.status, error.response?.data?.message);
            console.log('❌ Error details:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                message: error.message
            });

            // If authentication fails (401) or server error (500), try demo endpoint
            if (error.response?.status === 401 || error.response?.status === 500) {
                try {
                    console.log('🔄 Fetching demo dashboard data as fallback...');
                    const demoResponse = await dashboardAPI.get('/demo');
                    console.log('✅ Demo dashboard response:', demoResponse.status);
                    console.log('📊 Demo data structure:', {
                        hasData: !!demoResponse.data,
                        dataKeys: demoResponse.data ? Object.keys(demoResponse.data) : [],
                        hasDataField: !!demoResponse.data?.data,
                        dataFieldKeys: demoResponse.data?.data ? Object.keys(demoResponse.data.data) : []
                    });
                    console.log('📊 Demo response data:', demoResponse.data);
                    console.log('✅ Demo dashboard data fetched successfully');
                    return {
                        success: true,
                        data: demoResponse.data.data,
                        isDemo: true,
                        message: 'Authentication failed - using demo data. Please login for live data.',
                        authError: error.response?.status === 401
                    };
                } catch (demoError) {
                    console.error('❌ Demo dashboard also failed:', demoError);
                    console.log('❌ Demo error details:', {
                        status: demoError.response?.status,
                        statusText: demoError.response?.statusText,
                        data: demoError.response?.data,
                        message: demoError.message
                    });
                    // Return fallback static data
                    const fallbackData = getFallbackDashboardData();
                    console.log('📊 Using static fallback data:', fallbackData);
                    return {
                        success: true,
                        data: fallbackData,
                        isDemo: true,
                        isFallback: true,
                        message: 'API unavailable - using static fallback data',
                        authError: error.response?.status === 401
                    };
                }
            } else {
                // For non-auth errors, still provide fallback data
                console.error('❌ Error fetching admin dashboard:', error);
                const fallbackData = getFallbackDashboardData();
                console.log('📊 Using static fallback data for non-auth error:', fallbackData);
                return {
                    success: false,
                    error: error.response?.data?.message || error.message,
                    data: fallbackData,
                    isDemo: true,
                    isFallback: true,
                    authError: error.response?.status === 401
                };
            }
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
    },    // Auto-detect dashboard based on user role
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
    },

    // Get system overview analytics (for /admin/system-overview route)
    getSystemOverview: async () => {
        try {
            console.log('🔄 Fetching system overview analytics...');
            const response = await axios.get(`${API_BASE_URL}/api/analytics/system-overview`, {
                withCredentials: true
            });
            console.log('✅ System overview analytics fetched successfully');
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('❌ Error fetching system overview analytics:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                data: null
            };
        }
    },

    // Get user activity metrics (for /admin/user-activity-metrics route)
    getUserActivityMetrics: async (timeRange = 'monthly') => {
        try {
            console.log('🔄 Fetching user activity metrics...');
            const response = await axios.get(`${API_BASE_URL}/api/analytics/user-activity-metrics`, {
                params: { timeRange },
                withCredentials: true
            });
            console.log('✅ User activity metrics fetched successfully');
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('❌ Error fetching user activity metrics:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                data: null
            };
        }
    },

    // Get proposal statistics (for /admin/proposal-statistics route)
    getProposalStatistics: async () => {
        try {
            console.log('🔄 Fetching proposal statistics...');
            const response = await axios.get(`${API_BASE_URL}/api/analytics/proposal-statistics`, {
                withCredentials: true
            });
            console.log('✅ Proposal statistics fetched successfully');
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('❌ Error fetching proposal statistics:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                data: null
            };
        }
    },

    // Get active session status (for /admin/active-session-status route)
    getActiveSessionStatus: async () => {
        try {
            console.log('🔄 Fetching active session status...');
            const response = await axios.get(`${API_BASE_URL}/api/analytics/active-session-status`, {
                withCredentials: true
            });
            console.log('✅ Active session status fetched successfully');
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('❌ Error fetching active session status:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                data: null
            };
        }
    }
};

// Fallback dashboard data for when API is unavailable
function getFallbackDashboardData() {
    console.log('📊 Generating fallback dashboard data...');
    const fallbackData = {
        overview: {
            totalProposals: 48,
            approvedProposals: 35,
            pendingReviews: 8,
            totalParticipants: 62,
            budgetAllocated: 2500000000,
            budgetUtilized: 1875000000
        },
        current_session: {
            id: 1,
            name: "Research Proposal Session 2025-1",
            description: "First research proposal session of 2025",
            status: "active",
            start_date: "2025-04-01T00:00:00Z",
            end_date: "2025-10-31T23:59:59Z",
            proposal_deadline: "2025-05-15T23:59:59Z",
            review_deadline: "2025-06-15T23:59:59Z",
            progress_report_deadline: "2025-08-15T23:59:59Z",
            final_report_deadline: "2025-10-15T23:59:59Z"
        },
        session_statistics: {
            total_participants: 62,
            submitted_proposals: 48,
            approved_proposals: 35,
            pending_reviews: 8,
            completed_reviews: 35
        },
        upcoming_deadlines: [
            {
                type: "proposal_deadline",
                date: "2025-05-15T23:59:59Z",
                days_remaining: -33
            },
            {
                type: "review_deadline",
                date: "2025-06-15T23:59:59Z",
                days_remaining: -2
            }
        ],
        recent_activities: [
            {
                id: 1,
                type: "proposal_submitted",
                user: "Dr. Ahmad Wahyudi",
                description: "Submitted proposal: Smart Campus IoT System",
                timestamp: new Date().toISOString(),
                status: "new"
            }, {
                id: 2,
                type: "review_completed",
                user: "Prof. Siti Aminah",
                description: "Completed review for proposal: Machine Learning for Agriculture",
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                status: "completed"
            }
        ]
    };

    console.log('📊 Fallback data generated:', fallbackData);
    console.log('📊 Fallback data keys:', Object.keys(fallbackData));
    console.log('📊 Current session in fallback:', fallbackData.current_session);
    console.log('📊 Session statistics in fallback:', fallbackData.session_statistics);

    return fallbackData;
}

// User Activity API Functions
export const getUserActivities = async (userToken = null, timeRange = 'today', limit = 10) => {
    try {
        console.log('🔄 Fetching user activities...', { timeRange, limit });

        const config = {};
        if (userToken) {
            config.headers = {
                'Authorization': `Bearer ${userToken}`
            };
        }

        // Calculate date range based on timeRange
        const now = new Date();
        let dateFrom = new Date();

        switch (timeRange) {
            case 'today':
                dateFrom.setHours(0, 0, 0, 0);
                break;
            case 'week':
                dateFrom.setDate(now.getDate() - 7);
                break;
            case 'month':
                dateFrom.setDate(now.getDate() - 30);
                break;
            default:
                dateFrom.setHours(0, 0, 0, 0);
        }

        const params = {
            limit,
            date_from: dateFrom.toISOString(),
            date_to: now.toISOString()
        };

        console.log('📡 Making request to activity logs endpoint...', params);
        const response = await dashboardAPI.get('/activity-logs', {
            ...config,
            params
        });

        console.log('✅ User activities fetched successfully:', response.data);
        return {
            success: true,
            data: response.data.data || response.data,
            source: 'api'
        };
    } catch (error) {
        console.error('❌ Failed to fetch user activities:', error);
        console.log('🔄 Falling back to dummy activity data...');

        // Return fallback dummy data
        const dummyActivities = generateDummyActivities(timeRange, limit);
        return {
            success: true,
            data: dummyActivities,
            source: 'fallback'
        };
    }
};

export const getUserStats = async (userToken = null) => {
    try {
        console.log('🔄 Fetching user statistics...');

        const config = {};
        if (userToken) {
            config.headers = {
                'Authorization': `Bearer ${userToken}`
            };
        }

        console.log('📡 Making request to user stats endpoint...');
        const response = await dashboardAPI.get('/users/stats', config);

        console.log('✅ User stats fetched successfully:', response.data);
        return {
            success: true,
            data: response.data.data || response.data,
            source: 'api'
        };
    } catch (error) {
        console.error('❌ Failed to fetch user stats:', error);
        console.log('🔄 Falling back to dummy user stats...');

        // Return fallback dummy data
        const dummyStats = generateDummyUserStats();
        return {
            success: true,
            data: dummyStats,
            source: 'fallback'
        };
    }
};

export const getActivityLogStats = async (userToken = null) => {
    try {
        console.log('🔄 Fetching activity log statistics...');

        const config = {};
        if (userToken) {
            config.headers = {
                'Authorization': `Bearer ${userToken}`
            };
        }

        console.log('📡 Making request to activity log stats endpoint...');
        const response = await dashboardAPI.get('/activity-logs/stats', config);

        console.log('✅ Activity log stats fetched successfully:', response.data);
        return {
            success: true,
            data: response.data.data || response.data,
            source: 'api'
        };
    } catch (error) {
        console.error('❌ Failed to fetch activity log stats:', error);
        console.log('🔄 Falling back to dummy activity log stats...');

        // Return fallback dummy data
        const dummyStats = generateDummyActivityStats();
        return {
            success: true,
            data: dummyStats,
            source: 'fallback'
        };
    }
};

// Helper function to generate dummy activities based on time range
const generateDummyActivities = (timeRange, limit) => {
    const activities = [];
    const now = new Date();

    const dummyTypes = ['login', 'edit', 'upload', 'view', 'delete', 'approve'];
    const dummyUsers = [
        { name: 'Dr. Ahmad Rahman', email: 'ahmad.rahman@university.ac.id', avatar: '/avatars/ahmad.jpg' },
        { name: 'Prof. Siti Aminah', email: 'siti.aminah@university.ac.id', avatar: '/avatars/siti.jpg' },
        { name: 'Dr. Budi Santoso', email: 'budi.santoso@university.ac.id', avatar: '/avatars/budi.jpg' },
        { name: 'Prof. Dewi Sartika', email: 'dewi.sartika@university.ac.id', avatar: '/avatars/dewi.jpg' }
    ];

    for (let i = 0; i < limit; i++) {
        const user = dummyUsers[i % dummyUsers.length];
        const type = dummyTypes[i % dummyTypes.length];
        const minutesAgo = Math.floor(Math.random() * 1440); // Random within last 24 hours
        const timestamp = new Date(now.getTime() - (minutesAgo * 60 * 1000));

        activities.push({
            id: `dummy-${i + 1}`,
            type: type,
            action: `${type}_action`,
            user: user.name,
            title: `User ${type} activity`,
            timestamp: timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            date: timestamp.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            status: 'success',
            details: `User performed ${type} action`,
            user_avatar: user.avatar,
            created_at: timestamp.toISOString(),
            user_email: user.email
        });
    }

    console.log('📊 Generated dummy activities:', activities);
    return {
        logs: activities,
        pagination: {
            current_page: 1,
            total_pages: 1,
            total_items: activities.length,
            items_per_page: limit
        }
    };
};

// Helper function to generate dummy user stats
const generateDummyUserStats = () => {
    return {
        total: {
            value: 78,
            trend: '+12.5%',
            isPositive: true
        },
        active: {
            value: 65,
            trend: '+8.2%',
            isPositive: true
        },
        dosen: {
            value: 45,
            trend: '+5.1%',
            isPositive: true
        },
        reviewers: {
            value: 12,
            trend: '+2.3%',
            isPositive: true
        },
        admins: 3,
        wadir: 2,
        inactive: 13,
        recentlyActive: 65
    };
};

// Helper function to generate dummy activity stats
const generateDummyActivityStats = () => {
    return {
        stats: [
            { type: 'proposal', status: 'success', count: 45 },
            { type: 'proposal', status: 'warning', count: 12 },
            { type: 'system', status: 'success', count: 78 },
            { type: 'document', status: 'success', count: 34 }
        ],
        totals: {
            total_logs: 169,
            today_logs: 23
        }
    };
};

export default dashboardService;
