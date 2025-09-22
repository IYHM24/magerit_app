// api.riesgo_residual.js - IPC para riesgo residual y Amenaza_Tipo_Activo

const { ipcMain } = require('electron');
const {
  Riesgo_Residual,
  Total_Riesgo_Residual_Activo,
  Amenaza_Tipo_Activo
} = require('./models');

// CRUD Riesgo_Residual
ipcMain.handle('riesgo_residual:create', async (event, data) => {
  const item = await Riesgo_Residual.create(data);
  return await Riesgo_Residual.findByPk(item.id);
});
ipcMain.handle('riesgo_residual:findMany', async () => {
  return await Riesgo_Residual.findAll();
});

// Upsert Total_Riesgo_Residual_Activo por id_activo y tipo_activo
ipcMain.handle('total_riesgo_residual_activo:upsert', async (event, { id_activo, tipo_activo, data }) => {
  let registro = await Total_Riesgo_Residual_Activo.findOne({ where: { id_activo, tipo_activo } });
  if (registro) {
    await registro.update(data);
    return registro;
  } else {
    registro = await Total_Riesgo_Residual_Activo.create({ ...data, id_activo, tipo_activo });
    return registro;
  }
});

ipcMain.handle('riesgo_residual:findByActivoTipo', async (event, { id_activo, tipo_activo }) => {
  return await Riesgo_Residual.findAll({
    where: { id_activo, tipo_activo }
  });
});
ipcMain.handle('riesgo_residual:findUnique', async (event, id) => {
  return await Riesgo_Residual.findByPk(id);
});
ipcMain.handle('riesgo_residual:update', async (event, { id, data }) => {
  await Riesgo_Residual.update(data, { where: { id } });
  return await Riesgo_Residual.findByPk(id);
});
ipcMain.handle('riesgo_residual:delete', async (event, id) => {
  await Riesgo_Residual.destroy({ where: { id } });
  return { id };
});

// CRUD Amenaza_Tipo_Activo
/* ipcMain.handle('amenaza_tipo_activo:create', async (event, data) => {
  const item = await Amenaza_Tipo_Activo.create(data);
  return item;
}); */

/* ipcMain.handle('amenaza_tipo_activo:deleteByAmenazaTipo', async (event, { id_amenaza, tipo_activo }) => {
  await Amenaza_Tipo_Activo.destroy({
    where: {
      id_amenaza,
      tipo_activo
    }
  });
  return { id_amenaza, tipo_activo };
}); */

/* ipcMain.handle('amenaza_tipo_activo:exists', async (event, { id_amenaza, tipo_activo }) => {
  const exists = await Amenaza_Tipo_Activo.findOne({
    where: { id_amenaza, tipo_activo }
  });
  return !!exists;
}); */

/* const { Amenazas } = require('./models'); */
/* ipcMain.handle('amenaza:findByTipoActivo', async (event, tipo_activo) => {
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
 */