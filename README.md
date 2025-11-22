# VegasX Tickets

Proyecto base para una plataforma de venta de boletos en línea con frontend en React y backend en Node.js (Express o NestJS) conectado a PostgreSQL.

## Arquitectura general

- **Frontend (React)**: aplicación SPA que consume la API vía HTTP. Incluye vistas para listado de eventos, detalle, selección de boletos, carrito opcional, autenticación (login/registro) y área de usuario para ver compras.
- **Backend (Node.js + PostgreSQL)**: servicio REST responsable de la lógica de negocio, gestión de pagos y asignación de boletos con códigos QR. Implementa autenticación con JWT y control de roles (usuario/admin).
- **Integraciones externas**: pasarela de pagos (Stripe/PayPal/MercadoPago), envío de correos con boletos y generación de códigos QR.

## Funcionalidades clave

### Frontend
- Obtiene eventos, boletos disponibles y compras previas mediante **GET**.
- Inicia compras, registros y sesiones con **POST**.
- Actualiza datos del usuario con **PUT/PATCH** y permite cancelaciones con **DELETE** cuando están habilitadas.
- Validaciones básicas de formularios, manejo de estados de carga y mensajes de éxito/error.
- UI moderna con componentes responsivos (cards, sliders, botones) y animaciones.

### Backend
- Verifica disponibilidad de boletos, calcula precios finales y crea órdenes con confirmación de pago.
- Asigna boletos al usuario, genera confirmaciones con QR y evita doble venta o pagos duplicados.
- Encripta contraseñas con **bcrypt**, emite **JWT** y valida permisos para acceder a boletos.
- Opera todas las interacciones con la base de datos: creación de usuarios, registro de pagos, actualización de estados de boletos y consulta de eventos/precios.

## Consideraciones de seguridad y calidad
- Hash de contraseñas con salt mediante bcrypt.
- Tokens JWT con expiración y revocación basada en lista de bloqueos o rotación.
- Validación de roles para operaciones administrativas (gestión de eventos, precios y disponibilidad).
- Validaciones de negocio para prevenir doble asignación de boletos, pagos repetidos y accesos no autorizados.

## Backend: estructura inicial

El backend en Express con TypeScript se encuentra dentro de la carpeta `backend/` para mantener separadas las piezas de la plataforma.

- **Rutas**: `/api/events` para consultar eventos, `/api/auth` para registro y login con JWT, `/api/health` para verificar conexión a la base de datos.
- **Capas**: controladores ligeros en `routes.ts`, servicios con validaciones y reglas de negocio (`service.ts`), y repositorios PostgreSQL (`repository.ts`).
- **Infraestructura**: configuración de entorno (`src/config/env.ts`), pool de PostgreSQL (`src/config/db.ts`), manejo de errores (`src/middleware/error-handler.ts`) y utilidades comunes.

### Configuración y ejecución local

1. Ve a la carpeta del backend:

   ```bash
   cd backend
   ```

2. Crea un archivo `.env` a partir de `.env.example` con los valores reales de PostgreSQL y el secreto JWT.
3. Instala dependencias y compila:

   ```bash
   npm install
   npm run build
   ```

4. Levanta el servidor en modo desarrollo con recarga:

   ```bash
   npm run dev
   ```

5. Endpoints disponibles de referencia:
   - `GET /api/health`: verifica la conexión a PostgreSQL.
   - `GET /api/events` y `GET /api/events/:id`: lista y detalle de eventos.
   - `POST /api/auth/register` y `POST /api/auth/login`: registro/login con validación de email y contraseñas de mínimo 8 caracteres.

## Próximos pasos sugeridos
- Completar el esquema de base de datos (eventos, boletos, órdenes, pagos, usuarios, roles) y agregar migraciones/seeds.
- Añadir middleware de autenticación para proteger órdenes y compras, junto con pruebas unitarias de servicios y repositorios.
- Configurar pipeline de CI con pruebas y análisis estático, y definir contrato de la API para el frontend (OpenAPI/Swagger).
