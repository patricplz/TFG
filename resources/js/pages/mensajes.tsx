import ChatApp from '@/components/chatApp';
import AppLayout from '@/layouts/app-layout-alumno';
import { BreadcrumbItem } from '@/types';

export default function Mensajes() {

    const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/alumno/dashboard' },
    ];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Mensajes</h1>
                <ChatApp />
            </div>
        </AppLayout>
    );
}
