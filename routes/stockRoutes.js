import { Router } from "express";
import StockController from "../controllers/StockController.js";

const stockController = new StockController;
const StockRoutes = Router();

export default StockRoutes;