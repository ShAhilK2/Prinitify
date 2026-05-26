import mongoose, { Document } from "mongoose";
import { string } from "zod";

export enum ProductType {
  TSHIRT = "TSHIRT",
  HOODIE = "HOODIE",
}
export const SIZE_OPTIONS = ["S", "M", "L", "XL", "2XL"] as const;

export enum Section {
  CATALOG = "catelog",
  FEATURED = "featured",
}

export interface PrintableArea {
  top: number;
  left: number;
  width: number;
  height: number; 
}

export interface ProductDocument extends Document {
  type: ProductType;
  template: boolean;
  section: Section;
  name: string;
  body: string;
  displayUrl: string;

  //   only template
  basePrice?: string;
  baseUrl?: string; // also be called trasparent temp mockup Url'
  sizes?: typeof SIZE_OPTIONS;
  printableArea?: PrintableArea;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<ProductDocument>({
  type: {
    type: String,
    enum: [ProductType.TSHIRT, ProductType.HOODIE],
  },
  template: {
    type: Boolean,
    default: false,
  },
  section: {
    type: String,
    enum: Section,
    default: Section.CATALOG,
  },
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  displayUrl: {
    type: String,
    required: true,
  },

  //   only needed for template
  basePrice: {
    type: String,
    default: undefined,   },
  baseUrl: {
    type: String,
    default: undefined,
  },
  sizes: {
    type: [String],
    enum: SIZE_OPTIONS,
    default: undefined,
  },
  printableArea: {
    top: { type: Number },
    left: { type: Number },
    width: { type: Number },
      height: { type: Number },
    },
  },
  { timestamps: true }
);

 const Product = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);

export default Product;

 