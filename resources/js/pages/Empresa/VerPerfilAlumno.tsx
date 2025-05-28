import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-empresa';
import { type BreadcrumbItem } from '@/types';
import { type AlumnoType } from '@/types/alumno';
import { useState, useEffect } from 'react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { MessageCircle } from 'lucide-react';

interface Props {
    alumno: AlumnoType;
    oferta_id: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Perfil de Alumno',
        href: '#',
    }
];

export default function VerPerfilAlumno({ alumno, oferta_id }: Props) {
    const [isVisible, setIsVisible] = useState(false);
    const [sectionsVisible, setSectionsVisible] = useState(false);

    // Animaciones de entrada
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


    const handleActualizarEstado = (nuevoEstado: 'seleccionado' | 'rechazado') => {
        const alumnoId = alumno.alumno_id;
        const url = `/empresa/alumno/${oferta_id}/${alumnoId}/actualizarEstado`;
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        if (!csrfToken) {
            console.error('Token CSRF no encontrado.');
            alert('Error: No se pudo actualizar el estado.');
            return;
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({ estado: nuevoEstado }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else if (data.error) {
                alert(`Error al actualizar el estado: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error al enviar la solicitud de actualización:', error);
            alert('Ocurrió un error al actualizar el estado.');
        });
    };

    const handleSeleccionar = () => {
        handleActualizarEstado('seleccionado');
    };

    const handleRechazar = () => {
        handleActualizarEstado('rechazado');
    };

    // Función para mostrar los datos con manejo de valores vacíos
    const renderField = (value: string | null, defaultText: string = 'No especificado') => {
        return value && value.trim() !== '' ? value : defaultText;
    };

    console.log('FOTO PERFIL ' + alumno.foto_perfil_path);
    
    // Convertir cadenas separadas por comas en arrays para mostrarlas como badges
    const renderTags = (tagString: string) => {
        if (!tagString || tagString.trim() === '') return <span className="text-gray-500 italic">No especificado</span>;
        
        const tags = tagString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        
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
                <Head title={`${alumno.nombre} ${alumno.apellidos}`} />
                <meta name="csrf-token" content="{{ csrf_token() }}"></meta>
                
                <div className={`w-full m-4 max-w-5xl mx-auto bg-transparent rounded-lg shadow-lg overflow-hidden transition-all duration-1000 transform ${
                    isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}>
                    
                    {/* Header con foto y datos principales */}
                    <div className={`bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white p-6 m-4 rounded-2xl flex md:flex-row items-start justify-between shadow-2xl transition-all duration-700 delay-200 transform ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            {/* Foto de perfil con animación */}
                            <div className={`relative transition-all duration-700 delay-400 transform ${
                                isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-12'
                            }`}>
                                {alumno.foto_perfil_path ? (
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse"></div>
                                        <img
                                            src={`/storage/${alumno.foto_perfil_path}`}
                                            alt={`${alumno.nombre} ${alumno.apellidos}`}
                                            className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-xl transition-all duration-300 transform group-hover:scale-105"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center border-4 border-white shadow-xl group hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                        <span className="text-4xl text-white font-bold">
                                            {alumno.nombre.charAt(0)}{alumno.apellidos.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Información principal */}
                            <div className={`text-center md:text-left flex-grow transition-all duration-700 delay-500 transform ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                                    {`${alumno.nombre} ${alumno.apellidos}`}
                                </h1>
                                
                                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                                    {alumno.localidad && (
                                        <div className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="font-medium">{alumno.localidad}</span>
                                        </div>
                                    )}
                                    {alumno.fecha_nacimiento && (
                                        <div className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="font-medium">{alumno.fecha_nacimiento}</span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Enlaces de descarga */}
                                <div className="mt-2 flex flex-col gap-4">
                                    {/* Email y teléfono lado a lado */}
                                    <div className="flex flex-wrap gap-4 text-white justify-center md:justify-start">
                                        {alumno.email ? (
                                            <p className="flex items-center gap-2">
                                                <EnvelopeIcon className="h-5 w-5 text-gray-300" />
                                                {alumno.email}
                                            </p>
                                        ) : (
                                            <p className="text-gray-500 italic">Email no disponible</p>
                                        )}

                                        {alumno.telefono ? (
                                            <p className="flex items-center gap-2">
                                                <PhoneIcon className="h-5 w-5 text-gray-300" />
                                                {alumno.telefono}
                                            </p>
                                        ) : (
                                            <p className="text-gray-500 italic">Teléfono no disponible</p>
                                        )}
                                    </div>

                                    {/* Enlaces lado a lado */}
                                    <div className="flex flex-wrap gap-3">
                                        {alumno.cv_path && (
                                            <a
                                                href={`/storage/${alumno.cv_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50 transform hover:scale-105"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                Descargar CV
                                            </a>
                                        )}
                                        {alumno.portafolio && (
                                            <a
                                                href={alumno.portafolio}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50 transform hover:scale-105"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                Ver Portafolio
                                            </a>
                                        )}
                                    </div>

                                    
                                </div>
                            </div>
                        </div>
                        
                        {/* Botones de acción */}
                        <div className={`flex flex-col items-end gap-3 mt-4 md:mt-0 transition-all duration-700 delay-600 transform ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                        }`}>
                            {/* <a href={`/chat/${alumno.alumno_id}`}> */}
                                <button onClick={() => window.location.href = `/chat?user=${alumno.alumno_id}`}
                                    className="group bg-gradient-to-r w-50 from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-300 min-w-[140px]">
                                    <div className="flex items-center justify-center gap-2">
                                        <MessageCircle className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300"></MessageCircle>
                                        Enviar mensaje
                                    </div>
                                </button>
                            {/* </a> */}
                            <button 
                                onClick={handleSeleccionar} 
                                className="group bg-gradient-to-r w-50 from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 min-w-[140px]"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Seleccionar
                                </div>
                            </button>
                            
                            <button 
                                onClick={handleRechazar} 
                                className="group bg-gradient-to-r w-50 from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-300 min-w-[140px]"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Rechazar
                                </div>
                            </button>
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
                                {renderField(alumno.descripcion, 'El alumno no ha proporcionado una descripción sobre sí mismo.')}
                            </p>
                        </div>
                        
                        {/* Secciones en grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Columna izquierda */}
                            <div className="space-y-8">
                                {/* Formación */}
                                <div className={`transition-all duration-500 delay-900 transform ${
                                    sectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                    <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400 border-b border-blue-200 dark:border-blue-700 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                        </svg>
                                        Formación
                                    </h2>
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border border-blue-100 dark:border-gray-600">
                                        <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                                            {renderField(alumno.formacion, 'No se ha especificado información sobre la formación académica.')}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Experiencia Laboral */}
                                <div className={`transition-all duration-500 delay-1000 transform ${
                                    sectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                    <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400 border-b border-blue-200 dark:border-blue-700 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Experiencia Laboral
                                    </h2>
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border border-green-100 dark:border-gray-600">
                                        <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                                            {renderField(alumno.experiencia_laboral, 'No se ha especificado información sobre experiencia laboral previa.')}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Habilidades */}
                                <div className={`transition-all duration-500 delay-1100 transform ${
                                    sectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                    <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400 border-b border-blue-200 dark:border-blue-700 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        Habilidades
                                    </h2>
                                    
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-purple-100 dark:border-gray-600 space-y-4">
                                        <div>
                                            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                                Habilidades Técnicas
                                            </h3>
                                            {renderTags(alumno.habilidades_tecnicas)}
                                        </div>
                                        
                                        <div>
                                            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                                Habilidades Blandas
                                            </h3>
                                            {renderTags(alumno.habilidades_blandas)}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Idiomas */}
                                <div className={`transition-all duration-500 delay-1200 transform ${
                                    sectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                    <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400 border-b border-blue-200 dark:border-blue-700 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                        </svg>
                                        Idiomas
                                    </h2>
                                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border border-yellow-100 dark:border-gray-600">
                                        {renderTags(alumno.idiomas)}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Columna derecha */}
                            <div className="space-y-8">
                                {/* Intereses */}
                                <div className={`transition-all duration-500 delay-1300 transform ${
                                    sectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                    <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400 border-b border-blue-200 dark:border-blue-700 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        Intereses
                                    </h2>
                                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border border-rose-100 dark:border-gray-600">
                                        {renderTags(alumno.intereses)}
                                    </div>
                                </div>
                                
                                {/* Prácticas */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-blue-800 border-b border-gray-200 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Sobre las Prácticas
                                    </h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold text-white-700">Prácticas de Interés</h3>
                                            {renderTags(alumno.practicas_interes)}
                                        </div>
                                        
                                        <div>
                                            <h3 className="font-semibold text-white-700">Sectores de Interés</h3>
                                            {renderTags(alumno.sectores_interes)}
                                        </div>
                                        
                                        <div>
                                            <h3 className="font-semibold text-white-700">Modalidad de Prácticas</h3>
                                            {renderTags(alumno.modalidad_practicas)}
                                        </div>
                                        
                                        <div>
                                            <h3 className="font-semibold text-white-700">Disponibilidad</h3>
                                            {renderTags(alumno.disponibilidad)}
                                        </div>
                                        
                                        <div>
                                            <h3 className="font-semibold text-white-700">Expectativas de Aprendizaje</h3>
                                            {renderTags(alumno.expectativas_aprendizaje)}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Logros */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-blue-800 border-b border-gray-200 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                        Logros y Certificaciones
                                    </h2>
                                    
                                    {alumno.certificaciones && (
                                        <div className="mb-4">
                                            <h3 className="font-semibold text-white-700 mb-1">Certificaciones</h3>
                                            {renderTags(alumno.certificaciones)}
                                        </div>
                                    )}
                                    
                                    {alumno.premios && (
                                        <div>
                                            <h3 className="font-semibold text-white-700 mb-1">Premios y Reconocimientos</h3>
                                            <p className="text-white-700 whitespace-pre-line">
                                                {renderField(alumno.premios)}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {!alumno.certificaciones && !alumno.premios && (
                                        <p className="text-white-500 italic">No se han especificado certificaciones o premios.</p>
                                    )}
                                </div>
                                
                                {/* Referencias */}
                                {alumno.referencias && (
                                    <div className="mb-8">
                                        <h2 className="text-xl font-bold text-blue-800 border-b border-gray-200 pb-2 mb-4 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Referencias
                                        </h2>
                                        <p className="text-white-700 whitespace-pre-line">
                                            {renderField(alumno.referencias)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </AppLayout>
        </>
    );
}