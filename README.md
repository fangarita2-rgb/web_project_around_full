# Alrededor de los EE. UU. (Full Stack: React + Express)

¡Bienvenido al proyecto **Alrededor de los EE. UU.**! Esta es la aplicación web interactiva completa que integra un _front-end_ desarrollado en **React** con TypeScript y un _back-end_ en **Node.js** con **Express** y **MongoDB**.

## 📝 Descripción del Proyecto

La aplicación permite a los usuarios compartir y explorar imágenes de lugares de interés en los EE. UU. En esta fase del proyecto, se ha implementado el flujo de **autenticación y registro de usuarios**, junto con la conexión directa a la API propia para la gestión persistente de tarjetas y datos de perfil.

### Funcionalidades Principales

- **Registro e Inicio de Sesión:** Creación de cuenta y acceso de usuarios validados mediante token JWT.
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

## 🛠️ Tecnologías y Técnicas Utilizadas

### Front-End (`/client`)

- **React 18** con **TypeScript**
- **React Router v6** (Enrutamiento y `ProtectedRoute`)
- **Context API** (`CurrentUserContext` para el estado global del usuario)
- **CSS3** mediante metodología **BEM** (Block, Element, Modifier) y HTML5 Semántico
- **Vite** como empaquetador / servidor de desarrollo

### Back-End (`/server`)

- **Node.js** y **Express.js** con **TypeScript**
- **MongoDB** con **Mongoose** para la base de datos no relacional
- **CORS** habilitado para permitir solicitudes entre `localhost:3000` y `localhost:3001`
- **API RESTful** para la manipulación de recursos (`/users` y `/cards`)

---

## 🚀 Instrucciones de Instalación y Ejecución

### Requisitos Previos

- Tener instalado **Node.js** (v14+ recomendado).
- Tener una instancia de **MongoDB** corriendo en segundo plano (`mongodb://localhost:27017/arounddb`).

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

## 🔒 Seguridad y Áreas de Mejora

Como parte del análisis de seguridad del proyecto:

- Se ha utilizado el almacenamiento en `localStorage` para guardar el token JWT durante esta etapa de desarrollo.
- Se identifica la migración futura hacia **Cookies HttpOnly** y la implementación completa de **Autenticación en el Back-end** (Express con JWT) como una mejora clave para mitigar riesgos de vulnerabilidades XSS en producción.
