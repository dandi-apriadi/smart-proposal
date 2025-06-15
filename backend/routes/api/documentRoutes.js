import express from 'express';
import {
    getAllDocuments,
    getDocumentById,
    uploadDocument,
    updateDocument,
    deleteDocument,
    getDocumentsByEntity,
    getUserDocuments,
    approveDocument,
    rejectDocument,
    getDocumentStats
} from '../../controllers/documentController.js';
import { verifyUser } from '../../middleware/AuthUser.js';

const router = express.Router();

// Document Routes
router.get('/', verifyUser, getAllDocuments);                         // GET /api/documents
router.get('/stats', verifyUser, getDocumentStats);                   // GET /api/documents/stats
router.get('/entity/:entityType/:entityId', verifyUser, getDocumentsByEntity); // GET /api/documents/entity/:entityType/:entityId
router.get('/user/:userId', verifyUser, getUserDocuments);            // GET /api/documents/user/:userId
router.get('/:id', verifyUser, getDocumentById);                      // GET /api/documents/:id
router.post('/upload', verifyUser, uploadDocument);                   // POST /api/documents/upload
router.put('/:id', verifyUser, updateDocument);                       // PUT /api/documents/:id
router.delete('/:id', verifyUser, deleteDocument);                    // DELETE /api/documents/:id
router.patch('/:id/approve', verifyUser, approveDocument);            // PATCH /api/documents/:id/approve
router.patch('/:id/reject', verifyUser, rejectDocument);              // PATCH /api/documents/:id/reject

export default router;
