import React, { useEffect, useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { EmpresaType } from '@/types/empresa'; 
import AppLayout from '@/layouts/app-layout-empresa';
import { type BreadcrumbItem } from '@/types';

// // Esta interfaz define las props esperadas: una empresa que puede ser null si no hay datos aún
interface Props {
    empresa: EmpresaType | null;
}

// Componentes reutilizables
// se trada de un campo de entrada estándar, reutilizable en formularios, para no repetir código
interface InputFieldProps {
    id: string;
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    type?: string;
    required?: boolean;
    error?: string;
    min?: string;
    placeholder?: string;
    disabled?: boolean;
}

//implementaciñon del input, para tipo texto
const InputField: React.FC<InputFieldProps> = ({ 
    id, 
    label, 
    value, 
    onChange, 
    type = 'text', 
    required = false, 
    error, 
    min,
    placeholder,
    disabled = false,
}) => {
    return (
        <div>
            <label htmlFor={id} className="mb-1 block text-sm font-medium text-white">
                {label} {required && '*'}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                min={min}
                placeholder={placeholder}
                disabled={disabled}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

//implementación de un input para tipo textArea, para descripciones más grandes
interface TextAreaFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    error?: string;
    rows?: number;
    placeholder?: string;
}
const TextAreaField: React.FC<TextAreaFieldProps> = ({ 
    id, 
    label, 
    value, 
    onChange, 
    required = false, 
    error, 
    rows = 3,
    placeholder
}) => {

    return (
        <div>
            <label htmlFor={id} className="mb-1 block text-sm font-medium text-white">
                {label} {required && '*'}
            </label>
            <textarea
                id={id}
                name={id}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                rows={rows}
                placeholder={placeholder}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );

};

interface CheckboxFieldProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    error?: string;
}
// Campo tipo checkbox reutilizable
const CheckboxField: React.FC<CheckboxFieldProps> = ({ 
    id, 
    label, 
    checked, 
    onChange, 
    error 
}) => {

    return (

        <div className="flex items-center">
            <input
                type="checkbox"
                id={id}
                name={id}
                className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label htmlFor={id} className="text-sm font-medium text-white">
                {label}
            </label>


            {error && <p className="mt-1 ml-2 text-xs text-red-500">{error}</p>}

        </div>
    );
};

// Componente para agrupar campos en secciones visuales con título e ícono
interface SectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => {
    return (
        <div className="rounded-lg border border-black p-4" style={{ backgroundColor: 'oklch(0.28 0.03 232)' }}>
            <h2 className="mb-4 flex items-center text-lg font-semibold text-white">
                {icon}
                {title}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
                {children}

            </div>
        </div>
    );
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function CompletaPerfil({ empresa }: Props) {
    const formRef = useRef<HTMLFormElement>(null);
    

    // hook de formulario de Inertia, inicializando campos con valores si la empresa ya existe
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        nombre: empresa?.nombre || '',
        cif_nif: empresa?.cif_nif || '',
        sector_actividad: empresa?.sector_actividad || '',
        descripcion: empresa?.descripcion || '',
        ubicacion: empresa?.ubicacion || '',
        sitio_web: empresa?.sitio_web || '',
        num_empleados: empresa?.num_empleados || '',
        contacto_nombre: empresa?.contacto_nombre || '',
        contacto_email: empresa?.contacto_email || '',
        contacto_telefono: empresa?.contacto_telefono || '',
        practicas_remuneradas: empresa?.practicas_remuneradas || false,
        areas_practicas: empresa?.areas_practicas || '',
        foto_perfil_path: empresa?.foto_perfil_path ||'',
    });
 // estado para la barra de progreso del formulario
    const [progress, setProgress] = useState<number>(0);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('empresa.perfil.guardar'));
    };

    // bloquear edición del CIF si ya hay una empresa
    const isDisabledCif = !!empresa; 
    const isRequiredCif = !empresa; 

    // efecto para actualizar el progreso del formulario conforme el usuario completa los campos
    useEffect(() => {
        const form = formRef.current;
        if (form) {

            const inputs = Array.from(form.querySelectorAll('input:not([type="checkbox"]), textarea')); //cojo todos los inputs excepto el checkbox que es opcional
            const totalFields = inputs.length; 
            let filledFields = 0;

            inputs.forEach((input) => {
                if ((input as HTMLInputElement | HTMLTextAreaElement).value.trim() !== '') {
                    filledFields++; //por cada input no vacío sumo filledFields
                }
            });

            // Considerar el checkbox
            if (data.practicas_remuneradas) filledFields++;

            const newProgress = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0; //saco procentaje de filledFields con respecto a totalFields
            setProgress(newProgress); //aumentas el progeso de la barra
        }
    }, [data]);

    // Clase dinámica para color de la barra de progreso
    const progressBarColorClass = progress < 30 ? 'bg-red-500' : progress < 70 ? 'bg-yellow-500' : 'bg-green-500';

    // Iconos para las secciones
    const companyIcon = (
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
        </svg>
    );

    const contactIcon = (
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
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
        </svg>
    );

    const practicesIcon = (
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
    );

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Completa tu Perfil de Empresa" />
                <div className="min-h-screen w-full">
                    <div className="mx-auto max-w-4xl p-6">
                        <div className="overflow-hidden rounded-lg shadow-xl">
                            {/* Header con imagen decorativa */}
                            <div className="relative p-6 text-white" style={{ backgroundColor: '#328c8c'}}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold">Completa tu Perfil de Empresa</h1>
                                        <p className="mt-2 opacity-90">Personaliza la información de tu empresa para atraer a los mejores candidatos</p>
                                    </div>
                                    <div className="hidden md:block">
                                        <svg
                                            className="h-24 w-24 text-white/20"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-gray-200 px-6 py-4">
                                <div className="h-2.5 w-full rounded-full bg-gray-200">
                                    <div
                                        className={`${progressBarColorClass} h-2.5 rounded-full transition-all duration-500`}
                                        style={{ width: `${progress}%` }}
                                        id="progress-bar"></div>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <form onSubmit={submit} className="space-y-6" ref={formRef}>
                                    {/* Sección Información de la Empresa */}
                                    <Section title="Información de la Empresa" icon={companyIcon}>
                                        <InputField
                                            id="nombre"
                                            label="Nombre de la Empresa"
                                            value={data.nombre}
                                            onChange={(value) => setData('nombre', value)}
                                            required={true}
                                            error={errors.nombre}/>
                                        <InputField
                                            id="cif_nif"
                                            label="CIF/NIF"
                                            value={data.cif_nif}
                                            onChange={(value) => setData('cif_nif', value)}
                                            required={isRequiredCif}
                                            error={errors.cif_nif}
                                            disabled={isDisabledCif}/>
                                        
                                        <InputField
                                            id="sector_actividad"
                                            label="Sector de Actividad"
                                            value={data.sector_actividad}
                                            onChange={(value) => setData('sector_actividad', value)}
                                            required={true}
                                            error={errors.sector_actividad}/>
                                        
                                        <InputField
                                            id="ubicacion"
                                            label="Ubicación (Dirección)"
                                            value={data.ubicacion}
                                            onChange={(value) => setData('ubicacion', value)}
                                            error={errors.ubicacion}/>
                                        
                                        <InputField
                                            id="sitio_web"
                                            label="Sitio Web"
                                            value={data.sitio_web}
                                            onChange={(value) => setData('sitio_web', value)}
                                            type="url"
                                            error={errors.sitio_web}/>
                                        
                                        <InputField
                                            id="num_empleados"
                                            label="Número de Empleados"
                                            value={data.num_empleados}
                                            onChange={(value) => setData('num_empleados', value)}
                                            type="number"
                                            min="1"
                                            error={errors.num_empleados}
                                        />
                                        
                                        <TextAreaField
                                            id="descripcion"
                                            label="Descripción de la Empresa"
                                            value={data.descripcion}
                                            onChange={(value) => setData('descripcion', value)}
                                            rows={3}
                                            error={errors.descripcion}
                                            placeholder="Describe brevemente la actividad y valores de tu empresa..."
                                        />
                                    </Section>

                                    {/* Sección Información de Contacto */}
                                    <Section title="Información de Contacto" icon={contactIcon}>
                                        <InputField
                                            id="contacto_nombre"
                                            label="Persona de Contacto para Prácticas"
                                            value={data.contacto_nombre}
                                            onChange={(value) => setData('contacto_nombre', value)}
                                            error={errors.contacto_nombre}
                                        />
                                        
                                        <InputField
                                            id="contacto_email"
                                            label="Email de Contacto"
                                            value={data.contacto_email}
                                            onChange={(value) => setData('contacto_email', value)}
                                            type="email"
                                            error={errors.contacto_email}
                                        />
                                        
                                        <InputField
                                            id="contacto_telefono"
                                            label="Teléfono de Contacto"
                                            value={data.contacto_telefono}
                                            onChange={(value) => setData('contacto_telefono', value)}
                                            error={errors.contacto_telefono}
                                        />
                                    </Section>

                                    {/* Sección Información de Prácticas */}
                                    <Section title="Información de Prácticas" icon={practicesIcon}>
                                        <div className="md:col-span-2">
                                            <CheckboxField
                                                id="practicas_remuneradas"
                                                label="¿Ofrecen prácticas remuneradas?"
                                                checked={data.practicas_remuneradas}
                                                onChange={(checked) => setData('practicas_remuneradas', checked)}
                                                error={errors.practicas_remuneradas}/>
                                        </div>
                                        
                                        <div className="md:col-span-2">
                                            <TextAreaField
                                                id="areas_practicas"
                                                label="Áreas en las que suelen ofrecer prácticas"
                                                value={data.areas_practicas}
                                                onChange={(value) => setData('areas_practicas', value)}
                                                rows={2}
                                                error={errors.areas_practicas}
                                                placeholder="Enumere las áreas separadas por comas (ej: Desarrollo web, Marketing, Finanzas...)"
                                            />
                                        </div>
                                    </Section>

                                    {/* Botón de envío */}
                                    <div className="flex justify-end items-center space-x-4">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-blue-500 px-4 py-2 text-white font-medium shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-70"
                                            disabled={processing}
                                        >
                                            Guardar Perfil
                                        </button>
                                        {processing && <p className="text-sm text-gray-500">Guardando...</p>}
                                        {recentlySuccessful && <p className="text-sm text-green-500">¡Perfil guardado con éxito!</p>}
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