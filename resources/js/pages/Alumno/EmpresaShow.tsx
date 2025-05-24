import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-empresa';
import { type BreadcrumbItem } from '@/types';
import { type EmpresaType } from '@/types/empresa';
import { useState, useEffect } from 'react';

interface Props {
    empresa: EmpresaType;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard', 
        href: '/dashboard',
    },
    {
        title: 'Perfil de Empresa', 
        href: '#', 
    }
];

export default function VerPerfilempresa({ empresa }: Props) {
    const [isVisible, setIsVisible] = useState(false);
    const [sectionsVisible, setSectionsVisible] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        const timer2 = setTimeout(() => {
            setSectionsVisible(true);
        }, 400);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const renderField = (value: string | number | null | undefined, defaultText: string = 'No especificado') => {
        if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
            return <span className="text-gray-500 italic">{defaultText}</span>;
        }
        return value;
    };

    const renderTags = (tagString: string | null | undefined, defaultText: string = 'No especificado') => {
        if (!tagString || tagString.trim() === '') {
            return <span className="text-gray-500 italic">{defaultText}</span>;
        }

        const tags = tagString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

        if (tags.length === 0) {
            return <span className="text-gray-500 italic">{defaultText}</span>;
        }

        return (
            <div className="flex flex-wrap gap-2 mt-1">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-700 hover:shadow-md transition-all duration-200 transform hover:scale-105"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <>

            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={`${empresa.nombre} - Perfil`} />
        
                <div className={`w-full m-4 max-w-5xl mx-auto bg-transparent rounded-lg shadow-lg overflow-hidden transition-all duration-1000 transform ${
                    isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}>

                    {/* Header con foto y datos principales */}
                    <div className={`bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white p-6 m-4 rounded-2xl flex flex-col md:flex-row items-center md:items-start justify-between shadow-2xl transition-all duration-700 delay-200 transform ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full md:w-auto">
                            {/* Información principal */}
                            <div className={`text-center md:text-left flex-grow transition-all duration-700 delay-500 transform ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                                    {empresa.nombre.toUpperCase()}
                                </h1>

                                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                                    {empresa.ubicacion && (
                                        <div className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="font-medium">{empresa.ubicacion}</span>
                                        </div>
                                    )}
                                    {empresa.sitio_web && (
                                        <a
                                            href={empresa.sitio_web.startsWith('http') ? empresa.sitio_web : `https://${empresa.sitio_web}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            <span className="font-medium">{empresa.sitio_web.replace(/(^\w+:|^)\/\//, '')}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenido principal organizado en secciones */}
                    <div className={`p-6 transition-all duration-700 delay-700 transform ${
                        sectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                        {/* Acerca de */}
                        <div className={`mb-8 transition-all duration-500 delay-800 transform ${
                            sectionsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                        }`}>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white border-b-2 border-gradient-to-r from-blue-500 to-purple-500 pb-3 mb-6 flex items-center">
                                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
                                Acerca de
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed text-lg">
                                {renderField(empresa.descripcion, 'La empresa no ha proporcionado una descripción sobre sí misma.')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-8">
                                {/* Información general */}
                                <div className={`transition-all duration-500 delay-900 transform ${
                                    sectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                    <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400 border-b border-blue-200 dark:border-blue-700 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Detalles de la Empresa
                                    </h2>
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border border-blue-100 dark:border-gray-600">
                                        <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                                            <li><strong className="font-semibold text-white">CIF/NIF:</strong> {renderField(empresa.cif_nif)}</li>
                                            <li><strong className="font-semibold text-white">Sector de Actividad:</strong> {renderField(empresa.sector_actividad)}</li>
                                            <li><strong className="font-semibold text-white">Nº Empleados:</strong> {renderField(empresa.num_empleados, 'No especificado')}</li>
                                            <li><strong className="font-semibold text-white">Prácticas Remuneradas:</strong> {empresa.practicas_remuneradas ? 'Sí' : 'No'}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Áreas de Prácticas */}
                                <div className={`transition-all duration-500 delay-1000 transform ${
                                    sectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                    <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400 border-b border-blue-200 dark:border-blue-700 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h4a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        Áreas de Prácticas
                                    </h2>
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border border-green-100 dark:border-gray-600">
                                        {renderTags(empresa.areas_practicas, 'No se han especificado áreas de práctica.')}
                                    </div>
                                </div>

                                {/* Información de Contacto */}
                                <div className={`transition-all duration-500 delay-1100 transform ${
                                    sectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                    <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400 border-b border-blue-200 dark:border-blue-700 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Contacto
                                    </h2>
                                    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border border-red-100 dark:border-gray-600">
                                        <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                                            <li><strong className="font-semibold text-white">Persona de Contacto:</strong> {renderField(empresa.contacto_nombre)}</li>
                                            <li><strong className="font-semibold text-white">Email:</strong> {renderField(empresa.contacto_email)}</li>
                                            <li><strong className="font-semibold text-white">Teléfono:</strong> {renderField(empresa.contacto_telefono)}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}