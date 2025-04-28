import React from 'react';
import StyledSelect from './StyledSelect'; // Asegúrate de que la ruta al componente StyledSelect sea correcta

interface Props {
  sectoresFP: string[];
  setData: (key: 'sector', value: string) => void;
  initialValue?: string;
}

export default function SelectorSector({ sectoresFP, setData, initialValue = '' }: Props) {
  const handleSelectChange = (selectedOption: { value: string; label: string }) => {
    setData('sector', selectedOption.value);
  };

  const options = sectoresFP.map((sector) => ({
    value: sector,
    label: sector,
    style: 'text-red-500 bg-transparent',
    highlightStyle: 'bg-blue-300',
    focusStyle: 'bg-blue-200'
  }));

  const initialSelectedOption = options.find(option => option.value === initialValue);

  return (
    <div>
      <StyledSelect
        name="sector"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        options={options}
        value={initialSelectedOption?.value}
        onChange={handleSelectChange}
        placeholder="Todos los sectores"
        isSearchable={true} // Puedes cambiarlo a true si deseas la funcionalidad de búsqueda
        SeleccionadoDiv={true} // Puedes cambiarlo a true si deseas que la opción seleccionada permanezca visible
        borderColor="border-blue-500" // Puedes personalizar el color del borde si SeleccionadoDiv es true
      />
    </div>
  );
}