// SidebarTimeline.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

type SubPage = {
  label: string;
  href: string;
  disabled?: boolean;
};

interface SidebarTimelineProps {
  subPages: SubPage[];
}

const SidebarTimeline: React.FC<SidebarTimelineProps> = ({ subPages }) => {
  const location = useLocation();

  if (!subPages || subPages.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto my-8">
      <div className=" rounded-xl p-6">
        <h3 className="text-lg font-bold mb-8 tracking-wide uppercase text-black text-center dark:text-white">Secciones</h3>
        <ul className="list-none p-0 w-full flex flex-col">
          {subPages.map((sub) => (
            <li
              key={sub.href}
              className={`mb-6 w-full flex justify-center group`}
            >
              <Link
                to={sub.href}
                className={`text-base font-semibold px-6 py-2 rounded-lg text-center w-full transition-all
                  ${location.pathname === sub.href
                    ? "text-lime-500 bg-lime-100 dark:text-lime-400 dark:bg-gray-800"
                    : "text-black dark:text-white"}
                  ${sub.disabled ? "pointer-events-none opacity-50" : ""} group-hover:bg-lime-100 group-hover:text-lime-500 dark:group-hover:bg-gray-800 dark:group-hover:text-lime-400`}
              >
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarTimeline;
