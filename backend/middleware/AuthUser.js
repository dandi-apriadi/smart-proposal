import { User } from "../models/userModel.js";

// Middleware to verify if the user is authenticated
export const verifyUser = async (req, res, next) => {
    try {
        // Check if user is logged in (session validation)
        console.log('Session check - user_id:', req.session.user_id);

        if (!req.session.user_id) {
            return res.status(401).json({
                success: false,
                msg: "Mohon login ke Akun Anda!"
            });
        }

        const user = await User.findOne({
            where: {
                user_id: req.session.user_id
            },
            attributes: { exclude: ['password_hash'] }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User tidak ditemukan"
            });
        }

        // Add user data to request object
        req.user_id = user.user_id;
        req.role = user.role;
        req.user = user; // Add complete user object for controller access

        console.log('User authenticated:', user.username, 'Role:', user.role);
        next();

    } catch (error) {
        console.error("Error verifying user:", error);
        res.status(500).json({
            success: false,
            msg: "Terjadi kesalahan pada server",
            error: error.message
        });
    }
}

// Middleware to restrict access to admin users only
export const adminOnly = async (req, res, next) => {
    try {
        // User should be already authenticated by verifyUser middleware
        if (!req.user_id) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized"
            });
        }

        // Get user from database to check role
        const user = await User.findOne({
            where: {
                user_id: req.user_id
            }
        });

        if (!user || user.role !== 'admin') {
            return res.status(403).json({
                status: "error",
                message: "Access denied. Admin privileges required."
            });
        }

        next();
    } catch (error) {
        console.error("Admin authorization error:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};