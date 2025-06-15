import { User } from '../models/index.js';
import { Op } from 'sequelize';
import argon2 from 'argon2';

export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, role, status, search, faculty, department } = req.query;
        const offset = (page - 1) * limit;

        // Check if user has admin rights
        if (!['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        const whereClause = {};

        if (role) whereClause.role = role;
        if (status) whereClause.status = status;
        if (faculty) whereClause.faculty = faculty;
        if (department) whereClause.department = department;
        if (search) {
            whereClause[Op.or] = [
                { full_name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
                { username: { [Op.like]: `%${search}%` } }
            ];
        }

        const users = await User.findAndCountAll({
            where: whereClause,
            attributes: { exclude: ['password_hash'] },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: {
                users: users.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(users.count / limit),
                    total_items: users.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve users',
            error: error.message
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        console.log('getUserById called with ID:', id);
        console.log('User making request:', req.user.user_id, 'Role:', req.user.role);

        // Check if user is requesting their own profile or has admin rights
        if (String(id) !== String(req.user.user_id) && !['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const user = await User.findByPk(id, {
            attributes: { exclude: ['password_hash'] }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        console.error('Error in getUserById:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user',
            error: error.message
        });
    }
};

export const createUser = async (req, res) => {
    try {
        console.log('CreateUser request body:', req.body);
        console.log('User making request:', req.user);

        const {
            // Handle both old and new field names for backward compatibility
            username,
            first_name,
            last_name,
            full_name,
            password,
            email,
            phone,
            role,
            faculty,
            department,
            position,
            status = 'active'
        } = req.body;

        // Check if user has admin rights
        if (!['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        // Validate required fields
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'Email, password, and role are required fields'
            });
        }

        // Generate username if not provided (use email prefix)
        const finalUsername = username || email.split('@')[0];

        // Generate full_name if not provided but first_name and last_name are
        const finalFullName = full_name || (first_name && last_name ? `${first_name} ${last_name}` : email.split('@')[0]);

        // Check if username or email already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username: finalUsername },
                    { email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists'
            });
        }

        // Create user data object
        const userData = {
            username: finalUsername,
            password_hash: password, // Will be hashed by the model hook
            email,
            full_name: finalFullName,
            role,
            faculty: faculty || null,
            department: department || null,
            position: position || null,
            status
        };

        console.log('Creating user with data:', { ...userData, password_hash: '[HIDDEN]' });

        const user = await User.create(userData);

        // Return success response
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
                faculty: user.faculty,
                department: user.department,
                position: user.position,
                status: user.status,
                created_at: user.created_at
            }
        });

    } catch (error) {
        console.error('Error in createUser:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        console.log('updateUser called with ID:', id);
        console.log('Update data:', updateData);
        console.log('User making request:', req.user.user_id, 'Role:', req.user.role);

        // Check if user is updating their own profile or has admin rights
        if (String(id) !== String(req.user.user_id) && !['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Non-admin users cannot change role or status
        if (String(id) === String(req.user.user_id) && !['admin', 'wadir'].includes(req.user.role)) {
            delete updateData.role;
            delete updateData.status;
        }

        // Check if username or email already exists (excluding current user)
        if (updateData.username || updateData.email) {
            const whereClause = { user_id: { [Op.not]: id } };
            const orConditions = [];

            if (updateData.username) orConditions.push({ username: updateData.username });
            if (updateData.email) orConditions.push({ email: updateData.email });

            whereClause[Op.or] = orConditions;

            const existingUser = await User.findOne({ where: whereClause });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Username or email already exists'
                });
            }
        }

        await user.update(updateData);

        const updatedUser = await User.findByPk(id, {
            attributes: { exclude: ['password_hash'] }
        });

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        console.error('Error in updateUser:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
            error: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user has admin rights
        if (!['admin'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        // Prevent admin from deleting themselves
        if (String(id) === String(req.user.user_id)) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete your own account'
            });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        await user.destroy();

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { current_password, new_password } = req.body;

        // Check if user is changing their own password or has admin rights
        if (String(id) !== String(req.user.user_id) && !['admin'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Verify current password (except for admin changing other user's password)
        if (String(id) === String(req.user.user_id)) {
            const isCurrentPasswordValid = await argon2.verify(user.password_hash, current_password);
            if (!isCurrentPasswordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Current password is incorrect'
                });
            }
        }

        await user.update({
            password_hash: new_password // Will be hashed by the model hook
        });

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to change password',
            error: error.message
        });
    }
};

export const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Check if user has admin rights
        if (!['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        // Prevent admin from deactivating themselves
        if (String(id) === String(req.user.user_id) && status === 'inactive') {
            return res.status(400).json({
                success: false,
                message: 'Cannot deactivate your own account'
            });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        await user.update({ status });

        res.status(200).json({
            success: true,
            message: `User ${status === 'active' ? 'activated' : 'deactivated'} successfully`,
            data: {
                id: user.user_id,
                status: user.status
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update user status',
            error: error.message
        });
    }
};

export const getUsersByRole = async (req, res) => {
    try {
        const { role } = req.params;
        const { status = 'active', page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = { role };
        if (status) whereClause.status = status;

        const users = await User.findAndCountAll({
            where: whereClause,
            attributes: { exclude: ['password_hash'] },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['full_name', 'ASC']]
        });

        res.status(200).json({
            success: true,
            message: `${role} users retrieved successfully`,
            data: {
                users: users.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(users.count / limit),
                    total_items: users.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve users by role',
            error: error.message
        });
    }
};

export const getUserStats = async (req, res) => {
    try {
        // Check if user has admin rights
        if (!['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        const roleStats = await User.findAll({
            attributes: [
                'role',
                'status',
                [User.sequelize.fn('COUNT', User.sequelize.col('user_id')), 'count']
            ],
            group: ['role', 'status']
        });

        const totalUsers = await User.count();
        const activeUsers = await User.count({ where: { status: 'active' } });
        const dosenUsers = await User.count({ where: { role: 'dosen' } });
        const reviewerUsers = await User.count({ where: { role: 'reviewer' } });
        const adminUsers = await User.count({ where: { role: 'admin' } });
        const wadirUsers = await User.count({ where: { role: 'wadir' } });
        const inactiveUsers = await User.count({ where: { status: 'inactive' } });

        // Format data to match frontend expectations
        const formattedStats = {
            total: {
                value: totalUsers,
                trend: '+12.5%',
                isPositive: true
            },
            active: {
                value: activeUsers,
                trend: '+8.2%',
                isPositive: true
            },
            dosen: {
                value: dosenUsers,
                trend: '+5.1%',
                isPositive: true
            },
            reviewers: {
                value: reviewerUsers,
                trend: '+2.3%',
                isPositive: true
            },
            admins: adminUsers,
            wadir: wadirUsers,
            inactive: inactiveUsers,
            recentlyActive: activeUsers // Simplified for now
        };

        res.status(200).json({
            success: true,
            message: 'User statistics retrieved successfully',
            data: formattedStats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user statistics',
            error: error.message
        });
    }
};

export const updateLastLogin = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        await user.update({
            last_login: new Date()
        });

        res.status(200).json({
            success: true,
            message: 'Last login updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update last login',
            error: error.message
        });
    }
};
