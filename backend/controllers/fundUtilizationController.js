import { FundUtilization, Proposal } from '../models/index.js';
import { Op } from 'sequelize';

export const getAllFundUtilizations = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, category, faculty, search } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};

        if (status) whereClause.status = status;
        if (category) whereClause.category = category;
        if (faculty) whereClause.faculty = faculty;
        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { researcher: { [Op.like]: `%${search}%` } }
            ];
        }

        const utilizations = await FundUtilization.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'budget', 'status']
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['submission_date', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Fund utilizations retrieved successfully',
            data: {
                utilizations: utilizations.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(utilizations.count / limit),
                    total_items: utilizations.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve fund utilizations',
            error: error.message
        });
    }
};

export const getFundUtilizationById = async (req, res) => {
    try {
        const { id } = req.params;

        const utilization = await FundUtilization.findByPk(id, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'budget', 'status', 'user_id']
                }
            ]
        });

        if (!utilization) {
            return res.status(404).json({
                success: false,
                message: 'Fund utilization not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Fund utilization retrieved successfully',
            data: utilization
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve fund utilization',
            error: error.message
        });
    }
};

export const createFundUtilization = async (req, res) => {
    try {
        const {
            proposal_id,
            title,
            researcher,
            faculty,
            category,
            submission_date,
            amount_used,
            total_allocated,
            notes
        } = req.body;

        // Check if proposal exists and user has access
        const proposal = await Proposal.findByPk(proposal_id);
        if (!proposal) {
            return res.status(404).json({
                success: false,
                message: 'Proposal not found'
            });
        }

        // Check if user owns the proposal or has admin rights
        if (proposal.user_id !== req.user.id && !['admin', 'wadir', 'bendahara'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        const utilizationId = `FU-${Date.now()}`;

        const utilization = await FundUtilization.create({
            id: utilizationId,
            proposal_id,
            title,
            researcher,
            faculty,
            category,
            submission_date,
            amount_used,
            total_allocated,
            status: 'Menunggu Verifikasi',
            notes
        });

        // Fetch the created utilization with relations
        const createdUtilization = await FundUtilization.findByPk(utilizationId, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'budget']
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Fund utilization created successfully',
            data: createdUtilization
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create fund utilization',
            error: error.message
        });
    }
};

export const updateFundUtilization = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const utilization = await FundUtilization.findByPk(id, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['user_id']
                }
            ]
        });

        if (!utilization) {
            return res.status(404).json({
                success: false,
                message: 'Fund utilization not found'
            });
        }

        // Check if user owns the proposal or has admin rights
        if (utilization.proposal.user_id !== req.user.id &&
            !['admin', 'wadir', 'bendahara'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await utilization.update(updateData);

        const updatedUtilization = await FundUtilization.findByPk(id, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'budget']
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Fund utilization updated successfully',
            data: updatedUtilization
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update fund utilization',
            error: error.message
        });
    }
};

export const deleteFundUtilization = async (req, res) => {
    try {
        const { id } = req.params;

        const utilization = await FundUtilization.findByPk(id, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['user_id']
                }
            ]
        });

        if (!utilization) {
            return res.status(404).json({
                success: false,
                message: 'Fund utilization not found'
            });
        }

        // Check if user owns the proposal or has admin rights
        if (utilization.proposal.user_id !== req.user.id &&
            !['admin', 'wadir', 'bendahara'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await utilization.destroy();

        res.status(200).json({
            success: true,
            message: 'Fund utilization deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete fund utilization',
            error: error.message
        });
    }
};

export const verifyFundUtilization = async (req, res) => {
    try {
        const { id } = req.params;
        const { notes } = req.body;

        // Check if user has verification rights
        if (!['admin', 'wadir', 'bendahara'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Verification rights required'
            });
        }

        const utilization = await FundUtilization.findByPk(id);

        if (!utilization) {
            return res.status(404).json({
                success: false,
                message: 'Fund utilization not found'
            });
        }

        if (utilization.status !== 'Menunggu Verifikasi') {
            return res.status(400).json({
                success: false,
                message: 'Only pending utilizations can be verified'
            });
        }

        await utilization.update({
            status: 'Terverifikasi',
            notes: notes || utilization.notes
        });

        res.status(200).json({
            success: true,
            message: 'Fund utilization verified successfully',
            data: utilization
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to verify fund utilization',
            error: error.message
        });
    }
};

export const rejectFundUtilization = async (req, res) => {
    try {
        const { id } = req.params;
        const { rejection_reason } = req.body;

        // Check if user has verification rights
        if (!['admin', 'wadir', 'bendahara'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Verification rights required'
            });
        }

        const utilization = await FundUtilization.findByPk(id);

        if (!utilization) {
            return res.status(404).json({
                success: false,
                message: 'Fund utilization not found'
            });
        }

        if (!rejection_reason) {
            return res.status(400).json({
                success: false,
                message: 'Rejection reason is required'
            });
        }

        await utilization.update({
            status: 'Ditolak',
            rejection_reason
        });

        res.status(200).json({
            success: true,
            message: 'Fund utilization rejected successfully',
            data: utilization
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to reject fund utilization',
            error: error.message
        });
    }
};

export const getFundUtilizationsByProposal = async (req, res) => {
    try {
        const { proposal_id } = req.params;
        const { status } = req.query;

        const whereClause = { proposal_id };
        if (status) whereClause.status = status;

        const utilizations = await FundUtilization.findAll({
            where: whereClause,
            order: [['submission_date', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Proposal fund utilizations retrieved successfully',
            data: utilizations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve proposal fund utilizations',
            error: error.message
        });
    }
};

export const getFundUtilizationStats = async (req, res) => {
    try {
        const stats = await FundUtilization.findAll({
            attributes: [
                'status',
                'category',
                [FundUtilization.sequelize.fn('COUNT', FundUtilization.sequelize.col('id')), 'count'],
                [FundUtilization.sequelize.fn('SUM', FundUtilization.sequelize.col('amount_used')), 'total_amount']
            ],
            group: ['status', 'category']
        });

        const totalUtilizations = await FundUtilization.count();
        const totalAmountUsed = await FundUtilization.sum('amount_used');
        const totalAllocated = await FundUtilization.sum('total_allocated');

        res.status(200).json({
            success: true,
            message: 'Fund utilization statistics retrieved successfully',
            data: {
                stats,
                totals: {
                    total_utilizations: totalUtilizations,
                    total_amount_used: totalAmountUsed,
                    total_allocated: totalAllocated,
                    utilization_rate: totalAllocated ? ((totalAmountUsed / totalAllocated) * 100).toFixed(2) : 0
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve fund utilization statistics',
            error: error.message
        });
    }
};

export const getFundUtilizationsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const { page = 1, limit = 10, category, faculty } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = { status };
        if (category) whereClause.category = category;
        if (faculty) whereClause.faculty = faculty;

        const utilizations = await FundUtilization.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'budget']
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['submission_date', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: `${status} fund utilizations retrieved successfully`,
            data: {
                utilizations: utilizations.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(utilizations.count / limit),
                    total_items: utilizations.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve fund utilizations by status',
            error: error.message
        });
    }
};
