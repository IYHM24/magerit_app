import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="w-full h-full backdrop-blur-lg border-t border-white/20 dark:border-black/20 py-6 my-10 flex flex-col items-center text-center shadow-inner">
            <div className="text-base font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Ancom - Magerit Platform &copy; {new Date().getFullYear()}
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Herramienta profesional para la gestión de riesgos basada en la metodología Magerit.
            </div>
        </footer>
    )
}

export default Footer;
