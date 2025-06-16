import {
    Proposal,
    User,
    Review,
    FinancialReport,
    FundUtilization,
    ActivityLog,
    Department
} from '../models/index.js';
import { Op } from 'sequelize';

// Demo data for when authentication fails or database is unavailable
const getDemoData = () => ({
    overview: {
        total_users: 248,
        active_users: 178,
        total_proposals: 124,
        total_departments: 12
    },
    proposal_stats: [
        { status: 'approved', count: 86 },
        { status: 'pending', count: 32 },
        { status: 'rejected', count: 6 }
    ],
    user_stats: [
        { role: 'dosen', count: 120 },
        { role: 'reviewer', count: 45 },
        { role: 'admin', count: 8 },
        { role: 'wadir', count: 5 }
    ],
    recent_activities: [
        {
            user_name: 'Dr. Ahmad Wijaya',
            action: 'submitted a new proposal',
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
            user_name: 'Prof. Siti Nurhaliza',
            action: 'reviewed proposal #124',
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
        },
        {
            user_name: 'Dr. Budi Santoso',
            action: 'updated financial report',
            created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
        }
    ],
    monthly_trends: {
        proposals: [32, 28, 42, 38, 47, 50],
        users: [450, 380, 520, 490, 600, 570]
    }
});

// Public demo dashboard endpoint (no authentication required)
export const getDemoDashboard = async (req, res) => {
    try {
        const demoData = getDemoData();

        res.json({
            success: true,
            message: 'Demo dashboard data retrieved successfully',
            data: demoData,
            isDemo: true
        });
    } catch (error) {
        console.error('Error generating demo dashboard:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate demo dashboard data',
            error: error.message
        });
    }
};

// Dashboard untuk Admin
export const getAdminDashboard = async (req, res) => {
    try {
        // Check if user has admin rights
        if (!['admin'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin rights required'
            });
        }

        // Get basic statistics
        const totalUsers = await User.count();
        const activeUsers = await User.count({ where: { status: 'active' } });
        const totalProposals = await Proposal.count();
        const totalDepartments = await Department.count();

        // Get proposal statistics by status
        const proposalStats = await Proposal.findAll({
            attributes: [
                'status',
                [Proposal.sequelize.fn('COUNT', Proposal.sequelize.col('id')), 'count']
            ],
            group: ['status']
        });

        // Get user statistics by role
        const userStats = await User.findAll({
            attributes: [
                'role',
                [User.sequelize.fn('COUNT', User.sequelize.col('id')), 'count']
            ],
            group: ['role']
        });

        // Get recent activities
        const recentActivities = await ActivityLog.findAll({
            limit: 10,
            order: [['created_at', 'DESC']]
        });

        // Get monthly proposal trends (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const monthlyProposals = await Proposal.findAll({
            attributes: [
                [Proposal.sequelize.fn('DATE_FORMAT', Proposal.sequelize.col('created_at'), '%Y-%m'), 'month'],
                [Proposal.sequelize.fn('COUNT', Proposal.sequelize.col('id')), 'count']
            ],
            where: {
                created_at: {
                    [Op.gte]: sixMonthsAgo
                }
            },
            group: [Proposal.sequelize.fn('DATE_FORMAT', Proposal.sequelize.col('created_at'), '%Y-%m')],
            order: [[Proposal.sequelize.fn('DATE_FORMAT', Proposal.sequelize.col('created_at'), '%Y-%m'), 'ASC']]
        });

        res.status(200).json({
            success: true,
            message: 'Admin dashboard data retrieved successfully',
            data: {
                overview: {
                    total_users: totalUsers,
                    active_users: activeUsers,
                    total_proposals: totalProposals,
                    total_departments: totalDepartments
                },
                proposal_stats: proposalStats,
                user_stats: userStats,
                recent_activities: recentActivities,
                monthly_trends: monthlyProposals
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve admin dashboard data',
            error: error.message
        });
    }
};

