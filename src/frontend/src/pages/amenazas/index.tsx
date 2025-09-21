// src/pages/amenazas/index.tsx
import React, { useEffect, useState } from "react";
import CardGrid from "@/components/CardGrid";
import NavigationArrows from "@/components/NavigationArrows";
import { actualizarGrupoAmenaza, crearGrupoAmenaza, eliminarGrupoAmenaza, obtenerGruposAmenaza } from "@/controller/Amenazas/AmenazasController.service";
import { FiArrowLeft } from "react-icons/fi";
import AmenazasTable from "./AmenazasTable";

type grupo_amenaza = {
  id?: number,
  nombre: string,
}

const AmenazasPage: React.FC = () => {

  const [items, setItems] = useState<grupo_amenaza[]>([]);
  const [idGrupoAmenazaSeleccionado, setidGrupoAmenazaSeleccionado] = useState<number>(0);
  const [grupoAmenazaSeleccionado, setGrupoAmenazaSeleccionado] = useState<grupo_amenaza | null>(null);

  useEffect(() => {
    fetch_amenazas_group();
  }, []);

  /*  */

  const fetch_amenazas_group = async () => {
    const amenazas_group_bd = await obtenerGruposAmenaza();
    const amenazas_group = amenazas_group_bd.map((grupo: any) => ({
      id: grupo.dataValues.id,
      nombre: grupo.dataValues.nombre,
    }));
    setItems(amenazas_group);
  }


  /*  */
  
  const handleCreate = async () => {

    //Crear objeto de nuevo grupo de amenaza
    const grupo_amenazas_cuerpo: grupo_amenaza = {
      nombre: `nuevo grupo de amenaza`
    };

    //Crear nuevo grupo de amenezas en la base de datos
    const crear_grupo_amenaza = await crearGrupoAmenaza(grupo_amenazas_cuerpo);

    //Actualizar estado local
    setItems([...items, { id: crear_grupo_amenaza.id, nombre: `nuevo grupo de amenaza` }]);
  };

  const handleEdit = (id: number) => {
    // seleccionar grupo de amenazas
    const grupoSeleccionado = items.find(item => item.id === id) || null;
    setGrupoAmenazaSeleccionado(grupoSeleccionado);
    setidGrupoAmenazaSeleccionado(id);
  };

  const handleDelete = async (id: number) => {
    // eliminar grupo de amenazas
    await eliminarGrupoAmenaza(id);
    // actualizar estado local
    setItems(items.filter(item => item.id !== id));
  };

  const handleNameChange = async (newName: string) => {
    //Construir objeto actualizacion base de datos
    const updatedGrupoAmenaza = { ...grupoAmenazaSeleccionado, nombre: newName };
    console.log(updatedGrupoAmenaza);

    //Actualizar en la base de datos
    const actualizar_grupo_amenaza = await actualizarGrupoAmenaza(idGrupoAmenazaSeleccionado, updatedGrupoAmenaza);
    console.log(actualizar_grupo_amenaza);

    //Actualizar estados locales
    setGrupoAmenazaSeleccionado(updatedGrupoAmenaza);
    setItems(items.map(item => item.id === idGrupoAmenazaSeleccionado ? { ...item, nombre: newName } : item));
  }
  

  /*  */

  return (
    <>
      {idGrupoAmenazaSeleccionado === 0 ?
        (<>
          <div className="p-6 max-h-screen">
            <CardGrid
              title="Grupo de amenazas"
              items={items}
              onCreate={handleCreate}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
          <NavigationArrows
            nextPath="/auditorias"
            prevPath="/activos"
            nextText="Auditorías"
            prevText="Activos"
          />
        </>)
        :
        (<div className="p-6 min-h-screen flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <button
                title="Volver a grupos de amenazas"
                className="bg-lime-500 hover:bg-lime-600 dark:text-black text-white rounded-full p-2 flex items-center gap-2"
                onClick={() => setidGrupoAmenazaSeleccionado(0)}
              >
                <FiArrowLeft size={24} />
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col gap-4">
            <h2 className="font-bold">Detalles del grupo de amenazas: codigo - {idGrupoAmenazaSeleccionado} </h2>
            <input
              type="text"
              value={grupoAmenazaSeleccionado?.nombre ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                handleNameChange(value);
              }}
              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-1 rounded w-full border border-transparent focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-400"
            />
          </div>
          <div>
            <AmenazasTable id_grupo_amenaza={idGrupoAmenazaSeleccionado} />
          </div>
        </div>)}
    </>
  )
};

export default AmenazasPage;
