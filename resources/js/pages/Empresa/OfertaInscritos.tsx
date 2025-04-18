import { Head, Link } from '@inertiajs/react';

interface OfertaType {
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

interface AlumnoType {
    alumno_id: number;
    nombre: string;
    apellidos: string;
    foto_perfil: File | null; //todo: quitar null
    formacion: string;
}

interface Props {
    oferta: OfertaType;
    alumnosInscritos: AlumnoType[];
}

export default function OfertaInscritos({ oferta, alumnosInscritos }: Props) {
    return (
        <>
            <Head title={`Alumnos Inscritos en ${oferta.name}`} />
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Alumnos Inscritos en: {oferta.name}</h1>

                {alumnosInscritos.length > 0 ? (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        {alumnosInscritos.map((alumno) => (
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
                                {/* Puedes añadir más información básica del alumno aquí si lo deseas */}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>No hay alumnos inscritos en esta oferta actualmente.</p>
                )}
            </div>
        </>
    );
}