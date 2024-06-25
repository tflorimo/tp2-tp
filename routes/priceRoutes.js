import { Router } from "express";
import PriceController from "../controllers/PriceController.js";

const priceController = new PriceController();
const PriceRoutes = Router();

PriceRoutes.get("/", priceController.getAllPrices);
PriceRoutes.get("/:id", priceController.getPriceById);
PriceRoutes.get("/product/:product_id", priceController.checkProductPrice);

PriceRoutes.post("/", priceController.createPrice);

PriceRoutes.put("/:id", priceController.updatePrice);

PriceRoutes.delete("/:id", priceController.deletePrice);



export default PriceRoutes;