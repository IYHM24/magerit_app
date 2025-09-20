// api.departamentos.js - CRUD para departamentos usando Sequelize y Electron IPC

const { ipcMain } = require('electron');
const { Departamento } = require('./models');

console.log('api.departamentos.js cargado (Sequelize)');

// Crear departamento
ipcMain.handle('departamento:create', async (event, data) => {
  const departamento = await Departamento.create(data);
  return { id: departamento.id };
});

// Leer todos los departamentos
ipcMain.handle('departamento:findMany', async () => {
  return await Departamento.findAll();
});

// Leer departamento por id
ipcMain.handle('departamento:findUnique', async (event, id) => {
  return await Departamento.findByPk(id);
});

// Actualizar departamento
ipcMain.handle('departamento:update', async (event, { id, data }) => {
  await Departamento.update(data, { where: { id } });
  return await Departamento.findByPk(id);
});

// Eliminar departamento
ipcMain.handle('departamento:delete', async (event, id) => {
  await Departamento.destroy({ where: { id } });
  return { id };
});
