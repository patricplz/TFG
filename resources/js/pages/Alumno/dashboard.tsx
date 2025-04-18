// resources/js/Pages/Alumno/dashboard.tsx

import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-alumno';
import { BreadcrumbItem } from '@/types';

interface OfertaPractica {
  id: number;
  name: string;
  description: string;
  image_path: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/alumno/dashboard',
  },
];

export default function Dashboard() {
  const { ofertas } = usePage().props as unknown as { ofertas: OfertaPractica[] };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="grid auto-rows-min gap-6 md:grid-cols-3">
          {ofertas.map((oferta) => (
            <Link href={`/alumno/oferta/${oferta.id}`} key={oferta.id}>
              <div className="border-sidebar-border/70 dark:border-sidebar-border flex flex-col items-center justify-start overflow-hidden rounded-xl border bg-white dark:bg-neutral-900 p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                <img
                  src={oferta.image_path ? `/storage/${oferta.image_path}` : '/images/default-image.jpg'}
                  alt={oferta.name}
                  className="h-40 w-full object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold text-center text-neutral-800 dark:text-neutral-100">
                  {oferta.name}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 text-center mt-2">
                  {oferta.description}
                </p>
              </div>
            </Link>          
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
