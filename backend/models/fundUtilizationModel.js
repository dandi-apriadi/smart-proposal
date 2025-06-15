import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

// Fund Utilizations Model
const FundUtilization = db.define('fund_utilizations', {
    id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    proposal_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: 'proposals',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    researcher: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    faculty: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    submission_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    amount_used: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    total_allocated: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Menunggu Verifikasi', 'Terverifikasi', 'Ditolak'),
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rejection_reason: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export { FundUtilization };
