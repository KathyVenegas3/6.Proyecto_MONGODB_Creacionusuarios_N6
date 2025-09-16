// src/server.js
import "dotenv/config";                 // Carga variables del .env
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT ?? 3000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      const dbName =
        (process.env.MONGODB_URI || "").split("/").pop() || "(desconocida)";
      console.log(`✅ MongoDB conectado: ${dbName}`);
      console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error al iniciar el servidor:", err.message);
    process.exit(1);
  }
})();
