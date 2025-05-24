import AppLayout from '@/layouts/app-layout-alumno';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

interface AlumnoData {
    nombre: string;
    apellidos: string;
    fecha_nacimiento: string;
    localidad: string;
    email: string;
    telefono: string;
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
    cv_url?: string;
    foto_perfil_url?: string; 
}


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
    email: string;
    telefono: string;
    [key: string]: string | number | boolean | File | null;
}

interface CompleteProfileProps {
    alumno: AlumnoData | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/alumno/dashboard',
    },
];

export default function CompletaPerfil({ alumno }: CompleteProfileProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const [cvPreviewUrl, setCvPreviewUrl] = useState<string | null>(null);
    const [fotoPerfilPreviewUrl, setFotoPerfilPreviewUrl] = useState<string | null>(null);
    const [cvDisplayName, setCvDisplayName] = useState<string | null>(null); // Para mostrar el nombre del CV (existente o nuevo)
    const [fotoPerfilDisplayName, setFotoPerfilDisplayName] = useState<string | null>(null); // Para mostrar el nombre de la foto (existente o nueva)

    const { data, setData, post, processing, errors } = useForm<FormData>({

        cv: null,
        foto_perfil: null,
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
        telefono: alumno?.telefono || '',
        email: alumno?.email || '',
    });

    useEffect(() => {
        if (alumno) {
            if (alumno.cv_url) {
                setCvPreviewUrl(alumno.cv_url);
                setCvDisplayName(alumno.cv_url.split('/').pop() || 'CV existente');
            }
            if (alumno.foto_perfil_url) {
                setFotoPerfilPreviewUrl(alumno.foto_perfil_url);
                setFotoPerfilDisplayName(alumno.foto_perfil_url.split('/').pop() || 'Foto existente');
            }
        }
    }, [alumno]); 

    const handleCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0] || null;
        setData('cv', file); 

        if (file) {
            setCvDisplayName(file.name); 
            
        } else {
          
            if (alumno?.cv_url) {
                setCvDisplayName(alumno.cv_url.split('/').pop() || 'CV existente');
                setCvPreviewUrl(alumno.cv_url);
            } else {
                setCvDisplayName(null);
                setCvPreviewUrl(null);
            }
        }
    };

    const handleFotoPerfilChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0] || null;
        setData('foto_perfil', file); 

        if (file) {
            setFotoPerfilDisplayName(file.name);
            setFotoPerfilPreviewUrl(URL.createObjectURL(file)); 
        } else {

            if (alumno?.foto_perfil_url) {
                setFotoPerfilDisplayName(alumno.foto_perfil_url.split('/').pop() || 'Foto existente');
                setFotoPerfilPreviewUrl(alumno.foto_perfil_url);
            } else {
                setFotoPerfilDisplayName(null);
                setFotoPerfilPreviewUrl(null);
            }
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('alumno.perfil.guardar'), {
            forceFormData: true, 
        });
    };

    const [progress, setProgress] = useState<number>(0);


    useEffect(() => {
        const form = formRef.current;
        if (form) {
            const inputs = Array.from(form.querySelectorAll('input:not([type="file"]), textarea, select'));
            let filledFields = 0;
            let totalFields = inputs.length;

            inputs.forEach((input) => {
                if (
                    (input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value.trim() !== '' ||
                    (input as HTMLInputElement).type === 'date' 
                ) {
                    filledFields++;
                }
            });

           
            if (cvPreviewUrl || data.cv) {
                filledFields++;
            }
            totalFields++; 

           
            if (fotoPerfilPreviewUrl || data.foto_perfil) {
                filledFields++;
            }
            totalFields++; 


            const newProgress = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
            setProgress(newProgress);
        }
    }, [data, cvPreviewUrl, fotoPerfilPreviewUrl]);

    const progressBarColorClass = progress < 30 ? 'bg-red-500' : progress < 70 ? 'bg-yellow-500' : 'bg-green-500';

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Completa tu Perfil" />
                <div className="min-h-screen w-full ">
                    <div className="mx-auto max-w-4xl p-6 bg-">
                        <div className="overflow-hidden rounded-lg shadow-xl">

                            <div className="relative p-6 text-white font-bold" style={{ backgroundColor: '#328c8c'}}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold">Completa tu Perfil</h1>
                                        <p className="mt-2 opacity-90">Personaliza tu información para destacar ante las empresas</p>
                                    </div>
                                    <div className="hidden md:block">
                                        <svg
                                            className="h-24 w-24 text-white font-bold/20"
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
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white font-bold">
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
                                                <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-white font-bold-700">
                                                    Nombre *
                                                </label>
                                                <input
                                                    type="text"
                                                    name = 'nombre'
                                                    id="nombre"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.nombre}
                                                    onChange={(e) => setData('nombre', e.currentTarget.value)}
                                                    required
                                                />
                                                {errors.nombre && <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="apellidos" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Apellidos *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="apellidos"
                                                    name = 'apellidos'
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.apellidos}
                                                    onChange={(e) => setData('apellidos', e.currentTarget.value)}
                                                    required
                                                />
                                                {errors.apellidos && <p className="mt-1 text-xs text-red-500">{errors.apellidos}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="fecha_nacimiento" className="mb-1 block text-sm font-medium text-white font-bold-700">
                                                    Fecha de Nacimiento *
                                                </label>
                                                <input
                                                    type="date"
                                                    id="fecha_nacimiento"
                                                    name="apellidos"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.fecha_nacimiento}
                                                    onChange={(e) => setData('fecha_nacimiento', e.currentTarget.value)}
                                                    required
                                                />
                                                {errors.fecha_nacimiento && <p className="mt-1 text-xs text-red-500">{errors.fecha_nacimiento}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="localidad" className="mb-1 block text-sm font-medium text-white font-bold-700">
                                                    Localidad *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="localidad"
                                                    name="localidad"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.localidad}
                                                    onChange={(e) => setData('localidad', e.currentTarget.value)}
                                                    required
                                                />
                                                {errors.localidad && <p className="mt-1 text-xs text-red-500">{errors.localidad}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="telefono" className="mb-1 block text-sm font-medium text-white font-bold-700">
                                                    telefono *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="telefono"
                                                    name="telefono"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.telefono}
                                                    onChange={(e) => setData('telefono', e.currentTarget.value)}
                                                    required
                                                />
                                                {errors.telefono && <p className="mt-1 text-xs text-red-500">{errors.telefono}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="mb-1 block text-sm font-medium text-white font-bold-700">
                                                    email *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.currentTarget.value)}
                                                    required
                                                />
                                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección de archivos */}
                                    <div className="rounded-lg border border-gray-100" style={{ backgroundColor: 'oklch(0.28 0.03 232)' }}>
                                        <h2 className="mb-4 flex items-center m-4 text-lg font-semibold text-white font-bold">
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
                                    
                                        {/* CV y Foto de Perfil */}
                                            {/* Campo de CV */}
                                        <div className=' md:grid-cols-2 flex gap-1 max-w-max'>
                                            <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-blue-400">
                                                <label htmlFor="cv" className="block cursor-pointer">
                                                    {cvPreviewUrl && !data.cv ? ( 
                                                    <div className='flex flex-col justify-center align-center justify-items-center col-span-6'>
                                                        <span className="mt-2 block mb-4 font-medium text-white font-bold">CV (PDF)</span>
                                                        <span className="text-sm text-gray-500 mb-4">Haz clic para subir o arrastra tu archivo</span>
                                                        <a href={cvPreviewUrl} target="_blank" rel="noopener noreferrer" className="block text-blue-500 hover:underline">
                                                            <span className="mt-2 block font-medium text-white font-bold">Ver CV actual</span>
                                                            <span className='block text-sm text-gray-400 **truncate** max-w-full'>{cvDisplayName}</span>
                                                        </a>
                                                    </div>
                                                ) : ( 
                                                    <>
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
                                                        <span className="mt-2 block font-medium text-white font-bold">CV (PDF)</span>
                                                        <span className="text-sm text-gray-500">Haz clic para subir o arrastra tu archivo</span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    name='cv'
                                                    id="cv"
                                                    style={{ color: 'transparent' }}
                                                    onChange={handleCvChange}
                                                    accept=".pdf"
                                                    // `required` solo si no hay un CV existente
                                                    required={!alumno?.cv_url}
                                                />
                                            </label>
                                            {errors.cv && <p className="mt-1 text-xs text-red-500">{errors.cv}</p>}
                                        </div>
                                    
                                {/* Campo de Foto de Perfil */}
                                <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-blue-400">
                                    <label htmlFor="foto_perfil" className="block cursor-pointer">
                                        {/* Previsualización de la Foto de Perfil existente o nueva */}
                                        {fotoPerfilPreviewUrl && !data.foto_perfil ? ( 
                                            <img src={fotoPerfilPreviewUrl} alt="Previsualización de Foto de Perfil" className="mx-auto h-24 w-24 rounded-full object-cover" />
                                                ) : data.foto_perfil ? ( 
                                                    <img src={URL.createObjectURL(data.foto_perfil)} alt="Previsualización de Nueva Foto" className="mx-auto h-24 w-24 rounded-full object-cover" />
                                                ) : ( 
                                                    <>
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
                                                        <span className="mt-2 block font-medium text-white font-bold">Foto de Perfil</span>
                                                    </>
                                                )}
                                                <span className="text-sm text-gray-500">Imagen en formato JPG, PNG</span>
                                                <input
                                                    type="file"
                                                    id="foto_perfil"
                                                    name="foto_perfil"
                                                    style={{ color: 'transparent' }}
                                                    onChange={handleFotoPerfilChange}
                                                    accept="image/*"

                                                    required={!alumno?.foto_perfil_url}
                                                />
                                            </label>
                                            {fotoPerfilDisplayName && <p className="mt-2 text-sm font-medium text-blue-600">{fotoPerfilDisplayName}</p>}
                                            {errors.foto_perfil && <p className="mt-1 text-xs text-red-500">{errors.foto_perfil}</p>}
                                        </div>
                                    </div>
                                </div>
                                    {/* Sección sobre ti */}
                                    <div className="rounded-lg border border-gray-100 p-4" style={{ backgroundColor: 'oklch(0.28 0.03 232)' }}>
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white font-bold">
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
                                                <label htmlFor="intereses" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Define tus Intereses *
                                                </label>
                                                <textarea
                                                    id="intereses"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.intereses}
                                                    onChange={(e) => setData('intereses', e.currentTarget.value)}
                                                    rows={3}
                                                    placeholder="¿Qué temas o áreas te apasionan?"
                                                />
                                                {errors.intereses && <p className="mt-1 text-xs text-red-500">{errors.intereses}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="descripcion" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Breve Descripción de Ti *
                                                </label>
                                                <textarea
                                                    id="descripcion"
                                                    name='descripcion'
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white font-bold">
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
                                                <label htmlFor="formacion" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Formación Académica *
                                                </label>
                                                <textarea
                                                    id="formacion"
                                                    name="formacion"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.formacion}
                                                    onChange={(e) => setData('formacion', e.currentTarget.value)}
                                                    rows={3}
                                                    placeholder="Ej: Grado en Ingeniería Informática (Universidad de...)"
                                                    required
                                                />
                                                {errors.formacion && <p className="mt-1 text-xs text-red-500">{errors.formacion}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="experiencia_laboral" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Experiencia Laboral *
                                                </label>
                                                <textarea
                                                    id="experiencia_laboral"
                                                    name="experiencia_laboral"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white font-bold">
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
                                                <label htmlFor="habilidades_tecnicas" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Habilidades Técnicas (Hard Skills) *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="habilidades_tecnicas"
                                                    name="habilidades_tecnicas"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                                                <label htmlFor="habilidades_blandas" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Habilidades Blandas (Soft Skills) *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="habilidades_blandas"
                                                    name="habilidades_blandas"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                                                <label htmlFor="idiomas" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Idiomas (Nivel) *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="idiomas"
                                                    name="idiomas"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.idiomas}
                                                    onChange={(e) => setData('idiomas', e.currentTarget.value)}
                                                    placeholder="Ej: Inglés (B2), Francés (A1)"
                                                    required
                                                />
                                                {errors.idiomas && <p className="mt-1 text-xs text-red-500">{errors.idiomas}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="certificaciones" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Certificaciones y Cursos *
                                                </label>
                                                <textarea
                                                    id="certificaciones"
                                                    name="certificaciones"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white font-bold">
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
                                                <label htmlFor="practicas_interes" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Tipos de Prácticas de Interés *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="practicas_interes"
                                                    name="practicas_interes"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.practicas_interes}
                                                    onChange={(e) => setData('practicas_interes', e.currentTarget.value)}
                                                    placeholder="Ej: Desarrollo Web, Marketing Digital, Investigación"
                                                    required
                                                />
                                                {errors.practicas_interes && <p className="mt-1 text-xs text-red-500">{errors.practicas_interes}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="sectores_interes" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Sectores o Industrias de Interés *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="sectores_interes"
                                                    name="sectores_interes"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.sectores_interes}
                                                    onChange={(e) => setData('sectores_interes', e.currentTarget.value)}
                                                    placeholder="Ej: Tecnología, Salud, Finanzas
                                                    required"
                                                />
                                                {errors.sectores_interes && <p className="mt-1 text-xs text-red-500">{errors.sectores_interes}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="expectativas_aprendizaje" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Expectativas de Aprendizaje (Opcional)
                                                </label>
                                                <textarea
                                                    id="expectativas_aprendizaje"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                                                <label htmlFor="premios" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Premios y Reconocimientos (Opcional) 
                                                </label>
                                                <textarea
                                                    id="premios"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white font-bold">
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
                                                <label htmlFor="disponibilidad" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Disponibilidad para Prácticas *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="disponibilidad"
                                                    name="disponibilidad"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={data.disponibilidad}
                                                    onChange={(e) => setData('disponibilidad', e.currentTarget.value)}
                                                    placeholder="Ej: Junio-Agosto 2025, 3 meses"
                                                    required
                                                />
                                                {errors.disponibilidad && <p className="mt-1 text-xs text-red-500">{errors.disponibilidad}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="modalidad_practicas" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Modalidad de Prácticas Preferida *
                                                </label>
                                                <select
                                                    id="modalidad_practicas"
                                                    name="modalidad_practicas"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:ring-2 focus:outline-none"
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
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-white font-bold">
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
                                                <label htmlFor="referencias" className="mb-1 block text-sm font-medium text-white font-bold">
                                                    Referencias (Opcional)
                                                </label>
                                                <textarea
                                                    id="referencias"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-white transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                                            className="focus:ring-opacity-50 transform rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-bold text-white font-bold shadow-md transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <span className="flex items-center">
                                                    <svg
                                                        className="mr-2 -ml-1 h-4 w-4 animate-spin text-white font-bold"
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
