# 📝 Blog con React y Vite

![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-green?logo=vite)
![Express](https://img.shields.io/badge/Express.js-4.x-yellow?logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8.x-orange?logo=mysql)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.7-purple?logo=bootstrap)

Un blog moderno y completo construido con React 19, Vite, Bootstrap 5 y un backend Express.js con MySQL. Diseñado con enfoque mobile-first y optimizado para una excelente experiencia de usuario tanto en dispositivos móviles como de escritorio.

## 🌟 Características Principales

### 🎨 Frontend
- **Diseño responsivo** optimizado para móvil y escritorio
- **Interface moderna** con React 19.1.1 y hooks actualizados
- **Navegación fluida** con React Router DOM
- **Componentes reutilizables** y arquitectura escalable
- **Manejo de errores** con Error Boundaries
- **Rutas protegidas** con sistema de autenticación

### 🔐 Autenticación y Usuarios
- **Sistema completo de registro** con validación
- **Inicio de sesión seguro** con gestión de sesiones
- **Panel de administración** para gestión de usuarios
- **Búsqueda en tiempo real** en la administración
- **Edición y eliminación** de perfiles de usuario
- **Cambio de contraseña** funcional

### 📧 Funcionalidades de Comunicación
- **Newsletter funcional** con suscripción por email
- **Formulario de contacto** con almacenamiento en base de datos
- **Notificaciones al usuario** sobre acciones exitosas

### 🎯 Secciones del Blog
- **Blog principal** con artículos y contenido
- **Sección de Gustos** personalizada
- **Página de Aprender** educativa
- **Página de Contacto** interactiva

## 🚀 Tecnologías Utilizadas

### Frontend
- **React** 19.1.1 - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción ultra-rápida
- **React Router DOM** - Enrutamiento del lado cliente
- **Bootstrap** 5.3.7 - Framework CSS responsivo
- **FontAwesome** - Biblioteca de iconos

### Backend
- **Express.js** - Framework de servidor web
- **MySQL2** - Conector de base de datos MySQL
- **CORS** - Manejo de políticas de origen cruzado
- **Body-parser** - Análisis de cuerpos de solicitud HTTP

### Base de Datos
- **MySQL** - Sistema de gestión de base de datos relacional
- **Creación automática de tablas** al iniciar el servidor
- **Gestión de usuarios, newsletter y mensajes de contacto**

## 📁 Estructura del Proyecto

```
Web4/
├── 📁 backend/                 # Servidor Express.js
│   ├── 📄 index.js            # Archivo principal del servidor
│   ├── 📄 package.json        # Dependencias del backend
│   └── 📁 utils/
│       └── 📄 logger.js       # Utilidades de logging
├── 📁 frondend/               # Aplicación React
│   ├── 📁 src/
│   │   ├── 📄 App.jsx         # Componente principal
│   │   ├── 📄 main.jsx        # Punto de entrada
│   │   ├── 📁 components/     # Componentes reutilizables
│   │   │   ├── 📄 Navbar.jsx
│   │   │   ├── 📄 Footer.jsx
│   │   │   ├── 📄 LoginForm.jsx
│   │   │   ├── 📄 RegistroForm.jsx
│   │   │   ├── 📄 ErrorBoundary.jsx
│   │   │   └── 📄 ProteccionRutas.jsx
│   │   ├── 📁 pages/          # Páginas principales
│   │   │   ├── 📄 Blog.jsx
│   │   │   ├── 📄 Login.jsx
│   │   │   ├── 📄 Registro.jsx
│   │   │   ├── 📄 Gustos.jsx
│   │   │   ├── 📄 Aprender.jsx
│   │   │   ├── 📄 Contacto.jsx
│   │   │   ├── 📄 AdminUsuarios.jsx
│   │   │   ├── 📄 EditarUsuarios.jsx
│   │   │   └── 📄 PerfilUsuarios.jsx
│   │   └── 📁 utils/
│   │       └── 📄 logger.js   # Utilidades de logging frontend
│   ├── 📄 package.json        # Dependencias del frontend
│   └── 📄 vite.config.js      # Configuración de Vite
├── 📄 package.json            # Dependencias raíz
├── 📄 .gitignore             # Archivos ignorados por Git
└── 📄 README.md              # Este archivo
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- **Node.js** (versión 18 o superior)
- **MySQL** (versión 8 o superior)
- **npm** o **yarn**

### 1. Clonar el repositorio
```bash
git clone https://github.com/charlyanimado/prueba-blog-con-react-y-vite.git
cd prueba-blog-con-react-y-vite
```

### 2. Instalar dependencias
```bash
# Instalar dependencias raíz
npm install

# Instalar dependencias del frontend
cd frondend
npm install

# Instalar dependencias del backend
cd ../backend
npm install
```

### 3. Configurar la base de datos
1. Crear una base de datos MySQL llamada `blog_database`
2. Ajustar las credenciales en `backend/index.js`:
```javascript
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'blog_database'
});
```

### 4. Ejecutar el proyecto

#### Desarrollo
```bash
# Terminal 1: Ejecutar el backend
cd backend
npm start
# Servidor corriendo en http://localhost:3001

