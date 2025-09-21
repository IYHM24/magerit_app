const { ipcRenderer } = window.require
  ? window.require('electron')
  : require('electron');

export const crearRiesgoIntriseco = async (data: any) =>
  await ipcRenderer.invoke('riesgo_intriseco:create', data);

export const obtenerRiesgosIntriseco = async () =>
  await ipcRenderer.invoke('riesgo_intriseco:findMany');

export const obtenerRiesgoIntriseco = async (id: number) =>
  await ipcRenderer.invoke('riesgo_intriseco:findUnique', id);

export const actualizarRiesgoIntriseco = async (id: number, data: any) =>
  await ipcRenderer.invoke('riesgo_intriseco:update', { id, data });

export const eliminarRiesgoIntriseco = async (id: number) =>
  await ipcRenderer.invoke('riesgo_intriseco:delete', id);

export const crearAmenazaTipoActivo = async (data: any) =>
  await ipcRenderer.invoke('amenaza_tipo_activo:create', data);

export const eliminarAmenazaTipoActivo = async (id_amenaza: number, tipo_activo: string) =>
  await ipcRenderer.invoke('amenaza_tipo_activo:deleteByAmenazaTipo', { id_amenaza, tipo_activo });

export const existeAmenazaTipoActivo = async (id_amenaza: number, tipo_activo: string) =>
  await ipcRenderer.invoke('amenaza_tipo_activo:exists', { id_amenaza, tipo_activo });

// CRUD para RiesgoIntrisecoVsActivo
export const crearRiesgoIntrisecoVsActivo = async (data: any) =>
  await ipcRenderer.invoke('riesgo_intriseco_vs_activo:create', data);

export const obtenerRiesgosIntrisecoVsActivo = async () =>
  await ipcRenderer.invoke('riesgo_intriseco_vs_activo:findMany');

export const obtenerRiesgoIntrisecoVsActivo = async (id: number) =>
  await ipcRenderer.invoke('riesgo_intriseco_vs_activo:findUnique', id);

export const actualizarRiesgoIntrisecoVsActivo = async (id: number, data: any) =>
  await ipcRenderer.invoke('riesgo_intriseco_vs_activo:update', { id, data });

export const eliminarRiesgoIntrisecoVsActivo = async (id: number) =>
  await ipcRenderer.invoke('riesgo_intriseco_vs_activo:delete', id);

// CRUD para TotalRiesgoIntrisecoActivo
export const crearTotalRiesgoIntrisecoActivo = async (data: any) =>
  await ipcRenderer.invoke('total_riesgo_intriseco_activo:create', data);

export const obtenerTotalesRiesgoIntrisecoActivo = async () =>
  await ipcRenderer.invoke('total_riesgo_intriseco_activo:findMany');

export const obtenerTotalRiesgoIntrisecoActivo = async (id: number) =>
  await ipcRenderer.invoke('total_riesgo_intriseco_activo:findUnique', id);

export const actualizarTotalRiesgoIntrisecoActivo = async (id: number, data: any) =>
  await ipcRenderer.invoke('total_riesgo_intriseco_activo:update', { id, data });

export const eliminarTotalRiesgoIntrisecoActivo = async (id: number) =>
  await ipcRenderer.invoke('total_riesgo_intriseco_activo:delete', id);
