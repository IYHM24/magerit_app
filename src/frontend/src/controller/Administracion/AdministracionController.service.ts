const { ipcRenderer } = window.require
  ? window.require('electron')
  : require('electron');

export const crearDepartamento = async (data: any) =>
  await ipcRenderer.invoke('departamento:create', data);

export const obtenerDepartamentos = async () =>
  await ipcRenderer.invoke('departamento:findMany');

export const obtenerDepartamento = async (id: number) =>
  await ipcRenderer.invoke('departamento:findUnique', id);

export const actualizarDepartamento = async (id: number, data: any) =>
  await ipcRenderer.invoke('departamento:update', { id, data });

export const eliminarDepartamento = async (id: number) =>
  await ipcRenderer.invoke('departamento:delete', id);

export const obtenerDepartamentoAlAzar = async () =>
  await ipcRenderer.invoke('departamento:findRandom');