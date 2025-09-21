import React from "react";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

interface NavigationArrowsProps {
    nextPath?: string;
    prevPath?: string;
    nextText?: string;
    prevText?: string;
}

const NavigationArrows: React.FC<NavigationArrowsProps> = ({ nextPath, prevPath, nextText, prevText }) => {


    return (
        <div className="flex gap-4 justify-center items-center mt-4">
            {prevPath && (
                <Link to={prevPath} className="group flex items-center gap-2">
                    <button
                        className="bg-gray-200 group-hover:bg-gray-300 text-black rounded-full p-2 flex items-center gap-2"
                        title="Anterior"
                    >
                        <FiArrowLeft size={24} />
                    </button>
                    <span className="group-hover:text-lime-600">{prevText}</span>
                </Link>
            )}
            {nextPath && (
                <Link to={nextPath} className="group flex items-center gap-2">
                    <span className="group-hover:text-lime-600">{nextText}</span>
                    <button
                        className="bg-lime-500 group-hover:bg-lime-600 text-white dark:text-black rounded-full p-2 flex items-center gap-2"
                        title="Siguiente"
                    >
                        <FiArrowRight size={24} />
                    </button>
                </Link>
            )}
        </div>

    )
};

export default NavigationArrows;
