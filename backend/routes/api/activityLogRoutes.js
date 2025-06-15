import express from 'express';
import {
    getAllActivityLogs,
    getActivityLogById,
    createActivityLog,
    deleteActivityLog,
    getActivityLogsByType,
    getActivityLogsByUser,
    getRecentActivities,
    getActivityLogStats,
    clearOldActivityLogs
} from '../../controllers/activityLogController.js';
import { verifyUser } from '../../middleware/AuthUser.js';

const router = express.Router();

// Activity Log Routes
router.get('/', verifyUser, getAllActivityLogs);                      // GET /api/activity-logs
router.get('/recent', verifyUser, getRecentActivities);               // GET /api/activity-logs/recent
router.get('/stats', verifyUser, getActivityLogStats);                // GET /api/activity-logs/stats
router.get('/type/:type', verifyUser, getActivityLogsByType);         // GET /api/activity-logs/type/:type
router.get('/user/:userId', verifyUser, getActivityLogsByUser);       // GET /api/activity-logs/user/:userId
router.get('/:id', verifyUser, getActivityLogById);                   // GET /api/activity-logs/:id
router.post('/', verifyUser, createActivityLog);                      // POST /api/activity-logs
router.delete('/:id', verifyUser, deleteActivityLog);                 // DELETE /api/activity-logs/:id
router.delete('/old/clear', verifyUser, clearOldActivityLogs);        // DELETE /api/activity-logs/old/clear

export default router;
