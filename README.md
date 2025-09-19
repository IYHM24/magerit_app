# Magerit Platform - App de escritorio con Electron, React, SQLite y Prisma

## Estructura de carpetas
- `src/frontend`: Frontend en React + Vite + Tailwind + Shadcn
- `src/backend`: Backend integrado con Electron y API interna
- `src/db` y `prisma`: Base de datos SQLite y ORM Prisma

## Instalación y desarrollo

1. Instala dependencias:
   ```bash
   npm install
   cd src/frontend && npm install
   ```

2. Ejecuta migraciones de base de datos:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Inicia la app en modo desarrollo:
   ```bash
   npm run dev
   ```

## Empaquetado multiplataforma

1. Instala electron-builder:
   ```bash
   npm install electron-builder --save-dev
   ```

2. Genera ejecutable para Windows:
   ```bash
   npx electron-builder --win
   ```

3. Genera ejecutable para Mac:
   ```bash
   npx electron-builder --mac
   ```

4. Genera ejecutable para Linux:
   ```bash
   npx electron-builder --linux
   ```

## Scripts útiles

- Migraciones:  
  ```bash
  npx prisma migrate dev
  npx prisma migrate reset
  ```

- Seeders:  
  Agrega seeds en `prisma/seed.js` y ejecuta:
  ```bash
  npx prisma db seed
  ```

## Notas

- El backend y la base de datos están integrados en el ejecutable.
- Puedes consultar y renderizar usuarios desde la BD usando el componente `UsuariosList`.
- Arquitectura modular y lista para escalar nuevas funcionalidades.
