import express from 'express';
import {
    getAllFundUtilizations,
    getFundUtilizationById,
    createFundUtilization,
    updateFundUtilization,
    deleteFundUtilization,
    verifyFundUtilization,
    rejectFundUtilization,
    getFundUtilizationsByProposal,
    getFundUtilizationStats,
    getFundUtilizationsByStatus
} from '../../controllers/fundUtilizationController.js';
import { verifyUser } from '../../middleware/AuthUser.js';

const router = express.Router();

// Fund Utilization Routes
router.get('/', verifyUser, getAllFundUtilizations);                           // GET /api/fund-utilizations
router.get('/stats', verifyUser, getFundUtilizationStats);                     // GET /api/fund-utilizations/stats
router.get('/status/:status', verifyUser, getFundUtilizationsByStatus);        // GET /api/fund-utilizations/status/:status
router.get('/proposal/:proposalId', verifyUser, getFundUtilizationsByProposal); // GET /api/fund-utilizations/proposal/:proposalId
router.get('/:id', verifyUser, getFundUtilizationById);                        // GET /api/fund-utilizations/:id
router.post('/', verifyUser, createFundUtilization);                           // POST /api/fund-utilizations
router.put('/:id', verifyUser, updateFundUtilization);                         // PUT /api/fund-utilizations/:id
router.delete('/:id', verifyUser, deleteFundUtilization);                      // DELETE /api/fund-utilizations/:id
router.patch('/:id/verify', verifyUser, verifyFundUtilization);                // PATCH /api/fund-utilizations/:id/verify
router.patch('/:id/reject', verifyUser, rejectFundUtilization);                // PATCH /api/fund-utilizations/:id/reject

export default router;
