import React from 'react';
import { useForm } from '@inertiajs/react';

interface FormData {
    sector: string;
    [key: string]: string | number | boolean | null | undefined;
}

interface Props {
    sectoresFP: string[];
}

export default function SelectorSector({ sectoresFP }: Props) {
    const { data, setData } = useForm<FormData>({
        sector: ''
    }); // Accedemos al form del componente padre

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setData('sector', event.target.value);
    };

    return (
        <div>
            <select
                name="sector"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={data.sector}
                onChange={handleInputChange}
            >
                <option value="">Todos los sectores</option>
                {sectoresFP.map((sector) => (
                    <option key={sector} value={sector}>{sector}</option>
                ))}
            </select>
        </div>
    );
}