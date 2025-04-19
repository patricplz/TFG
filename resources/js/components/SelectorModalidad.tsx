import React from 'react';
import { useForm } from '@inertiajs/react';

interface FormData {
    modalidad: string;
    [key: string]: string | number | boolean | null | undefined;
}

interface Props {
    modalidades: string[];
}

export default function SelectorModalidad({ modalidades }: Props) {
    const { data, setData } = useForm<FormData>({
        modalidad: ''
    }); // Accedemos al form del componente padre

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setData('modalidad', event.target.value);
    };

    return (
        <div>
            <select
                name="modalidad"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={data.modalidad}
                onChange={handleInputChange}
            >
                <option value="">Todas las modalidades</option>
                {modalidades.map((modalidad) => (
                    <option key={modalidad} value={modalidad}>{modalidad}</option>
                ))}
            </select>
        </div>
    );
}