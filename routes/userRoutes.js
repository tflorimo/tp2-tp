import { Router } from "express";
import UserController from "../controllers/UserController.js";

const userController = new UserController();
const UserRoutes = Router();

UserRoutes.get("/", userController.getAllUsers);
UserRoutes.get("/admins", userController.getAllAdministrators);
UserRoutes.get("/:id", userController.getUserById);

UserRoutes.post("/", userController.createUser);

UserRoutes.put("/:id", userController.updateUser);

UserRoutes.delete("/:id", userController.deleteUser);

export default UserRoutes;