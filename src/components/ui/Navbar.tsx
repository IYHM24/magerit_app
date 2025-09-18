// src/components/ui/Navbar.tsx
import React from "react";
import { ToggleThemeButton } from "./ToggleThemeButton";
import { navbarLinks } from "@/utils/navbar-routes";

export function Navbar() {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white/30 dark:bg-black/30 backdrop-blur-lg shadow-lg border-b border-white/20 dark:border-black/20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="text-3xl font-extrabold text-dark dark:text-zinc-200 drop-shadow-lg">Magerit</div>
        <ul className="flex gap-6">
          {navbarLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-semibold relative text-dark/90 dark:text-zinc-200 transition-all duration-300 hover:text-green-500 dark:hover:text-green-500 hover:scale-105"
              >
                {link.label}
              </a>
          </li>
          ))}
      </ul>
      <ToggleThemeButton />
    </div>
    </nav>
  );
}
