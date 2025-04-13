import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

interface Solicitud {
  id: number;
  practica_id: number;
  alumno_id: number;
  created_at: string;
  updated_at: string;
  oferta_practica: {
    id: number;
    name: string;
    description: string;
    // Otros campos de la oferta
  };
}

interface Props {
  solicitudes: Solicitud[];
}

export default function SolicitudesInscritas({ solicitudes }: Props) {
  return (
    <>
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
                {/* Opcional: Enlace para ver la oferta completa */}
                <Link  href={`/alumno/oferta/${solicitud.oferta_practica?.id}`} className="text-blue-500 hover:underline mt-2 block">
                  Ver detalles de la práctica
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Link href={route('alumno.dashboard')} className="mt-6 inline-block text-blue-500 hover:underline">
          Volver al Dashboard
        </Link>
      </div>
    </>
  );
}