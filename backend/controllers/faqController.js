import { FAQ } from '../models/index.js';
import { Op } from 'sequelize';

export const getAllFAQ = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, search } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};

        if (category) whereClause.category = category;
        if (search) {
            whereClause[Op.or] = [
                { question: { [Op.like]: `%${search}%` } },
                { answer: { [Op.like]: `%${search}%` } }
            ];
        }

        const faqs = await FAQ.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'FAQs retrieved successfully',
            data: {
                faqs: faqs.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(faqs.count / limit),
                    total_items: faqs.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve FAQs',
            error: error.message
        });
    }
};

export const getFAQById = async (req, res) => {
    try {
        const { id } = req.params;

        const faq = await FAQ.findByPk(id);

        if (!faq) {
            return res.status(404).json({
                success: false,
                message: 'FAQ not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'FAQ retrieved successfully',
            data: faq
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve FAQ',
            error: error.message
        });
    }
};

export const createFAQ = async (req, res) => {
    try {
        const {
            category,
            question,
            answer
        } = req.body;

        // Check if user has admin rights
        if (!['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        const faq = await FAQ.create({
            category,
            question,
            answer
        });

        res.status(201).json({
            success: true,
            message: 'FAQ created successfully',
            data: faq
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create FAQ',
            error: error.message
        });
    }
};

export const updateFAQ = async (req, res) => {
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

        const faq = await FAQ.findByPk(id);

        if (!faq) {
            return res.status(404).json({
                success: false,
                message: 'FAQ not found'
            });
        }

        await faq.update(updateData);

        res.status(200).json({
            success: true,
            message: 'FAQ updated successfully',
            data: faq
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update FAQ',
            error: error.message
        });
    }
};

export const deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user has admin rights
        if (!['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        const faq = await FAQ.findByPk(id);

        if (!faq) {
            return res.status(404).json({
                success: false,
                message: 'FAQ not found'
            });
        }

        await faq.destroy();

        res.status(200).json({
            success: true,
            message: 'FAQ deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete FAQ',
            error: error.message
        });
    }
};

export const getFAQsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const faqs = await FAQ.findAndCountAll({
            where: { category },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: `${category} FAQs retrieved successfully`,
            data: {
                faqs: faqs.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(faqs.count / limit),
                    total_items: faqs.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve FAQs by category',
            error: error.message
        });
    }
};

export const getFAQCategories = async (req, res) => {
    try {
        const categories = await FAQ.findAll({
            attributes: [
                'category',
                [FAQ.sequelize.fn('COUNT', FAQ.sequelize.col('id')), 'count']
            ],
            group: ['category'],
            order: [['category', 'ASC']]
        });

        res.status(200).json({
            success: true,
            message: 'FAQ categories retrieved successfully',
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve FAQ categories',
            error: error.message
        });
    }
};

export const searchFAQ = async (req, res) => {
    try {
        const { q, category, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const whereClause = {
            [Op.or]: [
                { question: { [Op.like]: `%${q}%` } },
                { answer: { [Op.like]: `%${q}%` } }
            ]
        };

        if (category) whereClause.category = category;

        const faqs = await FAQ.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'FAQ search completed successfully',
            data: {
                faqs: faqs.rows,
                search_query: q,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(faqs.count / limit),
                    total_items: faqs.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to search FAQs',
            error: error.message
        });
    }
};

export const getFAQStats = async (req, res) => {
    try {
        const stats = await FAQ.findAll({
            attributes: [
                'category',
                [FAQ.sequelize.fn('COUNT', FAQ.sequelize.col('id')), 'count']
            ],
            group: ['category']
        });

        const totalFAQs = await FAQ.count();

        res.status(200).json({
            success: true,
            message: 'FAQ statistics retrieved successfully',
            data: {
                stats,
                totals: {
                    total_faqs: totalFAQs
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve FAQ statistics',
            error: error.message
        });
    }
};

export const getPopularFAQs = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        // Since we don't have view count, we'll return recent FAQs
        const faqs = await FAQ.findAll({
            limit: parseInt(limit),
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Popular FAQs retrieved successfully',
            data: faqs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve popular FAQs',
            error: error.message
        });
    }
};

export const bulkCreateFAQs = async (req, res) => {
    try {
        const { faqs } = req.body;

        // Check if user has admin rights
        if (!['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        if (!Array.isArray(faqs) || faqs.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'FAQs array is required and must not be empty'
            });
        }

        const createdFAQs = await FAQ.bulkCreate(faqs);

        res.status(201).json({
            success: true,
            message: `${createdFAQs.length} FAQs created successfully`,
            data: createdFAQs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to bulk create FAQs',
            error: error.message
        });
    }
};
