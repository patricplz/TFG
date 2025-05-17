// resources/js/Pages/Alumno/SectorOfertas.tsx

import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-alumno';
import { BreadcrumbItem } from '@/types';
import FiltroOfertas from '@/components/FiltroBusquedaOfertas';
import { OfertaType } from '@/types/oferta'
import { motion } from 'framer-motion';

interface Props {
  ofertas: OfertaType[];
  modalidades: string[]; 
  filtros: {
      palabra_clave?: string;
      sector?: string;
      modalidad?: string;
  };
  sector: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard ofertas',
    href: '/alumno/dashboard/sector',
  },
];

export default function Dashboard({ ofertas, modalidades, sector }: Props) {

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          <FiltroOfertas 
            modalidades={modalidades} sector={sector} 
          />
          <div className="grid auto-rows-min gap-6 md:grid-cols-3">
            {ofertas.map((oferta) => (
              <Link href={`/alumno/oferta/${oferta.id}`} key={oferta.id}>
                <motion.div className="border-sidebar-border/70 dark:border-sidebar-border flex flex-col items-center justify-start overflow-hidden rounded-xl border bg-white dark:bg-[oklch(0.28_0.03_232)] p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}>
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
                </motion.div>
              </Link>          
            ))}
          </div>
      </div>
    </AppLayout>
  );
}
