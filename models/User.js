import { DataTypes, Model } from "sequelize";
import Role from "./Role.js";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class User extends Model {

    comparePass = async (password) => {
        const compare = await bcrypt.compare(password, this.password);
        return compare;
    };

    static isAdministrator = async (userId) => {
        const user = await User.findOne({
            where: {
                id: userId
            },
            include: {
                model: Role,
                attributes: ["admin"]
            }
        })
        return user.Role.admin;
    }

    static isSudo = async (userId) => {
        const user = await User.findOne({
            where: {
                id: userId
            },
            include: {
                model: Role,
                attributes: ["sudo"]
            }
        })
        return user.Role.sudo;
    }

};

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
            },
            forLogin: {
                attributes: {
                    include: ["password"]
                }
            }
        }
    }
);

User.beforeCreate(async (user) => {
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, genSalt);
    user.password = hashedPassword;
});

export default User;