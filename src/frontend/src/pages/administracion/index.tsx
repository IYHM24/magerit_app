// src/pages/administracion/index.tsx
import NavigationArrows from "@/components/NavigationArrows";
import React from "react";

const AdminPage: React.FC = () => {

  const instrucciones:string [] =[
    "Cree los departamentos dueños o gestionadores de los activos.",
    "Agregar un nuevo Activo a el inventario desde el módulo de Activos, agregar los detalles necesarios.",
    "Ir al modulo de amenazas, definir las amenazas que pueden afectar al grupo de los activos.",
    "Existen dos modulos, eliga primero riesgo intriseco",
    "Rellenar la frecuencia y el impacto de cada amenaza para el activo seleccionado.",
    "Luego ir al modulo de riesgo residual",
    "Rellenar la eficacia de los controles para cada amenaza del activo seleccionado.",
    "En la parte inferior de ambos modulos se encuentra el total de riesgo intrínseco y residual.",
    "Adicional en la parte inferior del modulo de riesgo residual, se encuentra la diferencia entre ambos riesgos.",
  ]

  return (
    <>
      <div className="w-full my-10 rounded-xl shadow-lg p-8 bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white text-center">Administración</h1>
        <h2 className="text-lg font-semibold mb-2 text-lime-600 dark:text-lime-400">Instrucciones de uso</h2>
        <ol className="list-decimal pl-6 mb-6 text-gray-700 dark:text-gray-200">
          {instrucciones.map((instruccion, index) => (
            <li key={index}>{instruccion}</li>
          ))}
        </ol>
        <div className="text-base text-gray-800 dark:text-gray-300">
          <p>
            Esta sección te permite gestionar los diferentes aspectos administrativos del programa. 
            En el sub modulo de Departamentos puede crear y gestionar los departamentos de tu organización.
          </p>
        </div>
      </div>

      <div>
        <NavigationArrows 
          nextPath="/administracion/departamentos" 
          nextText="Ir a Departamentos"
        />
      </div>

    </>
  );
};

export default AdminPage;
