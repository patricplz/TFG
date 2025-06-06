import { Head, useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-alumno';
import { BreadcrumbItem } from '@/types';

//información que necesito sobre la solicitud, y la oferta para poder ir a ella en "ver detalles"
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

//recibo las solicitudes como prop
export default function SolicitudesInscritas({ solicitudes }: Props) {

  // Extraemos el método delete de useForm y lo renombramos a "destroy"
  // porque "delete" es una palabra reservada en javaScript
  const { delete: destroy, processing} = useForm({});

  //función para retirar la solicitud
  const handleRetirarSolicitud = (solicitudId: number) => {
      if (confirm('¿Estás seguro de que deseas retirar esta solicitud?')) {
          destroy(route('alumno.solicitudes.retirar', { solicitud: solicitudId }));
      }
  };

  return (
    <>
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tus Solicitudes" />
       <div className="max-w-3xl w-full mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Tus Solicitudes de Práctica</h1>

          {solicitudes.length === 0 ? (
            <p className="text-center text-gray-500">No has realizado ninguna solicitud de práctica.</p>
          ) : (
            <ul className="space-y-6">
              {solicitudes.map((solicitud, index) => (
                <li
                  key={solicitud.id}
                  className="bg-white dark:bg-[oklch(0.28_0.03_232)] rounded-xl shadow-lg p-6 flex items-start justify-between gap-4 animate-fade-in-up transition-all duration-300"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold mb-1">{solicitud.oferta_practica.name}</h2>
                    <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                      {solicitud.oferta_practica.description.substring(0, 100)}...
                    </p>

                    <p className="text-sm text-gray-500">
                      Solicitado el: {new Date(solicitud.created_at).toLocaleDateString()}
                    </p>

                    <p className="text-sm mt-1">
                      Estado: <span className="font-bold text-blue-600 dark:text-blue-400">{solicitud.estado}</span>
                    </p>

                  </div>

                  <div className="flex flex-col space-y-2 min-w-fit">
                    <Link
                      href={`/alumno/oferta/${solicitud.oferta_practica?.id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition transform hover:scale-105 text-sm text-center"
                    >
                      Ver detalles
                    </Link>
                    <button
                      onClick={() => handleRetirarSolicitud(solicitud.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition transform hover:scale-105 text-sm"
                      disabled={processing}>
                      Retirar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 text-center">
            <Link
              href={route('alumno.dashboard')}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              ← Volver al Dashboard
            </Link>
          </div>
        </div>
      </AppLayout>
    </>
  );
}