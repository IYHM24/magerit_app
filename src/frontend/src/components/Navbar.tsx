import { Link } from "react-router-dom";
import { pagesMap } from "@/utils/pages.map";
import { ToggleThemeButton } from "./ToggleThemeButton";

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white/30 dark:bg-black/30 backdrop-blur-lg shadow-lg border-b border-white/20 dark:border-black/20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="text-3xl font-extrabold text-dark dark:text-zinc-200 drop-shadow-lg">
          <Link to="/">Magerit</Link>
        </div>
        <ul className="flex gap-6">
          {pagesMap.map((link) => (
            !link.disabled && (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="font-semibold relative text-dark/90 dark:text-zinc-200 transition-all duration-300 hover:text-green-500 dark:hover:text-green-500 hover:scale-105"
                >
                  {link.label}
                </Link>
              </li>
            )
          ))}
        </ul>
        <ToggleThemeButton />
      </div>
    </nav>
  );
}
