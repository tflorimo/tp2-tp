import { Router } from "express";
import PriceController from "../controllers/PriceController.js";

const priceController = new PriceController();
const PriceRoutes = Router();

PriceRoutes.get("/", priceController.getAllPrices);
PriceRoutes.post("/", priceController.createPrice);
PriceRoutes.get("/product/:product_id", priceController.checkProductPrice);

export default PriceRoutes;