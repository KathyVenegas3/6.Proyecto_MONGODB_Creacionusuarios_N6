# Creacion y autentificacion de usuarios en MongoDB

API backend para **autenticación de usuarios y gestión de tareas (products) con Node.js + Express, MongoDB/Mongoose y JWT**. La API está documentada con OpenAPI/Swagger y lista para desplegar en Render con base de datos en MongoDB Atlas.

# 🎯 Objetivo del proyecto

**Comprender y aplicar autenticación y autorización en un backend.**

- Practicar MongoDB + Mongoose y el diseño de modelos relacionados (User ↔ Product).

- Implementar CRUD completo para el recurso Product (tareas).

- Documentar los endpoints con OpenAPI/Swagger.

- Desplegar el servicio (opcional) en Render usando MongoDB Atlas.

**✅ Qué hicimos (y por qué así)**

- JWT (stateless) para autenticación: evita sesiones en servidor y escala mejor.

- Middleware requireAuth: protege endpoints privados y extrae req.user.

- Mongoose como ODM: schemas, validaciones y relación simple por owner.

- Estructura modular: separación de responsabilidades (config, modelos, controladores, rutas, docs).

- Swagger: reduce fricción para probar la API; incluye ejemplos de body/response.

- dotenv para variables sensibles y CORS para un futuro frontend.

- Rutas limpias: /api/user/* para auth/perfil y /api/product/* para tareas.

# 📦 Estructura de carpetas

**- src/**
  
     app.js                  # App Express, middlewares y montaje de rutas
  
  **- server.js**            
        
                             # Arranque del server y conexión a MongoDB
  
  **- config/**
    
    db.js                   # Conexión Mongoose (con fallback local y DEBUG)

  **- controllers/**
  
    auth.controller.js      # register, login, verifytoken, me, update
    product.controller.js   # CRUD de products/tareas
    
  **- middlewares/**
    
    auth.js              # requireAuth (JWT Bearer)
    
  **- models/**
    
    User.js              # Usuario (name, email, password hash, role)
    Product.js           # Tarea/Product (title, description, status, dueDate, tags, owner)
    
  **- routes/**
    
    user.routes.js       # Endpoints /api/user/*
    product.routes.js    # Endpoints /api/product/*
    
  **- docs/**
    
    openapi.js           # Definición OpenAPI 3.0 para Swagger UI 
    .env.example         # Plantilla de variables de entorno


**Decisiones clave:**

- Controllers manejan la lógica de negocio y responses HTTP.

- Routes solo registran endpoints y middlewares.

- Product.owner referencia al _id del User: cada usuario ve/gestiona sus tareas.

🧰 Requisitos

- Node.js ≥ 18 (probado en v22)

- MongoDB local o URI de MongoDB Atlas

- Cuenta en Render (si despliegas)

# ⚙️ Variables de entorno

 - Crea .env en la raíz (usa .env.example como guía):

PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/m6_auth_tasks
JWT_SECRET=una_llave_secreta_larga_y_unica


- Nunca subas .env al repo (ya está en .gitignore).
- En Render define estas variables en Environment.

# ▶️ Cómo correr en local

- npm install
- npm run dev

Servidor: http://localhost:3000

Swagger: http://localhost:3000/docs

- Ruta de salud:

GET / → { "ok": true, "msg": "API Auth & Tasks" }

# 🔐 Flujo de autenticación (JWT)

- POST /api/user/register

- POST /api/user/login → copia el token

- En Swagger, botón Authorize → pega solo el token (sin “Bearer”)

- Endpoints protegidos enviarán Authorization: Bearer <token>

# 📚 Endpoints
- User

- POST /api/user/register — Registrar usuario

- POST /api/user/login — Login (devuelve token)

- GET /api/user/verifytoken — Verificar token (🛡️)

- GET /api/user/me — Perfil (🛡️)

- PUT /api/user/update — Actualizar perfil (🛡️)

- Products (tareas) — todas protegidas (🛡️)

- POST /api/product/create — Crear tarea

- GET /api/product/readall — Listar tareas propias (status, q)

- GET /api/product/readone/{id} — Detalle

- PUT /api/product/update/{id} — Actualizar

- DELETE /api/product/delete/{id} — Eliminar

**status: todo | in_progress | done
dueDate: ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
tags: array de strings**

# 🧪 Ejemplos de body

- Register

{ "name": "Kathy", "email": "kathy@example.com", "password": "Kathy123!", "role": "user" }


- Login

{ "email": "kathy@example.com", "password": "Kathy123!" }


- Crear tarea

{ "title": "Tarea 1", "description": "Primera tarea", "status": "todo",
  "dueDate": "2025-12-31T00:00:00.000Z", "tags": ["home", "urgente"] }


- Actualizar tarea

{ "status": "in_progress", "title": "Tarea 1 (editada)" }

# 🧱 Modelos (Mongoose)

- User

{
  name: String,
  email: { type: String, unique: true, index: true },
  password: String, // hash (bcrypt)
  role: { type: String, enum: ["user","admin"], default: "user" }
}


- Product

{
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["todo","in_progress","done"], default: "todo" },
  dueDate: Date,
  tags: [String],
  owner: { type: ObjectId, ref: "User", index: true }
}

# 🧪 Sanity check (métrica rápida)
- Endpoint	Código esperado
- POST /api/user/register	201 (o 409 si email repetido)
- POST /api/user/login	200
- GET /api/user/verifytoken	200
- GET /api/user/me	200
- PUT /api/user/update	200 (o 409 si email ocupado)
- POST /api/product/create	201
- GET /api/product/readall	200
- GET /api/product/readone/{id}	200 (o 404)
- PUT /api/product/update/{id}	200
- DELETE /api/product/delete/{id}	200

**Errores esperables: 401 (token faltante/expirado), 400 (validación), 404 (id inválido/ajeno).**

# 🧯 Problemas comunes

- 401 → re-login y Authorize con token fresco.

- “Token inválido/expirado” → token viejo o JWT_SECRET cambiado.

- MONGODB_URI undefined → revisa .env y import "dotenv/config" en server.js.

- 409 al actualizar email → ya existe ese email.

# 👩‍💻 Autora

Proyecto desarrollado por Katherine Venegas como parte del Bootcamp Fullstack.
