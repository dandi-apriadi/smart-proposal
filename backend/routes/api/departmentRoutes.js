import express from 'express';
import {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentHierarchy,
    getDepartmentStats
} from '../../controllers/departmentController.js';
import { verifyUser } from '../../middleware/AuthUser.js';

const router = express.Router();

// Department Routes
router.get('/', verifyUser, getAllDepartments);                  // GET /api/departments
router.get('/hierarchy', verifyUser, getDepartmentHierarchy);    // GET /api/departments/hierarchy
router.get('/stats', verifyUser, getDepartmentStats);            // GET /api/departments/stats
router.get('/:id', verifyUser, getDepartmentById);               // GET /api/departments/:id
router.post('/', verifyUser, createDepartment);                  // POST /api/departments
router.put('/:id', verifyUser, updateDepartment);                // PUT /api/departments/:id
router.delete('/:id', verifyUser, deleteDepartment);             // DELETE /api/departments/:id

export default router;
