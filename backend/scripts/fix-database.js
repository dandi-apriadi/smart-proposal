import db from '../config/Database.js';
import { User, Department } from '../models/index.js';

const fixDatabase = async () => {
    try {
        console.log('Starting database fix...');

        // Connect to database
        await db.authenticate();
        console.log('Database connection established.');

        // Check current table structure
        console.log('Checking current table indexes...');

        // Query to check number of indexes on users table
        const [results] = await db.query(`
            SELECT COUNT(*) as index_count 
            FROM INFORMATION_SCHEMA.STATISTICS 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'users'
        `);

        console.log(`Current number of indexes on users table: ${results[0].index_count}`);

        // If too many indexes, we need to drop some foreign keys
        if (results[0].index_count >= 60) {
            console.log('Too many indexes detected. Dropping unnecessary foreign key constraints...');

            // Get list of foreign keys
            const [foreignKeys] = await db.query(`
                SELECT CONSTRAINT_NAME 
                FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
                WHERE TABLE_SCHEMA = DATABASE() 
                AND TABLE_NAME = 'users' 
                AND CONSTRAINT_NAME != 'PRIMARY' 
                AND REFERENCED_TABLE_NAME IS NOT NULL
            `);

            console.log('Found foreign keys:', foreignKeys.map(fk => fk.CONSTRAINT_NAME));

            // Drop foreign key constraints that are causing issues
            for (const fk of foreignKeys) {
                try {
                    await db.query(`ALTER TABLE users DROP FOREIGN KEY ${fk.CONSTRAINT_NAME}`);
                    console.log(`Dropped foreign key: ${fk.CONSTRAINT_NAME}`);
                } catch (dropError) {
                    console.log(`Could not drop ${fk.CONSTRAINT_NAME}:`, dropError.message);
                }
            }

            // Drop indexes that are not primary key
            const [indexes] = await db.query(`
                SELECT INDEX_NAME 
                FROM INFORMATION_SCHEMA.STATISTICS 
                WHERE TABLE_SCHEMA = DATABASE() 
                AND TABLE_NAME = 'users' 
                AND INDEX_NAME != 'PRIMARY'
                GROUP BY INDEX_NAME
            `);

            for (const index of indexes) {
                try {
                    await db.query(`ALTER TABLE users DROP INDEX ${index.INDEX_NAME}`);
                    console.log(`Dropped index: ${index.INDEX_NAME}`);
                } catch (dropError) {
                    console.log(`Could not drop index ${index.INDEX_NAME}:`, dropError.message);
                }
            }
        }

        // Add required columns if they don't exist
        try {
            await db.query(`ALTER TABLE users ADD COLUMN department_id VARCHAR(36)`);
            console.log('Added department_id column');
        } catch (error) {
            if (error.message.includes('Duplicate column name')) {
                console.log('department_id column already exists');
            } else {
                console.log('Error adding department_id:', error.message);
            }
        }

        try {
            await db.query(`ALTER TABLE users ADD COLUMN head_id VARCHAR(36)`);
            console.log('Added head_id column');
        } catch (error) {
            if (error.message.includes('Duplicate column name')) {
                console.log('head_id column already exists');
            } else {
                console.log('Error adding head_id:', error.message);
            }
        }

        console.log('Database fix completed successfully!');

        // Final index count check
        const [finalResults] = await db.query(`
            SELECT COUNT(*) as index_count 
            FROM INFORMATION_SCHEMA.STATISTICS 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'users'
        `);

        console.log(`Final number of indexes on users table: ${finalResults[0].index_count}`);

    } catch (error) {
        console.error('Error fixing database:', error);
    } finally {
        await db.close();
    }
};

// Run the fix
fixDatabase();
