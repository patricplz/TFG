import AppLayout from '@/layouts/app-layout-empresa';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Oferta {
    id: number;
    name: string;
    description: string;
    image_path: string | null;
    // ... otras propiedades de la oferta
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
                    <div>
                    <p>No has publicado ninguna oferta de prácticas.</p>
                    <Link href='http://127.0.0.1:8000/empresa/oferta/crear'>Haz click aquí para crear una</Link>
                    </div>
                ) : (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                        {ofertas.map((oferta) => (
                            <div key={oferta.id} className="bg-white rounded-md shadow-md p-4">
                                <h2 className="text-xl font-semibold mb-2">{oferta.name}</h2>
                                {oferta.image_path && (
                                    <img
                                        src={`/storage/${oferta.image_path}`}
                                        alt={oferta.name}
                                        className="w-full h-32 object-cover rounded-md mb-2"
                                    />
                                )}
                                <p className="text-neutral-700 dark:text-neutral-300 mb-2">{oferta.description.substring(0, 100)}...</p>
                                <Link href={route('empresa.oferta.show', oferta.id)} className="text-blue-500 hover:underline mt-2 block">
                                    Ver detalles
                                </Link>
                                <Link href={`/empresa/oferta/${oferta.id}/alumnos`} className="text-green-500 hover:underline mt-1 block">
                                    Ver alumnos inscritos
                                </Link> 
                                {/*<button className="text-red-500 hover:underline mt-1 block">
                                    Eliminar
                                </button> */}
                            </div>
                        ))}
                    </div>
                )}

                {/* Puedes mantener o eliminar este div si no lo necesitas */}
                {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div> */}
            </div>
        </AppLayout>
    );
}