import { Document, User } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';

export const getAllDocuments = async (req, res) => {
    try {
        const { page = 1, limit = 10, entity_type, entity_id, status, search } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};

        if (entity_type) whereClause.entity_type = entity_type;
        if (entity_id) whereClause.entity_id = entity_id;
        if (status) whereClause.status = status;
        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { type: { [Op.like]: `%${search}%` } }
            ];
        }

        const documents = await Document.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'uploader',
                    attributes: ['id', 'full_name', 'email']
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['upload_date', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Documents retrieved successfully',
            data: {
                documents: documents.rows,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(documents.count / limit),
                    total_items: documents.count,
                    items_per_page: parseInt(limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve documents',
            error: error.message
        });
    }
};

export const getDocumentById = async (req, res) => {
    try {
        const { id } = req.params;

        const document = await Document.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'uploader',
                    attributes: ['id', 'full_name', 'email', 'role']
                }
            ]
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Document retrieved successfully',
            data: document
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve document',
            error: error.message
        });
    }
};

export const uploadDocument = async (req, res) => {
    try {
        const {
            name,
            type,
            file_path,
            size,
            format,
            entity_type,
            entity_id,
            notes = null
        } = req.body;

        const uploaded_by = req.user.id; // From authentication middleware

        const document = await Document.create({
            name,
            type,
            file_path,
            size,
            format,
            entity_type,
            entity_id,
            uploaded_by,
            notes,
            status: 'pending'
        });

        // Fetch the created document with relations
        const createdDocument = await Document.findByPk(document.id, {
            include: [
                {
                    model: User,
                    as: 'uploader',
                    attributes: ['id', 'full_name', 'email']
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Document uploaded successfully',
            data: createdDocument
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to upload document',
            error: error.message
        });
    }
};

export const updateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const document = await Document.findByPk(id);

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        // Check if user uploaded this document or has admin rights
        if (document.uploaded_by !== req.user.id && !['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await document.update(updateData);

        const updatedDocument = await Document.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'uploader',
                    attributes: ['id', 'full_name', 'email']
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Document updated successfully',
            data: updatedDocument
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update document',
            error: error.message
        });
    }
};

export const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;

        const document = await Document.findByPk(id);

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        // Check if user uploaded this document or has admin rights
        if (document.uploaded_by !== req.user.id && !['admin', 'wadir'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await document.destroy();

        res.status(200).json({
            success: true,
            message: 'Document deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete document',
            error: error.message
        });
    }
};

export const getDocumentsByEntity = async (req, res) => {
    try {
        const { entity_type, entity_id } = req.params;
        const { status } = req.query;

        const whereClause = { entity_type, entity_id };
        if (status) whereClause.status = status;

        const documents = await Document.findAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'uploader',
                    attributes: ['id', 'full_name', 'email']
                }
            ],
            order: [['upload_date', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Entity documents retrieved successfully',
            data: documents
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve entity documents',
            error: error.message
        });
    }
};

export const getUserDocuments = async (req, res) => {
    try {
        const uploaded_by = req.user.id;
        const { entity_type, status } = req.query;

        const whereClause = { uploaded_by };
        if (entity_type) whereClause.entity_type = entity_type;
        if (status) whereClause.status = status;

        const documents = await Document.findAll({
            where: whereClause,
            order: [['upload_date', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'User documents retrieved successfully',
            data: documents
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user documents',
            error: error.message
        });
    }
};

export const approveDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const { notes } = req.body;

        // Check if user has approval rights
        if (!['admin', 'wadir', 'bendahara'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Approval rights required'
            });
        }

        const document = await Document.findByPk(id);

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        await document.update({
            status: 'approved',
            notes: notes || document.notes
        });

        const updatedDocument = await Document.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'uploader',
                    attributes: ['id', 'full_name', 'email']
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Document approved successfully',
            data: updatedDocument
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to approve document',
            error: error.message
        });
    }
};

export const rejectDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const { notes } = req.body;

        // Check if user has rejection rights
        if (!['admin', 'wadir', 'bendahara'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Approval rights required'
            });
        }

        const document = await Document.findByPk(id);

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        if (!notes) {
            return res.status(400).json({
                success: false,
                message: 'Rejection notes are required'
            });
        }

        await document.update({
            status: 'rejected',
            notes
        });

        const updatedDocument = await Document.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'uploader',
                    attributes: ['id', 'full_name', 'email']
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Document rejected successfully',
            data: updatedDocument
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to reject document',
            error: error.message
        });
    }
};

export const getDocumentStats = async (req, res) => {
    try {
        const stats = await Document.findAll({
            attributes: [
                'status',
                'entity_type',
                [Document.sequelize.fn('COUNT', Document.sequelize.col('id')), 'count']
            ],
            group: ['status', 'entity_type']
        });

        const totalDocuments = await Document.count();
        const totalSizeResult = await Document.findOne({
            attributes: [[Document.sequelize.fn('SUM', Document.sequelize.col('size')), 'total_size']]
        });

        res.status(200).json({
            success: true,
            message: 'Document statistics retrieved successfully',
            data: {
                stats,
                totals: {
                    total_documents: totalDocuments,
                    total_size: totalSizeResult.dataValues.total_size || 0
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve document statistics',
            error: error.message
        });
    }
};
