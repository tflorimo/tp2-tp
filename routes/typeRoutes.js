import { Router } from "express";
import TypeController from "../controllers/TypeController.js";

const typeController = new TypeController();
const TypeRoutes = Router();

export default TypeRoutes;