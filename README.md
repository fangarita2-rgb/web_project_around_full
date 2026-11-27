# Alrededor de los EE. UU. (Full Stack: React + Express)

¡Bienvenido al proyecto **Alrededor de los EE. UU.**! Esta es la aplicación web interactiva completa que integra un _front-end_ desarrollado en **React** con TypeScript y un _back-end_ en **Node.js** con **Express** y **MongoDB**.

## 📝 Descripción del Proyecto

La aplicación permite a los usuarios compartir y explorar imágenes de lugares de interés en los EE. UU. En esta fase del proyecto, se ha implementado el flujo completo de **autenticación y registro de usuarios** con JWT real, validación personalizada de formularios en el cliente, y la conexión directa a la API propia para la gestión persistente de tarjetas y datos de perfil.

### Funcionalidades Principales

- **Registro e Inicio de Sesión:** Creación de cuenta y acceso de usuarios con contraseña cifrada (`bcryptjs`) y token JWT firmado.
- **Validación de Formularios:** Validación personalizada en todos los formularios (Login, Register, EditProfile, EditAvatar, NewCard) con mensajes de error en tiempo real y botón deshabilitado cuando el formulario es inválido.
- **Rutas Protegidas:** Restricción de acceso a la vista principal solo a usuarios autenticados.
- **Manejo de Sesión Persistente:** El estado de la sesión se mantiene al recargar la página mediante `localStorage` y validación de token.
- **Gestión de Perfil:** Edición de la información del usuario (nombre y trabajo) y cambio de avatar.
- **Gestión de Tarjetas (CRUD):**
  - Agregar nuevas tarjetas con imagen y título.
  - Eliminar tarjetas propias.
  - Dar y quitar _likes_ en las tarjetas.
- **Feedback Visual:** Componente `InfoTooltip` para informar al usuario sobre el éxito o fallo en los procesos de registro e inicio de sesión.
- **Diseño Responsivo:** Adaptado a dispositivos móviles y de escritorio siguiendo el diseño de Figma.

---

## 🗂️ Estructura del Proyecto

```
web_project_around_full/
├── client/                        # Front-end React + TypeScript
│   └── src/
│       ├── blocks/                # Archivos CSS por bloque (BEM)
│       │   ├── auth-form.css      # Estilos formularios de autenticación
│       │   └── popup.css          # Estilos popups y tooltips
│       ├── components/
│       │   ├── App.tsx            # Componente raíz con rutas y estado global
│       │   ├── EditAvatar/        # Formulario cambio de avatar (con validación)
│       │   ├── EditProfile/       # Formulario edición de perfil (con validación)
│       │   ├── Header/            # Cabecera con email y botón de cierre de sesión
│       │   ├── InfoTooltip/       # Popup de éxito/error en autenticación
│       │   ├── Login/             # Formulario de inicio de sesión (con validación)
│       │   ├── NewCard/           # Formulario nueva tarjeta (con validación)
│       │   ├── ProtectedRoute/    # HOC que redirige a /signin si no autenticado
│       │   └── Register/          # Formulario de registro (con validación)
│       ├── contexts/
│       │   └── CurrentUserContext.tsx
│       ├── types/
│       │   └── types.ts
│       └── utils/
│           ├── api.ts             # Llamadas a la API propia (localhost:3001)
│           └── auth.ts            # Llamadas a la API de autenticación TripleTen
│
└── server/                        # Back-end Node.js + Express + TypeScript
    └── src/
        ├── controllers/
        │   ├── auth.ts            # signup y signin con bcrypt + JWT
        │   ├── cards.ts           # CRUD de tarjetas
        │   └── users.ts           # CRUD de usuarios
        ├── middleware/
        │   ├── auth.ts            # Verificación JWT en rutas protegidas
        │   └── error-handler.ts   # Manejador global de errores
        ├── models/
        │   ├── card.ts            # Modelo Mongoose de tarjeta
        │   └── user.ts            # Modelo Mongoose de usuario (email + password)
        ├── routes/
        │   ├── auth.ts            # Rutas públicas: POST /signup, POST /signin
        │   ├── cards.ts           # Rutas protegidas de tarjetas
        │   ├── index.ts           # Router principal (públicas + protegidas)
        │   └── users.ts           # Rutas protegidas de usuarios
        ├── types/
        │   └── express/
        │       └── express.d.ts   # Extensión de Request con req.user
        └── app.ts                 # Entrada del servidor Express
```

---

## 🛠️ Tecnologías y Técnicas Utilizadas

### Front-End (`/client`)

- **React 18** con **TypeScript**
- **React Router v6** (Enrutamiento y `ProtectedRoute`)
- **Context API** (`CurrentUserContext` para el estado global del usuario)
- **Validación personalizada** de formularios con estado React (`useState`, `onBlur`, mensajes de error en `span.popup__error`)
- **CSS3** mediante metodología **BEM** (Block, Element, Modifier) y HTML5 Semántico
- **Vite** como empaquetador / servidor de desarrollo

### Back-End (`/server`)

- **Node.js** y **Express.js** con **TypeScript**
- **MongoDB** con **Mongoose** para la base de datos no relacional
- **bcryptjs** para el cifrado de contraseñas
- **jsonwebtoken** para la generación y verificación de tokens JWT
- **CORS** habilitado para permitir solicitudes entre `localhost:3000` y `localhost:3001`
- **API RESTful** con rutas públicas (`/signup`, `/signin`) y rutas protegidas (`/users`, `/cards`)

---

## 🚀 Instrucciones de Instalación y Ejecución

### Requisitos Previos

- Tener instalado **Node.js** (v14+ recomendado).
- Tener una instancia de **MongoDB** corriendo en segundo plano (`mongodb://localhost:27017/aroundb`).

### Pasos para ejecutar el proyecto

1. **Clonar el repositorio e instalar dependencias:**
   Desde la raíz del proyecto, ejecuta el siguiente comando para instalar todas las dependencias tanto del servidor como del cliente:

   ```bash
   npm run install:all
   ```

2. **Iniciar el servidor API (Express):**
   Asegúrate de que MongoDB esté en ejecución y abre una terminal en la raíz del proyecto:

   ```bash
   npm run dev:server
   ```

   _El servidor iniciará en:_ `http://localhost:3001`

3. **Iniciar la aplicación cliente (React):**
   En una nueva terminal en la raíz del proyecto:
   ```bash
   npm run dev:client
   ```
   _El cliente iniciará en:_ `http://localhost:3000`

---

## 🔒 Seguridad

- Las contraseñas se almacenan cifradas en MongoDB usando **bcryptjs** (salt rounds: 10).
- La autenticación se gestiona mediante **JWT** firmado con clave secreta, con expiración de 7 días.
- El campo `password` tiene `select: false` en el modelo Mongoose para que nunca se devuelva en las consultas.
- El token se guarda en `localStorage` durante esta etapa de desarrollo. La migración futura a **Cookies HttpOnly** es la mejora recomendada para producción.

---

## 🌐 Despliegue en Producción

La aplicación está desplegada en **Vercel** en dos proyectos separados:

| Componente                  | URL                                             |
| --------------------------- | ----------------------------------------------- |
| **Front-end (Cliente)**     | https://web-project-around-full-3kmm.vercel.app |
| **Back-end (Servidor API)** | https://web-project-around-full-tgnb.vercel.app |

### Verificar que el servidor está activo:

```
GET https://web-project-around-full-tgnb.vercel.app/health
→ {"status":"ok"}
```
