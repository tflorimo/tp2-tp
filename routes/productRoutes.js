import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productController = new ProductController();
const ProductRoutes = Router();

// ProductRoutes.get("/", productController.getAllProducts);
// ProductRoutes.get("/:id", productController.getProductById);

// ProductRoutes.post("/", productController.createProduct);
// ProductRoutes.post("/:id", productController.buyProduct);

// ProductRoutes.put("/:id", productController.updateProduct);

export default ProductRoutes;