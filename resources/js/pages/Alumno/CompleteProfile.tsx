import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';



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
    [key: string]: string | number | boolean | File | null;
}

export default function CompletaPerfil() {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        cv: null,
        foto_perfil: null,
        intereses: '',
        descripcion: '',
        formacion: '',
        experiencia_laboral: '',
        habilidades_tecnicas: '',
        habilidades_blandas: '',
        practicas_interes: '',
        sectores_interes: '',
        disponibilidad: '',
        modalidad_practicas: '',
        expectativas_aprendizaje: '',
        idiomas: '',
        portafolio: '',
        certificaciones: '',
        premios: '',
        referencias: '',
    });

    const [cvName, setCvName] = useState<string | null>(null);
    const [fotoPerfilName, setFotoPerfilName] = useState<string | null>(null);

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

    return (
        <>
            <Head title="Completa tu Perfil" />

            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Completa tu Perfil</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label htmlFor="cv" className="block text-gray-700 text-sm font-bold mb-2">
                            CV (PDF)
                        </label>
                        <input
                            type="file"
                            id="cv"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleCvChange}
                            accept=".pdf"
                        />
                        {cvName && <p className="text-gray-500 text-xs italic">Archivo seleccionado: {cvName}</p>}
                        {errors.cv && <p className="text-red-500 text-xs italic">{errors.cv}</p>}
                    </div>

                    <div>
                        <label htmlFor="foto_perfil" className="block text-gray-700 text-sm font-bold mb-2">
                            Foto de Perfil
                        </label>
                        <input
                            type="file"
                            id="foto_perfil"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleFotoPerfilChange}
                            accept="image/*"
                        />
                        {fotoPerfilName && <p className="text-gray-500 text-xs italic">Archivo seleccionado: {fotoPerfilName}</p>}
                        {errors.foto_perfil && <p className="text-red-500 text-xs italic">{errors.foto_perfil}</p>}
                    </div>

                    <div>
                        <label htmlFor="intereses" className="block text-gray-700 text-sm font-bold mb-2">
                            Define tus Intereses
                        </label>
                        <textarea
                            id="intereses"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.intereses}
                            onChange={e => setData('intereses', e.currentTarget.value)}
                            rows={3}
                        />
                        {errors.intereses && <p className="text-red-500 text-xs italic">{errors.intereses}</p>}
                    </div>

                    <div>
                        <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">
                            Breve Descripción de Ti
                        </label>
                        <textarea
                            id="descripcion"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.currentTarget.value)}
                            rows={4}
                        />
                        {errors.descripcion && <p className="text-red-500 text-xs italic">{errors.descripcion}</p>}
                    </div>

                    <div>
                        <label htmlFor="formacion" className="block text-gray-700 text-sm font-bold mb-2">
                            Formación Académica
                        </label>
                        <textarea
                            id="formacion"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.formacion}
                            onChange={e => setData('formacion', e.currentTarget.value)}
                            rows={3}
                            placeholder="Ej: Grado en Ingeniería Informática (Universidad de...)"
                        />
                        {errors.formacion && <p className="text-red-500 text-xs italic">{errors.formacion}</p>}
                    </div>

                    <div>
                        <label htmlFor="experiencia_laboral" className="block text-gray-700 text-sm font-bold mb-2">
                            Experiencia Laboral
                        </label>
                        <textarea
                            id="experiencia_laboral"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.experiencia_laboral}
                            onChange={e => setData('experiencia_laboral', e.currentTarget.value)}
                            rows={3}
                            placeholder="Ej: Desarrollador Junior (Empresa X), 3 meses"
                        />
                        {errors.experiencia_laboral && <p className="text-red-500 text-xs italic">{errors.experiencia_laboral}</p>}
                    </div>

                    <div>
                        <label htmlFor="habilidades_tecnicas" className="block text-gray-700 text-sm font-bold mb-2">
                            Habilidades Técnicas (Hard Skills)
                        </label>
                        <input
                            type="text"
                            id="habilidades_tecnicas"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.habilidades_tecnicas}
                            onChange={e => setData('habilidades_tecnicas', e.currentTarget.value)}
                            placeholder="Ej: Python, SQL, JavaScript, Diseño UX/UI"
                        />
                        {errors.habilidades_tecnicas && <p className="text-red-500 text-xs italic">{errors.habilidades_tecnicas}</p>}
                    </div>

                    <div>
                        <label htmlFor="habilidades_blandas" className="block text-gray-700 text-sm font-bold mb-2">
                            Habilidades Blandas (Soft Skills)
                        </label>
                        <input
                            type="text"
                            id="habilidades_blandas"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.habilidades_blandas}
                            onChange={e => setData('habilidades_blandas', e.currentTarget.value)}
                            placeholder="Ej: Trabajo en equipo, Liderazgo, Comunicación"
                        />
                        {errors.habilidades_blandas && <p className="text-red-500 text-xs italic">{errors.habilidades_blandas}</p>}
                    </div>

                    <div>
                        <label htmlFor="practicas_interes" className="block text-gray-700 text-sm font-bold mb-2">
                            Tipos de Prácticas de Interés
                        </label>
                        <input
                            type="text"
                            id="practicas_interes"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.practicas_interes}
                            onChange={e => setData('practicas_interes', e.currentTarget.value)}
                            placeholder="Ej: Desarrollo Web, Marketing Digital, Investigación"
                        />
                        {errors.practicas_interes && <p className="text-red-500 text-xs italic">{errors.practicas_interes}</p>}
                    </div>

                    <div>
                        <label htmlFor="sectores_interes" className="block text-gray-700 text-sm font-bold mb-2">
                            Sectores o Industrias de Interés
                        </label>
                        <input
                            type="text"
                            id="sectores_interes"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.sectores_interes}
                            onChange={e => setData('sectores_interes', e.currentTarget.value)}
                            placeholder="Ej: Tecnología, Salud, Finanzas"
                        />
                        {errors.sectores_interes && <p className="text-red-500 text-xs italic">{errors.sectores_interes}</p>}
                    </div>

                    <div>
                        <label htmlFor="disponibilidad" className="block text-gray-700 text-sm font-bold mb-2">
                            Disponibilidad para Prácticas
                        </label>
                        <input
                            type="text"
                            id="disponibilidad"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.disponibilidad}
                            onChange={e => setData('disponibilidad', e.currentTarget.value)}
                            placeholder="Ej: Junio-Agosto 2025, 3 meses"
                        />
                        {errors.disponibilidad && <p className="text-red-500 text-xs italic">{errors.disponibilidad}</p>}
                    </div>

                    <div>
                        <label htmlFor="modalidad_practicas" className="block text-gray-700 text-sm font-bold mb-2">
                            Modalidad de Prácticas Preferida
                        </label>
                        <select
                            id="modalidad_practicas"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.modalidad_practicas}
                            onChange={e => setData('modalidad_practicas', e.currentTarget.value)}
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="presencial">Presencial</option>
                            <option value="remota">Remota</option>
                            <option value="hibrida">Híbrida</option>
                        </select>
                        {errors.modalidad_practicas && <p className="text-red-500 text-xs italic">{errors.modalidad_practicas}</p>}
                    </div>

                    <div>
                        <label htmlFor="expectativas_aprendizaje" className="block text-gray-700 text-sm font-bold mb-2">
                            Expectativas de Aprendizaje
                        </label>
                        <textarea
                            id="expectativas_aprendizaje"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.expectativas_aprendizaje}
                            onChange={e => setData('expectativas_aprendizaje', e.currentTarget.value)}
                            rows={3}
                            placeholder="Ej: Aplicar conocimientos, aprender sobre la industria..."
                        />
                        {errors.expectativas_aprendizaje && <p className="text-red-500 text-xs italic">{errors.expectativas_aprendizaje}</p>}
                    </div>

                    <div>
                        <label htmlFor="idiomas" className="block text-gray-700 text-sm font-bold mb-2">
                            Idiomas (Nivel)
                        </label>
                        <input
                            type="text"
                            id="idiomas"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.idiomas}
                            onChange={e => setData('idiomas', e.currentTarget.value)}
                            placeholder="Ej: Inglés (B2), Francés (A1)"
                        />
                        {errors.idiomas && <p className="text-red-500 text-xs italic">{errors.idiomas}</p>}
                    </div>

                    <div>
                        <label htmlFor="portafolio" className="block text-gray-700 text-sm font-bold mb-2">
                            Enlace a Portafolio o Proyectos
                        </label>
                        <input
                            type="url"
                            id="portafolio"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.portafolio}
                            onChange={e => setData('portafolio', e.currentTarget.value)}
                            placeholder="Ej: https://miportafolio.com"
                        />
                        {errors.portafolio && <p className="text-red-500 text-xs italic">{errors.portafolio}</p>}
                    </div>

                    <div>
                        <label htmlFor="certificaciones" className="block text-gray-700 text-sm font-bold mb-2">
                            Certificaciones y Cursos
                        </label>
                        <textarea
                            id="certificaciones"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.certificaciones}
                            onChange={e => setData('certificaciones', e.currentTarget.value)}
                            rows={2}
                            placeholder="Ej: Certificado en..., Curso de..."
                        />
                        {errors.certificaciones && <p className="text-red-500 text-xs italic">{errors.certificaciones}</p>}
                    </div>

                    <div>
                        <label htmlFor="premios" className="block text-gray-700 text-sm font-bold mb-2">
                            Premios y Reconocimientos
                        </label>
                        <textarea
                            id="premios"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.premios}
                            onChange={e => setData('premios', e.currentTarget.value)}
                            rows={2}
                            placeholder="Ej: Premio a..., Reconocimiento por..."
                        />
                        {errors.premios && <p className="text-red-500 text-xs italic">{errors.premios}</p>}
                    </div>

                    <div>
                        <label htmlFor="referencias" className="block text-gray-700 text-sm font-bold mb-2">
                            Referencias (Opcional)
                        </label>
                        <textarea
                            id="referencias"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={data.referencias}
                            onChange={e => setData('referencias', e.currentTarget.value)}
                            rows={3}
                            placeholder="Ej: Nombre y cargo de la persona de referencia"
                        />
                        {errors.referencias && <p className="text-red-500 text-xs italic">{errors.referencias}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={processing}
                    >
                        {processing ? 'Guardando...' : 'Guardar Perfil'}
                    </button>
                </form>
            </div>
        </>
    );
};