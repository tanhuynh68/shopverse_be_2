import mongoose from "mongoose";
import ENV from "./env.config.js";

const connectDB = async (): Promise<void> => {
  const uri = `mongodb+srv://ShopVerse:${ENV.DB_PASSWORD}@shopverse.lntzu70.mongodb.net/?retryWrites=true&w=majority&appName=ShopVerse`;
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
