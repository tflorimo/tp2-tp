import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productController = new ProductController();
const ProductRoutes = Router();

ProductRoutes.get("/", productController.getAllProducts);

export default ProductRoutes;