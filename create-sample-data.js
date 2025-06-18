import { User, Department, Proposal } from '../backend/models/index.js';
import db from '../backend/config/Database.js';

const createSampleData = async () => {
    try {
        console.log('🔄 Creating sample data...');

        // Sync database
        await db.sync({ force: false });

        // Create departments
        const departments = await Department.bulkCreate([
            { name: 'Teknik Informatika', description: 'Department of Informatics Engineering' },
            { name: 'Teknik Sipil', description: 'Department of Civil Engineering' },
            { name: 'Teknik Mesin', description: 'Department of Mechanical Engineering' }
        ], { ignoreDuplicates: true });

        console.log('✅ Departments created');

        // Create users
        const users = await User.bulkCreate([
            {
                full_name: 'Dr. Ahmad Wijaya',
                email: 'ahmad.wijaya@polimdo.ac.id',
                password: '$2b$12$example', // hashed password
                role: 'admin',
                status: 'active',
                department_id: 1
            },
            {
                full_name: 'Prof. Siti Nurhaliza',
                email: 'siti.nurhaliza@polimdo.ac.id',
                password: '$2b$12$example',
                role: 'dosen',
                status: 'active',
                department_id: 1
            },
            {
                full_name: 'Dr. Budi Santoso',
                email: 'budi.santoso@polimdo.ac.id',
                password: '$2b$12$example',
                role: 'dosen',
                status: 'active',
                department_id: 2
            }
        ], { ignoreDuplicates: true });

        console.log('✅ Users created');

        // Create proposals
        const proposals = await Proposal.bulkCreate([
            {
                title: 'Penelitian AI untuk Smart City',
                status: 'approved',
                budget: 100000000,
                user_id: 2,
                department_id: 1,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                title: 'Analisis Struktur Bangunan Modern',
                status: 'pending',
                budget: 75000000,
                user_id: 3,
                department_id: 2,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                title: 'Pengembangan IoT untuk Industri',
                status: 'approved',
                budget: 120000000,
                user_id: 2,
                department_id: 1,
                created_at: new Date(),
                updated_at: new Date()
            }
        ], { ignoreDuplicates: true });

        console.log('✅ Proposals created');

        console.log('🎉 Sample data creation completed!');
        console.log('📊 Statistics:');
        console.log(`   - Departments: ${await Department.count()}`);
        console.log(`   - Users: ${await User.count()}`);
        console.log(`   - Proposals: ${await Proposal.count()}`);

    } catch (error) {
        console.error('❌ Error creating sample data:', error);
    } finally {
        process.exit(0);
    }
};

createSampleData();
