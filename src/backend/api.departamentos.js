// api.departamentos.js - CRUD para departamentos usando Sequelize y Electron IPC

const { ipcMain } = require('electron');
const { Departamento, Activo } = require('./models');

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
const { Riesgo_Intriseco, Riesgo_Intriseco_Vs_Activo, Total_Riesgo_Intriseco_Activo, Riesgo_Residual, Total_Riesgo_Residual_Activo } = require('./models');

ipcMain.handle('departamento:delete', async (event, id) => {
  // Buscar activos relacionados
  const activos_db = await Activo.findAll({ where: { id_propietario: id } });
  const activos = activos_db.map(a => a.dataValues );
  for (const activo of activos) {
    // Eliminar riesgos residuales relacionados
    await Riesgo_Residual.destroy({ where: { id_activo: activo.id } });
    await Total_Riesgo_Residual_Activo.destroy({ where: { id_activo: activo.id } });
    // Eliminar riesgos intrínsecos relacionados
    await Riesgo_Intriseco.destroy({ where: { id_activo: activo.id } });
    await Total_Riesgo_Intriseco_Activo.destroy({ where: { id_activo: activo.id } });
    // Eliminar riesgos residuales relacionados
    //await Riesgo_Residual.destroy({ where: { id_activo: activo.id } });
    //await Total_Riesgo_Residual_Activo.destroy({ where: { id_activo: activo.id } });
    // Eliminar activo
    await Activo.destroy({ where: { id: activo.id } });
  }
  await Departamento.destroy({ where: { id } });
  return { id };
});
