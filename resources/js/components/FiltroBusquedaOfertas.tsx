// filtrobusquedaOfertas.tsx

import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import BuscadorPalabraClave from './BuscadorPalabraClave';
import SelectorModalidad from './SelectorModalidad';

interface Props {
    modalidades: string[];
    sector: string;
}

interface InertiaGetProps {
    preserveState?: boolean;
    replace?: boolean;
    [key: string]: string | number | boolean | null | undefined;
}

export default function FiltroOfertas({ modalidades, sector }: Props) {
    const { data, setData, get } = useForm({
        palabra_clave: '',
        modalidad: '',
        sector: sector || '',
    });

    useEffect(() => {
        get(route("alumno.dashboard.sector", { sector: data.sector }), { 
            palabra_clave: data.palabra_clave,
            modalidad: data.modalidad,
            preserveState: true,
            replace: true,
        } as InertiaGetProps);
    }, [data, get]);

    return (
        <div className="mb-4">
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2 items-center">
                <BuscadorPalabraClave setData={setData} initialValue={data.palabra_clave} />
                <SelectorModalidad modalidades={modalidades} setData={setData} initialValue={data.modalidad} />
            </div>
        </div>
    );
}