import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { EmpresaType } from '@/types/empresa'; // Asegúrate de tener esta definición de tipo

interface Props {
    empresa: EmpresaType | null;
}

export default function Editar({ empresa }: Props) {
    const form = useForm({
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
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('empresa.perfil.guardar'));
    };


    return (
        <>
            <Head title="Editar Perfil de Empresa" />

            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">Editar Perfil de Empresa</h1>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre de la Empresa</label>
                        <input
                            type="text"
                            id="nombre"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={form.data.nombre}
                            onChange={(e) => form.setData('nombre', e.target.value)}
                            required
                        />
                        {form.errors.nombre && <p className="text-red-500 text-xs italic">{form.errors.nombre}</p>}
                    </div>

                    <div>
                        <label htmlFor="cif_nif" className="block text-gray-700 text-sm font-bold mb-2">CIF/NIF</label>
                        <input
                            type="text"
                            id="cif_nif"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={form.data.cif_nif}
                            onChange={(e) => form.setData('cif_nif', e.target.value)}
                            required
                        />
                        {form.errors.cif_nif && <p className="text-red-500 text-xs italic">{form.errors.cif_nif}</p>}
                    </div>

                    <div>
                        <label htmlFor="sector_actividad" className="block text-gray-700 text-sm font-bold mb-2">Sector de Actividad</label>
                        <input
                            type="text"
                            id="sector_actividad"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={form.data.sector_actividad}
                            onChange={(e) => form.setData('sector_actividad', e.target.value)}
                            required
                        />
                        {form.errors.sector_actividad && <p className="text-red-500 text-xs italic">{form.errors.sector_actividad}</p>}
                    </div>

                    <div>
                        <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">Descripción de la Empresa</label>
                        <textarea
                            id="descripcion"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={form.data.descripcion}
                            onChange={(e) => form.setData('descripcion', e.target.value)}
                            rows={3}
                        />
                        {form.errors.descripcion && <p className="text-red-500 text-xs italic">{form.errors.descripcion}</p>}
                    </div>

                    <div>
                        <label htmlFor="ubicacion" className="block text-gray-700 text-sm font-bold mb-2">Ubicación (Dirección)</label>
                        <input
                            type="text"
                            id="ubicacion"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={form.data.ubicacion}
                            onChange={(e) => form.setData('ubicacion', e.target.value)}
                        />
                        {form.errors.ubicacion && <p className="text-red-500 text-xs italic">{form.errors.ubicacion}</p>}
                    </div>

                    <div>
                        <label htmlFor="sitio_web" className="block text-gray-700 text-sm font-bold mb-2">Sitio Web</label>
                        <input
                            type="url"
                            id="sitio_web"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={form.data.sitio_web}
                            onChange={(e) => form.setData('sitio_web', e.target.value)}
                        />
                        {form.errors.sitio_web && <p className="text-red-500 text-xs italic">{form.errors.sitio_web}</p>}
                    </div>

                    <div>
                        <label htmlFor="num_empleados" className="block text-gray-700 text-sm font-bold mb-2">Número de Empleados (Opcional)</label>
                        <input
                            type="number"
                            id="num_empleados"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={form.data.num_empleados}
                            onChange={(e) => form.setData('num_empleados', e.target.value)}
                            min="1"
                        />
                        {form.errors.num_empleados && <p className="text-red-500 text-xs italic">{form.errors.num_empleados}</p>}
                    </div>

                    <div>
                        <label htmlFor="contacto_nombre" className="block text-gray-700 text-sm font-bold mb-2">Persona de Contacto para Prácticas</label>
                        <input
                            type="text"
                            id="contacto_nombre"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={form.data.contacto_nombre}
                            onChange={(e) => form.setData('contacto_nombre', e.target.value)}
                        />
                        {form.errors.contacto_nombre && <p className="text-red-500 text-xs italic">{form.errors.contacto_nombre}</p>}
                    </div>

                    <div>
                        <label htmlFor="contacto_email" className="block text-gray-700 text-sm font-bold mb-2">Email de Contacto</label>
                        <input
                            type="email"
                            id="contacto_email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={form.data.contacto_email}
                            onChange={(e) => form.setData('contacto_email', e.target.value)}
                        />
                        {form.errors.contacto_email && <p className="text-red-500 text-xs italic">{form.errors.contacto_email}</p>}
                    </div>

                    <div>
                        <label htmlFor="contacto_telefono" className="block text-gray-700 text-sm font-bold mb-2">Teléfono de Contacto</label>
                        <input
                            type="text"
                            id="contacto_telefono"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={form.data.contacto_telefono}
                            onChange={(e) => form.setData('contacto_telefono', e.target.value)}
                        />
                        {form.errors.contacto_telefono && <p className="text-red-500 text-xs italic">{form.errors.contacto_telefono}</p>}
                    </div>

                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id="practicas_remuneradas"
                            className="mr-2 leading-tight"
                            checked={form.data.practicas_remuneradas}
                            onChange={(e) => form.setData('practicas_remuneradas', e.target.checked)}
                        />
                        <label htmlFor="practicas_remuneradas" className="text-gray-700 text-sm font-bold">¿Ofrecen prácticas remuneradas?</label>
                        {form.errors.practicas_remuneradas && <p className="text-red-500 text-xs italic">{form.errors.practicas_remuneradas}</p>}
                    </div>

                    <div>
                        <label htmlFor="areas_practicas" className="block text-gray-700 text-sm font-bold mb-2">Áreas en las que suelen ofrecer prácticas (separadas por comas)</label>
                        <textarea
                            id="areas_practicas"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={form.data.areas_practicas}
                            onChange={(e) => form.setData('areas_practicas', e.target.value)}
                            rows={2}
                        />
                        {form.errors.areas_practicas && <p className="text-red-500 text-xs italic">{form.errors.areas_practicas}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={form.processing}
                    >
                        Guardar Perfil
                    </button>

                    {form.processing && <p className="text-gray-500 text-sm italic">Guardando...</p>}
                    {form.recentlySuccessful && <p className="text-green-500 text-sm italic">Perfil guardado con éxito.</p>}
                </form>
            </div>
        </>
    );
}