import { actualizarRiesgoIntriseco, crearAmenazaTipoActivo, crearRiesgoIntriseco, eliminarAmenazaTipoActivo, upsertTotalRiesgoIntrisecoActivo } from "@/controller/Auditorias/RiesgoIntrisecoController.service";
import type { AmenazaType } from "@/pages/amenazas/AmenazasTable"
import type { ActivoType } from "@/pages/activos";
import { calcular_valor_control, calcularRiesgoIntrinseco, getValoracionImpacto, getValoracionVulnerabilidad } from "./tools";
import { actualizarRiesgoResidual, crearRiesgoResidual, upsertTotalRiesgoResidualActivo } from "@/controller/Auditorias/RiesgoResidualController.service";

export type riesgo_intriseco = {
    id?: number,
    id_activo: number,
    tipo_activo: string,
    id_amenaza: number,
    amenaza?: string,
    valoracion_vulnerabilidad: string,
    valor_vulnearabilidad: number,
    valoracion_impacto: string,
    valor_impacto: number,
    riesgo_intrinseco: number,
}

export type riesgo_residual = {
    id?: number,
    id_activo: number,
    id_amenaza: number,
    id_riesgo_intrinseco: number,
    efectividad_control: number,
    amenaza: string,
    tipo_activo: string,
    valor_riesgo_residual: number,
    valor_riesgo_intriseco: number,
}

export type total_riesgo_intriseco_activo = {
    id?: number,
    id_activo: number,
    tipo_activo: string,
    total_riesgo_intrinseco_activo?: number,
}

export type total_riesgo_residual_activo = {
    id?: number,
    id_activo: number,
    tipo_activo: string,
    total_riesgo_residual_activo?: number,
}



export const mapRiesgoIntrinseco = async (params: AmenazaType, key: string) => {
    const { id } = params;
    const valor_nuevo = params[key];

    const dataToSend = {
        id_amenaza: Number(id) || 0,
        tipo_activo: String(key) || ""
    }
    //Validar si la amenaza se activo o se desactivo
    if (valor_nuevo) {
        //Crear amenaza tipo activo
        await crearAmenazaTipoActivo(dataToSend)
    } else {
        //Eliminar amenaza tipo activo
        await eliminarAmenazaTipoActivo(dataToSend.id_amenaza, dataToSend.tipo_activo);
    }
}

export const RiesgoIntrinsecoBuildTable = async (activo_info: ActivoType, amenazas: AmenazaType[]) => {

    let total_riesgo_intrinseco = 0;
    const valor_vulnerabilidad = getValoracionVulnerabilidad("FMB")
    const valor_impacto = getValoracionImpacto("B")
    const valor_riesgo_intrinseco = calcularRiesgoIntrinseco(
        Number(valor_vulnerabilidad),
        Number(valor_impacto),
        Number(activo_info.valor)
    )

    await Promise.all(
        amenazas.map(async (amenaza) => {
            const riesgo_intrinseco: riesgo_intriseco = {
                id_activo: Number(activo_info.id) || 0,
                tipo_activo: String(activo_info.tipo_activo.toLowerCase()) || "",
                id_amenaza: Number(amenaza.id) || 0,
                amenaza: String(amenaza.amenaza) || "",
                valoracion_vulnerabilidad: "FMB",
                valor_vulnearabilidad: Number(valor_vulnerabilidad) || 0,
                valoracion_impacto: "B",
                valor_impacto: Number(valor_impacto) || 0,
                riesgo_intrinseco: Number(valor_riesgo_intrinseco) || 0,
            };
            await crearRiesgoIntriseco(riesgo_intrinseco);
            total_riesgo_intrinseco += riesgo_intrinseco.riesgo_intrinseco;
        })
    );
}

export const RiesgoIntrinsecoUpdateTable = async (valor_activo: number, riesgo_intrinseco: riesgo_intriseco) => {
    /* Calculos */
    const valor_vulnerabilidad = getValoracionVulnerabilidad(riesgo_intrinseco.valoracion_vulnerabilidad)
    const valor_impacto = getValoracionImpacto(riesgo_intrinseco.valoracion_impacto)
    const valor_riesgo_intrinseco = calcularRiesgoIntrinseco(
        Number(valor_vulnerabilidad),
        Number(valor_impacto),
        Number(valor_activo)
    )

    /* Actualizar tabla */
    const riesgo_intrinseco_actualizado = {
        id: Number(riesgo_intrinseco.id) || 0,
        id_activo: Number(riesgo_intrinseco.id_activo) || 0,
        tipo_activo: String(riesgo_intrinseco.tipo_activo.toLowerCase()) || "",
        id_amenaza: Number(riesgo_intrinseco.id_amenaza) || 0,
        amenaza: String(riesgo_intrinseco.amenaza) || "",
        valoracion_vulnerabilidad: String(riesgo_intrinseco.valoracion_vulnerabilidad) || "FMB",
        valor_vulnearabilidad: Number(valor_vulnerabilidad) || 0,
        valoracion_impacto: String(riesgo_intrinseco.valoracion_impacto) || "B",
        valor_impacto: Number(valor_impacto) || 0,
        riesgo_intrinseco: Number(valor_riesgo_intrinseco) || 0,
    };

    /* Actualizar en la base de datos */
    await actualizarRiesgoIntriseco(riesgo_intrinseco_actualizado.id, riesgo_intrinseco_actualizado);

    return riesgo_intrinseco_actualizado;

}


