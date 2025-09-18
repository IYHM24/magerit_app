// src/components/ui/Navbar.tsx
"use client"

import React from "react";
import { ToggleThemeButton } from "./ToggleThemeButton";
import { navbarLinks } from "@/utils/navbar-routes";
import { useRouter } from "next/navigation";
import Link from "next/link";


export function Navbar() {

  const router = useRouter();

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white/30 dark:bg-black/30 backdrop-blur-lg shadow-lg border-b border-white/20 dark:border-black/20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="text-3xl font-extrabold text-dark dark:text-zinc-200 drop-shadow-lg">
          <Link href="/">Magerit</Link>
        </div>
        <ul className="flex gap-6">
          {navbarLinks.map((link) => (
            !link.disabled && 
            <li key={link.label}>
              <Link
                href={link.href}
                className="font-semibold relative text-dark/90 dark:text-zinc-200 transition-all duration-300 hover:text-green-500 dark:hover:text-green-500 hover:scale-105"
              >
                {link.label}
              </Link>
          </li>
          ))}
      </ul>
      <ToggleThemeButton />
    </div>
    </nav>
  );
}
