// api.js: Endpoints CRUD para usuarios usando Prisma y SQLite
const { ipcMain } = require('electron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear usuario
ipcMain.handle('usuario:create', async (event, data) => {
  return await prisma.usuario.create({ data });
});

// Leer todos los usuarios
ipcMain.handle('usuario:findMany', async () => {
  return await prisma.usuario.findMany();
});

// Leer usuario por id
ipcMain.handle('usuario:findUnique', async (event, id) => {
  return await prisma.usuario.findUnique({ where: { id } });
});

// Actualizar usuario
ipcMain.handle('usuario:update', async (event, { id, data }) => {
  return await prisma.usuario.update({ where: { id }, data });
});

// Eliminar usuario
ipcMain.handle('usuario:delete', async (event, id) => {
  return await prisma.usuario.delete({ where: { id } });
});
