import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

// Reviews Model
const Review = db.define('reviews', {
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
    reviewer_id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    recommendation: {
        type: DataTypes.ENUM('approve', 'reject', 'revise'),
        allowNull: false
    },
    review_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('review_date')).format('D MMMM, YYYY, h:mm A');
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed'),
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export { Review };
