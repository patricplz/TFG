import { useForm } from '@inertiajs/react';
import React from 'react';
import { Head } from '@inertiajs/react';

interface Oferta {
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
    // ... otras propiedades
}

interface Props {
    oferta: Oferta;
}

const OfertaEdit = ({ oferta }: Props) => {
    const { data, setData, put, processing, errors, } = useForm({
        name: oferta.name,
        description: oferta.description,
        image: null as File | null, // Para permitir la actualización de la imagen
        habilidades_blandas_requeridas: oferta.habilidades_blandas_requeridas || '',
        habilidades_tecnicas_requeridas: oferta.habilidades_tecnicas_requeridas || '',
        formacion_requerida: oferta.formacion_requerida || '',
        experiencia_laboral_requerida: oferta.experiencia_laboral_requerida || '',
        disponibilidad_requerida: oferta.disponibilidad_requerida || '',
        modalidad_practicas_requerida: oferta.modalidad_practicas_requerida || '',
        idiomas_requeridos: oferta.idiomas_requeridos || '',
        sector_interes_requerido: oferta.sector_interes_requerido || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('empresa.oferta.update', oferta.id), {
            method: 'put', // Necesario en algunos casos para forzar el método PUT
            //forceFormData: true, // Importante para subir imágenes
        });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title={`Editar oferta: ${oferta.name}`} />
            <h1 className="text-2xl font-bold mb-4">Editar oferta de prácticas</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                {/* Campos del formulario - son los mismos que en OfertaCreate */}
                <div>
                    <label htmlFor="name" className="block font-medium">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full border p-2"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>

                <div>
                    <label htmlFor="description" className="block font-medium">Descripción</label>
                    <textarea
                        id="description"
                        className="w-full border p-2"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    {errors.description && <div className="text-red-500">{errors.description}</div>}
                </div>

                <div>
                    <label htmlFor="image" className="block font-medium">Imagen (Dejar en blanco para no cambiar)</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                    />
                    {errors.image && <div className="text-red-500">{errors.image}</div>}
                    {oferta.image_path && (
                        <img
                            src={`/storage/${oferta.image_path}`}
                            alt={oferta.name}
                            className="mt-2 max-h-32 rounded-md"
                        />
                    )}
                </div>

                <div>
                    <label htmlFor="habilidades_blandas_requeridas" className="block font-medium">Habilidades Blandas Requeridas</label>
                    <textarea
                        id="habilidades_blandas_requeridas"
                        className="w-full border p-2"
                        value={data.habilidades_blandas_requeridas}
                        onChange={(e) => setData('habilidades_blandas_requeridas', e.target.value)}
                        placeholder="Ej: Trabajo en equipo, Comunicación, Liderazgo..."
                    />
                    {errors.habilidades_blandas_requeridas && <div className="text-red-500">{errors.habilidades_blandas_requeridas}</div>}
                </div>

                <div>
                    <label htmlFor="habilidades_tecnicas_requeridas" className="block font-medium">Habilidades Técnicas Requeridas</label>
                    <textarea
                        id="habilidades_tecnicas_requeridas"
                        className="w-full border p-2"
                        value={data.habilidades_tecnicas_requeridas}
                        onChange={(e) => setData('habilidades_tecnicas_requeridas', e.target.value)}
                        placeholder="Ej: Programación en Python, Diseño Gráfico, Análisis de Datos..."
                    />
                    {errors.habilidades_tecnicas_requeridas && <div className="text-red-500">{errors.habilidades_tecnicas_requeridas}</div>}
                </div>

                <div>
                    <label htmlFor="formacion_requerida" className="block font-medium">Formación Requerida</label>
                    <textarea
                        id="formacion_requerida"
                        className="w-full border p-2"
                        value={data.formacion_requerida}
                        onChange={(e) => setData('formacion_requerida', e.target.value)}
                        placeholder="Ej: Grado en Ingeniería Informática, Ciclo Formativo de Diseño Web..."
                    />
                    {errors.formacion_requerida && <div className="text-red-500">{errors.formacion_requerida}</div>}
                </div>

                <div>
                    <label htmlFor="experiencia_laboral_requerida" className="block font-medium">Experiencia Laboral Requerida</label>
                    <textarea
                        id="experiencia_laboral_requerida"
                        className="w-full border p-2"
                        value={data.experiencia_laboral_requerida}
                        onChange={(e) => setData('experiencia_laboral_requerida', e.target.value)}
                        placeholder="Ej: No se requiere experiencia, 1 año de experiencia en desarrollo web..."
                    />
                    {errors.experiencia_laboral_requerida && <div className="text-red-500">{errors.experiencia_laboral_requerida}</div>}
                </div>

                <div>
                    <label htmlFor="disponibilidad_requerida" className="block font-medium">Disponibilidad Requerida</label>
                    <input
                        type="text"
                        id="disponibilidad_requerida"
                        className="w-full border p-2"
                        value={data.disponibilidad_requerida}
                        onChange={(e) => setData('disponibilidad_requerida', e.target.value)}
                        placeholder="Ej: Inmediata, Flexible, A partir de Septiembre..."
                    />
                    {errors.disponibilidad_requerida && <div className="text-red-500">{errors.disponibilidad_requerida}</div>}
                </div>

                <div>
                    <label htmlFor="modalidad_practicas_requerida" className="block font-medium">Modalidad de Prácticas Requerida</label>
                    <input
                        type="text"
                        id="modalidad_practicas_requerida"
                        className="w-full border p-2"
                        value={data.modalidad_practicas_requerida}
                        onChange={(e) => setData('modalidad_practicas_requerida', e.target.value)}
                        placeholder="Ej: Presencial, Remoto, Híbrido..."
                    />
                    {errors.modalidad_practicas_requerida && <div className="text-red-500">{errors.modalidad_practicas_requerida}</div>}
                </div>

                <div>
                    <label htmlFor="idiomas_requeridos" className="block font-medium">Idiomas Requeridos</label>
                    <input
                        type="text"
                        id="idiomas_requeridos"
                        className="w-full border p-2"
                        value={data.idiomas_requeridos}
                        onChange={(e) => setData('idiomas_requeridos', e.target.value)}
                        placeholder="Ej: Inglés (B2), Español (Nativo)..."
                    />
                    {errors.idiomas_requeridos && <div className="text-red-500">{errors.idiomas_requeridos}</div>}
                </div>

                <div>
                    <label htmlFor="sector_interes_requerido" className="block font-medium">Sector de Interés Requerido</label>
                    <input
                        type="text"
                        id="sector_interes_requerido"
                        className="w-full border p-2"
                        value={data.sector_interes_requerido}
                        onChange={(e) => setData('sector_interes_requerido', e.target.value)}
                        placeholder="Ej: Desarrollo Web, Marketing Digital, Recursos Humanos..."
                    />
                    {errors.sector_interes_requerido && <div className="text-red-500">{errors.sector_interes_requerido}</div>}
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    disabled={processing}
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default OfertaEdit;