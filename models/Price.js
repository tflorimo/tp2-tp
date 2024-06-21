import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Price extends Model {}

Price.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Product",
                key: "id"
            }
        },
        price: {
            type: DataTypes.FLOAT
        },
        profit_percentage: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize: connection,
        modelName: "Price"
    }
);

export default Price;