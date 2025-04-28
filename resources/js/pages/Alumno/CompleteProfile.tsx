import AppLayout from '@/layouts/app-layout-alumno';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

interface FormData {
    cv: File | null;
    foto_perfil: File | null;
    intereses: string;
    descripcion: string;
    formacion: string;
    experiencia_laboral: string;
    habilidades_tecnicas: string;
    habilidades_blandas: string;
    practicas_interes: string;
    sectores_interes: string;
    disponibilidad: string;
    modalidad_practicas: string;
    expectativas_aprendizaje: string;
    idiomas: string;
    portafolio: string;
    certificaciones: string;
    premios: string;
    referencias: string;
    nombre: string;
    apellidos: string;
    fecha_nacimiento: string;
    localidad: string;
    [key: string]: string | number | boolean | File | null;
}

interface CompleteProfileProps {
    alumno: FormData | null; // La prop 'alumno' puede ser FormData o null si no existe
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/alumno/dashboard',
    },
];

export default function CompletaPerfil({ alumno }: CompleteProfileProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const { data, setData, post, processing, errors } = useForm<FormData>({
        cv: alumno?.cv || null,
        foto_perfil: alumno?.foto_perfil || null,
        intereses: alumno?.intereses || '',
        descripcion: alumno?.descripcion || '',
        formacion: alumno?.formacion || '',
        experiencia_laboral: alumno?.experiencia_laboral || '',
        habilidades_tecnicas: alumno?.habilidades_tecnicas || '',
        habilidades_blandas: alumno?.habilidades_blandas || '',
        practicas_interes: alumno?.practicas_interes || '',
        sectores_interes: alumno?.sectores_interes || '',
        disponibilidad: alumno?.disponibilidad || '',
        modalidad_practicas: alumno?.modalidad_practicas || '',
        expectativas_aprendizaje: alumno?.expectativas_aprendizaje || '',
        idiomas: alumno?.idiomas || '',
        portafolio: alumno?.portafolio || '',
        certificaciones: alumno?.certificaciones || '',
        premios: alumno?.premios || '',
        referencias: alumno?.referencias || '',
        nombre: alumno?.nombre || '',
        apellidos: alumno?.apellidos || '',
        fecha_nacimiento: alumno?.fecha_nacimiento || '',
        localidad: alumno?.localidad || '',
    });

    const [cvName, setCvName] = useState<string | null>(null);
    const [fotoPerfilName, setFotoPerfilName] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);

    const handleCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files && event.currentTarget.files.length > 0) {
            setData('cv', event.currentTarget.files[0]);
            setCvName(event.currentTarget.files[0].name);
        } else {
            setData('cv', null);
            setCvName(null);
        }
    };

    const handleFotoPerfilChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files && event.currentTarget.files.length > 0) {
            setData('foto_perfil', event.currentTarget.files[0]);
            setFotoPerfilName(event.currentTarget.files[0].name);
        } else {
            setData('foto_perfil', null);
            setFotoPerfilName(null);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Envía el objeto data y fuerza la conversión a FormData
        post(route('alumno.perfil.guardar'), {
            forceFormData: true, // forzar la conversión a FormData
        });
    };

    useEffect(() => {
        const form = formRef.current;
        if (form) {
            const inputs = Array.from(form.querySelectorAll('input:not([type="file"]), textarea, select'));
            const totalFields = inputs.length;
            let filledFields = 0;

            inputs.forEach((input) => {
                if (
                    (input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value.trim() !== '' ||
                    (input as HTMLInputElement).type === 'date'
                ) {
                    filledFields++;
                }
            });

            // Considerar los archivos como llenos si tienen un nombre
            if (cvName) filledFields++;
            if (fotoPerfilName) filledFields++;
            const totalConsideredFields = totalFields + (data.cv !== null ? 1 : 0) + (data.foto_perfil !== null ? 1 : 0);

            const newProgress = totalConsideredFields > 0 ? Math.round((filledFields / totalConsideredFields) * 100) : 0;
            setProgress(newProgress);
        }
    }, [data, cvName, fotoPerfilName]);

    const progressBarColorClass = progress < 30 ? 'bg-red-500' : progress < 70 ? 'bg-yellow-500' : 'bg-green-500';

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Completa tu Perfil" />
                <div className="min-h-screen w-full ">
                    <div className="mx-auto max-w-4xl p-6 bg-">
                        <div className="overflow-hidden rounded-lg shadow-xl">
                            {/* Header con imagen decorativa */}
                            <div className="relative p-6 text-white" style={{ backgroundColor: '#328c8c'}}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold">Completa tu Perfil</h1>
                                        <p className="mt-2 opacity-90">Personaliza tu información para destacar ante las empresas</p>
                                    </div>
                                    <div className="hidden md:block">
                                        <svg
                                            className="h-24 w-24 text-white/20"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-gray-200 px-6 py-4">
                                <div className="h-2.5 w-full rounded-full bg-gray-200">
                                    <div
                                        className={`${progressBarColorClass} h-2.5 rounded-full transition-all duration-500`}
                                        style={{ width: `${progress}%` }}
                                        id="progress-bar"
                                    ></div>
                                </div>
                            </div>
                            <div className="p-6">
                                <form onSubmit={submit} className="space-y-6" ref={formRef}>
                                    {/* Sección de información personal */}
                                    <div className="rounded-lg border border-black p-4" style={{ backgroundColor: 'oklch(0.28 0.03 232)' }}>
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white">
                                            <svg
                                                className="mr-2 h-5 w-5 text-blue-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                            Información Personal
                                        </h2>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-white-700">
                                                    Nombre *
                                                </label>
                                                <input
                                                    type="text"
                                                    name = 'nombre'
                                                    id="nombre"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.nombre}
                                                    onChange={(e) => setData('nombre', e.currentTarget.value)}
                                                    required
                                                />
                                                {errors.nombre && <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="apellidos" className="mb-1 block text-sm font-medium text-white">
                                                    Apellidos *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="apellidos"
                                                    name = 'apellidos'
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.apellidos}
                                                    onChange={(e) => setData('apellidos', e.currentTarget.value)}
                                                    required
                                                />
                                                {errors.apellidos && <p className="mt-1 text-xs text-red-500">{errors.apellidos}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="fecha_nacimiento" className="mb-1 block text-sm font-medium text-white-700">
                                                    Fecha de Nacimiento *
                                                </label>
                                                <input
                                                    type="date"
                                                    id="fecha_nacimiento"
                                                    name="apellidos"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.fecha_nacimiento}
                                                    onChange={(e) => setData('fecha_nacimiento', e.currentTarget.value)}
                                                    required
                                                />
                                                {errors.fecha_nacimiento && <p className="mt-1 text-xs text-red-500">{errors.fecha_nacimiento}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="localidad" className="mb-1 block text-sm font-medium text-white-700">
                                                    Localidad *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="localidad"
                                                    name="localidad"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.localidad}
                                                    onChange={(e) => setData('localidad', e.currentTarget.value)}
                                                    required
                                                />
                                                {errors.localidad && <p className="mt-1 text-xs text-red-500">{errors.localidad}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección de archivos */}
                                    <div className="rounded-lg border border-gray-100 p-4" style={{ backgroundColor: 'oklch(0.28 0.03 232)' }}>
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white">
                                            <svg
                                                className="mr-2 h-5 w-5 text-blue-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                            Documentos
                                        </h2>
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-blue-400">
                                                <label htmlFor="cv" className="block cursor-pointer">
                                                    <svg
                                                        className="mx-auto h-8 w-8 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                                        />
                                                    </svg>
                                                    <span className="mt-2 block font-medium text-white">CV (PDF)</span>
                                                    <span className="text-sm text-gray-500">Haz clic para subir o arrastra tu archivo</span>
                                                    <input type="file" name='cv' id="cv" style={{ color: 'transparent' }} onChange={handleCvChange} accept=".pdf" required />
                                                </label>
                                                {cvName && <p className="mt-2 text-sm font-medium text-blue-600">{cvName}</p>}
                                                {errors.cv && <p className="mt-1 text-xs text-red-500">{errors.cv}</p>}
                                            </div>

                                            <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-blue-400">
                                                <label htmlFor="foto_perfil" className="block cursor-pointer">
                                                    <svg
                                                        className="mx-auto h-8 w-8 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <span className="mt-2 block font-medium text-white">Foto de Perfil</span>
                                                    <span className="text-sm text-gray-500">Imagen en formato JPG, PNG</span>
                                                    <input
                                                        type="file"
                                                        id="foto_perfil"
                                                        name="foto_perfil"  
                                                        style={{ color: 'transparent' }}
                                                        onChange={handleFotoPerfilChange}
                                                        accept="image/*"
                                                        required
                                                    />
                                                </label>
                                                {fotoPerfilName && <p className="mt-2 text-sm font-medium text-blue-600">{fotoPerfilName}</p>}
                                                {errors.foto_perfil && <p className="mt-1 text-xs text-red-500">{errors.foto_perfil}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección sobre ti */}
                                    <div className="rounded-lg border border-gray-100 p-4" style={{ backgroundColor: 'oklch(0.28 0.03 232)' }}>
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white">
                                            <svg
                                                className="mr-2 h-5 w-5 text-blue-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Sobre Ti
                                        </h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="intereses" className="mb-1 block text-sm font-medium text-white">
                                                    Define tus Intereses *
                                                </label>
                                                <textarea
                                                    id="intereses"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.intereses}
                                                    onChange={(e) => setData('intereses', e.currentTarget.value)}
                                                    rows={3}
                                                    placeholder="¿Qué temas o áreas te apasionan?"
                                                />
                                                {errors.intereses && <p className="mt-1 text-xs text-red-500">{errors.intereses}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="descripcion" className="mb-1 block text-sm font-medium text-white">
                                                    Breve Descripción de Ti *
                                                </label>
                                                <textarea
                                                    id="descripcion"
                                                    name='descripcion'
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.descripcion}
                                                    onChange={(e) => setData('descripcion', e.currentTarget.value)}
                                                    rows={4}
                                                    placeholder="Cuéntanos quién eres, qué te motiva y qué te diferencia..."
                                                    required
                                                />
                                                {errors.descripcion && <p className="mt-1 text-xs text-red-500">{errors.descripcion}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección académica y profesional */}
                                    <div className="rounded-lg border border-gray-100 p-4" style={{ backgroundColor: 'oklch(0.28 0.03 232)' }}>
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white">
                                            <svg
                                                className="mr-2 h-5 w-5 text-blue-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                                />
                                            </svg>
                                            Formación y Experiencia
                                        </h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="formacion" className="mb-1 block text-sm font-medium text-white">
                                                    Formación Académica *
                                                </label>
                                                <textarea
                                                    id="formacion"
                                                    name="formacion"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.formacion}
                                                    onChange={(e) => setData('formacion', e.currentTarget.value)}
                                                    rows={3}
                                                    placeholder="Ej: Grado en Ingeniería Informática (Universidad de...)"
                                                    required
                                                />
                                                {errors.formacion && <p className="mt-1 text-xs text-red-500">{errors.formacion}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="experiencia_laboral" className="mb-1 block text-sm font-medium text-white">
                                                    Experiencia Laboral *
                                                </label>
                                                <textarea
                                                    id="experiencia_laboral"
                                                    name="experiencia_laboral"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.experiencia_laboral}
                                                    onChange={(e) => setData('experiencia_laboral', e.currentTarget.value)}
                                                    rows={3}
                                                    placeholder="Ej: Desarrollador Junior (Empresa X), 3 meses"
                                                    required
                                                />
                                                {errors.experiencia_laboral && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.experiencia_laboral}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección de habilidades */}
                                    <div className="rounded-lg border border-gray-100 p-4" style={{ backgroundColor: 'oklch(0.28 0.03 232)' }}>
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white">
                                            <svg
                                                className="mr-2 h-5 w-5 text-blue-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                />
                                            </svg>
                                            Habilidades
                                        </h2>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="habilidades_tecnicas" className="mb-1 block text-sm font-medium text-white">
                                                    Habilidades Técnicas (Hard Skills) *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="habilidades_tecnicas"
                                                    name="habilidades_tecnicas"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.habilidades_tecnicas}
                                                    onChange={(e) => setData('habilidades_tecnicas', e.currentTarget.value)}
                                                    placeholder="Ej: Python, SQL, JavaScript, Diseño UX/UI"
                                                    required
                                                />
                                                {errors.habilidades_tecnicas && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.habilidades_tecnicas}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="habilidades_blandas" className="mb-1 block text-sm font-medium text-white">
                                                    Habilidades Blandas (Soft Skills) *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="habilidades_blandas"
                                                    name="habilidades_blandas"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.habilidades_blandas}
                                                    onChange={(e) => setData('habilidades_blandas', e.currentTarget.value)}
                                                    placeholder="Ej: Trabajo en equipo, Liderazgo, Comunicación"
                                                    required
                                                />
                                                {errors.habilidades_blandas && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.habilidades_blandas}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="idiomas" className="mb-1 block text-sm font-medium text-white">
                                                    Idiomas (Nivel) *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="idiomas"
                                                    name="idiomas"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.idiomas}
                                                    onChange={(e) => setData('idiomas', e.currentTarget.value)}
                                                    placeholder="Ej: Inglés (B2), Francés (A1)"
                                                    required
                                                />
                                                {errors.idiomas && <p className="mt-1 text-xs text-red-500">{errors.idiomas}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="certificaciones" className="mb-1 block text-sm font-medium text-white">
                                                    Certificaciones y Cursos *
                                                </label>
                                                <textarea
                                                    id="certificaciones"
                                                    name="certificaciones"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.certificaciones}
                                                    onChange={(e) => setData('certificaciones', e.currentTarget.value)}
                                                    rows={2}
                                                    placeholder="Ej: Certificado en..., Curso de..."
                                                    required
                                                />
                                                {errors.certificaciones && <p className="mt-1 text-xs text-red-500">{errors.certificaciones}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección de intereses profesionales */}
                                    <div className="rounded-lg border border-gray-100 p-4" style={{ backgroundColor: 'oklch(0.28 0.03 232)' }}>
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white">
                                            <svg
                                                className="mr-2 h-5 w-5 text-blue-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                            Intereses Profesionales
                                        </h2>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="practicas_interes" className="mb-1 block text-sm font-medium text-white">
                                                    Tipos de Prácticas de Interés *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="practicas_interes"
                                                    name="practicas_interes"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.practicas_interes}
                                                    onChange={(e) => setData('practicas_interes', e.currentTarget.value)}
                                                    placeholder="Ej: Desarrollo Web, Marketing Digital, Investigación"
                                                    required
                                                />
                                                {errors.practicas_interes && <p className="mt-1 text-xs text-red-500">{errors.practicas_interes}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="sectores_interes" className="mb-1 block text-sm font-medium text-white">
                                                    Sectores o Industrias de Interés *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="sectores_interes"
                                                    name="sectores_interes"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.sectores_interes}
                                                    onChange={(e) => setData('sectores_interes', e.currentTarget.value)}
                                                    placeholder="Ej: Tecnología, Salud, Finanzas
                                                    required"
                                                />
                                                {errors.sectores_interes && <p className="mt-1 text-xs text-red-500">{errors.sectores_interes}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="expectativas_aprendizaje" className="mb-1 block text-sm font-medium text-white">
                                                    Expectativas de Aprendizaje (Opcional)
                                                </label>
                                                <textarea
                                                    id="expectativas_aprendizaje"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.expectativas_aprendizaje}
                                                    onChange={(e) => setData('expectativas_aprendizaje', e.currentTarget.value)}
                                                    rows={3}
                                                    placeholder="Ej: Aplicar conocimientos, aprender sobre la industria..."
                                                />
                                                {errors.expectativas_aprendizaje && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.expectativas_aprendizaje}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="premios" className="mb-1 block text-sm font-medium text-white">
                                                    Premios y Reconocimientos (Opcional) 
                                                </label>
                                                <textarea
                                                    id="premios"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.premios}
                                                    onChange={(e) => setData('premios', e.currentTarget.value)}
                                                    rows={2}
                                                    placeholder="Ej: Premio a..., Reconocimiento por..."
                                                />
                                                {errors.premios && <p className="mt-1 text-xs text-red-500">{errors.premios}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección de disponibilidad */}
                                    <div className="rounded-lg border border-gray-100 p-4" style={{ backgroundColor: 'oklch(0.28 0.03 232)' }}>
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white">
                                            <svg
                                                className="mr-2 h-5 w-5 text-blue-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            Disponibilidad
                                        </h2>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="disponibilidad" className="mb-1 block text-sm font-medium text-white">
                                                    Disponibilidad para Prácticas *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="disponibilidad"
                                                    name="disponibilidad"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.disponibilidad}
                                                    onChange={(e) => setData('disponibilidad', e.currentTarget.value)}
                                                    placeholder="Ej: Junio-Agosto 2025, 3 meses"
                                                    required
                                                />
                                                {errors.disponibilidad && <p className="mt-1 text-xs text-red-500">{errors.disponibilidad}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="modalidad_practicas" className="mb-1 block text-sm font-medium text-white">
                                                    Modalidad de Prácticas Preferida *
                                                </label>
                                                <select
                                                    id="modalidad_practicas"
                                                    name="modalidad_practicas"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:ring-2 focus:outline-none"
                                                    value={data.modalidad_practicas}
                                                    onChange={(e) => setData('modalidad_practicas', e.currentTarget.value)}
                                                    required
                                                >
                                                    <option value="">Selecciona una opción</option>
                                                    <option value="presencial">Presencial</option>
                                                    <option value="remota">Remota</option>
                                                    <option value="hibrida">Híbrida</option>
                                                </select>
                                                {errors.modalidad_practicas && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.modalidad_practicas}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección de enlaces y otros */}
                                    <div className="rounded-lg border border-gray-100 p-4" style={{ backgroundColor: 'oklch(0.28 0.03 232)' }}>
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white">
                                            <svg
                                                className="mr-2 h-5 w-5 text-blue-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                                />
                                            </svg>
                                            Enlaces y Otros Datos
                                        </h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="referencias" className="mb-1 block text-sm font-medium text-white">
                                                    Referencias (Opcional)
                                                </label>
                                                <textarea
                                                    id="referencias"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.referencias}
                                                    onChange={(e) => setData('referencias', e.currentTarget.value)}
                                                    rows={3}
                                                    placeholder="Ej: Nombre y cargo de la persona de referencia"
                                                />
                                                {errors.referencias && <p className="mt-1 text-xs text-red-500">{errors.referencias}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botón de envío */}
                                    <div className="flex justify-center pt-5">
                                        <button
                                            type="submit"
                                            className="focus:ring-opacity-50 transform rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <span className="flex items-center">
                                                    <svg
                                                        className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Guardando...
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <svg
                                                        className="mr-2 h-5 w-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                                                        />
                                                    </svg>
                                                    Guardar Perfil
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
