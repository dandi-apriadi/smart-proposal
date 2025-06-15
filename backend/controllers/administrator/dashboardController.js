import { getAdminDashboard } from '../dashboardController.js';

// Re-export admin dashboard function for administrator routes
// This allows administrator-specific routing while reusing the main dashboard logic
export const getDashboard = getAdminDashboard;

// Administrator-specific dashboard function (alias for admin dashboard)
export const getAdministratorDashboard = async (req, res) => {
    // This routes to the admin dashboard since administrator = admin
    return await getAdminDashboard(req, res);
};
