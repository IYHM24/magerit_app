// src/components/ui/ToggleThemeButton.tsx
"use client"
import React, { useEffect, useState } from "react";

export function ToggleThemeButton() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/40 dark:bg-black/40 text-zinc-800 dark:text-zinc-200 font-semibold shadow-md border border-white/30 dark:border-black/30 hover:bg-white/60 dark:hover:bg-black/60 transition-all backdrop-blur-md"
      aria-label="Alternar modo oscuro/claro"
    >
      {dark ? (
        // Icono luna
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path
            d="M21 12.79A9 9 0 0112.21 3a7 7 0 100 14A9 9 0 0121 12.79z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // Icono sol
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span>{dark ? "Oscuro" : "Claro"}</span>
    </button>
  );
}
