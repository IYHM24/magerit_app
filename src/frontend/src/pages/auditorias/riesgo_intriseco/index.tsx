import React from 'react'
import ActivosGrid from '../ActivosGrid'
import type { activo } from '../ActivosGrid'

const RiesgoIntrinseco: React.FC = () => {

  const [selectedActivo, setSelectedActivo] = React.useState<activo>({id: 0, nombre: ''})

  /*  */
  const onClick = (params: activo) => {
    console.log("Activo seleccionado: ", params)
    setSelectedActivo(params)
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
          <h2 className="text-lg font-bold">Riesgo Intrínseco</h2>
        </>
      )}
    </>
  )
}

export default RiesgoIntrinseco
