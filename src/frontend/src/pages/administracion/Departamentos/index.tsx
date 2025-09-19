// src/pages/administracion/Departamentos.tsx
import React, { useState } from "react";
import ModernTable from "@/components/ModernTable";

const initialData = [
  { id: 1, nombre: "Recursos Humanos", activo: true },
  { id: 2, nombre: "Finanzas", activo: true },
  { id: 3, nombre: "TI", activo: false },
];

import type { TableColumn } from "@/components/ModernTable";

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
  const [data, setData] = useState(initialData);

  const handleChange = (newData: any[]) => {
    setData(newData as typeof initialData);
  };

  const handleCreate = () => {
    debugger;
    const nextId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
    setData( prev =>
      [
      ...prev,
      { id: nextId, nombre: "Nuevo Departamento", activo: false },
    ]);
  };

  return (
    <div className="my-10">
      <ModernTable
        title="Departamentos"
        columns={columns}
        data={data}
        onChange={handleChange}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default Departamentos;
