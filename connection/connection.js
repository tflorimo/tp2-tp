import { Sequelize } from "sequelize";

import {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_PORT
} from "../config/config.js";

/**
 * En algunos casos, DB_USER | DB_NAME no es interpretado, por ende lo hardcodeamos
 */
const connection = new Sequelize("tp_final", "root", DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    port: DB_PORT,
    define: {
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        underscored: true,
        /**
         * Debido a que estamos utilizando "timestamps" y "paranoid", para que tengamos
         * soft-deletes, por defecto tendriamos las tres columnas de fechas,
         * que no son relevantes para la gestión.
         * 
         * La intención, es que estas columnas no se envíen por defecto a menos que haya otro scope declarado.
         * Por ejemplo, en User.js, tenemos tres scopes:
         * 
         * el default, que excluye siempre la clave, el rol id y las fechas de aquí debajo.
         * 
         * "admin", el cual excluye la clave pero envía el resto de los campos
         * 
         * Y "sudo", el cual envia todos los campos.
         */
        defaultScope: {
            attributes: { 
                exclude: ["createdAt", "deletedAt", "updatedAt"]
            }
        }
    }
})

try {
    await connection.authenticate();
    console.log("Conexión a la base de datos exitosa");
} catch (error) {
    console.error("Error al conectar a la base de datos: ", error);
}

export default connection;