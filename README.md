# 🌸 Catálogo de Perfumes

Sistema web Fullstack para la gestión y consulta de un catálogo de perfumes, desarrollado con **Laravel** como API REST y **React + Vite** como aplicación frontend.

El sistema permite administrar productos, categorías, marcas y usuarios, incorporando autenticación, control de acceso por roles, validaciones, búsqueda de productos y manejo de errores.

---

## 🛠️ Tecnologías del Proyecto

### Backend

* **Framework:** Laravel
* **Lenguaje:** PHP
* **Autenticación:** Laravel Sanctum
* **ORM:** Eloquent
* **API:** REST API
* **Base de datos:** MySQL / MariaDB
* **Validaciones:** Laravel Validation
* **Middleware:** Middleware personalizado para control de acceso

### Frontend

* **Framework:** React
* **Build Tool:** Vite
* **Routing:** React Router
* **Peticiones HTTP:** Axios
* **Lenguaje:** JavaScript
* **Estilos:** CSS

### Herramientas

* **Postman** — pruebas de la API
* **Git / GitHub** — control de versiones

---

## 🌟 Módulos y Funcionalidades

### 🔐 Autenticación y roles

* Registro e inicio de sesión.
* Autenticación mediante tokens.
* Almacenamiento del token en `localStorage`.
* Protección de rutas del frontend.
* Roles:

  * `admin`
  * `cliente`
* Middleware para proteger operaciones administrativas.
* Control de acceso según el rol del usuario.

---

### 🌸 Gestión de Productos

Permite realizar las operaciones principales del CRUD:

* Crear productos.
* Listar productos.
* Consultar productos.
* Editar productos.
* Eliminar productos.
* Buscar productos por nombre.
* Mostrar categoría y marca asociadas.
* Mostrar precio y stock.

Los formularios de creación y edición utilizan componentes independientes:

```text
ProductosPage
├── CrearPerfume
└── EditarPerfume
```

---

### 🏷️ Gestión de Categorías

Permite:

* Crear categorías.
* Listar categorías.
* Editar categorías.
* Eliminar categorías.
* Validar los datos enviados.
* Mostrar estados de carga.
* Mostrar estados vacíos.
* Mostrar errores de petición.

---

### 🏢 Gestión de Marcas

Permite:

* Crear marcas.
* Listar marcas.
* Editar marcas.
* Eliminar marcas.
* Mostrar estados de carga.
* Mostrar estados vacíos.
* Mostrar errores.

---

### 👥 Gestión de Usuarios

El administrador dispone de un módulo para la gestión de usuarios del sistema.

El acceso a este módulo está protegido mediante autenticación y autorización administrativa.

---

### 🔎 Búsqueda de Productos

El listado de productos incorpora una barra de búsqueda.

Permite filtrar los productos utilizando su nombre.

Cuando existen productos pero ninguno coincide con la búsqueda, se muestra:

```text
No se encontraron productos.
```

---

### ⚠️ Validación y Manejo de Errores

El proyecto implementa validaciones tanto en los formularios como en el backend.

Laravel devuelve errores de validación mediante respuestas JSON con código `422` cuando la petición espera JSON.

Los formularios de productos muestran los errores correspondientes debajo de cada campo.

Ejemplo:

```text
The precio field must be at least 0.
```

También se implementaron estados para:

* Cargando información.
* Listados vacíos.
* Errores de conexión o petición.
* Errores de validación.
* Recursos no encontrados.
* Falta de autenticación.
* Falta de permisos.

---

## 🛡️ Protección de Rutas

Las rutas protegidas del frontend utilizan un componente `ProtectedRoute`.

Cuando no existe un usuario autenticado, el usuario es redirigido al login.

En el backend, las operaciones administrativas utilizan:

```php
auth:sanctum
```

junto con un middleware personalizado:

```text
admin
```

Esto permite separar las operaciones públicas de las operaciones que requieren permisos administrativos.

---

## ⚙️ Requisitos del Sistema

Antes de ejecutar el proyecto necesitas tener instalado:

* PHP
* Composer
* Node.js
* npm
* MySQL o MariaDB
* Git

Se recomienda utilizar versiones compatibles con las versiones de Laravel y React utilizadas en el proyecto.

---

# 🚀 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/KENDRY05/Catalogo-perfumes
```

Entrar a la carpeta del proyecto:

```bash
cd nombre-del-proyecto
```

---

# 🔧 Configuración del Backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Instalar las dependencias de Laravel:

```bash
composer install
```

Crear el archivo de configuración:

```bash
cp .env.example .env
```

En Windows también puedes crear una copia de `.env.example` y nombrarla:

```text
.env
```

Generar la clave de Laravel:

```bash
php artisan key:generate
```

---

## 🗄️ Configuración de la Base de Datos

Crear una base de datos en MySQL o MariaDB.

Después configurar el archivo `.env` del backend con los datos correspondientes:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_base_datos
DB_USERNAME=root
DB_PASSWORD=
```

Después ejecutar las migraciones:

```bash
php artisan migrate
```

Si el proyecto dispone de seeders configurados:

```bash
php artisan db:seed
```

---

## ▶️ Ejecutar el Backend

Desde la carpeta `backend`:

```bash
php artisan serve
```

El backend estará disponible normalmente en:

```text
http://127.0.0.1:8000
```

La API utilizará:

```text
http://127.0.0.1:8000/api
```

