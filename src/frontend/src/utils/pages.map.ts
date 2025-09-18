import AssetsPage from '@/pages/activos';
import AdminPage from '@/pages/administracion';
import ThreatsPage from '@/pages/amenazas';
import AuditsPage from '@/pages/auditorias';
import ReportsPage from '@/pages/reportes';
import type { mapPage } from '@/utils/@types/pages.map.types';

export const pagesMap: mapPage[] = [
  { label: "Administracion", href: "/administracion", component: AdminPage, disabled: false },
  { label: "Activos", href: "/activos", component: AssetsPage, disabled: false },
  { label: "Amenazas", href: "/amenazas", component: ThreatsPage, disabled: false },
  { label: "Auditorias", href: "/auditorias", component: AuditsPage, disabled: false },
  { label: "Reportes", href: "/reportes", component: ReportsPage, disabled: true },
];
