// Import all models
import { User } from './userModel.js';
import { Department } from './departmentModel.js';
import { Proposal } from './proposalModel.js';
import { ProposalDetail } from './proposalDetailModel.js';
import { Collaborator } from './collaboratorModel.js';
import { Document } from './documentModel.js';
import { Review } from './reviewModel.js';
import { MLValidation } from './mlValidationModel.js';
import { BudgetAllocation } from './budgetAllocationModel.js';
import { BudgetCategory } from './budgetCategoryModel.js';
import { FinancialReport } from './financialReportModel.js';
import { FundUtilization } from './fundUtilizationModel.js';
import { FinalReport } from './finalReportModel.js';
import { Feedback } from './feedbackModel.js';
import { ActivityLog } from './activityLogModel.js';
import { Resource } from './resourceModel.js';
import { FAQ } from './faqModel.js';
import { LaporanAkhirSession } from './laporanAkhirSessionModel.js';
import { RecentActivity } from './recentActivityModel.js';
import { Report } from './reportModel.js';

// Define associations with optimized indexing
const setupAssociations = () => {
    // User associations
    User.hasMany(Proposal, {
        foreignKey: 'user_id',
        as: 'proposals',
        constraints: false // Disable automatic constraint creation
    });
    User.hasMany(Review, {
        foreignKey: 'reviewer_id',
        as: 'reviews',
        constraints: false
    });
    User.hasMany(Document, {
        foreignKey: 'uploaded_by',
        as: 'documents',
        constraints: false
    });
    User.hasMany(BudgetAllocation, {
        foreignKey: 'allocated_by',
        as: 'budget_allocations',
        constraints: false
    });
    User.hasMany(FinancialReport, {
        foreignKey: 'submitted_by',
        as: 'submitted_reports',
        constraints: false
    });
    User.hasMany(FinancialReport, {
        foreignKey: 'verified_by',
        as: 'verified_reports',
        constraints: false
    });
    User.hasMany(MLValidation, {
        foreignKey: 'override_by',
        as: 'ml_overrides',
        constraints: false
    });    // Department associations - Fixed conflict
    // User belongs to Department
    User.belongsTo(Department, {
        foreignKey: 'department_id',
        as: 'user_department',
        constraints: false
    });

    // Remove problematic head_id relationship that causes circular reference
    // Department head can be handled manually in queries if needed

    Department.hasMany(Proposal, {
        foreignKey: 'department_id',
        as: 'proposals',
        constraints: false
    });
    Department.hasMany(BudgetAllocation, {
        foreignKey: 'department_id',
        as: 'budget_allocations',
        constraints: false
    });
    Department.belongsTo(Department, {
        foreignKey: 'parent_id',
        as: 'parent',
        constraints: false
    });
    Department.hasMany(Department, {
        foreignKey: 'parent_id',
        as: 'children',
        constraints: false
    });// Proposal associations
    Proposal.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user',
        constraints: false
    });
    Proposal.belongsTo(Department, {
        foreignKey: 'department_id',
        as: 'department',
        constraints: false
    });
    Proposal.hasOne(ProposalDetail, {
        foreignKey: 'proposal_id',
        as: 'details',
        constraints: false
    });
    Proposal.hasMany(Collaborator, {
        foreignKey: 'proposal_id',
        as: 'collaborators',
        constraints: false
    });
    Proposal.hasMany(Review, {
        foreignKey: 'proposal_id',
        as: 'reviews',
        constraints: false
    });
    Proposal.hasMany(MLValidation, {
        foreignKey: 'proposal_id',
        as: 'ml_validations',
        constraints: false
    });
    Proposal.hasMany(FinancialReport, {
        foreignKey: 'proposal_id',
        as: 'financial_reports',
        constraints: false
    });
    Proposal.hasMany(FundUtilization, {
        foreignKey: 'proposal_id',
        as: 'fund_utilizations',
        constraints: false
    });
    Proposal.hasMany(FinalReport, {
        foreignKey: 'proposal_id',
        as: 'final_reports',
        constraints: false
    });

    // ProposalDetail associations
    ProposalDetail.belongsTo(Proposal, {
        foreignKey: 'proposal_id',
        as: 'proposal',
        constraints: false
    });

    // Collaborator associations
    Collaborator.belongsTo(Proposal, {
        foreignKey: 'proposal_id',
        as: 'proposal',
        constraints: false
    });

    // Review associations
    Review.belongsTo(Proposal, {
        foreignKey: 'proposal_id',
        as: 'proposal',
        constraints: false
    });
    Review.belongsTo(User, {
        foreignKey: 'reviewer_id',
        as: 'reviewer',
        constraints: false
    });

    // MLValidation associations
    MLValidation.belongsTo(Proposal, {
        foreignKey: 'proposal_id',
        as: 'proposal',
        constraints: false
    });
    MLValidation.belongsTo(User, {
        foreignKey: 'override_by',
        as: 'override_user',
        constraints: false
    });

    // BudgetAllocation associations
    BudgetAllocation.belongsTo(Department, {
        foreignKey: 'department_id',
        as: 'department',
        constraints: false
    });
    BudgetAllocation.belongsTo(User, {
        foreignKey: 'allocated_by',
        as: 'allocator',
        constraints: false
    });

    // FinancialReport associations
    FinancialReport.belongsTo(Proposal, {
        foreignKey: 'proposal_id',
        as: 'proposal',
        constraints: false
    });
    FinancialReport.belongsTo(User, {
        foreignKey: 'submitted_by',
        as: 'submitter',
        constraints: false
    });
    FinancialReport.belongsTo(User, {
        foreignKey: 'verified_by',
        as: 'verifier',
        constraints: false
    });

    // FundUtilization associations
    FundUtilization.belongsTo(Proposal, {
        foreignKey: 'proposal_id',
        as: 'proposal',
        constraints: false
    });

    // FinalReport associations
    FinalReport.belongsTo(Proposal, {
        foreignKey: 'proposal_id',
        as: 'proposal',
        constraints: false
    });

    // Document associations
    Document.belongsTo(User, {
        foreignKey: 'uploaded_by',
        as: 'uploader',
        constraints: false
    });
};

// Setup associations
setupAssociations();

// Export all models
export {
    User,
    Department,
    Proposal,
    ProposalDetail,
    Collaborator,
    Document,
    Review,
    MLValidation,
    BudgetAllocation,
    BudgetCategory,
    FinancialReport,
    FundUtilization,
    FinalReport,
    Feedback,
    ActivityLog,
    Resource,
    FAQ,
    LaporanAkhirSession,
    RecentActivity,
    Report,
    setupAssociations
};
