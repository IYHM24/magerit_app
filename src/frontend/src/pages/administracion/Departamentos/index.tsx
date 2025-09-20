// src/pages/administracion/Departamentos.tsx
import React, { useEffect, useState } from "react";
import ModernTable from "@/components/ModernTable";
import { 
  obtenerDepartamentos, crearDepartamento,
  actualizarDepartamento,
  eliminarDepartamento
 } from "@/controller/Administracion/AdministracionController.service";

type initialData = { id: number; nombre: string; activo: boolean };

import type { TableColumn } from "@/components/ModernTable";
import NavigationArrows from "@/components/NavigationArrows";

const columns: TableColumn[] = [
  {
    key: "id",
    label: "ID",
    type: "text",
    fixed: true,
    editable: false,
    sortable: true,
    width: "80px",
  },
  {
    key: "nombre",
    label: "Nombre",
    type: "text",
    fixed: false,
    editable: true,
    sortable: true,
    width: "200px",
  },
  {
    key: "activo",
    label: "Activo",
    type: "checkbox",
    fixed: false,
    editable: true,
    sortable: true,
    width: "120px",
  },
];

const Departamentos: React.FC = () => {

  const fetch_data = async () => {
    const departamentos_response = await obtenerDepartamentos();
    const departamentos = departamentos_response.map((dept: any) => ({
      id: dept.dataValues.id,
      nombre: dept.dataValues.nombre,
      activo: dept.dataValues.activo,
    }));
    setData([...departamentos]);
  }
  

  useEffect(() => {
    fetch_data();
  }, []);

  const [data, setData] = useState<initialData[]>([]);
  
  const handleChange = (newData: any) => {
    //Actualizar en la base de datos
     const departamento: initialData = {
      id: Number(newData.id),
      nombre: String(newData.nombre).trim(),
      activo: Boolean(newData.activo),
    };

    /* Actualizar el departamento en la base de datos */
    actualizarDepartamento(departamento.id, departamento);
  };

  const handleCreate = async () => {
    /* Guardar en la base de datos */
    const dataSend = {
      nombre: "Nuevo Departamento",
      activo: true
    }
    const departamento_creado = await crearDepartamento(dataSend);
    console.log("ID del departamento creado:", departamento_creado.id);

    /* Actualizar el estado local */
    setData([...data, departamento_creado]);
  };

  const handleDelete = async (id: number) => {
    // eliminar un departamento de la base de datos
    await eliminarDepartamento(id);
    // actualizar el estado local
    setData(data.filter((dept) => dept.id !== id));
  }
  

  return (
    <div className="my-10">
      <ModernTable
        title="Departamentos"
        columns={columns}
        data={data}
        onChange={handleChange}
        onCreate={handleCreate}
        onDelete={handleDelete}
      />
      <NavigationArrows
        nextPath="/activos"
        prevPath="/administracion"
        nextText="Gestionar activos"
        prevText="instrucciones"
      />
    </div>
  );
};

export default Departamentos;
