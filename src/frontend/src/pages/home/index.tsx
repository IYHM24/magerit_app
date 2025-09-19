// src/pages/home/index.tsx
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <main className="flex flex-col items-center justify-center gap-8 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-black dark:text-white drop-shadow-lg">
          Bienvenido a Magerit
        </h1>
        <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-200 max-w-xl">
          Plataforma para la gestión de riesgos, activos, amenazas y auditorías. Optimiza la seguridad de tu organización con herramientas modernas y visuales.
        </p>
        <a
          href="/activos"
          className="mt-4 px-8 py-4 rounded-full bg-green-500 text-white font-bold text-lg shadow-lg hover:bg-green-600 transition-all duration-300 animate-bounce"
        >
          Comenzar
        </a>
      </main>
    </div>
  );
};

export default Home;
