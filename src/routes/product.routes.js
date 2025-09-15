import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { createProduct, listProducts, getProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const r = Router();
/** @openapi
 * /api/products:
 *   get:
 *     summary: Listar productos/tareas (propias; admin ve todas)
 *     security: [{ bearerAuth: [] }]
 *     tags: [Products]
 *   post:
 *     summary: Crear producto/tarea
 *     security: [{ bearerAuth: [] }]
 *     tags: [Products]
 */
r.get("/", requireAuth, listProducts);
r.post("/", requireAuth, createProduct);
/** @openapi
 * /api/products/{id}:
 *   get: { summary: Detalle, security: [{ bearerAuth: [] }], tags: [Products] }
 *   put: { summary: Actualizar, security: [{ bearerAuth: [] }], tags: [Products] }
 *   delete: { summary: Eliminar, security: [{ bearerAuth: [] }], tags: [Products] }
 */
r.get("/:id", requireAuth, getProduct);
r.put("/:id", requireAuth, updateProduct);
r.delete("/:id", requireAuth, deleteProduct);

// ejemplo admin opcional
r.get("/admin/all", requireAuth, requireRole("admin"), listProducts);

export default r;