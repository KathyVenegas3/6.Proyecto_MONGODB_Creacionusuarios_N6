import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { openapiSpec } from "./docs/openapi.js";

import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Usuarios (consolidado)
app.use("/api/user", userRoutes);

// Products: SOLO alias /api/product/*
app.use("/api/product", productRoutes);

// Swagger UI con opciones para una mejor DX
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiSpec, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,      // conserva el token al recargar
      displayRequestDuration: true     // muestra duración de la request
    }
  })
);

app.get("/", (_req, res) => res.json({ ok: true, msg: "API Auth & Tasks" }));

export default app;
