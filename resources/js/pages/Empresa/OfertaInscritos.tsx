import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-empresa';
import { type BreadcrumbItem } from '@/types';
import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress"

interface OfertaType {
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
}

interface AlumnoType {
    alumno_id: number;
    nombre: string;
    apellidos: string;
    foto_perfil: File | null;
    formacion: string;
    puntuacion?: number | null; // Propiedad para la puntuación de IA
}

interface Props {
    oferta: OfertaType;
    alumnosInscritos: AlumnoType[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function OfertaInscritos({ oferta, alumnosInscritos: initialAlumnosInscritos }: Props) {
    const [alumnosOrdenadosIA, setAlumnosOrdenadosIA] = useState<AlumnoType[]>([]);
    const [loadingIA, setLoadingIA] = useState(false);
    const [mostrarBotonIA, setMostrarBotonIA] = useState(true);
    const ofertaId = oferta.id;

    const handleOrdenarConIA = () => {
        setLoadingIA(true);
        setMostrarBotonIA(false);

        fetch(route('api.ofertas.compatibilidad-ia', { ofertaId: ofertaId }))
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setLoadingIA(false);
                if (Array.isArray(data)) {
                    // Actualizar el estado con los alumnos con puntuación y ordenados
                    const alumnosConPuntuacion = initialAlumnosInscritos.map(alumno => {
                        const match = data.find(item => item.alumno_id === alumno.alumno_id);
                        return { ...alumno, puntuacion: match ? match.puntuacion : null };
                    }).sort((a, b) => (b.puntuacion ?? -1) - (a.puntuacion ?? -1));
                    setAlumnosOrdenadosIA(alumnosConPuntuacion);
                } else {
                    console.error('Respuesta de la IA inválida:', data);
                    alert('Error al obtener las puntuaciones de la IA.');
                    setMostrarBotonIA(true);
                }
            })
            .catch(error => {
                setLoadingIA(false);
                console.error('Error al llamar a la API de la IA:', error);
                alert('Error al llamar a la API de la IA.');
                setMostrarBotonIA(true);
            });
    };

    const alumnosAMostrar = alumnosOrdenadosIA.length > 0 ? alumnosOrdenadosIA : initialAlumnosInscritos;

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={`Alumnos Inscritos en ${oferta.name}`} />
                <div className="max-w-7xl mx-auto p-6">
                    <h1 className="text-2xl font-bold mb-4">Alumnos Inscritos en: {oferta.name}</h1>

                    {mostrarBotonIA && initialAlumnosInscritos.length > 0 && (
                        <button
                            onClick={handleOrdenarConIA}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                            Ordenar con Inteligencia Artificial
                        </button>
                    )}

                    {loadingIA && <Progress />}

                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        {alumnosAMostrar.map((alumno) => (
                            <Link
                                key={alumno.alumno_id}
                                href={route('empresa.perfilAlumno.ver', { id: alumno.alumno_id })}
                                className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4 block hover:shadow-md transition duration-200"
                            >
                                {alumno.foto_perfil && (
                                    <img
                                        src={`/storage/${alumno.foto_perfil}`}
                                        alt={`${alumno.nombre} ${alumno.apellidos}`}
                                        className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
                                    />
                                )}
                                <h3 className="text-lg font-semibold text-center">{`${alumno.nombre} ${alumno.apellidos}`}</h3>
                                {alumno.formacion && (
                                    <p className="text-sm text-center text-neutral-600 dark:text-neutral-400">{alumno.formacion}</p>
                                )}
                                {alumno.puntuacion !== undefined && alumno.puntuacion !== null && (
                                    <p className="text-sm text-center font-semibold text-green-500">
                                        Puntuación IA: {alumno.puntuacion.toFixed(2)}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </AppLayout>
        </>
    );
}