import React, { useEffect, useState } from "react";
import ModernTable from "../../../components/ModernTable";
import type { TableColumn } from "../../../components/ModernTable";
import { CalcularTotalRiesgoResidual, RiesgoResidualUpdateTable, type riesgo_residual } from "@/utils/riesgo_intriseco.builder";


const columns: TableColumn[] = [
  { key: "id", label: "ID", type: "text", editable: false },
  { key: "amenaza", label: "Amenaza", type: "text", editable: false },
  { key: "efectividad_control", label: "Efectividad Control", type: "number", editable: true },
  { key: "valor_riesgo_residual", label: "Valor Riesgo Residual", type: "number", editable: false }
];

type propsTable = {
  riesgosResiduales: riesgo_residual[]
  setTotalRiesgoResidual: React.Dispatch<React.SetStateAction<number>>;
  valorActivo?: number;
}

const TablaRiesgoResidual: React.FC<propsTable> = ({ riesgosResiduales, setTotalRiesgoResidual }) => {
  const [data, setData] = useState<riesgo_residual[]>([]);

  /*  */

  useEffect(() => {
    const data_configurada_decimal = riesgosResiduales && riesgosResiduales.map((riesgo) => ({
      ...riesgo,
      riesgo_residual: Number(riesgo.valor_riesgo_residual.toFixed(3)),
    })) || [];
    setData(data_configurada_decimal);
  }, [riesgosResiduales]);

  /*  */
  const handleChange = async (newData: any) => {

    debugger;

    // Actualizar el registro en la base de datos
    newData = await RiesgoResidualUpdateTable(newData);
    newData.valor_riesgo_residual = Number(newData.valor_riesgo_residual.toFixed(3));

    const newArrayData = data.map((item) =>
      item.id === newData.id ? { ...newData } : item
    );

    // Calcular el total de riesgo residual
    const nuevo_total_db = await CalcularTotalRiesgoResidual(
      newData.id_activo,
      newData.tipo_activo,
      newArrayData
    );

    /* Actualizar estados locales */
    setData(newArrayData);

    setTotalRiesgoResidual(
      Number(nuevo_total_db.dataValues.total_riesgo_residual_activo || 0)
    );

  };



  return (
    <ModernTable title="Riesgo Residual" onChange={handleChange} columns={columns} data={data} />
  );
};

export default TablaRiesgoResidual;
