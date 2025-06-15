import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import moment from "moment";

const { DataTypes } = Sequelize;

// Financial Reports Model
const FinancialReport = db.define('financial_reports', {
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
    report_type: {
        type: DataTypes.ENUM('monthly', 'quarterly', 'session', 'final', 'audit'),
        allowNull: false
    },
    period: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    submitted_by: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    submission_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('submission_date')).format('D MMMM, YYYY, h:mm A');
        }
    },
    status: {
        type: DataTypes.ENUM('draft', 'submitted', 'verified', 'rejected'),
        allowNull: false
    },
    format: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'PDF'
    },
    verification_date: {
        type: DataTypes.DATE,
        allowNull: true,
        get() {
            const value = this.getDataValue('verification_date');
            return value ? moment(value).format('D MMMM, YYYY, h:mm A') : null;
        }
    },
    verified_by: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export { FinancialReport };
