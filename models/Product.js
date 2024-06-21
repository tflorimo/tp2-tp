import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Product extends Model {}

Product.init(
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
        }, 
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Type",
                key: 'id'
            }
        },
        supplier_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Supplier",
                key: "id"
            }
        }
    },
    {
        sequelize: connection,
        modelName: "Product"
    }
);

export default Product;