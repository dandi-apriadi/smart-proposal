import db from '../config/Database.js';

const verifyDatabaseStructure = async () => {
    try {
        await db.authenticate();
        console.log('✅ Database connection established.');

        // Check if tables exist and their structure
        const [userTableResult] = await db.query(`
            SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = 'sp' AND TABLE_NAME = 'users'
            ORDER BY ORDINAL_POSITION
        `);

        console.log('\n📋 Users table structure:');
        console.log('Column Name\t\tData Type\t\tNullable\tDefault');
        console.log('─'.repeat(70));
        userTableResult.forEach(column => {
            console.log(`${column.COLUMN_NAME.padEnd(20)}\t${column.DATA_TYPE.padEnd(15)}\t${column.IS_NULLABLE}\t\t${column.COLUMN_DEFAULT || 'NULL'}`);
        });

        // Check indexes
        const [indexResult] = await db.query(`
            SHOW INDEX FROM users
        `);

        console.log('\n🔍 Users table indexes:');
        console.log('Index Name\t\t\tColumn\t\t\tUnique');
        console.log('─'.repeat(60));
        indexResult.forEach(index => {
            console.log(`${index.Key_name.padEnd(25)}\t${index.Column_name.padEnd(15)}\t${index.Non_unique === 0 ? 'YES' : 'NO'}`);
        });

        // Check for required fields
        const requiredFields = ['user_id', 'username', 'password_hash', 'email', 'full_name', 'role', 'status'];
        const existingFields = userTableResult.map(col => col.COLUMN_NAME);

        console.log('\n✅ Field verification:');
        requiredFields.forEach(field => {
            const exists = existingFields.includes(field);
            console.log(`${field.padEnd(20)}: ${exists ? '✅ EXISTS' : '❌ MISSING'}`);
        });

        // Check departments table
        const [deptTableResult] = await db.query(`
            SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = 'sp' AND TABLE_NAME = 'departments'
            ORDER BY ORDINAL_POSITION
        `);

        if (deptTableResult.length > 0) {
            console.log('\n📋 Departments table structure:');
            console.log('Column Name\t\tData Type\t\tNullable\tDefault');
            console.log('─'.repeat(70));
            deptTableResult.forEach(column => {
                console.log(`${column.COLUMN_NAME.padEnd(20)}\t${column.DATA_TYPE.padEnd(15)}\t${column.IS_NULLABLE}\t\t${column.COLUMN_DEFAULT || 'NULL'}`);
            });
        }

    } catch (error) {
        console.error('❌ Database verification error:', error.message);
    } finally {
        await db.close();
    }
};

verifyDatabaseStructure();
