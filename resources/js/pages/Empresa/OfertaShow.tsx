import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout-empresa';
import { BreadcrumbItem } from '@/types';
import { motion } from 'framer-motion';
import { useState } from 'react'; // Importa useState

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
    ubicacion: string | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    oferta: Oferta;
}

export default function OfertaShow({ oferta }: Props) {
    const { delete: destroy, processing } = useForm({});
    const [showDetails, setShowDetails] = useState(true); // Ejemplo de estado para mostrar/ocultar detalles

    useEffect(() => {
    // Mostrar detalles con un pequeño retraso para la animación
    const timer = setTimeout(() => {
        setShowDetails(true);
    }, 300);
    return () => clearTimeout(timer);
    }, []);

    const handleDelete = () => {
        if (confirm(`¿Estás seguro de que deseas eliminar la oferta "${oferta.name}"?`)) {
            destroy(route('empresa.oferta.destroy', oferta.id));
        }
    };

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
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={oferta.name} />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl w-full mx-auto p-6"
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-hidden rounded-xl shadow-lg mb-6"
                    >
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
                            className="prose dark:prose-invert max-w-none mb-8"
                        >
                            <p className="text-lg">{oferta.description}</p>
                            <br></br>
                            <p className="text-lg"><span className='text-bold'>Ubicación de la oferta: </span>{oferta.ubicacion}</p>

                        </motion.div>

                        {/* Condiciona la renderización de los detalles */}
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

                        {/* ... muestra aquí los demás detalles de la oferta ... */}

                        {/* Opciones para la empresa: */}
                        <Link href={route('empresa.oferta.edit', oferta.id)} className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2">
                            Editar
                        </Link>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={handleDelete}
                            disabled={processing}
                        >
                            Eliminar
                        </button>
                    </div>
                </motion.div>
            </AppLayout>
        </>
    );
}