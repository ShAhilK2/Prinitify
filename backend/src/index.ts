import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { ENV } from "./config/env.config";
import cookieParser from "cookie-parser";
import { HTTPSTATUS } from "./config/http.config";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleare";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import connectDb from "./config/db";
import { toNodeHandler } from "better-auth/node";
import { getAuth } from "./lib/auth";
import router from "./routes";


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

app.all("/api/auth/*splat", (req, res) => {
  const auth = getAuth();
  return toNodeHandler(auth)(req, res);
}); // For ExpressJS v4
// app.all("/api/auth/*splat", toNodeHandler(auth)); For ExpressJS v5
app.get(
  "/health",
  asyncHandler(async (_req: Request, res: Response) => {
    res
      .status(HTTPSTATUS.OK)
      .json({ message: "Server is healthy", status: "OK" });
  }),
);

app.use("/api",router)

app.use(errorHandler);
app.listen(ENV.PORT, async () => {
  await connectDb();
  console.log(`Server is running on port ${ENV.PORT}`);
});
