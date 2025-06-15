import express from 'express';
import {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    getReviewsByProposal,
    getReviewsByReviewer,
    getReviewStats,
    assignReviewer
} from '../../controllers/reviewController.js';
import { verifyUser } from '../../middleware/AuthUser.js';

const router = express.Router();

// Review Routes
router.get('/', verifyUser, getAllReviews);                           // GET /api/reviews
router.get('/stats', verifyUser, getReviewStats);                     // GET /api/reviews/stats
router.get('/proposal/:proposalId', verifyUser, getReviewsByProposal); // GET /api/reviews/proposal/:proposalId
router.get('/reviewer/:reviewerId', verifyUser, getReviewsByReviewer); // GET /api/reviews/reviewer/:reviewerId
router.get('/:id', verifyUser, getReviewById);                        // GET /api/reviews/:id
router.post('/', verifyUser, createReview);                           // POST /api/reviews
router.post('/assign', verifyUser, assignReviewer);                   // POST /api/reviews/assign
router.put('/:id', verifyUser, updateReview);                         // PUT /api/reviews/:id
router.delete('/:id', verifyUser, deleteReview);                      // DELETE /api/reviews/:id

export default router;
