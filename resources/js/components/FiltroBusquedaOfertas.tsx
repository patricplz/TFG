import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import BuscadorPalabraClave from './BuscadorPalabraClave';
import SelectorSector from './selectorSector';
import SelectorModalidad from './SelectorModalidad';

interface Props {
    sectoresFP: string[];
    modalidades: string[];
}

interface InertiaGetProps {
    preserveState?: boolean;
    replace?: boolean;
    [key: string]: string | number | boolean | null | undefined; // Permite otras propiedades (como los datos del formulario)
}

export default function FiltroOfertas({ sectoresFP, modalidades }: Props) {
    const { data, setData, get } = useForm({
        palabra_clave: '',
        sector: '',
        modalidad: '',
    });

    useEffect(() => {
        get(route("alumno.dashboard"), {
            ...data,
            preserveState: true,
            replace: true,
        } as InertiaGetProps); // Casteamos el objeto de opciones
    }, [data, get]);

    return (
        <div className="mb-4">
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2 items-center">
                <BuscadorPalabraClave setData={setData} initialValue={data.palabra_clave} />
                <SelectorSector sectoresFP={sectoresFP} setData={setData} initialValue={data.sector} />
                <SelectorModalidad modalidades={modalidades} setData={setData} initialValue={data.modalidad} />
            </div>
        </div>
    );
}