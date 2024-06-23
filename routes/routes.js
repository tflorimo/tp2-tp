import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import ProductRoutes from "./productRoutes.js";
import PriceRoutes from "./priceRoutes.js";
import RoleRoutes from "./roleRoutes.js";
import StockRoutes from "./stockRoutes.js";
import SupplierRoutes from "./supplierRoutes.js";
import TypeRoutes from "./typeRoutes.js";


const routes = Router();
routes.use("/user", UserRoutes);
routes.use("/product", ProductRoutes);
routes.use("/price", PriceRoutes);
routes.use("/role", RoleRoutes);
routes.use("/stock", StockRoutes);
routes.use("/supplier", SupplierRoutes);
routes.use("/type", TypeRoutes);

export default routes;