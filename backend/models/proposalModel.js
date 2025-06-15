import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import moment from "moment";

const { DataTypes } = Sequelize;

// Proposals Model
const Proposal = db.define('proposals', {
    id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    session_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: 'sessions',
            key: 'id'
        }
    },
    department_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
            model: 'departments',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('draft', 'submitted', 'under_review', 'approved', 'rejected', 'revision_required'),
        allowNull: false
    },
    ml_score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    budget: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM('high', 'medium', 'low'),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('created_at')).format('D MMMM, YYYY, h:mm A');
        }
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('updated_at')).format('D MMMM, YYYY, h:mm A');
        }
    },
    submitted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        get() {
            const value = this.getDataValue('submitted_at');
            return value ? moment(value).format('D MMMM, YYYY, h:mm A') : null;
        }
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true,
        get() {
            const value = this.getDataValue('deadline');
            return value ? moment(value).format('D MMMM, YYYY, h:mm A') : null;
        }
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    reject_reason: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export { Proposal };
