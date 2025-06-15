import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

// Final Reports Model
const FinalReport = db.define('final_reports', {
    id: {
        type: DataTypes.STRING(36),
        defaultValue: () => uuidv4(),
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
    abstract: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    introduction: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    methodology: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    results: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    discussion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    conclusion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    references: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    submission_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('submission_date')).format('D MMMM, YYYY, h:mm A');
        }
    },
    status: {
        type: DataTypes.ENUM('draft', 'submitted', 'reviewed', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'draft'
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export { FinalReport };
