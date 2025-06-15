import { Proposal, ProposalDetail, User, Department, Collaborator, Review } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';

export const getAllProposals = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, type, search } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};

        if (status) whereClause.status = status;
        if (type) whereClause.type = type;
        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        const proposals = await Proposal.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'full_name', 'email', 'faculty']
                },
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name', 'code']
                },
                {
                    model: ProposalDetail,
                    as: 'details'
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Proposals retrieved successfully',
            data: {
                proposals: proposals.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(proposals.count / limit),
                    total_items: proposals.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve proposals',
            error: error.message
        });
    }
};

export const getProposalById = async (req, res) => {
    try {
        const { id } = req.params;

        const proposal = await Proposal.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'full_name', 'email', 'faculty', 'position']
                },
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name', 'code']
                },
                {
                    model: ProposalDetail,
                    as: 'details'
                },
                {
                    model: Collaborator,
                    as: 'collaborators'
                },
                {
                    model: Review,
                    as: 'reviews',
                    include: [
                        {
                            model: User,
                            as: 'reviewer',
                            attributes: ['id', 'full_name', 'email']
                        }
                    ]
                }
            ]
        });

        if (!proposal) {
            return res.status(404).json({
                success: false,
                message: 'Proposal not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Proposal retrieved successfully',
            data: proposal
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve proposal',
            error: error.message
        });
    }
};

export const createProposal = async (req, res) => {
    try {
        const {
            title,
            description,
            session_id,
            department_id,
            budget,
            type,
            priority,
            collaborators = []
        } = req.body;

        const user_id = req.user.id; // From authentication middleware

        const proposalId = `PROP-${Date.now()}`;

        const proposal = await Proposal.create({
            id: proposalId,
            title,
            description,
            user_id,
            session_id,
            department_id,
            budget,
            type,
            priority,
            status: 'draft'
        });

        // Create proposal details with default scores
        await ProposalDetail.create({
            proposal_id: proposalId
        });

        // Add collaborators if provided
        if (collaborators.length > 0) {
            const collaboratorData = collaborators.map(collab => ({
                ...collab,
                proposal_id: proposalId
            }));
            await Collaborator.bulkCreate(collaboratorData);
        }

        // Fetch the created proposal with all relations
        const createdProposal = await Proposal.findByPk(proposalId, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'full_name', 'email']
                },
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name', 'code']
                },
                {
                    model: ProposalDetail,
                    as: 'details'
                },
                {
                    model: Collaborator,
                    as: 'collaborators'
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Proposal created successfully',
            data: createdProposal
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create proposal',
            error: error.message
        });
    }
};

export const updateProposal = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const proposal = await Proposal.findByPk(id);

        if (!proposal) {
            return res.status(404).json({
                success: false,
                message: 'Proposal not found'
            });
        }

        // Check if user owns this proposal or has admin rights
        if (proposal.user_id !== req.user.id && !['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await proposal.update(updateData);

        const updatedProposal = await Proposal.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'full_name', 'email']
                },
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name', 'code']
                },
                {
                    model: ProposalDetail,
                    as: 'details'
                },
                {
                    model: Collaborator,
                    as: 'collaborators'
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Proposal updated successfully',
            data: updatedProposal
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update proposal',
            error: error.message
        });
    }
};

export const deleteProposal = async (req, res) => {
    try {
        const { id } = req.params;

        const proposal = await Proposal.findByPk(id);

        if (!proposal) {
            return res.status(404).json({
                success: false,
                message: 'Proposal not found'
            });
        }

        // Check if user owns this proposal or has admin rights
        if (proposal.user_id !== req.user.id && !['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await proposal.destroy();

        res.status(200).json({
            success: true,
            message: 'Proposal deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete proposal',
            error: error.message
        });
    }
};

export const submitProposal = async (req, res) => {
    try {
        const { id } = req.params;

        const proposal = await Proposal.findByPk(id);

        if (!proposal) {
            return res.status(404).json({
                success: false,
                message: 'Proposal not found'
            });
        }

        // Check if user owns this proposal
        if (proposal.user_id !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await proposal.update({
            status: 'submitted',
            submitted_at: new Date()
        });

        res.status(200).json({
            success: true,
            message: 'Proposal submitted successfully',
            data: proposal
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to submit proposal',
            error: error.message
        });
    }
};

export const getProposalsByUser = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { status } = req.query;

        const whereClause = { user_id };
        if (status) whereClause.status = status;

        const proposals = await Proposal.findAll({
            where: whereClause,
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['id', 'name', 'code']
                },
                {
                    model: ProposalDetail,
                    as: 'details'
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'User proposals retrieved successfully',
            data: proposals
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user proposals',
            error: error.message
        });
    }
};

export const getProposalStats = async (req, res) => {
    try {
        const stats = await Proposal.findAll({
            attributes: [
                'status',
                [Proposal.sequelize.fn('COUNT', Proposal.sequelize.col('id')), 'count']
            ],
            group: ['status']
        });

        const totalProposals = await Proposal.count();
        const totalBudget = await Proposal.sum('budget');

        res.status(200).json({
            success: true,
            message: 'Proposal statistics retrieved successfully',
            data: {
                stats,
                totals: {
                    total_proposals: totalProposals,
                    total_budget: totalBudget
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve proposal statistics',
            error: error.message
        });
    }
};
