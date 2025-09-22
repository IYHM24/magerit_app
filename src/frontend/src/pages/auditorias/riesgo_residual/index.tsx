import React, { useEffect } from 'react'
import ActivosGrid from '../ActivosGrid'
import type { activo } from '../ActivosGrid'
import type { ActivoType } from '@/pages/activos'
import { obtenerActivo } from '@/controller/Activos/ActivosController.service'
import { obtenerRiesgosIntrisecoPorActivoTipo } from '@/controller/Auditorias/RiesgoIntrisecoController.service'
import type { riesgo_intriseco, riesgo_residual } from '@/utils/riesgo_intriseco.builder'
import { CalcularTotalRiesgoIntrinseco, CalcularTotalRiesgoResidual, RiesgoResidualBuildTable } from '@/utils/riesgo_intriseco.builder'
import { ModuloRiesgoResidual } from './ModuloRiesgoResidual'
import { obtenerRiesgosResidualPorActivoTipo } from '@/controller/Auditorias/RiesgoResidualController.service'

const RiesgoResidual: React.FC = () => {

    const [selectedActivo, setSelectedActivo] = React.useState<activo>({ id: 0, nombre: '' })
    const [activoInfo, setActivoInfo] = React.useState<ActivoType[]>([]);;
    const [riesgosResiduales, setRiesgosResiduales] = React.useState<riesgo_residual[]>([]);
    const [totalRiesgoResidual, setTotalRiesgoResidual] = React.useState<number>(0);
    const [totalRiesgoIntrinseco, setTotalRiesgoIntrinseco] = React.useState<number>(0);

    /*  */
    useEffect(() => {
      if(selectedActivo.id !== 0){
        configurar_info();
      }
    }, [selectedActivo])
  
    /*  */
    const onClick = (params: activo) => {
      console.log("Activo seleccionado: ", params)
      setSelectedActivo(params)
    }
  
    /*  */
    const configurar_info = async () => {

      const { id } = selectedActivo;
  
      //obtener informacion del activo por Id y construir la informacion
      const activo_info_db = await obtenerActivo(id);
      const activo_info: ActivoType = {
        id: activo_info_db.dataValues.id,
        activo: activo_info_db.dataValues.activo,
        tipo_activo: activo_info_db.dataValues.tipo_activo,
        valor: activo_info_db.dataValues.valor,
        valoracion: activo_info_db.dataValues.valoracion,
        autenticidad: activo_info_db.dataValues.autenticidad,
        confidencialidad: activo_info_db.dataValues.confidencialidad,
        integridad: activo_info_db.dataValues.integridad,
        disponibilidad: activo_info_db.dataValues.disponibilidad,
        trazabilidad: activo_info_db.dataValues.trazabilidad,
        id_propietario: activo_info_db.dataValues.id_propietario,
        propietario: activo_info_db.dataValues.propietario,
      };
      const { tipo_activo } = activo_info;
  
      if (tipo_activo !== "N/A") {
  
        //Obtener las amenazas asociadas al tipo de activo
        const riesgos_intrinsecos_db = await obtenerRiesgosIntrisecoPorActivoTipo(Number(activo_info.id), tipo_activo.toLowerCase());
        const riesgos_intrinsecos_list: riesgo_intriseco[] = riesgos_intrinsecos_db.map((riesgo: any) => riesgo.dataValues);

        //Validar que existan riesgos intrinsecos si no hay regresar
        if (riesgos_intrinsecos_db.length === 0) {
          alert("Debe crear primero los riesgos intrinsecos");
          window.location.reload();
        }

        //Obtener los riesgos residuales asociados al activo y tipo de activo
        const riesgos_residuales_db = await obtenerRiesgosResidualPorActivoTipo(id, tipo_activo.toLowerCase());

        const riesgos_intrinsecos = riesgos_intrinsecos_db.map((riesgo: any) => riesgo.dataValues);
        
        //Crear la tabla de riesgos residuales
        if (riesgos_residuales_db.length === 0) {
          
          //Construir la tabla de riesgos residuales
          await RiesgoResidualBuildTable(activo_info, riesgos_intrinsecos);
        }
        else {
          const riesgos_residuales = riesgos_residuales_db.map((riesgo: any) => riesgo.dataValues);
          const validar_nuevos = riesgos_intrinsecos_list.filter((riesgo_i: riesgo_intriseco) => {
            return !riesgos_residuales.some((riesgo_r: any) => riesgo_r.id_riesgo_intrinseco === riesgo_i.id);
          })
          validar_nuevos.length > 0 && await RiesgoResidualBuildTable(activo_info, validar_nuevos);
        }
  
        
        //Obtener los nuevos registros
        const nuevos_registros_db = await obtenerRiesgosResidualPorActivoTipo(id, tipo_activo.toLowerCase());
        const nuevos_registros = nuevos_registros_db.map((riesgo: any) => riesgo.dataValues);

        //insertar o actualizar el total de riesgo intrinseco
        const total_db = await CalcularTotalRiesgoResidual(Number(activo_info.id) || 0, tipo_activo.toLowerCase(), nuevos_registros);
        const total = total_db.dataValues.total_riesgo_residual_activo;
        const total_riesgo_intrinseco_db = await CalcularTotalRiesgoIntrinseco(Number(activo_info.id) || 0, tipo_activo.toLowerCase(), riesgos_intrinsecos_list);
        const total_riesgo_intrinseco = total_riesgo_intrinseco_db.dataValues.total_riesgo_intrinseco_activo;
        
        //Acualizar estados locales
        setActivoInfo([activo_info]);
        setTotalRiesgoResidual(total);
        setTotalRiesgoIntrinseco(total_riesgo_intrinseco);
        setRiesgosResiduales(nuevos_registros);
  
      }
  
    }

  return (
    <>
      {selectedActivo.id === 0 ? (
        <ActivosGrid
          title="Seleccione un activo para evaluar su riesgo intrínseco"
          onClick={onClick}
        />
      ) : (
        <>
          <ModuloRiesgoResidual
            activoInfo={activoInfo}
            riesgosResiduales={riesgosResiduales}
            totalRiesgoResidual={totalRiesgoResidual}
            totalRiesgoIntrinseco={totalRiesgoIntrinseco}
            setTotalRiesgoResidual={setTotalRiesgoResidual}
          />
        </>
      )}
    </>
  )
}

export default RiesgoResidual
