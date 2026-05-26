import { isValidObjectId } from "mongoose";
import ProductColor from "../models/product-color.model";
import Product from "../models/product.model"
import { BadRequestException, NotFoundException } from "../utils/app-error";


export const getProductService = async()=>{
    const products = await Product.find().lean(); // lean means
    return {
        catelog : products.filter((product)=>product.section === "catelog"),
        featured : products.filter((product)=>product.section === "featured")
    }
}


export const getProductByIdService =async(id : string)=>{
    if(!isValidObjectId(id)) throw new BadRequestException("Invalid product id");

    const selectedProduct = await Product.findById(id).lean();
    if(!selectedProduct) throw new NotFoundException("Product not found");

    const template = selectedProduct.template ? selectedProduct : await Product.findOne({
        type : selectedProduct.type,
        template : true
    }).lean()

    if(!template) throw new NotFoundException("Editor template not found");

    const colors = await ProductColor.find({ templateId : template._id }).lean();
    return {
        template,
        colors
    }
}