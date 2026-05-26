import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { getProductByIdController, getProductController } from "../controllers/product.controller";


const productRoutes = Router().use(requireAuth)
                              .get("/all",getProductController)
                              .get("/:id",getProductByIdController)



export default productRoutes