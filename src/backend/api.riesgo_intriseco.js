// api.riesgo_intriseco.js - IPC para riesgo intrínseco y Amenaza_Tipo_Activo

const { ipcMain } = require('electron');
const {
  Riesgo_Intriseco,
  Total_Riesgo_Intriseco_Activo,
  Amenaza_Tipo_Activo
} = require('./models');

// CRUD Riesgo_Intriseco
ipcMain.handle('riesgo_intriseco:create', async (event, data) => {
  const item = await Riesgo_Intriseco.create(data);
  return await Riesgo_Intriseco.findByPk(item.id);
});
ipcMain.handle('riesgo_intriseco:findMany', async () => {
  return await Riesgo_Intriseco.findAll();
});

// Upsert Total_Riesgo_Intriseco_Activo por id_activo y tipo_activo
ipcMain.handle('total_riesgo_intriseco_activo:upsert', async (event, { id_activo, tipo_activo, data }) => {
  let registro = await Total_Riesgo_Intriseco_Activo.findOne({ where: { id_activo, tipo_activo } });
  if (registro) {
    await registro.update(data);
    return registro;
  } else {
    registro = await Total_Riesgo_Intriseco_Activo.create({ ...data, id_activo, tipo_activo });
    return registro;
  }
});

ipcMain.handle('riesgo_intriseco:findByActivoTipo', async (event, { id_activo, tipo_activo }) => {
  return await Riesgo_Intriseco.findAll({
    where: { id_activo, tipo_activo }
  });
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

const { Amenazas } = require('./models');
ipcMain.handle('amenaza:findByTipoActivo', async (event, tipo_activo) => {
  // Buscar todos los id_amenaza asociados al tipo_activo
  const relaciones = await Amenaza_Tipo_Activo.findAll({ where: { tipo_activo } });
  const ids = relaciones.map(r => r.id_amenaza);
  // Buscar amenazas por id
  const amenazas = await Amenazas.findAll({
    where: { id: ids }
  });
  // Retornar amenazas
  return amenazas;
});
