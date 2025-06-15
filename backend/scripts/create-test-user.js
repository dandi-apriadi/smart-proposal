import db from '../config/Database.js';
import { User } from '../models/userModel.js';
import argon2 from 'argon2';

const createTestUser = async () => {
    try {
        await db.authenticate();
        console.log('Database connected');

        // Check if test user exists
        const existingUser = await User.findOne({ where: { email: 'dandigeming85@gmail.com' } });

        if (existingUser) {
            console.log('Test user already exists:', {
                id: existingUser.user_id,
                email: existingUser.email,
                role: existingUser.role,
                status: existingUser.status,
                username: existingUser.username
            });

            // Update password to known value for testing
            const hashedPassword = await argon2.hash('password123');
            await existingUser.update({ password_hash: hashedPassword });
            console.log('Updated test user password');

        } else {
            console.log('Test user not found, creating new one...');

            // Hash password manually
            const hashedPassword = await argon2.hash('password123');

            // Create test user
            const testUser = await User.create({
                username: 'testadmin',
                full_name: 'Test Admin User',
                email: 'dandigeming85@gmail.com',
                password_hash: hashedPassword,
                role: 'admin',
                status: 'active',
                faculty: 'IT',
                department: 'Computer Science',
                position: 'Administrator'
            });
            console.log('Test user created:', testUser.user_id);
        }

        console.log('✅ Test user is ready with credentials:');
        console.log('Email: dandigeming85@gmail.com');
        console.log('Password: password123');
        console.log('Role: admin');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createTestUser();
