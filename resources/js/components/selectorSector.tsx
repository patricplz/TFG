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
    style: 'text-white dark:bg-[oklch(0.28_0.03_232)]',
    highlightStyle: 'text-black',
    focusStyle: 'text-black',
    hoverStyle: 'text-black',
  }));

  const initialSelectedOption = options.find(option => option.value === initialValue);

  return (
    <div>
      <StyledSelect
        name="sector"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:bg-[oklch(0.28_0.03_232)] rounded-md"
        options={options}
        value={initialSelectedOption?.value}
        onChange={handleSelectChange}
        placeholder="Todos los sectores"
        isSearchable={true}
        SeleccionadoDiv={true} 
        borderColor="border-blue-500" 
      />
    </div>
  );
}