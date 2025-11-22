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

## Próximos pasos sugeridos
- Configurar monorepo o repos separados para `frontend/` y `backend/`.
- Definir esquema de base de datos en PostgreSQL (eventos, boletos, órdenes, pagos, usuarios, roles).
- Implementar pipeline de CI con pruebas unitarias y end-to-end básicas.
