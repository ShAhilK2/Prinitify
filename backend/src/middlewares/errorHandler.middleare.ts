import { Request, Response, NextFunction,ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError, ErrorCodes } from "../utils/app-error";
import { ZodError } from "zod";


const formatZodError = (res: Response, error: ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors: errors,
    errorCode: ErrorCodes.ERR_VALIDATION,
  });
};


export const errorHandler : ErrorRequestHandler  = (
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


  if(error instanceof ZodError){
    formatZodError(res,error)
  }
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }
};
