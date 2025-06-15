import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

// Documents Model
const Document = db.define('documents', {
    id: {
        type: DataTypes.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    file_path: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    size: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    format: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    upload_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('upload_date')).format('D MMMM, YYYY, h:mm A');
        }
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'pending'
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    entity_type: {
        type: DataTypes.ENUM('proposal', 'report', 'resource'),
        allowNull: false
    },
    entity_id: {
        type: DataTypes.STRING(36),
        allowNull: false
    },
    uploaded_by: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export { Document };
