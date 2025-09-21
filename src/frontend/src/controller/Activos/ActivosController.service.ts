const { ipcRenderer } = window.require
  ? window.require('electron')
  : require('electron');

export const crearActivo = async (data: any) =>
  await ipcRenderer.invoke('activo:create', data);

export const obtenerActivos = async () =>
  await ipcRenderer.invoke('activo:findMany');

export const obtenerActivosPorTipo = async (tipo: string) =>
  await ipcRenderer.invoke('activo:findByTipo', tipo);

export const obtenerActivo = async (id: number) =>
  await ipcRenderer.invoke('activo:findUnique', id);

export const actualizarActivo = async (id: number, data: any) =>
  await ipcRenderer.invoke('activo:update', { id, data });

export const eliminarActivo = async (id: number) =>
  await ipcRenderer.invoke('activo:delete', id);