# Terminal 2: Ejecutar el frontend
cd frondend
npm run dev
# Aplicación corriendo en http://localhost:5173
```

#### Producción
```bash
# Construir el frontend
cd frondend
npm run build

# El backend servirá los archivos estáticos desde dist/
cd ../backend
npm start
```

## 🗄️ Base de Datos

El proyecto utiliza MySQL con las siguientes tablas que se crean automáticamente:

### Tabla `usuarios`
```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla `newsletter_subscriptions`
```sql
CREATE TABLE newsletter_subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  fecha_suscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla `contacto_mensajes`
```sql
CREATE TABLE contacto_mensajes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  mensaje TEXT NOT NULL,
  fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Funcionalidades Implementadas

### ✅ Sistema de Usuarios
- [x] Registro de usuarios con validación
- [x] Inicio de sesión con autenticación
- [x] Panel de administración de usuarios
- [x] Búsqueda en tiempo real
- [x] Edición y eliminación de usuarios
- [x] Cambio de contraseña
- [x] Protección de rutas

### ✅ Comunicación
- [x] Newsletter con suscripción funcional
- [x] Formulario de contacto operativo
- [x] Almacenamiento en base de datos

### ✅ Interface y UX
- [x] Diseño responsivo optimizado
- [x] Navegación intuitiva
- [x] Manejo de errores
- [x] Feedback al usuario
- [x] Optimización mobile-first

### ✅ Técnico
- [x] Configuración de producción
- [x] Logging seguro para producción
- [x] Gitignore completo
- [x] Estructura de proyecto escalable

## 🔧 Scripts Disponibles

### Frontend (`frondend/`)
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construcción para producción
npm run preview  # Vista previa de la construcción
npm run lint     # Análisis de código con ESLint
```

### Backend (`backend/`)
```bash
npm start        # Iniciar servidor Express
npm run dev      # Servidor con recarga automática (si tienes nodemon)
```

## 🌐 API Endpoints

### Autenticación
- `POST /api/register` - Registro de usuario
- `POST /api/login` - Inicio de sesión
- `POST /api/change-password` - Cambio de contraseña

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario

### Comunicación
- `POST /api/newsletter` - Suscripción al newsletter
- `POST /api/contacto` - Envío de mensaje de contacto

## 🚀 Despliegue

### Despliegue en Producción
1. **Frontend**: Construir y servir archivos estáticos
2. **Backend**: Configurar variables de entorno para base de datos
3. **Base de datos**: Asegurar conexión MySQL en producción

### Variables de Entorno Recomendadas
```env
NODE_ENV=production
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=blog_database
PORT=3001
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**charlyanimado**
- GitHub: [@charlyanimado](https://github.com/charlyanimado)

## 🙏 Agradecimientos

- React team por la increíble biblioteca
- Vite team por la herramienta de construcción ultrarrápida
- Bootstrap team por el framework CSS
- Comunidad open source por las increíbles herramientas

---

⭐ **¡Dale una estrella al proyecto si te ha sido útil!** ⭐