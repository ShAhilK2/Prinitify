import { Request,Response } from "express"
import { HTTPSTATUS } from "../config/http.config";
import { getProductByIdService, getProductService } from "../services/product.service";
import {productIdSchema} from "../validators/product.validator"
export const getProductController = async(req:Request,res:Response)=>{
    const Products  = await getProductService();
    return res.status(HTTPSTATUS.OK).json({
        messaghe : "product fetched succesfully",
        Products
    })
}

export const getProductByIdController = async(req:Request,res:Response)=>{
    const {id} = productIdSchema.parse(req.params)
    const data  = await getProductByIdService(id);
    return res.status(HTTPSTATUS.OK).json({
        messaghe : "Get Product by Id Fetched Succesfully",
        ...data
    })
} 