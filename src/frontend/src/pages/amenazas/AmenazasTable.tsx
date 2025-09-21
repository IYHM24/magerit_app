// AmenazasTable.tsx - Tabla para amenazas según el modelo Sequelize

import React, { useEffect, useState } from "react";
import ModernTable from "@/components/ModernTable";
import type { TableColumn } from "@/components/ModernTable";
import { obtenerAmenazas, crearAmenaza, actualizarAmenaza, eliminarAmenaza, obtenerAmenazasPorGrupo } from "@/controller/Amenazas/AmenazasController.service";

type AmenazaType = {
  id?: number;
  id_grupo_amenaza: number;
  amenaza: string;
  autenticidad: boolean;
  confidencialidad: boolean;
  integridad: boolean;
  disponibilidad: boolean;
  trazabilidad: boolean;
  servicios: boolean;
  software: boolean;
  hardware: boolean;
  informacion: boolean;
  instalaciones: boolean;
  personal: boolean;
};

const columns: TableColumn[] = [
  { key: "id", label: "ID", type: "text", fixed: true, editable: false, sortable: true, width: "60px" },
  { key: "amenaza", label: "Amenaza", type: "textarea", fixed: true, editable: true, sortable: true, width: "180px" },
  { key: "autenticidad", label: "Autenticidad", type: "checkbox", fixed: false, editable: true, sortable: true, width: "80px" },
  { key: "confidencialidad", label: "Confidencialidad", type: "checkbox", fixed: false, editable: true, sortable: true, width: "80px" },
  { key: "integridad", label: "Integridad", type: "checkbox", fixed: false, editable: true, sortable: true, width: "80px" },
  { key: "disponibilidad", label: "Disponibilidad", type: "checkbox", fixed: false, editable: true, sortable: true, width: "80px" },
  { key: "trazabilidad", label: "Trazabilidad", type: "checkbox", fixed: false, editable: true, sortable: true, width: "80px" },
  { key: "servicios", label: "Servicios", type: "checkbox", fixed: false, editable: true, sortable: true, width: "80px" },
  { key: "software", label: "Software", type: "checkbox", fixed: false, editable: true, sortable: true, width: "80px" },
  { key: "hardware", label: "Hardware", type: "checkbox", fixed: false, editable: true, sortable: true, width: "80px" },
  { key: "informacion", label: "Información", type: "checkbox", fixed: false, editable: true, sortable: true, width: "80px" },
  { key: "instalaciones", label: "Instalaciones", type: "checkbox", fixed: false, editable: true, sortable: true, width: "80px" },
  { key: "personal", label: "Personal", type: "checkbox", fixed: false, editable: true, sortable: true, width: "80px" },
];

type Props = {
  id_grupo_amenaza: number;
};

const AmenazasTable: React.FC<Props> = ({ id_grupo_amenaza }) => {
  const [data, setData] = useState<AmenazaType[]>([]);

  useEffect(() => {
    fetchAmenazas();
  }, []);

  const fetchAmenazas = async () => {
    const amenazas_db = await obtenerAmenazasPorGrupo(id_grupo_amenaza);
    const amenazas = amenazas_db.map((amenaza: any) => ({
      id: amenaza.dataValues.id,
      id_grupo_amenaza: amenaza.dataValues.id_grupo_amenaza,
      amenaza: amenaza.dataValues.amenaza,
      autenticidad: !!amenaza.dataValues.autenticidad,
      confidencialidad: !!amenaza.dataValues.confidencialidad,
      integridad: !!amenaza.dataValues.integridad,
      disponibilidad: !!amenaza.dataValues.disponibilidad,
      trazabilidad: !!amenaza.dataValues.trazabilidad,
      servicios: !!amenaza.dataValues.servicios,
      software: !!amenaza.dataValues.software,
      hardware: !!amenaza.dataValues.hardware,
      informacion: !!amenaza.dataValues.informacion,
      instalaciones: !!amenaza.dataValues.instalaciones,
      personal: !!amenaza.dataValues.personal,
    }));
    setData(amenazas);
  };

  const handleChange = async (newData: AmenazaType) => {
    debugger
    await actualizarAmenaza(newData.id!, newData);
    fetchAmenazas();
  };

  const handleCreate = async () => {
    debugger
    //Construir objeto
    const nuevaAmenaza: AmenazaType = {
      id_grupo_amenaza: id_grupo_amenaza,
      amenaza: "Nueva Amenaza",
      autenticidad: false,
      confidencialidad: false,
      integridad: false,
      disponibilidad: false,
      trazabilidad: false,
      servicios: false,
      software: false,
      hardware: false,
      informacion: false,
      instalaciones: false,
      personal: false,
    };
    const res = await crearAmenaza(nuevaAmenaza);
    setData([...data, { ...nuevaAmenaza, id: res.id }]);
  };

  const handleDelete = async (id: number) => {
    await eliminarAmenaza(id);
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className="w-full max-w-full overflow-x-auto flex justify-center items-center">
      <ModernTable
        title="Amenazas"
        columns={columns}
        data={data}
        onChange={handleChange}
        onCreate={handleCreate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AmenazasTable;
