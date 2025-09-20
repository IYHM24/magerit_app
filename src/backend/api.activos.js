// api.activos.js - CRUD para activos usando Sequelize y Electron IPC

const { ipcMain } = require('electron');
const { Activo } = require('./models');

console.log('api.activos.js cargado (Sequelize)');

// Crear activo
ipcMain.handle('activo:create', async (event, data) => {
  const activo = await Activo.create(data);
  return { id: activo.id };
});

// Leer todos los activos
ipcMain.handle('activo:findMany', async () => {
  return await Activo.findAll();
});

// Leer activo por id
ipcMain.handle('activo:findUnique', async (event, id) => {
  return await Activo.findByPk(id);
});

// Actualizar activo
ipcMain.handle('activo:update', async (event, { id, data }) => {
  await Activo.update(data, { where: { id } });
  return await Activo.findByPk(id);
});

// Eliminar activo
ipcMain.handle('activo:delete', async (event, id) => {
  await Activo.destroy({ where: { id } });
  return { id };
});
