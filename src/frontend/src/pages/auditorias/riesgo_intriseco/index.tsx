import React, { useEffect } from 'react'
import ActivosGrid from '../ActivosGrid'
import type { activo } from '../ActivosGrid'
import { ModuloRiesgoIntriseco } from './ModuloRiesgoIntriseco'
import type { ActivoType } from '@/pages/activos'
import { obtenerActivo } from '@/controller/Activos/ActivosController.service'
import { obtenerAmenazasPorTipoActivo, obtenerRiesgosIntrisecoPorActivoTipo } from '@/controller/Auditorias/RiesgoIntrisecoController.service'
import type { AmenazaType } from '@/pages/amenazas/AmenazasTable'
import type { riesgo_intriseco } from '@/utils/riesgo_intriseco.builder'
import { CalcularTotalRiesgoIntrinseco, RiesgoIntrinsecoBuildTable } from '@/utils/riesgo_intriseco.builder'
import { useNavigate } from 'react-router-dom'

const RiesgoIntrinseco: React.FC = () => {

  const [selectedActivo, setSelectedActivo] = React.useState<activo>({ id: 0, nombre: '' })
  const [activoInfo, setActivoInfo] = React.useState<ActivoType[]>([]);
  const [riesgosIntrinsecos, setRiesgosIntrinsecos] = React.useState<riesgo_intriseco[]>([]);
  const [totalRiesgoIntrinseco, setTotalRiesgoIntrinseco] = React.useState<number>(0);
  const navigate = useNavigate();

  /*  */
  useEffect(() => {
    if (selectedActivo.id !== 0) {
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
    
    debugger
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
      const amenazas_db = await obtenerAmenazasPorTipoActivo(tipo_activo.toLowerCase());
      const amenazas_list: AmenazaType[] = amenazas_db.map((amenaza: any) => amenaza.dataValues);

      //Validar que existan riesgos intrinsecos si no hay regresar
      if (amenazas_list.length === 0) {
        alert("Debe crear primero las amenazas");
        navigate('/amenazas');
        return;
      }

      //Obtener los riesgos intrinsecos asociados al activo y tipo de activo
      const riesgos_intrinsecos_db = await obtenerRiesgosIntrisecoPorActivoTipo(id, tipo_activo.toLowerCase());

      //Crear la tabla de riesgos intrinsecos
      if (riesgos_intrinsecos_db.length === 0) {
        //Construir la tabla de riesgos intrinsecos
        await RiesgoIntrinsecoBuildTable(activo_info, amenazas_list);
      }
      else {
        const riesgos_intrinsecos = riesgos_intrinsecos_db.map((riesgo: any) => riesgo.dataValues);
        const validar_nuevos = amenazas_list.filter((amenaza: AmenazaType) => {
          return !riesgos_intrinsecos.some((riesgo: any) => riesgo.id_amenaza === amenaza.id);
        })
        validar_nuevos.length > 0 && await RiesgoIntrinsecoBuildTable(activo_info, validar_nuevos);
      }

      //Obtener los nuevos registros
      const nuevos_registros_db = await obtenerRiesgosIntrisecoPorActivoTipo(id, tipo_activo.toLowerCase());
      const nuevos_registros = nuevos_registros_db.map((riesgo: any) => riesgo.dataValues);

      //insertar o actualizar el total de riesgo intrinseco
      const total_db = await CalcularTotalRiesgoIntrinseco(Number(activo_info.id) || 0, tipo_activo.toLowerCase(), nuevos_registros);
      const total = total_db.dataValues.total_riesgo_intrinseco_activo;

      //Acualizar estados locales
      setActivoInfo([activo_info]);
      setTotalRiesgoIntrinseco(total);
      setRiesgosIntrinsecos(nuevos_registros);

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
          <ModuloRiesgoIntriseco
            activoInfo={activoInfo}
            riesgosIntrinsecos={riesgosIntrinsecos}
            totalRiesgoIntrinseco={totalRiesgoIntrinseco}
            setTotalRiesgoIntrinseco={setTotalRiesgoIntrinseco}
          />
        </>
      )}
    </>
  )
}

export default RiesgoIntrinseco
