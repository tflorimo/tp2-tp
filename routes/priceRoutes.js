import { Router } from "express";
import PriceController from "../controllers/PriceController.js";

const priceController = new PriceController();
const PriceRoutes = Router();

PriceRoutes.get("/", priceController.getAllPrices);
PriceRoutes.get("/:id", priceController.getPriceById);
PriceRoutes.post("/", priceController.createPrice);
PriceRoutes.get("/product/:product_id", priceController.checkProductPrice);
PriceRoutes.put("/:id", priceController.updatePrice);

PriceRoutes.delete("/:id", priceController.deletePrice);

//agregar getbyid insert update delete

export default PriceRoutes;