import type { riesgo_intriseco } from '@/utils/riesgo_intriseco.builder';
import type { ActivoType } from '../../activos'
import ActivosInfo from '../ActivosInfo';
import TablaRiesgoIntriseco from './TablaRiesgoIntriseco';

type Props = {
    activoInfo: ActivoType[];
    riesgosIntrinsecos: riesgo_intriseco[];
    totalRiesgoIntrinseco: number;
    setTotalRiesgoIntrinseco: React.Dispatch<React.SetStateAction<number>>;
}

export const ModuloRiesgoIntriseco: React.FC<Props> = ({ activoInfo, riesgosIntrinsecos, totalRiesgoIntrinseco, setTotalRiesgoIntrinseco }) => {


    //

    return (
        <div className='flex flex-col gap-4'>
            {/* Informacion del activo */}
            <ActivosInfo activoInfo={activoInfo} />

            {/* Tabla de riesgos intrinsecos */}
            <TablaRiesgoIntriseco 
                riesgosIntrinsecos={riesgosIntrinsecos}
                setTotalRiesgoIntrinseco={setTotalRiesgoIntrinseco}
                valorActivo={activoInfo[0]?.valor || 0}
            />

            {/* Total */}
            <div className='p-6'>
                <h2 className='font-extrabold'>Total riesgo:</h2>
                <span>{totalRiesgoIntrinseco.toFixed(2)}</span>
            </div>
        </div>
    )
}
