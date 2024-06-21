import { DataTypes, Model } from "sequelize";
import connection from "../Connection/connection.js";

class User extends Model{}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,   // clave primaria
      autoIncrement: true //id se incremente automáticamente
    },
    name: {
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
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Role',
        key: 'id'
      }
  },
  is_Active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  registration_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  removed_date: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  sequelize: connection,
    modelName: "User",
  }
);

export default User;
