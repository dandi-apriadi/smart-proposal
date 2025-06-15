import { Department, User } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';

export const getAllDepartments = async (req, res) => {
    try {
        const { search, parent_id } = req.query;

        const whereClause = {};

        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { code: { [Op.like]: `%${search}%` } }
            ];
        }

        if (parent_id) {
            whereClause.parent_id = parent_id;
        }

        const departments = await Department.findAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'head',
                    attributes: ['id', 'full_name', 'email', 'position']
                },
                {
                    model: Department,
                    as: 'parent',
                    attributes: ['id', 'name', 'code']
                },
                {
                    model: Department,
                    as: 'children',
                    attributes: ['id', 'name', 'code']
                }
            ],
            order: [['name', 'ASC']]
        });

        res.status(200).json({
            success: true,
            message: 'Departments retrieved successfully',
            data: departments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve departments',
            error: error.message
        });
    }
};

export const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'head',
                    attributes: ['id', 'full_name', 'email', 'position']
                },
                {
                    model: Department,
                    as: 'parent',
                    attributes: ['id', 'name', 'code']
                },
                {
                    model: Department,
                    as: 'children',
                    attributes: ['id', 'name', 'code']
                },
                {
                    model: User,
                    as: 'users',
                    attributes: ['id', 'full_name', 'email', 'role']
                }
            ]
        });

        if (!department) {
            return res.status(404).json({
                success: false,
                message: 'Department not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Department retrieved successfully',
            data: department
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve department',
            error: error.message
        });
    }
};

export const createDepartment = async (req, res) => {
    try {
        const {
            name,
            code,
            parent_id = null,
            head_id = null,
            contact_email = null,
            contact_phone = null
        } = req.body;

        // Check if code already exists
        const existingDepartment = await Department.findOne({ where: { code } });
        if (existingDepartment) {
            return res.status(400).json({
                success: false,
                message: 'Department code already exists'
            });
        }

        // Validate head_id if provided
        if (head_id) {
            const head = await User.findByPk(head_id);
            if (!head) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid head user ID'
                });
            }
        }

        // Validate parent_id if provided
        if (parent_id) {
            const parent = await Department.findByPk(parent_id);
            if (!parent) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid parent department ID'
                });
            }
        }

        const department = await Department.create({
            name,
            code,
            parent_id,
            head_id,
            contact_email,
            contact_phone
        });

        // Fetch the created department with relations
        const createdDepartment = await Department.findByPk(department.id, {
            include: [
                {
                    model: User,
                    as: 'head',
                    attributes: ['id', 'full_name', 'email', 'position']
                },
                {
                    model: Department,
                    as: 'parent',
                    attributes: ['id', 'name', 'code']
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Department created successfully',
            data: createdDepartment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create department',
            error: error.message
        });
    }
};

export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const department = await Department.findByPk(id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: 'Department not found'
            });
        }

        // Check if code already exists (excluding current department)
        if (updateData.code && updateData.code !== department.code) {
            const existingDepartment = await Department.findOne({
                where: {
                    code: updateData.code,
                    id: { [Op.not]: id }
                }
            });
            if (existingDepartment) {
                return res.status(400).json({
                    success: false,
                    message: 'Department code already exists'
                });
            }
        }

        // Validate head_id if provided
        if (updateData.head_id) {
            const head = await User.findByPk(updateData.head_id);
            if (!head) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid head user ID'
                });
            }
        }

        // Validate parent_id if provided
        if (updateData.parent_id) {
            const parent = await Department.findByPk(updateData.parent_id);
            if (!parent) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid parent department ID'
                });
            }
        }

        await department.update(updateData);

        const updatedDepartment = await Department.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'head',
                    attributes: ['id', 'full_name', 'email', 'position']
                },
                {
                    model: Department,
                    as: 'parent',
                    attributes: ['id', 'name', 'code']
                },
                {
                    model: Department,
                    as: 'children',
                    attributes: ['id', 'name', 'code']
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Department updated successfully',
            data: updatedDepartment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update department',
            error: error.message
        });
    }
};

export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findByPk(id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: 'Department not found'
            });
        }

        // Check if department has children
        const childrenCount = await Department.count({ where: { parent_id: id } });
        if (childrenCount > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete department with sub-departments'
            });
        }

        // Check if department has users
        const usersCount = await User.count({ where: { department: id } });
        if (usersCount > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete department with associated users'
            });
        }

        await department.destroy();

        res.status(200).json({
            success: true,
            message: 'Department deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete department',
            error: error.message
        });
    }
};

export const getDepartmentHierarchy = async (req, res) => {
    try {
        const departments = await Department.findAll({
            where: { parent_id: null }, // Root departments only
            include: [
                {
                    model: Department,
                    as: 'children',
                    attributes: ['id', 'name', 'code'],
                    include: [
                        {
                            model: Department,
                            as: 'children',
                            attributes: ['id', 'name', 'code']
                        }
                    ]
                },
                {
                    model: User,
                    as: 'head',
                    attributes: ['id', 'full_name', 'email']
                }
            ],
            order: [['name', 'ASC']]
        });

        res.status(200).json({
            success: true,
            message: 'Department hierarchy retrieved successfully',
            data: departments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve department hierarchy',
            error: error.message
        });
    }
};

export const getDepartmentStats = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({
                success: false,
                message: 'Department not found'
            });
        }

        // Get department statistics
        const usersCount = await User.count({ where: { department: id } });
        const proposalsCount = await department.countProposals();

        const stats = {
            total_users: usersCount,
            total_proposals: proposalsCount,
            department_info: {
                id: department.id,
                name: department.name,
                code: department.code
            }
        };

        res.status(200).json({
            success: true,
            message: 'Department statistics retrieved successfully',
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve department statistics',
            error: error.message
        });
    }
};
