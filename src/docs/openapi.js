import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth & Tasks API",
      version: "1.0.0",
      description:
        "API para autenticación de usuarios y CRUD de productos/tareas. Documentada con OpenAPI 3 + swagger-ui-express."
    },

    // Orden y agrupación de secciones en Swagger UI
    tags: [
      { name: "User", description: "Registro, login, verificación de token y mantenimiento de perfil" },
      { name: "Products", description: "CRUD de productos / tareas del usuario" }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            'Pega SOLO el token JWT (sin la palabra "Bearer"). Swagger agrega el prefijo automáticamente.'
        }
      }
    },

    // Servidor por defecto (ajusta el puerto si usas otro)
    servers: [
      {
        url: "http://localhost:{port}",
        description: "Local",
        variables: { port: { default: "3000" } }
      }
    ]
  },

  // Lee todas las anotaciones @openapi en los routers
  apis: ["./src/routes/*.js"]
};

export const openapiSpec = swaggerJSDoc(options);
