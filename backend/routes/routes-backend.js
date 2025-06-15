import express from 'express';
import UserManagementRoute from './administrator/userManagementRoutes.js';
import SharedRoute from './shared/authRoutes.js';
import ApiRoutes from './api/index.js';

const router = express.Router();

// Legacy routes (keep for backward compatibility)
router.use('/api/admin', UserManagementRoute);
router.use('/api/shared', SharedRoute);

// New API routes structure
router.use('/api', ApiRoutes);

export default router;