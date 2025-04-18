import { Head } from '@inertiajs/react';

interface Props {
    alumno: AlumnoType;
}

interface AlumnoType {
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
}

export default function VerPerfilAlumno({ alumno }: Props) {
    return (
        <>
            <Head title={`${alumno.nombre} ${alumno.apellidos}`} />
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4 text-black">{`${alumno.nombre} ${alumno.apellidos}`}</h1>

                {alumno.foto_perfil && (
                    <img
                        src={`/storage/${alumno.foto_perfil}`}
                        alt={`${alumno.nombre} ${alumno.apellidos}`}
                        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                    />
                )}

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Fecha de Nacimiento:</strong>
                    <span>{alumno.fecha_nacimiento || 'No especificada'}</span>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Localidad:</strong>
                    <span>{alumno.localidad || 'No especificada'}</span>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Intereses:</strong>
                    <span>{alumno.intereses || 'No especificados'}</span>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Descripción:</strong>
                    <p className="text-gray-800">{alumno.descripcion || 'No especificada'}</p>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Formación:</strong>
                    <p className="text-gray-800">{alumno.formacion || 'No especificada'}</p>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Experiencia Laboral:</strong>
                    <p className="text-gray-800">{alumno.experiencia_laboral || 'No especificada'}</p>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Habilidades Técnicas:</strong>
                    <span>{alumno.habilidades_tecnicas || 'No especificadas'}</span>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Habilidades Blandas:</strong>
                    <span>{alumno.habilidades_blandas || 'No especificadas'}</span>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Prácticas de Interés:</strong>
                    <span>{alumno.practicas_interes || 'No especificadas'}</span>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Sectores de Interés:</strong>
                    <span>{alumno.sectores_interes || 'No especificados'}</span>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Disponibilidad:</strong>
                    <span>{alumno.disponibilidad || 'No especificada'}</span>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Modalidad de Prácticas:</strong>
                    <span>{alumno.modalidad_practicas || 'No especificada'}</span>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Expectativas de Aprendizaje:</strong>
                    <p className="text-gray-800">{alumno.expectativas_aprendizaje || 'No especificadas'}</p>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Idiomas:</strong>
                    <span>{alumno.idiomas || 'No especificados'}</span>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Portafolio:</strong>
                    {alumno.portafolio ? (
                        <a href={alumno.portafolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ver Portafolio</a>
                    ) : (
                        <span>No especificado</span>
                    )}
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Certificaciones:</strong>
                    <p className="text-gray-800">{alumno.certificaciones || 'No especificadas'}</p>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Premios:</strong>
                    <p className="text-gray-800">{alumno.premios || 'No especificados'}</p>
                </div>

                <div className="mb-4 text-black">
                    <strong className="block font-medium text-gray-700">Referencias:</strong>
                    <p className="text-gray-800">{alumno.referencias || 'No especificados'}</p>
                </div>

                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Contactar
                </button>
            </div>
        </>
    );
}