import db from '../config/Database.js';

const addRequiredIndexes = async () => {
    try {
        console.log('Adding required indexes...');

        await db.authenticate();
        console.log('Database connection established.');

        // Add unique indexes for username and email
        try {
            await db.query(`CREATE UNIQUE INDEX idx_users_username ON users (username)`);
            console.log('Added unique index for username');
        } catch (error) {
            if (error.message.includes('Duplicate entry')) {
                console.log('Username index already exists or has duplicate values');
            } else {
                console.log('Error adding username index:', error.message);
            }
        }

        try {
            await db.query(`CREATE UNIQUE INDEX idx_users_email ON users (email)`);
            console.log('Added unique index for email');
        } catch (error) {
            if (error.message.includes('Duplicate entry')) {
                console.log('Email index already exists or has duplicate values');
            } else {
                console.log('Error adding email index:', error.message);
            }
        }

        // Add non-unique indexes for foreign keys (optional, for performance)
        try {
            await db.query(`CREATE INDEX idx_users_department_id ON users (department_id)`);
            console.log('Added index for department_id');
        } catch (error) {
            console.log('Department_id index:', error.message);
        }

        try {
            await db.query(`CREATE INDEX idx_users_head_id ON users (head_id)`);
            console.log('Added index for head_id');
        } catch (error) {
            console.log('Head_id index:', error.message);
        }

        // Check final index count
        const [results] = await db.query(`
            SELECT COUNT(*) as index_count 
            FROM INFORMATION_SCHEMA.STATISTICS 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'users'
        `);

        console.log(`Final number of indexes on users table: ${results[0].index_count}`);
        console.log('Required indexes added successfully!');

    } catch (error) {
        console.error('Error adding indexes:', error);
    } finally {
        await db.close();
    }
};

addRequiredIndexes();
