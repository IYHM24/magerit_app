// src/pages/home/index.tsx
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-between items-center overflow-hidden relative"
      style={{
        backgroundImage: "url('/pattern-bg.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      <main className="flex flex-col items-center justify-center flex-1 w-full">
        <div className="bg-white/30 dark:bg-black/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-black/20 p-8 max-w-xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 drop-shadow-lg text-center font-sans">
            Bienvenido a Magerit Platform
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 text-center font-sans">
            Esta herramienta te permite aplicar la metodología <b>Magerit</b> para el análisis y gestión de riesgos en sistemas de información.
            Explora funcionalidades, gestiona activos y protege tu organización de manera profesional y eficiente.
          </p>
          <Button color="neutral-950" className="mt-4 px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transition-all">
            <Link to="/activos">Comenzar</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Home;
