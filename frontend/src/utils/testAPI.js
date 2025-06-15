import { userService } from '../services/userService';

// Test functions for API connectivity
export const testAPI = {
    // Test basic connectivity
    testConnection: async () => {
        try {
            console.log('🔍 Testing API connection...');

            // Test health endpoint
            const response = await fetch('http://localhost:5000/api/health', {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                console.log('✅ API Connection successful:', data);
                return { success: true, data };
            } else {
                console.log('❌ API Connection failed:', response.status);
                return { success: false, error: 'Connection failed' };
            }
        } catch (error) {
            console.log('❌ API Connection error:', error.message);
            return { success: false, error: error.message };
        }
    },

    // Test user endpoints
    testUserEndpoints: async () => {
        console.log('🧪 Testing User Management endpoints...');

        const tests = [];

        // Test 1: Get user stats
        try {
            console.log('Testing getUserStats...');
            const statsResult = await userService.getUserStats();
            tests.push({
                endpoint: 'GET /api/users/stats',
                success: statsResult.success,
                message: statsResult.message,
                data: statsResult.success ? 'Stats retrieved' : statsResult.message
            });
        } catch (error) {
            tests.push({
                endpoint: 'GET /api/users/stats',
                success: false,
                message: 'Error testing stats endpoint',
                data: error.message
            });
        }

        // Test 2: Get all users
        try {
            console.log('Testing getAllUsers...');
            const usersResult = await userService.getAllUsers({ page: 1, limit: 5 });
            tests.push({
                endpoint: 'GET /api/users',
                success: usersResult.success,
                message: usersResult.message,
                data: usersResult.success ? `${usersResult.data?.users?.length || 0} users found` : usersResult.message
            });
        } catch (error) {
            tests.push({
                endpoint: 'GET /api/users',
                success: false,
                message: 'Error testing users endpoint',
                data: error.message
            });
        }

        // Display results
        console.log('\n📊 Test Results:');
        tests.forEach(test => {
            const status = test.success ? '✅' : '❌';
            console.log(`${status} ${test.endpoint}: ${test.message}`);
            if (test.data) console.log(`   Data: ${test.data}`);
        });

        return tests;
    },

    // Test create user (with dummy data)
    testCreateUser: async () => {
        console.log('🧪 Testing Create User endpoint...');

        const testUser = {
            username: `test_${Date.now()}`,
            password: 'TestPassword123!',
            email: `test${Date.now()}@polimdo.ac.id`,
            full_name: 'Test User',
            role: 'dosen',
            department: 'Computer Science',
            status: 'active'
        };

        try {
            const result = await userService.createUser(testUser);
            console.log('✅ Create user test:', result.success ? 'SUCCESS' : 'FAILED');
            console.log('Message:', result.message);

            if (result.success && result.data) {
                console.log('Created user ID:', result.data.id);

                // Try to clean up (delete the test user)
                try {
                    await userService.deleteUser(result.data.id);
                    console.log('🧹 Test user cleaned up successfully');
                } catch (cleanupError) {
                    console.log('⚠️ Could not clean up test user:', cleanupError.message);
                }
            }

            return result;
        } catch (error) {
            console.log('❌ Create user test failed:', error.message);
            return { success: false, message: error.message };
        }
    },

    // Run all tests
    runAllTests: async () => {
        console.log('🚀 Starting comprehensive API tests for User Management...\n');

        const results = {
            connection: await testAPI.testConnection(),
            userEndpoints: await testAPI.testUserEndpoints(),
            createUser: await testAPI.testCreateUser()
        };

        console.log('\n📋 Summary:');
        console.log('Connection:', results.connection.success ? '✅ OK' : '❌ FAILED');
        console.log('User Endpoints:', results.userEndpoints.every(t => t.success) ? '✅ OK' : '❌ SOME FAILED');
        console.log('Create User:', results.createUser.success ? '✅ OK' : '❌ FAILED');

        return results;
    }
};

// Usage in browser console:
// import { testAPI } from './utils/testAPI';
// testAPI.runAllTests();

export default testAPI;
