import express from 'express';
import {
    getAllFinancialReports,
    getFinancialReportById,
    createFinancialReport,
    updateFinancialReport,
    deleteFinancialReport,
    submitFinancialReport,
    verifyFinancialReport,
    rejectFinancialReport,
    getFinancialReportsByProposal,
    getFinancialReportStats
} from '../../controllers/financialReportController.js';
import { verifyUser } from '../../middleware/AuthUser.js';

const router = express.Router();

// Financial Report Routes
router.get('/', verifyUser, getAllFinancialReports);                         // GET /api/financial-reports
router.get('/stats', verifyUser, getFinancialReportStats);                   // GET /api/financial-reports/stats
router.get('/proposal/:proposalId', verifyUser, getFinancialReportsByProposal); // GET /api/financial-reports/proposal/:proposalId
router.get('/:id', verifyUser, getFinancialReportById);                      // GET /api/financial-reports/:id
router.post('/', verifyUser, createFinancialReport);                         // POST /api/financial-reports
router.put('/:id', verifyUser, updateFinancialReport);                       // PUT /api/financial-reports/:id
router.delete('/:id', verifyUser, deleteFinancialReport);                    // DELETE /api/financial-reports/:id
router.patch('/:id/submit', verifyUser, submitFinancialReport);              // PATCH /api/financial-reports/:id/submit
router.patch('/:id/verify', verifyUser, verifyFinancialReport);              // PATCH /api/financial-reports/:id/verify
router.patch('/:id/reject', verifyUser, rejectFinancialReport);              // PATCH /api/financial-reports/:id/reject

export default router;
