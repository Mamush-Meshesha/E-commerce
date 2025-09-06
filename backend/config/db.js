import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check if MONGO_URI is provided
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.log("MONGO_URI not found in environment variables");
      console.log(
        "Continuing without database connection - using fallback data"
      );
      return;
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
    console.log("Continuing without database connection - using fallback data");
    // Don't exit the process, let the app run with fallback data
  }
};

export default connectDB;
