import { Router } from "express";
import TypeController from "../controllers/TypeController.js";

const typeController = new TypeController();
const TypeRoutes = Router();
TypeRoutes.get("/", typeController.getAllTypes);
TypeRoutes.get("/:id", typeController.getTypeById);
TypeRoutes.post("/", typeController.createType);
TypeRoutes.put("/:id", typeController.updateType);

TypeRoutes.delete("/:id", typeController.deleteType);

export default TypeRoutes;