---

# ⚛️ Configuración del Frontend

Abrir otra terminal y entrar a la carpeta del frontend:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

---

## 🔐 Variables de Entorno

Crear un archivo:

```text
.env
```

en la raíz del frontend.

Agregar:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

El proyecto utiliza esta variable desde Axios:

```javascript
import.meta.env.VITE_API_URL
```

Vite expone al código del cliente las variables que utilizan el prefijo `VITE_`; por ello no deben colocarse secretos o contraseñas en estas variables.

Después de modificar un archivo `.env`, reinicia el servidor de Vite para que los cambios sean cargados.

---

## ▶️ Ejecutar el Frontend

Desde la carpeta `frontend`:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

---

# 📡 Endpoints Principales de la API

## 🔐 Autenticación

```text
POST /api/register
POST /api/login
```

---

## 🌸 Productos

### Consultar productos

```text
GET /api/productos
```

### Consultar un producto

```text
GET /api/productos/{id}
```

### Crear producto

```text
POST /api/productos
```

### Actualizar producto

```text
PUT /api/productos/{id}
```

También está disponible:

```text
PATCH /api/productos/{id}
```

### Eliminar producto

```text
DELETE /api/productos/{id}
```

---

## 🏷️ Categorías

```text
GET    /api/categorias
POST   /api/categorias
GET    /api/categorias/{id}
PUT    /api/categorias/{id}
DELETE /api/categorias/{id}
```

---

## 🏢 Marcas

```text
GET    /api/marcas
POST   /api/marcas
GET    /api/marcas/{id}
PUT    /api/marcas/{id}
DELETE /api/marcas/{id}
```

---

## 👥 Usuarios

```text
GET    /api/usuarios
POST   /api/usuarios
GET    /api/usuarios/{id}
PUT    /api/usuarios/{id}
DELETE /api/usuarios/{id}
```

Las operaciones administrativas están protegidas mediante autenticación y autorización.

---

# 🧪 Pruebas de la API

Durante el desarrollo se realizaron pruebas utilizando **Postman**.

### 401 — No autenticado

Se realizó una petición protegida sin token.

Respuesta:

```json
{
    "message": "Unauthenticated."
}
```

---

### 403 — Sin permisos

Se comprobó que un usuario con rol `cliente` no puede realizar operaciones administrativas.

Respuesta:

```json
{
    "message": "No tienes permisos para realizar esta acción."
}
```

---

### 404 — Recurso no encontrado

Se solicitó un producto inexistente:

```text
GET /api/productos/999999
```

Respuesta:

```json
{
    "mensaje": "Producto no encontrado"
}
```

---

### 422 — Error de validación

Se envió una categoría sin nombre:

```json
{
    "descripcion": "Categoría sin nombre"
}
```

Respuesta:

```json
{
    "message": "The nombre field is required.",
    "errors": {
        "nombre": [
            "The nombre field is required."
        ]
    }
}
```

También se comprobó la validación de productos utilizando un precio negativo.

---

# 📊 Estados de la Interfaz

Los listados implementan diferentes estados para mejorar la experiencia de usuario.

### Loading

```text
Cargando productos...
```

### Lista vacía

```text
No hay productos registrados.
```

### Búsqueda sin resultados

```text
No se encontraron productos.
```

### Error

```text
No se pudieron cargar los productos.
```

Estos estados se implementaron en los principales módulos de administración.

---

# 📁 Estructura General del Proyecto

```text
proyecto/
│
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   └── Middleware/
│   │   └── Models/
│   │
│   ├── database/
│   │   └── migrations/
│   │
│   ├── routes/
│   │   └── api.php
│   │
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── styles/
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🔄 Arquitectura de Comunicación

La comunicación entre las dos partes del proyecto se realiza mediante peticiones HTTP.

```text
┌─────────────────────┐
│      React          │
│      + Vite         │
└──────────┬──────────┘
           │
           │ Axios
           │ HTTP / JSON
           ▼
┌─────────────────────┐
│      Laravel        │
│       API REST      │
└──────────┬──────────┘
           │
           │ Eloquent
           ▼
┌─────────────────────┐
│   MySQL / MariaDB   │
└─────────────────────┘
```

---

# 🔑 Autenticación

Las peticiones autenticadas utilizan un token Bearer:

```text
Authorization: Bearer TOKEN
```

Axios agrega automáticamente el token almacenado en `localStorage` mediante un interceptor.

---

# 📌 Estado del Proyecto

El proyecto cuenta con:

* ✅ Autenticación
* ✅ Roles `admin` y `cliente`
* ✅ Protección de rutas
* ✅ Middleware administrativo
* ✅ CRUD de productos
* ✅ CRUD de categorías
* ✅ CRUD de marcas
* ✅ Gestión de usuarios
* ✅ Formularios controlados
* ✅ Validaciones
* ✅ Manejo de errores `401`, `403`, `404` y `422`
* ✅ Estados de carga
* ✅ Estados vacíos
* ✅ Búsqueda de productos
* ✅ Variables de entorno
* ✅ Pruebas de API con Postman

---

# 👨‍💻 Autores

**Kendry Medrano
  Carlos Avendaño
  Roberts Calderon
  German Espinoza
  Jose Gabriel Gomez
  Heyling Avendaño**

Proyecto desarrollado con fines académicos y de práctica para la implementación de una aplicación Fullstack utilizando **Laravel + React**.
