import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

// Resources Model
const Resource = db.define('resources', {
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
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    download_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    date: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    size: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export { Resource };
