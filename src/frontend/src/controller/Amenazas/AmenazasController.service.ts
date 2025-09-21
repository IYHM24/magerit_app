const { ipcRenderer } = window.require
  ? window.require('electron')
  : require('electron');

// GrupoAmenaza
export const crearGrupoAmenaza = async (data: any) =>
  await ipcRenderer.invoke('grupoAmenaza:create', data);

export const obtenerGruposAmenaza = async () =>
  await ipcRenderer.invoke('grupoAmenaza:findMany');

export const obtenerGrupoAmenaza = async (id: number) =>
  await ipcRenderer.invoke('grupoAmenaza:findUnique', id);

export const actualizarGrupoAmenaza = async (id: number, data: any) =>
  await ipcRenderer.invoke('grupoAmenaza:update', { id, data });

export const eliminarGrupoAmenaza = async (id: number) =>
  await ipcRenderer.invoke('grupoAmenaza:delete', id);

export const obtenerAmenazasPorGrupo = async (id_grupo_amenaza: number) =>
  await ipcRenderer.invoke('amenaza:findByGrupo', id_grupo_amenaza);

// Amenaza
export const crearAmenaza = async (data: any) =>
  await ipcRenderer.invoke('amenaza:create', data);

export const obtenerAmenazas = async () =>
  await ipcRenderer.invoke('amenaza:findMany');

export const crearAmenazaTipoActivo = async (data: any) =>
  await ipcRenderer.invoke('amenaza_tipo_activo:create', data);

export const eliminarAmenazaTipoActivo = async (id_amenaza: number, tipo_activo: string) =>
  await ipcRenderer.invoke('amenaza_tipo_activo:deleteByAmenazaTipo', { id_amenaza, tipo_activo });

export const obtenerAmenaza = async (id: number) =>
  await ipcRenderer.invoke('amenaza:findUnique', id);

export const actualizarAmenaza = async (id: number, data: any) =>
  await ipcRenderer.invoke('amenaza:update', { id, data });

export const eliminarAmenaza = async (id: number) =>
  await ipcRenderer.invoke('amenaza:delete', id);
