// api.activos.js - CRUD para activos usando Sequelize y Electron IPC

const { ipcMain } = require('electron');
const { Activo } = require('./models');
const { Riesgo_Intriseco, Total_Riesgo_Intriseco_Activo } = require('./models');
const { Riesgo_Residual, Total_Riesgo_Residual_Activo } = require('./models');


console.log('api.activos.js cargado (Sequelize)');

// Crear activo
ipcMain.handle('activo:create', async (event, data) => {
  const activo = await Activo.create(data);
  return { id: activo.id };
});

const { Op } = require('sequelize');

// Leer todos los activos
ipcMain.handle('activo:findMany', async () => {
  return await Activo.findAll();
});

// Leer activos por tipo (case-insensitive)
ipcMain.handle('activo:findByTipo', async (event, tipo) => {
  const tipoLower = tipo.toLowerCase();
  return await Activo.findAll({
    where: {
      tipo_activo: {
        [Op.like]: `%${tipoLower}%`
      }
    }
  }).then(activos =>
    activos.filter(a => (a.tipo_activo || '').toLowerCase() === tipoLower)
  );
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
  await Riesgo_Residual.destroy({ where: { id_activo: id } });
  await Total_Riesgo_Residual_Activo.destroy({ where: { id_activo: id } });
  await Riesgo_Intriseco.destroy({ where: { id_activo: id } });
  await Riesgo_Intriseco_Vs_Activo.destroy({ where: { id_activo: id } });
  await Total_Riesgo_Intriseco_Activo.destroy({ where: { id_activo: id } });
  await Activo.destroy({ where: { id } });
  return { id };
});
