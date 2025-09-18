// preload.js (raíz del proyecto)
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  dbQuery: async (query) => {
    return await ipcRenderer.invoke("db-query", query);
  },
  // Puedes agregar más funciones seguras aquí
});
