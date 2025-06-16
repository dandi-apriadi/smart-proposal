import express from 'express';
import {
    getDashboard,
    getAdminDashboard,
    getWadirDashboard,
    getDosenDashboard,
    getReviewerDashboard,
    getBendaharaDashboard,
    getDemoDashboard
} from '../../controllers/dashboardController.js';
import { verifyUser } from '../../middleware/AuthUser.js';

const router = express.Router();

// Test endpoint to check if dashboard API is working
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Dashboard API is working',
        timestamp: new Date().toISOString()
    });
});

// Demo dashboard endpoint (no authentication required)
router.get('/demo', getDemoDashboard);

// Dashboard Routes
router.get('/', verifyUser, getDashboard);                            // GET /api/dashboard (auto-route based on role)
router.get('/admin', verifyUser, getAdminDashboard);                  // GET /api/dashboard/admin
router.get('/wadir', verifyUser, getWadirDashboard);                  // GET /api/dashboard/wadir
router.get('/dosen', verifyUser, getDosenDashboard);                  // GET /api/dashboard/dosen
router.get('/reviewer', verifyUser, getReviewerDashboard);            // GET /api/dashboard/reviewer
router.get('/bendahara', verifyUser, getBendaharaDashboard);          // GET /api/dashboard/bendahara

export default router;
