# 🚚 Truck Logistics API

API REST desarrollada con **NestJS**, **TypeScript** y **MongoDB** para gestionar órdenes de transporte vinculadas a camiones, usuarios y ubicaciones.

---

## 🛠️ Tecnologías utilizadas

- **NestJS** — Framework de Node.js
- **TypeScript** — Tipado estático
- **MongoDB + Mongoose** — Base de datos
- **JWT + Passport** — Autenticación
- **Google Places API** — Obtención de coordenadas y direcciones
- **bcryptjs** — Encriptación de contraseñas
- **class-validator** — Validación de DTOs

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
PORT=3000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/bego
JWT_SECRET=tu_jwt_secret
JWT_EXPIRES_IN=24h
GOOGLE_MAPS_API_KEY=tu_google_maps_api_key
```

Iniciá el servidor:
```bash
npm run start:dev
```

---

## 🔐 Autenticación

Todos los endpoints excepto `register` y `login` requieren un token JWT en el header:
```
Authorization: Bearer <token>
```

---

## 📡 Endpoints

### Auth
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registro de usuario |
| POST | `/api/auth/login` | Login, devuelve JWT |

### Users
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users` | Listar usuarios |
| GET | `/api/users/:id` | Obtener usuario |
| PATCH | `/api/users/:id` | Actualizar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario |

### Trucks
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/trucks` | Crear truck |
| GET | `/api/trucks` | Listar trucks |
| GET | `/api/trucks/:id` | Obtener truck |
| PATCH | `/api/trucks/:id` | Actualizar truck |
| DELETE | `/api/trucks/:id` | Eliminar truck |

### Orders
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/orders` | Crear orden |
| GET | `/api/orders` | Listar órdenes |
| GET | `/api/orders/:id` | Obtener orden |
| PATCH | `/api/orders/:id/status` | Cambiar status de orden |
| PATCH | `/api/orders/:id` | Actualizar orden |
| DELETE | `/api/orders/:id` | Eliminar orden |

### Locations
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/locations` | Crear location desde place_id |
| GET | `/api/locations` | Listar locations |
| GET | `/api/locations/:id` | Obtener location |
| PATCH | `/api/locations/:id` | Actualizar location |
| DELETE | `/api/locations/:id` | Eliminar location |

---

## 📦 Modelos

### User
```json
{
  "email": "string (único)",
  "password": "string (encriptado)"
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

---

## 👤 Autor

Agustín Franco Galvez