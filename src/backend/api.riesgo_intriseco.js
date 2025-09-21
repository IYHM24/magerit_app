// api.riesgo_intriseco.js - IPC para riesgo intrínseco y Amenaza_Tipo_Activo

const { ipcMain } = require('electron');
const {
  Riesgo_Intriseco,
  Riesgo_Intriseco_Vs_Activo,
  Total_Riesgo_Intriseco_Activo,
  Amenaza_Tipo_Activo
} = require('./models');

// CRUD Riesgo_Intriseco
ipcMain.handle('riesgo_intriseco:create', async (event, data) => {
  const item = await Riesgo_Intriseco.create(data);
  return item;
});
ipcMain.handle('riesgo_intriseco:findMany', async () => {
  return await Riesgo_Intriseco.findAll();
});
ipcMain.handle('riesgo_intriseco:findUnique', async (event, id) => {
  return await Riesgo_Intriseco.findByPk(id);
});
ipcMain.handle('riesgo_intriseco:update', async (event, { id, data }) => {
  await Riesgo_Intriseco.update(data, { where: { id } });
  return await Riesgo_Intriseco.findByPk(id);
});
ipcMain.handle('riesgo_intriseco:delete', async (event, id) => {
  await Riesgo_Intriseco.destroy({ where: { id } });
  return { id };
});

// CRUD Amenaza_Tipo_Activo
ipcMain.handle('amenaza_tipo_activo:create', async (event, data) => {
  const item = await Amenaza_Tipo_Activo.create(data);
  return item;
});
ipcMain.handle('amenaza_tipo_activo:deleteByAmenazaTipo', async (event, { id_amenaza, tipo_activo }) => {
  await Amenaza_Tipo_Activo.destroy({
    where: {
      id_amenaza,
      tipo_activo
    }
  });
  return { id_amenaza, tipo_activo };
});

ipcMain.handle('amenaza_tipo_activo:exists', async (event, { id_amenaza, tipo_activo }) => {
  const exists = await Amenaza_Tipo_Activo.findOne({
    where: { id_amenaza, tipo_activo }
  });
  return !!exists;
});
