import type { riesgo_residual } from '@/utils/riesgo_intriseco.builder';
import type { ActivoType } from '../../activos'
import ActivosInfo from '../ActivosInfo';
import TablaRiesgoResidual from './TablaRiesgoResidual';

type Props = {
    activoInfo: ActivoType[];
    riesgosResiduales: riesgo_residual[];
    totalRiesgoResidual: number;
    totalRiesgoIntrinseco: number;
    setTotalRiesgoResidual: React.Dispatch<React.SetStateAction<number>>;
}

export const ModuloRiesgoResidual: React.FC<Props> = ({ activoInfo, riesgosResiduales, totalRiesgoResidual, setTotalRiesgoResidual, totalRiesgoIntrinseco  }) => {


    //

    return (
        <div className='flex flex-col gap-4'>
            {/* Informacion del activo */}
            <ActivosInfo activoInfo={activoInfo} />

            {/* Tabla de riesgos residuales */}
            <TablaRiesgoResidual 
                riesgosResiduales={riesgosResiduales}
                setTotalRiesgoResidual={setTotalRiesgoResidual}
                valorActivo={activoInfo[0]?.valor || 0}
            />

            {/* Total */}
            <div className='p-6 flex justify-around gap-4'>
                <div>
                    <h2 className='font-extrabold'>Total riesgo:</h2>
                    <span>{totalRiesgoResidual.toFixed(2)}</span>
                </div>
                <div>
                    <h2 className='font-extrabold'>Total riesgo intrínseco:</h2>
                    <span>{totalRiesgoIntrinseco.toFixed(2)}</span>
                </div>
                <div>
                    <h2 className='font-extrabold'>Diferencia:</h2>
                    <span>{(totalRiesgoIntrinseco - totalRiesgoResidual).toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}
