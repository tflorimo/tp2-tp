import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Type extends Model {}

Type.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: connection,
        modelName: "Type"
    }
);

export default Type;