import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-alumno';
import { BreadcrumbItem } from '@/types';
import { FiltroSectores } from '@/components/FiltroBusquedaSectores'; // Importa el componente de filtro
import { motion } from 'framer-motion';

interface Props {
  sectoresFP: string[];
  sectoresFP_select: string[];
  filtros: {
    palabra_clave?: string;
    sector?: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/alumno/dashboard' },
];

export default function Dashboard({ sectoresFP_select, sectoresFP, filtros }: Props) {

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <FiltroSectores sectores={sectoresFP_select} initialSector={filtros.sector} /> {/* Usa el componente de filtro */}
        <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
          Sectores
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {sectoresFP.map((sector) => (
            <Link href={`/alumno/dashboard/sector/${encodeURIComponent(sector)}`} key={sector}>
              <motion.div  
                className="border-sidebar-border/70 dark:border-sidebar-border flex items-center justify-center overflow-hidden rounded-xl border bg-white dark:bg-[oklch(0.28_0.03_232)] p-6 shadow-md hover:shadow-lg transition-shadow duration-200 h-32"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}>
                <h2 className="text-lg font-semibold text-center text-blue-600 dark:text-blue-400">
                  {sector}
                </h2>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}