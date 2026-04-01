# 🚚 Truck Logistics API

API REST desarrollada con **NestJS**, **TypeScript** y **MongoDB** para gestionar órdenes de transporte vinculadas a camiones, usuarios y ubicaciones.

🔗 **Repositorio:** https://github.com/GAgustinFranco/prueba-tecnica-be-go

---

## 🛠️ Tecnologías utilizadas

- **NestJS** — Framework de Node.js
- **TypeScript** — Tipado estático
- **MongoDB + Mongoose** — Base de datos
- **JWT + Passport** — Autenticación
- **Google Places API** — Obtención de coordenadas y direcciones
- **bcryptjs** — Encriptación de contraseñas
- **class-validator** — Validación de DTOs
- **Swagger** — Documentación interactiva de la API

---

## 📋 Requisitos previos

- Node.js v18+
- MongoDB Atlas o local
- API Key de Google Places API

---

## ⚙️ Instalación
```bash
git clone https://github.com/GAgustinFranco/prueba-tecnica-be-go.git
cd prueba-tecnica-be-go
npm install
```

Configurá las variables de entorno en el archivo `.env`:
```env
# App
PORT=3000

# MongoDB
MONGODB_URI=mongodb+srv://agustingalvez0901:admin123@movies.umq9tl9.mongodb.net/bego?retryWrites=true&w=majority&appName=Movies

# JWT
JWT_SECRET=tL9#mK2$vX7@nQ4&wR8!pJ3^yH6*cF1%bN5+dS0
JWT_EXPIRES_IN=24h

# Google Maps
GOOGLE_MAPS_API_KEY=AIzaSyATOxzRCxpe6h0J3rjjjDoZeqhWPWOK0A4
```

Iniciá el servidor:
```bash
npm run start:dev
```

---

## 📚 Documentación Swagger

Una vez iniciado el servidor, la documentación interactiva de la API está disponible en:
```
http://localhost:3000/docs
```

Desde ahí podés probar todos los endpoints directamente en el navegador, incluyendo autenticación con JWT.

---

## 🔐 Autenticación

Los endpoints de registro y login son públicos. Todos los demás requieren un token JWT en el header:
```
Authorization: Bearer <token>
```

**Flujo:**
1. Registrarse en `POST /api/auth/register`
2. Hacer login en `POST /api/auth/login`
3. Copiar el `access_token` de la respuesta
4. Usarlo en el botón **Authorize** de Swagger o en el header de Postman

---

## 📡 Endpoints

### Auth
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registro de usuario | ❌ |
| POST | `/api/auth/login` | Login, devuelve JWT | ❌ |

### Users
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | Listar usuarios | ✅ |
| GET | `/api/users/:id` | Obtener usuario por ID | ✅ |
| PATCH | `/api/users/:id` | Actualizar usuario | ✅ |
| DELETE | `/api/users/:id` | Eliminar usuario | ✅ |

### Trucks
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/trucks` | Crear truck | ✅ |
| GET | `/api/trucks` | Listar trucks | ✅ |
| GET | `/api/trucks/:id` | Obtener truck por ID | ✅ |
| PATCH | `/api/trucks/:id` | Actualizar truck | ✅ |
| DELETE | `/api/trucks/:id` | Eliminar truck | ✅ |

### Orders
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/orders` | Crear orden | ✅ |
| GET | `/api/orders` | Listar órdenes | ✅ |
| GET | `/api/orders/:id` | Obtener orden por ID | ✅ |
| PATCH | `/api/orders/:id/status` | Cambiar status de orden | ✅ |
| PATCH | `/api/orders/:id` | Actualizar orden | ✅ |
| DELETE | `/api/orders/:id` | Eliminar orden | ✅ |

### Locations
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/locations` | Crear location desde place_id | ✅ |
| GET | `/api/locations` | Listar locations | ✅ |
| GET | `/api/locations/:id` | Obtener location por ID | ✅ |
| PATCH | `/api/locations/:id` | Actualizar location | ✅ |
| DELETE | `/api/locations/:id` | Eliminar location | ✅ |

---

## 📦 Modelos

### User
```json
{
  "email": "string (único)",
  "password": "string (encriptado con bcrypt)"
}
```

### Truck
```json
{
  "user": "ObjectId",
  "year": "string",
  "color": "string",
  "plates": "string (único)"
}
```

### Order
```json
{
  "user": "ObjectId",
  "truck": "ObjectId",
  "status": "created | in transit | completed",
  "pickup": "ObjectId (Location)",
  "dropoff": "ObjectId (Location)"
}
```

### Location
```json
{
  "user": "ObjectId",
  "place_id": "string (único)",
  "address": "string",
  "latitude": "number",
  "longitude": "number"
}
```

---

## 🗺️ Ejemplos de place_id para probar Locations
```
ChIJiRp93iEC0oURvJVqErpVVHw
ChIJsUDXn2od0oURpAnsjV2k44A
ChIJGQkBCFIAzoURlLaQUWnuYZc
```

---

## 🌿 Flujo Git

Se utilizó una rama por cada dominio y se mergeó a `main` al completar cada uno:
```
main
├── feature/users
├── feature/trucks
├── feature/orders
└── feature/locations
```

---

## 🏗️ Enfoque de desarrollo

El proyecto fue desarrollado de forma modular siguiendo la arquitectura de NestJS:

- **Módulos independientes** por cada dominio (Users, Trucks, Orders, Locations)
- **DTOs con validaciones** usando `class-validator` para validar los datos antes de insertar en la base de datos
- **JWT Guard** reutilizable aplicado a todos los endpoints protegidos
- **Google Places API** integrada en el servicio de Locations para obtener automáticamente la dirección y coordenadas a partir de un `place_id`
- **Populate de Mongoose** para devolver los datos relacionados completos en Orders
- **Variables de entorno** para toda la configuración sensible
- **Swagger** para la documentación interactiva de todos los endpoints

---

## 👤 Autor

**Agustín Franco Galvez**