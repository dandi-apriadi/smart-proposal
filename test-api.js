// Simple test script to check if the API is working
const axios = require('axios');

async function testAPI() {
    const baseURL = 'http://localhost:5000';

    console.log('Testing API connection...\n');

    try {
        // Test basic server response
        console.log('1. Testing server connection...');
        const serverResponse = await axios.get(`${baseURL}/`);
        console.log('✅ Server is running');

        // Test dashboard API test endpoint
        console.log('\n2. Testing dashboard API test endpoint...');
        const testResponse = await axios.get(`${baseURL}/api/dashboard/test`);
        console.log('✅ Dashboard API test endpoint is working');
        console.log('Response:', testResponse.data);

        // Test dashboard demo endpoint
        console.log('\n3. Testing dashboard demo endpoint...');
        const demoResponse = await axios.get(`${baseURL}/api/dashboard/demo`);
        console.log('✅ Dashboard demo endpoint is working');
        console.log('Demo data preview:', {
            overview: demoResponse.data.data.overview,
            isDemo: demoResponse.data.isDemo
        });

        console.log('\n🎉 All API tests passed!');

    } catch (error) {
        console.error('❌ API Test Failed:');
        if (error.code === 'ECONNREFUSED') {
            console.error('Cannot connect to server. Make sure the backend server is running on port 5000.');
        } else {
            console.error('Error:', error.response?.status, error.response?.data || error.message);
        }
    }
}

testAPI();
