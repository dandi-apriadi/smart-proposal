// Test backend analytics endpoints
const testBackendEndpoints = async () => {
    const axios = require('axios').default;
    const baseURL = 'http://localhost:5000';

    console.log('🧪 Testing Backend Analytics Endpoints...\n');

    const endpoints = [
        '/api/dashboard/test',
        '/api/dashboard/demo',
        '/api/analytics/system-overview',
        '/api/analytics/user-activity-metrics',
        '/api/analytics/proposal-statistics',
        '/api/analytics/active-session-status'
    ];

    for (const endpoint of endpoints) {
        try {
            console.log(`🔄 Testing: ${endpoint}`);

            const response = await axios.get(`${baseURL}${endpoint}`, {
                timeout: 5000,
                withCredentials: true
            });

            console.log(`✅ SUCCESS: ${response.status} - ${response.data.message || 'OK'}`);

            if (response.data.data) {
                console.log(`📊 Data keys: ${Object.keys(response.data.data).join(', ')}`);
            }

        } catch (error) {
            if (error.response) {
                console.log(`❌ ERROR: ${error.response.status} - ${error.response.data?.message || error.message}`);
            } else if (error.code === 'ECONNREFUSED') {
                console.log(`🔴 SERVER NOT RUNNING: ${baseURL}`);
                break;
            } else {
                console.log(`❌ ERROR: ${error.message}`);
            }
        }
        console.log('');
    }

    console.log('🏁 Backend test completed!');
};

testBackendEndpoints().catch(console.error);
