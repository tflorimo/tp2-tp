import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { validateAdminSudo, validateAdmin, validateLogin, validateSudo } from "../middlewares/userValidators.js";

const userController = new UserController();
const UserRoutes = Router();

UserRoutes.get("/me", validateLogin, userController.me);
UserRoutes.get("/", validateSudo, userController.getAllUsers);
UserRoutes.get("/admins", validateSudo, userController.getAllAdministrators);
UserRoutes.get("/:id", validateAdmin, userController.getUserById);

UserRoutes.post("/", validateAdminSudo, userController.createUser);
UserRoutes.post("/login", userController.login);

UserRoutes.put("/:id", validateAdminSudo, userController.updateUser);

UserRoutes.delete("/:id", validateSudo, userController.deleteUser);

export default UserRoutes;