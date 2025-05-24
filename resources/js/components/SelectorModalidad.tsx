import React from 'react';
import StyledSelect from './StyledSelect';

interface Props {
    modalidades: string[];
    setData: (key: 'modalidad', value: string) => void;
    initialValue?: string;
}


export default function SelectorModalidad({ modalidades, setData, initialValue = '' }: Props) {
    const handleSelectChange = (selectedOption: { value: string; label: string }) => {
        setData('modalidad', selectedOption.value);
    };

    // Formatea las modalidades para que coincidan con la estructura de options de StyledSelect
    const options = modalidades.map((modalidad) => ({
        value: modalidad,
        label: modalidad,
        style: 'text-white dark:bg-[oklch(0.28_0.03_232)]',
        highlightStyle: 'text-black',
        focusStyle: 'text-black',
        hoverStyle: 'text-black',
    }));

    return (
        <div>
            <StyledSelect
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:bg-[oklch(0.28_0.03_232)] rounded-md"
                options={options}
                value={initialValue}
                onChange={handleSelectChange}
                placeholder="Todas las modalidades"
                isSearchable={true} // Puedes cambiarlo a true si deseas la funcionalidad de búsqueda
                SeleccionadoDiv={true} // Puedes cambiarlo a true si deseas que la opción seleccionada permanezca visible con un overlay
                borderColor="border-blue-500" // Puedes personalizar el color del borde si SeleccionadoDiv es true
            />
        </div>
    );
}