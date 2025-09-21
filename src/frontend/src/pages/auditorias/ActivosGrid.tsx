import CardGrid from '@/components/CardGrid'
import NavigationArrows from '@/components/NavigationArrows'
import { obtenerActivos } from '@/controller/Activos/ActivosController.service'
import React, { useEffect, useState } from 'react'

type props = {
    title: string,
    onClick?: (id: any) => void
}

export type activo = {
    id: number,
    nombre: string
   
}

const ActivosGrid: React.FC<props> = ({ title, onClick }) => {

  const [activos, setActivos] = useState<activo[]>([]);

    useEffect(() => {
        //obtener activos desde la base de datos
        fetch_activos();
    }, [])

    const fetch_activos = async () => {
      const activos_db = await obtenerActivos();
      const activos = activos_db.map((activo: any) => ({
        id: activo.dataValues.id,
        nombre: activo.dataValues.activo,
      }));
      setActivos(activos);
    }

    return (
        <div className='flex flex-col gap-4'>
            <CardGrid
                title={title || "Activos"}
                items={activos}
                onClick={onClick}
            />
            <NavigationArrows prevPath='/activos' prevText='Gestionar activos'/>
        </div>
    )
}

export default ActivosGrid
