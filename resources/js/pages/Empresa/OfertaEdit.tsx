//Ofertaedit.tsx

import { useForm } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-empresa';
import { type BreadcrumbItem } from '@/types';

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
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Editar Oferta',
        href: '#',
    }
];

interface Props {
    oferta: Oferta;
}

const OfertaEdit = ({ oferta }: Props) => {
    const [currentTab, setCurrentTab] = useState('informacion');
    const [isLoaded, setIsLoaded] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(oferta.image_path ? `/storage/${oferta.image_path}` : null);

    const { data, setData, put, processing, errors } = useForm({
        name: oferta.name,
        description: oferta.description,
        image: null as File | null,
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
        if (currentTab === 'extras') {
            put(route('empresa.oferta.update', oferta.id), {
                method: 'put',
            });
        }
    };

    

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    const tabClass = (tab: string) => {
        return `px-4 py-2 font-medium rounded-t-lg transition-colors duration-300 border-b-2 ${
            currentTab === tab 
                ? 'text-blue-600 border-blue-600 bg-white dark:bg-[oklch(0.28_0.03_232)] dark:text-blue-400 dark:border-blue-400' 
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
        }`;
    };

    const renderInputField = (
        id: string, 
        label: string, 
        value: string, 
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
        placeholder: string = '', 
        isTextarea: boolean = false
    ) => {
        return (
            <div className="mb-6 transform transition-all duration-500 ease-in-out">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label}
                </label>
                {isTextarea ? (
                    <textarea
                        id={id}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 dark:bg-gray-800 dark:text-white"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={4}
                    />
                ) : (
                    <input
                        type="text"
                        id={id}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 dark:bg-gray-800 dark:text-white"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
                )}
            </div>
        );
    };


    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className={`max-w-4xl w-full m-3 mx-auto bg-white dark:bg-[oklch(0.28_0.03_232)] rounded-xl shadow-lg transition-all duration-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="p-6">
                    <Head title={`Editar oferta: ${oferta.name}`} />
                    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-3">
                        Editar Oferta de Prácticas
                    </h1>

                    <div className="mb-8">
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setCurrentTab('informacion')}
                                className={tabClass('informacion')}
                            >
                                Información General
                            </button>
                            <button
                                onClick={() => setCurrentTab('requisitos')}
                                className={tabClass('requisitos')}
                            >
                                Requisitos
                            </button>
                            <button
                                onClick={() => setCurrentTab('extras')}
                                className={tabClass('extras')}
                            >
                                Detalles Adicionales
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                        <div className={`${currentTab === 'informacion' ? 'block' : 'hidden'}`}>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
                                <h2 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Información General</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Edita los datos básicos de tu oferta de prácticas.</p>
                            </div>

                            {renderInputField('name', 'Nombre de la Oferta', data.name, (e) => setData('name', e.target.value), 'Ej: Prácticas de Desarrollo Web')}
                            
                            {renderInputField('description', 'Descripción Detallada', data.description, (e) => setData('description', e.target.value), 'Describe la oferta de prácticas y las tareas a realizar...', true)}
                            
                            <div className="mb-6">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Imagen de la Oferta
                                </label>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex-shrink-0">
                                        {previewImage && (
                                            <div className="relative group">
                                                <img
                                                    src={previewImage}
                                                    alt={oferta.name}
                                                    className="h-32 w-32 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-700"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-lg">
                                                    <span className="text-white text-xs">Previsualización</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <label className="block w-full px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-600 dark:border-blue-400 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 transition duration-300 text-center">
                                            <span>Seleccionar nueva imagen</span>
                                            <input
                                                type="file"
                                                id="image"
                                                className="hidden"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                            />
                                        </label>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            Formato recomendado: JPG, PNG. Max 2MB. Deja vacío para mantener la imagen actual.
                                        </p>
                                    </div>
                                </div>
                                {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                            </div>
                        </div>

                        <div className={`${currentTab === 'requisitos' ? 'block' : 'hidden'}`}>
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-6">
                                <h2 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-300">Requisitos del Candidato</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Define las habilidades y conocimientos que debe tener el estudiante.</p>
                            </div>

                            {renderInputField('habilidades_blandas_requeridas', 'Habilidades Blandas', data.habilidades_blandas_requeridas, (e) => setData('habilidades_blandas_requeridas', e.target.value), 'Ej: Trabajo en equipo, Comunicación, Liderazgo...', true)}
                            
                            {renderInputField('habilidades_tecnicas_requeridas', 'Habilidades Técnicas', data.habilidades_tecnicas_requeridas, (e) => setData('habilidades_tecnicas_requeridas', e.target.value), 'Ej: Programación en Python, Diseño Gráfico, Análisis de Datos...', true)}
                            
                            {renderInputField('formacion_requerida', 'Formación Académica', data.formacion_requerida, (e) => setData('formacion_requerida', e.target.value), 'Ej: Grado en Ingeniería Informática, Ciclo Formativo...', true)}
                            
                            {renderInputField('experiencia_laboral_requerida', 'Experiencia Laboral', data.experiencia_laboral_requerida, (e) => setData('experiencia_laboral_requerida', e.target.value), 'Ej: No se requiere experiencia, 1 año de experiencia...', true)}
                        </div>

                        <div className={`${currentTab === 'extras' ? 'block' : 'hidden'}`}>
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg mb-6">
                                <h2 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">Detalles Adicionales</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Especifica condiciones adicionales como disponibilidad, modalidad e idiomas.</p>
                            </div>

                            {renderInputField('disponibilidad_requerida', 'Disponibilidad', data.disponibilidad_requerida, (e) => setData('disponibilidad_requerida', e.target.value), 'Ej: Inmediata, Flexible, A partir de Septiembre...')}
                            
                            {renderInputField('modalidad_practicas_requerida', 'Modalidad de Prácticas', data.modalidad_practicas_requerida, (e) => setData('modalidad_practicas_requerida', e.target.value), 'Ej: Presencial, Remoto, Híbrido...')}
                            
                            {renderInputField('idiomas_requeridos', 'Idiomas Requeridos', data.idiomas_requeridos, (e) => setData('idiomas_requeridos', e.target.value), 'Ej: Inglés (B2), Español (Nativo)...')}
                            
                            {renderInputField('sector_interes_requerido', 'Sector de Interés', data.sector_interes_requerido, (e) => setData('sector_interes_requerido', e.target.value), 'Ej: Desarrollo Web, Marketing Digital, Recursos Humanos...')}
                        </div>

                        <div className="pt-6 border-t mt-8 flex justify-between">
                            <button
                                type="button"
                                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                                onClick={() => window.history.back()}
                            >
                                Cancelar
                            </button>
                            
                            <div className="flex gap-3">
                                {currentTab !== 'informacion' && (
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                                        onClick={() => setCurrentTab(currentTab === 'requisitos' ? 'informacion' : 'requisitos')}
                                    >
                                        Anterior
                                    </button>
                                )}
                                
                                {currentTab !== 'extras' ? (
                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            if (currentTab === 'informacion') {
                                                setCurrentTab('requisitos');
                                            } else if (currentTab === 'requisitos') {
                                                setCurrentTab('extras');
                                            }
                                        }
                                    }
                                    >
                                        Siguiente
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <span className="inline-flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Guardando...
                                            </span>
                                        ) : (
                                            'Guardar Cambios'
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default OfertaEdit;