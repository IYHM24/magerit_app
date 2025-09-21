import CardModule from '@/components/CardModule'
import React from 'react'
import type { ActivoType } from '@/pages/activos/index'

type Props = {
    activoInfo: ActivoType[];
}

const ActivosInfo: React.FC<Props> = ({ activoInfo }) => {
    return (
        <CardModule>
            <h1>Información del Activo</h1>
            <div className='grid grid-cols-3 gap-4'>
                {activoInfo.map((info) =>
                    Object.entries(info).map(([key, value]) =>
                        !key.toLowerCase().includes("id") ? (
                            <div key={key} className='border p-4 rounded-lg shadow-md'>
                                <p>
                                    <strong>
                                        {key
                                            .replace(/_/g, ' ')
                                            .replace(/\b\w/g, c => c.toUpperCase())
                                        }:
                                    </strong> {String(value)}
                                </p>
                            </div>
                        ) : null
                    )
                )}
            </div>
        </CardModule>
    )
}

export default ActivosInfo
