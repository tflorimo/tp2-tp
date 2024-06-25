import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { validateAdmin } from "../middlewares/validateAdmin.js";
import { validateSudo } from "../middlewares/validateSudo.js";

const userController = new UserController();
const UserRoutes = Router();

UserRoutes.get("/me", validateLogin, userController.me);
UserRoutes.get("/", validateSudo, userController.getAllUsers);
UserRoutes.get("/admins", validateSudo, userController.getAllAdministrators);
UserRoutes.get("/:id", validateAdmin, userController.getUserById);

UserRoutes.post("/", validateAdmin, validateSudo, userController.createUser);
UserRoutes.post("/login", userController.login);

UserRoutes.put("/:id", validateAdmin, validateSudo, userController.updateUser);

UserRoutes.delete("/:id", validateAdmin, validateSudo, userController.deleteUser);

export default UserRoutes;