import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class User extends Model {

}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,   // clave primaria
            autoIncrement: true // id autoincremental
        },
        first_name: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Role',
                key: 'id'
            }
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },
    {
        /**
         * Si el usuario es sudo,
         * enviamos todo
         * 
         * Si el usuario es admin,
         * ocultamos la clave
         * 
         * Caso contrario, solo enviaremos pocos datos
         */
        sequelize: connection,
        modelName: "User",
        defaultScope: {
            attributes: {
                exclude: ["password", "role_id"]
            }
        },
        scopes: {
            admin: {
                attributes: {
                    exclude: ["password"]
                }
            },
            sudo: {
                attributes: {
                    exclude: []
                }
            }
        }
    }
);

export default User;