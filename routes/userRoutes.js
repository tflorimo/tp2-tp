import { Router } from "express";
import UserController from "../controllers/UserController.js";

const UserController = new UserController();
const UserRoutes = Router();

UserRoutes.post("/login", UserController.login);


export default UserRoutes;