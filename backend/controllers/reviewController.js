import { Review, Proposal, User } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';

export const getAllReviews = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, proposal_id, reviewer_id } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};

        if (status) whereClause.status = status;
        if (proposal_id) whereClause.proposal_id = proposal_id;
        if (reviewer_id) whereClause.reviewer_id = reviewer_id;

        const reviews = await Review.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'status', 'budget'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'full_name', 'email']
                        }
                    ]
                },
                {
                    model: User,
                    as: 'reviewer',
                    attributes: ['id', 'full_name', 'email', 'role']
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['review_date', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Reviews retrieved successfully',
            data: {
                reviews: reviews.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(reviews.count / limit),
                    total_items: reviews.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve reviews',
            error: error.message
        });
    }
};

export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findByPk(id, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'description', 'status', 'budget', 'type'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'full_name', 'email', 'faculty']
                        }
                    ]
                },
                {
                    model: User,
                    as: 'reviewer',
                    attributes: ['id', 'full_name', 'email', 'role', 'position']
                }
            ]
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Review retrieved successfully',
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve review',
            error: error.message
        });
    }
};

export const createReview = async (req, res) => {
    try {
        const {
            proposal_id,
            score,
            comments,
            recommendation
        } = req.body;

        const reviewer_id = req.user.id; // From authentication middleware

        // Check if proposal exists
        const proposal = await Proposal.findByPk(proposal_id);
        if (!proposal) {
            return res.status(404).json({
                success: false,
                message: 'Proposal not found'
            });
        }

        // Check if user already reviewed this proposal
        const existingReview = await Review.findOne({
            where: { proposal_id, reviewer_id }
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this proposal'
            });
        }

        // Check if user has reviewer role
        if (!['reviewer', 'admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Reviewer role required'
            });
        }

        const review = await Review.create({
            proposal_id,
            reviewer_id,
            score,
            comments,
            recommendation,
            status: 'completed'
        });

        // Fetch the created review with relations
        const createdReview = await Review.findByPk(review.id, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'status']
                },
                {
                    model: User,
                    as: 'reviewer',
                    attributes: ['id', 'full_name', 'email']
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Review created successfully',
            data: createdReview
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create review',
            error: error.message
        });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Check if user owns this review or has admin rights
        if (review.reviewer_id !== req.user.id && !['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await review.update(updateData);

        const updatedReview = await Review.findByPk(id, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'status']
                },
                {
                    model: User,
                    as: 'reviewer',
                    attributes: ['id', 'full_name', 'email']
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            data: updatedReview
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update review',
            error: error.message
        });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Check if user owns this review or has admin rights
        if (review.reviewer_id !== req.user.id && !['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await review.destroy();

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete review',
            error: error.message
        });
    }
};

export const getReviewsByProposal = async (req, res) => {
    try {
        const { proposal_id } = req.params;
        const { status } = req.query;

        const whereClause = { proposal_id };
        if (status) whereClause.status = status;

        const reviews = await Review.findAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'reviewer',
                    attributes: ['id', 'full_name', 'email', 'role', 'position']
                }
            ],
            order: [['review_date', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Proposal reviews retrieved successfully',
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve proposal reviews',
            error: error.message
        });
    }
};

export const getReviewsByReviewer = async (req, res) => {
    try {
        const reviewer_id = req.user.id;
        const { status, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = { reviewer_id };
        if (status) whereClause.status = status;

        const reviews = await Review.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'status', 'budget', 'type'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'full_name', 'email']
                        }
                    ]
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['review_date', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Reviewer reviews retrieved successfully',
            data: {
                reviews: reviews.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(reviews.count / limit),
                    total_items: reviews.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve reviewer reviews',
            error: error.message
        });
    }
};

export const getReviewStats = async (req, res) => {
    try {
        const stats = await Review.findAll({
            attributes: [
                'recommendation',
                [Review.sequelize.fn('COUNT', Review.sequelize.col('id')), 'count'],
                [Review.sequelize.fn('AVG', Review.sequelize.col('score')), 'avg_score']
            ],
            group: ['recommendation']
        });

        const totalReviews = await Review.count();
        const avgScore = await Review.findOne({
            attributes: [[Review.sequelize.fn('AVG', Review.sequelize.col('score')), 'average_score']]
        });

        res.status(200).json({
            success: true,
            message: 'Review statistics retrieved successfully',
            data: {
                stats,
                totals: {
                    total_reviews: totalReviews,
                    overall_average_score: avgScore.dataValues.average_score
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve review statistics',
            error: error.message
        });
    }
};

export const assignReviewer = async (req, res) => {
    try {
        const { proposal_id, reviewer_id } = req.body;

        // Check if proposal exists
        const proposal = await Proposal.findByPk(proposal_id);
        if (!proposal) {
            return res.status(404).json({
                success: false,
                message: 'Proposal not found'
            });
        }

        // Check if reviewer exists and has reviewer role
        const reviewer = await User.findByPk(reviewer_id);
        if (!reviewer || !['reviewer', 'admin'].includes(reviewer.role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid reviewer'
            });
        }

        // Check if reviewer already assigned
        const existingAssignment = await Review.findOne({
            where: { proposal_id, reviewer_id, status: 'pending' }
        });

        if (existingAssignment) {
            return res.status(400).json({
                success: false,
                message: 'Reviewer already assigned to this proposal'
            });
        }

        // Create pending review assignment
        const review = await Review.create({
            proposal_id,
            reviewer_id,
            recommendation: 'approve', // Default, will be updated when review is completed
            status: 'pending'
        });

        const createdReview = await Review.findByPk(review.id, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title']
                },
                {
                    model: User,
                    as: 'reviewer',
                    attributes: ['id', 'full_name', 'email']
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Reviewer assigned successfully',
            data: createdReview
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to assign reviewer',
            error: error.message
        });
    }
};
