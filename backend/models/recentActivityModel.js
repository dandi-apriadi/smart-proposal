import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

// Recent Activities Model
const RecentActivity = db.define('recent_activities', {
    id: {
        type: DataTypes.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    action: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    time: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    device: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    browser: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    location: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('timestamp')).format('D MMMM, YYYY, h:mm A');
        }
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'timestamp',
    updatedAt: false
});

export { RecentActivity };
