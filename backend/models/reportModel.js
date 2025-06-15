import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

// Reports Model
const Report = db.define('reports', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('completed', 'pending'),
        allowNull: false
    },
    department: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    download_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    file_size: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    file_type: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    author: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    last_modified: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export { Report };
