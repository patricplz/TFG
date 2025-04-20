import React from 'react';

interface Props {
    sectoresFP: string[];
    setData: (key: 'sector', value: string) => void; // Tipo más específico para setData
    initialValue?: string;
}

export default function SelectorSector({ sectoresFP, setData, initialValue = '' }: Props) {
    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setData('sector', event.target.value);
    };

    return (
        <div>
            <select
                name="sector"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={initialValue}
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