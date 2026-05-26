import { Router } from "express";
import productRoutes from "./productRoutes";


const router = Router();

router.use("/product",productRoutes)


export default router