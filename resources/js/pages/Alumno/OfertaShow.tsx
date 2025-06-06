import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout-alumno';
import { BreadcrumbItem } from '@/types';
import { motion } from 'framer-motion';

//los datos que necesito de la empresa
interface Empresa {
  empresa_id: number;
  nombre: string;
}

//los datos que necesito de la oferta de prácticas
interface Oferta {
  id: number;
  name: string;
  description: string;
  image_path: string | null;
  habilidades_blandas_requeridas: string | null;
  habilidades_tecnicas_requeridas: string | null;
  formacion_requerida: string | null;
  experiencia_laboral_requerida: string | null;
  disponibilidad_requerida: string | null;
  modalidad_practicas_requerida: string | null;
  idiomas_requeridos: string | null;
  sector_interes_requerido: string | null;
  empresa: Empresa | null;
}

//la ruta de navegación
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/alumno/dashboard',
  },
  {
    title: 'Oferta',
    href: '#',
  }
];

export default function OfertaShow({ oferta }: { oferta: Oferta}) {
    // Obtenemos el token CSRF desde la etiqueta meta del HTML para poder hacer peticiones seguras
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

   // Estado para manejar mensajes de éxito o error tras intentar inscribirse
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); //  Indicador de carga durante el envío del formulario
  const [showDetails, setShowDetails] = useState<boolean>(false); // Controla si se deben mostrar los detalles animadamente después de un pequeño retraso
  
  
  // Si no hay empresa, mostramos un nombre por defecto
  const nombreEmpresa = oferta.empresa ? oferta.empresa.nombre : 'Empresa Desconocida';

  // Efecto para mostrar los detalles con un pequeño delay y dar sensación de carga suave
  useEffect(() => {
    const timer = setTimeout(() => { setShowDetails(true); }, 300);
    return () => clearTimeout(timer);
  }, []);


   // Función que maneja el envío del formulario de inscripción a la práctica
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMensajeError(null);
    setIsLoading(true); // Activamos el spinner de carga

    router.post(route('alumno.practica.inscribir', oferta.id), {
      _token: csrfToken,
    }, {
      onSuccess: () => { //si funciona correctamente sale el mensaje de exito y redirige a alumno.dashboard
        setMensajeExito('¡Solicitud enviada con éxito!');
        setTimeout(() => {
          setMensajeExito(null);
          router.visit(route('alumno.dashboard'));
        }, 1500);
      },
      onError: (errors) => { //si falla algo salta un mensaje de error
        console.error('Error al inscribirse:', errors);
        const errorMessages = Object.values(errors).flat().join(', ');
        setMensajeError(`Error al inscribirse: ${errorMessages}`);
        setIsLoading(false);
      },
    });
  };

  // Div de información, le pasas un título y el contenido y lo aplica solo, utilizo un motion.div para añadir animación, con esto no se repite códio
  const InfoSection = ({ title, content }: { title: string, content: string | null }) => {
    if (!content) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{title}</h3>
        <p className="text-neutral-700 dark:text-neutral-300">{content}</p>
      </motion.div>
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {mensajeExito && ( //si existe mensaje exito que salga el aviso
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {mensajeExito}
            </motion.div>
          )}

      {mensajeError && ( //si existe mensajeError que salga el aviso procedente
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {mensajeError}
          </motion.div>
        )}
      <Head title={oferta.name} />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full mx-auto p-6">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl shadow-lg mb-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img
            src={oferta.image_path ? `/storage/${oferta.image_path}` : '/images/default-image.jpg'}
            alt={oferta.name}
            className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
          />
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="absolute bottom-0 left-0 right-0 p-6 z-20"
          >
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{oferta.name}</h1>
          </motion.div>
        </motion.div>

        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 shadow-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose dark:prose-invert max-w-none mb-8">
            {oferta.empresa?.nombre ? ( //si existe la empresa
              <a
                href={`/alumno/empresa/${oferta.empresa?.empresa_id}`}
                className="group inline-block relative w-full"
              >
                <span className="text-lg text-blue-400 underline absolute transition-opacity duration-200 group-hover:opacity-0">
                  {nombreEmpresa.toUpperCase()}
                </span>
                <span className="text-lg text-blue-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Ver empresa
                </span>
              </a>
            ) : ( //si no existe la empresa, aunque esto no debería pasar, ya que una empresa desconocida no puede subir una oferta, lo manejo, 
              <span className="text-lg text-gray-400 italic">Empresa desconocida</span>
            )}
            <p className="text-lg">{oferta.description}</p>
          </motion.div>

          {showDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              className="mt-8 space-y-2"
            >
              <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">Requisitos de la Oferta</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                <InfoSection title="Habilidades Blandas" content={oferta.habilidades_blandas_requeridas} />
                <InfoSection title="Habilidades Técnicas" content={oferta.habilidades_tecnicas_requeridas} />
                <InfoSection title="Formación" content={oferta.formacion_requerida} />
                <InfoSection title="Experiencia Laboral" content={oferta.experiencia_laboral_requerida} />
                <InfoSection title="Disponibilidad" content={oferta.disponibilidad_requerida} />
                <InfoSection title="Modalidad de Prácticas" content={oferta.modalidad_practicas_requerida} />
                <InfoSection title="Idiomas" content={oferta.idiomas_requeridos} />
                <InfoSection title="Sector de Interés" content={oferta.sector_interes_requerido} />
              </div>
            </motion.div>
          )}

          

          

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex justify-center">
            <form onSubmit={handleSubmit} method="POST" className="w-full">
              <input type="hidden" name="_token" value={csrfToken} />

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full md:w-auto px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 
                  ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95'}`}>
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Inscribirse en esta práctica
                  </span>
                )}
              </button>
            </form>
            
          </motion.div>
        </div>
      </motion.div>
    </AppLayout>
  );
}