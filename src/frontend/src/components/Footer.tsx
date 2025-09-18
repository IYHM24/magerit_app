import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-white/40 dark:bg-black/40 backdrop-blur-lg border-t border-white/20 dark:border-black/20 py-6 mt-10 flex flex-col items-center text-center shadow-inner">
            <div className="text-base font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Ancom - Magerit Platform &copy; {new Date().getFullYear()}
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Herramienta profesional para la gestión de riesgos basada en la metodología Magerit.
            </div>
            <div className="flex gap-4 mt-2">
                {/*  <a href="https://github.com/IYHM24/magerit_app" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">
          GitHub
        </a> */}
            </div>
        </footer>
    )
}

export default Footer;
