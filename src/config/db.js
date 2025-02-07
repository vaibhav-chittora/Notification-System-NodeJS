import mongoose from "mongoose";
import { DB_URL } from "./serverConfig.js";

async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
}

export default connectDB;
