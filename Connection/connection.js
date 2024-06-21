import { Sequelize } from "sequelize";
import {
  DB_NAME,
//  DB_USER,
  DB_PASSWORD,
  DB_HOST,
//  DB_DIALECT,
  DB_PORT,
} from "../Config/config.js";

const connection = new Sequelize(DB_NAME, "root", DB_PASSWORD, {
  host:  DB_HOST,
  dialect: "mysql",
  port: DB_PORT
});

try {
  await connection.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default connection;
