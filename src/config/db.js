// src/config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  // Si no viene desde .env, usamos la local por defecto
  const uri =
    (process.env.MONGODB_URI && process.env.MONGODB_URI.trim()) ||
    "mongodb://127.0.0.1:27017/m6_auth_tasks";

  // Logs de diagnóstico (útiles mientras ajustamos .env)
  console.log("DEBUG MONGODB_URI =", JSON.stringify(process.env.MONGODB_URI));
  console.log("DEBUG URI QUE SE USA =", uri);

  try {
    await mongoose.connect(uri);
    mongoose.connection.on("error", (err) => {
      console.error("❌ Error de conexión Mongo:", err.message);
    });
  } catch (err) {
    console.error("❌ Error conectando a Mongo:", err.message);
    throw err;
  }
};
