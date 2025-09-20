// api.tipo_activo.js - Métodos para obtener todos y registro por id en Tipo_Activo usando Sequelize y Electron IPC

const { ipcMain } = require('electron');
const { Tipo_Activo } = require('./models');

console.log('api.tipo_activo.js cargado (Sequelize)');

// Obtener todos los tipos de activo
ipcMain.handle('tipo_activo:findMany', async () => {
  return await Tipo_Activo.findAll();
});

// Obtener tipo de activo por id
ipcMain.handle('tipo_activo:findUnique', async (event, id) => {
  return await Tipo_Activo.findByPk(id);
});
