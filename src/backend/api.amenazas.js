// api.amenazas.js - CRUD para GrupoAmenaza y Amenaza usando Sequelize y Electron IPC

const { ipcMain } = require('electron');
const { Amenaza_Grupo, Amenazas } = require('./models');

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
  // Eliminar amenazas relacionadas primero
  await Amenaza.destroy({ where: { grupoAmenazaId: id } });
  await GrupoAmenaza.destroy({ where: { id } });
  return { id };
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
  await Amenazas.destroy({ where: { id } });
  return { id };
});
