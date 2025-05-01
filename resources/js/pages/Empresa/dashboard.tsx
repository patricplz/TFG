import AppLayout from '@/layouts/app-layout-empresa';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface Oferta {
    id: number;
    name: string;
    description: string;
    image_path: string | null;
}

interface Props {
    ofertas: Oferta[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ ofertas }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold mb-4">Tus Ofertas Publicadas</h1>

                {ofertas.length === 0 ? (
                    <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-white dark:bg-[oklch(0.28_0.03_232)] p-6 shadow-md">
                        <p className="mb-4">No has publicado ninguna oferta de prácticas.</p>
                        <Link 
                            href='http://127.0.0.1:8000/empresa/oferta/crear'
                            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                        >
                            Crear nueva oferta
                        </Link>
                    </div>
                ) : (
                    <motion.div 
                        className="grid auto-rows-min gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        >
                        {ofertas.map((oferta, index) => (
                            <div 
                                key={oferta.id} 
                                className={` transition-transform duration-300 hover:scale-104 border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-white dark:bg-[oklch(0.28_0.03_232)] p-6 shadow-md hover:shadow-lg transition-all duration-500 transform`}
                                style={{ 
                                    transitionDelay: `${index * 100}ms` 
                                }}
                            >
                                <h2 className="text-xl font-semibold mb-2">{oferta.name}</h2>
                                {oferta.image_path && (
                                    <div className="overflow-hidden rounded-md mb-2">
                                        <img
                                            src={`/storage/${oferta.image_path}`}
                                            alt={oferta.name}
                                            className="w-full h-40 object-cover rounded-md"
                                        />
                                    </div>
                                )}
                                <p className="text-neutral-700 dark:text-neutral-300 mb-4 line-clamp-3">{oferta.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <Link 
                                        href={route('empresa.oferta.show', oferta.id)} 
                                        className="flex-1 text-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                                    >
                                        Ver detalles
                                    </Link>
                                    <Link 
                                        href={`/empresa/oferta/${oferta.id}/alumnos`} 
                                        className="flex-1 text-center px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
                                    >
                                        Ver alumnos
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </AppLayout>
    );
}