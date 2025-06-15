import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

// ML Validations Model
const MLValidation = db.define('ml_validations', {
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
    accuracy: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    precision_score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    recall: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    f1_score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    false_positive_rate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    false_negative_rate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    validation_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('validation_date')).format('D MMMM, YYYY, h:mm A');
        }
    },
    override_by: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    override_reason: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export { MLValidation };
