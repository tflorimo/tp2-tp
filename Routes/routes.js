import { Router } from "express";
import userRoutes from "./usersRoutes.js";

const routes = Router();
routes.use("/user", userRoutes);

export default routes;