export const CalcularTotalRiesgoIntrinseco = async (
    id_activo: number,
    tipo_activo: string,
    riesgos: riesgo_intriseco[]
) => {
    /* calcular */
    const total_riesgo = riesgos.reduce((total, riesgo) => total + riesgo.riesgo_intrinseco, 0);
    /* Crear cuerpo total */
    const cuerpo_total_riesgo_intrinseco: total_riesgo_intriseco_activo = {
        id_activo: id_activo,
        tipo_activo: tipo_activo,
        total_riesgo_intrinseco_activo: total_riesgo,
    }
    /* Insertar registros */
    return await upsertTotalRiesgoIntrisecoActivo(id_activo, tipo_activo, cuerpo_total_riesgo_intrinseco);
}

export const RiesgoResidualBuildTable = async (activo_info: ActivoType, riesgos: riesgo_intriseco[]) => {
    //
    let total_riesgo_residual = 0;
    //
    await Promise.all(
        riesgos.map(async (riesgo) => {
            const valor_control = calcular_valor_control(0, riesgo.riesgo_intrinseco);
            const riesgo_residual: riesgo_residual = {
                id_activo: Number(activo_info.id) || 0,
                tipo_activo: String(activo_info.tipo_activo.toLowerCase()) || "",
                id_amenaza: Number(riesgo.id_amenaza) || 0,
                id_riesgo_intrinseco: Number(riesgo.id) || 0,
                amenaza: String(riesgo.amenaza) || "",
                valor_riesgo_residual: Number(valor_control) || 0,
                valor_riesgo_intriseco: Number(riesgo.riesgo_intrinseco) || 0,
                efectividad_control: 0,
            };
            await crearRiesgoResidual(riesgo_residual);
            total_riesgo_residual += riesgo_residual.valor_riesgo_residual;
        })
    );
}

export const RiesgoResidualUpdateTable = async (riesgo_residual: riesgo_residual) => {
    /* Calculos */
    let total_riesgo_residual = calcular_valor_control(riesgo_residual.efectividad_control, riesgo_residual.valor_riesgo_intriseco);

    /* Actualizar tabla */
    const riesgo_residual_actualizar: riesgo_residual = {
        id: Number(riesgo_residual.id) || 0,
        id_activo: Number(riesgo_residual.id_activo) || 0,
        tipo_activo: String(riesgo_residual.tipo_activo.toLowerCase()) || "",
        id_amenaza: Number(riesgo_residual.id_amenaza) || 0,
        id_riesgo_intrinseco: Number(riesgo_residual.id_riesgo_intrinseco) || 0,
        amenaza: String(riesgo_residual.amenaza) || "",
        valor_riesgo_residual: Number(total_riesgo_residual) || 0,
        valor_riesgo_intriseco: Number(riesgo_residual.valor_riesgo_intriseco) || 0,
        efectividad_control: Number(riesgo_residual.efectividad_control) || 0,
    };

    /* Actualizar en la base de datos */
    await actualizarRiesgoResidual(Number(riesgo_residual_actualizar.id), riesgo_residual_actualizar);

    return riesgo_residual_actualizar;

}


export const CalcularTotalRiesgoResidual = async (
    id_activo: number,
    tipo_activo: string,
    riesgos: riesgo_residual[]
) => {
    /* calcular */
    const total_riesgo = riesgos.reduce((total, riesgo) => total + riesgo.valor_riesgo_residual, 0);
    /* Crear cuerpo total */
    const cuerpo_total_riesgo_residual: total_riesgo_residual_activo = {
        id_activo: id_activo,
        tipo_activo: tipo_activo,
        total_riesgo_residual_activo: total_riesgo,
    }
    /* Insertar registros */
    return await upsertTotalRiesgoResidualActivo(id_activo, tipo_activo, cuerpo_total_riesgo_residual);
}


