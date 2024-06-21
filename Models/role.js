import { DataTypes, Model } from "sequelize";
import connection from "../Connection/connection.js";

class Role extends Model {}

Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "Role",
  }
);

export default Role;
