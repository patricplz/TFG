import React from 'react';

interface Props {
    setData: (key: string, value: string) => void; // Define el tipo de setData como una función
    initialValue?: string;
}

export default function BuscadorPalabraClave({ setData, initialValue = '' }: Props) {
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