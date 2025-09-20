const { ipcRenderer } = window.require
  ? window.require('electron')
  : require('electron');

// Obtener todos los tipos de activo
export const obtenerTiposActivo = async () =>
  await ipcRenderer.invoke('tipo_activo:findMany');

// Obtener tipo de activo por id
export const obtenerTipoActivo = async (id: number) =>
  await ipcRenderer.invoke('tipo_activo:findUnique', id);
