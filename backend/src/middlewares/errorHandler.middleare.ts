import { Request, Response, NextFunction } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/app-error";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Error occurred:", req.path, error);
  if (error instanceof SyntaxError) {
    return res
      .status(HTTPSTATUS.BAD_REQUEST)
      .json({ message: "Invalid JSON format, check your request body" });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }
};
