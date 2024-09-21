import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    throw new Error("MongoDB URL is missing in the environment.");
  }

  if (isConnected) {
    console.log("Connection already persists.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devsDungeon",
    });
    isConnected = true;
    console.log("Connection established.");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
