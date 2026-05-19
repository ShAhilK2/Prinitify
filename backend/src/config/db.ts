import mongoose from "mongoose";
import { ENV } from "./env.config";

const connectDb = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("🚀 Database connected");
  } catch (error) {
    console.error(" ❌ Database disconnected:", error);
    process.exit(1);
  }
};

export default connectDb;
