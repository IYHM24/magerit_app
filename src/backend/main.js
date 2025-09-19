// main.js para Electron
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    maximizable: true,      // Permite maximizar la ventana
    resizable: true,
    movable: true,   
    frame: true,            // Muestra barra de título y botones
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.maximize(); // Maximiza la ventana completamente

  if (process.env.NODE_ENV === 'production') {
    win.loadFile(path.join(__dirname, '../frontend/dist/index.html'));
  } else {
    win.loadURL('http://localhost:5174');
  }

  // Integrar lógica backend (API Prisma)
  require('./api.js');
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
