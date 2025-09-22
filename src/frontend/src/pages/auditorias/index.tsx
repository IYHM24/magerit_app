// src/pages/auditorias/index.tsx
import NavigationArrows from "@/components/NavigationArrows";
import React, { useEffect, useState } from "react";
import { FaCalculator, FaChartBar, FaRegSmileBeam } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import RiesgoIntrinseco from "./riesgo_intriseco";
import RiesgoResidual from "./riesgo_residual";
import Resultados from "./resultados";

const cardBase =
  "bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col justify-center items-center text-center text-black dark:text-white font-semibold text-2xl min-h-[180px] transition-all duration-500 cursor-pointer";
const cardHover =
  "hover:shadow-2xl hover:bg-lime-100 dark:hover:bg-lime-900 hover:text-lime-700 dark:hover:text-lime-300 hover:scale-105 hover:brightness-110";


const AuditsPage: React.FC = () => {

  const [selectedCard, setSelectedCard] = useState<number>(0);
  const [pageSelected, setPageSelected] = useState<React.FC>(() => <></>);

  /*  */
  useEffect(() => {
    switch (selectedCard) {
      case 1:
        setPageSelected(() => <RiesgoIntrinseco />);
        break;
      case 2:
        setPageSelected(() => <RiesgoResidual />);
        break;
      case 3:
        setPageSelected(() => <Resultados />);
        break;
      default:
        setPageSelected(() => <></>);
    }
  }, [selectedCard]);

  /*  */
  const changePage = (page: number) => {
    setSelectedCard(page);
  }


  return (
    <>
      {selectedCard === 0 ? (
        <>
          <div className="h-[60vh] flex justify-center items-center p-6">
            <div className="w-full flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className={`${cardBase} ${cardHover}`} onClick={() => changePage(1)}>
                  <FaCalculator className="text-5xl mb-4 text-lime-500 transition-all duration-500 group-hover:animate-pulse" />
                  Riesgo intrínseco
                </div>
                <div className={`${cardBase} ${cardHover}`} onClick={() => changePage(2)}>
                  <FaChartBar className="text-5xl mb-4 text-lime-500 transition-all duration-500 group-hover:animate-pulse" />
                  Riesgo residual
                </div>
              </div>
             {/*  <div className="grid grid-cols-1">
                <div className={`${cardBase} ${cardHover} w-full`} onClick={() => changePage(3)}>
                  <FaRegSmileBeam className="text-5xl mb-4 text-lime-500 transition-all duration-500 group-hover:animate-pulse" />
                  Resultados
                </div>
              </div> */}
            </div>
          </div>
          <NavigationArrows prevPath="/amenazas" prevText="Volver a Amenazas" nextPath="" />
        </>
      ) :
        (
          <>
            <div className="flex gap-2 my-4">
              <div className="flex items-center gap-2">
                <button
                  title="Volver al menú de auditorías"
                  className="bg-lime-500 hover:bg-lime-600 dark:text-black text-white rounded-full p-2 flex items-center gap-2"
                  onClick={() => setSelectedCard(0)}
                >
                  <FiArrowLeft size={24} />
                </button>
              </div>
            </div>
            {pageSelected}
          </>
        )}
    </>
  )
};

export default AuditsPage;
