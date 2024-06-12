import { Sequelize } from "sequelize";

import {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_PORT
} from "../config/config.js";

const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql"
});

try {
    await connection.authenticate();
    console.log("Conexión a la base de datos exitosa");
} catch (error) {
    console.error("Error al conectar a la base de datos: ", error);
}

export default connection;