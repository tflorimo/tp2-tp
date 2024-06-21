import { Sequelize } from "sequelize";

import {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_PORT
} from "../config/config.js";

/**
 * En algunos casos, DB_USER no es interpretado, por ende lo hardcodeamos
 */
const connection = new Sequelize(DB_NAME, "root", DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    port: DB_PORT,
    define: {
        freezeTableName: true,
        timestamps: true,
        underscored: true
    }
})

try {
    await connection.authenticate();
    console.log("Conexión a la base de datos exitosa");
} catch (error) {
    console.error("Error al conectar a la base de datos: ", error);
}

export default connection;