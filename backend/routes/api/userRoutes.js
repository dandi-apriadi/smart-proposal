import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    updateUserStatus,
    getUsersByRole,
    getUserStats,
    updateLastLogin
} from '../../controllers/userController.js';
import { verifyUser } from '../../middleware/AuthUser.js';

const router = express.Router();

// User Routes
router.get('/', verifyUser, getAllUsers);                        // GET /api/users
router.get('/stats', verifyUser, getUserStats);                  // GET /api/users/stats
router.get('/role/:role', verifyUser, getUsersByRole);           // GET /api/users/role/:role
router.get('/:id', verifyUser, getUserById);                     // GET /api/users/:id
router.post('/', verifyUser, createUser);                        // POST /api/users
router.put('/:id', verifyUser, updateUser);                      // PUT /api/users/:id
router.delete('/:id', verifyUser, deleteUser);                   // DELETE /api/users/:id
router.patch('/:id/password', verifyUser, changePassword);       // PATCH /api/users/:id/password
router.patch('/:id/status', verifyUser, updateUserStatus);       // PATCH /api/users/:id/status
router.patch('/:id/last-login', verifyUser, updateLastLogin);    // PATCH /api/users/:id/last-login

export default router;
