import { Router } from "express";
import { register, login, verifyToken, updateProfile, me } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const r = Router();

/** @openapi
 * /api/user/register:
 *   post:
 *     summary: Registrar un usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: Kathy }
 *               email: { type: string, format: email, example: kathy+u1@example.com }
 *               password: { type: string, example: Kathy123! }
 *               role: { type: string, enum: [user, admin], example: user }
 *     responses:
 *       '201':
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   ok: true
 *                   data: { id: "665f3e6a9a1c5b0e5a1c1234", email: "kathy+u1@example.com" }
 *                   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '409':
 *         description: Email ya registrado
 *         content:
 *           application/json:
 *             examples:
 *               conflict: { value: { ok: false, error: "Email ya registrado" } }
 *       '400':
 *         description: Error de validación
 */
r.post("/register", register);

/** @openapi
 * /api/user/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email, example: kathy+u1@example.com }
 *               password: { type: string, example: Kathy123! }
 *     responses:
 *       '200':
 *         description: Login OK
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   ok: true
 *                   data: { id: "665f3e6a9a1c5b0e5a1c1234", email: "kathy+u1@example.com", role: "user" }
 *                   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '401':
 *         description: Credenciales inválidas
 *       '400':
 *         description: Error de validación
 */
r.post("/login", login);

/** @openapi
 * /api/user/verifytoken:
 *   get:
 *     summary: Verificar el token del usuario
 *     security: [{ bearerAuth: [] }]
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: Token válido
 *         content:
 *           application/json:
 *             examples:
 *               ok: { value: { ok: true, data: { id: "665f3e6a...", role: "user" } } }
 *       '401':
 *         description: Token requerido/ inválido
 */
r.get("/verifytoken", requireAuth, verifyToken);

/** @openapi
 * /api/user/me:
 *   get:
 *     summary: Perfil autenticado (datos completos)
 *     security: [{ bearerAuth: [] }]
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: Perfil del usuario autenticado
 *         content:
 *           application/json:
 *             examples:
 *               ok:
 *                 value:
 *                   ok: true
 *                   data:
 *                     _id: "665f3e6a9a1c5b0e5a1c1234"
 *                     name: "Kathy"
 *                     email: "kathy+u1@example.com"
 *                     role: "user"
 *       '401':
 *         description: Token requerido/ inválido
 */
r.get("/me", requireAuth, me);

/** @openapi
 * /api/user/update:
 *   put:
 *     summary: Actualizar información de perfil
 *     security: [{ bearerAuth: [] }]
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "Kathy Venegas" }
 *               email: { type: string, format: email, example: "kathy.venegas@example.com" }
 *               password: { type: string, example: "NuevoPass123!" }
 *     responses:
 *       '200':
 *         description: Perfil actualizado
 *       '409':
 *         description: Email ya usado por otro usuario
 *       '401':
 *         description: Token requerido/ inválido
 *       '400':
 *         description: Error de validación
 */
r.put("/update", requireAuth, updateProfile);

export default r;
