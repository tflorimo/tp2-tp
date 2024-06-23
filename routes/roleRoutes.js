import { Router } from "express";
import RoleController from "../controllers/RoleController.js";

const roleController = new RoleController();
const RoleRoutes = Router();

RoleRoutes.get("/", roleController.getAllRoles);
RoleRoutes.get("/:id", roleController.getRoleById);
RoleRoutes.get("/users/:role_id", roleController.getAllUsersByRole);

RoleRoutes.post("/", roleController.createRole);

RoleRoutes.put("/:id", roleController.updateRole);

RoleRoutes.delete("/:id", roleController.deleteRole);

export default RoleRoutes;