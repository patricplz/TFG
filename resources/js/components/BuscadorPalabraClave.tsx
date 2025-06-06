import React from 'react';

interface Props {
    setData: (key: string, value: string) => void; // Función para actualizar el estado del formulario
    initialValue?: string; //valor inicial del input

}


//campo de búsqueda por palabra clave
export default function BuscadorPalabraClave({ setData, initialValue = '' }: Props) {
    //handle que se ejecuta cada que el usuario escribe algo en el input y actualiza el setData con la clave y el nuevo valor
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
                value={initialValue}
                onChange={handleInputChange}
            />
        </div>
    );
}