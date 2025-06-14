import { Sequelize } from "sequelize";

const db = new Sequelize('sp', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;