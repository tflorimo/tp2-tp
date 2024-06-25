import { Router } from "express";
import StockController from "../controllers/StockController.js";

const stockController = new StockController;
const StockRoutes = Router();

StockRoutes.get("/", stockController.getAllStocks);
StockRoutes.get("/:id", stockController.getStockById);

StockRoutes.post("/restock/:product_id", stockController.restockProduct);
StockRoutes.post("/", stockController.createStock);

StockRoutes.put("/:id", stockController.updateStock);

StockRoutes.delete("/:id", stockController.deleteStock);

export default StockRoutes;