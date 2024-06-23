import { Router } from "express";
import SupplierController from "../controllers/SupplierController.js";

const supplierController = new SupplierController();
const SupplierRoutes = Router();

export default SupplierRoutes;