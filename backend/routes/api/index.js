import express from 'express';

// Import all API routes
import proposalRoutes from './proposalRoutes.js';
import userRoutes from './userRoutes.js';
import departmentRoutes from './departmentRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import documentRoutes from './documentRoutes.js';
import financialReportRoutes from './financialReportRoutes.js';
import fundUtilizationRoutes from './fundUtilizationRoutes.js';
import activityLogRoutes from './activityLogRoutes.js';
import resourceRoutes from './resourceRoutes.js';
import faqRoutes from './faqRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';

const router = express.Router();

// Mount all API routes
router.use('/proposals', proposalRoutes);
router.use('/users', userRoutes);
router.use('/departments', departmentRoutes);
router.use('/reviews', reviewRoutes);
router.use('/documents', documentRoutes);
router.use('/financial-reports', financialReportRoutes);
router.use('/fund-utilizations', fundUtilizationRoutes);
router.use('/activity-logs', activityLogRoutes);
router.use('/resources', resourceRoutes);
router.use('/faqs', faqRoutes);
router.use('/dashboard', dashboardRoutes);

// API health check
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'SmartProposal API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// API documentation endpoint
router.get('/docs', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'SmartProposal API Documentation',
        endpoints: {
            proposals: '/api/proposals',
            users: '/api/users',
            departments: '/api/departments',
            reviews: '/api/reviews',
            documents: '/api/documents',
            'financial-reports': '/api/financial-reports',
            'fund-utilizations': '/api/fund-utilizations',
            'activity-logs': '/api/activity-logs',
            resources: '/api/resources',
            faqs: '/api/faqs',
            dashboard: '/api/dashboard'
        },
        authentication: {
            required: 'Most endpoints require authentication via middleware',
            public: ['GET /api/faqs/*', 'GET /api/health', 'GET /api/docs']
        }
    });
});

export default router;
