import { actualizarRiesgoIntriseco, crearAmenazaTipoActivo, crearRiesgoIntriseco, eliminarAmenazaTipoActivo, upsertTotalRiesgoIntrisecoActivo } from "@/controller/Auditorias/RiesgoIntrisecoController.service";
import type { AmenazaType } from "@/pages/amenazas/AmenazasTable"
import type { ActivoType } from "@/pages/activos";
import { calcularRiesgoIntrinseco, getValoracionImpacto, getValoracionVulnerabilidad } from "./tools";

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

export type total_riesgo_intriseco_activo = {
    id?: number,
    id_activo: number,
    tipo_activo: string,
    total_riesgo_intrinseco_activo?: number,
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

export const RiesgoIntrinsecoUpdateTable = async (valor_activo:number, riesgo_intrinseco: riesgo_intriseco) => {
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


