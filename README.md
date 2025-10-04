# 🛍️ Prueba Técnica - Tienda Online

Una aplicación full-stack de tienda online desarrollada con React y Node.js/Express.

## 📁 Estructura del Proyecto

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
    └── ...
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm (versión 8 o superior)

### Instalación Completa
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd prueba-tecnica-tienda

# Instalar todas las dependencias (raíz, cliente y servidor)
npm run install-all
```

### Instalación Manual (Opcional)
```bash
# Instalar dependencias de la raíz
npm install

# Instalar dependencias del cliente
npm run install:client

# Instalar dependencias del servidor
npm run install:server
```

## 🏃‍♂️ Cómo Ejecutar

### Desarrollo - Ambos proyectos simultáneamente
```bash
npm run dev
```
Esto iniciará:
- 🖥️ **Cliente React**: http://localhost:3000
- 🚀 **Servidor Express**: http://localhost:3001

### Ejecutar Solo el Cliente
```bash
npm run dev:client
```

### Ejecutar Solo el Servidor
```bash
npm run dev:server
```

## 📦 Scripts Disponibles

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

### Scripts de Pruebas
- `npm run test:client` - Pruebas del cliente
- `npm run test:server` - Pruebas del servidor

### Scripts de Mantenimiento
- `npm run clean` - Limpia node_modules y archivos de build

## 🛠️ Tecnologías Utilizadas

### Frontend (Cliente)
- **React** 19.2.0
- **React Scripts** 5.0.1
- **Testing Library** para pruebas

### Backend (Servidor)
- **Node.js** con ES Modules
- **Express** 5.1.0
- **CORS** 2.8.5
- **dotenv** 17.2.3

### Herramientas de Desarrollo
- **concurrently** - Para ejecutar múltiples comandos
- **rimraf** - Para limpiar directorios

## 🔧 Configuración del Servidor

El servidor Express está configurado para:
- Puerto por defecto: 3001 (configurable via `PORT` en .env)
- CORS habilitado para desarrollo
- Rutas API bajo `/api/products`
- Soporte para ES Modules

### Variables de Entorno
Crea un archivo `.env` en la carpeta `Servidor/`:
```env
PORT=3001
NODE_ENV=development
```

## 🌐 Endpoints de la API

- `GET /` - Mensaje de bienvenida
- `GET /api/products` - Obtener productos (según implementación)

## 🧪 Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Solo pruebas del cliente
npm run test:client

# Solo pruebas del servidor  
npm run test:server
```

## 📝 Desarrollo

### Agregar Nuevas Dependencias

**Para el Cliente:**
```bash
cd Cliente/prueba-tecnica-tienda
npm install <paquete>
```

**Para el Servidor:**
```bash
cd Servidor
npm install <paquete>
```

### Estructura de Commits Recomendada
```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato
refactor: refactorización de código
test: agregar o modificar pruebas
```

## 🚀 Despliegue

### Build para Producción
```bash
npm run build
```

El build se generará en `Cliente/prueba-tecnica-tienda/build/`

### Variables de Entorno para Producción
Asegúrate de configurar las variables de entorno apropiadas en tu plataforma de despliegue.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

Para cualquier pregunta o sugerencia, no dudes en contactar.

---

⭐ ¡No olvides darle una estrella al proyecto si te resulta útil!