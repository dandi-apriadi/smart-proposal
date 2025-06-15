import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

// Sessions Model
const Session = db.define('sessions', {
    id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('upcoming', 'active', 'closed'),
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            const value = this.getDataValue('start_date');
            return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : null;
        }
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            const value = this.getDataValue('end_date');
            return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : null;
        }
    },
    final_report_deadline: {
        type: DataTypes.DATE,
        allowNull: true,
        get() {
            const value = this.getDataValue('final_report_deadline');
            return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : null;
        }
    },
    created_by: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
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
    total_budget: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true
    },
    remaining_days: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export { Session };
