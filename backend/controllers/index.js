// Export all controllers
export * from './proposalController.js';
export * from './departmentController.js';
export * from './reviewController.js';
export * from './documentController.js';
export * from './financialReportController.js';
export * from './activityLogController.js';
export * from './resourceController.js';
export * from './faqController.js';
export * from './userController.js';
export * from './fundUtilizationController.js';
export * from './dashboardController.js';

// Import existing controllers
import * as authController from './shared/authController.js';
import * as adminDashboardController from './administrator/dashboardController.js';

// Re-export existing controllers
export { authController, adminDashboardController };
