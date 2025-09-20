// src/pages/activos/index.tsx
import React, { act, useEffect, useState } from "react";
import ModernTable from "@/components/ModernTable";
import type { TableColumn } from "@/components/ModernTable";
import NavigationArrows from "@/components/NavigationArrows";
import { actualizarActivo, crearActivo, obtenerActivos } from "@/controller/Activos/ActivosController.service";
import { obtenerTiposActivo } from "@/controller/Tipo_Activos/TipoActivosController.service";
import { obtenerDepartamentos } from "@/controller/Administracion/AdministracionController.service";
import { capitalizeFirstLetter } from "@/utils/tools";


type OptionType = { label: string; value: number };
type initialDataType = {
  id?: number;
  activo: string;
  tipo_activo: number;
  nombre_tipo_activo: string;
  valor: number;
  valoracion: string;
  autenticidad: number;
  confidencialidad: number;
  integridad: number;
  disponibilidad: number;
  trazabilidad: number;
  id_propietario: number;
  propietario: string;
};

const columns: TableColumn[] = [
  {
    key: "id",
    label: "ID",
    type: "text" as const,
    fixed: true,
    editable: false,
    sortable: true,
    width: "60px",
  },
  {
    key: "activo",
    label: "Activo",
    type: "text" as const,
    fixed: false,
    editable: true,
    sortable: true,
    width: "180px",
  },
  {
    key: "nombre_tipo_activo",
    label: "Tipo activo",
    type: "select" as const,
    fixed: false,
    editable: true,
    sortable: true,
    width: "140px",
    optionLabelKey: "label",
    optionValueKey: "value",
  },
  {
    key: "valor",
    label: "Valor",
    type: "currency" as const,
    fixed: false,
    editable: true,
    sortable: true,
    width: "120px",
  },
  {
    key: "valoracion",
    label: "Valoración",
    type: "text" as const,
    fixed: false,
    editable: true,
    sortable: true,
    width: "120px",
  },
  ...[
      "autenticidad", "confidencialidad",
      "integridad", "disponibilidad",
      "trazabilidad"
    ].map((key) => ({
    key,
    label: capitalizeFirstLetter(key),
    type: "number" as const,
    fixed: false,
    editable: true,
    sortable: true,
    width: "80px",
  })),
  {
    key: "propietario",
    label: "Propietario",
    type: "select" as const,
    fixed: false,
    editable: true,
    sortable: true,
    width: "160px",
    optionLabelKey: "label",
    optionValueKey: "value",
  },
];

const Activos: React.FC = () => {
  const [data, setData] = useState<initialDataType[]>([]);
  const [columnsState, setColumnsState] = useState<TableColumn[]>([]);
  const [tipoActivoOptions, setTipoActivoOptions] = useState<OptionType[]>([]);
  const [propietarioOptions, setPropietarioOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    // Aquí podrías cargar los datos desde una API o base de datos
    fetchActivos();
    fetchSelectOptions();

  }, []);

  /*  */

  const fetchActivos = async () => {
    /* obtener los activos */
    const activos_db = await obtenerActivos();

    /* configurar activos */
    const activos = activos_db.map((activo: any) => ({
      id: activo.dataValues.id,
      activo: activo.dataValues.activo,
      tipo_activo: activo.dataValues.tipo_activo,
      nombre_tipo_activo: activo.dataValues.nombre_tipo_activo,
      valor: activo.dataValues.valor,
      valoracion: activo.dataValues.valoracion,
      autenticidad: activo.dataValues.autenticidad,
      confidencialidad: activo.dataValues.confidencialidad,
      integridad: activo.dataValues.integridad,
      disponibilidad: activo.dataValues.disponibilidad,
      trazabilidad: activo.dataValues.trazabilidad,
      id_propietario: activo.dataValues.id_propietario,
      propietario: activo.dataValues.propietario,
    }));

    /* actualizar estado local */
    setData(activos);
  }


  const fetchSelectOptions = async () => {
    
    const no_option_select = { label: "Seleccione...", value: 0 };

    /* Departamentos */
    const departamentos_db = await obtenerDepartamentos();
    const departamentos: OptionType[] = [no_option_select, ...departamentos_db
    .filter((dept: any) => dept && dept.dataValues.activo)
    .map((dept: any) => ({
      label: dept.dataValues.nombre,
      value: dept.dataValues.id,
    }))];

    /* Tipos de activo */
    const tipoActivos_db = await obtenerTiposActivo();
    const tipoActivos: OptionType[] = [no_option_select, ...tipoActivos_db
    .map((tipo: any) => ({
      label: tipo.dataValues.nombre,
      value: tipo.dataValues.id,
    }))];
    
    /* Establecer opciones */
    columns[columns.length - 1].options = departamentos;
    columns[2].options = tipoActivos;

    /* Actualizar estado local */
    setColumnsState([...columns]);
    setTipoActivoOptions(tipoActivos);
    setPropietarioOptions(departamentos);
  }
  
  
  /*  */

  const handleChange = (newData: any) => {
    /* Construir objeto de actualización */
    const update_data = {
      id: Number(newData.id),
      activo: String(newData.activo).trim(),
      tipo_activo: Number(newData.nombre_tipo_activo) || 1,
      nombre_tipo_activo: tipoActivoOptions.find(opt => opt.value === Number(newData.nombre_tipo_activo))?.label || "N/A",
      valor: Number(newData.valor) || 0,
      valoracion: String(newData.valoracion).trim() || "N/A",
      autenticidad: Number(newData.autenticidad) || 0,
      confidencialidad: Number(newData.confidencialidad) || 0,
      integridad: Number(newData.integridad) || 0,
      disponibilidad: Number(newData.disponibilidad) || 0,
      trazabilidad: Number(newData.trazabilidad) || 0,
      id_propietario: Number(newData.propietario) || 1,
      propietario: propietarioOptions.find(opt => opt.value === Number(newData.propietario))?.label || "N/A",
    }
    debugger;

    /* Actualizar en la base de datos */
    actualizarActivo(update_data.id, update_data);
   
  };

  const handleCreate = async () => {

    /* Crear nuevo activo */
    const data_to_create: initialDataType = {
      activo: "Nuevo Activo",
      tipo_activo: 1,
      nombre_tipo_activo:"N/A",
      valor: 0,
      valoracion: "N/A",
      autenticidad: 0,
      confidencialidad: 0,
      integridad: 0,
      disponibilidad: 0,
      trazabilidad: 0,
      id_propietario: 1,
      propietario: "N/A",
    }

    /* Crear nuevo activo */
    const nextId = await crearActivo(data_to_create)
    const new_data = { id: nextId, ...data_to_create };

    /* Actualizar estado local */
    setData(prevData => [...prevData, new_data]);
  };

  return (
    <>
      <div className="my-10">
        <ModernTable
          title="Activos"
          columns={columnsState}
          data={data}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      </div>
      <NavigationArrows 
        nextPath={"/amenazas"}
        prevPath={"/administracion/departamentos"}
        nextText={"Amenazas"}
        prevText={"Gestionar departamentos"}
      />
    </>
  );
};

export default Activos;
