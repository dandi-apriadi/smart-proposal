import { Resource } from '../models/index.js';
import { Op } from 'sequelize';

export const getAllResources = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, type, search } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};

        if (category) whereClause.category = category;
        if (type) whereClause.type = type;
        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        const resources = await Resource.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['id', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Resources retrieved successfully',
            data: {
                resources: resources.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(resources.count / limit),
                    total_items: resources.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve resources',
            error: error.message
        });
    }
};

export const getResourceById = async (req, res) => {
    try {
        const { id } = req.params;

        const resource = await Resource.findByPk(id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Resource retrieved successfully',
            data: resource
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve resource',
            error: error.message
        });
    }
};

export const createResource = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            download_url,
            date,
            size,
            type
        } = req.body;

        // Check if user has admin rights
        if (!['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        const resource = await Resource.create({
            title,
            description,
            category,
            download_url,
            date,
            size,
            type
        });

        res.status(201).json({
            success: true,
            message: 'Resource created successfully',
            data: resource
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create resource',
            error: error.message
        });
    }
};

export const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Check if user has admin rights
        if (!['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        const resource = await Resource.findByPk(id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }

        await resource.update(updateData);

        res.status(200).json({
            success: true,
            message: 'Resource updated successfully',
            data: resource
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update resource',
            error: error.message
        });
    }
};

export const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user has admin rights
        if (!['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        const resource = await Resource.findByPk(id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }

        await resource.destroy();

        res.status(200).json({
            success: true,
            message: 'Resource deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete resource',
            error: error.message
        });
    }
};

export const getResourcesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { page = 1, limit = 10, type } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = { category };
        if (type) whereClause.type = type;

        const resources = await Resource.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['id', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: `${category} resources retrieved successfully`,
            data: {
                resources: resources.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(resources.count / limit),
                    total_items: resources.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve resources by category',
            error: error.message
        });
    }
};

export const getResourceCategories = async (req, res) => {
    try {
        const categories = await Resource.findAll({
            attributes: [
                'category',
                [Resource.sequelize.fn('COUNT', Resource.sequelize.col('id')), 'count']
            ],
            group: ['category'],
            order: [['category', 'ASC']]
        });

        res.status(200).json({
            success: true,
            message: 'Resource categories retrieved successfully',
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve resource categories',
            error: error.message
        });
    }
};

export const getResourceStats = async (req, res) => {
    try {
        const stats = await Resource.findAll({
            attributes: [
                'category',
                'type',
                [Resource.sequelize.fn('COUNT', Resource.sequelize.col('id')), 'count']
            ],
            group: ['category', 'type']
        });

        const totalResources = await Resource.count();

        // Get resources by type
        const typeStats = await Resource.findAll({
            attributes: [
                'type',
                [Resource.sequelize.fn('COUNT', Resource.sequelize.col('id')), 'count']
            ],
            group: ['type']
        });

        res.status(200).json({
            success: true,
            message: 'Resource statistics retrieved successfully',
            data: {
                category_type_stats: stats,
                type_stats: typeStats,
                totals: {
                    total_resources: totalResources
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve resource statistics',
            error: error.message
        });
    }
};

export const searchResources = async (req, res) => {
    try {
        const { q, category, type, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const whereClause = {
            [Op.or]: [
                { title: { [Op.like]: `%${q}%` } },
                { description: { [Op.like]: `%${q}%` } }
            ]
        };

        if (category) whereClause.category = category;
        if (type) whereClause.type = type;

        const resources = await Resource.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['id', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Resources search completed successfully',
            data: {
                resources: resources.rows,
                search_query: q,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(resources.count / limit),
                    total_items: resources.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to search resources',
            error: error.message
        });
    }
};

export const getLatestResources = async (req, res) => {
    try {
        const { limit = 5 } = req.query;

        const resources = await Resource.findAll({
            limit: parseInt(limit),
            order: [['id', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Latest resources retrieved successfully',
            data: resources
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve latest resources',
            error: error.message
        });
    }
};
