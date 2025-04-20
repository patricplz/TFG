import React from 'react';

interface Props {
    modalidades: string[];
    setData: (key: 'modalidad', value: string) => void; // Tipo más específico para setData
    initialValue?: string;
}

export default function SelectorModalidad({ modalidades, setData, initialValue = '' }: Props) {
    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setData('modalidad', event.target.value);
    };

    return (
        <div>
            <select
                name="modalidad"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={initialValue}
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