// Dashboard untuk Wadir
export const getWadirDashboard = async (req, res) => {
    try {
        // Check if user has wadir rights
        if (!['wadir', 'admin'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Wadir rights required'
            });
        }

        // Get proposal statistics
        const totalProposals = await Proposal.count();
        const pendingReviews = await Proposal.count({ where: { status: 'under_review' } });
        const approvedProposals = await Proposal.count({ where: { status: 'approved' } });
        const rejectedProposals = await Proposal.count({ where: { status: 'rejected' } });

        // Get budget information
        const totalBudgetRequested = await Proposal.sum('budget');
        const approvedBudget = await Proposal.sum('budget', { where: { status: 'approved' } });

        // Get proposals by department
        const proposalsByDepartment = await Proposal.findAll({
            attributes: [
                [Proposal.sequelize.col('department.name'), 'department_name'],
                [Proposal.sequelize.fn('COUNT', Proposal.sequelize.col('Proposal.id')), 'count'],
                [Proposal.sequelize.fn('SUM', Proposal.sequelize.col('budget')), 'total_budget']
            ],
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: []
                }
            ],
            group: ['department.id', 'department.name']
        });

        // Get recent proposals needing attention
        const recentProposals = await Proposal.findAll({
            where: {
                status: {
                    [Op.in]: ['submitted', 'under_review']
                }
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['full_name', 'email']
                },
                {
                    model: Department,
                    as: 'department',
                    attributes: ['name']
                }
            ],
            limit: 10,
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Wadir dashboard data retrieved successfully',
            data: {
                overview: {
                    total_proposals: totalProposals,
                    pending_reviews: pendingReviews,
                    approved_proposals: approvedProposals,
                    rejected_proposals: rejectedProposals,
                    total_budget_requested: totalBudgetRequested,
                    approved_budget: approvedBudget
                },
                proposals_by_department: proposalsByDepartment,
                recent_proposals: recentProposals
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve wadir dashboard data',
            error: error.message
        });
    }
};

// Dashboard untuk Dosen
export const getDosenDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get user's proposals
        const userProposals = await Proposal.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['name']
                }
            ],
            order: [['created_at', 'DESC']]
        });

        // Get proposal statistics
        const proposalStats = await Proposal.findAll({
            attributes: [
                'status',
                [Proposal.sequelize.fn('COUNT', Proposal.sequelize.col('id')), 'count']
            ],
            where: { user_id: userId },
            group: ['status']
        });

        // Get financial reports for user's proposals
        const financialReports = await FinancialReport.findAll({
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    where: { user_id: userId },
                    attributes: ['title']
                }
            ],
            limit: 5,
            order: [['submission_date', 'DESC']]
        });

        // Get fund utilizations for user's proposals
        const fundUtilizations = await FundUtilization.findAll({
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    where: { user_id: userId },
                    attributes: ['title']
                }
            ],
            limit: 5,
            order: [['submission_date', 'DESC']]
        });

        // Calculate total budget
        const totalBudgetRequested = await Proposal.sum('budget', { where: { user_id: userId } });
        const approvedBudget = await Proposal.sum('budget', {
            where: {
                user_id: userId,
                status: 'approved'
            }
        });

        res.status(200).json({
            success: true,
            message: 'Dosen dashboard data retrieved successfully',
            data: {
                overview: {
                    total_proposals: userProposals.length,
                    total_budget_requested: totalBudgetRequested || 0,
                    approved_budget: approvedBudget || 0
                },
                proposal_stats: proposalStats,
                recent_proposals: userProposals.slice(0, 5),
                recent_financial_reports: financialReports,
                recent_fund_utilizations: fundUtilizations
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve dosen dashboard data',
            error: error.message
        });
    }
};

