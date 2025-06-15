import express from 'express';
import {
    getAllFAQ,
    getFAQById,
    createFAQ,
    updateFAQ,
    deleteFAQ,
    getFAQsByCategory,
    getFAQCategories,
    searchFAQ,
    getFAQStats,
    getPopularFAQs,
    bulkCreateFAQs
} from '../../controllers/faqController.js';
import { verifyUser } from '../../middleware/AuthUser.js';

const router = express.Router();

// FAQ Routes
router.get('/', getAllFAQ);                                           // GET /api/faqs (public)
router.get('/search', searchFAQ);                                     // GET /api/faqs/search (public)
router.get('/popular', getPopularFAQs);                               // GET /api/faqs/popular (public)
router.get('/categories', getFAQCategories);                          // GET /api/faqs/categories (public)
router.get('/stats', verifyUser, getFAQStats);                        // GET /api/faqs/stats (admin only)
router.get('/category/:category', getFAQsByCategory);                 // GET /api/faqs/category/:category (public)
router.get('/:id', getFAQById);                                       // GET /api/faqs/:id (public)
router.post('/', verifyUser, createFAQ);                              // POST /api/faqs (admin only)
router.post('/bulk', verifyUser, bulkCreateFAQs);                     // POST /api/faqs/bulk (admin only)
router.put('/:id', verifyUser, updateFAQ);                            // PUT /api/faqs/:id (admin only)
router.delete('/:id', verifyUser, deleteFAQ);                         // DELETE /api/faqs/:id (admin only)

export default router;
