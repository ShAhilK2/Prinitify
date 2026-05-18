import { getEnv } from "../utils/get-env";

export const ENV = {
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "8000"),
  BASE_URL: getEnv("BASE_URL"),
  MONGO_URI: getEnv("MONGO_URI"),
  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),
};
