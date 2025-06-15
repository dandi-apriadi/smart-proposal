import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

// Feedbacks Model
const Feedback = db.define('feedbacks', {
    id: {
        type: DataTypes.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false
    },
    entity_type: {
        type: DataTypes.ENUM('proposal', 'report', 'final_report'),
        allowNull: false
    },
    entity_id: {
        type: DataTypes.STRING(36),
        allowNull: false
    },
    reviewer: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    section: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('date')).format('D MMMM, YYYY, h:mm A');
        }
    },
    status: {
        type: DataTypes.ENUM('resolved', 'unresolved'),
        allowNull: false,
        defaultValue: 'unresolved'
    },
    response: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export { Feedback };
