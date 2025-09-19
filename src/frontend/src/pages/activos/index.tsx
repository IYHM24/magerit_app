// src/pages/activos/index.tsx
import React, { useState } from "react";
import ModernTable from "@/components/ModernTable";

const tipoActivoOptions = [
  "Hardware",
  "Software",
  "Infraestructura",
  "Documento",
  "Servicio",
];

const propietarioOptions = [
  "Juan Pérez",
  "Ana Gómez",
  "Empresa XYZ",
  "Departamento TI",
];

const initialData = [
  {
    id: 1,
    activo: "Servidor Web",
    tipoActivo: "Hardware",
    valor: 12000,
    valoracion: "Alto",
    A: 5,
    C: 4,
    I: 3,
    D: 2,
    T: 1,
    propietario: "Departamento TI",
  },
  {
    id: 2,
    activo: "Licencia Windows",
    tipoActivo: "Software",
    valor: 500,
    valoracion: "Medio",
    A: 3,
    C: 2,
    I: 4,
    D: 1,
    T: 2,
    propietario: "Empresa XYZ",
  },
];

import type { TableColumn } from "@/components/ModernTable";

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
    key: "tipoActivo",
    label: "Tipo activo",
    type: "select" as const,
    fixed: false,
    editable: true,
    sortable: true,
    width: "140px",
    options: tipoActivoOptions,
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
  ...["A", "C", "I", "D", "T"].map((key) => ({
    key,
    label: key,
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
    options: propietarioOptions,
  },
];

const Activos: React.FC = () => {
  const [data, setData] = useState(initialData);

  const handleChange = (newData: any[]) => {
    setData(newData as typeof initialData);
  };

  const handleCreate = () => {
    const nextId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
    setData([
      ...data,
      {
        id: nextId,
        activo: "",
        tipoActivo: tipoActivoOptions[0],
        valor: 0,
        valoracion: "",
        A: 0,
        C: 0,
        I: 0,
        D: 0,
        T: 0,
        propietario: propietarioOptions[0],
      },
    ]);
  };

  return (
    <div className="my-10">
      <ModernTable
        title="Activos"
        columns={columns}
        data={data}
        onChange={handleChange}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default Activos;
