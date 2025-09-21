// CardGrid.tsx - Grid de cartas con modo claro/oscuro y acciones

import React from "react";
import { FiTrash2, FiEdit2, FiPlus } from "react-icons/fi";

type CardGridProps = {
  items: { id?: number; nombre: string }[];
  title?: string;
  onCreate?: () => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onClick?: (item: { id?: number }) => void;
};

const CardGrid: React.FC<CardGridProps> = ({
  items,
  title,
  onCreate,
  onEdit,
  onDelete,
  onClick,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-black dark:text-white">{title || "Listado"}</h2>
        {onCreate && (
          <button
            className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-2"
            onClick={onCreate}
          >
            <FiPlus className="text-xl" />
            Crear nuevo
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => { onClick?.(item) }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center justify-between transition-all transform hover:scale-105 duration-500 ease-out"
          >
            <span className="text-xl font-semibold text-center text-black dark:text-lime-400 mb-4">
              {"id: " + (item.id || 0)}
              <hr className="w-full border-t border-gray-300 dark:border-gray-700 mb-4" />
              <span className="text-xl font-semibold text-center text-black dark:text-lime-400 mb-4">
                {item.nombre}
              </span>
            </span>
            <div className="flex gap-2">
              {onEdit && (
                <button
                  className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-3 py-1 rounded-lg transition-all flex items-center justify-center"
                  title="Editar"
                  onClick={() => onEdit?.(item.id || 0)}
                >
                  <FiEdit2 className="text-lg" />
                </button>
              )}
              {onDelete && (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-lg transition-all flex items-center justify-center"
                  title="Eliminar"
                  onClick={() => onDelete?.(item.id || 0)}
                >
                  <FiTrash2 className="text-lg" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
