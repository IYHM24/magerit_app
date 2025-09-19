import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SidebarTimeline from '@/components/SidebarTimeline'
import { pagesMap } from '@/utils/pages.map'

const Layout: React.FC = () => {
    const location = useLocation();
    // Encuentra el módulo actual por la ruta
    const currentModule = pagesMap.find(
        page => location.pathname.startsWith(page.href)
    );
    const subPages = currentModule?.subPages ?? [];

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 flex min-h-[80vh] gap-8">
                {subPages.length > 0 && (
                    <div className="flex-shrink-0 w-64">
                        <SidebarTimeline subPages={subPages} />
                    </div>
                )}
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Layout
