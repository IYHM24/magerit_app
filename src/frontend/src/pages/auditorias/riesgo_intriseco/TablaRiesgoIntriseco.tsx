import React, { useEffect, useState } from "react";
import ModernTable from "../../../components/ModernTable";
import type { TableColumn } from "../../../components/ModernTable";
import { CalcularTotalRiesgoIntrinseco, RiesgoIntrinsecoUpdateTable, type riesgo_intriseco } from "@/utils/riesgo_intriseco.builder";


const columns: TableColumn[] = [
  { key: "id", label: "ID", type: "text" },
  { key: "amenaza", label: "Amenaza", type: "text" },
  {
    key: "valoracion_vulnerabilidad", label: "Valoración Vulnerabilidad", type: "select", editable: true, options: [
      { label: "Frecuencia muy alta", value: "FMA" },
      { label: "Frecuencia  alta", value: "FA" },
      { label: "Frecuencia  media", value: "FM" },
      { label: "Frecuencia baja", value: "FB" },
      { label: "Frecuencia muy baja", value: "FMB" }
    ]
  },
  { key: "valor_vulnearabilidad", label: "Valor Vulnerabilidad", type: "text", editable: false },
  {
    key: "valoracion_impacto", label: "Valoración Impacto", type: "select", editable: true, options: [
      { label: "Crítico", value: "C" },
      { label: "Alto", value: "A" },
      { label: "Medio", value: "M" },
      { label: "Bajo", value: "B" },
    ]
  },
  { key: "valor_impacto", label: "Valor Impacto", type: "text", editable: false },
  { key: "riesgo_intrinseco", label: "Riesgo Intrínseco", type: "text", editable: false }
];

type propsTable = {
  riesgosIntrinsecos: riesgo_intriseco[]
  setTotalRiesgoIntrinseco: React.Dispatch<React.SetStateAction<number>>;
  valorActivo?: number;
}

const TablaRiesgoIntriseco: React.FC<propsTable> = ({ riesgosIntrinsecos, setTotalRiesgoIntrinseco, valorActivo }) => {
  const [data, setData] = useState<riesgo_intriseco[]>([]);

  /*  */

  useEffect(() => {
    const data_configurada_decimal = riesgosIntrinsecos && riesgosIntrinsecos.map((riesgo) => ({
      ...riesgo,
      riesgo_intrinseco: Number(riesgo.riesgo_intrinseco.toFixed(3)),
      valor_vulnearabilidad: Number(riesgo.valor_vulnearabilidad.toFixed(3))
    })) || [];
    setData(data_configurada_decimal);
  }, [riesgosIntrinsecos]);

  /*  */
  const handleChange = async (newData: any) => {
    // Actualizar el registro en la base de datos
    newData = await RiesgoIntrinsecoUpdateTable( Number(valorActivo || 0), newData);
    newData.riesgo_intrinseco = Number(newData.riesgo_intrinseco.toFixed(3));
    newData.valor_vulnearabilidad = Number(newData.valor_vulnearabilidad.toFixed(3));

    // Calcular el total de riesgo intrinseco
    const nuevo_total_db = await CalcularTotalRiesgoIntrinseco(
      newData.id_activo,
      newData.tipo_activo,
      data
    );

    /* Actualizar estados locales */
    setData((prevData) =>
      prevData.map((item) =>
        item.id === newData.id ? { ...newData } : item
      )
    );

    setTotalRiesgoIntrinseco(
      Number(nuevo_total_db.dataValues.total_riesgo_intrinseco_activo || 0) 
    );
    
  };



  return (
    <ModernTable title="Riesgo Intrínseco" onChange={handleChange} columns={columns} data={data} />
  );
};

export default TablaRiesgoIntriseco;
