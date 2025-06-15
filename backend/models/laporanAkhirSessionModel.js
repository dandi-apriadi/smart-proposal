import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

// Laporan Akhir Sessions Model
const LaporanAkhirSession = db.define('laporan_akhir_sessions', {
    id: {
        type: DataTypes.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    completion_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    total_proposals: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    approved: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    rejected: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    revised: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    approval_rate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    average_score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    average_review_time: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    total_budget: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    allocated_budget: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export { LaporanAkhirSession };
