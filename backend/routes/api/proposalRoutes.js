import express from 'express';
import {
    getAllProposals,
    getProposalById,
    createProposal,
    updateProposal,
    deleteProposal,
    submitProposal,
    getProposalsByUser,
    getProposalStats
} from '../../controllers/proposalController.js';
import { verifyUser } from '../../middleware/AuthUser.js';

const router = express.Router();

// Proposal Routes
router.get('/', verifyUser, getAllProposals);                    // GET /api/proposals
router.get('/stats', verifyUser, getProposalStats);              // GET /api/proposals/stats  
router.get('/user/:userId', verifyUser, getProposalsByUser);     // GET /api/proposals/user/:userId
router.get('/:id', verifyUser, getProposalById);                 // GET /api/proposals/:id
router.post('/', verifyUser, createProposal);                    // POST /api/proposals
router.put('/:id', verifyUser, updateProposal);                  // PUT /api/proposals/:id
router.delete('/:id', verifyUser, deleteProposal);               // DELETE /api/proposals/:id
router.patch('/:id/submit', verifyUser, submitProposal);         // PATCH /api/proposals/:id/submit

export default router;
