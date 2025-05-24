import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-empresa';
import { type BreadcrumbItem } from '@/types';
import React, { useState, useEffect } from 'react';
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
    puntuacion?: number | null;
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
    const [isVisible, setIsVisible] = useState(false);
    const ofertaId = oferta.id;

    // Animación de entrada
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

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
                <div className={`max-w-7xl mx-auto p-6 transition-all duration-1000 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                    <div className="mb-8">
                        <div className={`transform transition-all duration-700 delay-200 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                        }`}>
                            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                                Alumnos Inscritos
                            </h1>
                            <div className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-300">
                                <span className="font-medium">Oferta:</span>
                                <span className="text-blue-600 dark:text-blue-400 font-semibold">{oferta.name}</span>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        
                        <div className={`mt-4 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-full transform transition-all duration-1000 delay-400 ${
                            isVisible ? 'scale-x-100' : 'scale-x-0'
                        } origin-left`}>
                        </div>
                    </div>

                    <div className={`mb-8 transform transition-all duration-700 delay-300 ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-blue-100 dark:border-gray-600 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                            {initialAlumnosInscritos.length}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {initialAlumnosInscritos.length === 1 ? 'Alumno inscrito' : 'Alumnos inscritos'}
                                        </p>
                                    </div>
                                </div>
                                
                                {alumnosOrdenadosIA.length > 0 && (
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium">Ordenado por IA</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {mostrarBotonIA && initialAlumnosInscritos.length > 0 && (
                        <div className={`mb-8 transform transition-all duration-700 delay-500 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}>
                            <button
                                onClick={handleOrdenarConIA}
                                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Ordenar con Inteligencia Artificial
                                </span>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                            </button>
                        </div>
                    )}

                    {loadingIA && (
                        <div className="mb-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Analizando compatibilidad con IA...
                                </span>
                            </div>
                            <Progress className="h-2" />
                        </div>
                    )}

                    <div className="grid auto-rows-min gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {alumnosAMostrar.map((alumno, index) => (
                            <div
                                key={alumno.alumno_id}
                                className={`transform transition-all duration-700 ${
                                    isVisible 
                                        ? 'opacity-100 translate-y-0 scale-100' 
                                        : 'opacity-0 translate-y-8 scale-95'
                                }`}
                                style={{ transitionDelay: `${600 + index * 100}ms` }}
                            >
                                <Link
                                    href={route('empresa.perfilAlumno.ver', { id: alumno.alumno_id, oferta_id: ofertaId })}
                                    className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 block transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-600"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    {alumno.puntuacion !== undefined && alumno.puntuacion !== null && (
                                        <div className="absolute -top-1 -right-1 z-10">
                                            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                                                ★ {alumno.puntuacion.toFixed(1)}
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="relative mb-4 mx-auto w-24 h-24">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse"></div>
                                        {alumno.foto_perfil ? (
                                            <img
                                                src={`/storage/${alumno.foto_perfil}`}
                                                alt={`${alumno.nombre} ${alumno.apellidos}`}
                                                className="w-24 h-24 object-cover rounded-full border-4 border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-all duration-300 transform group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full border-4 border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-all duration-300 flex items-center justify-center transform group-hover:scale-110">
                                                <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Información del alumno */}
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold text-center text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                            {`${alumno.nombre} ${alumno.apellidos}`}
                                        </h3>
                                        
                                        {alumno.formacion && (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <p className="text-sm text-center text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                                                    {alumno.formacion}
                                                </p>
                                                <div className="w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Indicador de hover */}
                                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Mensaje cuando no hay alumnos */}
                    {initialAlumnosInscritos.length === 0 && (
                        <div className={`text-center py-16 transform transition-all duration-700 delay-300 ${
                            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                                No hay alumnos inscritos
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Aún no se han inscrito alumnos a esta oferta
                            </p>
                        </div>
                    )}
                </div>
            </AppLayout>
        </>
    );
}