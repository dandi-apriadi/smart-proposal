import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import SequelizeStore from "connect-session-sequelize";
import helmet from "helmet";
import db from "./config/Database.js";
import AllRoutes from "./routes/routes-backend.js";
dotenv.config();

// Pastikan app dideklarasikan sebelum dipakai
const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    })
);

const sessionStore = SequelizeStore(session.Store);

// Create session store with database
const store = new sessionStore({
    db: db,
});

// Middleware
app.use(helmet()); // Security headers
app.use(express.json()); // Parse JSON bodies
app.use(express.static("public")); // Serve static files

app.use(
    fileUpload({
        limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10MB
        abortOnLimit: true,
        responseOnLimit: "File terlalu besar",
        createParentPath: true,
        useTempFiles: true,
        tempFileDir: "/tmp/",
        preserveExtension: true,
        safeFileNames: true,
    })
);

// Session Configuration
app.use(
    session({
        secret: process.env.SESS_SECRET || "default_secret_key",
        resave: false,
        saveUninitialized: true,
        store: store,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
    })
);

// Database initialization with better error handling
const initDatabase = async () => {
    try {
        await db.authenticate();
        console.log('Database connection established.');

        // Check if tables exist first
        const [results] = await db.query("SHOW TABLES LIKE 'users'");
        const tablesExist = results.length > 0;

        if (tablesExist) {
            console.log('Tables already exist, skipping sync...');
            return true;
        }

        // If tables don't exist, create them without foreign key constraints first
        console.log('Creating tables without foreign key constraints...');
        await db.sync({
            force: false,
            alter: false,
            hooks: false,
            logging: false
        });

        console.log('Database synchronized successfully');
        return true;
    } catch (error) {
        console.error('Database initialization error:', error);

        // Try to continue without database sync
        try {
            console.log('Attempting to continue without sync...');
            // Just verify connection is working
            await db.query('SELECT 1');
            console.log('Database connection verified, continuing without sync...');
            return true;
        } catch (connectionError) {
            console.error('Database connection failed:', connectionError);
            return false;
        }
    }
};

const PORT = process.env.PORT || 5000;

// Wrap server initialization in IIFE
(async () => {
    try {
        const dbInitialized = await initDatabase();

        if (!dbInitialized) {
            console.error('Failed to initialize database');
            process.exit(1);
        }

        // Routes
        app.use(AllRoutes);
        // Global error handler
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ message: "Internal Server Error" });
        });

        // Start server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server initialization failed:', error);
        process.exit(1);
    }
})();
