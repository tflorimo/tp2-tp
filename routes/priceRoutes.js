import { Router } from "express";
import PriceController from "../controllers/PriceController.js";

const priceController = new PriceController();
const PriceRoutes = Router();

export default PriceRoutes;