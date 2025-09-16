import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const r = Router();

/** @openapi
 * /api/product/create:
 *   post:
 *     summary: Crear un producto/tarea
 *     security: [{ bearerAuth: [] }]
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string, example: "Tarea 1" }
 *               description: { type: string, example: "Primera tarea de demo" }
 *               status: { type: string, enum: [todo, in_progress, done], example: "todo" }
 *               dueDate: { type: string, format: date-time, example: "2025-12-31T00:00:00.000Z" }
 *               tags: { type: array, items: { type: string }, example: ["home","urgente"] }
 *     responses:
 *       '201':
 *         description: Creado
 *         content:
 *           application/json:
 *             examples:
 *               created:
 *                 value:
 *                   ok: true
 *                   data:
 *                     _id: "665f3e6a9a1c5b0e5a1c7777"
 *                     title: "Tarea 1"
 *                     status: "todo"
 *                     owner: "665f3e6a9a1c5b0e5a1c1234"
 *       '401':
 *         description: Token requerido/ inválido
 *       '400':
 *         description: Error de validación
 */
r.post("/create", requireAuth, createProduct);

/** @openapi
 * /api/product/readall:
 *   get:
 *     summary: Leer todos los productos/tareas
 *     security: [{ bearerAuth: [] }]
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [todo, in_progress, done] }
 *       - in: query
 *         name: q
 *         schema: { type: string, example: "demo" }
 *     responses:
 *       '200':
 *         description: Lista de productos del usuario
 *         content:
 *           application/json:
 *             examples:
 *               list:
 *                 value:
 *                   ok: true
 *                   data:
 *                     - _id: "665f3e6a9a1c5b0e5a1c7777"
 *                       title: "Tarea 1"
 *                       status: "todo"
 *                     - _id: "665f3e6a9a1c5b0e5a1c8888"
 *                       title: "Tarea 2"
 *                       status: "done"
 *       '401':
 *         description: Token requerido/ inválido
 */
r.get("/readall", requireAuth, listProducts);

/** @openapi
 * /api/product/readone/{id}:
 *   get:
 *     summary: Leer un producto/tarea específico
 *     security: [{ bearerAuth: [] }]
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         description: Documento encontrado
 *       '404':
 *         description: No encontrado
 *       '401':
 *         description: Token requerido/ inválido
 */
r.get("/readone/:id", requireAuth, getProduct);

/** @openapi
 * /api/product/update/{id}:
 *   put:
 *     summary: Actualizar un producto/tarea
 *     security: [{ bearerAuth: [] }]
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [todo, in_progress, done] }
 *               dueDate: { type: string, format: date-time }
 *               tags: { type: array, items: { type: string } }
 *     responses:
 *       '200':
 *         description: Actualizado
 *       '404':
 *         description: No encontrado
 *       '401':
 *         description: Token requerido/ inválido
 *       '400':
 *         description: Error de validación
 */
r.put("/update/:id", requireAuth, updateProduct);

/** @openapi
 * /api/product/delete/{id}:
 *   delete:
 *     summary: Eliminar un producto/tarea
 *     security: [{ bearerAuth: [] }]
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         description: Eliminado
 *       '404':
 *         description: No encontrado
 *       '401':
 *         description: Token requerido/ inválido
 */
r.delete("/delete/:id", requireAuth, deleteProduct);

export default r;
