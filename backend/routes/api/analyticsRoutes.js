import express from "express";
import {
    getSystemOverview,
    getUserActivityAnalytics,
    getProposalStatistics,
    getActiveSessionStatus
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

// Dashboard sub-routes analytics (for admin dashboard components)
router.get('/system-overview', getSystemOverview);
router.get('/user-activity-metrics', getUserActivityAnalytics);
router.get('/proposal-statistics', getProposalStatistics);
router.get('/active-session-status', getActiveSessionStatus);

export default router;
