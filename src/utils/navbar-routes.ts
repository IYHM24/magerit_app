import { NavbarLink } from "@/utils/@types/types";

export const navbarLinks: NavbarLink[] = [
  { label: "Administracion", href: "/", disabled: false },
  { label: "Activos", href: "/activos", disabled: false },
  { label: "Amenazas", href: "/amenazas", disabled: false },
  { label: "Auditorias", href: "/auditorias", disabled: false },
  { label: "Reportes", href: "/reportes", disabled: true },
];
