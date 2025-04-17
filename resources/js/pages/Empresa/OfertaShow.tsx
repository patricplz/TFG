import { Head, Link, useForm } from '@inertiajs/react';

interface Oferta {
    id: number;
    name: string;
    description: string;
    image_path: string | null; // Permitir null para la imagen
    habilidades_blandas_requeridas: string | null;
    habilidades_tecnicas_requeridas: string | null;
    formacion_requerida: string | null;
    experiencia_laboral_requerida: string | null;
    disponibilidad_requerida: string | null;
    modalidad_practicas_requerida: string | null;
    idiomas_requeridos: string | null;
    sector_interes_requerido: string | null;
}

interface Props {
    oferta: Oferta; 
}

export default function OfertaShow({ oferta }: Props) {

    const { delete: destroy, processing } = useForm({});

    const handleDelete = () => {
        if (confirm(`¿Estás seguro de que deseas eliminar la oferta "${oferta.name}"?`)) {
            destroy(route('empresa.oferta.destroy', oferta.id));
        }
    };

    return (
        <>
            <Head title={oferta.name} />
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">{oferta.name}</h1>
                {oferta.image_path && (
                    <img
                        src={`/storage/${oferta.image_path}`}
                        alt={oferta.name}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                )}
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">{oferta.description}</p>

                {oferta.habilidades_blandas_requeridas && (
                    <div className="mb-2">
                        <h3 className="font-semibold">Habilidades Blandas Requeridas:</h3>
                        <p className="text-neutral-700 dark:text-neutral-300">{oferta.habilidades_blandas_requeridas}</p>
                    </div>
                )}

                {oferta.habilidades_tecnicas_requeridas && (
                    <div className="mb-2">
                        <h3 className="font-semibold">Habilidades Técnicas Requeridas:</h3>
                        <p className="text-neutral-700 dark:text-neutral-300">{oferta.habilidades_tecnicas_requeridas}</p>
                    </div>
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
        </>
    );
}