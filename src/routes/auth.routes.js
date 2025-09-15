import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const r = Router();
/** @openapi
 * /api/auth/register:
 *   post: { summary: Registro, tags: [Auth] }
 */
r.post("/register", register);
/** @openapi
 * /api/auth/login:
 *   post: { summary: Login, tags: [Auth] }
 */
r.post("/login", login);
/** @openapi
 * /api/auth/me:
 *   get:
 *     summary: Perfil autenticado
 *     security: [{ bearerAuth: [] }]
 *     tags: [Auth]
 */
r.get("/me", requireAuth, me);

export default r;
