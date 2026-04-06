# TP2 - Frontend + Backend

Guía rápida para instalar dependencias, configurar el archivo .env del backend y levantar ambos servidores.

## 1) Requisitos

- Node.js 18 o superior
- npm
- MySQL en ejecución

## 2) Instalar dependencias

Desde la raíz del proyecto:

```powershell
cd tp2/backend
npm install

cd ../frontend
npm install
```

## 3) Backend: crear y completar .env

Entrar a la carpeta del backend:

```powershell
cd tp2/backend
```

Si no existe el archivo .env, crearlo desde el ejemplo:

```powershell
Copy-Item .env.example .env
```

Contenido sugerido para .env:

```env
DB_NAME=react_native_tp2
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_DIALECT=mysql
PORT=3000
```

Notas:
- DB_NAME debe existir en tu MySQL (creala antes si no existe).
- Si tu usuario/clave de MySQL son distintos, cambialos en el .env.

## 4) Iniciar backend

En una terminal:

```powershell
cd tp2/backend
npm run dev
```

El backend queda en http://localhost:3000

## 5) Iniciar frontend

En otra terminal:

```powershell
cd tp2/frontend
npm run dev
```

El frontend de Vite queda en http://localhost:5173

## 6) Orden recomendado de arranque

1. Levantar MySQL.
2. Levantar backend.
3. Levantar frontend.

