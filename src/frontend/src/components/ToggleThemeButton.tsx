// src/components/ToggleThemeButton.tsx
import React, { useEffect, useState } from "react";

export const ToggleThemeButton: React.FC = () => {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleToggle = () => setIsDark((prev) => !prev);

  return (
    <button
      onClick={handleToggle}
      className="px-3 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 shadow transition-all duration-300 hover:bg-green-500 hover:text-white dark:hover:bg-green-500 dark:hover:text-white"
      aria-label="Cambiar tema"
    >
      {isDark ? "🌙 Modo oscuro" : "☀️ Modo claro"}
    </button>
  );
}
