import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";

const { DataTypes } = Sequelize;

// Users Model
const User = db.define('users', {
    user_id: {
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    }, username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false // Let manual index handle uniqueness
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password_hash'
    }, email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false, // Let manual index handle uniqueness
        validate: {
            isEmail: true
        }
    },
    full_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'wadir', 'dosen', 'bendahara', 'reviewer'),
        allowNull: false
    },
    faculty: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    department: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    position: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    profile_image: {
        type: DataTypes.STRING(255),
        allowNull: true
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
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
        get() {
            const value = this.getDataValue('last_login');
            return value ? moment(value).format('D MMMM, YYYY, h:mm A') : null;
        }
    }, status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        // Manually define indexes to prevent automatic creation
        {
            unique: true,
            fields: ['username'],
            name: 'idx_users_username'
        },
        {
            unique: true,
            fields: ['email'],
            name: 'idx_users_email'
        }
    ],
    hooks: {
        beforeCreate: async (user) => {
            try {
                if (user.password_hash) {
                    console.log('Hashing password for new user:', user.username);
                    const hashedPassword = await argon2.hash(user.password_hash, {
                        type: argon2.argon2id,
                        memoryCost: 65536,
                        timeCost: 3,
                        parallelism: 4
                    });
                    user.password_hash = hashedPassword;
                }
            } catch (error) {
                console.error('Error hashing password in beforeCreate:', error);
                throw error;
            }
        },
        beforeUpdate: async (user) => {
            try {
                if (user.changed('password_hash')) {
                    console.log('Hashing password for user update:', user.username);
                    const hashedPassword = await argon2.hash(user.password_hash, {
                        type: argon2.argon2id,
                        memoryCost: 65536,
                        timeCost: 3,
                        parallelism: 4
                    });
                    user.password_hash = hashedPassword;
                }
            } catch (error) {
                console.error('Error hashing password in beforeUpdate:', error);
                throw error;
            }
        },
        afterCreate: (user) => {
            console.log('User created successfully:', user.username);
            delete user.dataValues.password_hash;
        },
        afterUpdate: (user) => {
            console.log('User updated successfully:', user.username);
            delete user.dataValues.password_hash;
        }
    }
});

// Export only User model and relations function
export { User };
