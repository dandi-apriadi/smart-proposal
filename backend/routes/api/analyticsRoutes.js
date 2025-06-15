import express from "express";
import {
    getUserOverview,
    getUserRoles,
    getUserActivity,
    getRegistrationTrends,
    getDepartmentDistribution,
    getUserStatus,
    getUserInsightsOverview,
    getEngagementMetrics,
    getRetentionMetrics,
    getAllAnalytics
} from "../../controllers/analyticsController.js";
import { verifyUser } from "../../middleware/AuthUser.js";

const router = express.Router();

// Debug endpoint (temporary) - no auth required
router.get('/debug-session', (req, res) => {
    res.json({
        success: true,
        session: req.session,
        user_id: req.session.user_id,
        authenticated: !!req.session.user_id
    });
});

// Apply authentication middleware to all routes
router.use(verifyUser);

// User analytics routes
router.get('/overview', getUserOverview);
router.get('/roles', getUserRoles);
router.get('/activity', getUserActivity);
router.get('/registration-trends', getRegistrationTrends);
router.get('/department-distribution', getDepartmentDistribution);
router.get('/user-status', getUserStatus);

// User insights routes
router.get('/insights/overview', getUserInsightsOverview);
router.get('/insights/engagement', getEngagementMetrics);
router.get('/insights/retention', getRetentionMetrics);

// Get all analytics data in one call
router.get('/all', getAllAnalytics);

export default router;
