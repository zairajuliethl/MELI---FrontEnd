## Estructura del Proyecto

```
prueba-tecnica-tienda/
├── package.json              # Configuración principal del monorepo
├── README.md                  # Documentación principal
├── .gitignore                # Archivos a ignorar en git
├── Cliente/                  # Frontend React
│   └── prueba-tecnica-tienda/
│       ├── package.json
│       ├── public/
│       ├── src/
│       └── ...
└── Servidor/                 # Backend Express
    ├── package.json
    ├── src/
    │   ├── server.js
    │   ├── controllers/
    │   ├── routes/
    │   └── services/
    │   └── utils/
    └── ...
```

## Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm (versión 8 o superior)

### Instalación Completa
```bash
# Clonar el repositorio
git clone https://github.com/zairajuliethl/MELI---FrontEnd.git
cd prueba-tecnica-tienda

# Instalar todas las dependencias (raíz, cliente y servidor)
npm run install-all
```

## Cómo Ejecutar

### Desarrollo - Ambos proyectos simultáneamente
```bash
npm run dev
```
Esto iniciará:
- **Cliente React**: http://localhost:3000
- **Servidor Express**: http://localhost:3001

### Ejecutar Solo el Cliente
```bash
npm run dev:client
```

### Ejecutar Solo el Servidor
```bash
npm run dev:server
```

## Scripts Disponibles

### Scripts Principales
- `npm run dev` - Ejecuta cliente y servidor simultáneamente
- `npm run build` - Construye la aplicación para producción
- `npm start` - Alias para `npm run dev`
- `npm test` - Ejecuta las pruebas de ambos proyectos

### Scripts de Instalación
- `npm run install-all` - Instala todas las dependencias
- `npm run install:client` - Instala solo dependencias del cliente
- `npm run install:server` - Instala solo dependencias del servidor

### Scripts de Desarrollo
- `npm run dev:client` - Solo el cliente React
- `npm run dev:server` - Solo el servidor Express

### Scripts de Mantenimiento
- `npm run clean` - Limpia node_modules y archivos de build

## Tecnologías Utilizadas

### Frontend (Cliente)
- **React** 19.2.0
- **React Scripts** 5.0.1

### Backend (Servidor)
- **Node.js** con ES Modules
- **Express** 5.1.0
- **CORS** 2.8.5
- **dotenv** 17.2.3

## Configuración del Servidor

El servidor Express está configurado para:
- Puerto por defecto: 3001 (configurable via `PORT` en .env)
- CORS habilitado para desarrollo
- Rutas API bajo `/api/products`
- Soporte para ES Modules