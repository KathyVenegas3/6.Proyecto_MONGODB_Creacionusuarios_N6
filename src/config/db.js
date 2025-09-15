import mongoose from "mongoose";

export const connectDB = async (uri) => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log("✅ MongoDB conectado:", mongoose.connection.name);
};
