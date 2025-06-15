import { ActivityLog } from '../models/index.js';
import { Op } from 'sequelize';

export const getAllActivityLogs = async (req, res) => {
    try {
        const { page = 1, limit = 10, type, action, user, status, date_from, date_to } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};

        if (type) whereClause.type = type;
        if (action) whereClause.action = action;
        if (user) whereClause.user = { [Op.like]: `%${user}%` };
        if (status) whereClause.status = status;

        if (date_from || date_to) {
            whereClause.created_at = {};
            if (date_from) whereClause.created_at[Op.gte] = new Date(date_from);
            if (date_to) whereClause.created_at[Op.lte] = new Date(date_to);
        }

        const logs = await ActivityLog.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Activity logs retrieved successfully',
            data: {
                logs: logs.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(logs.count / limit),
                    total_items: logs.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve activity logs',
            error: error.message
        });
    }
};

export const getActivityLogById = async (req, res) => {
    try {
        const { id } = req.params;

        const log = await ActivityLog.findByPk(id);

        if (!log) {
            return res.status(404).json({
                success: false,
                message: 'Activity log not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Activity log retrieved successfully',
            data: log
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve activity log',
            error: error.message
        });
    }
};

export const createActivityLog = async (req, res) => {
    try {
        const {
            type,
            action,
            user,
            title,
            timestamp,
            date,
            status,
            details,
            user_avatar
        } = req.body;

        const log = await ActivityLog.create({
            type,
            action,
            user,
            title,
            timestamp,
            date,
            status,
            details,
            user_avatar
        });

        res.status(201).json({
            success: true,
            message: 'Activity log created successfully',
            data: log
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create activity log',
            error: error.message
        });
    }
};

export const deleteActivityLog = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user has admin rights
        if (!['admin'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        const log = await ActivityLog.findByPk(id);

        if (!log) {
            return res.status(404).json({
                success: false,
                message: 'Activity log not found'
            });
        }

        await log.destroy();

        res.status(200).json({
            success: true,
            message: 'Activity log deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete activity log',
            error: error.message
        });
    }
};

export const getActivityLogsByType = async (req, res) => {
    try {
        const { type } = req.params;
        const { page = 1, limit = 10, status } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = { type };
        if (status) whereClause.status = status;

        const logs = await ActivityLog.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: `${type} activity logs retrieved successfully`,
            data: {
                logs: logs.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(logs.count / limit),
                    total_items: logs.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve activity logs by type',
            error: error.message
        });
    }
};

export const getActivityLogsByUser = async (req, res) => {
    try {
        const { user } = req.params;
        const { page = 1, limit = 10, type, status } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = { user: { [Op.like]: `%${user}%` } };
        if (type) whereClause.type = type;
        if (status) whereClause.status = status;

        const logs = await ActivityLog.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'User activity logs retrieved successfully',
            data: {
                logs: logs.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(logs.count / limit),
                    total_items: logs.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user activity logs',
            error: error.message
        });
    }
};

export const getRecentActivities = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        const logs = await ActivityLog.findAll({
            limit: parseInt(limit),
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Recent activities retrieved successfully',
            data: logs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve recent activities',
            error: error.message
        });
    }
};

export const getActivityLogStats = async (req, res) => {
    try {
        const stats = await ActivityLog.findAll({
            attributes: [
                'type',
                'status',
                [ActivityLog.sequelize.fn('COUNT', ActivityLog.sequelize.col('id')), 'count']
            ],
            group: ['type', 'status']
        });

        const totalLogs = await ActivityLog.count();

        // Get today's activity count
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayLogs = await ActivityLog.count({
            where: {
                created_at: {
                    [Op.gte]: today
                }
            }
        });

        res.status(200).json({
            success: true,
            message: 'Activity log statistics retrieved successfully',
            data: {
                stats,
                totals: {
                    total_logs: totalLogs,
                    today_logs: todayLogs
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve activity log statistics',
            error: error.message
        });
    }
};

export const clearOldActivityLogs = async (req, res) => {
    try {
        const { days = 30 } = req.body;

        // Check if user has admin rights
        if (!['admin'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));

        const deletedCount = await ActivityLog.destroy({
            where: {
                created_at: {
                    [Op.lt]: cutoffDate
                }
            }
        });

        res.status(200).json({
            success: true,
            message: `Cleared ${deletedCount} old activity logs (older than ${days} days)`,
            data: {
                deleted_count: deletedCount,
                cutoff_date: cutoffDate
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to clear old activity logs',
            error: error.message
        });
    }
};

// Helper function to log activities (can be used by other controllers)
export const logActivity = async (type, action, user, title, status = 'info', details = null, user_avatar = null) => {
    try {
        const now = new Date();
        const timestamp = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        const date = now.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        await ActivityLog.create({
            type,
            action,
            user,
            title,
            timestamp,
            date,
            status,
            details,
            user_avatar
        });
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
};
