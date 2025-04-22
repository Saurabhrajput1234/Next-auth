import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL!);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Something went wrong while connecting to MongoDB.");
    throw error;
  }
}
