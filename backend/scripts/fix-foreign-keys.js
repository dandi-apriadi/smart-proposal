import mysql from 'mysql2/promise';

const fixForeignKeys = async () => {
    let connection;
    try {
        // Create connection
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'sp'
        });

        console.log('Connected to database');

        // Check if tables exist
        const [tableResults] = await connection.execute("SHOW TABLES LIKE 'users'");
        if (tableResults.length === 0) {
            console.log('Tables do not exist yet, no need to fix foreign keys');
            return;
        }

        // Get all foreign key constraints
        const [constraints] = await connection.execute(`
            SELECT 
                CONSTRAINT_NAME,
                TABLE_NAME,
                COLUMN_NAME,
                REFERENCED_TABLE_NAME,
                REFERENCED_COLUMN_NAME
            FROM information_schema.KEY_COLUMN_USAGE 
            WHERE TABLE_SCHEMA = 'sp' 
            AND REFERENCED_TABLE_NAME IS NOT NULL
            AND TABLE_NAME IN ('users', 'departments')
        `);

        console.log('Found foreign key constraints:', constraints.length);

        // Drop problematic constraints
        for (const constraint of constraints) {
            try {
                const dropQuery = `ALTER TABLE \`${constraint.TABLE_NAME}\` DROP FOREIGN KEY \`${constraint.CONSTRAINT_NAME}\``;
                console.log(`Dropping constraint: ${constraint.CONSTRAINT_NAME}`);
                await connection.execute(dropQuery);
                console.log(`✓ Dropped constraint: ${constraint.CONSTRAINT_NAME}`);
            } catch (error) {
                console.log(`⚠ Could not drop constraint ${constraint.CONSTRAINT_NAME}:`, error.message);
            }
        }

        // Also drop indexes that might be causing issues
        try {
            const [indexes] = await connection.execute(`
                SHOW INDEX FROM users WHERE Key_name != 'PRIMARY'
            `);

            console.log(`Found ${indexes.length} non-primary indexes on users table`);

            for (const index of indexes) {
                try {
                    await connection.execute(`DROP INDEX \`${index.Key_name}\` ON \`users\``);
                    console.log(`✓ Dropped index: ${index.Key_name}`);
                } catch (error) {
                    console.log(`⚠ Could not drop index ${index.Key_name}:`, error.message);
                }
            }
        } catch (error) {
            console.log('Could not check indexes:', error.message);
        }

        console.log('✅ Foreign key cleanup completed');

    } catch (error) {
        console.error('Error fixing foreign keys:', error);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

// Run the fix
fixForeignKeys().catch(console.error);
