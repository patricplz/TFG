import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Oferta {
  id: number;
  name: string;
  description: string;
  image_path: string;
}

export default function OfertaShow({ oferta }: { oferta: Oferta }) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const [mensajeError, setMensajeError] = useState<string | null>(null); // Nuevo estado para el error

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMensajeError(null); // Limpiar el mensaje de error al intentar enviar de nuevo

    router.post(route('alumno.practica.inscribir', oferta.id), {
      _token: csrfToken,
    }, {
      onSuccess: () => {
        setMensajeExito('¡Solicitud enviada con éxito!');
        setTimeout(() => {
          setMensajeExito(null); // Limpiar el mensaje de éxito antes de redirigir
          router.visit(route('alumno.dashboard'));
        }, 2000); // Redirigir después de 2 segundos
      },
      onError: (errors) => {
        console.error('Error al inscribirse:', errors);
        // Formatea los errores para mostrarlos al usuario (ejemplo básico)
        const errorMessages = Object.values(errors).flat().join(', ');
        setMensajeError(`Error al inscribirse: ${errorMessages}`);
      },
    });
  };

  return (
    <>
      <Head title={oferta.name} />
      <div className="max-w-3xl mx-auto p-6">
        <img
          src={oferta.image_path ? `/storage/${oferta.image_path}` : '/images/default-image.jpg'}
          alt={oferta.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{oferta.name}</h1>
        <p className="text-neutral-700 dark:text-neutral-300">{oferta.description}</p>

        {mensajeExito && (
          <div className="mt-4 p-3 bg-green-200 text-green-800 rounded-md">
            {mensajeExito}
          </div>
        )}

        {mensajeError && (
          <div className="mt-4 p-3 bg-red-200 text-red-800 rounded-md">
            {mensajeError}
          </div>
        )}

        {/* Formulario para enviar la solicitud */}
        <form onSubmit={handleSubmit} method="POST">
          <input type="hidden" name="_token" value={csrfToken} />

          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Inscribirse en esta práctica
          </button>
        </form>
      </div>
    </>
  );
}