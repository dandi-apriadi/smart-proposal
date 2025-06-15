import express from 'express';
import {
    getAllResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource,
    getResourcesByCategory,
    getResourceCategories,
    getResourceStats,
    searchResources,
    getLatestResources
} from '../../controllers/resourceController.js';
import { verifyUser } from '../../middleware/AuthUser.js';

const router = express.Router();

// Resource Routes
router.get('/', verifyUser, getAllResources);                         // GET /api/resources
router.get('/search', verifyUser, searchResources);                   // GET /api/resources/search
router.get('/latest', verifyUser, getLatestResources);                // GET /api/resources/latest
router.get('/categories', verifyUser, getResourceCategories);         // GET /api/resources/categories
router.get('/stats', verifyUser, getResourceStats);                   // GET /api/resources/stats
router.get('/category/:category', verifyUser, getResourcesByCategory); // GET /api/resources/category/:category
router.get('/:id', verifyUser, getResourceById);                      // GET /api/resources/:id
router.post('/', verifyUser, createResource);                         // POST /api/resources
router.put('/:id', verifyUser, updateResource);                       // PUT /api/resources/:id
router.delete('/:id', verifyUser, deleteResource);                    // DELETE /api/resources/:id

export default router;
