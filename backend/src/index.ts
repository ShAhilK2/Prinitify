import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { ENV } from "./config/env.config";
import cookieParser from "cookie-parser";
import { HTTPSTATUS } from "./config/http.config";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleare";
import { BadRequestException } from "./utils/app-error";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [ENV.FRONTEND_ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get(
  "/health",
  asyncHandler(async (_req: Request, res: Response) => {
    res
      .status(HTTPSTATUS.OK)
      .json({ message: "Server is healthy", status: "OK" });
  }),
);

app.use(errorHandler);
app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
