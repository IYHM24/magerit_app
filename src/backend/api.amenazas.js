// api.amenazas.js - CRUD para GrupoAmenaza y Amenaza usando Sequelize y Electron IPC

const { ipcMain } = require('electron');
const { Amenaza_Grupo, Amenazas } = require('./models');
const { Riesgo_Intriseco, Total_Riesgo_Intriseco_Activo } = require('./models');
const { Riesgo_Residual, Total_Riesgo_Residual_Activo } = require('./models');

// CRUD GrupoAmenaza
ipcMain.handle('grupoAmenaza:create', async (event, data) => {
  const grupo = await Amenaza_Grupo.create(data);
  return { id: grupo.id };
});

ipcMain.handle('grupoAmenaza:findMany', async () => {
  return await Amenaza_Grupo.findAll();
});

ipcMain.handle('grupoAmenaza:findUnique', async (event, id) => {
  return await Amenaza_Grupo.findByPk(id);
});

ipcMain.handle('grupoAmenaza:update', async (event, { id, data }) => {
  await Amenaza_Grupo.update(data, { where: { id } });
  return await Amenaza_Grupo.findByPk(id);
});

ipcMain.handle('grupoAmenaza:delete', async (event, id) => {
  try {
    // Eliminar amenazas relacionadas primero
    const Amenazas_db = await Amenazas.findAll({ where: { id_grupo_amenaza: id } });
    const amenazas = Amenazas_db.map(a => a.dataValues);
    for (const amenaza of amenazas) {
      // Eliminar riesgos residuales relacionados
      await Riesgo_Residual.destroy({ where: { id_amenaza: amenaza.id } });
      // Eliminar riesgos intrínsecos relacionados
      await Riesgo_Intriseco.destroy({ where: { id_amenaza: amenaza.id } });
    }
    await Amenazas.destroy({ where: { id_grupo_amenaza: id } });
    await Amenaza_Grupo.destroy({ where: { id } });
    return { id };
  } catch (error) {
    console.error('Error al eliminar grupo de amenaza:', error);
    throw error;
  }

});

ipcMain.handle('amenaza:findByGrupo', async (event, grupoAmenazaId) => {
  return await Amenazas.findAll({ where: { id_grupo_amenaza: grupoAmenazaId } });
});

// CRUD Amenaza
ipcMain.handle('amenaza:create', async (event, data) => {
  const amenaza = await Amenazas.create(data);
  return { id: amenaza.id };
});

ipcMain.handle('amenaza:findMany', async () => {
  return await Amenazas.findAll();
});

ipcMain.handle('amenaza:findUnique', async (event, id) => {
  return await Amenazas.findByPk(id);
});

ipcMain.handle('amenaza:update', async (event, { id, data }) => {
  await Amenazas.update(data, { where: { id } });
  return await Amenazas.findByPk(id);
});

ipcMain.handle('amenaza:delete', async (event, id) => {
  // Eliminar riesgos residuales relacionados
  await Riesgo_Residual.destroy({ where: { id_amenaza: amenaza.id } });
  // Eliminar riesgos intrínsecos relacionados
  await Riesgo_Intriseco.destroy({ where: { id_amenaza: amenaza.id } });
  await Amenazas.destroy({ where: { id } });
  return { id };
});
