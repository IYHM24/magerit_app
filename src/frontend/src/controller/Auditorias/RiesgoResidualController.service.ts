const { ipcRenderer } = window.require
  ? window.require('electron')
  : require('electron');

export const crearRiesgoResidual = async (data: any) =>
  await ipcRenderer.invoke('riesgo_residual:create', data);

export const obtenerRiesgosResidual = async () =>
  await ipcRenderer.invoke('riesgo_residual:findMany');

export const obtenerRiesgosResidualPorActivoTipo = async (id_activo: number, tipo_activo: string) =>
  await ipcRenderer.invoke('riesgo_residual:findByActivoTipo', { id_activo, tipo_activo });

export const obtenerRiesgoResidual = async (id: number) =>
  await ipcRenderer.invoke('riesgo_residual:findUnique', id);

export const actualizarRiesgoResidual = async (id: number, data: any) =>
  await ipcRenderer.invoke('riesgo_residual:update', { id, data });

export const eliminarRiesgoResidual = async (id: number) =>
  await ipcRenderer.invoke('riesgo_residual:delete', id);

// CRUD para TotalRiesgoResidualActivo
export const upsertTotalRiesgoResidualActivo = async (id_activo: number, tipo_activo: string, data: any) =>
  await ipcRenderer.invoke('total_riesgo_residual_activo:upsert', { id_activo, tipo_activo, data });
