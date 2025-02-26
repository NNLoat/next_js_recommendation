import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectToDB = async () => {
    if (mongoose.connection.readyState >= 1) {
      console.log("✅ Already connected to MongoDB");
      return;
    }
  
    try {
      await mongoose.connect(MONGODB_URI, {
        dbName: process.env.MONGODB_DATABASE, // 👈 Make sure this is correct
      });
  
      console.log("✅ Successfully connected to MongoDB");
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
    }
  };