import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-empresa';
import { type BreadcrumbItem } from '@/types';
import { type AlumnoType } from '@/types/alumno';

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
            // Opcional: Actualizar la interfaz de usuario
            // if (onEstadoCambiado) {
            //     onEstadoCambiado(alumnoId, nuevoEstado);
            // }
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
        if (!tagString || tagString.trim() === '') return <span className="text-white-500 italic">No especificado</span>;
        
        const tags = tagString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        
        return (
            <div className="flex flex-wrap gap-2 mt-1">
                {tags.map((tag, index) => (
                    <span 
                        key={index} 
                        className=" text-white-700 px-2 py-1 rounded-md text-xs font-medium"
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
                <div className="w-full m-4 max-w-5xl mx-auto bg-transparent rounded-lg shadow-lg overflow-hidden">
                    {/* Header con foto y datos principales */}
                    <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-6 m-4 rounded-lg flex md:flex-row items-start justify-between">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="relative">
                            {alumno.foto_perfil_path ? (
                                <img
                                src={`/storage/${alumno.foto_perfil_path}`}
                                alt={`${alumno.nombre} ${alumno.apellidos}`}
                                className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-lg"
                                />
                            ) : (
                                <div className="w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center border-4 border-white shadow-lg">
                                <span className="text-4xl text-white-600">
                                    {alumno.nombre.charAt(0)}{alumno.apellidos.charAt(0)}
                                </span>
                                </div>
                            )}
                            </div>

                            <div className="text-center md:text-left flex-grow">
                            <h1 className="text-3xl font-bold">{`${alumno.nombre} ${alumno.apellidos}`}</h1>
                            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                                {alumno.localidad && (
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{alumno.localidad}</span>
                                </div>
                                )}
                                {alumno.fecha_nacimiento && (
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{alumno.fecha_nacimiento}</span>
                                </div>
                                )}
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                                {alumno.cv_path && (
                                <a
                                    href={`/storage/${alumno.cv_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1 bg-gray-900 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-50 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                    className="inline-flex items-center px-3 py-1 bg-gray-900 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-50 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Ver Portafolio
                                </a>
                                )}
                            </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
                            <button className="bg-green-500 cursor-pointer w-35 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-200 transform hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Contactar
                            </button>
                            <button onClick={ handleSeleccionar } className="bg-blue-500 w-35 cursor-pointer hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-200 transform hover:scale-105">
                            Seleccionar
                            </button>
                            <button onClick={ handleRechazar } className="bg-red-500 w-35 cursor-pointer hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-200 transform hover:scale-105">
                            Rechazar
                            </button>
                        </div>
                        </div>         
                    {/* Contenido principal organizado en pestañas/secciones */}
                    <div className="p-6">
                        {/* Acerca de */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-white border-b border-gray-200 pb-2 mb-4">
                                Acerca de
                            </h2>
                            <p className="text-white whitespace-pre-line">
                                {renderField(alumno.descripcion, 'El alumno no ha proporcionado una descripción sobre sí mismo.')}
                            </p>
                        </div>
                        
                        {/* Secciones en grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Columna izquierda */}
                            <div>
                                {/* Formación */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-blue-800 border-b border-gray-200 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                        </svg>
                                        Formación
                                    </h2>
                                    <div className="whitespace-pre-line text-white-700">
                                        {renderField(alumno.formacion, 'No se ha especificado información sobre la formación académica.')}
                                    </div>
                                </div>
                                
                                {/* Experiencia Laboral */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-blue-800 border-b border-gray-200 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Experiencia Laboral
                                    </h2>
                                    <div className="whitespace-pre-line text-white-700">
                                        {renderField(alumno.experiencia_laboral, 'No se ha especificado información sobre experiencia laboral previa.')}
                                    </div>
                                </div>
                                
                                {/* Habilidades */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-blue-800 border-b border-gray-200 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        Habilidades
                                    </h2>
                                    
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-white-700 mb-1">Habilidades Técnicas</h3>
                                        {renderTags(alumno.habilidades_tecnicas)}
                                    </div>
                                    
                                    <div>
                                        <h3 className="font-semibold text-white-700 mb-1">Habilidades Blandas</h3>
                                        {renderTags(alumno.habilidades_blandas)}
                                    </div>
                                </div>
                                
                                {/* Idiomas */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-blue-800 border-b border-gray-200 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                        </svg>
                                        Idiomas
                                    </h2>
                                    {renderTags(alumno.idiomas)}
                                </div>
                            </div>
                            
                            {/* Columna derecha */}
                            <div>
                                {/* Intereses */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-blue-800 border-b border-gray-200 pb-2 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        Intereses
                                    </h2>
                                    {renderTags(alumno.intereses)}
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
                                            <p className="text-white-700 mt-1">{renderField(alumno.modalidad_practicas)}</p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="font-semibold text-white-700">Disponibilidad</h3>
                                            <p className="text-white-700 mt-1">{renderField(alumno.disponibilidad)}</p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="font-semibold text-white-700">Expectativas de Aprendizaje</h3>
                                            <p className="text-white-700 mt-1 whitespace-pre-line">
                                                {renderField(alumno.expectativas_aprendizaje)}
                                            </p>
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
                                            <p className="text-white-700 whitespace-pre-line">
                                                {renderField(alumno.certificaciones)}
                                            </p>
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