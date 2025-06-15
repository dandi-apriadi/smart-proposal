import { FinancialReport, Proposal, User } from '../models/index.js';
import { Op } from 'sequelize';

export const getAllFinancialReports = async (req, res) => {
    try {
        const { page = 1, limit = 10, report_type, status, period, search } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};

        if (report_type) whereClause.report_type = report_type;
        if (status) whereClause.status = status;
        if (period) whereClause.period = { [Op.like]: `%${period}%` };
        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { period: { [Op.like]: `%${search}%` } }
            ];
        }

        const reports = await FinancialReport.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'budget'],
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
                    as: 'submitter',
                    attributes: ['id', 'full_name', 'email']
                },
                {
                    model: User,
                    as: 'verifier',
                    attributes: ['id', 'full_name', 'email']
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['submission_date', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Financial reports retrieved successfully',
            data: {
                reports: reports.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(reports.count / limit),
                    total_items: reports.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve financial reports',
            error: error.message
        });
    }
};

export const getFinancialReportById = async (req, res) => {
    try {
        const { id } = req.params;

        const report = await FinancialReport.findByPk(id, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'budget', 'type'],
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
                    as: 'submitter',
                    attributes: ['id', 'full_name', 'email', 'role']
                },
                {
                    model: User,
                    as: 'verifier',
                    attributes: ['id', 'full_name', 'email', 'role']
                }
            ]
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Financial report not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Financial report retrieved successfully',
            data: report
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve financial report',
            error: error.message
        });
    }
};

export const createFinancialReport = async (req, res) => {
    try {
        const {
            proposal_id,
            title,
            report_type,
            period,
            format = 'PDF',
            notes
        } = req.body;

        const submitted_by = req.user.id; // From authentication middleware

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

        const reportId = `FR-${Date.now()}`;

        const report = await FinancialReport.create({
            id: reportId,
            proposal_id,
            title,
            report_type,
            period,
            submitted_by,
            status: 'draft',
            format,
            notes
        });

        // Fetch the created report with relations
        const createdReport = await FinancialReport.findByPk(reportId, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'budget']
                },
                {
                    model: User,
                    as: 'submitter',
                    attributes: ['id', 'full_name', 'email']
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Financial report created successfully',
            data: createdReport
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create financial report',
            error: error.message
        });
    }
};

export const updateFinancialReport = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const report = await FinancialReport.findByPk(id, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['user_id']
                }
            ]
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Financial report not found'
            });
        }

        // Check if user submitted this report or has admin rights
        if (report.submitted_by !== req.user.id &&
            report.proposal.user_id !== req.user.id &&
            !['admin', 'wadir', 'bendahara'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await report.update(updateData);

        const updatedReport = await FinancialReport.findByPk(id, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['id', 'title', 'budget']
                },
                {
                    model: User,
                    as: 'submitter',
                    attributes: ['id', 'full_name', 'email']
                },
                {
                    model: User,
                    as: 'verifier',
                    attributes: ['id', 'full_name', 'email']
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Financial report updated successfully',
            data: updatedReport
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update financial report',
            error: error.message
        });
    }
};

export const deleteFinancialReport = async (req, res) => {
    try {
        const { id } = req.params;

        const report = await FinancialReport.findByPk(id, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['user_id']
                }
            ]
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Financial report not found'
            });
        }

        // Check if user submitted this report or has admin rights
        if (report.submitted_by !== req.user.id &&
            report.proposal.user_id !== req.user.id &&
            !['admin', 'wadir', 'bendahara'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await report.destroy();

        res.status(200).json({
            success: true,
            message: 'Financial report deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete financial report',
            error: error.message
        });
    }
};

export const submitFinancialReport = async (req, res) => {
    try {
        const { id } = req.params;

        const report = await FinancialReport.findByPk(id, {
            include: [
                {
                    model: Proposal,
                    as: 'proposal',
                    attributes: ['user_id']
                }
            ]
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Financial report not found'
            });
        }

        // Check if user submitted this report or owns the proposal
        if (report.submitted_by !== req.user.id && report.proposal.user_id !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        if (report.status !== 'draft') {
            return res.status(400).json({
                success: false,
                message: 'Only draft reports can be submitted'
            });
        }

        await report.update({
            status: 'submitted'
        });

        res.status(200).json({
            success: true,
            message: 'Financial report submitted successfully',
            data: report
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to submit financial report',
            error: error.message
        });
    }
};

export const verifyFinancialReport = async (req, res) => {
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

        const report = await FinancialReport.findByPk(id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Financial report not found'
            });
        }

        if (report.status !== 'submitted') {
            return res.status(400).json({
                success: false,
                message: 'Only submitted reports can be verified'
            });
        }

        await report.update({
            status: 'verified',
            verified_by: req.user.id,
            verification_date: new Date(),
            notes: notes || report.notes
        });

        const updatedReport = await FinancialReport.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'verifier',
                    attributes: ['id', 'full_name', 'email']
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Financial report verified successfully',
            data: updatedReport
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to verify financial report',
            error: error.message
        });
    }
};

export const rejectFinancialReport = async (req, res) => {
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

        const report = await FinancialReport.findByPk(id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Financial report not found'
            });
        }

        if (!notes) {
            return res.status(400).json({
                success: false,
                message: 'Rejection notes are required'
            });
        }

        await report.update({
            status: 'rejected',
            verified_by: req.user.id,
            verification_date: new Date(),
            notes
        });

        const updatedReport = await FinancialReport.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'verifier',
                    attributes: ['id', 'full_name', 'email']
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Financial report rejected successfully',
            data: updatedReport
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to reject financial report',
            error: error.message
        });
    }
};

export const getFinancialReportsByProposal = async (req, res) => {
    try {
        const { proposal_id } = req.params;
        const { report_type, status } = req.query;

        const whereClause = { proposal_id };
        if (report_type) whereClause.report_type = report_type;
        if (status) whereClause.status = status;

        const reports = await FinancialReport.findAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'submitter',
                    attributes: ['id', 'full_name', 'email']
                },
                {
                    model: User,
                    as: 'verifier',
                    attributes: ['id', 'full_name', 'email']
                }
            ],
            order: [['submission_date', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Proposal financial reports retrieved successfully',
            data: reports
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve proposal financial reports',
            error: error.message
        });
    }
};

export const getFinancialReportStats = async (req, res) => {
    try {
        const stats = await FinancialReport.findAll({
            attributes: [
                'status',
                'report_type',
                [FinancialReport.sequelize.fn('COUNT', FinancialReport.sequelize.col('id')), 'count']
            ],
            group: ['status', 'report_type']
        });

        const totalReports = await FinancialReport.count();

        res.status(200).json({
            success: true,
            message: 'Financial report statistics retrieved successfully',
            data: {
                stats,
                totals: {
                    total_reports: totalReports
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve financial report statistics',
            error: error.message
        });
    }
};
