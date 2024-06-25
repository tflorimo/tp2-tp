import { Router } from "express";
import SupplierController from "../controllers/SupplierController.js";

const supplierController = new SupplierController();
const SupplierRoutes = Router();

SupplierRoutes.get("/", supplierController.getAllSuppliers);
SupplierRoutes.get("/:id", supplierController.getSupplierById);

SupplierRoutes.post("/", supplierController.createSupplier);

SupplierRoutes.put("/:id", supplierController.updateSupplier);

SupplierRoutes.delete("/:id", supplierController.deleteSupplier);

export default SupplierRoutes;