// Dashboard untuk Reviewer
export const getReviewerDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get assigned reviews
        const assignedReviews = await Review.findAll({
            where: { reviewer_id: userId },
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'budget', 'status'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['full_name']
                        }
                    ]
                }
            ],
            order: [['review_date', 'DESC']]
        });

        // Get pending reviews
        const pendingReviews = assignedReviews.filter(review => review.status === 'pending');
        const completedReviews = assignedReviews.filter(review => review.status === 'completed');

        // Get review statistics
        const reviewStats = await Review.findAll({
            attributes: [
                'recommendation',
                [Review.sequelize.fn('COUNT', Review.sequelize.col('id')), 'count']
            ],
            where: { reviewer_id: userId },
            group: ['recommendation']
        });

        // Get average score given by reviewer
        const avgScore = await Review.findOne({
            attributes: [[Review.sequelize.fn('AVG', Review.sequelize.col('score')), 'average_score']],
            where: {
                reviewer_id: userId,
                score: { [Op.not]: null }
            }
        });

        res.status(200).json({
            success: true,
            message: 'Reviewer dashboard data retrieved successfully',
            data: {
                overview: {
                    total_assigned: assignedReviews.length,
                    pending_reviews: pendingReviews.length,
                    completed_reviews: completedReviews.length,
                    average_score: avgScore?.dataValues.average_score || 0
                },
                review_stats: reviewStats,
                pending_reviews: pendingReviews.slice(0, 10),
                recent_completed: completedReviews.slice(0, 5)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve reviewer dashboard data',
            error: error.message
        });
    }
};

// Dashboard untuk Bendahara
export const getBendaharaDashboard = async (req, res) => {
    try {
        // Check if user has bendahara rights
        if (!['bendahara', 'admin'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Bendahara rights required'
            });
        }

        // Get financial report statistics
        const totalFinancialReports = await FinancialReport.count();
        const pendingReports = await FinancialReport.count({ where: { status: 'submitted' } });
        const verifiedReports = await FinancialReport.count({ where: { status: 'verified' } });

        // Get fund utilization statistics
        const totalUtilizations = await FundUtilization.count();
        const pendingUtilizations = await FundUtilization.count({ where: { status: 'Menunggu Verifikasi' } });
        const verifiedUtilizations = await FundUtilization.count({ where: { status: 'Terverifikasi' } });

        // Get total amounts
        const totalAmountUsed = await FundUtilization.sum('amount_used');
        const totalAllocated = await FundUtilization.sum('total_allocated');

        // Get recent financial reports needing verification
        const recentReports = await FinancialReport.findAll({
            where: { status: 'submitted' },
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['title'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['full_name']
                        }
                    ]
                }
            ],
            limit: 10,
            order: [['submission_date', 'DESC']]
        });

        // Get recent fund utilizations needing verification
        const recentUtilizations = await FundUtilization.findAll({
            where: { status: 'Menunggu Verifikasi' },
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['title']
                }
            ],
            limit: 10,
            order: [['submission_date', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Bendahara dashboard data retrieved successfully',
            data: {
                overview: {
                    total_financial_reports: totalFinancialReports,
                    pending_reports: pendingReports,
                    verified_reports: verifiedReports,
                    total_utilizations: totalUtilizations,
                    pending_utilizations: pendingUtilizations,
                    verified_utilizations: verifiedUtilizations,
                    total_amount_used: totalAmountUsed || 0,
                    total_allocated: totalAllocated || 0,
                    utilization_rate: totalAllocated ? ((totalAmountUsed / totalAllocated) * 100).toFixed(2) : 0
                },
                recent_reports: recentReports,
                recent_utilizations: recentUtilizations
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve bendahara dashboard data',
            error: error.message
        });
    }
};

// General dashboard - routes to appropriate dashboard based on user role
export const getDashboard = async (req, res) => {
    try {
        const userRole = req.user.role;

        switch (userRole) {
            case 'admin':
                return await getAdminDashboard(req, res);
            case 'wadir':
                return await getWadirDashboard(req, res);
            case 'dosen':
                return await getDosenDashboard(req, res);
            case 'reviewer':
                return await getReviewerDashboard(req, res);
            case 'bendahara':
                return await getBendaharaDashboard(req, res);
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user role'
                });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve dashboard data',
            error: error.message
        });
    }
};
