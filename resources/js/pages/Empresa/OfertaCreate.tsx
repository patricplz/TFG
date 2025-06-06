import { useForm } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout-empresa';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Crear Oferta',
        href: '#',
    }
];


// componente para crear una nueva oferta de prácticas
const OfertaCreate = () => {
    const [currentTab, setCurrentTab] = useState('informacion'); //estado para cambiar el apartado/pestaña, por defecto 'información'
    const [isLoaded, setIsLoaded] = useState(false); //para animación de entrada
    const [previewImage, setPreviewImage] = useState<string | null>(null); //para cuando pones una imagen que se previsualice

    // Estado del formulario con Inertia
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        image: null as File | null,
        habilidades_blandas_requeridas: '',
        habilidades_tecnicas_requeridas: '',
        formacion_requerida: '',
        experiencia_laboral_requerida: '',
        disponibilidad_requerida: '',
        modalidad_practicas_requerida: '',
        idiomas_requeridos: '',
        sector_interes_requerido: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentTab === 'extras') { //que se submitee solo cuando estemos en la última pestaña de completar la información
            post(route('empresa.oferta.store'), { //hacemos el post
                forceFormData: true,
                onError: (errors) => { //en caso de error que muestre el alert

                if (errors.auth) {
                    alert(errors.auth); 
                }
            }
            });
        }
    };

        // Manejar selección de imagen y previsualizarla
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
    // carga inicial para animaciones
    useEffect(() => {
        const timer = setTimeout(() => {setIsLoaded(true);}, 100);
        
        return () => clearTimeout(timer);
    }, []);

    // estilo dinámico para la elección de pestañas, para que resalte más la que esta seleccionada
    const tabClass = (tab: string) => {
        return `px-4 py-2 font-medium rounded-t-lg transition-colors duration-300 border-b-2 ${
            currentTab === tab 
                ? 'text-blue-600 border-blue-600 bg-white dark:bg-[oklch(0.28_0.03_232)] dark:text-blue-400 dark:border-blue-400' 
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
        }`;
    };

    // campo de entrada común (texto o textarea), igual que en CompleteProfile
    const renderInputField = (
        id: string, 
        label: string, 
        value: string, 
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
        placeholder: string = '', 
        isTextarea: boolean = false,
        isRequired: boolean = false,
    ) => {
        return (
            <div className="mb-6 transform transition-all duration-500 ease-in-out">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label}
                    {isRequired && <span className="text-red-500">*</span>} 
                </label>
                {isTextarea ? (
                    <textarea
                        id={id}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 dark:bg-gray-800 dark:text-white"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={4}
                        required={isRequired}
                    />
                ) : (
                    <input
                        type="text"
                        id={id}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 dark:bg-gray-800 dark:text-white"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={isRequired}
                    />
                )}
            </div>
        );
    };

    // campo de selección con opciones (select)
    const renderSelectField = (
        id: string,
        label: string,
        value: string,
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
        options: string[],
        placeholder: string = 'Selecciona una opción',
        isRequired: boolean = false,
    ) => {
        return (
            <div className="mb-6 transform transition-all duration-500 ease-in-out">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label}
                    {isRequired && <span className="text-red-500">*</span>} 
                </label>
                <select
                    id={id}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 dark:bg-gray-800 dark:text-white"
                    value={value}
                    onChange={onChange}
                    required={isRequired}>
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className={`max-w-4xl w-full m-3 mx-auto bg-white dark:bg-[oklch(0.28_0.03_232)] rounded-xl shadow-lg transition-all duration-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="p-6">
                    <Head title="Crear oferta de prácticas" />
                    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-3">
                        Crear Oferta de Prácticas
                    </h1>

                    <div className="mb-8">
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setCurrentTab('informacion')}
                                className={tabClass('informacion')}>
                                Información General
                            </button>
                            <button
                                onClick={() => setCurrentTab('requisitos')}
                                className={tabClass('requisitos')}>
                                Requisitos
                            </button>
                            <button
                                onClick={() => setCurrentTab('extras')}
                                className={tabClass('extras')}>
                                Detalles Adicionales
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                        <div className={`${currentTab === 'informacion' ? 'block' : 'hidden'}`}>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
                                <h2 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Información General</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Introduce los datos básicos de tu oferta de prácticas.</p>
                            </div>

                            {renderInputField('name', 'Nombre de la Oferta', data.name, (e) => setData('name', e.target.value), 'Ej: Prácticas de Desarrollo Web', false, true)}
                            
                            {renderInputField('description', 'Descripción Detallada', data.description, (e) => setData('description', e.target.value), 'Describe la oferta de prácticas y las tareas a realizar...', true, true)}
                            
                            <div className="mb-6">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Imagen de la Oferta<span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex-shrink-0">
                                        {previewImage && (
                                            <div className="relative group">
                                                <img
                                                    src={previewImage}
                                                    alt="Previsualización"
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
                                            <span>Seleccionar imagen</span>
                                            <input
                                                type="file"
                                                id="image"
                                                className="hidden"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                required
                                            />
                                        </label>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            Formato recomendado: JPG, PNG. Max 2MB.
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

                            {renderInputField('habilidades_blandas_requeridas', 'Habilidades Blandas', data.habilidades_blandas_requeridas, (e) => setData('habilidades_blandas_requeridas', e.target.value), 'Ej: Trabajo en equipo, Comunicación, Liderazgo...', true, true)}
                            
                            {renderInputField('habilidades_tecnicas_requeridas', 'Habilidades Técnicas', data.habilidades_tecnicas_requeridas, (e) => setData('habilidades_tecnicas_requeridas', e.target.value), 'Ej: Programación en Python, Diseño Gráfico, Análisis de Datos...', true, true)}
                            
                            {renderInputField('formacion_requerida', 'Formación Académica', data.formacion_requerida, (e) => setData('formacion_requerida', e.target.value), 'Ej: Grado en Ingeniería Informática, Ciclo Formativo...', true, true)}
                            
                            {renderInputField('experiencia_laboral_requerida', 'Experiencia Laboral', data.experiencia_laboral_requerida, (e) => setData('experiencia_laboral_requerida', e.target.value), 'Ej: No se requiere experiencia, 1 año de experiencia...', true, true)}
                        </div>

                        <div className={`${currentTab === 'extras' ? 'block' : 'hidden'}`}>
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg mb-6">
                                <h2 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">Detalles Adicionales</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Especifica condiciones adicionales como disponibilidad, modalidad e idiomas.</p>
                            </div>

                            {renderInputField('disponibilidad_requerida', 'Disponibilidad', data.disponibilidad_requerida, (e) => setData('disponibilidad_requerida', e.target.value), 'Ej: Inmediata, Flexible, A partir de Septiembre...', true, true)}
                            
                            {renderSelectField(
                                'modalidad_practicas_requerida',
                                'Modalidad de Prácticas',
                                data.modalidad_practicas_requerida,
                                (e) => setData('modalidad_practicas_requerida', e.target.value),
                                ['Híbrido', 'Presencial', 'Remoto'],
                                'Selecciona una modalidad',
                                true
                            )}
                            
                            {renderInputField('idiomas_requeridos', 'Idiomas Requeridos', data.idiomas_requeridos, (e) => setData('idiomas_requeridos', e.target.value), 'Ej: Inglés (B2), Español (Nativo)...', true, true)}
                            
                            {renderSelectField(
                                'sector_interes_requerido',
                                'Sector de Interés',
                                data.sector_interes_requerido,
                                (e) => setData('sector_interes_requerido', e.target.value),
                                [
                                    'Administración y Gestión',
                                    'Agraria',
                                    'Artes Gráficas',
                                    'Artes y Artesanías',
                                    'Comercio y Marketing',
                                    'Edificación y Obra Civil',
                                    'Electricidad y Electrónica',
                                    'Energía y Agua',
                                    'Fabricación Mecánica',
                                    'Hostelería y Turismo',
                                    'Imagen Personal',
                                    'Imagen y Sonido',
                                    'Industrias Alimentarias',
                                    'Informática y Comunicaciones',
                                    'Instalación y Mantenimiento',
                                    'Madera, Mueble y Corcho',
                                    'Marítimo-Pesquera',
                                    'Química',
                                    'Sanidad',
                                    'Seguridad y Medio Ambiente',
                                    'Servicios Socioculturales y a la Comunidad',
                                    'Textil, Confección y Piel',
                                    'Transporte y Mantenimiento',
                                    'Vidrio y Cerámica',
                                    'Actividades Físicas y Deportivas',
                                    'Otro'
                                ],
                                'Selecciona un sector', 
                                true,
                            )}
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
                                        }}
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
                                                Creando...
                                            </span>
                                        ) : (
                                            'Crear Oferta'
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

export default OfertaCreate;