// main.js para Electron con Sequelize

const { app, BrowserWindow } = require('electron');
const path = require('path');
const { sequelize } = require('./src/backend/models.js');

function createWindow() {
  const win = new BrowserWindow({
    maximizable: true,
    resizable: true,
    movable: true,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.maximize();
  win.loadFile(path.join(__dirname, '../app/src/frontend/dist/index.html'));
  // win.loadURL('http://localhost:5173');
  // Integrar lógica backend (API Sequelize)
  require('./src/backend/api.departamentos.js');
  console.log('api.departamentos.js requeridos correctamente');

  // Migrar y sincronizar modelos Sequelize al iniciar la app
  sequelize.sync().then(() => {
    console.log('Tablas sincronizadas con Sequelize');
  }).catch(err => {
    console.error('Error sincronizando tablas:', err);
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
