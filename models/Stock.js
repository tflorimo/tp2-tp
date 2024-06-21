import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Stock extends Model {};

Stock.init(
    {
        id:{
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
        inventory_qty: {
            type: DataTypes.INTEGER,
            comment: "Stock de un producto en el frente-mostrador"
        },
        stock_qty: {
            type: DataTypes.INTEGER,
            comment: "Stock de un producto en el depósito"
        },
        total_qty: {
            type: DataTypes.INTEGER,
            comment: "Stock total (inventory+stock)"
        },
        restock_qty:{
            type: DataTypes.INTEGER,
            comment: "Nivel de productos límite para venta. Indica que se debe restockear cuanto antes."
        }
    }, 
    {
        sequelize: connection,
        modelName: "Stock"
    }
);

export default Stock;