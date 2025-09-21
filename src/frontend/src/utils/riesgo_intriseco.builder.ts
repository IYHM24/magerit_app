import { crearAmenazaTipoActivo, eliminarAmenazaTipoActivo } from "@/controller/Auditorias/RiesgoIntrisecoController.service";
import type  { AmenazaType } from "@/pages/amenazas/AmenazasTable"

export const mapRiesgoIntrinseco = async (params: AmenazaType, key:string) => {
  
    const {id} = params;
    const valor_nuevo = params[key];

    const dataToSend = {
        id_amenaza: Number(id) || 0,
        tipo_activo: String(key) || ""
    }

    //Validar si la amenaza se activo o se desactivo
    valor_nuevo? await crearAmenazaTipoActivo(dataToSend) :
     await eliminarAmenazaTipoActivo(dataToSend.id_amenaza, dataToSend.tipo_activo);

}
