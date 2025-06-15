import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

// Budget Allocations Model
const BudgetAllocation = db.define('budget_allocations', {
    id: {
        type: DataTypes.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false
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
    amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    allocation_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('allocation_date')).format('D MMMM, YYYY, h:mm A');
        }
    },
    allocated_by: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('planned', 'allocated', 'utilized'),
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export { BudgetAllocation };
