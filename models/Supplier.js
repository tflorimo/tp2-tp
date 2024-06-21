import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Supplier extends Model {}

Supplier.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize: connection,
        modelName: "Supplier"
    }
)

export default Supplier;