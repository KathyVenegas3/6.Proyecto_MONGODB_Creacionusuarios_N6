import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { openapiSpec } from "./docs/openapi.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.get("/", (_req, res) => res.json({ ok: true, msg: "API Auth & Tasks" }));

export default app;