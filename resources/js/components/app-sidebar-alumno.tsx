import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, LayoutGrid, UserRoundPen } from 'lucide-react';
import AppLogo from './app-logo';
import { MessageCircle } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Mensajes',
        href: '/mensajes',
        icon: MessageCircle,
    },
    {
        title: 'Ver tus solicitudes',
        href: 'http://127.0.0.1:8000/alumno/solicitudes',
        icon: BookOpen,
    },
    
];



const footerNavItems: NavItem[] = [
    {
        title: 'Editar Perfil',
        href: 'http://127.0.0.1:8000/alumno/perfil/editar',
        icon: UserRoundPen
    }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
