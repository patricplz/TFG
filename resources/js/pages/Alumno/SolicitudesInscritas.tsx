import { Head, useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-alumno';
import { BreadcrumbItem } from '@/types';

interface Solicitud {
  id: number;
  practica_id: number;
  alumno_id: number;
  created_at: string;
  updated_at: string;
  estado: string;
  oferta_practica: {
    id: number;
    name: string;
    description: string;
    // Otros campos de la oferta
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/alumno/dashboard',
  },
];

interface Props {
  solicitudes: Solicitud[];
}

export default function SolicitudesInscritas({ solicitudes }: Props) {

  const { delete: destroy, processing} = useForm({});

  const handleRetirarSolicitud = (solicitudId: number) => {
      if (confirm('¿Estás seguro de que deseas retirar esta solicitud?')) {
          destroy(route('alumno.solicitudes.retirar', { solicitud: solicitudId }));
      }
  };

  return (
    <>
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mis Solicitudes" />
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Mis Solicitudes de Práctica</h1>

          {solicitudes.length === 0 ? (
            <p>No has realizado ninguna solicitud de práctica.</p>
          ) : (
            <ul className="space-y-4">
              {solicitudes.map((solicitud) => (
                <li key={solicitud.id} className="bg-white rounded-md shadow-md p-4">
                  <h2 className="text-xl font-semibold mb-2">{solicitud.oferta_practica.name}</h2>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-2">{solicitud.oferta_practica.description.substring(0, 100)}...</p>
                  <p className="text-sm text-gray-500">Solicitado el: {new Date(solicitud.created_at).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Estado: <span className='text-black-500 font-bold'>{solicitud.estado}</span></p>
                  {/* Opcional: Enlace para ver la oferta completa */}
                  <Link  href={`/alumno/oferta/${solicitud.oferta_practica?.id}`} className="text-blue-500 hover:underline mt-2 block">
                    Ver detalles de la práctica
                  </Link>
                  <button
                      onClick={() => handleRetirarSolicitud(solicitud.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      disabled={processing}
                  >
                      Retirar
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Link href={route('alumno.dashboard')} className="mt-6 inline-block text-blue-500 hover:underline">
            Volver al Dashboard
          </Link>
        </div>
      </AppLayout>
    </>
  );
}