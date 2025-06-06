import React from 'react';
import StyledSelect from './StyledSelect';

interface Props {
  //props que recibe
  sectoresFP: string[]; //lista de sectores disponibles para seleccionar
  setData: (key: 'sector', value: string) => void; //función para actualizar estado del form
  initialValue?: string; //valor inicial del sector, es opcional, al principio no hay ninguno seleccionado
}

export default function SelectorSector({ sectoresFP, setData, initialValue = '' }: Props) {

  //manejador / handle que se activa cuando el usuario selecciona una opción del Select
  const handleSelectChange = (selectedOption: { value: string; label: string }) => {
    setData('sector', selectedOption.value);

  };

  //opciones del Select en el formato que este espera
  const options = sectoresFP.map((sector) => ({
    value: sector,
    label: sector,
    style: 'text-white dark:bg-[oklch(0.28_0.03_232)]',
    highlightStyle: 'text-black',
    focusStyle: 'text-black',
    hoverStyle: 'text-black',
  }));

  //Opcion seleccionada inicial
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