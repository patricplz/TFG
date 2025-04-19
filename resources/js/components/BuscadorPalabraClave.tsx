import React from 'react';
import { useForm } from '@inertiajs/react';

interface FormData {
    palabra_clave: string;
    [key: string]: string | number | boolean | null | undefined;
}

export default function BuscadorPalabraClave() {
    const { data, setData } = useForm<FormData>({ // Especificamos el tipo FormData
        palabra_clave: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData('palabra_clave', event.target.value);
    };

    return (
        <div className="flex-grow">
            <input
                type="text"
                name="palabra_clave"
                placeholder="Buscar por palabra clave"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={data.palabra_clave}
                onChange={handleInputChange}
            />
        </div>
    );
}